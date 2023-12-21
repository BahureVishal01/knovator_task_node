const router = require('express').Router();
const userRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes")
router.use("/users", userRoutes);
router.use("/users/post", postRoutes)
module.exports = router;