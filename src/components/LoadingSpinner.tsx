import { Box, Flex, HStack, useColorMode, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaUserAstronaut, FaRocket } from "react-icons/fa";
import { IoPlanet } from "react-icons/io5";
import { useState, useEffect } from "react";
import { PlanetSpinner } from "./PlanetSpinner";

const MotionBox = motion(Box);
const MotionIcon = motion(FaUserAstronaut);
const MotionRocket = motion(FaRocket);

interface FloatingElement {
  id: number;
  startY: number;
  delay: number;
  type: 'planet' | 'rocket' | 'star' | 'asteroid';
  color: string;
  size: number;
}

export function LoadingSpinner() {
  const { colorMode } = useColorMode();
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const elementTypes: Array<{ type: FloatingElement['type']; color: string; size: number }> = [
      { type: 'planet', color: 'purple.400', size: 20 },
      { type: 'planet', color: 'cyan.400', size: 16 },
      { type: 'planet', color: 'blue.400', size: 18 },
      { type: 'rocket', color: 'yellow.400', size: 24 },
      { type: 'rocket', color: 'orange.400', size: 20 },
      { type: 'star', color: 'yellow.300', size: 8 },
      { type: 'asteroid', color: 'gray.400', size: 12 },
    ];

    const createElement = (): FloatingElement => {
      const randomType = elementTypes[Math.floor(Math.random() * elementTypes.length)];
      return {
        id: Date.now() + Math.random(),
        startY: Math.random() * 100,
        delay: Math.random() * 2,
        type: randomType.type,
        color: randomType.color,
        size: randomType.size,
      };
    };

    const addElement = () => {
      setFloatingElements(prev => {
        if (prev.length < 8) {
          return [...prev, createElement()];
        }
        return prev;
      });
    };

    const interval = setInterval(addElement, 1500);
    addElement();

    return () => clearInterval(interval);
  }, []);

  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rocketFloatingAnimation = {
    y: [0, -25, 0],
    rotate: [0, -15, 15, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const renderFloatingElement = (element: FloatingElement) => {
    const baseAnimation = {
      x: [-100, window.innerWidth + 100],
      y: [element.startY, element.startY + (Math.random() - 0.5) * 30],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1, 1, 0.5],
      rotate: element.type === 'rocket' ? [0, 360] : [0, 180],
    };

    const transition = {
      duration: 4 + Math.random() * 2,
      ease: "easeInOut" as const,
      delay: element.delay,
      onComplete: () => {
        setFloatingElements(prev => prev.filter(e => e.id !== element.id));
      },
    };

    switch (element.type) {
      case 'planet':
        return (
          <MotionBox
            key={element.id}
            position="absolute"
            top={`${element.startY}%`}
            left="-50px"
            pointerEvents="none"
            initial={{ x: -50 }}
            animate={baseAnimation}
            transition={transition}
          >
            <Icon
              as={IoPlanet}
              w={element.size}
              h={element.size}
              color={element.color}
              filter="drop-shadow(0 0 8px currentColor)"
            />
          </MotionBox>
        );
      case 'rocket':
        return (
          <MotionBox
            key={element.id}
            position="absolute"
            top={`${element.startY}%`}
            left="-50px"
            pointerEvents="none"
            initial={{ x: -50 }}
            animate={baseAnimation}
            transition={transition}
          >
            <Icon
              as={FaRocket}
              w={element.size}
              h={element.size}
              color={element.color}
              filter="drop-shadow(0 0 10px currentColor)"
            />
          </MotionBox>
        );
      case 'star':
        return (
          <MotionBox
            key={element.id}
            position="absolute"
            top={`${element.startY}%`}
            left="-20px"
            w={`${element.size}px`}
            h={`${element.size}px`}
            borderRadius="full"
            bg={element.color}
            boxShadow={`0 0 ${element.size * 2}px ${element.color}`}
            pointerEvents="none"
            initial={{ x: -20 }}
            animate={baseAnimation}
            transition={transition}
          />
        );
      case 'asteroid':
        return (
          <MotionBox
            key={element.id}
            position="absolute"
            top={`${element.startY}%`}
            left="-30px"
            w={`${element.size}px`}
            h={`${element.size}px`}
            borderRadius="20%"
            bg={element.color}
            boxShadow={`0 0 ${element.size}px ${element.color}`}
            pointerEvents="none"
            initial={{ x: -30, rotate: 0 }}
            animate={{
              ...baseAnimation,
              rotate: [0, 360],
            }}
            transition={transition}
          />
        );
    }
  };

  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.9)"
      backdropFilter="blur(12px)"
      zIndex={9999}
      overflow="hidden"
    >
      {/* Animated Starfield Background */}
      {Array.from({ length: 30 }).map((_, i) => (
        <MotionBox
          key={`star-${i}`}
          position="absolute"
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
          w={`${Math.random() * 2 + 1}px`}
          h={`${Math.random() * 2 + 1}px`}
          borderRadius="full"
          bg="white"
          boxShadow="0 0 4px rgba(255, 255, 255, 0.8)"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating Elements from Left to Right */}
      {floatingElements.map(renderFloatingElement)}

      {/* Nebula Glow Effects */}
      <MotionBox
        position="absolute"
        top="10%"
        right="10%"
        w="200px"
        h="200px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(99, 102, 241, 0.3), transparent)"
        filter="blur(40px)"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <MotionBox
        position="absolute"
        bottom="15%"
        left="15%"
        w="180px"
        h="180px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(139, 92, 246, 0.3), transparent)"
        filter="blur(35px)"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <MotionBox
        position="absolute"
        top="50%"
        left="20%"
        w="150px"
        h="150px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(251, 191, 36, 0.2), transparent)"
        filter="blur(30px)"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Main Content - Astronaut, Yellow Rocket and Planet Spinner */}
      <HStack spacing={10} align="center" position="relative" zIndex={10}>
        <MotionBox
          animate={floatingAnimation}
          color={colorMode === "dark" ? "cyan.400" : "blue.500"}
          filter="drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))"
        >
          <MotionIcon size={64} />
        </MotionBox>

        <Box position="relative" filter="drop-shadow(0 0 20px rgba(56, 189, 248, 0.4))">
          <PlanetSpinner size={120} />
        </Box>

        <MotionBox
          animate={rocketFloatingAnimation}
          color="yellow.400"
          filter="drop-shadow(0 0 15px rgba(251, 191, 36, 0.8))"
        >
          <MotionRocket size={56} />
        </MotionBox>
      </HStack>

      {/* Shooting Stars */}
      {Array.from({ length: 3 }).map((_, i) => (
        <MotionBox
          key={`shooting-${i}`}
          position="absolute"
          w="3px"
          h="80px"
          bgGradient="linear(to bottom, rgba(255, 255, 255, 0.9), transparent)"
          boxShadow="0 0 15px rgba(255, 255, 255, 0.8)"
          top={`${15 + i * 30}%`}
          left={`${5 + i * 30}%`}
          rotate="45deg"
          animate={{
            x: [0, 400],
            y: [0, 400],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.2,
            repeatDelay: 2,
          }}
        />
      ))}
    </Flex>
  );
}