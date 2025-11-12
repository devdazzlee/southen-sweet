'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Plus,
  FileText,
  Image,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  MoreVertical,
  Save,
  Trash2,
  Upload,
  Clock
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface HomepageSection {
  id: string;
  title: string;
  content: string;
  type: 'hero' | 'about' | 'products' | 'testimonials' | 'contact';
  status: 'active' | 'inactive';
  order: number;
  updatedAt: string;
}

interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'homepage' | 'reviews'>('testimonials');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchContent = async () => {
      setIsLoading(true);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock testimonials data
      setTestimonials([
        {
          id: '1',
          name: 'Sarah Johnson',
          role: 'Licorice Enthusiast',
          content: 'The best licorice I\'ve ever tasted! The quality is outstanding and the flavors are amazing.',
          rating: 5,
          image: '/images/user1.png',
          status: 'published',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-10',
        },
        {
          id: '2',
          name: 'Mike Chen',
          role: 'Candy Collector',
          content: 'Great variety of flavors and excellent customer service. Highly recommended!',
          rating: 5,
          image: '/images/user2.png',
          status: 'published',
          createdAt: '2024-01-12',
          updatedAt: '2024-01-12',
        },
        {
          id: '3',
          name: 'Emily Davis',
          role: 'Food Blogger',
          content: 'Perfect texture and authentic taste. My readers love these licorice ropes!',
          rating: 4,
          image: '/images/user3.png',
          status: 'pending',
          createdAt: '2024-01-14',
          updatedAt: '2024-01-14',
        },
        {
          id: '4',
          name: 'David Wilson',
          role: 'Retailer',
          content: 'Fast shipping and great packaging. The products arrived in perfect condition.',
          rating: 5,
          image: '/images/user4.png',
          status: 'rejected',
          createdAt: '2024-01-13',
          updatedAt: '2024-01-15',
        },
      ]);

      // Mock homepage sections data
      setHomepageSections([
        {
          id: '1',
          title: 'Hero Section',
          content: 'Welcome to Licorice Ropes - Premium Quality Licorice for Every Taste',
          type: 'hero',
          status: 'active',
          order: 1,
          updatedAt: '2024-01-15',
        },
        {
          id: '2',
          title: 'About Us',
          content: 'We are passionate about creating the finest licorice products using traditional methods and premium ingredients.',
          type: 'about',
          status: 'active',
          order: 2,
          updatedAt: '2024-01-14',
        },
        {
          id: '3',
          title: 'Our Products',
          content: 'Discover our wide range of licorice flavors, from classic black to fruity varieties.',
          type: 'products',
          status: 'active',
          order: 3,
          updatedAt: '2024-01-13',
        },
        {
          id: '4',
          title: 'Customer Testimonials',
          content: 'See what our customers say about our products and service.',
          type: 'testimonials',
          status: 'active',
          order: 4,
          updatedAt: '2024-01-12',
        },
      ]);

      // Mock reviews data
      setReviews([
        {
          id: '1',
          productId: '1',
          productName: 'Classic Black Licorice',
          customerName: 'Lisa Brown',
          customerEmail: 'lisa.brown@email.com',
          rating: 5,
          content: 'Absolutely delicious! The texture is perfect and the flavor is authentic.',
          status: 'approved',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          productId: '2',
          productName: 'Red Twists',
          customerName: 'John Smith',
          customerEmail: 'john.smith@email.com',
          rating: 4,
          content: 'Great taste, but could be a bit softer. Overall satisfied with the purchase.',
          status: 'pending',
          createdAt: '2024-01-14',
        },
        {
          id: '3',
          productId: '3',
          productName: 'Green Apple Ropes',
          customerName: 'Maria Garcia',
          customerEmail: 'maria.garcia@email.com',
          rating: 5,
          content: 'Love the green apple flavor! Perfect balance of sweet and tart.',
          status: 'approved',
          createdAt: '2024-01-13',
        },
        {
          id: '4',
          productId: '1',
          productName: 'Classic Black Licorice',
          customerName: 'Robert Taylor',
          customerEmail: 'robert.taylor@email.com',
          rating: 2,
          content: 'Too hard and not enough flavor. Expected better quality.',
          status: 'rejected',
          createdAt: '2024-01-12',
        },
      ]);
      
      setIsLoading(false);
    };

    fetchContent();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'approved':
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
      case 'approved':
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected':
      case 'inactive': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || testimonial.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || review.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const contentStats = {
    testimonials: {
      total: testimonials.length,
      published: testimonials.filter(t => t.status === 'published').length,
      pending: testimonials.filter(t => t.status === 'pending').length,
      rejected: testimonials.filter(t => t.status === 'rejected').length,
    },
    reviews: {
      total: reviews.length,
      approved: reviews.filter(r => r.status === 'approved').length,
      pending: reviews.filter(r => r.status === 'pending').length,
      rejected: reviews.filter(r => r.status === 'rejected').length,
    },
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage testimonials, homepage content, and product reviews</p>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors active:bg-black/50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`py-2 px-1 border-b-2 font-medium text-sm active:bg-black/50 ${
              activeTab === 'testimonials'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Testimonials ({testimonials.length})
          </button>
          <button
            onClick={() => setActiveTab('homepage')}
            className={`py-2 px-1 border-b-2 font-medium text-sm active:bg-black/50 ${
              activeTab === 'homepage'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Homepage Sections ({homepageSections.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2 px-1 border-b-2 font-medium text-sm active:bg-black/50 ${
              activeTab === 'reviews'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Product Reviews ({reviews.length})
          </button>
        </nav>
      </div>

      {/* Stats Cards */}
      {activeTab === 'testimonials' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Testimonials</p>
                <p className="text-2xl font-bold text-gray-900">{contentStats.testimonials.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{contentStats.testimonials.published}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{contentStats.testimonials.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{contentStats.testimonials.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{contentStats.reviews.total}</p>
              </div>
              <Star className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{contentStats.reviews.approved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{contentStats.reviews.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{contentStats.reviews.rejected}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Status</option>
              {activeTab === 'testimonials' && (
                <>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </>
              )}
              {activeTab === 'reviews' && (
                <>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </>
              )}
              {activeTab === 'homepage' && (
                <>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </>
              )}
            </select>
            
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:bg-black/50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Table */}
      {activeTab === 'testimonials' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
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
                {filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={testimonial.image || '/images/user1.png'}
                            alt={testimonial.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{testimonial.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(testimonial.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(testimonial.status)}`}>
                        {getStatusIcon(testimonial.status)}
                        <span className="ml-1 capitalize">{testimonial.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(testimonial.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedItem(testimonial)}
                          className="text-orange-600 hover:text-orange-900 p-1 active:bg-black/50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 active:bg-black/50"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 active:bg-black/50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reviews Table */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Review
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
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
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{review.customerName}</div>
                        <div className="text-sm text-gray-500">{review.customerEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{review.productName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{review.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                        {getStatusIcon(review.status)}
                        <span className="ml-1 capitalize">{review.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(review.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedItem(review)}
                          className="text-orange-600 hover:text-orange-900 p-1 active:bg-black/50"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1 active:bg-black/50">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Homepage Sections */}
      {activeTab === 'homepage' && (
        <div className="space-y-4">
          {homepageSections.map((section) => (
            <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">Type: {section.type} • Order: {section.order}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(section.status)}`}>
                    {getStatusIcon(section.status)}
                    <span className="ml-1 capitalize">{section.status}</span>
                  </span>
                  <button className="text-blue-600 hover:text-blue-900 p-1 active:bg-black/50">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{section.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last updated: {formatDate(section.updatedAt)}</span>
                <div className="flex items-center space-x-2">
                  <button className="text-green-600 hover:text-green-900 active:bg-black/50">Activate</button>
                  <button className="text-red-600 hover:text-red-900 active:bg-black/50">Deactivate</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
