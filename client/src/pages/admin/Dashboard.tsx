import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '@/constant';

const TABS = ["Experience", "Projects"];

export default function AdminDashboard() {
  const [tab, setTab] = useState<'Experience' | 'Projects'>('Experience');

  // Experience state
  const [experiences, setExperiences] = useState<any[]>([]);
  const [expLoading, setExpLoading] = useState(true);
  const [expError, setExpError] = useState('');
  const [expForm, setExpForm] = useState({
    organization: '',
    logo: '',
    website: '',
    roles: [
      { role: '', description: '', startDate: '', endDate: '', website: '' }
    ],
    tags: [] as string[],
  });
  const [expEditingId, setExpEditingId] = useState<string | null>(null);
  const [expTagInput, setExpTagInput] = useState('');
  const [expExpandedTags, setExpExpandedTags] = useState<string[]>([]);

  // Project state
  const [projects, setProjects] = useState<any[]>([]);
  const [projLoading, setProjLoading] = useState(true);
  const [projError, setProjError] = useState('');
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    image: '',
    tags: [] as string[],
    sourceUrl: '',
    liveUrl: '',
  });
  const [projEditingId, setProjEditingId] = useState<string | null>(null);
  const [projTagInput, setProjTagInput] = useState('');
  const [projExpandedTags, setProjExpandedTags] = useState<string[]>([]);
  const [projImageFile, setProjImageFile] = useState<File | null>(null);
  const [projImagePreview, setProjImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

  // Check if logged in
  useEffect(() => {
    const adminPassword = sessionStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Fetch all experiences
  useEffect(() => {
    if (tab !== 'Experience') return;
    setExpLoading(true);
    fetch(`${API_URL}/experience`)
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        setExpLoading(false);
      })
      .catch(() => {
        setExpError('Failed to fetch experiences');
        setExpLoading(false);
      });
  }, [tab]);

  // Fetch all projects
  useEffect(() => {
    if (tab !== 'Projects') return;
    setProjLoading(true);
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setProjLoading(false);
      })
      .catch(() => {
        setProjError('Failed to fetch projects');
        setProjLoading(false);
      });
  }, [tab]);

  // Experience form handlers
  const handleExpFormChange = (e: React.ChangeEvent<HTMLInputElement>, idx?: number) => {
    const { name, value } = e.target;
    if (typeof idx === 'number') {
      const newRoles = [...expForm.roles];
      (newRoles[idx] as { [key: string]: string })[name] = value;
      setExpForm({ ...expForm, roles: newRoles });
    } else {
      setExpForm({ ...expForm, [name]: value });
    }
  };
  const addExpRole = () => {
    setExpForm({ ...expForm, roles: [...expForm.roles, { role: '', description: '', startDate: '', endDate: '', website: '' }] });
  };
  const removeExpRole = (idx: number) => {
    setExpForm({ ...expForm, roles: expForm.roles.filter((_, i) => i !== idx) });
  };
  const handleExpAddTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (("key" in e && e.key === 'Enter') || ("type" in e && e.type === 'click')) {
      e.preventDefault();
      const tag = expTagInput.trim();
      if (tag && !expForm.tags.includes(tag)) {
        setExpForm({ ...expForm, tags: [...expForm.tags, tag] });
      }
      setExpTagInput('');
    }
  };
  const handleExpRemoveTag = (tag: string) => {
    setExpForm({ ...expForm, tags: expForm.tags.filter(t => t !== tag) });
  };
  const handleExpSubmit = async (e: any) => {
    e.preventDefault();
    setExpError('');
    const adminPassword = sessionStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
      return;
    }
    try {
      const method = expEditingId ? 'PUT' : 'POST';
      const url = expEditingId ? `${API_URL}/experience/${expEditingId}` : `${API_URL}/experience`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
        body: JSON.stringify(expForm),
      });
      if (!res.ok) throw new Error('Failed to save experience');
      window.location.reload();
    } catch (err: any) {
      setExpError(err.message);
    }
  };
  const handleExpEdit = (exp: any) => {
    setExpEditingId(exp._id);
    setExpForm({
      organization: exp.organization,
      logo: exp.logo,
      website: exp.website || '',
      roles: exp.roles.map((r: any) => ({
        role: r.role,
        description: r.description,
        startDate: r.startDate,
        endDate: r.endDate,
        website: r.website || ''
      })),
      tags: exp.tags || [],
    });
  };
  const handleExpDelete = async (id: string) => {
    const adminPassword = sessionStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
      return;
    }
    if (!window.confirm('Delete this experience?')) return;
    try {
      await fetch(`${API_URL}/experience/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword,
        },
      });
      window.location.reload();
    } catch {
      setExpError('Failed to delete');
    }
  };

  // Project form handlers
  const handleProjFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjForm({ ...projForm, [name]: value });
  };
  const handleProjAddTag = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (("key" in e && e.key === 'Enter') || ("type" in e && e.type === 'click')) {
      e.preventDefault();
      const tag = projTagInput.trim();
      if (tag && !projForm.tags.includes(tag)) {
        setProjForm({ ...projForm, tags: [...projForm.tags, tag] });
      }
      setProjTagInput('');
    }
  };
  const handleProjRemoveTag = (tag: string) => {
    setProjForm({ ...projForm, tags: projForm.tags.filter(t => t !== tag) });
  };
  const handleProjImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProjImageFile(file);
    setProjImagePreview(URL.createObjectURL(file));
  };
  const handleProjSubmit = async (e: any) => {
    e.preventDefault();
    setProjError('');
    const adminPassword = sessionStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
      return;
    }
    try {
      let res;
      const formData = new FormData();
      formData.append('title', projForm.title);
      formData.append('description', projForm.description);
      projForm.tags.forEach(tag => formData.append('tags', tag));
      formData.append('sourceUrl', projForm.sourceUrl);
      formData.append('liveUrl', projForm.liveUrl);
      if (projImageFile) {
        formData.append('image', projImageFile);
      } else if (projForm.image) {
        formData.append('image', projForm.image);
      }
      res = await fetch(projEditingId ? `${API_URL}/projects/${projEditingId}` : `${API_URL}/projects`, {
        method: projEditingId ? 'PUT' : 'POST',
        headers: { 'x-admin-password': adminPassword },
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to save project');
      window.location.reload();
    } catch (err: any) {
      setProjError(err.message);
    }
  };
  const handleProjEdit = (proj: any) => {
    setProjEditingId(proj._id);
    setProjForm({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      tags: proj.tags || [],
      sourceUrl: proj.sourceUrl || '',
      liveUrl: proj.liveUrl || '',
    });
  };
  const handleProjDelete = async (id: string) => {
    const adminPassword = sessionStorage.getItem('adminPassword');
    if (!adminPassword) {
      navigate('/admin/login');
      return;
    }
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': adminPassword,
        },
      });
      window.location.reload();
    } catch {
      setProjError('Failed to delete');
    }
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminPassword');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 outfit-font">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold">Logout</button>
      </div>
      {/* Tab Switcher */}
      <div className="flex gap-4 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded font-semibold transition-all ${tab === t ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-white/60 hover:bg-gray-600'}`}
            onClick={() => setTab(t as 'Experience' | 'Projects')}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Experience Tab */}
      {tab === 'Experience' && (
        <>
          {expError && <div className="text-red-500 mb-4">{expError}</div>}
          <form onSubmit={handleExpSubmit} className="bg-gray-800 p-6 rounded mb-8">
            <h3 className="text-xl font-semibold mb-4">{expEditingId ? 'Edit' : 'Add'} Experience</h3>
            <input name="organization" value={expForm.organization} onChange={handleExpFormChange} placeholder="Organization" className="w-full p-2 mb-2 rounded bg-gray-700" required />
            <input name="logo" value={expForm.logo} onChange={handleExpFormChange} placeholder="Logo URL" className="w-full p-2 mb-2 rounded bg-gray-700" required />
            <input name="website" value={expForm.website} onChange={handleExpFormChange} placeholder="Organization Website (optional)" className="w-full p-2 mb-2 rounded bg-gray-700" />
            {/* Tags input */}
            <div className="mb-2">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {expForm.tags.map(tag => (
                  <span key={tag} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => handleExpRemoveTag(tag)} className="ml-1 text-white hover:text-red-300">&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={expTagInput}
                  onChange={e => setExpTagInput(e.target.value)}
                  onKeyDown={handleExpAddTag}
                  placeholder="Add tag and press Enter"
                  className="w-full p-1 rounded bg-gray-700"
                />
                <button type="button" onClick={handleExpAddTag} className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs text-white">Add</button>
              </div>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold mb-2">Roles</h4>
              {expForm.roles.map((role, idx) => (
                <div key={idx} className="mb-2 p-2 bg-gray-700 rounded">
                  <input name="role" value={role.role} onChange={e => handleExpFormChange(e, idx)} placeholder="Role" className="w-full p-1 mb-1 rounded bg-gray-800" required />
                  <input name="description" value={role.description} onChange={e => handleExpFormChange(e, idx)} placeholder="Description" className="w-full p-1 mb-1 rounded bg-gray-800" required />
                  <input name="startDate" value={role.startDate} onChange={e => handleExpFormChange(e, idx)} placeholder="Start Date" className="w-full p-1 mb-1 rounded bg-gray-800" required />
                  <input name="endDate" value={role.endDate} onChange={e => handleExpFormChange(e, idx)} placeholder="End Date" className="w-full p-1 mb-1 rounded bg-gray-800" required />
                  <input name="website" value={role.website} onChange={e => handleExpFormChange(e, idx)} placeholder="Role Website (optional)" className="w-full p-1 mb-1 rounded bg-gray-800" />
                  {expForm.roles.length > 1 && <button type="button" onClick={() => removeExpRole(idx)} className="text-red-400 text-xs">Remove Role</button>}
                </div>
              ))}
              <button type="button" onClick={addExpRole} className="bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs mt-2">Add Role</button>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold mt-2">{expEditingId ? 'Update' : 'Add'} Experience</button>
            {expEditingId && <button type="button" onClick={() => { setExpEditingId(null); setExpForm({ organization: '', logo: '', website: '', roles: [{ role: '', description: '', startDate: '', endDate: '', website: '' }], tags: [] }); }} className="ml-4 text-yellow-400">Cancel Edit</button>}
          </form>
          <h3 className="text-xl font-semibold mb-4">All Experiences</h3>
          {expLoading ? <div>Loading...</div> : (
            <div className="space-y-4">
              {experiences.map(exp => {
                const showTags = exp.tags && exp.tags.length > 0;
                const isExpanded = expExpandedTags.includes(exp._id);
                const visibleTags = showTags ? (isExpanded ? exp.tags : exp.tags.slice(0, 4)) : [];
                return (
                  <div key={exp._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                    <div>
                      <div className="font-bold">{exp.organization}</div>
                      <div className="text-sm text-gray-400">{exp.roles.map((r: any) => r.role).join(', ')}</div>
                      {/* Tags display */}
                      {showTags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {visibleTags.map((tag: string, i: number) => (
                            <span key={i} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">{tag}</span>
                          ))}
                          {exp.tags.length > 4 && !isExpanded && (
                            <button
                              type="button"
                              className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                              onClick={() => setExpExpandedTags([...expExpandedTags, exp._id])}
                            >
                              +{exp.tags.length - 4}
                            </button>
                          )}
                          {exp.tags.length > 4 && isExpanded && (
                            <button
                              type="button"
                              className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                              onClick={() => setExpExpandedTags(expExpandedTags.filter(id => id !== exp._id))}
                            >
                              Show less
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <button onClick={() => handleExpEdit(exp)} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2">Edit</button>
                      <button onClick={() => handleExpDelete(exp._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {/* Projects Tab */}
      {tab === 'Projects' && (
        <>
          {projError && <div className="text-red-500 mb-4">{projError}</div>}
          <form onSubmit={handleProjSubmit} className="bg-gray-800 p-6 rounded mb-8">
            <h3 className="text-xl font-semibold mb-4">{projEditingId ? 'Edit' : 'Add'} Project</h3>
            <input name="title" value={projForm.title} onChange={handleProjFormChange} placeholder="Title" className="w-full p-2 mb-2 rounded bg-gray-700" required />
            {/* Image upload */}
            <div className="mb-2">
              <label className="block mb-1 font-semibold">Project Image</label>
              <input type="file" accept="image/*" onChange={handleProjImageChange} className="mb-2" />
              {projImagePreview ? (
                <img src={projImagePreview} alt="Project preview" className="w-32 h-20 object-cover rounded mb-2" />
              ) : projForm.image && (
                <img src={projForm.image} alt="Project preview" className="w-32 h-20 object-cover rounded mb-2" />
              )}
            </div>
            <textarea name="description" value={projForm.description} onChange={handleProjFormChange} placeholder="Description" className="w-full p-2 mb-2 rounded bg-gray-700" required />
            <input name="sourceUrl" value={projForm.sourceUrl} onChange={handleProjFormChange} placeholder="Source Link (optional)" className="w-full p-2 mb-2 rounded bg-gray-700" />
            <input name="liveUrl" value={projForm.liveUrl} onChange={handleProjFormChange} placeholder="Live Demo (optional)" className="w-full p-2 mb-2 rounded bg-gray-700" />
            {/* Tags input */}
            <div className="mb-2">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {projForm.tags.map(tag => (
                  <span key={tag} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => handleProjRemoveTag(tag)} className="ml-1 text-white hover:text-red-300">&times;</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={projTagInput}
                  onChange={e => setProjTagInput(e.target.value)}
                  onKeyDown={handleProjAddTag}
                  placeholder="Add tag and press Enter"
                  className="w-full p-1 rounded bg-gray-700"
                />
                <button type="button" onClick={handleProjAddTag} className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs text-white">Add</button>
              </div>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold mt-2">{projEditingId ? 'Update' : 'Add'} Project</button>
            {projEditingId && <button type="button" onClick={() => { setProjEditingId(null); setProjForm({ title: '', description: '', image: '', tags: [], sourceUrl: '', liveUrl: '' }); setProjImageFile(null); setProjImagePreview(null); }} className="ml-4 text-yellow-400">Cancel Edit</button>}
          </form>
          <h3 className="text-xl font-semibold mb-4">All Projects</h3>
          {projLoading ? <div>Loading...</div> : (
            <div className="space-y-4">
              {projects.map(proj => {
                const showTags = proj.tags && proj.tags.length > 0;
                const isExpanded = projExpandedTags.includes(proj._id);
                const visibleTags = showTags ? (isExpanded ? proj.tags : proj.tags.slice(0, 4)) : [];
                return (
                  <div key={proj._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                    <div>
                      <div className="font-bold">{proj.title}</div>
                      <div className="text-sm text-gray-400 mb-2">{proj.description}</div>
                      <div className="text-sm text-gray-400 mb-2">{proj.image}</div>
                      {/* Tags display */}
                      {showTags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {visibleTags.map((tag: string, i: number) => (
                            <span key={i} className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">{tag}</span>
                          ))}
                          {proj.tags.length > 4 && !isExpanded && (
                            <button
                              type="button"
                              className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                              onClick={() => setProjExpandedTags([...projExpandedTags, proj._id])}
                            >
                              +{proj.tags.length - 4}
                            </button>
                          )}
                          {proj.tags.length > 4 && isExpanded && (
                            <button
                              type="button"
                              className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                              onClick={() => setProjExpandedTags(projExpandedTags.filter(id => id !== proj._id))}
                            >
                              Show less
                            </button>
                          )}
                        </div>
                      )}
                      {/* Links */}
                      <div className="flex gap-4 mt-2">
                        {proj.sourceUrl && (
                          <a href={proj.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Source</a>
                        )}
                        {proj.liveUrl && (
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 underline">Live Demo</a>
                        )}
                      </div>
                    </div>
                    <div>
                      <button onClick={() => handleProjEdit(proj)} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2">Edit</button>
                      <button onClick={() => handleProjDelete(proj._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
} 