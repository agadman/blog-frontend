import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useBlogStore } from "../stores/blogStore";
import "./MyBlog.css";

const MyBlog = () => {
  const { posts, fetchMine, createPost, deletePost, loading } = useBlogStore();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    <section className="myblog-page">
      <h1 className="myblog-title">
        Hej {user?.username}
      </h1>

      <form className="new-post" onSubmit={handleSubmit}>
        <h2>Skapa nytt inlägg</h2>

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

        <button type="submit">Publicera</button>
      </form>

      {loading && <p className="loading">Laddar...</p>}

      {/* Mina inlägg */}
      <div className="myblog-grid">
        {posts.map(post => (
          <article className="myblog-card" key={post._id}>
            <h3>{post.title}</h3>
            <p className="excerpt">{post.content}</p>

            <div className="meta">
              <span>
                {new Date(post.createdAt).toLocaleDateString("sv-SE")}
              </span>

              <button
                className="delete-btn"
                onClick={() => deletePost(post._id)}
              >
                Ta bort
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MyBlog;