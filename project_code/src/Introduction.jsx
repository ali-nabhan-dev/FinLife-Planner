import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
//import img1 from './images/TRY1.webp';
import img1p from './images/intro/see_your_money_grow_sized.webp';
//import img2 from './images/uni.webp';
import img2p from './images/intro/finlife_planner_university_scene.webp';
//import img3 from './images/plan.webp';
import img3p from './images/intro/finlife_car_purchase_scene.webp';
//import img4 from './images/to.webp';
import img4p from './images/intro/daily_plan_image.webp';
//import img5 from './images/dubia.webp';
import img5p from './images/intro/dubai_cityscape_resized.webp';

const Introduction = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Colored Header that Maintains Color on Scroll */}
      <header className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 bg-gradient-to-r from-blue-600 to-green-500 shadow-lg`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500 font-bold text-xl inline-block h-6 w-6 align-middle">
              <img
               src="/src/assets/logo.png"
              alt="Logo"
               className="h-full w-full object-contain transform scale-[2]"
/>

             </span>

            </motion.div>
            <h1 className="text-2xl font-extrabold text-white">
              <span className="font-bold">FINLIFE</span> Planner
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-blue-100 font-medium transition-colors">Home</Link>
            <Link to="/AboutUs" className="text-white hover:text-blue-100 font-medium transition-colors">About Us</Link>
            <Link to="/features" className="text-white hover:text-blue-100 font-medium transition-colors">Features</Link>
            <Link to="/pricing" className="text-white hover:text-blue-100 font-medium transition-colors">Pricing</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-6 py-2 text-white font-medium hover:text-blue-100 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-white text-blue-600 font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-blue-600 shadow-lg py-4"
          >
            <div className="flex flex-col items-center gap-4">
              <Link to="/" className="text-white hover:text-blue-100 font-medium">Home</Link>
              <Link to="/AboutUs" className="text-white hover:text-blue-100 font-medium">About Us</Link>
              <Link to="/features" className="text-white hover:text-blue-100 font-medium">Features</Link>
              <Link to="/pricing" className="text-white hover:text-blue-100 font-medium">Pricing</Link>
              <div className="flex gap-4 mt-2">
                <Link 
                  to="/login" 
                  className="px-6 py-2 text-white font-medium border border-white rounded-full hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-6 py-2 bg-white text-blue-600 font-medium rounded-full hover:bg-blue-100 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-16 px-6 w-full max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-green-500"
          >
            Your Financial Journey, Simplified
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Plan your finances, achieve your goals, and secure your future with FINLIFE Planner.
          </motion.p>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.main 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="pb-20 w-full max-w-7xl mx-auto px-6"
      >
        {/* Section 1 */}
        <motion.div 
          variants={featureVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-10 py-16 border-b border-gray-200"
        >
          <motion.div 
            className="md:w-1/2 text-content order-2 md:order-1"
          >
            <span className="block text-blue-500 font-semibold mb-2">Financial Peace</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Never Miss a Payment Again
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Get personalized plans and arrangements that ensure you always keep up with bills and financial dues on time, with ease and confidence.
            </p>
           
          </motion.div>
          <motion.div 
            className="md:w-1/2 order-1 md:order-2"
            whileHover="hover"
            variants={imageVariants}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={img2p} 
              alt="Financial planning" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
          variants={featureVariants}
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 py-16 border-b border-gray-200"
        >
          <motion.div className="md:w-1/2 text-content">
            <span className="block text-green-500 font-semibold mb-2">Daily Organization</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Master Your Daily Budget
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Organize your day efficiently with customized daily plans that help you accomplish your tasks while staying within your budget constraints.
            </p>
          
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            whileHover="hover"
            variants={imageVariants}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={img4p} 
              alt="Daily planning" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
          variants={featureVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-10 py-16 border-b border-gray-200"
        >
          <motion.div className="md:w-1/2 text-content order-2 md:order-1">
            <span className="block text-purple-500 font-semibold mb-2">Goal Setting</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Map Your Path to Success
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Set ambitious future goals and receive a clear roadmap that guides you to success in the most efficient time frame possible.
            </p>
           
          </motion.div>
          <motion.div 
            className="md:w-1/2 order-1 md:order-2"
            whileHover="hover"
            variants={imageVariants}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={img3p} 
              alt="Goal setting" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          variants={featureVariants}
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 py-16 border-b border-gray-200"
        >
          <motion.div className="md:w-1/2 text-content">
            <span className="block text-orange-500 font-semibold mb-2">Visual Analytics</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              See Your Money Grow
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Track your financial progress with intuitive graphical illustrations that clearly demonstrate improvements in money management and profit growth.
            </p>
            
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            whileHover="hover"
            variants={imageVariants}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={img1p} 
              alt="Financial graphics" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Section 5 */}
        <motion.div 
          variants={featureVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-10 py-16"
        >
          <motion.div className="md:w-1/2 text-content order-2 md:order-1">
            <span className="block text-blue-500 font-semibold mb-2">UAE Relocation</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Find Your Ideal UAE Location
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Discover the most suitable location in the UAE based on your specific budget and preferences, with personalized recommendations to start your new journey.
            </p>
            
          </motion.div>
          <motion.div 
            className="md:w-1/2 order-1 md:order-2"
            whileHover="hover"
            variants={imageVariants}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={img5p} 
              alt="UAE location" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.main>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-green-500 py-16 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Join thousands of users who are already managing their finances more effectively and achieving their goals faster.
          </p>
          <Link 
            to="/signup" 
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Your Free Trial
          </Link>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm"><img
               src="/src/assets/logo.png"
              alt="Logo"
               className="h-full w-full object-contain transform scale-[1]"
              />
             </span>
                </div>
                FINLIFE Planner
              </h3>
              <p className="max-w-xs text-gray-400">
                Your comprehensive solution for financial planning and future security.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/AboutUs" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/Features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© {new Date().getFullYear()} FINLIFE Planner. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 5.625c-.87.357-1.75.596-2.715.715 1.036-.587 1.826-1.542 2.2-2.715-.943.519-1.983.9-3.097 1.102-.887-.945-2.152-1.529-3.55-1.529-2.684 0-4.87 2.183-4.87 4.87 0 .378.052.748.143 1.09-4.052-.198-7.629-2.143-10.05-5.098-.416.715-.661 1.542-.661 2.423 0 1.683.862 3.174 2.17 4.052-.794-.026-1.55-.247-2.203-.607v.061c0 2.36 1.685 4.331 3.892 4.783-.405.107-.836.182-1.27.182-.312 0-.611-.026-.91-.09.611 1.94 2.388 3.355 4.496 3.393-1.648 1.29-3.728 2.05-5.982 2.05-.388 0-.769-.026-1.143-.064 2.13 1.37 4.675 2.16 7.393 2.16 8.862 0 13.712-7.35 13.712-13.712 0-.208 0-.42-.013-.617.926-.674 1.74-1.513 2.388-2.473z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Introduction;