import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutHerstoryProps {
  onOpenOurStoryModal: () => void;
}

export const AboutHerstory: React.FC<AboutHerstoryProps> = ({ onOpenOurStoryModal }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="order-2 md:order-1">
        <span className="font-sans-ui text-xs text-[#D64E0E] font-bold mb-3 block tracking-widest uppercase">
          ABOUT HERSTORY
        </span>

        <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#261814] mb-6 leading-tight font-bold">
          Stories make futures
        </h2>

        <p className="font-serif-editorial text-base sm:text-lg text-[#594139] mb-6 leading-relaxed">
          Founded on the belief that stories are the primary architecture of civilization, HerStory Foundation works to document, publish, and manifest narratives that celebrate creativity and hope.
        </p>

        <p className="font-serif-editorial text-base sm:text-lg text-[#594139] mb-8 italic">
          A book comes alive when it is shared.
        </p>

        <button
          onClick={onOpenOurStoryModal}
          className="inline-flex items-center gap-2 font-sans-ui text-xs font-bold text-[#D64E0E] uppercase tracking-wider group cursor-pointer hover:text-[#a53700] transition-colors"
        >
          <span>DISCOVER OUR STORY</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl rotate-2 border-4 border-white transition-transform hover:rotate-0 duration-500">
        <img
          alt="HerStory Creative Hub and Young Reader"
          className="w-full h-auto object-cover max-h-[520px]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhZNjpUZkvNNoESSRaFoGSXx7DOZgLmuOIxvz-JWlF2jghqjm9CDozY-ue-zl4mzlTwwMQm3jzgJabnI1xbK1VskaJZodz6m8i8O0G1cMs3YLdHQMNZ3aWgol5e1MX7sfRnwNh3TxQ9C4UPKhMWDSbSwAK9geBSSZOEyOoFoBvEYt_hnEwfTuhJADfOLEjeU0iIn38bLFHhN5zOJI2U2yFtR-gp5sPTGjMDq2rW7UoPecIQpM3W6L1XPODVWqUVCaUj4wkEAIQaBBs"
        />
      </div>
    </section>
  );
};
