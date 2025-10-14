'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface Discount {
  id: string;
  code: string;
  discountPercent: number;
  type: string;
  startDate: string;
  endDate: string;
  usageLimit: number | null;
  usageCount: number;
  isActive: boolean;
}

export default function DiscountsManagement() {
  const { toast } = useToast();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/discounts');
      if (response.success && response.data && response.data.discounts) {
        setDiscounts(response.data.discounts);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to load discounts', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await api.delete(`/discounts/${id}`);
      if (response.success) {
        toast({ title: 'Success', description: 'Discount deleted successfully' });
        fetchDiscounts();
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to delete discount', variant: 'destructive' });
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Discounts</h1><p className="text-gray-600 mt-1">Manage discount codes</p></div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valid Until</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {discounts.map((discount) => (
              <tr key={discount.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{discount.code}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{discount.discountPercent}%</td>
                <td className="px-6 py-4 text-sm text-gray-500">{discount.usageCount}/{discount.usageLimit || '∞'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(discount.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${discount.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{discount.isActive ? 'Active' : 'Inactive'}</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm"><button onClick={() => handleDelete(discount.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
