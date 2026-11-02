'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, FileText, Cookie, ArrowRight } from 'lucide-react';
import Footer from '@/components/sections/Footer';

export interface PolicyPageLayoutProps {
  activePolicy: 'privacy' | 'terms' | 'cookie';
  title: string;
  description: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function PolicyPageLayout({
  activePolicy,
  title,
  description,
  lastUpdated = '27 OCT 2026',
  children,
}: PolicyPageLayoutProps) {
  const navItems = [
    {
      id: 'privacy',
      label: 'Privacy Policy',
      href: '/privacy-policy',
      icon: Lock,
    },
    {
      id: 'terms',
      label: 'Terms & Conditions',
      href: '/terms-and-conditions',
      icon: FileText,
    },
    {
      id: 'cookie',
      label: 'Cookie Policy',
      href: '/cookie-policy',
      icon: Cookie,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#2f3440] selection:bg-transparent selection:text-[#2f3440]">
      {/* 1. HERO BANNER */}
      <header className="relative overflow-hidden bg-white border-b border-black/[0.06] pt-8 sm:pt-10 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-12 lg:px-20">
        {/* Background Architectural Project Image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[48%] pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/80 sm:via-white/40 to-transparent lg:from-white lg:via-white/30 lg:to-transparent" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/40 to-transparent lg:hidden" />
          <Image
            src="/images/Projects/PROJECTS WEBP/Hospitality Architecture/SANTORINI RESORT BHARUCH/vision-architecture-santorini-luxury-resort-bharuch-gujarat-01.webp"
            alt="Vision Architecture Santorini Luxury Resort Bharuch"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center opacity-85 lg:opacity-95"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          {/* Logo */}
          <div className="mb-8 sm:mb-12">
            <Link
              href="/"
              className="inline-block transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2635] rounded"
              aria-label="Vision Architecture Home"
            >
              <Image
                src="/images/VA LOGO 1.png"
                alt="Vision Architecture"
                width={175}
                height={40}
                className="h-7 sm:h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[2px] bg-[#8B2635]" />
            <span className="font-telegrafico tracking-[0.25em] text-[11px] sm:text-xs uppercase font-bold text-[#8B2635]">
              LEGAL
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1d2025] font-normal tracking-tight leading-[1.12] mb-4 max-w-2xl">
            {title}
          </h1>

          {/* Description */}
          <p className="text-[#2f3440]/75 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
            {description}
          </p>
        </div>
      </header>

      {/* 2. MAIN 2-COLUMN SECTION */}
      <main className="py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 xl:px-20 relative">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Navigation Tabs (< lg) */}
          <div className="lg:hidden mb-8">
            <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" aria-label="Policy pages">
              {navItems.map((item) => {
                const isActive = item.id === activePolicy;
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#1d2025] text-white font-medium shadow-sm'
                        : 'bg-white border border-black/[0.08] text-[#2f3440]/80 hover:bg-neutral-100 hover:text-[#1d2025]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-[#8B2635]' : 'text-[#2f3440]/60'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column / Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-8">
              <div className="relative">
                {/* Policy Navigation List */}
                <nav className="flex flex-col gap-1.5" aria-label="Policy navigation">
                  {navItems.map((item) => {
                    const isActive = item.id === activePolicy;
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${
                          isActive
                            ? 'bg-[#ececec]/85 text-[#1d2025] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                            : 'text-[#2f3440]/70 hover:text-[#1d2025] hover:bg-[#ececec]/45 font-normal'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {/* Red Active Indicator Bar */}
                        {isActive && (
                          <span
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-md bg-[#8B2635]"
                            aria-hidden="true"
                          />
                        )}
                        <IconComponent
                          className={`w-4 h-4 transition-colors ${
                            isActive ? 'text-[#1d2025]' : 'text-[#2f3440]/60 group-hover:text-[#1d2025]'
                          }`}
                        />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Questions & Contact CTA */}
                <div className="mt-8 pt-8 border-t border-black/[0.08]">
                  <h3 className="font-serif text-base font-semibold text-[#1d2025] mb-1.5">
                    Questions?
                  </h3>
                  <p className="text-xs text-[#2f3440]/70 leading-relaxed mb-4 max-w-[220px]">
                    If you have any questions regarding our policies, feel free to get in touch.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-[#1d2025] hover:bg-[#8B2635] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2635]"
                  >
                    <span>CONTACT US</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Subtle Architectural Wireframe Vector Backdrop */}
                <div className="mt-12 opacity-20 pointer-events-none select-none" aria-hidden="true">
                  <svg
                    viewBox="0 0 240 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto text-[#2f3440]"
                  >
                    <path d="M10 170L70 120V30L10 60V170Z" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M70 120L190 140V50L70 30" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M190 140L230 115V35L190 50" stroke="currentColor" strokeWidth="0.8" />
                    <path d="M70 30L120 10L230 35" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
                    <path d="M30 153L30 70L60 55" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M100 125V55L160 65V135" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M0 170H240" stroke="currentColor" strokeWidth="0.8" />
                  </svg>
                </div>
              </div>
            </aside>

            {/* Right Column / Policy Content Surface */}
            <div className="lg:col-span-8 xl:col-span-9">
              <article className="bg-white rounded-2xl sm:rounded-3xl border border-black/[0.06] p-6 sm:p-10 lg:p-14 shadow-[0_4px_35px_rgba(0,0,0,0.025)]">
                {/* Last Updated Eyebrow */}
                <div className="flex items-center gap-2 mb-8 sm:mb-12 pb-6 border-b border-black/[0.06]">
                  <span className="w-4 h-[2px] bg-[#8B2635]" />
                  <span className="font-telegrafico tracking-[0.2em] text-[11px] sm:text-xs uppercase font-semibold text-[#2f3440]/60">
                    LAST UPDATED: {lastUpdated}
                  </span>
                </div>

                {/* Content */}
                <div>
                  {children}
                </div>
              </article>

              {/* Mobile Contact CTA (< lg) */}
              <div className="lg:hidden mt-8 p-6 bg-white rounded-2xl border border-black/[0.06] text-center">
                <h3 className="font-serif text-base font-semibold text-[#1d2025] mb-1.5">
                  Questions?
                </h3>
                <p className="text-xs text-[#2f3440]/70 leading-relaxed mb-4 max-w-sm mx-auto">
                  If you have any questions regarding our policies, feel free to get in touch with our studio team.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-[#1d2025] hover:bg-[#8B2635] text-white text-xs font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. SITE FOOTER */}
      <Footer />
    </div>
  );
}
