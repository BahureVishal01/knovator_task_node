const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyAuth = require("../middleware/authVerify");

router.route("/createPost").post(verifyAuth, postController.createPost);
router.route("/updatePost/:postId").put(verifyAuth, postController.updatePost);
router.route("/getSinglePost/:postId").get(verifyAuth, postController.getSinglePost);
router.route("/getAllPosts/:userId").get(verifyAuth, postController.getAllPost);
router.route("/removePost/:postId").delete(verifyAuth, postController.removeSinglePost);

// router.route("/login").post(authController.signin);


module.exports = router;