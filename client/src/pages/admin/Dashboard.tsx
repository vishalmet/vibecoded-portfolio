import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    organization: '',
    logo: '',
    website: '',
    roles: [
      { role: '', description: '', startDate: '', endDate: '', website: '' }
    ]
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if logged in
  useEffect(() => {
    const adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch all experiences
  useEffect(() => {
    fetch('http://localhost:5000/api/experience')
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch experiences');
        setLoading(false);
      });
  }, []);

  // Handle form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
    const { name, value } = e.target;
    if (typeof idx === 'number') {
      const newRoles = [...form.roles];
      (newRoles[idx] as { [key: string]: string })[name] = value;
      setForm({ ...form, roles: newRoles });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add new role to form
  const addRole = () => {
    setForm({ ...form, roles: [...form.roles, { role: '', description: '', startDate: '', endDate: '', website: '' }] });
  };

  // Remove role from form
  const removeRole = (idx: number) => {
    setForm({ ...form, roles: form.roles.filter((_, i) => i !== idx) });
  };

  // Submit new or updated experience
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    const adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
      return;
    }
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/experience/${editingId}` : 'http://localhost:5000/api/experience';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save experience');
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Edit experience
  const handleEdit = (exp: any) => {
    setEditingId(exp._id);
    setForm({
      organization: exp.organization,
      logo: exp.logo,
      website: exp.website || '',
      roles: exp.roles.map((r: any) => ({
        role: r.role,
        description: r.description,
        startDate: r.startDate,
        endDate: r.endDate,
        website: r.website || ''
      }))
    });
  };

  // Delete experience
  const handleDelete = async (id: string) => {
    const adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
      return;
    }
    if (!window.confirm('Delete this experience?')) return;
    try {
      await fetch(`http://localhost:5000/api/experience/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword,
        },
      });
      window.location.reload();
    } catch {
      setError('Failed to delete');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminPassword');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 outfit-font">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold">Logout</button>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded mb-8">
        <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit' : 'Add'} Experience</h3>
        <input name="organization" value={form.organization} onChange={handleFormChange} placeholder="Organization" className="w-full p-2 mb-2 rounded bg-gray-700" required />
        <input name="logo" value={form.logo} onChange={handleFormChange} placeholder="Logo URL" className="w-full p-2 mb-2 rounded bg-gray-700" required />
        <input name="website" value={form.website} onChange={handleFormChange} placeholder="Organization Website (optional)" className="w-full p-2 mb-2 rounded bg-gray-700" />
        <div className="mb-2">
          <h4 className="font-semibold mb-2">Roles</h4>
          {form.roles.map((role, idx) => (
            <div key={idx} className="mb-2 p-2 bg-gray-700 rounded">
              <input name="role" value={role.role} onChange={e => handleFormChange(e, idx)} placeholder="Role" className="w-full p-1 mb-1 rounded bg-gray-800" required />
              <input name="description" value={role.description} onChange={e => handleFormChange(e, idx)} placeholder="Description" className="w-full p-1 mb-1 rounded bg-gray-800" required />
              <input name="startDate" value={role.startDate} onChange={e => handleFormChange(e, idx)} placeholder="Start Date" className="w-full p-1 mb-1 rounded bg-gray-800" required />
              <input name="endDate" value={role.endDate} onChange={e => handleFormChange(e, idx)} placeholder="End Date" className="w-full p-1 mb-1 rounded bg-gray-800" required />
              <input name="website" value={role.website} onChange={e => handleFormChange(e, idx)} placeholder="Role Website (optional)" className="w-full p-1 mb-1 rounded bg-gray-800" />
              {form.roles.length > 1 && <button type="button" onClick={() => removeRole(idx)} className="text-red-400 text-xs">Remove Role</button>}
            </div>
          ))}
          <button type="button" onClick={addRole} className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs mt-2">Add Role</button>
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold mt-2">{editingId ? 'Update' : 'Add'} Experience</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ organization: '', logo: '', website: '', roles: [{ role: '', description: '', startDate: '', endDate: '', website: '' }] }); }} className="ml-4 text-yellow-400">Cancel Edit</button>}
      </form>
      <h3 className="text-xl font-semibold mb-4">All Experiences</h3>
      {loading ? <div>Loading...</div> : (
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
              <div>
                <div className="font-bold">{exp.organization}</div>
                <div className="text-sm text-gray-400">{exp.roles.map((r: any) => r.role).join(', ')}</div>
              </div>
              <div>
                <button onClick={() => handleEdit(exp)} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(exp._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 