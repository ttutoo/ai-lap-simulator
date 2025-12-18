
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import IntroSection from './components/IntroSection';
import DetailsSection from './components/DetailsSection';
import QualitySection from './components/QualitySection';
import DiagramSection from './components/DiagramSection';
import SimulatorSection from './components/SimulatorSection';
import { Section } from './types';
import { ShieldCheck, Zap } from 'lucide-react';

const App: React.FC = () => {
  // State to manage current active section of the presentation
  const [activeSection, setActiveSection] = useState<Section>(Section.INTRODUCTION);

  // Helper function to render the appropriate section content
  const renderContent = () => {
    switch (activeSection) {
      case Section.INTRODUCTION:
        return <IntroSection />;
      case Section.PATTERN_DETAILS:
        return <DetailsSection />;
      case Section.QUALITY_ATTRIBUTES:
        return <QualitySection />;
      case Section.DIAGRAMS:
        return <DiagramSection />;
      case Section.AI_SIMULATOR:
        return <SimulatorSection />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-900 selection:bg-indigo-500/30">
      {/* Sidebar for navigation between architecture topics */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Minimalist sticky header */}
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-lg tracking-tight text-slate-900">
                ArchEdu Lab <span className="text-indigo-600 ml-1">v2.0</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                AI Engine Active
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Main content area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto p-6 lg:p-10">
            {activeSection === Section.AI_SIMULATOR ? (
              <div className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[10px] font-bold uppercase tracking-tighter">
                      <Zap className="w-3 h-3" /> Interactive Presentation
                    </div>
                    <h2 className="text-4xl font-black text-slate-900">Handler Pattern Simulator</h2>
                    <p className="text-slate-500 max-w-2xl">
                      Phòng thí nghiệm giả lập kiến trúc chuỗi xử lý (Chain of Responsibility). 
                      Sử dụng Gemini AI để phân tích tính hợp lệ của Request qua nhiều lớp bảo mật.
                    </p>
                  </div>
                </div>

                {/* The SimulatorSection maintains its specialized dark theme */}
                <div className="bg-slate-900/95 rounded-[2.5rem] border border-slate-800 p-1 lg:p-2 shadow-2xl text-slate-200">
                  <div className="bg-[#0f172a] rounded-[2.2rem] p-6 lg:p-10 border border-white/5">
                    <SimulatorSection />
                  </div>
                </div>
              </div>
            ) : (
              // General information sections with transition animation
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {renderContent()}
              </div>
            )}

            <footer className="mt-20 text-center text-slate-400 pb-10 border-t border-slate-100 pt-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em]">
                Software Architecture Presentation • Topic 08 • 2024
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
