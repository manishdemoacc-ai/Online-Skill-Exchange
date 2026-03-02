import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { usePresence } from '../contexts/PresenceContext';
import { mockUsers } from '../data/mockUsers';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MessageSquare, ArrowLeft, MapPin, Star, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { onlineUsers } = usePresence();

  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">User not found</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === user.id;
  const isOnline = onlineUsers[user.id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex gap-6 items-start flex-1">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  {isOnline && (
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                      🟢 Online
                    </Badge>
                  )}
                  {isCurrentUser && (
                    <Badge variant="secondary">You</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {user.rating.toFixed(1)} Rating
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
              </div>
            </div>
            {!isCurrentUser && (
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700"
                onClick={() => navigate('/chat?user=' + user.id)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            )}
            {isCurrentUser && (
              <Button
                variant="outline"
                onClick={() => navigate('/settings')}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        </Card>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Skills Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((skill, index) => (
                <Badge key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  {skill}
                </Badge>
              ))}
            </div>
            {user.skillsOffered.length === 0 && (
              <p className="text-sm text-gray-500">No skills offered yet</p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-lg">📚</span>
              Skills Wanted
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, index) => (
                <Badge key={index} variant="outline" className="border-blue-300">
                  {skill}
                </Badge>
              ))}
            </div>
            {user.skillsWanted.length === 0 && (
              <p className="text-sm text-gray-500">No skills wanted yet</p>
            )}
          </Card>
        </div>

        {/* Match Analysis */}
        {!isCurrentUser && currentUser && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Skill Match Analysis</h3>
            <div className="space-y-4">
              {currentUser.skillsOffered.some(skill =>
                user.skillsWanted.some(wanted => 
                  wanted.toLowerCase().includes(skill.toLowerCase()) ||
                  skill.toLowerCase().includes(wanted.toLowerCase())
                )
              ) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-900 mb-2">
                    ✅ You can help {user.name.split(' ')[0]}!
                  </p>
                  <p className="text-sm text-green-700">
                    You offer skills that {user.name.split(' ')[0]} wants to learn.
                  </p>
                </div>
              )}
              
              {currentUser.skillsWanted.some(skill =>
                user.skillsOffered.some(offered =>
                  offered.toLowerCase().includes(skill.toLowerCase()) ||
                  skill.toLowerCase().includes(offered.toLowerCase())
                )
              ) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    ✅ {user.name.split(' ')[0]} can help you!
                  </p>
                  <p className="text-sm text-blue-700">
                    {user.name.split(' ')[0]} offers skills that you want to learn.
                  </p>
                </div>
              )}

              {!currentUser.skillsOffered.some(skill =>
                user.skillsWanted.some(wanted => 
                  wanted.toLowerCase().includes(skill.toLowerCase()) ||
                  skill.toLowerCase().includes(wanted.toLowerCase())
                )
              ) && !currentUser.skillsWanted.some(skill =>
                user.skillsOffered.some(offered =>
                  offered.toLowerCase().includes(skill.toLowerCase()) ||
                  skill.toLowerCase().includes(offered.toLowerCase())
                )
              ) && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    No direct skill match found, but you can still connect and learn from each other!
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
