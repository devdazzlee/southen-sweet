import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { Heart, Award, Users, Sparkles, TrendingUp, Globe } from 'lucide-react';
import Image from 'next/image';

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Our Story" 
        description="A passion for quality licorice that spans generations."
      />

      <ContentSection>
        <div className="max-w-6xl mx-auto">
          {/* The Beginning */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex items-center">
                  <Heart className="mr-3 text-orange-600" size={36} />
                  The Beginning
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our journey began in 2005 when a family of candy enthusiasts decided to bring 
                  authentic, high-quality licorice to America. What started as a small operation 
                  in a local kitchen has grown into a beloved brand known for premium licorice products.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We were inspired by traditional European licorice-making methods and set out to 
                  create products that honored these time-tested recipes while adding our own 
                  innovative twist.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, we remain a family-owned business committed to the same values that 
                  founded our company: quality, authenticity, and passion for great-tasting licorice.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/ourmission-1.png"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mb-16 bg-gradient-to-br from-orange-50 to-orange-100 p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              To craft the finest licorice products using authentic ingredients and traditional methods, 
              bringing joy to licorice lovers while introducing new generations to this timeless treat.
            </p>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              What Drives Us
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Award className="text-orange-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
                <p className="text-gray-700">
                  We source only the finest ingredients and maintain rigorous quality standards 
                  at every step of production.
                </p>
              </div>

              <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Sparkles className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-700">
                  While respecting tradition, we constantly innovate to create new flavors and 
                  products that excite our customers.
                </p>
              </div>

              <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Users className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-700">
                  We believe in building strong relationships with our customers, suppliers, 
                  and the communities we serve.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Our Journey
            </h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-600">2005</span>
                </div>
                <div className="flex-grow border-l-4 border-orange-600 pl-6 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Founded</h3>
                  <p className="text-gray-700">
                    Started with just three licorice varieties in a small local market.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-600">2010</span>
                </div>
                <div className="flex-grow border-l-4 border-orange-600 pl-6 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">First Expansion</h3>
                  <p className="text-gray-700">
                    Expanded product line to 15 varieties and opened our first retail location.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-600">2015</span>
                </div>
                <div className="flex-grow border-l-4 border-orange-600 pl-6 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Going National</h3>
                  <p className="text-gray-700">
                    Launched nationwide distribution and our e-commerce platform.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-600">2020</span>
                </div>
                <div className="flex-grow border-l-4 border-orange-600 pl-6 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Award Recognition</h3>
                  <p className="text-gray-700">
                    Received "Best Licorice Brand" award and expanded to 50+ products.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-orange-600">2025</span>
                </div>
                <div className="flex-grow border-l-4 border-orange-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Today & Beyond</h3>
                  <p className="text-gray-700">
                    Continuing to innovate and serve licorice lovers across the nation while 
                    planning international expansion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16 bg-gradient-to-r from-orange-500 to-orange-600 p-12 rounded-lg text-white">
            <h2 className="text-3xl font-bold mb-10 text-center">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">20+</div>
                <div className="text-lg">Years in Business</div>
              </div>
              <div className="text-center">
                <Sparkles className="mx-auto mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg">Product Varieties</div>
              </div>
              <div className="text-center">
                <Users className="mx-auto mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-lg">Happy Customers</div>
              </div>
              <div className="text-center">
                <Globe className="mx-auto mb-3" size={40} />
                <div className="text-4xl font-bold mb-2">50</div>
                <div className="text-lg">States Served</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Meet Our Team
            </h2>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl mb-6">
              <Image
                src="/images/team.png"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Behind every product is a dedicated team of licorice enthusiasts, from our master 
              candy makers to our customer service team. We're passionate about what we do and 
              committed to bringing you the best licorice experience possible.
            </p>
          </div>

          {/* Join Us CTA */}
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Join Our Story?</h3>
            <p className="text-lg text-gray-700 mb-6">
              We're always looking for talented individuals who share our passion for quality.
            </p>
            <a 
              href="/careers" 
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
            >
              View Career Opportunities
            </a>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}







