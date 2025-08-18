"use client";
import Link from "next/link";
import {
  FaArrowRight,
  FaRobot,
  FaMicrochip,
  FaCode,
  FaBrain,
  FaCloud,
  FaShieldAlt,
  FaUserAstronaut,
  FaChartLine,
  FaStar,
  FaAtom,
  FaRocket,
  FaDatabase,
  FaPython,
  FaTable,
  FaUserGraduate,
  FaGraduationCap
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      await controls.start({
        rotate: [0, 5, -5, 0],
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
      });
    };
    sequence();
  }, [controls]);

  const techDomains = [
    { name: "AI Engineering", icon: <FaRobot className="text-[#047857]" />, hot: true },
    { name: "Quantum Computing", icon: <FaAtom className="text-[#0D9488]" />, hot: true },
    { name: "Blockchain Dev", icon: <FaShieldAlt className="text-[#065F46]" /> },
    { name: "Neural Networks", icon: <FaBrain className="text-[#047857]" /> },
    { name: "Cloud Architect", icon: <FaCloud className="text-[#0D9488]" /> },
    { name: "AR/VR Systems", icon: <FaUserAstronaut className="text-[#065F46]" />, hot: true },
    { name: "Data Science", icon: <FaChartLine className="text-[#047857]" />, hot: true },
    { name: "Python Programming", icon: <FaPython className="text-[#0D9488]" /> },
  ];

  const featuredPrograms = [
    {
      title: "AI Mastery Program",
      students: "24.7K",
      icon: <FaRobot />,
      rating: "4.9",
      category: "AI Engineering",
      duration: "16 Weeks",
      bgColor: "bg-gradient-to-br from-[#047857] to-[#0D9488]"
    },
    {
      title: "Quantum Fundamentals",
      students: "8.3K",
      icon: <FaAtom />,
      rating: "4.8",
      category: "Quantum Tech",
      duration: "12 Weeks",
      bgColor: "bg-gradient-to-br from-[#065F46] to-[#047857]"
    },
    {
      title: "Data Science Pro",
      students: "18.5K",
      icon: <FaChartLine />,
      rating: "4.9",
      category: "Data Science",
      duration: "12 Weeks",
      bgColor: "bg-gradient-to-br from-[#0D9488] to-[#047857]"
    },
  ];

  const stats = [
    { value: "42K+", label: "Future Builders", icon: <FaUserGraduate className="text-[#047857]" /> },
    { value: "98%", label: "Career Acceleration", icon: <FaChartLine className="text-[#0D9488]" /> },
    { value: "4.9★", label: "Avg. Rating", icon: <FaStar className="text-[#065F46]" /> },
    { value: "200+", label: "Cutting-edge Courses", icon: <FaCode className="text-[#0D9488]" /> },
  ];

  // Calmer Binary Code Rain Animation
  const BinaryRain = () => {
    const columns = 15;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        {[...Array(columns)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-[#047857] text-xs font-mono whitespace-nowrap"
            style={{
              left: `${(i * 100) / columns}%`,
            }}
            initial={{ y: -1000 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: Math.random() * 10 + 15,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(30)].map((_, j) => (
              <span key={j} className="opacity-70">
                {Math.random() > 0.5 ? "1" : "0"}
                {j % 5 === 0 ? " " : ""}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    );
  };

  // Enhanced Flying Planes Animation
  const FlyingPlanes = () => {
    const planes = [
      // Large center plane
      {
        size: 64,
        delay: 0,
        duration: 25,
        path: [
          { x: -100, y: 30 },
          { x: 20, y: 10 },
          { x: 120, y: 40 }
        ],
        color: "#047857",
        opacity: 0.7
      },
      // Medium top-right to bottom-left
      {
        size: 48,
        delay: 5,
        duration: 30,
        path: [
          { x: 120, y: -50 },
          { x: 60, y: 30 },
          { x: -50, y: 80 }
        ],
        color: "#0D9488",
        opacity: 0.6
      },
      // Small bottom-right to top-left
      {
        size: 36,
        delay: 8,
        duration: 20,
        path: [
          { x: 110, y: 90 },
          { x: 40, y: 60 },
          { x: -30, y: 20 }
        ],
        color: "#065F46",
        opacity: 0.5
      },
      // Medium diagonal
      {
        size: 42,
        delay: 12,
        duration: 28,
        path: [
          { x: -50, y: 70 },
          { x: 30, y: 40 },
          { x: 110, y: 10 }
        ],
        color: "#10B981",
        opacity: 0.6
      },
      // Small circular
      {
        size: 32,
        delay: 15,
        duration: 35,
        path: [
          { x: 10, y: 20 },
          { x: 80, y: 10 },
          { x: 60, y: 70 },
          { x: 10, y: 60 },
          { x: 10, y: 20 }
        ],
        color: "#059669",
        opacity: 0.4
      }
    ];
    
    return (
      <>
        {planes.map((plane, i) => (
          <motion.div
            key={i}
            className="absolute hidden lg:block z-0"
            style={{
              width: `${plane.size}px`,
              height: `${plane.size}px`,
              opacity: plane.opacity
            }}
            initial={{
              x: plane.path[0].x,
              y: plane.path[0].y,
              rotate: 45
            }}
            animate={{ 
              x: plane.path.map(p => `${p.x}%`),
              y: plane.path.map(p => `${p.y}%`),
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
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        ))}
      </>
    );
  };

  // Subtle Tech Particles
  const TechParticles = () => {
    const particles = 20;
    const colors = ["#047857", "#0D9488", "#065F46"];
    
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(particles)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const duration = Math.random() * 15 + 15;
          const delay = Math.random() * 5;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const opacity = Math.random() * 0.2 + 0.1;
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: color,
                opacity: opacity
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ 
                y: ["0%", `${Math.random() * 30 - 15}%`, "0%"],
                x: ["0%", `${Math.random() * 10 - 5}%`, "0%"],
                opacity: [0, opacity, 0]
              }}
              transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className="relative bg-transparent text-gray-900 pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden font-inter min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ECFDF5] to-white opacity-80" />
        
        {/* Grid mesh */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwNDc4NTciIHN0cm9rZS13aWR0aD0iMC4wNSI+PHBhdGggZD0iTSAwIDAgTCAwIDYwIi8+PHBhdGggZD0iTSA2MCAwIEwgNjAgNjAiLz48cGF0aCBkPSJNIDAgMCBMIDYwIDAiLz48cGF0aCBkPSJNIDAgNjAgTCA2MCA2MCIvPjwvZz48L3N2Zz4=')] opacity-10" />
        
        {/* Calm binary rain */}
        <BinaryRain />
        
        {/* Subtle tech particles */}
        <TechParticles />
        
        {/* Multiple flying planes */}
        <FlyingPlanes />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#047857] to-[#0D9488] flex items-center justify-center shadow-lg"
                >
                  <FaMicrochip className="text-white text-xl" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-sm font-medium bg-[#D1FAE5] text-[#047857] px-3 py-1.5 rounded-full border border-[#A7F3D0]"
                >
                  Shaping Tomorrow's Tech Leaders
                </motion.div>
              </div>

              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#047857] to-[#0D9488]">
                  Master the Future
                </span>
                <br />
                <span className="text-gray-900">With Cutting-Edge</span>
                <br />
                <span className="text-gray-900">Tech Education</span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 max-w-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Join 42,000+ innovators mastering AI, quantum computing, and next-gen technologies. 
                Be at the forefront of the digital revolution.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link
                    href="/programs"
                    className="px-6 py-3.5 bg-gradient-to-r from-[#047857] to-[#0D9488] hover:from-[#065F46] hover:to-[#0F766E] text-white font-medium rounded-lg shadow-lg hover:shadow-[#047857]/40 transition-all flex items-center justify-center gap-2 text-base"
                  >
                    Start Building <FaArrowRight className="text-sm" />
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Link
                    href="/paths"
                    className="px-6 py-3.5 bg-white text-gray-800 font-medium rounded-lg border border-gray-200 hover:border-[#047857] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-base"
                  >
                    <FaUserGraduate className="text-base" /> Explore Career Paths
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Featured Programs */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-2xl border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-7 h-7 rounded-full bg-gradient-to-br from-[#047857] to-[#0D9488] flex items-center justify-center"
                >
                  <FaStar className="text-white text-xs" />
                </motion.div>
                <span>Flagship Tech Programs</span>
              </h3>

              <div className="space-y-4">
                {featuredPrograms.map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`group relative p-4 rounded-xl cursor-pointer transition-all ${program.bgColor} shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white text-xl">
                        {program.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg">{program.title}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs font-medium bg-white/20 text-white px-2 py-1 rounded-full">
                            {program.category}
                          </span>
                          <span className="text-xs text-white/90 flex items-center gap-1">
                            <FaStar className="text-yellow-300" /> {program.rating}
                          </span>
                        <span className="text-xs text-white/90 flex items-center gap-1">
  {program.students} 
  <FaUserGraduate className="text-white" />
</span>

                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="text-xs text-white/90 font-medium">{program.duration}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/programs" className="mt-5 text-sm font-medium text-[#047857] hover:text-[#065F46] flex items-center gap-2 justify-end group">
                View all future-tech programs 
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Tech Domains */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-lg font-medium text-gray-600 mb-5 text-center">
            Master the Technologies Shaping Our Future
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 max-w-7xl mx-auto">
            {techDomains.map((domain, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className={`p-3 rounded-lg border ${domain.hot ? 'border-[#047857]/30' : 'border-gray-200'} bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 mb-2 flex items-center justify-center text-2xl">
                    {domain.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{domain.name}</span>
                  {domain.hot && (
                    <span className="mt-1 text-[10px] font-bold bg-gradient-to-r from-[#047857] to-[#0D9488] text-white px-2 py-0.5 rounded-full">
                      FUTURE TECH
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16 px-2 sm:px-0"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#047857] to-[#0D9488] flex items-center justify-center text-white">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}