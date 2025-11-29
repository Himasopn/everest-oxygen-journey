import { motion } from "framer-motion";

interface MinecraftSteveProps {
  altitude: number;
  maxAltitude: number;
}

const MinecraftSteve = ({ altitude, maxAltitude }: MinecraftSteveProps) => {
  const oxygenLevel = Math.max(33, 100 - (altitude / maxAltitude) * 67);
  const isStruggling = oxygenLevel < 50;

  return (
    <motion.div
      className="relative"
      animate={{
        y: isStruggling ? [0, -2, 0, 2, 0] : [0, -4, 0],
      }}
      transition={{
        duration: isStruggling ? 0.5 : 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Minecraft Steve Pixel Art */}
      <svg
        width="64"
        height="128"
        viewBox="0 0 16 32"
        className="pixel-art drop-shadow-lg"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Hair (top of head) */}
        <rect x="4" y="0" width="8" height="2" fill="#4a3728" />
        <rect x="3" y="2" width="10" height="1" fill="#4a3728" />
        
        {/* Face */}
        <rect x="3" y="3" width="10" height="8" fill="#c4a484" />
        
        {/* Hair sides */}
        <rect x="3" y="3" width="1" height="3" fill="#4a3728" />
        <rect x="12" y="3" width="1" height="3" fill="#4a3728" />
        
        {/* Eyes */}
        <rect x="4" y="5" width="2" height="2" fill="#ffffff" />
        <rect x="10" y="5" width="2" height="2" fill="#ffffff" />
        <rect x="5" y="5" width="1" height="2" fill="#5b4c3e" />
        <rect x="10" y="5" width="1" height="2" fill="#5b4c3e" />
        
        {/* Nose */}
        <rect x="7" y="6" width="2" height="2" fill="#a38b6d" />
        
        {/* Mouth */}
        <rect x="6" y="9" width="4" height="1" fill="#5b4c3e" />
        
        {/* Beard */}
        <rect x="4" y="8" width="2" height="3" fill="#4a3728" />
        <rect x="10" y="8" width="2" height="3" fill="#4a3728" />
        
        {/* Neck */}
        <rect x="6" y="11" width="4" height="1" fill="#c4a484" />
        
        {/* Shirt (cyan/teal) */}
        <rect x="3" y="12" width="10" height="8" fill="#38b6a6" />
        <rect x="2" y="12" width="1" height="8" fill="#38b6a6" />
        <rect x="13" y="12" width="1" height="8" fill="#38b6a6" />
        
        {/* Shirt details */}
        <rect x="6" y="12" width="4" height="1" fill="#2d9688" />
        <rect x="7" y="13" width="2" height="6" fill="#2d9688" />
        
        {/* Arms */}
        <rect x="0" y="12" width="2" height="8" fill="#c4a484" />
        <rect x="14" y="12" width="2" height="8" fill="#c4a484" />
        
        {/* Pants (blue jeans) */}
        <rect x="4" y="20" width="8" height="6" fill="#3b5998" />
        <rect x="7" y="20" width="2" height="6" fill="#2d4373" />
        
        {/* Legs */}
        <rect x="4" y="26" width="3" height="6" fill="#3b5998" />
        <rect x="9" y="26" width="3" height="6" fill="#3b5998" />
        
        {/* Shoes */}
        <rect x="4" y="30" width="3" height="2" fill="#4a4a4a" />
        <rect x="9" y="30" width="3" height="2" fill="#4a4a4a" />
      </svg>

      {/* Breathing effect overlay when low oxygen */}
      {isStruggling && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.div>
  );
};

export default MinecraftSteve;
