import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Users, MessageSquare, Award, Sparkles } from "lucide-react";
import { users } from "../data/mockData";

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Find Your Match",
      description: "Connect with people who have the skills you want to learn",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Chat",
      description: "Communicate seamlessly with your skill exchange partners",
    },
    {
      icon: Award,
      title: "Quality Guaranteed",
      description: "All members are verified with ratings and reviews",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
              SkillSwap
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/explore")}
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
            >
              Explore Skills
            </button>
            <button
              onClick={() => {
                const howItWorks = document.getElementById("how-it-works");
                howItWorks?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
              Exchange Skills.
              <br />
              Learn Together.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Connect with passionate learners worldwide. Share your expertise and gain new skills through meaningful exchanges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/explore")}
                className="px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-2xl hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Find Skills
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 bg-white text-[#2563EB] border-2 border-[#2563EB] rounded-2xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Offer a Skill
              </motion.button>
            </div>
          </motion.div>

          {/* Animated Skill Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {users.slice(1, 5).map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-2xl object-cover mx-auto"
                  />
                  {user.online && (
                    <div className="absolute top-0 right-1/2 translate-x-10 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-center">{user.name}</h3>
                <p className="text-sm text-gray-500 mb-3 text-center">{user.location}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {user.skillsOffered.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold">{user.rating}</span>
                  <span className="text-gray-400">({user.totalReviews})</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Start exchanging skills in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                description: "List the skills you can teach and what you want to learn",
              },
              {
                step: "2",
                title: "Find Your Match",
                description: "Browse profiles and connect with people who have complementary skills",
              },
              {
                step: "3",
                title: "Start Exchanging",
                description: "Schedule sessions and start learning together through our platform",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of learners exchanging skills worldwide
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="px-10 py-4 bg-white text-[#2563EB] rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2026 SkillSwap. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
