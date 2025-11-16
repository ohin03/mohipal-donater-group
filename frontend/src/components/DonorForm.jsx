import { useState } from "react";
import axios from "axios";

const DonorForm = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", e.target.name.value);
    formData.append("bloodGroup", e.target.group.value);
    formData.append("location", e.target.location.value);
    formData.append("phone", e.target.phone.value);

    await axios.post(`${process.env.REACT_APP_API_URL}/api/donors`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Donor Added!");
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "600px", margin: "auto", borderRadius: "14px" }}
      >
        <h3 className="text-center mb-4 text-danger fw-bold">
          Add New Blood Donor
        </h3>

        <form onSubmit={handleSubmit}>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Profile Image</label>

            <div className="p-3 border rounded d-flex justify-content-between align-items-center bg-light">
              <label
                className="btn btn-outline-primary fw-semibold px-4"
                style={{ cursor: "pointer" }}
              >
                📸 Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </label>

              {image ? (
                <span className="text-success fw-semibold">
                  ✔ {image.name}
                </span>
              ) : (
                <span className="text-muted">No file chosen</span>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control form-control-lg"
              placeholder="Enter donor name"
              required
            />
          </div>

          {/* Blood Group (Beautiful Select) */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Blood Group</label>
            <select
              name="group"
              className="form-select form-select-lg fw-semibold border-danger"
              required
            >
              <option value="">-- Select Blood Group --</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Location */}
           <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="form-control form-control-lg"
              placeholder="City / Area"
              required
            />
          </div>


          {/* Phone */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control form-control-lg"
              placeholder="Phone number"
              required
              pattern="^(?:\+8801|01)[0-9]{9}$"
              title="Valid BD number: 01XXXXXXXXX বা +8801XXXXXXXXX"
              />

          </div>

          <button className="btn btn-danger w-100 fw-bold mt-3 py-2" type="submit">
            Submit Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorForm;