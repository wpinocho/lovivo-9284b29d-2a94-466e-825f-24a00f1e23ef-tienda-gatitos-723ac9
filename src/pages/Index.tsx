import { useState } from "react";
import { Header } from "@/components/Header";
import { KittenCard } from "@/components/KittenCard";
import { Cart } from "@/components/Cart";
import { FilterBar } from "@/components/FilterBar";
import { kittens } from "@/data/kittens";
import { Kitten, CartItem } from "@/types/kitten";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filteredKittens, setFilteredKittens] = useState<Kitten[]>(kittens);

  console.log("Index component rendered with", filteredKittens.length, "kittens");

  const addToCart = (kitten: Kitten) => {
    console.log("Adding kitten to cart:", kitten.name);
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === kitten.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === kitten.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...kitten, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    console.log("Removing kitten from cart:", id);
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    console.log("Updating quantity for kitten:", id, "to", quantity);
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleFilter = (filtered: Kitten[]) => {
    console.log("Filtering kittens, found:", filtered.length);
    setFilteredKittens(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🐱 Tienda de Gatitos 🐱
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra tu compañero felino perfecto. Todos nuestros gatitos están listos para llenar tu hogar de amor y ronroneos.
          </p>
        </div>

        <FilterBar kittens={kittens} onFilter={handleFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredKittens.map((kitten) => (
            <KittenCard
              key={kitten.id}
              kitten={kitten}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {filteredKittens.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500">No se encontraron gatitos con esos criterios 😿</p>
          </div>
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;