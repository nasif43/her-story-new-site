import React, { useState } from 'react';
import { SISTER_LIBRARY_ITEMS } from '../data/mockData';
import { SisterLibraryItem } from '../types';
import { Library, BookOpen, Search, CheckCircle2, Heart } from 'lucide-react';

export const SisterLibraryView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowRequested, setBorrowRequested] = useState<string | null>(null);

  const filteredItems = SISTER_LIBRARY_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBorrow = (title: string) => {
    setBorrowRequested(title);
    setTimeout(() => setBorrowRequested(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 space-y-12 animate-in fade-in duration-300 font-serif-editorial">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-sans-ui text-xs font-bold text-[#BAD687] uppercase tracking-widest block">
          POROUS READING SANCTUARY
        </span>
        <h1 className="text-4xl sm:text-5xl text-white font-bold">
          Sister Library
        </h1>
        <p className="text-base text-white/80 leading-relaxed">
          A living, community-curated library and zine archive celebrating female, non-binary, and gender-marginalized creators.
        </p>
      </div>

      {borrowRequested && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0a0c16]/90 backdrop-blur-lg border border-[#BAD687] text-white p-4 rounded-xl text-center font-sans-ui text-sm flex items-center justify-center gap-3 w-11/12 max-w-xl shadow-[0_0_20px_rgba(186,214,135,0.2)] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#BAD687] shrink-0" />
          <span>
            <strong className="block text-[#BAD687] mb-1">Loan request registered!</strong>
            "{borrowRequested}" has been noted. Visit our Sister Room in Dhaka or request mobile delivery.
          </span>
        </div>
      )}

      {/* Search Input */}
      <div className="max-w-xl mx-auto bg-black/20 border border-white/10 rounded-full p-2 flex items-center gap-3 font-sans-ui px-4">
        <Search className="w-5 h-5 text-[#D64E0E]" />
        <input
          type="text"
          placeholder="Search zines, feminist theory, poetry, or curator notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-white/40"
        />
      </div>

      {/* Sister Library Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:border-[#D672CE] hover:shadow-lg transition-all"
          >
            <div>
              <div className="aspect-[3/4] mb-3 overflow-hidden rounded-xl bg-black/20 relative">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.coverImage}
                />
                <span
                  className={`absolute top-2 right-2 font-sans-ui text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.condition === 'Available'
                      ? 'bg-white/10 text-white'
                      : item.condition === 'On Loan'
                      ? 'bg-[#D64E0E] text-white'
                      : 'bg-[#D672CE] text-white'
                  }`}
                >
                  {item.condition}
                </span>
              </div>

              <span className="font-sans-ui text-[10px] font-bold text-[#D672CE] uppercase tracking-wider block">
                {item.category}
              </span>

              <h3 className="text-lg font-bold text-white mt-1">
                {item.title}
              </h3>

              <p className="font-sans-ui text-xs text-[#c4c5da] font-medium">
                By {item.author}
              </p>

              <p className="text-xs text-white/80 mt-3 bg-black/20 p-3 rounded-lg border border-white/20 italic">
                "{item.curatorNote}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 font-sans-ui text-xs flex items-center justify-between">
              <span className="text-[10px] text-[#c4c5da]">
                {item.donatedBy || 'Sister Archive'}
              </span>

              <button
                onClick={() => handleBorrow(item.title)}
                className="bg-[#D672CE]/20 text-[#ffb0cd] hover:bg-[#D672CE]/30 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
              >
                Request Loan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
