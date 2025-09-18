-- Create user types and roles (skip if exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'CLIENTE', 'VENDEDOR');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pedido_status') THEN
    CREATE TYPE pedido_status AS ENUM ('pendente', 'confirmado', 'preparando', 'pronto', 'entregue', 'cancelado');
  END IF;
END $$;

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  tipo_usuario user_type NOT NULL DEFAULT 'cliente',
  bio TEXT,
  servicos TEXT[],
  contatos JSONB,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  role user_role NOT NULL DEFAULT 'CLIENTE',
  active BOOLEAN NOT NULL DEFAULT true,
  company_name TEXT DEFAULT 'Brasfrut'
);

-- Create produtos table
CREATE TABLE public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  unidade TEXT NOT NULL DEFAULT 'kg',
  disponivel BOOLEAN NOT NULL DEFAULT true,
  imagem_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create receitas table
CREATE TABLE public.receitas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  ingredientes JSONB NOT NULL,
  modo_preparo TEXT NOT NULL,
  tempo_preparo INTEGER, -- em minutos
  dificuldade TEXT CHECK (dificuldade IN ('facil', 'medio', 'dificil')),
  imagem_url TEXT,
  categoria TEXT,
  ativa BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pedidos table
CREATE TABLE public.pedidos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_pedido TEXT NOT NULL UNIQUE,
  cliente_nome TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefone TEXT,
  cliente_endereco JSONB,
  status pedido_status NOT NULL DEFAULT 'pendente',
  valor_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pedido_itens table
CREATE TABLE public.pedido_itens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pedido_id UUID NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
  produto_id UUID NOT NULL REFERENCES public.produtos(id),
  quantidade DECIMAL(10,3) NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create configuracoes table
CREATE TABLE public.configuracoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chave TEXT NOT NULL UNIQUE,
  valor JSONB NOT NULL,
  descricao TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedido_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Create RLS policies for produtos (public read, admin write)
CREATE POLICY "Anyone can view available products" ON public.produtos
  FOR SELECT USING (disponivel = true);

CREATE POLICY "Admins can manage products" ON public.produtos
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Create RLS policies for receitas (public read, admin write)
CREATE POLICY "Anyone can view active recipes" ON public.receitas
  FOR SELECT USING (ativa = true);

CREATE POLICY "Admins can manage recipes" ON public.receitas
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Create RLS policies for pedidos (admin only)
CREATE POLICY "Admins can manage orders" ON public.pedidos
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Create RLS policies for pedido_itens (admin only)
CREATE POLICY "Admins can manage order items" ON public.pedido_itens
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Create RLS policies for configuracoes (admin only)
CREATE POLICY "Admins can manage settings" ON public.configuracoes
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Create functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.generate_pedido_number()
RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  pedido_number TEXT;
BEGIN
  -- Get next sequential number for today
  SELECT COALESCE(MAX(CAST(SUBSTRING(numero_pedido FROM 9) AS INTEGER)), 0) + 1
  INTO next_number
  FROM public.pedidos
  WHERE DATE(created_at) = CURRENT_DATE;
  
  -- Format: YYYYMMDD-XXX
  pedido_number := TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(next_number::TEXT, 3, '0');
  
  RETURN pedido_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_pedido_total()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE public.pedidos 
    SET valor_total = COALESCE((
      SELECT SUM(valor_total) 
      FROM public.pedido_itens 
      WHERE pedido_id = OLD.pedido_id
    ), 0)
    WHERE id = OLD.pedido_id;
    RETURN OLD;
  ELSE
    UPDATE public.pedidos 
    SET valor_total = COALESCE((
      SELECT SUM(valor_total) 
      FROM public.pedido_itens 
      WHERE pedido_id = NEW.pedido_id
    ), 0)
    WHERE id = NEW.pedido_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, tipo_usuario, role, company_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nome', NEW.email),
    'profissional'::user_type,
    COALESCE((NEW.raw_user_meta_data ->> 'role')::user_role, 'CLIENTE'::user_role),
    'Brasfrut'
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.get_my_profile()
RETURNS TABLE(
  id UUID,
  user_id UUID,
  nome TEXT,
  tipo_usuario user_type,
  bio TEXT,
  servicos TEXT[],
  contatos JSONB,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  role user_role,
  active BOOLEAN,
  company_name TEXT
) AS $$
  SELECT 
    p.id,
    p.user_id,
    p.nome,
    p.tipo_usuario,
    p.bio,
    p.servicos,
    p.contatos,
    p.avatar_url,
    p.created_at,
    p.updated_at,
    p.role,
    p.active,
    p.company_name
  FROM public.profiles p
  WHERE p.user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_public_profiles()
RETURNS TABLE(
  id UUID,
  nome TEXT,
  tipo_usuario user_type,
  bio TEXT,
  servicos TEXT[],
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  role user_role,
  active BOOLEAN
) AS $$
  SELECT 
    p.id,
    p.nome,
    p.tipo_usuario,
    p.bio,
    p.servicos,
    p.avatar_url,
    p.created_at,
    p.updated_at,
    p.role,
    p.active
  FROM public.profiles p
  WHERE p.active = true
  ORDER BY p.created_at DESC;
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_profile_contact_info(profile_id UUID)
RETURNS JSONB AS $$
DECLARE
  contact_info JSONB;
  profile_owner_id UUID;
BEGIN
  -- Verificar se o perfil existe e obter o user_id
  SELECT user_id INTO profile_owner_id 
  FROM public.profiles 
  WHERE id = profile_id;
  
  -- Se não encontrou o perfil, retornar null
  IF profile_owner_id IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Somente o próprio usuário pode acessar seus contatos
  IF auth.uid() = profile_owner_id THEN
    SELECT contatos INTO contact_info 
    FROM public.profiles 
    WHERE id = profile_id;
    
    RETURN contact_info;
  ELSE
    -- Para outros usuários, retornar apenas informação limitada
    RETURN jsonb_build_object(
      'available', true,
      'message', 'Contate através da plataforma'
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_produtos_updated_at
  BEFORE UPDATE ON public.produtos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_receitas_updated_at
  BEFORE UPDATE ON public.receitas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pedidos_updated_at
  BEFORE UPDATE ON public.pedidos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_configuracoes_updated_at
  BEFORE UPDATE ON public.configuracoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_order_total
  AFTER INSERT OR UPDATE OR DELETE ON public.pedido_itens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_pedido_total();

-- Insert initial configurations
INSERT INTO public.configuracoes (chave, valor, descricao) VALUES
('site_name', '"Brasfrut"', 'Nome do site'),
('site_description', '"Frutas frescas e produtos naturais de qualidade"', 'Descrição do site'),
('webhook_url', '""', 'URL do webhook para notificações'),
('email_admin', '"admin@brasfrut.com"', 'Email do administrador'),
('whatsapp_number', '""', 'Número do WhatsApp para contato');

-- Insert sample products
INSERT INTO public.produtos (nome, descricao, categoria, preco, unidade, imagem_url, tags) VALUES
('Maçã Gala', 'Maçãs frescas e crocantes', 'frutas-frescas', 8.90, 'kg', '/assets/category-fresh.jpg', ARRAY['fresca', 'doce', 'saudável']),
('Banana Nanica', 'Bananas maduras e doces', 'frutas-frescas', 5.50, 'kg', '/assets/category-fresh.jpg', ARRAY['fresca', 'doce', 'energética']),
('Açaí Polpa', 'Polpa de açaí natural', 'congelados', 15.90, 'kg', '/assets/category-frozen.jpg', ARRAY['congelado', 'natural', 'antioxidante']);

-- Insert sample recipes
INSERT INTO public.receitas (titulo, descricao, ingredientes, modo_preparo, tempo_preparo, dificuldade, categoria) VALUES
('Smoothie de Banana', 'Smoothie cremoso e nutritivo', 
'[{"nome": "Banana", "quantidade": "2 unidades"}, {"nome": "Leite", "quantidade": "200ml"}, {"nome": "Mel", "quantidade": "1 colher"}]',
'Bata todos os ingredientes no liquidificador até ficar cremoso. Sirva gelado.',
10, 'facil', 'smoothies');