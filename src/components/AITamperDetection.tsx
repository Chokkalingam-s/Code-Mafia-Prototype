import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Brain, 
  FileText, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  Eye,
  Upload,
  Zap,
  Camera,
  Search,
  Shield,
  Award,
  Clock,
  TrendingUp
} from 'lucide-react';

interface OCRResult {
  text: string;
  confidence: number;
  boundingBoxes: Array<{
    text: string;
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
  }>;
}

interface TamperAnalysis {
  overallScore: number;
  fontConsistency: number;
  pixelAnalysis: number;
  metadataCheck: number;
  digitalSignature: number;
  suspiciousAreas: Array<{
    area: string;
    suspicionLevel: 'low' | 'medium' | 'high';
    description: string;
  }>;
}

interface AITamperDetectionProps {
  onClose: () => void;
  certificateFile?: File;
}

export function AITamperDetection({ onClose, certificateFile }: AITamperDetectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(certificateFile || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [tamperAnalysis, setTamperAnalysis] = useState<TamperAnalysis | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock extracted certificate data
  const mockExtractedData = {
    studentName: 'Priya Sharma',
    rollNumber: '2021BCA001',
    course: 'Bachelor of Computer Applications',
    year: '2024',
    grade: 'First Class',
    university: 'Ranchi University',
    certificateNumber: 'RU/BCA/2024/001',
    issueDate: '2024-06-15'
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const runAIAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate AI analysis stages
    const stages = [
      { name: 'OCR Text Extraction', duration: 2000 },
      { name: 'Font Analysis', duration: 1500 },
      { name: 'Pixel Pattern Detection', duration: 2500 },
      { name: 'Metadata Verification', duration: 1000 },
      { name: 'Digital Signature Check', duration: 1500 },
      { name: 'Tamper Score Calculation', duration: 1000 }
    ];

    let currentProgress = 0;
    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      currentProgress += 100 / stages.length;
      setAnalysisProgress(Math.min(currentProgress, 100));
    }

    // Mock OCR results
    setOcrResult({
      text: `
        RANCHI UNIVERSITY
        CERTIFICATE OF GRADUATION
        
        This is to certify that PRIYA SHARMA
        Roll No: 2021BCA001
        has successfully completed the course of
        BACHELOR OF COMPUTER APPLICATIONS
        and is awarded FIRST CLASS
        
        Date: 15th June 2024
        Certificate No: RU/BCA/2024/001
      `,
      confidence: 94.5,
      boundingBoxes: [
        { text: 'PRIYA SHARMA', x: 120, y: 180, width: 200, height: 25, confidence: 98.2 },
        { text: '2021BCA001', x: 140, y: 220, width: 120, height: 20, confidence: 96.8 },
        { text: 'FIRST CLASS', x: 160, y: 340, width: 140, height: 22, confidence: 97.5 }
      ]
    });

    // Mock tamper analysis
    setTamperAnalysis({
      overallScore: 92,
      fontConsistency: 88,
      pixelAnalysis: 95,
      metadataCheck: 90,
      digitalSignature: 94,
      suspiciousAreas: [
        {
          area: 'Grade Section',
          suspicionLevel: 'low',
          description: 'Minor font weight variation detected, within normal range'
        },
        {
          area: 'Date Area',
          suspicionLevel: 'low',
          description: 'Consistent formatting and authentic appearance'
        }
      ]
    });

    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-400/20 border-green-400/30';
    if (score >= 70) return 'bg-yellow-400/20 border-yellow-400/30';
    return 'bg-red-400/20 border-red-400/30';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* AI Analysis Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:25px_25px] animate-pulse"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center border border-blue-400/30"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Brain className="w-6 h-6 text-blue-400" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Tamper Detection System</h1>
                <p className="text-blue-400/80">Advanced OCR and authenticity analysis</p>
              </div>
            </div>
            <Button onClick={onClose} variant="outline" className="border-white/20 text-white">
              Close Analysis
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-400/30 p-6">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-400" />
                Certificate Upload
              </h3>
              
              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-400/30 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400/50 transition-colors"
                >
                  <FileText className="w-12 h-12 text-blue-400/60 mx-auto mb-3" />
                  <p className="text-white/70 mb-2">Click to upload certificate</p>
                  <p className="text-white/50 text-sm">PNG, JPG, PDF up to 10MB</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded border">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{selectedFile.name}</p>
                      <p className="text-white/60 text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-blue-400/30 text-blue-400"
                    >
                      Change
                    </Button>
                  </div>
                  
                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Certificate preview"
                        className="w-full h-48 object-cover rounded-lg border border-white/20"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                    </div>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={runAIAnalysis}
                disabled={!selectedFile || isAnalyzing}
                className="w-full mt-4 bg-blue-400/20 text-blue-400 border border-blue-400/30 hover:bg-blue-400/30"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4 mr-2" />
                    Start AI Analysis
                  </>
                )}
              </Button>
            </Card>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-blue-400/30 p-6">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    AI Analysis in Progress
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Overall Progress</span>
                      <span className="text-blue-400 text-sm">{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-3" />
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-white/60">OCR Extraction</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-white/60">Font Analysis</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Scan className="w-3 h-3 text-blue-400 animate-pulse" />
                        <span className="text-white/60">Pixel Detection</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-yellow-400" />
                        <span className="text-white/60">Metadata Check</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* OCR Results */}
            {ocrResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-green-400/30 p-6">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-400" />
                    OCR Extracted Data
                    <Badge className="bg-green-400/20 text-green-400 ml-auto">
                      {ocrResult.confidence}% Confidence
                    </Badge>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-white/60">Student Name:</span>
                      <p className="text-white">{mockExtractedData.studentName}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Roll Number:</span>
                      <p className="text-white">{mockExtractedData.rollNumber}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Course:</span>
                      <p className="text-white">{mockExtractedData.course}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Grade:</span>
                      <p className="text-white">{mockExtractedData.grade}</p>
                    </div>
                    <div>
                      <span className="text-white/60">University:</span>
                      <p className="text-white">{mockExtractedData.university}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Year:</span>
                      <p className="text-white">{mockExtractedData.year}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tamper Analysis */}
            {tamperAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className={`bg-white/5 backdrop-blur-sm border p-6 ${getScoreBg(tamperAnalysis.overallScore)}`}>
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Authenticity Analysis
                    <Badge className={`ml-auto ${getScoreBg(tamperAnalysis.overallScore)}`}>
                      <Award className="w-3 h-3 mr-1" />
                      {tamperAnalysis.overallScore}% Authentic
                    </Badge>
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Font Consistency</span>
                        <span className={`text-sm ${getScoreColor(tamperAnalysis.fontConsistency)}`}>
                          {tamperAnalysis.fontConsistency}%
                        </span>
                      </div>
                      <Progress value={tamperAnalysis.fontConsistency} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Pixel Analysis</span>
                        <span className={`text-sm ${getScoreColor(tamperAnalysis.pixelAnalysis)}`}>
                          {tamperAnalysis.pixelAnalysis}%
                        </span>
                      </div>
                      <Progress value={tamperAnalysis.pixelAnalysis} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Metadata Check</span>
                        <span className={`text-sm ${getScoreColor(tamperAnalysis.metadataCheck)}`}>
                          {tamperAnalysis.metadataCheck}%
                        </span>
                      </div>
                      <Progress value={tamperAnalysis.metadataCheck} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70 text-sm">Digital Signature</span>
                        <span className={`text-sm ${getScoreColor(tamperAnalysis.digitalSignature)}`}>
                          {tamperAnalysis.digitalSignature}%
                        </span>
                      </div>
                      <Progress value={tamperAnalysis.digitalSignature} className="h-2" />
                    </div>
                  </div>

                  {/* Suspicious Areas */}
                  <div>
                    <h4 className="text-white font-medium mb-3">Detailed Analysis</h4>
                    <div className="space-y-2">
                      {tamperAnalysis.suspiciousAreas.map((area, index) => (
                        <div key={index} className="flex items-start gap-3 p-2 bg-white/5 rounded">
                          <Badge className={`text-xs ${
                            area.suspicionLevel === 'high' ? 'bg-red-400/20 text-red-400' :
                            area.suspicionLevel === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-green-400/20 text-green-400'
                          }`}>
                            {area.suspicionLevel}
                          </Badge>
                          <div className="flex-1">
                            <p className="text-white text-sm">{area.area}</p>
                            <p className="text-white/70 text-xs">{area.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Final Verdict */}
            {tamperAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Alert className={`border ${
                  tamperAnalysis.overallScore >= 90 ? 'border-green-400/30 bg-green-400/10' :
                  tamperAnalysis.overallScore >= 70 ? 'border-yellow-400/30 bg-yellow-400/10' :
                  'border-red-400/30 bg-red-400/10'
                }`}>
                  {tamperAnalysis.overallScore >= 90 ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                  <AlertDescription className="text-white">
                    <strong>AI Verdict:</strong> This certificate appears to be{' '}
                    <span className={tamperAnalysis.overallScore >= 90 ? 'text-green-400' : 'text-yellow-400'}>
                      {tamperAnalysis.overallScore >= 90 ? 'authentic' : 'potentially modified'}
                    </span>{' '}
                    with a confidence score of {tamperAnalysis.overallScore}%.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}