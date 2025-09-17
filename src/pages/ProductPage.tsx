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
import { SEOHead } from "@/components/seo/SEOHead";
import { productCategoryStructuredData, breadcrumbStructuredData } from "@/components/seo/StructuredData";
import { generateLandingPageKeywords } from "@/utils/seo";

import categorySmoothies from "@/assets/category-smoothies.jpg";
import categoryFrozen from "@/assets/category-frozen.jpg";
import categoryFlavoredIce from "@/assets/category-flavored-ice.jpg";
import categoryPescados from "@/assets/category-pescados.jpg";

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
      description: "Pacotes de 12 unidades - Caixa com 4 pacotes (48un total)",
      image: categorySmoothies,
      products: [
        {
          id: 1,
          name: "Polpa de Açaí (Pacote 12un)",
          price: "R$ 89,90",
          description: "Pacote com 12 unidades de polpa pura de açaí, rica em antioxidantes",
          image: categorySmoothies,
          rating: 4.8,
          inStock: true,
          unit: "pacote" as const
        },
        {
          id: 2,
          name: "Polpa de Manga (Pacote 12un)",
          price: "R$ 74,90",
          description: "Pacote com 12 unidades de polpa natural de manga, doce e refrescante",
          image: categorySmoothies,
          rating: 4.7,
          inStock: true,
          unit: "pacote" as const
        },
        {
          id: 3,
          name: "Polpa de Caju (Pacote 12un)",
          price: "R$ 85,40",
          description: "Pacote com 12 unidades de polpa de caju com sabor único e tropical",
          image: categorySmoothies,
          rating: 4.6,
          inStock: false,
          unit: "pacote" as const
        },
        {
          id: 4,
          name: "Polpa de Goiaba (Pacote 12un)",
          price: "R$ 82,80",
          description: "Pacote com 12 unidades de polpa cremosa de goiaba, ideal para vitaminas",
          image: categorySmoothies,
          rating: 4.9,
          inStock: true,
          unit: "pacote" as const
        }
      ]
    },
    "frutas-congeladas": {
      title: "Frutas Congeladas",
      description: "Frutas congeladas vendidas por quilograma",
      image: categoryFrozen,
      products: [
        {
          id: 5,
          name: "Açaí Congelado",
          price: "R$ 18,90",
          description: "Açaí congelado por kg, pronto para consumo",
          image: categoryFrozen,
          rating: 4.9,
          inStock: true,
          unit: "kg" as const
        },
        {
          id: 6,
          name: "Mix de Frutas",
          price: "R$ 16,50",
          description: "Mistura de frutas congeladas variadas por kg",
          image: categoryFrozen,
          rating: 4.7,
          inStock: true,
          unit: "kg" as const
        },
        {
          id: 7,
          name: "Frutas Picadas",
          price: "R$ 14,90",
          description: "Frutas cortadas e congeladas individualmente por kg",
          image: categoryFrozen,
          rating: 4.5,
          inStock: true,
          unit: "kg" as const
        },
        {
          id: 8,
          name: "Smoothie Packs",
          price: "R$ 22,90",
          description: "Pacotes prontos para smoothies saudáveis por kg",
          image: categoryFrozen,
          rating: 4.8,
          inStock: false,
          unit: "kg" as const
        }
      ]
    },
    "gelo-saborizado": {
      title: "Gelo Saborizado",
      description: "Caixas com 30 unidades de gelo saborizado",
      image: categoryFlavoredIce,
      products: [
        {
          id: 9,
          name: "Gelo de Açaí (Caixa 30un)",
          price: "R$ 58,90",
          description: "Caixa com 30 cubos de gelo saborizados com açaí natural",
          image: categoryFlavoredIce,
          rating: 4.6,
          inStock: true,
          unit: "caixa" as const
        },
        {
          id: 10,
          name: "Gelo de Manga (Caixa 30un)",
          price: "R$ 52,50",
          description: "Caixa com 30 cubos de gelo com sabor tropical de manga",
          image: categoryFlavoredIce,
          rating: 4.4,
          inStock: true,
          unit: "caixa" as const
        },
        {
          id: 11,
          name: "Gelo de Caju (Caixa 30un)",
          price: "R$ 55,20",
          description: "Caixa com 30 cubos de gelo com sabor autêntico de caju",
          image: categoryFlavoredIce,
          rating: 4.5,
          inStock: true,
          unit: "caixa" as const
        },
        {
          id: 12,
          name: "Gelo Tropical (Caixa 30un)",
          price: "R$ 61,90",
          description: "Caixa com 30 cubos de gelo com mix de sabores tropicais",
          image: categoryFlavoredIce,
          rating: 4.7,
          inStock: false,
          unit: "caixa" as const
        }
      ]
    },
    "pescados": {
      title: "Pescados",
      description: "Pescados frescos e congelados vendidos por quilograma",
      image: categoryPescados,
      products: [
        {
          id: 13,
          name: "Tilápia",
          price: "R$ 24,90",
          description: "Tilápia fresca de qualidade premium por kg",
          image: categoryPescados,
          rating: 4.8,
          inStock: true,
          unit: "kg" as const
        },
        {
          id: 14,
          name: "Salmão",
          price: "R$ 89,90",
          description: "Salmão fresco importado de alta qualidade por kg",
          image: categoryPescados,
          rating: 4.9,
          inStock: true,
          unit: "kg" as const
        },
        {
          id: 15,
          name: "Camarão",
          price: "R$ 65,90",
          description: "Camarão rosa fresco e descascado por kg",
          image: categoryPescados,
          rating: 4.7,
          inStock: true,
          unit: "kg" as const
        },
        {
          id: 16,
          name: "Polvo",
          price: "R$ 78,90",
          description: "Polvo fresco limpo e pronto para preparo por kg",
          image: categoryPescados,
          rating: 4.6,
          inStock: false,
          unit: "kg" as const
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
      quantity: quantity,
      unit: product.unit
    });
    
    // Reset quantity back to 1 after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  // SEO data generation
  const categoryKeywords = generateLandingPageKeywords(category || "");
  const breadcrumbs = [
    { name: "Início", url: "https://frutbras.com.br/" },
    { name: "Produtos", url: "https://frutbras.com.br/produtos" },
    { name: currentCategory.title, url: `https://frutbras.com.br/produtos/${category}` }
  ];
  
  const categoryStructuredData = [
    productCategoryStructuredData({
      name: currentCategory.title,
      description: currentCategory.description,
      products: currentCategory.products,
      url: `https://frutbras.com.br/produtos/${category}`
    }),
    breadcrumbStructuredData(breadcrumbs)
  ];

  const seoTitle = `${currentCategory.title} | Frutbras Atacado SP`;
  const seoDescription = `${currentCategory.description}. Qualidade garantida há 15 anos. Entrega em São Paulo e região. Solicite orçamento!`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={categoryKeywords}
        url={`https://frutbras.com.br/produtos/${category}`}
        structuredData={categoryStructuredData}
        category="food"
        businessType="distributor"
        localBusiness={true}
      />
      
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
            <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4 gap-1">
              <TabsTrigger value="polpas-de-frutas" asChild>
                <Link to="/produtos/polpas-de-frutas">Polpas</Link>
              </TabsTrigger>
              <TabsTrigger value="frutas-congeladas" asChild>
                <Link to="/produtos/frutas-congeladas">Frutas</Link>
              </TabsTrigger>
              <TabsTrigger value="gelo-saborizado" asChild>
                <Link to="/produtos/gelo-saborizado">Gelo</Link>
              </TabsTrigger>
              <TabsTrigger value="pescados" asChild>
                <Link to="/produtos/pescados">Pescados</Link>
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
                    <div className="space-y-1">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <div className="text-sm text-muted-foreground font-medium">
                        por {product.unit}
                      </div>
                    </div>
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
                    {product.inStock ? `Adicionar ${getProductQuantity(product.id)} ${product.unit}${getProductQuantity(product.id) > 1 ? 's' : ''}` : "Indisponível"}
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