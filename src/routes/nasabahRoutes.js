const express = require("express");
const router = express.Router();

const nasabahController = require("../controllers/nasabahController");

// GET semua nasabah
router.get("/", nasabahController.getAllNasabah);

// GET detail nasabah
router.get("/:id", nasabahController.getNasabahById);

// POST menambahkan nasabah
router.post("/", nasabahController.createNasabah);

// PUT mengubah data nasabah
router.put("/:id", nasabahController.updateNasabah);

// DELETE menghapus nasabah
router.delete("/:id", nasabahController.deleteNasabah);

module.exports = router;