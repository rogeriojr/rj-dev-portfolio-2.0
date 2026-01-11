import { useRef, useState } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const HolographicCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <Box sx={{ perspective: "1000px" }} display="inline-block">
      <motion.div
        ref={ref}
        // @ts-ignore
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
      >
        <Box
          w="300px"
          h="400px"
          bgGradient="linear(to-br, gray.900, black)"
          rounded="2xl"
          p={6}
          position="relative"
          overflow="hidden"
          border="1px solid"
          borderColor="whiteAlpha.200"
          boxShadow="2xl"
        >
          <VStack spacing={4} align="center" transform="translateZ(50px)" h="full" justify="center">
            <Box
              w="100px"
              h="100px"
              rounded="full"
              bgGradient="radial(cyan.400, purple.500)"
              boxShadow="0 0 30px rgba(0, 255, 255, 0.4)"
            />
            <Text color="cyan.300" fontWeight="bold" fontSize="2xl" letterSpacing="widest">
              IDENTITY
            </Text>
            <Text color="gray.400" textAlign="center" fontSize="sm">
              LEVEL 5 CLEARANCE<br />
              SENIOR ENGINEER
            </Text>
          </VStack>

          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)"
            opacity={hover ? 0.6 : 0}
            transition="opacity 0.2s"
            pointerEvents="none"
            style={{ mixBlendMode: 'overlay' }}
          />

          <Box
            position="absolute"
            top={0} left={0} right={0} bottom={0}
            backgroundImage="radial-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)"
            backgroundSize="20px 20px"
            opacity={0.3}
            pointerEvents="none"
          />
        </Box>
      </motion.div>
    </Box>
  );
};
