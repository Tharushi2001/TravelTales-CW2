const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authenticate=require("../middleware/authMiddleware");

router.post('/blog/create',authenticate,blogController.createBlogPost);
router.put('/blog/edit/:postId',authenticate,blogController.editBlogPost);
router.delete('/blog/delete/:postId',authenticate,blogController.deleteBlogPost);
router.get('/blog', blogController.getBlogPosts); // Add this line
router.post("/like/:postId", authenticate, blogController.likePost);
router.post("/comment/:postId", authenticate, blogController.addComment);


module.exports=router;
