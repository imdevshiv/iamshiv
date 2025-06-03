import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchProjects();
    // Add animation trigger after a short delay
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProjects(data);
    } catch (err) {
      setError('Error fetching projects');
      console.error('Error:', err);
    } finally {
      if (!error) {
        if (imagesLoaded === projects.length) {
          setLoading(false);
        }
      }
    }
  };

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
    if (imagesLoaded + 1 === projects.length) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#111111] min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500">
              <div className="animate-pulse w-full h-full rounded-full bg-purple-500/20"></div>
            </div>
            <p className="text-gray-400 animate-pulse">Loading amazing projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#111111] min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-red-500 text-center animate-fade-in">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-[#111111] min-h-screen">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 opacity-0 transition-all duration-1000 transform translate-y-8 ${isVisible ? 'opacity-100 translate-y-0' : ''}`}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-[#1A1A1A] rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl"
              style={{
                transitionDelay: `${index * 100}ms`,
                animation: `fadeSlideIn 0.6s ease-out ${index * 100}ms both`
              }}
            >
              {/* Metadata content */}
              <div className="absolute inset-x-0 bottom-0 bg-[#1A1A1A]/95 backdrop-blur-sm p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-20">
                <h3 className="text-xl font-semibold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full hover:bg-purple-500/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Project Links */}
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-400">
                  <a 
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Live Demo
                  </a>
                  <a 
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2 hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="aspect-video p-2">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    onLoad={handleImageLoad}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;