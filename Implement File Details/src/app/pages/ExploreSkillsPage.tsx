import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { usePresence } from '../contexts/PresenceContext';
import { mockUsers } from '../data/mockUsers';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { MessageSquare, User, Star, MapPin, Search, ArrowLeft } from 'lucide-react';

export const ExploreSkillsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { onlineUsers } = usePresence();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOnline, setFilterOnline] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const filteredUsers = mockUsers.filter(user => {
    if (user.id === currentUser.id) return false;
    
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesOnline = !filterOnline || onlineUsers[user.id];
    
    return matchesSearch && matchesOnline;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Explore Skills</h1>
            <p className="text-gray-600">Find your perfect skill exchange partner</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, location, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={filterOnline ? "default" : "outline"}
              onClick={() => setFilterOnline(!filterOnline)}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${filterOnline ? 'bg-white' : 'bg-green-500'}`}></span>
              Online Only
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <Card key={user.id} className="p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{user.name}</h3>
                    {onlineUsers[user.id] && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-300">
                        🟢 Online
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {user.rating.toFixed(1)} Rating
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">Offers:</div>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.map((skill, index) => (
                    <Badge key={index} className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-1">Wants to learn:</div>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {user.bio}
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate('/profile/' + user.id)}
                >
                  <User className="w-3 h-3 mr-1" />
                  Profile
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

        {filteredUsers.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500 mb-2">No users found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filters
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
