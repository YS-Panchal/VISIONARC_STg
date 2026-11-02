import type { Metadata } from 'next';
import PolicyPageLayout from '@/components/pages/PolicyPageLayout';
import { Cookie, CheckCircle2, Sliders, Shield, Info } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Vision Architecture',
  description: 'Understand how Vision Architecture uses cookies and local browser storage to optimize site performance and preserve user preferences.',
};

export default function CookiePolicyPage() {
  return (
    <PolicyPageLayout
      activePolicy="cookie"
      title="Cookie Policy"
      description="Learn how we use cookies and related technologies to enhance your browsing experience."
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
              This Cookie Policy explains how Vision Architecture (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) uses cookies and similar client-side storage technologies when you visit our website.
            </p>
            <p>
              We believe in transparent, minimalist digital practices. We do not employ intrusive tracking cookies or commercial ad-retargeting scripts. Our use of storage mechanisms is restricted to essential site functions, interface preferences, and performance optimizations.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 02 — What Cookies Are */}
        <section aria-labelledby="section-02">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              02
            </span>
            <h2 id="section-02" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              What Cookies &amp; Local Storage Are
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Cookies are small text files downloaded to your computer or mobile device when you browse websites. Local storage (such as HTML5 `localStorage`) provides similar client-side storage with higher capacity and persistence without being transmitted back and forth across every network request.
            </p>
            <p>
              These technologies enable the website to remember your actions and preferences (such as cookie consent acknowledgement, custom cursor preferences, or portfolio viewer states) over a period of time, eliminating the need to repeatedly re-enter them on return visits.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 03 — Types of Cookies We Use */}
        <section aria-labelledby="section-03">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              03
            </span>
            <h2 id="section-03" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Types of Cookies We Use
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Depending on their duration and source, technologies utilized on this website fall into the following classifications:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-[#1d2025] mb-1.5 flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-[#8B2635]" /> Session Storage
                </h3>
                <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                  Temporary records maintained in memory while your active browser session remains open, automatically cleared upon closing your browser window.
                </p>
              </div>

              <div className="bg-[#f8f9fa] border border-black/[0.05] rounded-xl p-5">
                <h3 className="text-sm font-semibold text-[#1d2025] mb-1.5 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#8B2635]" /> Persistent Storage
                </h3>
                <p className="text-xs text-[#2f3440]/70 leading-relaxed">
                  Small preference markers stored on your device across sessions, such as remembering your cookie consent acceptance so the banner does not reappear.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 04 — How Cookies May Be Used */}
        <section aria-labelledby="section-04">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              04
            </span>
            <h2 id="section-04" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              How Cookies May Be Used
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Cookies and local browser storage are utilized exclusively to support essential website functions:
            </p>
            <ul className="space-y-3 pt-2">
              {[
                'Remembering your cookie acknowledgment preference so the consent banner remains dismissed once accepted',
                'Ensuring uninterrupted smooth scrolling and hardware-accelerated gallery rendering',
                'Supporting responsive layout computations across mobile, tablet, and widescreen viewports',
                'Assessing general site performance to diagnose broken links or visual bottlenecks',
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

        {/* 05 — Essential Cookies */}
        <section aria-labelledby="section-05">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              05
            </span>
            <h2 id="section-05" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Essential Storage
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Essential storage tokens are strictly necessary for the technical operation and visual integrity of this website. Because the site cannot function properly without them, they cannot be deactivated within our interface.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs sm:text-sm border border-black/[0.08] rounded-xl overflow-hidden">
                <thead className="bg-[#f8f9fa] border-b border-black/[0.08] text-[#1d2025]">
                  <tr>
                    <th className="p-3.5 font-semibold">Key / Token</th>
                    <th className="p-3.5 font-semibold">Type</th>
                    <th className="p-3.5 font-semibold">Purpose</th>
                    <th className="p-3.5 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] text-[#2f3440]/80">
                  <tr>
                    <td className="p-3.5 font-mono text-xs text-[#1d2025]">cookiesAccepted</td>
                    <td className="p-3.5">localStorage</td>
                    <td className="p-3.5">Remembers that you acknowledged the cookie notification banner.</td>
                    <td className="p-3.5">Persistent</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-mono text-xs text-[#1d2025]">lenis-scroll-state</td>
                    <td className="p-3.5">Memory / Session</td>
                    <td className="p-3.5">Preserves smooth momentum scroll coordinates during client-side navigation.</td>
                    <td className="p-3.5">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 06 — Analytics and Preference Cookies */}
        <section aria-labelledby="section-06">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              06
            </span>
            <h2 id="section-06" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Analytics &amp; Preference Cookies
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              When analytics are enabled, aggregated anonymous data may be recorded regarding page response times, popular architectural project views, and device display dimensions. This data assists our studio in refining our digital presentations.
            </p>
            <p>
              We do not tie anonymous analytics data to individual names, IP addresses, or personal identities.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 07 — Managing Cookie Preferences */}
        <section aria-labelledby="section-07">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              07
            </span>
            <h2 id="section-07" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Managing Cookie Preferences
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              You have the right to accept, reject, or clear cookies and local browser storage tokens at any time through your web browser settings.
            </p>
            <p>
              To reset your consent for this website, you can clear your browser&apos;s site data or delete the `cookiesAccepted` key from your browser storage. Most modern browsers (Chrome, Safari, Firefox, Edge) also allow you to block cookies entirely or browse via Private/Incognito modes.
            </p>
            <div className="bg-[#f8f9fa] border border-black/[0.06] rounded-xl p-4 flex items-start gap-3 text-xs leading-relaxed">
              <Info className="w-4 h-4 text-[#8B2635] shrink-0 mt-0.5" />
              <span>
                Please note that disabling cookies or clearing local storage may cause the cookie consent banner to reappear upon your next visit and may impact smooth-scrolling animations.
              </span>
            </div>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 08 — Third-Party Cookies */}
        <section aria-labelledby="section-08">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              08
            </span>
            <h2 id="section-08" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Third-Party Cookies
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              In certain areas of our site, third-party content (such as project video showcases or map embeds) may be loaded. These third-party providers may deploy their own cookies to measure engagement or track performance in accordance with their independent privacy policies.
            </p>
            <p>
              We recommend reviewing the third-party privacy statements of any external services you interact with.
            </p>
          </div>
        </section>

        <hr className="border-t border-black/[0.06]" />

        {/* 09 — Changes to This Policy */}
        <section aria-labelledby="section-09">
          <div className="flex items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-[#2f3440]/30 select-none">
              09
            </span>
            <h2 id="section-09" className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#1d2025] font-normal tracking-tight">
              Changes to This Policy
            </h2>
          </div>
          <div className="pl-0 sm:pl-12 lg:pl-16 text-[#2f3440]/80 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              We may revise this Cookie Policy occasionally to reflect adjustments in technical implementations or applicable regulations. Any updates will be posted here with an updated &ldquo;Last Updated&rdquo; date.
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
              If you have any questions regarding our use of cookies or local storage technologies, please get in touch:
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
                </a>{' '}
                / {' '}
                <a href="tel:+917359219598" className="text-[#2f3440] hover:text-[#8B2635]">
                  +91 73592 19598
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </PolicyPageLayout>
  );
}
