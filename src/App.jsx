import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Projects from './components/Projects'
import LoadingScreen from './components/LoadingScreen'
import Admin from './admin/Admin'
import { supabase } from './utils/supabase'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster, toast } from 'react-hot-toast'

// ScrollToTop component
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

// Helper functions for device detection
const getDeviceInfo = (userAgent) => {
  const device = {
    type: 'Desktop', // Default
    os: 'Unknown',
    browser: 'Unknown'
  };

  // Device type detection
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    device.type = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(userAgent)) {
    device.type = 'Mobile';
  }

  // OS detection
  if (/windows/i.test(userAgent)) {
    device.os = 'Windows';
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    device.os = 'MacOS';
  } else if (/android/i.test(userAgent)) {
    device.os = 'Android';
  } else if (/iphone|ipad|ipod/i.test(userAgent)) {
    device.os = 'iOS';
  } else if (/linux/i.test(userAgent)) {
    device.os = 'Linux';
  }

  // Browser detection
  if (/chrome/i.test(userAgent)) {
    device.browser = 'Chrome';
  } else if (/firefox/i.test(userAgent)) {
    device.browser = 'Firefox';
  } else if (/safari/i.test(userAgent)) {
    device.browser = 'Safari';
  } else if (/edge/i.test(userAgent)) {
    device.browser = 'Edge';
  } else if (/opera/i.test(userAgent)) {
    device.browser = 'Opera';
  }

  return device;
};

// Track visitor function
const trackVisitor = async () => {
  try {
    // Get IP address using a secure service
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    
    // Use secure HTTPS endpoint for location data
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await locationResponse.json();
    
    // Get device information
    const deviceInfo = getDeviceInfo(navigator.userAgent);
    
    // Store in Supabase
    const { error } = await supabase
      .from('visitors')
      .insert([{
        ip_address: ip,
        country: locationData.country_name,
        region: locationData.region,
        city: locationData.city,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        device_type: deviceInfo.type,
        operating_system: deviceInfo.os,
        browser: deviceInfo.browser,
        user_agent: navigator.userAgent,
        visited_at: new Date().toISOString()
      }]);

    if (error) {
      throw error;
    }

    // toast.success('Welcome to my portfolio!', {
    //   duration: 3000,
    //   icon: '👋'
    // });
  } catch (error) {
    toast.error('Something went wrong', {
      duration: 4000
    });
    console.error('Visitor tracking error:', error);
  }
};

const Home = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  )
}

// Admin Layout component
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Admin />
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track visitor when the app loads
    trackVisitor();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#ff4b4b',
              },
            },
          }}
        />
        <Routes>
          {/* Admin route */}
          <Route path="/admin" element={<AdminLayout />} />
          
          {/* Main website routes */}
          <Route path="/*" element={
            <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-blue-900 flex flex-col">
              {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
              {!isLoading && (
                <>
                  <ScrollToTop />
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/projects" element={<Projects />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              )}
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App