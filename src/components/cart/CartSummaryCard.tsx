import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

export const CartSummaryCard = () => {
  const { items, getTotalPrice, getTotalItems, openCart } = useCart();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 animate-slide-up">
      <Card className="w-80 shadow-strong border-primary/20 bg-card/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-base">
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              Carrinho
            </span>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {totalItems} {totalItems === 1 ? 'item' : 'itens'}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {items.slice(-3).map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="flex-1 line-clamp-1">{item.quantity}x {item.name}</span>
                <span className="font-medium text-primary">
                  R$ {(parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{items.length - 3} outros itens
              </p>
            )}
          </div>
          
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold text-primary mb-3">
              <span>Total:</span>
              <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            
            <Button onClick={openCart} className="w-full" size="sm">
              Ver Carrinho Completo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};