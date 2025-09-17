import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "R. José Veloso N°193\nJardim Adriana, Rio Verde - GO\nCEP: 75906-580, Brasil"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 64 8441-7040"
    },
    {
      icon: Mail,
      title: "E-mail",
      content: "contato@frutbras.com.br\nvendas@frutbras.com.br\nfrutbras.comercial@gmail.com"
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Segunda à Sexta: 8h às 18h\nSábado: 8h às 12h"
    }
  ];

  const productCategories = [
    "Polpas de Frutas",
    "Frutas Frescas",
    "Produtos Congelados",
    "Frutas Desidratadas",
    "Sucos Naturais",
    "Mix de Frutas"
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-background mb-2">
                Frutbras
              </h3>
              <p className="text-background/80 text-sm">Alimentos Congelados</p>
            </div>
            
            <p className="text-background/90 leading-relaxed">
              Há mais de 15 anos oferecendo produtos de qualidade superior. 
              Especialistas em polpas de frutas, pescados e alimentos congelados.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className="border-background/30 text-background hover:bg-background hover:text-foreground transition-spring bg-background/10"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-background">Produtos</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category}>
                  <a 
                    href="#" 
                    className="text-background/80 hover:text-accent transition-smooth text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-background mb-1">{info.title}</h5>
                    <p className="text-background/80 text-sm leading-relaxed whitespace-pre-line">
                      {info.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/70 text-sm">
              © 2024 Frutbras. Todos os direitos reservados. Distribuidora de produtos frescos e naturais.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-background/70 hover:text-accent transition-smooth">
                Política de Privacidade
              </a>
              <a href="#" className="text-background/70 hover:text-accent transition-smooth">
                Termos de Uso
              </a>
              <a href="#" className="text-background/70 hover:text-accent transition-smooth">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;