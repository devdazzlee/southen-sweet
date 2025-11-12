"use client";

import { useEffect } from "react";

/**
 * Hook to track Trackdesk events automatically on component mount
 */
export function useTrackdeskEvent(
  eventName: string,
  eventData?: Record<string, any>
) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.Trackdesk) {
      window.Trackdesk.track(eventName, eventData || {});
      if (window.Trackdesk.config?.debug) {
        console.log(`[Trackdesk] Event tracked: ${eventName}`, eventData);
      }
    }
  }, [eventName, JSON.stringify(eventData)]);
}

/**
 * Manually track a custom event
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window !== "undefined" && window.Trackdesk) {
    window.Trackdesk.track(eventName, eventData || {});
    if (window.Trackdesk.config?.debug) {
      console.log(`[Trackdesk] Event tracked: ${eventName}`, eventData);
    }
  }
}

/**
 * Track a conversion (purchase, signup, etc.)
 */
export function trackConversion(conversionData: {
  orderId?: string;
  value?: number;
  currency?: string;
  items?: Array<{
    id: string;
    name?: string;
    price?: number;
    quantity?: number;
  }>;
  [key: string]: any;
}) {
  if (typeof window !== "undefined" && window.Trackdesk) {
    window.Trackdesk.convert(conversionData);
    if (window.Trackdesk.config?.debug) {
      console.log("[Trackdesk] Conversion tracked:", conversionData);
    }
  }
}

/**
 * Identify a user (call after login)
 */
export function identifyUser(userId: string, userData?: Record<string, any>) {
  if (typeof window !== "undefined" && window.Trackdesk) {
    window.Trackdesk.identify(userId, userData || {});
    if (window.Trackdesk.config?.debug) {
      console.log("[Trackdesk] User identified:", userId, userData);
    }
  }
}

/**
 * E-commerce tracking helpers
 */
export const trackEcommerce = {
  /**
   * Track when a product is viewed
   */
  productView: (product: {
    id: string;
    name: string;
    price?: number;
    category?: string;
    sku?: string;
  }) => {
    trackEvent("product_view", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
      sku: product.sku,
    });
  },

  /**
   * Track when a product is added to cart
   */
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    category?: string;
    sku?: string;
  }) => {
    trackEvent("add_to_cart", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      category: product.category,
      sku: product.sku,
    });
  },

  /**
   * Track when a product is removed from cart
   */
  removeFromCart: (product: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
  }) => {
    trackEvent("remove_from_cart", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: product.quantity || 1,
    });
  },

  /**
   * Track when checkout is started
   */
  checkoutStarted: (data?: {
    cartValue?: number;
    itemCount?: number;
    currency?: string;
  }) => {
    trackEvent("checkout_started", {
      cartValue: data?.cartValue,
      itemCount: data?.itemCount,
      currency: data?.currency || "USD",
    });
  },

  /**
   * Track when checkout step is completed
   */
  checkoutStep: (step: string, data?: Record<string, any>) => {
    trackEvent("checkout_step", {
      step,
      ...data,
    });
  },

  /**
   * Track when a purchase is completed
   */
  purchase: (order: {
    orderId: string;
    value: number;
    currency?: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      category?: string;
    }>;
    shipping?: number;
    tax?: number;
    discount?: number;
  }) => {
    trackConversion({
      orderId: order.orderId,
      value: order.value,
      currency: order.currency || "USD",
      items: order.items,
      shipping: order.shipping,
      tax: order.tax,
      discount: order.discount,
    });
  },

  /**
   * Track when a search is performed
   */
  search: (query: string, resultsCount?: number) => {
    trackEvent("search", {
      query,
      resultsCount,
    });
  },
};

/**
 * Hook to track page views with custom data
 */
export function useTrackdeskPageView(
  pageName?: string,
  pageData?: Record<string, any>
) {
  useTrackdeskEvent("page_view", {
    page: pageName,
    ...pageData,
  });
}
