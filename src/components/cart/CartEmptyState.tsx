import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CartEmptyStateProps {
  onClose: () => void;
}

export const CartEmptyState = ({ onClose }: CartEmptyStateProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-foreground mb-2">
        Seu carrinho está vazio
      </h3>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Descubra nossos produtos frescos e saborosos. Adicione alguns itens ao seu carrinho para começar!
      </p>
      
      <div className="space-y-3 w-full max-w-xs">
        <Button onClick={onClose} className="w-full" size="lg">
          Explorar Produtos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Card className="bg-muted/30 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">💡 Dica</p>
            <p className="text-xs text-muted-foreground">
              Produtos adicionados são salvos automaticamente
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};