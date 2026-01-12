import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Cpu, Database, Terminal } from 'lucide-react';
import { projects } from '../data/projects';
import { cn } from '../utils/cn';

const StoryAdvanced = ({ onBack, onFinish, onViewCaseStudy }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);

    const currentProject = projects[currentIndex];
    const isEven = currentIndex % 2 === 0;

    useEffect(() => {
        setImageIndex(0);
    }, [currentIndex]);

    useEffect(() => {
        if (!currentProject.images || currentProject.images.length <= 1) return;
        const interval = setInterval(() => {
            setImageIndex(prev => (prev + 1) % currentProject.images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentProject]);

    const handleNext = () => {
        if (currentIndex < projects.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        } else {
            onFinish();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        } else {
            onBack();
        }
    };

    const variants = {
        enter: (direction) => ({
            opacity: 0,
            scale: direction > 0 ? 0.6 : 1.5,
            filter: 'blur(10px)',
        }),
        center: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
        exit: (direction) => ({
            opacity: 0,
            scale: direction > 0 ? 1.5 : 0.6,
            filter: 'blur(10px)',
            transition: { duration: 0.6 },
        }),
    };

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col bg-black text-white font-mono">

            {/* Cyber Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-black to-emerald-950/20" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px]" />
            </div>

            {/* Top Bar - HUD Style */}
            <div className="relative z-20 flex justify-between items-center p-6 md:p-8 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                    <Cpu className="text-cyan-500" size={20} />
                    <span className="text-cyan-400 text-sm tracking-widest">PROJECT_DATABASE</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-xs text-cyan-500/70">
                        RECORD {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </div>
                    <div className="w-32 h-1 bg-cyan-950 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cyan-500 transition-all duration-500"
                            style={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute w-full max-w-7xl px-6 md:px-12 flex items-center justify-center"
                    >
                        <div className={cn(
                            "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full",
                            !isEven ? "direction-rtl" : ""
                        )}>

                            {/* Text Content - Data File Style */}
                            <div className={cn(
                                "space-y-6 flex flex-col justify-center",
                                !isEven ? "md:order-2" : "md:order-1"
                            )}>
                                <div className="flex items-center gap-2 text-xs text-cyan-500/70">
                                    <Terminal size={14} />
                                    <span>FILE: {currentProject.month.replace(' ', '_')}.DAT</span>
                                </div>

                                <div className="border border-cyan-500/30 p-6 bg-black/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 border border-cyan-500/50 bg-cyan-500/10">
                                            <currentProject.icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">{currentProject.title}</h2>
                                    </div>

                                    <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                                        {currentProject.desc}
                                    </p>

                                    <div className="border-t border-cyan-500/20 pt-4">
                                        <div className="text-xs text-cyan-500/70 mb-2 flex items-center gap-2">
                                            <Database size={12} />
                                            <span>TECH STACK</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {currentProject.tools.map((tool, i) => (
                                                <span key={i} className="px-2 py-1 text-xs border border-cyan-500/30 text-cyan-400 bg-cyan-500/5">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => onViewCaseStudy(currentProject)}
                                    className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all text-sm font-bold tracking-wide flex items-center gap-2 group w-max"
                                >
                                    ACCESS FULL REPORT <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Visual Content */}
                            <div className={cn(
                                "relative",
                                !isEven ? "md:order-1" : "md:order-2"
                            )}>
                                <div className="relative border-2 border-cyan-500/30 bg-black/50 overflow-hidden">
                                    {/* Corner Brackets */}
                                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500 z-10" />
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500 z-10" />
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500 z-10" />
                                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500 z-10" />

                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentProject.images?.[imageIndex] || 'placeholder'}
                                                src={currentProject.images?.[imageIndex] || "/api/placeholder/800/500"}
                                                alt="Project Preview"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </AnimatePresence>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Image Index */}
                                        {currentProject.images && currentProject.images.length > 1 && (
                                            <div className="absolute bottom-4 left-4 text-xs text-cyan-400 font-mono z-10">
                                                IMG_{String(imageIndex + 1).padStart(2, '0')}.PNG
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Controls - HUD Style */}
            <div className="relative z-20 flex justify-between items-center p-6 md:p-8 border-t border-cyan-500/20">
                <button
                    onClick={handlePrev}
                    className="flex items-center gap-2 px-4 py-2 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm"
                >
                    <ArrowLeft size={16} /> PREV
                </button>

                <div className="text-xs text-cyan-500/50 hidden md:block">
                    ▸ ANALYSIS MODE: ACTIVE
                </div>

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/30 transition-all font-bold"
                >
                    {currentIndex === projects.length - 1 ? 'COMPLETE' : 'NEXT'} <ArrowRight size={16} />
                </button>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 text-cyan-500/30 text-xs hidden md:block">
                <div>SYS.PROJECT_DB</div>
                <div>v2.4.1</div>
            </div>
        </div>
    );
};

export default StoryAdvanced;
