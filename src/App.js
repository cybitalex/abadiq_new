import Home from "../src/component/Home/Home/Home";
import { Routes, Route } from "react-router-dom";
import React, { createContext } from "react";
import About from "./component/Home/About/About";
import Dashboard from "./component/Dashoboard/Dashboard/Dashboard";
import LoginModal from "./component/Login/LoginModal";
import PrivateRoute from "./component/Login/PrivateRoute";
import NotFound from "./component/NotFound";
import BlogPost from "./component/Blog/BlogPost";
import BlogListing from "./component/Blog/BlogListing";
import { blogPosts } from "./component/Blog/sampleBlogData";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
export const UserContext = createContext();

const App = () => {
  return (
    <HelmetProvider>
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<BlogListing />} />
          <Route
            path="/blog/:slug"
            element={
              <BlogPost
                post={blogPosts.find((post) =>
                  window.location.pathname.includes(post.slug)
                )}
              />
            }
          />
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute redirectTo="/login">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
};

export default App;
