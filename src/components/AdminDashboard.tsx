import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  Users, 
  FileCheck, 
  Eye,
  ArrowLeft,
  Database,
  Activity,
  Clock,
  XCircle,
  CheckCircle,
  BarChart3,
  Lock,
  Zap
} from 'lucide-react';
import type { User } from '../App';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'verification' | 'admin' | 'bulk-upload') => void;
}

const fraudAlerts = [
  {
    id: 1,
    type: 'High Risk',
    title: 'Multiple Fake Certificates Detected',
    description: 'Suspicious pattern from IP 192.168.1.100',
    timestamp: '2 hours ago',
    severity: 'critical',
    affectedUsers: 3,
    status: 'investigating'
  },
  {
    id: 2,
    type: 'Medium Risk',
    title: 'Tampered Document Uploaded',
    description: 'AI detected seal manipulation',
    timestamp: '5 hours ago',
    severity: 'medium',
    affectedUsers: 1,
    status: 'resolved'
  },
  {
    id: 3,
    type: 'Low Risk',
    title: 'Database Mismatch',
    description: 'Student name not found in records',
    timestamp: '1 day ago',
    severity: 'low',
    affectedUsers: 1,
    status: 'pending'
  }
];

const systemStats = {
  totalVerifications: 2847,
  successfulVerifications: 2701,
  flaggedDocuments: 146,
  trustScore: 94.8,
  activeUsers: 432,
  blockedIPs: 27
};

const universityStats = [
  { name: 'IIT Dhanbad', verifications: 456, trustScore: 98.2, status: 'excellent' },
  { name: 'NIT Jamshedpur', verifications: 334, trustScore: 96.8, status: 'excellent' },
  { name: 'BIT Mesra', verifications: 278, trustScore: 95.4, status: 'good' },
  { name: 'Ranchi University', verifications: 203, trustScore: 91.2, status: 'good' },
  { name: 'Kolhan University', verifications: 156, trustScore: 87.5, status: 'fair' },
];

const recentActivity = [
  {
    id: 1,
    action: 'Blocked Suspicious IP',
    details: 'IP 203.45.67.89 blocked after 5 failed attempts',
    timestamp: '10 minutes ago',
    type: 'security'
  },
  {
    id: 2,
    action: 'New University Added',
    details: 'Jharkhand Raksha Shakti University registered',
    timestamp: '2 hours ago',
    type: 'system'
  },
  {
    id: 3,
    action: 'Fraud Pattern Detected',
    details: 'Similar fake certificates from different users',
    timestamp: '4 hours ago',
    type: 'fraud'
  },
  {
    id: 4,
    action: 'System Maintenance',
    details: 'Blockchain node updated successfully',
    timestamp: '6 hours ago',
    type: 'maintenance'
  }
];

export function AdminDashboard({ user, onLogout, onNavigate }: AdminDashboardProps) {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-white/70 bg-white/10 border-white/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-white/70';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'security': return Shield;
      case 'fraud': return AlertTriangle;
      case 'system': return Database;
      case 'maintenance': return Activity;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580077910645-a6fd54032e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGFyayUyMGdyaWR8ZW58MXx8fHwxNTc3Nzk3MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Header */}
      <div className="relative z-10 border-b border-red-400/20 bg-black/40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => onNavigate('dashboard')}
                variant="outline"
                size="sm"
                className="border-red-400/30 text-red-400 hover:bg-red-400/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <motion.div
                  className="w-10 h-10 bg-red-400/20 rounded-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Control Center</h1>
                  <p className="text-red-400 text-sm">System Security & Fraud Detection</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-400/20 text-red-400 border-red-400/30">
                <Shield className="w-3 h-3 mr-1" />
                Administrator
              </Badge>
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-white/70 text-sm">System Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-sm">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-red-400/20 data-[state=active]:text-red-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="alerts"
              className="data-[state=active]:bg-red-400/20 data-[state=active]:text-red-400"
            >
              Fraud Alerts
            </TabsTrigger>
            <TabsTrigger 
              value="universities"
              className="data-[state=active]:bg-red-400/20 data-[state=active]:text-red-400"
            >
              Universities
            </TabsTrigger>
            <TabsTrigger 
              value="activity"
              className="data-[state=active]:bg-red-400/20 data-[state=active]:text-red-400"
            >
              Activity Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-lg border-green-400/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-400 text-sm font-medium">Total Verifications</p>
                        <p className="text-3xl font-bold text-white">{systemStats.totalVerifications.toLocaleString()}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <div className="mt-4">
                      <Progress value={95} className="h-2" />
                      <p className="text-green-400/70 text-xs mt-1">95% success rate</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-lg border-red-400/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-400 text-sm font-medium">Flagged Documents</p>
                        <p className="text-3xl font-bold text-white">{systemStats.flaggedDocuments}</p>
                      </div>
                      <XCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="mt-4">
                      <Progress value={5} className="h-2" />
                      <p className="text-red-400/70 text-xs mt-1">5% fraud rate</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-400 text-sm font-medium">Trust Score</p>
                        <p className="text-3xl font-bold text-white">{systemStats.trustScore}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="mt-4">
                      <Progress value={systemStats.trustScore} className="h-2" />
                      <p className="text-yellow-400/70 text-xs mt-1">System reliability</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                  <CardDescription className="text-white/70">
                    Emergency controls and system management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-16 bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20 flex-col">
                      <AlertTriangle className="w-6 h-6 mb-1" />
                      Emergency Stop
                    </Button>
                    <Button className="h-16 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20 flex-col">
                      <Lock className="w-6 h-6 mb-1" />
                      Block IP Range
                    </Button>
                    <Button className="h-16 bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20 flex-col">
                      <Database className="w-6 h-6 mb-1" />
                      Sync Database
                    </Button>
                    <Button className="h-16 bg-green-500/10 text-green-400 border border-green-400/30 hover:bg-green-500/20 flex-col">
                      <Zap className="w-6 h-6 mb-1" />
                      System Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="alerts">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {fraudAlerts.map((alert) => (
                <Card 
                  key={alert.id}
                  className="bg-black/40 backdrop-blur-lg border-red-400/30 cursor-pointer hover:border-red-400/50 transition-colors"
                  onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle className={`w-6 h-6 ${
                          alert.severity === 'critical' ? 'text-red-400' :
                          alert.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                        }`} />
                        <div>
                          <h3 className="text-white font-medium">{alert.title}</h3>
                          <p className="text-white/70 text-sm">{alert.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-white/50 text-xs">{alert.timestamp}</span>
                            <Badge className={getSeverityColor(alert.severity)}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <span className="text-white/50 text-xs">
                              {alert.affectedUsers} users affected
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${
                        alert.status === 'resolved' ? 'bg-green-400/20 text-green-400 border-green-400/30' :
                        alert.status === 'investigating' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                        'bg-red-400/20 text-red-400 border-red-400/30'
                      } capitalize`}>
                        {alert.status}
                      </Badge>
                    </div>
                    
                    {selectedAlert === alert.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20">
                            Investigate
                          </Button>
                          <Button size="sm" className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20">
                            Mark Resolved
                          </Button>
                          <Button size="sm" className="bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="universities">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white">University Trust Scores</CardTitle>
                  <CardDescription className="text-white/70">
                    Verification statistics and trust ratings for registered universities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {universityStats.map((university, index) => (
                      <div key={university.name} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                            <span className="text-yellow-400 font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{university.name}</h4>
                            <p className="text-white/70 text-sm">{university.verifications} verifications</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${getStatusColor(university.status)}`}>
                            {university.trustScore}%
                          </p>
                          <Badge className={`${getStatusColor(university.status)} bg-opacity-20 border-opacity-30 capitalize`}>
                            {university.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="activity">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white">System Activity Log</CardTitle>
                  <CardDescription className="text-white/70">
                    Recent system events and administrative actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const IconComponent = getActivityIcon(activity.type);
                      return (
                        <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 border border-white/10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            activity.type === 'security' ? 'bg-red-400/20' :
                            activity.type === 'fraud' ? 'bg-yellow-400/20' :
                            activity.type === 'system' ? 'bg-blue-400/20' :
                            'bg-green-400/20'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              activity.type === 'security' ? 'text-red-400' :
                              activity.type === 'fraud' ? 'text-yellow-400' :
                              activity.type === 'system' ? 'text-blue-400' :
                              'text-green-400'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{activity.action}</h4>
                            <p className="text-white/70 text-sm">{activity.details}</p>
                            <p className="text-white/50 text-xs mt-1">{activity.timestamp}</p>
                          </div>
                          <Badge className={`${
                            activity.type === 'security' ? 'bg-red-400/20 text-red-400 border-red-400/30' :
                            activity.type === 'fraud' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                            activity.type === 'system' ? 'bg-blue-400/20 text-blue-400 border-blue-400/30' :
                            'bg-green-400/20 text-green-400 border-green-400/30'
                          } capitalize`}>
                            {activity.type}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}