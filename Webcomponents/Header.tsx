'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navHeight = 64 // px, adjust to match your navbar height (py + content)

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Scientifically<span className="text-blue-600">Fit</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/modules" className="hover:text-blue-600 transition">
              Modules
            </Link>
            <Link href="/programs" className="hover:text-blue-600 transition">
              Programs
            </Link>
            <Link href="/learn" className="hover:text-blue-600 transition">
              Learn
            </Link>
            <Link href="/about" className="hover:text-blue-600 transition">
              About
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/assessment"
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Start Here
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sm"
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm">
                <Link href="/modules" onClick={() => setOpen(false)}>Modules</Link>
                <Link href="/programs" onClick={() => setOpen(false)}>Programs</Link>
                <Link href="/learn" onClick={() => setOpen(false)}>Learn</Link>
                <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                <Link
                  href="/start-here"
                  onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white text-center hover:bg-blue-700 transition"
                >
                  Start Here
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div style={{ height: navHeight }} />
    </>
  )
}
