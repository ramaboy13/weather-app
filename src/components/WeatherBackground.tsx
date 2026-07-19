"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface WeatherBackgroundProps {
  condition: string;
  isDay: boolean;
}

export function WeatherBackground({ condition, isDay }: WeatherBackgroundProps) {
  const config = useMemo(() => {
    const c = condition.toLowerCase();

    if (c.includes("rain") || c.includes("shower")) {
      return {
        gradient: "from-gray-600 via-gray-700 to-gray-900",
        particles: "rain",
        overlay: "bg-blue-900/20",
      };
    }
    if (c.includes("thunder")) {
      return {
        gradient: "from-gray-800 via-gray-900 to-black",
        particles: "lightning",
        overlay: "bg-purple-900/20",
      };
    }
    if (c.includes("snow")) {
      return {
        gradient: "from-blue-100 via-white to-gray-200",
        particles: "snow",
        overlay: "bg-white/10",
      };
    }
    if (c.includes("cloud") || c.includes("overcast") || c.includes("fog")) {
      return {
        gradient: isDay
          ? "from-gray-300 via-gray-400 to-gray-500"
          : "from-gray-700 via-gray-800 to-gray-900",
        particles: "clouds",
        overlay: "bg-gray-500/10",
      };
    }
    // Sunny / Clear
    if (isDay) {
      return {
        gradient: "from-blue-400 via-blue-500 to-blue-600",
        particles: "sun",
        overlay: "bg-yellow-500/10",
      };
    }
    // Night clear
    return {
      gradient: "from-indigo-900 via-purple-900 to-gray-900",
      particles: "stars",
      overlay: "bg-indigo-900/20",
    };
  }, [condition, isDay]);

  const renderParticles = () => {
    switch (config.particles) {
      case "rain":
        return (
          <>
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-blue-300/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  height: `${8 + Math.random() * 16}px`,
                }}
                animate={{
                  y: ["0vh", "110vh"],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
            {/* Clouds */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`cloud-${i}`}
                className="absolute bg-gray-500/20 rounded-full blur-3xl"
                style={{
                  width: `${100 + Math.random() * 200}px`,
                  height: `${40 + Math.random() * 60}px`,
                  top: `${Math.random() * 40}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [-20, 20, -20],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );

      case "lightning":
        return (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 bg-purple-300/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  height: `${10 + Math.random() * 20}px`,
                }}
                animate={{
                  y: ["0vh", "110vh"],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 0.4 + Math.random() * 0.3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear",
                }}
              />
            ))}
            <motion.div
              className="absolute inset-0 bg-white/0"
              animate={{
                backgroundColor: [
                  "rgba(255,255,255,0)",
                  "rgba(255,255,255,0.1)",
                  "rgba(255,255,255,0)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </>
        );

      case "snow":
        return (
          <>
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                }}
                animate={{
                  y: ["0vh", "110vh"],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear",
                }}
              />
            ))}
          </>
        );

      case "clouds":
        return (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/10 rounded-full blur-3xl"
                style={{
                  width: `${150 + Math.random() * 250}px`,
                  height: `${60 + Math.random() * 80}px`,
                  top: `${Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [-30, 30, -30],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 15 + Math.random() * 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );

      case "sun":
        return (
          <>
            <motion.div
              className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/5 rounded-full blur-2xl"
                style={{
                  width: `${80 + Math.random() * 120}px`,
                  height: `${30 + Math.random() * 40}px`,
                  top: `${10 + Math.random() * 30}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [-20, 20, -20],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );

      case "stars":
        return (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
            <motion.div
              className="absolute top-10 right-10 w-16 h-16 bg-gray-200/20 rounded-full blur-sm"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-b ${config.gradient} transition-all duration-1000 overflow-hidden pointer-events-none`}
      style={{ zIndex: 0 }}
    >
      <div className={`absolute inset-0 ${config.overlay}`} />
      {renderParticles()}
    </div>
  );
}
