import profileImg from "../assets/profile.jpg";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data, error } = await supabase
          .from('resume')
          .select('url')
          .single();

        if (error) throw error;
        if (data?.url) {
          setResumeUrl(data.url);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      }
    };

    fetchResume();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-12 bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <div className="flex flex-col items-center text-center space-y-6">
        <img
          src={profileImg}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-purple-500"
        />
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Hey, I'm <span className="text-purple-500">Shiv</span> ✨
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold">
            A <span className="text-purple-400">Software Developer</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            A <span className="font-bold">fullstack developer</span> with solid foundations in <span className="font-bold">design</span>.
            passionate about crafting seamless user experiences I thrive at the intersection
            of creativity and functionality.
          </p>
        </div>

        <div className="flex space-x-4 mt-8">
          <a
            href={resumeUrl || '/resume.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-3 bg-purple-600 hover:bg-purple-700 
              text-white font-medium rounded-lg 
              transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 
              shadow-lg hover:shadow-purple-500/25 `}
          >
            <span>View Resume</span>
          </a>
          <Link
            to="/projects"
            className="px-6 py-3 bg-transparent hover:bg-white/10 backdrop-blur-sm border-2 border-purple-500 rounded-lg transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
          >
            <span>View Projects</span>
          </Link>
        </div>

        <div className="flex items-center space-x-6 mt-4">
          <a href="https://github.com" className="text-white/80 hover:text-white transition-colors">
            <FaGithub className="w-6 h-6" />
          </a>
          
          <a href="https://linkedin.com" className="text-white/80 hover:text-white transition-colors">
            <FaLinkedinIn className="w-6 h-6" />
          </a>
          <a href="https://twitter.com" className="text-white/80 hover:text-white transition-colors">
            <FaTwitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}