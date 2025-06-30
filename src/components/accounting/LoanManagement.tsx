
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  CreditCard, 
  Calendar,
  AlertTriangle,
  DollarSign,
  TrendingUp
} from 'lucide-react';

interface Loan {
  id: number;
  source: string;
  amount: number;
  interestRate: number;
  tenure: number;
  startDate: string;
  emi: number;
  remainingAmount: number;
  status: 'Active' | 'Closed' | 'Overdue';
  nextDueDate: string;
}

const LoanManagement = () => {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 1,
      source: 'Agricultural Bank',
      amount: 500000,
      interestRate: 7.5,
      tenure: 60,
      startDate: '2023-01-15',
      emi: 10000,
      remainingAmount: 425000,
      status: 'Active',
      nextDueDate: '2024-02-15'
    },
    {
      id: 2,
      source: 'Cooperative Society',
      amount: 200000,
      interestRate: 5.0,
      tenure: 36,
      startDate: '2023-06-01',
      emi: 6000,
      remainingAmount: 140000,
      status: 'Active',
      nextDueDate: '2024-02-01'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newLoan, setNewLoan] = useState({
    source: '',
    amount: '',
    interestRate: '',
    tenure: '',
    startDate: ''
  });

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const handleAddLoan = () => {
    if (newLoan.source && newLoan.amount && newLoan.interestRate && newLoan.tenure && newLoan.startDate) {
      const principal = parseFloat(newLoan.amount);
      const rate = parseFloat(newLoan.interestRate);
      const tenure = parseInt(newLoan.tenure);
      
      const emi = calculateEMI(principal, rate, tenure);
      
      const loan: Loan = {
        id: loans.length + 1,
        source: newLoan.source,
        amount: principal,
        interestRate: rate,
        tenure: tenure,
        startDate: newLoan.startDate,
        emi: emi,
        remainingAmount: principal,
        status: 'Active',
        nextDueDate: new Date(new Date(newLoan.startDate).setMonth(new Date(newLoan.startDate).getMonth() + 1)).toISOString().split('T')[0]
      };
      
      setLoans([loan, ...loans]);
      setNewLoan({ source: '', amount: '', interestRate: '', tenure: '', startDate: '' });
      setShowAddForm(false);
    }
  };

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const totalEMI = loans.filter(loan => loan.status === 'Active').reduce((sum, loan) => sum + loan.emi, 0);
  const overdueLoans = loans.filter(loan => loan.status === 'Overdue').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
                <p className="text-2xl font-bold text-red-600">₹{totalLoanAmount.toLocaleString()}</p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly EMI</p>
                <p className="text-2xl font-bold text-orange-600">₹{totalEMI.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Loans</p>
                <p className="text-2xl font-bold text-blue-600">{loans.filter(l => l.status === 'Active').length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueLoans}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming EMI Alert */}
      {loans.some(loan => loan.status === 'Active') && (
        <Alert>
          <Calendar className="h-4 w-4" />
          <AlertDescription>
            Next EMI payments due: {loans.filter(l => l.status === 'Active').map(l => `₹${l.emi} on ${l.nextDueDate}`).join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Loan Portfolio</h3>
        <Button 
          size="sm" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Loan
        </Button>
      </div>

      {/* Add Loan Form */}
      {showAddForm && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Loan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Loan Source</Label>
                <Input
                  id="source"
                  placeholder="Enter loan source"
                  value={newLoan.source}
                  onChange={(e) => setNewLoan({...newLoan, source: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter loan amount"
                  value={newLoan.amount}
                  onChange={(e) => setNewLoan({...newLoan, amount: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  placeholder="Enter interest rate"
                  value={newLoan.interestRate}
                  onChange={(e) => setNewLoan({...newLoan, interestRate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure">Tenure (Months)</Label>
                <Input
                  id="tenure"
                  type="number"
                  placeholder="Enter tenure in months"
                  value={newLoan.tenure}
                  onChange={(e) => setNewLoan({...newLoan, tenure: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newLoan.startDate}
                  onChange={(e) => setNewLoan({...newLoan, startDate: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLoan} className="bg-green-600 hover:bg-green-700">
                Add Loan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loans Table */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Loan Details</CardTitle>
          <CardDescription>Manage all your agricultural loans</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Monthly EMI</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Next Due</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.id}>
                  <TableCell className="font-medium">{loan.source}</TableCell>
                  <TableCell>₹{loan.amount.toLocaleString()}</TableCell>
                  <TableCell>{loan.interestRate}%</TableCell>
                  <TableCell className="font-semibold">₹{loan.emi.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold text-red-600">
                    ₹{loan.remainingAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{loan.nextDueDate}</TableCell>
                  <TableCell>
                    <Badge variant={
                      loan.status === 'Active' ? 'default' : 
                      loan.status === 'Overdue' ? 'destructive' : 'secondary'
                    }>
                      {loan.status}
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

export default LoanManagement;
