import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
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
import type { Page } from '@/types/cms';
import { toast } from 'sonner';

export default function AdminPages() {
  const navigate = useNavigate();
  const { isAuthenticated, data, updatePage, deletePage } = useCMS();
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleEdit = (page: Page) => {
    setEditingPage({ ...page });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPage) {
      updatePage(editingPage.id, {
        title: editingPage.title,
        content: editingPage.content,
        isPublished: editingPage.isPublished,
      });
      toast.success('Page updated successfully');
      setIsDialogOpen(false);
      setEditingPage(null);
    }
  };

  const handleDelete = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      deletePage(pageId);
      toast.success('Page deleted successfully');
    }
  };

  const togglePublish = (page: Page) => {
    updatePage(page.id, { isPublished: !page.isPublished });
    toast.success(page.isPublished ? 'Page unpublished' : 'Page published');
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
                  Pages
                </h1>
                <p className="text-sm text-[#33383f]">
                  Manage website content pages
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#33383f]">
                  Page
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#33383f]">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#33383f]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#33383f]">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-[#33383f]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0070a0]" />
                      <span className="font-medium text-[#1f1f1f]">
                        {page.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#33383f]">
                    {page.slug}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(page)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        page.isPublished
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {page.isPublished ? (
                        <>
                          <Eye className="w-4 h-4" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#33383f]">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(page)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(page.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>
              Make changes to the page content below.
            </DialogDescription>
          </DialogHeader>

          {editingPage && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={editingPage.slug} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={editingPage.content}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, content: e.target.value })
                  }
                  rows={6}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="published"
                    checked={editingPage.isPublished}
                    onCheckedChange={(checked) =>
                      setEditingPage({ ...editingPage, isPublished: checked })
                    }
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
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
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
