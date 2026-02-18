import { useEffect } from "react";
import { useBlogStore } from "../stores/blogStore";

const BlogList = () => {
  const { posts, fetchAll, loading } = useBlogStore();

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h1>Alla bloggar</h1>

      {loading && <p>Laddar...</p>}

      {posts.map(p => (
        <article key={p._id}>
          <h2>{p.title}</h2>
          <p>{p.content}</p>
          <small>Av {p.author.username}</small>
        </article>
      ))}
    </div>
  );
};

export default BlogList;