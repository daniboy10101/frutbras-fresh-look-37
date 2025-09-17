import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Snowflake, Droplets, Fish } from "lucide-react";
import { Link } from "react-router-dom";

import categoryFrozen from "@/assets/category-frozen.jpg";
import categorySmoothies from "@/assets/category-smoothies.jpg";
import categoryFlavoredIce from "@/assets/category-flavored-ice.jpg";
import categoryPescados from "@/assets/category-pescados.jpg";

const ProductCategories = () => {
  const categories = [
    {
      icon: Droplets,
      title: "Polpas de Frutas",
      description: "Pacotes de 12 unidades - Caixa com 4 pacotes (48un total)",
      image: categorySmoothies,
      color: "text-primary",
      slug: "polpas-de-frutas",
      products: ["Polpa de Açaí", "Polpa de Manga", "Polpa de Caju", "Polpa de Goiaba"]
    },
    {
      icon: Snowflake, 
      title: "Frutas Congeladas",
      description: "Frutas congeladas vendidas por quilograma",
      image: categoryFrozen,
      color: "text-accent",
      slug: "frutas-congeladas",
      products: ["Açaí Congelado", "Mix de Frutas", "Frutas Picadas", "Smoothie Packs"]
    },
    {
      icon: Sparkles,
      title: "Gelo Saborizado",
      description: "Caixas com 30 unidades de gelo saborizado",
      image: categoryFlavoredIce,
      color: "text-secondary",
      slug: "gelo-saborizado",
      products: ["Gelo de Açaí", "Gelo de Manga", "Gelo de Caju", "Gelo Tropical"]
    },
    {
      icon: Fish,
      title: "Pescados",
      description: "Pescados frescos e congelados vendidos por quilograma",
      image: categoryPescados,
      color: "text-blue-600",
      slug: "pescados",
      products: ["Tilápia", "Salmão", "Camarão", "Polvo"]
    }
  ];

  return (
    <section className="py-20 bg-muted/30" id="products">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Nossos <span className="text-accent font-bold">Produtos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Produtos frescos e de qualidade para sua mesa. Distribuidora especializada 
            em polpas de frutas, pescados e produtos congelados.
          </p>
        </div>

        <div className="grid gap-6 max-w-6xl mx-auto lg:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title}
                className="group hover:shadow-strong transition-spring gradient-card border-border/50 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col">
                  {/* Image Section */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={`${category.title} - ${category.description} da Frutbras`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-background ${category.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl lg:text-2xl font-bold text-foreground">
                          {category.title}
                        </CardTitle>
                      </div>
                      <CardDescription className="text-muted-foreground text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {category.products.map((product) => (
                          <div key={product} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            {product}
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4">
                        <Link to={`/produtos/${category.slug}`}>
                          <Button 
                            size="lg"
                            className="w-full gradient-accent border-0 text-white shadow-medium hover:shadow-strong transition-spring group"
                          >
                            Ver Produtos
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button 
            size="lg" 
            className="gradient-accent border-0 text-white shadow-medium hover:shadow-strong transition-spring group"
          >
            Ver Catálogo Completo
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;