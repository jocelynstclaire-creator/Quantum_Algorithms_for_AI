import { useEffect, useState } from "react";

function BookList({ query }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(null); // merged books + articles
  const [filter, setFilter] = useState("all"); // "all" | "book" | "article"

  useEffect(() => {
    if (!query) return; // don’t fetch on empty query

    async function fetchData() {
      try {
        setError(null);
        setLoading(true);

        // BOOKS: Open Library
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const docs = data.docs || [];

        // Map to book items
        const books = docs.map((doc, index) => ({
          id: `book-${doc.key}-${index}`,
          type: "book",
          title: doc.title,
          authors: doc.author_name?.join(", "),
          year: doc.first_publish_year,
        }));

        // Synthetic "articles" (placeholder for real article API later)
        const articles = docs.slice(0, 5).map((doc, index) => ({
          id: `article-${doc.key}-${index}`,
          type: "article",
          title: `${doc.title} (Research Article)`,
          authors: doc.author_name?.join(", "),
          year: doc.first_publish_year,
        }));

        const merged = [...books, ...articles].sort((a, b) => {
          if (!a.year && !b.year) return 0;
          if (!a.year) return 1;
          if (!b.year) return -1;
          return b.year - a.year;
        });

        setItems(merged);
      } catch (err) {
        setError(err.message || "Something went wrong.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);

  if (!query) return null;

  if (loading) {
    return <p>Consulting the quantum field for relevant books and articles…</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        Oops - we're experiencing some noise! {error}
      </p>
    );
  }

  if (!items) return null;

  const visibleItems =
    filter === "all"
      ? items
      : items.filter((item) => item.type === filter);

  if (visibleItems.length === 0) {
    return (
      <p>
        No results collapsed into “{query}” for this filter. Try another
        quantum topic or change the filter.
      </p>
    );
  }

  return (
    <div>
      {/* Filter buttons */}
      <div
        className="quantum-search-card"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "0.75rem",
        }}
      >
        <button
          type="button"
          onClick={() => setFilter("all")}
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0.25rem 0.6rem",
            borderRadius: "999px",
            border:
              filter === "all"
                ? "1px solid #e5e7eb"
                : "1px solid rgba(148, 163, 184, 0.6)",
            background:
              filter === "all"
                ? "rgba(148, 163, 184, 0.2)"
                : "transparent",
            color: "#e5e7eb",
            cursor: "pointer",
          }}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setFilter("book")}
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0.25rem 0.6rem",
            borderRadius: "999px",
            border:
              filter === "book"
                ? "1px solid #facc15"
                : "1px solid rgba(250, 204, 21, 0.7)",   // gold
            background:
              filter === "book"
                ? "rgba(250, 204, 21, 0.2)"
                : "transparent",
            color: "#facc15",
            cursor: "pointer",
          }}
        >
          Books
        </button>

        <button
          type="button"
          onClick={() => setFilter("article")}
          style={{
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "0.25rem 0.6rem",
            borderRadius: "999px",
            border:
              filter === "article"
                ? "1px solid #da70d6"
                : "1px solid rgba(218, 112, 214, 0.7)",
            background:
              filter === "article"
                ? "rgba(218, 112, 214, 0.2)"
                : "transparent",
            color: "#da70d6",
            cursor: "pointer",
          }}
        >
          Articles
        </button>
      </div>

      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {visibleItems.map((item, index) => (
          <li
            key={item.id}
            style={{
              padding: "0.75rem 0",
              borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
              display: "flex",
              justifyContent: "center", // center the whole row
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              {/* emerald index column */}
              <span
                style={{
                  color: "#22c55e",
                  fontWeight: 600,
                  minWidth: "2ch",
                  textAlign: "right",
                }}
              >
                {index + 1}.
              </span>

              {/* text + tag column */}
              <div style={{ textAlign: "center" }}>
                <div>
                  <strong>{item.title}</strong>{" "}
                  <span style={{ fontSize: "0.85rem", color: "#cbd5f5" }}>
                    {item.authors && <span>{item.authors}</span>}
                    {item.authors && item.year && <span> · </span>}
                    {item.year && <span>{item.year}</span>}
                  </span>
                </div>

                {/* Type tag */}
                <div
                  style={{
                    marginTop: "0.35rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {item.type === "book" && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "0.18rem 0.6rem",
                        borderRadius: "999px",
                        border: "1px solid #facc15",           // gold
                        color: "#facc15",
                        background: "rgba(250, 204, 21, 0.08)", // gold tint
                      }}
                    >
                      BOOK
                    </span>
                  )}

                  {item.type === "article" && (
                    <span
                      style={{
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        padding: "0.18rem 0.6rem",
                        borderRadius: "999px",
                        border: "1px solid #da70d6", // orchid
                        color: "#da70d6",
                        background: "rgba(218, 112, 214, 0.08)",
                      }}
                    >
                      ARTICLE
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ==========================================================================
// MAIN COMPONENT INTERFACE (WITH RESPONSIVE INLINE BOUNDARIES)
// ==========================================================================
function App() {
  const [liveQuery, setLiveQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("quantum algorithms");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedQuery(liveQuery);
  }

  // Quick check to scale padding down on small phone touchscreens dynamically
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        padding: "2rem 1rem",
        boxSizing: "border-box", // Prevents parent from leaking edges
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          boxSizing: "border-box", // CRITICAL FIX: Forces padding to remain inside width constraints
          backgroundImage:
            "linear-gradient(rgba(10, 14, 35, 0.9), rgba(10, 14, 35, 0.9)), conic-gradient(from 180deg at 50% 50%, #22c55e, #06b6d4, #a855f7, #f8fafc, #22c55e)",
          backgroundColor: "rgba(10, 14, 35, 0.9)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          border: "2px solid transparent",
          borderRadius: "0.75rem",
          padding: isMobile ? "1.25rem 1rem" : "1.5rem 2rem", // RESPONSIVE FIX: Reduces side squeeze on mobile screens
          boxShadow:
            "0 6px 20px rgba(0, 0, 0, 0.35), 0 0 30px rgba(250, 204, 21, 0.35)",
          margin: "0 auto",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "480px",
            padding: "6px",
            backgroundColor: "#dedddd",
            borderRadius: "999px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            margin: "0 auto 1.5rem auto",
            boxSizing: "border-box", // CRITICAL FIX: Keeps the white input pill balanced symmetrically
          }}
        >
          <input
            id="book-search"
            type="text"
            value={liveQuery}
            onChange={(e) => setLiveQuery(e.target.value)}
            placeholder="Search quantum books & articles"
            style={{
              flexGrow: 1,
              minWidth: 0, // RESPONSIVE FIX: Allows input text to shrink on mobile instead of forcing the button out
              border: "none",
              background: "transparent",
              padding: "0 1rem",
              fontFamily: "inherit",
              fontSize: "1rem",
              color: "#3b3155",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 20px",
              backgroundColor: "#ffffff",
              color: "#22c55e",
              fontFamily: "inherit",
              fontWeight: 600,
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: "none",
              borderRadius: "999px",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              flexShrink: 0, // Prevents the button text from compressing into multiple lines
            }}
          >
            Search
          </button>
        </form>

        <div
          style={{
            marginTop: "1rem",
            width: "100%",
            maxHeight: "365px",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <BookList query={submittedQuery} />
        </div>
      </div>
    </div>
  );
}

export default App;