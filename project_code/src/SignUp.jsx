import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
//import jwt_decode from 'jwt-decode';
import signupImage from './images/signup.webp';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.className = "min-h-screen bg-cover bg-center bg-fixed font-sans";
        document.body.style.backgroundImage = `url(${signupImage})`;

        return () => {
            document.body.className = "";
            document.body.style.backgroundImage = "";
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (username.length < 3 || password.length < 6 || !email.includes('@')) {
            setError('Username must be at least 3 characters, password at least 6 characters, and email must be valid.');
            setIsSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }

        try {
            console.log('Registration successful for:', username, email);
            navigate('/budget-form');
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        try {
            const decoded = jwt_decode(credentialResponse.credential);
            console.log('Google Sign-In Success:', decoded);
            
            const { name, email, picture } = decoded;
            localStorage.setItem('user', JSON.stringify({ name, email, picture }));
            navigate('/budget-form');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            setError('Google Sign-In failed. Please try again.');
        }
    };

    const handleGoogleError = () => {
        console.log('Google Sign-In Failed');
        setError('Google Sign-In failed. Please try again.');
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4">
            <div className="bg-white bg-opacity-80 rounded-xl p-8 shadow-lg w-full max-w-md backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>
                {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                            minLength="6"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                            minLength="6"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 mt-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-3 bg-white bg-opacity-80 text-gray-500">or</span>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            text="signup_with"
                            shape="pill"
                            size="large"
                        />
                    </GoogleOAuthProvider>
                </div>

                <div className="text-center text-sm">
                    <Link to="/login" className="text-purple-600 hover:text-purple-700 hover:underline">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;