import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Wrench, BarChart2 } from 'lucide-react';
import GlassCard from './ui/GlassCard';

const CaseStudy = ({ project, onBack }) => {
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return null;

    return (
        <div className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-500">
            {/* Parallax Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br opacity-20 dark:opacity-20 ${project.color}`}></div>
                <motion.div
                    style={{ scale }}
                    className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"
                ></motion.div>

                {/* Floating Icons Background (Static for Case Study) */}
                <div className="absolute top-20 left-10 opacity-10"><project.icon size={100} /></div>
                <div className="absolute bottom-40 right-20 opacity-10"><BarChart2 size={150} /></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-white/50 dark:bg-black/20 backdrop-blur-md border-b border-white/10">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-black/5 dark:border-white/10 transition-all text-sm font-bold"
                >
                    <ArrowLeft size={16} /> Back to Projects
                </button>
                <div className="text-sm font-mono opacity-60 hidden md:block">CASE STUDY: {project.title}</div>
            </nav>

            {/* Hero Section */}
            <header className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-xs font-bold tracking-widest uppercase mb-6 ${project.accent}`}>
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
            <main className="relative z-10 px-6 md:px-12 pb-20 max-w-7xl mx-auto space-y-20">

                {/* Project Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GlassCard className="p-6 md:col-span-2 bg-white/40 dark:bg-white/5">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Wrench size={20} /> Tools Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tools.map((tool, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-sm font-medium">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="p-6 bg-white/40 dark:bg-white/5">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar size={20} /> Timeline</h3>
                        <p className="text-gray-600 dark:text-white/60">4 Weeks (Mock Data)</p>
                    </GlassCard>
                </div>

                {/* Project Images */}
                <div className="space-y-12">
                    {project.images && project.images.map((img, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 group"
                        >
                            <div className="bg-gray-100 dark:bg-neutral-900 p-2 md:p-4">
                                {/* Browser Chrome Mockup */}
                                <div className="flex items-center gap-2 mb-2 md:mb-4 opacity-50">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="ml-4 h-4 w-64 bg-gray-300 dark:bg-white/10 rounded-full"></div>
                                </div>
                                <img
                                    src={img}
                                    alt={`${project.title} Screenshot ${index + 1}`}
                                    className="w-full h-auto rounded-lg shadow-inner"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Conclusion / CTA */}
                <div className="text-center pt-10">
                    <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 mx-auto">
                        View Live Dashboard <ExternalLink size={20} />
                    </button>
                </div>

            </main>
        </div>
    );
};

export default CaseStudy;
