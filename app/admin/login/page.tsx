'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Lock, User, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for dark mode preference
    const darkMode = localStorage.getItem('adminDarkMode') === 'true';
    setIsDarkMode(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }

    // Check if already authenticated
    const adminAuth = document.cookie.includes('adminAuth=true');
    if (adminAuth) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced authentication logic
    const validCredentials = [
      { email: 'admin@licoriceropes.com', password: 'admin123', role: 'Super Admin' },
      { email: 'manager@licoriceropes.com', password: 'manager123', role: 'Manager' },
      { email: 'staff@licoriceropes.com', password: 'staff123', role: 'Staff' }
    ];

    const user = validCredentials.find(
      cred => cred.email === formData.email && cred.password === formData.password
    );

    if (user) {
      // Store secure session data
      const sessionData = {
        email: user.email,
        role: user.role,
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).substring(7)
      };
      
      // Set secure cookie with session data
      document.cookie = `adminAuth=true; path=/; max-age=86400; secure; samesite=strict`;
      document.cookie = `adminUser=${encodeURIComponent(JSON.stringify(sessionData))}; path=/; max-age=86400; secure; samesite=strict`;
      
      // Store in localStorage for quick access
      localStorage.setItem('adminUser', JSON.stringify(sessionData));
      
      setSuccess('Login successful! Redirecting...');
      
      // Redirect after success message
      setTimeout(() => {
        router.push('/admin');
      }, 1000);
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className={`mt-6 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Admin Access
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Secure access to Licorice Ropes administration panel
          </p>
        </div>

        <div className={`py-8 px-6 shadow-xl rounded-lg border ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {success}
              </div>
            )}

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="admin@licoriceropes.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  ) : (
                    <Eye className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Access Admin Panel
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>Demo Credentials</span>
              </div>
            </div>

            <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-200'}`}>
              <p className={`text-xs mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available test accounts:</p>
              <div className="space-y-2">
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <div className="flex items-center mb-1">
                    <User className="w-3 h-3 mr-1 text-orange-500" />
                    <span className="font-medium">Super Admin</span>
                  </div>
                  <p className="text-xs ml-4">admin@licoriceropes.com / admin123</p>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <div className="flex items-center mb-1">
                    <User className="w-3 h-3 mr-1 text-blue-500" />
                    <span className="font-medium">Manager</span>
                  </div>
                  <p className="text-xs ml-4">manager@licoriceropes.com / manager123</p>
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  <div className="flex items-center mb-1">
                    <User className="w-3 h-3 mr-1 text-green-500" />
                    <span className="font-medium">Staff</span>
                  </div>
                  <p className="text-xs ml-4">staff@licoriceropes.com / staff123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className={`text-sm font-medium hover:underline transition-colors ${
              isDarkMode ? 'text-orange-400 hover:text-orange-300' : 'text-orange-600 hover:text-orange-500'
            }`}
          >
            ← Back to Licorice Ropes Store
          </a>
        </div>
      </div>
    </div>
  );
}
