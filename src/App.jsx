

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBook from "./components/SearchBook.jsx";
import MyBookings from "./components/MyBookings.jsx";
import AddVehicle from "./components/AddVehicle.jsx";

export default function App() {
  return (
    <Router>
      <div style={styles.container}>
        {/* Top Header */}
        <header style={styles.header}>
          <h1 style={styles.title}>🚚 FleetLink - Logistics Vehicle Booking System</h1>
        </header>

        {/* Navigation */}
        <nav style={styles.nav}>
          <Link to="/add-vehicle" style={styles.link}>
            Add Vehicle
          </Link>
          <Link to="/" style={styles.link}>
            Search & Book
          </Link>
          <Link to="/bookings" style={styles.link}>
            My Bookings
          </Link>
        </nav>

        {/* Routes */}
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<SearchBook />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#007bff",
    color: "#fff",
    padding: "16px",
    textAlign: "center",
    marginBottom: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  title: {
    margin: 0,
    fontSize: "22px",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px", // <-- spacing between links
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "16px",
  },
  main: {
    padding: "16px",
  },
};
