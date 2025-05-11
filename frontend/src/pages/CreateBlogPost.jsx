import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlogPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch list of countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2, // You can also use cca3 or name.common as identifiers
        }));
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching country data:", error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    setCountry(countryName);

    if (countryName) {
      // Fetch details of the selected country
      try {
        const response = await axios.get(`http://localhost:5000/api/country/${countryName}`);
        setCountryDetails(response.data);
      } catch (error) {
        console.error("Error fetching country details:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to create a blog post.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/blog/create",
        {
          title,
          content,
          country,
          date_of_visit: dateOfVisit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.data.success) {
        alert("Blog post created successfully!");
        navigate("/");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error(
        "Error creating blog post:",
        error.response ? error.response.data : error.message
      );

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Error creating blog post. Please try again.");
      }
    }
  };

  return (
    <div className="create-blog-post">
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="8"
        />
        <select
          value={country}
          onChange={handleCountryChange}
          required
        >
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        {countryDetails && (
          <div className="country-details">
            <p><strong>Capital:</strong> {countryDetails.capital}</p>
            <p><strong>Currency:</strong> {countryDetails.currency}</p>
            <p>
              <strong>Flag:</strong>
              <img
                src={countryDetails.flag}
                alt={`${countryDetails.name} flag`}
                style={{ width: "100px" }}
              />
            </p>
          </div>
        )}

        <input
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
