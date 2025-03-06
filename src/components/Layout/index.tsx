import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { LoadingSpinner } from "../LoadingSpinner";

const MotionContainer = motion(Container);

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);

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
      <MotionContainer
        as="main"
        maxW="container.xl"
        pt={24}
        pb={16}
        px={4}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </MotionContainer>
    </Box>
  );
}