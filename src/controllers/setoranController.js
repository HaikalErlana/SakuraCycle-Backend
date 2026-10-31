const setoranModel = require("../models/setoranModel");

// Membuat setoran baru
const createSetoran = async (req, res) => {
  try {
    const { id_nasabah, detail } = req.body;

    if (!id_nasabah || !Array.isArray(detail) || detail.length === 0) {
      return res.status(400).json({
        message: "ID nasabah dan detail setoran wajib diisi",
      });
    }

    for (const item of detail) {
      if (
        !item.id_jenis_sampah ||
        !Number.isFinite(Number(item.berat)) ||
        Number(item.berat) <= 0
      ) {
        return res.status(400).json({
          message: "Setiap detail harus memiliki jenis sampah dan berat lebih dari 0",
        });
      }
    }

    const setoran = await setoranModel.createSetoran({
      id_nasabah,
      detail,
    });

    res.status(201).json({
      message: "Setoran sampah berhasil dicatat",
      data: setoran,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "23503") {
      return res.status(404).json({
        message: "Nasabah atau jenis sampah tidak ditemukan",
      });
    }

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Jenis sampah yang sama tidak boleh dicatat dua kali dalam satu setoran",
      });
    }

    res.status(400).json({
      message: error.message,
    });
  }
};

// Menampilkan semua riwayat setoran
const getAllSetoran = async (req, res) => {
  try {
    const data = await setoranModel.getAllSetoran();

    res.status(200).json({
      message: "Riwayat setoran berhasil diambil",
      data: data,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

const getSetoranById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await setoranModel.getSetoranById(id);

    if (!data) {
      return res.status(404).json({
        message: "Setoran tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "Detail setoran berhasil diambil",
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
  createSetoran,
  getAllSetoran,
  getSetoranById,
};