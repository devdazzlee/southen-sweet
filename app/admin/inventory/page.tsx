'use client';

import { useState, useEffect } from 'react';
import { Package, TrendingUp, TrendingDown, AlertTriangle, Plus, Minus, Edit } from 'lucide-react';
import { api } from '@/lib/axios';

interface InventoryLog {
  id: string;
  type: string;
  quantity: number;
  reason?: string;
  notes?: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    image: string;
    sku: string;
    stock: number;
  };
}

interface Product {
  id: string;
  name: string;
  image: string;
  sku: string;
  stock: number;
  price: number;
  category: string;
}

export default function InventoryPage() {
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [summary, setSummary] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalStock: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentForm, setAdjustmentForm] = useState({
    type: 'STOCK_IN',
    quantity: '',
    reason: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [summaryData, logsData, lowStockData] = await Promise.all([
        api.get('/inventory/summary'),
        api.get('/inventory/logs?limit=20'),
        api.get('/inventory/low-stock?threshold=10')
      ]);

      if (summaryData.success) {
        setSummary(summaryData.data.summary);
      }
      if (logsData.success) {
        setLogs(logsData.data.logs);
      }
      if (lowStockData.success) {
        setLowStockProducts(lowStockData.data.products);
      }
    } catch (error: any) {
      console.error('Error fetching inventory data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdjustStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const data = await api.post('/inventory/adjust', {
        productId: selectedProduct.id,
        type: adjustmentForm.type,
        quantity: parseInt(adjustmentForm.quantity),
        reason: adjustmentForm.reason,
        notes: adjustmentForm.notes
      });

      if (data.success) {
        alert('Inventory adjusted successfully');
        setShowAdjustModal(false);
        resetForm();
        fetchData();
      }
    } catch (error: any) {
      alert(error.message || 'Failed to adjust inventory');
    }
  };

  const openAdjustModal = (product: Product) => {
    setSelectedProduct(product);
    setShowAdjustModal(true);
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setAdjustmentForm({
      type: 'STOCK_IN',
      quantity: '',
      reason: '',
      notes: ''
    });
  };

  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case 'STOCK_IN':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'STOCK_OUT':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'ADJUSTMENT':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'DAMAGE':
      case 'EXPIRED':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'STOCK_IN':
      case 'RETURN':
        return 'bg-green-100 text-green-800';
      case 'STOCK_OUT':
        return 'bg-red-100 text-red-800';
      case 'ADJUSTMENT':
        return 'bg-blue-100 text-blue-800';
      case 'DAMAGE':
      case 'EXPIRED':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-600 mt-1">Manage product inventory and stock levels</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-orange-600">{summary.lowStockProducts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{summary.outOfStockProducts}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Stock</p>
              <p className="text-2xl font-bold text-green-600">{summary.totalStock}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Low Stock Products */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                    <p className="text-sm font-bold text-orange-600">Stock: {product.stock}</p>
                  </div>
                  <button
                    onClick={() => openAdjustModal(product)}
                    className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Inventory Logs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Inventory Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={log.product.image} alt={log.product.name} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <div className="font-medium text-gray-900">{log.product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {log.product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getLogTypeColor(log.type)}`}>
                      {getLogTypeIcon(log.type)}
                      {log.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`font-medium ${log.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {log.quantity > 0 ? '+' : ''}{log.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {log.product.stock}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {log.reason || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {showAdjustModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Adjust Stock</h2>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <h3 className="font-medium text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-600">Current Stock: {selectedProduct.stock}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAdjustStock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                <select
                  value={adjustmentForm.type}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="STOCK_IN">Stock In (+)</option>
                  <option value="STOCK_OUT">Stock Out (-)</option>
                  <option value="ADJUSTMENT">Adjustment</option>
                  <option value="RETURN">Return (+)</option>
                  <option value="DAMAGE">Damage (-)</option>
                  <option value="EXPIRED">Expired (-)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  value={adjustmentForm.quantity}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, quantity: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  value={adjustmentForm.reason}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Received new shipment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={adjustmentForm.notes}
                  onChange={(e) => setAdjustmentForm({ ...adjustmentForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Additional notes..."
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowAdjustModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Adjust Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
