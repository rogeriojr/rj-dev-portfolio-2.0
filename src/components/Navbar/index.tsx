import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Link as ChakraLink,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { css, keyframes } from "@emotion/react";

const MotionBox = motion(Box);

const starburstAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Tooltip label={`Go to ${children}`} placement="bottom">
      <ChakraLink
        as={RouterLink}
        to={to}
        px={4}
        py={2}
        rounded={"md"}
        position="relative"
        color={isActive ? "orange.400" : "white"}
        css={css`
          &:hover::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, rgba(251, 146, 60, 0.6) 0%, rgba(251, 146, 60, 0) 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ${starburstAnimation} 0.8s ease-out;
            pointer-events: none;
          }
        `}
        _hover={{
          textDecoration: "none",
          color: "orange.400",
        }}
      >
        {children}
        {isActive && (
          <MotionBox
            position="absolute"
            bottom="-2px"
            left="0"
            right="0"
            height="2px"
            bg="orange.400"
            layoutId="underline"
            initial={false}
          />
        )}
      </ChakraLink>
    </Tooltip>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const links = [
    { to: "/", label: "Home" },
    { to: "/portfolio/development", label: "Development" },
    { to: "/portfolio/design", label: "Design" },
    { to: "/portfolio/social-media", label: "Social Media" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const NavLinks = () => (
    <>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg="gray.900"
      px={4}
      py={4}
      borderBottom="1px"
      borderColor="gray.700"
      zIndex="sticky"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={<HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={onOpen}
          variant="outline"
          borderColor="orange.400"
          color="orange.400"
          _hover={{
            bg: "orange.400",
            color: "white",
          }}
        />

        <HStack spacing={8} alignItems={"center"}>
          <ChakraLink
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color="orange.400"
          >
            RJ-DEV
          </ChakraLink>
        </HStack>

        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <NavLinks />
        </HStack>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.900">
          <DrawerCloseButton color="orange.400" />
          <DrawerHeader color="orange.400">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <NavLinks />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
