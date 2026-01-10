import { useState } from 'react';
import { Box, Button, Grid, GridItem, Heading, HStack, IconButton, Text, useColorModeValue, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'meeting' | 'task' | 'reminder';
}

export const InteractiveCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], title: 'System Deploy', type: 'task' },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newEventTitle, setNewEventTitle] = useState('');

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleAddEvent = () => {
    if (!selectedDate || !newEventTitle) return;
    setEvents([...events, { id: Date.now().toString(), date: selectedDate, title: newEventTitle, type: 'meeting' }]);
    setNewEventTitle('');
    onClose();
  };

  const onDayClick = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    onOpen();
  };

  return (
    <Box bg={bg} p={6} rounded="xl" shadow="xl" border="1px solid" borderColor={borderColor} maxW="500px">
      {/* Header */}
      <HStack justify="space-between" mb={6}>
        <Heading size="md">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</Heading>
        <HStack>
          <IconButton aria-label="Prev" icon={<FaChevronLeft />} size="sm" onClick={handlePrevMonth} />
          <IconButton aria-label="Next" icon={<FaChevronRight />} size="sm" onClick={handleNextMonth} />
        </HStack>
      </HStack>

      {/* Days Header */}
      <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={2}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Text key={day} textAlign="center" fontSize="xs" fontWeight="bold" color="gray.500">{day}</Text>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <GridItem key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayEvents = events.filter(e => e.date === dateStr);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

          return (
            <GridItem
              key={day}
              bg={isToday ? "cyan.900" : "transparent"}
              rounded="md"
              h="60px"
              role="group"
              position="relative"
              border="1px solid"
              borderColor={isToday ? "cyan.500" : "transparent"}
              _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}
              onClick={() => onDayClick(day)}
              p={1}
            >
              <Text fontSize="sm" fontWeight={isToday ? "bold" : "normal"} color={isToday ? "cyan.300" : "inherit"}>{day}</Text>

              {/* Event Dots */}
              <HStack spacing={1} position="absolute" bottom={1} right={1}>
                {dayEvents.map(e => (
                  <Box key={e.id} w="6px" h="6px" rounded="full" bg={e.type === 'task' ? 'purple.400' : 'green.400'} />
                ))}
              </HStack>
            </GridItem>
          );
        })}
      </Grid>

      {/* Add Event Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event on {selectedDate}</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Event Title (e.g., Code Review)"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="cyan" leftIcon={<FaPlus />} onClick={handleAddEvent}>Create Event</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
