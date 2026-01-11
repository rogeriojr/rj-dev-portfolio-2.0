import { HStack, Select, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ItemsPerPageSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const MotionBox = motion(Box);

export function ItemsPerPageSelector({ value, onChange }: ItemsPerPageSelectorProps) {
  const bg = useColorModeValue('white', 'whiteAlpha.50');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  const options = [6, 9, 12, 18, 24, 36];

  return (
    <HStack spacing={{ base: 1.5, md: 2 }} p={{ base: 1.5, md: 2 }} bg={bg} borderRadius="xl" boxShadow="md" flexWrap="wrap">
      <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" color={useColorModeValue('gray.600', 'gray.300')} whiteSpace="nowrap">
        Por página:
      </Text>
      <MotionBox
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          size={{ base: "xs", md: "sm" }}
          borderRadius="lg"
          borderColor={borderColor}
          bg={bg}
          fontSize={{ base: "xs", md: "sm" }}
          _hover={{ borderColor: 'blue.400' }}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
          w={{ base: "70px", md: "80px" }}
        >
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </MotionBox>
    </HStack>
  );
}
