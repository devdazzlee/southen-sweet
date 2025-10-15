'use client';
import ProductCard from "@/components/custom/ProductCard";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/custom/Button";
import ButtonWithImage from "@/components/custom/ButtonWithImage";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { Heart, Star, StarHalf } from "lucide-react";
import ProductReviews from "@/components/product/ProductReviews";
import { api } from "@/lib/axios";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  backgroundColor?: string;
}

interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  isVerified: boolean;
  user?: {
    firstName: string;
    lastName: string;
  };
}

interface DetailedProduct {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  images?: string[];
  brand?: string;
  sales?: number;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  nutritionFacts?: any;
  weight?: string;
  ingredients?: string;
  allergens?: string;
  backgroundColor?: string;
  reviews?: Review[];
}

const SingleProductPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Fetch single product
        const response = await api.get(`/products/${productId}`);
        
        if (response.success && response.data) {
          // API returns { success: true, data: { product } }
          setProduct(response.data.product);
        } else {
          setError('Product not found');
        }

        // Fetch related products
        const relatedResponse = await api.get('/products', { 
          page: 1, 
          limit: 8 
        });
        
        if (relatedResponse.success && relatedResponse.data) {
          // Filter out current product and get first 4
          const filtered = relatedResponse.data.products.filter(
            (p: Product) => p.id !== productId
          );
          setRelatedProducts(filtered.slice(0, 4));
        }
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = (product: DetailedProduct) => {
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
    
    addToCart({
      id: product.id, // Use ID as-is (string or number)
      name: product.name,
      description: product.description,
      currentPrice: product.price,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      backgroundColor: product.backgroundColor
    });
    
    // Show toast notification
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: DetailedProduct) => {
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
    
    addToCart({
      id: product.id, // Use ID as-is (string or number)
      name: product.name,
      description: product.description,
      currentPrice: product.price,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      backgroundColor: product.backgroundColor
    });
    
    // Navigate to checkout
    router.push('/checkout');
  };

  const handleToggleFavorite = (product: DetailedProduct) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currentPrice: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        image: product.image
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-5 h-5 text-yellow-400 fill-current" />
      );
    }

    // Fill remaining stars as empty
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#FF8C00] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error || 'Product not found'}</p>
          <Link href="/product">
            <button className="px-6 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-[#E67E00]">
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white py-32">

      {/* Main Content */}
      <div className="layout py-8 w-full h-full">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 sm:p-4 md:p-6 mb-6 md:mb-16">
          {/* Product Image */}
          <div className="bg-[#FFF9ED] w-full flex items-center justify-center aspect-square max-h-[730px] sm:max-w-[400px] md:max-w-full lg:max-w-[450px] xl:max-w-[600px] mx-auto overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain h-full w-full p-4"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-16 p-8">
            {/* Brand and Name */}
            <div>
              <p className="text-lg font-regular font-inter text-gray-600 mb-2">{product.brand || 'Southern Sweet'}</p>
              <h1 className="text-5xl font-semibold font-inter text-black mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-lg font-medium font-inter text-gray-600">
                <span>{product.sales || 0} Sold</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <span>{product.rating || 0}</span>
                  <div className="flex items-center">
                    {renderStars(product.rating || 0)}
                  </div>
                  {product.reviewCount && <span>({product.reviewCount} reviews)</span>}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 font-inter text-lg font-regular">
              {product.description}
            </p>

            {/* Nutrition Facts */}
            {product.nutritionFacts && (
              <div className="bg-gray-50 p-6 rounded-lg flex flex-col gap-10">
                <h3 className="font-semibold text-2xl font-inter mb-2">Nutrition Facts</h3>
                <div className="flex flex-col  gap-2 pl-6">
                  <li className="font-medium text-black">{product.nutritionFacts.servingsPerContainer}</li>
                  <li className="font-medium text-black">{product.nutritionFacts.servingSize}</li>
                  <li className="font-medium text-black">{product.nutritionFacts.amountPerServing}</li>
                </div>
                <h3 className="font-semibold text-2xl font-inter flex gap-4">Calories<ul>{product.nutritionFacts.calories}</ul></h3>
                <div className="pl-4 border-b border-gray-200 flex flex-col gap-6">
                  <h4 className="font-medium border-b border-gray-200 text-black flex justify-between">Total Fat <p>{product.nutritionFacts.totalFat}g (0% Daily Value)</p></h4>
                  <h4 className="font-medium border-b border-gray-200 text-black flex justify-between">Sodium <p>{product.nutritionFacts.sodium}mg (1% Daily Value)</p></h4>
                  <h4 className="font-medium border-b border-gray-200 text-black flex justify-between">Total Carbohydrate <p>{product.nutritionFacts.totalCarbohydrate}g (8% Daily Value)</p></h4>
                  <h4 className="font-medium border-b border-gray-200 text-black flex justify-between">Total Sugars <p>{product.nutritionFacts.totalSugars}g (8% Daily Value)</p></h4>
                  <h4 className="font-medium border-b border-gray-200 text-black flex justify-between">Includes <p>{product.nutritionFacts.addedSugars}g Added Sugars (24% Daily Value)</p></h4>
                  <h4 className="font-medium border-b border-gray-200 text-black flex justify-between">Protein <p>{product.nutritionFacts.protein}mg</p></h4>
                </div>
              </div>
            )}

            {/* Ingredients */}
            <div className="flex flex-col gap-4">
              {/* Net Weight */}
              {product.weight && (
                <h3 className="font-semibold text-2xl font-inter flex">Net Weight: {product.weight}</h3>
              )}
              {product.ingredients && (
                <>
                  <h4 className="font-semibold text-lg font-inter text-gray-600">Ingredients:</h4>
                  <p className="text-sm text-gray-600">{product.ingredients}</p>
                </>
              )}
              {product.allergens && (
                <>
                  <h4 className="font-semibold text-lg font-inter text-gray-600">Allergens:</h4>
                  <p className="text-sm text-gray-600">{product.allergens}</p>
                </>
              )}
            </div>

            {/* Price and Action Buttons */}
            <div className="border-0 w-full max-w-md flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-base sm:text-lg font-regular font-inter text-black">Price</p>
                  <span className="text-3xl sm:text-4xl font-regular font-inter text-black">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#FBC332] flex-1 h-12 hover:bg-[#E6B02A] text-black px-6 py-3 font-inter text-base font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => handleBuyNow(product)}
                    className="bg-black flex-1 h-12 hover:bg-gray-800 text-white px-6 py-3 font-inter text-base font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Buy Now
                  </Button>
                </div>
                
                {/* Favorites Button */}
                <button 
                  onClick={() => product && handleToggleFavorite(product)}
                  className={`border w-full h-12 px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-200 ${
                    product && isFavorite(product.id)
                      ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      product && isFavorite(product.id) ? 'fill-current' : ''
                    }`} 
                  />
                  {product && isFavorite(product.id) ? 'Favorited' : 'Add to Favorites'}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Related Items */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-6 sm:gap-6">
            <h2 className="text-4xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-semibold font-inter text-black">Related Items</h2>
            
            <Button href="product" className="text-black inline-block font-inter sm:text-xl lg:text-2xl md:text-2xl hover:scale-105 transition-all duration-300"> 
              Looking For  
              <Image src="/images/Arrow 3.png" alt="arrow-right" width={150} height={0} className="w-full h-auto" />
            </Button>
          
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onAddToCart={handleAddToCart}
                className="hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>

        {/* Product Reviews Section */}
        <ProductReviews 
          productId={product.id} 
          productName={product.name}
          reviews={product.reviews || []}
        />
      </div>
    </div>
  );
};

export default SingleProductPage;
