import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Search,
  Star,
  MapPin,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { users, currentUser } from "../data/mockData";

export function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const recommendations = users
    .filter((user) => user.id !== currentUser.id)
    .slice(0, 6);

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
    },
    { icon: BookOpen, label: "My Skills", path: "/my-skills" },
    { icon: MessageSquare, label: "Messages", path: "/chat" },
    { icon: Users, label: "Matches", path: "/explore" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleStartChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const filteredRecommendations = recommendations.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300,
        }}
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-white border-r border-gray-200 p-6 z-40 ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
            SkillSwap
          </span>
        </div>

        {/* User Profile */}
        <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {currentUser.name}
              </h3>
              <p className="text-xs text-gray-500">
                {currentUser.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">
              {currentUser.rating}
            </span>
            <span className="text-gray-400">
              ({currentUser.totalReviews} reviews)
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.path === "/dashboard"
                  ? "bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-700 hover:bg-blue-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <motion.button
          whileHover={{ x: 4 }}
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
              Welcome back, {currentUser.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-600">
              Here are your recommended skill matches
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for skills or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
              />
            </div>
          </motion.div>

          {/* Skill Match Recommendations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">
              Recommended Matches
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* User Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      {user.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                      {!user.online && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">
                          {user.rating}
                        </span>
                        <span className="text-gray-400">
                          ({user.totalReviews})
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        user.online
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.online ? "Online" : "Offline"}
                    </span>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">
                      Offers:
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {user.skillsOffered
                        .slice(0, 3)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded-lg text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      Wants to learn:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsRequested
                        .slice(0, 2)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStartChat(user.id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Start Chat
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigate(`/profile/${user.id}`)
                      }
                      className="px-4 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-blue-50 transition-all"
                    >
                      View Profile
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}