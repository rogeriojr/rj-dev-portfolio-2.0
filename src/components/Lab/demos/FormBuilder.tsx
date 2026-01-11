import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Select,
  Checkbox,
  Textarea,
  useColorModeValue,
  Icon,
  Badge,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaGripVertical, FaSave } from 'react-icons/fa';
import { motion } from 'framer-motion';

type FieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const MotionBox = motion(Box);

export function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([
    { id: '1', type: 'text', label: 'Nome', required: true },
    { id: '2', type: 'email', label: 'Email', required: true },
  ]);
  const [formData, setFormData] = useState<Record<string, string | number | boolean>>({});
  const [newFieldType, setNewFieldType] = useState<FieldType>('text');

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: `Campo ${fields.length + 1}`,
      required: false,
      options: newFieldType === 'select' ? ['Opção 1', 'Opção 2'] : undefined,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
    const newData = { ...formData };
    delete newData[id];
    setFormData(newData);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const handleInputChange = (fieldId: string, value: string | number | boolean) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const renderField = (field: FormField) => {
    const rawValue = formData[field.id];

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={typeof rawValue === 'string' ? rawValue : ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            isRequired={field.required}
          />
        );
      case 'select':
        return (
          <Select
            placeholder={field.placeholder || 'Selecione...'}
            value={typeof rawValue === 'string' ? rawValue : ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            isRequired={field.required}
          >
            {field.options?.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        );
      case 'checkbox':
        return (
          <Checkbox
            isChecked={typeof rawValue === 'boolean' ? rawValue : false}
            onChange={(e) => handleInputChange(field.id, e.target.checked)}
            isRequired={field.required}
          >
            {field.placeholder || 'Aceito os termos'}
          </Checkbox>
        );
      default:
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={typeof rawValue === 'string' || typeof rawValue === 'number' ? String(rawValue) : ''}
            onChange={(e) => handleInputChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value)}
            isRequired={field.required}
          />
        );
    }
  };

  return (
    <Box w="full" maxW="800px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Builder Panel */}
        <Box p={6} bg={cardBg} borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                Construtor de Formulários
              </Text>
              <HStack>
                <Select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                  maxW="150px"
                  size="sm"
                >
                  <option value="text">Texto</option>
                  <option value="email">Email</option>
                  <option value="number">Número</option>
                  <option value="textarea">Textarea</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </Select>
                <Button
                  leftIcon={<FaPlus />}
                  onClick={addField}
                  size="sm"
                  colorScheme="blue"
                >
                  Adicionar Campo
                </Button>
              </HStack>
            </HStack>

            <Divider />

            <VStack spacing={3} align="stretch">
              {fields.map((field) => (
                <MotionBox
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  p={4}
                  bg={bg}
                  borderRadius="md"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <VStack spacing={3} align="stretch">
                    <HStack justify="space-between">
                      <HStack spacing={2} flex={1}>
                        <Icon as={FaGripVertical} color="gray.400" cursor="grab" />
                        <Input
                          value={field.label}
                          onChange={(e) => updateField(field.id, { label: e.target.value })}
                          size="sm"
                          flex={1}
                        />
                        <Badge colorScheme={field.required ? 'red' : 'gray'}>
                          {field.required ? 'Obrigatório' : 'Opcional'}
                        </Badge>
                      </HStack>
                      <IconButton
                        aria-label="Remover"
                        icon={<FaTrash />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeField(field.id)}
                      />
                    </HStack>

                    {field.type === 'select' && (
                      <HStack spacing={2}>
                        <Text fontSize="xs" color="gray.500">
                          Opções:
                        </Text>
                        <Input
                          size="xs"
                          placeholder="Opção 1, Opção 2, ..."
                          value={field.options?.join(', ') || ''}
                          onChange={(e) =>
                            updateField(field.id, {
                              options: e.target.value.split(',').map((s) => s.trim()),
                            })
                          }
                        />
                      </HStack>
                    )}

                    <HStack>
                      <Checkbox
                        isChecked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        size="sm"
                      >
                        Campo obrigatório
                      </Checkbox>
                    </HStack>
                  </VStack>
                </MotionBox>
              ))}
            </VStack>
          </VStack>
        </Box>

        {/* Preview */}
        <Box p={6} bg={bg} borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <VStack spacing={4} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight="bold">
                Preview do Formulário
              </Text>
              <Button leftIcon={<FaSave />} colorScheme="green" size="sm">
                Salvar Formulário
              </Button>
            </HStack>

            <Divider />

            <VStack spacing={4} align="stretch">
              {fields.map((field) => (
                <Box key={field.id}>
                  <Text mb={2} fontSize="sm" fontWeight="medium">
                    {field.label}
                    {field.required && (
                      <Text as="span" color="red.500" ml={1}>
                        *
                      </Text>
                    )}
                  </Text>
                  {renderField(field)}
                </Box>
              ))}

              <Button colorScheme="blue" mt={4}>
                Enviar
              </Button>
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
