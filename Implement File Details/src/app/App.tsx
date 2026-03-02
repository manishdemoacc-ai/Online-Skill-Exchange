import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { PresenceProvider } from './contexts/PresenceContext';

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <PresenceProvider>
          <RouterProvider router={router} />
        </PresenceProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
