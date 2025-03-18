"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      className="py-24 relative overflow-hidden"
      id="cta"
      ref={sectionRef}
    >
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/0"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
        
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Experience the Future of AI Voice Assistants?
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Start talking to Rexta AI today and discover a more natural, empathic way to interact with technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Start Talking to Rexta Now
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="ml-1">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.75 6.75l5.5 5.25-5.5 5.25M19 12H4.75"></path>
              </svg>
            </Link>
            
            <Link
              href="https://github.com/yourusername/rexta-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background text-foreground border border-border hover:bg-muted px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              View on GitHub
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="ml-1">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.75 8.75l3.5 3.25-3.5 3.25"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.25 12a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0z"></path>
              </svg>
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground">Trusted by developers and companies worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              {['Company A', 'Company B', 'Company C', 'Company D'].map((company, i) => (
                <div key={i} className="text-muted-foreground/50 font-semibold text-xl">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(30px, 20px) rotate(180deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection; 