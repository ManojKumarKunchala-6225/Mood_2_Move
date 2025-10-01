import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from "./Navbar";

// --- Data Source for Search Suggestions ---
const famousPlaces = [
  'Agra', 'Ahmedabad', 'Ajanta Caves', 'Alleppey', 'Amritsar',
  'Bangalore', 'Bodh Gaya', 'Bhubaneswar',
  'Chennai', 'Cherrapunji', 'Coorg',
  'Darjeeling', 'Delhi', 'Dharamshala',
  'Ellora Caves',
  'Goa', 'Gokarna', 'Gangtok',
  'Hampi', 'Haridwar', 'Hyderabad',
  'Jaipur', 'Jaisalmer', 'Jodhpur',
  'Khajuraho', 'Kochi', 'Kolkata', 'Kanyakumari',
  'Leh-Ladakh', 'Lucknow',
  'Madurai', 'Manali', 'Mumbai', 'Munnar', 'Mysore',
  'Nainital',
  'Ooty',
  'Puducherry', 'Pune', 'Puri',
  'Rishikesh', 'Rann of Kutch',
  'Shimla', 'Srinagar',
  'Thanjavur', 'Tirupati',
  'Udaipur',
  'Varanasi', 'Visakhapatnam',
];

// Carousel images
const carouselImages = [
  { src: '/mood.jpg', alt: 'A serene lake reflecting a colorful sunset, evoking a calm mood.' },
  { src: '/people.jpg', alt: 'A vibrant street festival with a diverse crowd of people.' },
  { src: '/sky.jpeg', alt: 'A breathtaking view of the starry night sky from a mountaintop.' },
  { src: '/adev.jpeg', alt: 'Devotional temple surrounded by lights and peaceful atmosphere.' },
  { src: '/mandir.webp', alt: 'Beautiful ancient temple glowing during sunset.' },
];

// Typewriter component
const Typewriter = ({ text, speed = 100, pauseDuration = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    let isPaused = false;
    const typingInterval = setInterval(() => {
      if (isPaused) return;
      if (i < text.length) {
        setIsTyping(true);
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        isPaused = true;
        setTimeout(() => {
          setDisplayedText('');
          i = 0;
          isPaused = false;
        }, pauseDuration);
      }
    }, speed);
    return () => clearInterval(typingInterval);
  }, [text, speed, pauseDuration]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (!isTyping) {
        setShowCursor(show => !show);
      } else {
        setShowCursor(true);
      }
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isTyping]);

  return (
    <h1 className="text-4xl sm:text-3xl md:text-2xl font-extrabold leading-tight">
      {displayedText}
      <span style={{ color: 'white', visibility: showCursor ? 'visible' : 'hidden' }}>|</span>
    </h1>
  );
};

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionType, setTransitionType] = useState('fade');
  const navigate = useNavigate(); // Initialize navigate

  // --- State for the search functionality ---
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchWrapperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitionType(prev =>
        prev === 'fade' ? 'slide' : prev === 'slide' ? 'zoom' : 'fade'
      );
      setCurrentIndex(prevIndex =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- Effect to handle clicks outside the search box ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchWrapperRef]);

  // --- Logic to handle search input changes ---
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filteredSuggestions = famousPlaces.filter(place =>
        place.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    // Navigate to a search results page
    navigate(`/search-results?q=${suggestion}`);
  };

  return (
    <>
      {/* Custom carousel styles */}
      <style>
        {`
          .custom-carousel {
            width: 100%;
            max-width: 500px;
            height: 400px;
            border-radius: 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            position: relative;
            overflow: hidden;
          }
          .carousel-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 1s ease-in-out;
          }
          .fade.active {
            opacity: 1;
          }
          .slide.active {
            opacity: 1;
            transform: translateX(0);
            transition: transform 1s ease, opacity 1s ease;
          }
          .slide {
            transform: translateX(100%);
          }
          .zoom.active {
            opacity: 1;
            transform: scale(1);
            transition: transform 1s ease, opacity 1s ease;
          }
          .zoom {
            transform: scale(1.2);
          }
        `}
      </style>

      <div className="relative min-h-screen w-full font-sans text-white overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 w-full h-full z-[-2] bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/background.jpg')" }}
        ></div>
        <Navbar />
          {/* Search bar */}
      <div id="searchbar" ref={searchWrapperRef} className="relative w-full max-w-md mx-auto py-4 mt-20 z-20">
        <input
          type="search"
          id="search"
          placeholder="🔍 Search your destination"
          value={query}
          onChange={handleSearchChange}
          autoComplete="off"
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto text-black">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
        {/* Main */}
        <main className="relative z-10 flex items-center justify-center min-h-screen pt-0 pb-8 px-2 -mt-20">
          <div className="w-full max-w-screen-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="flex flex-col text-left items-start">
              <div className="mb-4 h-19">
                <Typewriter text="Let Your Mood Will Decide Your Next Move." speed={80} pauseDuration={2000} />
              </div>
              <p className="max-w-xl text-base text-white/80 mb-8 leading-relaxed">
                Discover India's most captivating destinations tailored to your vibe. From serene temples to thrilling treks, your perfect journey awaits. Our website showcases a variety of famous tourist destinations in India, highlighting unique experiences in clothing, devotional sites, entertainment, trekking, historical locations, and wildlife. We also offer tailored trips for solo travelers and couples, allowing you to fully experience the rich diversity of India's offerings through our platform.
              </p>
              
              {/* ✅ CORRECTED EXPLORE BUTTON */}
              <Link 
                to="/explore" 
                className="h-14 px-10 flex items-center justify-center bg-green-500 text-red font-bold rounded-lg whitespace-nowrap hover:bg-red-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Explore
              </Link>

            </div>

            {/* Right - Carousel */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="custom-carousel">
                {carouselImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`carousel-image ${transitionType} ${index === currentIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Home;
