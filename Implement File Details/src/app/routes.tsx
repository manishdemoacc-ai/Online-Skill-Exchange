import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExploreSkillsPage } from './pages/ExploreSkillsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ChatPage } from './pages/ChatPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
  },
  {
    path: '/explore',
    Component: ExploreSkillsPage,
  },
  {
    path: '/profile/:userId',
    Component: ProfilePage,
  },
  {
    path: '/chat',
    Component: ChatPage,
  },
  {
    path: '/settings',
    Component: SettingsPage,
  },
  {
    path: '*',
    Component: () => {
      window.location.href = '/';
      return null;
    },
  },
]);
