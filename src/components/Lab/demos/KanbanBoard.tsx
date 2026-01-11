import { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  IconButton,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  Textarea,
} from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
}

const COLUMNS = [
  { id: 'todo', label: 'A Fazer', color: 'gray' },
  { id: 'in-progress', label: 'Em Progresso', color: 'blue' },
  { id: 'done', label: 'Concluído', color: 'green' },
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implementar autenticação',
      description: 'Sistema de login com JWT',
      priority: 'high',
      status: 'todo',
    },
    {
      id: '2',
      title: 'Criar API REST',
      description: 'Endpoints para CRUD de usuários',
      priority: 'medium',
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'Testes unitários',
      description: 'Cobertura de 80%+',
      priority: 'high',
      status: 'todo',
    },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const columnBg = useColorModeValue('gray.50', 'gray.700');

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      priority: 'medium',
      status: 'todo',
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      setEditingId(null);
      return;
    }

    setTasks(tasks.map(task =>
      task.id === editingId
        ? { ...task, title: editTitle, description: editDescription }
        : task
    ));
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = { low: 'gray', medium: 'yellow', high: 'red' };
    return colors[priority];
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <Box w="full" maxW="1400px" mx="auto">
      <VStack spacing={4} align="stretch">
        {/* Header */}
        <HStack justify="space-between" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Kanban Board
          </Text>
          <Badge colorScheme="blue" fontSize="md" px={3} py={1}>
            {tasks.length} tarefas
          </Badge>
        </HStack>

        {/* Add Task */}
        <Card bg={bg} border="1px solid" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={3} align="stretch">
              <Text fontWeight="bold">Nova Tarefa</Text>
              <Input
                placeholder="Título da tarefa..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <Textarea
                placeholder="Descrição (opcional)..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                rows={2}
              />
              <Button
                leftIcon={<FaPlus />}
                onClick={addTask}
                colorScheme="blue"
                isDisabled={!newTaskTitle.trim()}
              >
                Adicionar Tarefa
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Kanban Columns */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {COLUMNS.map((column) => (
            <VStack
              key={column.id}
              align="stretch"
              spacing={3}
              p={4}
              bg={columnBg}
              borderRadius="lg"
              minH="500px"
            >
              <HStack justify="space-between">
                <HStack>
                  <Text fontWeight="bold" fontSize="lg">
                    {column.label}
                  </Text>
                  <Badge colorScheme={column.color}>
                    {getTasksByStatus(column.id as Task['status']).length}
                  </Badge>
                </HStack>
              </HStack>

              <VStack spacing={2} align="stretch" flex={1}>
                <AnimatePresence>
                  {getTasksByStatus(column.id as Task['status']).map((task) => (
                    <MotionBox
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                    >
                      <Card
                        bg={bg}
                        border="1px solid"
                        borderColor={borderColor}
                        cursor="move"
                        _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
                        transition="all 0.2s"
                      >
                        <CardBody>
                          {editingId === task.id ? (
                            <VStack spacing={2} align="stretch">
                              <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                size="sm"
                                autoFocus
                              />
                              <Textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                size="sm"
                                rows={2}
                              />
                              <HStack>
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
                            </VStack>
                          ) : (
                            <>
                              <HStack justify="space-between" mb={2}>
                                <Text fontWeight="bold" fontSize="sm">
                                  {task.title}
                                </Text>
                                <Badge
                                  colorScheme={getPriorityColor(task.priority)}
                                  fontSize="xs"
                                >
                                  {task.priority === 'low' ? 'Baixa' : task.priority === 'medium' ? 'Média' : 'Alta'}
                                </Badge>
                              </HStack>
                              {task.description && (
                                <Text fontSize="xs" color="gray.500" mb={2}>
                                  {task.description}
                                </Text>
                              )}
                              <HStack justify="space-between">
                                <HStack spacing={1}>
                                  {COLUMNS.filter(c => c.id !== task.status).map((col) => (
                                    <Button
                                      key={col.id}
                                      size="xs"
                                      onClick={() => moveTask(task.id, col.id as Task['status'])}
                                      colorScheme={col.color}
                                      variant="ghost"
                                    >
                                      → {col.label}
                                    </Button>
                                  ))}
                                </HStack>
                                <HStack>
                                  <IconButton
                                    aria-label="Editar"
                                    icon={<FaEdit />}
                                    onClick={() => startEdit(task)}
                                    size="xs"
                                    variant="ghost"
                                  />
                                  <IconButton
                                    aria-label="Deletar"
                                    icon={<FaTrash />}
                                    onClick={() => deleteTask(task.id)}
                                    size="xs"
                                    variant="ghost"
                                    colorScheme="red"
                                  />
                                </HStack>
                              </HStack>
                            </>
                          )}
                        </CardBody>
                      </Card>
                    </MotionBox>
                  ))}
                </AnimatePresence>
              </VStack>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
