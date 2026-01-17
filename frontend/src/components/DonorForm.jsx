import { useState } from "react";
import axios from "axios";

const DonorForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", e.target.name.value);
    formData.append("bloodGroup", e.target.group.value);
    formData.append("location", e.target.location.value);
    formData.append("phone", e.target.phone.value);

    try {
      setLoading(true);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/donors`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("✅ Donor added successfully!");

      // Reset form
      e.target.reset();
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add donor");
    } finally {
      setLoading(false);
    }
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

            <div className="p-3 border rounded bg-light">
              <label
                className="btn btn-outline-primary fw-semibold px-4"
                style={{ cursor: "pointer" }}
              >
                📸 Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  required
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>

              <div className="mt-2">
                {image ? (
                  <span className="text-success fw-semibold">
                    ✔ {image.name}
                  </span>
                ) : (
                  <span className="text-muted">No file chosen</span>
                )}
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                />
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

          {/* Blood Group */}
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
              pattern="^(?:\\+8801|01)[0-9]{9}$"
              title="Valid BD number: 01XXXXXXXXX বা +8801XXXXXXXXX"
            />
          </div>

          <button
            className="btn btn-danger w-100 fw-bold mt-3 py-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorForm;
