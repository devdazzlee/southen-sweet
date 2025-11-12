'use client';
import ProductCard from "@/components/custom/ProductCard";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/axios";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  stock: number;
  rating: number;
  reviewCount: number;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filtering and pagination
  const [sortBy, setSortBy] = useState("default");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products', { 
          page: 1, 
          limit: 100 
        });
        
        if (response.success) {
          setProducts(response.data.products);
        } else {
          setError('Failed to load products');
        }
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  let filteredProducts = products;
  
  // Apply search filter
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply sorting
  switch (sortBy) {
    case "name-asc":
      filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      filteredProducts = [...filteredProducts].sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case "price-desc":
      filteredProducts = [...filteredProducts].sort((a, b) => Number(b.price) - Number(a.price));
      break;
    default:
      // Keep original order
      break;
  }

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
  };

  // Reset page when filters change
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF8C00] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-[#E67E00]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white py-32">
      {/* Main Content */}
      <div className="layout w-full h-full flex flex-col gap-10 py-16">
        {/* Bulk Discount Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                🎉 Buy More, Save More!
              </h3>
              <p className="text-white/90 text-sm sm:text-base">
                Get automatic discounts when you buy in bulk
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-white text-xs sm:text-sm font-semibold block">1-2 ropes</span>
                <span className="text-white text-xs">$7.99 each</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-white text-xs sm:text-sm font-semibold block">3-5 ropes</span>
                <span className="text-white text-xs">$6.99 each</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-white text-xs sm:text-sm font-semibold block">6-10 ropes</span>
                <span className="text-white text-xs">$6.49 each</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                <span className="text-white text-xs sm:text-sm font-semibold block">11+ ropes</span>
                <span className="text-white text-xs">$5.99 each</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-7 items-center">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px] bg-white text-black">
                <SelectValue placeholder="Default Sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default" className="bg-white text-black">Default Sorting</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Items Per Page */}
            <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
              <SelectTrigger className="w-[140px] ">
                <SelectValue placeholder="Show: 12" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">Show: 09</SelectItem>
                <SelectItem value="12">Show: 12</SelectItem>
                <SelectItem value="4">Show: 4</SelectItem>
                <SelectItem value="8">Show: 8</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="text-gray-600 font-inter text-lg font-regular h-full">
            Show {startIndex + 1} - {Math.min(endIndex, totalProducts)} Of {totalProducts} Product
          </div>
        </div>

        {/* Product Grid - 4 columns, responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                className="hover:scale-105 transition-transform duration-300"
              />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50 border border-[#D2D2D2] rounded-sm disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-[#A2A2A2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded ${
                currentPage === page 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 disabled:opacity-50 border border-[#D2D2D2] rounded-sm disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 text-[#A2A2A2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
