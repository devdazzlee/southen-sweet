'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  Clock
} from 'lucide-react';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface ProductPerformance {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
  category: string;
}

interface CustomerSegment {
  segment: string;
  count: number;
  percentage: number;
  avgOrderValue: number;
}

interface ReportData {
  salesData: SalesData[];
  productPerformance: ProductPerformance[];
  customerSegments: CustomerSegment[];
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  conversionMetrics: {
    visitors: number;
    sessions: number;
    conversionRate: number;
    avgSessionDuration: number;
  };
}

export default function AnalyticsReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('overview');

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setReportData({
        salesData: [
          { date: '2024-01-01', revenue: 1250, orders: 45, customers: 38 },
          { date: '2024-01-02', revenue: 1890, orders: 67, customers: 52 },
          { date: '2024-01-03', revenue: 2100, orders: 78, customers: 61 },
          { date: '2024-01-04', revenue: 1750, orders: 62, customers: 48 },
          { date: '2024-01-05', revenue: 2300, orders: 85, customers: 69 },
          { date: '2024-01-06', revenue: 1950, orders: 71, customers: 55 },
          { date: '2024-01-07', revenue: 2200, orders: 82, customers: 67 },
        ],
        productPerformance: [
          { id: '1', name: 'Classic Black Licorice', sales: 156, revenue: 2340, growth: 12.5, category: 'Classic' },
          { id: '2', name: 'Red Twists', sales: 134, revenue: 2010, growth: 8.3, category: 'Twists' },
          { id: '3', name: 'Green Apple Ropes', sales: 98, revenue: 1470, growth: -2.1, category: 'Fruity' },
          { id: '4', name: 'Strawberry Swirls', sales: 87, revenue: 1305, growth: 15.7, category: 'Swirls' },
          { id: '5', name: 'Cherry Bombs', sales: 76, revenue: 1140, growth: 5.2, category: 'Fruity' },
        ],
        customerSegments: [
          { segment: 'New Customers', count: 245, percentage: 35, avgOrderValue: 28.50 },
          { segment: 'Returning Customers', count: 320, percentage: 45, avgOrderValue: 45.20 },
          { segment: 'VIP Customers', count: 140, percentage: 20, avgOrderValue: 78.90 },
        ],
        topProducts: [
          { id: '1', name: 'Classic Black Licorice', sales: 156, revenue: 2340 },
          { id: '2', name: 'Red Twists', sales: 134, revenue: 2010 },
          { id: '3', name: 'Green Apple Ropes', sales: 98, revenue: 1470 },
          { id: '4', name: 'Strawberry Swirls', sales: 87, revenue: 1305 },
          { id: '5', name: 'Cherry Bombs', sales: 76, revenue: 1140 },
        ],
        conversionMetrics: {
          visitors: 12500,
          sessions: 18900,
          conversionRate: 3.2,
          avgSessionDuration: 4.5,
        },
      });
      
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!reportData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track performance and generate detailed reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedReport('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedReport === 'overview'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedReport('sales')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedReport === 'sales'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sales Analytics
          </button>
          <button
            onClick={() => setSelectedReport('products')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedReport === 'products'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Product Performance
          </button>
          <button
            onClick={() => setSelectedReport('customers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedReport === 'customers'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Customer Insights
          </button>
        </nav>
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(13450)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+12.5%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(498)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+8.2%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{formatNumber(245)}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+15.3%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{reportData.conversionMetrics.conversionRate}%</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">+0.3%</span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Chart Placeholder */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">Last 7 days</span>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sales chart would be rendered here</p>
                <p className="text-sm text-gray-400">Integration with Chart.js or Recharts</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {reportData.topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-semibold text-orange-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sales Analytics */}
      {selectedReport === 'sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <DollarSign className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Revenue chart</p>
                </div>
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Orders Trend</h3>
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Orders chart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Data Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Daily Sales Data</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.salesData.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(data.revenue)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.orders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.customers}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(data.revenue / data.orders)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Product Performance */}
      {selectedReport === 'products' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Performance Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Sales</h3>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Product sales chart</p>
                </div>
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
                <Package className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Category chart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Performance Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Product Performance Details</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.productPerformance.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(product.revenue)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${getGrowthColor(product.growth)}`}>
                          {getGrowthIcon(product.growth)}
                          <span className="ml-1 text-sm">{formatPercentage(product.growth)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Customer Insights */}
      {selectedReport === 'customers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {reportData.customerSegments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{segment.segment}</p>
                      <p className="text-sm text-gray-600">{segment.count} customers ({segment.percentage}%)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(segment.avgOrderValue)}</p>
                      <p className="text-sm text-gray-600">Avg Order Value</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Acquisition */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Customer Acquisition</h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Customer acquisition chart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conversion Metrics</h3>
              <Target className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(reportData.conversionMetrics.visitors)}</div>
                <div className="text-sm text-gray-600">Visitors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(reportData.conversionMetrics.sessions)}</div>
                <div className="text-sm text-gray-600">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{reportData.conversionMetrics.conversionRate}%</div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{reportData.conversionMetrics.avgSessionDuration}m</div>
                <div className="text-sm text-gray-600">Avg Session Duration</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
