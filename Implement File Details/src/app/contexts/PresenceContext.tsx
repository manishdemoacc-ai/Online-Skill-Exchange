import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { OnlineStatus, TypingStatus } from '../types';
import { useAuth } from './AuthContext';
import { mockUsers } from '../data/mockUsers';

interface PresenceContextType {
  onlineUsers: OnlineStatus;
  typingUsers: TypingStatus;
  setTyping: (userId: string, isTyping: boolean) => void;
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export const usePresence = () => {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error('usePresence must be used within PresenceProvider');
  }
  return context;
};

interface PresenceProviderProps {
  children: ReactNode;
}

export const PresenceProvider: React.FC<PresenceProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState<OnlineStatus>({});
  const [typingUsers, setTypingUsers] = useState<TypingStatus>({});
  const typingTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Simulate online presence
  useEffect(() => {
    if (!currentUser) return;

    // Set current user as online
    const initialOnline: OnlineStatus = {
      [currentUser.id]: true,
    };

    // Randomly set some other users as online
    mockUsers.forEach(user => {
      if (user.id !== currentUser.id) {
        initialOnline[user.id] = Math.random() > 0.5;
      }
    });

    setOnlineUsers(initialOnline);

    // Simulate users going online/offline
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const updated = { ...prev };
        const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        if (randomUser.id !== currentUser.id) {
          updated[randomUser.id] = !updated[randomUser.id];
        }
        return updated;
      });
    }, 15000); // Change status every 15 seconds

    return () => clearInterval(interval);
  }, [currentUser]);

  const setTyping = (userId: string, isTyping: boolean) => {
    setTypingUsers(prev => ({
      ...prev,
      [userId]: isTyping,
    }));

    // Clear existing timeout for this user
    const existingTimeout = typingTimeoutsRef.current.get(userId);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
      typingTimeoutsRef.current.delete(userId);
    }

    // Auto-clear typing indicator after 3 seconds
    if (isTyping) {
      const timeout = setTimeout(() => {
        setTypingUsers(prev => ({
          ...prev,
          [userId]: false,
        }));
        typingTimeoutsRef.current.delete(userId);
      }, 3000);
      typingTimeoutsRef.current.set(userId, timeout);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all typing timeouts
      typingTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      typingTimeoutsRef.current.clear();
    };
  }, []);

  return (
    <PresenceContext.Provider value={{ onlineUsers, typingUsers, setTyping }}>
      {children}
    </PresenceContext.Provider>
  );
};