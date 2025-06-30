
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  FileText, 
  Download, 
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar
} from 'lucide-react';

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  // Sample data for charts
  const monthlyProfitData = [
    { month: 'Jan', income: 125000, expenses: 87500, profit: 37500 },
    { month: 'Feb', income: 135000, expenses: 92000, profit: 43000 },
    { month: 'Mar', income: 110000, expenses: 78000, profit: 32000 },
    { month: 'Apr', income: 150000, expenses: 95000, profit: 55000 },
    { month: 'May', income: 140000, expenses: 88000, profit: 52000 },
    { month: 'Jun', income: 165000, expenses: 105000, profit: 60000 }
  ];

  const cropWiseProfitability = [
    { crop: 'Wheat', revenue: 45000, cost: 25000, profit: 20000 },
    { crop: 'Rice', revenue: 65000, cost: 40000, profit: 25000 },
    { crop: 'Corn', revenue: 35000, cost: 22000, profit: 13000 },
    { crop: 'Vegetables', revenue: 28000, cost: 18000, profit: 10000 }
  ];

  const expenseCategories = [
    { name: 'Seeds & Fertilizers', value: 35000, color: '#8884d8' },
    { name: 'Equipment', value: 28000, color: '#82ca9d' },
    { name: 'Labor', value: 15000, color: '#ffc658' },
    { name: 'Utilities', value: 9500, color: '#ff7300' },
    { name: 'Transport', value: 7200, color: '#00ff00' }
  ];

  const handleExportPDF = () => {
    // PDF export logic would go here
    console.log('Exporting PDF report...');
    alert('PDF export functionality would be implemented here');
  };

  const handleExportExcel = () => {
    // Excel export logic would go here
    console.log('Exporting Excel report...');
    alert('Excel export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">From Date</Label>
            <Input
              id="startDate"
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              className="w-40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">To Date</Label>
            <Input
              id="endDate"
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              className="w-40"
            />
          </div>
          <Button variant="outline" className="mt-6">
            <Calendar className="h-4 w-4 mr-2" />
            Apply Filter
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF}>
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="profit-loss" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profit-loss" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>P&L Report</span>
          </TabsTrigger>
          <TabsTrigger value="crop-analysis" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Crop Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="expense-breakdown" className="flex items-center space-x-2">
            <PieChartIcon className="h-4 w-4" />
            <span>Expenses</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trends</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profit-loss">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Monthly Profit & Loss</CardTitle>
                <CardDescription>Income vs Expenses trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyProfitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="income" fill="#10b981" name="Income" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyProfitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* P&L Summary Table */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Detailed P&L Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyProfitData.map((month, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="font-medium">{month.month} 2024</div>
                    <div className="text-green-600 font-semibold">₹{month.income.toLocaleString()}</div>
                    <div className="text-red-600 font-semibold">₹{month.expenses.toLocaleString()}</div>
                    <div className="text-blue-600 font-bold">₹{month.profit.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crop-analysis">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Crop-wise Profitability</CardTitle>
                <CardDescription>Revenue and cost analysis by crop</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropWiseProfitability}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                    <Bar dataKey="cost" fill="#ef4444" name="Cost" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profit Margins by Crop</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cropWiseProfitability.map((crop, index) => {
                  const margin = ((crop.profit / crop.revenue) * 100).toFixed(1);
                  return (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{crop.crop}</span>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">₹{crop.profit.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{margin}% margin</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expense-breakdown">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
                <CardDescription>Category-wise expense breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Category Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="font-semibold">₹{category.value.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Financial Trends Analysis</CardTitle>
              <CardDescription>Track your farm's financial performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyProfitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
