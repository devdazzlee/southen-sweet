'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  CreditCard,
  Calendar,
  User,
  DollarSign,
  Download,
  X
} from 'lucide-react';
import api from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface PaymentConfirmation {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string;
  createdAt: string;
  paidAt?: string;
}

export default function PaymentConfirmationPage() {
  const { toast } = useToast();
  const [payments, setPayments] = useState<PaymentConfirmation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<PaymentConfirmation | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/orders', {
        page: 1,
        limit: 100,
      });
      
      if (response.success && response.data) {
        const orders = response.data.orders || [];
        
        // Transform orders into payment confirmations
        const paymentsData: PaymentConfirmation[] = orders.map((order: any) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customerName: order.user 
            ? `${order.user.firstName} ${order.user.lastName}`
            : order.guestEmail || 'Guest',
          customerEmail: order.user?.email || order.guestEmail || '',
          amount: Number(order.total) || 0,
          paymentMethod: order.paymentMethod || 'Card',
          paymentStatus: order.paymentStatus || 'pending',
          transactionId: `TXN-${order.orderNumber}`,
          createdAt: order.createdAt,
          paidAt: order.paymentStatus === 'paid' ? order.createdAt : undefined,
        }));
        
        setPayments(paymentsData);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch payment information',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error fetching payments:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch payment information',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.paymentStatus === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'refunded': return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConfirmPayment = async (paymentId: string) => {
    try {
      const response = await api.put(`/admin/orders/${paymentId}`, {
        paymentStatus: 'paid'
      });

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Payment confirmed successfully',
        });
        fetchPayments();
      }
    } catch (error: any) {
      console.error('Error confirming payment:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to confirm payment',
        variant: 'destructive',
      });
    }
  };

  const handleRefundPayment = async (paymentId: string) => {
    try {
      const response = await api.put(`/admin/orders/${paymentId}`, {
        paymentStatus: 'refunded'
      });

      if (response.success) {
        toast({
          title: 'Success',
          description: 'Payment refunded successfully',
        });
        fetchPayments();
      }
    } catch (error: any) {
      console.error('Error refunding payment:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to refund payment',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const stats = {
    total: payments.length,
    confirmed: payments.filter(p => p.paymentStatus === 'paid').length,
    pending: payments.filter(p => p.paymentStatus === 'pending').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Confirmation</h1>
        <p className="text-gray-600 mt-1">Manage and confirm customer payments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
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
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
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
                placeholder="Search payments..."
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
              <option value="paid">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
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
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{payment.customerName}</div>
                        <div className="text-gray-500">{payment.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(payment.paymentStatus)}
                        <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.paymentStatus)}`}>
                          {payment.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(payment.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowDetailsModal(true);
                          }}
                          className="text-orange-600 hover:text-orange-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {payment.paymentStatus === 'pending' && (
                          <button
                            onClick={() => handleConfirmPayment(payment.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Confirm Payment"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        
                        {payment.paymentStatus === 'paid' && (
                          <button
                            onClick={() => handleRefundPayment(payment.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Refund Payment"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Details Modal */}
      {showDetailsModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Transaction ID</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPayment.transactionId}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Order ID</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPayment.orderNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Customer</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPayment.customerName}</p>
                  <p className="text-sm text-gray-500">{selectedPayment.customerEmail}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Amount</span>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(selectedPayment.amount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Payment Method</span>
                  <p className="text-lg font-semibold text-gray-900">{selectedPayment.paymentMethod}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Status</span>
                  <div className="flex items-center">
                    {getStatusIcon(selectedPayment.paymentStatus)}
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPayment.paymentStatus)}`}>
                      {selectedPayment.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Created At</span>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(selectedPayment.createdAt)}</p>
                </div>
                {selectedPayment.paidAt && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Paid At</span>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(selectedPayment.paidAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
