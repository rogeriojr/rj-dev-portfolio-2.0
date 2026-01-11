import { useColorModeValue } from '@chakra-ui/react';
import { Project } from '../types';

const PROJECTS_WITH_DARK_BG = ['portaltempoderquemage', 'neoidea', 'calculadora', 'bevaswm'];
const PROJECTS_WITH_WHITE_BG = ['metaway'];

export function useProjectImageBackground(project: Project, defaultLight: string = 'white', defaultDark: string = 'gray.800'): string {
  const projectId = project.id.toLowerCase();
  
  const needsDarkBg = PROJECTS_WITH_DARK_BG.some(id => projectId.includes(id.toLowerCase()));
  const needsWhiteBg = PROJECTS_WITH_WHITE_BG.some(id => projectId.includes(id.toLowerCase()));
  
  if (needsDarkBg) {
    return 'gray.900';
  }
  
  if (needsWhiteBg) {
    return 'white';
  }
  
  return useColorModeValue(defaultLight, defaultDark);
}
