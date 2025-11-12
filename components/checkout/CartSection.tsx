'use client';
import { Check } from 'lucide-react';
import Button from '@/components/custom/Button';
import CartItem from './CartItem';

interface CartItem {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  quantity: number;
  selected: boolean;
  color?: string;
}

interface CartSectionProps {
  cartItems: CartItem[];
  allSelected: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  onItemSelect: (id: number, selected: boolean) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onDeleteSelected: () => void;
  onSubmit: () => void;
}

const CartSection = ({
  cartItems,
  allSelected,
  someSelected,
  onSelectAll,
  onItemSelect,
  onQuantityChange,
  onRemoveItem,
  onDeleteSelected,
  onSubmit
}: CartSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm gap-16 flex flex-col p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">MY CART</h2>

      {/* Select All & Delete */}
      <div className="flex items-center justify-between rounded-lg border-2 border-gray-100 p-4 h-[70px] mb-6">
        <label className=" flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
          <span className="ml-2 text-gray-700 text-base font-medium">Select All</span>
        </label>
        <Button
          onClick={onDeleteSelected}
          disabled={!someSelected}
          className="bg-[#E7AB3C] w-32 h-14 rounded-full text-white px-4 py-2 hover:bg-[#E7AB3C]/80 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Delete
        </Button>
      </div>

      {/* Cart Items */}
      <div className="w-full h-full border-2 flex flex-col gap-4 border-gray-100">
        {cartItems.map((item, index) => (
          <div key={item.id}>
            <CartItem
              item={item}
              onSelect={onItemSelect}
              onQuantityChange={onQuantityChange}
              onRemove={onRemoveItem}
            />
            {index < cartItems.length - 1 && <hr className="my-6 border-2 border-gray-100" />}
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center justify-center gap-10'>
        {/* Cart Update Message */}
        <Button className="w-72 h-16 flex items-center justify-center p-3 bg-transparent border-2 border-g rounded-full">
          <Check className="w-5 h-5 text-balck text-center" />
          <p className="text- text-sm">Cart has been updated</p>
        </Button>

        {/* Submit Button */}
        
          <Button
            onClick={onSubmit}
            className="w-72 h-16 bg-[#E7AB3C] text-white py-3 rounded-full justify-center items-center flex hover:bg-[#E7AB3C]/80 transition-colors"
          >
            Submit
          </Button>
      </div>
    </div>
  );
};

export default CartSection;
