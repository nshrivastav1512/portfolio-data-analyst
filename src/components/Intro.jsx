import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BarChart3, PieChart, Database, Activity, Globe, Zap, Layers, Command, Cpu, Search, MousePointer2, Code, Terminal, Server, Cloud, Smartphone, Wifi, Lock, Share2, MessageSquare, Video } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

// --- Typing Animation Component ---
const TypingText = ({ text, delay = 0, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                if (i <= text.length) {
                    setDisplayText(text.slice(0, i));
                    i++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => setShowCursor(false), 1000);
                }
            }, 50);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <span className={className}>
            {displayText}
            {showCursor && <span className="animate-pulse">_</span>}
        </span>
    );
};

const FloatingElement = ({ children, depth, x, y, mouseX, mouseY, delay = 0, scale = 1 }) => {
    // Increased movement range (150px) for "extreme" parallax
    const xSpring = useSpring(useTransform(mouseX, [-1, 1], [depth * 150, depth * -150]), { stiffness: 40, damping: 20 });
    const ySpring = useSpring(useTransform(mouseY, [-1, 1], [depth * 150, depth * -150]), { stiffness: 40, damping: 20 });

    return (
        <motion.div
            style={{ x: xSpring, y: ySpring, left: x, top: y, scale }}
            className="absolute z-0 pointer-events-none"
        >
            <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

const Intro = ({ onNext }) => {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Expanded Icon Set with varying depths and positions (some off-screen)
    const elements = [
        // Center/Visible Area
        { icon: <BarChart3 className="text-blue-500/30 dark:text-blue-400/20 w-24 h-24" />, x: '10%', y: '15%', depth: 0.8, delay: 0, scale: 1.2 },
        { icon: <PieChart className="text-purple-500/30 dark:text-purple-400/20 w-16 h-16" />, x: '85%', y: '10%', depth: 0.6, delay: 1, scale: 1 },
        { icon: <Database className="text-emerald-500/30 dark:text-emerald-400/20 w-20 h-20" />, x: '75%', y: '75%', depth: 0.9, delay: 2, scale: 1.1 },
        { icon: <Activity className="text-rose-500/30 dark:text-rose-400/20 w-12 h-12" />, x: '15%', y: '65%', depth: 0.5, delay: 0.5, scale: 0.9 },
        { icon: <Globe className="text-cyan-500/30 dark:text-cyan-400/20 w-32 h-32" />, x: '50%', y: '5%', depth: 0.3, delay: 1.5, scale: 1.5 },

        // Mid-Range
        { icon: <Zap className="text-yellow-500/30 dark:text-yellow-400/20 w-10 h-10" />, x: '90%', y: '50%', depth: 0.7, delay: 2.5, scale: 1 },
        { icon: <Layers className="text-indigo-500/30 dark:text-indigo-400/20 w-20 h-20" />, x: '5%', y: '40%', depth: 0.6, delay: 0.2, scale: 1.1 },
        { icon: <Command className="text-gray-500/30 dark:text-gray-400/20 w-14 h-14" />, x: '30%', y: '85%', depth: 0.4, delay: 1.8, scale: 1 },
        { icon: <Cpu className="text-orange-500/30 dark:text-orange-400/20 w-16 h-16" />, x: '60%', y: '90%', depth: 0.8, delay: 3, scale: 1.2 },

        // Edges/Off-Screen (High Depth for fast movement)
        { icon: <Code className="text-pink-500/30 dark:text-pink-400/20 w-24 h-24" />, x: '-10%', y: '20%', depth: 1.2, delay: 0.5, scale: 1.3 },
        { icon: <Terminal className="text-green-500/30 dark:text-green-400/20 w-20 h-20" />, x: '110%', y: '30%', depth: 1.1, delay: 1.5, scale: 1.2 },
        { icon: <Server className="text-blue-600/30 dark:text-blue-500/20 w-28 h-28" />, x: '40%', y: '-15%', depth: 1.0, delay: 2, scale: 1.4 },
        { icon: <Cloud className="text-sky-500/30 dark:text-sky-400/20 w-32 h-32" />, x: '80%', y: '110%', depth: 1.3, delay: 1, scale: 1.5 },

        // Small/Background Details
        { icon: <Smartphone className="text-gray-400/20 w-8 h-8" />, x: '25%', y: '25%', depth: 0.2, delay: 0, scale: 0.8 },
        { icon: <Wifi className="text-gray-400/20 w-8 h-8" />, x: '65%', y: '15%', depth: 0.2, delay: 1, scale: 0.8 },
        { icon: <Lock className="text-gray-400/20 w-8 h-8" />, x: '35%', y: '75%', depth: 0.2, delay: 2, scale: 0.8 },
        { icon: <Share2 className="text-gray-400/20 w-8 h-8" />, x: '75%', y: '45%', depth: 0.2, delay: 0.5, scale: 0.8 },

        // Abstract Shapes
        { icon: <div className="w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />, x: '20%', y: '30%', depth: 0.1, delay: 0, scale: 2 },
        { icon: <div className="w-56 h-56 rounded-full bg-purple-500/10 blur-3xl" />, x: '70%', y: '60%', depth: 0.1, delay: 2, scale: 2 },
    ];

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-black dark:to-purple-950/30 animate-pulse-slow transition-colors duration-500"></div>

            {/* Standard Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Floating Parallax Elements */}
            {elements.map((el, i) => (
                <FloatingElement key={i} depth={el.depth} x={el.x} y={el.y} mouseX={mouseX} mouseY={mouseY} delay={el.delay} scale={el.scale}>
                    {el.icon}
                </FloatingElement>
            ))}

            {/* Central Glass Card - Frosted Style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10"
            >
                <div className="relative group perspective-1000">
                    <div
                        className="
              relative p-12 md:p-16 rounded-[2.5rem] text-center max-w-2xl mx-6 overflow-hidden 
              bg-white/60 dark:bg-white/5 
              backdrop-blur-2xl 
              border border-white/40 dark:border-white/10 
              shadow-2xl 
              transition-all duration-500 
              hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]
              hover:border-white/60 dark:hover:border-white/20
            "
                    >

                        {/* Shine Effect - Visible in both themes, enhanced visibility */}
                        <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -skew-x-12 animate-shimmer" style={{ animationDuration: '3s' }}></div>
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-md shadow-sm">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-green-400 shadow-inner animate-pulse"></div>
                                <span className="font-semibold text-gray-800 dark:text-white tracking-wide text-sm uppercase">Portfolio 2026</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight drop-shadow-sm dark:drop-shadow-2xl text-gray-900 dark:text-white">
                                <TypingText text="Data Insights" delay={500} /> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-purple-600 dark:from-blue-400 dark:via-teal-300 dark:to-purple-400">
                                    <TypingText text="That Matter" delay={1500} />
                                </span>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.5, duration: 0.8 }}
                                className="text-lg text-gray-700 dark:text-white/70 max-w-lg mx-auto leading-relaxed font-medium dark:font-normal"
                            >
                                Explore a collection of data-driven stories, interactive dashboards, and analytical solutions.
                            </motion.p>

                            <button
                                onClick={onNext}
                                className="relative px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-lg rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg overflow-hidden group/btn"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Journey <MousePointer2 size={20} />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-neutral-200 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* HUD Corner Decorations */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute top-4 left-4 text-gray-400 dark:text-cyan-500/50 text-xs font-mono hidden md:block"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>STATUS: ONLINE</span>
                </div>
                <div className="text-gray-300 dark:text-cyan-500/30">SYS.PORTFOLIO v2.0</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-4 left-4 text-gray-400 dark:text-cyan-500/50 text-xs font-mono hidden md:block"
            >
                <div>▸ ANALYSIS READY</div>
                <div className="text-gray-300 dark:text-cyan-500/30">NODE: DATA_INSIGHTS</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-4 right-4 text-gray-400 dark:text-cyan-500/50 text-xs font-mono text-right hidden md:block"
            >
                <div>{new Date().toISOString().slice(0, 10)}</div>
                <div className="text-gray-300 dark:text-cyan-500/30">▸ CLEARANCE: PUBLIC</div>
            </motion.div>
        </div>
    );
};

export default Intro;
