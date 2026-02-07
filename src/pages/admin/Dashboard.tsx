import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  TrendingUp,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  Home,
  User
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface DashboardStats {
  totalServices: number;
  activeServices: number;
  totalJobs: number;
  openJobs: number;
  totalContacts: number;
  newContacts: number;
  totalApplications: number;
}

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current: boolean;
}

const Dashboard: React.FC = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats>({
    totalServices: 0,
    activeServices: 0,
    totalJobs: 0,
    openJobs: 0,
    totalContacts: 0,
    newContacts: 0,
    totalApplications: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Activity, current: location.pathname === '/admin/dashboard' },
    { name: 'About', href: '/admin/about', icon: Settings, current: location.pathname === '/admin/about' },
    { name: 'Services', href: '/admin/services', icon: Briefcase, current: location.pathname === '/admin/services' },
    { name: 'Careers', href: '/admin/careers', icon: Users, current: location.pathname === '/admin/careers' },
    { name: 'Job Applications', href: '/admin/job-applications', icon: Users, current: location.pathname === '/admin/job-applications' },
    { name: 'Contact Messages', href: '/admin/contacts', icon: MessageSquare, current: location.pathname === '/admin/contacts' },
    { name: 'Invoices', href: '/admin/invoices', icon: FileText, current: location.pathname === '/admin/invoices' },
    { name: 'Profile', href: '/admin/profile', icon: User, current: location.pathname === '/admin/profile' },
  ];

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [servicesStats, jobsStats, contactStats, careersStats] = await Promise.all([
        fetch('/api/services/stats/overview', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/jobs/stats/overview', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/contact/stats/overview', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('/api/careers/stats/overview', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const [servicesData, jobsData, contactsData, careersData] = await Promise.all([
        servicesStats.json(),
        jobsStats.json(),
        contactStats.json(),
        careersStats.json()
      ]);

      setStats({
        totalServices: servicesData.totalServices || 0,
        activeServices: servicesData.activeServices || 0,
        totalJobs: jobsData.totalJobs || 0,
        openJobs: jobsData.openJobs || 0,
        totalContacts: contactsData.totalContacts || 0,
        newContacts: contactsData.newContacts || 0,
        totalApplications: careersData.totalApplications || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const StatCard: React.FC<{ title: string; value: number; icon: React.ElementType; color: string }> = ({ 
    title, value, icon: Icon, color 
  }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-gray-600 transition-opacity ${sidebarOpen ? 'opacity-75' : 'opacity-0'}`} 
             onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">VisionAI Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">VisionAI Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              
              
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">{admin?.username}</p>
                  <p className="text-xs font-medium text-gray-500">{admin?.email}</p>
                </div>
              </div>

              
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white border-b border-gray-200">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <main className="flex-1">
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <a
              href="/"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
              title="Back to Website"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Website
            </a>
          </div>
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard
                    title="Total Services"
                    value={stats.totalServices}
                    icon={Briefcase}
                    color="text-blue-600"
                  />
                  <StatCard
                    title="Active Services"
                    value={stats.activeServices}
                    icon={TrendingUp}
                    color="text-green-600"
                  />
                  <StatCard
                    title="Open Jobs"
                    value={stats.openJobs}
                    icon={Users}
                    color="text-purple-600"
                  />
                  <StatCard
                    title="New Contacts"
                    value={stats.newContacts}
                    icon={MessageSquare}
                    color="text-orange-600"
                  />
                </div>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <StatCard
                    title="Total Jobs"
                    value={stats.totalJobs}
                    icon={Briefcase}
                    color="text-indigo-600"
                  />
                  <StatCard
                    title="Total Applications"
                    value={stats.totalApplications}
                    icon={Users}
                    color="text-pink-600"
                  />
                  <StatCard
                    title="Total Contacts"
                    value={stats.totalContacts}
                    icon={MessageSquare}
                    color="text-yellow-600"
                  />
                </div>

                <div className="mt-8">
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Quick Actions
                      </h3>
                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link
                          to="/admin/services"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Manage Services
                        </Link>
                        <Link
                          to="/admin/careers"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                        >
                          Manage Careers
                        </Link>
                        <Link
                          to="/admin/contacts"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                        >
                          View Contacts
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
