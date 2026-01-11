import { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  IconButton,
  useColorModeValue,
  Icon,
  Progress,
  Code,
} from '@chakra-ui/react';
import { FaMicrophone, FaStop, FaPlay, FaPause, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface Recording {
  id: string;
  blob: Blob;
  duration: number;
  timestamp: Date;
}

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [duration, setDuration] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const newRecording: Recording = {
          id: Date.now().toString(),
          blob: audioBlob,
          duration,
          timestamp: new Date(),
        };
        setRecordings([newRecording, ...recordings]);
        setCurrentRecording(newRecording);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playRecording = (recording: Recording) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audioUrl = URL.createObjectURL(recording.blob);
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setPlaybackTime(0);
    };

    audio.ontimeupdate = () => {
      setPlaybackTime(audio.currentTime);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setPlaybackTime(0);
    };

    audio.play();
    setIsPlaying(true);
    setCurrentRecording(recording);
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setPlaybackTime(0);
    }
  };

  const deleteRecording = (id: string) => {
    setRecordings(recordings.filter((r) => r.id !== id));
    if (currentRecording?.id === id) {
      stopPlayback();
      setCurrentRecording(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <Box w="full" maxW="700px" mx="auto">
      <VStack spacing={6} align="stretch">
        <Box p={6} bg={bg} borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <VStack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Gravador de Voz
            </Text>

            <HStack spacing={4}>
              {!isRecording ? (
                <Button
                  leftIcon={<FaMicrophone />}
                  onClick={startRecording}
                  colorScheme="red"
                  size="lg"
                  borderRadius="full"
                  px={8}
                >
                  Iniciar Gravação
                </Button>
              ) : (
                <MotionButton
                  leftIcon={<FaStop />}
                  onClick={stopRecording}
                  colorScheme="red"
                  size="lg"
                  borderRadius="full"
                  px={8}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  Parar ({formatTime(duration)})
                </MotionButton>
              )}
            </HStack>

            {isRecording && (
              <HStack spacing={2}>
                <MotionBox
                  as="span"
                  w={3}
                  h={3}
                  bg="red.500"
                  borderRadius="full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                <Text fontSize="sm" color="red.500" fontWeight="bold">
                  Gravando...
                </Text>
              </HStack>
            )}
          </VStack>
        </Box>

        {currentRecording && (
          <Box p={4} bg={cardBg} borderRadius="lg" border="1px solid" borderColor={borderColor}>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="bold">
                  Reproduzindo
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {formatTime(playbackTime)} / {formatTime(currentRecording.duration)}
                </Text>
              </HStack>
              <Progress
                value={(playbackTime / currentRecording.duration) * 100}
                colorScheme="blue"
                size="sm"
                borderRadius="full"
              />
              <HStack justify="center" spacing={3}>
                {isPlaying ? (
                  <IconButton
                    aria-label="Pausar"
                    icon={<FaPause />}
                    onClick={stopPlayback}
                    colorScheme="blue"
                    size="md"
                    borderRadius="full"
                  />
                ) : (
                  <IconButton
                    aria-label="Reproduzir"
                    icon={<FaPlay />}
                    onClick={() => playRecording(currentRecording)}
                    colorScheme="green"
                    size="md"
                    borderRadius="full"
                  />
                )}
              </HStack>
            </VStack>
          </Box>
        )}

        {recordings.length > 0 && (
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={3}>
              Gravações ({recordings.length})
            </Text>
            <VStack spacing={2} align="stretch">
              {recordings.map((recording) => (
                <MotionBox
                  key={recording.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  p={4}
                  bg={cardBg}
                  borderRadius="md"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <HStack justify="space-between" spacing={3}>
                    <HStack spacing={3} flex={1}>
                      <IconButton
                        aria-label="Reproduzir"
                        icon={currentRecording?.id === recording.id && isPlaying ? <FaPause /> : <FaPlay />}
                        onClick={() => {
                          if (currentRecording?.id === recording.id && isPlaying) {
                            stopPlayback();
                          } else {
                            playRecording(recording);
                          }
                        }}
                        colorScheme="blue"
                        size="sm"
                        borderRadius="full"
                      />
                      <VStack align="start" spacing={0} flex={1}>
                        <Text fontSize="sm" fontWeight="medium">
                          Gravação {recording.id.slice(-4)}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {recording.timestamp.toLocaleString()} • {formatTime(recording.duration)}
                        </Text>
                      </VStack>
                    </HStack>
                    <IconButton
                      aria-label="Deletar"
                      icon={<FaTrash />}
                      onClick={() => deleteRecording(recording.id)}
                      colorScheme="red"
                      size="sm"
                      variant="ghost"
                    />
                  </HStack>
                </MotionBox>
              ))}
            </VStack>
          </Box>
        )}

        <Box p={4} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
          <HStack spacing={2}>
            <Icon as={FaMicrophone} color="blue.500" />
            <Text fontSize="xs" color="blue.700">
              <Code fontSize="xs">MediaRecorder API</Code> para captura de áudio do navegador com
              suporte a gravação, reprodução e gerenciamento de arquivos de áudio
            </Text>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
