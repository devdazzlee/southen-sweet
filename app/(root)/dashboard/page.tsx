'use client';
import { useState } from 'react';
import { siteData } from '@/content';
import Button from '@/components/custom/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/contexts/FavoritesContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Star,
  Edit3,
  LogOut,
  MessageSquare
} from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'completed' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
  trackingNumber?: string;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  avatar: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
}

type DashboardTab = 'profile' | 'orders' | 'favorites' | 'addresses' | 'feedback';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const { favorites, notifications, markNotificationAsRead, clearAllNotifications, addNotification } = useFavorites();
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
    category: 'general'
  });

  // Mock user data
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "New York",
    zipCode: "10001",
    country: "United States",
    avatar: "/images/user1.png",
    memberSince: "January 2023",
    totalOrders: 12,
    totalSpent: 156.00
  });

  // Mock orders data
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 24.00,
      items: 3,
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "shipped",
      total: 18.00,
      items: 2,
      trackingNumber: "TRK987654321"
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "processing",
      total: 32.00,
      items: 4
    }
  ]);

  // Remove this line as favorites comes from useFavorites context

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Image
              src={profileData.avatar}
              alt="Profile"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full hover:bg-orange-600 transition-colors">
              <Edit3 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
            <p className="text-gray-600">{profileData.email}</p>
            <p className="text-sm text-gray-500">Member since {profileData.memberSince}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-500">{profileData.totalOrders}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileUpdate('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profileData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profileData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profileData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            {isEditing ? (
              <select
                value={profileData.country}
                onChange={(e) => handleProfileUpdate('country', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg">{profileData.country}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{profileData.totalOrders}</div>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">${profileData.totalSpent.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Total Spent</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-gray-900">4.8</div>
          <div className="text-sm text-gray-500">Average Rating</div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Order History</h3>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Order #{order.id}</h4>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">${order.total.toFixed(2)}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {order.items} item{order.items > 1 ? 's' : ''}
                  {order.trackingNumber && (
                    <span className="ml-4">Tracking: {order.trackingNumber}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                      Reorder
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFavoritesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Favorite Products</h3>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-500 mb-2">No favorites yet</h4>
            <p className="text-gray-400 mb-4">Start adding products to your favorites!</p>
              <Button href="product" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                Browse Products
              </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-500">${product.currentPrice.toFixed(2)}</span>
                  <Button href="checkout" className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors text-sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderAddressesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Shipping Addresses</h3>
          <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Add New Address
          </Button>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Default Address</h4>
              <p className="text-gray-600">{profileData.name}</p>
              <p className="text-gray-600">{profileData.address}</p>
              <p className="text-gray-600">{profileData.city}, {profileData.zipCode}</p>
              <p className="text-gray-600">{profileData.country}</p>
            </div>
            <div className="flex space-x-2">
              <Button  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Edit
              </Button>
              <Button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );




  const renderFeedbackTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Rate & Feedback</h3>
        
        <div className="space-y-6">
          {/* Rating Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Rate Your Experience</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                  className="text-2xl transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= feedback.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {feedback.rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {feedback.rating === 1 && 'Poor'}
                {feedback.rating === 2 && 'Fair'}
                {feedback.rating === 3 && 'Good'}
                {feedback.rating === 4 && 'Very Good'}
                {feedback.rating === 5 && 'Excellent'}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
            <select
              value={feedback.category}
              onChange={(e) => setFeedback(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="general">General Feedback</option>
              <option value="product">Product Quality</option>
              <option value="shipping">Shipping & Delivery</option>
              <option value="customer-service">Customer Service</option>
              <option value="website">Website Experience</option>
            </select>
          </div>

          {/* Comment Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Comments</label>
            <textarea
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Tell us about your experience..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (feedback.rating > 0 || feedback.comment.trim()) {
                  addNotification('feedback', 'Thank you for your feedback! We appreciate your input.');
                  setFeedback({ rating: 0, comment: '', category: 'general' });
                }
              }}
              disabled={feedback.rating === 0 && !feedback.comment.trim()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Feedback</h3>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-500 ml-2">5 stars - Product Quality</span>
            </div>
            <p className="text-gray-700">"Amazing products! Great quality and fast shipping."</p>
            <p className="text-xs text-gray-500 mt-2">2 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
  ];

  return (
    <div className="w-full h-full bg-gray-50 py-32">
      <div className="layout w-full h-full py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your account, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as DashboardTab)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'favorites' && renderFavoritesTab()}
            {activeTab === 'addresses' && renderAddressesTab()}
            {activeTab === 'feedback' && renderFeedbackTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
