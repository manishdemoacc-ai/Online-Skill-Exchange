import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { SkillsProvider } from './contexts/SkillsContext';
import { ChatProvider } from './contexts/ChatContext';
import { Toaster } from './components/ui/sonner';
import { seedDemoData } from './utils/seedData';

export default function App() {
  useEffect(() => {
    // Seed demo data on first load
    seedDemoData();
  }, []);

  return (
    <AuthProvider>
      <SkillsProvider>
        <ChatProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </ChatProvider>
      </SkillsProvider>
    </AuthProvider>
  );
}
