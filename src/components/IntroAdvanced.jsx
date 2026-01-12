import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Database, Terminal, Cpu, BarChart3, MousePointer2 } from 'lucide-react';

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
    const xSpring = useSpring(useTransform(mouseX, [-1, 1], [depth * 100, depth * -100]), { stiffness: 40, damping: 20 });
    const ySpring = useSpring(useTransform(mouseY, [-1, 1], [depth * 100, depth * -100]), { stiffness: 40, damping: 20 });

    return (
        <motion.div
            style={{ x: xSpring, y: ySpring, left: x, top: y, scale }}
            className="absolute z-0 pointer-events-none"
        >
            <motion.div
                animate={{ y: [-15, 15, -15] }}
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

const IntroAdvanced = ({ onNext }) => {
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

    const elements = [
        { icon: <BarChart3 className="text-cyan-500/20 w-20 h-20" />, x: '10%', y: '15%', depth: 0.8, delay: 0, scale: 1.2 },
        { icon: <Database className="text-cyan-500/20 w-16 h-16" />, x: '85%', y: '20%', depth: 0.6, delay: 1, scale: 1 },
        { icon: <Terminal className="text-cyan-500/20 w-24 h-24" />, x: '75%', y: '70%', depth: 0.9, delay: 2, scale: 1.1 },
        { icon: <Cpu className="text-cyan-500/20 w-14 h-14" />, x: '15%', y: '75%', depth: 0.5, delay: 0.5, scale: 0.9 },
        { icon: <div className="w-40 h-40 rounded-full bg-cyan-500/5 blur-3xl" />, x: '20%', y: '30%', depth: 0.1, delay: 0, scale: 2 },
        { icon: <div className="w-56 h-56 rounded-full bg-emerald-500/5 blur-3xl" />, x: '70%', y: '60%', depth: 0.1, delay: 2, scale: 2 },
    ];

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black text-white font-mono">

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

            {/* Floating Parallax Elements */}
            {elements.map((el, i) => (
                <FloatingElement key={i} depth={el.depth} x={el.x} y={el.y} mouseX={mouseX} mouseY={mouseY} delay={el.delay} scale={el.scale}>
                    {el.icon}
                </FloatingElement>
            ))}

            {/* Central Content - Data File Style */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 max-w-2xl mx-6"
            >
                <div className="border border-cyan-500/30 p-8 md:p-12 bg-black/50 backdrop-blur-sm relative">

                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500" />

                    <div className="space-y-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs text-cyan-500/70">
                            <Cpu size={14} />
                            <TypingText text="INITIALIZING DATA PORTFOLIO..." delay={500} />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            <span className="text-white">Data Insights</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                                That Matter
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="text-gray-400 leading-relaxed max-w-lg mx-auto"
                        >
                            Explore a collection of data-driven stories, interactive dashboards, and analytical solutions.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.5 }}
                            onClick={onNext}
                            className="px-8 py-4 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all font-bold flex items-center gap-2 mx-auto group"
                        >
                            ACCESS DATABASE <MousePointer2 size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* HUD Corner Decorations */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-4 left-4 text-cyan-500/50 text-xs hidden md:block"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span>STATUS: ONLINE</span>
                </div>
                <div className="text-cyan-500/30">SYS.PORTFOLIO v2.0</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-4 left-4 text-cyan-500/50 text-xs hidden md:block"
            >
                <TypingText text="▸ ANALYSIS READY" delay={3000} />
                <div className="text-cyan-500/30">NODE: DATA_INSIGHTS</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-4 right-4 text-cyan-500/50 text-xs text-right hidden md:block"
            >
                <div>{new Date().toISOString().slice(0, 10)}</div>
                <div className="text-cyan-500/30">▸ CLEARANCE: PUBLIC</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute top-4 right-4 text-cyan-500/50 text-xs text-right hidden md:block"
            >
                <div className="flex items-center gap-2 justify-end">
                    <Terminal size={14} />
                    <span>TERMINAL: ACTIVE</span>
                </div>
            </motion.div>
        </div>
    );
};

export default IntroAdvanced;
