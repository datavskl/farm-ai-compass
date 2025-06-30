
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Save, 
  Download,
  Upload,
  Globe,
  Calendar,
  DollarSign,
  Database,
  CheckCircle
} from 'lucide-react';

const AccountingSettings = () => {
  const [settings, setSettings] = useState({
    currency: 'INR',
    currencySymbol: '₹',
    financialYearStart: '04-01', // April 1st
    language: 'english',
    dateFormat: 'DD-MM-YYYY',
    backupFrequency: 'weekly',
    notifications: {
      emailReminders: true,
      smsAlerts: false,
      pushNotifications: true
    },
    categories: {
      incomeCategories: ['Crop Sales', 'Dairy', 'Livestock', 'Services', 'Government Subsidy', 'Other'],
      expenseCategories: ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Labor', 'Utilities', 'Transport', 'Other']
    }
  });

  const [newIncomeCategory, setNewIncomeCategory] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' }
  ];

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिंदी (Hindi)' },
    { code: 'bengali', name: 'বাংলা (Bengali)' },
    { code: 'marathi', name: 'मराठी (Marathi)' }
  ];

  const handleSaveSettings = () => {
    // Save settings logic would go here
    console.log('Saving settings...', settings);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'accounting-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          alert('Settings imported successfully!');
        } catch (error) {
          alert('Error importing settings. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const addIncomeCategory = () => {
    if (newIncomeCategory && !settings.categories.incomeCategories.includes(newIncomeCategory)) {
      setSettings({
        ...settings,
        categories: {
          ...settings.categories,
          incomeCategories: [...settings.categories.incomeCategories, newIncomeCategory]
        }
      });
      setNewIncomeCategory('');
    }
  };

  const addExpenseCategory = () => {
    if (newExpenseCategory && !settings.categories.expenseCategories.includes(newExpenseCategory)) {
      setSettings({
        ...settings,
        categories: {
          ...settings.categories,
          expenseCategories: [...settings.categories.expenseCategories, newExpenseCategory]
        }
      });
      setNewExpenseCategory('');
    }
  };

  const removeIncomeCategory = (category: string) => {
    setSettings({
      ...settings,
      categories: {
        ...settings.categories,
        incomeCategories: settings.categories.incomeCategories.filter(c => c !== category)
      }
    });
  };

  const removeExpenseCategory = (category: string) => {
    setSettings({
      ...settings,
      categories: {
        ...settings.categories,
        expenseCategories: settings.categories.expenseCategories.filter(c => c !== category)
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Alert */}
      {showSaveAlert && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Settings saved successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* General Settings */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            General Settings
          </CardTitle>
          <CardDescription>Configure basic accounting preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <select
                id="currency"
                className="w-full p-2 border rounded-md"
                value={settings.currency}
                onChange={(e) => {
                  const selectedCurrency = currencies.find(c => c.code === e.target.value);
                  setSettings({
                    ...settings,
                    currency: e.target.value,
                    currencySymbol: selectedCurrency?.symbol || '₹'
                  });
                }}
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                className="w-full p-2 border rounded-md"
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financialYear">Financial Year Start</Label>
              <Input
                id="financialYear"
                type="date"
                value={`2024-${settings.financialYearStart}`}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const monthDay = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
                  setSettings({...settings, financialYearStart: monthDay});
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <select
                id="dateFormat"
                className="w-full p-2 border rounded-md"
                value={settings.dateFormat}
                onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
              >
                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                <option value="MM-DD-YYYY">MM-DD-YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how you want to receive reminders and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Reminders</h4>
              <p className="text-sm text-gray-600">Receive payment reminders via email</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.emailReminders}
              onChange={(e) => setSettings({
                ...settings,
                notifications: {
                  ...settings.notifications,
                  emailReminders: e.target.checked
                }
              })}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Alerts</h4>
              <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.smsAlerts}
              onChange={(e) => setSettings({
                ...settings,
                notifications: {
                  ...settings.notifications,
                  smsAlerts: e.target.checked
                }
              })}
              className="w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive notifications in the app</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => setSettings({
                ...settings,
                notifications: {
                  ...settings.notifications,
                  pushNotifications: e.target.checked
                }
              })}
              className="w-4 h-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Income Categories</CardTitle>
            <CardDescription>Manage income source categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Add new income category"
                value={newIncomeCategory}
                onChange={(e) => setNewIncomeCategory(e.target.value)}
              />
              <Button onClick={addIncomeCategory} size="sm">Add</Button>
            </div>
            <div className="space-y-2">
              {settings.categories.incomeCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{category}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeIncomeCategory(category)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Manage expense type categories</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Add new expense category"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
              />
              <Button onClick={addExpenseCategory} size="sm">Add</Button>
            </div>
            <div className="space-y-2">
              {settings.categories.expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{category}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeExpenseCategory(category)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup & Data Management */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Backup & Data Management
          </CardTitle>
          <CardDescription>Manage your accounting data and backups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Auto Backup</Label>
              <select
                id="backupFrequency"
                className="w-full p-2 border rounded-md"
                value={settings.backupFrequency}
                onChange={(e) => setSettings({...settings, backupFrequency: e.target.value})}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Export Settings</Label>
              <Button variant="outline" onClick={handleExportSettings} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Settings
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Import Settings</Label>
              <label className="w-full">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSettings}
                  className="hidden"
                />
                <Button variant="outline" className="w-full" onClick={() => document.querySelector('input[type="file"]')?.click()}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Settings
                </Button>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default AccountingSettings;
