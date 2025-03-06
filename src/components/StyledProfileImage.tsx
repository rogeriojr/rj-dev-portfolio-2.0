import { Box, IconButton, useColorMode, Tooltip } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { FaSun, FaMoon, FaStar, FaRocket } from "react-icons/fa";
import { useState } from "react";
import { InteractiveProfileImage } from "./InteractiveProfileImage";
import { useNavigate } from "react-router-dom";

export function StyledProfileImage() {
  const { colorMode } = useColorMode();
  const [borderEffect, setBorderEffect] = useState("default");
  const navigate = useNavigate();
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;
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
                0 0 30px ${getBorderColors()[1] || getBorderColors()[0]},
                0 0 45px ${getBorderColors()[2] || getBorderColors()[0]};
      transform: scale(1);
    }
    50% { 
      box-shadow: 0 0 25px ${getBorderColors()[0]},
                0 0 50px ${getBorderColors()[1] || getBorderColors()[0]},
                0 0 75px ${getBorderColors()[2] || getBorderColors()[0]};
      transform: scale(1.02);
    }
    100% { 
      box-shadow: 0 0 15px ${getBorderColors()[0]},
                0 0 30px ${getBorderColors()[1] || getBorderColors()[0]},
                0 0 45px ${getBorderColors()[2] || getBorderColors()[0]};
      transform: scale(1);
    }
  `;
  const waveEffect = (color: string) => keyframes`
    0% { box-shadow: 0 0 0 0 ${color}; transform: scale(1); opacity: 1; }
    100% { box-shadow: 0 0 0 50px ${color}; transform: scale(2); opacity: 0; }
  `;
  const orbitAnimation = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;
  return (
    <Box
      position="relative"
      width="300px"
      height="300px"
      margin="0 auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      animation={`${pulseAnimation} 3s ease-in-out infinite`}
    >
      <Tooltip label="Mova e movimente todo um universo!" placement="top">
        <IconButton
          as={motion.button}
          whileHover={{ scale: 1.2 }}
          position="absolute"
          top="-30px"
          right="-30px"
          zIndex="1"
          aria-label="Move"
          icon={<FaRocket />}
          variant="ghost"
          color={colorMode === "dark" ? "purple.300" : "purple.500"}
          fontSize="24px"
          onClick={() => navigate("/contact")}
          css={css`
            &:hover::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 50%;
              animation: ${waveEffect("rgba(147, 112, 219, 0.3)")} 1.5s ease-out
                infinite;
            }
          `}
        />
      </Tooltip>
      <Box
        position="absolute"
        width="400px"
        height="400px"
        top="-50px"
        left="-50px"
        animation={`${orbitAnimation} 20s linear infinite`}
      >
        <IconButton
          as={motion.button}
          whileHover={{ scale: 1.2 }}
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          aria-label="Sun"
          icon={<FaSun />}
          variant="ghost"
          color="yellow.400"
          fontSize="24px"
          onClick={() => setBorderEffect("sun")}
          css={css`
            &:hover::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 50%;
              animation: ${waveEffect("rgba(255, 215, 0, 0.3)")} 1.5s ease-out
                infinite;
            }
          `}
        />
        <IconButton
          as={motion.button}
          whileHover={{ scale: 1.2 }}
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          aria-label="Moon"
          icon={<FaMoon />}
          variant="ghost"
          color="gray.300"
          fontSize="24px"
          onClick={() => setBorderEffect("moon")}
          css={css`
            &:hover::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 50%;
              animation: ${waveEffect("rgba(192, 192, 192, 0.3)")} 1.5s ease-out
                infinite;
            }
          `}
        />
        <IconButton
          as={motion.button}
          whileHover={{ scale: 1.2 }}
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          aria-label="Star"
          icon={<FaStar />}
          variant="ghost"
          color="purple.400"
          fontSize="24px"
          onClick={() => setBorderEffect("star")}
          css={css`
            &:hover::after {
              content: "";
              position: absolute;
              inset: 0;
              border-radius: 50%;
              animation: ${waveEffect("rgba(147, 112, 219, 0.3)")} 1.5s ease-out
                infinite;
            }
          `}
        />
      </Box>
      <Box
        position="relative"
        width="300px"
        height="300px"
        borderRadius="full"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={css`
          &::before {
            content: "";
            position: absolute;
            inset: -2px;
            background: ${getBorderColors()[0]};
            border-radius: inherit;
            animation: ${glowKeyframes} 3s ease-in-out infinite;
          }
        `}
      >
        <InteractiveProfileImage imageUrl="/src/assets/imgs/pp-social.png" />
      </Box>
    </Box>
  );
}
