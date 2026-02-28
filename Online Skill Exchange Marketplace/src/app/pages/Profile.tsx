import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  Clock,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { users, currentUser, reviews } from "../data/mockData";

export function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">User not found</h2>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg transition-all"
          >
            Back to Explore
          </button>
        </div>
      </div>
    );
  }

  const userReviews = reviews.filter((r) => r.userId === userId);
  const isCurrentUser = user.id === currentUser.id;

  const handleScheduleSession = () => {
    setShowScheduleModal(true);
  };

  const handleConfirmSchedule = () => {
    setShowScheduleModal(false);
    navigate(`/chat/${user.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#2563EB] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A]"></div>

          <div className="px-8 pb-8">
            {/* Profile Info */}
            <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                {user.online && (
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                )}
              </div>
              <div className="flex-1 mt-16 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{user.rating}</span>
                        <span className="text-gray-400">({user.totalReviews} reviews)</span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          user.online
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.online ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                  {!isCurrentUser && (
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/chat/${user.id}`)}
                        className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Start Chat
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleScheduleSession}
                        className="px-6 py-3 border-2 border-[#2563EB] text-[#2563EB] rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2"
                      >
                        <Calendar className="w-5 h-5" />
                        Schedule Session
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Experience & Availability */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-sm font-medium text-[#2563EB]">
                      {user.experience} Level
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
                    <Clock className="w-4 h-4 text-purple-700" />
                    <span className="text-sm font-medium text-purple-700">
                      {user.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{user.bio}</p>
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-50 text-[#2563EB] rounded-xl font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Skills Requested</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsRequested.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">
            Ratings & Reviews ({userReviews.length})
          </h2>

          {userReviews.length > 0 ? (
            <div className="space-y-6">
              {userReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="pb-6 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No reviews yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Schedule Session Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] bg-clip-text text-transparent">
              Schedule a Session
            </h2>
            <p className="text-gray-600 mb-6">
              Send a message to {user.name} to schedule your skill exchange session
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Add a message to your session request..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSchedule}
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
