import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, MapPin, Calendar, Hotel, Lightbulb, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCMS } from '@/context/CMSContext';
import { toast } from 'sonner';

export default function AdminVisitInfo() {
  const navigate = useNavigate();
  const { isAuthenticated, data, updateVisitInfo } = useCMS();
  const [visitInfo, setVisitInfo] = useState(data.visitInfo);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setVisitInfo(data.visitInfo);
  }, [data.visitInfo]);

  if (!isAuthenticated) return null;

  const handleSave = () => {
    updateVisitInfo(visitInfo);
    toast.success('Visit information saved successfully');
  };

  const handleChange = (field: string, value: string) => {
    setVisitInfo({ ...visitInfo, [field]: value });
  };

  const sections = [
    {
      id: 'bestTimeToVisit',
      label: 'Best Time to Visit',
      icon: Calendar,
      description: 'Information about the ideal seasons and months to visit Cantilan',
    },
    {
      id: 'howToGetThere',
      label: 'How to Get Here',
      icon: Bus,
      description: 'Transportation options and directions to Cantilan',
    },
    {
      id: 'whereToStay',
      label: 'Where to Stay',
      icon: Hotel,
      description: 'Accommodation options and recommendations',
    },
    {
      id: 'localTips',
      label: 'Local Tips',
      icon: Lightbulb,
      description: 'Helpful tips and advice for visitors',
    },
    {
      id: 'transportation',
      label: 'Transportation',
      icon: MapPin,
      description: 'Getting around Cantilan - local transport options',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="font-serif text-2xl font-bold text-[#1f1f1f]">
                  Visit Information
                </h1>
                <p className="text-sm text-[#33383f]">
                  Manage visitor information and travel guides
                </p>
              </div>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div key={section.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="w-5 h-5 text-[#0070a0]" />
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#1f1f1f]">
                      {section.label}
                    </h2>
                    <p className="text-sm text-[#33383f]">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={section.id}>Content</Label>
                  <Textarea
                    id={section.id}
                    value={visitInfo[section.id as keyof typeof visitInfo]}
                    onChange={(e) => handleChange(section.id, e.target.value)}
                    rows={4}
                    placeholder={`Enter ${section.label.toLowerCase()} information...`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview Notice */}
        <div className="mt-8 bg-[#0070a0]/10 rounded-xl p-6">
          <h3 className="font-semibold text-[#0070a0] mb-2">Preview Your Changes</h3>
          <p className="text-[#33383f] text-sm mb-4">
            Visit the public site to see how your changes appear to visitors.
          </p>
          <Button asChild variant="outline">
            <a href="/visit" target="_blank" rel="noopener noreferrer">
              Preview Visit Page
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
