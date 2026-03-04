import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Skill {
  id: string;
  userId: string;
  name: string;
  type: 'teach' | 'learn';
  category?: string;
}

interface SkillsContextType {
  skills: Skill[];
  addSkill: (name: string, type: 'teach' | 'learn', category?: string) => void;
  removeSkill: (id: string) => void;
  getUserSkills: (userId: string) => Skill[];
  getTeachingSkills: (userId: string) => Skill[];
  getLearningSkills: (userId: string) => Skill[];
  findMatches: (userId: string) => Array<{ user: any; matchedSkills: string[] }>;
}

const SkillsContext = createContext<SkillsContextType | undefined>(undefined);

export const useSkills = () => {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillsProvider');
  }
  return context;
};

export const SkillsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load skills from localStorage
    const savedSkills = JSON.parse(localStorage.getItem('skills') || '[]');
    setSkills(savedSkills);
  }, []);

  const addSkill = (name: string, type: 'teach' | 'learn', category?: string) => {
    if (!user) return;

    const newSkill: Skill = {
      id: Date.now().toString(),
      userId: user.id,
      name,
      type,
      category,
    };

    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
  };

  const removeSkill = (id: string) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
  };

  const getUserSkills = (userId: string) => {
    return skills.filter(skill => skill.userId === userId);
  };

  const getTeachingSkills = (userId: string) => {
    return skills.filter(skill => skill.userId === userId && skill.type === 'teach');
  };

  const getLearningSkills = (userId: string) => {
    return skills.filter(skill => skill.userId === userId && skill.type === 'learn');
  };

  const findMatches = (userId: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const myTeachingSkills = getTeachingSkills(userId);
    const myLearningSkills = getLearningSkills(userId);

    const matches: Array<{ user: any; matchedSkills: string[] }> = [];

    users.forEach((otherUser: any) => {
      if (otherUser.id === userId) return;

      const theirTeachingSkills = getTeachingSkills(otherUser.id);
      const theirLearningSkills = getLearningSkills(otherUser.id);

      const matchedSkills: string[] = [];

      // Check if they teach what I want to learn
      myLearningSkills.forEach(mySkill => {
        if (theirTeachingSkills.some(theirSkill => 
          theirSkill.name.toLowerCase() === mySkill.name.toLowerCase()
        )) {
          matchedSkills.push(mySkill.name);
        }
      });

      // Check if I teach what they want to learn
      theirLearningSkills.forEach(theirSkill => {
        if (myTeachingSkills.some(mySkill => 
          mySkill.name.toLowerCase() === theirSkill.name.toLowerCase()
        )) {
          if (!matchedSkills.includes(theirSkill.name)) {
            matchedSkills.push(theirSkill.name);
          }
        }
      });

      if (matchedSkills.length > 0) {
        matches.push({ user: otherUser, matchedSkills });
      }
    });

    return matches;
  };

  return (
    <SkillsContext.Provider
      value={{
        skills,
        addSkill,
        removeSkill,
        getUserSkills,
        getTeachingSkills,
        getLearningSkills,
        findMatches,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
