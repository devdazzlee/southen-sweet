'use client';
import { siteData } from "@/content";
import ProductCard from "@/components/custom/ProductCard";
import { useState } from "react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
}

const ProductPage = () => {
  const { products } = siteData;
  
  // State for filtering and pagination
  const [sortBy, setSortBy] = useState("default");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

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
      filteredProducts = [...filteredProducts].sort((a, b) => a.currentPrice - b.currentPrice);
      break;
    case "price-desc":
      filteredProducts = [...filteredProducts].sort((a, b) => b.currentPrice - a.currentPrice);
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

  return (
    <div className="w-full h-full bg-white py-32">
      {/* Main Content */}
      <div className="layout w-full h-full flex flex-col gap-10 py-16">
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
