import { useState, useEffect } from "react";
import { Check, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/types/cart";

interface CartNotificationProps {
  item: CartItem | null;
  isVisible: boolean;
  onClose: () => void;
}

export const CartNotification = ({ item, isVisible, onClose }: CartNotificationProps) => {
  const { openCart } = useCart();
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !item) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-left">
      <Card className="p-4 shadow-strong bg-card border-primary/20 min-w-[320px]">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm">
              Adicionado ao carrinho!
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
              {item.quantity} {item.unit}{item.quantity > 1 ? 's' : ''} - {item.name}
            </p>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={onClose}
                className="h-7 px-2 text-xs"
              >
                Continuar
              </Button>
              <Button 
                size="sm" 
                onClick={() => {
                  openCart();
                  onClose();
                }}
                className="h-7 px-2 text-xs"
              >
                <ShoppingCart className="mr-1 h-3 w-3" />
                Ver Carrinho
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </Card>
    </div>
  );
};