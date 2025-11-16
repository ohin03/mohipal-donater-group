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

      <footer className="text-center text-muted mt-4 mb-3">
        © Started journey at 2025 BloodLink | Developed by Nextfolio ❤
      </footer>
    </Router>
  );
}

export default App;