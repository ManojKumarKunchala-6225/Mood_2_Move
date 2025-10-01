import React, { useState } from "react";
import axios from "axios"; // 1. Import axios
import { FaPlus, FaMinus } from 'react-icons/fa';
import Navbar from "./Navbar"; // Make sure to import your Navbar

export default function Explore() {
  const [selectedOptions, setSelectedOptions] = useState({
    mood: "", // Changed to store a single value
    people: "", // Changed to store a single value
    location: "", // Changed to store a single value
  });

  // 2. Add new state variables for results, loading, and errors
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Using radio buttons is better for single choice
  const handleRadioChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // 3. Update the handleSearch function to call the API
  const handleSearch = () => {
    // Check if user has selected one option for each category
    if (!selectedOptions.mood || !selectedOptions.people || !selectedOptions.location) {
      setError("Please select one option from each category.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    // The data format must match what the Django backend expects
    const searchData = {
      mood: selectedOptions.mood,
      people: selectedOptions.people,
      location: selectedOptions.location,
    };
    
    // Make the API call to your Django backend
    axios.post("http://127.0.0.1:8000/api/recommend/", searchData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
      .then(response => {
        setResults(response.data);
      })
      .catch(err => {
        if (err.response && err.response.status === 404) {
          setError("No matching places found for your preferences. Please try a different combination.");
        } else {
          setError("An error occurred while fetching results. Please make sure the backend server is running.");
        }
        console.error("API call error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // A reusable Radio component for single selection
  const RadioButton = ({ category, value, color, children }) => (
    <label className={`flex items-center space-x-2 bg-${color}-50 p-3 rounded-lg hover:bg-${color}-100 cursor-pointer transform hover:scale-105 transition`}>
      <input
        type="radio"
        name={category} // Use name to group radio buttons
        value={value}
        checked={selectedOptions[category] === value}
        onChange={() => handleRadioChange(category, value)}
        className={`w-5 h-5 text-${color}-600 focus:ring-${color}-500`}
      />
      <span>{children}</span>
    </label>
  );

  const ResultsDisplay = ({ results }) => {
    // State to keep track of which accordion item is open
    const [activeIndex, setActiveIndex] = useState(null);

    // Function to toggle the accordion
    const toggleAccordion = (index) => {
      // If the clicked item is already open, close it. Otherwise, open it.
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
      <div>
        {results.length > 0 && (
          <div className="bg-white shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Recommended Places</h2>
            <div className="space-y-4">
              {results.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Accordion Header: Click this to open/close */}
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-xl font-semibold text-gray-800">{item.place}</h3>
                    {/* Show a minus icon if open, plus icon if closed */}
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </div>

                  {/* Accordion Content: This part is shown or hidden */}
                  {activeIndex === index && (
                    <div className="p-4 border-t border-gray-200 bg-white">
                      <p><strong>Famous Foods:</strong> {item.food}</p>
                      <p><strong>Popular Hotels:</strong> {item.hotels}</p>
                      <p><strong>Shopping/Clothing:</strong> {item.shopping}</p>
                      <p><strong>Nearby Places:</strong> {item.nearby_places}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24" style={{ backgroundImage: "url('/background.jpg')" }} >
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Choose Your Travel Preferences
          </h1>

          {/* Mood Based Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Mood Based</h2>
            <div className="grid grid-cols-2 gap-4">
              <RadioButton category="mood" value="Peace" color="blue">Peace / Relax</RadioButton>
              <RadioButton category="mood" value="Adventure" color="blue">Adventurous / Fun</RadioButton>
              <RadioButton category="mood" value="Spiritual" color="blue">Spiritual / Devotional</RadioButton>
              <RadioButton category="mood" value="Romantic" color="blue">Romantic</RadioButton>
              <div className="col-span-2 flex justify-center">
                <RadioButton category="mood" value="Social" color="blue">Social / Festive</RadioButton>
              </div>
            </div>
          </section>

          {/* People Based Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">People Based</h2>
            <div className="grid grid-cols-2 gap-4">
              <RadioButton category="people" value="Solo" color="green">Solo</RadioButton>
              <RadioButton category="people" value="Family" color="green">Family</RadioButton>
              <RadioButton category="people" value="Couple" color="green">Couple</RadioButton>
              <RadioButton category="people" value="Friends" color="green">Friends</RadioButton>
            </div>
          </section>

          {/* Location Section */}
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Location</h2>
            <div className="grid grid-cols-2 gap-4">
              <RadioButton category="location" value="North" color="yellow">North</RadioButton>
              <RadioButton category="location" value="South" color="yellow">South</RadioButton>
            </div>
          </section>
          
          {/* Search Button */}
          <div className="text-center mt-6">
            <button 
              onClick={handleSearch}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition duration-300"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Searching...' : 'Search Places'}
            </button>
          </div>
        </div>

        {/* 4. Add a new section to display the results */}
        <div className="w-full max-w-2xl mt-8">
          {error && <p className="text-center text-red-500 bg-white p-3 rounded-lg">{error}</p>}
          
          <ResultsDisplay results={results} />
        </div>
      </div>
    </>
  );
}
