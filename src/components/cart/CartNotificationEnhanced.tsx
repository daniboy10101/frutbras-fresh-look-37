import { useEffect, useState } from 'react';
import { CheckCircle, ShoppingCart, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CartNotificationEnhancedProps {
  isVisible: boolean;
  productName: string;
  onClose: () => void;
  onViewCart: () => void;
}

export const CartNotificationEnhanced = ({
  isVisible,
  productName,
  onClose,
  onViewCart
}: CartNotificationEnhancedProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <Card 
        className={cn(
          "gradient-card shadow-strong border-primary/20 p-4 transition-all duration-300",
          isExiting ? "animate-slide-out-right opacity-0" : "animate-slide-in-right"
        )}
      >
        <div className="flex items-start gap-3">
          <div className="p-1 rounded-full bg-primary/10">
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 space-y-2">
            <p className="font-semibold text-foreground text-sm">
              Produto adicionado!
            </p>
            <p className="text-muted-foreground text-xs">
              {productName} foi adicionado ao seu carrinho
            </p>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                className="h-7 text-xs gradient-accent border-0 text-white"
                onClick={() => {
                  onViewCart();
                  handleClose();
                }}
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Ver Carrinho
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={handleClose}
              >
                Continuar
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-5000 ease-linear"
            style={{ 
              width: isExiting ? '0%' : '100%',
              transition: isExiting ? 'width 0.3s ease-out' : 'width 5s linear'
            }}
          />
        </div>
      </Card>
    </div>
  );
};