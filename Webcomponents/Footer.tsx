'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function FooterAnimated() {
  const [email, setEmail] = useState('')

  return (
    <footer className="relative bg-gradient-to-t from-blue-50 to-white overflow-hidden m-0 p-0">
      {/* Animated wave background */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.6, 1, 0.6] }} // soft breathing
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(circle at top, #e0f2ff, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative max-w-7xl mx-auto px-6 py-16 sm:py-20 grid grid-cols-1 md:grid-cols-5 gap-12 z-10"
      >
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Scientifically<span className="text-blue-600">Fit</span>
          </h3>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-sm">
            A science-backed platform for human functioning — helping individuals, families, 
            and modern professionals adapt, recover, and thrive.
          </p>

          {/* Newsletter */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row gap-2 sm:gap-0 w-full max-w-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 w-full"
            />
            <button className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-full sm:rounded-l-none sm:rounded-r-full hover:bg-blue-700 transition w-full sm:w-auto">
              Subscribe
            </button>
          </motion.div>
        </div>

        {/* Links Columns */}
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
          { name: "Start Assessment", href: "/start-here" },
        ]} />
      </motion.div>

      {/* Bottom legal bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-t border-gray-200 text-gray-500 text-xs flex flex-col sm:flex-row justify-between items-center px-6 py-6 gap-2 z-10 relative"
      >
        <span>© {new Date().getFullYear()} ScientificallyFit. All rights reserved.</span>
        <div className="flex flex-wrap gap-4">
          <AnimatedLink href="/privacy">Privacy</AnimatedLink>
          <AnimatedLink href="/terms">Terms</AnimatedLink>
          <AnimatedLink href="/disclaimer">Disclaimer</AnimatedLink>
        </div>
      </motion.div>
    </footer>
  )
}

// Reusable Column
function FooterColumn({ title, links }: { title: string, links: { name: string, href: string }[] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-4">{title}</h4>
      <ul className="space-y-3 text-gray-600">
        {links.map((link) => (
          <motion.li
            key={link.href}
            whileHover={{ x: 6, color: '#2563EB' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href={link.href} className="hover:text-blue-600 transition">{link.name}</Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

// Animated bottom links
function AnimatedLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link href={href} className="hover:text-gray-900 transition">{children}</Link>
    </motion.div>
  )
}
