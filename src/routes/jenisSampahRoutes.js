const express = require("express");
const router = express.Router();

const jenisSampahController = require("../controllers/jenisSampahController");

router.get("/", jenisSampahController.getAllJenisSampah);
router.get("/:id", jenisSampahController.getJenisSampahById);

module.exports = router;