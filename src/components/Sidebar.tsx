
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  User,
  LogIn,
  LogOut,
  Search,
  ShoppingCart,
  Menu,
  X,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Close sidebar on location change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would redirect to search results
    console.log("Searching for:", searchTerm);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-[280px] bg-background border-r z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold">ElegantShop</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Search */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          
          <Separator className="my-4" />
          
          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            <Link
              to="/"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/" 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-secondary"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Accueil</span>
            </Link>
            
            <Link
              to="/products"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/products" 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-secondary"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Produits</span>
            </Link>
            
            <Link
              to="/cart"
              className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                location.pathname === "/cart" 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "hover:bg-secondary"
              }`}
            >
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-5 h-5" />
                <span>Panier</span>
              </div>
              {totalItems > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {totalItems}
                </Badge>
              )}
            </Link>
            
            {user?.role === "owner" && (
              <Link
                to="/admin/products"
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/admin/products" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-secondary"
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Gérer les produits</span>
              </Link>
            )}
          </nav>
          
          <Separator className="my-4" />
          
          {/* User section */}
          {user ? (
            <div className="space-y-3">
              <Link
                to="/profile"
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/profile" 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-secondary"
                }`}
              >
                <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className="text-xs">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.firstName} {user.lastName}</span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start" 
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/login">
                <Button variant="default" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
              
              <Link to="/signup">
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  Inscription
                </Button>
              </Link>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-30 lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  );
};

export default Sidebar;
