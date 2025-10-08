'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { CheckoutProgress, CartSection, CartTotals, CheckoutDetails } from '@/components/checkout';

export default function CheckoutPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartSubtotal, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    // Simulate checkout process
    console.log('Processing checkout...', { cartItems, formData });
    
    // Clear cart and redirect to success page
    clearCart();
    router.push('/checkout/success');
  };

  // Transform cart items to match the expected format
  const transformedCartItems = cartItems.map(item => ({
    ...item,
    selected: selectedItems.includes(item.id),
    color: item.backgroundColor || '#FFB6C1'
  }));

  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < cartItems.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(cartItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (id: number, selected: boolean) => {
    if (selected) {
      setSelectedItems(prev => [...prev, id]);
    } else {
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach(id => removeFromCart(id));
    setSelectedItems([]);
  };

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={() => router.push('/product')}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full py-32 bg-white">
      <div className="layout w-full h-full py-10">
        {/* Checkout Progress */}
        <CheckoutProgress currentStep={currentStep} />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left Column - Cart Section */}
          <div className="lg:w-2/3">
            <CartSection
              cartItems={transformedCartItems}
              allSelected={allSelected}
              someSelected={someSelected}
              onSelectAll={handleSelectAll}
              onItemSelect={handleItemSelect}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onDeleteSelected={handleDeleteSelected}
              onSubmit={handleCheckout}
            />
          </div>

          {/* Right Column - Cart Totals */}
          <div className="lg:w-1/3">
            <CartTotals
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>

        {/* Checkout Details Form */}
        {currentStep >= 2 && (
          <div className="mt-8">
            <CheckoutDetails
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleCheckout}
            />
          </div>
        )}
      </div>
    </div>
  );
}