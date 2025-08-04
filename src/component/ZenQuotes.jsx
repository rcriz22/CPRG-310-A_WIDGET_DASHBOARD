import React, { useState, useEffect } from 'react';
import { RefreshCw, Quote, Heart, Share, BookOpen } from 'lucide-react';
import '../styles/zenquotes.css';

const ZenQuotesWidget = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [liked, setLiked] = useState(false);
  const [category, setCategory] = useState('inspiration');

  // QUOTES CATEGORIES
  const categories = [
    { value: 'inspiration', label: '✨ Inspirational', icon: <BookOpen size={14} /> },
    { value: 'motivation', label: '🔥 Motivational', icon: <BookOpen size={14} /> },
    { value: 'wisdom', label: '🧠 Wisdom', icon: <BookOpen size={14} /> },
    { value: 'life', label: '🌱 Life', icon: <BookOpen size={14} /> },
    { value: 'love', label: '💖 Love', icon: <BookOpen size={14} /> },
    { value: 'success', label: '🏆 Success', icon: <BookOpen size={14} /> },
    { value: 'happiness', label: '😊 Happiness', icon: <BookOpen size={14} /> }
    
];

// API
  const ZENQUOTES_API_BASE = 'https://zenquotes.io/api';
  
// MAPPING
  const categoryKeywords = {
        inspiration: ['dream', 'believe', 'hope', 'create', 'light'],
        motivation: ['success', 'goal', 'achieve', 'ambition', 'push'],
        wisdom: ['life', 'truth', 'knowledge', 'mind'],
        life: ['journey', 'experience', 'living', 'existence', 'change', 'life'],
        love: ['love', 'heart', 'care', 'relationship'],
        success: ['success', 'win', 'accomplish', 'result'],
        happiness: ['joy', 'smile', 'happy', 'gratitude']
        };
        
  const fetchQuote = async () => {
  setLoading(true);
  setError('');

  try {
    const response = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent('https://zenquotes.io/api/quotes')}`
    );
    const data = await response.json();

    // Filter by category
    let filteredQuotes = data;

    if (category && category !== 'all') {
      const keywords = categoryKeywords[category] || [];
      filteredQuotes = data.filter((quote) =>
        keywords.some((keyword) =>
          quote.q.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    // If no quotes found, use fallback or pick from unfiltered
    if (filteredQuotes.length === 0) {
      console.warn(`No quotes found for category: ${category}. Falling back to default.`);
      filteredQuotes = data; // fallback to original list
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = {
      text: filteredQuotes[randomIndex]?.q || "Keep going. You're doing great!",
      author: filteredQuotes[randomIndex]?.a || "Unknown"
    };

    setQuote(randomQuote);
  } catch (err) {
    console.error('Error fetching quote:', err);
    setError('Could not load quote. Try again later.');
    setQuote({
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs'
    });
  } finally {
    setLoading(false);
  }
};

  // TO REFRESH QUOTES
  const handleRefresh = () => {
    fetchQuote();
  };

  // FOR CATEGORY
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    fetchQuote(newCategory);
  };

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div className="zenquotes-widget">

    {/* WIDGET HEADER/TITLE*/}
      <div className="zenquotes-header">
        <div className="zenquotes-title">
          <Quote size={20} />
          <h2>📖 ZenQuotes</h2>
        </div>
        {/* REFRESH BUTTON */}
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="zenquotes-refresh-btn"
          title="Get a new quote"
        >
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
        </button>
      </div>

      {/* TO SELECT CATEGORY */}
      <div className="category-selector">
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`category-btn ${category === cat.value ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* QUOTE CONTENT */}
      <div className="quote-content">
        {loading ? (
          <div className="quote-loading">
            <RefreshCw size={20} className="spinning" />
            <span>Finding wisdom...</span>
          </div>
        ) : error ? (
          <p className="quote-error">{error}</p>
        ) : quote ? (
          <div className="quote-display">
            {/* QUOTE TEXT */}
            <div className="quote-main">
              <Quote size={24} className="quote-icon" />
              <blockquote className="quote-text">
                "{quote.text}"
              </blockquote>
              <cite className="quote-author">
                — {quote.author}
              </cite>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ZenQuotesWidget;