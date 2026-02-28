import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { users, currentUser, skillCategories, experienceLevels, availabilityOptions } from "../data/mockData";

export function ExploreSkills() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Skills");
  const [selectedExperience, setSelectedExperience] = useState("All Levels");
  const [selectedAvailability, setSelectedAvailability] = useState("All Times");
  const [showFilters, setShowFilters] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const allUsers = users.filter((user) => user.id !== currentUser.id);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All Skills" ||
      user.skillsOffered.some((skill) => {
        const category = selectedCategory.toLowerCase();
        const skillLower = skill.toLowerCase();
        if (category.includes("web")) return skillLower.includes("react") || skillLower.includes("node") || skillLower.includes("javascript") || skillLower.includes("typescript") || skillLower.includes("vue");
        if (category.includes("mobile")) return skillLower.includes("native") || skillLower.includes("flutter") || skillLower.includes("ios") || skillLower.includes("android");
        if (category.includes("design")) return skillLower.includes("design") || skillLower.includes("figma") || skillLower.includes("ui") || skillLower.includes("ux");
        if (category.includes("data")) return skillLower.includes("python") || skillLower.includes("machine") || skillLower.includes("data");
        if (category.includes("marketing")) return skillLower.includes("marketing") || skillLower.includes("seo") || skillLower.includes("content");
        if (category.includes("cloud")) return skillLower.includes("aws") || skillLower.includes("azure") || skillLower.includes("devops") || skillLower.includes("docker");
        if (category.includes("content")) return skillLower.includes("writing") || skillLower.includes("copy") || skillLower.includes("video");
        return false;
      });

    const matchesExperience =
      selectedExperience === "All Levels" || user.experience === selectedExperience;

    const matchesAvailability =
      selectedAvailability === "All Times" || user.availability === selectedAvailability;

    return matchesSearch && matchesCategory && matchesExperience && matchesAvailability;
  });

  const handleRequestExchange = (userId: string) => {
    setSelectedUserId(userId);
    setShowRequestModal(true);
  };

  const handleConfirmRequest = () => {
    setShowRequestModal(false);
    // Navigate to chat with the selected user
    if (selectedUserId) {
      navigate(`/chat/${selectedUserId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
                Explore Skills
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for skills or people..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-2xl flex items-center gap-2 transition-all ${
                showFilters
                  ? "bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                >
                  {skillCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                >
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-[#2563EB]">{filteredUsers.length}</span> matches
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    {user.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{user.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <MapPin className="w-3 h-3" />
                      {user.location}
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded-lg text-xs">
                      {user.experience}
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

              {/* Bio */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.bio}</p>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Offers:</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {user.skillsOffered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-50 text-[#2563EB] rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-2">Wants to learn:</p>
                <div className="flex flex-wrap gap-1">
                  {user.skillsRequested.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 pb-4 border-b border-gray-100">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{user.rating}</span>
                <span className="text-gray-400 text-sm">({user.totalReviews} reviews)</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="flex-1 px-4 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-blue-50 transition-all"
                >
                  View Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleRequestExchange(user.id)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  Request Exchange
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Skills");
                setSelectedExperience("All Levels");
                setSelectedAvailability("All Times");
              }}
              className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Request Exchange Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
              Request Skill Exchange
            </h2>
            <p className="text-gray-600 mb-6">
              Send a message to start exchanging skills with{" "}
              {users.find((u) => u.id === selectedUserId)?.name}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRequest}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Send Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
