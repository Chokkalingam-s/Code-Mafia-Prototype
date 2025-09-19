import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Brain, 
  Zap, 
  TrendingUp,
  Clock,
  MapPin,
  User,
  Building,
  FileText,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';

interface FraudAlert {
  id: string;
  type: 'document_tampering' | 'duplicate_submission' | 'suspicious_pattern' | 'fake_institution';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  certificateId: string;
  studentName: string;
  institution: string;
  detectedAt: Date;
  aiConfidence: number;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
  evidence: string[];
}

interface FraudDetectionSystemProps {
  onClose: () => void;
}

export function FraudDetectionSystem({ onClose }: FraudDetectionSystemProps) {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [realTimeDetection, setRealTimeDetection] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<FraudAlert | null>(null);

  // Mock fraud alerts for demo
  const mockAlerts: FraudAlert[] = [
    {
      id: 'FRAUD_001',
      type: 'document_tampering',
      severity: 'high',
      title: 'AI Detected Document Tampering',
      description: 'Advanced OCR analysis detected digital modifications in certificate text areas',
      certificateId: 'CERT_SUSPICIOUS_001',
      studentName: 'Amit Kumar Singh',
      institution: 'Unknown Institute XYZ',
      detectedAt: new Date(),
      aiConfidence: 94,
      status: 'active',
      evidence: [
        'Font inconsistencies detected in grade section',
        'Digital signature mismatch',
        'Unusual pixel patterns around text modifications',
        'Metadata analysis shows recent editing'
      ]
    },
    {
      id: 'FRAUD_002',
      type: 'duplicate_submission',
      severity: 'medium',
      title: 'Duplicate Certificate Submission',
      description: 'Same certificate submitted multiple times with different student names',
      certificateId: 'CERT_DUPLICATE_002',
      studentName: 'Ravi Sharma / Suresh Kumar',
      institution: 'Jharkhand Technical University',
      detectedAt: new Date(Date.now() - 3600000),
      aiConfidence: 87,
      status: 'investigating',
      evidence: [
        'Identical blockchain hash detected',
        'Same document ID used twice',
        'Similar biometric patterns',
        'IP address correlation'
      ]
    },
    {
      id: 'FRAUD_003',
      type: 'fake_institution',
      severity: 'high',
      title: 'Unrecognized Institution',
      description: 'Certificate from institution not in verified database',
      certificateId: 'CERT_FAKE_003',
      studentName: 'Deepak Yadav',
      institution: 'International University of Excellence',
      detectedAt: new Date(Date.now() - 7200000),
      aiConfidence: 96,
      status: 'active',
      evidence: [
        'Institution not in UGC database',
        'Suspicious domain registration',
        'No physical address verification',
        'Invalid accreditation claims'
      ]
    },
    {
      id: 'FRAUD_004',
      type: 'suspicious_pattern',
      severity: 'medium',
      title: 'Unusual Submission Pattern',
      description: 'Batch submission from same IP with similar data patterns',
      certificateId: 'CERT_PATTERN_004',
      studentName: 'Multiple Students',
      institution: 'Various Institutions',
      detectedAt: new Date(Date.now() - 10800000),
      aiConfidence: 78,
      status: 'resolved',
      evidence: [
        '15 certificates from same IP',
        'Sequential roll numbers',
        'Similar document formatting',
        'Timing correlation analysis'
      ]
    }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
    
    // Simulate real-time fraud detection
    if (realTimeDetection) {
      const interval = setInterval(() => {
        // Randomly add new alerts for demo
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
          const newAlert: FraudAlert = {
            id: `FRAUD_${Date.now()}`,
            type: ['document_tampering', 'duplicate_submission', 'suspicious_pattern'][Math.floor(Math.random() * 3)] as any,
            severity: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
            title: 'New Fraud Alert Detected',
            description: 'Real-time AI monitoring detected suspicious activity',
            certificateId: `CERT_RT_${Date.now()}`,
            studentName: 'Real-time Detection',
            institution: 'Various',
            detectedAt: new Date(),
            aiConfidence: 75 + Math.random() * 25,
            status: 'active',
            evidence: ['Real-time pattern analysis', 'Automated detection system']
          };
          
          setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only latest 10
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [realTimeDetection]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-400/20 text-red-400 border-red-400/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'low': return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-400/20 text-red-400';
      case 'investigating': return 'bg-yellow-400/20 text-yellow-400';
      case 'resolved': return 'bg-green-400/20 text-green-400';
      case 'false_positive': return 'bg-blue-400/20 text-blue-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document_tampering': return <FileText className="w-4 h-4" />;
      case 'duplicate_submission': return <User className="w-4 h-4" />;
      case 'suspicious_pattern': return <TrendingUp className="w-4 h-4" />;
      case 'fake_institution': return <Building className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const updateAlertStatus = (alertId: string, newStatus: FraudAlert['status']) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const highSeverityAlerts = alerts.filter(a => a.severity === 'high' && a.status === 'active').length;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Security Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[size:30px_30px] animate-pulse"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full opacity-30"
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.3,
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
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-red-400/20 rounded-full flex items-center justify-center border border-red-400/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.4)', '0 0 0 10px rgba(239, 68, 68, 0)', '0 0 0 0 rgba(239, 68, 68, 0)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-6 h-6 text-red-400" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">AI Fraud Detection System</h1>
                <p className="text-red-400/80">Real-time certificate authenticity monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-green-400" />
                <Badge className={realTimeDetection ? 'bg-green-400/20 text-green-400' : 'bg-gray-400/20 text-gray-400'}>
                  {realTimeDetection ? 'Live Monitoring' : 'Paused'}
                </Badge>
              </div>
              <Button 
                onClick={() => setRealTimeDetection(!realTimeDetection)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white"
              >
                {realTimeDetection ? 'Pause' : 'Resume'}
              </Button>
              <Button onClick={onClose} variant="outline" className="border-white/20 text-white">
                Close System
              </Button>
            </div>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-red-400/10 backdrop-blur-sm border-red-400/30 p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <div>
                  <p className="text-red-400 text-xl font-bold">{activeAlerts}</p>
                  <p className="text-white/70 text-sm">Active Alerts</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-yellow-400/10 backdrop-blur-sm border-yellow-400/30 p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-yellow-400 text-xl font-bold">{highSeverityAlerts}</p>
                  <p className="text-white/70 text-sm">High Priority</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-blue-400/10 backdrop-blur-sm border-blue-400/30 p-4">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-blue-400 text-xl font-bold">96%</p>
                  <p className="text-white/70 text-sm">AI Accuracy</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-green-400/10 backdrop-blur-sm border-green-400/30 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 text-xl font-bold">
                    {alerts.filter(a => a.status === 'resolved').length}
                  </p>
                  <p className="text-white/70 text-sm">Resolved</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-purple-400/10 backdrop-blur-sm border-purple-400/30 p-4">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-purple-400 text-xl font-bold">24/7</p>
                  <p className="text-white/70 text-sm">Monitoring</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Alerts List */}
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-4">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group"
              >
                <Card className={`bg-white/5 backdrop-blur-sm border transition-all p-6 ${
                  alert.severity === 'high' ? 'border-red-400/30 hover:border-red-400/50' :
                  alert.severity === 'medium' ? 'border-yellow-400/30 hover:border-yellow-400/50' :
                  'border-blue-400/30 hover:border-blue-400/50'
                }`}>
                  <div className="flex items-start gap-4">
                    {/* Alert Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${getSeverityColor(alert.severity)}`}>
                      {getTypeIcon(alert.type)}
                    </div>

                    {/* Alert Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-medium text-lg mb-1">{alert.title}</h3>
                          <p className="text-white/70 text-sm">{alert.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      {/* Alert Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-white/60">Certificate ID:</span>
                          <p className="text-white font-mono">{alert.certificateId}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Student:</span>
                          <p className="text-white">{alert.studentName}</p>
                        </div>
                        <div>
                          <span className="text-white/60">Institution:</span>
                          <p className="text-white">{alert.institution}</p>
                        </div>
                      </div>

                      {/* AI Confidence & Timing */}
                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-blue-400" />
                          <span className="text-white/60 text-sm">AI Confidence:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={alert.aiConfidence} className="w-20 h-2" />
                            <span className="text-blue-400 text-sm font-medium">{alert.aiConfidence}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-white/60 text-sm">
                            {alert.detectedAt.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {/* Evidence (collapsible) */}
                      {selectedAlert?.id === alert.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <h4 className="text-white font-medium mb-2">Evidence Found:</h4>
                          <ul className="space-y-1">
                            {alert.evidence.map((evidence, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                                <span className="text-white/70">{evidence}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedAlert(selectedAlert?.id === alert.id ? null : alert)}
                          className="bg-blue-400/20 text-blue-400 border border-blue-400/30 hover:bg-blue-400/30"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {selectedAlert?.id === alert.id ? 'Hide' : 'View'} Evidence
                        </Button>
                        
                        {alert.status === 'active' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateAlertStatus(alert.id, 'investigating')}
                              className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/30"
                            >
                              Investigate
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateAlertStatus(alert.id, 'false_positive')}
                              className="bg-gray-400/20 text-gray-400 border border-gray-400/30 hover:bg-gray-400/30"
                            >
                              Mark False Positive
                            </Button>
                          </>
                        )}
                        
                        {alert.status === 'investigating' && (
                          <Button
                            size="sm"
                            onClick={() => updateAlertStatus(alert.id, 'resolved')}
                            className="bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {alerts.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-green-400/50 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No fraud alerts detected</p>
              <p className="text-white/40 text-sm">All certificates are secure and verified</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}