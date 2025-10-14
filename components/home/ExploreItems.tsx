'use client';
import ProductCard from "@/components/custom/ProductCard";
import Image from "next/image";
import Button from "@/components/custom/Button"
import { useState, useEffect } from "react";
import { api } from "@/lib/axios";

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

const ExploreItems = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products', { 
          page: 1, 
          limit: 8 
        });
        
        console.log('Explore Items API Response:', response);
        
        if (response.success && response.data && response.data.products) {
          setProducts(response.data.products);
          console.log('Explore Items Products Set:', response.data.products);
        } else {
          console.error('Invalid response structure:', response);
        }
      } catch (err: any) {
        console.error('Error fetching products in Explore Items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
  };

  return (
    <section className="py-16 px-4 lg:px-8 bg-white w-full h-full">
      <div className="layout w-full h-full py-16 flex flex-col gap-10">
        {/* Header */}
        <div className="w-full p-2 flex flex-col sm:flex-row justify-between items-start mb-12 gap-6 sm:gap-6">
          <h2 className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black uppercase font-inter font-semibold sm:mb-10 md:mb-12 lg:mb-20">
            Explore Items
          </h2>
        
            <Button href="/product" className="text-black inline-block font-inter sm:text-xl lg:text-2xl md:text-2xl hover:scale-105 transition-all duration-300"> 
              Looking For  
              <Image src="/images/Arrow 3.png" alt="arrow-right" width={150} height={0} className="w-full h-auto" />
            </Button>
          
        </div>

        {/* Products Grid - Show only 4 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 w-full">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
            ))
          ) : (
            products.slice(0, 4).map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                className="w-full"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreItems;
