'use client';
import { siteData } from "@/content";
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

interface Product {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  discount: number | null;
  image: string;
  backgroundColor?: string;
}

interface DetailedProduct extends Product {
  brand: string;
  sales: number;
  rating: number;
  detailedDescription: string;
  nutritionFacts: {
    amountPerServing: string;
    servingsPerContainer: string;
    servingSize: string;
    calories: number;
    totalFat: number;
    sodium: number;
    totalCarbohydrate: number;
    totalSugars: number;
    addedSugars: number;
    protein: number;
  };
  netWeight: string;
  ingredients: string;
  allergens: string;
 }

const SingleProductPage = () => {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const { products } = siteData;
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find(p => p.id === productId);
      if (foundProduct) {
        // Transform basic product to detailed product with mock data
        const detailedProduct: DetailedProduct = {
          ...foundProduct,
          brand: "Southern Sweet",
          sales: Math.floor(Math.random() * 500) + 100,
          rating: 4.8,
          detailedDescription: `A classic candy with a bold twist, featuring rich ${foundProduct.name.toLowerCase()} made from natural ingredients for an intense, aromatic flavor.`,
          nutritionFacts: {
            servingsPerContainer: "3 Servings per container",
            servingSize: "1/3 Pieces (27g)",
            amountPerServing: "Amount per serving",
            calories: 100,
            totalFat: 0.3,
            sodium: 20,
            totalCarbohydrate: 21,
            totalSugars: 12,
            addedSugars: 12,
            protein: 12
          },
          netWeight: "Net Weight: 80g",
          ingredients: "Corn Syrup, Wheat flour, sugar modified corn scratch, Licorice extract, palm and coconut oil, salt, glycerin, mono and diglycerides, artificial flavours, colors: Caramel",
          allergens: "Contains: Wheat (gluten). May contains traces of Soy."
        };

        setProduct(detailedProduct);

        // Get related products (4 random products excluding current)
        const otherProducts = products.filter(p => p.id !== productId);
        const shuffled = otherProducts.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      }
    }
  }, [productId, products]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      currentPrice: product.currentPrice,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      backgroundColor: product.backgroundColor
    });
  };

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
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

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full h-full bg-white py-32">

      {/* Main Content */}
      <div className="layout py-8 w-full h-full">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 sm:p-4 md:p-6 mb-6 md:mb-16">
          {/* Product Image */}
          <div className="bg-[#FFF9ED] w-full flex items-center justify-center aspect-square max-h-[730px] sm:max-w-[400px] md:max-w-full lg:max-w-[450px] xl:max-w-[600px] mx-auto">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover h-full w-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-16 p-8">
            {/* Brand and Name */}
            <div>
              <p className="text-lg font-regular font-inter text-gray-600 mb-2">{product.brand}</p>
              <h1 className="text-5xl font-semibold font-inter text-black mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-lg font-medium font-inter text-gray-600">
                <span>{product.sales} Sold</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <span>{product.rating}</span>
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 font-inter text-lg font-regular">{product.detailedDescription}</p>

            {/* Nutrition Facts */}
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

            {/* Ingredients */}
            <div className="flex flex-col gap-4">

            {/* Net Weight */}
            <h3 className="font-semibold text-2xl font-inter flex">{product.netWeight}</h3>
              <h4 className="font-semibold text-lg font-inter text-gray-600">Ingredients:</h4>
              <p className="text-sm text-gray-600">{product.ingredients}</p>
            </div>


            {/* Price and Action Buttons */}
            <div className="border-0 w-full max-w-md flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-base sm:text-lg font-regular font-inter text-black">Price</p>
                  <span className="text-3xl sm:text-4xl font-regular font-inter text-black">
                    ${product.currentPrice.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-[#FBC332] w-full sm:w-auto h-12 hover:bg-white text-black px-6 py-3 md:px-8 font-inter md:py-2 text-base md:text-lg font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  Add to Cart
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => product && handleToggleFavorite(product)}
                  className={`border w-full sm:w-1/2 h-full px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-200 ${
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
                <button className="border w-1/2 h-full border-gray-300 px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
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
        <ProductReviews productId={product.id} productName={product.name} />
      </div>
    </div>
  );
};

export default SingleProductPage;
