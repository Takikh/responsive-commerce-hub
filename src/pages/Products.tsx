
import { useState, useEffect } from "react";
import { Product, Category, SortOption } from "@/lib/types";
import ProductList from "@/components/ProductList";
import ProductFilters from "@/components/ProductFilters";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

const sortOptions = [
  { value: "popularity" as SortOption, label: "Popularité" },
  { value: "price-asc" as SortOption, label: "Prix croissant" },
  { value: "price-desc" as SortOption, label: "Prix décroissant" },
];

const categoryOptions = [
  { value: "all" as Category, label: "Toutes les catégories" },
  { value: "electronics" as Category, label: "Électronique" },
  { value: "clothing" as Category, label: "Vêtements" },
  { value: "books" as Category, label: "Livres" },
  { value: "home" as Category, label: "Maison" },
  { value: "beauty" as Category, label: "Beauté" },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Min and max prices from all products
  const minPrice = Math.min(...MOCK_PRODUCTS.map(p => p.price));
  const maxPrice = Math.max(...MOCK_PRODUCTS.map(p => p.price));
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setFilteredProducts(MOCK_PRODUCTS);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFilterChange = ({
    categories,
    priceRange,
    sortBy,
  }: {
    categories: Category[];
    priceRange: [number, number];
    sortBy: SortOption;
  }) => {
    // Filter by category
    let filtered = [...products];
    
    if (!categories.includes("all")) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category as Category)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  };
  
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Tous nos produits</h1>
        <p className="text-muted-foreground">
          Découvrez notre sélection de produits de qualité.
        </p>
      </div>
      
      {/* Filters section - now full width instead of in a sidebar */}
      <div className="mb-8">
        <ProductFilters
          categories={categoryOptions}
          sortOptions={sortOptions}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onFilterChange={handleFilterChange}
        />
      </div>
      
      {/* Products grid - now full width */}
      <ProductList products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default Products;
