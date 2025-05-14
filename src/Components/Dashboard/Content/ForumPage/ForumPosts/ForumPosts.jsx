//w1830501
// Displays the full content of an individual forum post by slug

import React, { useEffect, useState } from 'react';
import "./ForumPosts.css";
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../../../../Hooks/useAxiosPrivate';

const ForumPosts = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [error, setError] = useState('');

  // Load single post by slug
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axiosPrivate.get(`/forum/${slug}`);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to load post:", err);
        setError('Could not load forum post');
      }
    };
    fetchPost();
  }, [slug]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <div className="page-container">
        <h1 className="page-title">{post.title}</h1>
        <p className="page-subtitle">By {post.author} · Category: {post.category}</p>

        <div className="blog-content-container">
          <div className="blog-box">
            {post.image_url1 && <img src={post.image_url1} alt="Main" className="post-image" />}
            {(post.content || '').split('\n').map((line, index) => <div key={index}>{line.trim()}</div>)}

            {post.image_url2 && <img src={post.image_url2} alt="Section 2" className="post-image" />}
            {(post.content2 || '').split('\n').map((line, index) => <div key={index}>{line.trim()}</div>)}

            {post.image_url3 && <img src={post.image_url3} alt="Section 3" className="post-image" />}
            {(post.content3 || '').split('\n').map((line, index) => <div key={index}>{line.trim()}</div>)}

            {post.image_url4 && <img src={post.image_url4} alt="Section 4" className="post-image" />}
            {(post.content4 || '').split('\n').map((line, index) => <div key={index}>{line.trim()}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPosts;
