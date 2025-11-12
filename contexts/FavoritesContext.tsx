'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  backgroundColor?: string;
}

interface Notification {
  id: string;
  type: 'favorite' | 'rating' | 'feedback';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface FavoritesContextType {
  favorites: Product[];
  notifications: Notification[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  addNotification: (type: 'favorite' | 'rating' | 'feedback', message: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
  hasUnreadNotifications: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save notifications to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      setFavorites(prev => [...prev, product]);
      addNotification('favorite', `${product.name} added to favorites`);
    }
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(product => product.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(product => product.id === productId);
  };

  const addNotification = (type: 'favorite' | 'rating' | 'feedback', message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const hasUnreadNotifications = notifications.some(notification => !notification.read);

  const value: FavoritesContextType = {
    favorites,
    notifications,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    hasUnreadNotifications
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
