import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}) => {
  const baseStyles = "font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";

  const variants = {
    primary: "bg-[#e09f3e] text-white hover:bg-[#9e2a2b] hover:shadow-xl hover:shadow-[#e09f3e]/30",
    secondary: "bg-[#335c67] text-white hover:bg-[#540b0e] hover:shadow-xl",
    outline: "border-2 border-[#335c67] text-[#335c67] hover:bg-[#335c67] hover:text-white hover:shadow-lg",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        {children}
        {icon && icon}
      </span>
    </motion.button>
  );
};

export default Button;
