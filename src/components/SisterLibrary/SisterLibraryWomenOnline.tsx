import React from "react";
import { SisterSubPage } from "./SisterLibraryHub";

interface SisterLibraryWomenOnlineProps {
  onBack: () => void;
  onNavigate: (page: SisterSubPage) => void;
}

export const SisterLibraryWomenOnline: React.FC<SisterLibraryWomenOnlineProps> = ({
  onBack,
  onNavigate,
}) => {
  return (
    <div className="w-full bg-[#0a0a0e] text-[#fdf9ef] font-serif-editorial min-h-screen">
      <main className="w-full max-w-4xl mx-auto px-gutter-mobile md:px-gutter-desktop py-space-xl flex flex-col gap-space-2xl text-surface relative z-10">
        {/* 1. Header Section & Ledger Header */}
        <header className="flex flex-col gap-space-md">
          {/* Accession Ribbon */}
          <div className="flex items-center gap-space-xs pb-space-xs border-b border-white/15 font-label-code text-label-code">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-riso-pink animate-pulse" />
              <span className="tracking-widest text-[#BAD687] uppercase font-bold">
                DIGITAL ARCHIVE
              </span>
            </div>
          </div>

          {/* Main Title & Subheading */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <div className="flex flex-wrap items-baseline gap-x-space-md">
              <h1 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white drop-shadow-md">
                WOMEN ONLINE DOT BD
              </h1>
            </div>
            <p className="font-title-editorial text-title-editorial text-[#c8cde0] font-normal leading-relaxed max-w-3xl font-serif-editorial">
              An investigation into the good, the bad, and the uncanny online realities of women in Bangladesh.
            </p>
          </div>

          {/* Cinematic Hero Video Header */}
          <div className="flex flex-col gap-space-2xs mt-space-md">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 group">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                src="https://www.youtube.com/embed/R5O6ESu3EWM?start=3342"
                title="Women Online Dot BD Archive Video"
              />
            </div>

            {/* Video Ledger Stamp & Caption */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-2xs px-space-2xs py-space-3xs font-label-code text-label-code text-white/70">
              <div className="flex items-center gap-space-xs">
                <span className="text-riso-pink font-bold">REC_DISPATCH #01</span>
                <span>•</span>
                <p className="line-clamp-1 text-white/90 font-serif-editorial">
                  Women Online Dot BD / Digital assembly, grassroots cyber-feminist oral history, and virtual salon broadcast.
                </p>
              </div>
              <span className="text-[#BAD687] font-semibold whitespace-nowrap">
                STATUS: RESTORED // STEREO
              </span>
            </div>
          </div>
        </header>

        {/* 2. Manifesto & Cyber-Feminist Curatorial Statement */}
        <section className="relative bg-[#10121a] rounded-lg p-space-lg md:p-space-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col gap-space-md">
          <h2 className="font-headline-md text-headline-md text-white font-serif font-bold">
            Networked Autonomy: Women Online Dot BD
          </h2>

          <div className="space-y-space-md font-body-lg text-body-lg text-[#c8cde0] leading-relaxed font-serif-editorial">
            <p>
              Bangladesh has more than 128 million internet users; it is the most active Facebook user base and is huge on TikTok. The experience of women online is specific and in many instances, absurd.
            </p>
            <p>
              <strong className="text-white font-semibold">Women Online DotBD</strong> is a podcast episode produced by <em className="text-riso-pink not-italic font-semibold">HerStory Foundation</em>, a Dhaka-based feminist organisation with established credibility in cultural production and digital inclusion. The podcast investigates the actual, textured lives of women in Bangladesh on the internet; bringing to light the connection, the creativity, the income-generation, and solidarity (the good); the harassment, surveillance, and platform failure (the bad); and the digitally liminal, the unclassifiable, the uncanny experiences that do not fit either frame.
            </p>
          </div>

          {/* Network Metadata */}
          <div className="pt-space-md border-t border-white/15 font-label-code text-label-code">
            <div className="flex flex-col gap-space-3xs">
              <span className="text-white/50 uppercase text-[10px]">CURATORIAL HUBS</span>
              <span className="text-white font-bold">Sister Library × HerStory × Goethe-Institut</span>
            </div>
          </div>
        </section>

        {/* 3. Photo Documentation Embed (Archival Plate) */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-1 font-label-code text-label-code">
            <span className="tracking-widest text-white/60 uppercase">
              ARCHIVAL PLATE NO. 01 // VISUAL RECORD
            </span>
            <span className="text-marigold-ochre font-bold">
              SESSION REF: WOBD-DHK-23
            </span>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-white/20 bg-black/80 shadow-2xl group">
            <img
              alt="Digital discussion circle & community screening session under ambient glow"
              className="w-full h-auto max-h-[500px] object-cover filter contrast-[1.05]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB188xepQQ570vIkCm8wlYco_Iext5gA8Y3s9ngqSe84YkLZ6_BxWpBZ6mPCnsYiHs93x0IxQZo7lHnn7lRtbYTO05-8ITTicLxu_NCH54pIWIKayf2UWRUDvDmU7ojzXQE8NRTVhG0YfZ77MoaJZvyD78fbm98NPas2VGZ1u-9JbrP6VehsPLaXf_eNnFX9qV_OK9NTHhbcZyjTKFYg3mPt3fOwrV3C9I7pUU4kLR16zKwpa-5Ql6khktyvqaj5o4cZktVDOeXSBSUlmo"
            />
            <div className="absolute bottom-0 inset-x-0 p-space-md bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-space-xs">
              <div className="flex flex-col gap-space-3xs">
                <span className="font-label-code text-label-code text-riso-pink uppercase font-bold">
                  DHAKA SALON // FIELD DOCUMENT
                </span>
                <p className="font-body-sm text-body-sm text-white font-serif-editorial">
                  Community screening circle and oral history transcription gathered under the incandescent reading lamp.
                </p>
              </div>
              <div className="font-label-code text-label-code text-white/70 whitespace-nowrap">
                ISO 1600 • 35MM RETRIEVAL
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
