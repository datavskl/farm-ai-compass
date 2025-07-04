import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Upload, 
  Leaf, 
  Bug, 
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileImage,
  Microscope,
  Shield,
  Zap
} from 'lucide-react';

const PlantDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const diseaseDetection = {
    disease: "Late Blight (Phytophthora infestans)",
    confidence: 94,
    severity: "High",
    stage: "Advanced",
    affectedArea: "35%"
  };

  const symptoms = [
    { name: "Dark brown lesions", severity: "severe", present: true },
    { name: "White fungal growth", severity: "moderate", present: true },
    { name: "Leaf yellowing", severity: "mild", present: true },
    { name: "Stem blackening", severity: "severe", present: false },
    { name: "Fruit rot", severity: "moderate", present: true },
    { name: "Wilting", severity: "mild", present: false }
  ];

  const treatments = [
    {
      treatment: "Copper-based Fungicide",
      application: "Spray every 7-10 days",
      priority: "high",
      cost: "₹450/acre",
      effectiveness: "85%"
    },
    {
      treatment: "Mancozeb Application",
      application: "Apply at first sign of disease",
      priority: "high",
      cost: "₹320/acre",
      effectiveness: "78%"
    },
    {
      treatment: "Remove Affected Plants",
      application: "Immediate removal and disposal",
      priority: "critical",
      cost: "₹150/acre",
      effectiveness: "90%"
    },
    {
      treatment: "Improve Air Circulation",
      application: "Prune and space plants properly",
      priority: "medium",
      cost: "₹200/acre",
      effectiveness: "65%"
    }
  ];

  const preventiveMeasures = [
    "Use disease-resistant varieties",
    "Ensure proper plant spacing",
    "Avoid overhead watering",
    "Apply preventive fungicides",
    "Remove plant debris regularly",
    "Monitor humidity levels"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Plant Disease Detection</h1>
          <p className="text-gray-600">Upload plant images for advanced AI-powered disease identification</p>
        </div>

        {/* Image Upload Section */}
        {!selectedImage && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-gray-900">
                <Camera className="h-6 w-6 mr-2 text-emerald-600" />
                Capture or Upload Plant Image
              </CardTitle>
              <CardDescription>
                Take a clear photo of affected plant parts for AI disease analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center bg-emerald-50/50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-emerald-100 p-4 rounded-full">
                    <FileImage className="h-12 w-12 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">Upload Plant Image</p>
                    <p className="text-sm text-gray-600">
                      Supported formats: JPG, PNG, HEIC (Max 10MB)
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => document.getElementById('camera-input')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
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
                  alt="Plant sample" 
                  className="max-w-sm mx-auto rounded-lg shadow-lg"
                />
                <div className="space-y-4">
                  <div className="animate-spin h-12 w-12 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto"></div>
                  <h3 className="text-xl font-semibold text-gray-900">Analyzing Plant Disease...</h3>
                  <p className="text-gray-600">Our AI is processing your image and identifying potential diseases</p>
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
            {/* Disease Detection Result */}
            <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Disease Detected</h2>
                    <p className="text-red-100">AI-powered plant disease identification</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{diseaseDetection.confidence}%</div>
                    <div className="text-lg text-red-100">Confidence</div>
                    <Badge className="mt-2 bg-white/20 text-white border-white/30">
                      {diseaseDetection.severity} Risk
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Disease Details */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Microscope className="h-5 w-5 mr-2 text-red-600" />
                      Disease Analysis
                    </CardTitle>
                    <CardDescription>
                      Detailed identification and assessment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Identified Disease</h4>
                          <p className="text-lg text-red-600 font-medium">{diseaseDetection.disease}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-700">Severity</h5>
                            <Badge variant="destructive">{diseaseDetection.severity}</Badge>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-700">Stage</h5>
                            <Badge variant="secondary">{diseaseDetection.stage}</Badge>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700">Affected Area</h5>
                          <p className="text-xl font-semibold text-orange-600">{diseaseDetection.affectedArea}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Symptom Analysis</h4>
                        <div className="space-y-2">
                          {symptoms.map((symptom, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded bg-white/50">
                              <span className="text-sm">{symptom.name}</span>
                              <div className="flex items-center gap-2">
                                {symptom.present ? (
                                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                                )}
                                <Badge 
                                  variant={symptom.severity === 'severe' ? 'destructive' : symptom.severity === 'moderate' ? 'default' : 'secondary'}
                                  className="text-xs"
                                >
                                  {symptom.severity}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Recommendations */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Shield className="h-5 w-5 mr-2 text-green-600" />
                      Treatment Recommendations
                    </CardTitle>
                    <CardDescription>
                      AI-recommended treatment plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {treatments.map((treatment, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-white/50">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-900">{treatment.treatment}</h4>
                              <p className="text-sm text-gray-600">{treatment.application}</p>
                            </div>
                            <Badge 
                              variant={treatment.priority === 'critical' ? 'destructive' : treatment.priority === 'high' ? 'default' : 'secondary'}
                            >
                              {treatment.priority}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex gap-4 text-sm">
                              <span><strong>Cost:</strong> {treatment.cost}</span>
                              <span><strong>Effectiveness:</strong> {treatment.effectiveness}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Prevention Tips */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900">
                      <Leaf className="h-5 w-5 mr-2 text-green-600" />
                      Prevention Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {preventiveMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-green-600 text-green-600 hover:bg-green-50">
                      <Shield className="h-4 w-4 mr-2" />
                      Get Treatment Plan
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-50">
                      <Bug className="h-4 w-4 mr-2" />
                      Similar Diseases
                    </Button>
                  </CardContent>
                </Card>

                {/* Analysis Summary */}
                <Card className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-emerald-100">
                      <div className="flex justify-between">
                        <span>Disease Confidence</span>
                        <span className="font-semibold text-white">{diseaseDetection.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Symptoms Detected</span>
                        <span className="font-semibold text-white">{symptoms.filter(s => s.present).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Treatment Options</span>
                        <span className="font-semibold text-white">{treatments.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level</span>
                        <span className="font-semibold text-white">{diseaseDetection.severity}</span>
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

export default PlantDiseaseDetection;