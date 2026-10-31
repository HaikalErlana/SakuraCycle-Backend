const nasabahModel = require("../models/nasabahModel");

// Menampilkan semua nasabah
const getAllNasabah = async (req, res) => {
  try {
    const nasabah = await nasabahModel.getAllNasabah();

    res.status(200).json({
      message: "Data nasabah berhasil diambil",
      data: nasabah,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Menampilkan detail nasabah berdasarkan ID
const getNasabahById = async (req, res) => {
  try {
    const { id } = req.params;
    const nasabah = await nasabahModel.getNasabahById(id);

    if (!nasabah) {
      return res.status(404).json({
        message: "Nasabah tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail nasabah berhasil diambil",
      data: nasabah,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Menambahkan nasabah baru
const createNasabah = async (req, res) => {
  try {
    const { nama, nomor_identitas, alamat, no_telepon } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        message: "Nama nasabah wajib diisi",
      });
    }

    const nasabah = await nasabahModel.createNasabah({
      nama,
      nomor_identitas,
      alamat,
      no_telepon,
    });

    res.status(201).json({
      message: "Nasabah berhasil ditambahkan",
      data: nasabah,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Nomor identitas sudah terdaftar",
      });
    }

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Mengubah data nasabah
const updateNasabah = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nomor_identitas, alamat, no_telepon } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        message: "Nama nasabah wajib diisi",
      });
    }

    const nasabah = await nasabahModel.updateNasabah(id, {
      nama,
      nomor_identitas,
      alamat,
      no_telepon,
    });

    if (!nasabah) {
      return res.status(404).json({
        message: "Nasabah tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Data nasabah berhasil diperbarui",
      data: nasabah,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Nomor identitas sudah digunakan",
      });
    }

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Menghapus nasabah
const deleteNasabah = async (req, res) => {
  try {
    const { id } = req.params;

    const nasabah = await nasabahModel.deleteNasabah(id);

    if (!nasabah) {
      return res.status(404).json({
        message: "Nasabah tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Nasabah berhasil dihapus",
      data: nasabah,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "23503") {
      return res.status(409).json({
        message: "Nasabah tidak dapat dihapus karena memiliki riwayat setoran",
      });
    }

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getAllNasabah,
  getNasabahById,
  createNasabah,
  updateNasabah,
  deleteNasabah,
};