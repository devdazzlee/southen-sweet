'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  MapPin,
  Truck,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail,
  Download,
  Edit,
  Save,
  X
} from 'lucide-react';
import AdminDataManager, { Order } from '@/lib/admin-data';

interface ShippingInfo {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  carrier?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'failed';
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
  createdAt: string;
}

export default function ShippingTrackingPage() {
  const [shippingInfos, setShippingInfos] = useState<ShippingInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedShipping, setSelectedShipping] = useState<ShippingInfo | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingShipping, setEditingShipping] = useState<ShippingInfo | null>(null);

  const dataManager = AdminDataManager.getInstance();

  useEffect(() => {
    fetchShippingInfos();
  }, []);

  const fetchShippingInfos = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock shipping info from orders
    const orders = dataManager.getOrders();
    const shippingData: ShippingInfo[] = orders.map(order => ({
      id: `ship_${order.id}`,
      orderId: order.orderNumber,
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      customerPhone: order.customer.phone || '+1 (555) 123-4567',
      shippingAddress: {
        street: order.shippingAddress.street,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        zipCode: order.shippingAddress.zipCode,
        country: order.shippingAddress.country,
      },
      trackingNumber: order.status === 'shipped' || order.status === 'delivered' 
        ? `TRK${order.id}${Math.random().toString(36).substr(2, 6).toUpperCase()}` 
        : undefined,
      carrier: order.status === 'shipped' || order.status === 'delivered' 
        ? ['UPS', 'FedEx', 'USPS', 'DHL'][Math.floor(Math.random() * 4)]
        : undefined,
      status: order.status as any,
      estimatedDelivery: order.status === 'shipped' 
        ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      shippedAt: order.status === 'shipped' || order.status === 'delivered' 
        ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      deliveredAt: order.status === 'delivered' 
        ? new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        : undefined,
      createdAt: order.createdAt,
    }));
    
    setShippingInfos(shippingData);
    setIsLoading(false);
  };

  const filteredShippingInfos = shippingInfos.filter(shipping => {
    const matchesSearch = shipping.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipping.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipping.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipping.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || shipping.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'processing': return <Package className="w-4 h-4 text-yellow-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-gray-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateShipping = (updatedShipping: ShippingInfo) => {
    setShippingInfos(shippingInfos.map(s => s.id === updatedShipping.id ? updatedShipping : s));
    setShowEditModal(false);
    setEditingShipping(null);
  };

  const handleShipOrder = (shippingId: string) => {
    if (confirm('Are you sure you want to mark this order as shipped?')) {
      const trackingNumber = `TRK${shippingId}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
      const carrier = ['UPS', 'FedEx', 'USPS', 'DHL'][Math.floor(Math.random() * 4)];
      
      setShippingInfos(shippingInfos.map(s => 
        s.id === shippingId 
          ? { 
              ...s, 
              status: 'shipped' as const,
              trackingNumber,
              carrier,
              shippedAt: new Date().toISOString(),
              estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
            }
          : s
      ));
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900">Shipping & Tracking</h1>
        <p className="text-gray-600 mt-1">Manage shipping addresses and track orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{shippingInfos.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Shipped</p>
              <p className="text-2xl font-bold text-blue-600">
                {shippingInfos.filter(s => s.status === 'shipped').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {shippingInfos.filter(s => s.status === 'delivered').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {shippingInfos.filter(s => s.status === 'pending' || s.status === 'processing').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-black/50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
            
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 active:bg-black/50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shipping Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredShippingInfos.map((shipping) => (
                <tr key={shipping.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shipping.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{shipping.customerName}</div>
                      <div className="text-gray-500">{shipping.customerEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{shipping.shippingAddress.street}</div>
                      <div className="text-gray-500">
                        {shipping.shippingAddress.city}, {shipping.shippingAddress.state} {shipping.shippingAddress.zipCode}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {shipping.trackingNumber ? (
                      <div>
                        <div className="font-medium">{shipping.trackingNumber}</div>
                        <div className="text-gray-500">{shipping.carrier}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Not shipped</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(shipping.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(shipping.status)}`}>
                        {shipping.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(shipping.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedShipping(shipping);
                          setShowDetailsModal(true);
                        }}
                        className="text-orange-600 hover:text-orange-900 p-1 active:bg-black/50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          setEditingShipping(shipping);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-1 active:bg-black/50"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      {(shipping.status === 'pending' || shipping.status === 'processing') && (
                        <button
                          onClick={() => handleShipOrder(shipping.id)}
                          className="text-green-600 hover:text-green-900 p-1 active:bg-black/50"
                          title="Mark as Shipped"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Details Modal */}
      {showDetailsModal && selectedShipping && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Shipping Details - {selectedShipping.orderId}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 active:bg-black/50 p-1 rounded"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">{selectedShipping.customerName}</p>
                      <p className="text-sm text-gray-500">Customer Name</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">{selectedShipping.customerEmail}</p>
                      <p className="text-sm text-gray-500">Email</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">{selectedShipping.customerPhone}</p>
                      <p className="text-sm text-gray-500">Phone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">{selectedShipping.shippingAddress.street}</p>
                      <p className="text-gray-600">
                        {selectedShipping.shippingAddress.city}, {selectedShipping.shippingAddress.state} {selectedShipping.shippingAddress.zipCode}
                      </p>
                      <p className="text-gray-600">{selectedShipping.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tracking Information */}
              {selectedShipping.trackingNumber && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Tracking Number</span>
                      <p className="text-lg font-semibold text-gray-900">{selectedShipping.trackingNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Carrier</span>
                      <p className="text-lg font-semibold text-gray-900">{selectedShipping.carrier}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Status</span>
                      <div className="flex items-center">
                        {getStatusIcon(selectedShipping.status)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedShipping.status)}`}>
                          {selectedShipping.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedShipping.estimatedDelivery && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500">Estimated Delivery</span>
                      <p className="text-lg font-semibold text-gray-900">{formatDate(selectedShipping.estimatedDelivery)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Order Created</p>
                      <p className="text-sm text-gray-500">{formatDate(selectedShipping.createdAt)}</p>
                    </div>
                  </div>
                  
                  {selectedShipping.shippedAt && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">Order Shipped</p>
                        <p className="text-sm text-gray-500">{formatDate(selectedShipping.shippedAt)}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedShipping.deliveredAt && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">Order Delivered</p>
                        <p className="text-sm text-gray-500">{formatDate(selectedShipping.deliveredAt)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
