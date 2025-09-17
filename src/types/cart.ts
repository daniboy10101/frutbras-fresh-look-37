export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  inStock: boolean;
  unit: 'unidade' | 'pacote' | 'caixa' | 'kg';
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  unit: 'unidade' | 'pacote' | 'caixa' | 'kg';
}

export interface CustomerData {
  nomeEmpresa: string;
  cnpj: string;
  telefone: string;
  email: string;
}

export interface Order {
  empresa: CustomerData;
  pedido: {
    itens: Array<{
      id: number;
      nome: string;
      preco: string;
      quantidade: number;
      subtotal: string;
    }>;
    total: string;
    data: string;
    protocolo?: string;
  };
}