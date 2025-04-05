"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function Waitlist() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen gap-8 font-sans">
      <Navbar />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 blur-3xl opacity-20"></div>

      <main className="w-full max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center space-y-12 py-12"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold text-white leading-tight"
          >
            Be the First to Experience{" "}
            <span className="gradient-animation bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg text-gray-200 max-w-2xl leading-relaxed"
          >
            Join our waitlist for early access, exclusive updates, and a sneak
            peek at what's to come. Don't miss the opportunity to shape the
            future with us.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-80"
              required
            />
            <Button type="submit" variant="default">
              Join the Waitlist
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8"
          >
            <p className="text-lg font-medium text-gray-100">
              Gain early access to exciting features, interact with our
              community, and influence the direction of innovation.
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}