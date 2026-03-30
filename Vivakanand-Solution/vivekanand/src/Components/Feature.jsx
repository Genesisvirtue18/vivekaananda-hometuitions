import React from "react";

const TopFeatures = () => {
  return (
    <div
      className="relative min-h-[300px] md:h-[350px] text-white px-4 sm:px-6 flex items-center justify-center bg-cover bg-center font-inter"
      style={{ backgroundImage: "url('/Images/Feature/feature.jpg')" }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-800/70 via-orange-700/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center max-w-6xl w-full">
        
        {/* Item 1 */}
        <div className="px-4 sm:px-6 md:border-r md:border-white flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-[24px] leading-[32px] md:leading-[36px] font-semibold">
            11+ Years of Tutoring <br className="hidden sm:block" /> Experience
          </h3>
          <p className="mt-3 text-sm sm:text-base md:text-[16px] leading-[24px] max-w-[300px]">
            Trusted by hundreds of parents for over a decade in Chanda Nagar
          </p>
        </div>

        {/* Item 2 */}
        <div className="px-4 sm:px-6 md:border-r md:border-white flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-[24px] leading-[32px] md:leading-[36px] font-semibold">
            Specialized in Home <br className="hidden sm:block" /> Tuition
          </h3>
          <p className="mt-3 text-sm sm:text-base md:text-[16px] leading-[24px] max-w-[300px]">
            Catering to CBSE, ICSE, and State Board syllabi across grades
          </p>
        </div>

        {/* Item 3 */}
        <div className="px-4 sm:px-6 flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl md:text-[24px] leading-[32px] md:leading-[36px] font-semibold">
            Wide Range of Subjects <br className="hidden sm:block" /> Covered
          </h3>
          <p className="mt-3 text-sm sm:text-base md:text-[16px] leading-[24px] max-w-[300px]">
            Math, Science, English, Social Studies, and Languages for Classes 1-12
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopFeatures;
