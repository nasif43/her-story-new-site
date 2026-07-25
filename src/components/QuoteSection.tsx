import React from 'react';
import { Quote } from 'lucide-react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-24 flex flex-col items-center text-center">
      <div className="max-w-3xl flex flex-col items-center">
        <Quote className="w-12 h-12 text-[#D672CE] mb-6 rotate-180" />

        <blockquote className="font-serif-editorial text-2xl sm:text-3xl md:text-5xl text-[#D64E0E] mb-6 italic leading-tight font-semibold">
          Team work makes the dream work. Collectively, we are remembering, celebrating and creating.
        </blockquote>
      </div>
    </section>
  );
};
