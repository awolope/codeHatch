"use client";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaProjectDiagram, FaUserTie, FaRocket } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      title: "Learn with Interactive Lessons",
      description: "Engage with videos, quizzes, and coding exercises designed for real learning.",
      icon: <FaChalkboardTeacher />,
      color: "#047857",
    },
    {
      title: "Build Real Projects",
      description: "Apply your skills by creating hands-on projects that showcase your talent.",
      icon: <FaProjectDiagram />,
      color: "#0D9488",
    },
    {
      title: "Get Mentored by Experts",
      description: "Receive guidance from experienced professionals to accelerate your growth.",
      icon: <FaUserTie />,
      color: "#047857",
    },
    {
      title: "Land Your Dream Job",
      description: "Use your portfolio and new skills to secure your ideal career opportunity.",
      icon: <FaRocket />,
      color: "#0D9488",
    },
  ];

  return (
    <section className="relative bg-transparent py-20 font-inter mt-10 overflow-hidden">
      {/* Dramatic Circular Background Shapes */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-green-100 rounded-full shadow-2xl"
        animate={{ y: [0, 25, 0], rotate: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] bg-teal-100 rounded-full shadow-2xl"
        animate={{ y: [0, -30, 0], rotate: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      ></motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            How <span className="text-[#047857]">It Works</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Our teaching model takes you from beginner to job-ready in four simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all text-center relative z-10"
            >
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mb-4 mx-auto text-2xl"
                style={{
                  backgroundColor: `${step.color}20`,
                  color: step.color,
                }}
              >
                {step.icon}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
