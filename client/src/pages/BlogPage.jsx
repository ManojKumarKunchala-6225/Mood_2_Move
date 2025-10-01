import React from 'react';
import Navbar from "./Navbar";

//== Component: Header ==//
const Header = () => (
  <Navbar/>
);

//== Component: Individual Blog Post ==//
const BlogPost = ({ image, title, excerpt, carouselImages }) => (
  <article>
    {/* Main Blog Post Section */}
    <div className="flex flex-wrap justify-center">
      <div className="w-full md:w-10/12 lg:w-9/12 mt-6 md:mt-0">
        <div className="blog_post">
          {/* Main image for the blog post */}
          <img src={image} alt={title} className="w-full rounded-lg shadow-md" />
          <div className="blog_details pt-8">
            <h1 className="font-playfair text-2xl md:text-3xl text-black font-bold">{title}</h1>
            {/* 'dangerouslySetInnerHTML' is used to render HTML content from a string */}
            <p className="mt-4 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
          </div>
        </div>
      </div>
    </div>

    {/* "My Experience" Section with Image Carousel */}
    <div className="myexperience mt-16">
      <h1 className="font-playfair text-2xl md:text-3xl text-heading-color font-bold mb-8 text-center">My experience at Auroville was...</h1>
      {/* This layout will stack on mobile and be side-by-side on large screens */}
      <div className="flex flex-col lg:flex-row -mx-4 items-center">
        {/* Bootstrap Carousel for images */}
        <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
          <div id="placeCarousel" className="carousel slide shadow-lg rounded-lg overflow-hidden" data-bs-ride="carousel">
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {carouselImages.map((_, index) => (
                <button
                  type="button"
                  data-bs-target="#placeCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                ></button>
              ))}
            </div>
            {/* Carousel Inner container for the images */}
            <div className="carousel-inner relative w-full overflow-hidden">
              {carouselImages.map((img, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''} relative float-left w-full`} key={index}>
                  <img src={img} className="block w-full" alt={`Auroville experience ${index + 1}`} />
                </div>
              ))}
            </div>
            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#placeCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#placeCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Experience Text */}
        <div className="w-full lg:w-1/2 px-4">
          <div id="experience" className="text-white text-base md:text-lg leading-relaxed">
            Visiting Auroville was a truly soul-refreshing experience. As I entered the township, I was immediately struck by the peaceful atmosphere and the lush greenery that surrounded me. The Matrimandir stood tall and majestic — its golden sphere glistening in the sunlight, symbolizing unity and inner peace. I spent time meditating in the quiet zone, and it felt like the world had paused around me.<br/><br/>
            The people I met were from diverse cultures, yet everyone was so welcoming and kind. I enjoyed a delicious organic meal at a local café, made entirely from ingredients grown in Auroville itself. Walking through the community spaces, art galleries, and eco-friendly workshops gave me a deep appreciation for sustainable living and harmony. <br/><br/>
            The slow, thoughtful pace of life there reminded me of the importance of mindfulness and living with intention. Auroville isn’t just a place — it’s an experience that stays with you long after you leave.
          </div>
        </div>
      </div>
    </div>
  </article>
);

//== Component: Main Blog Section Container ==//
const BlogSection = () => {
  const mainPost = {
    title: "Auroville In Brief",
    image: "mainimg.jpeg",
    excerpt: `<div style="color: white;">
      Auroville is a universal township in the making for a population of up to 50,000 people from around the world. The concept of Auroville - an ideal township devoted to an experiment in human unity - came to the Mother as early as the 1930s.<br/><br/>
      In the mid-1960s the concept was developed and put before the Govt. of India, who gave their backing and took it to the General Assembly of UNESCO.<br/><br/>
      In 1966 UNESCO passed a unanimous resolution commending Auroville as a project of international importance for the future of humanity, thereby giving their full encouragement.
    </div>`,
    carouselImages: [
      "auroville3.jpg", "auroville4.jpg", "auroville5.jpg", "auroville6.jpg", "auroville7.jpg",
      "auroville8.jpg", "auroville9.jpg", "auroville10.jpg", "auroville11.jpg"
    ]
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-lg">
        <div className="text-center mb-12">
          <h1 className="text-3xl text-amber-800 underline font-bold">New on the blog</h1>
          <h2 className="mt-6 text-xl md:text-2xl text-red-800 font-['Lucida_Sans']">
            "At last a place where one will be able to think only of the future: <span className="text-2xl md:text-4xl">Auroville</span> <sub>-The city of dawn-</sub>"
          </h2>
        </div>
        <BlogPost {...mainPost} />
      </div>
    </section>
  );
};

//== Component: Banner ==//
const Banner = () => (
  <section className="relative pt-24">
    <div className="container mx-auto px-4">
      <div id="intro" className="flex flex-col lg:flex-row items-center bg-cover bg-center bg-no-repeat backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-lg">
        {/* The main banner image */}
        <div id="img" className="w-full lg:w-1/2 min-h-[40vh] md:min-h-[60vh] bg-cover bg-center rounded-lg shadow-lg mb-6 lg:mb-0" style={{ backgroundImage: "url('auroville.jpg')" }}>
        </div>
        {/* The introductory text */}
        <div id="info" className="w-full lg:w-1/2 py-6 lg:py-20 pl-0 lg:pl-12 text-center lg:text-left">
          <h2 className="font-playfair text-3xl md:text-4xl text-heading-color font-bold leading-tight">Fill your travels with colour, culture & creativity.</h2>
          <p className="mt-5 text-white text-base md:text-lg leading-relaxed">
            We are team of Move2Move creators, a travel enthusiast passionate about uncovering hidden gems and cultural treasures across India and beyond.
            <br/><br/>
            We love exploring new places through local traditions, food, festivals, and scenic beauty. Discover my thoughtfully crafted itineraries, insider travel tips, and inspiring guides to help you plan meaningful journeys across India.
          </p>
        </div>
      </div>
      <div id="gap" className="py-8 mt-12 text-center backdrop-blur-sm p-4 sm:p-8 rounded-lg shadow-lg">
        <p className="text-lg md:text-2xl font-medium">
          So grab a cup of chai ☕, browse through our posts, and let your wanderlust take flight.
        </p>
        <span className="text-2xl md:text-3xl font-light mt-2 block">
          Adventure begins here!
        </span>
      </div>
    </div>
  </section>
);

//== Main App Component (Export this) ==//
export default function BlogPage() {
  return (
    <div
      className="font-roboto text-text-color text-sm leading-7 min-h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header />
      <div 
        className="text-center pt-24 pb-4 bg-cover bg-center shadow-md"
      >
        <h1 
          className="text-2xl md:text-3xl font-semibold text-white tracking-wider"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
        >
          Welcome to Our New Blog - Auroville
        </h1>
      </div>
      <main>
        <Banner />
        <BlogSection />
      </main>
    </div>
  );
}
