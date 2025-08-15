export interface Kitten {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: number;
  image: string;
  description: string;
  personality: string[];
  color: string;
  gender: 'Macho' | 'Hembra';
  vaccinated: boolean;
  available: boolean;
}

export interface CartItem extends Kitten {
  quantity: number;
}