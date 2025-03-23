
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  ChevronRight, 
  CheckCircle2,
  ShieldCheck,
  Truck,
  LifeBuoy  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductList from "@/components/ProductList";
import { Product } from "@/lib/types";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Get 4 random products as featured
      const shuffled = [...MOCK_PRODUCTS].sort(() => 0.5 - Math.random());
      setFeaturedProducts(shuffled.slice(0, 4));
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero section */}
      <section className="relative">
        <div className="bg-gradient-to-r from-primary/90 to-primary rounded-3xl overflow-hidden">
          <div className="container px-6 py-16 sm:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Découvrez notre collection de produits exclusifs
              </h1>
              <p className="text-white/90 text-lg mb-8 max-w-xl">
                Une sélection soignée de produits pour tous les goûts et tous les budgets. 
                Qualité et élégance à prix compétitifs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link to="/products">
                    Voir les produits
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link to="/signup">
                    Créer un compte
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-full h-full max-w-2xl overflow-hidden rounded-bl-[100px] hidden lg:block">
            <div className="w-full h-full bg-white/10 backdrop-blur-md absolute"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="w-64 h-64 text-white/30 animate-float" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Produits à la une</h2>
          <Link to="/products" className="flex items-center text-primary hover:underline">
            Voir tout <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <ProductList products={featuredProducts} isLoading={isLoading} />
      </section>
      
      {/* Features */}
      <section className="py-12">
        <h2 className="text-2xl font-bold text-center mb-12">Pourquoi nous choisir ?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-0 card-hover">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Produits de qualité</h3>
              <p className="text-muted-foreground">
                Tous nos produits sont sélectionnés avec le plus grand soin pour vous garantir la meilleure qualité.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow border-0 card-hover">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Livraison rapide</h3>
              <p className="text-muted-foreground">
                Livraison express en 24h à 48h dans toute la France métropolitaine.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow border-0 card-hover">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Paiement sécurisé</h3>
              <p className="text-muted-foreground">
                Vos paiements sont 100% sécurisés grâce à notre système de cryptage avancé.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow border-0 card-hover">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <LifeBuoy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Service client</h3>
              <p className="text-muted-foreground">
                Notre équipe est disponible 7j/7 pour répondre à toutes vos questions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-secondary rounded-2xl p-10 text-center my-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Prêt à découvrir nos produits ?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Rejoignez des milliers de clients satisfaits et découvrez notre vaste sélection de produits.
        </p>
        <Button size="lg" asChild>
          <Link to="/products">Commencer à magasiner</Link>
        </Button>
      </section>
    </div>
  );
};

export default Index;
