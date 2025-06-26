
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sprout, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Bell,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    precipitation: 15,
    condition: "Partly Cloudy"
  };

  const cropHealth = [
    { crop: "Rice", health: 85, stage: "Flowering", area: "5.2 acres" },
    { crop: "Wheat", health: 78, stage: "Grain Filling", area: "3.8 acres" },
    { crop: "Cotton", health: 92, stage: "Boll Formation", area: "2.5 acres" }
  ];

  const alerts = [
    { type: "weather", message: "Heavy rain expected in 2 days", priority: "high" },
    { type: "disease", message: "Leaf blight detected in Rice field A", priority: "medium" },
    { type: "market", message: "Wheat prices trending up 12%", priority: "low" }
  ];

  const quickActions = [
    { title: "Scan Soil", icon: Camera, path: "/soil-analysis", color: "bg-green-500" },
    { title: "Disease Check", icon: Activity, path: "/disease-scanner", color: "bg-red-500" },
    { title: "Weather Forecast", icon: Cloud, path: "/weather", color: "bg-blue-500" },
    { title: "Market Prices", icon: TrendingUp, path: "/market", color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Farm Dashboard</h1>
            <p className="text-gray-600">Welcome back, Farmer! Here's your farm overview.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>

        {/* Weather Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Cloud className="h-5 w-5 mr-2" />
              Today's Weather
            </CardTitle>
            <CardDescription className="text-blue-100">
              {weatherData.condition} • Perfect for field activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4" />
                <span>{weatherData.temperature}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4" />
                <span>{weatherData.humidity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4" />
                <span>{weatherData.windSpeed} km/h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="h-4 w-4" />
                <span>{weatherData.precipitation}mm</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group bg-white/80 backdrop-blur-sm"
              onClick={() => navigate(action.path)}
            >
              <CardContent className="p-6 text-center">
                <div className={`${action.color} p-3 rounded-full w-fit mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crop Health */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Sprout className="h-5 w-5 mr-2 text-green-600" />
                  Crop Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cropHealth.map((crop, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white/50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{crop.crop}</h4>
                        <p className="text-sm text-gray-600">{crop.stage} • {crop.area}</p>
                      </div>
                      <Badge 
                        variant={crop.health >= 80 ? "default" : "secondary"}
                        className={crop.health >= 80 ? "bg-green-500" : "bg-yellow-500"}
                      >
                        {crop.health}% Healthy
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Health Score</span>
                        <span>{crop.health}%</span>
                      </div>
                      <Progress value={crop.health} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-white/50">
                    <div className="flex items-start justify-between mb-2">
                      <Badge 
                        variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Farm Stats */}
            <Card className="mt-6 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Irrigation Events</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Disease Scans</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Soil Tests</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Checks</span>
                    <span className="font-semibold">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
