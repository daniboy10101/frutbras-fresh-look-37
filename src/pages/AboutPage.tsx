import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Award, 
  Users, 
  Truck, 
  Heart,
  Target,
  Eye,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Handshake,
  Clock,
  MapPin
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

const AboutPage = () => {
  const stats = [
    { number: "15+", label: "Anos de Experiência", icon: Clock },
    { number: "30+", label: "Tipos de Produtos", icon: Leaf },
    { number: "500+", label: "Clientes Satisfeitos", icon: Users },
    { number: "100%", label: "Produtos Naturais", icon: CheckCircle }
  ];

  const values = [
    {
      icon: Heart,
      title: "Paixão pela Qualidade",
      description: "Cada produto passa por rigoroso controle de qualidade para garantir o melhor para nossos clientes.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Trabalhamos com fornecedores locais e práticas sustentáveis para preservar o meio ambiente.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Handshake,
      title: "Parceria Duradoura",
      description: "Construímos relacionamentos sólidos e duradouros com nossos clientes e fornecedores.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Confiabilidade",
      description: "Entregas pontuais, produtos frescos e atendimento de excelência são nossa marca registrada.",
      color: "from-purple-500 to-violet-500"
    }
  ];

  const timeline = [
    {
      year: "2009",
      title: "Fundação",
      description: "Início das atividades em Rio Verde-GO com foco em polpas de frutas naturais"
    },
    {
      year: "2012",
      title: "Expansão",
      description: "Ampliação da linha de produtos e início das operações de delivery"
    },
    {
      year: "2016",
      title: "Certificação",
      description: "Obtenção de certificações de qualidade e segurança alimentar"
    },
    {
      year: "2020",
      title: "Modernização",
      description: "Investimento em tecnologia e modernização dos processos"
    },
    {
      year: "2024",
      title: "Atualidade",
      description: "Liderança regional em distribuição de produtos naturais e congelados"
    }
  ];

  const team = [
    {
      name: "Equipe Comercial",
      role: "Atendimento e Vendas",
      description: "Especialistas em atender suas necessidades com agilidade e profissionalismo"
    },
    {
      name: "Controle de Qualidade",
      role: "Garantia de Excelência",
      description: "Responsáveis por manter os mais altos padrões de qualidade em todos os produtos"
    },
    {
      name: "Logística",
      role: "Entrega Eficiente",
      description: "Equipe dedicada para garantir entregas rápidas e produtos sempre frescos"
    }
  ];

  const certifications = [
    "Certificação HACCP",
    "Registro no MAPA",
    "Alvará Sanitário",
    "ISO 9001 (em processo)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-secondary/30 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
              Nossa 
              <span className="text-secondary block">História</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 animate-slide-up">
              15 anos transformando frutas brasileiras em produtos de qualidade excepcional
            </p>
            <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Badge variant="secondary" className="px-6 py-3 text-lg font-semibold">
                <MapPin className="w-5 h-5 mr-2" />
                Uberlândia - Minas Gerais
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="animate-slide-left">
              <Card className="h-full gradient-card border-0 shadow-strong">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold">Missão</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Fornecer produtos naturais de alta qualidade, promovendo saúde e bem-estar 
                    através de frutas selecionadas e processos sustentáveis, construindo 
                    relacionamentos duradouros com nossos clientes.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="animate-slide-right">
              <Card className="h-full gradient-card border-0 shadow-strong">
                <CardContent className="p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold">Visão</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ser reconhecida como a principal distribuidora de produtos naturais e 
                    congelados da região Centro-Oeste, expandindo nossa presença e mantendo 
                    nossa excelência em qualidade e atendimento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-in">Nossos Valores</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Os princípios que guiam cada decisão e ação da Frutbras
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="flex gap-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${value.color} shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-heading font-bold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-in">Nossa Jornada</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              15 anos de crescimento e evolução constante
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary/20 rounded-full"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} animate-slide-up`} style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                            {item.year}
                          </Badge>
                          <h3 className="text-xl font-heading font-bold">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg group-hover:scale-125 transition-transform"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-in">Nossa Equipe</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Profissionais dedicados ao seu sucesso
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-4">{member.role}</Badge>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-in">Certificações</h2>
            <p className="text-xl text-muted-foreground animate-slide-up">
              Compromisso com qualidade e segurança
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {certifications.map((cert, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2 text-base font-semibold animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Award className="w-4 h-4 mr-2" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-6 animate-fade-in">
              Pronto para fazer parte da nossa história?
            </h2>
            <p className="text-xl text-white/90 mb-8 animate-slide-up">
              Junte-se aos centenas de clientes que confiam na qualidade Frutbras
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-accent transition-spring"
                asChild
              >
                <a 
                  href="https://wa.me/5564984417040?text=Olá! Gostaria de conhecer mais sobre a Frutbras e seus produtos."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Handshake className="w-5 h-5 mr-2" />
                  Fale Conosco
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-accent transition-spring"
                asChild
              >
                <a href="/contato">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Solicitar Orçamento
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default AboutPage;