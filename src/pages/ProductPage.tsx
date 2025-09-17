import { useParams, Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ShoppingCart, Star, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useCartNotification } from "@/hooks/useCartNotification";
import { CartNotification } from "@/components/cart/CartNotification";
import { CartSummaryCard } from "@/components/cart/CartSummaryCard";
import { useState } from "react";

import categorySmoothies from "@/assets/category-smoothies.jpg";
import categoryFrozen from "@/assets/category-frozen.jpg";
import categoryFlavoredIce from "@/assets/category-flavored-ice.jpg";

const ProductPage = () => {
  const { category } = useParams();
  const { addToCart, items } = useCart();
  const { toast } = useToast();
  const { notification, showNotification, hideNotification } = useCartNotification();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getProductQuantity = (productId: number) => {
    return quantities[productId] || 1;
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity >= 1) {
      setQuantities(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const getCartQuantity = (productId: number) => {
    const cartItem = items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const categories = {
    "polpas-de-frutas": {
      title: "Polpas de Frutas",
      description: "Polpas 100% naturais extraídas de frutas selecionadas",
      image: categorySmoothies,
      products: [
        {
          id: 1,
          name: "Polpa de Açaí",
          price: "R$ 15,90",
          description: "Polpa pura de açaí, rica em antioxidantes e vitaminas",
          image: categorySmoothies,
          rating: 4.8,
          inStock: true
        },
        {
          id: 2,
          name: "Polpa de Manga",
          price: "R$ 12,50",
          description: "Polpa natural de manga, doce e refrescante",
          image: categorySmoothies,
          rating: 4.7,
          inStock: true
        },
        {
          id: 3,
          name: "Polpa de Caju",
          price: "R$ 14,20",
          description: "Polpa de caju com sabor único e tropical",
          image: categorySmoothies,
          rating: 4.6,
          inStock: false
        },
        {
          id: 4,
          name: "Polpa de Goiaba",
          price: "R$ 13,80",
          description: "Polpa cremosa de goiaba, ideal para vitaminas",
          image: categorySmoothies,
          rating: 4.9,
          inStock: true
        }
      ]
    },
    "frutas-congeladas": {
      title: "Frutas Congeladas",
      description: "Frutas congeladas mantendo todo o sabor e nutrientes",
      image: categoryFrozen,
      products: [
        {
          id: 5,
          name: "Açaí Congelado",
          price: "R$ 18,90",
          description: "Açaí congelado em cubos, pronto para consumo",
          image: categoryFrozen,
          rating: 4.9,
          inStock: true
        },
        {
          id: 6,
          name: "Mix de Frutas",
          price: "R$ 16,50",
          description: "Mistura de frutas congeladas variadas",
          image: categoryFrozen,
          rating: 4.7,
          inStock: true
        },
        {
          id: 7,
          name: "Frutas Picadas",
          price: "R$ 14,90",
          description: "Frutas cortadas e congeladas individualmente",
          image: categoryFrozen,
          rating: 4.5,
          inStock: true
        },
        {
          id: 8,
          name: "Smoothie Packs",
          price: "R$ 22,90",
          description: "Pacotes prontos para smoothies saudáveis",
          image: categoryFrozen,
          rating: 4.8,
          inStock: false
        }
      ]
    },
    "gelo-saborizado": {
      title: "Gelo Saborizado",
      description: "Gelos saborizados com frutas naturais para refrescar",
      image: categoryFlavoredIce,
      products: [
        {
          id: 9,
          name: "Gelo de Açaí",
          price: "R$ 8,90",
          description: "Cubos de gelo saborizados com açaí natural",
          image: categoryFlavoredIce,
          rating: 4.6,
          inStock: true
        },
        {
          id: 10,
          name: "Gelo de Manga",
          price: "R$ 7,50",
          description: "Gelo com sabor tropical de manga",
          image: categoryFlavoredIce,
          rating: 4.4,
          inStock: true
        },
        {
          id: 11,
          name: "Gelo de Caju",
          price: "R$ 8,20",
          description: "Cubos de gelo com sabor autêntico de caju",
          image: categoryFlavoredIce,
          rating: 4.5,
          inStock: true
        },
        {
          id: 12,
          name: "Gelo Tropical",
          price: "R$ 9,90",
          description: "Mix de sabores tropicais em cubos de gelo",
          image: categoryFlavoredIce,
          rating: 4.7,
          inStock: false
        }
      ]
    }
  };

  const currentCategory = categories[category as keyof typeof categories];

  if (!currentCategory) {
    return <Navigate to="/not-found" replace />;
  }

  const handleAddToCart = (product: any) => {
    if (!product.inStock) return;
    
    const quantity = getProductQuantity(product.id);
    addToCart(product, quantity);
    
    showNotification({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
    
    // Reset quantity back to 1 after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
            <span className="text-muted-foreground">›</span>
            <span className="text-foreground font-medium">Produtos</span>
            <span className="text-muted-foreground">›</span>
            <span className="text-primary font-medium">{currentCategory.title}</span>
          </div>

          {/* Category Navigation */}
          <Tabs value={category} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="polpas-de-frutas" asChild>
                <Link to="/produtos/polpas-de-frutas">Polpas de Frutas</Link>
              </TabsTrigger>
              <TabsTrigger value="frutas-congeladas" asChild>
                <Link to="/produtos/frutas-congeladas">Frutas Congeladas</Link>
              </TabsTrigger>
              <TabsTrigger value="gelo-saborizado" asChild>
                <Link to="/produtos/gelo-saborizado">Gelo Saborizado</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Category Header */}
          <div className="mb-12 text-center">
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden mb-8 shadow-medium">
              <img 
                src={currentCategory.image} 
                alt={currentCategory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">{currentCategory.title}</h1>
                  <p className="text-xl lg:text-2xl text-white/90 max-w-2xl">
                    {currentCategory.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCategory.products.map((product) => (
              <Card key={product.id} className="group hover:shadow-strong transition-spring gradient-card border-border/50 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                  />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-bold text-foreground line-clamp-1">
                      {product.name}
                    </CardTitle>
                    {!product.inStock && (
                      <Badge variant="destructive" className="text-xs">Esgotado</Badge>
                    )}
                    {product.inStock && (
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Disponível</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  
                  <CardDescription className="text-muted-foreground text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    {getCartQuantity(product.id) > 0 && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {getCartQuantity(product.id)} no carrinho
                      </Badge>
                    )}
                  </div>
                  
                  {product.inStock && (
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, getProductQuantity(product.id) - 1)}
                        disabled={getProductQuantity(product.id) <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <div className="flex items-center justify-center min-w-[50px]">
                        <span className="font-semibold text-lg">
                          {getProductQuantity(product.id)}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, getProductQuantity(product.id) + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full transition-spring"
                    disabled={!product.inStock}
                    variant={product.inStock ? "default" : "secondary"}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="bg-muted/30 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Não encontrou o que procura?
              </h3>
              <p className="text-muted-foreground mb-6">
                Entre em contato conosco para produtos personalizados ou encomendas especiais.
              </p>
              <Button size="lg" className="gradient-accent border-0 text-white shadow-medium hover:shadow-strong transition-spring">
                Fale Conosco
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <CartNotification 
        item={notification.item}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      
      <CartSummaryCard />
      
      <Footer />
    </div>
  );
};

export default ProductPage;