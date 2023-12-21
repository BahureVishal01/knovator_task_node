const Post = require("../models/postModel");
const mongoose = require("mongoose");
const createPost = async (req, res, next) => {
  try {
    const postObjToBeStoredInDB = {
      title: req.body.title,
      body: req.body.body,
      geoLocation: req.body.geoLocation,
      createdBy: req.body.userId,
    };
    const createdPost = await Post.create(postObjToBeStoredInDB);

    if (createdPost) {
      const postCreationResponse = {
        postId: createdPost._id,
        title: createdPost.title,
        body: createPost.body,
        geoLocation: createPost.geoLocation,
        createdAt: createdPost.createdAt,
        updatedAt: createdPost.updatedAt,
      };
      return res.status(201).json({
        success: true,
        message: "Your Post is created",
        data: postCreationResponse,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create Post",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error...",
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const updatedPostObj = {
      title: req.body.title,
      body: req.body.body,
      geoLocation: req.body.geoLocation,
      isActive : req.body.isActive,
    };
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      if (!postId) {
        return res.status(404).json({
          success: false,
          message: "Post Not found..",
        });
      }
      return res
        .status(400)
        .json({ success: false, error: "Invalid ObjectId format for PostId" });
    }
    const PostData = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      updatedPostObj
    ).exec();
    if (PostData !== null) {
      return res.status(200).json({
        success: true,
        message: "Post succesfully updated.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Your Post not found.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error...",
    });
  }
};
const getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      if (!postId) {
        return res.status(404).json({
          success: false,
          message: "Post Not found..",
        });
      }
      return res
        .status(400)
        .json({ success: false, error: "Invalid ObjectId format for PostId" });
    }
    const postData = await Post.findOne(
      {
        _id: postId,
      }
    ).exec();
    if (postData !== null) {
      return res.status(200).json({
        success: true,
        message: "Your post details",
        data: postData,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Your Post not found.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error...",
    });
  }
};
const getAllPost = async (req, res, next) => {
  try {

    let userId = req.params.userId

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      if (!userId) {
        return res.status(404).json({
          success: false,
          message: "Please Provide userId",
        });
      }
      return res
        .status(400)
        .json({ success: false, error: "Invalid ObjectId format for userId" });
    }

    let page = Number(req.query.page) || 1
    let pageLimit = Number(req.query.pageLimit) || 10
   
     
   // const PostData = await Post.find()
    const totalCount = await Post.countDocuments({createdBy: userId});
    const totalPages = Math.ceil(totalCount / pageLimit);

    const postsList = await Post.find({createdBy: userId})
      .skip((page - 1) * pageLimit)
      .limit(pageLimit)
      .exec();

    if (postsList.length >0) {
      return res.status(200).json({
        success: true,
        message: "Your post details",
        totalItems : totalCount,
        totalPages : totalPages,
        currentPage : page,
        data: postsList,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Your Post not found.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error...",
    });
  }
};

const removeSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      if (!postId) {
        return res.status(404).json({
          success: false,
          message: "Post Not found..",
        });
      }
      return res
        .status(400)
        .json({ success: false, error: "Invalid ObjectId format for PostId" });
    }
    const deletedPost = await Post.deleteOne({ _id: postId });
    console.log("Ssssss", deletedPost)
    if (deletedPost.deletedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Your post is deleted successfully...",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Your Post not found.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error...",
    });
  }
};

const getAllActiveAndInactivePost = async (req, res, next) => {
  try {
      let userId = req.params.userId

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        if (!userId) {
          return res.status(404).json({
            success: false,
            message: "Please Provide userId",
          });
        }
        return res
          .status(400)
          .json({ success: false, error: "Invalid ObjectId format for userId" });
      }
   // const PostData = await Post.find()
    const activeCount = await Post.countDocuments({isActive:true, createdBy: userId});
    const inActiveCount = await Post.countDocuments({isActive:false, createdBy: userId});
   

      return res.status(200).json({
        success: true,
        message: "COUNT of Active and inActive posts",
        activePost : activeCount,
        inactivePost : inActiveCount,

      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error...",
    });
  }
};
module.exports = { createPost, updatePost, getSinglePost, getAllPost , removeSinglePost, getAllActiveAndInactivePost};
