import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Database, 
  Eye, 
  Download, 
  FileSpreadsheet,
  University,
  Users,
  Calendar,
  Hash,
  Fingerprint,
  QrCode,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface DemoDataViewerProps {
  isOpen: boolean;
  onClose: () => void;
  sampleData: any[];
}

export function DemoDataViewer({ isOpen, onClose, sampleData }: DemoDataViewerProps) {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  if (!isOpen) return null;

  const universities = [...new Set(sampleData.map(r => r.university))];
  const courses = [...new Set(sampleData.map(r => r.course))];
  const branches = [...new Set(sampleData.map(r => r.branch))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black/60 backdrop-blur-lg border border-yellow-400/30 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-yellow-400/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-yellow-400 flex items-center">
                <Database className="w-6 h-6 mr-2" />
                Jharkhand Student Database Structure
              </h2>
              <p className="text-white/70 mt-1">
                Comprehensive synthetic dataset with {sampleData.length} records from {universities.length} universities
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
            >
              Close
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(90vh-120px)]">
          {/* Statistics Panel */}
          <div className="p-6 border-r border-yellow-400/20 bg-white/5">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2 text-blue-400" />
              Dataset Overview
            </h3>
            
            <div className="space-y-4">
              <div className="bg-black/40 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-bold text-xl">{sampleData.length}</span>
                </div>
                <p className="text-white/70 text-sm">Total Students</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <University className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-bold text-xl">{universities.length}</span>
                </div>
                <p className="text-white/70 text-sm">Universities</p>
                <div className="mt-2 space-y-1">
                  {universities.slice(0, 3).map(uni => (
                    <Badge key={uni} className="bg-blue-400/20 text-blue-400 text-xs mr-1 mb-1">
                      {uni.split(' ').slice(0, 2).join(' ')}
                    </Badge>
                  ))}
                  {universities.length > 3 && (
                    <Badge className="bg-white/10 text-white/70 text-xs">
                      +{universities.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-bold text-xl">{courses.length}</span>
                </div>
                <p className="text-white/70 text-sm">Course Types</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {courses.map(course => (
                    <Badge key={course} className="bg-purple-400/20 text-purple-400 text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <p className="text-white/70 text-sm mb-2">Security Features:</p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <Hash className="w-3 h-3 mr-2 text-yellow-400" />
                    <span className="text-white/60">SHA-256 Certificate Hash</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <Fingerprint className="w-3 h-3 mr-2 text-green-400" />
                    <span className="text-white/60">Biometric Fingerprint Hash</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <QrCode className="w-3 h-3 mr-2 text-blue-400" />
                    <span className="text-white/60">QR Verification Code</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="col-span-2 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-yellow-400/20">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Eye className="w-5 h-5 mr-2 text-yellow-400" />
                Sample Records Preview
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Click on any record to view detailed information
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {selectedRecord ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-white">{selectedRecord.name}</h4>
                    <Button
                      onClick={() => setSelectedRecord(null)}
                      variant="outline"
                      size="sm"
                      className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                    >
                      Back to List
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/70">Student ID</p>
                            <p className="text-yellow-400 font-mono">{selectedRecord.student_id}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Date of Birth</p>
                            <p className="text-white">{selectedRecord.dob}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Gender</p>
                            <p className="text-white">{selectedRecord.gender}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Phone</p>
                            <p className="text-white font-mono">{selectedRecord.phone}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-white/70">Email</p>
                          <p className="text-blue-400 font-mono">{selectedRecord.email}</p>
                        </div>
                        <div>
                          <p className="text-white/70">Address</p>
                          <p className="text-white">{selectedRecord.address}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm">Academic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/70">University</p>
                            <p className="text-white">{selectedRecord.university}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Course</p>
                            <p className="text-green-400">{selectedRecord.course} {selectedRecord.branch}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Admission Year</p>
                            <p className="text-white">{selectedRecord.year_of_admission}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Passing Year</p>
                            <p className="text-white">{selectedRecord.year_of_passing}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Certificate Type</p>
                            <p className="text-purple-400">{selectedRecord.certificate_type}</p>
                          </div>
                          <div>
                            <p className="text-white/70">Certificate ID</p>
                            <p className="text-yellow-400 font-mono">{selectedRecord.certificate_id}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-white/5 border-white/10">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-sm">Security & Verification</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-white/70 mb-1">Certificate Hash (SHA-256)</p>
                          <p className="text-yellow-400 font-mono text-xs bg-black/40 p-2 rounded break-all">
                            {selectedRecord.certificate_hash}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/70 mb-1">Fingerprint Hash</p>
                          <p className="text-green-400 font-mono text-xs bg-black/40 p-2 rounded break-all">
                            {selectedRecord.fingerprint_hash}
                          </p>
                        </div>
                        <div>
                          <p className="text-white/70 mb-1">QR Verification URL</p>
                          <p className="text-blue-400 font-mono text-xs bg-black/40 p-2 rounded break-all">
                            {selectedRecord.qr_code}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {sampleData.map((record, index) => (
                    <motion.div
                      key={record.student_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedRecord(record)}
                      className="p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-yellow-400/30 cursor-pointer transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center">
                              <span className="text-yellow-400 font-bold text-xs">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{record.name}</h4>
                              <p className="text-white/70 text-sm">
                                {record.student_id} • {record.course} {record.branch}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-400/20 text-green-400 mb-1">
                            {record.certificate_type}
                          </Badge>
                          <p className="text-white/60 text-xs">{record.university.split(' ').slice(0, 2).join(' ')}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-yellow-400/20">
              <Button
                className="w-full bg-blue-500/10 text-blue-400 border border-blue-400/30 hover:bg-blue-500/20"
                onClick={() => {
                  // Simulate CSV download
                  const csvContent = "data:text/csv;charset=utf-8," + 
                    "student_id,name,dob,gender,university,course,branch,year_of_admission,year_of_passing,certificate_type,certificate_id,certificate_hash,fingerprint_hash,qr_code,email,phone,address\n" +
                    sampleData.map(record => 
                      `${record.student_id},"${record.name}",${record.dob},${record.gender},"${record.university}",${record.course},${record.branch},${record.year_of_admission},${record.year_of_passing},${record.certificate_type},${record.certificate_id},${record.certificate_hash},${record.fingerprint_hash},${record.qr_code},"${record.email}","${record.phone}","${record.address}"`
                    ).join("\n");
                  
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "jharkhand_student_database_sample.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Sample CSV ({sampleData.length} records)
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}