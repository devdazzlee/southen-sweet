'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { api } from '@/lib/axios';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  orderItems: any[];
  shipment?: {
    carrier: string;
    trackingNumber: string;
    status: string;
    estimatedDelivery?: string;
    actualDelivery?: string;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function OrderTrackingPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    setIsLoading(true);
    try {
      const data = await api.get(`/orders/${params.id}`);
      if (data.success) {
        setOrder(data.data.order);
      }
    } catch (error: any) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'CONFIRMED':
      case 'PROCESSING':
        return <Package className="w-6 h-6 text-blue-500" />;
      case 'SHIPPED':
      case 'IN_TRANSIT':
        return <Truck className="w-6 h-6 text-purple-500" />;
      case 'DELIVERED':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Package className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
      case 'IN_TRANSIT':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const orderStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Order not found</p>
        </div>
      </div>
    );
  }

  const currentStatusIndex = orderStatuses.indexOf(order.status);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Tracking</h1>
        <p className="text-gray-600 mt-1">Order #{order.orderNumber}</p>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Status</h2>
        
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" style={{ width: 'calc(100% - 40px)', marginLeft: '20px' }}>
            <div 
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: `${(currentStatusIndex / (orderStatuses.length - 1)) * 100}%` }}
            />
          </div>

          {/* Status Steps */}
          <div className="relative flex justify-between">
            {orderStatuses.map((status, index) => {
              const isPast = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={status} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isPast ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-300'
                  } ${isCurrent ? 'ring-4 ring-orange-200' : ''}`}>
                    {isPast ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <p className={`mt-2 text-xs font-medium ${isPast ? 'text-gray-900' : 'text-gray-500'}`}>
                    {status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium text-gray-900">#{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Status:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total:</span>
              <span className="text-orange-600">${Number(order.totalAmount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
          
          {order.shipment ? (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Carrier:</span>
                <span className="font-medium text-gray-900">{order.shipment.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking Number:</span>
                <span className="font-medium text-blue-600">{order.shipment.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.shipment.status)}`}>
                  {order.shipment.status}
                </span>
              </div>
              {order.shipment.estimatedDelivery && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(order.shipment.estimatedDelivery).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Shipment information not available yet</p>
          )}

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-medium text-gray-900 mb-2">Delivery Address:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
        </div>
        <div className="p-6 space-y-4">
          {order.orderItems.map((item: any) => (
            <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
              <img 
                src={item.product.image} 
                alt={item.product.name} 
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">${Number(item.price).toFixed(2)}</p>
                <p className="text-sm text-gray-600">each</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
