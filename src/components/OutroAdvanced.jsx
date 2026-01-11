import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { timelineData, skills, profile } from '../data/resume';
import { Github, Linkedin, Mail, Phone, Download, RefreshCw, MapPin, Calendar } from 'lucide-react';

// --- Math Helpers for the Curve ---
const ITEM_HEIGHT = 400; // Height allocated per item

// Function to get X position (0-100%) for a given Y (px)
// We'll use a relative coordinate system where 50 is center.
const getCurveX = (index, total) => {
    // Simple Sine: x = 50 + 30 * sin(index * PI / 1.5)
    // X range: 20% to 80% of container width.
    const xPercent = 50 + (30 * Math.sin(index * Math.PI / 1.5));
    return xPercent;
};

// --- 3D Tilt Card ---
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
        y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className={`relative perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- The SVG Path ---
const CurvedPath = ({ count }) => {
    const points = [];
    const steps = count * 20; // Resolution

    for (let i = 0; i <= steps; i++) {
        const progress = i / 20; // 0, 0.05, ... count
        const x = getCurveX(progress, count);
        const y = progress * ITEM_HEIGHT + 200; // Add offset to start lower (matching items)
        points.push(`${x}% ${y}`);
    }

    const d = `M ${points[0]} L ${points.slice(1).join(' ')}`;

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                    </linearGradient>
                </defs>
                {/* Shadow/Glow */}
                <path d={d} fill="none" stroke="rgba(6,182,212,0.3)" strokeWidth="12" strokeLinecap="round" />
                {/* Main Line */}
                <path d={d} fill="none" stroke="url(#pathGradient)" strokeWidth="4" strokeLinecap="round" />
            </svg>
        </div>
    );
};

// --- Timeline Item ---
const TimelineItem = ({ item, index }) => {
    const xPercent = getCurveX(index, timelineData.length);
    const isRight = xPercent > 50;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-20% 0px -20% 0px" }} // Re-trigger when entering center
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] flex items-center justify-center"
        >
            {/* The Dot (Positioned exactly on the curve) */}
            <div
                className="absolute w-6 h-6 rounded-full bg-slate-200 dark:bg-black border-4 border-cyan-500 z-20 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                style={{ left: `${xPercent}%`, transform: 'translateX(-50%)' }}
            />

            {/* Content Card */}
            <div
                className={`absolute w-full md:w-[40%] px-4 ${isRight ? 'right-[55%] text-right' : 'left-[55%] text-left'}`}
                style={{
                    left: isRight ? 'auto' : `${xPercent + 5}%`,
                    right: isRight ? `${100 - xPercent + 5}%` : 'auto'
                }}
            >
                <TiltCard>
                    <div className={`p-6 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl transition-all hover:border-cyan-500/50 ${item.bg}`}>
                        <div className={`flex items-center gap-3 mb-2 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`p-2 rounded-lg bg-slate-100 dark:bg-white/10 ${item.color}`}>
                                <item.icon size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                        </div>

                        <h4 className="text-md text-slate-600 dark:text-gray-300 font-medium mb-2">{item.place}</h4>
                        <div className={`flex gap-3 text-xs text-cyan-600 dark:text-cyan-400 font-mono mb-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
                            <span>{item.period}</span>
                            <span>|</span>
                            <span>{item.location}</span>
                        </div>

                        <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-3">
                            {item.desc[0]}
                        </p>
                    </div>
                </TiltCard>
            </div>
        </motion.div>
    );
};

const OutroAdvanced = ({ onRestart }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={containerRef} className="relative min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden transition-colors duration-500">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-slate-50 dark:from-slate-900 dark:via-black dark:to-black opacity-80" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

                {/* Header */}
                <div className="text-center mb-32">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-500"
                    >
                        THE JOURNEY
                    </motion.h1>
                    <p className="text-xl text-cyan-600 dark:text-cyan-400">Scroll to Explore</p>
                </div>

                {/* Timeline Container */}
                <div className="relative py-20">
                    <CurvedPath count={timelineData.length} />

                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Skills Section (Restored Categories) */}
                <div className="mt-32 mb-20">
                    <h2 className="text-4xl font-bold text-center mb-16">Technical <span className="text-cyan-600 dark:text-cyan-400">Arsenal</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill, i) => (
                            <TiltCard key={i} className="h-full">
                                <div className="h-full p-6 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 transition-colors shadow-lg dark:shadow-none">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 text-cyan-600 dark:text-cyan-400">
                                            <skill.icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold">{skill.category}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item, j) => (
                                            <span key={j} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-black/40 text-sm text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/10">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-12 border-t border-slate-200 dark:border-white/10 text-center">
                    <h2 className="text-6xl font-black mb-8">HIRE ME</h2>
                    <div className="flex justify-center gap-4">
                        <a href={`mailto:${profile.email}`} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                            <Mail size={20} /> Contact Me
                        </a>
                        <button onClick={onRestart} className="px-8 py-4 border border-slate-300 dark:border-white/20 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/10 flex items-center gap-2">
                            <RefreshCw size={20} /> Replay
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OutroAdvanced;
