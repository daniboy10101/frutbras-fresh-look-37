import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Frown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/seo/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestedPages = [
    { name: "Início", href: "/", icon: Home },
    { name: "Produtos", href: "/#products", icon: Search },
    { name: "Sobre", href: "/sobre", icon: Home },
    { name: "Contato", href: "/contato", icon: Home },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead 
        title="Página não encontrada - Frutbras"
        description="A página que você procura não foi encontrada. Volte para a página inicial da Frutbras."
      />
      
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center">
          <Card className="gradient-card shadow-strong border-0 p-8 animate-scale-in">
            <CardContent className="space-y-8">
              {/* 404 Visual */}
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 rounded-full gradient-hero flex items-center justify-center mb-6">
                  <Frown className="w-12 h-12 text-white" />
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-display font-bold text-primary">
                  404
                </h1>
                
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Oops! Página não encontrada
                </h2>
                
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  A página que você está procurando pode ter sido removida, 
                  renomeada ou está temporariamente indisponível.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="gradient-accent border-0 text-white shadow-medium hover:shadow-strong transition-spring group"
                  asChild
                >
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Voltar ao Início
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Página Anterior
                </Button>
              </div>

              {/* Suggested Pages */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Páginas que podem interessar:
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {suggestedPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <Link
                        key={page.name}
                        to={page.href}
                        className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm font-medium hover:text-primary"
                      >
                        <Icon className="w-4 h-4" />
                        {page.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
