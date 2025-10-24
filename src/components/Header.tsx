import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  // Dark mode only, no theme context
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
    // { path: '/blog', label: 'Blog' },
  ];

  const servicesItems = [
    { path: '/services/end-to-end-solution-implementation', label: 'End-to-End Solution Implementation' },
    { path: '/services/ai-powered-business-intelligence', label: 'AI-Powered Business Intelligence' },
    { path: '/services/agentic-ai-systems', label: 'Agentic AI Systems' },
    { path: '/services/data-driven-analytics', label: 'Data-Driven Analytics' },
    { path: '/services/bot-setup', label: 'BOT Setup (Build-Operate-Transfer)' },
    { path: '/services/legacy-to-future-transformation', label: 'Legacy to Future Transformation' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isServicesActive = () => location.pathname.startsWith('/services');

  // Timer to keep dropdown open for 1 minute
  useEffect(() => {
    let timer: number | undefined;
    if (isServicesDropdownOpen) {
      timer = setTimeout(() => {
        setIsServicesDropdownOpen(false);
      }, 60000); // 1 minute
    }
    return () => clearTimeout(timer);
  }, [isServicesDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group" aria-label="VisionAI home">
            {/* Logo only (no text) - medium size */}
            <img src="/vision ai logo.png" alt="VisionAI" className="h-20 md:h-32 w-auto" />
          </Link>

          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Services Dropdown (button also navigates to /services on click) */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
                onClick={() => { window.dispatchEvent(new Event('force-route-transition')); navigate('/services'); }}
                aria-haspopup="true"
                aria-expanded={isServicesDropdownOpen}
                className={`flex items-center space-x-1 text-sm font-medium transition-all duration-300 ${
                  isServicesActive()
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesDropdownOpen && (
                <div
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                >
                  <div className="space-y-1">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                          isActive(item.path) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className={`font-medium text-sm ${
                            isActive(item.path) 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {item.label}
                          </span>
                          {/* Only show name, no description */}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/contact"
              className="hidden md:inline-flex px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-3d-hover"
            >
              Get Started
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" role="dialog" aria-modal="false" className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navItems.slice(0, 2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Services Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isServicesActive()
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Services</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                
                {isServicesDropdownOpen && (
                  <div className="ml-4 space-y-1">
                    {servicesItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsServicesDropdownOpen(false);
                        }}
                        className={`block px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navItems.slice(2).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;