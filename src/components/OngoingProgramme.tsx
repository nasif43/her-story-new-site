import React from 'react';
import { DREAM_ITEMS } from '../data/mockData';
import { DreamItem } from '../types';

interface OngoingProgrammeProps {
  onSelectDream: (dream: DreamItem) => void;
  onGoToLadyland: () => void;
}

export const OngoingProgramme: React.FC<OngoingProgrammeProps> = ({
  onSelectDream,
  onGoToLadyland
}) => {
  const ladylandItem = DREAM_ITEMS.find((d) => d.id === 'ladyland-2026') || DREAM_ITEMS[1];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-12">
      <div className="relative group overflow-hidden rounded-2xl bg-[#fde3da] shadow-md border border-[#e2bfb4]">
        {/* Banner Background Image */}
        <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
          <img
            alt="Project Ladyland 2026 - HerStory Foundation"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3AdXCBnNP1PxM57H4Drd7yukTHziz2-AxqwUPWPkREBPvNZPdHDiZKWjT5yyFzvVcA1fYv7ZFaF_jM78_IVhL5ma-soEKs68MnkvRfFIDYXB4wHhv_wJkrMl3C6PoupNLHGZEgho4YKFHV5NYJNVnVXTe1rjzmcP3pGB0o4H8Q2HX6mDWylK6JyDK1y90Pf1qLYBpiWsp5brEP7f21ncEogNvbVXY082UnRX4w1zRCMJ1dOiOhgS03ZRm-4Sr36rFRU1tLArYAww5"
          />
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#261814]/90 via-[#261814]/40 to-transparent pointer-events-none" />

        {/* Card Content Overlay */}
        <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white max-w-3xl">
          <span className="font-sans-ui text-xs text-[#BAD687] font-bold uppercase tracking-widest mb-2 block">
            ONGOING PROGRAMME
          </span>

          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl text-white mb-3 font-semibold">
            Project Ladyland 2026
          </h2>

          <p className="font-serif-editorial text-sm sm:text-base text-white/90 mb-6 leading-relaxed max-w-2xl">
            British Council and Women of the World Foundation grantee for the production of a participatory performance inspired by the 1905 sci-fi short story 'Sultana's Dream' by Rokeya Sakhawat Hosein.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectDream(ladylandItem)}
              className="font-sans-ui text-xs font-bold text-white uppercase tracking-wider border-b-2 border-white hover:text-[#D672CE] hover:border-[#D672CE] transition-all pb-1 cursor-pointer"
            >
              LEARN MORE
            </button>

            <button
              onClick={onGoToLadyland}
              className="font-sans-ui text-xs font-bold bg-[#D64E0E] hover:bg-[#a53700] text-white px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm"
            >
              Explore Ladyland Portal →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
