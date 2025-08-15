import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  console.log("Header rendered with cart items count:", cartItemsCount);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold text-gray-800">Gatitos Felices</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Inicio
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Gatitos
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Cuidados
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
              Contacto
            </a>
          </nav>

          <Button
            onClick={onCartClick}
            variant="outline"
            size="sm"
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};