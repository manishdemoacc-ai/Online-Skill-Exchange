import { useAuth } from '../contexts/AuthContext';
import { useSkills } from '../contexts/SkillsContext';
import { useChat } from '../contexts/ChatContext';
import { Navbar } from '../components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, GraduationCap, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';

export const Dashboard = () => {
  const { user } = useAuth();
  const { getTeachingSkills, getLearningSkills, findMatches } = useSkills();
  const { getUnreadCount } = useChat();

  const teachingSkills = user ? getTeachingSkills(user.id) : [];
  const learningSkills = user ? getLearningSkills(user.id) : [];
  const matches = user ? findMatches(user.id) : [];
  const unreadMessages = getUnreadCount();

  const stats = [
    {
      title: 'Teaching',
      value: teachingSkills.length,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Learning',
      value: learningSkills.length,
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Matches',
      value: matches.length,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Messages',
      value: unreadMessages,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your skill exchanges today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Teaching Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Skills You Teach
              </CardTitle>
              <CardDescription>Share your expertise with others</CardDescription>
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
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No teaching skills added yet
                  </p>
                  <Link to="/skills">
                    <Button variant="outline" size="sm">Add Skills</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" />
                Skills You Want to Learn
              </CardTitle>
              <CardDescription>Expand your knowledge</CardDescription>
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
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No learning goals added yet
                  </p>
                  <Link to="/skills">
                    <Button variant="outline" size="sm">Add Skills</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skill Matches */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Suggested Skill Exchanges
              </CardTitle>
              <CardDescription>Connect with users who match your interests</CardDescription>
            </CardHeader>
            <CardContent>
              {matches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.slice(0, 4).map((match) => (
                    <div
                      key={match.user.id}
                      className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {match.user.username}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {match.matchedSkills.length} matching skill{match.matchedSkills.length > 1 ? 's' : ''}
                          </p>
                        </div>
                        <Link to={`/messages?user=${match.user.id}`}>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {match.matchedSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white dark:bg-gray-800 text-xs rounded-full border border-purple-300 dark:border-purple-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    No matches found yet. Add more skills to find connections!
                  </p>
                  <Link to="/skills">
                    <Button variant="outline" size="sm">Manage Skills</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
