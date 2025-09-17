import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";
import heroFruits from "@/assets/hero-fruits.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen gradient-hero flex items-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                Frutbras
                <span className="block text-secondary">Polpas de Frutas</span>
                <span className="block text-3xl lg:text-4xl font-medium">Naturais</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-lg">
                A melhor qualidade em polpas de frutas para sua empresa. 
                Produtos 100% naturais direto do campo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 group shadow-medium transition-spring"
                asChild
              >
                <a 
                  href="https://wa.me/5564984417040?text=Olá! Gostaria de ver o catálogo de produtos da Frutbras." 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Ver Catálogo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white bg-black/20 text-white hover:bg-white hover:text-primary transition-spring backdrop-blur-sm"
                asChild
              >
                <a 
                  href="https://wa.me/5564984417040?text=Olá! Gostaria de saber mais sobre os produtos da Frutbras." 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Saiba Mais
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-secondary">100%</div>
                <div className="text-sm text-white/80">Natural</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-secondary">30+</div>
                <div className="text-sm text-white/80">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-secondary">15</div>
                <div className="text-sm text-white/80">Anos</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Card */}
          <div className="animate-scale-in delay-300">
            <Card className="p-8 shadow-strong gradient-card border-0 animate-float">
              <div className="space-y-6">
                <div className="aspect-square rounded-xl overflow-hidden shadow-medium">
                  <img 
                    src={heroFruits} 
                    alt="Polpas de frutas naturais premium selecionadas da Frutbras - açaí, manga, caju e outras frutas brasileiras" 
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Frutas Premium Selecionadas
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Polpas, sucos e produtos derivados de frutas brasileiras com o mais alto 
                    padrão de qualidade. Perfeito para sua empresa.
                  </p>
                  
                  <Button 
                    className="w-full gradient-accent border-0 text-white shadow-medium hover:shadow-strong transition-spring"
                    asChild
                  >
                    <a 
                      href="https://wa.me/5564984417040?text=Olá! Gostaria de solicitar um orçamento para produtos da Frutbras." 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Solicitar Orçamento
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;