const pool = require("../config/database");

// Mengambil semua jenis sampah
const getAllJenisSampah = async () => {
  const result = await pool.query(
    "SELECT * FROM jenis_sampah ORDER BY id_jenis_sampah ASC"
  );

  return result.rows;
};

// Mengambil jenis sampah berdasarkan ID
const getJenisSampahById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM jenis_sampah WHERE id_jenis_sampah = $1",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllJenisSampah,
  getJenisSampahById,
};