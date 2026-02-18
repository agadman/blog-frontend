import { useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useBlogStore } from "../stores/blogStore";
import "./BlogPostPage.css";

const BlogPostPage = () => {
  const { id } = useParams();
  const { selectedPost, fetchById, clearSelected, loading } = useBlogStore();

  useEffect(() => {
    if (id) fetchById(id);
    return () => clearSelected();
  }, [id]);

  if (loading || !selectedPost) return <p className="loading">Laddar...</p>;

  return (
    <section className="post-wrapper">
      <NavLink to="/blogg" className="back-link">← Tillbaka</NavLink>

      <article className="single-post">
        <h1>{selectedPost.title}</h1>

        <div className="meta">
          <span>Av {selectedPost.author.username}</span>
          <span>
            {new Date(selectedPost.createdAt).toLocaleDateString("sv-SE")}
          </span>
        </div>

        <div className="content">
          {selectedPost.content}
        </div>
      </article>
    </section>
  );
};

export default BlogPostPage;