import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home"; // Adjust this if the path is different
import "./index.css"; // Import global styles if needed

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
