import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CartItem } from "@/types/kitten";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export const Cart = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity }: CartProps) => {
  const { toast } = useToast();

  console.log("Cart rendered with", items.length, "items");

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    console.log("Processing checkout for items:", items);
    toast({
      title: "¡Adopción iniciada! 🎉",
      description: `Procesando la adopción de ${items.length} gatito(s). Te contactaremos pronto.`,
    });
    // Aquí iría la lógica real de checkout
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Adopción ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm">¡Agrega algunos gatitos adorables!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.breed}</p>
                      <p className="text-lg font-bold text-pink-600">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t pt-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-pink-600">${total.toLocaleString()}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3"
                size="lg"
              >
                Proceder con la Adopción
              </Button>
              <p className="text-xs text-gray-500 text-center">
                * Los precios incluyen vacunas, desparasitación y microchip
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};