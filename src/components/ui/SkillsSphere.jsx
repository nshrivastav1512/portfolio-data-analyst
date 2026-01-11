import React, { useEffect, useRef } from 'react';

const SkillsSphere = ({ skills }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const allSkills = skills.flatMap(s => s.items);
        const tags = allSkills.length;
        const radius = 250;

        // Clear previous
        container.innerHTML = '';

        for (let i = 0; i < tags; i++) {
            const tag = document.createElement('div');
            tag.className = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm md:text-base font-bold text-cyan-400 dark:text-cyan-300 whitespace-nowrap transition-colors duration-300 hover:text-white hover:scale-110 cursor-default select-none';
            tag.textContent = allSkills[i];

            // Spherical distribution
            const phi = Math.acos(-1 + (2 * i) / tags);
            const theta = Math.sqrt(tags * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            container.appendChild(tag);
        }
    }, [skills]);

    return (
        <div className="relative w-[500px] h-[500px] perspective-1000 mx-auto">
            <div
                ref={containerRef}
                className="relative w-full h-full transform-style-3d animate-spin-slow"
            >
                {/* Tags injected here */}
            </div>
        </div>
    );
};

export default SkillsSphere;
