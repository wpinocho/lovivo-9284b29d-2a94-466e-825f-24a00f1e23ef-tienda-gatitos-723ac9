import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Kitten } from "@/types/kitten";
import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  kittens: Kitten[];
  onFilter: (filteredKittens: Kitten[]) => void;
}

export const FilterBar = ({ kittens, onFilter }: FilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  console.log("FilterBar rendered with filters:", { searchTerm, selectedBreed, selectedGender, priceRange });

  const breeds = Array.from(new Set(kittens.map(kitten => kitten.breed)));

  const applyFilters = () => {
    console.log("Applying filters...");
    let filtered = kittens;

    // Filtro por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(kitten =>
        kitten.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kitten.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kitten.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por raza
    if (selectedBreed !== "all") {
      filtered = filtered.filter(kitten => kitten.breed === selectedBreed);
    }

    // Filtro por género
    if (selectedGender !== "all") {
      filtered = filtered.filter(kitten => kitten.gender === selectedGender);
    }

    // Filtro por rango de precio
    if (priceRange !== "all") {
      switch (priceRange) {
        case "low":
          filtered = filtered.filter(kitten => kitten.price < 800);
          break;
        case "medium":
          filtered = filtered.filter(kitten => kitten.price >= 800 && kitten.price < 1200);
          break;
        case "high":
          filtered = filtered.filter(kitten => kitten.price >= 1200);
          break;
      }
    }

    console.log("Filtered results:", filtered.length, "kittens");
    onFilter(filtered);
  };

  const clearFilters = () => {
    console.log("Clearing all filters");
    setSearchTerm("");
    setSelectedBreed("all");
    setSelectedGender("all");
    setPriceRange("all");
    onFilter(kittens);
  };

  // Aplicar filtros automáticamente cuando cambien
  useState(() => {
    applyFilters();
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar gatitos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setTimeout(applyFilters, 300); // Debounce
            }}
            className="pl-10"
          />
        </div>

        <Select value={selectedBreed} onValueChange={(value) => {
          setSelectedBreed(value);
          setTimeout(applyFilters, 100);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las razas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las razas</SelectItem>
            {breeds.map(breed => (
              <SelectItem key={breed} value={breed}>{breed}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedGender} onValueChange={(value) => {
          setSelectedGender(value);
          setTimeout(applyFilters, 100);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los géneros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los géneros</SelectItem>
            <SelectItem value="Macho">Macho</SelectItem>
            <SelectItem value="Hembra">Hembra</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={(value) => {
          setPriceRange(value);
          setTimeout(applyFilters, 100);
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Todos los precios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los precios</SelectItem>
            <SelectItem value="low">Menos de $800</SelectItem>
            <SelectItem value="medium">$800 - $1,200</SelectItem>
            <SelectItem value="high">Más de $1,200</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={clearFilters} variant="outline" className="w-full">
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
};