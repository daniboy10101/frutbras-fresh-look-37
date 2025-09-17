import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Snowflake, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

import categoryFrozen from "@/assets/category-frozen.jpg";
import categorySmoothies from "@/assets/category-smoothies.jpg";
import categoryFlavoredIce from "@/assets/category-flavored-ice.jpg";

const ProductCategories = () => {
  const categories = [
    {
      icon: Droplets,
      title: "Polpas de Frutas",
      description: "Polpas 100% naturais extraídas de frutas selecionadas",
      image: categorySmoothies,
      color: "text-primary",
      slug: "polpas-de-frutas",
      products: ["Polpa de Açaí", "Polpa de Manga", "Polpa de Caju", "Polpa de Goiaba"]
    },
    {
      icon: Snowflake, 
      title: "Frutas Congeladas",
      description: "Frutas congeladas mantendo todo o sabor e nutrientes",
      image: categoryFrozen,
      color: "text-accent",
      slug: "frutas-congeladas",
      products: ["Açaí Congelado", "Mix de Frutas", "Frutas Picadas", "Smoothie Packs"]
    },
    {
      icon: Sparkles,
      title: "Gelo Saborizado",
      description: "Gelos saborizados com frutas naturais para refrescar",
      image: categoryFlavoredIce,
      color: "text-secondary",
      slug: "gelo-saborizado",
      products: ["Gelo de Açaí", "Gelo de Manga", "Gelo de Caju", "Gelo Tropical"]
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

        <div className="space-y-6 max-w-4xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.title}
                className="group hover:shadow-strong transition-spring gradient-card border-border/50 overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Image Section */}
                  <div className="lg:w-1/3 aspect-video lg:aspect-square overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={`${category.title} - ${category.description} da Frutbras`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-spring"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="lg:w-2/3 flex flex-col">
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
                            className="w-full lg:w-auto gradient-accent border-0 text-white shadow-medium hover:shadow-strong transition-spring group"
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