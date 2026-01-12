import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Wrench, BarChart2, FileText, CheckCircle, TrendingUp, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const CaseStudy = ({ project, onBack }) => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Reset image index when project changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [project]);

    // Auto-rotate images
    useEffect(() => {
        if (!project?.images || project.images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [project]);

    if (!project) return null;

    const caseStudy = project.caseStudy;
    const images = project.images || [];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Dynamic accent color based on project
    const getAccentClasses = () => {
        if (project.accent.includes('emerald') || project.accent.includes('green')) {
            return {
                border: 'border-emerald-500/30 hover:border-emerald-500/50',
                bg: 'bg-emerald-500/10',
                text: 'text-emerald-500',
                glow: 'shadow-emerald-500/20'
            };
        } else if (project.accent.includes('purple') || project.accent.includes('pink')) {
            return {
                border: 'border-purple-500/30 hover:border-purple-500/50',
                bg: 'bg-purple-500/10',
                text: 'text-purple-500',
                glow: 'shadow-purple-500/20'
            };
        } else if (project.accent.includes('orange') || project.accent.includes('amber')) {
            return {
                border: 'border-orange-500/30 hover:border-orange-500/50',
                bg: 'bg-orange-500/10',
                text: 'text-orange-500',
                glow: 'shadow-orange-500/20'
            };
        } else if (project.accent.includes('red') || project.accent.includes('rose')) {
            return {
                border: 'border-red-500/30 hover:border-red-500/50',
                bg: 'bg-red-500/10',
                text: 'text-red-500',
                glow: 'shadow-red-500/20'
            };
        } else if (project.accent.includes('indigo') || project.accent.includes('violet')) {
            return {
                border: 'border-indigo-500/30 hover:border-indigo-500/50',
                bg: 'bg-indigo-500/10',
                text: 'text-indigo-500',
                glow: 'shadow-indigo-500/20'
            };
        }
        // Default blue
        return {
            border: 'border-blue-500/30 hover:border-blue-500/50',
            bg: 'bg-blue-500/10',
            text: 'text-blue-500',
            glow: 'shadow-blue-500/20'
        };
    };

    const accent = getAccentClasses();

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
            {/* Parallax Background with Project Color */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br opacity-30 dark:opacity-40 ${project.color}`}></div>
                <motion.div
                    style={{ scale }}
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
                ></motion.div>

                {/* Standard Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Floating Icons Background */}
                <div className={`absolute top-20 left-10 opacity-10 ${project.accent}`}><project.icon size={100} /></div>
                <div className={`absolute bottom-40 right-20 opacity-10 ${project.accent}`}><BarChart2 size={150} /></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/50 dark:bg-black/20 backdrop-blur-md border-b border-white/10">
                <button
                    onClick={onBack}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border ${accent.border} transition-all text-sm font-bold`}
                >
                    <ArrowLeft size={16} /> Back to Projects
                </button>
                <div className={`text-sm font-mono opacity-60 hidden md:block ${project.accent}`}>CASE STUDY: {project.title}</div>
            </nav>

            {/* Hero Section */}
            <header className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${accent.bg} text-xs font-bold tracking-widest uppercase mb-6 ${project.accent}`}>
                        {project.month}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-white/60 max-w-3xl mx-auto leading-relaxed">
                        {project.desc}
                    </p>
                </motion.div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 px-6 md:px-12 pb-20 max-w-7xl mx-auto space-y-16">

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GlassCard className={`p-6 md:col-span-2 bg-white/40 dark:bg-white/5 border ${accent.border}`}>
                        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${project.accent}`}><Wrench size={20} /> Tools Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool, i) => (
                                <span key={i} className={`px-3 py-1 rounded-full ${accent.bg} border ${accent.border} text-sm font-medium`}>
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className={`p-6 bg-white/40 dark:bg-white/5 border ${accent.border}`}>
                        <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${project.accent}`}><Calendar size={20} /> Timeline</h3>
                        <p className="text-gray-600 dark:text-white/60">{caseStudy?.date || '4 Weeks'}</p>
                        {caseStudy?.analyst && (
                            <p className="text-gray-500 dark:text-white/40 text-sm mt-2">Analyst: {caseStudy.analyst}</p>
                        )}
                    </GlassCard>
                </div>

                {/* Executive Summary */}
                {caseStudy?.executiveSummary && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className={`p-8 bg-white/40 dark:bg-white/5 border ${accent.border}`}>
                            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${project.accent}`}>
                                <FileText size={24} /> Executive Summary
                            </h3>
                            <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-8">
                                {caseStudy.executiveSummary.overview}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {caseStudy.executiveSummary.keyFindings.map((finding, i) => (
                                    <div key={i} className={`p-4 rounded-xl ${accent.bg} border ${accent.border}`}>
                                        <div className={`text-2xl font-bold ${project.accent}`}>{finding.value}</div>
                                        <div className="text-gray-900 dark:text-white font-medium text-sm">{finding.label}</div>
                                        <div className="text-gray-500 dark:text-white/50 text-xs mt-1">{finding.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.section>
                )}

                {/* Methodology */}
                {caseStudy?.methodology && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${project.accent}`}>
                            <Database size={24} /> Methodology
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {caseStudy.methodology.phases.map((phase, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <GlassCard className={`p-4 h-full bg-white/40 dark:bg-white/5 border ${accent.border}`}>
                                        <div className={`w-8 h-8 rounded-full ${accent.bg} ${project.accent} flex items-center justify-center text-sm font-bold mb-3`}>
                                            {i + 1}
                                        </div>
                                        <div className="font-bold text-gray-900 dark:text-white mb-1">{phase.phase}</div>
                                        <div className="text-gray-500 dark:text-white/50 text-sm">{phase.desc}</div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Dashboard Pages */}
                {caseStudy?.dashboardPages && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${project.accent}`}>
                            <TrendingUp size={24} /> Dashboard Analysis
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {caseStudy.dashboardPages.map((page, i) => (
                                <GlassCard key={i} className={`p-6 bg-white/40 dark:bg-white/5 border ${accent.border}`}>
                                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">{page.title}</h4>
                                    <ul className="space-y-2">
                                        {page.insights.map((insight, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/70">
                                                <span className={`mt-1 ${project.accent}`}>▸</span>
                                                {insight}
                                            </li>
                                        ))}
                                    </ul>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Image Carousel */}
                {images.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${project.accent}`}>
                            <FileText size={24} /> Project Screenshots
                        </h3>

                        <div className="relative">
                            <div className={`rounded-2xl overflow-hidden shadow-2xl border ${accent.border} bg-gray-100 dark:bg-neutral-900`}>
                                {/* Browser Chrome */}
                                <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-white/10">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 h-6 flex-1 max-w-md bg-gray-200 dark:bg-white/10 rounded-full"></div>
                                </div>

                                {/* Image Container */}
                                <div className="relative aspect-video">
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentImageIndex}
                                            src={images[currentImageIndex]}
                                            alt={`${project.title} Screenshot ${currentImageIndex + 1}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-full h-full object-cover"
                                        />
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Carousel Controls */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 border ${accent.border} flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${accent.glow}`}
                                    >
                                        <ChevronLeft className={project.accent} size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 dark:bg-black/80 border ${accent.border} flex items-center justify-center hover:scale-110 transition-transform shadow-lg ${accent.glow}`}
                                    >
                                        <ChevronRight className={project.accent} size={24} />
                                    </button>

                                    {/* Indicators */}
                                    <div className="flex justify-center gap-2 mt-4">
                                        {images.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentImageIndex(i)}
                                                className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? `w-8 ${accent.bg.replace('/10', '')} dark:${accent.bg.replace('/10', '')}` : 'bg-gray-300 dark:bg-white/20'}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.section>
                )}

                {/* Recommendations */}
                {caseStudy?.recommendations && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className={`p-8 bg-white/40 dark:bg-white/5 border ${accent.border}`}>
                            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${project.accent}`}>
                                <CheckCircle size={24} /> Strategic Recommendations
                            </h3>
                            <ul className="space-y-4">
                                {caseStudy.recommendations.map((rec, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className={`w-8 h-8 rounded-full ${accent.bg} ${project.accent} flex items-center justify-center text-sm font-bold shrink-0`}>
                                            {i + 1}
                                        </div>
                                        <span className="text-gray-700 dark:text-white/80 pt-1">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </GlassCard>
                    </motion.section>
                )}

                {/* CTA */}
                <div className="text-center pt-10">
                    <button className={`px-8 py-4 rounded-full ${accent.bg} hover:opacity-80 ${project.accent} font-bold text-lg transition-all shadow-lg ${accent.glow} flex items-center gap-2 mx-auto border ${accent.border}`}>
                        Project / Report File <ExternalLink size={20} />
                    </button>
                </div>

            </main>
        </div>
    );
};

export default CaseStudy;
