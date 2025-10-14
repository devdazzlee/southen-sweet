'use client';

import { useState } from 'react';
import { Upload, Download, Edit } from 'lucide-react';
import { api } from '@/lib/axios';

export default function BulkOperationsPage() {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'update'>('import');
  const [file, setFile] = useState<File | null>(null);
  const [bulkUpdateType, setBulkUpdateType] = useState('price');
  const [updateValue, setUpdateValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      // This would need a backend endpoint
      alert('Import functionality: Upload CSV with columns: name, description, price, stock, category, flavors (comma-separated)');
      
      // await api.upload('/admin/products/bulk-import', formData);
      setFile(null);
    } catch (error: any) {
      alert(error.message || 'Import failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    setIsProcessing(true);
    try {
      // Get all products
      const data = await api.get('/admin/products?limit=1000');
      
      if (data.success) {
        const products = data.data.products;
        
        // Create CSV
        const headers = ['ID', 'Name', 'Price', 'Stock', 'Category', 'Brand', 'Flavors', 'SKU', 'Active'];
        const rows = products.map((p: any) => [
          p.id,
          p.name,
          p.price,
          p.stock,
          p.category,
          p.brand || '',
          Array.isArray(p.flavors) ? p.flavors.join(', ') : '',
          p.sku || '',
          p.isActive ? 'Yes' : 'No'
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        
        // Download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `products-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        alert('Products exported successfully!');
      }
    } catch (error: any) {
      alert(error.message || 'Export failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkUpdate = async () => {
    if (!updateValue) {
      alert('Please enter a value');
      return;
    }

    if (!confirm(`Are you sure you want to bulk update ${bulkUpdateType}?`)) return;

    setIsProcessing(true);
    try {
      alert(`Bulk ${bulkUpdateType} update would be implemented here. This requires a backend endpoint.`);
      // await api.post('/admin/products/bulk-update', {
      //   type: bulkUpdateType,
      //   value: updateValue,
      //   category: selectedCategory
      // });
    } catch (error: any) {
      alert(error.message || 'Bulk update failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Bulk Operations</h1>
        <p className="text-gray-600 mt-1">Import, export, and bulk update products</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('import')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'import'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Import Products
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'export'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Export Products
        </button>
        <button
          onClick={() => setActiveTab('update')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'update'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Bulk Update
        </button>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Upload className="w-6 h-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Import Products from CSV</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">Selected: {file.name}</p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>- Headers: name, description, price, stock, category, brand, flavors, sku</li>
                <li>- Flavors should be comma-separated: "Strawberry, Cherry, Grape"</li>
                <li>- Price should be numeric: 12.99</li>
                <li>- Stock should be integer: 100</li>
              </ul>
            </div>

            <button
              onClick={handleImport}
              disabled={!file || isProcessing}
              className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isProcessing ? 'Importing...' : 'Import Products'}
            </button>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-6 h-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Export Products to CSV</h2>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Export all your products to a CSV file. This includes all product information
              including flavors, stock levels, and pricing.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Export includes:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Product ID, Name, Description</li>
                <li>✓ Price, Stock, Category, Brand</li>
                <li>✓ Flavors (comma-separated)</li>
                <li>✓ SKU, Active Status</li>
              </ul>
            </div>

            <button
              onClick={handleExport}
              disabled={isProcessing}
              className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isProcessing ? 'Exporting...' : 'Export All Products'}
            </button>
          </div>
        </div>
      )}

      {/* Bulk Update Tab */}
      {activeTab === 'update' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Edit className="w-6 h-6 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">Bulk Update Products</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Type
              </label>
              <select
                value={bulkUpdateType}
                onChange={(e) => setBulkUpdateType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="price">Price (add/subtract amount)</option>
                <option value="discount">Discount Percentage</option>
                <option value="stock">Stock (add/subtract)</option>
                <option value="active">Active Status</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (optional)
              </label>
              <input
                type="text"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Leave empty for all products"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              {bulkUpdateType === 'active' ? (
                <select
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select status</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              ) : (
                <input
                  type="number"
                  step="0.01"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  placeholder={bulkUpdateType === 'price' ? 'e.g., 5 (add $5) or -5 (subtract $5)' : 'Enter value'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ Warning:</h4>
              <p className="text-sm text-yellow-800">
                This operation will update multiple products at once. Please review your settings carefully before proceeding.
              </p>
            </div>

            <button
              onClick={handleBulkUpdate}
              disabled={!updateValue || isProcessing}
              className="w-full bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isProcessing ? 'Processing...' : 'Apply Bulk Update'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
