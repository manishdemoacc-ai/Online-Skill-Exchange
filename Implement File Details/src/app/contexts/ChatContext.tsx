import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Message, Conversation } from '../types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  messages: Message[];
  conversations: Conversation[];
  sendMessage: (receiverId: string, message: string) => void;
  getMessagesWithUser: (userId: string) => Message[];
  getConversation: (userId: string) => Conversation | undefined;
  markAsRead: (userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const replyTimeoutRef = useRef<NodeJS.Timeout>();

  // Load messages from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      const parsed = JSON.parse(storedMessages);
      setMessages(parsed.map((m: any) => ({
        ...m,
        timestamp: new Date(m.timestamp)
      })));
    } else {
      // Initialize with some default messages
      const initialMessages: Message[] = [
        {
          id: '1',
          senderId: '2',
          receiverId: '1',
          message: 'Hi Praveena! I saw your profile. Would love to learn UI/UX from you!',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
        },
        {
          id: '2',
          senderId: '1',
          receiverId: '2',
          message: 'Hi Arjun! Sure, I can help you with UI/UX. Can you teach me Digital Marketing?',
          timestamp: new Date(Date.now() - 1000 * 60 * 25),
          read: true,
        },
        {
          id: '3',
          senderId: '2',
          receiverId: '1',
          message: 'Absolutely! That would be a great exchange. When shall we start?',
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          read: false,
        },
      ];
      setMessages(initialMessages);
      localStorage.setItem('messages', JSON.stringify(initialMessages));
    }
  }, []);

  // Update conversations when messages change
  useEffect(() => {
    if (!currentUser) return;

    const convMap = new Map<string, Conversation>();

    messages.forEach(msg => {
      const otherUserId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
      
      if (!convMap.has(otherUserId)) {
        convMap.set(otherUserId, {
          id: otherUserId,
          participants: [currentUser.id, otherUserId],
          lastMessage: msg.message,
          lastMessageTime: msg.timestamp,
          unreadCount: 0,
        });
      }

      const conv = convMap.get(otherUserId)!;
      if (msg.timestamp > conv.lastMessageTime) {
        conv.lastMessage = msg.message;
        conv.lastMessageTime = msg.timestamp;
      }

      if (msg.receiverId === currentUser.id && !msg.read) {
        conv.unreadCount++;
      }
    });

    setConversations(Array.from(convMap.values()).sort((a, b) => 
      b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    ));
  }, [messages, currentUser]);

  const sendMessage = (receiverId: string, message: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId,
      message,
      timestamp: new Date(),
      read: false,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));

    // Clear any existing timeout
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }

    // Simulate receiving a reply after 2-5 seconds
    replyTimeoutRef.current = setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: receiverId,
        receiverId: currentUser.id,
        message: getAutoReply(message),
        timestamp: new Date(),
        read: false,
      };
      
      setMessages(prev => {
        const withReply = [...prev, replyMessage];
        localStorage.setItem('messages', JSON.stringify(withReply));
        return withReply;
      });
    }, Math.random() * 3000 + 2000);
  };

  const getAutoReply = (originalMessage: string): string => {
    const replies = [
      "That sounds great! Let's discuss this further.",
      "I'm interested! When would you like to start?",
      "Thank you for reaching out! I'd love to exchange skills.",
      "Absolutely! This could be a great learning opportunity.",
      "I appreciate your message. Let's connect soon!",
      "That works for me. Looking forward to learning together!",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const getMessagesWithUser = (userId: string): Message[] => {
    if (!currentUser) return [];
    
    return messages
      .filter(m => 
        (m.senderId === currentUser.id && m.receiverId === userId) ||
        (m.senderId === userId && m.receiverId === currentUser.id)
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const getConversation = (userId: string): Conversation | undefined => {
    return conversations.find(c => c.participants.includes(userId));
  };

  const markAsRead = (userId: string) => {
    if (!currentUser) return;

    const updatedMessages = messages.map(m => {
      if (m.senderId === userId && m.receiverId === currentUser.id && !m.read) {
        return { ...m, read: true };
      }
      return m;
    });

    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ChatContext.Provider value={{
      messages,
      conversations,
      sendMessage,
      getMessagesWithUser,
      getConversation,
      markAsRead,
    }}>
      {children}
    </ChatContext.Provider>
  );
};