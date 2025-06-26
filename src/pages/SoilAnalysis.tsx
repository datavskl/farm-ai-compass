
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  Beaker, 
  Leaf, 
  Droplets, 
  Zap,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  FileImage
} from 'lucide-react';

const SoilAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const soilParameters = [
    { name: "pH Level", value: 6.8, ideal: "6.0-7.0", status: "good", color: "bg-green-500" },
    { name: "Nitrogen (N)", value: 78, ideal: "75-85%", status: "good", color: "bg-green-500" },
    { name: "Phosphorus (P)", value: 45, ideal: "50-70%", status: "low", color: "bg-yellow-500" },
    { name: "Potassium (K)", value: 82, ideal: "75-90%", status: "good", color: "bg-green-500" },
    { name: "Organic Matter", value: 3.2, ideal: "3.0-5.0%", status: "good", color: "bg-green-500" },
    { name: "Moisture", value: 35, ideal: "40-60%", status: "low", color: "bg-yellow-500" },
    { name: "Calcium", value: 68, ideal: "65-75%", status: "good", color: "bg-green-500" },
    { name: "Magnesium", value: 42, ideal: "45-55%", status: "low", color: "bg-yellow-500" },
    { name: "Sulfur", value: 15, ideal: "10-20 ppm", status: "good", color: "bg-green-500" },
    { name: "Iron", value: 28, ideal: "25-35 ppm", status: "good", color: "bg-green-500" },
    { name: "Zinc", value: 8, ideal: "5-15 ppm", status: "good", color: "bg-green-500" },
    { name: "Boron", value: 0.8, ideal: "0.5-2.0 ppm", status: "good", color: "bg-green-500" }
  ];

  const recommendations = [
    {
      issue: "Low Phosphorus Content",
      solution: "Apply DAP fertilizer @ 50kg/acre or Bone meal @ 100kg/acre",
      priority: "high",
      cost: "₹2,500/acre",
      timeline: "Apply before next sowing season"
    },
    {
      issue: "Low Soil Moisture",
      solution: "Improve irrigation frequency and add organic mulch",
      priority: "medium",
      cost: "₹1,200/acre",
      timeline: "Implement within 2 weeks"
    },
    {
      issue: "Low Magnesium",
      solution: "Apply Epsom salt @ 25kg/acre or Dolomite lime",
      priority: "medium",
      cost: "₹800/acre",
      timeline: "Can be applied with next fertilizer dose"
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        // Simulate AI analysis delay
        setTimeout(() => {
          setAnalysisComplete(true);
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const overallHealth = Math.round(soilParameters.reduce((acc, param) => {
    return acc + (param.status === 'good' ? 85 : param.status === 'medium' ? 65 : 45);
  }, 0) / soilParameters.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Soil Health Analyzer</h1>
          <p className="text-gray-600">Upload soil images for comprehensive AI-powered analysis</p>
        </div>

        {/* Image Upload Section */}
        {!selectedImage && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-gray-900">
                <Camera className="h-6 w-6 mr-2 text-green-600" />
                Capture or Upload Soil Sample
              </CardTitle>
              <CardDescription>
                Take a clear photo of your soil sample for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-green-50/50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-green-100 p-4 rounded-full">
                    <FileImage className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">Upload Soil Image</p>
                    <p className="text-sm text-gray-600">
                      Supported formats: JPG, PNG, HEIC (Max 10MB)
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => document.getElementById('camera-input')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                  <input
                    id="camera-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis in Progress */}
        {selectedImage && !analysisComplete && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <img 
                  src={selectedImage} 
                  alt="Soil sample" 
                  className="max-w-sm mx-auto rounded-lg shadow-lg"
                />
                <div className="space-y-4">
                  <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
                  <h3 className="text-xl font-semibold text-gray-900">Analyzing Soil Sample...</h3>
                  <p className="text-gray-600">Our AI is processing your image and analyzing soil parameters</p>
                  <div className="max-w-md mx-auto">
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisComplete && (
          <div className="space-y-6">
            {/* Soil Health Score */}
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Overall Soil Health Score</h2>
                    <p className="text-green-100">Based on 12-parameter AI analysis</p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold">{overallHealth}</div>
                    <div className="text-xl text-green-100">/ 100</div>
                    <Badge className="mt-2 bg-white/20 text-white border-white/30">
                      {overallHealth >= 80 ? 'Excellent' : overallHealth >= 65 ? 'Good' : 'Needs Attention'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Soil Parameters */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Beaker className="h-5 w-5 mr-2 text-blue-600" />
                      Detailed Soil Analysis
                    </CardTitle>
                    <CardDescription>
                      Comprehensive 12-parameter soil health assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {soilParameters.map((param, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-white/50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{param.name}</h4>
                              <p className="text-sm text-gray-600">Ideal: {param.ideal}</p>
                            </div>
                            <Badge 
                              variant={param.status === 'good' ? 'default' : 'secondary'}
                              className={param.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}
                            >
                              {param.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Current Level</span>
                              <span className="font-semibold">{param.value}{param.name === 'pH Level' ? '' : typeof param.value === 'number' && param.value < 10 ? '%' : param.value < 50 ? ' ppm' : '%'}</span>
                            </div>
                            <Progress value={Math.min(param.value * (param.name === 'pH Level' ? 14.3 : 1), 100)} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations Sidebar */}
              <div className="space-y-6">
                {/* AI Recommendations */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                      AI Recommendations
                    </CardTitle>
                    <CardDescription>
                      Personalized improvement suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-white/50">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            rec.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                          }`}>
                            <AlertCircle className={`h-4 w-4 ${
                              rec.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{rec.issue}</h4>
                            <p className="text-sm text-gray-600 mb-2">{rec.solution}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge 
                                variant={rec.priority === 'high' ? 'destructive' : 'default'}
                                className="text-xs"
                              >
                                {rec.priority} priority
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {rec.cost}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{rec.timeline}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50">
                      <Leaf className="h-4 w-4 mr-2" />
                      Get Fertilizer Plan
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Droplets className="h-4 w-4 mr-2" />
                      Irrigation Schedule
                    </Button>
                  </CardContent>
                </Card>

                {/* Analysis Summary */}
                <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-blue-100">
                      <div className="flex justify-between">
                        <span>Parameters Analyzed</span>
                        <span className="font-semibold text-white">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimal Parameters</span>
                        <span className="font-semibold text-white">9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Needs Improvement</span>
                        <span className="font-semibold text-white">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Confidence Score</span>
                        <span className="font-semibold text-white">94%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilAnalysis;
