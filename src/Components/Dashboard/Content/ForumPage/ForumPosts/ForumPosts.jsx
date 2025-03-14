import React from "react";
import "./ForumPosts.css";


const ForumPosts = () => {
  return (
    <div className="main-content">
      

      <div className="page-container">
        <h1 className="page-title">Getting Started with GitHub: A Beginner's Guide</h1>
        <p className="page-subtitle">
          Discover the power of GitHub—your essential tool for collaboration, version control, and managing code.
        </p>

        <div className="blog-content-container">
          <div className="blog-box">
            <h3>What is GitHub?</h3>
            <p>
              GitHub is a platform that allows developers to store, manage, and collaborate on code. 
              It’s built on top of Git, a distributed version control system, making it an essential tool 
              for modern software development.
            </p>
          </div>
          <div className="blog-box">
            <h3>Why Use GitHub?</h3>
            <p>
              GitHub makes it easy to track changes in code, collaborate with team members, and 
              manage projects of all sizes. Its key features include version control, issue tracking, 
              pull requests, and seamless integration with CI/CD tools.
            </p>
          </div>
          <div className="blog-box">
            <h3>Getting Started</h3>
            <p>
              To get started, create an account on GitHub and set up Git on your local machine. 
              Configure your user profile, generate SSH keys, and link your system to GitHub for 
              seamless collaboration.
            </p>
          </div>
          <div className="blog-box">
            <h3>Essential Features</h3>
            <p>
              GitHub offers repositories for storing code, branches for managing feature development, 
              and pull requests for peer code reviews. Learn these basics to unlock the full potential 
              of GitHub for your projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPosts;