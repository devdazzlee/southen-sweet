'use client';

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string | number;
  name: string;
  description: string;
  price?: number;
  currentPrice?: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  backgroundColor?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

const ProductCard = ({ product, onAddToCart, className }: ProductCardProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addToCart } = useCart();

  // Handle both API format (price) and legacy format (currentPrice)
  const productPrice = product.price || product.currentPrice || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart using the context
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      currentPrice: productPrice,
      price: productPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      backgroundColor: product.backgroundColor
    });
    
    // Call the optional callback if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Truncate description to approximately 1 line (60 characters)
  const truncatedDescription = product.description.length > 60 
    ? product.description.substring(0, 60) + "..."
    : product.description;

  return (
    <Link key={product.id} href={`/product/${product.id}`} className="block w-full">
      <Card className={`w-full h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105 overflow-hidden flex flex-col bg-white ${className}`}>
        {/* Product Image Container */}
        <div className="relative h-[353px] w-full bg-[#FFF9ED] flex items-center justify-center overflow-hidden flex-shrink-0">
          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            width={280}
            height={280}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
            // priority={false}
            // quality={95}
            // placeholder="blur"
            // blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {/* Discount Tag */}
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
              -{product.discount}%
            </div>
          )}
        </div>
          
        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow  ">
          {/* Product Name */}
          <h2 className="text-gray-800 text-lg font-bold font-poppins mb-2 line-clamp-1">
            {product.name}
          </h2>

          {/* Description */}
          <div className="mb-3 flex-grow">
            <p className="text-gray-600 text-sm font-normal font-inter leading-relaxed">
              {isDescriptionExpanded ? product.description : truncatedDescription}
            </p>
            
            {/* Read More/Show Less Link */}
            {product.description.length > 60 && (
              <button 
                onClick={handleReadMore}
                className="text-orange-500 text-xs font-medium hover:underline mt-1 inline-block"
              >
                {isDescriptionExpanded ? 'Show Less' : 'Read More...'}
              </button>
            )}
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
            {/* Price Section */}
            <div className="flex items-center gap-2">
              <span className="text-orange-500 text-xl font-bold">
                ${Number(productPrice).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > productPrice && (
                <span className="text-gray-400 text-sm line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart} 
              className="p-2  transition-all duration-200 hover:scale-110 "
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="w-8 h-8" />
            </button>
          </div>
        </div>
      </Card>
    </Link>

  );
};

export default ProductCard;
