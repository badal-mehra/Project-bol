import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Award, Calendar, User, Shield } from 'lucide-react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CertificateGeneratorProps {
  onClose: () => void;
  studentName: string;
}

const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ onClose, studentName }) => {
  const [formData, setFormData] = useState({
    courseName: 'Ethical Hacking Fundamentals',
    completionDate: new Date().toISOString().split('T')[0],
    instructor: 'Dr. Sarah Chen',
    grade: 'A+'
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const generateQRCode = async () => {
    const certificateData = {
      id: `CERT${Date.now()}`,
      studentName,
      courseName: formData.courseName,
      completionDate: formData.completionDate,
      instructor: formData.instructor,
      grade: formData.grade
    };

    try {
      const qrUrl = await QRCode.toDataURL(JSON.stringify(certificateData));
      setQrCodeUrl(qrUrl);
      return certificateData.id;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return `CERT${Date.now()}`;
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generateQRCode();
    setIsGenerating(false);
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: '#000000'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${studentName}_Certificate.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black border border-red-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-red-500/30 flex items-center justify-between">
          <h2 className="text-2xl font-bold cyber-text">Generate Certificate</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Course Name
              </label>
              <input
                type="text"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Completion Date
              </label>
              <input
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Grade
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              >
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="cyber-button px-6 py-3"
            >
              {isGenerating ? 'Generating...' : 'Generate Certificate'}
            </button>

            {qrCodeUrl && (
              <button
                onClick={downloadCertificate}
                className="border border-red-500 text-red-400 px-6 py-3 rounded hover:bg-red-500/20 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            )}
          </div>

          {/* Certificate Preview */}
          {qrCodeUrl && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Certificate Preview</h3>
              <div
                ref={certificateRef}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-12 rounded-lg border-2 border-red-500/50 relative overflow-hidden"
                style={{ aspectRatio: '1.414/1' }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-5"></div>
                
                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="h-12 w-12 text-red-500 mr-4" />
                    <h1 className="text-4xl font-bold cyber-text">HackingShiksha</h1>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Certificate of Completion</h2>
                  <div className="w-32 h-1 bg-red-500 mx-auto"></div>
                </div>

                {/* Content */}
                <div className="text-center mb-8 relative z-10">
                  <p className="text-lg text-gray-300 mb-4">This is to certify that</p>
                  <h3 className="text-3xl font-bold text-white mb-4 neon-text">{studentName}</h3>
                  <p className="text-lg text-gray-300 mb-2">has successfully completed the course</p>
                  <h4 className="text-2xl font-bold text-red-400 mb-4">{formData.courseName}</h4>
                  <p className="text-gray-300">with a grade of <span className="font-bold text-green-400">{formData.grade}</span></p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end relative z-10">
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-red-500 mb-2"></div>
                    <p className="text-sm text-gray-400">Instructor</p>
                    <p className="font-semibold">{formData.instructor}</p>
                  </div>

                  <div className="text-center">
                    <img src={qrCodeUrl} alt="QR Code" className="w-20 h-20 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Verify Certificate</p>
                  </div>

                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-red-500 mb-2"></div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="font-semibold">{formData.completionDate}</p>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-red-500/30 rotate-45"></div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateGenerator;