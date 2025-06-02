import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the navbar
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Store the target section and navigate using React Router
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const scrollTarget = sessionStorage.getItem('scrollTarget');
      if (scrollTarget) {
        const element = document.getElementById(scrollTarget);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
            sessionStorage.removeItem('scrollTarget');
          }, 100);
        }
      }
    }
  }, [location]);

  return (
    <nav className={`bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white p-4 sticky top-0 z-50 backdrop-blur-sm transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <a onClick={() => scrollToSection('home')} className="hover:text-white transition cursor-pointer">
            <span className="text-purple-500">iam</span>shiv
          </a>
        </h1>
        
        {/* Hamburger Menu Button */}
        <button 
          className="lg:hidden flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6">
          <li><a onClick={() => scrollToSection('skills')} className="hover:text-purple-400 transition cursor-pointer">Skills</a></li>
          <li><Link to="/projects" className="hover:text-purple-400 transition">Projects</Link></li>
          <li><a onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition cursor-pointer">Contact</a></li>
        </ul>

        {/* Mobile Menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-black via-gray-900 to-blue-900 p-4`}>
          <ul className="flex flex-col gap-4">
            <li><a onClick={() => scrollToSection('skills')} className="hover:text-purple-400 transition cursor-pointer block">Skills</a></li>
            <li><Link to="/projects" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-400 transition block">Projects</Link></li>
            <li><a onClick={() => scrollToSection('contact')} className="hover:text-purple-400 transition cursor-pointer block">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;