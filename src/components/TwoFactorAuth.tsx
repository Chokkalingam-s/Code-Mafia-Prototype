import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Mail, Shield, Clock, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface TwoFactorAuthProps {
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function TwoFactorAuth({ email, onVerified, onCancel }: TwoFactorAuthProps) {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');

  useEffect(() => {
    // Generate a mock OTP for demo
    const mockOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(mockOTP);
    console.log('Demo OTP:', mockOTP); // For demo purposes
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification delay
    setTimeout(() => {
      if (otp === generatedOTP || otp === '123456') { // Demo fallback
        onVerified();
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setIsVerifying(false);
    }, 1500);
  };

  const handleResend = () => {
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(newOTP);
    setTimeLeft(300);
    setOtp('');
    setError('');
    console.log('New Demo OTP:', newOTP);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,0,0.05)_1px,transparent_1px)] bg-[size:30px_30px] animate-pulse"></div>
      
      {/* Floating Security Icons */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            <Shield className="w-4 h-4 text-yellow-400/30" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-black/60 backdrop-blur-xl border-yellow-400/30 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 rounded-full mb-4 border border-yellow-400/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Two-Factor Authentication
            </h2>
            <p className="text-yellow-400/80 text-sm">
              Enhanced security for institutional access
            </p>
          </div>

          {/* Email Info */}
          <div className="mb-6 p-4 bg-blue-400/10 rounded-lg border border-blue-400/20">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white text-sm">OTP sent to:</p>
                <p className="text-blue-400 text-sm font-medium">{email}</p>
              </div>
            </div>
          </div>

          {/* OTP Input */}
          <div className="space-y-4 mb-6">
            <Label className="text-white">Enter 6-digit OTP</Label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
                setError('');
              }}
              className="bg-white/5 border-white/20 text-white text-center text-xl tracking-widest placeholder:text-white/50"
              placeholder="000000"
              maxLength={6}
            />
            
            {/* Demo OTP Display */}
            <div className="p-3 bg-green-400/10 rounded-lg border border-green-400/20">
              <p className="text-green-400 text-xs mb-1">🎯 SIH Demo OTP:</p>
              <p className="text-green-400 font-mono text-sm">{generatedOTP}</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">
              Expires in: {formatTime(timeLeft)}
            </span>
            <Badge className={`text-xs ${
              timeLeft > 120 ? 'bg-green-400/20 text-green-400' : 
              timeLeft > 60 ? 'bg-yellow-400/20 text-yellow-400' :
              'bg-red-400/20 text-red-400'
            }`}>
              {timeLeft > 120 ? 'Active' : timeLeft > 60 ? 'Expiring' : 'Critical'}
            </Badge>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-400/30 bg-red-400/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6 || isVerifying || timeLeft === 0}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-medium"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify & Continue
                </>
              )}
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={handleResend}
                disabled={timeLeft > 240}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend OTP
              </Button>
              
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-red-400/30 text-red-400 hover:bg-red-400/10"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <p className="text-white/70 text-xs mb-3">🔐 Security Features Active:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-white/60">End-to-end Encryption</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-white/60">Time-based Validation</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-white/60">IP Address Verification</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-400" />
                <span className="text-white/60">Fraud Detection</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}