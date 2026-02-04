import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CMSProvider } from '@/context/CMSContext';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Culture from '@/pages/Culture';
import Nature from '@/pages/Nature';
import Economy from '@/pages/Economy';
import Visit from '@/pages/Visit';

// Admin Pages
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminPages from '@/pages/admin/Pages';
import AdminGallery from '@/pages/admin/Gallery';
import AdminHighlights from '@/pages/admin/Highlights';
import AdminSettings from '@/pages/admin/Settings';
import AdminVisitInfo from '@/pages/admin/VisitInfo';
import AdminUsers from '@/pages/admin/Users';

function App() {
  return (
    <CMSProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/nature" element={<Nature />} />
          <Route path="/economy" element={<Economy />} />
          <Route path="/visit" element={<Visit />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/pages" element={<AdminPages />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/highlights" element={<AdminHighlights />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/visit-info" element={<AdminVisitInfo />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </Router>
      <Toaster />
    </CMSProvider>
  );
}

export default App;
