const jenisSampahModel = require("../models/jenisSampahModel");

// Menampilkan semua jenis sampah
const getAllJenisSampah = async (req, res) => {
  try {
    const data = await jenisSampahModel.getAllJenisSampah();

    res.status(200).json({
      message: "Data jenis sampah berhasil diambil",
      data: data,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

// Menampilkan detail jenis sampah
const getJenisSampahById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await jenisSampahModel.getJenisSampahById(id);

    if (!data) {
      return res.status(404).json({
        message: "Jenis sampah tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail jenis sampah berhasil diambil",
      data: data,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getAllJenisSampah,
  getJenisSampahById,
};