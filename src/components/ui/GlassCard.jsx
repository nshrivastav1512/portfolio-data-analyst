import React from 'react';
import { cn } from '../../utils/cn';

const GlassCard = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "relative backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
