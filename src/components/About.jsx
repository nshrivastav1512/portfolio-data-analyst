import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, Shield, Cpu, Database, BarChart3, Code, Zap, Terminal, User } from 'lucide-react';

// --- Text Scramble Effect ---
const ScrambleText = ({ text, className = '' }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{displayText || text}</span>;
};

// --- Rotating Role Typing Animation ---
const RotatingTypingText = ({ roles, className = '' }) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        let timeout;

        if (isTyping) {
            // Typing phase
            if (displayText.length < currentRole.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                }, 80);
            } else {
                // Pause after typing complete
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        } else {
            // Erasing phase
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40);
            } else {
                // Move to next role
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isTyping, currentRoleIndex, roles]);

    return (
        <span className={className}>
            {displayText}
            {showCursor && <span className="animate-pulse">|</span>}
        </span>
    );
};

// --- Animated Skill Bar ---
const SkillBar = ({ name, level, icon: Icon, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
            className="space-y-2"
        >
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono">
                    <Icon size={14} />
                    <span>{name}</span>
                </div>
                <span className="text-cyan-700/70 dark:text-cyan-300/70">{level}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-cyan-950/50 rounded-full overflow-hidden border border-slate-300 dark:border-cyan-500/20">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 dark:from-cyan-500 dark:to-cyan-300 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                />
            </div>
        </motion.div>
    );
};

const About = ({ onNext, onBack, onJourney, onToggleTheme, isDataFileTheme }) => {
    const roles = [
        "DATA ANALYST",
        "PROMPT ENGINEER",
        "DATA STORYTELLER",
        "SOFTWARE ENGINEER",
        "L2 SQL SUPPORT",
        "BI DEVELOPER"
    ];

    return (
        <div className="relative h-screen w-full bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden transition-colors duration-500">

            {/* Theme Toggle Button */}
            {onToggleTheme && (
                <div className="absolute top-6 right-6 z-50">
                    <button
                        onClick={onToggleTheme}
                        className="px-4 py-2 text-sm font-bold rounded-lg border transition-all bg-cyan-500/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20"
                    >
                        {isDataFileTheme ? 'Normal Theme' : 'Data File Theme'}
                    </button>
                </div>
            )}

            {/* Background - Following Outro Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-slate-50 dark:from-slate-900 dark:via-black dark:to-black opacity-80" />

                {/* Standard Grid Background - 24px */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                {/* Floating Orbs */}
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* Scanline Overlay - Subtle */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 dark:opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] dark:bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-6 md:p-12">
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Photo Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center order-2 lg:order-1"
                    >
                        <div className="relative w-[280px] h-[380px] md:w-[350px] md:h-[450px]">
                            {/* Photo Container */}
                            <div className="relative w-full h-full overflow-hidden border-2 border-cyan-500/50 dark:border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)] bg-slate-100 dark:bg-black">
                                <img
                                    src="/profile.jpg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                {/* Photo Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                            </div>

                            {/* Corner Brackets - Targeting Reticle Effect */}
                            <div className="absolute inset-0 pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500"
                                />
                            </div>

                            {/* ID Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-black/80 border border-slate-300 dark:border-cyan-500/50 px-4 py-2 backdrop-blur-sm shadow-lg"
                            >
                                <div className="text-[10px] text-cyan-600 dark:text-cyan-500/70 uppercase tracking-widest">Subject ID</div>
                                <div className="text-slate-900 dark:text-cyan-300 font-bold tracking-wider font-mono">DA-2024-001</div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Data Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8 order-1 lg:order-2"
                    >
                        {/* Header */}
                        <div className="border-b border-slate-300 dark:border-cyan-500/30 pb-4">
                            <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-500/70 mb-2 font-mono">
                                <Cpu size={14} />
                                <span>PERSONNEL FILE // CLASSIFICATION: PUBLIC</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                                <ScrambleText text="NIKHIL SHRIVASTAV" />
                            </h1>
                            <div className="text-lg text-cyan-600 dark:text-cyan-400 font-mono h-8">
                                <RotatingTypingText roles={roles} />
                            </div>
                        </div>

                        {/* Skills Analysis */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-500/70 mb-4 font-mono">
                                <Database size={14} />
                                <span>CAPABILITY MATRIX</span>
                            </div>
                            <SkillBar name="DATA ENGINEERING" level={95} icon={Database} delay={0.5} />
                            <SkillBar name="VISUALIZATION" level={90} icon={BarChart3} delay={0.7} />
                            <SkillBar name="PYTHON & SQL" level={88} icon={Code} delay={0.9} />
                            <SkillBar name="MACHINE LEARNING" level={75} icon={Zap} delay={1.1} />
                        </div>

                        {/* Bio */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3 }}
                            className="space-y-4 text-slate-600 dark:text-gray-400 text-sm leading-relaxed border-t border-slate-300 dark:border-cyan-500/30 pt-6"
                        >
                            <div className="flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-500/70 mb-2 font-mono">
                                <Terminal size={14} />
                                <span>PROFILE SUMMARY</span>
                            </div>
                            <p>
                                I don't just analyze data — I <span className="text-cyan-600 dark:text-cyan-400 font-medium">decode the stories</span> hidden within it.
                                With a passion for transforming complexity into clarity, I bridge the gap between raw information
                                and strategic decision-making.
                            </p>
                            <p>
                                Every dataset is a puzzle. Every visualization is a revelation.
                                <span className="text-cyan-600 dark:text-cyan-400 font-medium"> Ready to unlock your data's potential?</span>
                            </p>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <button
                                onClick={onNext}
                                className="group px-6 py-3 bg-slate-900 dark:bg-cyan-500/10 border border-slate-900 dark:border-cyan-500/50 text-white dark:text-cyan-400 rounded-lg hover:bg-slate-800 dark:hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2 font-bold"
                            >
                                <span className="tracking-wide">VIEW PROJECTS</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            {onJourney && (
                                <button
                                    onClick={onJourney}
                                    className="group px-6 py-3 bg-purple-500/10 border border-purple-500/50 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-2 font-bold"
                                >
                                    <span className="tracking-wide">VIEW JOURNEY</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="px-6 py-3 border border-slate-300 dark:border-gray-700 text-slate-600 dark:text-gray-500 rounded-lg hover:border-slate-400 dark:hover:border-gray-500 hover:text-slate-800 dark:hover:text-gray-300 transition-all duration-300 flex items-center gap-2"
                                >
                                    <ChevronLeft size={18} />
                                    <span>BACK</span>
                                </button>
                            )}
                        </motion.div>

                        <div className="text-[10px] text-slate-400 dark:text-cyan-900 pt-4 font-mono">
                            ▸ ANALYSIS COMPLETE // CLEARANCE: LEVEL 5
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Corner Decorations - HUD Style */}
            <div className="absolute top-4 left-4 text-slate-400 dark:text-cyan-500/50 text-xs font-mono hidden md:block">
                <div>SYS.INIT v2.4.1</div>
                <div>NODE: PORTFOLIO_DB</div>
            </div>
            <div className="absolute bottom-4 right-4 text-slate-400 dark:text-cyan-500/50 text-xs font-mono text-right hidden md:block">
                <div>{new Date().toISOString().slice(0, 10)}</div>
                <div>STATUS: ONLINE</div>
            </div>
        </div>
    );
};

export default About;
