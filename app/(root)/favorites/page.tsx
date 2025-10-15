'use client';

import { useFavorites } from '@/contexts/FavoritesContext';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import Button from '@/components/custom/Button';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleRemoveFavorite = (productId: number) => {
    removeFromFavorites(productId);
  };

  const handleAddToCart = (product: any) => {
    // Validate ID exists
    if (!product.id || product.id === null || product.id === undefined || product.id === '') {
      console.error('❌ Invalid product ID when adding to cart from favorites:', product.id);
      return;
    }
    
    addToCart({
      id: product.id, // Use ID as-is (string or number)
      name: product.name,
      description: product.description,
      currentPrice: Number(product.currentPrice || product.price || 0),
      originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
      discount: product.discount,
      image: product.image,
      backgroundColor: product.backgroundColor
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="w-full h-full bg-white py-32">
        <div className="layout w-full h-full py-10">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 mb-8">Start adding products to your favorites by clicking the heart icon.</p>
            <Link href="/product">
              <Button className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white py-32">
      <div className="layout w-full h-full py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600">{favorites.length} item{favorites.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                {/* Remove from favorites button */}
                <button
                  onClick={() => handleRemoveFavorite(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </button>
              </div>

              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${Number(product.currentPrice || product.price || 0).toFixed(2)}
                    </span>
                    {product.originalPrice && Number(product.originalPrice) > Number(product.currentPrice || product.price || 0) && (
                      <span className="text-sm text-gray-500 line-through">
                        ${Number(product.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </Button>
                  
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear all favorites button */}
        {favorites.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              onClick={() => {
                favorites.forEach(product => removeFromFavorites(product.id));
              }}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Clear All Favorites
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


