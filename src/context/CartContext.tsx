
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/lib/types';
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);
  
  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const addToCart = (product: Product, quantity = 1) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.product.id === product.id
      );
      
      if (existingItemIndex > -1) {
        // Product exists in cart, update quantity
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success(`Quantité mise à jour dans le panier`);
        return updatedItems;
      } else {
        // Product doesn't exist in cart, add new item
        toast.success(`${product.name} ajouté au panier`);
        return [...currentItems, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(currentItems => {
      const updatedItems = currentItems.filter(
        item => item.product.id !== productId
      );
      toast.success(`Produit retiré du panier`);
      return updatedItems;
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(currentItems => {
      const updatedItems = currentItems.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return updatedItems;
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success(`Panier vidé`);
  };
  
  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
