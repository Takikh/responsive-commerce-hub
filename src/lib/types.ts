
export type UserRole = 'customer' | 'owner';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  popularity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 'all' | 'electronics' | 'clothing' | 'books' | 'home' | 'beauty';
export type SortOption = 'price-asc' | 'price-desc' | 'popularity';
