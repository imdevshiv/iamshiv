import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://github.com/YourGithub" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <i className="fab fa-github text-2xl"></i>
        </a>
        <a href="https://linkedin.com/in/YourLinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <i className="fab fa-linkedin text-2xl"></i>
        </a>
        <a href="https://twitter.com/YourTwitter" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <i className="fab fa-twitter text-2xl"></i>
        </a>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-4 pt-6 text-center text-gray-400">
        <p>&copy; {currentYear} Shiv. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
