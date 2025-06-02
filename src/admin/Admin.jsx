import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visitors, setVisitors] = useState([]);
  const [project, setProject] = useState({
    title: '',
    description: '',
    technologies: '',
    github_link: '',
    live_link: '',
    image: null
  });
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchVisitors();
    }
  }, [isAuthenticated]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const fetchVisitors = async () => {
    try {
      const { data, error } = await supabase
        .from('visitors')
        .select('*')
        .order('visited_at', { ascending: false });

      if (error) throw error;
      setVisitors(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  // ... (previous handleLogin, handleProjectSubmit, and handleResumeUpload functions remain the same)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Enhanced Visitors Section */}
      <div className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Recent Visitors</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Device</th>
                <th className="px-4 py-2">OS</th>
                <th className="px-4 py-2">Browser</th>
                <th className="px-4 py-2">IP Address</th>
                <th className="px-4 py-2">Visited At</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map((visitor) => (
                <tr key={visitor.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {visitor.city}, {visitor.region}, {visitor.country}
                  </td>
                  <td className="px-4 py-2">
                    {visitor.device_type}
                  </td>
                  <td className="px-4 py-2">
                    {visitor.operating_system}
                  </td>
                  <td className="px-4 py-2">
                    {visitor.browser}
                  </td>
                  <td className="px-4 py-2">
                    {visitor.ip_address}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(visitor.visited_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rest of the component (Project Form and Resume Upload) remains the same */}
    </div>
  );
};

export default Admin;