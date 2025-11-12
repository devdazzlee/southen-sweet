'use client';

import { useState, useEffect } from 'react';
import { Search, Trash2, Download } from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export default function NewsletterManagement() {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/newsletter', { limit: 100 });
      
      if (response.success && response.data && response.data.subscribers) {
        setSubscribers(response.data.subscribers);
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load subscribers',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;
    
    try {
      const response = await api.delete(`/newsletter/${id}`);
      
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Subscriber deleted successfully',
        });
        fetchSubscribers();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete subscriber',
        variant: 'destructive',
      });
    }
  };

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-gray-600 mt-1">Manage newsletter subscribers</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Search subscribers..."
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSubscribers.map((subscriber) => (
              <tr key={subscriber.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    subscriber.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {subscriber.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(subscriber.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(subscriber.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
