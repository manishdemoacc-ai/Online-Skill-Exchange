import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (receiverId: string, content: string) => void;
  getConversation: (userId: string) => Message[];
  getConversations: () => Array<{ userId: string; lastMessage: Message }>;
  getUnreadCount: (userId?: string) => number;
  markAsRead: (userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    setMessages(savedMessages);
  }, []);

  const sendMessage = (receiverId: string, content: string) => {
    if (!user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId,
      content,
      timestamp: Date.now(),
      read: false,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const getConversation = (userId: string) => {
    if (!user) return [];

    return messages
      .filter(
        msg =>
          (msg.senderId === user.id && msg.receiverId === userId) ||
          (msg.senderId === userId && msg.receiverId === user.id)
      )
      .sort((a, b) => a.timestamp - b.timestamp);
  };

  const getConversations = () => {
    if (!user) return [];

    const conversationMap = new Map<string, Message>();

    messages.forEach(msg => {
      if (msg.senderId === user.id || msg.receiverId === user.id) {
        const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
        const existing = conversationMap.get(otherUserId);
        
        if (!existing || msg.timestamp > existing.timestamp) {
          conversationMap.set(otherUserId, msg);
        }
      }
    });

    return Array.from(conversationMap.entries())
      .map(([userId, lastMessage]) => ({ userId, lastMessage }))
      .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
  };

  const getUnreadCount = (userId?: string) => {
    if (!user) return 0;

    if (userId) {
      return messages.filter(
        msg => msg.senderId === userId && msg.receiverId === user.id && !msg.read
      ).length;
    }

    return messages.filter(
      msg => msg.receiverId === user.id && !msg.read
    ).length;
  };

  const markAsRead = (userId: string) => {
    if (!user) return;

    const updatedMessages = messages.map(msg => {
      if (msg.senderId === userId && msg.receiverId === user.id && !msg.read) {
        return { ...msg, read: true };
      }
      return msg;
    });

    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        getConversation,
        getConversations,
        getUnreadCount,
        markAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
