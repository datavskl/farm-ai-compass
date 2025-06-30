
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  Target, 
  AlertTriangle,
  TrendingUp,
  PlusCircle,
  Edit
} from 'lucide-react';

const BudgetPlanner = () => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Fertilizers', budgeted: 25000, spent: 18500, percentage: 74 },
    { id: 2, category: 'Seeds', budgeted: 15000, spent: 12000, percentage: 80 },
    { id: 3, category: 'Equipment', budgeted: 30000, spent: 28000, percentage: 93 },
    { id: 4, category: 'Labor', budgeted: 20000, spent: 15000, percentage: 75 },
    { id: 5, category: 'Utilities', budgeted: 8000, spent: 6500, percentage: 81 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budgeted: '',
    spent: '0'
  });

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overallProgress = (totalSpent / totalBudgeted) * 100;

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.budgeted) {
      const budget = {
        id: budgets.length + 1,
        category: newBudget.category,
        budgeted: parseFloat(newBudget.budgeted),
        spent: parseFloat(newBudget.spent),
        percentage: (parseFloat(newBudget.spent) / parseFloat(newBudget.budgeted)) * 100
      };
      setBudgets([...budgets, budget]);
      setNewBudget({ category: '', budgeted: '', spent: '0' });
      setShowAddForm(false);
    }
  };

  const getBudgetStatus = (percentage: number) => {
    if (percentage < 70) return { color: 'text-green-600', bg: 'bg-green-100', status: 'On Track' };
    if (percentage < 90) return { color: 'text-yellow-600', bg: 'bg-yellow-100', status: 'Warning' };
    return { color: 'text-red-600', bg: 'bg-red-100', status: 'Over Budget' };
  };

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalBudgeted.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-orange-600">₹{totalSpent.toLocaleString()}</p>
              </div>
              <Calculator className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Remaining</p>
                <p className="text-2xl font-bold text-green-600">₹{(totalBudgeted - totalSpent).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              Overall Budget Progress
            </div>
            <Badge variant={overallProgress > 90 ? "destructive" : overallProgress > 70 ? "secondary" : "default"}>
              {overallProgress.toFixed(1)}% Used
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: ₹{totalSpent.toLocaleString()} / ₹{totalBudgeted.toLocaleString()}</span>
              <span>{overallProgress.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Category Budgets</h3>
        <Button 
          size="sm" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      {/* Add Budget Form */}
      {showAddForm && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Budget Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Enter category name"
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budgeted">Budget Amount (₹)</Label>
                <Input
                  id="budgeted"
                  type="number"
                  placeholder="Enter budget amount"
                  value={newBudget.budgeted}
                  onChange={(e) => setNewBudget({...newBudget, budgeted: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="spent">Already Spent (₹)</Label>
                <Input
                  id="spent"
                  type="number"
                  placeholder="Enter spent amount"
                  value={newBudget.spent}
                  onChange={(e) => setNewBudget({...newBudget, spent: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBudget} className="bg-green-600 hover:bg-green-700">
                Add Budget
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Categories */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const status = getBudgetStatus(budget.percentage);
          return (
            <Card key={budget.id} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-900">{budget.category}</h4>
                    <Badge className={`${status.bg} ${status.color}`}>
                      {status.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {budget.percentage > 90 && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Spent: ₹{budget.spent.toLocaleString()}</span>
                    <span>Budget: ₹{budget.budgeted.toLocaleString()}</span>
                  </div>
                  <Progress value={budget.percentage} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{budget.percentage.toFixed(1)}% used</span>
                    <span>Remaining: ₹{(budget.budgeted - budget.spent).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetPlanner;
