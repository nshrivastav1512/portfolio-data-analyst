import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Paperclip, Mail, Minimize2, Maximize2, Loader2, Download, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendMessage } from '../../services/ai';
import resumeFile from '../../assets/Nikhil Data Analyst Resume.pdf';

const ChatWidget = ({ isOpen, onClose, isMinimized, setIsMinimized, onNavigate }) => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: "Hi! I'm Nikhil's AI Agent. I can answer questions about his experience, skills, or projects. You can also paste a Job Description here, and I'll tell you if he's a good fit!" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isMinimized]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Call AI Service
        const responseText = await sendMessage(input);

        const botMsg = { id: Date.now() + 1, role: 'bot', text: responseText };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleEmailTranscript = () => {
        const transcript = messages.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n\n');
        const subject = "Chat Transcript with Nikhil's AI Agent";
        const body = encodeURIComponent(transcript);
        window.location.href = `mailto:nshrivastav0905@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                    }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className={`fixed z-[200] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-right overflow-hidden backdrop-blur-3xl flex flex-col ${isMinimized
                            ? 'bottom-6 right-6 rounded-2xl p-0 cursor-pointer hover:scale-110 w-auto h-auto bg-transparent shadow-none'
                            : 'bottom-4 right-4 md:bottom-8 md:right-8 w-[90vw] md:w-[450px] h-[70vh] md:h-[600px] rounded-3xl bg-white/10 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-2xl'
                        }`}
                    onClick={isMinimized ? () => setIsMinimized(false) : undefined}
                >
                    {isMinimized ? (
                        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl shadow-lg shadow-cyan-500/30">
                            <Bot size={32} />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-black rounded-full animate-pulse"></span>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex-none flex items-center justify-between p-4 bg-white/50 dark:bg-white/5 border-b border-white/20 dark:border-white/10 backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20 text-white">
                                        <Bot size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-800 dark:text-white">Nikhil's AI Agent</h3>
                                        <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                                        <Minimize2 size={18} />
                                    </button>
                                    <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-cyan-500/20'
                                            : 'bg-white/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-white/20 dark:border-white/5 rounded-bl-none'
                                            }`}>
                                            {msg.role === 'bot' ? (
                                                <div className="prose dark:prose-invert prose-sm max-w-none">
                                                    <ReactMarkdown
                                                        components={{
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-2" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-2" {...props} />,
                                                            li: ({ node, ...props }) => <li className="my-1" {...props} />,
                                                            p: ({ node, ...props }) => <p className="my-2 last:mb-0" {...props} />,
                                                            strong: ({ node, ...props }) => <strong className="font-bold text-cyan-600 dark:text-cyan-400" {...props} />,
                                                            a: ({ node, href, children, ...props }) => {
                                                                const isInternal = href?.startsWith('/');
                                                                const isDownload = href === '/resume.pdf';

                                                                if (isDownload) {
                                                                    return (
                                                                        <a
                                                                            href={resumeFile}
                                                                            download="Nikhil_Shrivastav_Resume.pdf"
                                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-medium text-sm hover:scale-105 transition-transform shadow-md my-2 no-underline"
                                                                            {...props}
                                                                        >
                                                                            <Download size={16} />
                                                                            {children}
                                                                        </a>
                                                                    );
                                                                }

                                                                if (isInternal) {
                                                                    return (
                                                                        <button
                                                                            onClick={() => onNavigate && onNavigate(href.substring(1))}
                                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium text-sm hover:scale-105 transition-transform shadow-md my-2"
                                                                        >
                                                                            {children}
                                                                            <ArrowRight size={16} />
                                                                        </button>
                                                                    );
                                                                }

                                                                return <a href={href} target="_blank" rel="noopener noreferrer" className="text-cyan-600 underline" {...props}>{children}</a>;
                                                            }
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/80 dark:bg-white/10 p-4 rounded-2xl rounded-bl-none border border-white/20 dark:border-white/5 flex gap-1">
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="flex-none p-4 bg-white/50 dark:bg-white/5 border-t border-white/20 dark:border-white/10 backdrop-blur-md">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Ask about Nikhil..."
                                        className="flex-1 p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10 focus:border-cyan-500 outline-none text-sm text-slate-900 dark:text-white transition-all placeholder:text-slate-400"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isTyping}
                                        className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/20"
                                    >
                                        {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                                    </button>
                                </div>
                                <div className="mt-2 flex justify-between items-center">
                                    <p className="text-[10px] text-slate-400 text-center">
                                        Powered by Google Gemini AI
                                    </p>
                                    <button onClick={handleEmailTranscript} className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1">
                                        <Mail size={10} /> Email Transcript
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatWidget;
