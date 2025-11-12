import { 
  WholesaleHero, 
  WholesaleBenefits, 
  WholesaleContactForm, 
  WholesaleContactInfo 
} from '@/components/wholesale';

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WholesaleHero />
      <WholesaleBenefits />
      <WholesaleContactForm />
      <WholesaleContactInfo />
    </div>
  );
}
