import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('country'); // Default search by country
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
  
    setErrorMessage('');
    setPosts([]);
    setIsLoading(true);
  
    try {
      let response;
  
      if (searchType === 'country') {
        response = await axios.get(`http://localhost:5000/api/search/country?country=${searchTerm}`);
      } else if (searchType === 'username') {
        response = await axios.get(`http://localhost:5000/api/search/username?username=${searchTerm}`);
      }
      setPosts(response.data);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error fetching posts');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className='main-container'>

    <div className='outer-box'>
          <div className="search-container">
      <h2>Search Blog Posts</h2>

      <form onSubmit={handleSearch}>
        <div>
          <label>
            <input
              type="radio"
              value="country"
              checked={searchType === 'country'}
              onChange={() => setSearchType('country')}
            />
            Search by Country
          </label>
          <label>
            <input
              type="radio"
              value="username"
              checked={searchType === 'username'}
              onChange={() => setSearchType('username')}
            />
            Search by Username
          </label>
        </div>

        <input
          type="text"
          placeholder={`Enter ${searchType}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading || !searchTerm.trim()}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Display Search Results */}
      {posts.length > 0 && (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>By {post.username}</p>
              <p>{post.content}</p>
              <p><strong>Country: </strong>{post.country}</p>
              <p><strong>Date of Visit: </strong>{post.date_of_visit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
      </div>
  
  );
};

export default Search;
