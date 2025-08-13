'use client';
import { motion } from 'framer-motion';
import { FaRocket } from "react-icons/fa";

const Plane = ({ plane }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: `${plane.size}px`,
        height: `${plane.size}px`,
        opacity: plane.opacity
      }}
      initial={{
        x: `${plane.path[0].x}vw`,
        y: `${plane.path[0].y}vh`,
        rotate: 45
      }}
      animate={{ 
        x: plane.path.map(p => `${p.x}vw`),
        y: plane.path.map(p => `${p.y}vh`),
        rotate: [45, 50, 45]
      }}
      transition={{ 
        duration: plane.duration,
        delay: plane.delay,
        repeat: Infinity,
        repeatDelay: 0,
        ease: "linear"
      }}
    >
      <FaRocket 
        className="transform rotate-45" 
        style={{ 
          color: plane.color,
          fontSize: `${plane.size}px`
        }} 
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-full h-1 bg-current rounded-full"
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default function GlobalPlanes() {
  const planes = [
    {
      size: 64,
      delay: 0,
      duration: 25,
      path: [
        { x: -10, y: -10 },
        { x: 110, y: 110 }
      ],
      color: "#047857",
      opacity: 0.5
    },
    {
      size: 48,
      delay: 5,
      duration: 20,
      path: [
        { x: -20, y: 50 },
        { x: 120, y: 50 }
      ],
      color: "#0D9488",
      opacity: 0.4
    },
    {
      size: 56,
      delay: 10,
      duration: 30,
      path: [
        { x: -10, y: 30 },
        { x: 40, y: 60 },
        { x: 80, y: 40 },
        { x: 110, y: 70 }
      ],
      color: "#065F46",
      opacity: 0.5
    },
    {
      size: 40,
      delay: 15,
      duration: 35,
      path: [
        { x: 80, y: -10 },
        { x: 80, y: 110 }
      ],
      color: "#10B981",
      opacity: 0.4
    },
    {
      size: 44,
      delay: 20,
      duration: 40,
      path: [
        { x: 110, y: 20 },
        { x: 60, y: 40 },
        { x: 90, y: 60 },
        { x: 40, y: 80 }
      ],
      color: "#059669",
      opacity: 0.4
    },
    {
      size: 52,
      delay: 25,
      duration: 30,
      path: [
        { x: -10, y: 110 },
        { x: 110, y: -10 }
      ],
      color: "#047857",
      opacity: 0.5
    }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {planes.map((plane, i) => (
        <Plane key={i} plane={plane} />
      ))}
    </div>
  );
}