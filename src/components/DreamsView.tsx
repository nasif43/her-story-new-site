import React, { useState } from 'react';
import { DREAM_ITEMS } from '../data/mockData';
import { DreamItem } from '../types';
import { ArrowRight } from 'lucide-react';

interface DreamsViewProps {
  onSelectDream: (dream: DreamItem) => void;
}

export const DreamsView: React.FC<DreamsViewProps> = ({
  onSelectDream,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Textile Art', 'Theatre & Performance', 'Community Space', 'Fairy Tale & Lore'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 space-y-12 animate-in fade-in duration-300 font-serif-editorial">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-sans-ui text-xs font-bold text-[#D672CE] uppercase tracking-widest block">
          COMMUNITY ARCHIVE & INITIATIVES
        </span>
        <h1 className="text-4xl sm:text-5xl text-[#D64E0E] font-bold">
          HerStory Dreams Archive
        </h1>
        <p className="text-base text-white/80 leading-relaxed">
          From rural textile workshops to speculative sci-fi performances and youth libraries, explore the realized dreams that shape our collective future.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 font-sans-ui">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
              selectedTag === t
                ? 'bg-[#D64E0E] text-white shadow-sm'
                : 'bg-black/20 text-white/80 hover:bg-white/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Primary Dreams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {DREAM_ITEMS.filter((item) => selectedTag === 'All' || item.category === selectedTag).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDream(item)}
            className="group cursor-pointer bg-black/40 border border-white/10/60 rounded-2xl p-4 hover:border-[#D64E0E] hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className={`aspect-square mb-4 overflow-hidden rounded-xl ${item.bgAccent} relative`}>
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.imageUrl}
                />
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white font-sans-ui text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {item.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#D64E0E] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-white/80 mt-2 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-sans-ui text-xs font-semibold text-[#D64E0E]">
              <span>View Full Archive</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
