import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Package, 
  ChefHat, 
  Settings,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, isAdmin, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      toast.error('Acesso negado. Você não tem permissões de administrador.');
      navigate('/');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logout realizado com sucesso!');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const statsCards = [
    {
      title: "Vendas do Mês",
      value: "R$ 12.450",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Pedidos Hoje",
      value: "23",
      change: "+5%",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Produtos Ativos",
      value: "156",
      change: "+2%",
      icon: Package,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+0.5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Dashboard Administrativo - Brasfrut"
        description="Painel de controle administrativo do Brasfrut para gestão de vendas, produtos e pedidos."
        keywords="brasfrut, dashboard, admin, vendas, produtos, pedidos"
      />
      
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
            <p className="text-muted-foreground">Bem-vindo, {user.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Receitas
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Pedidos</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os pedidos do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Pedidos em Desenvolvimento</h3>
                  <p className="text-muted-foreground mb-4">
                    O sistema de pedidos está sendo implementado.
                  </p>
                  <Button disabled>
                    Visualizar Pedidos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Produtos</CardTitle>
                <CardDescription>
                  Adicione, edite e remova produtos do catálogo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Catálogo de Produtos</h3>
                  <p className="text-muted-foreground mb-4">
                    Gerencie todo o catálogo de frutas e produtos.
                  </p>
                  <Button disabled>
                    Gerenciar Produtos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Receitas</CardTitle>
                <CardDescription>
                  Crie e edite receitas para o blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Receitas e Conteúdo</h3>
                  <p className="text-muted-foreground mb-4">
                    Crie receitas incríveis para engajar seus clientes.
                  </p>
                  <Button disabled>
                    Gerenciar Receitas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Configure webhooks, emails e outras integrações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Webhook URL</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Configure o endpoint para receber notificações de pedidos
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          Configurar Webhook
                        </Button>
                      </Card>
                      
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Notificações por Email</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Configure as notificações automáticas por email
                        </p>
                        <Button variant="outline" size="sm" disabled>
                          Configurar Emails
                        </Button>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}