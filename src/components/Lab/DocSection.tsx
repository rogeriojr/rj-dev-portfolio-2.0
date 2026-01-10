import React, { useState } from 'react';
import { Box, Heading, Text, Badge, Flex, Button, Collapse, useColorModeValue, SimpleGrid, Icon, HStack, Tabs, TabList, Tab, Stack } from '@chakra-ui/react';
import { FaCode, FaChevronUp, FaLightbulb, FaCheckCircle, FaExclamationCircle, FaUserGraduate } from 'react-icons/fa';
import { CodeViewer } from './CodeViewer';
import { MermaidDiagram } from './MermaidDiagram';
import { LabItem } from '../../data/lab-content';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/useTranslation';

interface DocSectionProps {
  item: LabItem;
}

export const DocSection: React.FC<DocSectionProps> = ({ item }) => {
  const [showCode, setShowCode] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const { language } = useTranslation();

  const borderColor = useColorModeValue('gray.200', 'gray.800');
  const titleColor = useColorModeValue('brand.600', 'cyan.400');
  const accentColor = useColorModeValue('cyan.600', 'cyan.200');

  const typeColorMap: Record<string, string> = {
    component: 'purple',
    hook: 'green',
    pattern: 'blue',
    architecture: 'orange',
    utility: 'pink',
    god_tier: 'gold'
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      mb={16}
      id={item.id}
    >
      {/* Header */}
      <Flex align="center" gap={3} mb={4}>
        <Heading size="lg" color={titleColor} fontFamily="Share Tech Mono">
          {item.title[language]}
        </Heading>
        <Badge colorScheme={typeColorMap[item.type] || 'gray'} fontSize="0.7em" px={2} py={0.5} rounded="md" textTransform="uppercase">
          {item.type}
        </Badge>
      </Flex>

      <HStack justify="space-between" mb={6} align="start">
        <Text fontSize="lg" color="gray.500" maxW="container.md">
          {item.description[language]}
        </Text>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setShowDetails(!showDetails)}
          leftIcon={showDetails ? <FaChevronUp /> : <FaLightbulb />}
          mt={1}
        >
          {showDetails ? (language === 'pt' ? 'Menos Detalhes' : 'Less Details') : (language === 'pt' ? 'Ver Análise' : 'View Analysis')}
        </Button>
      </HStack>

      <Collapse in={showDetails} animateOpacity>
        <Box mb={8}>
          {/* Problem & Solution Grid (if available) */}
          {(item.problemStatement || item.solution) && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
              {item.problemStatement && (
                <Box p={5} rounded="lg" bg="rgba(155, 0, 0, 0.1)" border="1px solid" borderColor="red.900">
                  <HStack mb={2} color="red.400">
                    <Icon as={FaExclamationCircle} />
                    <Text fontWeight="bold" fontSize="sm" textTransform="uppercase">
                      {language === 'pt' ? 'O Desafio' : 'The Challenge'}
                    </Text>
                  </HStack>
                  <Text color="gray.400" fontSize="sm">{item.problemStatement[language]}</Text>
                </Box>
              )}
              {item.solution && (
                <Box p={5} rounded="lg" bg="rgba(0, 155, 0, 0.1)" border="1px solid" borderColor="green.900">
                  <HStack mb={2} color="green.400">
                    <Icon as={FaLightbulb} />
                    <Text fontWeight="bold" fontSize="sm" textTransform="uppercase">
                      {language === 'pt' ? 'A Solução' : 'The Solution'}
                    </Text>
                  </HStack>
                  <Text color="gray.400" fontSize="sm">{item.solution[language]}</Text>
                </Box>
              )}
            </SimpleGrid>
          )}

          {/* Key Features List */}
          {item.features && (
            <Box mb={8}>
              <Text fontWeight="bold" mb={3} color={accentColor}>
                {language === 'pt' ? 'Recursos Técnicos' : 'Key Technical Features'}
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2}>
                {item.features.map((feature, idx) => (
                  <HStack key={idx} align="start">
                    <Icon as={FaCheckCircle} color="green.500" mt={1} boxSize={3} />
                    <Text fontSize="sm" color="gray.400">{feature[language]}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* Senior Tips Section */}
          {item.seniorTips && (
            <Box
              p={6}
              rounded="xl"
              bgGradient="linear(to-br, cyan.900, purple.900)"
              border="1px solid"
              borderColor="cyan.500"
              position="relative"
              overflow="hidden"
            >
              <Box position="absolute" top={-5} right={-5} opacity={0.1}>
                <Icon as={FaUserGraduate} boxSize={40} />
              </Box>
              <HStack mb={4} color="cyan.300">
                <Icon as={FaUserGraduate} />
                <Text fontWeight="bold" textTransform="uppercase" fontSize="sm" letterSpacing="widest">
                  {language === 'pt' ? 'Insights de Especialista' : 'Senior Insights'}
                </Text>
              </HStack>
              <Stack spacing={4}>
                {item.seniorTips.map((tip, idx) => (
                  <HStack key={idx} align="start" spacing={3}>
                    <Box w={1.5} h={1.5} rounded="full" bg="cyan.400" mt={2} />
                    <Text color="gray.200" fontSize="md" fontStyle="italic">
                      {tip[language]}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Collapse>

      {/* Mermaid Diagram Area */}
      {item.mermaid && (
        <Box
          p={6}
          bg="whiteAlpha.50"
          rounded="xl"
          border="1px dashed"
          borderColor="whiteAlpha.200"
          mb={8}
          textAlign="center"
        >
          <Text fontSize="xs" color="gray.500" mb={4} textTransform="uppercase" letterSpacing="widest">
            {language === 'pt' ? 'Diagrama Arquitetural' : 'Architectural Diagram'}
          </Text>
          <Box p={4} rounded="md" display="inline-block" width="100%">
            <MermaidDiagram chart={item.mermaid} />
          </Box>
        </Box>
      )}

      {/* Interactive Demo Area */}
      {item.demo && (
        <Box
          border="1px"
          borderColor={borderColor}
          rounded="xl"
          bg={useColorModeValue('gray.50', 'blackAlpha.300')}
          p={0}
          mb={8}
          position="relative"
          overflow="hidden"
          boxShadow="lg"
        >
          <Box
            bg="blackAlpha.400"
            px={4}
            py={2}
            borderBottom="1px solid"
            borderColor={borderColor}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
              {language === 'pt' ? 'Prévia Interativa' : 'Interactive Preview'}
            </Text>
            <HStack spacing={1}>
              <Box w={2} h={2} rounded="full" bg="red.500" />
              <Box w={2} h={2} rounded="full" bg="yellow.500" />
              <Box w={2} h={2} rounded="full" bg="green.500" />
            </HStack>
          </Box>

          <Flex justify="center" align="center" minH="250px" p={8} bg="blackAlpha.200">
            {item.demo}
          </Flex>
        </Box>
      )}

      {/* Implementation / Code Section */}
      {item.code && (
        <Box rounded="xl" overflow="hidden" border="1px solid" borderColor={borderColor}>
          <Tabs variant="soft-rounded" colorScheme="cyan" size="sm">
            <HStack p={2} bg="blackAlpha.400" justify="space-between">
              <TabList>
                <Tab color="gray.400" _selected={{ color: 'white', bg: 'whiteAlpha.200' }}>
                  {language === 'pt' ? 'Implementação' : 'Implementation'}
                </Tab>
              </TabList>
              <Button
                size="xs"
                leftIcon={showCode ? <FaChevronUp /> : <FaCode />}
                onClick={() => setShowCode(!showCode)}
                variant="ghost"
                color="gray.500"
              >
                {showCode ? (language === 'pt' ? 'Recolher' : 'Collapse') : (language === 'pt' ? 'Expandir' : 'Expand')}
              </Button>
            </HStack>

            <Collapse in={showCode || !item.demo} animateOpacity>
              <Box>
                <CodeViewer code={item.code} />
              </Box>
            </Collapse>
          </Tabs>
        </Box>
      )}

      <Box h="1px" bg={borderColor} mt={12} />
    </Box>
  );
};
