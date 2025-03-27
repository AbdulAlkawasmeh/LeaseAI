import React from "react";
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // Import Router
import Home from "./pages/Home"; 
import CreatePosts from "./pages/CreatePosts";  // Import CreatePosts page
import TenantPage from "./pages/TenantPage";  // Import TenantPage
import "./index.css"; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>  {/* Wrap the app in Router */}
      <Switch>  {/* Switch ensures only the first matching route is rendered */}
        <Route exact path="/" component={Home} />  {/* Route for Home page */}
        <Route path="/create-posts" component={CreatePosts} />  {/* Route for CreatePosts page */}
        <Route path="/tenant-page" component={TenantPage} />  {/* Route for TenantPage */}
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
