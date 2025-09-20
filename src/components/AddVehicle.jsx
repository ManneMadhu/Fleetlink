// import React, { useState } from 'react';

// export default function AddVehicle() {
//   const [name, setName] = useState('');
//   const [capacity, setCapacity] = useState('');
//   const [tyres, setTyres] = useState('');
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/vehicles', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, capacityKg: Number(capacity), tyres: Number(tyres) })
//       });
//       const body = await res.json();
//       if (!res.ok) throw new Error(body.error || 'Failed');
//       setMessage('Vehicle added: ' + body.name);
//       setName(''); setCapacity(''); setTyres('');
//     } catch (err) {
//       setMessage('Error: ' + err.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Vehicle</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label><br />
//           <input value={name} onChange={e => setName(e.target.value)} required />
//         </div>
//         <div>
//           <label>Capacity (KG)</label><br />
//           <input type='number' value={capacity} onChange={e => setCapacity(e.target.value)} required />
//         </div>
//         <div>
//           <label>Tyres</label><br />
//           <input type='number' value={tyres} onChange={e => setTyres(e.target.value)} required />
//         </div>
//         <button type='submit'>Add</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
import React, { useState } from "react";

export default function AddVehicle() {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [tyres, setTyres] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          capacityKg: Number(capacity),
          tyres: Number(tyres),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed");
      setMessage("✅ Vehicle added: " + body.name);
      setName("");
      setCapacity("");
      setTyres("");
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>➕ Add Vehicle</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter vehicle name"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Capacity (KG)</label>
              <input
                type="number"
                style={styles.input}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g. 5000"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Tyres</label>
              <input
                type="number"
                style={styles.input}
                value={tyres}
                onChange={(e) => setTyres(e.target.value)}
                placeholder="e.g. 6"
                required
              />
            </div>

            <button type="submit" style={styles.button}>
              Add Vehicle
            </button>
          </form>

          {message && (
            <p
              style={{
                ...styles.message,
                color: message.startsWith("✅") ? "green" : "red",
              }}
            >
              {message}
            </p>
          )}
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
      "url('https://images.unsplash.com/photo-1542365885-7c5f3a54d9c3?auto=format&fit=crop&w=1400&q=80')", // 🚚 Replace with your own fleet/vehicle image if needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)", // dark overlay for readability
  },
  container: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "400px",
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
  message: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: "bold",
  },
};
