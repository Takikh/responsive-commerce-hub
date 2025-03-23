
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductList = ({ products, isLoading = false }: ProductListProps) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-60 w-full rounded-t-xl" />
            <div className="space-y-2 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-6 w-1/3 mt-4" />
            </div>
            <Skeleton className="h-10 w-full mt-auto mx-4 mb-4" />
          </div>
        ))}
      </div>
    );
  }

  if (!isClient) {
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
        <p className="text-muted-foreground">
          Essayez de modifier vos filtres ou votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
