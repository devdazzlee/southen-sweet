'use client';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number | string;
  name: string;
  description: string;
  currentPrice: number | string;
  originalPrice?: number | string;
  discount: number | null;
  image: string;
  quantity: number;
  selected: boolean;
  color?: string;
}

interface CartItemProps {
  item: CartItem;
  onSelect: (id: number | string, selected: boolean) => void;
  onQuantityChange: (id: number | string, quantity: number) => void;
  onRemove: (id: number | string) => void;
}

const CartItemComponent = ({ item, onSelect, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={item.selected}
        onChange={(e) => onSelect(item.id, e.target.checked)}
        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
      />

      {/* Product Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-white">
        <Image
          src={item.image}
          alt={item.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">Color {item.color}</p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="p-2 hover:bg-gray-100 rounded-l-lg"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value) || 1)}
          className="w-12 text-center border-0 focus:ring-0"
          min="1"
        />
        <button
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="p-2 hover:bg-gray-100 rounded-r-lg"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Price */}
      <div className="text-right">
        {item.originalPrice && (
          <p className="text-sm text-gray-400 line-through">${Number(item.originalPrice).toFixed(2)}</p>
        )}
        <p className="text-lg font-semibold text-gray-900">${Number(item.currentPrice).toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItemComponent;
