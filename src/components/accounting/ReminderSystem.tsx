
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  Clock, 
  Calendar,
  AlertTriangle,
  PlusCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Reminder {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  amount?: number;
  type: 'emi' | 'bill' | 'recurring' | 'custom';
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

const ReminderSystem = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      title: 'Agricultural Bank EMI',
      description: 'Monthly EMI payment for tractor loan',
      dueDate: '2024-02-15',
      amount: 10000,
      type: 'emi',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Electricity Bill',
      description: 'Monthly electricity bill for irrigation',
      dueDate: '2024-02-10',
      amount: 3500,
      type: 'bill',
      status: 'overdue',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Fertilizer Purchase',
      description: 'Buy fertilizer for next season',
      dueDate: '2024-02-20',
      amount: 8000,
      type: 'recurring',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Insurance Premium',
      description: 'Crop insurance premium payment',
      dueDate: '2024-02-25',
      amount: 5000,
      type: 'bill',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Seed Purchase',
      description: 'Purchase seeds for summer crop',
      dueDate: '2024-01-30',
      amount: 12000,
      type: 'custom',
      status: 'completed',
      priority: 'low'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    dueDate: '',
    amount: '',
    type: 'custom' as const,
    priority: 'medium' as const
  });

  const handleAddReminder = () => {
    if (newReminder.title && newReminder.dueDate) {
      const reminder: Reminder = {
        id: reminders.length + 1,
        title: newReminder.title,
        description: newReminder.description,
        dueDate: newReminder.dueDate,
        amount: newReminder.amount ? parseFloat(newReminder.amount) : undefined,
        type: newReminder.type,
        status: 'pending',
        priority: newReminder.priority
      };
      
      setReminders([reminder, ...reminders]);
      setNewReminder({ title: '', description: '', dueDate: '', amount: '', type: 'custom', priority: 'medium' });
      setShowAddForm(false);
    }
  };

  const markCompleted = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, status: 'completed' as const } : reminder
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'overdue': return 'text-red-600';
      case 'pending': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-orange-500 bg-orange-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const upcomingReminders = reminders.filter(r => r.status === 'pending' && getDaysUntilDue(r.dueDate) <= 7);
  const overdueReminders = reminders.filter(r => r.status === 'overdue');
  const completedReminders = reminders.filter(r => r.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming (7 days)</p>
                <p className="text-2xl font-bold text-orange-600">{upcomingReminders.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{overdueReminders.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedReminders.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount Due</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{reminders.filter(r => r.status === 'pending' && r.amount).reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}
                </p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Alerts */}
      {overdueReminders.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have {overdueReminders.length} overdue reminder(s). Please take immediate action.
          </AlertDescription>
        </Alert>
      )}

      {upcomingReminders.length > 0 && (
        <Alert>
          <Bell className="h-4 w-4" />
          <AlertDescription>
            {upcomingReminders.length} reminder(s) due in the next 7 days.
          </AlertDescription>
        </Alert>
      )}

      {/* Controls */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Payment Reminders</h3>
        <Button 
          size="sm" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Reminder
        </Button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Add New Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter reminder title"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (optional)"
                  value={newReminder.amount}
                  onChange={(e) => setNewReminder({...newReminder, amount: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="w-full p-2 border rounded-md"
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({...newReminder, type: e.target.value as any})}
                >
                  <option value="custom">Custom</option>
                  <option value="emi">EMI Payment</option>
                  <option value="bill">Bill Payment</option>
                  <option value="recurring">Recurring Expense</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  className="w-full p-2 border rounded-md"
                  value={newReminder.priority}
                  onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as any})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter description (optional)"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReminder} className="bg-green-600 hover:bg-green-700">
                Add Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder) => {
          const daysUntilDue = getDaysUntilDue(reminder.dueDate);
          return (
            <Card key={reminder.id} className={`${getPriorityColor(reminder.priority)} border-l-4`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-gray-900">{reminder.title}</h4>
                      <Badge variant={
                        reminder.status === 'completed' ? 'default' : 
                        reminder.status === 'overdue' ? 'destructive' : 'secondary'
                      }>
                        {reminder.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {reminder.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{reminder.dueDate}</span>
                        {daysUntilDue >= 0 ? (
                          <span className="text-green-600">({daysUntilDue} days left)</span>
                        ) : (
                          <span className="text-red-600">({Math.abs(daysUntilDue)} days overdue)</span>
                        )}
                      </div>
                      {reminder.amount && (
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold">₹{reminder.amount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {reminder.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => markCompleted(reminder.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Done
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
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

export default ReminderSystem;
