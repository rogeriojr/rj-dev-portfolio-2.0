import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

export function InfiniteScrollSpinner() {
  const rocketColor = useColorModeValue("yellow.400", "yellow.300");
  const planetColor = useColorModeValue("cyan.400", "cyan.300");
  const starColor = useColorModeValue("blue.300", "blue.400");

  return (
    <Box
      position="relative"
      w="120px"
      h="80px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="visible"
    >
      <motion.div
        style={{
          position: "absolute",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: planetColor,
          boxShadow: `0 0 12px ${planetColor}`,
          zIndex: 10,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          width: "60px",
          height: "60px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          color={rocketColor}
          filter={`drop-shadow(0 0 8px ${rocketColor})`}
        >
          <FaRocket size={16} />
        </Box>
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          width: "80px",
          height: "80px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Box
          position="absolute"
          bottom="0"
          left="50%"
          transform="translateX(-50%)"
          color={rocketColor}
          filter={`drop-shadow(0 0 8px ${rocketColor})`}
        >
          <FaRocket size={14} />
        </Box>
      </motion.div>

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: starColor,
            boxShadow: `0 0 6px ${starColor}`,
          }}
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 60 - 30,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
              Math.random() * 60 - 30,
            ],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="70px"
        h="70px"
        borderRadius="full"
        border="1px dashed"
        borderColor={useColorModeValue("cyan.200", "cyan.600")}
        opacity={0.3}
        pointerEvents="none"
      />
    </Box>
  );
}
