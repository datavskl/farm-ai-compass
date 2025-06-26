
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Sprout, 
  Award, 
  Calendar,
  Edit,
  Settings,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const farmerProfile = {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    location: "Village Rampur, Uttar Pradesh",
    joinDate: "March 2023",
    totalLand: "11.5 acres",
    crops: ["Rice", "Wheat", "Cotton"],
    experience: "15 years",
    achievements: [
      { title: "Best Yield 2023", description: "Achieved 120% of regional average", icon: Award },
      { title: "Sustainable Farmer", description: "Reduced water usage by 30%", icon: Sprout },
      { title: "AI Pioneer", description: "Early adopter of smart farming", icon: BarChart3 }
    ]
  };

  const farmStats = [
    { label: "Soil Health Score", value: 85, color: "bg-green-500" },
    { label: "Crop Health Average", value: 78, color: "bg-blue-500" },
    { label: "Water Efficiency", value: 92, color: "bg-cyan-500" },
    { label: "Yield Performance", value: 88, color: "bg-orange-500" }
  ];

  const recentActivity = [
    { action: "Soil test completed", date: "2 days ago", type: "soil" },
    { action: "Disease scan on Rice field", date: "3 days ago", type: "disease" },
    { action: "Market price check", date: "5 days ago", type: "market" },
    { action: "Weather alert acknowledged", date: "1 week ago", type: "weather" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farmer Profile</h1>
            <p className="text-gray-600">Manage your farming profile and track your progress</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {farmerProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{farmerProfile.name}</h2>
                <div className="flex flex-wrap gap-4 text-green-100">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{farmerProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{farmerProfile.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{farmerProfile.email}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {farmerProfile.totalLand}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {farmerProfile.experience} experience
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Member since {farmerProfile.joinDate}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Farm Statistics */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Farm Performance
                </CardTitle>
                <CardDescription>
                  Your farming metrics and performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {farmStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                      <span className="text-sm font-bold text-gray-900">{stat.value}%</span>
                    </div>
                    <Progress value={stat.value} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mt-6 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Achievements & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {farmerProfile.achievements.map((achievement, index) => (
                    <div key={index} className="text-center p-4 border rounded-lg bg-white/50">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full w-fit mx-auto mb-3">
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Crops Overview */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Sprout className="h-5 w-5 mr-2 text-green-600" />
                  Current Crops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {farmerProfile.crops.map((crop, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-white/50">
                      <span className="font-medium text-gray-900">{crop}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Active
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start bg-green-600 hover:bg-green-700"
                  onClick={() => navigate('/dashboard')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
