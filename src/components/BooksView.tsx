import React, { useState } from 'react';
import { BOOK_ITEMS } from '../data/mockData';
import { BookItem } from '../types';
import { BookOpen, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BooksViewProps {
  onSelectBook: (book: BookItem) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({ onSelectBook }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [reservedBookTitle, setReservedBookTitle] = useState<string | null>(null);

  const genres = ['All', 'Illustrated Biography', 'Sci-Fi Classic', 'Cultural History', 'Zine & Anthology'];

  const filteredBooks = selectedGenre === 'All'
    ? BOOK_ITEMS
    : BOOK_ITEMS.filter((b) => b.genre === selectedGenre);

  const handleReserve = (title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setReservedBookTitle(title);
    setTimeout(() => setReservedBookTitle(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 space-y-12 animate-in fade-in duration-300 font-serif-editorial">
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-sans-ui text-xs font-bold text-[#D64E0E] uppercase tracking-widest block">
          HERSTORY PUBLICATIONS & PRESS
        </span>
        <h1 className="text-4xl sm:text-5xl text-[#261814] font-bold">
          Publications & Books
        </h1>
        <p className="text-base text-[#594139] leading-relaxed">
          Beautifully illustrated biographies, restored classics, and eco-feminist anthologies created to inspire generations of young readers.
        </p>
      </div>

      {reservedBookTitle && (
        <div className="bg-[#BAD687]/40 border border-[#BAD687] text-[#261814] p-4 rounded-xl text-center font-sans-ui text-xs font-bold flex items-center justify-center gap-2 max-w-xl mx-auto">
          <CheckCircle2 className="w-4 h-4 text-[#a53700]" />
          Inquiry sent for "{reservedBookTitle}"! Our publications desk will reach out.
        </div>
      )}

      {/* Genre Filter */}
      <div className="flex flex-wrap justify-center gap-2 font-sans-ui">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
              selectedGenre === g
                ? 'bg-[#D64E0E] text-white shadow-sm'
                : 'bg-[#ffe9e3] text-[#594139] hover:bg-[#fde3da]'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => onSelectBook(book)}
            className="bg-[#fff8f6] border border-[#e2bfb4] rounded-2xl p-6 hover:border-[#D64E0E] hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row gap-6 group"
          >
            {/* Book Cover Image */}
            <div className="w-full sm:w-40 aspect-[3/4] overflow-hidden rounded-xl bg-[#ffe9e3] flex-shrink-0 relative shadow-md">
              <img
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={book.coverImage}
              />
              <span className="absolute bottom-2 left-2 bg-[#261814]/80 text-white font-sans-ui text-[10px] font-bold px-2 py-0.5 rounded-md">
                {book.pages} pages
              </span>
            </div>

            {/* Book Details */}
            <div className="flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-sans-ui text-[11px] font-bold text-[#D672CE] uppercase tracking-wider block mb-1">
                  {book.genre}
                </span>

                <h3 className="text-xl font-bold text-[#261814] group-hover:text-[#D64E0E] transition-colors leading-snug">
                  {book.title}
                </h3>

                <p className="font-sans-ui text-xs font-semibold text-[#8d7167] mt-1">
                  By {book.author} {book.illustrator && `• Illus. ${book.illustrator}`}
                </p>

                <p className="text-xs text-[#594139] mt-3 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#ffe9e3] flex flex-wrap items-center justify-between gap-2 font-sans-ui">
                <span className="text-sm font-bold text-[#D64E0E]">
                  {book.price || 'Library Collection'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleReserve(book.title, e)}
                    className="bg-[#D64E0E] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#a53700] transition-colors cursor-pointer"
                  >
                    Request Book
                  </button>

                  <button className="text-xs font-bold text-[#594139] hover:text-[#D64E0E] flex items-center gap-1">
                    <span>Excerpt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
