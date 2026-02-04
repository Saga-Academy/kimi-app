import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Eye,
  EyeOff,
  GripVertical,
  Save,
  X,
  Fish,
  Building2,
  Palmtree,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useCMS } from '@/context/CMSContext';
import type { Highlight } from '@/types/cms';
import { toast } from 'sonner';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fish: Fish,
  building: Building2,
  palmtree: Palmtree,
};

export default function AdminHighlights() {
  const navigate = useNavigate();
  const { isAuthenticated, data, updateHighlight, reorderHighlights } = useCMS();
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleEdit = (highlight: Highlight) => {
    setEditingHighlight({ ...highlight });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingHighlight) {
      updateHighlight(editingHighlight.id, {
        title: editingHighlight.title,
        description: editingHighlight.description,
        link: editingHighlight.link,
        isVisible: editingHighlight.isVisible,
      });
      toast.success('Highlight updated successfully');
      setIsDialogOpen(false);
      setEditingHighlight(null);
    }
  };

  const toggleVisibility = (highlight: Highlight) => {
    updateHighlight(highlight.id, { isVisible: !highlight.isVisible });
    toast.success(highlight.isVisible ? 'Highlight hidden' : 'Highlight visible');
  };

  const moveHighlight = (index: number, direction: 'up' | 'down') => {
    const newHighlights = [...data.highlights];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newHighlights.length) {
      [newHighlights[index], newHighlights[newIndex]] = [
        newHighlights[newIndex],
        newHighlights[index],
      ];
      // Update order values
      newHighlights.forEach((h, i) => {
        h.order = i + 1;
      });
      reorderHighlights(newHighlights);
    }
  };

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
                  Highlights
                </h1>
                <p className="text-sm text-[#33383f]">
                  Manage homepage highlight cards
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.highlights
            .sort((a, b) => a.order - b.order)
            .map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon] || Palmtree;
              return (
                <div
                  key={highlight.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-[#0070a0]/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-7 h-7 text-[#0070a0]" />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleVisibility(highlight)}
                          className={`p-2 rounded-lg transition-colors ${
                            highlight.isVisible
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {highlight.isVisible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(highlight)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1f1f1f] mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-[#33383f] text-sm mb-4">
                      {highlight.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-[#33383f]">
                        Order: {highlight.order}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => moveHighlight(index, 'up')}
                        >
                          <GripVertical className="w-4 h-4 rotate-90" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === data.highlights.length - 1}
                          onClick={() => moveHighlight(index, 'down')}
                        >
                          <GripVertical className="w-4 h-4 -rotate-90" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Highlight</DialogTitle>
            <DialogDescription>Update highlight details below.</DialogDescription>
          </DialogHeader>

          {editingHighlight && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingHighlight.title}
                  onChange={(e) =>
                    setEditingHighlight({
                      ...editingHighlight,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingHighlight.description}
                  onChange={(e) =>
                    setEditingHighlight({
                      ...editingHighlight,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="link"
                  value={editingHighlight.link}
                  onChange={(e) =>
                    setEditingHighlight({
                      ...editingHighlight,
                      link: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="visible"
                  checked={editingHighlight.isVisible}
                  onCheckedChange={(checked) =>
                    setEditingHighlight({
                      ...editingHighlight,
                      isVisible: checked,
                    })
                  }
                />
                <Label htmlFor="visible">Visible</Label>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
