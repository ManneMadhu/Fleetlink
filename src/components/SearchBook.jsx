

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function toISOFromLocal(value) {
  if (!value) return null;
  const d = new Date(value);
  return d.toISOString();
}

export default function SearchBook() {
  const [capacity, setCapacity] = useState("");
  const [fromPincode, setFromPincode] = useState("");
  const [toPincode, setToPincode] = useState("");
  const [startLocal, setStartLocal] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleMsgs, setVehicleMsgs] = useState({});

  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSearch = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const iso = toISOFromLocal(startLocal);
    const q = new URLSearchParams({
      capacityRequired: capacity,
      fromPincode,
      toPincode,
      startTime: iso,
    }).toString();
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/api/vehicles/available?` + q);
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to fetch");
      setResults(body);
    } catch (err) {
      alert("Search error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (vehicleId) => {
    const iso = toISOFromLocal(startLocal);
    try {
      setVehicleMsgs((prev) => ({ ...prev, [vehicleId]: "Booking..." }));
      const res = await fetch(`${apiBase}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          fromPincode,
          toPincode,
          startTime: iso,
          customerId: "demo-customer-1",
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to book");

      const bookingId =
        body._id ||
        body.id ||
        (body.created && body.created._id) ||
        "unknown-id";
      setVehicleMsgs((prev) => ({
        ...prev,
        [vehicleId]: `✅ Booked (ID: ${bookingId})`,
      }));
      handleSearch();
    } catch (err) {
      setVehicleMsgs((prev) => ({
        ...prev,
        [vehicleId]: "Booking error: " + err.message,
      }));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>🔍 Search & Book</h2>

          <form onSubmit={handleSearch} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Capacity Required</label>
              <input
                type="number"
                style={styles.input}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>From Pincode</label>
              <input
                style={styles.input}
                value={fromPincode}
                onChange={(e) => setFromPincode(e.target.value)}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>To Pincode</label>
              <input
                style={styles.input}
                value={toPincode}
                onChange={(e) => setToPincode(e.target.value)}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Start Date & Time</label>
              <DatePicker
                selected={startLocal}
                onChange={(date) => setStartLocal(date)}
                showTimeSelect
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText="Select start date & time"
                required
                className="datepicker-input"
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Searching..." : "Search Availability"}
            </button>
          </form>

          <h3 style={{ marginTop: 20 }}>Results</h3>
          {loading && <p>Loading vehicles…</p>}
          {!loading && results.length === 0 && <p>No vehicles available</p>}
          <div style={styles.list}>
            {results.map((v) => (
              <div key={v._id} style={styles.resultItem}>
                <div>
                  <strong>{v.name}</strong>
                </div>
                <div>Capacity: {v.capacityKg ?? v.capacity} kg</div>
                <div>Tyres: {v.tyres}</div>
                <div>
                  Estimated Duration (hours): {v.estimatedRideDurationHours}
                </div>
                <button
                  onClick={() => handleBook(v._id)}
                  style={styles.bookButton}
                >
                  Book Now
                </button>
                {vehicleMsgs[v._id] && (
                  <div
                    style={{
                      marginTop: 6,
                      color: vehicleMsgs[v._id].startsWith("✅")
                        ? "green"
                        : "red",
                    }}
                  >
                    {vehicleMsgs[v._id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1542365885-7c5f3a54d9c3?auto=format&fit=crop&w=1400&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
  },
  container: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "800px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },
  button: {
    background: "#007bff",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s ease",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  resultItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    background: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  bookButton: {
    background: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
};
