'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  orderItems?: any[];
  // Shippo fields
  shippingStatus?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  shippingCarrier?: string | null;
  shippingService?: string | null;
  shippingCost?: number | string | null;
  shippingError?: string | null;
}

export default function OrderManagement() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/orders', { limit: 100 });
      
      if (response.success && response.data && response.data.orders) {
        setOrders(response.data.orders);
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load orders',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'REFUNDED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      case 'REFUNDED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShippingStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped':
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'label_created': return 'bg-purple-100 text-purple-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShippingStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_transit': return 'In Transit';
      case 'label_created': return 'Label Created';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.guestEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user?.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status.toUpperCase() === filterStatus.toUpperCase();
    
    // Only show completed payments (successful orders)
    const isSuccessfulOrder = order.paymentStatus.toUpperCase() === 'COMPLETED';
    
    return matchesSearch && matchesStatus && isSuccessfulOrder;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
      </div>

      {/* Notice about automatic statuses */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-blue-800 mb-1">📦 Order Management</h4>
            <p className="text-sm text-blue-700">
              Only <strong>successful orders</strong> are displayed here. Orders are automatically created after successful Stripe payment.<br/>
              <strong>Shipping</strong> is managed by Shippo. Track packages using the tracking links below.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by order number or email..."
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Statuses</option>
            <option value="CONFIRMED">✓ Confirmed</option>
            <option value="SHIPPED">🚚 Shipped</option>
            <option value="DELIVERED">📦 Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipping
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.user?.email || order.guestEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(Number(order.totalAmount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-0.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <div className="text-xs text-green-600 font-medium">✓ Paid via Stripe</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.trackingNumber || order.shippingCarrier ? (
                      <div className="space-y-1.5">
                        {order.shippingCarrier && (
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ✓ Label Created
                            </span>
                          </div>
                        )}
                        {order.shippingCarrier && (
                          <div className="text-xs text-gray-600 font-medium">
                            📦 {order.shippingCarrier} {order.shippingService && `• ${order.shippingService}`}
                          </div>
                        )}
                        {order.trackingNumber && (
                          <div className="text-xs font-mono text-gray-700 bg-gray-50 px-2 py-1 rounded">
                            {order.trackingNumber}
                          </div>
                        )}
                        {order.trackingUrl && (
                          <a 
                            href={order.trackingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors shadow-sm"
                          >
                            Track Package <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                        {order.shippingCost && (
                          <div className="text-xs text-gray-500">
                            Shipping: ${Number(order.shippingCost).toFixed(2)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          ⏳ Creating Label...
                        </span>
                        <div className="text-xs text-gray-500 italic">Shippo processing</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href={`/admin/orders/${order.id}`}
                      className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filter criteria' 
              : 'Orders will appear here once customers make purchases'}
          </p>
        </div>
      )}
    </div>
  );
}
