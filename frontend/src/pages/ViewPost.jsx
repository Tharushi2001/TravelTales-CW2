import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import bannerImg from "../img/travel.jpg";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [countryDetails, setCountryDetails] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/blog/${id}`);
        setPost(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load the blog post.");
      }
    };

    fetchPost();
  }, [id]);

  // Fetch country details (flag, capital, currency)
  useEffect(() => {
    const fetchCountryDetails = async (countryName) => {
      if (!countryName) {
        console.error("Country name is missing.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/country/${countryName}`);
        setCountryDetails(res.data);
      } catch (err) {
        console.error("Error fetching country details:", err);
      }
    };

    if (post && post.country) {
      fetchCountryDetails(post.country);
    } else {
      setError("Country name is not available.");
    }
  }, [post]);

  if (error) {
    return (
      <div className="view-post-container">
        <h2>{error}</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!post) {
    return <div className="view-post-container"><p>Loading...</p></div>;
  }

  const { country, capital, currency, flag } = countryDetails;

  return (
    <div>
      {/* Banner Image with Title Overlay */}
      <div className="SingleBanner-image">
        <div className="overlay"></div>
        <img src={bannerImg} alt="Banner" className="singleblog-img" />
        <div className="singleblog-title">{post.title}</div>
      </div>

      {/* Blog Post Content */}
      <div className="view-post-container">
        <div className="post-header">
          <div className="post-author">
            <strong>Posted by:</strong> {post.username || "Unknown"}
          </div>
          <div className="post-info">
            <p>
              <strong>Country:{post.country}</strong> {country}{" "}
              {flag && (
                <img
                  src={flag}
                  alt={`${country} flag`}
                  style={{
                    width: "24px",
                    height: "16px",
                    marginLeft: "8px",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </p>
            {capital && <p><strong>Capital:</strong> {capital}</p>}
            {currency && <p><strong>Currency:</strong> {currency}</p>}
            <p><strong>Date of Visit:</strong> {new Date(post.date_of_visit).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="post-body">
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
