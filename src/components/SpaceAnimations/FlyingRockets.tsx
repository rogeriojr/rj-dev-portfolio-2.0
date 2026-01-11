import { Box, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { useEffect, useState } from "react";

export function FlyingRockets() {
  const [rockets, setRockets] = useState<Array<{ id: number; startX: number; startY: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rockets.length < 3) {
        setRockets(prev => [
          ...prev,
          {
            id: Date.now(),
            startX: -100,
            startY: Math.random() * window.innerHeight,
          }
        ]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [rockets.length]);

  return (
    <>
      {rockets.map((rocket) => (
        <Box
          key={rocket.id}
          position="fixed"
          left={`${rocket.startX}px`}
          top={`${rocket.startY}px`}
          opacity={0.3}
          pointerEvents="none"
          zIndex={1}
        >
          <motion.div
            initial={{ x: rocket.startX, y: rocket.startY }}
            animate={{
              x: window.innerWidth + 100,
              y: rocket.startY + (Math.random() - 0.5) * 200,
            }}
            transition={{
              duration: 5,
              ease: "linear",
              onComplete: () => {
                setRockets(prev => prev.filter(r => r.id !== rocket.id));
              },
            }}
          >
            <Icon as={FaRocket} w={6} h={6} color="orange.400" />
          </motion.div>
        </Box>
      ))}
    </>
  );
}
