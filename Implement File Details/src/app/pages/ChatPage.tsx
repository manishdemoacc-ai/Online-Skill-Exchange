import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { usePresence } from '../contexts/PresenceContext';
import { mockUsers } from '../data/mockUsers';
import { formatMessageTime, formatChatTime } from '../utils/dateUtils';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Send, User } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const { conversations, sendMessage, getMessagesWithUser, markAsRead } = useChat();
  const { onlineUsers, typingUsers, setTyping } = usePresence();
  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const userId = searchParams.get('user');
    if (userId) {
      setSelectedUserId(userId);
    } else if (conversations.length > 0) {
      const otherUserId = conversations[0].participants.find(id => id !== currentUser?.id);
      if (otherUserId) setSelectedUserId(otherUserId);
    }
  }, [searchParams, conversations, currentUser]);

  useEffect(() => {
    if (selectedUserId && currentUser) {
      markAsRead(selectedUserId);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedUserId, currentUser, markAsRead]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, []);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const selectedUser = selectedUserId ? mockUsers.find(u => u.id === selectedUserId) : null;
  const messages = selectedUserId ? getMessagesWithUser(selectedUserId) : [];

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedUserId) return;
    
    sendMessage(selectedUserId, messageInput.trim());
    setMessageInput('');
    
    // Clear typing timeout when sending
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    setTyping(currentUser.id, false);
    
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTyping = (value: string) => {
    setMessageInput(value);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    
    if (value.trim()) {
      setTyping(currentUser.id, true);
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(currentUser.id, false);
        typingTimeoutRef.current = null;
      }, 1000);
    } else {
      setTyping(currentUser.id, false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="p-4 overflow-hidden flex flex-col">
            <h3 className="font-semibold mb-4">Conversations</h3>
            <ScrollArea className="flex-1">
              <div className="space-y-2">
                {conversations.map(conv => {
                  const otherUserId = conv.participants.find(id => id !== currentUser.id);
                  const otherUser = mockUsers.find(u => u.id === otherUserId);
                  if (!otherUser) return null;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedUserId(otherUser.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedUserId === otherUser.id
                          ? 'bg-blue-50 border-2 border-blue-300'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {otherUser.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-medium truncate">{otherUser.name}</p>
                              {onlineUsers[otherUser.id] && (
                                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {conv.lastMessage}
                            </p>
                          </div>
                        </div>
                        {conv.unreadCount > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {formatMessageTime(conv.lastMessageTime)}
                      </p>
                    </div>
                  );
                })}

                {conversations.length === 0 && (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    <p className="mb-4">No conversations yet</p>
                    <Button size="sm" onClick={() => navigate('/explore')}>
                      Find Users to Chat
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Window */}
          <Card className="md:col-span-2 flex flex-col overflow-hidden">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{selectedUser.name}</p>
                        {onlineUsers[selectedUser.id] && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            🟢 Online
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{selectedUser.location}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/profile/' + selectedUser.id)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map(msg => {
                      const isCurrentUser = msg.senderId === currentUser.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isCurrentUser
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                              }`}
                            >
                              {formatChatTime(msg.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {typingUsers[selectedUser.id] && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                          <p className="text-sm text-gray-500">typing...</p>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => handleTyping(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="mb-2">Select a conversation to start chatting</p>
                  <p className="text-sm text-gray-400">or</p>
                  <Button
                    className="mt-4"
                    onClick={() => navigate('/explore')}
                  >
                    Find Users to Chat
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};