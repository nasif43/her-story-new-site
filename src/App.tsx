import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [ourStoryOpen, setOurStoryOpen] = useState(false);
  const [footerModalType, setFooterModalType] = useState<'contact' | 'privacy' | 'terms' | 'newsletter' | null>(null);

  const [selectedDetailItem, setSelectedDetailItem] = useState<DreamItem | BookItem | ReflectionItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-[#D672CE]/30 text-[#261814]">
      {/* Animated WebGL Shader Background */}
      <ShaderBackground />

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 relative z-10 pb-16">
        {activeTab === 'home' && (
          <div>
            <Hero
              setActiveTab={setActiveTab}
            />
            <OngoingProgramme
              onSelectDream={(dream) => setSelectedDetailItem(dream)}
              onGoToLadyland={() => setActiveTab('ladyland')}
            />
            <MissionSection />
            <RealisedDreams
              onSelectDream={(dream) => setSelectedDetailItem(dream)}
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
          />
        )}

        {activeTab === 'books' && (
          <BooksView
            onSelectBook={(book) => setSelectedDetailItem(book)}
          />
        )}

        {activeTab === 'sister-library' && (
          <SisterLibraryView />
        )}

        {activeTab === 'reflections' && (
          <ReflectionsView
            onSelectReflection={(reflection) => setSelectedDetailItem(reflection)}
          />
        )}

        {activeTab === 'ladyland' && (
          <ProjectLadylandView />
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
