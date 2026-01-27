'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import Link from 'next/link'

const navLinks = [
  { name: 'Modules', href: '/modules', desc: 'Core training units' },
  { name: 'Programs', href: '/programs', desc: 'Tailored fitness paths' },
  { name: 'Learn', href: '/learn', desc: 'Scientific resources' },
  { name: 'About', href: '/about', desc: 'Our philosophy' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-[60] bg-white/90 backdrop-blur-md border-b border-zinc-200 dark:bg-zinc-950/90 dark:border-zinc-800 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tighter text-black dark:text-white"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center text-white text-[10px] sm:text-xs">
              SF
            </div>
            Scientifically<span className="text-blue-600">Fit</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 lg:px-5 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors rounded-full hover:bg-white dark:hover:bg-zinc-800"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/assessment"
              className="hidden md:block px-4 lg:px-6 py-2 bg-blue-600 text-white rounded-full text-xs lg:text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              Start Free
            </Link>

            {/* Modern Hamburger */}
        <button
  onClick={() => setIsOpen(!isOpen)}
  className="md:hidden w-9 h-9 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-full text-black dark:text-white transition"
>
  <AnimatePresence mode="wait">
    {!isOpen ? (
      <motion.span
        key="menu"
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <Menu size={18} />
      </motion.span>
    ) : (
      <motion.span
        key="close"
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <X size={18} />
      </motion.span>
    )}
  </AnimatePresence>
</button>

          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[80] bg-white dark:bg-zinc-950 rounded-t-[2.2rem] border-t border-zinc-200 dark:border-zinc-800 p-5 md:hidden shadow-2xl"
            >
              <div className="w-10 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full mx-auto mb-5" />

              <div className="grid gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 hover:border-blue-500/30 border border-transparent transition-all"
                    >
                      <div>
                        <div className="text-sm font-semibold dark:text-white">
                          {link.name}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {link.desc}
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        →
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/assessment"
                onClick={() => setIsOpen(false)}
                className="mt-5 w-full flex items-center justify-center py-3.5 bg-blue-600 text-white rounded-xl text-base font-bold shadow-xl shadow-blue-500/20"
              >
                Start Assessment
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
