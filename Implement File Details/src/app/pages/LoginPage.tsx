import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { X } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    bio: '',
  });
  const [skillsOffered, setSkillsOffered] = useState<string[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<string[]>([]);
  const [currentSkillOffered, setCurrentSkillOffered] = useState('');
  const [currentSkillWanted, setCurrentSkillWanted] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register({
      ...registerData,
      skillsOffered,
      skillsWanted,
    });
    if (success) {
      navigate('/dashboard');
    }
  };

  const addSkillOffered = () => {
    if (currentSkillOffered.trim()) {
      setSkillsOffered([...skillsOffered, currentSkillOffered.trim()]);
      setCurrentSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (currentSkillWanted.trim()) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
            Welcome to SkillSwap India
          </h1>
          <p className="text-gray-600">Connect, Learn, and Grow Together</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Login
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Demo: Use any email from the existing users (e.g., arjun@example.com)
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    placeholder="Rahul Sharma"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="rahul@example.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="register-location">Location</Label>
                  <Input
                    id="register-location"
                    placeholder="Chennai, Tamil Nadu"
                    value={registerData.location}
                    onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="register-bio">Bio</Label>
                  <Input
                    id="register-bio"
                    placeholder="Tell us about yourself..."
                    value={registerData.bio}
                    onChange={(e) => setRegisterData({ ...registerData, bio: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="skills-offered">Skills I Can Offer</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills-offered"
                      placeholder="e.g., React, Python"
                      value={currentSkillOffered}
                      onChange={(e) => setCurrentSkillOffered(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillOffered())}
                    />
                    <Button type="button" onClick={addSkillOffered}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkillOffered(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="skills-wanted">Skills I Want to Learn</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills-wanted"
                      placeholder="e.g., Digital Marketing"
                      value={currentSkillWanted}
                      onChange={(e) => setCurrentSkillWanted(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillWanted())}
                    />
                    <Button type="button" onClick={addSkillWanted}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkillWanted(index)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center mt-4">
          <Button variant="link" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
