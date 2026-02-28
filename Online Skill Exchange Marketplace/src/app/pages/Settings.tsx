import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Globe,
  Sparkles,
} from "lucide-react";
import { currentUser } from "../data/mockData";

export function Settings() {
  const navigate = useNavigate();
  const [name, setName] = useState(currentUser.name);
  const [location, setLocation] = useState(currentUser.location);
  const [bio, setBio] = useState(currentUser.bio);
  const [availability, setAvailability] = useState(currentUser.availability);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [matchNotifications, setMatchNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
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
                Settings
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option>Mornings</option>
                <option>Afternoons</option>
                <option>Evenings</option>
                <option>Weekends</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  emailNotifications ? "bg-[#2563EB]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    emailNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-medium text-gray-900">Message Notifications</h3>
                <p className="text-sm text-gray-500">Get notified of new messages</p>
              </div>
              <button
                onClick={() => setMessageNotifications(!messageNotifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  messageNotifications ? "bg-[#2563EB]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    messageNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="font-medium text-gray-900">Match Notifications</h3>
                <p className="text-sm text-gray-500">Get notified of new skill matches</p>
              </div>
              <button
                onClick={() => setMatchNotifications(!matchNotifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  matchNotifications ? "bg-[#2563EB]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    matchNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h2 className="text-xl font-semibold">Privacy & Security</h2>
          </div>

          <div className="space-y-3">
            <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">Update your password</p>
            </button>
            <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">Privacy Settings</h3>
              <p className="text-sm text-gray-500">Control who can see your profile</p>
            </button>
            <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
              <h3 className="font-medium text-gray-900">Blocked Users</h3>
              <p className="text-sm text-gray-500">Manage blocked users</p>
            </button>
          </div>
        </motion.div>

        {/* Language & Region */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#2563EB]" />
            </div>
            <h2 className="text-xl font-semibold">Language & Region</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Zone
              </label>
              <select className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end gap-3"
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
