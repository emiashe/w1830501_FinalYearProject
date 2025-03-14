import React from "react"
import "./ForumPage.css";
import { forumPosts } from './../../../Data/Data'
import { Link, useLocation } from 'react-router-dom';

const ForumPage = () => {


    return (
      
                   
        <div className="forum-page-container">
      <h1 className="forum-page-title">Forum Posts</h1>
      <p className="forum-page-subtitle">
        Explore trending topics
      </p>
      <div className="forum-posts-container">
        {forumPosts.map((post, index) => (
          <Link to={post.link} className="forum-post" key={index}>
            <div className="forum-post-image-container">
              <img
                src={post.image}
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
      
    )
  }
  
  export default ForumPage