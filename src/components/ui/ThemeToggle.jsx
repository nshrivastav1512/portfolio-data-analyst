import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg transition-colors hover:bg-white/20 dark:hover:bg-white/10 z-50"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6">
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'dark' ? 0 : 90, scale: theme === 'dark' ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-yellow-400"
                >
                    <Moon size={20} fill="currentColor" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ rotate: theme === 'light' ? 0 : -90, scale: theme === 'light' ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center text-orange-500"
                >
                    <Sun size={20} fill="currentColor" />
                </motion.div>
            </div>
        </button>
    );
};

export default ThemeToggle;
