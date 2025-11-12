'use client';

import { 
  FundraisingHero, 
  FundraisingValueProp,
  FundraisingFAQ
} from '@/components/fundraising';

export default function FundraisingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FundraisingHero />
      <FundraisingValueProp />
      <FundraisingFAQ />
    </div>
  );
}
