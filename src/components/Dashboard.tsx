import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { QRCodeScanner } from './QRCodeScanner';
import { PersonalVault } from './PersonalVault';
import { FraudDetectionSystem } from './FraudDetectionSystem';
import { 
  Upload, 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  LogOut,
  Scan,
  Database,
  Lock,
  FileSpreadsheet,
  Users,
  QrCode,
  Vault,
  Eye,
  Share,
  Star,
  Brain
} from 'lucide-react';
import type { User } from '../App';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'verification' | 'admin' | 'bulk-upload') => void;
}

const roleFeatures = {
  student: [
    { icon: Upload, title: 'Upload Certificate', description: 'Upload your academic certificates for verification', action: 'verification' },
    { icon: Vault, title: 'Personal Vault', description: 'Secure storage for all verified certificates', action: 'vault', count: 3 },
    { icon: QrCode, title: 'QR Scanner', description: 'Scan QR codes for instant verification', action: 'qr-scanner' },
    { icon: Share, title: 'Share Certificates', description: 'Share verified certificates with employers', count: '5 shared' },
    { icon: Shield, title: 'Trust Score', description: 'Your personal authenticity rating', count: '98%' },
  ],
  institution: [
    { icon: FileSpreadsheet, title: 'Bulk Certificate Upload', description: 'Upload CSV/Excel to generate multiple certificates', action: 'bulk-upload' },
    { icon: Database, title: 'Issue Single Certificate', description: 'Create and issue individual certificates', action: 'verification' },
    { icon: FileCheck, title: 'Issued Certificates', description: 'Manage issued certificates', count: 156 },
    { icon: Brain, title: 'AI Fraud Detection', description: 'Monitor for suspicious activities', action: 'fraud-detection' },
    { icon: TrendingUp, title: 'Trust Score', description: 'Your institutional trust rating', count: '98.5%' },
  ],
  verifier: [
    { icon: Scan, title: 'Verify Certificates', description: 'Verify submitted certificates', action: 'verification' },
    { icon: QrCode, title: 'QR Code Scanner', description: 'Quick verification via mobile scan', action: 'qr-scanner' },
    { icon: Star, title: 'Trust Scoring', description: 'Advanced authenticity scoring system', count: '96% avg' },
    { icon: AlertTriangle, title: 'Flagged Items', description: 'Review suspicious certificates', count: 7 },
    { icon: Clock, title: 'Pending Reviews', description: 'Certificates awaiting verification', count: 23 },
  ]
};

const recentActivity = [
  {
    id: 1,
    action: 'Certificate Verified',
    details: 'B.Tech Computer Science - IIT Dhanbad',
    status: 'verified',
    time: '2 hours ago',
    blockchain: '0xa1b2c3...'
  },
  {
    id: 2,
    action: 'Suspicious Activity Detected',
    details: 'Tampered certificate detected',
    status: 'flagged',
    time: '4 hours ago',
    blockchain: '0xd4e5f6...'
  },
  {
    id: 3,
    action: 'New Certificate Uploaded',
    details: 'M.Tech Data Science - NIT Jamshedpur',
    status: 'pending',
    time: '1 day ago',
    blockchain: '0xg7h8i9...'
  }
];

export function Dashboard({ user, onLogout, onNavigate }: DashboardProps) {
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showPersonalVault, setShowPersonalVault] = useState(false);
  const [showFraudDetection, setShowFraudDetection] = useState(false);
  
  const features = roleFeatures[user.role] || roleFeatures.student;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'flagged': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      default: return 'text-white/70 bg-white/10 border-white/20';
    }
  };

  const handleFeatureAction = (action: string) => {
    switch (action) {
      case 'qr-scanner':
        setShowQRScanner(true);
        break;
      case 'vault':
        setShowPersonalVault(true);
        break;
      case 'fraud-detection':
        setShowFraudDetection(true);
        break;
      default:
        onNavigate(action as any);
    }
  };

  const handleQRScanResult = (result: any) => {
    console.log('QR Scan Result:', result);
    // Handle the scan result - could show in a modal or navigate to verification
  };

  if (showQRScanner) {
    return (
      <QRCodeScanner
        onClose={() => setShowQRScanner(false)}
        onScanResult={handleQRScanResult}
      />
    );
  }

  if (showPersonalVault) {
    return (
      <PersonalVault
        user={user}
        onClose={() => setShowPersonalVault(false)}
      />
    );
  }

  if (showFraudDetection) {
    return (
      <FraudDetectionSystem
        onClose={() => setShowFraudDetection(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580077910645-a6fd54032e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGFyayUyMGdyaWR8ZW58MXx8fHwxNzU3Nzk3MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              <motion.div
                className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-6 h-6 text-yellow-400" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-white">Academia Validator</h1>
                <p className="text-yellow-400 text-sm capitalize">{user.role} Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-white/70 text-sm">{user.email}</p>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user.name}
          </h2>
          <p className="text-white/70">
            Secure certificate verification and authenticity validation at your fingertips.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-1 gap-6 mb-8 ${
          user.role === 'institution' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
        }`}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-black/40 backdrop-blur-lg border-yellow-400/30 hover:border-yellow-400/50 transition-all cursor-pointer group ${
                feature.action === 'bulk-upload' ? 'border-blue-400/30 hover:border-blue-400/50' : ''
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <feature.icon className={`w-8 h-8 group-hover:scale-110 transition-transform ${
                      feature.action === 'bulk-upload' ? 'text-blue-400' : 'text-yellow-400'
                    }`} />
                    {feature.count && (
                      <Badge className="bg-yellow-400/20 text-yellow-400">
                        {feature.count}
                      </Badge>
                    )}
                    {feature.action === 'bulk-upload' && (
                      <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                        AI Powered
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                {feature.action && (
                  <CardContent className="pt-0">
                    <Button
                      onClick={() => handleFeatureAction(feature.action as any)}
                      className={`w-full ${
                        feature.action === 'bulk-upload' 
                          ? 'bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20'
                          : feature.action === 'qr-scanner'
                          ? 'bg-purple-400/10 text-purple-400 border border-purple-400/30 hover:bg-purple-400/20'
                          : feature.action === 'vault'
                          ? 'bg-green-400/10 text-green-400 border border-green-400/30 hover:bg-green-400/20'
                          : feature.action === 'fraud-detection'
                          ? 'bg-red-400/10 text-red-400 border border-red-400/30 hover:bg-red-400/20'
                          : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20'
                      }`}
                    >
                      {feature.action === 'bulk-upload' ? (
                        <>
                          <Users className="w-4 h-4 mr-2" />
                          Bulk Upload
                        </>
                      ) : feature.action === 'qr-scanner' ? (
                        <>
                          <QrCode className="w-4 h-4 mr-2" />
                          Scan QR
                        </>
                      ) : feature.action === 'vault' ? (
                        <>
                          <Vault className="w-4 h-4 mr-2" />
                          Open Vault
                        </>
                      ) : feature.action === 'fraud-detection' ? (
                        <>
                          <Brain className="w-4 h-4 mr-2" />
                          AI Monitor
                        </>
                      ) : (
                        'Open'
                      )}
                    </Button>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                Recent Activity
              </CardTitle>
              <CardDescription className="text-white/70">
                Latest verification activities and system updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{activity.action}</h4>
                      <p className="text-white/70 text-sm">{activity.details}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-white/50 text-xs">{activity.time}</span>
                        <div className="flex items-center text-xs text-white/50">
                          <Lock className="w-3 h-3 mr-1" />
                          {activity.blockchain}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(activity.status)} capitalize`}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Access */}
        {user.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6"
          >
            <Button
              onClick={() => onNavigate('admin')}
              className="w-full bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Access Admin Dashboard
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}