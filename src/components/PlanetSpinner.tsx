import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface PlanetSpinnerProps {
  size?: number;
}

export function PlanetSpinner({ size = 80 }: PlanetSpinnerProps) {
  const centerSize = size * 0.4;
  const orbit1Radius = size * 0.35;
  const orbit2Radius = size * 0.5;
  const orbit3Radius = size * 0.65;
  const planetSize = size * 0.12;

  const centerColor = useColorModeValue("cyan.500", "cyan.400");
  const planet1Color = useColorModeValue("cyan.500", "cyan.400");
  const planet2Color = useColorModeValue("gray.400", "gray.300");
  const planet3Color = useColorModeValue("gray.700", "gray.800");

  return (
    <Box
      position="relative"
      w={`${size}px`}
      h={`${size}px`}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="transparent"
    >
      {/* Central Planet (Teal) */}
      <motion.div
        style={{
          position: "absolute",
          width: `${centerSize}px`,
          height: `${centerSize}px`,
          borderRadius: "50%",
          backgroundColor: centerColor,
          boxShadow: `0 0 ${centerSize / 2}px ${centerColor}`,
          zIndex: 10,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbit 1 - Inner Planet (Teal) */}
      <motion.div
        style={{
          position: "absolute",
          width: `${orbit1Radius * 2}px`,
          height: `${orbit1Radius * 2}px`,
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
          top={`${orbit1Radius - planetSize / 2}px`}
          left={`${orbit1Radius - planetSize / 2}px`}
          w={`${planetSize}px`}
          h={`${planetSize}px`}
          borderRadius="full"
          bg={planet1Color}
          boxShadow={`0 0 ${planetSize}px ${planet1Color}`}
        />
      </motion.div>

      {/* Orbit 2 - Middle Planet (Light Gray) */}
      <motion.div
        style={{
          position: "absolute",
          width: `${orbit2Radius * 2}px`,
          height: `${orbit2Radius * 2}px`,
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
          top={`${orbit2Radius - planetSize / 2}px`}
          right={`${orbit2Radius - planetSize / 2}px`}
          w={`${planetSize}px`}
          h={`${planetSize}px`}
          borderRadius="full"
          bg={planet2Color}
          boxShadow={`0 0 ${planetSize}px ${planet2Color}`}
        />
      </motion.div>

      {/* Orbit 3 - Outer Planet (Black/Dark) */}
      <motion.div
        style={{
          position: "absolute",
          width: `${orbit3Radius * 2}px`,
          height: `${orbit3Radius * 2}px`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Box
          position="absolute"
          top={`${orbit3Radius - planetSize / 2}px`}
          left={`${orbit3Radius - planetSize / 2}px`}
          w={`${planetSize}px`}
          h={`${planetSize}px`}
          borderRadius="full"
          bg={planet3Color}
          boxShadow={`0 0 ${planetSize}px ${planet3Color}`}
        />
      </motion.div>

      {/* Orbital Rings - Subtle */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={`${orbit1Radius * 2}px`}
        h={`${orbit1Radius * 2}px`}
        borderRadius="full"
        border="1px dashed"
        borderColor="rgba(56, 189, 248, 0.15)"
        pointerEvents="none"
        opacity={0.3}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={`${orbit2Radius * 2}px`}
        h={`${orbit2Radius * 2}px`}
        borderRadius="full"
        border="1px dashed"
        borderColor="rgba(203, 213, 225, 0.1)"
        pointerEvents="none"
        opacity={0.2}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={`${orbit3Radius * 2}px`}
        h={`${orbit3Radius * 2}px`}
        borderRadius="full"
        border="1px dashed"
        borderColor="rgba(30, 41, 59, 0.1)"
        pointerEvents="none"
        opacity={0.2}
      />
    </Box>
  );
}
