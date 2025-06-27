import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  Award,
  Shield,
  Zap,
  Lock,
  CheckCircle,
  Tag,
  Percent
} from 'lucide-react';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'ethical-hacking', name: 'Ethical Hacking' },
    { id: 'penetration-testing', name: 'Penetration Testing' },
    { id: 'cybersecurity', name: 'Cybersecurity' },
    { id: 'network-security', name: 'Network Security' },
    { id: 'malware-analysis', name: 'Malware Analysis' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'expert', name: 'Expert' }
  ];

  const vouchers = [
    { code: 'CYBER50', discount: 50, type: 'percentage', description: '50% off on all courses' },
    { code: 'NEWUSER', discount: 1000, type: 'fixed', description: '₹1000 off for new users' },
    { code: 'STUDENT25', discount: 25, type: 'percentage', description: '25% student discount' },
    { code: 'HACKER100', discount: 100, type: 'percentage', description: 'Free course voucher' }
  ];

  const courses = [
    {
      id: 1,
      title: "Complete Ethical Hacking Bootcamp",
      description: "Master ethical hacking from basics to advanced penetration testing techniques",
      instructor: "Dr. Sarah Chen",
      duration: "40 hours",
      students: 15420,
      rating: 4.9,
      price: 2999,
      originalPrice: 4999,
      level: "intermediate",
      category: "ethical-hacking",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Live Labs", "Certificate", "24/7 Support", "Lifetime Access"],
      isFree: false,
      isPopular: true
    },
    {
      id: 2,
      title: "Cybersecurity Fundamentals",
      description: "Learn the basics of cybersecurity and protect digital assets",
      instructor: "Mike Rodriguez",
      duration: "25 hours",
      students: 8930,
      rating: 4.7,
      price: 0,
      originalPrice: 1999,
      level: "beginner",
      category: "cybersecurity",
      image: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Interactive Quizzes", "Certificate", "Community Access"],
      isFree: true,
      isPopular: false
    },
    {
      id: 3,
      title: "Advanced Penetration Testing",
      description: "Deep dive into advanced pen testing methodologies and tools",
      instructor: "Alex Thompson",
      duration: "60 hours",
      students: 5670,
      rating: 4.8,
      price: 4999,
      originalPrice: 7999,
      level: "advanced",
      category: "penetration-testing",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Real-world Labs", "Certificate", "Mentorship", "Job Assistance"],
      isFree: false,
      isPopular: false
    },
    {
      id: 4,
      title: "Network Security Mastery",
      description: "Comprehensive network security course covering all aspects",
      instructor: "Jennifer Liu",
      duration: "35 hours",
      students: 12340,
      rating: 4.6,
      price: 3499,
      originalPrice: 5999,
      level: "intermediate",
      category: "network-security",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Hands-on Labs", "Certificate", "Expert Support"],
      isFree: false,
      isPopular: true
    },
    {
      id: 5,
      title: "Malware Analysis Workshop",
      description: "Learn to analyze and reverse engineer malicious software",
      instructor: "David Kim",
      duration: "45 hours",
      students: 3210,
      rating: 4.9,
      price: 5999,
      originalPrice: 8999,
      level: "expert",
      category: "malware-analysis",
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["VM Environment", "Certificate", "1-on-1 Sessions"],
      isFree: false,
      isPopular: false
    },
    {
      id: 6,
      title: "Bug Bounty Hunter Path",
      description: "Complete guide to becoming a successful bug bounty hunter",
      instructor: "Emma Wilson",
      duration: "50 hours",
      students: 9870,
      rating: 4.8,
      price: 0,
      originalPrice: 3999,
      level: "intermediate",
      category: "ethical-hacking",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
      features: ["Real Targets", "Certificate", "Community", "Updates"],
      isFree: true,
      isPopular: true
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-orange-400 bg-orange-400/20';
      case 'expert': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleApplyVoucher = (course: any) => {
    setSelectedCourse(course);
    setShowVoucherModal(true);
  };

  const applyVoucherCode = () => {
    const voucher = vouchers.find(v => v.code === voucherCode.toUpperCase());
    if (voucher) {
      let discountedPrice = selectedCourse.price;
      if (voucher.type === 'percentage') {
        discountedPrice = selectedCourse.price * (1 - voucher.discount / 100);
      } else {
        discountedPrice = Math.max(0, selectedCourse.price - voucher.discount);
      }
      
      setAppliedVoucher({
        ...voucher,
        originalPrice: selectedCourse.price,
        discountedPrice: Math.round(discountedPrice),
        savings: selectedCourse.price - Math.round(discountedPrice)
      });
    } else {
      alert('Invalid voucher code');
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 cyber-text">
              Master Cybersecurity
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose from our comprehensive collection of cybersecurity courses designed by industry experts
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/50 backdrop-blur-md border border-red-500/30 rounded-lg p-6 mb-12"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-black">
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id} className="bg-black">
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Vouchers */}
      <section className="py-8 bg-gradient-to-r from-red-900/10 via-black to-red-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-4 text-center cyber-text">🎯 Active Discount Vouchers</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {vouchers.map((voucher, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 rounded-lg p-4 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Tag className="h-5 w-5 text-red-400 mr-2" />
                  <span className="font-bold text-red-400">{voucher.code}</span>
                </div>
                <p className="text-sm text-gray-300">{voucher.description}</p>
                <div className="mt-2 text-xs text-gray-400">
                  {voucher.type === 'percentage' ? `${voucher.discount}% OFF` : `₹${voucher.discount} OFF`}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 relative"
              >
                {course.isPopular && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    POPULAR
                  </div>
                )}
                
                {course.isFree && (
                  <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                    FREE
                  </div>
                )}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-500/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getLevelColor(course.level)}`}>
                      {course.level.toUpperCase()}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="mr-4">{course.duration}</span>
                    <Users className="h-4 w-4 mr-1" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {course.isFree ? (
                        <span className="text-2xl font-bold text-green-500">FREE</span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-red-500">
                            ₹{course.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                    <button className="cyber-button text-sm px-4 py-2">
                      {course.isFree ? 'Start Free' : 'Enroll Now'}
                    </button>
                  </div>

                  {!course.isFree && (
                    <button
                      onClick={() => handleApplyVoucher(course)}
                      className="w-full border border-red-500/50 text-red-400 px-4 py-2 rounded text-sm hover:bg-red-500/20 transition-colors flex items-center justify-center"
                    >
                      <Percent className="h-4 w-4 mr-2" />
                      Apply Discount Voucher
                    </button>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">
                      Instructor: <span className="text-white">{course.instructor}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Voucher Modal */}
      {showVoucherModal && selectedCourse && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-red-500/30 rounded-lg max-w-md w-full p-6"
          >
            <h3 className="text-2xl font-bold cyber-text mb-4">Apply Discount Voucher</h3>
            <p className="text-gray-400 mb-4">Course: {selectedCourse.title}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Voucher Code
                </label>
                <input
                  type="text"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className="w-full px-4 py-3 bg-black/50 border border-red-500/30 rounded-lg focus:border-red-500 focus:outline-none transition-colors text-white"
                  placeholder="Enter voucher code"
                />
              </div>

              {appliedVoucher && (
                <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-2">Voucher Applied Successfully!</h4>
                  <div className="space-y-1 text-sm">
                    <p>Original Price: <span className="line-through">₹{appliedVoucher.originalPrice}</span></p>
                    <p>Discount: -{appliedVoucher.type === 'percentage' ? `${appliedVoucher.discount}%` : `₹${appliedVoucher.discount}`}</p>
                    <p className="text-green-400 font-bold">Final Price: ₹{appliedVoucher.discountedPrice}</p>
                    <p className="text-green-400">You Save: ₹{appliedVoucher.savings}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={applyVoucherCode}
                  className="cyber-button px-6 py-3"
                >
                  Apply Voucher
                </button>
                <button
                  onClick={() => {
                    setShowVoucherModal(false);
                    setVoucherCode('');
                    setAppliedVoucher(null);
                  }}
                  className="border border-red-500 text-red-400 px-6 py-3 rounded hover:bg-red-500/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/20 via-black to-red-900/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of students mastering cybersecurity skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cyber-button text-lg px-8 py-4">
                Browse Free Courses
              </button>
              <button className="border border-red-500 text-white px-8 py-4 rounded hover:bg-red-500/20 transition-colors">
                View Learning Paths
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;