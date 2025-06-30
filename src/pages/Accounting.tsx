
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PlusCircle, 
  Calculator,
  Receipt,
  BarChart3,
  FileText,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExpenseTracker from '../components/accounting/ExpenseTracker';
import IncomeTracker from '../components/accounting/IncomeTracker';
import FinancialOverview from '../components/accounting/FinancialOverview';
import BudgetPlanner from '../components/accounting/BudgetPlanner';

const Accounting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for financial overview
  const financialData = {
    totalIncome: 125000,
    totalExpenses: 87500,
    netProfit: 37500,
    monthlyGrowth: 12.5,
    recentTransactions: [
      { id: 1, type: 'income' as const, description: 'Wheat Sale', amount: 15000, date: '2024-01-15', category: 'Crop Sales' },
      { id: 2, type: 'expense' as const, description: 'Fertilizer Purchase', amount: 8500, date: '2024-01-14', category: 'Fertilizers' },
      { id: 3, type: 'income' as const, description: 'Rice Sale', amount: 22000, date: '2024-01-12', category: 'Crop Sales' },
      { id: 4, type: 'expense' as const, description: 'Tractor Maintenance', amount: 4500, date: '2024-01-10', category: 'Equipment' },
    ]
  };

  const quickStats = [
    {
      title: "Total Income",
      value: `₹${financialData.totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Expenses",
      value: `₹${financialData.totalExpenses.toLocaleString()}`,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Net Profit",
      value: `₹${financialData.netProfit.toLocaleString()}`,
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Monthly Growth",
      value: `${financialData.monthlyGrowth}%`,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Farm Accounting</h1>
              <p className="text-gray-600">Manage your farm finances and track profitability</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button 
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="income" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Income</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center space-x-2">
              <Receipt className="h-4 w-4" />
              <span>Expenses</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Budget</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <FinancialOverview data={financialData} />
          </TabsContent>

          <TabsContent value="income">
            <IncomeTracker />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpenseTracker />
          </TabsContent>

          <TabsContent value="budget">
            <BudgetPlanner />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Accounting;
