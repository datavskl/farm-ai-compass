import { useNavigate } from 'react-router-dom';
import { 
  Cloud, 
  Leaf, 
  Camera, 
  Calculator, 
  TrendingUp, 
  Users, 
  Settings, 
  Home,
  BarChart3,
  MessageCircle,
  Calendar,
  FileText
} from 'lucide-react';

const Homepage2 = () => {
  const navigate = useNavigate();

  const appIcons = [
    {
      id: 'dashboard',
      icon: Home,
      label: 'Dashboard',
      color: 'bg-blue-400',
      route: '/dashboard',
      isActive: false
    },
    {
      id: 'weather',
      icon: Cloud,
      label: 'Weather',
      color: 'bg-sky-400',
      route: '/weather',
      isActive: false
    },
    {
      id: 'disease',
      icon: Leaf,
      label: 'Disease Detection',
      color: 'bg-emerald-400',
      route: '/disease-detection',
      isActive: true // Highlighted as selected
    },
    {
      id: 'soil',
      icon: Camera,
      label: 'Soil Health',
      color: 'bg-green-400',
      route: '/soil-health',
      isActive: false
    },
    {
      id: 'accounting',
      icon: Calculator,
      label: 'Accounting',
      color: 'bg-indigo-400',
      route: '/accounting',
      isActive: false
    },
    {
      id: 'analytics',
      icon: TrendingUp,
      label: 'Market Analytics',
      color: 'bg-orange-400',
      route: '/market',
      isActive: false
    },
    {
      id: 'consultation',
      icon: Users,
      label: 'Expert Consultation',
      color: 'bg-purple-400',
      route: '/consultation',
      isActive: false
    },
    {
      id: 'reports',
      icon: BarChart3,
      label: 'Reports',
      color: 'bg-rose-400',
      route: '/reports',
      isActive: false
    },
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Calendar',
      color: 'bg-teal-400',
      route: '/calendar',
      isActive: false
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Messages',
      color: 'bg-cyan-400',
      route: '/messages',
      isActive: false
    },
    {
      id: 'notes',
      icon: FileText,
      label: 'Notes',
      color: 'bg-amber-400',
      route: '/notes',
      isActive: false
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      color: 'bg-gray-400',
      route: '/settings',
      isActive: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-800 mb-2">
            AgriSmart Dashboard
          </h1>
          <p className="text-gray-500">Select an application to get started</p>
        </div>

        {/* App Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {appIcons.map((app) => (
              <div
                key={app.id}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => navigate(app.route)}
              >
                {/* Icon Container */}
                <div
                  className={`
                    relative w-16 h-16 rounded-2xl ${app.color} 
                    shadow-lg hover:shadow-xl transition-all duration-300
                    flex items-center justify-center
                    group-hover:scale-105 group-hover:-translate-y-1
                    ${app.isActive ? 'ring-4 ring-blue-300 ring-opacity-50 shadow-blue-200/50' : ''}
                  `}
                >
                  <app.icon 
                    className="w-8 h-8 text-white stroke-[1.5]" 
                    strokeWidth={1.5}
                  />
                  
                  {/* Glow effect for active item */}
                  {app.isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-20 animate-pulse" />
                  )}
                </div>

                {/* Label */}
                <span className="mt-3 text-sm font-medium text-gray-700 text-center leading-tight">
                  {app.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-xs text-gray-400">
            Intelligent Agricultural Management Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage2;