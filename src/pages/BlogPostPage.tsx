import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useBlogStore } from "../stores/blogStore";
import { useAuth } from "../context/AuthContext";
import "./BlogPostPage.css";

// Sida för att visa ett enskilt blogginlägg
// Om man är ägare av inlägget så kan man redigera eller ta bort det
const BlogPostPage = () => {
  const { id } = useParams(); // Hämtar id från URL:en
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    selectedPost,
    fetchById,
    clearSelected,
    deletePost,
    updatePost,
    loading
  } = useBlogStore();

  const [isEditing, setIsEditing] = useState(false); // redigeringsläge eller ej
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Hämtar inlägget när sidan laddas
  useEffect(() => {
    if (id) fetchById(id);
    return () => clearSelected(); // rensar inlägget vid unmount
  }, [id]);

  if (loading || !selectedPost) return <p>Laddar...</p>;

  const isOwner = user?.id === selectedPost.author._id; // kollar om inloggad är ägare av inlägget

  const handleUpdate = async () => {
    if (!id) return;
    await updatePost(id, title, content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!id) return;
    await deletePost(id);
    navigate("/blogg");
  };

  return (
    <section className="post-wrapper">
      <NavLink to="/blogg" className="back-link">← Tillbaka</NavLink>

      <article className="single-post">

        {isEditing ? (
          <>
            <input
              className="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="actions">
              <button onClick={handleUpdate}>Spara</button>
              <button onClick={() => setIsEditing(false)}>Avbryt</button>
            </div>
          </>
        ) : (
          <>
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

            {isOwner && (
              <div className="actions">
                <button
                  onClick={() => {
                    setTitle(selectedPost.title);
                    setContent(selectedPost.content);
                    setIsEditing(true);
                  }}
                >
                  Redigera
                </button>
                <button className="danger" onClick={handleDelete}>
                  Ta bort
                </button>
              </div>
            )}
          </>
        )}

      </article>
    </section>
  );
};

export default BlogPostPage;