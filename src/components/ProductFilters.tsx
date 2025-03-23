
import { useState } from "react";
import { 
  Slider
} from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Checkbox
} from "@/components/ui/checkbox";
import {
  Label
} from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

interface ProductFiltersProps {
  categories: { value: Category; label: string }[];
  sortOptions: { value: SortOption; label: string }[];
  minPrice: number;
  maxPrice: number;
  onFilterChange: (filters: {
    categories: Category[];
    priceRange: [number, number];
    sortBy: SortOption;
  }) => void;
}

const ProductFilters = ({
  categories,
  sortOptions,
  minPrice,
  maxPrice,
  onFilterChange,
}: ProductFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['all']);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: Category, checked: boolean) => {
    if (category === 'all' && checked) {
      setSelectedCategories(['all']);
    } else {
      const newCategories = checked
        ? [...selectedCategories.filter(c => c !== 'all'), category]
        : selectedCategories.filter(c => c !== category);
        
      // If no categories selected, default to 'all'
      setSelectedCategories(newCategories.length ? newCategories : ['all']);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      sortBy,
    });
  };

  const resetFilters = () => {
    setSelectedCategories(['all']);
    setPriceRange([minPrice, maxPrice]);
    setSortBy('popularity');
    
    onFilterChange({
      categories: ['all'],
      priceRange: [minPrice, maxPrice],
      sortBy: 'popularity',
    });
  };

  return (
    <div className="mb-8 bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Filter className="h-5 w-5" /> Filtres
        </h2>
        
        {/* Mobile toggle */}
        <CollapsibleTrigger
          asChild
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
        >
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="lg:block"
      >
        <CollapsibleContent className="lg:block space-y-6">
          {/* Sort */}
          <div>
            <Label htmlFor="sort-by" className="mb-2 block">
              Trier par
            </Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger id="sort-by">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Categories */}
          <div className="space-y-2">
            <Label className="mb-2 block">Catégories</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.value}`}
                    className="cursor-pointer"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price range */}
          <div>
            <Label className="mb-2 block">Prix</Label>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={priceRange}
                min={minPrice}
                max={maxPrice}
                step={1}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(priceRange[0])}
              </span>
              <span>
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(priceRange[1])}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button onClick={applyFilters} className="flex-1">
              Appliquer
            </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex-1"
            >
              Réinitialiser
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProductFilters;
