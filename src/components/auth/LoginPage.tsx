import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle, Car } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    }
  };

  const handleDemoAccess = async () => {
    try {
      loginAsDemo();
      navigate('/');
    } catch (err) {
      setError('Failed to access demo. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Car className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Fleet Online
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Real-time fleet management and monitoring
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent 
              text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Sign in with Microsoft Account
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={handleDemoAccess}
            className="w-full flex justify-center py-2.5 px-4 border border-gray-300 
              text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Try Demo Version
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-gray-500">
          Demo version provides limited access to showcase core features
        </p>
      </div>
    </div>
  );
};
