import { useState } from "react";
import { motion } from "framer-motion";
import MinecraftSteve from "@/components/MinecraftSteve";
import AltitudeSlider from "@/components/AltitudeSlider";
import StatPanel from "@/components/StatPanel";
import SkyBackground from "@/components/SkyBackground";
import InfoCard from "@/components/InfoCard";

const MAX_ALTITUDE = 8849; // Mt. Everest height in meters

const Index = () => {
  const [altitude, setAltitude] = useState(0);

  // Calculate oxygen level (100% at sea level, ~33% at Everest summit)
  const oxygenLevel = Math.max(33, 100 - (altitude / MAX_ALTITUDE) * 67);
  
  // Calculate temperature (15°C at sea level, -40°C at Everest)
  // Lapse rate: roughly 6.5°C per 1000m
  const temperature = Math.round(15 - (altitude / 1000) * 6.5);

  // Get oxygen color based on level
  const getOxygenColor = () => {
    if (oxygenLevel > 80) return "hsl(180, 70%, 45%)";
    if (oxygenLevel > 60) return "hsl(45, 90%, 50%)";
    return "hsl(0, 70%, 55%)";
  };

  // Get temperature color based on value
  const getTempColor = () => {
    if (temperature > 5) return "hsl(25, 90%, 55%)";
    if (temperature > -15) return "hsl(200, 70%, 55%)";
    return "hsl(210, 80%, 60%)";
  };

  // Calculate Steve's vertical position
  const stevePosition = 85 - (altitude / MAX_ALTITUDE) * 70;

  return (
    <div className="min-h-screen overflow-hidden relative">
      <SkyBackground altitude={altitude} maxAltitude={MAX_ALTITUDE} />
      
      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-panel rounded-2xl px-6 py-4 max-w-2xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            🏔️ Altitude Explorer
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            From Sea Level to Mt. Everest
          </p>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative min-h-screen flex items-center justify-center px-4 py-24">
        <div className="flex items-center gap-8 max-w-6xl w-full">
          
          {/* Left side - Stats */}
          <motion.div 
            className="hidden md:flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatPanel
              icon="🫁"
              label="Oxygen Level"
              value={`${Math.round(oxygenLevel)}%`}
              subValue={oxygenLevel > 80 ? "Normal" : oxygenLevel > 50 ? "Low" : "Critical"}
              color={getOxygenColor()}
              percentage={oxygenLevel}
            />
            
            <StatPanel
              icon="🌡️"
              label="Temperature"
              value={`${temperature}°C`}
              subValue={temperature > 0 ? "Above freezing" : "Below freezing"}
              color={getTempColor()}
              percentage={((temperature + 50) / 65) * 100}
            />
          </motion.div>

          {/* Center - Steve and visualization area */}
          <div className="flex-1 relative h-[70vh] flex items-end justify-center">
            {/* Steve character */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 z-10"
              animate={{ 
                bottom: `${stevePosition}%`,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
            >
              <MinecraftSteve altitude={altitude} maxAltitude={MAX_ALTITUDE} />
            </motion.div>

            {/* Ground indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <motion.div
                className="glass-panel rounded-xl px-4 py-2"
                animate={{ opacity: altitude < 500 ? 1 : 0.4 }}
              >
                <span className="text-xs font-medium">🌍 Ground Level</span>
              </motion.div>
            </div>

            {/* Everest peak indicator */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
              <motion.div
                className="glass-panel rounded-xl px-4 py-2"
                animate={{ opacity: altitude > MAX_ALTITUDE - 1000 ? 1 : 0.4 }}
              >
                <span className="text-xs font-medium">🏔️ Everest Summit (8,849m)</span>
              </motion.div>
            </div>
          </div>

          {/* Right side - Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AltitudeSlider
              altitude={altitude}
              maxAltitude={MAX_ALTITUDE}
              onChange={setAltitude}
            />
          </motion.div>
        </div>
      </main>

      {/* Mobile stats - bottom */}
      <motion.div 
        className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="glass-panel rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">🫁 Oxygen</div>
              <div 
                className="text-xl font-bold"
                style={{ color: getOxygenColor() }}
              >
                {Math.round(oxygenLevel)}%
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">🌡️ Temp</div>
              <div 
                className="text-xl font-bold"
                style={{ color: getTempColor() }}
              >
                {temperature}°C
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info card - positioned bottom left on desktop */}
      <motion.div 
        className="hidden lg:block fixed bottom-8 left-8 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <InfoCard altitude={altitude} />
      </motion.div>
    </div>
  );
};

export default Index;
