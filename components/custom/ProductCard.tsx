'use client';

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

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
  const { toast } = useToast();
  const router = useRouter();

  // Handle both API format (price) and legacy format (currentPrice)
  const productPrice = product.price || product.currentPrice || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate ID exists
    if (!product.id || product.id === null || product.id === undefined || product.id === '') {
      console.error('❌ Invalid product ID:', product.id);
      toast({
        title: "Error",
        description: "Cannot add this product to cart. Invalid product ID.",
        variant: "destructive",
      });
      return;
    }
    
    // Add to cart using the context (supports both string and number IDs)
    addToCart({
      id: product.id, // Use ID as-is (string or number)
      name: product.name,
      description: product.description,
      currentPrice: productPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image
    });
    
    // Show toast notification
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
    
    // Call the optional callback if provided
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate ID exists
    if (!product.id || product.id === null || product.id === undefined || product.id === '') {
      console.error('❌ Invalid product ID:', product.id);
      toast({
        title: "Error",
        description: "Cannot purchase this product. Invalid product ID.",
        variant: "destructive",
      });
      return;
    }
    
    // Add to cart first (supports both string and number IDs)
    addToCart({
      id: product.id, // Use ID as-is (string or number)
      name: product.name,
      description: product.description,
      currentPrice: productPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image
    });
    
    // Navigate to checkout
    router.push('/checkout');
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

          {/* Price and Action Buttons */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            {/* Price Section */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-orange-500 text-xl font-bold">
                ${Number(productPrice).toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > productPrice && (
                <span className="text-gray-400 text-sm line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={handleAddToCart} 
                className="flex-1 bg-orange-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-1"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow} 
                className="flex-1 bg-black text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                aria-label={`Buy ${product.name} now`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>

  );
};

export default ProductCard;
