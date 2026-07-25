import React from 'react';
import { REFLECTION_ITEMS } from '../data/mockData';
import { ReflectionItem } from '../types';
import { Clock, ArrowRight } from 'lucide-react';

interface ReflectionsViewProps {
  onSelectReflection: (reflection: ReflectionItem) => void;
}

export const ReflectionsView: React.FC<ReflectionsViewProps> = ({ onSelectReflection }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 space-y-12 animate-in fade-in duration-300 font-serif-editorial">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-sans-ui text-xs font-bold text-[#D672CE] uppercase tracking-widest block">
          ESSAYS, PODCASTS & ESSENTIAL CRITIQUE
        </span>
        <h1 className="text-4xl sm:text-5xl text-[#261814] font-bold">
          Reflections Journal
        </h1>
        <p className="text-base text-[#594139] leading-relaxed">
          Critical essays, audio transcripts, and interviews exploring eco-feminism, oral history preservation, and speculative futures.
        </p>
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REFLECTION_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectReflection(item)}
            className="bg-[#fff8f6] border border-[#e2bfb4] rounded-2xl overflow-hidden hover:border-[#D64E0E] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#ffe9e3] relative">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.coverImage}
                />
                <span className="absolute top-3 left-3 bg-[#fff8f6]/90 backdrop-blur-sm text-[#261814] font-sans-ui text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 font-sans-ui text-xs text-[#8d7167]">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D64E0E]" />
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#261814] group-hover:text-[#D64E0E] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="font-sans-ui text-xs font-semibold text-[#594139]">
                  By {item.author} ({item.role})
                </p>

                <p className="text-xs text-[#594139] leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 font-sans-ui text-xs font-bold text-[#D64E0E] flex items-center justify-between">
              <span>Read Full Journal Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
