import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const BookCard = ({ book, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-[#e09f3e] rounded-3xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500" />

      <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Image container with overlay */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Floating badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#335c67] flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {book.distance}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-500 mb-4">by {book.author}</p>

          <motion.button
            whileHover={{ x: 5 }}
            className="w-full bg-[#e09f3e] hover:bg-[#9e2a2b] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
          >
            Request Swap
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
