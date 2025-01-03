// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Use react-router-dom for routing in Vite.js
import image4 from '../images/image4.png';  // Import image4

export default function NotFound() {
  const [hover, setHover] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-700 flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* <img
          src={image1}  // Use local image1
          alt="Desert landscape"
          className="w-full h-full object-cover"
        /> */}
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* <img
            src={image2}  // Use local image2
            alt="404"
            width={400}
            height={200}
            className="mx-auto"
          /> */}
        </motion.div>

        {/* Character and Speeder */}
        <div className="relative">
          <motion.div
            animate={{
              x: hover ? [0, 10, 0] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-20"
          >
            {/* <img
              src={image3}  // Use local image3
              alt="Character"
              width={100}
              height={100}
              className="mx-auto mb-4"
            /> */}
          </motion.div>
          
          <motion.div
            animate={{
              x: hover ? [0, 20, 0] : 0,
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <img
              src={image4}  // Use local image4
              alt="Landspeeder"
              width={200}
              height={100}
              className="mx-auto bac"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 space-y-4"
        >
          <h1 className="text-4xl font-bold text-backdrop-blur drop-shadow-lg">
            This is not the web page you are looking for
          </h1>
          
          <p className="text-white/90 text-lg max-w-xl mx-auto">
            It seems you've wandered into the desert. Let's get you back to safety.
          </p>

          <Link 
            to="/" // Use "to" instead of "href" for react-router-dom
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg
              border-2 border-white/30 hover:bg-white/30 transition-all duration-300
              font-semibold mt-6"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}