/**
 * Pricing utility for quantity-based discounts
 * Pricing for southern sweet and sour ropes
 */

// Base product price
export const BASE_ROPE_PRICE = 7.99;

// Discount tiers based on quantity
export const DISCOUNT_TIERS = [
  { min: 1, max: 2, price: 7.99, label: '1-2 ropes' },
  { min: 3, max: 5, price: 6.99, label: '3-5 ropes' },
  { min: 6, max: 10, price: 6.49, label: '6-10 ropes' },
  { min: 11, max: Infinity, price: 5.99, label: '11+ ropes' },
];

// Shipping tiers
export const SHIPPING_TIERS = {
  standard: {
    low: { max: 10, price: 6.95, label: '1-10 ropes' },
    high: { min: 11, price: 10.95, label: '11+ ropes' }
  },
  premium: {
    low: { max: 10, price: 11.95, label: '1-10 ropes' },
    high: { min: 11, price: 15.95, label: '11+ ropes' }
  }
};

/**
 * Get the price per unit based on total quantity
 */
export function getPricePerUnit(totalQuantity: number): number {
  for (const tier of DISCOUNT_TIERS) {
    if (totalQuantity >= tier.min && totalQuantity <= tier.max) {
      return tier.price;
    }
  }
  return BASE_ROPE_PRICE;
}

/**
 * Get the discount tier label for a given quantity
 */
export function getDiscountTierLabel(quantity: number): string {
  for (const tier of DISCOUNT_TIERS) {
    if (quantity >= tier.min && quantity <= tier.max) {
      return tier.label;
    }
  }
  return '';
}

/**
 * Calculate subtotal with quantity-based discounts
 * All items in cart use the same discounted price based on total quantity
 */
export function calculateDiscountedSubtotal(cartItems: Array<{ quantity: number; price: number }>): {
  subtotal: number;
  originalSubtotal: number;
  savings: number;
  appliedTier: string;
  pricePerUnit: number;
} {
  // Calculate total quantity across all items
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Get the discounted price per unit based on total quantity
  const pricePerUnit = getPricePerUnit(totalQuantity);
  const appliedTier = getDiscountTierLabel(totalQuantity);
  
  // Calculate original subtotal (using base price)
  const originalSubtotal = cartItems.reduce((sum, item) => sum + (BASE_ROPE_PRICE * item.quantity), 0);
  
  // Calculate discounted subtotal (using tier price)
  const subtotal = cartItems.reduce((sum, item) => sum + (pricePerUnit * item.quantity), 0);
  
  // Calculate savings
  const savings = originalSubtotal - subtotal;
  
  return {
    subtotal,
    originalSubtotal,
    savings,
    appliedTier,
    pricePerUnit
  };
}

/**
 * Get shipping cost based on quantity
 */
export function getShippingCost(quantity: number, isPremium: boolean = false): number {
  const tierType = isPremium ? 'premium' : 'standard';
  const tiers = SHIPPING_TIERS[tierType];
  
  if (quantity <= 10) {
    return tiers.low.price;
  } else {
    return tiers.high.price;
  }
}

/**
 * Get shipping label for display
 */
export function getShippingLabel(quantity: number, isPremium: boolean = false): string {
  const tierType = isPremium ? 'premium' : 'standard';
  const tiers = SHIPPING_TIERS[tierType];
  
  if (quantity <= 10) {
    return tiers.low.label;
  } else {
    return tiers.high.label;
  }
}

/**
 * Get the next tier savings message to encourage more purchases
 */
export function getNextTierSavingsMessage(currentQuantity: number): string | null {
  // Find current tier
  let currentTierIndex = -1;
  for (let i = 0; i < DISCOUNT_TIERS.length; i++) {
    const tier = DISCOUNT_TIERS[i];
    if (currentQuantity >= tier.min && currentQuantity <= tier.max) {
      currentTierIndex = i;
      break;
    }
  }
  
  // If already at the highest tier, no next tier
  if (currentTierIndex === DISCOUNT_TIERS.length - 1) {
    return null;
  }
  
  // Get next tier
  const nextTier = DISCOUNT_TIERS[currentTierIndex + 1];
  const itemsNeeded = nextTier.min - currentQuantity;
  const currentPrice = DISCOUNT_TIERS[currentTierIndex].price;
  const nextPrice = nextTier.price;
  const savingsPerUnit = currentPrice - nextPrice;
  
  if (itemsNeeded === 1) {
    return `Add 1 more rope and save $${savingsPerUnit.toFixed(2)} per rope!`;
  } else {
    return `Add ${itemsNeeded} more rope${itemsNeeded > 1 ? 's' : ''} and save $${savingsPerUnit.toFixed(2)} per rope!`;
  }
}



