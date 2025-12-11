import { motion } from "framer-motion";

const StepCard = ({ number, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative group"
    >
      {/* Connection line (for desktop) */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-indigo-300 to-transparent -z-10" />
      )}

      <div className="flex flex-col items-center text-center">
        {/* Number circle */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="relative w-24 h-24 mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl">
            {number}
          </div>
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed max-w-xs">{description}</p>
      </div>
    </motion.div>
  );
};

export default StepCard;
