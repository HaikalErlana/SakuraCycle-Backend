const express = require("express");
const router = express.Router();

const setoranController = require("../controllers/setoranController");

router.get("/", setoranController.getAllSetoran);
router.post("/", setoranController.createSetoran);
router.get("/:id", setoranController.getSetoranById);

module.exports = router;