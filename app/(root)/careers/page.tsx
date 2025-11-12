'use client';

import PageHero from '@/components/shared/PageHero';
import ContentSection from '@/components/shared/ContentSection';
import { Briefcase, Heart, TrendingUp, Users, Coffee, Award, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const jobListings: JobListing[] = [
    {
      id: 1,
      title: 'Senior Candy Production Manager',
      department: 'Production',
      location: 'Sweet City, SC',
      type: 'Full-time',
      description: 'Lead our production team in creating the finest licorice products. Requires 5+ years experience in food manufacturing and strong leadership skills.'
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive our online presence and customer engagement. Experience with social media, email marketing, and content creation required.'
    },
    {
      id: 3,
      title: 'Quality Assurance Technician',
      department: 'Quality Control',
      location: 'Sweet City, SC',
      type: 'Full-time',
      description: 'Ensure our products meet the highest quality standards. Food safety certification and attention to detail essential.'
    },
    {
      id: 4,
      title: 'Customer Service Representative',
      department: 'Customer Support',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Provide exceptional support to our customers. Strong communication skills and passion for customer satisfaction required.'
    },
    {
      id: 5,
      title: 'E-commerce Manager',
      department: 'Technology',
      location: 'Remote',
      type: 'Full-time',
      description: 'Manage and optimize our online store. Experience with e-commerce platforms, analytics, and conversion optimization required.'
    },
    {
      id: 6,
      title: 'Product Development Intern',
      department: 'R&D',
      location: 'Sweet City, SC',
      type: 'Internship',
      description: 'Join our innovation team to help create new licorice flavors. Food science or culinary background preferred.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHero 
        title="Careers" 
        description="Join our team and help us bring joy to licorice lovers everywhere."
      />

      <ContentSection>
        <div className="max-w-6xl mx-auto">
          {/* Why Work With Us */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Why Join Licorice Ropes?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-4">
                  <Heart className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Passionate Team</h3>
                <p className="text-gray-700">
                  Work alongside people who genuinely love what they do and are committed to excellence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <TrendingUp className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth Opportunities</h3>
                <p className="text-gray-700">
                  We invest in our employees' development with training programs and career advancement paths.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                  <Award className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Great Benefits</h3>
                <p className="text-gray-700">
                  Competitive salaries, health insurance, 401(k), paid time off, and employee discounts.
                </p>
              </div>
            </div>
          </div>

          {/* Company Culture */}
          <div className="mb-16 bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Our Culture
            </h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
              At Licorice Ropes, we believe in creating a workplace where everyone can thrive. 
              We foster collaboration, celebrate creativity, and maintain a healthy work-life balance.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <Coffee className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Work-Life Balance</h3>
                  <p className="text-gray-700">Flexible schedules and generous PTO</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Collaborative Environment</h3>
                  <p className="text-gray-700">Open communication and team-focused culture</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Recognition Programs</h3>
                  <p className="text-gray-700">Regular appreciation and rewards for excellence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Professional Development</h3>
                  <p className="text-gray-700">Training programs and skill-building opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Current Openings
            </h2>
            
            <div className="space-y-4">
              {jobListings.map((job) => (
                <div 
                  key={job.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                        <Briefcase className="mr-2 text-orange-600" size={20} />
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="mr-1" size={16} />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1" size={16} />
                          {job.type}
                        </span>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                          {job.department}
                        </span>
                      </div>
                    </div>
                    <button className="self-start md:self-center bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
              Our Hiring Process
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Apply</h3>
                <p className="text-gray-700 text-sm">Submit your application and resume online</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Review</h3>
                <p className="text-gray-700 text-sm">Our team reviews your application</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
                <p className="text-gray-700 text-sm">Phone and in-person interviews</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Offer</h3>
                <p className="text-gray-700 text-sm">Join our team!</p>
              </div>
            </div>
          </div>

          {/* Apply CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 md:p-12 rounded-lg text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Apply?</h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Don't see the perfect role? Send us your resume anyway! We're always looking for talented individuals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:Info@southernsweetandsour.com?subject=Job Application" 
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors"
              >
                Contact HR
              </a>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Job Details Modal */}
      {selectedJob && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedJob.title}</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="flex items-center text-gray-600">
                <MapPin className="mr-1" size={16} />
                {selectedJob.location}
              </span>
              <span className="flex items-center text-gray-600">
                <Clock className="mr-1" size={16} />
                {selectedJob.type}
              </span>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                {selectedJob.department}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{selectedJob.description}</p>
            <div className="flex gap-4">
              <a 
                href={`mailto:Info@southernsweetandsour.com?subject=Application for ${selectedJob.title}`}
                className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors"
              >
                Apply for this Position
              </a>
              <button 
                onClick={() => setSelectedJob(null)}
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





