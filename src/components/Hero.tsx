import React from 'react';
import { NavTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 flex flex-col items-center text-center">
      <span className="font-sans-ui text-xs md:text-sm text-[#D672CE] font-semibold mb-4 tracking-widest uppercase">
        DREAMING SINCE 2017
      </span>

      <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#D64E0E] max-w-4xl mb-6 leading-[1.15] font-bold">
        Enabling <span className="italic font-serif text-[#a53700]">dreamers</span> through literature and art.
      </h1>

      <p className="font-serif-editorial text-lg md:text-xl text-[#594139] max-w-2xl mb-8 leading-relaxed">
        HerStory Foundation bridges the past and the future, building platforms for sisterhood, shared knowledge, and cultural preservation.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-2 font-sans-ui">
        <button
          onClick={() => {
            setActiveTab('dreams');
            const el = document.getElementById('realised-dreams-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[#D64E0E] text-white px-8 py-4 rounded-lg font-semibold text-xs uppercase tracking-wider hover:brightness-95 transition-all shadow-sm cursor-pointer"
        >
          Explore the Dreams
        </button>

        <button
          onClick={() => setActiveTab('books')}
          className="border border-[#8d7167] text-[#261814] px-8 py-4 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-[#fff1ec] transition-colors cursor-pointer"
        >
          Explore the Library
        </button>
      </div>
    </section>
  );
};
