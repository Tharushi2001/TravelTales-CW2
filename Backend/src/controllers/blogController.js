const blogDao = require('../dao/blogDao');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create blog post
exports.createBlogPost = (req, res) => {
  const { title, content, country, date_of_visit } = req.body;
  const userId = req.user.id;

  if (!title || !content || !country || !date_of_visit) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  blogDao.createBlogPost(userId, title, content, country, date_of_visit)
    .then(() => res.status(201).json({ message: 'Blog post created successfully' }))
    .catch((err) => {
      console.error('Error creating blog post:', err);
      res.status(500).json({ message: 'Error creating blog post' });
    });
};

// Edit blog post
exports.editBlogPost = (req, res) => {
  const { postId } = req.params;
  const { title, content, country, date_of_visit } = req.body;
  const userId = req.user.id;

  if (!title || !content || !country || !date_of_visit) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  blogDao.getBlogPostById(postId)
    .then((post) => {
      if (!post) return res.status(404).json({ message: 'Post not found' });
      if (post.user_id !== userId) {
        return res.status(403).json({ message: 'Unauthorized to edit this post' });
      }

      blogDao.updateBlogPost(postId, title, content, country, date_of_visit)
        .then(() => res.status(200).json({ message: 'Blog post updated successfully' }))
        .catch((err) => {
          console.error('Error updating blog post:', err);
          res.status(500).json({ message: 'Error updating blog post' });
        });
    })
    .catch((err) => {
      console.error('Error fetching blog post:', err);
      res.status(500).json({ message: 'Error fetching blog post' });
    });
};

// Delete blog post
exports.deleteBlogPost = (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  blogDao.getBlogPostById(postId)
    .then((post) => {
      if (!post) return res.status(404).json({ message: 'Post not found' });
      if (post.user_id !== userId) {
        return res.status(403).json({ message: 'Unauthorized to delete this post' });
      }

      blogDao.deleteBlogPost(postId)
        .then(() => res.status(200).json({ message: 'Blog post deleted successfully' }))
        .catch((err) => {
          console.error('Error deleting blog post:', err);
          res.status(500).json({ message: 'Error deleting blog post' });
        });
    })
    .catch((err) => {
      console.error('Error fetching blog post:', err);
      res.status(500).json({ message: 'Error fetching blog post' });
    });
};

// Get all blog posts
exports.getBlogPosts = (req, res) => {
  blogDao.getAllBlogPosts()
    .then((posts) => {
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: 'No blog posts found' });
      }
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error('Error fetching blog posts:', err);
      res.status(500).json({ message: 'Error fetching blog posts' });
    });
};

// Like post
exports.likePost = (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  blogDao.likePost(userId, postId)
    .then(() => {
      // After liking the post, fetch the updated like count
      blogDao.getLikeCount(postId)
        .then((likeCount) => {
          res.status(200).json({ message: "Post liked", likeCount: likeCount });
        })
        .catch((err) => {
          console.error("Error fetching like count:", err);
          res.status(500).json({ message: "Failed to get like count" });
        });
    })
    .catch((err) => {
      console.error("Like failed:", err);
      res.status(500).json({ message: "Failed to like post" });
    });
};


// Add comment
exports.addComment = (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.user.id;

  if (!content) return res.status(400).json({ message: "Comment content required" });

  blogDao.addComment(userId, postId, content)
    .then(() => res.status(201).json({ message: "Comment added" }))
    .catch((err) => {
      console.error("Add comment failed:", err);
      res.status(500).json({ message: "Failed to add comment" });
    });
};
