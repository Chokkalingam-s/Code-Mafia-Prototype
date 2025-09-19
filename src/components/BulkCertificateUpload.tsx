import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DemoDataViewer } from './DemoDataViewer';
import { 
  Upload, 
  FileSpreadsheet, 
  Eye, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Download,
  Zap,
  Database,
  Lock,
  FileCheck,
  Users,
  Sparkles,
  Info
} from 'lucide-react';
import type { User } from '../App';

interface BulkCertificateUploadProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'dashboard' | 'verification' | 'admin') => void;
}

interface StudentRecord {
  student_id: string;
  name: string;
  dob: string;
  gender: string;
  university: string;
  course: string;
  branch: string;
  year_of_admission: number;
  year_of_passing: number;
  certificate_type: string;
  certificate_id: string;
  certificate_hash: string;
  fingerprint_hash: string;
  qr_code: string;
  email: string;
  phone: string;
  address: string;
  status: 'pending' | 'generated' | 'issued' | 'error';
}

// Mock CSV data based on your Python script structure - Jharkhand Universities
const mockStudentData: StudentRecord[] = [
  {
    student_id: 'S010001',
    name: 'Priya Sharma',
    dob: '2001-03-15',
    gender: 'Female',
    university: 'Jharkhand University of Technology',
    course: 'B.Tech',
    branch: 'CSE',
    year_of_admission: 2020,
    year_of_passing: 2024,
    certificate_type: 'Degree',
    certificate_id: 'CERT845291',
    certificate_hash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    fingerprint_hash: 'f1e2d3c4b5a6987654321098765432109876543210fedcba0987654321fedcba',
    qr_code: 'https://verify.univ/CERT845291',
    email: 'priya.sharma@student.jut.ac.in',
    phone: '+91-9876543210',
    address: 'Ranchi, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010002',
    name: 'Rahul Kumar',
    dob: '2000-07-22',
    gender: 'Male',
    university: 'Ranchi University',
    course: 'MBA',
    branch: 'Finance',
    year_of_admission: 2022,
    year_of_passing: 2024,
    certificate_type: 'Degree',
    certificate_id: 'CERT923847',
    certificate_hash: 'b2c3d4e5f6a1890123456789012345678901bcdef2345678901bcdef234567',
    fingerprint_hash: 'e2d3c4b5a6f1876543210987654321098765432101edcba9876543210edcba',
    qr_code: 'https://verify.univ/CERT923847',
    email: 'rahul.kumar@student.ru.ac.in',
    phone: '+91-9765432109',
    address: 'Dhanbad, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010003',
    name: 'Anjali Singh',
    dob: '2001-11-08',
    gender: 'Female',
    university: 'Birsa Institute of Technology',
    course: 'B.Tech',
    branch: 'ECE',
    year_of_admission: 2020,
    year_of_passing: 2024,
    certificate_type: 'Degree',
    certificate_id: 'CERT756382',
    certificate_hash: 'c3d4e5f6a1b2901234567890123456789012cdef3456789012cdef345678',
    fingerprint_hash: 'd3c4b5a6f1e2765432109876543210987654321012dcba876543210dcba',
    qr_code: 'https://verify.univ/CERT756382',
    email: 'anjali.singh@student.bit.ac.in',
    phone: '+91-9654321098',
    address: 'Jamshedpur, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010004',
    name: 'Vikash Gupta',
    dob: '1999-05-12',
    gender: 'Male',
    university: 'Sido Kanhu Murmu University',
    course: 'B.Sc',
    branch: 'Physics',
    year_of_admission: 2019,
    year_of_passing: 2022,
    certificate_type: 'Degree',
    certificate_id: 'CERT648529',
    certificate_hash: 'd4e5f6a1b2c3012345678901234567890123def456789013def456789',
    fingerprint_hash: 'c4b5a6f1e2d3654321098765432109876543210123cba765432103cba',
    qr_code: 'https://verify.univ/CERT648529',
    email: 'vikash.gupta@student.skmu.ac.in',
    phone: '+91-9543210987',
    address: 'Dumka, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010005',
    name: 'Shreya Patel',
    dob: '2002-01-25',
    gender: 'Female',
    university: 'Vinoba Bhave University',
    course: 'BBA',
    branch: 'Marketing',
    year_of_admission: 2021,
    year_of_passing: 2024,
    certificate_type: 'Degree',
    certificate_id: 'CERT592874',
    certificate_hash: 'e5f6a1b2c3d4123456789012345678901234ef567890124ef567890',
    fingerprint_hash: 'b5a6f1e2d3c4543210987654321098765432101234ba654321034ba',
    qr_code: 'https://verify.univ/CERT592874',
    email: 'shreya.patel@student.vbu.ac.in',
    phone: '+91-9432109876',
    address: 'Hazaribag, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010006',
    name: 'Arjun Mahato',
    dob: '2000-09-18',
    gender: 'Male',
    university: 'Kolhan University',
    course: 'M.Tech',
    branch: 'ME',
    year_of_admission: 2022,
    year_of_passing: 2024,
    certificate_type: 'Degree',
    certificate_id: 'CERT738194',
    certificate_hash: 'f6a1b2c3d4e5234567890123456789012345f678901235f678901',
    fingerprint_hash: 'a6f1e2d3c4b5432109876543210987654321012345a543210345a',
    qr_code: 'https://verify.univ/CERT738194',
    email: 'arjun.mahato@student.ku.ac.in',
    phone: '+91-9321098765',
    address: 'Chaibasa, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010007',
    name: 'Kavita Devi',
    dob: '2001-12-03',
    gender: 'Female',
    university: 'Nilamber-Pitamber University',
    course: 'MCA',
    branch: 'IT',
    year_of_admission: 2022,
    year_of_passing: 2024,
    certificate_type: 'Degree',
    certificate_id: 'CERT456821',
    certificate_hash: 'a1b2c3d4e5f6345678901234567890123456789012346789012',
    fingerprint_hash: 'f1e2d3c4b5a6321098765432109876543210123456432109456',
    qr_code: 'https://verify.univ/CERT456821',
    email: 'kavita.devi@student.npu.ac.in',
    phone: '+91-9210987654',
    address: 'Medininagar, Jharkhand, India',
    status: 'pending'
  },
  {
    student_id: 'S010008',
    name: 'Abhishek Yadav',
    dob: '1999-10-14',
    gender: 'Male',
    university: 'Jharkhand Rai University',
    course: 'B.Tech',
    branch: 'Civil',
    year_of_admission: 2018,
    year_of_passing: 2022,
    certificate_type: 'Degree',
    certificate_id: 'CERT825937',
    certificate_hash: 'b2c3d4e5f6a1456789012345678901234567890123567890123',
    fingerprint_hash: 'e2d3c4b5a6f1210987654321098765432101234565210987654',
    qr_code: 'https://verify.univ/CERT825937',
    email: 'abhishek.yadav@student.jru.edu.in',
    phone: '+91-9109876543',
    address: 'Ranchi, Jharkhand, India',
    status: 'pending'
  }
];

const processingSteps = [
  { icon: Eye, label: 'CSV Analysis', description: 'Analyzing student data structure' },
  { icon: Database, label: 'Data Validation', description: 'Validating against university records' },
  { icon: Sparkles, label: 'Certificate Generation', description: 'AI-generating certificates with seals' },
  { icon: Lock, label: 'Blockchain Registration', description: 'Registering certificates on blockchain' },
];

export function BulkCertificateUpload({ user, onLogout, onNavigate }: BulkCertificateUploadProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'processing' | 'complete'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([]);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [showDataViewer, setShowDataViewer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      setShowAIPrompt(true);
      
      // Simulate CSV parsing
      setTimeout(() => {
        setStudentRecords(mockStudentData);
        setCurrentStep('preview');
        setShowAIPrompt(false);
      }, 2000);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      setShowAIPrompt(true);
      
      setTimeout(() => {
        setStudentRecords(mockStudentData);
        setCurrentStep('preview');
        setShowAIPrompt(false);
      }, 2000);
    }
  };

  const startBulkGeneration = () => {
    setCurrentStep('processing');
    setProcessingStep(0);
    setProgress(0);

    const stepDuration = 2000;
    const steps = processingSteps.length;

    processingSteps.forEach((_, index) => {
      setTimeout(() => {
        setProcessingStep(index + 1);
        setProgress(((index + 1) / steps) * 100);
        
        // Update student record status progressively
        const recordsToUpdate = Math.ceil(studentRecords.length * (index + 1) / steps);
        setStudentRecords(prev => prev.map((record, idx) => 
          idx < recordsToUpdate 
            ? { ...record, status: index === steps - 1 ? 'issued' : 'generated' as const }
            : record
        ));
        
        if (index === steps - 1) {
          setTimeout(() => {
            setCurrentStep('complete');
          }, 500);
        }
      }, (index + 1) * stepDuration);
    });
  };

  const resetFlow = () => {
    setCurrentStep('upload');
    setUploadedFile(null);
    setStudentRecords([]);
    setProcessingStep(0);
    setProgress(0);
    setShowAIPrompt(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'generated': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'error': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-white/70 bg-white/10 border-white/20';
    }
  };

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
                <h1 className="text-xl font-bold text-white">Bulk Certificate Issuer</h1>
                <p className="text-yellow-400 text-sm">AI-Powered Batch Processing</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-white/70 text-sm">Institution Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* AI Processing Prompt Overlay */}
          {showAIPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <Card className="bg-black/60 backdrop-blur-lg border-yellow-400/30 p-8 max-w-md mx-4">
                <CardContent className="text-center space-y-6">
                  <motion.div
                    className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-8 h-8 text-yellow-400" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">AI Certificate Issuer</h3>
                    <div className="text-white/70 text-sm leading-relaxed space-y-2">
                      <p className="text-yellow-400 font-medium">
                        "CSV file detected with {mockStudentData.length} student records from Jharkhand Universities."
                      </p>
                      <p>
                        "Processing comprehensive data: Student IDs, Biometric hashes, University seals.
                        Validating against blockchain registry and generating tamper-proof certificates."
                      </p>
                      <p className="text-green-400 text-xs">
                        "Each certificate includes: Digital signature, QR verification, Fingerprint hash, Blockchain anchor."
                      </p>
                    </div>
                  </div>
                  
                  <motion.div
                    className="w-32 h-1 bg-yellow-400 mx-auto rounded-full"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'upload' && (
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
                    Upload Student Data (CSV/Excel)
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Upload your student database for bulk certificate generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed border-yellow-400/30 rounded-lg p-12 text-center hover:border-yellow-400/50 transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileSpreadsheet className="w-16 h-16 text-yellow-400/50 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">
                      Drop your CSV file here or click to browse
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      CSV format: student_id, name, dob, gender, university, course, branch, year_of_admission, year_of_passing, certificate_type, certificate_id, certificate_hash, fingerprint_hash, qr_code, email, phone, address
                    </p>
                    <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                      <Zap className="w-3 h-3 mr-1" />
                      AI-Powered Processing
                    </Badge>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  <Alert className="mt-6 bg-blue-500/10 border-blue-400/30">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-400">
                      <strong>Required CSV columns:</strong> student_id, name, dob, gender, university, course, branch, year_of_admission, year_of_passing, certificate_type, certificate_id, certificate_hash, fingerprint_hash, qr_code, email, phone, address
                    </AlertDescription>
                  </Alert>

                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={() => setShowDataViewer(true)}
                      variant="outline"
                      className="border-green-400/30 text-green-400 hover:bg-green-400/10"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      View Sample Database Structure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Eye className="w-6 h-6 mr-2 text-yellow-400" />
                      Preview Certificates
                    </div>
                    <Badge className="bg-yellow-400/20 text-yellow-400">
                      {studentRecords.length} Records
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Review student data before bulk certificate generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Data Statistics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-center">
                      <p className="text-yellow-400 font-bold text-lg">{studentRecords.length}</p>
                      <p className="text-white/70 text-xs">Total Records</p>
                    </div>
                    <div className="text-center">
                      <p className="text-blue-400 font-bold text-lg">
                        {new Set(studentRecords.map(r => r.university)).size}
                      </p>
                      <p className="text-white/70 text-xs">Universities</p>
                    </div>
                    <div className="text-center">
                      <p className="text-green-400 font-bold text-lg">
                        {new Set(studentRecords.map(r => r.course)).size}
                      </p>
                      <p className="text-white/70 text-xs">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-purple-400 font-bold text-lg">
                        {new Set(studentRecords.map(r => r.year_of_passing)).size}
                      </p>
                      <p className="text-white/70 text-xs">Batch Years</p>
                    </div>
                  </div>
                  <div className="grid gap-4 max-h-96 overflow-y-auto">
                    {studentRecords.map((record, index) => (
                      <div
                        key={record.rollNo}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                            <span className="text-yellow-400 font-bold text-sm">#{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{record.name}</h4>
                            <p className="text-white/70 text-sm">
                              {record.student_id} • {record.course} {record.branch} • {record.year_of_passing}
                            </p>
                            <p className="text-yellow-400 text-xs">
                              {record.certificate_id} • {record.university}
                            </p>
                            <p className="text-white/60 text-xs">
                              {record.email} • {record.gender} • DOB: {record.dob}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={startBulkGeneration}
                      className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate {studentRecords.length} Certificates
                    </Button>
                    <Button
                      onClick={resetFlow}
                      variant="outline"
                      className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-yellow-400" />
                    Generating Certificates
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    AI is processing {studentRecords.length} certificates with blockchain registration
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white">Overall Progress</span>
                      <span className="text-yellow-400">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  {/* Processing Steps */}
                  <div className="space-y-4">
                    {processingSteps.map((step, index) => {
                      const isActive = processingStep === index + 1;
                      const isCompleted = processingStep > index;
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

                  {/* Live Status */}
                  <div className="grid gap-2 max-h-40 overflow-y-auto">
                    {studentRecords.map((record, index) => (
                      <div key={record.student_id} className="flex items-center justify-between text-sm py-1">
                        <div className="flex-1">
                          <span className="text-white/70">{record.name}</span>
                          <span className="text-white/50 text-xs ml-2">({record.student_id})</span>
                        </div>
                        <Badge className={getStatusColor(record.status)} size="sm">
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-center"
              >
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </motion.div>
                  
                  {/* Confetti Effect */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        initial={{ 
                          x: "50%", 
                          y: "50%",
                          scale: 0,
                          opacity: 0
                        }}
                        animate={{
                          x: `${50 + (Math.random() - 0.5) * 200}%`,
                          y: `${50 + (Math.random() - 0.5) * 200}%`,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <Card className="bg-green-500/10 backdrop-blur-lg border-green-400/30">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-green-400 mb-2">
                    🎉 Certificates Issued Successfully!
                  </h2>
                  <p className="text-white/70 mb-6">
                    {studentRecords.length} certificates have been generated and registered on the blockchain
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-white font-medium">{studentRecords.length}</p>
                      <p className="text-white/70 text-sm">Students</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <FileCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-white font-medium">{studentRecords.filter(r => r.status === 'issued').length}</p>
                      <p className="text-white/70 text-sm">Issued</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-white font-medium">100%</p>
                      <p className="text-white/70 text-sm">Blockchain</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={resetFlow}
                      className="flex-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 hover:bg-yellow-400/20"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Another Batch
                    </Button>
                    <Button className="bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF Batch
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Certificate Summary */}
              <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30">
                <CardHeader>
                  <CardTitle className="text-white">Issued Certificates</CardTitle>
                  <CardDescription className="text-white/70">
                    All certificates have been successfully generated with blockchain verification
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 max-h-80 overflow-y-auto">
                    {studentRecords.map((record, index) => (
                      <div
                        key={record.student_id}
                        className="flex items-center justify-between p-4 rounded-lg bg-green-400/5 border border-green-400/20 hover:bg-green-400/10 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          <div className="flex-1">
                            <p className="text-white font-medium">{record.name}</p>
                            <p className="text-green-400 text-sm">{record.certificate_id}</p>
                            <p className="text-white/70 text-xs">
                              {record.course} {record.branch} • {record.university}
                            </p>
                            <p className="text-white/60 text-xs">
                              Hash: {record.certificate_hash.substring(0, 16)}...
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-400/20 text-green-400 border-green-400/30 mb-2">
                            Issued
                          </Badge>
                          <p className="text-white/60 text-xs">
                            {record.year_of_passing}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Demo Data Viewer */}
      <DemoDataViewer
        isOpen={showDataViewer}
        onClose={() => setShowDataViewer(false)}
        sampleData={mockStudentData}
      />
    </div>
  );
}