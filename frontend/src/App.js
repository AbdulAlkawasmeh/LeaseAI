import "./App.css";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePosts";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Links */}
        <nav className="navbar">
          <NavLink to="/createpost" className="nav-link" activeclassname="active">
            Create a Post
          </NavLink>
          <NavLink to="/" className="nav-link" activeclassname="active">
            Homepage
          </NavLink>
        </nav>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
