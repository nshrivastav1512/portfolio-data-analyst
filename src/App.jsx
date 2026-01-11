import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import Story from './components/Story';
import Outro from './components/Outro';
import CaseStudy from './components/CaseStudy';

const App = () => {
  const [view, setView] = useState('intro'); // 'intro', 'story', 'outro', 'case-study'
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewCaseStudy = (project) => {
    setSelectedProject(project);
    setView('case-study');
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen text-gray-900 dark:text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden transition-colors duration-500">
      <AnimatePresence mode="wait">
        {view === 'intro' && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10"
          >
            <Intro onNext={() => setView('story')} />
          </motion.div>
        )}

        {view === 'story' && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-20"
          >
            <Story
              onBack={() => setView('intro')}
              onFinish={() => setView('outro')}
              onViewCaseStudy={handleViewCaseStudy}
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
              onBack={() => setView('story')}
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
            className="absolute inset-0 z-30"
          >
            <Outro onRestart={() => setView('intro')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
