const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const upload = require("../middleware/multer");
const { createPost } = require("../controllers/postController");

const router = express.Router();

// define the routes here
router.post("/create-post", isAuthenticated, upload.single('image'), createPost);



module.exports = router;
