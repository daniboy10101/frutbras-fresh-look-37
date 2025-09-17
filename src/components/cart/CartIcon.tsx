import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

export const CartIcon = () => {
  const { getTotalItems, openCart } = useCart();
  const totalItems = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative hover:bg-primary/10 transition-colors"
      onClick={openCart}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold animate-scale-in"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};