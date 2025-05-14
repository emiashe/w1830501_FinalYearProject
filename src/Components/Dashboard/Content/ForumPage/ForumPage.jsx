//w1830501
// Displays a list of forum posts with category, image, and metadata

import React, { useEffect, useState } from "react";
import "./ForumPage.css";
import { Link } from 'react-router-dom';
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  // Fetch all forum posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosPrivate.get('/forum');
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch forum posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="forum-page-container">
      <h1 className="forum-page-title">Forum Posts</h1>
      <p className="forum-page-subtitle">Explore trending topics</p>
      <div className="forum-posts-container">
        {posts.map((post) => (
          <Link to={`/forum/post/${post.slug}`} className="forum-post" key={post.id}>
            <div className="forum-post-image-container">
              <img
                src={post.image_url} 
                alt={post.category}
                className="forum-post-image"
              />
            </div>
            <div className="forum-post-content">
              <p className="forum-category">{post.category}</p>
              <h3 className="forum-title">{post.title}</h3>
              <p className="forum-description">{post.description}</p>
              <p className="forum-author">BY {post.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
