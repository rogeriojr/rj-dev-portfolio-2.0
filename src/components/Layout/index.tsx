import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";

const MotionContainer = motion(Container);

export default function Layout() {
  return (
    <Box minH="100vh" bg="gray.900">
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