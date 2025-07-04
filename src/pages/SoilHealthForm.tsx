import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Beaker, 
  MapPin, 
  Calendar,
  TestTube,
  Droplets,
  Thermometer,
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const SoilHealthForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    cropType: '',
    fieldSize: '',
    soilType: '',
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    organicMatter: '',
    moisture: '',
    temperature: '',
    lastTestDate: '',
    previousCrop: '',
    fertilizersUsed: '',
    irrigationMethod: '',
    additionalNotes: ''
  });

  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const soilHealthScore = 78;
  const recommendations = [
    {
      parameter: "Phosphorus Level",
      status: "Low",
      recommendation: "Apply DAP fertilizer @ 50kg/acre",
      priority: "High"
    },
    {
      parameter: "Organic Matter",
      status: "Moderate",
      recommendation: "Add compost or farmyard manure",
      priority: "Medium"
    },
    {
      parameter: "Soil pH",
      status: "Good",
      recommendation: "Maintain current pH levels",
      priority: "Low"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Soil Health Assessment</h1>
          <p className="text-gray-600">Complete the form below for personalized soil health analysis</p>
        </div>

        {!showResults ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Farm Information
                </CardTitle>
                <CardDescription>
                  Basic details about your farm and field
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Village, District, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="fieldSize">Field Size (acres)</Label>
                  <Input
                    id="fieldSize"
                    type="number"
                    placeholder="e.g., 5.5"
                    value={formData.fieldSize}
                    onChange={(e) => handleInputChange('fieldSize', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cropType">Current/Planned Crop</Label>
                  <Select onValueChange={(value) => handleInputChange('cropType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="onion">Onion</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select onValueChange={(value) => handleInputChange('soilType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loam">Loam</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="rocky">Rocky</SelectItem>
                      <SelectItem value="alluvial">Alluvial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Soil Parameters */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Beaker className="h-5 w-5 mr-2 text-blue-600" />
                  Soil Test Results
                </CardTitle>
                <CardDescription>
                  Enter your soil test values (leave blank if not tested)
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 6.5"
                    value={formData.ph}
                    onChange={(e) => handleInputChange('ph', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nitrogen">Nitrogen (N) %</Label>
                  <Input
                    id="nitrogen"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 1.2"
                    value={formData.nitrogen}
                    onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phosphorus">Phosphorus (P) ppm</Label>
                  <Input
                    id="phosphorus"
                    type="number"
                    placeholder="e.g., 45"
                    value={formData.phosphorus}
                    onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="potassium">Potassium (K) ppm</Label>
                  <Input
                    id="potassium"
                    type="number"
                    placeholder="e.g., 280"
                    value={formData.potassium}
                    onChange={(e) => handleInputChange('potassium', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="organicMatter">Organic Matter %</Label>
                  <Input
                    id="organicMatter"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 3.2"
                    value={formData.organicMatter}
                    onChange={(e) => handleInputChange('organicMatter', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="moisture">Moisture %</Label>
                  <Input
                    id="moisture"
                    type="number"
                    placeholder="e.g., 35"
                    value={formData.moisture}
                    onChange={(e) => handleInputChange('moisture', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Farm History
                </CardTitle>
                <CardDescription>
                  Information about previous farming practices
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lastTestDate">Last Soil Test Date</Label>
                  <Input
                    id="lastTestDate"
                    type="date"
                    value={formData.lastTestDate}
                    onChange={(e) => handleInputChange('lastTestDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="previousCrop">Previous Crop</Label>
                  <Input
                    id="previousCrop"
                    placeholder="e.g., Rice"
                    value={formData.previousCrop}
                    onChange={(e) => handleInputChange('previousCrop', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="fertilizersUsed">Fertilizers Used Last Season</Label>
                  <Input
                    id="fertilizersUsed"
                    placeholder="e.g., Urea, DAP"
                    value={formData.fertilizersUsed}
                    onChange={(e) => handleInputChange('fertilizersUsed', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="irrigationMethod">Irrigation Method</Label>
                  <Select onValueChange={(value) => handleInputChange('irrigationMethod', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                      <SelectItem value="furrow">Furrow Irrigation</SelectItem>
                      <SelectItem value="rainfed">Rain-fed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any additional information about your field..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
              <TestTube className="h-5 w-5 mr-2" />
              Analyze Soil Health
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Soil Health Score */}
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Soil Health Score</h2>
                    <p className="text-green-100">Based on provided parameters and AI analysis</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold">{soilHealthScore}</div>
                    <div className="text-xl text-green-100">/ 100</div>
                    <Badge className="mt-2 bg-white/20 text-white border-white/30">
                      {soilHealthScore >= 80 ? 'Excellent' : soilHealthScore >= 65 ? 'Good' : 'Needs Attention'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>
                    Personalized suggestions for soil improvement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white/50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{rec.parameter}</h4>
                        <Badge 
                          variant={rec.status === 'Good' ? 'default' : rec.status === 'Low' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {rec.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.recommendation}</p>
                      <Badge 
                        variant={rec.priority === 'High' ? 'destructive' : rec.priority === 'Medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {rec.priority} Priority
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Download Full Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50">
                    <Beaker className="h-4 w-4 mr-2" />
                    Schedule Soil Test
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50">
                    <Zap className="h-4 w-4 mr-2" />
                    Get Fertilizer Plan
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-purple-600 text-purple-600 hover:bg-purple-50">
                    <Droplets className="h-4 w-4 mr-2" />
                    Irrigation Advice
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={() => setShowResults(false)} 
              variant="outline" 
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Submit New Assessment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilHealthForm;