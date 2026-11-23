import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { NavTab, DreamItem, BookItem, ReflectionItem } from './types';
import { ShaderBackground } from './components/ShaderBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OngoingProgramme } from './components/OngoingProgramme';
import { MissionSection } from './components/MissionSection';
import { RealisedDreams } from './components/RealisedDreams';
import { AboutHerstory } from './components/AboutHerstory';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { DetailModal } from './components/DetailModal';
import { OurStoryModal } from './components/OurStoryModal';
import { FooterModal } from './components/FooterModal';

import { ProjectLadylandView } from './components/ProjectLadylandView';
import { DreamsView } from './components/DreamsView';
import { BooksView } from './components/BooksView';
import { SisterLibraryView } from './components/SisterLibraryView';
import { ReflectionsView } from './components/ReflectionsView';

export default function App() {
  const getTabFromPath = (): NavTab => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (['dreams', 'books', 'sister-library', 'reflections', 'ladyland'].includes(path)) {
      return path as NavTab;
    }
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState<NavTab>(getTabFromPath);
  const [ladylandLang, setLadylandLang] = useState<'EN' | 'BN'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toUpperCase();
      if (urlLang === 'BN' || urlLang === 'EN') return urlLang;
    }
    return 'BN';
  });
  const [transitionTarget, setTransitionTarget] = useState<'sister-library' | 'ladyland' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [ourStoryOpen, setOurStoryOpen] = useState(false);
  const [footerModalType, setFooterModalType] = useState<'contact' | 'privacy' | 'terms' | 'newsletter' | null>(null);

  const [selectedDetailItem, setSelectedDetailItem] = useState<DreamItem | BookItem | ReflectionItem | null>(null);

  const setActiveTab = (tab: NavTab) => {
    // If transitioning to sister-library or ladyland from anywhere else, show cinematic flash
    if ((tab === 'sister-library' || tab === 'ladyland') && activeTab !== tab) {
      setTransitionTarget(tab);
      const targetPath = `/${tab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      setTimeout(() => {
        setActiveTabState(tab);
      }, 150);
      setTimeout(() => {
        setTransitionTarget(null);
      }, 950);
      return;
    }

    setActiveTabState(tab);
    const targetPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  React.useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between relative text-white">
      {/* Loading Flash Transition Screen for Sister Library & Project Ladyland */}
      {transitionTarget && (
        <div
          className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-300 ${
            transitionTarget === 'sister-library'
              ? 'bg-[#fdf9ef] text-[#1c1c16]'
              : 'bg-[#080911] text-white'
          }`}
        >
          {transitionTarget === 'sister-library' ? (
            <div className="flex flex-col items-center max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3 py-1 bg-[#ea580c] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xs shadow-xs mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>ACCESSION ROUTE // ARCHIVE</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1c1c16] flex items-center gap-3">
                <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-[#ff1493] animate-sparkle shrink-0" />
                <span>GOING TO <span className="text-[#ff1493]">SISTER LIBRARY</span></span>
                <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-[#ea580c] animate-sparkle shrink-0" />
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#5a4a50] mt-3 font-medium tracking-wide">
                Entering Sister Library (Dhaka), autonomous print commons &amp; reading room...
              </p>

              {/* Paper-tape loading bar */}
              <div className="w-64 sm:w-80 h-2.5 bg-[#eae4d5] border border-[#1c1c16]/20 rounded-full mt-6 overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-[#ff1493] via-[#ea580c] to-[#7e22ce] rounded-full animate-marquee-ltr w-[200%]" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200">
              <div className="px-3.5 py-1 bg-[#2563eb] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/20 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                <span>ROKEYA 2026 // UTOPIAN REALM</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#38bdf8] animate-pulse" />
                <span>GOING TO <span className="text-[#38bdf8]">LADYLAND</span></span>
                <span className="w-3 h-3 rounded-full bg-[#818cf8] animate-pulse" />
              </h2>

              <p className="font-sans text-sm sm:text-base text-[#94a3b8] mt-3 font-medium tracking-wide">
                Entering Sultana's Dream interactive feminist world...
              </p>

              {/* Cosmic glowing bar */}
              <div className="w-64 sm:w-80 h-2 bg-white/10 rounded-full mt-6 overflow-hidden p-0.5 border border-white/20">
                <div className="h-full bg-gradient-to-r from-[#2563eb] via-[#818cf8] to-[#38bdf8] rounded-full shadow-[0_0_12px_#38bdf8] animate-pulse" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Animated WebGL Shader Background */}
      <ShaderBackground />

      {/* Top Header (Hidden only on Sister Library — has its own subnav) */}
      {activeTab !== 'sister-library' && (
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSearch={() => setSearchOpen(true)}
          ladylandLang={ladylandLang}
          onToggleLadylandLang={(l) => setLadylandLang(l)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 relative z-10 pb-16">
        {activeTab === 'home' && (
          <div>
            <OngoingProgramme
              onSelectDream={(dream) => setSelectedDetailItem(dream)}
              onGoToLadyland={() => setActiveTab('ladyland')}
            />
            <Hero
              setActiveTab={setActiveTab}
            />
            <MissionSection />
            <RealisedDreams
              onSelectDream={(dream) => setSelectedDetailItem(dream)}
              onGoToSisterLibrary={() => setActiveTab('sister-library')}
            />
            <AboutHerstory
              onOpenOurStoryModal={() => setOurStoryOpen(true)}
            />
            <QuoteSection />
          </div>
        )}

        {activeTab === 'dreams' && (
          <DreamsView
            onSelectDream={(dream) => setSelectedDetailItem(dream)}
            onGoToSisterLibrary={() => setActiveTab('sister-library')}
          />
        )}

        {activeTab === 'books' && (
          <BooksView
            onSelectBook={(book) => setSelectedDetailItem(book)}
          />
        )}

        {activeTab === 'sister-library' && (
          <SisterLibraryView onGoHome={() => setActiveTab('home')} />
        )}

        {activeTab === 'reflections' && (
          <ReflectionsView
            onSelectReflection={(reflection) => setSelectedDetailItem(reflection)}
          />
        )}

        {activeTab === 'ladyland' && (
          <ProjectLadylandView
            onGoHome={() => setActiveTab('home')}
            lang={ladylandLang}
            onSetLang={(l) => setLadylandLang(l)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenFooterModal={(type) => setFooterModalType(type)} />

      {/* Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectDream={(dream) => setSelectedDetailItem(dream)}
        onSelectBook={(book) => setSelectedDetailItem(book)}
        onSelectReflection={(reflection) => setSelectedDetailItem(reflection)}
      />

      <DetailModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      <OurStoryModal
        isOpen={ourStoryOpen}
        onClose={() => setOurStoryOpen(false)}
      />

      <FooterModal
        type={footerModalType}
        onClose={() => setFooterModalType(null)}
      />
    </div>
  );
}
