import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    size?: number;
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-lg animate-pulse" />

            {/* Main Logo Container */}
            <div className="relative w-full h-full bg-zinc-950 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Animated Gradient Background */}
                <motion.div
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)"
                        ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                />

                {/* Futuristic SVG J */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[70%] h-[70%] relative z-10"
                >
                    {/* Main J Shape */}
                    <motion.path
                        d="M65 20V65C65 76.0457 56.0457 85 45 85C33.9543 85 25 76.0457 25 65V60"
                        stroke="url(#logo-gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Accent dot/node */}
                    <motion.circle
                        cx="65"
                        cy="20"
                        r="6"
                        fill="#10b981"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, duration: 0.5, type: "spring" }}
                        className="shadow-[0_0_10px_#10b981]"
                    />

                    <defs>
                        <linearGradient id="logo-gradient" x1="25" y1="20" x2="65" y2="85" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#10b981" />
                            <stop offset="1" stopColor="#34d399" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Diagonal Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default Logo;
