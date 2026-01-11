import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { Box, Text, Icon } from '@chakra-ui/react';
import { useTranslation } from '../i18n/useTranslation';
import { FaRocket, FaFlagCheckered, FaUserAstronaut, FaGlobeAmericas, FaAdjust } from 'react-icons/fa';

export function CodeTour() {
  const { language } = useTranslation();

  const [run, setRun] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenSpaceTour_v5');
    if (!seen) {
      const timer = setTimeout(() => {
        setRun(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: (
        <Box textAlign="center" p={2}>
          <Icon as={FaRocket} w={12} h={12} color="purple.400" mb={4} animation="float 3s ease-in-out infinite" />
          <Text fontWeight="bold" fontSize="2xl" mb={3} color="purple.600">
            {language === 'pt' ? 'Bem-vindo ao Cockpit!' : 'Welcome to the Cockpit!'}
          </Text>
          <Text fontSize="md" color="gray.600" lineHeight="tall">
            {language === 'pt'
              ? 'Sou o Comandante Rogério. Esta é uma interface de alta tecnologia. Permita-me guiá-lo pelos sistemas principais.'
              : 'I am Commander Rogério. This is a high-tech interface. Allow me to guide you through the main systems.'}
          </Text>
        </Box>
      ),
      disableBeacon: true,
    },
    {
      target: '#app-navigation-container',
      content: (
        <Box textAlign="left">
          <Text fontWeight="bold" mb={2} color="purple.400" fontSize="lg">
            <Icon as={FaGlobeAmericas} mr={2} mb={1} />
            {language === 'pt' ? 'Sistema de Navegação' : 'Navigation System'}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {language === 'pt'
              ? 'Acesse os módulos do sistema: Projetos, Sobre e Certificados. Sua jornada começa aqui.'
              : 'Access system modules: Projects, About, and Certificates. Your journey starts here.'}
          </Text>
        </Box>
      ),
    },
    {
      target: '#language-toggle',
      content: (
        <Box textAlign="left">
          <Text fontWeight="bold" mb={2} color="yellow.400" fontSize="lg">
            <Icon as={FaAdjust} mr={2} mb={1} />
            {language === 'pt' ? 'Controles de Ambiente' : 'Environment Controls'}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {language === 'pt'
              ? 'Personalize sua experiência: alterne idiomas ou ative o modo escuro para missões noturnas.'
              : 'Customize your experience: switch languages or activate dark mode for night missions.'}
          </Text>
        </Box>
      ),
    },
    {
      target: '#interactive-profile-wrapper',
      content: (
        <Box textAlign="left">
          <Text fontWeight="bold" mb={2} color="cyan.400" fontSize="lg">
            <Icon as={FaUserAstronaut} mr={2} mb={1} />
            {language === 'pt' ? 'Holo-Perfil Interativo' : 'Interactive Holo-Profile'}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {language === 'pt'
              ? 'O campo de distorção responde ao toque. Arraste minha imagem para interagir com o tecido do espaço-tempo!'
              : 'The distortion field responds to touch. Drag my image to interact with the fabric of space-time!'}
          </Text>
        </Box>
      ),
    },
    {
      target: 'body',
      placement: 'center',
      content: (
        <Box textAlign="center" p={2}>
          <Icon as={FaFlagCheckered} w={10} h={10} color="green.400" mb={4} />
          <Text fontWeight="bold" fontSize="xl" mb={3} color="purple.600">
            {language === 'pt' ? 'Sistemas Operacionais!' : 'Systems Operational!'}
          </Text>
          <Text fontSize="md" color="gray.600">
            {language === 'pt'
              ? 'Você está pronto para explorar. Descubra os projetos e veja o que podemos construir juntos.'
              : 'You are ready to explore. Discover the projects and see what we can build together.'}
          </Text>
        </Box>
      ),
    }
  ];

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      callback={(data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(status)) {
          setRun(false);
          localStorage.setItem('hasSeenSpaceTour_v5', 'true');
        }
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#9F7AEA',
          textColor: '#2D3748',
          backgroundColor: '#FFFFFF',
          arrowColor: '#FFFFFF',
          overlayColor: 'rgba(0, 0, 0, 0.85)',
        },
        buttonNext: {
          backgroundColor: '#9F7AEA',
          color: '#FFF',
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: 'bold',
        },
        buttonBack: {
          color: '#805AD5',
          marginRight: 10,
        },
        tooltip: {
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 0 40px rgba(128, 90, 213, 0.4)',
        }
      }}
      locale={{
        back: language === 'pt' ? 'Voltar' : 'Back',
        close: language === 'pt' ? 'Fechar' : 'Close',
        last: language === 'pt' ? 'Concluir' : 'Finish',
        next: language === 'pt' ? 'Próximo' : 'Next',
        skip: language === 'pt' ? 'Pular' : 'Skip',
      }}
    />
  );
}

