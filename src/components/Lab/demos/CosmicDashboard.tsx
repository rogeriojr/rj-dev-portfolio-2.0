import {
  Box, Grid, GridItem, Heading, Text, VStack, HStack, Button, Input,
  Select, Switch, Avatar, Badge, Icon,
  FormControl, FormLabel, Progress
} from '@chakra-ui/react';
import { FaCreditCard, FaUserPlus, FaBell, FaDatabase, FaServer, FaShieldAlt } from 'react-icons/fa';
import React from 'react';

// --- Sub-Components (Internal for Demo) ---

const Card = ({ children, title }: { children: React.ReactNode, title?: string }) => (
  <Box
    bg="black"
    border="1px solid"
    borderColor="gray.800"
    rounded="xl"
    p={5}
    h="full"
    position="relative"
    overflow="hidden"
  >
    {title && (
      <Text fontSize="sm" fontWeight="bold" color="gray.400" mb={4} textTransform="uppercase" letterSpacing="wider">
        {title}
      </Text>
    )}
    {children}
  </Box>
);

const PaymentMethod = () => (
  <Card title="Payment Method">
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel fontSize="xs" color="gray.500">Cardholder Name</FormLabel>
        <Input size="sm" placeholder="John Doe" bg="gray.900" border="1px solid" borderColor="gray.800" _focus={{ borderColor: "gray.600" }} />
      </FormControl>
      <HStack>
        <FormControl flex={3}>
          <FormLabel fontSize="xs" color="gray.500">Card Number</FormLabel>
          <Input size="sm" placeholder="**** **** **** 4242" bg="gray.900" border="1px solid" borderColor="gray.800" />
        </FormControl>
        <FormControl flex={1}>
          <FormLabel fontSize="xs" color="gray.500">CVC</FormLabel>
          <Input size="sm" placeholder="123" bg="gray.900" border="1px solid" borderColor="gray.800" />
        </FormControl>
      </HStack>
      <HStack pt={2}>
        <Icon as={FaCreditCard} color="gray.600" />
        <Text fontSize="xs" color="gray.500">Secure 256-bit encryption</Text>
      </HStack>
    </VStack>
  </Card>
);

const TeamMembers = () => (
  <Card title="Team Access">
    <VStack spacing={3} align="stretch">
      {[1, 2, 3].map((i) => (
        <HStack key={i} justify="space-between">
          <HStack>
            <Avatar size="xs" name={`User ${i}`} src={`https://i.pravatar.cc/150?u=${i}`} />
            <VStack spacing={0} align="start">
              <Text fontSize="sm" fontWeight="medium" color="gray.200">Dev User {i}</Text>
              <Text fontSize="xs" color="gray.600">{i === 1 ? 'Owner' : 'Viewer'}</Text>
            </VStack>
          </HStack>
          <Select size="xs" w="80px" variant="unstyled" color="gray.500" defaultValue={i === 1 ? "Owner" : "Viewer"}>
            <option value="Owner">Owner</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </Select>
        </HStack>
      ))}
      <Button leftIcon={<FaUserPlus />} size="xs" variant="outline" colorScheme="gray" mt={2} w="full">
        Invite Collaborator
      </Button>
    </VStack>
  </Card>
);

const AnalyticsWidget = () => (
  <Card title="Cluster Health">
    <HStack justify="space-between" mb={6}>
      <VStack align="start" spacing={0}>
        <Text fontSize="2xl" fontWeight="bold" color="white">98.2%</Text>
        <Text fontSize="xs" color="green.400">+1.2% this week</Text>
      </VStack>
      <Box w="60px" h="30px" bgGradient="linear(to-r, green.500, cyan.600)" rounded="md" style={{ opacity: 0.3 }} />
    </HStack>

    <VStack spacing={3} align="stretch">
      <Box>
        <HStack justify="space-between" mb={1}><Text fontSize="xs" color="gray.500">CPU Usage</Text> <Text fontSize="xs" color="gray.300">45%</Text></HStack>
        <Progress value={45} size="xs" colorScheme="cyan" bg="gray.900" rounded="full" />
      </Box>
      <Box>
        <HStack justify="space-between" mb={1}><Text fontSize="xs" color="gray.500">Memory</Text> <Text fontSize="xs" color="gray.300">72%</Text></HStack>
        <Progress value={72} size="xs" colorScheme="purple" bg="gray.900" rounded="full" />
      </Box>
    </VStack>
  </Card>
);

const ComputeSettings = () => (
  <Card title="Compute Engine">
    <VStack align="stretch" spacing={4}>
      <Box p={3} border="1px solid" borderColor="cyan.900" bg="rgba(0, 100, 100, 0.1)" rounded="md">
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaServer} color="cyan.400" />
            <Box>
              <Text fontSize="sm" color="white" fontWeight="bold">Kubernetes Pod</Text>
              <Text fontSize="xs" color="gray.400">g4dn.xlarge (GPU)</Text>
            </Box>
          </HStack>
          <Switch colorScheme="cyan" defaultChecked />
        </HStack>
      </Box>

      <Box p={3} border="1px solid" borderColor="gray.800" bg="transparent" rounded="md" style={{ opacity: 0.6 }}>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaDatabase} color="gray.500" />
            <Box>
              <Text fontSize="sm" color="gray.400">Redis Cache</Text>
              <Text fontSize="xs" color="gray.600">Standard Tier</Text>
            </Box>
          </HStack>
          <Switch colorScheme="gray" />
        </HStack>
      </Box>
    </VStack>
  </Card>
);

export const CosmicDashboard = () => {
  return (
    <Box w="full" bg="gray.950" p={4} rounded="xl" border="1px solid" borderColor="gray.800">
      {/* Top Bar */}
      <HStack mb={8} justify="space-between" align="center">
        <HStack spacing={4}>
          <Heading size="md" color="white" letterSpacing="tight">Project Titan</Heading>
          <Badge colorScheme="green" variant="outline" fontSize="xx-small" px={2} py={0.5} rounded="full">LIVE</Badge>
        </HStack>
        <HStack>
          <Input placeholder="Search resources..." size="sm" w="200px" bg="black" border="1px solid" borderColor="gray.800" borderRadius="md" />
          <Button size="sm" variant="ghost" color="gray.400"><FaBell /></Button>
          <Avatar size="xs" src="https://bit.ly/dan-abramov" />
        </HStack>
      </HStack>

      {/* Main Grid */}
      <Grid
        templateAreas={{
          base: `"pay" "team" "analytics" "compute"`,
          md: `"pay team" "analytics compute"`,
          lg: `"pay team analytics" "pay compute analytics"`
        }}
        templateColumns={{ base: "1fr", lg: "1fr 1fr 300px" }}
        gap={4}
      >
        <GridItem area="pay">
          <PaymentMethod />
        </GridItem>
        <GridItem area="team">
          <TeamMembers />
        </GridItem>
        <GridItem area="analytics">
          <AnalyticsWidget />
        </GridItem>
        <GridItem area="compute">
          <ComputeSettings />
        </GridItem>
      </Grid>

      {/* Footer / Logs */}
      <Box mt={4} p={3} bg="black" borderTop="1px solid" borderColor="gray.800" rounded="lg">
        <HStack spacing={2} mb={2}>
          <Icon as={FaShieldAlt} color="green.500" boxSize={3} />
          <Text fontSize="xs" color="green.500" fontFamily="monospace">System Operational</Text>
        </HStack>
        <Text fontSize="xs" color="gray.600" fontFamily="monospace">
          &gt; [10:42:01] Service-mesh synchronized.<br />
          &gt; [10:42:05] Auto-scaling trigger checked. No action needed.<br />
          &gt; [10:44:12] Backup snapshot created: snap-0f9a8b7c6d5e4f3a2
        </Text>
      </Box>
    </Box>
  );
};
