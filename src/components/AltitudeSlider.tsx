import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";

interface AltitudeSliderProps {
  altitude: number;
  maxAltitude: number;
  onChange: (value: number) => void;
}

const AltitudeSlider = ({ altitude, maxAltitude, onChange }: AltitudeSliderProps) => {
  const percentage = (altitude / maxAltitude) * 100;
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const landmarks = [
    { height: 0, label: "Sea Level", emoji: "🌊" },
    { height: 828, label: "Burj Khalifa", emoji: "🏙️" },
    { height: 2500, label: "Cloud Base", emoji: "☁️" },
    { height: 3800, label: "Oxygen Zone", emoji: "😮‍💨" },
    { height: 5364, label: "Everest Base", emoji: "⛺" },
    { height: 8849, label: "Mt. Everest", emoji: "🏔️" },
  ];

  const calculateAltitudeFromPosition = useCallback((clientY: number) => {
    if (!trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const trackHeight = rect.height;
    
    // Invert: top of track = max altitude, bottom = 0
    const percentage = 1 - Math.max(0, Math.min(1, relativeY / trackHeight));
    const newAltitude = Math.round(percentage * maxAltitude);
    
    onChange(newAltitude);
  }, [maxAltitude, onChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    calculateAltitudeFromPosition(e.clientY);
  }, [calculateAltitudeFromPosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    calculateAltitudeFromPosition(e.touches[0].clientY);
  }, [calculateAltitudeFromPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    calculateAltitudeFromPosition(e.touches[0].clientY);
  }, [isDragging, calculateAltitudeFromPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      calculateAltitudeFromPosition(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, calculateAltitudeFromPosition]);

  return (
    <div className="glass-panel rounded-2xl p-4 w-20 h-[70vh] flex flex-col items-center select-none">
      <span className="text-xs font-medium text-muted-foreground mb-2">Altitude</span>
      
      <div 
        ref={trackRef}
        className="flex-1 relative w-full flex justify-center cursor-pointer touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Track background */}
        <div className="w-3 h-full bg-white/10 rounded-full relative overflow-hidden border border-white/20">
          {/* Filled portion */}
          <motion.div
            className="absolute bottom-0 w-full rounded-full"
            style={{
              background: "linear-gradient(to top, hsl(200, 80%, 50%), hsl(210, 90%, 60%), hsl(220, 60%, 70%))",
            }}
            animate={{ height: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Landmarks */}
        <div className="absolute left-10 top-0 h-full w-16">
          {landmarks.map((landmark) => {
            const pos = 100 - (landmark.height / maxAltitude) * 100;
            return (
              <motion.div
                key={landmark.height}
                className="absolute text-xs flex items-center gap-1 whitespace-nowrap"
                style={{ top: `${pos}%`, transform: "translateY(-50%)" }}
                initial={{ opacity: 0.4 }}
                animate={{ 
                  opacity: Math.abs(altitude - landmark.height) < 1000 ? 1 : 0.4,
                  scale: Math.abs(altitude - landmark.height) < 500 ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span>{landmark.emoji}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Thumb indicator */}
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary rounded-full shadow-lg border-2 border-white ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            boxShadow: '0 0 20px rgba(0, 150, 255, 0.5)',
          }}
          animate={{ 
            bottom: `${percentage}%`,
            scale: isDragging ? 1.2 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.15 }}
        />
      </div>

      <div className="mt-3 text-center">
        <motion.span 
          className="text-lg font-bold text-foreground"
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
