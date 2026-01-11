import { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Select,
  Checkbox,
  IconButton,
  Badge,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const MotionBox = motion(Box);

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const addTodo = () => {
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      priority,
      createdAt: new Date(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
    setPriority('medium');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
    setPriority(todo.priority);
  };

  const saveEdit = () => {
    if (!editValue.trim()) {
      setEditingId(null);
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editValue, priority } : todo
      )
    );
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const getPriorityColor = (p: Todo['priority']) => {
    const colors = { low: 'gray', medium: 'yellow', high: 'red' };
    return colors[p];
  };

  return (
    <Box w="full" maxW="600px" mx="auto">
      <VStack spacing={4} align="stretch">
        {/* Header */}
        <HStack justify="space-between" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Todo List
          </Text>
          <HStack spacing={2}>
            <Badge colorScheme="blue">{stats.total}</Badge>
            <Badge colorScheme="green">{stats.completed}</Badge>
            <Badge colorScheme="orange">{stats.active}</Badge>
          </HStack>
        </HStack>

        {/* Add Todo */}
        <HStack spacing={2}>
          <Input
            placeholder="Nova tarefa..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            flex={1}
          />
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Todo['priority'])}
            size="md"
            w="100px"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </Select>
          <IconButton
            aria-label="Adicionar"
            icon={<FaPlus />}
            onClick={addTodo}
            colorScheme="blue"
            size="md"
          />
        </HStack>

        {/* Filters */}
        <HStack spacing={2}>
          {(['all', 'active', 'completed'] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? 'solid' : 'ghost'}
              colorScheme={filter === f ? 'blue' : 'gray'}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Todas' : f === 'active' ? 'Ativas' : 'Concluídas'}
            </Button>
          ))}
        </HStack>

        <Divider />

        {/* Todo List */}
        <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
          <AnimatePresence>
            {filteredTodos.length === 0 ? (
              <Text textAlign="center" color="gray.500" py={8}>
                Nenhuma tarefa {filter === 'all' ? '' : filter === 'active' ? 'ativa' : 'concluída'}
              </Text>
            ) : (
              filteredTodos.map((todo) => (
                <MotionBox
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  {editingId === todo.id ? (
                    <HStack
                      p={3}
                      bg={bg}
                      borderRadius="md"
                      border="2px solid"
                      borderColor="blue.400"
                      spacing={2}
                    >
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        flex={1}
                        autoFocus
                      />
                      <Select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                        size="sm"
                        w="80px"
                      >
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                      </Select>
                      <IconButton
                        aria-label="Salvar"
                        icon={<FaCheck />}
                        onClick={saveEdit}
                        colorScheme="green"
                        size="sm"
                      />
                      <IconButton
                        aria-label="Cancelar"
                        icon={<FaTimes />}
                        onClick={cancelEdit}
                        colorScheme="red"
                        size="sm"
                      />
                    </HStack>
                  ) : (
                    <HStack
                      p={3}
                      bg={bg}
                      borderRadius="md"
                      border="1px solid"
                      borderColor={borderColor}
                      spacing={3}
                      opacity={todo.completed ? 0.6 : 1}
                    >
                      <Checkbox
                        isChecked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        colorScheme="green"
                      />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text
                          as={todo.completed ? 's' : 'span'}
                          fontSize="md"
                          textDecoration={todo.completed ? 'line-through' : 'none'}
                        >
                          {todo.text}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {todo.createdAt.toLocaleDateString()}
                        </Text>
                      </VStack>
                      <Badge colorScheme={getPriorityColor(todo.priority)}>
                        {todo.priority === 'low' ? 'Baixa' : todo.priority === 'medium' ? 'Média' : 'Alta'}
                      </Badge>
                      <IconButton
                        aria-label="Editar"
                        icon={<FaEdit />}
                        onClick={() => startEdit(todo)}
                        size="sm"
                        variant="ghost"
                        isDisabled={todo.completed}
                      />
                      <IconButton
                        aria-label="Deletar"
                        icon={<FaTrash />}
                        onClick={() => deleteTodo(todo.id)}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                      />
                    </HStack>
                  )}
                </MotionBox>
              ))
            )}
          </AnimatePresence>
        </VStack>
      </VStack>
    </Box>
  );
}
