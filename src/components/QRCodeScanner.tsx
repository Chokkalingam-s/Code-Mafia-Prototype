import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Camera, 
  Scan, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Smartphone,
  Zap,
  X,
  Download,
  Share,
  Clock
} from 'lucide-react';

interface QRScanResult {
  certificateId: string;
  studentName: string;
  university: string;
  course: string;
  year: string;
  isValid: boolean;
  blockchainHash: string;
  trustScore: number;
  lastVerified: Date;
}

interface QRCodeScannerProps {
  onClose: () => void;
  onScanResult: (result: QRScanResult) => void;
}

export function QRCodeScanner({ onClose, onScanResult }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QRScanResult | null>(null);
  const [error, setError] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  // Mock scan results for demo
  const mockScanResults: QRScanResult[] = [
    {
      certificateId: 'CERT_RU_2024_001234',
      studentName: 'Priya Sharma',
      university: 'Ranchi University',
      course: 'Bachelor of Computer Applications',
      year: '2024',
      isValid: true,
      blockchainHash: '0x7d4a8b9c2e1f6a3d5c8b4e7f9a2c6d8e1b5f3a7c9e2d6b8a4f7c1e5d9b3a6c8e',
      trustScore: 98,
      lastVerified: new Date()
    },
    {
      certificateId: 'CERT_BIT_2024_005678',
      studentName: 'Rahul Kumar',
      university: 'Birsa Institute of Technology',
      course: 'Bachelor of Technology - Computer Science',
      year: '2024',
      isValid: true,
      blockchainHash: '0x3f7e9a1c4d6b8e2f5a9c7e4b2d6f8a1c5e9b3d7f2a8c6e4b9d1f7a3c5e8b2d6f',
      trustScore: 96,
      lastVerified: new Date()
    },
    {
      certificateId: 'CERT_FAKE_2024_999999',
      studentName: 'Suspicious Document',
      university: 'Unknown Institution',
      course: 'Questionable Degree',
      year: '2024',
      isValid: false,
      blockchainHash: '',
      trustScore: 12,
      lastVerified: new Date()
    }
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    setError('');
    setScanProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Simulate scan completion
          setTimeout(() => {
            const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)];
            setScanResult(randomResult);
            setIsScanning(false);
            onScanResult(randomResult);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const generateValidationReport = () => {
    if (!scanResult) return;
    
    const reportData = {
      certificateId: scanResult.certificateId,
      status: scanResult.isValid ? 'VERIFIED' : 'INVALID',
      trustScore: scanResult.trustScore,
      timestamp: new Date().toISOString(),
      blockchainHash: scanResult.blockchainHash
    };
    
    // In a real app, this would generate and download a PDF
    console.log('Validation Report:', reportData);
    alert('Validation report generated! (Demo mode - check console)');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black/60 backdrop-blur-xl border-yellow-400/30 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400/20 rounded-full flex items-center justify-center">
                <Scan className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">QR Code Scanner</h3>
                <p className="text-white/60 text-sm">Instant Certificate Verification</p>
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {!isScanning && !scanResult && (
            <div className="space-y-6">
              {/* Scanner Preview */}
              <div className="relative">
                <div className="aspect-square bg-white/5 rounded-lg border-2 border-dashed border-yellow-400/30 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-yellow-400/60 mx-auto mb-3" />
                    <p className="text-white/60 text-sm">Position QR code in camera view</p>
                  </div>
                </div>
                
                {/* Scanning Frame Overlay */}
                <div className="absolute inset-4 border-2 border-yellow-400 rounded-lg opacity-50">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-400"></div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleStartScan}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-medium"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>

              {/* Instructions */}
              <div className="p-4 bg-blue-400/10 rounded-lg border border-blue-400/20">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-400 text-sm font-medium mb-1">Instructions:</p>
                    <ul className="text-white/70 text-xs space-y-1">
                      <li>• Hold your device steady</li>
                      <li>• Ensure good lighting</li>
                      <li>• Keep QR code centered</li>
                      <li>• Wait for automatic detection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="space-y-6">
              {/* Scanning Animation */}
              <div className="relative">
                <div className="aspect-square bg-white/5 rounded-lg border-2 border-yellow-400 overflow-hidden">
                  <div className="relative w-full h-full bg-gradient-to-b from-yellow-400/10 to-transparent">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-yellow-400"
                      animate={{ y: [0, 200, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Scan className="w-16 h-16 text-yellow-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Scanning Progress</span>
                  <span className="text-yellow-400 text-sm">{scanProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/70 text-sm">Analyzing certificate data...</span>
                </div>
              </div>
            </div>
          )}

          {scanResult && (
            <div className="space-y-6">
              {/* Scan Result */}
              <div className={`p-4 rounded-lg border-2 ${
                scanResult.isValid 
                  ? 'bg-green-400/10 border-green-400/30' 
                  : 'bg-red-400/10 border-red-400/30'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {scanResult.isValid ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  )}
                  <div>
                    <p className={`font-medium ${
                      scanResult.isValid ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {scanResult.isValid ? 'Certificate Verified' : 'Invalid Certificate'}
                    </p>
                    <p className="text-white/70 text-sm">
                      Trust Score: {scanResult.trustScore}%
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge className={`${
                      scanResult.trustScore >= 90 ? 'bg-green-400/20 text-green-400' :
                      scanResult.trustScore >= 70 ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-red-400/20 text-red-400'
                    }`}>
                      {scanResult.trustScore >= 90 ? 'Excellent' :
                       scanResult.trustScore >= 70 ? 'Good' : 'Poor'}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-white/60">Student:</span>
                      <p className="text-white">{scanResult.studentName}</p>
                    </div>
                    <div>
                      <span className="text-white/60">University:</span>
                      <p className="text-white">{scanResult.university}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Course:</span>
                      <p className="text-white">{scanResult.course}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Year:</span>
                      <p className="text-white">{scanResult.year}</p>
                    </div>
                  </div>
                  
                  {scanResult.blockchainHash && (
                    <div className="mt-3 p-2 bg-white/5 rounded border">
                      <span className="text-white/60 text-xs">Blockchain Hash:</span>
                      <p className="text-yellow-400 text-xs font-mono break-all">
                        {scanResult.blockchainHash}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={generateValidationReport}
                  className="flex-1 bg-blue-400/20 text-blue-400 border border-blue-400/30 hover:bg-blue-400/30"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button
                  onClick={() => {
                    navigator.share?.({
                      title: 'Certificate Verification',
                      text: `Certificate ${scanResult.isValid ? 'verified' : 'invalid'}: ${scanResult.certificateId}`,
                      url: window.location.href
                    });
                  }}
                  className="flex-1 bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button
                onClick={() => {
                  setScanResult(null);
                  setError('');
                }}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Scan Another Certificate
              </Button>
            </div>
          )}

          {error && (
            <Alert className="border-red-400/30 bg-red-400/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </Card>
      </motion.div>
    </div>
  );
}