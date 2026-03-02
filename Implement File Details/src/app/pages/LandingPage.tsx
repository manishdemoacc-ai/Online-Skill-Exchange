import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Users, MessageSquare, Star, TrendingUp } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            SkillSwap India
          </h1>
          <Button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            Login / Register
          </Button>
        </nav>

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Exchange Skills, Grow Together
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with skilled professionals across India. Learn what you need, teach what you know.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6"
          >
            Get Started for Free
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Find Matches</h3>
            <p className="text-sm text-gray-600">
              Smart matching algorithm connects you with perfect skill partners
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Real-Time Chat</h3>
            <p className="text-sm text-gray-600">
              Instant messaging to coordinate and plan your skill exchanges
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Rating System</h3>
            <p className="text-sm text-gray-600">
              Build trust through verified ratings and reviews
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">
              Monitor your learning journey and skill development
            </p>
          </div>
        </div>

        {/* Popular Skills */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Popular Skills on SkillSwap</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'Java', 'Python', 'React', 'UI/UX Design', 'Digital Marketing',
              'GST & Tally', 'UPSC Preparation', 'Bharatanatyam', 'Carnatic Music',
              'Spoken Hindi', 'Spoken Tamil', 'Public Speaking'
            ].map(skill => (
              <span
                key={skill}
                className="px-4 py-2 bg-white border-2 border-blue-200 rounded-full text-sm font-medium hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
