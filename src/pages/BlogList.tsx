import { useEffect } from "react";
import { useBlogStore } from "../stores/blogStore";
import "./BlogList.css";

const BlogList = () => {
  const { posts, fetchAll, loading } = useBlogStore();

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <section className="blog-page">
      <h1 className="blog-title">Alla bloggar</h1>

      {loading && <p className="loading">Laddar...</p>}

      <div className="blog-grid">
        {posts.map(p => (
          <article className="blog-card" key={p._id}>
            <h2>{p.title}</h2>
            <p className="excerpt">{p.content}</p>

            <div className="meta">
              <span>Av {p.author.username}</span>
              <span>
                {new Date(p.createdAt).toLocaleDateString("sv-SE")}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogList;