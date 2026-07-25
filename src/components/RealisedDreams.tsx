import React, { useState } from 'react';
import { DREAM_ITEMS } from '../data/mockData';
import { DreamItem } from '../types';
import { ArrowRight } from 'lucide-react';

interface RealisedDreamsProps {
  onSelectDream: (dream: DreamItem) => void;
}

export const RealisedDreams: React.FC<RealisedDreamsProps> = ({
  onSelectDream,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Textile Art', 'Theatre & Performance', 'Community Space', 'Fairy Tale & Lore'];

  const filteredItems = selectedCategory === 'All'
    ? DREAM_ITEMS
    : DREAM_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="realised-dreams-section" className="max-w-7xl mx-auto px-4 md:px-12 py-16">
      {/* Title Header */}
      <div className="text-center mb-10">
        <h2 className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl text-[#D64E0E] font-semibold">
          Realised Dreams
        </h2>
        <div className="w-24 h-1 bg-[#D672CE] mx-auto mt-4 rounded-full" />
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 font-sans-ui">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#D64E0E] text-white shadow-sm'
                : 'bg-[#ffe9e3] text-[#594139] hover:bg-[#fde3da]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Dreams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectDream(item)}
            className="group block cursor-pointer bg-[#fff8f6] border border-[#e2bfb4]/50 rounded-xl p-3 hover:border-[#D64E0E] hover:shadow-lg transition-all duration-300"
          >
            {/* Square Aspect Ratio Container */}
            <div className={`aspect-square mb-4 overflow-hidden rounded-lg ${item.bgAccent} relative`}>
              <img
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={item.imageUrl}
              />
              <span className="absolute top-3 left-3 bg-[#fff8f6]/90 backdrop-blur-sm text-[#261814] font-sans-ui text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {item.category}
              </span>
            </div>

            {/* Title & Short Description */}
            <h3 className="font-serif-editorial text-xl font-semibold text-[#261814] group-hover:text-[#D64E0E] transition-colors line-clamp-1">
              {item.title}
            </h3>

            <p className="font-serif-editorial text-sm text-[#594139] mt-2 leading-relaxed line-clamp-2">
              {item.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[#ffe9e3] flex items-center justify-between text-xs font-sans-ui font-semibold text-[#D64E0E] group-hover:translate-x-1 transition-transform">
              <span>Read Story & Archives</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
