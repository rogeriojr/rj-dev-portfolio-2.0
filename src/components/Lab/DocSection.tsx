import React, { useState, Suspense } from 'react';
import { Box, Heading, Text, Badge, Flex, Button, Collapse, useColorModeValue, SimpleGrid, Icon, HStack, Tabs, TabList, Tab, Stack } from '@chakra-ui/react';
import { PlanetSpinner } from '../PlanetSpinner';
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
      <Flex align="center" gap={{ base: 2, md: 3 }} mb={4} flexWrap="wrap">
        <Heading size={{ base: "md", md: "lg" }} color={titleColor} fontFamily="Share Tech Mono" wordBreak="break-word">
          {item.title[language]}
        </Heading>
        <Badge colorScheme={typeColorMap[item.type] || 'gray'} fontSize={{ base: "0.6em", md: "0.7em" }} px={{ base: 1.5, md: 2 }} py={0.5} rounded="md" textTransform="uppercase">
          {item.type}
        </Badge>
      </Flex>

      <HStack justify="space-between" mb={{ base: 4, md: 6 }} align="start" flexDirection={{ base: "column", md: "row" }} gap={{ base: 2, md: 0 }}>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.500" maxW="container.md" flex={1}>
          {item.description[language]}
        </Text>
        <Button
          size={{ base: "2xs", md: "xs" }}
          variant="outline"
          onClick={() => setShowDetails(!showDetails)}
          leftIcon={showDetails ? <FaChevronUp /> : <FaLightbulb />}
          mt={{ base: 0, md: 1 }}
          fontSize={{ base: "xs", md: "sm" }}
        >
          {showDetails ? (language === 'pt' ? 'Menos Detalhes' : 'Less Details') : (language === 'pt' ? 'Ver Análise' : 'View Analysis')}
        </Button>
      </HStack>

      <Collapse in={showDetails} animateOpacity>
        <Box mb={8}>
          {(item.problemStatement || item.solution) && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} mb={{ base: 6, md: 8 }}>
              {item.problemStatement && (
                <Box p={{ base: 4, md: 5 }} rounded="lg" bg="rgba(155, 0, 0, 0.1)" border="1px solid" borderColor="red.900">
                  <HStack mb={2} color="red.400">
                    <Icon as={FaExclamationCircle} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
                    <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} textTransform="uppercase">
                      {language === 'pt' ? 'O Desafio' : 'The Challenge'}
                    </Text>
                  </HStack>
                  <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} lineHeight="tall">{item.problemStatement[language]}</Text>
                </Box>
              )}
              {item.solution && (
                <Box p={{ base: 4, md: 5 }} rounded="lg" bg="rgba(0, 155, 0, 0.1)" border="1px solid" borderColor="green.900">
                  <HStack mb={2} color="green.400">
                    <Icon as={FaLightbulb} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
                    <Text fontWeight="bold" fontSize={{ base: "xs", md: "sm" }} textTransform="uppercase">
                      {language === 'pt' ? 'A Solução' : 'The Solution'}
                    </Text>
                  </HStack>
                  <Text color="gray.400" fontSize={{ base: "xs", md: "sm" }} lineHeight="tall">{item.solution[language]}</Text>
                </Box>
              )}
            </SimpleGrid>
          )}

          {item.features && (
            <Box mb={{ base: 6, md: 8 }}>
              <Text fontWeight="bold" mb={3} color={accentColor} fontSize={{ base: "sm", md: "md" }}>
                {language === 'pt' ? 'Recursos Técnicos' : 'Key Technical Features'}
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 1.5, md: 2 }}>
                {item.features.map((feature, idx) => (
                  <HStack key={idx} align="start" spacing={2}>
                    <Icon as={FaCheckCircle} color="green.500" mt={1} boxSize={{ base: 2.5, md: 3 }} />
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400" lineHeight="tall">{feature[language]}</Text>
                  </HStack>
                ))}
              </SimpleGrid>
            </Box>
          )}

          {item.seniorTips && (
            <Box
              p={{ base: 4, md: 6 }}
              rounded="xl"
              bgGradient="linear(to-br, cyan.900, purple.900)"
              border="1px solid"
              borderColor="cyan.500"
              position="relative"
              overflow="hidden"
            >
              <Box position="absolute" top={-5} right={-5} opacity={0.1} display={{ base: "none", md: "block" }}>
                <Icon as={FaUserGraduate} boxSize={{ base: 30, md: 40 }} />
              </Box>
              <HStack mb={{ base: 3, md: 4 }} color="cyan.300" flexWrap="wrap">
                <Icon as={FaUserGraduate} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} />
                <Text fontWeight="bold" textTransform="uppercase" fontSize={{ base: "xs", md: "sm" }} letterSpacing="widest">
                  {language === 'pt' ? 'Insights de Especialista' : 'Senior Insights'}
                </Text>
              </HStack>
              <Stack spacing={{ base: 3, md: 4 }}>
                {item.seniorTips.map((tip, idx) => (
                  <HStack key={idx} align="start" spacing={{ base: 2, md: 3 }}>
                    <Box w={{ base: 1, md: 1.5 }} h={{ base: 1, md: 1.5 }} rounded="full" bg="cyan.400" mt={2} flexShrink={0} />
                    <Text color="gray.200" fontSize={{ base: "sm", md: "md" }} fontStyle="italic" lineHeight="tall">
                      {tip[language]}
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Collapse>

      {item.mermaid && (
        <Box
          p={{ base: 4, md: 6 }}
          bg="whiteAlpha.50"
          rounded="xl"
          border="1px dashed"
          borderColor="whiteAlpha.200"
          mb={{ base: 6, md: 8 }}
          textAlign="center"
          overflowX="auto"
        >
          <Text fontSize={{ base: "2xs", md: "xs" }} color="gray.500" mb={4} textTransform="uppercase" letterSpacing="widest">
            {language === 'pt' ? 'Diagrama Arquitetural' : 'Architectural Diagram'}
          </Text>
          <Box p={{ base: 2, md: 4 }} rounded="md" display="inline-block" width="100%" minW="300px">
            <MermaidDiagram chart={item.mermaid} />
          </Box>
        </Box>
      )}

      {item.demo && (
        <Box
          border="1px"
          borderColor={borderColor}
          rounded="xl"
          bg={useColorModeValue('gray.50', 'blackAlpha.300')}
          p={0}
          mb={{ base: 6, md: 8 }}
          position="relative"
          overflow="hidden"
          boxShadow="lg"
        >
          <Box
            bg="blackAlpha.400"
            px={{ base: 3, md: 4 }}
            py={2}
            borderBottom="1px solid"
            borderColor={borderColor}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize={{ base: "2xs", md: "xs" }} fontWeight="bold" letterSpacing="widest" color="gray.500" textTransform="uppercase">
              {language === 'pt' ? 'Prévia Interativa' : 'Interactive Preview'}
            </Text>
            <HStack spacing={1}>
              <Box w={{ base: 1.5, md: 2 }} h={{ base: 1.5, md: 2 }} rounded="full" bg="red.500" />
              <Box w={{ base: 1.5, md: 2 }} h={{ base: 1.5, md: 2 }} rounded="full" bg="yellow.500" />
              <Box w={{ base: 1.5, md: 2 }} h={{ base: 1.5, md: 2 }} rounded="full" bg="green.500" />
            </HStack>
          </Box>

          <Flex justify="center" align="center" minH={{ base: "200px", md: "250px" }} p={{ base: 4, md: 8 }} bg="blackAlpha.200" overflowX="auto">
            <Suspense fallback={
              <Box display="flex" justifyContent="center" alignItems="center">
                <PlanetSpinner size={100} />
              </Box>
            }>
              {item.demo}
            </Suspense>
          </Flex>
        </Box>
      )}

      {item.code && (
        <Box rounded="xl" overflow="hidden" border="1px solid" borderColor={borderColor}>
          <Tabs variant="soft-rounded" colorScheme="cyan" size={{ base: "xs", md: "sm" }}>
            <HStack p={{ base: 1.5, md: 2 }} bg="blackAlpha.400" justify="space-between" flexWrap="wrap" gap={2}>
              <TabList>
                <Tab color="gray.400" _selected={{ color: 'white', bg: 'whiteAlpha.200' }} fontSize={{ base: "xs", md: "sm" }}>
                  {language === 'pt' ? 'Implementação' : 'Implementation'}
                </Tab>
              </TabList>
              <Button
                size={{ base: "2xs", md: "xs" }}
                leftIcon={showCode ? <FaChevronUp /> : <FaCode />}
                onClick={() => setShowCode(!showCode)}
                variant="ghost"
                color="gray.500"
                fontSize={{ base: "xs", md: "sm" }}
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
