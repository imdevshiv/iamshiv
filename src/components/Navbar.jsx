import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const indicatorRef = useRef(null);
  const navItemsRef = useRef({});

  // Show navbar with fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll observer with fix to disable active highlight on 'home'
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'home') {
              setActiveSection(null);       // no active section on home
              updateIndicator(null);        // hide indicator
            } else {
              setActiveSection(entry.target.id);
              updateIndicator(entry.target.id);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    ['home', 'skills', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update on route change
  useEffect(() => {
    if (location.pathname === '/projects') {
      setActiveSection('projects');
      updateIndicator('projects');
    } else if (location.pathname === '/') {
      const scrollTarget = sessionStorage.getItem('scrollTarget');
      if (scrollTarget) {
        const el = document.getElementById(scrollTarget);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(scrollTarget);
            updateIndicator(scrollTarget);
            sessionStorage.removeItem('scrollTarget');
          }, 100);
        }
      } else {
        setActiveSection(null);    // no highlight on home route initially
        updateIndicator(null);
      }
    }
  }, [location]);

  const updateIndicator = (section) => {
    const indicator = indicatorRef.current;
    if (!indicator) return;

    if (!section || !navItemsRef.current[section]) {
      // Hide indicator if no active section
      indicator.style.width = '0px';
      return;
    }

    const navItem = navItemsRef.current[section];
    indicator.style.width = `${navItem.offsetWidth}px`;
    indicator.style.left = `${navItem.offsetLeft}px`;
  };

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        updateIndicator(sectionId);
      }
    }
  };

  return (
    <nav
      className={`bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white p-4 sticky top-0 z-50 backdrop-blur-sm transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center relative">
        <h1 className="text-2xl font-bold">
          <span
            ref={(el) => (navItemsRef.current['home'] = el)}
            onClick={() => scrollToSection('home')}
            className={`cursor-pointer hover:text-white transition ${
              activeSection === 'home' ? 'text-white' : ''
            }`}
          >
            <span className="text-purple-500">iam</span>shiv
          </span>
        </h1>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span
            className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white mb-1 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:block relative">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-purple-500 transition-all duration-300 ease-in-out"
            style={{ bottom: '-8px' }}
          />
          <ul className="flex gap-6">
            <li>
              <span
                ref={(el) => (navItemsRef.current['skills'] = el)}
                onClick={() => scrollToSection('skills')}
                className={`cursor-pointer hover:text-purple-400 transition ${
                  activeSection === 'skills' ? 'text-purple-400' : ''
                }`}
              >
                Skills
              </span>
            </li>
            <li>
              <Link
                ref={(el) => (navItemsRef.current['projects'] = el)}
                to="/projects"
                className={`hover:text-purple-400 transition ${
                  activeSection === 'projects' ? 'text-purple-400' : ''
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <span
                ref={(el) => (navItemsRef.current['contact'] = el)}
                onClick={() => scrollToSection('contact')}
                className={`cursor-pointer hover:text-purple-400 transition ${
                  activeSection === 'contact' ? 'text-purple-400' : ''
                }`}
              >
                Contact
              </span>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-black via-gray-900 to-blue-900 p-4 z-50">
            <ul className="flex flex-col gap-4">
              <li>
                <span
                  onClick={() => scrollToSection('skills')}
                  className={`cursor-pointer hover:text-purple-400 transition ${
                    activeSection === 'skills' ? 'text-purple-400' : ''
                  }`}
                >
                  Skills
                </span>
              </li>
              <li>
                <Link
                  to="/projects"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSection('projects');
                  }}
                  className={`hover:text-purple-400 transition ${
                    activeSection === 'projects' ? 'text-purple-400' : ''
                  }`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <span
                  onClick={() => scrollToSection('contact')}
                  className={`cursor-pointer hover:text-purple-400 transition ${
                    activeSection === 'contact' ? 'text-purple-400' : ''
                  }`}
                >
                  Contact
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
