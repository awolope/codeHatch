"use client";
import { motion } from "framer-motion";
import { FaLaptopCode, FaUserTie, FaBriefcase, FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";

// WHY CHOOSE US SECTION
export function WhyChooseUs() {
  const benefits = [
    {
      icon: <FaLaptopCode />,
      title: "Hands-on Projects",
      desc: "Work on real-world projects that build your portfolio and skills.",
      color: "#047857",
    },
    {
      icon: <FaUserTie />,
      title: "Expert Mentors",
      desc: "Get guidance from industry professionals with years of experience.",
      color: "#0D9488",
    },
    {
      icon: <FaBriefcase />,
      title: "Job Support",
      desc: "Resume reviews, interview prep, and referrals to top companies.",
      color: "#047857",
    },
    {
      icon: <FaClock />,
      title: "Flexible Learning",
      desc: "Learn at your own pace with lifetime access to all materials.",
      color: "#0D9488",
    },
  ];

  return (
    <section className="relative bg-white py-20 font-inter mt-10 overflow-hidden">
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ececec_1px,transparent_1px),linear-gradient(to_bottom,#ececec_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      {/* Dramatic Soft Shadow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-100 rounded-full blur-[160px] opacity-40 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Why <span className="text-[#047857]">Choose Us</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Our approach blends practical experience with expert guidance to help you succeed.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center relative bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
            >
              <div
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full shadow-lg flex items-center justify-center text-4xl mb-4 border-4 border-white"
                style={{ backgroundColor: `${b.color}15`, color: b.color }}
              >
                {b.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{b.title}</h3>
              <p className="text-gray-600 text-sm max-w-xs">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// UPCOMING EVENTS SECTION
export function UpcomingEvents() {
  const events = [
    {
      title: "Free React Workshop",
      date: "2025-09-01T18:00:00",
      desc: "Learn the basics of React in a live coding session with Q&A.",
    },
    {
      title: "Career in Data Science",
      date: "2025-08-20T16:00:00",
      desc: "Discover how to start and grow your career in data science.",
    },
    {
      title: "UI/UX Design Bootcamp",
      date: "2025-08-25T14:00:00",
      desc: "Master design fundamentals and build a strong portfolio.",
    },
  ];

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      events.forEach((event) => {
        const diff = new Date(event.date).getTime() - new Date().getTime();
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          newTimeLeft[event.title] = { days, hours, minutes };
        } else {
          newTimeLeft[event.title] = null;
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-transparent py-20 font-inter mt-10 overflow-hidden">
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ececec_1px,transparent_1px),linear-gradient(to_bottom,#ececec_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>

      {/* Dramatic Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-teal-100 rounded-full blur-[180px] opacity-40 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Upcoming <span className="text-[#047857]">Events</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Join our live sessions and webinars to learn, connect, and grow.
          </p>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{event.desc}</p>
              {timeLeft[event.title] ? (
                <div className="flex justify-center gap-6 text-center text-sm font-medium text-gray-700">
                  <div>
                    <span className="block text-2xl font-bold text-[#047857]">{timeLeft[event.title].days}</span>
                    days
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#0D9488]">{timeLeft[event.title].hours}</span>
                    hrs
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#047857]">{timeLeft[event.title].minutes}</span>
                    min
                  </div>
                </div>
              ) : (
                <p className="text-red-500 font-medium text-center mt-2">Event Started</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
