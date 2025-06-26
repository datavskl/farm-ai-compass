
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye,
  Sunrise,
  Sunset,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';

const Weather = () => {
  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 6,
    pressure: 1013,
    sunrise: "06:15 AM",
    sunset: "06:45 PM"
  };

  const forecast = [
    { day: "Today", high: 32, low: 24, condition: "Partly Cloudy", rain: 15, icon: Cloud },
    { day: "Tomorrow", high: 30, low: 22, condition: "Light Rain", rain: 60, icon: CloudRain },
    { day: "Wednesday", high: 28, low: 20, condition: "Heavy Rain", rain: 85, icon: CloudRain },
    { day: "Thursday", high: 26, low: 18, condition: "Cloudy", rain: 40, icon: Cloud },
    { day: "Friday", high: 29, low: 21, condition: "Sunny", rain: 5, icon: Sun },
    { day: "Saturday", high: 31, low: 23, condition: "Partly Cloudy", rain: 20, icon: Cloud },
    { day: "Sunday", high: 33, low: 25, condition: "Sunny", rain: 0, icon: Sun }
  ];

  const farmingAdvice = [
    {
      title: "Heavy Rain Alert",
      message: "Postpone fertilizer application. Prepare drainage systems.",
      priority: "high",
      icon: AlertTriangle
    },
    {
      title: "Optimal Irrigation",
      message: "Skip irrigation for next 2 days due to expected rainfall.",
      priority: "medium",
      icon: Droplets
    },
    {
      title: "Pest Management",
      message: "High humidity may increase pest activity. Monitor closely.",
      priority: "medium",
      icon: Eye
    }
  ];

  const weatherMetrics = [
    { label: "Temperature", value: `${currentWeather.temperature}°C`, icon: Thermometer, color: "text-red-500" },
    { label: "Humidity", value: `${currentWeather.humidity}%`, icon: Droplets, color: "text-blue-500" },
    { label: "Wind Speed", value: `${currentWeather.windSpeed} km/h`, icon: Wind, color: "text-gray-500" },
    { label: "Visibility", value: `${currentWeather.visibility} km`, icon: Eye, color: "text-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Weather Intelligence</h1>
          <p className="text-gray-600">AI-powered weather insights for smarter farming decisions</p>
        </div>

        {/* Current Weather Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-sky-600 text-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <Cloud className="h-16 w-16 mr-4" />
                  <div>
                    <h2 className="text-4xl font-bold">{currentWeather.temperature}°C</h2>
                    <p className="text-xl text-blue-100">{currentWeather.condition}</p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start space-x-6 text-blue-100">
                  <div className="flex items-center">
                    <Sunrise className="h-4 w-4 mr-1" />
                    <span className="text-sm">{currentWeather.sunrise}</span>
                  </div>
                  <div className="flex items-center">
                    <Sunset className="h-4 w-4 mr-1" />
                    <span className="text-sm">{currentWeather.sunset}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {weatherMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <metric.icon className="h-6 w-6 mx-auto mb-2 text-white" />
                    <p className="text-sm text-blue-100">{metric.label}</p>
                    <p className="font-semibold text-white">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 7-Day Forecast */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  7-Day Forecast
                </CardTitle>
                <CardDescription>
                  Extended weather predictions with farming insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <day.icon className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{day.day}</p>
                          <p className="text-sm text-gray-600">{day.condition}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">High/Low</p>
                          <p className="font-semibold">{day.high}°/{day.low}°</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Rain</p>
                          <Badge 
                            variant={day.rain > 70 ? "destructive" : day.rain > 30 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {day.rain}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Farming Advice Sidebar */}
          <div className="space-y-6">
            {/* AI Farming Advice */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  AI Farming Advice
                </CardTitle>
                <CardDescription>
                  Personalized recommendations based on weather
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {farmingAdvice.map((advice, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white/50">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        advice.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <advice.icon className={`h-4 w-4 ${
                          advice.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{advice.title}</h4>
                        <p className="text-sm text-gray-600">{advice.message}</p>
                        <Badge 
                          variant={advice.priority === 'high' ? 'destructive' : 'default'}
                          className="mt-2 text-xs"
                        >
                          {advice.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weather Alerts */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Weather Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-100 mb-4">
                  <strong>Heavy Rain Warning:</strong> Expected 50-80mm rainfall in next 48 hours. 
                  Take necessary precautions for crop protection.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">This Week's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Temperature</span>
                    <span className="font-semibold">29°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Rainfall</span>
                    <span className="font-semibold">145mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rainy Days</span>
                    <span className="font-semibold">4 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Humidity Avg</span>
                    <span className="font-semibold">68%</span>
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

export default Weather;
