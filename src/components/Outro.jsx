import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { timelineData, skills, profile } from '../data/resume';
import { Github, Linkedin, Mail, Phone, Download, RefreshCw, MapPin, Calendar } from 'lucide-react';

// --- Enhanced 3D Tilt Card ---
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    // Increased rotation range for more depth
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const scale = useTransform(mouseY, [-0.5, 0.5], [1.02, 1.02]); // Slight zoom on hover

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative perspective-1000 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- Timeline Item ---
const TimelineItem = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
            className={`relative flex items-center justify-between mb-24 w-full ${isEven ? 'flex-row-reverse' : ''}`}
        >
            {/* Spacer for opposite side */}
            <div className="hidden md:block w-5/12" />

            {/* Center Dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-200 dark:bg-black border-4 border-cyan-500 z-10 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
            </div>

            {/* Content Card */}
            <div className="w-full md:w-5/12 pl-16 md:pl-0">
                <TiltCard className="group">
                    <div className={`relative p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] ${item.bg}`}>
                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="relative z-10 transform-style-3d group-hover:translate-z-12 transition-transform">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl bg-slate-100 dark:bg-white/10 ${item.color} shadow-inner`}>
                                        <item.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                                </div>
                                {item.grade && (
                                    <span className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-xs font-bold border border-yellow-200 dark:border-yellow-500/30">
                                        {item.grade}
                                    </span>
                                )}
                            </div>

                            <h4 className="text-lg text-slate-600 dark:text-gray-300 mb-3 font-medium flex items-center gap-2">
                                {item.place}
                            </h4>

                            <div className="flex flex-wrap gap-4 text-sm text-cyan-600 dark:text-cyan-400 mb-6 font-mono border-b border-slate-200 dark:border-white/10 pb-4">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {item.period}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {item.location}</span>
                            </div>

                            <ul className="space-y-3">
                                {item.desc.map((d, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TiltCard>
            </div>
        </motion.div>
    );
};

const Outro = ({ onRestart }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Enhanced Parallax Layers
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden transition-colors duration-500">

            {/* Deep Parallax Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-slate-50 dark:from-slate-900 dark:via-black dark:to-black opacity-80" />

                {/* Floating Orbs */}
                <motion.div style={{ y: y1, rotate }} className="absolute top-[10%] left-[5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
                <motion.div style={{ y: y3 }} className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                {/* Grid Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

                {/* Header */}
                <div className="text-center mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-500/20 blur-[100px] -z-10"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-gray-500 drop-shadow-2xl"
                    >
                        THE JOURNEY
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 100 }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full"
                    />
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />

                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Skills Section */}
                <div className="mt-40 mb-20 relative">
                    <motion.div style={{ y: y2 }} className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-cyan-500/5 -z-10 blur-3xl" />

                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-5xl font-bold text-center mb-20 text-slate-900 dark:text-white"
                    >
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">Arsenal</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skills.map((skill, i) => (
                            <TiltCard key={i} className="h-full">
                                <div className="h-full p-8 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 transition-colors shadow-xl dark:shadow-none group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                                            <skill.icon size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{skill.category}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {skill.items.map((item, j) => (
                                            <span key={j} className="px-4 py-2 rounded-full bg-slate-100 dark:bg-black/40 text-sm font-medium text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 transition-colors">
                                                {typeof item === 'string' ? item : item.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* Footer / CTA */}
                <div className="text-center pt-32 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">
                    <motion.div style={{ y: y1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-[100px] -z-10" />

                    <h2 className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white mb-12 tracking-tighter opacity-90">HIRE ME</h2>
                    <p className="text-2xl text-slate-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
                        I'm ready to transform your data into actionable insights. <br />
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">Let's build the future together.</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-xl text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group">
                            <div className="p-3 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
                                <Mail size={24} />
                            </div>
                            {profile.email}
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xl text-slate-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group">
                            <div className="p-3 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-[#0077b5]/20 transition-colors">
                                <Linkedin size={24} />
                            </div>
                            LinkedIn
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-2xl hover:shadow-cyan-500/20">
                            <Download size={24} /> Download Resume
                        </button>
                        <button onClick={onRestart} className="px-10 py-5 bg-transparent border-2 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold text-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                            <RefreshCw size={24} /> Replay Journey
                        </button>
                    </div>

                    <div className="mt-32 text-slate-500 dark:text-gray-600 text-sm font-mono">
                        © 2026 {profile.name}. Crafted with React & Framer Motion.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Outro;
