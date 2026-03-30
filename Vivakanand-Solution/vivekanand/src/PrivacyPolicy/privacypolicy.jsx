// src/pages/PrivacyPolicy.jsx

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Effective Date: {new Date().toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Introduction
            </h2>
            <p>
              Welcome to <span className="font-semibold">Vivekananda Home
              Tuitions</span>. We value your privacy and are committed to
              protecting the personal information you share with us. This policy
              explains how we collect, use, and safeguard your data when you use
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-medium">From Parents:</span> Name, phone
                number, email, address, and enquiry details regarding tuition
                needs.
              </li>
              <li>
                <span className="font-medium">From Tutors:</span> Name, contact
                details, qualifications, teaching experience, and areas of
                expertise.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How We Use Your Information
            </h2>
            <p>We use the collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to parent enquiries and provide suitable tutors.</li>
              <li>
                Register tutors and connect them with parents seeking tuition.
              </li>
              <li>Maintain communication and improve our services.</li>
              <li>
                Ensure the safety and authenticity of both parents and tutors.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Data Protection
            </h2>
            <p>
              We implement industry-standard security measures to protect your
              personal data. Your information will not be sold, rented, or
              shared with unauthorized parties without your consent, except as
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Third-Party Services
            </h2>
            <p>
              In some cases, we may use trusted third-party services for
              communication or analytics. These providers are obligated to keep
              your information secure and use it only for agreed purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Rights
            </h2>
            <p>
              You have the right to access, update, or request deletion of your
              personal data. To exercise these rights, please contact us at:
            </p>
            <p className="mt-2 font-medium text-blue-600">
              vvivekanandahometuitions.h@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page with the updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, feel free to
              reach out to us at:
            </p>
            <p className="mt-2 font-medium text-blue-600">
             vivekanandahometuitions.h@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
