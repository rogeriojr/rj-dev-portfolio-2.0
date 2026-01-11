import { Box, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoPlanet } from "react-icons/io5";

export function FloatingPlanets() {
  const colors = ['purple.400', 'blue.400', 'cyan.400', 'pink.400', 'orange.400'];

  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          position="fixed"
          top={`${20 + i * 15}%`}
          left={`${10 + i * 18}%`}
          opacity={0.1}
          pointerEvents="none"
          zIndex={0}
        >
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Icon
              as={IoPlanet}
              w={16 + i * 4}
              h={16 + i * 4}
              color={colors[i % colors.length]}
            />
          </motion.div>
        </Box>
      ))}
    </>
  );
}
