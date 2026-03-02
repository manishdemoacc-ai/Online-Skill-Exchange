import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, X, Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    location: currentUser?.location || '',
    bio: currentUser?.bio || '',
  });

  const [skillsOffered, setSkillsOffered] = useState<string[]>(currentUser?.skillsOffered || []);
  const [skillsWanted, setSkillsWanted] = useState<string[]>(currentUser?.skillsWanted || []);
  const [currentSkillOffered, setCurrentSkillOffered] = useState('');
  const [currentSkillWanted, setCurrentSkillWanted] = useState('');

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    updateProfile({
      ...formData,
      skillsOffered,
      skillsWanted,
    });
    navigate('/profile/' + currentUser.id);
  };

  const addSkillOffered = () => {
    if (currentSkillOffered.trim() && !skillsOffered.includes(currentSkillOffered.trim())) {
      setSkillsOffered([...skillsOffered, currentSkillOffered.trim()]);
      setCurrentSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (currentSkillWanted.trim() && !skillsWanted.includes(currentSkillWanted.trim())) {
      setSkillsWanted([...skillsWanted, currentSkillWanted.trim()]);
      setCurrentSkillWanted('');
    }
  };

  const removeSkillOffered = (index: number) => {
    setSkillsOffered(skillsOffered.filter((_, i) => i !== index));
  };

  const removeSkillWanted = (index: number) => {
    setSkillsWanted(skillsWanted.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600">Update your profile information</p>
          </div>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Chennai, Tamil Nadu"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Skills Offered */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Skills I Can Offer</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="e.g., React, Python, Digital Marketing"
                  value={currentSkillOffered}
                  onChange={(e) => setCurrentSkillOffered(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())}
                />
                <Button type="button" onClick={addSkillOffered}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2"
                  >
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeSkillOffered(index)}
                    />
                  </Badge>
                ))}
                {skillsOffered.length === 0 && (
                  <p className="text-sm text-gray-500">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Skills I Want to Learn</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="e.g., Public Speaking, GST & Tally"
                  value={currentSkillWanted}
                  onChange={(e) => setCurrentSkillWanted(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())}
                />
                <Button type="button" onClick={addSkillWanted}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsWanted.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-blue-300 flex items-center gap-2"
                  >
                    {skill}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeSkillWanted(index)}
                    />
                  </Badge>
                ))}
                {skillsWanted.length === 0 && (
                  <p className="text-sm text-gray-500">No skills added yet</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t pt-6 flex gap-3">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
