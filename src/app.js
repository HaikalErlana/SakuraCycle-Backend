const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/database");
const nasabahRoutes = require("./routes/nasabahRoutes");
const jenisSampahRoutes = require("./routes/jenisSampahRoutes");
const setoranRoutes = require("./routes/setoranRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/nasabah", nasabahRoutes);
app.use("/api/jenis-sampah", jenisSampahRoutes);
app.use("/api/setoran", setoranRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SakuraCycle API!",
    status: "Server is running",
  });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SakuraCycle API running on port ${PORT}`);
});