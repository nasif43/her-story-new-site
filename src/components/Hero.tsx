import React from 'react';
import { NavTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-5xl relative">
        <span className="font-sans-ui text-xs md:text-sm text-white/80 font-bold mb-4 tracking-[0.2em] uppercase drop-shadow-md">
          DREAMING SINCE 2017
        </span>

        <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl mb-6 leading-[1.15] font-bold drop-shadow-lg">
          Enabling <span className="italic font-serif text-white/90">dreamers</span> through literature and art.
        </h1>

        <p className="font-serif-editorial text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed font-light drop-shadow-md">
          HerStory Foundation bridges the past and the future, building platforms for sisterhood, shared knowledge, and cultural preservation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2 font-sans-ui">
          <button
            onClick={() => {
              setActiveTab('dreams');
              const el = document.getElementById('realised-dreams-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/90 text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            Explore the Dreams
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className="border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/10 hover:border-white transition-colors cursor-pointer"
          >
            Explore the Library
          </button>
        </div>
      </div>
    </section>
  );
};



