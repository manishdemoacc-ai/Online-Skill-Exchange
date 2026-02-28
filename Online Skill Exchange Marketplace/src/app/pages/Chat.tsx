import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Smile,
  Paperclip,
  Video,
  MoreVertical,
  ArrowLeft,
  Search,
  Sparkles,
} from "lucide-react";
import { users, currentUser, mockMessages, Message } from "../data/mockData";

export function Chat() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState<string | null>(userId || null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const conversationUsers = users.filter(
    (user) => user.id !== currentUser.id && messages[user.id]
  );

  const selectedUserData = users.find((user) => user.id === selectedUser);
  const currentMessages = selectedUser ? messages[selectedUser] || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  useEffect(() => {
    if (userId && users.find((u) => u.id === userId)) {
      setSelectedUser(userId);
    }
  }, [userId]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedUser,
      content: messageInput,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), newMessage],
    }));

    setMessageInput("");
    setIsTyping(true);

    // Simulate typing and auto-reply after 2 seconds
    setTimeout(() => {
      setIsTyping(false);
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: selectedUser,
        receiverId: currentUser.id,
        content: "Thanks for your message! I'll get back to you soon.",
        timestamp: new Date().toISOString(),
        read: false,
      };
      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), autoReply],
      }));
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredUsers = conversationUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Left Panel - Conversations List */}
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="mb-4">No conversations yet</p>
              <button
                onClick={() => navigate("/explore")}
                className="px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg transition-all"
              >
                Find People
              </button>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <motion.button
                key={user.id}
                whileHover={{ backgroundColor: "#f8fafc" }}
                onClick={() => {
                  setSelectedUser(user.id);
                  navigate(`/chat/${user.id}`);
                }}
                className={`w-full p-4 flex items-center gap-4 border-b border-gray-100 transition-all ${
                  selectedUser === user.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                  />
                  {user.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <span className="text-xs text-gray-500">{user.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* Right Panel - Chat */}
      {selectedUser && selectedUserData ? (
        <div className="flex-1 flex flex-col bg-white hidden md:flex">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={selectedUserData.avatar}
                  alt={selectedUserData.name}
                  className="w-12 h-12 rounded-2xl object-cover"
                />
                {selectedUserData.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{selectedUserData.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedUserData.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Video className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <AnimatePresence>
              {currentMessages.map((message, index) => {
                const isCurrentUser = message.senderId === currentUser.id;
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-md ${isCurrentUser ? "order-2" : "order-1"}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          isCurrentUser
                            ? "bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-br-sm"
                            : "bg-white text-gray-900 rounded-bl-sm shadow-md"
                        }`}
                      >
                        <p className="break-words">{message.content}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${
                          isCurrentUser ? "text-right" : "text-left"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200 bg-white">
            <div className="flex items-end gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Smile className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Paperclip className="w-5 h-5 text-gray-600" />
              </motion.button>
              <div className="flex-1">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="p-3 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Select a conversation
            </h2>
            <p className="text-gray-500">
              Choose a conversation from the list to start chatting
            </p>
          </div>
        </div>
      )}

      {/* Mobile Chat View */}
      {selectedUser && selectedUserData && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedUser(null);
                navigate("/chat");
              }}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={selectedUserData.avatar}
                alt={selectedUserData.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              {selectedUserData.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">{selectedUserData.name}</h2>
              <p className="text-xs text-gray-500">
                {selectedUserData.online ? "Online" : "Offline"}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {currentMessages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.id;
              return (
                <div
                  key={message.id}
                  className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${isCurrentUser ? "order-2" : "order-1"}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-br-sm"
                          : "bg-white text-gray-900 rounded-bl-sm shadow-md"
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 ${
                        isCurrentUser ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input - Sticky at bottom */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="p-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A8A] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
