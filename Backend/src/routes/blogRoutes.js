const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const multer = require("multer");

// Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", blogController.getPosts);
router.post("/", upload.single("image"), blogController.createPost);
router.delete("/:id", blogController.deletePost);

module.exports = router;
