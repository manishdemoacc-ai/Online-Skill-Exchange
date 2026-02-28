import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Plus,
  X,
  Sparkles,
} from "lucide-react";
import { currentUser } from "../data/mockData";

export function MySkills() {
  const navigate = useNavigate();
  const [skillsOffered, setSkillsOffered] = useState(currentUser.skillsOffered);
  const [skillsRequested, setSkillsRequested] = useState(currentUser.skillsRequested);
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newRequestedSkill, setNewRequestedSkill] = useState("");

  const handleAddOfferedSkill = () => {
    if (newOfferedSkill.trim() && !skillsOffered.includes(newOfferedSkill.trim())) {
      setSkillsOffered([...skillsOffered, newOfferedSkill.trim()]);
      setNewOfferedSkill("");
    }
  };

  const handleAddRequestedSkill = () => {
    if (newRequestedSkill.trim() && !skillsRequested.includes(newRequestedSkill.trim())) {
      setSkillsRequested([...skillsRequested, newRequestedSkill.trim()]);
      setNewRequestedSkill("");
    }
  };

  const handleRemoveOfferedSkill = (skill: string) => {
    setSkillsOffered(skillsOffered.filter((s) => s !== skill));
  };

  const handleRemoveRequestedSkill = (skill: string) => {
    setSkillsRequested(skillsRequested.filter((s) => s !== skill));
  };

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
                My Skills
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Skills I Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Skills I Can Teach</h2>
          
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddOfferedSkill()}
                placeholder="Add a skill you can teach..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddOfferedSkill}
                className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add
              </motion.button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {skillsOffered.map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group px-4 py-2 bg-blue-50 text-[#2563EB] rounded-xl font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleRemoveOfferedSkill(skill)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-100 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {skillsOffered.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No skills added yet. Add skills you can teach others.</p>
            </div>
          )}
        </motion.div>

        {/* Skills I Want to Learn */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Skills I Want to Learn</h2>
          
          <div className="mb-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newRequestedSkill}
                onChange={(e) => setNewRequestedSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddRequestedSkill()}
                placeholder="Add a skill you want to learn..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddRequestedSkill}
                className="px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add
              </motion.button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {skillsRequested.map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group px-4 py-2 bg-purple-50 text-purple-700 rounded-xl font-medium flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => handleRemoveRequestedSkill(skill)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-purple-100 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {skillsRequested.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No skills added yet. Add skills you want to learn from others.</p>
            </div>
          )}
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            Save Changes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
