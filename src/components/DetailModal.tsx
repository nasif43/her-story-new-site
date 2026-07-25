import React, { useState } from 'react';
import { X, Share2, Bookmark, Volume2, Calendar, MapPin, BookOpen, Quote } from 'lucide-react';
import { DreamItem, BookItem, ReflectionItem } from '../types';

interface DetailModalProps {
  item: DreamItem | BookItem | ReflectionItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!item) return null;

  const isDream = 'fullNarrative' in item;
  const isBook = 'isbn' in item || 'pages' in item;
  const isReflection = 'fullContent' in item;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#261814]/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#fff8f6] border border-[#e2bfb4] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header Bar */}
        <div className="p-4 border-b border-[#ffe9e3] flex items-center justify-between bg-[#fff1ec]">
          <div className="flex items-center gap-2">
            <span className="font-sans-ui text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D64E0E]/15 text-[#D64E0E]">
              {isDream ? 'Dream Archive' : isBook ? 'HerStory Publication' : 'Reflection & Essay'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                saved ? 'bg-[#D64E0E] text-white border-[#D64E0E]' : 'border-[#e2bfb4] text-[#594139] hover:bg-[#ffe9e3]'
              }`}
              title={saved ? 'Saved to bookmarks' : 'Save story'}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-[#e2bfb4] text-[#594139] hover:bg-[#ffe9e3] transition-colors cursor-pointer"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#e2bfb4]/30 hover:bg-[#e2bfb4]/60 text-[#261814] transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 font-serif-editorial">
          {copied && (
            <div className="bg-[#BAD687]/40 text-[#261814] text-xs font-sans-ui font-bold p-3 rounded-lg text-center">
              Link copied to clipboard!
            </div>
          )}

          {/* Hero Banner Image */}
          <div className="rounded-xl overflow-hidden aspect-[16/9] w-full bg-[#ffe9e3] relative shadow-inner">
            <img
              alt={item.title}
              className="w-full h-full object-cover"
              src={
                'imageUrl' in item
                  ? item.imageUrl
                  : 'coverImage' in item
                  ? item.coverImage
                  : ''
              }
            />
          </div>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans-ui text-[#8d7167]">
            {'year' in item && (
              <span className="flex items-center gap-1 bg-[#ffe9e3] px-3 py-1 rounded-full text-[#261814] font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#D64E0E]" />
                {item.year}
              </span>
            )}
            {'location' in item && item.location && (
              <span className="flex items-center gap-1 bg-[#ffe9e3] px-3 py-1 rounded-full text-[#261814] font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#D672CE]" />
                {item.location}
              </span>
            )}
            {'author' in item && (
              <span className="font-semibold text-[#261814]">
                By {item.author}
              </span>
            )}
          </div>

          {/* Title & Headline */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#261814] font-bold leading-tight">
              {item.title}
            </h2>
            {'description' in item && (
              <p className="text-base text-[#594139] mt-2 font-medium italic">
                {item.description}
              </p>
            )}
          </div>

          {/* Audio Snippet Simulator */}
          <div className="bg-[#fff1ec] border border-[#e2bfb4] p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-10 h-10 rounded-full bg-[#D64E0E] text-white flex items-center justify-center hover:bg-[#a53700] transition-colors cursor-pointer shadow-sm"
              >
                <Volume2 className={`w-5 h-5 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
              </button>
              <div>
                <p className="font-sans-ui text-xs font-bold text-[#261814]">
                  {isPlayingAudio ? 'Playing Audio Commentary & Soundscape' : 'Listen to Audio Excerpt'}
                </p>
                <p className="font-sans-ui text-[11px] text-[#8d7167]">
                  {isPlayingAudio ? '01:42 / 04:15 — Voice archive recorded in Dhaka' : 'Narrated by HerStory Oral History Fellows'}
                </p>
              </div>
            </div>
            {isPlayingAudio && (
              <div className="flex items-center gap-1">
                <span className="w-1 h-4 bg-[#D64E0E] animate-pulse" />
                <span className="w-1 h-6 bg-[#D672CE] animate-pulse delay-75" />
                <span className="w-1 h-3 bg-[#D64E0E] animate-pulse delay-150" />
              </div>
            )}
          </div>

          {/* Quote Block if available */}
          {'quote' in item && item.quote && (
            <div className="bg-[#D672CE]/10 border-l-4 border-[#D672CE] p-4 rounded-r-xl italic text-base text-[#953891]">
              <Quote className="w-5 h-5 mb-1 opacity-60" />
              {item.quote}
            </div>
          )}

          {/* Narrative Content */}
          <div className="space-y-4 text-base leading-relaxed text-[#261814] whitespace-pre-line">
            {isDream && item.fullNarrative}
            {isBook && (
              <div>
                <p className="font-bold mb-2 text-[#D64E0E]">Book Excerpt & Summary:</p>
                <p className="italic bg-[#ffe9e3]/50 p-4 rounded-xl border border-[#e2bfb4]/40">
                  {item.excerptText}
                </p>
                {item.price && (
                  <div className="mt-4 font-sans-ui text-sm font-bold text-[#261814]">
                    Available from HerStory Publications: <span className="text-[#D64E0E]">{item.price}</span>
                  </div>
                )}
              </div>
            )}
            {isReflection && item.fullContent}
          </div>

          {/* Tags */}
          {'tags' in item && item.tags && (
            <div className="pt-4 border-t border-[#ffe9e3] flex flex-wrap gap-2 font-sans-ui text-xs">
              {item.tags.map((tag) => (
                <span key={tag} className="bg-[#ffe9e3] text-[#594139] px-3 py-1 rounded-full font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#ffe9e3] bg-[#fff1ec] flex flex-wrap items-center justify-between gap-3">
          <p className="font-sans-ui text-xs text-[#8d7167]">
            HerStory Foundation & Publications Archive
          </p>
          <div className="flex gap-2 font-sans-ui text-xs">
            <button
              onClick={onClose}
              className="bg-[#D64E0E] text-white hover:bg-[#a53700] px-5 py-2 rounded-lg font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
