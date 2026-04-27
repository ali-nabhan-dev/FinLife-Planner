import { useState } from 'react';
import { motion } from 'framer-motion';
import leftSvg from './assets/forgot-password-animate.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Left Panel - Larger SVG Illustration */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-4 bg-indigo-50">
          <div className="w-full h-full max-h-[600px] flex items-center justify-center">
            <img
              src={leftSvg}
              alt="Forgot Password Illustration"
              className="w-full h-full object-contain"
              style={{ minWidth: '400px', minHeight: '400px' }}
            />
          </div>
        </div>

        {/* Right Panel - Form Content */}
        <div className="flex-1 md:w-1/2">
          {/* Header */}
          <div className="bg-indigo-600 py-8 px-8 relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg
                viewBox="0 0 500 100"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,50 Q250,100 500,50 L500,0 L0,0 Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </motion.div>
              <h1 className="mt-4 text-3xl font-bold text-white text-center">
                {isSubmitted ? 'Check your email' : 'Forgot your password?'}
              </h1>
              <p className="mt-3 text-indigo-100 text-center text-lg">
                {isSubmitted
                  ? 'We sent a password reset link to your email'
                  : "No worries, we'll send you reset instructions"}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 text-lg border-gray-300 rounded-lg py-4 border"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${isLoading ? 'opacity-80' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Reset password'
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-green-100">
                  <svg
                    className="h-16 w-16 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="mt-6 text-lg text-gray-600">
                  We've sent a password reset link to <span className="font-medium">{email}</span>. 
                  The link will expire in 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail('');
                  }}
                  className="mt-8 w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Resend email
                </button>
              </motion.div>
            )}

            <div className="mt-8 text-center space-y-4">
              <div>
                <a
                  href="/login"
                  className="text-lg font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Back to login
                </a>
              </div>
              <div className="text-gray-500">
                <p>Need help? <a href="#" className="text-indigo-600 hover:text-indigo-500">Contact support</a></p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;