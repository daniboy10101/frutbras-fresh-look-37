import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Truck, Users, Heart, Shield, Leaf } from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Produtos certificados com os mais altos padrões de qualidade"
    },
    {
      icon: Truck,
      title: "Entrega Garantida",
      description: "Logística especializada para manter a cadeia de frio"
    },
    {
      icon: Users,
      title: "Atendimento Personalizado",
      description: "Equipe especializada para atender suas necessidades"
    },
    {
      icon: Heart,
      title: "Produtos Saudáveis",
      description: "100% naturais, sem conservantes ou aditivos artificiais"
    },
    {
      icon: Shield,
      title: "Segurança Alimentar",
      description: "Rigoroso controle de qualidade em todas as etapas"
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Compromisso com práticas ambientalmente responsáveis"
    }
  ];

  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Sobre a Frutbras
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Tradição e <span className="text-accent font-bold">Qualidade</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Há mais de 15 anos no mercado, a Frutbras é referência em distribuição de 
            polpas de frutas, pescados e produtos congelados, sempre priorizando a 
            qualidade e satisfação dos nossos clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={benefit.title}
                className="group hover:shadow-medium transition-spring gradient-card border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center gap-8 p-8 rounded-2xl gradient-card shadow-medium">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">15+</div>
              <div className="text-sm text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">1000+</div>
              <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">Produtos Naturais</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;