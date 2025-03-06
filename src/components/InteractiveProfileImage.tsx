import React, { useState, useEffect, useRef } from "react";
import { Box, Image, IconButton, useColorMode } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const orbitAnimation = keyframes`
  from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
`;

const StyledOrbitIcon = styled(motion.div)<{ index: number }>`
  position: absolute;
  animation: ${orbitAnimation} ${(props) => 8 + props.index * 2}s linear
    infinite;
  transform-origin: 50% 50%;
`;

const GlowingBorder = styled(Box)<{ mode: string }>`
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: ${(props) =>
    props.mode === "sun"
      ? "radial-gradient(circle at center, #FFD700, transparent 70%)"
      : props.mode === "moon"
      ? "radial-gradient(circle at center, #C0C0C0, transparent 70%)"
      : "none"};
  filter: blur(8px);
  opacity: 0.8;
`;

interface InteractiveProfileImageProps {
  imageUrl: string;
}

export const InteractiveProfileImage: React.FC<
  InteractiveProfileImageProps
> = ({ imageUrl }) => {
  const [mode, setMode] = useState<"photo" | "sun" | "moon">("photo");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const controls = useAnimation();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
      setPosition({ x, y });
    }
  };

  const orbitIcons = [
    { icon: FaUser, onClick: () => setMode("photo") },
    { icon: FaSun, onClick: () => setMode("sun") },
    { icon: FaMoon, onClick: () => setMode("moon") },
  ];

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
        <GlowingBorder mode={mode} style={{ zIndex: 1 }} />
        {orbitIcons.map((icon, index) => (
          <StyledOrbitIcon
            key={index}
            index={index}
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${index * 120}deg) translateX(60px)`,
            }}
          >
            <IconButton
              icon={<icon.icon />}
              aria-label={`Toggle ${icon.icon.name}`}
              onClick={icon.onClick}
              colorScheme={colorMode === "dark" ? "yellow" : "blue"}
              size="sm"
              borderRadius="full"
              _hover={{ transform: "scale(1.2)" }}
            />
          </StyledOrbitIcon>
        ))}
      </motion.div>
    </Box>
  );
};
