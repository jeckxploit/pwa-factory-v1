import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    size?: number;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* Animated Outer Glow Rings */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/30 via-cyan-500/20 to-blue-500/30 blur-xl"
            />
            
            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] rounded-2xl border border-gradient-to-r from-emerald-500/20 via-transparent to-cyan-500/20"
                style={{
                    background: 'linear-gradient(90deg, rgba(16,185,129,0.1), transparent, rgba(6,182,212,0.1))',
                }}
            />

            {/* Main Logo Container */}
            <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/15 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                {/* Animated Mesh Gradient Background */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 40%),
                            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 45%)
                        `,
                        backgroundSize: '200% 200%',
                    }}
                />

                {/* Grid Pattern Overlay */}
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Animated SVG Logo */}
                <svg
                    viewBox="0 0 120 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[75%] h-[75%] relative z-10"
                >
                    {/* Glow Filter Definition */}
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        
                        <linearGradient id="main-gradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#10b981">
                                <animate attributeName="stop-color" values="#10b981;#06b6d4;#3b82f6;#10b981" dur="4s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="50%" stopColor="#06b6d4">
                                <animate attributeName="stop-color" values="#06b6d4;#3b82f6;#10b981;#06b6d4" dur="4s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="#3b82f6">
                                <animate attributeName="stop-color" values="#3b82f6;#10b981;#06b6d4;#3b82f6" dur="4s" repeatCount="indefinite" />
                            </stop>
                        </linearGradient>

                        <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                    </defs>

                    {/* Outer Ring */}
                    <motion.circle
                        cx="60"
                        cy="60"
                        r="52"
                        stroke="url(#accent-gradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="327"
                        initial={{ strokeDashoffset: 327, opacity: 0 }}
                        animate={{ strokeDashoffset: 0, opacity: 0.5 }}
                        transition={{ duration: 2, delay: 0.3 }}
                        filter="url(#glow)"
                    />

                    {/* Main Abstract Shape - Dynamic Wave */}
                    <motion.path
                        d="M35 70 C35 70, 45 50, 60 50 C75 50, 85 70, 85 70"
                        stroke="url(#main-gradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />

                    {/* Secondary Wave */}
                    <motion.path
                        d="M30 80 C30 80, 45 60, 60 60 C75 60, 90 80, 90 80"
                        stroke="url(#accent-gradient)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                    />

                    {/* Central Orb */}
                    <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6, type: "spring", bounce: 0.5 }}
                    >
                        {/* Orb Glow */}
                        <circle cx="60" cy="45" r="12" fill="url(#main-gradient)" filter="url(#glow)" opacity="0.8" />
                        <circle cx="60" cy="45" r="8" fill="url(#accent-gradient)" />
                        {/* Orb Highlight */}
                        <circle cx="57" cy="42" r="3" fill="rgba(255,255,255,0.6)" />
                    </motion.g>

                    {/* Orbiting Particles */}
                    {[0, 120, 240].map((_, index) => (
                        <motion.g
                            key={index}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 6 + index * 2, repeat: Infinity, ease: "linear" }}
                            style={{ originX: '60px', originY: '60px' }}
                        >
                            <motion.circle
                                cx="60"
                                cy="25"
                                r="3"
                                fill="url(#accent-gradient)"
                                filter="url(#glow)"
                                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, delay: index * 0.3, repeat: Infinity }}
                            />
                        </motion.g>
                    ))}

                    {/* Corner Accents */}
                    <motion.path
                        d="M20 20 L30 20 M20 20 L20 30"
                        stroke="url(#accent-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        filter="url(#glow)"
                    />
                    <motion.path
                        d="M100 20 L90 20 M100 20 L100 30"
                        stroke="url(#accent-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        filter="url(#glow)"
                    />
                    <motion.path
                        d="M20 100 L30 100 M20 100 L20 90"
                        stroke="url(#accent-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        filter="url(#glow)"
                    />
                    <motion.path
                        d="M100 100 L90 100 M100 100 L100 90"
                        stroke="url(#accent-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        filter="url(#glow)"
                    />
                </svg>

                {/* Shimmer Effect */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                />

                {/* Bottom Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default Logo;
