import { Box, Image, IconButton, useColorMode } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaUser } from "react-icons/fa";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const orbit = keyframes`
  from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
`;

const OrbitingIcon = styled(motion.div)`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  left: 50%;
  margin: -15px;
`;

const ProfileContainer = styled(Box)`
  position: relative;
  width: 200px;
  height: 200px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

interface ProfileImageProps {
  imageUrl: string;
}

export function ProfileImage({ imageUrl }: ProfileImageProps) {
  const { colorMode } = useColorMode();
  const [displayMode, setDisplayMode] = useState<"photo" | "sun" | "moon">(
    "photo"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const isDark = colorMode === "dark";
  const glowColor = isDark
    ? "rgba(255, 215, 0, 0.5)"
    : "rgba(135, 206, 235, 0.5)";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const orbitingIcons = [
    { icon: FaUser, angle: 0, onClick: () => setDisplayMode("photo") },
    { icon: FaSun, angle: 120, onClick: () => setDisplayMode("sun") },
    { icon: FaMoon, angle: 240, onClick: () => setDisplayMode("moon") },
  ];

  return (
    <ProfileContainer
      ref={containerRef}
      as={motion.div}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: position.y,
        rotateY: -position.x,
      }}
      transition
    >
      <AnimatePresence mode="wait">
        <Box
          as={motion.div}
          position="relative"
          width="200px"
          height="200px"
          borderRadius="full"
          overflow="hidden"
          animation={`${pulse} 3s infinite ease-in-out`}
          boxShadow={`0 0 20px ${glowColor}`}
          transition="all 0.3s ease-in-out"
        >
          {displayMode === "photo" && (
            <Image
              src={imageUrl}
              alt="Profile"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          )}
          {displayMode === "sun" && (
            <Box
              bg="yellow.400"
              width="100%"
              height="100%"
              borderRadius="full"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                top: "-10%",
                left: "-10%",
                right: "-10%",
                bottom: "-10%",
                background:
                  "radial-gradient(circle, rgba(255,215,0,0.8) 0%, transparent 70%)",
                animation: `${pulse} 2s infinite`,
              }}
            />
          )}
          {displayMode === "moon" && (
            <Box
              bg="gray.600"
              width="100%"
              height="100%"
              borderRadius="full"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                top: "-10%",
                left: "-10%",
                right: "-10%",
                bottom: "-10%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                animation: `${pulse} 2s infinite`,
              }}
            />
          )}
        </Box>
      </AnimatePresence>

      {orbitingIcons.map((item, index) => (
        <OrbitingIcon
          key={index}
          style={{
            animation: `${orbit} ${10 + index}s infinite linear`,
            animationDelay: `${-index * 3}s`,
          }}
        >
          <IconButton
            icon={<item.icon />}
            aria-label={`Toggle ${item.icon.name}`}
            onClick={item.onClick}
            colorScheme={isDark ? "yellow" : "blue"}
            variant="solid"
            size="sm"
            borderRadius="full"
            _hover={{
              transform: "scale(1.2)",
              boxShadow: `0 0 10px ${glowColor}`,
            }}
          />
        </OrbitingIcon>
      ))}
    </ProfileContainer>
  );
}
