import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatPanelProps {
  icon: ReactNode;
  label: string;
  value: string;
  subValue?: string;
  color: string;
  percentage: number;
}

const StatPanel = ({ icon, label, value, subValue, color, percentage }: StatPanelProps) => {
  return (
    <motion.div 
      className="glass-panel rounded-2xl p-4 min-w-[140px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      
      <motion.div 
        className="text-2xl font-bold mb-2"
        style={{ color }}
        key={value}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {value}
      </motion.div>
      
      {subValue && (
        <div className="text-xs text-muted-foreground mb-3">{subValue}</div>
      )}

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </motion.div>
  );
};

export default StatPanel;
