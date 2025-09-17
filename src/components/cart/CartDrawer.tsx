import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "./CartItem";
import { CheckoutForm } from "./CheckoutForm";
import { CartEmptyState } from "./CartEmptyState";
import { useState } from "react";

export const CartDrawer = () => {
  const { isOpen, closeCart, items, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  
  const totalPrice = getTotalPrice();
  const hasItems = items.length > 0;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCloseDrawer = () => {
    setShowCheckout(false);
    closeCart();
  };

  return (
    <Drawer open={isOpen} onOpenChange={closeCart}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader className="border-b border-border/50 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-primary" />
                {hasItems && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-primary-foreground font-bold">
                      {items.length > 9 ? '9+' : items.length}
                    </span>
                  </div>
                )}
              </div>
              <DrawerTitle className="text-lg font-bold">Carrinho de Compras</DrawerTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCloseDrawer} className="hover:bg-destructive/10 hover:text-destructive">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DrawerDescription className="text-left">
            {hasItems 
              ? `${items.length} ${items.length === 1 ? 'produto' : 'produtos'} • Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`
              : 'Seu carrinho está vazio. Adicione produtos para continuar.'
            }
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden">
          {showCheckout ? (
            <div className="p-6">
              <Button
                variant="ghost"
                className="mb-4"
                onClick={() => setShowCheckout(false)}
              >
                ← Voltar ao Carrinho
              </Button>
              <CheckoutForm onClose={handleCloseDrawer} />
            </div>
          ) : (
            <>
              {hasItems ? (
                <>
                  <ScrollArea className="flex-1 p-4 max-h-[calc(90vh-300px)]">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <CartItem key={`${item.id}-${item.quantity}`} item={item} />
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="border-t border-border/50 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearCart}
                        className="text-destructive hover:text-destructive"
                      >
                        Limpar Carrinho
                      </Button>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold text-primary">
                          R$ {totalPrice.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button
                      onClick={handleCheckout}
                      className="w-full"
                      size="lg"
                    >
                      Finalizar Pedido
                    </Button>
                  </div>
                </>
              ) : (
                <CartEmptyState onClose={handleCloseDrawer} />
              )}
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};