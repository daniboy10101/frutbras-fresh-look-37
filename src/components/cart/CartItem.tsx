import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
  const subtotal = price * item.quantity;

  return (
    <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg bg-card/50">
      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 space-y-1">
        <h4 className="font-medium text-sm text-foreground line-clamp-1">
          {item.name}
        </h4>
        <p className="text-sm text-muted-foreground">
          {item.price} cada
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <Badge variant="secondary" className="px-2 py-1 text-sm font-medium">
              {item.quantity}
            </Badge>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-sm text-primary">
          R$ {subtotal.toFixed(2).replace('.', ',')}
        </p>
      </div>
    </div>
  );
};