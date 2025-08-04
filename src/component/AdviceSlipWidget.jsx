import { useState, useEffect } from 'react';
import { RefreshCw, Brain } from 'lucide-react';
import '../styles/adviceslipwidget.css'

const AdviceSlipWidget = () => {
    ``  
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAdvice = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      
      if (!response.ok) {
        throw new Error('Failed to fetch advice');
      }
      
      const data = await response.json();
        setAdvice(data.slip.advice);
      } catch (err) {
        setError('Failed to fetch advice. Please try again.');
        console.error('Error fetching advice:', err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="widget advice-widget">
        
       {/* HEADER */}
      <div className="widget-header">
        {/* WIDGET TITLE */}
        <div className="widget-title">
          <Brain size={20} color="#7c3aed" />
          <h2>🧠 Daily Advice</h2>
        </div>
        {/* REFRESH BUTTON */}
        <button
          onClick={fetchAdvice}
          disabled={loading}
          className="refresh-btn"
          title="Get new advice"
        >
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
        </button>
      </div>

      {/* WIDGET CONTENT */}
      <div className="widget-content">
        {loading ? (
          <div className="loading">
            <RefreshCw size={16} className="spinning" />
            <span>Getting wisdom...</span>
          </div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <blockquote className="advice-quote">
            "{advice}"
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default AdviceSlipWidget;
