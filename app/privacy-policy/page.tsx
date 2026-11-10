import type { Metadata } from 'next';
import PolicyPageLayout from '@/components/pages/PolicyPageLayout';
import { User, FileText, BarChart2, Cookie, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vision Architecture',
  description: 'Learn how Vision Architecture collects, uses, and protects your information when you visit our website or get in touch.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageLayout
      activePolicy="privacy"
      title="Privacy Policy"
      description="We value your privacy. This policy explains how we collect, use, and protect your information."
      lastUpdated="27 OCT 2026"
    >
      <div className="space-y-12">
        {/* 01 — Introduction */}
        <section aria-labelledby="section-01">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              01
            </span>
            <h2 id="section-01" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Introduction
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Vision Architecture (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is an architectural and spatial design studio based in Gujarat, India. We are committed to honoring and safeguarding the privacy of every individual who visits our website, engages with our portfolio, or communicates with our studio.
            </p>
            <p>
              This Privacy Policy explains the nature of personal and non-personal data collected through our website, how we utilize and protect this information, and the rights you hold in relation to your personal records.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 02 — Information We Collect */}
        <section aria-labelledby="section-02">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              02
            </span>
            <h2 id="section-02" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Information We Collect
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We collect information that you knowingly and voluntarily provide to us, as well as technical data generated automatically as you navigate our online portfolio:
            </p>

            {/* 2x2 Feature Grid matching design reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shrink-0 text-[#1d2025] shadow-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1d2025] mb-1">Personal Information</h3>
                  <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                    Such as your name, email address, and phone number when you fill out our contact form or contact our studio directly.
                  </p>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shrink-0 text-[#1d2025] shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1d2025] mb-1">Project Details</h3>
                  <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                    Information you voluntarily provide regarding your project type (architecture, interior, hospitality, renovation), site location, and requirements.
                  </p>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shrink-0 text-[#1d2025] shadow-xs">
                  <BarChart2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1d2025] mb-1">Usage Information</h3>
                  <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                    Such as pages visited, time spent on the site, device type, browser specifications, and referral paths to optimize site performance.
                  </p>
                </div>
              </div>

              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-black/[0.06] flex items-center justify-center shrink-0 text-[#1d2025] shadow-xs">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1d2025] mb-1">Cookies and Tracking</h3>
                  <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                    Browser storage tokens used to preserve your preferences and enhance smooth interactions, as described in our Cookie Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 03 — How We Use Your Information */}
        <section aria-labelledby="section-03">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              03
            </span>
            <h2 id="section-03" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              How We Use Your Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We process the information collected through our website strictly for legitimate business and architectural consultation purposes:
            </p>
            <ul className="space-y-3 pt-2">
              {[
                'Respond promptly to your enquiries and provide tailored information regarding our architectural and interior design services',
                'Understand your site requirements, spatial needs, programmatic brief, and project aspirations',
                'Improve our website responsiveness, user experience, and architectural portfolio presentation',
                'Communicate with you regarding consultations, feasibility reviews, and project proposals',
                'Maintain studio administration and comply with applicable statutory or regulatory obligations',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#8B2635] shrink-0 mt-1" />
                  <span className="text-sm sm:text-base text-[#2f3440]/85 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 04 — Contact Forms and Project Enquiries */}
        <section aria-labelledby="section-04">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              04
            </span>
            <h2 id="section-04" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Contact Forms &amp; Project Enquiries
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              When you submit a project enquiry through our &ldquo;LET&apos;S TALK&rdquo; contact interface, your submitted details (including name, email address, phone number, selected architectural services, and message notes) are transmitted securely to our studio team.
            </p>
            <p>
              We utilize this information solely to evaluate project compatibility, organize preliminary architectural discussions, and formulate project proposals. We do not sell, rent, or trade your contact details to third-party advertisers, lead brokers, or marketing syndicates.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 05 — Cookies and Similar Technologies */}
        <section aria-labelledby="section-05">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              05
            </span>
            <h2 id="section-05" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Cookies &amp; Similar Technologies
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Our website uses cookies and local browser storage mechanisms to preserve your preferences, facilitate smooth page scrolling, and optimize asset loading.
            </p>
            <p>
              For comprehensive details on the categories of cookies utilized and how you can configure or revoke your preferences at any time, please review our dedicated{' '}
              <Link href="/cookie-policy" className="text-[#8B2635] underline underline-offset-4 hover:text-[#1d2025] transition-colors font-medium">
                Cookie Policy
              </Link>
              .
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 06 — Data Sharing and Third-Party Services */}
        <section aria-labelledby="section-06">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              06
            </span>
            <h2 id="section-06" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Data Sharing &amp; Third-Party Services
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Vision Architecture does not monetize, rent, or lease your personal data. We only share information under strict, legitimate operational circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Infrastructure Providers:</strong> Trusted web hosting providers, content delivery networks, and transactional email gateways necessary for website and enquiry dispatch operations.
              </li>
              <li>
                <strong>Professional Advisors:</strong> Legal, accounting, or audit professionals bound by statutory obligations of confidentiality.
              </li>
              <li>
                <strong>Legal Compliance:</strong> Where required by valid subpoenas, court orders, or governmental authorities operating under applicable law.
              </li>
            </ul>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 07 — Data Security */}
        <section aria-labelledby="section-07">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              07
            </span>
            <h2 id="section-07" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Data Security
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We implement industry-standard organizational and technological safeguards designed to protect personal data against accidental loss, unauthorized access, destruction, alteration, or disclosure. All web traffic between your browser and our servers is encrypted using modern Transport Layer Security (HTTPS/TLS).
            </p>
            <p>
              While we make every reasonable effort to secure our digital touchpoints, please note that no internet transmission or electronic storage method can guarantee complete, absolute immunity from potential cyber threats.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 08 — Data Retention */}
        <section aria-labelledby="section-08">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              08
            </span>
            <h2 id="section-08" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Data Retention
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We retain personal details received through enquiries only for as long as necessary to address your project request, conclude architectural agreements, maintain studio archives, or comply with relevant taxation, accounting, and legal requirements.
            </p>
            <p>
              When personal data is no longer required for its original purpose or statutory obligation, it is securely deleted or anonymized.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 09 — User Rights & Privacy Laws */}
        <section aria-labelledby="section-09">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              09
            </span>
            <h2 id="section-09" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              User Rights &amp; Applicable Privacy Laws
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              In accordance with applicable data protection laws (including the Digital Personal Data Protection Act, 2023, where applicable), visitors may exercise specific rights regarding their personal data, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Requesting confirmation of whether we hold or process your personal information</li>
              <li>Requesting correction or updating of inaccurate or outdated contact information</li>
              <li>Requesting erasure of personal information held by our studio, subject to legal retention obligations</li>
              <li>Withdrawing consent previously provided for voluntary communications or project updates</li>
            </ul>
            <p>
              To exercise any of these rights, please submit a written request to our studio using the contact details provided below.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 10 — External Links */}
        <section aria-labelledby="section-10">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              10
            </span>
            <h2 id="section-10" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              External Links
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Our website may contain links to external platforms, such as social media channels (e.g. LinkedIn, Instagram), professional council registers (such as the Council of Architecture), or industry publications. We have no control over the privacy policies, cookies, or data practices of these external websites and encourage you to review their individual privacy statements before providing them with personal data.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 11 — Changes to This Policy */}
        <section aria-labelledby="section-11">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              11
            </span>
            <h2 id="section-11" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Changes to This Policy
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We may update this Privacy Policy from time to time to accommodate evolving design services, website functionalities, or legal standards. Whenever changes are published, the revised version will be posted here with an updated &ldquo;Last Updated&rdquo; date. We encourage visitors to review this page periodically.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 12 — Contact Information */}
        <section aria-labelledby="section-12">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              12
            </span>
            <h2 id="section-12" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Contact Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              If you have any questions, feedback, or requests regarding this Privacy Policy or how your personal information is handled, please reach out to our team:
            </p>
            <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-xl p-5 space-y-2 mt-4 text-sm">
              <p>
                <strong>Vision Architecture</strong>
              </p>
              <p className="text-[#2f3440]/75">
                1121-1122 Iconic Shyamal, Opp. Shyamal Cross Road, Satellite, Ahmedabad, Gujarat 380015
              </p>
              <p>
                Email:{' '}
                <a
                  href="mailto:info.visionarchitecture@gmail.com"
                  className="text-[#8B2635] hover:underline"
                >
                  info.visionarchitecture@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+919687688373" className="text-[#2f3440] hover:text-[#8B2635]">
                  +91 96876 88373
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </PolicyPageLayout>
  );
}
