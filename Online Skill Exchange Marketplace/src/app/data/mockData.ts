export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skillsOffered: string[];
  skillsRequested: string[];
  rating: number;
  totalReviews: number;
  online: boolean;
  location: string;
  experience: string;
  availability: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const currentUserId = "user-1";

export const users: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Full-stack developer passionate about teaching React and learning UI/UX design. Love helping others grow their coding skills.",
    skillsOffered: ["React", "Node.js", "JavaScript", "TypeScript"],
    skillsRequested: ["UI/UX Design", "Figma", "Graphic Design"],
    rating: 4.8,
    totalReviews: 24,
    online: true,
    location: "San Francisco, CA",
    experience: "Senior",
    availability: "Evenings & Weekends",
  },
  {
    id: "user-2",
    name: "Sarah Martinez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "UI/UX Designer with 8 years of experience. I can help you master Figma and design principles in exchange for web development skills.",
    skillsOffered: ["UI/UX Design", "Figma", "Adobe XD", "Prototyping"],
    skillsRequested: ["React", "JavaScript", "Frontend Development"],
    rating: 4.9,
    totalReviews: 31,
    online: true,
    location: "New York, NY",
    experience: "Expert",
    availability: "Flexible",
    lastMessage: "That sounds great! When would you like to start?",
    lastMessageTime: "2m ago",
  },
  {
    id: "user-3",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Data scientist and Python expert. Looking to learn mobile development while sharing my machine learning expertise.",
    skillsOffered: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
    skillsRequested: ["React Native", "Flutter", "Mobile Development"],
    rating: 4.7,
    totalReviews: 18,
    online: false,
    location: "Seattle, WA",
    experience: "Senior",
    availability: "Weekends",
    lastMessage: "I'll prepare some examples for our next session",
    lastMessageTime: "1h ago",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Marketing specialist who wants to learn coding. I can teach you digital marketing, SEO, and content strategy.",
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy", "Social Media"],
    skillsRequested: ["JavaScript", "Web Development", "Python"],
    rating: 4.6,
    totalReviews: 15,
    online: true,
    location: "Austin, TX",
    experience: "Intermediate",
    availability: "Mornings",
    lastMessage: "Thanks for the SEO tips!",
    lastMessageTime: "3h ago",
  },
  {
    id: "user-5",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Mobile app developer specializing in React Native. Happy to teach mobile development in exchange for backend expertise.",
    skillsOffered: ["React Native", "Flutter", "iOS", "Android"],
    skillsRequested: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    rating: 4.8,
    totalReviews: 22,
    online: true,
    location: "Los Angeles, CA",
    experience: "Senior",
    availability: "Evenings",
  },
  {
    id: "user-6",
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Graphic designer and illustrator. I love creating beautiful visuals and want to learn animation in return.",
    skillsOffered: ["Graphic Design", "Illustration", "Photoshop", "Branding"],
    skillsRequested: ["After Effects", "3D Animation", "Motion Graphics"],
    rating: 4.9,
    totalReviews: 28,
    online: false,
    location: "Chicago, IL",
    experience: "Expert",
    availability: "Flexible",
  },
  {
    id: "user-7",
    name: "Ryan Cooper",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    bio: "Cloud architect with AWS and Azure expertise. Looking to improve my frontend skills through skill exchange.",
    skillsOffered: ["AWS", "Azure", "DevOps", "Kubernetes"],
    skillsRequested: ["React", "Vue.js", "Frontend Architecture"],
    rating: 4.7,
    totalReviews: 19,
    online: true,
    location: "Boston, MA",
    experience: "Expert",
    availability: "Weekends",
  },
  {
    id: "user-8",
    name: "Olivia Brown",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop",
    bio: "Content writer and copywriter. I can help you with writing and storytelling in exchange for video editing skills.",
    skillsOffered: ["Copywriting", "Content Writing", "Storytelling", "Blogging"],
    skillsRequested: ["Video Editing", "Premiere Pro", "Final Cut Pro"],
    rating: 4.5,
    totalReviews: 12,
    online: true,
    location: "Denver, CO",
    experience: "Intermediate",
    availability: "Afternoons",
  },
];

export const currentUser = users[0];

export const mockMessages: { [key: string]: Message[] } = {
  "user-2": [
    {
      id: "msg-1",
      senderId: "user-2",
      receiverId: "user-1",
      content: "Hi Alex! I saw your profile and I'm interested in exchanging skills. I can teach you UI/UX design and Figma if you can help me with React.",
      timestamp: "2026-02-28T10:30:00",
      read: true,
    },
    {
      id: "msg-2",
      senderId: "user-1",
      receiverId: "user-2",
      content: "Hi Sarah! That sounds perfect! I've been wanting to improve my design skills. When would be a good time for you?",
      timestamp: "2026-02-28T10:35:00",
      read: true,
    },
    {
      id: "msg-3",
      senderId: "user-2",
      receiverId: "user-1",
      content: "How about we start with a session this weekend? We could do 1 hour on Figma and 1 hour on React.",
      timestamp: "2026-02-28T10:40:00",
      read: true,
    },
    {
      id: "msg-4",
      senderId: "user-1",
      receiverId: "user-2",
      content: "That sounds great! When would you like to start?",
      timestamp: "2026-02-28T10:45:00",
      read: true,
    },
  ],
  "user-3": [
    {
      id: "msg-5",
      senderId: "user-1",
      receiverId: "user-3",
      content: "Hey Michael! I noticed you're looking to learn mobile development. I can help with React Native if you're interested.",
      timestamp: "2026-02-28T09:00:00",
      read: true,
    },
    {
      id: "msg-6",
      senderId: "user-3",
      receiverId: "user-1",
      content: "That would be amazing! I can teach you Python and machine learning basics in return.",
      timestamp: "2026-02-28T09:15:00",
      read: true,
    },
    {
      id: "msg-7",
      senderId: "user-3",
      receiverId: "user-1",
      content: "I'll prepare some examples for our next session",
      timestamp: "2026-02-28T09:30:00",
      read: true,
    },
  ],
  "user-4": [
    {
      id: "msg-8",
      senderId: "user-4",
      receiverId: "user-1",
      content: "Hi! I'd love to learn JavaScript from you. In exchange, I can help you with SEO and digital marketing strategies.",
      timestamp: "2026-02-28T08:00:00",
      read: true,
    },
    {
      id: "msg-9",
      senderId: "user-1",
      receiverId: "user-4",
      content: "Sounds like a great exchange! I actually need help with SEO for my portfolio site.",
      timestamp: "2026-02-28T08:10:00",
      read: true,
    },
    {
      id: "msg-10",
      senderId: "user-4",
      receiverId: "user-1",
      content: "Thanks for the SEO tips!",
      timestamp: "2026-02-28T08:20:00",
      read: true,
    },
  ],
};

export const reviews: Review[] = [
  {
    id: "review-1",
    userId: "user-2",
    userName: "Sarah Martinez",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Alex is an amazing teacher! Very patient and explains React concepts clearly. Highly recommend!",
    date: "2026-02-20",
  },
  {
    id: "review-2",
    userId: "user-3",
    userName: "Michael Chen",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    rating: 5,
    comment: "Great exchange! Alex helped me understand React Native fundamentals in just a few sessions.",
    date: "2026-02-15",
  },
  {
    id: "review-3",
    userId: "user-4",
    userName: "Emily Davis",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4,
    comment: "Very knowledgeable and friendly. Would definitely recommend for anyone wanting to learn web development!",
    date: "2026-02-10",
  },
];

export const skillCategories = [
  "All Skills",
  "Web Development",
  "Mobile Development",
  "Design",
  "Data Science",
  "Marketing",
  "Cloud & DevOps",
  "Content Creation",
  "Business",
];

export const experienceLevels = [
  "All Levels",
  "Beginner",
  "Intermediate",
  "Senior",
  "Expert",
];

export const availabilityOptions = [
  "All Times",
  "Mornings",
  "Afternoons",
  "Evenings",
  "Weekends",
  "Flexible",
];
