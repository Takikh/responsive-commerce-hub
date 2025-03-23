
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, ChevronRight, PackageCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CartItem from "@/components/CartItem";

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isOrdering, setIsOrdering] = useState(false);
  
  const handleCheckout = () => {
    setIsOrdering(true);
    
    // Simulate API call for order processing
    setTimeout(() => {
      clearCart();
      setIsOrdering(false);
    }, 2000);
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-primary/10 rounded-full p-6 mb-6">
          <ShoppingCart className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Vous n'avez pas encore ajouté de produits à votre panier. Explorez notre catalogue pour trouver des produits qui vous plaisent.
        </p>
        <Button asChild size="lg">
          <Link to="/products">
            Découvrir nos produits <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Votre panier</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Articles ({totalItems})</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Vider le panier
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>
                  {totalPrice >= 50
                    ? 'Gratuite'
                    : new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(4.99)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(totalPrice * 0.2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(
                    totalPrice + (totalPrice >= 50 ? 0 : 4.99) + totalPrice * 0.2
                  )}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              {user ? (
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isOrdering}
                >
                  {isOrdering ? (
                    <>
                      <PackageCheck className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      Commander <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button asChild size="lg" className="w-full">
                  <Link to="/login">Se connecter pour commander</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <PackageCheck className="w-4 h-4 text-primary" />
                  <span>Expédition sous 24h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PackageCheck className="w-4 h-4 text-primary" />
                  <span>Livraison gratuite à partir de 50€</span>
                </div>
                <div className="flex items-center space-x-2">
                  <PackageCheck className="w-4 h-4 text-primary" />
                  <span>Paiements 100% sécurisés</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
