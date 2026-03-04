import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSkills } from '../contexts/SkillsContext';
import { Navbar } from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { BookOpen, GraduationCap, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

export const Skills = () => {
  const { user } = useAuth();
  const { getTeachingSkills, getLearningSkills, addSkill, removeSkill, skills } = useSkills();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState<'teach' | 'learn'>('teach');
  const [category, setCategory] = useState('');

  const teachingSkills = user ? getTeachingSkills(user.id) : [];
  const learningSkills = user ? getLearningSkills(user.id) : [];

  // Get all users and their skills
  const users = JSON.parse(localStorage.getItem('users') || '[]').filter(
    (u: any) => u.id !== user?.id
  );

  const handleAddSkill = () => {
    if (!skillName.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    addSkill(skillName.trim(), skillType, category.trim() || undefined);
    toast.success(`Skill "${skillName}" added to ${skillType === 'teach' ? 'teaching' : 'learning'} list`);
    
    setSkillName('');
    setCategory('');
    setIsAddOpen(false);
  };

  const handleRemoveSkill = (id: string, name: string) => {
    removeSkill(id);
    toast.success(`Skill "${name}" removed`);
  };

  const getUserSkillsByType = (userId: string, type: 'teach' | 'learn') => {
    return skills.filter(s => s.userId === userId && s.type === type);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Skill Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your teaching and learning skills
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
                <DialogDescription>
                  Add a skill you can teach or want to learn
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    placeholder="e.g., Python Programming"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skillType">Type</Label>
                  <Select value={skillType} onValueChange={(value: 'teach' | 'learn') => setSkillType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teach">I can teach this</SelectItem>
                      <SelectItem value="learn">I want to learn this</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Programming, Design"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <Button onClick={handleAddSkill} className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Skill
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* My Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                I Can Teach ({teachingSkills.length})
              </CardTitle>
              <CardDescription>Skills you're offering to teach</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teachingSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      {skill.category && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">{skill.category}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(skill.id, skill.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {teachingSkills.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No teaching skills added yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                I Want to Learn ({learningSkills.length})
              </CardTitle>
              <CardDescription>Skills you're interested in learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {learningSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      {skill.category && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">{skill.category}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(skill.id, skill.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {learningSkills.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No learning goals added yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Other Users' Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Browse Other Users' Skills
            </CardTitle>
            <CardDescription>See what skills other users are teaching and learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((otherUser: any) => {
                const theirTeaching = getUserSkillsByType(otherUser.id, 'teach');
                const theirLearning = getUserSkillsByType(otherUser.id, 'learn');

                if (theirTeaching.length === 0 && theirLearning.length === 0) return null;

                return (
                  <div
                    key={otherUser.id}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {otherUser.username}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {theirTeaching.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Teaching:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {theirTeaching.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {theirLearning.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" /> Learning:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {theirLearning.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {users.every((u: any) => getUserSkillsByType(u.id, 'teach').length === 0 && getUserSkillsByType(u.id, 'learn').length === 0) && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No other users have added skills yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
