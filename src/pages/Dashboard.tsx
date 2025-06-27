import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  Target,
  Download,
  Eye,
  Play,
  CheckCircle,
  Star,
  Calendar,
  Trophy,
  Zap,
  Shield,
  Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CertificateGenerator from '../components/CertificateGenerator';
import AccountSettings from '../components/AccountSettings';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCertificateGenerator, setShowCertificateGenerator] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const stats = [
    { icon: <BookOpen className="h-6 w-6" />, label: 'Courses Enrolled', value: '12', color: 'text-blue-400' },
    { icon: <CheckCircle className="h-6 w-6" />, label: 'Completed', value: '8', color: 'text-green-400' },
    { icon: <Award className="h-6 w-6" />, label: 'Certificates', value: '5', color: 'text-yellow-400' },
    { icon: <TrendingUp className="h-6 w-6" />, label: 'Progress', value: '78%', color: 'text-red-400' }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced Penetration Testing',
      progress: 85,
      lastAccessed: '2 hours ago',
      instructor: 'Alex Thompson',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      title: 'Ethical Hacking Bootcamp',
      progress: 92,
      lastAccessed: '1 day ago',
      instructor: 'Dr. Sarah Chen',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      title: 'Network Security Mastery',
      progress: 67,
      lastAccessed: '3 days ago',
      instructor: 'Jennifer Liu',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const achievements = [
    { title: 'First Course Completed', date: '2024-01-15', icon: <Trophy className="h-6 w-6" /> },
    { title: 'Speed Learner', date: '2024-01-20', icon: <Zap className="h-6 w-6" /> },
    { title: 'Security Expert', date: '2024-01-25', icon: <Shield className="h-6 w-6" /> },
    { title: 'Perfect Score', date: '2024-02-01', icon: <Star className="h-6 w-6" /> }
  ];

  const certificates = [
    {
      id: 'CERT001',
      courseName: 'Ethical Hacking Fundamentals',
      completionDate: '2024-01-15',
      instructor: 'Dr. Sarah Chen',
      grade: 'A+'
    },
    {
      id: 'CERT002',
      courseName: 'Network Security Basics',
      completionDate: '2024-01-20',
      instructor: 'Jennifer Liu',
      grade: 'A'
    },
    {
      id: 'CERT003',
      courseName: 'Penetration Testing 101',
      completionDate: '2024-01-25',
      instructor: 'Alex Thompson',
      grade: 'A+'
    }
  ];

  const upcomingDeadlines = [
    { course: 'Advanced Malware Analysis', task: 'Final Project', dueDate: '2024-02-15' },
    { course: 'Bug Bounty Hunting', task: 'Lab Assignment', dueDate: '2024-02-18' },
    { course: 'Incident Response', task: 'Case Study', dueDate: '2024-02-20' }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl font-bold cyber-text">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-400">Continue your cybersecurity journey</p>
              </div>
            </div>
            <button
              onClick={() => setShowAccountSettings(true)}
              className="cyber-button px-6 py-3 flex items-center space-x-2"
            >
              <Settings className="h-5 w-5" />
              <span>Account Settings</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-black/50 backdrop-blur-md border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'courses', label: 'My Courses' },
              { id: 'certificates', label: 'Certificates' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="cyber-card p-6 rounded-lg text-center"
                >
                  <div className={`${stat.color} mb-2 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Continue Learning */}
              <div className="cyber-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Play className="h-5 w-5 mr-2 text-red-500" />
                  Continue Learning
                </h3>
                <div className="space-y-4">
                  {recentCourses.map(course => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-gray-400">{course.instructor}</p>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{course.progress}% complete</p>
                      </div>
                      <button className="cyber-button text-sm px-4 py-2">
                        Continue
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="cyber-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-500" />
                  Upcoming Deadlines
                </h3>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{deadline.course}</h4>
                        <p className="text-sm text-gray-400">{deadline.task}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-red-400">{deadline.dueDate}</p>
                        <p className="text-xs text-gray-400">Due soon</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold cyber-text">My Certificates</h2>
              <button
                onClick={() => setShowCertificateGenerator(true)}
                className="cyber-button px-6 py-3"
              >
                Generate New Certificate
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map(cert => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="cyber-card p-6 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Award className="h-8 w-8 text-yellow-400" />
                    <span className="text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded">
                      {cert.grade}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{cert.courseName}</h3>
                  <p className="text-sm text-gray-400 mb-2">Instructor: {cert.instructor}</p>
                  <p className="text-sm text-gray-400 mb-4">Completed: {cert.completionDate}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 cyber-button text-sm py-2">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                    <button className="flex-1 border border-red-500 text-red-400 px-4 py-2 rounded text-sm hover:bg-red-500/20 transition-colors">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold cyber-text">Achievements</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="cyber-card p-6 rounded-lg flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">Earned on {achievement.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Other tabs content would go here */}
      </div>

      {/* Certificate Generator Modal */}
      {showCertificateGenerator && (
        <CertificateGenerator
          onClose={() => setShowCertificateGenerator(false)}
          studentName={user?.name || ''}
        />
      )}

      {/* Account Settings Modal */}
      {showAccountSettings && (
        <AccountSettings
          onClose={() => setShowAccountSettings(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;