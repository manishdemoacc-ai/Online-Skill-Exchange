// Seed initial demo data
export const seedDemoData = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Only seed if no users exist
  if (users.length === 0) {
    const demoUsers = [
      {
        id: '1',
        username: 'Praveena',
        email: 'praveena@example.com',
        password: 'password123',
        bio: 'Passionate about teaching web development and learning graphic design.',
        theme: 'light',
      },
      {
        id: '2',
        username: 'Rishi Prakash',
        email: 'rishi@example.com',
        password: 'password123',
        bio: 'Professional graphic designer looking to learn Python programming.',
        theme: 'light',
      },
      {
        id: '3',
        username: 'Shiny',
        email: 'shiny@example.com',
        password: 'password123',
        bio: 'Data scientist who loves teaching Python and wants to learn digital marketing.',
        theme: 'light',
      },
      {
        id: '4',
        username: 'Aji Sharmila',
        email: 'aji@example.com',
        password: 'password123',
        bio: 'Marketing specialist interested in learning React development.',
        theme: 'light',
      },
      {
        id: '5',
        username: 'Bagyalakshmi',
        email: 'bagya@example.com',
        password: 'password123',
        bio: 'UI/UX designer teaching design principles and learning backend development.',
        theme: 'light',
      },
    ];

    localStorage.setItem('users', JSON.stringify(demoUsers));

    // Seed skills
    const demoSkills = [
      // Praveena's skills
      { id: 's1', userId: '1', name: 'React Development', type: 'teach', category: 'Programming' },
      { id: 's2', userId: '1', name: 'JavaScript', type: 'teach', category: 'Programming' },
      { id: 's3', userId: '1', name: 'Graphic Design', type: 'learn', category: 'Design' },
      
      // Rishi's skills
      { id: 's4', userId: '2', name: 'Graphic Design', type: 'teach', category: 'Design' },
      { id: 's5', userId: '2', name: 'Adobe Photoshop', type: 'teach', category: 'Design' },
      { id: 's6', userId: '2', name: 'Python', type: 'learn', category: 'Programming' },
      
      // Shiny's skills
      { id: 's7', userId: '3', name: 'Python', type: 'teach', category: 'Programming' },
      { id: 's8', userId: '3', name: 'Data Science', type: 'teach', category: 'Data' },
      { id: 's9', userId: '3', name: 'Digital Marketing', type: 'learn', category: 'Marketing' },
      
      // Aji's skills
      { id: 's10', userId: '4', name: 'Digital Marketing', type: 'teach', category: 'Marketing' },
      { id: 's11', userId: '4', name: 'SEO', type: 'teach', category: 'Marketing' },
      { id: 's12', userId: '4', name: 'React Development', type: 'learn', category: 'Programming' },
      
      // Bagyalakshmi's skills
      { id: 's13', userId: '5', name: 'UI/UX Design', type: 'teach', category: 'Design' },
      { id: 's14', userId: '5', name: 'Figma', type: 'teach', category: 'Design' },
      { id: 's15', userId: '5', name: 'Node.js', type: 'learn', category: 'Programming' },
    ];

    localStorage.setItem('skills', JSON.stringify(demoSkills));

    // Seed some demo messages
    const demoMessages = [
      {
        id: 'm1',
        senderId: '2',
        receiverId: '1',
        content: 'Hi Praveena! I saw you want to learn Graphic Design. I can help you with that!',
        timestamp: Date.now() - 3600000,
        read: false,
      },
      {
        id: 'm2',
        senderId: '3',
        receiverId: '4',
        content: 'Hello Aji! Would you be interested in a skill exchange?',
        timestamp: Date.now() - 7200000,
        read: false,
      },
    ];

    localStorage.setItem('messages', JSON.stringify(demoMessages));
  }
};
