import { motion } from "framer-motion";

interface SkyBackgroundProps {
  altitude: number;
  maxAltitude: number;
}

const SkyBackground = ({ altitude, maxAltitude }: SkyBackgroundProps) => {
  const progress = altitude / maxAltitude;
  
  // Calculate colors based on altitude
  const getSkyGradient = () => {
    if (progress < 0.3) {
      // Low altitude - nice blue sky
      return "linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #98D8C8 100%)";
    } else if (progress < 0.6) {
      // Mid altitude - lighter sky
      return "linear-gradient(180deg, #B0C4DE 0%, #E0E8F0 50%, #F5F5F5 100%)";
    } else {
      // High altitude - pale/white sky
      return "linear-gradient(180deg, #E8EEF4 0%, #F0F4F8 50%, #FFFFFF 100%)";
    }
  };

  // Cloud positions
  const clouds = [
    { id: 1, top: 15, delay: 0, scale: 1 },
    { id: 2, top: 25, delay: 5, scale: 0.8 },
    { id: 3, top: 40, delay: 10, scale: 1.2 },
    { id: 4, top: 55, delay: 15, scale: 0.7 },
  ];

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden"
      animate={{ background: getSkyGradient() }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Sun */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: "radial-gradient(circle, #FFF9C4 0%, #FFEE58 40%, transparent 70%)",
          top: "10%",
          right: "15%",
        }}
        animate={{
          opacity: progress > 0.7 ? 0.3 : 0.8,
          scale: progress > 0.7 ? 0.8 : 1,
        }}
        transition={{ duration: 1 }}
      />

      {/* Clouds - only visible at certain altitudes */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.top}%`,
            animationDelay: `${cloud.delay}s`,
          }}
          animate={{
            opacity: progress > 0.2 && progress < 0.8 ? 0.7 : 0.2,
            x: ["calc(-100%)", "calc(100vw)"],
          }}
          transition={{
            x: {
              duration: 40 / cloud.scale,
              repeat: Infinity,
              ease: "linear",
              delay: cloud.delay,
            },
            opacity: { duration: 1 },
          }}
        >
          <svg
            width={120 * cloud.scale}
            height={60 * cloud.scale}
            viewBox="0 0 120 60"
            fill="white"
          >
            <ellipse cx="60" cy="40" rx="50" ry="20" opacity="0.9" />
            <ellipse cx="35" cy="35" rx="25" ry="18" opacity="0.9" />
            <ellipse cx="85" cy="35" rx="25" ry="18" opacity="0.9" />
            <ellipse cx="50" cy="25" rx="20" ry="15" opacity="0.9" />
            <ellipse cx="70" cy="25" rx="20" ry="15" opacity="0.9" />
          </svg>
        </motion.div>
      ))}

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
                  stopColor: progress > 0.5 ? "#FFFFFF" : "#6B7B8C",
                }}
                transition={{ duration: 1 }}
              />
              <motion.stop
                offset="100%"
                animate={{
                  stopColor: progress > 0.5 ? "#E8EEF4" : "#4A5568",
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
            fill="white"
            animate={{
              opacity: progress > 0.4 ? 1 : 0,
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
              className="absolute w-1 h-1 bg-white rounded-full"
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
