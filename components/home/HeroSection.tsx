'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-brand-background via-white to-brand-background relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-accent/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start"
          >
            <Image
              src="/image/hero-bone.png"   // <-- your image
              alt="MillionBone Hero"
              width={520}
              height={520}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* RIGHT: Content */}
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-brand-primary mb-6 tracking-tight"
            >
              HODL THE BONE
              <br />
              <span className="text-brand-accent">HUNT THE MOON</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-brand-secondary mb-8 max-w-xl font-medium"
            >
              MILLIONBONE ($MBONE) is the premium community-driven meme coin built
              for diamond hands. Join our pack of loyal holders and experience the
              power of unity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(254, 127, 45, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-accent text-white px-8 py-4 rounded-full text-xl font-bold flex items-center space-x-2 shadow-lg"
              >
                <span>BUY $MBONE NOW</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-brand-primary text-brand-primary px-8 py-4 rounded-full text-xl font-bold hover:bg-brand-primary hover:text-white transition-all"
              >
                VIEW TOKENOMICS
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-10 text-brand-secondary/70"
            >
              <p className="text-lg font-medium">Contract Address</p>
              <code className="text-sm bg-white/60 px-4 py-2 rounded-lg mt-2 inline-block font-mono">
                0x742d35Cc6694C81D4b8f0D8A1DA1EE85A7C6c0B3
              </code>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
