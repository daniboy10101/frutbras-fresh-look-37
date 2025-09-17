import { Check, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber?: string;
}

export const CartSuccessModal = ({ isOpen, onClose, orderNumber }: CartSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-primary">
            Pedido Enviado com Sucesso!
          </DialogTitle>
          <DialogDescription className="text-center space-y-2">
            <p>Seu pedido foi enviado para nossa equipe comercial.</p>
            <p className="font-medium text-foreground">
              Entraremos em contato em breve para finalizar os detalhes.
            </p>
            {orderNumber && (
              <p className="text-sm text-muted-foreground">
                Protocolo: {orderNumber}
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button onClick={onClose} className="w-full">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continuar Comprando
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};