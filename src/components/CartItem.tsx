
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b last:border-b-0">
      <div className="flex-shrink-0 w-20 h-20 bg-secondary rounded-md overflow-hidden">
        {isLoading && <div className="w-full h-full bg-secondary animate-pulse" />}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className="flex-1">
        <Link to={`/products/${product.id}`} className="hover:text-primary">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          {new Intl.NumberFormat('fr-DZ', { 
            style: 'currency',
            currency: 'DZD' 
          }).format(product.price * 145)}
        </p>
      </div>
      
      <div className="flex items-center justify-end space-x-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={handleDecrement}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-10 text-center">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={handleIncrement}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-destructive"
          onClick={handleRemove}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
