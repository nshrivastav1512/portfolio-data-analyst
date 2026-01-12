import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { timelineData, skills, profile } from '../data/resume';
import { Github, Linkedin, Mail, Phone, Download, RefreshCw, MapPin, Calendar, ExternalLink, MessageCircle, FileText, X, Send, Eye } from 'lucide-react';

// --- Enhanced 3D Tilt Card ---
const TiltCard = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const scale = useTransform(mouseY, [-0.5, 0.5], [1.02, 1.02]);

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

// --- Skill Tooltip ---
const SkillBadge = ({ item }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative">
            <span
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-black/40 text-sm font-medium text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all cursor-pointer"
            >
                {item.name}
            </span>
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg whitespace-nowrap shadow-xl z-50"
                    >
                        {item.experience} experience
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Timeline Item with Skills ---
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
            <div className="hidden md:block w-5/12" />

            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-200 dark:bg-black border-4 border-cyan-500 z-10 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
            </div>

            <div className="w-full md:w-5/12 pl-16 md:pl-0">
                <TiltCard className="group">
                    <div className={`relative p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] ${item.bg}`}>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                        <div className="relative z-10">
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

                            <h4 className="text-lg text-slate-600 dark:text-gray-300 mb-3 font-medium">{item.place}</h4>

                            <div className="flex flex-wrap gap-4 text-sm text-cyan-600 dark:text-cyan-400 mb-4 font-mono border-b border-slate-200 dark:border-white/10 pb-4">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {item.period}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {item.location}</span>
                            </div>

                            <ul className="space-y-2 mb-4">
                                {item.desc.map((d, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-gray-400">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                                        {d}
                                    </li>
                                ))}
                            </ul>

                            {/* Skills Gained */}
                            {item.skills && item.skills.length > 0 && (
                                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                                    <div className="text-xs text-cyan-600 dark:text-cyan-500 font-mono mb-2">SKILLS ACQUIRED:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.skills.map((skill, i) => (
                                            <span key={i} className="px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium border border-cyan-500/20">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </TiltCard>
            </div>
        </motion.div>
    );
};

// --- Contact Form Modal ---
const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', phone: '', subject: '', message: ''
    });

    const handleSubmit = (type) => {
        const { name, organization, email, phone, subject, message } = formData;
        const fullMessage = `Name: ${name}\nOrganization: ${organization}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`;

        if (type === 'email') {
            window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || 'Contact from Portfolio')}&body=${encodeURIComponent(fullMessage)}`;
        } else if (type === 'whatsapp') {
            window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(fullMessage)}`, '_blank');
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Get in Touch</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 focus:border-cyan-500 outline-none transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Organization"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 focus:border-cyan-500 outline-none transition-colors"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 focus:border-cyan-500 outline-none transition-colors"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 focus:border-cyan-500 outline-none transition-colors"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 focus:border-cyan-500 outline-none transition-colors"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 focus:border-cyan-500 outline-none transition-colors resize-none"
                    />
                </div>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => handleSubmit('email')}
                        className="flex-1 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        <Mail size={18} /> Send via Email
                    </button>
                    <button
                        onClick={() => handleSubmit('whatsapp')}
                        className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                        <MessageCircle size={18} /> Send via WhatsApp
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- Kaggle Icon (custom since not in lucide) ---
const KaggleIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.075.312" />
    </svg>
);

const OutroAdvanced = ({ onRestart }) => {
    const containerRef = useRef(null);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    // Pre-built message templates
    const emailTemplate = `Hi Nikhil,

I came across your portfolio and was impressed by your work.

I'd like to discuss a potential opportunity with you.

Looking forward to hearing from you!

Best regards`;

    const whatsappTemplate = `Hi Nikhil! 👋

I found your portfolio and I'm interested in discussing a potential collaboration/opportunity.

Looking forward to connecting!`;

    return (
        <div ref={containerRef} className="relative min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white overflow-hidden transition-colors duration-500">

            {/* Contact Modal */}
            <AnimatePresence>
                {isContactOpen && <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />}
            </AnimatePresence>

            {/* Deep Parallax Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-slate-50 dark:from-slate-900 dark:via-black dark:to-black opacity-80" />
                <motion.div style={{ y: y1, rotate }} className="absolute top-[10%] left-[5%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[5%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
                <motion.div style={{ y: y3 }} className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
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
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-50 shadow-[0_0_10px_rgba(6,182,212,0.3)]" />
                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Skills Section with Tooltips */}
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
                                            <SkillBadge key={j} item={item} />
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>

                {/* HIRE ME Section - Organized Buttons */}
                <div className="text-center pt-32 border-t border-slate-200 dark:border-white/10 relative overflow-hidden">
                    <motion.div style={{ y: y1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-[100px] -z-10" />

                    <h2 className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter opacity-90">HIRE ME</h2>
                    <p className="text-2xl text-slate-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                        I'm ready to transform your data into actionable insights. <br />
                        <span className="text-cyan-600 dark:text-cyan-400 font-bold">Let's build the future together.</span>
                    </p>

                    {/* Primary CTA */}
                    <button
                        onClick={() => setIsContactOpen(true)}
                        className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-3 mx-auto mb-12"
                    >
                        <Send size={24} /> Contact Me
                    </button>

                    {/* Quick Action Buttons - Organized Grid */}
                    <div className="max-w-4xl mx-auto">
                        {/* Social & Contact Row */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                            <a
                                href={`mailto:${profile.email}?subject=Opportunity%20from%20Portfolio&body=${encodeURIComponent(emailTemplate)}`}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all group"
                            >
                                <Mail size={24} className="text-cyan-600 dark:text-cyan-400" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Email</span>
                            </a>
                            <a
                                href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(whatsappTemplate)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-green-500/50 hover:bg-green-500/10 transition-all group"
                            >
                                <MessageCircle size={24} className="text-green-500" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">WhatsApp</span>
                            </a>
                            <a
                                href={`tel:${profile.phone}`}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all group"
                            >
                                <Phone size={24} className="text-blue-500" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Call</span>
                            </a>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-500/50 hover:bg-slate-500/10 transition-all group"
                            >
                                <Github size={24} className="text-slate-700 dark:text-white" />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">GitHub</span>
                            </a>
                            <a
                                href={profile.kaggle}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 transition-all group"
                            >
                                <KaggleIcon size={24} />
                                <span className="text-sm font-medium text-slate-900 dark:text-white">Kaggle</span>
                            </a>
                        </div>

                        {/* Resume & LinkedIn Row */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                            <a
                                href={profile.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#0077b5] text-white font-bold hover:scale-105 transition-all"
                            >
                                <Linkedin size={20} /> LinkedIn
                            </a>
                            <a
                                href={profile.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-all"
                            >
                                <Eye size={20} /> View Resume
                            </a>
                            <a
                                href={profile.resumeUrl}
                                download
                                className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:scale-105 transition-all col-span-2 md:col-span-1"
                            >
                                <Download size={20} /> Download Resume
                            </a>
                        </div>

                        {/* Restart Button */}
                        <button
                            onClick={onRestart}
                            className="px-8 py-4 border-2 border-slate-300 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3 mx-auto"
                        >
                            <RefreshCw size={20} /> Replay Journey
                        </button>
                    </div>

                    <div className="mt-20 text-slate-500 dark:text-gray-600 text-sm font-mono">
                        © 2026 {profile.name}. Crafted with React & Framer Motion.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OutroAdvanced;
