import { useAuth } from '../context/AuthContext';

import { useEffect, useState } from "react";
import { useBlogStore } from "../stores/blogStore";

const MyBlog = () => {
  const { posts, fetchMine, createPost, deletePost, loading } = useBlogStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {user} = useAuth();

  useEffect(() => {
    fetchMine();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <h1>Hej och välkommen {user ? user.username : ""}</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Innehåll"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Skapa</button>
      </form>

      {loading && <p>Laddar...</p>}

      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
            <br />
            <button onClick={() => deletePost(post._id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBlog;