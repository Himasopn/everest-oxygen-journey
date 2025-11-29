import { motion, AnimatePresence } from "framer-motion";

interface InfoCardProps {
  altitude: number;
}

const InfoCard = ({ altitude }: InfoCardProps) => {
  const getInfo = () => {
    if (altitude < 500) {
      return {
        title: "Sea Level Zone",
        description: "Normal oxygen levels. The human body functions optimally here with 100% oxygen availability.",
        tip: "This is where most of humanity lives and thrives.",
        emoji: "🌊",
      };
    } else if (altitude < 2000) {
      return {
        title: "Low Altitude",
        description: "Slight decrease in oxygen. Most people won't notice any difference at this height.",
        tip: "Commercial aircraft cabins are pressurized to this altitude.",
        emoji: "🏙️",
      };
    } else if (altitude < 3500) {
      return {
        title: "Moderate Altitude",
        description: "Oxygen levels drop to ~85%. Some people may feel mild effects like shortness of breath.",
        tip: "Acclimatization begins to become important here.",
        emoji: "⛰️",
      };
    } else if (altitude < 5500) {
      return {
        title: "High Altitude",
        description: "Oxygen at ~60-70%. Risk of altitude sickness increases. Acclimatization is crucial.",
        tip: "Everest Base Camp is at 5,364m. Climbers spend weeks acclimatizing.",
        emoji: "🏔️",
      };
    } else if (altitude < 7500) {
      return {
        title: "Very High Altitude",
        description: "Oxygen at ~45-50%. Extended stays become dangerous without supplemental oxygen.",
        tip: "This is known as the 'Death Zone' approach. Human body cannot acclimatize.",
        emoji: "❄️",
      };
    } else {
      return {
        title: "Death Zone",
        description: "Oxygen below 40%. The human body is actively dying. Supplemental oxygen essential.",
        tip: "Above 8,000m, the body cannot recover. Every second counts.",
        emoji: "☠️",
      };
    }
  };

  const info = getInfo();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={info.title}
        className="glass-panel rounded-2xl p-5 max-w-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{info.emoji}</span>
          <h3 className="text-lg font-semibold">{info.title}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {info.description}
        </p>
        
        <div className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
          <span className="text-sm">💡</span>
          <p className="text-xs text-muted-foreground">{info.tip}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InfoCard;
