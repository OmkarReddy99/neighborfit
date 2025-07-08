import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, BookOpen, LogIn, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup

  const isActive = (path) => location.pathname === path;

  const closeModal = () => {
    setShowModal(false);
    setIsLogin(true); // Reset to login mode when modal closes
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-all duration-200">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                NeighborFit
              </span>
            </Link>

            <nav className="flex items-center space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <Link
                to="/assessment"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/assessment')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Find Match</span>
              </Link>

              <Link
                to="/research"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/research')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Research</span>
              </Link>

              
            </nav>
          </div>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            <form className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              {isLogin ? (
                <>
                  New here?{' '}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsLogin(false)}
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
