import { useEffect } from "react";
import { useBlogStore } from "../stores/blogStore";
import { NavLink } from "react-router-dom";
import "./BlogList.css";

// Sida som visar alla publika blogginlägg
// Hämtar blogposts från store vid mount via useEffect
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
          <NavLink
            to={`/blogg/${p._id}`}
            key={p._id}
            className="blog-link"
          >
            <article className="blog-card">
              <h2>{p.title}</h2>
              <p className="excerpt">
                {p.content.length > 120
                  ? p.content.slice(0, 120) + "…"
                  : p.content}
              </p>

              <div className="meta">
                <span>Av {p.author.username}</span>
                <span>
                  {new Date(p.createdAt).toLocaleDateString("sv-SE")}
                </span>
              </div>
            </article>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default BlogList;