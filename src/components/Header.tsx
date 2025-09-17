import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartIcon } from "@/components/cart/CartIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "#products" },
    { name: "Receitas", href: "/receitas" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-8">
          <h1 className="text-2xl font-display font-bold text-primary">
            Frutbras
          </h1>
          <p className="text-xs text-muted-foreground">Alimentos Congelados</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {navigationItems.map((item) => {
            if (item.href.startsWith('#')) {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </button>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                className="text-foreground hover:text-primary transition-smooth relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <CartIcon />
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        )}
      >
        <nav className="container py-4 space-y-4">
          {navigationItems.map((item) => {
            if (item.href.startsWith('#')) {
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="block text-foreground hover:text-primary transition-smooth w-full text-left"
                >
                  {item.name}
                </button>
              );
            }
            return (
              <Link
                key={item.name}
                to={item.href}
                className="block text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="flex items-center space-x-2 pt-4 border-t border-border">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <CartIcon />
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;