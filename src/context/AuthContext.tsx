
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string, profileImage?: File) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'owner@example.com',
    firstName: 'John',
    lastName: 'Owner',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'owner' as UserRole,
    password: 'password'
  },
  {
    id: '2',
    email: 'customer@example.com',
    firstName: 'Jane',
    lastName: 'Customer',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    role: 'customer' as UserRole,
    password: 'password'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success("Connexion réussie");
    } else {
      toast.error("Email ou mot de passe incorrect");
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string, profileImage?: File) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast.error("Cet email est déjà utilisé");
      setLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      firstName,
      lastName,
      profileImage: profileImage ? URL.createObjectURL(profileImage) : undefined,
      role: 'customer'
    };
    
    // In a real app, you would send this to your backend
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    toast.success("Compte créé avec succès");
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Déconnexion réussie");
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(u => u.email === email);
    
    if (foundUser) {
      toast.success("Instructions de réinitialisation envoyées par email");
    } else {
      toast.error("Email non trouvé");
      throw new Error('Email not found');
    }
    
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<User>) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success("Profil mis à jour avec succès");
    }
    
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
