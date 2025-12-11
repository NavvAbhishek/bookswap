import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.png";

// Icons from lucide-react
import {
  Users,
  HeartHandshake,
  Leaf,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Globe,
  Zap,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Button from "../components/ui/Button";
import FeatureCard from "../components/ui/FeatureCard";
import BookCard from "../components/ui/BookCard";
import TestimonialCard from "../components/ui/TestimonialCard";
import StepCard from "../components/ui/StepCard";

const featuredBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    distance: "5 km",
    imageUrl:
      "https://placehold.co/300x450/6366f1/white?text=The+Midnight\nLibrary",
  },
  {
    id: 2,
    title: "Project Hail Mary",
    author: "Andy Weir",
    distance: "2 km",
    imageUrl:
      "https://placehold.co/300x450/10b981/white?text=Project\nHail+Mary",
  },
  {
    id: 3,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    distance: "8 km",
    imageUrl:
      "https://placehold.co/300x450/f59e0b/white?text=Klara+and\nthe+Sun",
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    distance: "12 km",
    imageUrl: "https://placehold.co/300x450/ef4444/white?text=Dune",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    distance: "3 km",
    imageUrl: "https://placehold.co/300x450/3b82f6/white?text=Atomic\nHabits",
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    distance: "6 km",
    imageUrl:
      "https://placehold.co/300x450/8b5cf6/white?text=The+Silent\nPatient",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    quote:
      "BookSwap is amazing! I've discovered so many great books and met fellow readers in my neighborhood. It's a game-changer for my wallet and the planet!",
    location: "New York",
    imageUrl: "https://placehold.co/100x100/ec4899/white?text=Sarah",
  },
  {
    id: 2,
    name: "David L.",
    quote:
      "The platform is so easy to use. I listed my old books and got a swap request within a day. Highly recommended for any book lover.",
    location: "San Francisco",
    imageUrl: "https://placehold.co/100x100/22c55e/white?text=David",
  },
  {
    id: 3,
    name: "Emily C.",
    quote:
      "As a student, buying books can be expensive. BookSwap has helped me save so much money while keeping my reading habit alive. Love the community aspect!",
    location: "Chicago",
    imageUrl: "https://placehold.co/100x100/f97316/white?text=Emily",
  },
];

// --- Main HomePage Component ---

const HomePage = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Hero Section with Premium Design */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <Navbar />

        <div className="relative container px-6 mx-auto mt-20 md:px-12">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-200 mb-6"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-600">
                  Join 100+ Active Readers
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Give Your Books
                </span>
                <br />
                <span className="text-gray-900">a New Chapter</span>
              </h1>

              <p className="max-w-md mx-auto md:mx-0 text-lg text-gray-600 mb-8 leading-relaxed">
                Join a vibrant community of readers. Exchange books you've
                finished for ones you're dying to read.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/signup">
                  <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Start Swapping for Free
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="backdrop-blur-xl"
                  >
                    Explore Books
                  </Button>
                </Link>
              </div>

              {/* Quick Stats with Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto md:mx-0"
              >
                {[
                  { number: "100+", label: "Active Members", icon: Users },
                  { number: "500+", label: "Books Exchanged", icon: TrendingUp },
                  { number: "10+", label: "Cities Connected", icon: Globe },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                    <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.number}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full md:w-1/2 flex justify-center relative"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <img
                  src={heroImg}
                  alt="Book Exchange"
                  className="relative w-full max-w-lg rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Value Proposition Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-6 mx-auto md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Why BookSwap?
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the benefits of joining our growing community
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={HeartHandshake}
              title="Save Money"
              description="Exchange books instead of buying new ones. Keep your wallet happy and your bookshelf fresh."
              gradient="from-indigo-500 to-purple-500"
              index={0}
            />
            <FeatureCard
              icon={Users}
              title="Meet Local Readers"
              description="Connect with book lovers near you and build a community around your shared passion for reading."
              gradient="from-purple-500 to-pink-500"
              index={1}
            />
            <FeatureCard
              icon={Leaf}
              title="Eco-Friendly"
              description="Give your books a second life. Swapping is a sustainable choice that reduces waste and promotes reuse."
              gradient="from-pink-500 to-rose-500"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <div className="container px-6 mx-auto text-center relative z-10 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-600">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Swapping in{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                4 Easy Steps
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Get started in minutes and begin your journey
            </p>
          </motion.div>

          <div className="grid gap-12 md:grid-cols-4 relative">
            <StepCard
              number="1"
              title="List Your Books"
              description="Take a photo and add details about the books you want to exchange."
              index={0}
            />
            <StepCard
              number="2"
              title="Match with Readers"
              description="Browse available books near you or get notified about wishlist matches."
              index={1}
            />
            <StepCard
              number="3"
              title="Arrange a Meetup"
              description="Use our secure chat to agree on a time and public place to swap."
              index={2}
            />
            <StepCard
              number="4"
              title="Swap and Enjoy!"
              description="Meet your swap partner, exchange books, and dive into your next adventure."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* 4. Featured Books Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-6 mx-auto md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recently Added{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Books
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Discover your next favorite read
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {featuredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/explore">
              <Button variant="outline" size="lg">
                Browse All Books
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

        <div className="container px-6 mx-auto md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Loved by Readers Like You
            </h2>
            <p className="text-white/80 text-lg">
              Join thousands of happy book swappers
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Download App Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[3rem] overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row items-center p-8 md:p-16 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2 text-white"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Take BookSwap Anywhere
                </h2>
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Our mobile app makes it even easier to discover, list, and
                  swap books on the go. Get notified instantly about new matches
                  and messages.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl"></span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/80">Download on the</p>
                      <p className="text-lg font-bold">App Store</p>
                    </div>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#"
                    className="flex items-center justify-center gap-3 px-6 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl text-white hover:bg-white/30 transition-all"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl">▶</span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-white/80">GET IT ON</p>
                      <p className="text-lg font-bold">Google Play</p>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop"
                    alt="Mobile App"
                    className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x600/8b5cf6/ffffff?text=BookSwap+App";
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />

        <div className="container px-6 py-16 mx-auto md:px-12 relative z-10">
          <div className="grid gap-12 md:grid-cols-4 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">B</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">BookSwap</h3>
                  <p className="text-xs text-gray-400">Exchange & Explore</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Giving books a new chapter. Join our community of passionate readers.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {["About Us", "FAQ", "Contact", "Blog"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-200" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-200" />
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-sm text-gray-400 mb-4">
                Join our newsletter for the latest updates.
              </p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <Button size="sm" className="w-full">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800 gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BookSwap. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, y: -2 }}
                  href={href}
                  className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
