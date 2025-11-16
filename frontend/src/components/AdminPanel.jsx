import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [donors, setDonors] = useState([]);
  



const loginAdmin = async () => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { password });
    if (res.data.success) setIsAdmin(true);
  } catch (err) {
    alert("❌ Wrong password!");
  }
};
 
  const fetchDonors = () => {
    axios.get("http://localhost:5000/api/donors").then(res => setDonors(res.data));
  };

  const deleteDonor = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      await axios.delete(`http://localhost:5000/api/donors/${id}`);
      fetchDonors();
    }
  };

  useEffect(() => {
    if (isAdmin) fetchDonors();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="text-center p-4">
        <h4>🔐 Admin Login</h4>
        <input
          type="password"
          placeholder="Enter admin password"
          className="form-control w-50 mx-auto my-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-danger" onClick={loginAdmin}>Login</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h3 className="text-center text-danger mb-4" style={{ backgroundColor: "#e8f0fe" }} >🩸 Admin Panel</h3>
      <table className="table table-bordered table-striped text-center table-responsive">
        <thead className="table-danger">
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.location}</td>
              <td>{d.phone}</td>
              <td>
                <button onClick={() => deleteDonor(d._id)} className="btn btn-sm btn-outline-danger">
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
