import { motion } from "framer-motion";

export default function QuickReplies({ options, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((option) => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          key={option}
          onClick={() => onSelect(option)}
          className="px-4 py-2 rounded-full text-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-white"
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}