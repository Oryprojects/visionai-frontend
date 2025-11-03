import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_2fr_1.5fr] gap-x-8 gap-y-8 items-start">
          <div className="flex flex-col items-start -mt-4">
              {/* <Brain className="h-8 w-8 text-blue-400 pulse-3d" />
              <span className="text-xl font-bold">VisionAI</span> */}
              <Link to="/" className="flex items-center space-x-1 group" aria-label="VisionAI home">
                          {/* Logo only (no text) - medium size */}
                          <img src="/vision-removebg-preview.png" alt="VisionAI" className="h-28 md:h-28 w-auto" />
                        </Link>
        
            <p className="text-gray-400 mb-6">
              Transforming businesses through intelligent AI solutions and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 shadow-3d-hover">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 shadow-3d-hover">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 shadow-3d-hover">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-all duration-300">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-all duration-300">About</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-all duration-300">Services</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-all duration-300">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-all duration-300">Contact</Link></li>
              {/* <li><Link to="/blog" className="text-gray-400 hover:text-white transition-all duration-300">Blog</Link></li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/end-to-end-solution-implementation" className="text-gray-400 hover:text-white transition-all duration-300">End-to-End Solution Implementation</Link></li>
              <li><Link to="/services/ai-powered-business-intelligence" className="text-gray-400 hover:text-white transition-all duration-300">AI-Powered Business Intelligence</Link></li>
              <li><Link to="/services/agentic-ai-systems" className="text-gray-400 hover:text-white transition-all duration-300">Agentic AI Systems</Link></li>
              <li><Link to="/services/data-driven-analytics" className="text-gray-400 hover:text-white transition-all duration-300">Data-Driven Analytics</Link></li>
              <li><Link to="/services/bot-setup" className="text-gray-400 hover:text-white transition-all duration-300">BOT Setup (Build-Operate-Transfer)</Link></li>
              <li><Link to="/services/legacy-to-future-transformation" className="text-gray-400 hover:text-white transition-all duration-300">Legacy to Future Transformation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-400">sales@visionai.jp</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-400">+81-50-8894-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-400">305-0861, Ibaraki, Tsukuba, Yatabe 1077-58</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; VisionAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;