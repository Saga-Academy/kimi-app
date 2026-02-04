import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image,
  Star,
  Settings,
  MapPin,
  Users,
  LogOut,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCMS } from '@/context/CMSContext';
import { toast } from 'sonner';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/pages', icon: FileText, label: 'Pages' },
  { path: '/admin/gallery', icon: Image, label: 'Gallery' },
  { path: '/admin/highlights', icon: Star, label: 'Highlights' },
  { path: '/admin/settings', icon: Settings, label: 'Site Settings' },
  { path: '/admin/visit-info', icon: MapPin, label: 'Visit Info' },
  { path: '/admin/users', icon: Users, label: 'Users' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, data, currentUser } = useCMS();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  const stats = [
    {
      label: 'Total Pages',
      value: data.pages.length,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Gallery Images',
      value: data.gallery.length,
      icon: Image,
      color: 'bg-green-500',
    },
    {
      label: 'Highlights',
      value: data.highlights.filter((h) => h.isVisible).length,
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      label: 'Admin Users',
      value: data.users.length,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  const quickActions = [
    { label: 'Manage Pages', path: '/admin/pages', description: 'Edit website content' },
    { label: 'Update Gallery', path: '/admin/gallery', description: 'Add or remove images' },
    { label: 'Site Settings', path: '/admin/settings', description: 'Configure site details' },
    { label: 'Preview Site', path: '/', description: 'View public website', external: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#004968] text-white flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="font-serif font-bold">Cantilan Connect</h1>
              <p className="text-xs text-white/60">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    (item.exact
                      ? location.pathname === item.path
                      : location.pathname.startsWith(item.path))
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">{currentUser?.username}</p>
              <p className="text-xs text-white/60 capitalize">{currentUser?.role}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#1f1f1f]">
              Dashboard
            </h1>
            <p className="text-[#33383f]">
              Welcome back, {currentUser?.username}!
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </a>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#33383f] text-sm">{stat.label}</p>
                  <p className="font-serif text-3xl font-bold text-[#1f1f1f]">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-serif text-xl font-bold text-[#1f1f1f] mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.path}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#0070a0] hover:bg-[#0070a0]/5 transition-colors group"
              >
                <div>
                  <h3 className="font-semibold text-[#1f1f1f] group-hover:text-[#0070a0]">
                    {action.label}
                  </h3>
                  <p className="text-sm text-[#33383f]">{action.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0070a0]" />
              </a>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-serif text-xl font-bold text-[#1f1f1f] mb-6">
            Content Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-[#0070a0]" />
                <span className="text-[#33383f]">Published Pages</span>
              </div>
              <span className="font-semibold text-[#1f1f1f]">
                {data.pages.filter((p) => p.isPublished).length} / {data.pages.length}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Image className="w-5 h-5 text-[#0070a0]" />
                <span className="text-[#33383f]">Visible Gallery Images</span>
              </div>
              <span className="font-semibold text-[#1f1f1f]">
                {data.gallery.filter((g) => g.isVisible).length} / {data.gallery.length}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-[#0070a0]" />
                <span className="text-[#33383f]">Active Highlights</span>
              </div>
              <span className="font-semibold text-[#1f1f1f]">
                {data.highlights.filter((h) => h.isVisible).length} / {data.highlights.length}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
