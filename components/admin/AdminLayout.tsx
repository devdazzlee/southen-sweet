'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  LogOut,
  Menu,
  X,
  Shield,
  Bell,
  Search,
  User,
  Edit,
  Save,
  XCircle,
  Layers,
  Mail,
  Send,
  Palette,
  Tag,
  Archive,
  RotateCcw
} from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUser, setAdminUser] = useState({
    name: 'Super Admin',
    email: 'admin@southernsweetandsour.com',
    role: 'Super Admin',
    avatar: null
  });
  const router = useRouter();
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, current: pathname === '/admin' },
    { name: 'Products', href: '/admin/products', icon: Package, current: pathname === '/admin/products' },
    { name: 'Categories', href: '/admin/categories', icon: Layers, current: pathname === '/admin/categories' },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, current: pathname === '/admin/orders' },
    { name: 'Flavors', href: '/admin/flavors', icon: Palette, current: pathname === '/admin/flavors' },
    { name: 'Discounts', href: '/admin/discounts', icon: Tag, current: pathname === '/admin/discounts' },
    { name: 'Inventory', href: '/admin/inventory', icon: Archive, current: pathname === '/admin/inventory' },
  ];

  useEffect(() => {
    // Only check authentication for admin routes
    if (!pathname.startsWith('/admin')) {
      return;
    }

    // Check authentication status
    const checkAuth = () => {
      const adminAuth = document.cookie.includes('adminAuth=true');
      const adminUserCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('adminUser='));
      
      if (!adminAuth || !adminUserCookie) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
        return;
      }

      try {
        const userData = JSON.parse(decodeURIComponent(adminUserCookie.split('=')[1]));
        setAdminUser({
          name: userData.role || 'Admin User',
          email: userData.email || 'admin@southernsweetandsour.com',
          role: userData.role || 'Admin',
          avatar: null
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid session data:', error);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    // Clear all admin session data
    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'adminUser=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleAdminDetails = () => {
    setShowAdminModal(true);
  };

  const handleSaveAdminDetails = () => {
    // Save admin details logic here
    setShowAdminModal(false);
  };

  // Check if current route is admin route
  const isAdminRoute = pathname.startsWith('/admin');

  // If it's an admin route, render admin layout
  if (isAdminRoute) {
    // Don't render layout for login page
    if (pathname === '/admin/login') {
      return <>{children}</>;
    }

    return (
      <div className={`min-h-screen bg-gray-50`}>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-gray-200 shadow-lg border-r`}>
          
          {/* Logo Section */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">Licorice Ropes</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-black/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-orange-100 text-orange-700 active:bg-black/50'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-black/50'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      item.current
                        ? 'text-orange-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Admin User Info */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                {adminUser.avatar ? (
                  <Image
                    src={adminUser.avatar}
                    alt={adminUser.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-900">
                  {adminUser.name}
                </p>
                <p className="text-xs truncate text-gray-500">
                  {adminUser.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100 hover:text-gray-900 active:bg-black/50"
            >
              <LogOut className="mr-3 h-4 w-4 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top bar */}
          <div className="sticky top-0 z-10 shadow-sm border-b bg-white border-gray-200">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 active:bg-black/50"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div className="ml-4 lg:ml-0">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {navigation.find(item => item.current)?.name || 'Dashboard'}
                  </h2>
                </div>
              </div>
              
              <div className="relative flex items-center space-x-4">
                {/* Search */}
                <div className="hidden md:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-64 pl-10 pr-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Notifications */}
                {/* <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -mt-1 ml-4 w-2 h-2 bg-red-500 rounded-full"></span>
                </button> */}

                {/* Admin Profile */}
                <div className="relative">
                  <button
                    onClick={handleAdminDetails}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors active:bg-black/50"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      {adminUser.avatar ? (
                        <Image
                          src={adminUser.avatar}
                          alt={adminUser.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{adminUser.name}</p>
                      <p className="text-xs text-gray-500">{adminUser.role}</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <main className="p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)]">
              <div className="p-6">
                {children}
              </div>
            </div>
          </main>
        </div>

        {/* Admin Details Modal */}
        {showAdminModal && (
          <div className="fixed flex items-center justify-center inset-0 bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Admin Details</h3>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="text-gray-400 hover:text-gray-600 active:bg-black/50 p-1 rounded"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={adminUser.name}
                    onChange={(e) => setAdminUser({...adminUser, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={adminUser.email}
                    onChange={(e) => setAdminUser({...adminUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={adminUser.role}
                    onChange={(e) => setAdminUser({...adminUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 active:bg-black/50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdminDetails}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 active:bg-black/50 flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // For non-admin routes, render normal layout with header and footer
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
