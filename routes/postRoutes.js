const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyAuth = require("../middleware/authVerify");
const { validatePost } = require("../validators/validator");

router.route("/createPost").post(verifyAuth, validatePost, postController.createPost);
router.route("/updatePost/:postId").put(verifyAuth, postController.updatePost);
router.route("/getSinglePost/:postId").get(verifyAuth, postController.getSinglePost);
router.route("/getAllPosts/:userId").get(verifyAuth, postController.getAllPost);
router.route("/removePost/:postId").delete(verifyAuth, postController.removeSinglePost);
router.route("/activeInactivePost/:userId").get(verifyAuth, postController.getAllActiveAndInactivePost);


module.exports = router;