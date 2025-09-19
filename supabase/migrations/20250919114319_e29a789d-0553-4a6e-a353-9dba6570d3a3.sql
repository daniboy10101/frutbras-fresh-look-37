-- Add the missing 'cliente' value to existing user_type enum
ALTER TYPE user_type ADD VALUE IF NOT EXISTS 'cliente';

-- Create user roles enum if not exists
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

-- Continue with the rest of the tables and configurations...
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

CREATE TABLE public.receitas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  ingredientes JSONB NOT NULL,
  modo_preparo TEXT NOT NULL,
  tempo_preparo INTEGER,
  dificuldade TEXT CHECK (dificuldade IN ('facil', 'medio', 'dificil')),
  imagem_url TEXT,
  categoria TEXT,
  ativa BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

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

CREATE TABLE public.pedido_itens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pedido_id UUID NOT NULL REFERENCES public.pedidos(id) ON DELETE CASCADE,
  produto_id UUID NOT NULL REFERENCES public.produtos(id),
  quantidade DECIMAL(10,3) NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

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

-- RLS policies...
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

CREATE POLICY "Anyone can view available products" ON public.produtos
  FOR SELECT USING (disponivel = true);

CREATE POLICY "Admins can manage products" ON public.produtos
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

CREATE POLICY "Anyone can view active recipes" ON public.receitas
  FOR SELECT USING (ativa = true);

CREATE POLICY "Admins can manage recipes" ON public.receitas
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

CREATE POLICY "Admins can manage orders" ON public.pedidos
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

CREATE POLICY "Admins can manage order items" ON public.pedido_itens
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

CREATE POLICY "Admins can manage settings" ON public.configuracoes
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'ADMIN'
  ));

-- Sample data
INSERT INTO public.configuracoes (chave, valor, descricao) VALUES
('site_name', '"Brasfrut"', 'Nome do site'),
('webhook_url', '""', 'URL do webhook para notificações'),
('email_admin', '"admin@brasfrut.com"', 'Email do administrador');

INSERT INTO public.produtos (nome, descricao, categoria, preco, unidade, imagem_url, tags) VALUES
('Maçã Gala', 'Maçãs frescas e crocantes', 'frutas-frescas', 8.90, 'kg', '/assets/category-fresh.jpg', ARRAY['fresca', 'doce']);

INSERT INTO public.receitas (titulo, ingredientes, modo_preparo, tempo_preparo, dificuldade, categoria) VALUES
('Smoothie de Banana', 
'[{"nome": "Banana", "quantidade": "2 unidades"}]',
'Bata todos os ingredientes no liquidificador.',
10, 'facil', 'smoothies');