-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  cargo TEXT,
  loja_id UUID,
  avatar_url TEXT,
  telefone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create lojas table
CREATE TABLE public.lojas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  cep TEXT,
  telefone TEXT,
  email TEXT,
  status TEXT NOT NULL DEFAULT 'ativa',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create produtos table
CREATE TABLE public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  marca TEXT NOT NULL,
  modelo TEXT,
  aro TEXT NOT NULL,
  largura TEXT NOT NULL,
  altura TEXT NOT NULL,
  categoria TEXT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  custo DECIMAL(10,2),
  descricao TEXT,
  codigo_barras TEXT,
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create estoque table
CREATE TABLE public.estoque (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,
  loja_id UUID NOT NULL REFERENCES public.lojas(id) ON DELETE CASCADE,
  quantidade INTEGER NOT NULL DEFAULT 0,
  estoque_minimo INTEGER NOT NULL DEFAULT 0,
  localizacao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(produto_id, loja_id)
);

-- Create vendas table
CREATE TABLE public.vendas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_venda TEXT NOT NULL,
  cliente_nome TEXT NOT NULL,
  cliente_cpf TEXT,
  cliente_telefone TEXT,
  cliente_email TEXT,
  vendedor_id UUID NOT NULL REFERENCES public.profiles(id),
  loja_id UUID NOT NULL REFERENCES public.lojas(id),
  valor_total DECIMAL(10,2) NOT NULL,
  desconto DECIMAL(10,2) DEFAULT 0,
  valor_final DECIMAL(10,2) NOT NULL,
  forma_pagamento TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'finalizada',
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create vendas_itens table
CREATE TABLE public.vendas_itens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venda_id UUID NOT NULL REFERENCES public.vendas(id) ON DELETE CASCADE,
  produto_id UUID NOT NULL REFERENCES public.produtos(id),
  quantidade INTEGER NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,
  desconto DECIMAL(10,2) DEFAULT 0,
  valor_total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prospeccoes table
CREATE TABLE public.prospeccoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  veiculo TEXT,
  interesse TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'novo',
  vendedor_id UUID REFERENCES public.profiles(id),
  loja_id UUID NOT NULL REFERENCES public.lojas(id),
  observacoes TEXT,
  data_contato TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create configuracoes table
CREATE TABLE public.configuracoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chave TEXT NOT NULL UNIQUE,
  valor TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'string',
  descricao TEXT,
  categoria TEXT NOT NULL DEFAULT 'geral',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key for profiles
ALTER TABLE public.profiles ADD CONSTRAINT fk_profiles_loja 
  FOREIGN KEY (loja_id) REFERENCES public.lojas(id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lojas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estoque ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendas_itens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospeccoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for other tables (users can access data from their loja)
CREATE POLICY "Users can view lojas" ON public.lojas
  FOR SELECT USING (true);

CREATE POLICY "Users can view produtos" ON public.produtos
  FOR SELECT USING (true);

CREATE POLICY "Users can manage produtos" ON public.produtos
  FOR ALL USING (true);

CREATE POLICY "Users can view estoque from their loja" ON public.estoque
  FOR SELECT USING (
    loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage estoque from their loja" ON public.estoque
  FOR ALL USING (
    loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view vendas from their loja" ON public.vendas
  FOR SELECT USING (
    loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage vendas from their loja" ON public.vendas
  FOR ALL USING (
    loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view vendas_itens from their loja vendas" ON public.vendas_itens
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.vendas v 
      WHERE v.id = venda_id 
      AND v.loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage vendas_itens from their loja vendas" ON public.vendas_itens
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.vendas v 
      WHERE v.id = venda_id 
      AND v.loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Users can view prospeccoes from their loja" ON public.prospeccoes
  FOR SELECT USING (
    loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage prospeccoes from their loja" ON public.prospeccoes
  FOR ALL USING (
    loja_id = (SELECT loja_id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view configuracoes" ON public.configuracoes
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage configuracoes" ON public.configuracoes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND cargo = 'admin'
    )
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lojas_updated_at
  BEFORE UPDATE ON public.lojas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_produtos_updated_at
  BEFORE UPDATE ON public.produtos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_estoque_updated_at
  BEFORE UPDATE ON public.estoque
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vendas_updated_at
  BEFORE UPDATE ON public.vendas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prospeccoes_updated_at
  BEFORE UPDATE ON public.prospeccoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_configuracoes_updated_at
  BEFORE UPDATE ON public.configuracoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some initial data
INSERT INTO public.lojas (nome, endereco, cidade, estado, cep, telefone, email) VALUES
  ('PneuStore Centro', 'Rua das Flores, 123', 'São Paulo', 'SP', '01234-567', '(11) 1234-5678', 'centro@pneustore.com'),
  ('PneuStore Shopping', 'Av. Paulista, 456', 'São Paulo', 'SP', '01311-000', '(11) 8765-4321', 'shopping@pneustore.com');

INSERT INTO public.produtos (nome, marca, modelo, aro, largura, altura, categoria, preco, custo) VALUES
  ('Pneu Aro 15 195/65', 'Michelin', 'Energy XM2', '15', '195', '65', 'Passeio', 299.90, 199.90),
  ('Pneu Aro 16 205/55', 'Bridgestone', 'Turanza T005', '16', '205', '55', 'Passeio', 349.90, 229.90),
  ('Pneu Aro 17 225/45', 'Continental', 'ContiPremiumContact', '17', '225', '45', 'Esportivo', 449.90, 299.90);

INSERT INTO public.configuracoes (chave, valor, categoria, descricao) VALUES
  ('meta_vendas_mensal', '50000', 'vendas', 'Meta de vendas mensal em reais'),
  ('ticket_medio_objetivo', '800', 'vendas', 'Ticket médio objetivo em reais'),
  ('estoque_minimo_geral', '5', 'estoque', 'Quantidade mínima geral de estoque'),
  ('comissao_vendedor', '5', 'vendas', 'Percentual de comissão do vendedor');