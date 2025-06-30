
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PlusCircle, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Search
} from 'lucide-react';

const IncomeTracker = () => {
  const [incomes, setIncomes] = useState([
    { id: 1, description: 'Wheat Sale', amount: 15000, source: 'Crop Sales', date: '2024-01-15', status: 'Received' },
    { id: 2, description: 'Rice Sale', amount: 22000, source: 'Crop Sales', date: '2024-01-12', status: 'Received' },
    { id: 3, description: 'Vegetable Sale', amount: 8500, source: 'Crop Sales', date: '2024-01-10', status: 'Pending' },
    { id: 4, description: 'Milk Sale', amount: 3200, source: 'Dairy', date: '2024-01-08', status: 'Received' },
    { id: 5, description: 'Equipment Rental', amount: 4500, source: 'Services', date: '2024-01-05', status: 'Received' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIncome, setNewIncome] = useState({
    description: '',
    amount: '',
    source: '',
    date: '',
    status: 'Received'
  });

  const sources = ['Crop Sales', 'Dairy', 'Livestock', 'Services', 'Government Subsidy', 'Other'];

  const filteredIncomes = incomes.filter(income =>
    income.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    income.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const pendingIncome = incomes.filter(income => income.status === 'Pending').reduce((sum, income) => sum + income.amount, 0);

  const handleAddIncome = () => {
    if (newIncome.description && newIncome.amount && newIncome.source && newIncome.date) {
      const income = {
        id: incomes.length + 1,
        description: newIncome.description,
        amount: parseFloat(newIncome.amount),
        source: newIncome.source,
        date: newIncome.date,
        status: newIncome.status
      };
      setIncomes([income, ...incomes]);
      setNewIncome({ description: '', amount: '', source: '', date: '', status: 'Received' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-blue-600">₹{(totalIncome * 0.7).toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-orange-600">₹{pendingIncome.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search income..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            size="sm" 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Income
          </Button>
        </div>
      </div>

      {/* Add Income Form */}
      {showAddForm && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter income description"
                  value={newIncome.description}
                  onChange={(e) => setNewIncome({...newIncome, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={newIncome.amount}
                  onChange={(e) => setNewIncome({...newIncome, amount: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <select
                  id="source"
                  className="w-full p-2 border rounded-md"
                  value={newIncome.source}
                  onChange={(e) => setNewIncome({...newIncome, source: e.target.value})}
                >
                  <option value="">Select source</option>
                  {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newIncome.date}
                  onChange={(e) => setNewIncome({...newIncome, date: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddIncome} className="bg-green-600 hover:bg-green-700">
                Add Income
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Income Table */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Income Records</CardTitle>
          <CardDescription>Track and manage all your farm income</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncomes.map((income) => (
                <TableRow key={income.id}>
                  <TableCell className="font-medium">{income.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{income.source}</Badge>
                  </TableCell>
                  <TableCell>{income.date}</TableCell>
                  <TableCell className="font-semibold text-green-600">
                    ₹{income.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={income.status === 'Received' ? 'default' : 'secondary'}>
                      {income.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeTracker;
