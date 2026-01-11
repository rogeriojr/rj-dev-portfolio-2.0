import { Box, Container } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { LoadingSpinner } from "../LoadingSpinner";

const MotionContainer = motion(Container);

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box minH="100vh" bg="gray.900">
      {isLoading && <LoadingSpinner />}
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <MotionContainer
          key={location.pathname}
          as="main"
          maxW="container.xl"
          pt={{ base: 20, md: 24 }}
          pb={{ base: 8, md: 12, lg: 16 }}
          px={{ base: 3, md: 4, lg: 6 }}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Outlet />
        </MotionContainer>
      </AnimatePresence>
    </Box>
  );
}