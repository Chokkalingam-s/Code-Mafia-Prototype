import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Vault, 
  FileText, 
  Search, 
  Filter, 
  Share, 
  Download, 
  QrCode, 
  Eye,
  Calendar,
  Award,
  Building,
  CheckCircle,
  AlertTriangle,
  Clock,
  Link,
  Shield,
  Star
} from 'lucide-react';

interface Certificate {
  id: string;
  name: string;
  institution: string;
  course: string;
  year: string;
  grade: string;
  status: 'verified' | 'pending' | 'invalid';
  trustScore: number;
  uploadDate: Date;
  shareCount: number;
  qrCode: string;
  blockchainHash: string;
  thumbnail: string;
}

interface PersonalVaultProps {
  user: any;
  onClose: () => void;
}

export function PersonalVault({ user, onClose }: PersonalVaultProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending' | 'invalid'>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Mock certificates data
  const certificates: Certificate[] = [
    {
      id: 'CERT_001',
      name: 'Bachelor of Computer Applications',
      institution: 'Ranchi University',
      course: 'BCA',
      year: '2024',
      grade: 'First Class',
      status: 'verified',
      trustScore: 98,
      uploadDate: new Date('2024-01-15'),
      shareCount: 5,
      qrCode: 'QR_CERT_001',
      blockchainHash: '0x7d4a8b9c2e1f6a3d5c8b4e7f9a2c6d8e',
      thumbnail: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=200&h=280&fit=crop'
    },
    {
      id: 'CERT_002',
      name: 'Higher Secondary Certificate',
      institution: 'Jharkhand Academic Council',
      course: 'Science Stream',
      year: '2021',
      grade: '85.5%',
      status: 'verified',
      trustScore: 96,
      uploadDate: new Date('2024-01-10'),
      shareCount: 3,
      qrCode: 'QR_CERT_002',
      blockchainHash: '0x3f7e9a1c4d6b8e2f5a9c7e4b2d6f8a1c',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=280&fit=crop'
    },
    {
      id: 'CERT_003',
      name: 'Python Programming Certificate',
      institution: 'Tech Institute Ranchi',
      course: 'Professional Course',
      year: '2023',
      grade: 'A+',
      status: 'pending',
      trustScore: 75,
      uploadDate: new Date('2024-01-20'),
      shareCount: 1,
      qrCode: 'QR_CERT_003',
      blockchainHash: '',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=280&fit=crop'
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cert.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-400/20 text-green-400';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400';
      case 'invalid': return 'bg-red-400/20 text-red-400';
      default: return 'bg-gray-400/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'invalid': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleShare = (certificate: Certificate) => {
    const shareUrl = `${window.location.origin}/verify/${certificate.qrCode}`;
    navigator.share?.({
      title: `${certificate.name} - Certificate`,
      text: `Verified certificate for ${certificate.course} from ${certificate.institution}`,
      url: shareUrl
    });
  };

  const generateQRCode = (certificate: Certificate) => {
    // In a real app, this would generate an actual QR code
    alert(`QR Code generated for: ${certificate.name}\nScan URL: /verify/${certificate.qrCode}`);
  };

  const downloadCertificate = (certificate: Certificate) => {
    // In a real app, this would download the actual certificate
    alert(`Downloading: ${certificate.name}`);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,0,0.05)_1px,transparent_1px)] bg-[size:25px_25px] animate-pulse"></div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center border border-yellow-400/30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Vault className="w-6 h-6 text-yellow-400" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-white">Personal Certificate Vault</h1>
                <p className="text-yellow-400/80">Secure storage for all your verified credentials</p>
              </div>
            </div>
            <Button onClick={onClose} variant="outline" className="border-white/20 text-white">
              Close Vault
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/5 backdrop-blur-sm border-green-400/30 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-green-400 text-lg font-bold">
                    {certificates.filter(c => c.status === 'verified').length}
                  </p>
                  <p className="text-white/70 text-sm">Verified</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-yellow-400/30 p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-yellow-400 text-lg font-bold">
                    {certificates.filter(c => c.status === 'pending').length}
                  </p>
                  <p className="text-white/70 text-sm">Pending</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-blue-400/30 p-4">
              <div className="flex items-center gap-3">
                <Share className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-blue-400 text-lg font-bold">
                    {certificates.reduce((sum, c) => sum + c.shareCount, 0)}
                  </p>
                  <p className="text-white/70 text-sm">Times Shared</p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/5 backdrop-blur-sm border-purple-400/30 p-4">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-purple-400 text-lg font-bold">
                    {Math.round(certificates.reduce((sum, c) => sum + c.trustScore, 0) / certificates.length)}%
                  </p>
                  <p className="text-white/70 text-sm">Avg Trust Score</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'verified', 'pending', 'invalid'].map((status) => (
                <Button
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  className={filterStatus === status 
                    ? 'bg-yellow-400 text-black' 
                    : 'border-white/20 text-white hover:bg-white/10'
                  }
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/20 hover:border-yellow-400/50 transition-all p-0 overflow-hidden">
                  {/* Certificate Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-yellow-400/10 to-blue-400/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-white/20" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className={getStatusColor(certificate.status)}>
                        {getStatusIcon(certificate.status)}
                        <span className="ml-1 capitalize">{certificate.status}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-purple-400/20 text-purple-400">
                        {certificate.trustScore}%
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-medium mb-2 line-clamp-2">
                      {certificate.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-3 h-3 text-blue-400" />
                        <span className="text-white/70">{certificate.institution}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-3 h-3 text-green-400" />
                        <span className="text-white/70">{certificate.course} • {certificate.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-yellow-400" />
                        <span className="text-white/70">
                          Added {certificate.uploadDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="flex-1 bg-blue-400/20 text-blue-400 border border-blue-400/30 hover:bg-blue-400/30"
                            onClick={() => setSelectedCertificate(certificate)}
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/80 backdrop-blur-xl border-yellow-400/30 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-yellow-400">
                              Certificate Details
                            </DialogTitle>
                          </DialogHeader>
                          {selectedCertificate && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-white/60">Certificate Name:</p>
                                  <p className="text-white">{selectedCertificate.name}</p>
                                </div>
                                <div>
                                  <p className="text-white/60">Institution:</p>
                                  <p className="text-white">{selectedCertificate.institution}</p>
                                </div>
                                <div>
                                  <p className="text-white/60">Course:</p>
                                  <p className="text-white">{selectedCertificate.course}</p>
                                </div>
                                <div>
                                  <p className="text-white/60">Grade:</p>
                                  <p className="text-white">{selectedCertificate.grade}</p>
                                </div>
                                <div>
                                  <p className="text-white/60">Trust Score:</p>
                                  <p className="text-white">{selectedCertificate.trustScore}%</p>
                                </div>
                                <div>
                                  <p className="text-white/60">Share Count:</p>
                                  <p className="text-white">{selectedCertificate.shareCount} times</p>
                                </div>
                              </div>
                              
                              {selectedCertificate.blockchainHash && (
                                <div className="p-3 bg-white/5 rounded border">
                                  <p className="text-white/60 text-xs mb-1">Blockchain Hash:</p>
                                  <p className="text-yellow-400 text-xs font-mono break-all">
                                    {selectedCertificate.blockchainHash}
                                  </p>
                                </div>
                              )}

                              <div className="flex gap-2">
                                <Button
                                  onClick={() => downloadCertificate(selectedCertificate)}
                                  className="flex-1 bg-green-400/20 text-green-400 border border-green-400/30"
                                >
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </Button>
                                <Button
                                  onClick={() => handleShare(selectedCertificate)}
                                  className="flex-1 bg-blue-400/20 text-blue-400 border border-blue-400/30"
                                >
                                  <Share className="w-4 h-4 mr-2" />
                                  Share
                                </Button>
                                <Button
                                  onClick={() => generateQRCode(selectedCertificate)}
                                  className="flex-1 bg-purple-400/20 text-purple-400 border border-purple-400/30"
                                >
                                  <QrCode className="w-4 h-4 mr-2" />
                                  QR Code
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        size="sm"
                        onClick={() => handleShare(certificate)}
                        className="bg-green-400/20 text-green-400 border border-green-400/30 hover:bg-green-400/30"
                      >
                        <Share className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        size="sm"
                        onClick={() => generateQRCode(certificate)}
                        className="bg-purple-400/20 text-purple-400 border border-purple-400/30 hover:bg-purple-400/30"
                      >
                        <QrCode className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg">No certificates found</p>
              <p className="text-white/40 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}