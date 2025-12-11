import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl blur-xl" />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
        <Quote className="w-10 h-10 text-[#fff3b0]/80 mb-4" />

        <p className="text-white/90 text-lg mb-6 leading-relaxed italic">
          "{testimonial.quote}"
        </p>

        <div className="flex items-center gap-4">
          <img
            src={testimonial.imageUrl}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full border-2 border-white/40 object-cover"
          />
          <div>
            <p className="font-bold text-white">{testimonial.name}</p>
            <p className="text-sm text-white/70">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
