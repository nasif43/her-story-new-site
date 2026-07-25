import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Sparkles, Library, FileText, ArrowRight } from 'lucide-react';
import { DREAM_ITEMS, BOOK_ITEMS, SISTER_LIBRARY_ITEMS, REFLECTION_ITEMS } from '../data/mockData';
import { DreamItem, BookItem, SisterLibraryItem, ReflectionItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDream: (dream: DreamItem) => void;
  onSelectBook: (book: BookItem) => void;
  onSelectReflection: (reflection: ReflectionItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDream,
  onSelectBook,
  onSelectReflection,
}) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Dreams' | 'Books' | 'Library' | 'Reflections'>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingDreams = (filter === 'All' || filter === 'Dreams')
    ? DREAM_ITEMS.filter((d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchingBooks = (filter === 'All' || filter === 'Books')
    ? BOOK_ITEMS.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
      )
    : [];

  const matchingLibrary = (filter === 'All' || filter === 'Library')
    ? SISTER_LIBRARY_ITEMS.filter((s) =>
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    : [];

  const matchingReflections = (filter === 'All' || filter === 'Reflections')
    ? REFLECTION_ITEMS.filter((r) =>
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.author.toLowerCase().includes(q)
      )
    : [];

  const totalMatches =
    matchingDreams.length +
    matchingBooks.length +
    matchingLibrary.length +
    matchingReflections.length;

  return (
    <div className="fixed inset-0 z-50 bg-[#261814]/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-[#fff8f6] border border-[#e2bfb4] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in duration-200">
        {/* Search Header Input */}
        <div className="p-4 border-b border-[#ffe9e3] flex items-center gap-3 bg-[#fff1ec]">
          <Search className="w-5 h-5 text-[#D64E0E]" />
          <input
            type="text"
            autoFocus
            placeholder="Search dreams, books, sister library, reflections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base font-serif-editorial text-[#261814] focus:outline-none placeholder:text-[#8d7167]"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ffe9e3] text-[#8d7167] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-3 bg-[#fff8f6] border-b border-[#ffe9e3] flex gap-2 overflow-x-auto font-sans-ui text-xs">
          {(['All', 'Dreams', 'Books', 'Library', 'Reflections'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full uppercase tracking-wider font-semibold cursor-pointer ${
                filter === type
                  ? 'bg-[#D64E0E] text-white'
                  : 'bg-[#ffe9e3] text-[#594139] hover:bg-[#fde3da]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {totalMatches === 0 ? (
            <div className="text-center py-12 text-[#8d7167] font-serif-editorial">
              <p className="text-lg">No archives matching "{query}"</p>
              <p className="text-xs mt-1 font-sans-ui">Try searching for 'Sultana', 'Nakshi', 'Library', or 'Feminist'</p>
            </div>
          ) : (
            <>
              {/* Dreams Results */}
              {matchingDreams.length > 0 && (
                <div>
                  <h4 className="font-sans-ui text-xs font-bold text-[#D672CE] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Dreams & Initiatives ({matchingDreams.length})
                  </h4>
                  <div className="space-y-2">
                    {matchingDreams.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectDream(item);
                          onClose();
                        }}
                        className="p-3 bg-[#fff1ec] hover:bg-[#ffe9e3] rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-serif-editorial font-semibold text-[#261814]">{item.title}</p>
                          <p className="font-serif-editorial text-xs text-[#594139] line-clamp-1">{item.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D64E0E]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Books Results */}
              {matchingBooks.length > 0 && (
                <div>
                  <h4 className="font-sans-ui text-xs font-bold text-[#D64E0E] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> HerStory Publications ({matchingBooks.length})
                  </h4>
                  <div className="space-y-2">
                    {matchingBooks.map((book) => (
                      <div
                        key={book.id}
                        onClick={() => {
                          onSelectBook(book);
                          onClose();
                        }}
                        className="p-3 bg-[#fff1ec] hover:bg-[#ffe9e3] rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-serif-editorial font-semibold text-[#261814]">{book.title}</p>
                          <p className="font-serif-editorial text-xs text-[#594139]">By {book.author} • {book.genre}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D64E0E]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sister Library Results */}
              {matchingLibrary.length > 0 && (
                <div>
                  <h4 className="font-sans-ui text-xs font-bold text-[#BAD687] text-stone-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Library className="w-3.5 h-3.5 text-[#594139]" /> Sister Library Holdings ({matchingLibrary.length})
                  </h4>
                  <div className="space-y-2">
                    {matchingLibrary.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-[#fff1ec] rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <p className="font-serif-editorial font-semibold text-[#261814]">{item.title}</p>
                          <p className="font-serif-editorial text-xs text-[#594139]">{item.author} — {item.category}</p>
                        </div>
                        <span className="text-[10px] font-sans-ui font-bold px-2.5 py-1 rounded-full bg-[#BAD687]/30 text-[#261814]">
                          {item.condition}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reflections Results */}
              {matchingReflections.length > 0 && (
                <div>
                  <h4 className="font-sans-ui text-xs font-bold text-[#a53700] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Reflections & Essays ({matchingReflections.length})
                  </h4>
                  <div className="space-y-2">
                    {matchingReflections.map((ref) => (
                      <div
                        key={ref.id}
                        onClick={() => {
                          onSelectReflection(ref);
                          onClose();
                        }}
                        className="p-3 bg-[#fff1ec] hover:bg-[#ffe9e3] rounded-xl cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <p className="font-serif-editorial font-semibold text-[#261814]">{ref.title}</p>
                          <p className="font-serif-editorial text-xs text-[#594139]">By {ref.author} • {ref.date}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D64E0E]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
