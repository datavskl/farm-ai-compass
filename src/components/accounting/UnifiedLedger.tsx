
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Search, 
  Filter, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  type: 'income' | 'expense' | 'loan_disbursement' | 'loan_payment';
  description: string;
  category: string;
  amount: number;
  balance: number;
  reference?: string;
}

const UnifiedLedger = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  });

  // Sample unified transaction data
  const [transactions] = useState<Transaction[]>([
    { id: 1, date: '2024-01-15', type: 'income', description: 'Wheat Sale', category: 'Crop Sales', amount: 15000, balance: 15000, reference: 'INV-001' },
    { id: 2, date: '2024-01-14', type: 'expense', description: 'Fertilizer Purchase', category: 'Fertilizers', amount: -8500, balance: 6500, reference: 'EXP-001' },
    { id: 3, date: '2024-01-12', type: 'income', description: 'Rice Sale', category: 'Crop Sales', amount: 22000, balance: 28500, reference: 'INV-002' },
    { id: 4, date: '2024-01-10', type: 'expense', description: 'Tractor Maintenance', category: 'Equipment', amount: -4500, balance: 24000, reference: 'EXP-002' },
    { id: 5, date: '2024-01-08', type: 'loan_disbursement', description: 'Agricultural Loan Disbursement', category: 'Loan', amount: 100000, balance: 124000, reference: 'LOAN-001' },
    { id: 6, date: '2024-01-05', type: 'expense', description: 'Labor Wages', category: 'Labor', amount: -6000, balance: 118000, reference: 'EXP-003' },
    { id: 7, date: '2024-01-03', type: 'expense', description: 'Seed Purchase', category: 'Seeds', amount: -12000, balance: 106000, reference: 'EXP-004' },
    { id: 8, date: '2024-01-02', type: 'loan_payment', description: 'EMI Payment - Agricultural Bank', category: 'Loan Payment', amount: -10000, balance: 96000, reference: 'EMI-001' }
  ]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    const matchesDateRange = transactionDate >= startDate && transactionDate <= endDate;
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  const totalIncome = transactions.filter(t => t.type === 'income' || t.type === 'loan_disbursement').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense' || t.type === 'loan_payment').reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
      case 'loan_disbursement':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'expense':
      case 'loan_payment':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'income':
      case 'loan_disbursement':
        return 'text-green-600';
      case 'expense':
      case 'loan_payment':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'income':
        return 'default';
      case 'expense':
        return 'destructive';
      case 'loan_disbursement':
        return 'secondary';
      case 'loan_payment':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleExport = () => {
    // Export logic would go here
    console.log('Exporting ledger data...');
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome.toLocaleString()}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{Math.abs(netBalance).toLocaleString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-blue-600">{filteredTransactions.length}</p>
              </div>
              <Filter className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <select
            className="p-2 border rounded-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
            <option value="loan_disbursement">Loan Disbursement</option>
            <option value="loan_payment">Loan Payments</option>
          </select>
          
          <Input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            className="w-40"
          />
          
          <Input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            className="w-40"
          />
        </div>
        
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Ledger
        </Button>
      </div>

      {/* Transactions Table */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Transaction Ledger</CardTitle>
          <CardDescription>Complete record of all financial transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(transaction.type)}
                      <Badge variant={getBadgeVariant(transaction.type)}>
                        {transaction.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{transaction.reference}</TableCell>
                  <TableCell className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-semibold">₹{transaction.balance.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnifiedLedger;
