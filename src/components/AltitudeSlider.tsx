import { motion } from "framer-motion";

interface AltitudeSliderProps {
  altitude: number;
  maxAltitude: number;
  onChange: (value: number) => void;
}

const AltitudeSlider = ({ altitude, maxAltitude, onChange }: AltitudeSliderProps) => {
  const percentage = (altitude / maxAltitude) * 100;

  const landmarks = [
    { height: 0, label: "Sea Level", emoji: "🌊" },
    { height: 828, label: "Burj Khalifa", emoji: "🏙️" },
    { height: 2500, label: "Cloud Base", emoji: "☁️" },
    { height: 3800, label: "Oxygen Zone", emoji: "😮‍💨" },
    { height: 5364, label: "Everest Base", emoji: "⛺" },
    { height: 8849, label: "Mt. Everest", emoji: "🏔️" },
  ];

  return (
    <div className="glass-panel rounded-2xl p-4 w-20 h-[70vh] flex flex-col items-center">
      <span className="text-xs font-medium text-muted-foreground mb-2">Altitude</span>
      
      <div className="flex-1 relative w-full flex justify-center">
        {/* Track background */}
        <div className="w-2 h-full bg-muted rounded-full relative overflow-hidden">
          {/* Filled portion */}
          <motion.div
            className="absolute bottom-0 w-full rounded-full"
            style={{
              background: "linear-gradient(to top, hsl(200, 80%, 70%), hsl(210, 90%, 80%), hsl(220, 60%, 95%))",
            }}
            animate={{ height: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Landmarks */}
        <div className="absolute left-8 top-0 h-full w-16">
          {landmarks.map((landmark) => {
            const pos = 100 - (landmark.height / maxAltitude) * 100;
            return (
              <motion.div
                key={landmark.height}
                className="absolute text-xs flex items-center gap-1 whitespace-nowrap"
                style={{ top: `${pos}%`, transform: "translateY(-50%)" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: Math.abs(altitude - landmark.height) < 1000 ? 1 : 0.4,
                  x: 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <span>{landmark.emoji}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Invisible slider input */}
        <input
          type="range"
          min={0}
          max={maxAltitude}
          value={altitude}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{
            writingMode: "vertical-lr",
            direction: "rtl",
          }}
        />

        {/* Thumb indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full shadow-lg border-2 border-white cursor-grab active:cursor-grabbing"
          style={{ bottom: `${percentage}%` }}
          animate={{ bottom: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>

      <div className="mt-2 text-center">
        <motion.span 
          className="text-lg font-semibold"
          key={Math.floor(altitude / 100)}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
        >
          {altitude.toLocaleString()}m
        </motion.span>
      </div>
    </div>
  );
};

export default AltitudeSlider;
