import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, BarChart3, Database, Code, Zap, User, Brain, PieChart, Maximize2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';
import { resolveImagePath } from '../utils/imageHelper';

// --- Rotating Role Typing Animation ---
const RotatingTypingText = ({ roles, className = '' }) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        let timeout;

        if (isTyping) {
            if (displayText.length < currentRole.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                }, 80);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40);
            } else {
                setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isTyping, currentRoleIndex, roles]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
};

const AboutNormal = ({ onNext, onBack, onJourney, onOpenViewer }) => {
    const roles = [
        "Data Analyst",
        "Business Analyst",
        "Research Analyst",
        "MSBI Developer",
        "MIS Engineer",
        "Vibe Coder",
        "AI Automation Developer",
        "Data Storyteller"
    ];

    const skills = [
        { name: "Visualization", level: 95, icon: BarChart3 },
        { name: "BI Tools", level: 90, icon: PieChart },
        { name: "Gen AI", level: 85, icon: Brain },
        { name: "Programming & Database", level: 98, icon: Database },
    ];

    return (
        <div className="relative w-full min-h-screen md:h-screen overflow-y-auto md:overflow-hidden overflow-x-hidden flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a] py-12 md:py-0 transition-colors duration-500">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/30 dark:via-black dark:to-purple-950/30 transition-colors duration-500" />

            {/* Standard Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Floating Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl w-full px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">

                    {/* Photo Section - Order 1 on Mobile (First), Order 1 on Desktop (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center order-1 lg:order-1"
                    >
                        <GlassCard className="p-3 md:p-4 bg-white/40 dark:bg-white/5">
                            <div
                                className="relative w-[180px] h-[240px] md:w-[300px] md:h-[400px] overflow-hidden rounded-2xl cursor-zoom-in group"
                                onClick={() => onOpenViewer && onOpenViewer('/profile.jpg')}
                            >
                                <img
                                    src={resolveImagePath('/profile.jpg')}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Hover Hint */}
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Maximize2 className="text-white drop-shadow-md" size={32} />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Content Section - Order 2 on Mobile (Second), Order 2 on Desktop (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6 order-2 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-md">
                            <User size={18} className="text-blue-500" />
                            <span className="font-semibold text-gray-800 dark:text-white tracking-wide text-sm uppercase">About Me</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                            Nikhil Shrivastav
                        </h1>

                        <div className="text-xl h-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-medium">
                            <RotatingTypingText roles={roles} />
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            I don't just analyze data — I decode the stories hidden within it.
                            With a passion for transforming complexity into clarity, I bridge the gap
                            between raw information and strategic decision-making.
                        </p>

                        {/* Skills */}
                        <div className="space-y-3 pt-4">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="space-y-1"
                                >
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <skill.icon size={14} />
                                            <span>{skill.name}</span>
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-500">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <button
                                onClick={onNext}
                                className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2 group"
                            >
                                View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            {onJourney && (
                                <button
                                    onClick={onJourney}
                                    className="px-8 py-4 bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 rounded-full font-bold hover:bg-purple-500/20 transition-all flex items-center gap-2 group"
                                >
                                    View Journey <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="px-6 py-4 border border-gray-300 dark:border-white/20 text-gray-600 dark:text-gray-400 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-all flex items-center gap-2"
                                >
                                    <ChevronLeft size={18} /> Back
                                </button>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Subtle HUD Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute top-4 left-4 text-gray-400 dark:text-gray-600 text-xs font-mono hidden md:block"
            >
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>STATUS: ONLINE</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-4 right-4 text-gray-400 dark:text-gray-600 text-xs font-mono text-right hidden md:block"
            >
                <div>▸ PROFILE LOADED</div>
            </motion.div>
        </div>
    );
};

export default AboutNormal;
