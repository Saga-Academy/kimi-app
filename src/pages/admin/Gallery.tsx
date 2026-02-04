import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  Upload,
  X,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useCMS } from '@/context/CMSContext';
import type { GalleryImage } from '@/types/cms';
import { toast } from 'sonner';

const categories = [
  { value: 'coastline', label: 'Coastline' },
  { value: 'mangroves', label: 'Mangroves' },
  { value: 'town-life', label: 'Town Life' },
  { value: 'port-boats', label: 'Port & Boats' },
  { value: 'festivals', label: 'Festivals' },
];

export default function AdminGallery() {
  const navigate = useNavigate();
  const { isAuthenticated, data, addGalleryImage, updateGalleryImage, deleteGalleryImage, reorderGallery } = useCMS();
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState<{
    caption: string;
    category: GalleryImage['category'];
    isVisible: boolean;
    url?: string;
  }>({
    caption: '',
    category: 'coastline',
    isVisible: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleEdit = (image: GalleryImage) => {
    setEditingImage({ ...image });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingImage) {
      updateGalleryImage(editingImage.id, {
        caption: editingImage.caption,
        category: editingImage.category,
        isVisible: editingImage.isVisible,
      });
      toast.success('Image updated successfully');
      setIsDialogOpen(false);
      setEditingImage(null);
    }
  };

  const handleDelete = (imageId: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(imageId);
      toast.success('Image deleted successfully');
    }
  };

  const toggleVisibility = (image: GalleryImage) => {
    updateGalleryImage(image.id, { isVisible: !image.isVisible });
    toast.success(image.isVisible ? 'Image hidden' : 'Image visible');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the uploaded file
      const url = URL.createObjectURL(file);
      setNewImage({ ...newImage, url });
    }
  };

  const handleAddImage = () => {
    if (newImage.url && newImage.caption) {
      addGalleryImage({
        url: newImage.url,
        caption: newImage.caption,
        category: newImage.category as GalleryImage['category'],
        isVisible: newImage.isVisible || true,
        order: data.gallery.length + 1,
      });
      toast.success('Image added successfully');
      setIsAddDialogOpen(false);
      setNewImage({ caption: '', category: 'coastline', isVisible: true });
    } else {
      toast.error('Please provide an image and caption');
    }
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newGallery = [...data.gallery];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newGallery.length) {
      [newGallery[index], newGallery[newIndex]] = [newGallery[newIndex], newGallery[index]];
      // Update order values
      newGallery.forEach((img, i) => {
        img.order = i + 1;
      });
      reorderGallery(newGallery);
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
                  Gallery
                </h1>
                <p className="text-sm text-[#33383f]">
                  Manage website gallery images
                </p>
              </div>
            </div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Image
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.gallery
            .sort((a, b) => a.order - b.order)
            .map((image, index) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden group"
              >
                <div className="relative h-48">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => toggleVisibility(image)}
                    >
                      {image.isVisible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {!image.isVisible && (
                    <div className="absolute top-2 left-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded">
                      Hidden
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-[#1f1f1f] truncate">
                    {image.caption}
                  </p>
                  <p className="text-sm text-[#33383f] capitalize">
                    {image.category.replace('-', ' ')}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={index === 0}
                      onClick={() => moveImage(index, 'up')}
                    >
                      <GripVertical className="w-4 h-4 rotate-90" />
                    </Button>
                    <span className="text-sm text-[#33383f]">
                      Order: {image.order}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={index === data.gallery.length - 1}
                      onClick={() => moveImage(index, 'down')}
                    >
                      <GripVertical className="w-4 h-4 -rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>Update image details below.</DialogDescription>
          </DialogHeader>

          {editingImage && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Preview</Label>
                <img
                  src={editingImage.url}
                  alt={editingImage.caption}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input
                  id="caption"
                  value={editingImage.caption}
                  onChange={(e) =>
                    setEditingImage({ ...editingImage, caption: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={editingImage.category}
                  onValueChange={(value) =>
                    setEditingImage({
                      ...editingImage,
                      category: value as GalleryImage['category'],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="visible"
                  checked={editingImage.isVisible}
                  onCheckedChange={(checked) =>
                    setEditingImage({ ...editingImage, isVisible: checked })
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

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
            <DialogDescription>Upload a new image to the gallery.</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {newImage.url ? (
                  <img
                    src={newImage.url}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="py-8">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Click to upload an image</p>
                  </div>
                )}
                <Input
                  ref={fileInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {newImage.url ? 'Change Image' : 'Select Image'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-caption">Caption</Label>
              <Input
                id="new-caption"
                value={newImage.caption}
                onChange={(e) =>
                  setNewImage({ ...newImage, caption: e.target.value })
                }
                placeholder="Enter image caption"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-category">Category</Label>
              <Select
                value={newImage.category}
                onValueChange={(value) =>
                  setNewImage({ ...newImage, category: value as GalleryImage['category'] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="new-visible"
                checked={newImage.isVisible}
                onCheckedChange={(checked) =>
                  setNewImage({ ...newImage, isVisible: checked })
                }
              />
              <Label htmlFor="new-visible">Visible</Label>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleAddImage}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
