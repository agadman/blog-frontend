import { useEffect } from "react";
import { useBlogStore } from "../stores/blogStore";
import { NavLink } from "react-router-dom";
import "./HomePage.css";

// startside som visar de senaste blogginläggen och en välkomsttext
const HomePage = () => {
  const { posts, fetchAll, loading } = useBlogStore();

  useEffect(() => {
    fetchAll();
  }, []);

  // Sorterar inläggen efter senaste först och visar de senaste 3
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <section className="home-page">
      <h1 className="welcome-title">Välkommen till BloggHub</h1>
      <p className="intro">
        Här hittar du blogginlägg från våra användare. Klicka på ett inlägg för att läsa mer!
      </p>

      <h2 className="section-title">Senaste blogginläggen</h2>

      {loading && <p className="loading">Laddar...</p>}

      <div className="latest-grid">
        {latestPosts.map(post => (
          <NavLink to={`/blogg/${post._id}`} key={post._id} className="latest-card">
            <h3>{post.title}</h3>
            <p className="excerpt">{post.content.substring(0, 100)}...</p>
            <small>Av {post.author.username}</small>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default HomePage;