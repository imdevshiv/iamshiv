import profileImg from "../assets/profile.jpg";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeError, setResumeError] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data, error } = await supabase
          .from("resume")
          .select("url")
          .limit(1)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data?.url) {
          // console.log("Resume URL:", data.url); 
          setResumeUrl(data.url);
        }
      } catch (error) {
        console.error("Error fetching resume:", error.message);
        setResumeError(true);
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
            A <span className="font-bold">fullstack developer</span> who thrives
            on solving real-world problems and challenging norms. Driven by
            results over rules, I’m passionate about building impactful,
            efficient systems that blend{" "}
            <span className="font-bold">creativity</span> with{" "}
            <span className="font-bold">functionality</span>.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/imdevshiv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-purple-400 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shiv54/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-purple-400 transition-colors"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://x.com/mohanta_shiv"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-purple-400 transition-colors"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Resume Button */}
        <div className="flex flex-row gap-4 mt-4">
          {!resumeError && resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center justify-center space-x-2 min-w-[120px]"
            >
              <span>View Resume</span>
            </a>
          )}

          <a
            href="mailto:shiv404050@gmail.com"
            className="px-6 py-3 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2 min-w-[120px]"
          >
            <span>Hire Me</span>
          </a>
        </div>
      </div>
    </section>
  );
}
