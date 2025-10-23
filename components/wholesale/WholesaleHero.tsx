import { Package, Truck, DollarSign } from 'lucide-react';

export default function WholesaleHero() {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hero.png)' }}>
       <div className=" absolute h-full w-full bg-black/40" />
      <div className="relative container mx-auto px-4 py-60">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Wholesale Opportunities
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Partner with Southern Sweet & Sour for premium licorice products
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              <span>Bulk Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-6 h-6" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              <span>Competitive Rates</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
