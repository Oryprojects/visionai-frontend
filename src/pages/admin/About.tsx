import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { 
  Building, 
  Users, 
  Edit2, 
  Trash2, 
  Plus,
  X,
  Mail,
  Eye
} from 'lucide-react';

interface Director {
  _id?: string;
  name: string;
  designation: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  order: number;
  isActive: boolean;
}

interface CompanyInfo {
  mission: string;
  vision: string;
  description: string;
  foundedYear?: number;
  teamSize?: string;
  headquarters?: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  mapUrl?: string;
}

interface AboutData {
  _id: string;
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  directors: Director[];
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'directors'>('company');
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);
  const [showDirectorModal, setShowDirectorModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    bio: '',
    image: '',
    linkedin: '',
    email: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/about', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAboutData(data);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCompanyInfo = async (field: keyof CompanyInfo, value: any) => {
    if (!aboutData) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/about/company-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        await fetchAboutData();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error updating company info:', error);
      alert('Update failed');
    }
  };

  const updateContactInfo = async (field: keyof ContactInfo, value: any) => {
    if (!aboutData) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/about/contact-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.ok) {
        await fetchAboutData();
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      alert('Update failed');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll create a local URL. In production, you'd upload to a server
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleDirectorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      
      if (editingDirector && editingDirector._id) {
        const response = await fetch(`/api/about/directors/${editingDirector._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await fetchAboutData();
          setShowDirectorModal(false);
          setEditingDirector(null);
          resetDirectorForm();
        } else {
          alert('Update failed');
        }
      } else {
        const response = await fetch('/api/about/directors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await fetchAboutData();
          setShowDirectorModal(false);
          resetDirectorForm();
        } else {
          alert('Create failed');
        }
      }
    } catch (error) {
      console.error('Error saving director:', error);
      alert('Operation failed');
    }
  };

  const handleEditDirector = (director: Director) => {
    setEditingDirector(director);
    setFormData({
      name: director.name,
      designation: director.designation,
      bio: director.bio,
      image: director.image,
      linkedin: director.linkedin || '',
      email: director.email || '',
      order: director.order,
      isActive: director.isActive,
    });
    setShowDirectorModal(true);
  };

  const handleDeleteDirector = async (id: string) => {
    if (!confirm('Are you sure you want to delete this director?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/about/directors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await fetchAboutData();
      } else {
        alert('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting director:', error);
      alert('Delete failed');
    }
  };

  const toggleDirectorStatus = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/about/directors/${id}/toggle-status`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await fetchAboutData();
      } else {
        alert('Status toggle failed');
      }
    } catch (error) {
      console.error('Error toggling director status:', error);
    }
  };

  const resetDirectorForm = () => {
    setFormData({
      name: '',
      designation: '',
      bio: '',
      image: '',
      linkedin: '',
      email: '',
      order: 0,
      isActive: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No about data found</p>
      </div>
    );
  }

  return (
    <AdminLayout title="About Us Management">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              Manage company information and team details
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'company', name: 'Company Info', icon: Building },
            { id: 'contact', name: 'Contact Info', icon: Mail },
            { id: 'directors', name: 'Directors', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {/* Company Info Tab */}
        {activeTab === 'company' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
                  <textarea
                    rows={3}
                    value={aboutData.companyInfo.mission}
                    onChange={(e) => updateCompanyInfo('mission', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vision</label>
                  <textarea
                    rows={3}
                    value={aboutData.companyInfo.vision}
                    onChange={(e) => updateCompanyInfo('vision', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={aboutData.companyInfo.description}
                    onChange={(e) => updateCompanyInfo('description', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                    <input
                      type="number"
                      value={aboutData.companyInfo.foundedYear || ''}
                      onChange={(e) => updateCompanyInfo('foundedYear', parseInt(e.target.value) || undefined)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
                    <input
                      type="text"
                      value={aboutData.companyInfo.teamSize || ''}
                      onChange={(e) => updateCompanyInfo('teamSize', e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Headquarters</label>
                    <input
                      type="text"
                      value={aboutData.companyInfo.headquarters || ''}
                      onChange={(e) => updateCompanyInfo('headquarters', e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={aboutData.contactInfo.email}
                    onChange={(e) => updateContactInfo('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={aboutData.contactInfo.phone}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    rows={3}
                    value={aboutData.contactInfo.address}
                    onChange={(e) => updateContactInfo('address', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Map URL</label>
                  <input
                    type="url"
                    value={aboutData.contactInfo.mapUrl || ''}
                    onChange={(e) => updateContactInfo('mapUrl', e.target.value)}
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Directors Tab */}
        {activeTab === 'directors' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Directors</h3>
              <button
                onClick={() => {
                  resetDirectorForm();
                  setEditingDirector(null);
                  setShowDirectorModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Director
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {aboutData.directors.map((director) => (
                  <div key={director._id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={director.image}
                          alt={director.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{director.name}</h4>
                          <p className="text-sm text-gray-500">{director.designation}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              director.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {director.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditDirector(director)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => toggleDirectorStatus(director._id!)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDirector(director._id!)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{director.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* Director Modal */}
      {showDirectorModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleDirectorSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingDirector ? 'Edit Director' : 'Add New Director'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowDirectorModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Designation</label>
                      <input
                        type="text"
                        required
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Optional: Brief biography of the director"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Optional: Enter image URL or upload file below"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Or Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Order</label>
                        <input
                          type="number"
                          value={formData.order}
                          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                          Active
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {editingDirector ? 'Update' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDirectorModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default About;
