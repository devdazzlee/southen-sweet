'use client';

import { X } from 'lucide-react';
import { Product } from '@/lib/admin-data';

interface ViewProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
}

export default function ViewProductModal({
  isOpen,
  product,
  onClose
}: ViewProductModalProps) {
  if (!isOpen || !product) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 active:bg-black/50 p-1 rounded"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-6">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category</span>
                  <p className="text-lg font-semibold text-gray-900">{product.category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{product.status}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-500">Price</span>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-500">Discount</span>
              <p className="text-xl font-bold text-gray-900">{product.discount}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-500">Stock</span>
              <p className="text-xl font-bold text-gray-900">{product.stock}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-500">Sales</span>
              <p className="text-xl font-bold text-gray-900">{product.sales}</p>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-500">Favorites</span>
            <p className="text-lg font-semibold text-gray-900">{product.favorites}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
