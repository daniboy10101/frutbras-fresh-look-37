-- Add missing enum values to existing user_type
ALTER TYPE user_type ADD VALUE IF NOT EXISTS 'admin';

-- Create missing enums if they don't exist  
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'pedido_status') THEN
    CREATE TYPE pedido_status AS ENUM ('pendente', 'confirmado', 'preparando', 'pronto', 'entregue', 'cancelado');
  END IF;
END $$;

-- Create profiles table for admin authentication
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  email TEXT,
  role user_type NOT NULL DEFAULT 'profissional',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pedidos table
CREATE TABLE IF NOT EXISTS public.pedidos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_pedido TEXT NOT NULL UNIQUE DEFAULT (TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD((RANDOM() * 999)::TEXT, 3, '0')),
  cliente_nome TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_telefone TEXT,
  status pedido_status NOT NULL DEFAULT 'pendente',
  valor_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create receitas table
CREATE TABLE IF NOT EXISTS public.receitas (
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

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;

-- Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'nome', NEW.email),
    NEW.email,
    'profissional'::user_type
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create security function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all profiles" ON public.profiles
  FOR ALL USING (public.is_admin());

-- RLS policies for orders
CREATE POLICY "Admins can manage orders" ON public.pedidos
  FOR ALL USING (public.is_admin());

-- RLS policies for recipes  
CREATE POLICY "Anyone can view active recipes" ON public.receitas
  FOR SELECT USING (ativa = true);

CREATE POLICY "Admins can manage recipes" ON public.receitas
  FOR ALL USING (public.is_admin());

-- Insert admin user (update this with your admin email)
INSERT INTO public.profiles (user_id, nome, email, role, active) VALUES
  ('00000000-0000-0000-0000-000000000000', 'Admin', 'admin@brasfrut.com', 'admin', true)
ON CONFLICT (user_id) DO NOTHING;