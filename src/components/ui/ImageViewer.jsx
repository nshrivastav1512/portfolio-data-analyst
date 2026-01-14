import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { resolveImagePath } from '../../utils/imageHelper';

const ImageViewer = ({ isOpen, onClose, images, currentIndex, onNext, onPrev }) => {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && images.length > 1) onPrev();
            if (e.key === 'ArrowRight' && images.length > 1) onNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, images.length, onClose, onNext, onPrev]);

    if (!isOpen || !images || images.length === 0) return null;

    const currentImage = images[currentIndex];
    const imageSrc = resolveImagePath(currentImage);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                    onClick={onClose}
                >
                    {/* Controls */}
                    <div className="absolute top-6 right-6 flex gap-4 z-[210]">
                        <a
                            href={imageSrc}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                            title="Download Image"
                        >
                            <Download size={24} />
                        </a>
                        <button
                            onClick={(e) => { e.stopPropagation(); onClose(); }}
                            className="p-3 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 text-white transition-colors backdrop-blur-md border border-white/10"
                            title="Close"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Image */}
                    <motion.img
                        key={imageSrc}
                        src={imageSrc}
                        alt="Full View"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Navigation */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                                className="absolute left-4 md:left-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onNext(); }}
                                className="absolute right-4 md:right-10 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
                            >
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    {images.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white/80 text-sm font-mono border border-white/10">
                            {currentIndex + 1} / {images.length}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageViewer;
