"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  calculateDiscountedSubtotal,
  getShippingCost,
  getNextTierSavingsMessage,
  type DISCOUNT_TIERS,
} from "@/lib/pricing";
import { trackEcommerce } from "@/hooks/useTrackdeskEvent";

interface CartItem {
  id: number | string; // Support both numeric and string IDs (for Prisma CUID)
  name: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getOriginalSubtotal: () => number;
  getDiscountSavings: () => number;
  getAppliedTier: () => string;
  getPricePerUnit: () => number;
  getNextTierMessage: () => string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("licorice-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("licorice-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    console.log("🛒 Adding to cart:", { id: product.id, name: product.name });

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = prevItems.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        // Track add to cart event
        if (typeof window !== "undefined" && window.Trackdesk) {
          trackEcommerce.addToCart({
            id: String(product.id),
            name: product.name,
            price: product.currentPrice,
            quantity: existingItem.quantity + 1,
            category: (product as any).category,
            sku: (product as any).sku,
          });
        }

        return updatedItems;
      } else {
        // If item doesn't exist, add it with quantity 1
        // Track add to cart event
        if (typeof window !== "undefined" && window.Trackdesk) {
          trackEcommerce.addToCart({
            id: String(product.id),
            name: product.name,
            price: product.currentPrice,
            quantity: 1,
            category: (product as any).category,
            sku: (product as any).sku,
          });
        }

        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number | string) => {
    console.log("🗑️ removeFromCart called with productId:", productId);
    console.log(
      "🗑️ Current cart items:",
      cartItems.map((item) => ({ id: item.id, name: item.name }))
    );

    if (
      !productId ||
      productId === null ||
      productId === undefined ||
      productId === ""
    ) {
      console.error("❌ Cannot remove item - invalid productId:", productId);
      return;
    }

    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(
        (item) => String(item.id) === String(productId)
      );

      // Track remove from cart event
      if (itemToRemove && typeof window !== "undefined" && window.Trackdesk) {
        trackEcommerce.removeFromCart({
          id: String(itemToRemove.id),
          name: itemToRemove.name,
          price: itemToRemove.currentPrice,
          quantity: itemToRemove.quantity,
        });
      }

      const filteredItems = prevItems.filter(
        (item) => String(item.id) !== String(productId)
      );
      console.log(
        "🗑️ After removal, remaining items:",
        filteredItems.map((item) => ({ id: item.id, name: item.name }))
      );
      return filteredItems;
    });
  };

  const updateQuantity = (productId: number | string, quantity: number) => {
    console.log("📝 updateQuantity called:", { productId, quantity });

    if (
      !productId ||
      productId === null ||
      productId === undefined ||
      productId === ""
    ) {
      console.error(
        "❌ Cannot update quantity - invalid productId:",
        productId
      );
      return;
    }

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    // Use discounted pricing based on total quantity
    const pricing = calculateDiscountedSubtotal(
      cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.currentPrice,
      }))
    );
    return pricing.subtotal;
  };

  const getOriginalSubtotal = () => {
    const pricing = calculateDiscountedSubtotal(
      cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.currentPrice,
      }))
    );
    return pricing.originalSubtotal;
  };

  const getDiscountSavings = () => {
    const pricing = calculateDiscountedSubtotal(
      cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.currentPrice,
      }))
    );
    return pricing.savings;
  };

  const getAppliedTier = () => {
    const pricing = calculateDiscountedSubtotal(
      cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.currentPrice,
      }))
    );
    return pricing.appliedTier;
  };

  const getPricePerUnit = () => {
    const pricing = calculateDiscountedSubtotal(
      cartItems.map((item) => ({
        quantity: item.quantity,
        price: item.currentPrice,
      }))
    );
    return pricing.pricePerUnit;
  };

  const getNextTierMessage = () => {
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return getNextTierSavingsMessage(totalQuantity);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const totalQuantity = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const shipping = getShippingCost(totalQuantity, false); // Standard shipping
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + shipping + tax;
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    getCartSubtotal,
    getOriginalSubtotal,
    getDiscountSavings,
    getAppliedTier,
    getPricePerUnit,
    getNextTierMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
