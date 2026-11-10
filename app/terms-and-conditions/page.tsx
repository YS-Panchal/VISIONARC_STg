import type { Metadata } from 'next';
import PolicyPageLayout from '@/components/pages/PolicyPageLayout';
import { ShieldCheck, Compass, FileCheck, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Vision Architecture',
  description: 'Review the terms and conditions governing the use of the Vision Architecture website, portfolio content, and architectural enquiry services.',
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyPageLayout
      activePolicy="terms"
      title="Terms & Conditions"
      description="Clear guidelines governing the use of our website, portfolio, and architectural consultation services."
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
              Welcome to the digital portfolio and website of Vision Architecture (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). These Terms and Conditions constitute a legally binding agreement between you (&ldquo;visitor&rdquo;, &ldquo;user&rdquo;, or &ldquo;you&rdquo;) and Vision Architecture regarding your access to and use of this website.
            </p>
            <p>
              By accessing, browsing, or utilizing any portion of this website, you confirm that you have read, understood, and agreed to be bound by these Terms. If you do not agree with any part of these terms, you should immediately discontinue the use of our website.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 02 — Website Use */}
        <section aria-labelledby="section-02">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              02
            </span>
            <h2 id="section-02" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Website Use
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              This website is published to provide prospective clients, design collaborators, and the architectural community with authentic information about our design studio, portfolio, services, and team.
            </p>
            <p>
              When navigating this website, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use the site solely for legitimate, lawful, and personal evaluation purposes</li>
              <li>Not attempt to disrupt, compromise, or breach website security or server infrastructure</li>
              <li>Not execute automated data extraction, web crawling, or bulk harvesting of high-resolution imagery without explicit written consent</li>
              <li>Not transmit malicious software, automated scripts, or unsolicited commercial messages through our contact channels</li>
            </ul>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 03 — Architectural Projects and Portfolio Content */}
        <section aria-labelledby="section-03">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              03
            </span>
            <h2 id="section-03" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Architectural Projects &amp; Portfolio Content
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              All architectural photographs, project renderings, master plans, interior compositions, 3D visualizations, blueprints, and project narratives featured on this website depict actual commissions or design concepts developed by Vision Architecture and its principals.
            </p>
            <p>
              Portfolio materials are displayed strictly for illustrative, editorial, and design presentation purposes. While every effort is made to accurately portray completed or ongoing projects, site photographs reflect specific lighting conditions, phases of completion, and bespoke client commissions that may not apply generically to other contexts.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 04 — Intellectual Property */}
        <section aria-labelledby="section-04">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              04
            </span>
            <h2 id="section-04" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Intellectual Property Rights
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              The Vision Architecture brand identity, logos, custom typography, site architecture, visual layouts, editorial copy, architectural drawings, and photographic works are the exclusive intellectual property of Vision Architecture and are protected under Indian and international copyright and trademark laws.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B2635]" />
                  <h3 className="text-sm font-semibold text-[#1d2025]">Copyright Protection</h3>
                </div>
                <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                  No photographs or architectural renderings may be reproduced, modified, published, or commercially displayed without prior written authorization.
                </p>
              </div>

              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Compass className="w-4 h-4 text-[#8B2635]" />
                  <h3 className="text-sm font-semibold text-[#1d2025]">Design Attribution</h3>
                </div>
                <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                  Editorial references, press publications, or design features referencing our studio must clearly credit &ldquo;Vision Architecture&rdquo; alongside relevant project names.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 05 — Project Enquiries & Communications */}
        <section aria-labelledby="section-05">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              05
            </span>
            <h2 id="section-05" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Project Enquiries &amp; Communications
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Submitting an enquiry through our contact interface or initiating email correspondence with our studio does not establish an architect-client relationship or create any contractual commitment on the part of Vision Architecture.
            </p>
            <p>
              A formal architect-client relationship and professional engagement is established solely upon the mutual execution of an official, written Professional Architectural Services Agreement detailing scope of work, fees, project deliverables, and statutory responsibilities.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 06 — Third-Party Links */}
        <section aria-labelledby="section-06">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              06
            </span>
            <h2 id="section-06" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Third-Party Links
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              This website may incorporate links or social media embeds directed toward third-party domains (such as LinkedIn, Instagram, or architectural regulatory registries). These links are supplied solely for user reference and convenience.
            </p>
            <p>
              Vision Architecture does not govern, endorse, or accept responsibility for the availability, terms, content, or privacy standards of external third-party domains.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 07 — Website Availability & Accuracy */}
        <section aria-labelledby="section-07">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              07
            </span>
            <h2 id="section-07" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Website Availability &amp; Accuracy
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We aim to ensure that our website is continuously accessible, performant, and reflective of our latest completed developments. However, we do not warrant that site availability will be entirely uninterrupted, error-free, or devoid of minor technical delays.
            </p>
            <p>
              We reserve the right to temporarily modify, suspend, or update parts of our portfolio or digital infrastructure without prior announcement to conduct routine studio maintenance or project updates.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 08 — Limitation of Liability */}
        <section aria-labelledby="section-08">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              08
            </span>
            <h2 id="section-08" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Limitation of Liability
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              To the fullest extent permitted under applicable law, Vision Architecture, its co-founders, principal architects, and staff shall not be liable for any indirect, consequential, punitive, or incidental damages arising out of or related to your use of, or inability to access, this website or reliance on information presented herein.
            </p>
            <p>
              All materials on this website are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis for general portfolio exploration without warranties of any kind, whether express or implied.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 09 — Changes to These Terms */}
        <section aria-labelledby="section-09">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              09
            </span>
            <h2 id="section-09" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Changes to These Terms
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We reserve the right to revise or amend these Terms and Conditions at our sole discretion. Any modifications become effective immediately upon being published on this page with an updated &ldquo;Last Updated&rdquo; indicator.
            </p>
            <p>
              Your continued navigation of the website following the posting of amended terms signifies your acceptance of and agreement to the modified provisions.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 10 — Contact Information */}
        <section aria-labelledby="section-10">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              10
            </span>
            <h2 id="section-10" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Contact Information
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              For any questions, clarifications, or permissions regarding these Terms and Conditions or the use of our portfolio assets, please contact our studio:
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
