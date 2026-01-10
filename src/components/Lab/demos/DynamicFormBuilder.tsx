import { useState } from 'react';
import {
  Box, VStack, HStack, Text, Input, Button,
  FormControl, FormLabel, Select, Code,
  Badge, Icon, Grid, GridItem
} from '@chakra-ui/react';
import { FaCode, FaMagic, FaRegPaperPlane } from 'react-icons/fa';

const defaultSchema = [
  { id: 'username', label: 'User ID', type: 'text', placeholder: 'admin_rog' },
  { id: 'tier', label: 'Account Tier', type: 'select', options: ['Premium', 'Enterprise', 'Legacy'] },
  { id: 'nodes', label: 'Requested Nodes', type: 'number', placeholder: '5' },
];

export const DynamicFormBuilder = () => {
  const [schemaText, setSchemaText] = useState(JSON.stringify(defaultSchema, null, 2));
  const [formValues, setFormValues] = useState<any>({});

  const renderForm = () => {
    try {
      const schema = JSON.parse(schemaText);
      return schema.map((field: any) => (
        <FormControl key={field.id}>
          <FormLabel fontSize="2xs" color="whiteAlpha.600" mb={1}>{field.label}</FormLabel>
          {field.type === 'select' ? (
            <Select
              size="sm"
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.200"
              color="white"
              value={formValues[field.id] || ''}
              onChange={(e) => setFormValues({ ...formValues, [field.id]: e.target.value })}
            >
              {field.options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </Select>
          ) : (
            <Input
              type={field.type}
              size="sm"
              placeholder={field.placeholder}
              bg="whiteAlpha.100"
              borderColor="whiteAlpha.200"
              color="white"
              value={formValues[field.id] || ''}
              onChange={(e) => setFormValues({ ...formValues, [field.id]: e.target.value })}
            />
          )}
        </FormControl>
      ));
    } catch (e) {
      return <Text color="red.400" fontSize="xs">INVALID_SCHEMA_JSON</Text>;
    }
  };

  return (
    <Box
      p={4}
      bg="rgba(10, 20, 40, 0.7)"
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      maxW="650px"
      mx="auto"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <HStack>
            <Icon as={FaMagic} color="yellow.400" />
            <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.700">DECLARATIVE_FORM_ENGINE</Text>
          </HStack>
          <Badge colorScheme="cyan" variant="outline" fontSize="9px">SCHEMA_DRIVEN</Badge>
        </HStack>

        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          <GridItem>
            <VStack align="start" spacing={2}>
              <Text fontSize="2xs" color="whiteAlpha.500" fontWeight="bold">INPUT_SCHEMA (JSON)</Text>
              <Box w="100%" h="200px" bg="black" p={2} borderRadius="md" border="1px solid" borderColor="whiteAlpha.200">
                <textarea
                  value={schemaText}
                  onChange={(e) => setSchemaText(e.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    color: '#4FD1C5',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    border: 'none',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </Box>
            </VStack>
          </GridItem>

          <GridItem>
            <VStack align="start" spacing={4} bg="whiteAlpha.50" p={3} borderRadius="md" h="200px" overflowY="auto">
              <Text fontSize="2xs" color="whiteAlpha.500" fontWeight="bold">GENERATED_UI</Text>
              {renderForm()}
              <Button size="xs" colorScheme="cyan" w="100%" rightIcon={<FaRegPaperPlane />}>PROVISION</Button>
            </VStack>
          </GridItem>
        </Grid>

        <Box bg="whiteAlpha.100" p={2} borderRadius="md">
          <HStack>
            <Icon as={FaCode} color="cyan.400" boxSize={3} />
            <Text fontSize="2xs" color="whiteAlpha.500">PAYLOAD_DATA:</Text>
          </HStack>
          <Code bg="transparent" color="green.300" fontSize="2xs" display="block">
            {JSON.stringify(formValues, null, 2)}
          </Code>
        </Box>
      </VStack>
    </Box>
  );
};
