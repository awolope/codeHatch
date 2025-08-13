"use client";
import { motion } from "framer-motion";

export default function SuccessStories() {
  const stories = [
    {
      name: "Sarah Johnson",
      before: "Barista",
      after: "Mobile App Developer at Netflix",
      color: "#047857",
      story:
        "I was making lattes and wiping counters every day. I signed up, and in less than a year, I was building apps for Netflix.",
    },
    {
      name: "David Kim",
      before: "Delivery Driver",
      after: "Full Stack Developer at Shopify",
      color: "#0D9488",
      story:
        "I used to spend all day on the road delivering packages. This program gave me the skills and confidence to land a role as a full stack developer with Shopify.",
    },
    {
      name: "Aisha Mohammed",
      before: "Call Center Agent",
      after: "Machine Learning Engineer at Amazon",
      color: "#047857",
      story:
        "I spent hours taking customer calls and following scripts. I decided to change my path, and within 10 months, I became a machine learning engineer at Amazon.",
    },
    {
      name: "Lucas Silva",
      before: "Waiter",
      after: "Mobile App Developer at Spotify",
      color: "#0D9488",
      story:
        "Late nights carrying trays weren’t getting me closer to my dreams. I joined the course, built real projects, and now I’m creating mobile apps for Spotify.",
    },
  ];

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <section className="relative bg-tansparent py-20 font-inter mt-10 overflow-hidden">
      {/* Dramatic Floating Circles */}
      <motion.div
        className="absolute top-[-80px] left-[-100px] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-green-100 rounded-full opacity-40 blur-2xl"
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-100px] right-[-120px] w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] bg-teal-100 rounded-full opacity-40 blur-2xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Success <span className="text-[#047857]">Stories</span>
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Hear from our students who transformed their careers with our programs.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white border border-gray-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
            >
              {/* Avatar */}
              <div
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 shadow-md"
                style={{ backgroundColor: story.color }}
              >
                {getInitials(story.name)}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-lg text-gray-800">{story.name}</h3>

              {/* Before & After */}
              <p className="text-sm text-gray-500 mt-1">
                <span className="line-through text-red-400">{story.before}</span>
                <br />→<br />
                <span className="text-green-600 font-semibold">{story.after}</span>
              </p>

              {/* Story Paragraph */}
              <p className="text-gray-600 text-sm mt-3">{story.story}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
