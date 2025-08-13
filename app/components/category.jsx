"use client";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaDatabase,
  FaPython,
  FaTable,
  FaCloud,
  FaRobot,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
} from "react-icons/fa";

export default function Categories() {
  const categories = [
    { name: "Data Science", icon: <FaChartLine />, hot: true, color: "#047857" },
    { name: "Data Analytics", icon: <FaDatabase />, hot: true, color: "#0D9488" },
    { name: "Python Programming", icon: <FaPython />, color: "#047857" },
    { name: "SQL Mastery", icon: <FaDatabase />, color: "#0D9488" },
    { name: "Business Intelligence", icon: <FaTable />, color: "#047857" },
    { name: "AI Engineering", icon: <FaRobot />, hot: true, color: "#0D9488" },
    { name: "Full Stack Development", icon: <FaLaptopCode />, hot: true, color: "#047857" },
    { name: "App Development", icon: <FaMobileAlt />, color: "#0D9488" },
    { name: "Linux Administration", icon: <FaServer />, color: "#047857" },
    { name: "Cloud Data", icon: <FaCloud />, color: "#0D9488" },
  ];

  return (
    <section className="relative bg-tarnsparent py-20 font-inter mt-10 overflow-hidden">
      {/* Animated Angled Shapes */}
      <motion.div
        className="absolute top-[-80px] left-[-120px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-green-100 rotate-12 rounded-3xl shadow-2xl"
        animate={{ y: [0, 30, 0], rotate: [12, 16, 12] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-teal-100 -rotate-12 rounded-3xl shadow-2xl"
        animate={{ y: [0, -40, 0], rotate: [-12, -16, -12] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      ></motion.div>

      {/* Floating Icon Backgrounds (hidden on small screens) */}
      <div className="hidden sm:block">
        {[
          <FaCloud key="cloud" />,
          <FaPython key="python" />,
          <FaDatabase key="db" />,
          <FaLaptopCode key="code" />,
        ].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-200"
            style={{
              fontSize: `${Math.random() * 40 + 40}px`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6 + i, ease: "easeInOut" }}
          >
            {Icon}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Explore <span className="text-[#047857]">Learning Paths</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            From coding to cloud — discover diverse courses designed to boost your career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all cursor-pointer bg-white relative z-10`}
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-lg mb-3"
                style={{
                  backgroundColor: `${cat.color}20`,
                  color: cat.color,
                }}
              >
                {cat.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              {cat.hot && (
                <span className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                  🔥 Hot
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
