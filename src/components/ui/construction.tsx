"use client";

import { motion } from "framer-motion";
import { CImage } from '@/components/ui/cimg';

export default function Construction() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center">

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col items-center text-center space-y-8 px-4 py-12"
      >
        {/* Animated Header */}
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold dark:text-white text-black drop-shadow-xl leading-tight max-w-3xl"
        >
          Exciting Things Are On the Way!
        </motion.h2>

        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <CImage
            id="scribble-header-people"
            alt="Illustration Header"
            className="w-full max-w-lg h-auto"
          />
        </motion.div>

        {/* Animated Text Content */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg dark:text-gray-200 text-neutral-700 max-w-2xl font-regular leading-relaxed drop-shadow-sm"
        >
          Thank you for your patience as we work hard to bring you an amazing experience. 
          Our application and services are currently in development, and we can't wait to 
          share them with you. Join our waitlist today to gain early access and be among 
          the first to explore our innovative solutions!
        </motion.p>

        {/* Button with Hover Animation */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          whileHover={{ scale: 1.1, boxShadow: "0 4px 20px rgba(255, 165, 0, 0.6)" }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-orange-600 transition-all duration-300 ease-in-out"
        >
          Join the Waitlist
        </motion.button>
      </motion.div>
    </div>
  );
}