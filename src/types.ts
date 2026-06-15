export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Suits" | "Watches" | "Leather" | "Accessories";
  subCategory?: string;
  rating: number;
  featured: boolean;
  optionsLabel: string;
  options: string[];
  fullDescription: string;
  highlights: string[];
  specifications: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export interface AtelierLocation {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface VIPBenefit {
  id: string;
  title: string;
  description: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}
