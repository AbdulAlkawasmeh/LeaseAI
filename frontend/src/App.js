import "./App.css";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePosts";
import TenantPage from "./pages/TenantPage";  

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <NavLink to="/createpost" className="nav-link" activeClassName="active">
          Create a Post
          </NavLink>
          <NavLink to="/" className="nav-link" activeClassName="active">
          Homepage
          </NavLink>
          <NavLink to="/tenant" className="nav-link" activeClassName="active">
          Tenant Page
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/tenant" element={<TenantPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
