import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import GlassCard from './ui/GlassCard';
import { cn } from '../utils/cn';
import { resolveImagePath } from '../utils/imageHelper';

const Story = ({ onBack, onFinish, onViewCaseStudy, initialIndex = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(1);
    const [imageIndex, setImageIndex] = useState(0);

    const currentProject = projects[currentIndex];
    const isEven = currentIndex % 2 === 0;

    // Reset image index when project changes
    useEffect(() => {
        setImageIndex(0);
    }, [currentIndex]);

    // Auto-rotate images
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
            z: direction > 0 ? -100 : 100,
            filter: 'blur(10px)',
        }),
        center: {
            opacity: 1,
            scale: 1,
            z: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
        exit: (direction) => ({
            opacity: 0,
            scale: direction > 0 ? 1.5 : 0.6,
            z: direction > 0 ? 100 : -100,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] },
        }),
    };

    return (
        <div className="relative w-full min-h-screen md:h-screen overflow-y-auto md:overflow-hidden flex flex-col bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
            {/* Dynamic Background with Animated Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Base gradient that transitions with project */}
                <motion.div
                    key={`bg-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br opacity-40 dark:opacity-60 ${currentProject.color}`}
                />

                {/* Animated Floating Orbs */}
                <motion.div
                    key={`orb1-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        x: [0, 50, -30, 0],
                        y: [0, -30, 20, 0]
                    }}
                    transition={{
                        opacity: { duration: 0.8 },
                        scale: { duration: 0.8 },
                        x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] bg-gradient-to-br ${currentProject.color}`}
                />
                <motion.div
                    key={`orb2-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 0.5,
                        scale: 1,
                        x: [0, -40, 30, 0],
                        y: [0, 40, -20, 0]
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.2 },
                        scale: { duration: 0.8, delay: 0.2 },
                        x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 18, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] bg-gradient-to-tr ${currentProject.color}`}
                />

                {/* Third accent orb */}
                <motion.div
                    key={`orb3-${currentIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 0.3,
                        x: [0, 60, -40, 0],
                        y: [0, -50, 30, 0]
                    }}
                    transition={{
                        opacity: { duration: 1, delay: 0.4 },
                        x: { duration: 30, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 22, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full blur-[80px] bg-gradient-to-r from-white/20 to-transparent dark:from-white/10"
                />
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

            {/* Standard Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Glow effect following project accent */}
            <motion.div
                key={`glow-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/20`}
            />

            {/* Top Bar */}
            <div className="relative z-20 flex justify-between items-center p-6 md:p-8">
                <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-2">
                        <motion.div
                            key={`dot-${currentIndex}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-3 h-3 rounded-full bg-gradient-to-tr ${currentProject.color.replace('/20', '')} animate-pulse`}
                        />
                        <span className="font-semibold text-sm text-gray-800 dark:text-white/90">Portfolio 2026</span>
                    </div>
                    <div className="w-px h-4 bg-gray-400/50 dark:bg-white/20"></div>
                    <span className="font-mono text-xs font-medium text-gray-600 dark:text-white/70">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative flex items-center justify-center perspective-[2000px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="relative md:absolute w-full max-w-7xl px-6 md:px-12 flex items-center justify-center py-12 md:py-0"
                    >
                        <div className={cn(
                            "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full",
                            !isEven ? "direction-rtl" : ""
                        )}>

                            {/* Text Content */}
                            <div className={cn(
                                "space-y-6 flex flex-col justify-center",
                                !isEven ? "md:order-2" : "md:order-1"
                            )}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className={`inline-block self-start px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-xs font-bold tracking-widest uppercase mb-2 backdrop-blur-md border border-black/5 dark:border-white/5 ${currentProject.accent}`}
                                >
                                    {currentProject.month}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm shadow-lg">
                                        <currentProject.icon className={`w-8 h-8 ${currentProject.accent}`} />
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">{currentProject.title}</h2>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-lg md:text-xl text-gray-600 dark:text-white/70 leading-relaxed font-medium dark:font-light max-w-lg"
                                >
                                    {currentProject.desc}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-wrap gap-2"
                                >
                                    {currentProject.tools.map((tool, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-medium text-gray-600 dark:text-white/60">
                                            {tool}
                                        </span>
                                    ))}
                                </motion.div>

                                <motion.button
                                    onClick={() => onViewCaseStudy(currentProject, currentIndex)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="mt-4 px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-all text-sm font-bold tracking-wide uppercase flex items-center gap-2 group w-max shadow-lg"
                                >
                                    View Case Study <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>

                            {/* Visual Content (Carousel) */}
                            <div className={cn(
                                "relative group perspective-[1000px]",
                                !isEven ? "md:order-1" : "md:order-2"
                            )}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? 15 : -15 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: isEven ? 5 : -5 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="relative"
                                >
                                    <GlassCard className="aspect-[16/10] rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-y-0 bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/10">
                                        {/* Explicit Flex Container for Layout */}
                                        <div className="flex flex-col h-full w-full">

                                            {/* Fake Browser Chrome */}
                                            <div className="h-10 bg-white/20 dark:bg-white/5 border-b border-white/10 flex items-center px-4 justify-between shrink-0">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                                </div>
                                                <div className="w-1/2 h-6 bg-black/5 dark:bg-black/20 rounded-md"></div>
                                                <div className="w-4"></div>
                                            </div>

                                            {/* Content Area (Image Carousel) */}
                                            <div className="flex-1 relative overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center w-full">
                                                <AnimatePresence mode="wait">
                                                    <motion.img
                                                        key={currentProject.images?.[imageIndex] || 'placeholder'}
                                                        src={currentProject.images?.[imageIndex] ? resolveImagePath(currentProject.images[imageIndex]) : "/api/placeholder/800/500"}
                                                        alt="Project Preview"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.5 }}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                </AnimatePresence>

                                                {/* Overlay Gradient */}
                                                <div className={`absolute inset-0 opacity-20 ${currentProject.imageColor} mix-blend-overlay pointer-events-none`}></div>

                                                {/* Carousel Indicators */}
                                                {currentProject.images && currentProject.images.length > 1 && (
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                                        {currentProject.images.map((_, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={`w-2 h-2 rounded-full transition-all shadow-sm ${idx === imageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            </div>

                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-20 flex justify-between items-center max-w-7xl mx-auto w-full p-6 md:p-8">
                <button
                    onClick={handlePrev}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/20 border border-white/20 dark:border-white/10 transition-all active:scale-95 backdrop-blur-sm group"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-white/70 group-hover:text-black dark:group-hover:text-white" />
                </button>



                <button
                    onClick={handleNext}
                    className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-all shadow-lg"
                >
                    {currentIndex === projects.length - 1 ? 'Finish' : 'Next Project'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Story;
