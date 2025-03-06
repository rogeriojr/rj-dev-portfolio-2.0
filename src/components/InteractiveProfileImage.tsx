import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Image,
  IconButton,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { keyframes } from "@emotion/react";

interface InteractiveProfileImageProps {
  imageUrl: string;
}

export const InteractiveProfileImage: React.FC<
  InteractiveProfileImageProps
> = ({ imageUrl }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const controls = useAnimation();
  const isDark = colorMode === "dark";
  const glowColor = isDark ? "#FFD700" : "#3182CE";

  const pulse = keyframes`
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  `;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      setPosition({ x, y });
    }
  };

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="300px"
      height="300px"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
    >
      <Box position="relative" display="flex" alignItems="center" gap={4}>
        <Tooltip
          isOpen={showTooltip}
          label="Clique e mova todo um universo!"
          placement="left"
          hasArrow
          closeOnClick={false}
        >
          <Box
            position="absolute"
            width="40px"
            height="40px"
            top="50%"
            left="-30px"
            transform="translate(-50%, -50%)"
            zIndex={2}
            animation={`${pulse} 2s infinite ease-in-out`}
            onClick={() => setShowTooltip(!showTooltip)}
            cursor="pointer"
          >
            <IconButton
              icon={
                showTooltip ? (
                  <FaRocket style={{ transform: "rotate(0deg)" }} />
                ) : (
                  "!"
                )
              }
              aria-label="Drag indicator"
              colorScheme={isDark ? "yellow" : "blue"}
              variant="solid"
              size="lg"
              borderRadius="full"
              _hover={{
                transform: "scale(1.2)",
                boxShadow: `0 0 10px ${glowColor}`,
              }}
              transition="all 0.3s ease-in-out"
            />
          </Box>
        </Tooltip>
      </Box>
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Box
          position="absolute"
          width="90%"
          height="90%"
          left="5%"
          top="5%"
          zIndex={2}
        >
          <Image
            src={imageUrl}
            alt="Profile"
            borderRadius="full"
            boxSize="100%"
            objectFit="cover"
            zIndex={99}
          />
        </Box>
      </motion.div>
    </Box>
  );
};
