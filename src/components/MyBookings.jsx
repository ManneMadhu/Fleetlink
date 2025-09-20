// import React, { useEffect, useState } from 'react';

// export default function MyBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
//   const customerId = 'demo-customer-1'; // in real app, use auth

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${apiBase}/api/bookings?customerId=${customerId}`);
//       const body = await res.json();
//       if (!res.ok) throw new Error(body.error || 'Failed');
//       setBookings(body);
//     } catch (err) {
//       alert('Error fetching bookings: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const cancelBooking = async (id) => {
//     if (!confirm('Cancel booking?')) return;
//     try {
//       const res = await fetch(`${apiBase}/api/bookings/${id}`, { method: 'DELETE' });
//       const body = await res.json();
//       if (!res.ok) throw new Error(body.error || 'Failed to cancel');
//       alert(body.message || 'Cancelled');
//       fetchBookings();
//     } catch (err) {
//       alert('Cancel error: ' + err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>My Bookings</h2>
//       {loading && <p>Loading…</p>}
//       {!loading && bookings.length === 0 && <p>No bookings found</p>}
//       <div>
//         {bookings.map(b => (
//           <div key={b._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 6 }}>
//             <div><strong>Vehicle:</strong> {b.vehicleId?.name || String(b.vehicleId)}</div>
//             <div><strong>From:</strong> {b.fromPincode} → <strong>To:</strong> {b.toPincode}</div>
//             <div><strong>Start:</strong> {new Date(b.startTime).toLocaleString()}</div>
//             <div><strong>End:</strong> {new Date(b.endTime).toLocaleString()}</div>
//             <div style={{ marginTop: 8 }}>
//               <button onClick={() => cancelBooking(b._id)}>Cancel Booking</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBase = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const customerId = "demo-customer-1"; // in real app, use auth

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${apiBase}/api/bookings?customerId=${customerId}`
      );
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed");
      setBookings(body);
    } catch (err) {
      alert("Error fetching bookings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel booking?")) return;
    try {
      const res = await fetch(`${apiBase}/api/bookings/${id}`, {
        method: "DELETE",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to cancel");
      alert(body.message || "Cancelled");
      fetchBookings();
    } catch (err) {
      alert("Cancel error: " + err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>📋 My Bookings</h2>

          {loading && <p>Loading…</p>}
          {!loading && bookings.length === 0 && <p>No bookings found</p>}

          <div style={styles.list}>
            {bookings.map((b) => (
              <div key={b._id} style={styles.bookingItem}>
                <div>
                  <strong>Vehicle:</strong>{" "}
                  {b.vehicleId?.name || String(b.vehicleId)}
                </div>
                <div>
                  <strong>From:</strong> {b.fromPincode} →{" "}
                  <strong>To:</strong> {b.toPincode}
                </div>
                <div>
                  <strong>Start:</strong>{" "}
                  {new Date(b.startTime).toLocaleString()}
                </div>
                <div>
                  <strong>End:</strong> {new Date(b.endTime).toLocaleString()}
                </div>
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => cancelBooking(b._id)}
                    style={styles.cancelButton}
                  >
                    Cancel Booking
                  </button>
                </div>
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
      "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80')", // 🚚 Truck/fleet photo
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
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  bookingItem: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    background: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  cancelButton: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
