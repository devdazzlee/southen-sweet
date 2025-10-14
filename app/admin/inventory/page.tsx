'use client';

import { useState, useEffect } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  sku?: string;
  category?: string;
}

export default function InventoryManagement() {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/products', { limit: 100 });
      if (response.success && response.data && response.data.products) {
        // Ensure SKU is populated, generate if missing
        const productsWithSKU = response.data.products.map((product: any) => ({
          ...product,
          sku: product.sku || `SKU-${product.id.substring(0, 8)}`
        }));
        setInventory(productsWithSKU);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to load inventory', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-800', label: 'Out of Stock' };
    if (stock < 10) return { color: 'bg-yellow-100 text-yellow-800', label: 'Low Stock' };
    return { color: 'bg-green-100 text-green-800', label: 'In Stock' };
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Inventory</h1><p className="text-gray-600 mt-1">Monitor product stock levels</p></div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory.map((item) => {
              const status = getStockStatus(item.stock);
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{item.sku || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.stock}</td>
                  <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>{status.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
