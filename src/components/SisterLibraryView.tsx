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
        <span className="font-sans-ui text-xs font-bold text-[#BAD687] text-stone-700 uppercase tracking-widest block">
          POROUS READING SANCTUARY
        </span>
        <h1 className="text-4xl sm:text-5xl text-[#261814] font-bold">
          Sister Library
        </h1>
        <p className="text-base text-[#594139] leading-relaxed">
          A living, community-curated library and zine archive celebrating female, non-binary, and gender-marginalized creators.
        </p>
      </div>

      {borrowRequested && (
        <div className="bg-[#BAD687]/40 border border-[#BAD687] text-[#261814] p-4 rounded-xl text-center font-sans-ui text-xs font-bold flex items-center justify-center gap-2 max-w-xl mx-auto">
          <CheckCircle2 className="w-4 h-4 text-[#a53700]" />
          Loan request registered for "{borrowRequested}"! Visit our Sister Room in Dhaka or request mobile delivery.
        </div>
      )}

      {/* Search Input */}
      <div className="max-w-xl mx-auto bg-[#fff1ec] border border-[#e2bfb4] rounded-full p-2 flex items-center gap-3 font-sans-ui px-4">
        <Search className="w-5 h-5 text-[#D64E0E]" />
        <input
          type="text"
          placeholder="Search zines, feminist theory, poetry, or curator notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-[#261814] focus:outline-none placeholder:text-[#8d7167]"
        />
      </div>

      {/* Sister Library Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#fff8f6] border border-[#e2bfb4] rounded-2xl p-4 flex flex-col justify-between hover:border-[#D672CE] hover:shadow-lg transition-all"
          >
            <div>
              <div className="aspect-[3/4] mb-3 overflow-hidden rounded-xl bg-[#ffe9e3] relative">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover"
                  src={item.coverImage}
                />
                <span
                  className={`absolute top-2 right-2 font-sans-ui text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    item.condition === 'Available'
                      ? 'bg-[#BAD687] text-[#261814]'
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

              <h3 className="text-lg font-bold text-[#261814] mt-1 line-clamp-1">
                {item.title}
              </h3>

              <p className="font-sans-ui text-xs text-[#8d7167] font-medium">
                By {item.author}
              </p>

              <p className="text-xs text-[#594139] mt-3 bg-[#fff1ec] p-3 rounded-lg border border-[#e2bfb4]/40 italic line-clamp-3">
                "{item.curatorNote}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#ffe9e3] font-sans-ui text-xs flex items-center justify-between">
              <span className="text-[10px] text-[#8d7167]">
                {item.donatedBy || 'Sister Archive'}
              </span>

              <button
                onClick={() => handleBorrow(item.title)}
                className="bg-[#D672CE]/20 text-[#953891] hover:bg-[#D672CE]/30 px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
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
