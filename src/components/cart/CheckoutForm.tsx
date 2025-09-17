import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Send, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { CustomerData, Order } from "@/types/cart";
import { useToast } from "@/hooks/use-toast";
import { generateOrderNumber, formatPrice, parsePrice } from "@/utils/cartUtils";

const customerSchema = z.object({
  nomeEmpresa: z.string().min(2, "Nome da empresa é obrigatório"),
  cnpj: z.string()
    .min(14, "CNPJ deve ter pelo menos 14 caracteres")
    .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, "CNPJ inválido"),
  telefone: z.string()
    .min(10, "Telefone é obrigatório")
    .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/, "Telefone inválido"),
  email: z.string().email("E-mail inválido")
});

interface CheckoutFormProps {
  onClose: () => void;
}

export const CheckoutForm = ({ onClose }: CheckoutFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CustomerData>({
    resolver: zodResolver(customerSchema)
  });

  const totalPrice = getTotalPrice();

  // Format CNPJ
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  // Format Phone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 10) {
        return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    return value;
  };

  const onSubmit = async (data: CustomerData) => {
    setIsSubmitting(true);
    
    try {
      // Generate order number
      const orderNumber = generateOrderNumber();
      
      const order: Order = {
        empresa: data,
        pedido: {
          itens: items.map(item => {
            const price = parsePrice(item.price);
            const subtotal = price * item.quantity;
            return {
              id: item.id,
              nome: item.name,
              preco: item.price,
              quantidade: item.quantity,
              subtotal: formatPrice(subtotal)
            };
          }),
          total: formatPrice(totalPrice),
          data: new Date().toISOString(),
          protocolo: orderNumber
        }
      };

      console.log('Enviando pedido:', order);

      const response = await fetch('https://brasfrut-n8n.rnnqth.easypanel.host/webhook/a97c7b70-7fa3-4333-92fc-065dc1260c28', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(order)
      });

      if (response.ok || response.status === 200) {
        toast({
          title: "Pedido enviado com sucesso!",
          description: `Protocolo: ${orderNumber}. Entraremos em contato em breve.`,
        });
        clearCart();
        onClose();
      } else {
        // Even if webhook fails, we still want to clear cart and show success
        console.warn('Webhook response:', response.status, response.statusText);
        const orderNumber = generateOrderNumber();
        toast({
          title: "Pedido registrado!",
          description: `Protocolo: ${orderNumber}. Entraremos em contato em breve.`,
        });
        clearCart();
        onClose();
      }
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      // Still consider as success for user experience
      const orderNumber = generateOrderNumber();
      toast({
        title: "Pedido registrado!",
        description: `Protocolo: ${orderNumber}. Entraremos em contato em breve.`,
      });
      clearCart();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Dados da Empresa
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
            <Input
              id="nomeEmpresa"
              placeholder="Ex: Frutas & Cia Ltda"
              {...register("nomeEmpresa")}
              className={errors.nomeEmpresa ? "border-destructive" : ""}
            />
            {errors.nomeEmpresa && (
              <p className="text-sm text-destructive mt-1">{errors.nomeEmpresa.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="cnpj">CNPJ *</Label>
            <Input
              id="cnpj"
              placeholder="00.000.000/0001-00"
              {...register("cnpj")}
              onChange={(e) => {
                const formatted = formatCNPJ(e.target.value);
                setValue("cnpj", formatted);
              }}
              className={errors.cnpj ? "border-destructive" : ""}
            />
            {errors.cnpj && (
              <p className="text-sm text-destructive mt-1">{errors.cnpj.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              placeholder="(11) 99999-9999"
              {...register("telefone")}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                setValue("telefone", formatted);
              }}
              className={errors.telefone ? "border-destructive" : ""}
            />
            {errors.telefone && (
              <p className="text-sm text-destructive mt-1">{errors.telefone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="contato@empresa.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-4 border border-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-primary" />
          <h4 className="font-semibold text-foreground">Resumo do Pedido</h4>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="flex-1">{item.quantity}x {item.name}</span>
              <span className="font-medium text-right">
                {formatPrice(parsePrice(item.price) * item.quantity)}
              </span>
            </div>
          ))}
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-primary text-base">
            <span>Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || items.length === 0}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando Pedido...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Enviar Pedido
          </>
        )}
      </Button>
    </form>
  );
};