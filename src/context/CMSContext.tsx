import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  type CMSData,
  type Page,
  type GalleryImage,
  type Highlight,
  type SiteSettings,
  type VisitInfo,
  type AdminUser,
  defaultSiteSettings,
  defaultVisitInfo,
  defaultPages,
  defaultHighlights,
  defaultGallery,
} from '@/types/cms';

interface CMSContextType {
  data: CMSData;
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  // Page actions
  addPage: (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePage: (id: string, updates: Partial<Page>) => void;
  deletePage: (id: string) => void;
  // Gallery actions
  addGalleryImage: (image: Omit<GalleryImage, 'id' | 'uploadedAt'>) => void;
  updateGalleryImage: (id: string, updates: Partial<GalleryImage>) => void;
  deleteGalleryImage: (id: string) => void;
  reorderGallery: (images: GalleryImage[]) => void;
  // Highlight actions
  updateHighlight: (id: string, updates: Partial<Highlight>) => void;
  reorderHighlights: (highlights: Highlight[]) => void;
  // Site settings actions
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  // Visit info actions
  updateVisitInfo: (info: Partial<VisitInfo>) => void;
  // Auth actions
  login: (username: string, password: string) => boolean;
  logout: () => void;
  // User actions
  addUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  deleteUser: (id: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY = 'cantilan-cms-data';
const AUTH_KEY = 'cantilan-auth';

// Default admin credentials (in production, this should be hashed)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'cantilan2026',
  email: 'admin@cantilan.gov.ph',
};

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CMSData>({
    pages: defaultPages,
    gallery: defaultGallery,
    highlights: defaultHighlights,
    siteSettings: defaultSiteSettings,
    visitInfo: defaultVisitInfo,
    users: [
      {
        id: '1',
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
    ],
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setData((prev) => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to parse CMS data:', e);
      }
    }

    const authData = localStorage.getItem(AUTH_KEY);
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.isAuthenticated && parsed.user) {
          setIsAuthenticated(true);
          setCurrentUser(parsed.user);
        }
      } catch (e) {
        console.error('Failed to parse auth data:', e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Save auth state
  useEffect(() => {
    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({ isAuthenticated, user: currentUser })
    );
  }, [isAuthenticated, currentUser]);

  // Page actions
  const addPage = (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      pages: [...prev.pages, newPage],
    }));
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.map((page) =>
        page.id === id
          ? { ...page, ...updates, updatedAt: new Date().toISOString() }
          : page
      ),
    }));
  };

  const deletePage = (id: string) => {
    setData((prev) => ({
      ...prev,
      pages: prev.pages.filter((page) => page.id !== id),
    }));
  };

  // Gallery actions
  const addGalleryImage = (image: Omit<GalleryImage, 'id' | 'uploadedAt'>) => {
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newImage],
    }));
  };

  const updateGalleryImage = (id: string, updates: Partial<GalleryImage>) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((img) =>
        img.id === id ? { ...img, ...updates } : img
      ),
    }));
  };

  const deleteGalleryImage = (id: string) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img.id !== id),
    }));
  };

  const reorderGallery = (images: GalleryImage[]) => {
    setData((prev) => ({
      ...prev,
      gallery: images,
    }));
  };

  // Highlight actions
  const updateHighlight = (id: string, updates: Partial<Highlight>) => {
    setData((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h) =>
        h.id === id ? { ...h, ...updates } : h
      ),
    }));
  };

  const reorderHighlights = (highlights: Highlight[]) => {
    setData((prev) => ({
      ...prev,
      highlights,
    }));
  };

  // Site settings actions
  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setData((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...settings },
    }));
  };

  // Visit info actions
  const updateVisitInfo = (info: Partial<VisitInfo>) => {
    setData((prev) => ({
      ...prev,
      visitInfo: { ...prev.visitInfo, ...info },
    }));
  };

  // Auth actions
  const login = (username: string, password: string): boolean => {
    if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
      const user = data.users.find((u) => u.username === username);
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        // Update last login
        setData((prev) => ({
          ...prev,
          users: prev.users.map((u) =>
            u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u
          ),
        }));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  // User actions
  const addUser = (user: Omit<AdminUser, 'id' | 'createdAt'>) => {
    const newUser: AdminUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
    }));
  };

  const deleteUser = (id: string) => {
    setData((prev) => ({
      ...prev,
      users: prev.users.filter((u) => u.id !== id),
    }));
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        isAuthenticated,
        currentUser,
        addPage,
        updatePage,
        deletePage,
        addGalleryImage,
        updateGalleryImage,
        deleteGalleryImage,
        reorderGallery,
        updateHighlight,
        reorderHighlights,
        updateSiteSettings,
        updateVisitInfo,
        login,
        logout,
        addUser,
        deleteUser,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
