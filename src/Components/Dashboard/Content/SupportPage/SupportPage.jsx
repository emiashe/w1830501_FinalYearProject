//w1830501
// Lists support articles and navigates to individual articles when clicked

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../../Hooks/useAxiosPrivate';
import "./SupportPage.css";

const SupportPage = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  // Fetch articles based on search term
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const endpoint = search
          ? `/support/search?q=${encodeURIComponent(search)}`
          : '/support';
        const res = await axiosPrivate.get(endpoint);
        setArticles(res.data);
      } catch (err) {
        console.error("Failed to load support articles", err);
      }
    };
    fetchArticles();
  }, [search]);

  return (
    <div className="support-container">
      <div className="support-header">
        <h1>How can we help you?</h1>
      </div>

      {/* Display list of articles */}
      <div className="support-options">
        {articles.map(article => (
          <li
            key={article.id}
            className="support-box"
            onClick={() => navigate(`/support/${article.id}`)}
          >
            <div className="support-icon">{article.icon}</div>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
