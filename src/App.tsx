import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { CertificateVerification } from './components/CertificateVerification';
import { AdminDashboard } from './components/AdminDashboard';
import { BulkCertificateUpload } from './components/BulkCertificateUpload';

export type UserRole = 'student' | 'institution' | 'verifier' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  university?: string;
  designation?: string;
  universityType?: string;
  studentId?: string;
  organization?: string;
  verificationLevel?: string;
  department?: string;
  clearanceLevel?: string;
}

export interface Certificate {
  id: string;
  studentName: string;
  rollNo: string;
  regNo: string;
  course: string;
  year: string;
  marks: string;
  universityName: string;
  certificateId: string;
  blockchainHash: string;
  isVerified: boolean;
  isSuspicious: boolean;
  uploadedAt: Date;
  uploadedBy: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'verification' | 'admin' | 'bulk-upload'>('login');

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('authUser', JSON.stringify(user));
    if (user.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authUser');
    setCurrentView('login');
  };

  const handleNavigate = (view: 'dashboard' | 'verification' | 'admin' | 'bulk-upload') => {
    setCurrentView(view);
  };

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentView === 'admin' && currentUser?.role === 'admin') {
    return (
      <AdminDashboard
        user={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentView === 'verification') {
    return (
      <CertificateVerification
        user={currentUser!}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  if (currentView === 'bulk-upload') {
    return (
      <BulkCertificateUpload
        user={currentUser!}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <Dashboard
      user={currentUser!}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    />
  );
}

export default App;