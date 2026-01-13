import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import Story from './components/Story';
import Outro from './components/Outro';
import OutroAdvanced from './components/OutroAdvanced';
import CaseStudy from './components/CaseStudy';
import AboutNormal from './components/AboutNormal';
import ResumeView from './components/ResumeView';

import ThemeToggle from './components/ui/ThemeToggle';

// SET TO true TO USE THE NEW OUTRO WITH ALL CONTACT FEATURES
const USE_ADVANCED_OUTRO = true;

const App = () => {
  const [view, setView] = useState('intro'); // 'intro', 'about', 'story', 'outro', 'case-study', 'resume'
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handleViewCaseStudy = (project, index) => {
    setSelectedProject(project);
    setCurrentProjectIndex(index);
    setView('case-study');
  };

  const handleBackFromCaseStudy = () => {
    setView('story');
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden transition-colors duration-500">
      {/* Global Theme Toggle */}
      <div className="fixed top-6 right-6 z-[100]">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10"
          >
            <Intro onNext={() => setView('about')} />
          </motion.div>
        )}

        {view === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20"
          >
            <AboutNormal
              onNext={() => setView('story')}
              onBack={() => setView('intro')}
              onJourney={() => setView('outro')}
            />
          </motion.div>
        )}

        {view === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30"
          >
            <Story
              onBack={() => setView('about')}
              onFinish={() => setView('outro')}
              onViewCaseStudy={handleViewCaseStudy}
              initialIndex={currentProjectIndex}
            />
          </motion.div>
        )}

        {view === 'case-study' && (
          <motion.div
            key="case-study"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-40 overflow-y-auto"
          >
            <CaseStudy
              project={selectedProject}
              onBack={handleBackFromCaseStudy}
            />
          </motion.div>
        )}

        {view === 'outro' && (
          <motion.div
            key="outro"
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30 overflow-y-auto"
          >
            {USE_ADVANCED_OUTRO ? (
              <OutroAdvanced
                onRestart={() => setView('intro')}
                onViewResume={() => setView('resume')}
              />
            ) : (
              <Outro onRestart={() => setView('intro')} />
            )}
          </motion.div>
        )}

        {view === 'resume' && (
          <motion.div
            key="resume"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 overflow-y-auto"
          >
            <ResumeView onBack={() => setView('outro')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

