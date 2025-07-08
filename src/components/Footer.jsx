import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About NeighborFit</h3>
            <p className="text-slate-300 leading-relaxed">
              A data-driven solution to the neighborhood-lifestyle matching problem, 
              using systematic research and algorithmic thinking to help people find 
              their perfect community.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Project Info</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Zero budget implementation</li>
              <li>• Real neighborhood data integration</li>
              <li>• Evidence-based algorithm design</li>
              <li>• Open source methodology</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 NeighborFit Project. Built for academic research purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;