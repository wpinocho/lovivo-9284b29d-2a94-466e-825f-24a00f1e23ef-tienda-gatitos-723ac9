import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Kitten } from "@/types/kitten";
import { useState } from "react";

interface KittenCardProps {
  kitten: Kitten;
  onAddToCart: (kitten: Kitten) => void;
}

export const KittenCard = ({ kitten, onAddToCart }: KittenCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log("Rendering KittenCard for:", kitten.name);

  const handleAddToCart = () => {
    console.log("Adding to cart:", kitten.name);
    onAddToCart(kitten);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white">
      <CardHeader className="p-0 relative overflow-hidden rounded-t-lg">
        <div className="relative h-64 bg-gray-200">
          <img
            src={kitten.image}
            alt={kitten.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isLiked ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-600'
            } hover:bg-pink-500 hover:text-white transition-colors`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <div className="absolute top-2 left-2">
            <Badge variant={kitten.available ? "default" : "secondary"}>
              {kitten.available ? "Disponible" : "Reservado"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">{kitten.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Raza:</span>
            <span className="font-medium">{kitten.breed}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Edad:</span>
            <span className="font-medium">{kitten.age}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Género:</span>
            <span className="font-medium">{kitten.gender}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Color:</span>
            <span className="font-medium">{kitten.color}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {kitten.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {kitten.personality.map((trait) => (
            <Badge key={trait} variant="outline" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600">
            ${kitten.price.toLocaleString()}
          </span>
          {kitten.vaccinated && (
            <Badge variant="default" className="bg-green-500">
              Vacunado ✓
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!kitten.available}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {kitten.available ? "Adoptar" : "No disponible"}
        </Button>
      </CardFooter>
    </Card>
  );
};