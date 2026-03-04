import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { Navbar } from '../components/Navbar';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { MessageSquare, Send, Search } from 'lucide-react';
import { useSearchParams } from 'react-router';

export const Messages = () => {
  const { user } = useAuth();
  const { getConversations, getConversation, sendMessage, getUnreadCount, markAsRead } = useChat();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();

  const conversations = getConversations();
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Auto-select user from query params
  useEffect(() => {
    const userParam = searchParams.get('user');
    if (userParam) {
      setSelectedUserId(userParam);
    }
  }, [searchParams]);

  const selectedUser = selectedUserId ? users.find((u: any) => u.id === selectedUserId) : null;
  const currentConversation = selectedUserId ? getConversation(selectedUserId) : [];

  useEffect(() => {
    if (selectedUserId) {
      markAsRead(selectedUserId);
    }
  }, [selectedUserId, currentConversation.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUserId) return;

    sendMessage(selectedUserId, messageText.trim());
    setMessageText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredUsers = users
    .filter((u: any) => u.id !== user?.id)
    .filter((u: any) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getUserById = (userId: string) => {
    return users.find((u: any) => u.id === userId);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="w-80 flex-shrink-0">
            <CardContent className="p-4 h-full flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {searchQuery ? (
                    // Show all users when searching
                    filteredUsers.map((otherUser: any) => {
                      const unread = getUnreadCount(otherUser.id);
                      return (
                        <button
                          key={otherUser.id}
                          onClick={() => {
                            setSelectedUserId(otherUser.id);
                            setSearchQuery('');
                          }}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            selectedUserId === otherUser.id
                              ? 'bg-blue-100 dark:bg-blue-900/30'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {otherUser.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {otherUser.username}
                            </p>
                          </div>
                          {unread > 0 && (
                            <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {unread}
                            </div>
                          )}
                        </button>
                      );
                    })
                  ) : conversations.length > 0 ? (
                    // Show conversations
                    conversations.map(({ userId, lastMessage }) => {
                      const otherUser = getUserById(userId);
                      if (!otherUser) return null;
                      const unread = getUnreadCount(userId);

                      return (
                        <button
                          key={userId}
                          onClick={() => setSelectedUserId(userId)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            selectedUserId === userId
                              ? 'bg-blue-100 dark:bg-blue-900/30'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {otherUser.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 text-left min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {otherUser.username}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {lastMessage.senderId === user?.id ? 'You: ' : ''}
                              {lastMessage.content}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTime(lastMessage.timestamp)}
                            </span>
                            {unread > 0 && (
                              <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {unread}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No conversations yet
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                        Search for users to start chatting
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {selectedUser.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {selectedUser.username}
                      </h3>
                      {selectedUser.bio && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedUser.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {currentConversation.length > 0 ? (
                      currentConversation.map((message) => {
                        const isSentByMe = message.senderId === user?.id;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isSentByMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isSentByMe
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                              }`}
                            >
                              <p className="break-words">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isSentByMe ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-12">
                        <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                        <p className="text-gray-500 dark:text-gray-400">
                          No messages yet. Start a conversation!
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a user from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
