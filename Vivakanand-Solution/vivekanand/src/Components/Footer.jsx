// src/components/Footer.jsx
import React, { useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube, FaTimes } from "react-icons/fa";

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-3">
  <div className="bg-white rounded-xl max-w-sm w-full max-h-[60vh] overflow-hidden flex flex-col shadow-lg">
    {/* Header */}
    <div className="px-3 py-2 border-b border-gray-200 flex justify-between items-center">
      <h2 className="text-base font-bold text-gray-800">Privacy Policy</h2>
      <button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <FaTimes size={16} />
      </button>
    </div>

    {/* Content */}
    <div className="px-3 py-2 overflow-y-auto text-xs text-gray-700 leading-relaxed space-y-3">
      <p className="text-gray-500">
        Effective Date: {new Date().toLocaleDateString()}
      </p>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Introduction</h3>
        <p>
          At <span className="font-semibold">Vivekananda Home Tuitions</span>, 
          we value your trust and are committed to protecting the personal 
          information you share with us. This Privacy Policy explains how we 
          collect, use, store, and safeguard your information in compliance 
          with the Information Technology Act, 2000, the Information Technology 
          (Reasonable Security Practices and Procedures and Sensitive Personal 
          Data or Information) Rules, 2011, and the Digital Personal Data 
          Protection Act, 2023.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Information We Collect</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            <span className="font-medium">Parents/Guardians:</span> 
            Name, phone number, email address, residential area, and details 
            of tuition requirements for enquiry purposes.
          </li>
          <li>
            <span className="font-medium">Tutors:</span> 
            Full name, contact details, educational qualifications, teaching 
            experience, identification documents (if required), and location 
            preferences.
          </li>
          <li>
            <span className="font-medium">Website/Platform Visitors:</span> 
            Technical details such as IP address, browser type, device 
            information, and cookies for improving user experience.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Purpose of Collection</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>To connect parents with suitable tutors based on requirements.</li>
          <li>To verify tutor credentials and maintain service quality.</li>
          <li>To communicate updates, confirmations, and service-related information.</li>
          <li>To comply with legal obligations and resolve disputes.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Data Protection & Security</h3>
        <p>
          We adopt industry-standard security measures to protect your 
          information against unauthorized access, disclosure, or misuse. 
          Your data is only accessed by authorized personnel and is retained 
          only for as long as necessary for service delivery or as required by law.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Sharing of Information</h3>
        <p>
          We do <span className="font-medium">not sell or trade</span> your 
          personal information. Data may be shared only under the following conditions:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>With your consent, to connect parents and tutors.</li>
          <li>With trusted third-party service providers (e.g., IT support, hosting).</li>
          <li>If required by law, government authorities, or court orders.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">User Rights</h3>
        <p>
          In accordance with Indian data protection laws, you have the right to:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Access and review the personal data we hold about you.</li>
          <li>Request corrections to inaccurate or outdated information.</li>
          <li>Withdraw consent and request deletion of your data (subject to legal obligations).</li>
          <li>Restrict or object to certain forms of data processing.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Retention of Data</h3>
        <p>
          We retain personal data only as long as it is necessary for the 
          purpose it was collected or as required by applicable laws. 
          Once no longer needed, the data will be securely deleted or anonymized.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Updates to this Policy</h3>
        <p>
          This Privacy Policy may be updated from time to time to comply with 
          changes in law or our practices. The latest version will always be 
          available on our website/platform with the effective date.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
        <p>
          For any queries, concerns, or requests regarding this Privacy Policy 
          or your data, please contact us at:
        </p>
        <p className="font-medium text-blue-600">
          vivekanandahometuitions.h@gmail.com
        </p>
      </section>
    </div>
  </div>
</div>

  );
};

const Footer = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const openPolicyModal = () => {
    setIsPolicyOpen(true);
  };

  const closePolicyModal = () => {
    setIsPolicyOpen(false);
  };

  return (
    <>
      <footer className="bg-[#66B9FE] font-inter text-black py-8 md:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Info */}
          <div className="flex flex-col justify-center md:pr-6">
            {/* Logo */}
            <div className="flex justify-center md:justify-start mb-4">
              <img
                src="/Images/Logo/logo.png"
                alt="Vivekaananda Home Tuitions Logo"
                className="h-12 md:h-16"
              />
            </div>

            <p className="font-inter font-normal text-[16px] leading-[24px] tracking-normal text-black text-center md:text-left max-w-md md:max-w-none mx-auto md:mx-0 mt-3">
              Experienced home tutor providing personalized learning support for students from Nursery to Class XII, covering core subjects like Mathematics, Science, and more.
            </p>
          </div>

          {/* Right Section */}
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-4 md:pl-6">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-center sm:text-left">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm grid grid-cols-2 sm:block gap-2 sm:gap-0">
                <li className="text-center sm:text-left">
                  <a
                    href="/"
                    className="font-inter font-normal text-[15px] text-[#000000] leading-[24px] tracking-normal hover:underline"
                  >
                    Home
                  </a>
                </li>

                <li className="text-center sm:text-left font-inter font-normal text-[15px] text-[#000000] leading-[24px] tracking-normal hover:underline">
                  <a href="/tutor-registration" className="hover:underline">Join us as a tutor</a>
                </li>
                <li className="text-center sm:text-left font-inter font-normal text-[15px] text-[#000000] leading-[24px] tracking-normal hover:underline">
                  <a href="/fee-details" className="hover:underline">Fee Structure</a>
                </li>
                <li className="text-center sm:text-left font-inter font-normal text-[15px] text-[#000000] leading-[24px] tracking-normal hover:underline">
                  <a href="/about" className="hover:underline">About us</a>
                </li>
                <li className="text-center sm:text-left font-inter font-normal text-[15px] text-[#000000] leading-[24px] tracking-normal hover:underline">
                  <a href="/contact" className="hover:underline">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-center sm:text-left">
                Get In Touch
              </h4>
              <div className="space-y-3 text-center sm:text-left">
                <p className="font-inter font-normal text-[15px] leading-[24px] tracking-normal text-black">
                  Bhargavi Enclave, Jyothinagar, Near By Jyothi Theater, Lingampally, Chanda Nagar-500050
                </p>
                <p className="font-inter font-normal text-[15px] leading-[24px] tracking-normal text-black">
                  Phone <br />
                  <a href="tel:9059746820" className="text-black hover:underline">
                    9059746820
                  </a>
                </p>

                <p className="font-inter font-normal text-[15px] leading-[24px] tracking-normal text-black">
                  Email <br />
                  <a
                    href="mailto:vivekanandahometuitions.h@gmail.com"
                    className="text-black hover:underline"
                  >
                    vivekanandahometuitions.h@gmail.com
                  </a>
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center sm:justify-start gap-3 mt-4">
                <a
                  href="https://youtu.be/f3_TVSTXtKk?si=zkeh48I4KULeC17w"
                  className="bg-white p-2 rounded-full hover:bg-black/50 transition"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube size={16} />
                </a>
                <a
                  href="https://www.instagram.com/vivekaananda_home_tuitions?igsh=MWtzZDQ0Z3c2aXplMQ%3D%3D&utm_source=qr"
                  className="bg-white p-2 rounded-full hover:bg-black/50 transition"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={16} />
                </a>
                <a
                  href="https://www.facebook.com/share/1BDrsqsBvx/?mibextid=wwXIfr"
                  className="bg-white p-2 rounded-full hover:bg-black/50 transition"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-6xl mx-auto mt-6 md:mt-8">
          {/* Terms & Privacy */}
          <div className="flex flex-col sm:flex-row text-sm gap-3 sm:gap-4 justify-center sm:justify-start items-center">
            <button
              onClick={openPolicyModal}
              className="hover:underline text-black"
            >
              Terms and Conditions
            </button>
            <button
              onClick={openPolicyModal}
              className="hover:underline text-black"
            >
              Privacy Policy
            </button>
          </div>

          <hr className="border-black border-t-2 my-4 md:my-6" />

          {/* Copyright */}
          <div className="text-center text-sm pb-2">
            <p>© 2025 Vivekaananda Coaching. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal isOpen={isPolicyOpen} onClose={closePolicyModal} />
    </>
  );
};

export default Footer;