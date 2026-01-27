'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function FooterAnimated() {
  const [email, setEmail] = useState('')

  return (
    <footer className="relative bg-gradient-to-t from-blue-50/50 to-white overflow-hidden border-t border-gray-100">
      {/* Animated soft background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at 50% 0%, #e0f2ff, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8"
        >
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-2xl font-bold tracking-tight">
              Scientifically<span className="text-blue-600">Fit</span>
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
              A science-backed platform for human functioning — helping individuals, families, 
              and modern professionals adapt, recover, and thrive.
            </p>

            {/* Newsletter - Best Responsive Design */}
            <div className="mt-8 w-full max-w-md">
              <p className="text-sm font-semibold text-gray-900 mb-4">Join 10k+ readers</p>
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
                
                <div className="relative bg-white rounded-2xl p-1.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-sm border border-gray-200 focus-within:border-blue-400 transition-colors">
                  <div className="flex-1 flex items-center px-3 py-2 sm:py-0">
                    <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <label htmlFor="footer-email" className="sr-only">Email Address</label>
                    <input
                      id="footer-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email..."
                      className="w-full ml-3 text-sm bg-transparent border-none focus:ring-0 outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden px-6 py-3 cursor-pointer sm:py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-md group/btn shrink-0"
                  >
                    <span className="relative z-10">Subscribe</span>
                    {/* Improved Shimmer Effect (Left to Right) */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    />
                  </motion.button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center mt-4 gap-y-2">
                <div className="flex items-center text-[11px] text-gray-500 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                  Weekly insights
                </div>
                <div className="mx-3 hidden sm:block h-1 w-1 rounded-full bg-gray-300"></div>
                <div className="text-[11px] text-gray-500 font-medium italic">
                  No spam. Just science.
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns - Responsive Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterColumn title="Modules" links={[
              { name: "Mental Fitness", href: "/modules/mental" },
              { name: "Social & Relationship", href: "/modules/social" },
              { name: "Environmental Fitness", href: "/modules/environmental" },
              { name: "Family Fitness", href: "/modules/family" },
            ]} />

            <FooterColumn title="Programs" links={[
              { name: "Focus Rebuild", href: "/programs/focus-rebuild" },
              { name: "Burnout Reset", href: "/programs/burnout-reset" },
              { name: "Sleep Reset", href: "/programs/sleep-reset" },
            ]} />

            <FooterColumn title="Resources" links={[
              { name: "Learn", href: "/learn" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
              { name: "Assessment", href: "/start-here" },
            ]} />
          </div>
        </motion.div>

        {/* Bottom legal bar */}
        <div className="mt-16 pt-8 border-t border-gray-200/60 text-gray-500 text-[10px] sm:text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ScientificallyFit. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Developed by</span>
            <Link href="https://dataexperts360.com/" className='text-blue-600 font-medium hover:underline'>
              Data Experts 360
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string, links: { name: string, href: string }[] }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <motion.li
            key={link.href}
            whileHover={{ x: 4 }}
            className="group"
          >
            <Link 
              href={link.href} 
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
            >
              {link.name}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}