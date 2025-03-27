import React from "react";
import ReactDOM from 'react-dom/client'; 
import Home from "./pages/Home"; 
import CreatePosts from "./pages/CreatePosts";
import TenantPage from "./pages/TenantPage"; 
import "./index.css"; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";  // Ensure 'Route' and 'Routes' are imported


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  <Route path="/create-posts" component={CreatePosts} />
  </React.StrictMode>
);

reportWebVitals();
