'use client'

import { Logo, TypingEffect } from '@/components'
import {
  fadeIn,
  navLinkVariants,
  slideIn,
  staggerContainer,
} from '@/lib/motion'
// pages/index.tsx
import { motion } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  {
    name: 'Features',
    href: '#features',
  },
  {
    name: 'How It Works',
    href: '#how-it-works',
  },
  {
    name: 'Contact',
    href: '#contact',
  },
]

const HomePage = () => {
  return (
    <div className="relative">
      {/* Header Section */}
      <nav className="py-8 bg-transparent text-base md:text-xl text-white font-semibold absolute top-0 z-50 left-1/2 -translate-x-1/2 w-full">
        <ul className="flex items-center justify-center gap-5">
          {navLinks.map((link, idx) => (
            <motion.li
              variants={navLinkVariants(idx)}
              initial="hidden"
              whileInView="show"
              key={link.name}
              className="hover:-translate-y-1"
            >
              <Link
                href={link.href}
                className="hover:text-pink-500 transition duration-300"
              >
                {link.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen relative overflow-hidden">
        <div className="h-screen w-screen absolute top-0 right-0 landing-gradient -z-50" />
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col items-center justify-center gap-2 px-4"
        >
          <motion.div className="mb-4">
            <Logo full className="md:h-20 h-12 w-fit" />
          </motion.div>
          <motion.div
            variants={staggerContainer(0.2, 1)}
            initial="hidden"
            whileInView="show"
          >
            <TypingEffect
              title="Book Your Doctor, Anytime, Anywhere"
              textStyles="text-center text-2xl sm:text-6xl font-bold mb-4 sm:mb-8 leading-tight text-white"
            />
          </motion.div>
          <p className="text-base text-center sm:text-lg mb-4 max-w-xl mx-auto">
            With DocLink, scheduling an appointment with your doctor has never
            been easier. Experience hassle-free healthcare at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm sm:text-base font-semibold">
            <motion.div
              variants={slideIn('left', 'spring', 0.3, 1)}
              className="bg-pink-500 text-dark-200 py-3 px-6 rounded-lg shadow-lg hover:bg-pink-600 transition duration-300"
            >
              <Link href="/signup">Create Appointment</Link>
            </motion.div>
            <motion.div
              variants={slideIn('right', 'spring', 0.3, 1)}
              className="border border-pink-500 text-pink-500 py-3 px-6 rounded-lg hover:bg-pink-500 hover:text-white transition duration-300 shadow-md"
            >
              <Link href="#features">Learn More</Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      {/* <section id="features" className="py-20 px-4 sm:px-10 bg-[#1a1a1a]">
        <h3 className="text-4xl font-bold text-center mb-10">Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {['Easy Booking', 'Instant Confirmation', '24/7 Access'].map(
            (feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <h4 className="text-2xl font-semibold mb-2">{feature}</h4>
                <p className="text-gray-400">
                  Experience seamless {feature.toLowerCase()} with our
                  user-friendly app.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section> */}

      {/* How It Works Section */}
      {/* <section id="how-it-works" className="py-20 px-4">
        <h3 className="text-4xl font-bold text-center mb-10">How It Works</h3>
        <div className="flex flex-col items-center space-y-10">
          {['Select a Doctor', 'Choose Time', 'Confirm Appointment'].map(
            (step, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-[#2a2a2a] p-6 rounded-lg shadow-lg w-full sm:w-80 text-center"
              >
                <h4 className="text-2xl font-semibold mb-2">{step}</h4>
                <p className="text-gray-400">
                  Follow these simple steps to book your appointment.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section> */}

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-20 bg-[#1a1a1a] px-4">
        <h3 className="text-4xl font-bold text-center mb-10">
          What Our Users Say
        </h3>
        <div className="flex flex-col items-center space-y-5">
          {[
            '“This app changed my life!” - User 1',
            '“A seamless experience every time!” - User 2',
            '“I love how easy it is to book my appointments!” - User 3',
          ].map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              className="bg-[#2a2a2a] p-5 rounded-lg shadow-lg w-full sm:w-80 text-center"
            >
              <p className="text-gray-400">{quote}</p>
            </motion.div>
          ))}
        </div>
      </section> */}

      {/* Contact Section */}
      {/* <section id="contact" className="py-20 text-center bg-[#1a1a1a] px-4">
        <h3 className="text-4xl font-bold mb-5">
          Have Questions? Get In Touch!
        </h3>
        <button className="bg-pink-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-pink-600 transition duration-300">
          Contact Us
        </button>
      </section> */}

      {/* Footer */}
      {/* <footer className="py-5 text-center bg-[#0c0c0c]">
        <p className="text-gray-400">
          © {new Date().getFullYear()} DocLink. All rights reserved.
        </p>
      </footer> */}
    </div>
  )
}

export default HomePage
