import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSkills } from '../contexts/SkillsContext';
import { Navbar } from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { User, Mail, BookOpen, GraduationCap, Save } from 'lucide-react';
import { toast } from 'sonner';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { getTeachingSkills, getLearningSkills } = useSkills();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');

  const teachingSkills = user ? getTeachingSkills(user.id) : [];
  const learningSkills = user ? getLearningSkills(user.id) : [];

  const handleSave = () => {
    updateProfile({ username, bio });
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setUsername(user.username);
                          setBio(user.bio);
                          setIsEditing(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {user.username}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 mb-3">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    {user.bio && (
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="mt-2"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Teaching Skills
              </CardTitle>
              <CardDescription>Skills you're sharing with others</CardDescription>
            </CardHeader>
            <CardContent>
              {teachingSkills.length > 0 ? (
                <div className="space-y-2">
                  {teachingSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      {skill.category && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">{skill.category}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No teaching skills added yet
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Learning Skills
              </CardTitle>
              <CardDescription>Skills you want to learn</CardDescription>
            </CardHeader>
            <CardContent>
              {learningSkills.length > 0 ? (
                <div className="space-y-2">
                  {learningSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      {skill.category && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">{skill.category}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No learning goals added yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your activity summary</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{teachingSkills.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Skills Teaching</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{learningSkills.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Skills Learning</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-3xl font-bold text-purple-600">
                  {teachingSkills.length + learningSkills.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Skills</p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-3xl font-bold text-orange-600">{user.theme === 'dark' ? '🌙' : '☀️'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user.theme === 'dark' ? 'Dark' : 'Light'} Mode
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
