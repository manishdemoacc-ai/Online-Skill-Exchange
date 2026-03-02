export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  bio: string;
  profileImage?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface OnlineStatus {
  [userId: string]: boolean;
}

export interface TypingStatus {
  [userId: string]: boolean;
}
