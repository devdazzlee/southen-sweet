'use client';
import termsData from '@/content/terms_of_service.json';

// interface TermsSection {
//   id: number;
//   title: string;
//   content: string;
// }

// interface TermsData {
//   title: string;
//   subtitle: string;
//   description: string;
//   sections: TermsSection[];
// }

const PrivacyPolicyPage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <div className="w-full h-full py-16 sm:py-24 md:py-32 lg:py-36">
        <div className="layout w-full h-full py-10">
          {/* Privacy Policy Container */}
          <div className="w-full h-full flex flex-col items-center justify-center py-10">
            {/* Title */}
            <div className="flex flex-col items-center justify-center text-center gap-4 sm:gap-6 sm:mb-10 md:mb-10">
              <h1 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-inter text-gray-900 uppercase">
                Privacy Policy
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-inter leading-6 sm:leading-8 md:leading-9 lg:leading-10 tracking-wide max-w-3xl text-gray-700 px-4">
                {termsData.description}
              </p>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 rounded-xl">
              {termsData.sections.map((section) => (
                <div key={section.id} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium font-inter text-[#211F1F] uppercase leading-tight">
                    SECTION {section.id} - {section.title}
                  </h2>
                  <p className="text-gray-700 font-inter text-sm sm:text-base md:text-lg lg:text-xl font-regular leading-6 sm:leading-7 md:leading-8 tracking-wide">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PrivacyPolicyPage;