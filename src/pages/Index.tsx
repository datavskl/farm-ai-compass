
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Cloud, Camera, TrendingUp, Users, Leaf, Calculator } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "AI-powered weather predictions and farming recommendations",
      color: "bg-blue-500",
      route: "/weather"
    },
    {
      icon: Camera,
      title: "Soil Health Scanner",
      description: "Computer vision analysis of soil conditions and health",
      color: "bg-green-500",
      route: "/soil-analysis"
    },
    {
      icon: Leaf,
      title: "Disease Detection",
      description: "Advanced crop disease identification and treatment advice",
      color: "bg-emerald-500",
      route: "/disease-scanner"
    },
    {
      icon: Calculator,
      title: "Farm Accounting",
      description: "Complete financial management for income, expenses, and profitability",
      color: "bg-indigo-500",
      route: "/accounting"
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Real-time price predictions and market intelligence",
      color: "bg-orange-500",
      route: "/market"
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with agricultural experts and community",
      color: "bg-purple-500",
      route: "/consultation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Hero Section */}
      <div className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-full">
              <Sprout className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AgriSmart
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Intelligent Agricultural Management Platform powered by AI. Make smarter farming decisions with real-time insights, disease detection, and market intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              onClick={() => navigate('/profile')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Powered Agricultural Intelligence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to optimize your farming operations and maximize yields
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm cursor-pointer"
                onClick={() => navigate(feature.route)}
              >
                <CardHeader className="text-center">
                  <div className={`${feature.color} p-3 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AI to make better decisions and increase their yields.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            onClick={() => navigate('/dashboard')}
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
