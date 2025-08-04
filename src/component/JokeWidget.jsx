import { useEffect, useState } from "react";
import { Laugh, RefreshCw } from "lucide-react";
import '../styles/jokewidget.css';

export default function JokeWidget() {
  const [joke, setJoke] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async (selectedCategory = category) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://official-joke-api.appspot.com/jokes/${selectedCategory}/random`
      );
    
      const data = await res.json();
      const jokeData = Array.isArray(data) ? data[0] : data;

      setJoke(`${jokeData.setup} — ${jokeData.punchline}`);
      setError(null);
    
    } catch {
      setError("Could not load joke. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="widget joke-widget">

      {/* HEADER */}
      <div className="widget-header">
        {/* WIDGET TITLE */}
        <div className="widget-title">
          <Laugh size={20} />
          <h2>Joke Time</h2>
        </div>
        {/* REFRESH BUTTON */}
        <button
          onClick={() => fetchJoke()}
          disabled={loading}
          className="refresh-btn"
          title="Get a new joke"
        >
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
        </button>
      </div>

    {/* WIDGET CONTENT */}
      <div className="joke-category">
        <label htmlFor="category-select">Category: </label>
        {/* JOKES CATEGORIES */}
        <select
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
          disabled={loading}
        >
          <option value="general">General</option>
          <option value="programming">Programming</option>
          <option value="knock-knock">Knock-Knock</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">
          <span className="spinning">🤣</span> Loading joke...
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="joke-content">{joke}</div>
      )}
    </div>
  );
}
