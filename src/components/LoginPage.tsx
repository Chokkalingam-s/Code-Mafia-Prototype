import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TwoFactorAuth } from './TwoFactorAuth';
import { ERPLoginModal } from './ERPLoginModal';
import { Shield, Lock, Users, Building, UserCheck, Settings, University, GraduationCap } from 'lucide-react';
import type { User, UserRole } from '../App';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const roleIcons = {
  student: Users,
  institution: Building,
  verifier: UserCheck,
  admin: Settings
};

const roleDescriptions = {
  student: 'Upload and verify your academic certificates',
  institution: 'Issue and manage institutional certificates', 
  verifier: 'Verify authenticity of submitted certificates',
  admin: 'Monitor system security and fraud detection'
};

// Official Jharkhand Universities for SIH 2025 (12 State Universities)
const universityCredentials = {
  'Ranchi University': {
    email: 'registrar@ranchiuniversity.ac.in',
    password: 'RU@2025demo',
    username: 'ranchi_admin',
    name: 'Prof. Meera Singh',
    designation: 'Registrar',
    viceChancellor: 'Dr. Arvind Kumar',
    vcEmail: 'vc@ranchiuniversity.ac.in',
    universityType: 'State',
    location: 'Ranchi',
    established: '1960'
  },
  'Kolhan University': {
    email: 'registrar@kolhanuniversity.ac.in',
    password: 'KU@2025demo',
    username: 'kolhan_admin',
    name: 'Prof. Rajeev Prasad',
    designation: 'Registrar',
    viceChancellor: 'Dr. Sunita Verma',
    vcEmail: 'vc@kolhanuniversity.ac.in',
    universityType: 'State',
    location: 'Chaibasa',
    established: '2009'
  },
  'Vinoba Bhave University': {
    email: 'registrar@vbuhazaribagh.ac.in',
    password: 'VBU@2025demo',
    username: 'vbu_admin',
    name: 'Prof. Savita Rao',
    designation: 'Registrar',
    viceChancellor: 'Dr. Manoj Kumar',
    vcEmail: 'vc@vbuhazaribagh.ac.in',
    universityType: 'State',
    location: 'Hazaribagh',
    established: '1992'
  },
  'Nilamber Pitamber University': {
    email: 'registrar@npu.ac.in',
    password: 'NPU@2025demo',
    username: 'npu_admin',
    name: 'Prof. Anita Kumari',
    designation: 'Registrar',
    viceChancellor: 'Dr. R. S. Yadav',
    vcEmail: 'vc@npu.ac.in',
    universityType: 'State',
    location: 'Medininagar (Palamu)',
    established: '2009'
  },
  'Birsa Agricultural University': {
    email: 'registrar@bau.ac.in',
    password: 'BAU@2025demo',
    username: 'bau_admin',
    name: 'Prof. Laxmi Devi',
    designation: 'Registrar',
    viceChancellor: 'Dr. P. K. Sinha',
    vcEmail: 'vc@bau.ac.in',
    universityType: 'State',
    location: 'Kanke, Ranchi',
    established: '1981'
  },
  'Binod Bihari Mahto Koylanchal University': {
    email: 'registrar@bbmkuniversity.ac.in',
    password: 'BBMK@2025demo',
    username: 'bbmk_admin',
    name: 'Prof. Neelam Prasad',
    designation: 'Registrar',
    viceChancellor: 'Dr. S. K. Mishra',
    vcEmail: 'vc@bbmkuniversity.ac.in',
    universityType: 'State',
    location: 'Dhanbad',
    established: '2017'
  },
  'Jharkhand University of Technology': {
    email: 'registrar@jutranchi.ac.in',
    password: 'JUT@2025demo',
    username: 'jut_admin',
    name: 'Prof. Ritu Sharma',
    designation: 'Registrar',
    viceChancellor: 'Dr. Anil Bhatt',
    vcEmail: 'vc@jutranchi.ac.in',
    universityType: 'State',
    location: 'Ranchi',
    established: '2017'
  },
  'Jharkhand State Open University': {
    email: 'registrar@jsou.ac.in',
    password: 'JSOU@2025demo',
    username: 'jsou_admin',
    name: 'Prof. Kamla Devi',
    designation: 'Registrar',
    viceChancellor: 'Dr. B. N. Soren',
    vcEmail: 'vc@jsou.ac.in',
    universityType: 'State',
    location: 'Kanke, Ranchi',
    established: '2005'
  },
  'Jharkhand Raksha Shakti University': {
    email: 'registrar@jrshu.ac.in',
    password: 'JRSU@2025demo',
    username: 'jrshu_admin',
    name: 'Prof. Pooja Tiwari',
    designation: 'Registrar',
    viceChancellor: 'Dr. K. R. Singh',
    vcEmail: 'vc@jrshu.ac.in',
    universityType: 'State',
    location: 'Ranchi',
    established: '2016'
  },
  'Sido Kanhu Murmu University': {
    email: 'registrar@skmu.ac.in',
    password: 'SKMU@2025demo',
    username: 'skmu_admin',
    name: 'Prof. Sangeeta Murmu',
    designation: 'Registrar',
    viceChancellor: 'Dr. H. L. Azad',
    vcEmail: 'vc@skmu.ac.in',
    universityType: 'State',
    location: 'Dumka',
    established: '1992'
  },
  'Dr. Shyama Prasad Mukherjee University': {
    email: 'registrar@dspmuniversity.ac.in',
    password: 'DSPMU@2025demo',
    username: 'dspmu_admin',
    name: 'Prof. Rekha Singh',
    designation: 'Registrar',
    viceChancellor: 'Dr. V. K. Prasad',
    vcEmail: 'vc@dspmuniversity.ac.in',
    universityType: 'State',
    location: 'Ranchi',
    established: '2017'
  },
  'Jamshedpur Women\'s University': {
    email: 'registrar@jwu.ac.in',
    password: 'JWU@2025demo',
    username: 'jwu_admin',
    name: 'Prof. Mamta Kaur',
    designation: 'Registrar',
    viceChancellor: 'Dr. Nisha Gupta',
    vcEmail: 'vc@jwu.ac.in',
    universityType: 'State',
    location: 'Jamshedpur',
    established: '2017'
  }
};

// Demo user accounts for different roles
const mockUsers = {
  student: { 
    id: '1', 
    name: 'Priya Sharma', 
    email: 'priya.sharma@student.jut.ac.in', 
    role: 'student' as UserRole,
    university: 'Jharkhand University of Technology',
    studentId: 'S010001'
  },
  institution: { 
    id: '2', 
    name: 'Dr. Suresh Kumar', 
    email: 'registrar@ranchiuniversity.ac.in', 
    role: 'institution' as UserRole,
    university: 'Ranchi University',
    designation: 'Registrar'
  },
  verifier: { 
    id: '3', 
    name: 'Raj Verifier', 
    email: 'raj.kumar@verifyindia.gov.in', 
    role: 'verifier' as UserRole,
    organization: 'Government Verification Agency',
    verificationLevel: 'Level-3 Certified'
  },
  admin: { 
    id: '4', 
    name: 'System Administrator', 
    email: 'admin@academia-validator.gov.in', 
    role: 'admin' as UserRole,
    department: 'Cybersecurity & Fraud Detection',
    clearanceLevel: 'Top Secret'
  }
};

// Additional student accounts for demo
const additionalStudents = [
  { id: 'S010002', name: 'Rahul Kumar', email: 'rahul.kumar@student.ru.ac.in', university: 'Ranchi University' },
  { id: 'S010003', name: 'Anjali Singh', email: 'anjali.singh@student.bit.ac.in', university: 'Birsa Institute of Technology' },
  { id: 'S010004', name: 'Vikash Gupta', email: 'vikash.gupta@student.skmu.ac.in', university: 'Sido Kanhu Murmu University' },
  { id: 'S010005', name: 'Shreya Patel', email: 'shreya.patel@student.vbu.ac.in', university: 'Vinoba Bhave University' }
];

// Government verifier accounts
const governmentVerifiers = [
  { id: 'GV001', name: 'Inspector Ramesh Singh', email: 'ramesh.singh@jharkhand.gov.in', dept: 'Education Department' },
  { id: 'GV002', name: 'Dr. Sunita Devi', email: 'sunita.devi@ugc.ac.in', dept: 'UGC Verification Cell' },
  { id: 'GV003', name: 'Amit Chakraborty', email: 'amit.c@aicte-india.org', dept: 'AICTE Verification' }
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('Ranchi University');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showUniversityList, setShowUniversityList] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [showERPLogin, setShowERPLogin] = useState(false);
  const [selectedERPUniversity, setSelectedERPUniversity] = useState<string>('Ranchi University');

  const handleRoleLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'institution') {
      const uni = universityCredentials[selectedUniversity];
      setEmail(uni.email);
      setPassword(uni.password);
    } else {
      setEmail(mockUsers[role].email);
      setPassword('demo123');
    }
  };

  const handleUniversitySelect = (university: string) => {
    setSelectedUniversity(university);
    setShowUniversityList(false);
    if (selectedRole === 'institution') {
      const uni = universityCredentials[university];
      setEmail(uni.email);
      setPassword(uni.password);
    }
  };

  const handleEmailLogin = () => {
    if (selectedRole === 'institution') {
      const uni = universityCredentials[selectedUniversity];
      const user = {
        id: 'INST_' + selectedUniversity.replace(/\s/g, '_'),
        name: uni.name,
        email: uni.email,
        role: 'institution' as UserRole,
        university: selectedUniversity,
        designation: uni.designation,
        universityType: uni.universityType
      };
      // Trigger 2FA for institutions
      setPendingUser(user);
      setShow2FA(true);
    } else {
      const user = mockUsers[selectedRole];
      onLogin(user);
    }
  };

  const handle2FAVerified = () => {
    if (pendingUser) {
      onLogin(pendingUser);
    }
    setShow2FA(false);
    setPendingUser(null);
  };

  const handle2FACancel = () => {
    setShow2FA(false);
    setPendingUser(null);
  };

  const handleERPLogin = (university: string) => {
    setSelectedERPUniversity(university);
    setShowERPLogin(true);
  };

  const handleERPSuccess = (studentData: User) => {
    setShowERPLogin(false);
    onLogin(studentData);
  };

  const handleERPCancel = () => {
    setShowERPLogin(false);
  };

  if (show2FA && pendingUser) {
    return (
      <TwoFactorAuth
        email={pendingUser.email}
        onVerified={handle2FAVerified}
        onCancel={handle2FACancel}
      />
    );
  }

  if (showERPLogin) {
    return (
      <ERPLoginModal
        university={selectedERPUniversity}
        onSuccess={handleERPSuccess}
        onCancel={handleERPCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580077910645-a6fd54032e15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZGFyayUyMGdyaWR8ZW58MXx8fHwxNzU3Nzk3MjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cyber Grid Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400/20 rounded-full mb-4 backdrop-blur-sm border border-yellow-400/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Shield className="w-10 h-10 text-yellow-400" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Academia Authenticity Validator
            </h1>
            <p className="text-yellow-400/80">
              Secure Certificate Verification System
            </p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {Object.entries(roleIcons).map(([role, Icon]) => {
              const isSelected = selectedRole === role;
              return (
                <motion.button
                  key={role}
                  onClick={() => handleRoleLogin(role as UserRole)}
                  className={`p-4 rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                  } backdrop-blur-sm`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium capitalize">{role}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {roleDescriptions[role as UserRole]}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Institution University Selector */}
          {selectedRole === 'institution' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-blue-400/30 p-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white text-sm">Select University</Label>
                  <Badge className="bg-blue-400/20 text-blue-400 text-xs">
                    {Object.keys(universityCredentials).length} Universities Available
                  </Badge>
                </div>
                <Button
                  onClick={() => setShowUniversityList(!showUniversityList)}
                  variant="outline"
                  className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <span className="truncate">{selectedUniversity}</span>
                  <Badge className={`ml-2 text-xs ${
                    universityCredentials[selectedUniversity]?.universityType === 'State' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-purple-400/20 text-purple-400'
                  }`}>
                    {universityCredentials[selectedUniversity]?.universityType}
                  </Badge>
                </Button>
                
                {showUniversityList && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 max-h-48 overflow-y-auto space-y-2 bg-black/40 rounded-lg p-2"
                  >
                    {Object.entries(universityCredentials).map(([university, details]) => (
                      <button
                        key={university}
                        onClick={() => handleUniversitySelect(university)}
                        className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-400/30 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="text-white text-sm font-medium">{university}</div>
                            <div className="text-white/70 text-xs">VC: {details.viceChancellor}</div>
                            <div className="text-white/70 text-xs">Registrar: {details.name}</div>
                            <div className="text-white/50 text-xs">{details.location} • Est. {details.established}</div>
                          </div>
                          <Badge className={`text-xs ${
                            details.universityType === 'State' 
                              ? 'bg-green-400/20 text-green-400' 
                              : 'bg-purple-400/20 text-purple-400'
                          }`}>
                            {details.universityType}
                          </Badge>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )}

          {/* Login Card */}
          <Card className="bg-black/40 backdrop-blur-lg border-yellow-400/30 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Enter your password"
                />
              </div>
              <Button
                onClick={handleEmailLogin}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-medium"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login as {selectedRole}
              </Button>
            </div>
          </Card>

          {/* Student ERP Login Section */}
          {selectedRole === 'student' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 text-white/70">
                  <div className="h-px bg-white/20 flex-1"></div>
                  <span className="text-sm">OR</span>
                  <div className="h-px bg-white/20 flex-1"></div>
                </div>
              </div>

              <Card className="bg-black/40 backdrop-blur-lg border-blue-400/30 p-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <University className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Student Login via University ERP</h3>
                  <p className="text-white/70 text-sm">
                    No registration required! Use your existing university credentials
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Quick University Options */}
                  <div className="grid grid-cols-1 gap-2">
                    {['Ranchi University', 'Jharkhand University of Technology', 'Sido Kanhu Murmu University'].map((university) => (
                      <Button
                        key={university}
                        onClick={() => handleERPLogin(university)}
                        variant="outline"
                        className="bg-white/5 border-blue-400/30 text-white hover:bg-blue-400/10 hover:border-blue-400/50"
                      >
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {university}
                      </Button>
                    ))}
                  </div>

                  {/* All Universities Button */}
                  <Button
                    onClick={() => setShowUniversityList(true)}
                    variant="outline"
                    className="w-full bg-blue-400/10 border-blue-400/50 text-blue-400 hover:bg-blue-400/20"
                  >
                    <University className="w-4 h-4 mr-2" />
                    View All {Object.keys(universityCredentials).length} Universities
                  </Button>

                  {/* University List Modal for Students */}
                  {showUniversityList && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 max-h-48 overflow-y-auto space-y-2 bg-black/40 rounded-lg p-2"
                    >
                      {Object.entries(universityCredentials).map(([university, details]) => (
                        <button
                          key={university}
                          onClick={() => {
                            setShowUniversityList(false);
                            handleERPLogin(university);
                          }}
                          className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-white text-sm font-medium">{university}</div>
                              <div className="text-white/70 text-xs">{details.location} • Est. {details.established}</div>
                            </div>
                            <Badge className={`text-xs ${
                              details.universityType === 'State' 
                                ? 'bg-green-400/20 text-green-400' 
                                : 'bg-purple-400/20 text-purple-400'
                            }`}>
                              {details.universityType}
                            </Badge>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* ERP Login Info */}
                <div className="mt-4 p-3 bg-blue-400/10 rounded-lg border border-blue-400/20">
                  <div className="flex items-start space-x-2">
                    <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div className="text-xs text-blue-400">
                      <div className="font-medium mb-1">Secure ERP Authentication</div>
                      <div className="text-blue-400/80">Uses SAML/OAuth2 token exchange with your university's ERP system</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
            <div className="flex items-center justify-between mb-3">
              <p className="text-yellow-400 text-sm">Demo Credentials:</p>
              <Badge className={`text-xs ${
                selectedRole === 'institution' ? 'bg-blue-400/20 text-blue-400' :
                selectedRole === 'admin' ? 'bg-red-400/20 text-red-400' :
                selectedRole === 'verifier' ? 'bg-green-400/20 text-green-400' :
                'bg-purple-400/20 text-purple-400'
              }`}>
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Access
              </Badge>
            </div>
            
            {selectedRole === 'institution' ? (
              <div className="space-y-3">
                <div className="text-white/70 text-xs space-y-1">
                  <div><strong>University:</strong> {selectedUniversity}</div>
                  <div><strong>Contact:</strong> {universityCredentials[selectedUniversity]?.name}</div>
                  <div><strong>Designation:</strong> {universityCredentials[selectedUniversity]?.designation}</div>
                  <div><strong>Email:</strong> {universityCredentials[selectedUniversity]?.email}</div>
                  <div><strong>Password:</strong> {universityCredentials[selectedUniversity]?.password}</div>
                </div>
                <div className="pt-2 border-t border-yellow-400/20">
                  <Badge className={`text-xs ${
                    universityCredentials[selectedUniversity]?.universityType === 'State' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-purple-400/20 text-purple-400'
                  }`}>
                    {universityCredentials[selectedUniversity]?.universityType} University
                  </Badge>
                </div>
              </div>
            ) : selectedRole === 'student' ? (
              <div className="space-y-2">
                <div className="text-white/70 text-xs space-y-1">
                  <div><strong>🎓 ERP Login (Recommended):</strong></div>
                  <div>• <strong>Roll No:</strong> RU2021CSE001 (Ranchi University)</div>
                  <div>• <strong>Roll No:</strong> JUT2021IT001 (JUT)</div>
                  <div>• <strong>Password:</strong> demo123</div>
                  <div className="pt-2 border-t border-white/20">
                    <strong>📧 Portal Login (Alternative):</strong>
                  </div>
                  <div>• <strong>Email:</strong> {mockUsers[selectedRole].email}</div>
                  <div>• <strong>Password:</strong> demo123</div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-white/70 text-xs space-y-1">
                  <div><strong>Name:</strong> {mockUsers[selectedRole].name}</div>
                  <div><strong>Email:</strong> {mockUsers[selectedRole].email}</div>
                  <div><strong>Password:</strong> demo123</div>
                  {selectedRole === 'verifier' && (
                    <>
                      <div><strong>Organization:</strong> {mockUsers[selectedRole].organization}</div>
                      <div><strong>Level:</strong> {mockUsers[selectedRole].verificationLevel}</div>
                    </>
                  )}
                  {selectedRole === 'admin' && (
                    <>
                      <div><strong>Department:</strong> {mockUsers[selectedRole].department}</div>
                      <div><strong>Clearance:</strong> {mockUsers[selectedRole].clearanceLevel}</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Access Panel for SIH Demo */}
          <div className="mt-4 p-3 bg-green-400/10 rounded-lg border border-green-400/20">
            <p className="text-green-400 text-xs mb-2">🎯 SIH 2025 Demo Ready</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-white/60">
                <strong>State Unis:</strong> 12 Available
              </div>
              <div className="text-white/60">
                <strong>ERP Integration:</strong> SAML/OAuth2
              </div>
              <div className="text-white/60">
                <strong>Security:</strong> 2FA + Blockchain + AI
              </div>
              <div className="text-white/60">
                <strong>Features:</strong> QR Scanner + Fraud Detection
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}