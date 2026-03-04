import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Users, BookOpen, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';

export const Landing = () => {
  const features = [
    {
      icon: Users,
      title: 'Connect with Learners',
      description: 'Find people who want to learn what you know and teach what you want to learn',
    },
    {
      icon: BookOpen,
      title: 'Share Your Skills',
      description: 'List skills you can teach and skills you want to learn',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Communicate directly with other users to arrange skill exchanges',
    },
    {
      icon: TrendingUp,
      title: 'Smart Matching',
      description: 'Get suggestions for perfect skill exchange matches',
    },
  ];

  const benefits = [
    'Free skill exchange platform',
    'No payment required',
    'Learn from peers',
    'Build your network',
    'Grow your expertise',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Skill Exchange Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Share your knowledge, learn new skills, and grow together with a community of learners across India
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Create Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up and list the skills you can teach and want to learn
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Find Matches</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Discover users who teach what you want to learn and vice versa
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Start Learning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Chat with matches and arrange skill exchange sessions
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <Card className="mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Why Choose Skill Exchange?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community and start exchanging skills today
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Sign Up Now - It's Free!
            </Button>
          </Link>
        </div>

        {/* Demo Account Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Want to try it first?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Use demo account: praveena@example.com / password123
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
