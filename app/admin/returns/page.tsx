'use client';

import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface ReturnRequest {
  id: string;
  orderId: string;
  reason: string;
  status: string;
  createdAt: string;
  order?: { orderNumber: string };
}

export default function ReturnsManagement() {
  const { toast } = useToast();
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/returns');
      if (response.success && response.data && response.data.returns) {
        setReturns(response.data.returns);
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to load returns', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await api.put(`/returns/${id}`, { status });
      if (response.success) {
        toast({ title: 'Success', description: 'Return status updated successfully' });
        fetchReturns();
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to update return', variant: 'destructive' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Return Requests</h1><p className="text-gray-600 mt-1">Manage product return requests</p></div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {returns.map((ret) => (
              <tr key={ret.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ret.order?.orderNumber || ret.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{ret.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(ret.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ret.status)}`}>{ret.status}</span></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select value={ret.status} onChange={(e) => handleUpdateStatus(ret.id, e.target.value)} className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500">
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
