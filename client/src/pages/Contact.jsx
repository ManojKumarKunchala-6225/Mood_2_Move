// src/pages/Contact.jsx
import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import emailjs from '@emailjs/browser'; // 1. Import EmailJS

const Contact = () => {
  const form = useRef(); // 2. Create a ref for the form
  const [feedback, setFeedback] = useState(""); // State for user feedback

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback("Sending..."); // Show a sending message

    // --- 3. Your personal EmailJS keys ---
    const serviceID = 'service_oi4h6lf';
    const templateID = 'template_hgu4g4o'; // ✅ Updated with your ID
    const publicKey = 'K8lKRa86qMGC9MH24';
    // --------------------------------------------------------------------

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log(result.text);
          setFeedback("✅ Thank you for reaching out! We'll get back to you soon.");
          setTimeout(() => setFeedback(""), 3000); // ✅ Add this line
          form.current.reset(); // Clear the form fields
      }, (error) => {
          console.log(error.text);
          setFeedback("❌ An error occurred. Please try again later.");
          setTimeout(() => setFeedback(""), 3000); // ✅ Add this line
      });
  };

  return (
    <>
      <Navbar/>

      {/* Contact Form Section */}
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage: 'url("background.jpg")',
        }}
      >
        <div className="bg-lightgreen bg-opacity-95 p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl relative text-left">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-teal-900 mt-4 mb-6">
            Contact Us
          </h2>

          <img
            className="h-48 sm:h-60 md:h-72 w-full md:w-[30em] rounded-lg mx-auto mb-6 object-cover"
            src="ContactUs.png"
            alt="Contact"
          />

          {/* The form now has the ref and the input names are updated */}
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center w-full"
          >
            <input
              type="text"
              name="from_name" // Must match your EmailJS template variable {{from_name}}
              placeholder="Your Name"
              required
              className="p-3 border border-gray-300 rounded-lg w-full max-w-md"
            />
            <input
              type="email"
              name="from_email" // Must match your EmailJS template variable {{from_email}}
              placeholder="Your Email"
              required
              className="p-3 border border-gray-300 rounded-lg w-full max-w-md"
            />
            <textarea
              name="message" // Must match your EmailJS template variable {{message}}
              placeholder="Your Message"
              required
              className="p-3 border border-gray-300 rounded-lg w-full max-w-md min-h-[100px] resize-y"
            />
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-900 text-white py-3 px-6 rounded-lg text-base self-center"
            >
              Send Message
            </button>
          </form>

          {/* Display feedback message to the user */}
          {feedback && (
            <p className="text-center text-lg text-white mt-4">
              {feedback}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
