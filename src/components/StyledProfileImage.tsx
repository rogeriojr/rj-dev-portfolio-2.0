import { Box, IconButton, useColorMode, Tooltip, useToast } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaSun, FaMoon, FaStar, FaRocket } from "react-icons/fa";
import { useState } from "react";
import ppSocialImg from "../assets/imgs/pp-social.png";
import { useNavigate } from "react-router-dom";
import { InteractiveProfileImage } from "./InteractiveProfileImage";

export function StyledProfileImage() {
  const { colorMode } = useColorMode();
  const [borderEffect, setBorderEffect] = useState("default");
  const navigate = useNavigate();
  const toast = useToast();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hueRotate = useTransform(x, [-150, 0, 150], [-90, 0, 90]);
  const scale = useTransform(y, [-150, 150], [1.2, 0.8]);

  const getBorderColors = () => {
    switch (borderEffect) {
      case "sun":
        return ["#FFD700", "#FFA500", "#FF8C00"];
      case "moon":
        return ["#C0C0C0", "#E6E6FA", "#B8B8B8"];
      case "star":
        return ["#9370DB", "#4B0082", "#8A2BE2"];
      default:
        return [colorMode === "dark" ? "#FFD700" : "#DAA520"];
    }
  };

  const glowKeyframes = keyframes`
    0% { 
      box-shadow: 0 0 15px ${getBorderColors()[0]},
                0 0 30px ${getBorderColors()[1] || getBorderColors()[0]};
    }
    50% { 
      box-shadow: 0 0 25px ${getBorderColors()[0]},
                0 0 50px ${getBorderColors()[1] || getBorderColors()[0]};
    }
    100% { 
      box-shadow: 0 0 15px ${getBorderColors()[0]},
                0 0 30px ${getBorderColors()[1] || getBorderColors()[0]};
    }
  `;

  const orbitAnimation = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      toast({
        title: "Mudança de Fase Cromática!",
        description: "Você alterou o espectro de cores da imagem.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      id="profile-image-container"
      position="relative"
      width={{ base: "200px", md: "250px", lg: "300px" }}
      height={{ base: "200px", md: "250px", lg: "300px" }}
      margin="0 auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        position="absolute"
        width={{ base: "260px", md: "330px", lg: "400px" }}
        height={{ base: "260px", md: "330px", lg: "400px" }}
        top={{ base: "-30px", md: "-40px", lg: "-50px" }}
        left={{ base: "-30px", md: "-40px", lg: "-50px" }}
        animation={`${orbitAnimation} 20s linear infinite`}
        pointerEvents="none"
      >
        <Box position="absolute" top="0" left="50%" transform="translateX(-50%)" pointerEvents="auto">
          <Tooltip label="Efeito Lunar" placement="top">
            <IconButton
              aria-label="Moon"
              icon={<FaMoon />}
              variant="ghost"
              color="gray.300"
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              size={{ base: "sm", md: "md", lg: "md" }}
              onClick={() => setBorderEffect("moon")}
              isRound
              _hover={{ bg: "whiteAlpha.200", transform: "scale(1.2)" }}
              _active={{ transform: "scale(0.95)" }}
            />
          </Tooltip>
        </Box>
        <Box position="absolute" top="50%" right="0" transform="translateY(-50%)" pointerEvents="auto">
          <Tooltip label="Efeito Estelar" placement="right">
            <IconButton
              aria-label="Star"
              icon={<FaStar />}
              variant="ghost"
              color="purple.400"
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              size={{ base: "sm", md: "md", lg: "md" }}
              onClick={() => setBorderEffect("star")}
              isRound
              _hover={{ bg: "whiteAlpha.200", transform: "scale(1.2)" }}
              _active={{ transform: "scale(0.95)" }}
            />
          </Tooltip>
        </Box>
        <Box position="absolute" top="50%" left="0" transform="translateY(-50%)" pointerEvents="auto">
          <Tooltip label="Efeito Solar" placement="left">
            <IconButton
              aria-label="Sun"
              icon={<FaSun />}
              variant="ghost"
              color="yellow.400"
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              size={{ base: "sm", md: "md", lg: "md" }}
              onClick={() => setBorderEffect("sun")}
              isRound
              _hover={{ bg: "whiteAlpha.200", transform: "scale(1.2)" }}
              _active={{ transform: "scale(0.95)" }}
            />
          </Tooltip>
        </Box>
      </Box>

      <motion.div
        drag={typeof window !== 'undefined' && window.innerWidth >= 768}
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, y, rotate: x, scale }}
        whileHover={{ cursor: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'grab' : 'default' }}
        whileTap={{ cursor: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'grabbing' : 'default' }}
      >
        <Box
          position="relative"
          width={{ base: "200px", md: "250px", lg: "300px" }}
          height={{ base: "200px", md: "250px", lg: "300px" }}
          borderRadius="full"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          as={motion.div}
        >
          <Box
            position="absolute"
            inset="-3px"
            borderRadius="full"
            animation={`${glowKeyframes} 3s ease-in-out infinite`}
            background={getBorderColors()[0]}
            opacity={0.8}
          />

          <motion.div style={{ filter: useTransform(hueRotate, (val) => `hue-rotate(${val}deg)`) }}>
            <InteractiveProfileImage imageUrl={ppSocialImg} />
          </motion.div>
        </Box>
      </motion.div>

      <Tooltip label="Viajar para Contato" placement="bottom">
        <IconButton
          as={motion.button}
          whileHover={{ scale: 1.2, rotate: 45 }}
          position="absolute"
          bottom={{ base: "-15px", md: "-18px", lg: "-20px" }}
          right={{ base: "-15px", md: "-18px", lg: "-20px" }}
          zIndex="2"
          aria-label="Contact"
          icon={<FaRocket />}
          colorScheme="purple"
          variant="solid"
          isRound
          size={{ base: "md", md: "lg", lg: "lg" }}
          minW={{ base: "40px", md: "auto" }}
          minH={{ base: "40px", md: "auto" }}
          onClick={() => navigate("/contact")}
          boxShadow="0 0 15px rgba(128, 90, 213, 0.6)"
          _active={{ transform: "scale(0.95)" }}
        />
      </Tooltip>
    </Box>
  );
}
