import { User } from '../types';

export const getMatchedUsers = (currentUser: User, allUsers: User[]): User[] => {
  return allUsers.filter(user => {
    if (user.id === currentUser.id) return false;

    // Check if current user offers what other user wants
    const offersMatch = currentUser.skillsOffered.some(skill =>
      user.skillsWanted.some(wanted => 
        wanted.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(wanted.toLowerCase())
      )
    );

    // Check if other user offers what current user wants
    const wantsMatch = currentUser.skillsWanted.some(skill =>
      user.skillsOffered.some(offered =>
        offered.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(offered.toLowerCase())
      )
    );

    return offersMatch || wantsMatch;
  });
};

export const getMatchScore = (currentUser: User, otherUser: User): number => {
  let score = 0;

  currentUser.skillsOffered.forEach(skill => {
    otherUser.skillsWanted.forEach(wanted => {
      if (wanted.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(wanted.toLowerCase())) {
        score += 2;
      }
    });
  });

  currentUser.skillsWanted.forEach(skill => {
    otherUser.skillsOffered.forEach(offered => {
      if (offered.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(offered.toLowerCase())) {
        score += 2;
      }
    });
  });

  return score;
};
