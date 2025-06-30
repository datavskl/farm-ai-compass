
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface Transaction {
  id: number;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface FinancialData {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  monthlyGrowth: number;
  recentTransactions: Transaction[];
}

interface FinancialOverviewProps {
  data: FinancialData;
}

const FinancialOverview = ({ data }: FinancialOverviewProps) => {
  const profitMargin = ((data.netProfit / data.totalIncome) * 100).toFixed(1);
  const expenseRatio = ((data.totalExpenses / data.totalIncome) * 100).toFixed(1);

  const categoryExpenses = [
    { category: 'Seeds & Fertilizers', amount: 35000, percentage: 40 },
    { category: 'Equipment & Maintenance', amount: 28000, percentage: 32 },
    { category: 'Labor', amount: 15000, percentage: 17 },
    { category: 'Utilities', amount: 9500, percentage: 11 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit & Loss Summary */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Profit & Loss Summary
            </CardTitle>
            <CardDescription>Current month financial performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Income</span>
                <span className="font-semibold text-green-600">₹{data.totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Expenses</span>
                <span className="font-semibold text-red-600">₹{data.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Net Profit</span>
                  <span className="font-bold text-lg text-blue-600">₹{data.netProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-600">{profitMargin}%</p>
                <p className="text-xs text-gray-600">Profit Margin</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-600">{data.monthlyGrowth}%</p>
                <p className="text-xs text-gray-600">Monthly Growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Where your money is going</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryExpenses.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{expense.category}</span>
                  <span className="font-semibold">₹{expense.amount.toLocaleString()}</span>
                </div>
                <Progress value={expense.percentage} className="h-2" />
                <div className="text-xs text-gray-500 text-right">{expense.percentage}% of total</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center text-gray-900">
              <Calendar className="h-5 w-5 mr-2 text-blue-600" />
              Recent Transactions
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? 
                      <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.category} • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialOverview;
