//w1830501
// Displays full content of a support article based on ID

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';
import './SupportArticle.css';

const SupportArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  // Load article on mount
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axiosPrivate.get(`/support/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Error fetching article", err);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="support-article">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default SupportArticle;
