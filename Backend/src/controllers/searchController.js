const blogDao = require('../dao/blogDao');

// Search blog posts by country name
exports.searchByCountry = (req, res) => {
  const { country } = req.query;

  if (!country) {
    return res.status(400).json({ message: 'Country name is required' });
  }

  blogDao.searchBlogPostsByCountry(country)
    .then((posts) => {
      if (!posts.length) return res.status(404).json({ message: 'No blog posts found for this country' });
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error('Error searching blog posts by country:', err);
      res.status(500).json({ message: 'Error searching blog posts' });
    });
};

// Search blog posts by poster's username
exports.searchByUsername = (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  blogDao.searchBlogPostsByUsername(username)
    .then((posts) => {
      if (!posts.length) return res.status(404).json({ message: 'No blog posts found for this username' });
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error('Error searching blog posts by username:', err);
      res.status(500).json({ message: 'Error searching blog posts' });
    });
};
