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

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed');
      console.error(error);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (project.image) {
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(`projects/${Date.now()}-${project.image.name}`, project.image);

      if (error) {
        console.error('Image upload error:', error);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from('project-images')
        .getPublicUrl(data.path);

      imageUrl = publicUrl.publicUrl;
    }

    const { error } = await supabase.from('projects').insert([
      {
        ...project,
        image: imageUrl
      }
    ]);

    if (error) {
      console.error('Project submission error:', error);
    } else {
      alert('Project submitted!');
      setProject({
        title: '',
        description: '',
        technologies: '',
        github_link: '',
        live_link: '',
        image: null
      });
    }
  };

  const handleResumeUpload = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert('Please select a resume file');
      return;
    }

    const fileName = `resumes/${Date.now()}-${resume.name}`;
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, resume);

    if (error) {
      console.error('Resume upload error:', error);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;

    const { error: insertError } = await supabase
      .from('resume') // 👈 make sure this is the correct table name
      .upsert({ id: 1, url: publicUrl }); // 👈 assuming you store one row only

    if (insertError) {
      console.error('Failed to save resume URL:', insertError);
      return;
    }

    alert('Resume uploaded and saved successfully!');
    setResume(null);
  };

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

      {/* Visitors Table */}
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
                  <td className="px-4 py-2">{visitor.device_type}</td>
                  <td className="px-4 py-2">{visitor.operating_system}</td>
                  <td className="px-4 py-2">{visitor.browser}</td>
                  <td className="px-4 py-2">{visitor.ip_address}</td>
                  <td className="px-4 py-2">
                    {new Date(visitor.visited_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Upload Form */}
      <form onSubmit={handleProjectSubmit} className="mb-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        <input type="text" placeholder="Title" value={project.title}
          onChange={(e) => setProject({ ...project, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded" />
        <textarea placeholder="Description" value={project.description}
          onChange={(e) => setProject({ ...project, description: e.target.value })}
          className="w-full mb-4 p-2 border rounded" />
        <input type="text" placeholder="Technologies" value={project.technologies}
          onChange={(e) => setProject({ ...project, technologies: e.target.value })}
          className="w-full mb-4 p-2 border rounded" />
        <input type="text" placeholder="GitHub Link" value={project.github_link}
          onChange={(e) => setProject({ ...project, github_link: e.target.value })}
          className="w-full mb-4 p-2 border rounded" />
        <input type="text" placeholder="Live Link" value={project.live_link}
          onChange={(e) => setProject({ ...project, live_link: e.target.value })}
          className="w-full mb-4 p-2 border rounded" />
        <input type="file" onChange={(e) => setProject({ ...project, image: e.target.files[0] })}
          className="w-full mb-4" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Upload Project
        </button>
      </form>

      {/* Resume Upload */}
      <form onSubmit={handleResumeUpload} className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
        <input type="file" onChange={(e) => setResume(e.target.files[0])}
          className="w-full mb-4" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Upload Resume
        </button>
      </form>
    </div>
  );
};

export default Admin;
