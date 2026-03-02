import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import { usePresence } from '../contexts/PresenceContext';
import { mockUsers } from '../data/mockUsers';
import { getMatchedUsers } from '../utils/skillMatching';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MessageSquare, User, Star, MapPin, LogOut } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { conversations } = useChat();
  const { onlineUsers } = usePresence();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const matchedUsers = getMatchedUsers(currentUser, mockUsers);
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Welcome back, {currentUser.name.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-600">{currentUser.location}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/explore')}
            >
              Explore Skills
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/chat')}
              className="relative"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
              {totalUnread > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/profile/' + currentUser.id)}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/settings')}
            >
              Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-3xl font-bold mb-1">{matchedUsers.length}</div>
            <div className="text-sm opacity-90">Matched Users</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-3xl font-bold mb-1">{currentUser.skillsOffered.length}</div>
            <div className="text-sm opacity-90">Skills Offered</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-3xl font-bold mb-1">{currentUser.skillsWanted.length}</div>
            <div className="text-sm opacity-90">Skills Wanted</div>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="text-3xl font-bold mb-1">{currentUser.rating.toFixed(1)} ⭐</div>
            <div className="text-sm opacity-90">Your Rating</div>
          </Card>
        </div>

        {/* Your Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Skills You Offer</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.skillsOffered.map((skill, index) => (
                <Badge key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Skills You Want</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.skillsWanted.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Matched Users */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Skill Matches</h2>
            <Button variant="link" onClick={() => navigate('/explore')}>
              View All →
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedUsers.slice(0, 6).map(user => (
              <Card key={user.id} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      {onlineUsers[user.id] && (
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {user.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {user.rating.toFixed(1)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Offers:</div>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/profile/' + user.id)}
                  >
                    <User className="w-3 h-3 mr-1" />
                    View Profile
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700"
                    onClick={() => navigate('/chat?user=' + user.id)}
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Chat
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {matchedUsers.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-gray-500 mb-4">No matches found yet.</p>
              <p className="text-sm text-gray-400 mb-6">
                Add more skills to your profile or explore all users to find potential matches.
              </p>
              <Button onClick={() => navigate('/explore')}>
                Explore All Users
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
