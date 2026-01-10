import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Input, Button,
  FormControl, FormLabel, FormErrorMessage,
  Progress, Badge, Code, useToast, Icon,
  Collapse
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTerminal, FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const MotionBox = motion(Box);

export const ComplexFormSimulator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', terms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
      if (!formData.email.includes('@')) newErrors.email = "Invalid email format";
    }
    if (step === 2) {
      if (!formData.role) newErrors.role = "Role selection is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validate()) setStep(s => s + 1);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    toast({
      title: "Handshake Successful",
      description: "Data validated (Zod-style) and submitted.",
      status: "success",
      duration: 3000,
    });
    setStep(1);
    setFormData({ name: '', email: '', role: '', terms: false });
  };

  return (
    <Box
      p={6}
      bg="rgba(10, 15, 30, 0.4)"
      borderRadius="xl"
      border="1px solid rgba(255,255,255,0.1)"
      maxW="500px"
      mx="auto"
    >
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" mb={2}>
          <Text fontSize="xs" fontWeight="bold" color="cyan.400" letterSpacing="widest">
            STEP {step} OF 2
          </Text>
          <Badge colorScheme="purple" variant="outline" fontSize="2xs">MULTI-STEP SCHEMA</Badge>
        </HStack>

        <Progress value={step * 50} size="xs" colorScheme="cyan" borderRadius="full" bg="whiteAlpha.100" />

        <Box minH="200px">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <MotionBox
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <VStack spacing={4}>
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel fontSize="sm" color="whiteAlpha.700">Full Name</FormLabel>
                    <Input
                      placeholder="Rogério Júnior"
                      bg="blackAlpha.300"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel fontSize="sm" color="whiteAlpha.700">Enterprise Email</FormLabel>
                    <Input
                      placeholder="rogerio@nexus.ai"
                      bg="blackAlpha.300"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                </VStack>
              </MotionBox>
            )}

            {step === 2 && (
              <MotionBox
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <VStack spacing={4} align="stretch">
                  <FormControl isInvalid={!!errors.role}>
                    <FormLabel fontSize="sm" color="whiteAlpha.700">Senior Role</FormLabel>
                    <Input
                      placeholder="e.g. Staff Engineer"
                      bg="blackAlpha.300"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    />
                    <FormErrorMessage>{errors.role}</FormErrorMessage>
                  </FormControl>
                  <Box p={4} bg="whiteAlpha.50" borderRadius="md" borderLeft="4px solid" borderColor="purple.500">
                    <Text fontSize="xs" color="whiteAlpha.600 italic">
                      "I agree to absolute engineering excellence and zero-bug policies."
                    </Text>
                  </Box>
                </VStack>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>

        <HStack pt={4} spacing={4}>
          {step > 1 && (
            <Button
              leftIcon={<FaArrowLeft />}
              variant="ghost"
              onClick={prevStep}
              size="sm"
              color="whiteAlpha.600"
              _hover={{ bg: "whiteAlpha.100", color: "white" }}
            >
              Back
            </Button>
          )}
          <Button
            rightIcon={step === 2 ? <FaCheckCircle /> : <FaArrowRight />}
            colorScheme={step === 2 ? "purple" : "cyan"}
            flex={1}
            onClick={step === 2 ? handleSubmit : nextStep}
            isLoading={isSubmitting}
            size="sm"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="wider"
            boxShadow="0 4px 14px 0 rgba(0, 118, 255, 0.39)"
          >
            {step === 2 ? "Finalize" : "Next"}
          </Button>
        </HStack>

        <Collapse in={Object.keys(formData).some(k => (formData as any)[k])}>
          <Box mt={4} p={3} bg="black" borderRadius="md" border="1px solid rgba(0,255,255,0.1)">
            <HStack mb={2}>
              <Icon as={FaTerminal} color="cyan.400" boxSize={3} />
              <Text fontSize="2xs" color="whiteAlpha.500" fontWeight="bold">LIVE_STATE_MONITOR</Text>
            </HStack>
            <Code bg="transparent" color="green.300" fontSize="2xs" display="block" whiteSpace="pre">
              {JSON.stringify(formData, null, 2)}
            </Code>
          </Box>
        </Collapse>
      </VStack>
    </Box>
  );
};
