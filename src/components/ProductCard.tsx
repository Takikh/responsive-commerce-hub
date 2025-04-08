
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="card-hover overflow-hidden h-full flex flex-col">
        <div className="relative h-60 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`h-full w-full object-cover object-center transition-all duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
            onClick={toggleFavorite}
          >
            <Heart
              className={`h-4 w-4 ${isFavorite ? "fill-destructive text-destructive" : ""}`}
            />
          </Button>
        </div>
        
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{product.name}</h3>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="mt-auto pt-4">
            <span className="font-semibold text-lg">
              {new Intl.NumberFormat('fr-DZ', { style: 'currency', currency: 'DZD' }).format(product.price * 145)}
            </span>
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <Button
            className="w-full gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" /> Ajouter au panier
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
