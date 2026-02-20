import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <svg 
            viewBox="0 0 200 200" 
            className={cn("h-full w-full drop-shadow-[0_0_10px_rgba(20,184,166,0.5)]", className)}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            
            {/* Background Orbiting Rings */}
            <circle cx="100" cy="100" r="85" stroke="url(#logo-grad)" strokeWidth="0.5" strokeDasharray="10 20" className="animate-[spin_20s_linear_infinite]" />
            <circle cx="100" cy="100" r="75" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 15" className="animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Central Prism/Core */}
            <path 
                d="M100 40 L160 70 L160 130 L100 160 L40 130 L40 70 Z" 
                fill="url(#logo-grad)" 
                fillOpacity="0.1"
                stroke="url(#logo-grad)" 
                strokeWidth="2.5"
                filter="url(#glow)"
                className="animate-pulse"
            />
            <path 
                d="M100 100 L160 70 M100 100 L160 130 M100 100 L100 160 M100 100 L40 130 M100 100 L40 70 M100 100 L100 40" 
                stroke="white" 
                strokeWidth="1" 
                strokeOpacity="0.4"
            />
            
            {/* Inner Glowing Core */}
            <circle cx="100" cy="100" r="15" fill="white" filter="url(#glow)" className="animate-pulse" />
        </svg>
    );
};
