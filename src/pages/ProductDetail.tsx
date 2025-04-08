import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      }
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié dans le presse-papier");
    }
  };
  
  if (isLoading) {
    return (
      <div>
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-xl" />
          
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            
            <Skeleton className="h-12 w-1/3" />
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Produit non trouvé</h2>
        <p className="text-muted-foreground mb-6">
          Le produit que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button onClick={() => navigate("/products")}>
          Voir tous les produits
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="w-4 h-4 mr-2" /> Retour
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-xl overflow-hidden border aspect-square bg-secondary/30">
          {!imageLoaded && <div className="absolute inset-0 bg-secondary animate-pulse" />}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.popularity / 2)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {product.popularity} avis
              </span>
            </div>
          </div>
          
          <div className="text-3xl font-bold">
            {new Intl.NumberFormat('fr-DZ', {
              style: 'currency',
              currency: 'DZD',
            }).format(product.price * 145)}
          </div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </Button>
              </div>
              
              <Button 
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Ajouter au panier
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`}
                />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
            
            {user?.role === "owner" && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
              >
                Modifier ce produit
              </Button>
            )}
          </div>
          
          <div className="space-y-3 pt-4">
            <div className="flex items-center text-sm">
              <Truck className="w-4 h-4 mr-2 text-primary" />
              <span>Livraison gratuite à partir de 7250 DZD</span>
            </div>
            <div className="flex items-center text-sm">
              <ShieldCheck className="w-4 h-4 mr-2 text-primary" />
              <span>Garantie de remboursement de 30 jours</span>
            </div>
            <div className="flex items-center text-sm">
              <RotateCcw className="w-4 h-4 mr-2 text-primary" />
              <span>Retours gratuits sous 14 jours</span>
            </div>
            <div className="flex items-center text-sm">
              <Check className="w-4 h-4 mr-2 text-primary" />
              <span>En stock, expédition sous 24h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
