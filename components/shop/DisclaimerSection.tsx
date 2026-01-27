'use client';

import { motion } from 'framer-motion';
import { TriangleAlert as AlertTriangle, Shield, Info } from 'lucide-react';

export default function DisclaimerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border">
            <div className="flex justify-center mb-6">
              <div className="bg-brand-accent/20 w-16 h-16 rounded-full flex items-center justify-center">
                <Info className="h-8 w-8 text-brand-accent" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-brand-primary mb-6">
              IMPORTANT DISCLAIMER
            </h2>

            <div className="bg-white rounded-xl p-6 mb-6 border-l-4 border-brand-accent">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="h-6 w-6 text-brand-accent" />
                <span className="text-brand-primary font-bold text-lg">Merchandise Notice</span>
              </div>
              <p className="text-brand-secondary text-lg leading-relaxed">
                <strong>Merchandise is community merchandise and does not represent financial products or investment advice.</strong>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 text-left">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-brand-primary">What This Is</h3>
                </div>
                <ul className="space-y-2 text-brand-secondary">
                  <li>• Community merchandise and apparel</li>
                  <li>• Physical products for personal use</li>
                  <li>• Way to show community support</li>
                  <li>• High-quality branded items</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 text-left">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-brand-primary">What This Is NOT</h3>
                </div>
                <ul className="space-y-2 text-brand-secondary">
                  <li>• Financial investment products</li>
                  <li>• Securities or investment advice</li>
                  <li>• Guaranteed returns or profits</li>
                  <li>• Official company stock or shares</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-brand-primary mb-4 text-lg">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-brand-accent font-bold mb-1">Community Driven</div>
                  <div className="text-brand-secondary text-sm">Made by fans, for fans</div>
                </div>
                <div>
                  <div className="text-brand-accent font-bold mb-1">No Financial Claims</div>
                  <div className="text-brand-secondary text-sm">Pure merchandise only</div>
                </div>
                <div>
                  <div className="text-brand-accent font-bold mb-1">Support Community</div>
                  <div className="text-brand-secondary text-sm">Proceeds support development</div>
                </div>
              </div>
            </div>

            <p className="text-brand-secondary/70 text-center mt-8 text-sm">
              By purchasing merchandise, you acknowledge that you understand these items are 
              community products and not financial instruments. Always do your own research 
              regarding any cryptocurrency investments.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}