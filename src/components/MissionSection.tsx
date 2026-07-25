import React from 'react';

export const MissionSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-20 flex flex-col items-center text-center">
      <div className="max-w-3xl">
        <span className="font-sans-ui text-xs text-[#D672CE] font-bold tracking-widest uppercase block mb-4">
          OUR MISSION
        </span>
        <p className="font-serif-editorial text-xl md:text-2xl lg:text-3xl text-[#594139] leading-relaxed">
          Holding true that clearer dreams make for better worlds, we facilitate people and communities to create alternative visions and solutions.
        </p>
      </div>
    </section>
  );
};
