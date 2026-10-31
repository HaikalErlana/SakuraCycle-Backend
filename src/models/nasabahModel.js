const pool = require("../config/database");

// Mengambil semua data nasabah
const getAllNasabah = async () => {
  const result = await pool.query(
    "SELECT * FROM nasabah ORDER BY id_nasabah ASC"
  );

  return result.rows;
};

// Mengambil satu nasabah berdasarkan ID
const getNasabahById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM nasabah WHERE id_nasabah = $1",
    [id]
  );

  return result.rows[0];
};

// Menambahkan nasabah baru
const createNasabah = async (data) => {
  const { nama, nomor_identitas, alamat, no_telepon } = data;

  const result = await pool.query(
    `INSERT INTO nasabah
      (nama, nomor_identitas, alamat, no_telepon)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nama, nomor_identitas, alamat, no_telepon]
  );

  return result.rows[0];
};

// Mengubah data nasabah
const updateNasabah = async (id, data) => {
  const { nama, nomor_identitas, alamat, no_telepon } = data;

  const result = await pool.query(
    `UPDATE nasabah
     SET nama = $1,
         nomor_identitas = $2,
         alamat = $3,
         no_telepon = $4
     WHERE id_nasabah = $5
     RETURNING *`,
    [nama, nomor_identitas, alamat, no_telepon, id]
  );

  return result.rows[0];
};

// Menghapus nasabah berdasarkan ID
const deleteNasabah = async (id) => {
  const result = await pool.query(
    `DELETE FROM nasabah
     WHERE id_nasabah = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllNasabah,
  getNasabahById,
  createNasabah,
  updateNasabah,
  deleteNasabah,
};