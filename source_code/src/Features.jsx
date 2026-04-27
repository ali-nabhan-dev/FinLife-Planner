import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import f2 from './assets/money-income-animate.svg';
import f1 from './assets/schedule-animate.svg';
import f4 from './assets/manage-money-animate.svg';
import f3 from './assets/invoice-animate.svg';
import f5 from './assets/accept-tasks-animate.svg';
import f6 from './assets/responsive-animate.svg';
import f7 from './assets/dubai-animate.svg';
import f8 from './assets/calendar-animate.svg';
import heroImage from './assets/features.webp';

const ctaImage = 'https://images.unsplash.com/photo-1579621970795-87facc2f976d';
const organizedImage = 'https://i.pinimg.com/736x/b0/49/ef/b049ef8591df10564ca68bf365989cb7.jpg';
const goalImage = 'https://i.pinimg.com/736x/b2/81/b3/b281b3dbe404746eeac90fb4da4135c1.jpg';
const stressImage = 'https://i.pinimg.com/736x/ad/4e/49/ad4e49802eff32ec91b044959b3f75fb.jpg';

// Faster animation variants
const rowVariants = {
  hidden: { opacity: 0, y: 10 }, 
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, 
      ease: "easeOut",
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 }, 
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, 
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] 
    }
  }
};

const Features = () => {
  const featuresRef1 = useRef(null);
  const featuresRef2 = useRef(null);
  const featuresRef3 = useRef(null);
  const benefitsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Reduced margin to trigger animations sooner
  const isInView1 = useInView(featuresRef1, { once: true, margin: "-50px" });
  const isInView2 = useInView(featuresRef2, { once: true, margin: "-50px" });
  const isInView3 = useInView(featuresRef3, { once: true, margin: "-50px" });
  const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-50px" });
  const isCtaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation Bar - unchanged */}
      <nav className="absolute top-0 right-30 z-50 p-4">
        <div className="flex space-x-6">
          <a href="/" className="text-white hover:text-yellow-400 font-medium transition-colors">Home</a>
          <a href="/features" className="text-white hover:text-yellow-400 font-medium transition-colors">Features</a>
          <a href="/AboutUS" className="text-white hover:text-yellow-400 font-medium transition-colors">About Us</a>
          <a href="/pricing" className="text-white hover:text-yellow-400 font-medium transition-colors">Pricing</a>
        </div>
      </nav>
      
      {/* Hero Section with faster animation */}
      <motion.section 
        className="relative w-full h-80 md:h-170 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }} // Faster (was 0.8)
      >
        <img
          src={heroImage}
          alt="Sustainable Future"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        <motion.div 
          className="absolute inset-0 flex items-center px-4 md:px-8"
          initial={{ y: -30, opacity: 0 }} // Reduced initial y offset
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }} // Faster (was 0.3s delay and 0.8 duration)
        >
          <div className="max-w-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              OUR FEATURES
            </h1>
            <p className="mb-6">
              We offer a wide range of intresting financial features that will lead to your successful FIN LIFE.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Header with faster animation */}
      <motion.div 
        className="container mx-auto px-4 py-16 text-center"
        initial={{ opacity: 0, y: 10 }} // Reduced initial y offset
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }} // Faster (was 0.5s delay and 0.8 duration)
      >
        <div className="mb-4 text-green-500 font-medium">Features Services</div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          A wide range of financial planning services
        </h2>

        {/* Features Grid 1 */}
        <motion.div 
          ref={featuresRef1}
          variants={rowVariants}
          initial="hidden"
          animate={isInView1 ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Feature 1 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f1} alt="Daily plans" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Daily Budget Planning</h3>
            <p className="text-gray-600 mb-6">
              Plan your day with a daily budget that aligns with your tasks and financial goals.
            </p>
          
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f2} alt="Expense Tracking Icon" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Expense Tracking</h3>
            <p className="text-gray-600 mb-6">
              Track your expenses in real-time and see where your money is going.
            </p>
         
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f3} alt="bills" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Bill Reminders</h3>
            <p className="text-gray-600 mb-6">
              Never miss a payment with timely reminders for your bills and financial dues.
            </p>
           
          </motion.div>
        </motion.div>

        {/* Features Grid 2 */}
        <motion.div 
          ref={featuresRef2}
          variants={rowVariants}
          initial="hidden"
          animate={isInView2 ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* Feature 4 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f4} alt="Future plans" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Goal Setting</h3>
            <p className="text-gray-600 mb-6">
              Set financial goals and track your progress toward achieving them.
            </p>
           
          </motion.div>

          {/* Feature 5 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f5} alt="Tasks" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Task Management</h3>
            <p className="text-gray-600 mb-6">
              Organize your tasks and align them with your budget for better productivity.
            </p>
           
          </motion.div>

          {/* Feature 6 */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f6} alt="Tasks" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Responsive Design</h3>
            <p className="text-gray-600 mb-6">
              Access your budget and tasks on the go with our responsive design.
            </p>
          
          </motion.div>
        </motion.div>

        {/* Features Grid 3 */}
        <motion.div 
          ref={featuresRef3}
          variants={rowVariants}
          initial="hidden"
          animate={isInView3 ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Feature 7 - Dubai Location Recommendations */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f7} alt="UAE Location Recommendations" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Dubai Location Recommendations</h3>
            <p className="text-gray-600 mb-6">
              Discover budget-friendly and premium locations in Dubai tailored to your financial plan and preferences.
            </p>
            
          </motion.div>

          {/* Feature 8 - Monthly Organizer */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg p-8 transition-transform hover:-translate-y-1"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <img src={f8} alt="Monthly Organizer" className="w-36 h-36" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Monthly Organizer</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive monthly planning with budget tracking, goal setting, and progress reports all in one place.
            </p>
          
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Benefits Section - With Images */}
      <motion.div 
        ref={benefitsRef}
        initial={{ opacity: 0 }}
        animate={isBenefitsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }} // Faster (was 0.8)
        className="bg-gray-50 py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
            initial={{ y: 10, opacity: 0 }} // Reduced initial y offset
            animate={isBenefitsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }} // Faster (was 0.2s delay and 0.6 duration)
          >
            How FINLIFE Planner Helps You
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={rowVariants}
            initial="hidden"
            animate={isBenefitsInView ? "visible" : "hidden"}
          >
            {/* Benefit 1 - With image */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={organizedImage} 
                  alt="Stay Organized" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Stay Organized</h3>
                <p className="text-gray-600">
                  Keep track of your finances and tasks in one place, so you never miss a beat.
                </p>
              </div>
            </motion.div>
            
            {/* Benefit 2 - With image */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={goalImage} 
                  alt="Achieve Financial Goals" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Achieve Financial Goals</h3>
                <p className="text-gray-600">
                  Set realistic goals and watch your progress as you work toward financial freedom.
                </p>
              </div>
            </motion.div>
            
            {/* Benefit 3 - With image */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={stressImage} 
                  alt="Reduce Stress" 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Reduce Stress</h3>
                <p className="text-gray-600">
                  With timely reminders and easy tracking, managing your finances becomes stress-free.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section with faster animation */}
      <motion.section 
        ref={ctaRef}
        initial={{ opacity: 0 }}
        animate={isCtaInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }} // Faster (was 0.8)
        className="relative w-full overflow-hidden"
      >
        <div className="relative h-[700px] md:h-[600px]">
          <img
            src={ctaImage}
            alt="Financial Planning"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-40" />

          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center px-4"
            variants={fadeInVariants}
            initial="hidden"
            animate={isCtaInView ? "visible" : "hidden"}
          >
            <motion.div 
              variants={fadeInVariants}
              className="text-center mb-16 max-w-2xl"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-xl text-white mb-10">
                Sign up today and start your journey toward financial freedom with 
                FINLIFE Planner.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
              >
                Sign Up Now
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInVariants}
              className="w-24 h-1 bg-green-400 mb-16"
            ></motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Features;