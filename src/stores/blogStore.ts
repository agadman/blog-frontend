import { create } from "zustand";

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
}

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const res = await fetch("http://localhost:5001/blogposts");
      const data = await res.json();
      set({ posts: data, error: null });
    } catch {
      set({ error: "Kunde inte hämta bloggar" });
    } finally {
      set({ loading: false });
    }
  },

fetchMine: async () => {
  set({ loading: true });
  try {
    const res = await fetch("http://localhost:5001/blogposts/mine", {
      credentials: "include" 
    });
    const data = await res.json();
    set({ posts: data, error: null });
  } catch {
    set({ error: "Kunde inte hämta dina bloggar" });
  } finally {
    set({ loading: false });
  }
},

fetchById: async (id) => {
  set({ loading: true });
  try {
    const res = await fetch(`http://localhost:5001/blogposts/${id}`);
    const data = await res.json();
    set({ selectedPost: data, error: null });
  } catch {
    set({ error: "Kunde inte hämta inlägget" });
  } finally {
    set({ loading: false });
  }
},

clearSelected: () => set({ selectedPost: null }),

  createPost: async (title, content) => {
    await fetch("http://localhost:5001/blogposts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, content })
    });

    await get().fetchMine();
  },

  deletePost: async (id) => {
    await fetch(`http://localhost:5001/blogposts/${id}`, {
      method: "DELETE",
      credentials: "include"
    });

    set({ posts: get().posts.filter(p => p._id !== id) });
  }
}));