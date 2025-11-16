import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DonorForm from "./components/DonorForm";
import DonorList from "./components/DonorList";
import AdminPanel from "./components/AdminPanel";


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-danger navbar-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold " to="/">🩸 Mohipal Blood Group</Link>
          <div className="ms-auto">
            <Link className="btn btn-light btn-sm me-2" to="/">Home</Link>&nbsp;
            <Link className="btn btn-dark btn-sm" to="/admin">Admin</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="row">
                <div className="col-md-4 mb-4">
                  <DonorForm onAdded={() => setQuery("")} />
                </div>
                <div className="col-md-8">
                  
                  <DonorList query={query} />
                </div>
              </div>
            </div>
          }
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    <footer className="text-center mt-4 py-3" style={{ background: "#f8f9fa" }}>
  <div className="container">

    {/* Company Short Description */}
    <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
      <strong>Nextfolio</strong> — We build modern and fully functional
      websites including complete Frontend & Backend development services.
    </p>

    {/* Copyright */}
    <p className="text-muted mb-3" style={{ fontSize: "13px" }}>
      © start journey at 2025 BloodLink | Developed with ❤ by Nextfolio
    </p>

    {/* Buttons */}
    <div>
      {/* Facebook Page */}
      <a
        href="https://www.facebook.com/share/1FwCs63kuJ/?mibextid=wwXIfr"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary btn-sm me-2"
      >
        👍 Our Facebook Page
      </a>
    </div>

  </div>
</footer>


    </Router>
  );
}

export default App;