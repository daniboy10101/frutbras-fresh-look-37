import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle,
  Building2,
  Users,
  Truck,
  Shield,
  CheckCircle,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    interest: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `*Nova mensagem de contato*
    
*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Empresa:* ${formData.company}
*Interesse:* ${formData.interest}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/5564984417040?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Mensagem enviada!",
      description: "Você será direcionado para o WhatsApp para finalizar o envio.",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "R. José Veloso N°193\nJardim Adriana, Rio Verde - GO\nCEP: 75906-580, Brasil",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 64 8441-7040",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Mail,
      title: "E-mail",
      content: "contato@frutbras.com.br\nvendas@frutbras.com.br\nfrutbras.comercial@gmail.com",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Segunda à Sexta: 8h às 18h\nSábado: 8h às 12h\nDomingo: Fechado",
      color: "from-orange-500 to-red-500"
    }
  ];

  const services = [
    {
      icon: Building2,
      title: "Atacado",
      description: "Fornecimento para restaurantes, lanchonetes e comércios",
      features: ["Preços especiais", "Entrega programada", "Suporte dedicado"]
    },
    {
      icon: Users,
      title: "Varejo",
      description: "Produtos para consumidores finais com qualidade premium",
      features: ["Produtos frescos", "Embalagens adequadas", "Atendimento personalizado"]
    },
    {
      icon: Truck,
      title: "Delivery",
      description: "Entregamos em toda região com agilidade e segurança",
      features: ["Entrega rápida", "Produtos refrigerados", "Rastreamento"]
    }
  ];

  const features = [
    { icon: Shield, text: "15+ anos de experiência" },
    { icon: CheckCircle, text: "Produtos 100% naturais" },
    { icon: Star, text: "Qualidade certificada" },
    { icon: Truck, text: "Entrega garantida" }
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
              Entre em 
              <span className="text-secondary block">Contato</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 animate-slide-up">
              Estamos prontos para atender sua empresa com produtos de qualidade superior
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
                    <Icon className="w-4 h-4 mr-2" />
                    {feature.text}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-slide-left">
            <Card className="shadow-strong border-0">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-heading font-bold text-primary">
                  Solicite seu Orçamento
                </CardTitle>
                <CardDescription className="text-lg">
                  Preencha o formulário e receba uma proposta personalizada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-medium">Nome Completo *</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="transition-spring focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-medium">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="transition-spring focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-medium">Telefone *</Label>
                      <Input
                        id="phone"
                        placeholder="(00) 00000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                        className="transition-spring focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="font-medium">Empresa</Label>
                      <Input
                        id="company"
                        placeholder="Nome da sua empresa"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="transition-spring focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest" className="font-medium">Interesse Principal</Label>
                    <Select value={formData.interest} onValueChange={(value) => handleChange('interest', value)}>
                      <SelectTrigger className="transition-spring focus:scale-[1.02]">
                        <SelectValue placeholder="Selecione seu interesse" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="polpas">Polpas de Frutas</SelectItem>
                        <SelectItem value="congelados">Produtos Congelados</SelectItem>
                        <SelectItem value="frescos">Frutas Frescas</SelectItem>
                        <SelectItem value="mix">Mix de Frutas</SelectItem>
                        <SelectItem value="pescados">Pescados</SelectItem>
                        <SelectItem value="atacado">Compra no Atacado</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-medium">Assunto *</Label>
                    <Input
                      id="subject"
                      placeholder="Resumo do seu interesse"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      required
                      className="transition-spring focus:scale-[1.02]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-medium">Mensagem *</Label>
                    <Textarea
                      id="message"
                      placeholder="Descreva suas necessidades, quantidades, frequência de compra..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      className="transition-spring focus:scale-[1.02] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full gradient-accent text-white font-semibold transition-spring hover:scale-[1.02] shadow-medium hover:shadow-strong"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Services */}
          <div className="space-y-8 animate-slide-right">
            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-0 shadow-medium">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-lg mb-2">{info.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 text-center">
                Como Podemos Te Ajudar
              </h2>
              <div className="space-y-4">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Card key={index} className="group hover:shadow-strong transition-all duration-300 border-0 shadow-medium">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading font-semibold text-lg mb-2">{service.title}</h3>
                            <p className="text-muted-foreground mb-3">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Card className="gradient-accent text-white border-0 shadow-strong">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 animate-bounce-slow" />
                <h3 className="text-xl font-heading font-bold mb-2">
                  Prefere conversar diretamente?
                </h3>
                <p className="mb-6 text-white/90">
                  Chame no WhatsApp para um atendimento mais rápido
                </p>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-accent transition-spring"
                  asChild
                >
                  <a 
                    href="https://wa.me/5564984417040?text=Olá! Gostaria de falar sobre os produtos da Frutbras."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chamar no WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default ContactPage;