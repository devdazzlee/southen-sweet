'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Package, 
  User,
  MapPin,
  CreditCard,
  Truck,
  ExternalLink,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { api } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  product?: {
    name: string;
    image?: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  // Shipping address
  shippingStreet?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZip?: string;
  shippingCountry?: string;
  shippingPhone?: string;
  // Shippo fields
  shipmentId?: string | null;
  trackingNumber?: string | null;
  trackingUrl?: string | null;
  shippingLabelUrl?: string | null;
  shippingStatus?: string | null;
  shippingCarrier?: string | null;
  shippingService?: string | null;
  shippingCost?: number | null;
  shippingError?: string | null;
  orderItems: OrderItem[];
  orderNotes?: string;
  paymentId?: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const orderId = params?.id as string;

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/orders/${orderId}`);
      
      if (response.success && response.data) {
        // Backend returns data: { order: {...} }
        setOrder(response.data.order || response.data);
      }
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load order details',
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-300';
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PROCESSING': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-300';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-300';
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-300';
      case 'PAID': return 'bg-green-100 text-green-800 border-green-300';
      case 'FAILED': return 'bg-red-100 text-red-800 border-red-300';
      case 'REFUNDED': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Order not found</h3>
          <p className="mt-1 text-sm text-gray-500">The order you're looking for doesn't exist.</p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin/orders')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/admin/orders')}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order {order.orderNumber}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Items
              </h2>
            </div>
            <div className="px-6 py-4">
              <div className="space-y-4">
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {item.product?.image ? (
                          <Image
                            src={item.product.image}
                            alt={item.productName || item.product?.name || 'Product'}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.productName || item.product?.name || 'Product'}
                        </h3>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(item.total)}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No items found in this order
                  </div>
                )}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatCurrency(order.totalAmount - (order.shippingCost || 0))}</p>
                </div>
                {order.shippingCost && (
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <p>Shipping</p>
                    <p>{formatCurrency(order.shippingCost)}</p>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                  <p>Total</p>
                  <p>{formatCurrency(order.totalAmount)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          {order.trackingNumber && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm border-2 border-blue-200 overflow-hidden">
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                  <Truck className="w-5 h-5 mr-2 text-blue-600" />
                  Shippo Tracking
                </h2>
                <div className="space-y-3">
                  {order.shippingCarrier && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Carrier:</span>
                      <span className="text-sm text-gray-900 font-semibold">{order.shippingCarrier}</span>
                    </div>
                  )}
                  {order.shippingService && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Service:</span>
                      <span className="text-sm text-gray-900">{order.shippingService}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Tracking Number:</span>
                    <span className="text-sm font-mono text-gray-900">{order.trackingNumber}</span>
                  </div>
                  {order.shippingStatus && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Status:</span>
                      <span className="text-sm font-semibold text-blue-600 capitalize">{order.shippingStatus.replace('_', ' ')}</span>
                    </div>
                  )}
                  {order.trackingUrl && (
                    <div className="mt-4">
                      <a
                        href={order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Track on Shippo
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Order Notes */}
          {order.orderNotes && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Order Notes</h2>
              <p className="text-sm text-gray-600">{order.orderNotes}</p>
            </div>
          )}

          {/* Shipping Error */}
          {order.shippingError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-900 mb-2">Shipping Error</h2>
              <p className="text-sm text-red-700">{order.shippingError}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <User className="w-5 h-5 mr-2" />
              Customer
            </h2>
            <div className="space-y-3">
              {order.user ? (
                <>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-sm text-gray-900">{order.user.firstName} {order.user.lastName}</p>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-900">{order.user.email}</p>
                    </div>
                  </div>
                  {order.user.phone && (
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">Phone</p>
                        <p className="text-sm text-gray-900">{order.user.phone}</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <p className="text-sm font-medium text-gray-700">Guest Order</p>
                  <p className="text-sm text-gray-900">{order.guestEmail}</p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              Shipping Address
            </h2>
            <div className="text-sm text-gray-900 space-y-1">
              {order.shippingStreet && <p>{order.shippingStreet}</p>}
              {(order.shippingCity || order.shippingState || order.shippingZip) && (
                <p>
                  {order.shippingCity}{order.shippingCity && order.shippingState ? ', ' : ''}
                  {order.shippingState} {order.shippingZip}
                </p>
              )}
              {order.shippingCountry && <p>{order.shippingCountry}</p>}
              {order.shippingPhone && (
                <div className="flex items-center mt-2 pt-2 border-t border-gray-200">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <p>{order.shippingPhone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Status</p>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Via</p>
                <p className="text-sm text-gray-900">Stripe</p>
              </div>
              {order.paymentId && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Payment ID</p>
                  <p className="text-xs font-mono text-gray-600">{order.paymentId.slice(0, 24)}...</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">Total Amount</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
              <Calendar className="w-5 h-5 mr-2" />
              Timeline
            </h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Created</p>
                <p className="text-gray-600">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Last Updated</p>
                <p className="text-gray-600">{formatDate(order.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

