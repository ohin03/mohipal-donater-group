import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/donors`
        );
        setDonors(res.data);
      } catch (err) {
        console.error("Error fetching donors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  // 🔎 Filter donors
  const filteredDonors = donors.filter((donor) => {
    const q = query.toLowerCase();
    return (
      donor.name.toLowerCase().includes(q) ||
      donor.bloodGroup.toLowerCase().includes(q) ||
      donor.location.toLowerCase().includes(q) ||
      donor.phone?.includes(q)
    );
  });

  return (
    <div
      style={{
        padding: "40px",
        background: "#fff0f0",
        minHeight: "100vh",
        marginTop: "50px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#b71c1c",
        }}
      >
        🩸 All Blood Donors
      </h2>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.6",
          fontWeight: 600,
          color: "#d32f2f",
          textAlign: "center",
          maxWidth: "900px",
          margin: "0 auto 30px",
        }}
      >
        রক্তদান একটি মহৎ মানবিক সেবা—আপনার দেওয়া একটি ব্যাগ রক্ত কারো জীবনে নতুন আশার আলো হতে পারে।
        <span style={{ color: "#b71c1c", fontWeight: 700 }}>
          {" "}
          আপনার কয়েক মিনিটের সদিচ্ছা একজন মানুষের পুরো ভবিষ্যৎ বদলে দিতে পারে।
        </span>
        তাই আজই রক্তদানে এগিয়ে আসুন।
      </p>

      {/* 🔎 Search */}
      <SearchBar query={query} setQuery={setQuery} />

      {loading ? (
        <p style={{ textAlign: "center", color: "#b71c1c" }}>
          Loading donors...
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {filteredDonors.map((donor) => (
            <div
              key={donor._id}
              style={{
                width: "220px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ffe5e5, #ffcdd2)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.1)";
              }}
            >
              {/* 🖼 Image from DB Buffer */}
              <img
                src={`${process.env.REACT_APP_API_URL}/api/donors/image/${donor._id}`}
                alt={donor.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />

              <h3
                style={{
                  marginTop: "10px",
                  color: "#b71c1c",
                  fontSize: "18px",
                }}
              >
                {donor.name}
              </h3>

              <p style={{ margin: "5px 0" }}>
                Blood Group: <strong>{donor.bloodGroup}</strong>
              </p>
              <p style={{ margin: "5px 0" }}>Location: {donor.location}</p>
              <p style={{ margin: "5px 0" }}>Phone: {donor.phone}</p>
            </div>
          ))}

          {filteredDonors.length === 0 && (
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#b71c1c",
                marginTop: "20px",
                fontWeight: 600,
              }}
            >
              No donors found matching "{query}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DonorList;
