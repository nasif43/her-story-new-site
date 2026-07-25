import React from 'react';
import { X, Heart, Award, Users, BookOpen } from 'lucide-react';

interface OurStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OurStoryModal: React.FC<OurStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#261814]/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#fff8f6] border border-[#e2bfb4] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8 max-h-[85vh] flex flex-col font-serif-editorial">
        {/* Header */}
        <div className="p-4 border-b border-[#ffe9e3] flex items-center justify-between bg-[#fff1ec] font-sans-ui">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D64E0E]" />
            <h3 className="text-base font-bold text-[#261814]">
              Our Story & Foundation History
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ffe9e3] text-[#8d7167] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-[#261814] leading-relaxed">
          <div className="text-center">
            <span className="font-sans-ui text-xs font-bold text-[#D672CE] uppercase tracking-widest block mb-1">
              HERSTORY FOUNDATION
            </span>
            <h2 className="text-2xl font-bold text-[#D64E0E]">
              Building platforms for sisterhood, shared knowledge, and cultural preservation.
            </h2>
          </div>

          <p>
            HerStory Foundation was established in 2017 in Dhaka, Bangladesh, with a simple yet transformative belief: that stories are the primary architecture of human civilization. When girls and women do not see themselves reflected in schoolbooks, public monuments, or popular literature, a crucial part of human memory is severed.
          </p>

          <p>
            Over the past decade, HerStory has published groundbreaking illustrated books, produced participatory feminist theatre, established mobile reading sanctuaries through the Sister Library, and revived ancient textile storytelling methods through the Moon Granny Nakshi Kantha initiative.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#fff1ec] rounded-xl text-center font-sans-ui">
            <div>
              <p className="text-2xl font-bold text-[#D64E0E]">2017</p>
              <p className="text-[11px] text-[#594139] uppercase font-semibold">Founded</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#D672CE]">45k+</p>
              <p className="text-[11px] text-[#594139] uppercase font-semibold">Books Distributed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#a53700]">120+</p>
              <p className="text-[11px] text-[#594139] uppercase font-semibold">Artisan Fellows</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#380d00]">4</p>
              <p className="text-[11px] text-[#594139] uppercase font-semibold">Global Awards</p>
            </div>
          </div>

          <div>
            <h4 className="font-sans-ui text-xs font-bold text-[#D64E0E] uppercase tracking-wider mb-2">
              Our Core Pillars
            </h4>
            <ul className="space-y-2 text-xs font-sans-ui text-[#594139]">
              <li className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-[#D64E0E] flex-shrink-0 mt-0.5" />
                <span><strong>Independent Publishing:</strong> High-quality illustrated anthologies celebrating pioneer South Asian women.</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-[#D672CE] flex-shrink-0 mt-0.5" />
                <span><strong>Community Libraries:</strong> Creating non-hierarchical, safe reading rooms for women and youth.</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#a53700] flex-shrink-0 mt-0.5" />
                <span><strong>Speculative Arts & Sci-Fi:</strong> Commissioning futuristic performances inspired by pioneering thinkers like Begum Rokeya.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ffe9e3] bg-[#fff1ec] flex justify-end font-sans-ui">
          <button
            onClick={onClose}
            className="bg-[#D64E0E] text-white px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#a53700] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
