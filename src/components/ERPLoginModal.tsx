import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Shield, Lock, X, University, CheckCircle } from 'lucide-react';

interface ERPLoginModalProps {
  university: string;
  onSuccess: (studentData: any) => void;
  onCancel: () => void;
}

// Mock ERP student data for different universities
const mockERPStudents = {
  'Ranchi University': [
    { rollNo: 'RU2021CSE001', regNo: 'REG001-2021', name: 'Priya Sharma', email: 'priya.sharma@student.ru.ac.in', course: 'B.Tech Computer Science', year: '2024', cgpa: '8.5' },
    { rollNo: 'RU2021EE002', regNo: 'REG002-2021', name: 'Rahul Kumar', email: 'rahul.kumar@student.ru.ac.in', course: 'B.Tech Electrical Engineering', year: '2024', cgpa: '7.8' },
    { rollNo: 'RU2020ME003', regNo: 'REG003-2020', name: 'Anjali Singh', email: 'anjali.singh@student.ru.ac.in', course: 'B.Tech Mechanical Engineering', year: '2023', cgpa: '8.2' }
  ],
  'Jharkhand University of Technology': [
    { rollNo: 'JUT2021IT001', regNo: 'JUTIT001-2021', name: 'Vikash Gupta', email: 'vikash.gupta@student.jut.ac.in', course: 'B.Tech Information Technology', year: '2024', cgpa: '8.9' },
    { rollNo: 'JUT2020CSE002', regNo: 'JUTCSE002-2020', name: 'Shreya Patel', email: 'shreya.patel@student.jut.ac.in', course: 'B.Tech Computer Science', year: '2023', cgpa: '9.1' }
  ],
  'Sido Kanhu Murmu University': [
    { rollNo: 'SKMU2021BCA001', regNo: 'SKBCA001-2021', name: 'Rohit Mahato', email: 'rohit.mahato@student.skmu.ac.in', course: 'BCA', year: '2024', cgpa: '8.0' }
  ]
};

export function ERPLoginModal({ university, onSuccess, onCancel }: ERPLoginModalProps) {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStage, setAuthStage] = useState<'login' | 'verifying' | 'success'>('login');
  const [studentData, setStudentData] = useState<any>(null);

  const handleERPLogin = () => {
    setIsAuthenticating(true);
    setAuthStage('verifying');

    // Simulate ERP authentication process
    setTimeout(() => {
      const universityStudents = mockERPStudents[university] || [];
      const student = universityStudents.find(s => s.rollNo.toLowerCase() === rollNo.toLowerCase());

      if (student && password === 'demo123') {
        // Simulate successful authentication
        setStudentData(student);
        setAuthStage('success');
        
        // Simulate token generation and data fetch
        setTimeout(() => {
          const tokenData = {
            token: `erptoken_${Date.now()}`,
            student: {
              id: student.rollNo,
              name: student.name,
              email: student.email,
              role: 'student' as const,
              university: university,
              studentId: student.rollNo,
              regNo: student.regNo,
              course: student.course,
              year: student.year,
              cgpa: student.cgpa
            }
          };
          onSuccess(tokenData.student);
        }, 1500);
      } else {
        // Simulate authentication failure
        setTimeout(() => {
          setIsAuthenticating(false);
          setAuthStage('login');
          alert('Invalid credentials. Please check your Roll Number and password.');
        }, 1000);
      }
    }, 2000);
  };

  const getDemoCredentials = () => {
    const universityStudents = mockERPStudents[university] || [];
    return universityStudents[0] || null;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="bg-black/90 backdrop-blur-lg border-blue-400/30 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-400/20 rounded-lg flex items-center justify-center">
                <University className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold">University ERP Login</h2>
                <p className="text-blue-400 text-sm">{university}</p>
              </div>
            </div>
            <Button
              onClick={onCancel}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {authStage === 'login' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Roll Number</Label>
                <Input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your roll number"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your ERP password"
                />
              </div>

              <Button
                onClick={handleERPLogin}
                disabled={!rollNo || !password}
                className="w-full bg-blue-400 text-black hover:bg-blue-500 font-medium"
              >
                <Shield className="w-4 h-4 mr-2" />
                Authenticate with ERP
              </Button>

              {/* Demo Credentials */}
              {getDemoCredentials() && (
                <div className="mt-4 p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
                  <p className="text-blue-400 text-sm mb-2">Demo Credentials:</p>
                  <div className="text-white/70 text-xs space-y-1">
                    <div><strong>Roll No:</strong> {getDemoCredentials()?.rollNo}</div>
                    <div><strong>Password:</strong> demo123</div>
                    <div><strong>Student:</strong> {getDemoCredentials()?.name}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {authStage === 'verifying' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-8 h-8 text-blue-400" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-white font-medium">Authenticating with ERP</h3>
                <p className="text-white/70 text-sm">Verifying your credentials...</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Connecting to University ERP</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
                  <motion.div
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span>Validating Student Credentials</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-white/60">
                  <div className="w-3 h-3 border border-white/30 rounded-full" />
                  <span>Generating Security Token</span>
                </div>
              </div>
            </div>
          )}

          {authStage === 'success' && studentData && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Authentication Successful</h3>
                <p className="text-green-400 text-sm">Welcome, {studentData.name}!</p>
              </div>
              <div className="bg-green-400/10 rounded-lg p-3 border border-green-400/20">
                <div className="text-white/70 text-xs space-y-1">
                  <div><strong>Roll No:</strong> {studentData.rollNo}</div>
                  <div><strong>Course:</strong> {studentData.course}</div>
                  <div><strong>Year:</strong> {studentData.year}</div>
                  <div><strong>CGPA:</strong> {studentData.cgpa}</div>
                </div>
              </div>
              <p className="text-white/60 text-xs">Redirecting to your dashboard...</p>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-yellow-400" />
              <p className="text-yellow-400 text-xs">
                Secure ERP authentication via SAML/OAuth2 token exchange
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}