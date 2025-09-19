import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AITamperDetection } from './AITamperDetection';
import { 
  Upload, 
  FileText, 
  Scan, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  Eye,
  Download,
  Lock,
  Database,
  Zap,
  Brain
} from 'lucide-react';
import type { User } from '../App';

interface CertificateVerificationProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'verification' | 'admin' | 'bulk-upload') => void;
}

interface VerificationResult {
  studentName: string;
  rollNo: string;
  regNo: string;
  course: string;
  year: string;
  marks: string;
  universityName: string;
  certificateId: string;
  isVerified: boolean;
  isSuspicious: boolean;
  confidence: number;
  blockchainHash: string;
  verificationDetails: {
    ocrAccuracy: number;
    databaseMatch: boolean;
    blockchainVerified: boolean;
    aiTamperCheck: boolean;
    sealAuthenticity: boolean;
  };
}

const mockVerificationResults: VerificationResult[] = [
  {
    studentName: 'Priya Sharma',
    rollNo: '18CS001',
    regNo: 'REG2018001',
    course: 'B.Tech Computer Science',
    year: '2022',
    marks: '85.5%',
    universityName: 'IIT Dhanbad',
    certificateId: 'IIT-DHN-2022-001',
    isVerified: true,
    isSuspicious: false,
    confidence: 98.5,
    blockchainHash: '0xa1b2c3d4e5f6789abcdef123456789',
    verificationDetails: {
      ocrAccuracy: 99.2,
      databaseMatch: true,
      blockchainVerified: true,
      aiTamperCheck: true,
      sealAuthenticity: true
    }
  },
  {
    studentName: 'Unknown Student',
    rollNo: '19CS999',
    regNo: 'REG2019999',
    course: 'B.Tech Computer Science',
    year: '2023',
    marks: '95.0%',
    universityName: 'Fake University',
    certificateId: 'FAKE-001',
    isVerified: false,
    isSuspicious: true,
    confidence: 15.3,
    blockchainHash: '',
    verificationDetails: {
      ocrAccuracy: 45.2,
      databaseMatch: false,
      blockchainVerified: false,
      aiTamperCheck: false,
      sealAuthenticity: false
    }
  }
];

export function CertificateVerification({ user, onLogout, onNavigate }: CertificateVerificationProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [showAITamperDetection, setShowAITamperDetection] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const verificationSteps = [
    { icon: Eye, label: 'OCR Extraction', description: 'Extracting text from certificate' },
    { icon: Database, label: 'Database Check', description: 'Verifying against university records' },
    { icon: Lock, label: 'Blockchain Verification', description: 'Checking blockchain hash' },
    { icon: Zap, label: 'AI Tamper Detection', description: 'Analyzing for tampering' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setVerificationResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setVerificationResult(null);
    }
  };

  const startVerification = () => {
    setIsVerifying(true);
    setVerificationStep(0);
    setProgress(0);

    // Simulate verification process
    const stepDuration = 1500;
    const steps = verificationSteps.length;

    verificationSteps.forEach((_, index) => {
      setTimeout(() => {
        setVerificationStep(index + 1);
        setProgress(((index + 1) / steps) * 100);
        
        if (index === steps - 1) {
          // Verification complete
          setTimeout(() => {
            setIsVerifying(false);
            // Randomly pick a result for demo
            const result = Math.random() > 0.3 ? mockVerificationResults[0] : mockVerificationResults[1];
            setVerificationResult(result);
          }, 500);
        }
      }, (index + 1) * stepDuration);
    });
  };

  const resetVerification = () => {
    setUploadedFile(null);
    setVerificationResult(null);
    setIsVerifying(false);
    setVerificationStep(0);
    setProgress(0);
  };

  if (showAITamperDetection) {
    return (
      <AITamperDetection
        onClose={() => setShowAITamperDetection(false)}
        certificateFile={uploadedFile || undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1659177137555-2f1ba453f70c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwY2VydGlmaWNhdGUlMjBibG9ja2NoYWlufGVufDF8fHx8MTc1Nzc5NzI2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Header */}
      <div className="relative z-10 border-b border-yellow-400/20 bg-black/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                size="sm"
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">Certificate Verification</h1>
                <p className="text-yellow-400 text-sm">AI-Powered Authenticity Validation</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-white/70 text-sm capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!uploadedFile ? (
            // Upload Section
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-white flex items-center justify-center">
                    <Upload className="w-6 h-6 mr-2 text-yellow-400" />
                    Upload Certificate
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Upload your academic certificate for AI-powered verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-yellow-400/30 rounded-lg p-12 text-center hover:border-yellow-400/50 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileText className="w-16 h-16 text-yellow-400/50 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">
                      Drop your certificate here or click to browse
                    </h3>
                    <p className="text-white/70 text-sm">
                      Supports PDF, PNG, JPG files up to 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <Button
                      onClick={() => setShowAITamperDetection(true)}
                      className="w-full bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Open AI Tamper Detection Lab
                    </Button>
                    <p className="text-white/50 text-xs text-center mt-2">
                      Advanced AI analysis for document authenticity
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : verificationResult ? (
            // Results Section
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Result Header */}
              <Card className={`backdrop-blur-lg ${
                verificationResult.isVerified 
                  ? 'bg-green-500/10 border-green-400/30' 
                  : 'bg-red-500/10 border-red-400/30'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {verificationResult.isVerified ? (
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      ) : (
                        <XCircle className="w-12 h-12 text-red-400" />
                      )}
                      <div>
                        <h2 className={`text-2xl font-bold ${
                          verificationResult.isVerified ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {verificationResult.isVerified ? 'Certificate Verified' : 'Verification Failed'}
                        </h2>
                        <p className="text-white/70">
                          Confidence: {verificationResult.confidence}%
                        </p>
                      </div>
                    </div>
                    <Badge className={`text-lg px-4 py-2 ${
                      verificationResult.isVerified 
                        ? 'bg-green-400/20 text-green-400 border-green-400/30'
                        : 'bg-red-400/20 text-red-400 border-red-400/30'
                    }`}>
                      {verificationResult.isVerified ? 'AUTHENTIC' : 'SUSPICIOUS'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Certificate Details */}
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white">Extracted Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm">Student Name</label>
                      <p className="text-white font-medium">{verificationResult.studentName}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Roll Number</label>
                      <p className="text-white font-medium">{verificationResult.rollNo}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Course</label>
                      <p className="text-white font-medium">{verificationResult.course}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Year</label>
                      <p className="text-white font-medium">{verificationResult.year}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Marks</label>
                      <p className="text-white font-medium">{verificationResult.marks}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">University</label>
                      <p className="text-white font-medium">{verificationResult.universityName}</p>
                    </div>
                  </div>
                  
                  {verificationResult.blockchainHash && (
                    <div className="mt-4 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">Blockchain Hash:</span>
                      </div>
                      <p className="text-white/70 font-mono text-sm break-all mt-1">
                        {verificationResult.blockchainHash}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Verification Details */}
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white">Verification Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(verificationResult.verificationDetails).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center space-x-2">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )
                          ) : (
                            <span className="text-yellow-400 font-medium">{value}%</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  onClick={resetVerification}
                  className="flex-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Verify Another Certificate
                </Button>
                <Button
                  className="bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </motion.div>
          ) : (
            // Verification Process
            <motion.div
              key="verifying"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Scan className="w-6 h-6 mr-2 text-yellow-400" />
                    Verifying Certificate
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    File: {uploadedFile?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Overall Progress</span>
                      <span className="text-yellow-400">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Verification Steps */}
                  <div className="space-y-4">
                    {verificationSteps.map((step, index) => {
                      const isActive = verificationStep === index + 1;
                      const isCompleted = verificationStep > index;
                      const IconComponent = step.icon;

                      return (
                        <motion.div
                          key={step.label}
                          className={`flex items-center space-x-4 p-4 rounded-lg border transition-all ${
                            isActive
                              ? 'bg-yellow-400/10 border-yellow-400/30'
                              : isCompleted
                              ? 'bg-green-400/10 border-green-400/30'
                              : 'bg-white/5 border-white/10'
                          }`}
                          animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isActive
                              ? 'bg-yellow-400/20'
                              : isCompleted
                              ? 'bg-green-400/20'
                              : 'bg-white/10'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <IconComponent className={`w-5 h-5 ${
                                isActive ? 'text-yellow-400' : 'text-white/50'
                              }`} />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              isActive ? 'text-yellow-400' : isCompleted ? 'text-green-400' : 'text-white'
                            }`}>
                              {step.label}
                            </h4>
                            <p className="text-white/70 text-sm">{step.description}</p>
                          </div>
                          {isActive && (
                            <motion.div
                              className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {!isVerifying && (
                    <div className="flex gap-4">
                      <Button
                        onClick={startVerification}
                        className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Start Verification
                      </Button>
                      <Button
                        onClick={resetVerification}
                        variant="outline"
                        className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}