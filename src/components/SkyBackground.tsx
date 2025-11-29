import { motion } from "framer-motion";

interface SkyBackgroundProps {
  altitude: number;
  maxAltitude: number;
}

const SkyBackground = ({ altitude, maxAltitude }: SkyBackgroundProps) => {
  const progress = altitude / maxAltitude;
  
  // Calculate colors based on altitude - dark theme
  const getSkyGradient = () => {
    if (progress < 0.3) {
      // Low altitude - dark night sky
      return "linear-gradient(180deg, #0a0a0f 0%, #151520 50%, #1a1a25 100%)";
    } else if (progress < 0.6) {
      // Mid altitude - slightly lighter dark
      return "linear-gradient(180deg, #0f0f18 0%, #1a1a28 50%, #202030 100%)";
    } else {
      // High altitude - deep space dark
      return "linear-gradient(180deg, #050508 0%, #0a0a10 50%, #101018 100%)";
    }
  };

  // Stars for dark theme
  const stars = [...Array(50)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 70,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      animate={{ background: getSkyGradient() }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: "radial-gradient(circle, #f5f5f5 0%, #e0e0e0 60%, transparent 70%)",
          top: "8%",
          right: "12%",
          boxShadow: "0 0 60px rgba(255,255,255,0.3)",
        }}
        animate={{
          opacity: progress > 0.7 ? 0.5 : 0.9,
          scale: progress > 0.7 ? 0.8 : 1,
        }}
        transition={{ duration: 1 }}
      />

      {/* Mountain silhouette at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
          style={{ height: "30vh" }}
        >
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <motion.stop
                offset="0%"
                animate={{
                  stopColor: progress > 0.5 ? "#2a2a35" : "#1a1a22",
                }}
                transition={{ duration: 1 }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: progress > 0.5 ? "#1a1a22" : "#0f0f15",
                }}
                transition={{ duration: 1 }}
              />
            </linearGradient>
          </defs>
          
          {/* Background mountains */}
          <motion.path
            d="M0,320 L0,200 L200,100 L350,160 L500,60 L650,140 L800,40 L950,120 L1100,30 L1250,100 L1440,80 L1440,320 Z"
            fill="url(#mountainGradient)"
            animate={{
              y: -progress * 100,
              opacity: 1 - progress * 0.3,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          
          {/* Snow caps when high */}
          <motion.path
            d="M500,60 L520,75 L480,75 Z M800,40 L825,60 L775,60 Z M1100,30 L1130,55 L1070,55 Z"
            fill="#ffffff"
            animate={{
              opacity: progress > 0.4 ? 0.8 : 0,
              y: -progress * 100,
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>
      </div>

      {/* Snow particles at high altitude */}
      {progress > 0.6 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/70 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-5%",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, Math.random() * 50 - 25],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SkyBackground;
