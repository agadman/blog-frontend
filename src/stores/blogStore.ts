import { create } from "zustand";

// Hämtar API URL från miljövariabler
const API_URL = import.meta.env.VITE_API_URL;

// Typdefinition för ett blogginlägg
export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

// Typdefinition för Zustand store
interface BlogState {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  loading: boolean;
  error: string | null;

  fetchAll: () => Promise<void>;
  fetchMine: () => Promise<void>;
  fetchById: (id: string) => Promise<void>;
  clearSelected: () => void;
  createPost: (title: string, content: string) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  updatePost: (id: string, title: string, content: string) => Promise<void>;
}

// Skapar global Zustand store för blogginläggshantering
export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,

  // Hämtar alla blogginlägg (publik)
  fetchAll: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${API_URL}/blogposts`);
      const data = await res.json();
      set({ posts: data, error: null });
    } catch {
      set({ error: "Kunde inte hämta bloggar" });
    } finally {
      set({ loading: false });
    }
  },

  // Hämtar inloggad användares egna blogginlägg (kräver autentisering)
  fetchMine: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`${API_URL}/blogposts/mine`, {
        credentials: "include"
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        set({ posts: data, error: null });
      } else {
        set({ posts: [], error: data.error || null });
      }
    } catch (err) {
      console.error(err);
      set({ posts: [], error: "Kunde inte hämta dina bloggar" });
    } finally {
      set({ loading: false }); 
    }
  },

  // Hämtar ett specifikt blogginlägg baserat på ID
  fetchById: async (id) => {
    set({ loading: true });
    try {
      const res = await fetch(`${API_URL}/blogposts/${id}`);
      const data = await res.json();
      set({ selectedPost: data, error: null });
    } catch {
      set({ error: "Kunde inte hämta inlägget" });
    } finally {
      set({ loading: false });
    }
  },

  // Rensar det valda blogginlägget (t.ex när man lämnar sidan)
  clearSelected: () => set({ selectedPost: null }),

  // Skapar ett nytt blogginlägg (kräver autentisering)
  createPost: async (title, content) => {
    await fetch(`${API_URL}/blogposts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, content })
    });

    await get().fetchMine();
  },

  // Tar bort ett blogginlägg baserat på ID (kräver autentisering)
  deletePost: async (id) => {
    await fetch(`${API_URL}/blogposts/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    set({ posts: get().posts.filter(p => p._id !== id) });
  },

  // Uppdaterar ett blogginlägg baserat på ID (kräver autentisering)
  updatePost: async (id, title, content) => {
  await fetch(`${API_URL}/blogposts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title, content })
  });

  await get().fetchById(id);
}
}));