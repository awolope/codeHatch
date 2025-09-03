// components/FAQ.jsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="mb-4 overflow-hidden"
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        transition: { duration: 0.3 }
      }}
    >
      <motion.button
        className={`flex items-center justify-between w-full p-5 text-left rounded-lg ${isOpen ? 'bg-[#047857]/10' : 'bg-transparent'} hover:bg-[#047857]/10 transition-colors duration-200`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 mr-4 rounded-full bg-[#047857]/20">
            <FiHelpCircle className="text-[#047857]" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-[#047857]" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1,
              height: 'auto',
              transition: { 
                opacity: { duration: 0.3 },
                height: { duration: 0.3 }
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              transition: { 
                opacity: { duration: 0.2 },
                height: { duration: 0.3 }
              }
            }}
            className="px-5 pb-5"
          >
            <div className="pl-12 pr-4">
              <p className="text-gray-600">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  const faqs = [
    // Web Development
    {
      question: "What web development stacks do you teach?",
      answer: "We cover MERN (MongoDB, Express, React, Node), Python/Django, Ruby on Rails, and PHP/Laravel stacks with modern DevOps practices.",
      category: "web"
    },
    
    // AI & Machine Learning
    {
      question: "What AI frameworks are included in your curriculum?",
      answer: "Our AI program covers TensorFlow, PyTorch, Keras, and OpenAI tools with practical applications in NLP, computer vision, and predictive analytics.",
      category: "ai"
    },
    
    // Cybersecurity
    {
      question: "Do you offer ethical hacking certifications?",
      answer: "Yes! We prepare students for CEH, CISSP, and CompTIA Security+ certifications with hands-on penetration testing labs.",
      category: "cybersecurity"
    },
    
    // Cloud Computing
    {
      question: "Which cloud platforms do you focus on?",
      answer: "We provide comprehensive training in AWS, Azure, and Google Cloud with architecture design and Kubernetes orchestration.",
      category: "cloud"
    },
    
    // Data Science
    {
      question: "What data tools will I learn?",
      answer: "Our data science program includes Python/R, SQL, Tableau, Hadoop, Spark, and advanced machine learning techniques for big data.",
      category: "data"
    },
    
    // IoT
    {
      question: "What hardware platforms do you use for IoT training?",
      answer: "We work with Raspberry Pi, Arduino, ESP32, and custom IoT kits with sensors for smart home and industrial applications.",
      category: "iot"
    },
    
    // Mobile Development
    {
      question: "Do you teach both iOS and Android development?",
      answer: "Yes! We cover Swift/SwiftUI for iOS and Kotlin/Jetpack Compose for Android, plus cross-platform solutions like Flutter.",
      category: "mobile"
    },
    
    // Systems Programming
    {
      question: "What low-level programming is covered?",
      answer: "Our systems curriculum includes C/C++, Rust, operating systems concepts, and embedded systems programming.",
      category: "systems"
    },
    
    // Admissions
    {
      question: "What are the admission requirements?",
      answer: "Most programs require basic math and logic skills. Advanced courses may need prerequisites which can be completed through our prep courses.",
      category: "admissions"
    },
    
    // Career Services
    {
      question: "What career support do you provide?",
      answer: "We offer portfolio reviews, mock interviews, hackathon opportunities, and direct introductions to our 200+ hiring partners.",
      category: "career"
    }
  
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-12">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our platform and services.</p>
      </motion.div>

      <motion.div 
        className="bg-white/30 backdrop-blur-sm rounded-xl p-1 border border-gray-200/30"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}