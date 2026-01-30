'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Shield, Rocket, ArrowRight } from 'lucide-react';

export default function AboutPreviewSection() {
  const features = [
    {
      image: '/icons/community2.png',  
      title: 'Community First',
      description: 'Built by the community, for the community. Every decision is made together.'
    },
    {
      image: '/icons/transparency.png',
      title: 'Fully Transparent',
      description: 'Open source, audited smart contracts. Complete transparency in all operations.'
    },
    {
      image: '/icons/moonmission.png',
      title: 'Moon Mission',
      description: 'Diamond hands only. We are building something that lasts forever.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-background to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-brand-primary mb-6">
              WELCOME TO THE
              <span className="text-brand-accent block">MBONE PACK</span>
            </h2>
            
            <p className="text-xl text-brand-secondary mb-8 leading-relaxed">
              MILLIONBONE isn't just another meme coin. We're building a community of diamond hands 
              who believe in the power of collective strength. Every bone holder is part of our pack.
            </p>

            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-bold flex items-center space-x-2 hover:bg-opacity-90 transition-all shadow-lg"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right side - Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 hover-lift shadow-lg border"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-accent/10 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-7 w-7 object-contain"
                    />

                  </div>
                  <div>
                    <h3 className="text-brand-primary font-bold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-brand-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}