export interface Certificate {
  id: string;
  title: {
    pt: string;
    en: string;
  };
  institution: string;
  hours: number;
  image: string;
  category: 'web' | 'mobile' | 'backend' | 'design' | 'other';
  year: number;
}

export const certificates: Certificate[] = [
  {
    id: 'html-basico',
    title: { pt: 'HTML Básico', en: 'Basic HTML' },
    institution: 'Fundação Bradesco',
    hours: 11,
    image: '/assets/certificates/HTML BÁSICO-11 HRS.jpg',
    category: 'web',
    year: 2015
  },
  {
    id: 'html-avancado',
    title: { pt: 'HTML Avançado', en: 'Advanced HTML' },
    institution: 'Fundação Bradesco',
    hours: 6,
    image: '/assets/certificates/HTML AVANÇADO - 6 HRS.jpg',
    category: 'web',
    year: 2015
  },
  {
    id: 'ilustracao-web',
    title: { pt: 'Ilustração e Design Gráfico para Web', en: 'Illustration and Graphic Design for Web' },
    institution: 'Fundação Bradesco',
    hours: 25,
    image: '/assets/certificates/ILUSTRAÇÃO E DG PARA WEB - 25 HRS.jpg',
    category: 'design',
    year: 2015
  },
  {
    id: 'css-inovador',
    title: { pt: 'Inovando no CSS', en: 'Innovating in CSS' },
    institution: 'Fundação Bradesco',
    hours: 26,
    image: '/assets/certificates/INOVANDO NO CSS - 26 HRS.jpg',
    category: 'web',
    year: 2015
  },
  {
    id: 'fotografia-digital',
    title: { pt: 'Introdução à Fotografia Digital', en: 'Introduction to Digital Photography' },
    institution: 'Fundação Bradesco',
    hours: 27,
    image: '/assets/certificates/INTRO A FOTOGRAFIA DIG - 27 HRS.jpg',
    category: 'design',
    year: 2015
  },
  {
    id: 'intro-informatica',
    title: { pt: 'Introdução à Informática', en: 'Introduction to Informatics' },
    institution: 'Fundação Bradesco',
    hours: 20,
    image: '/assets/certificates/INTRO A INFORMATICA - 20 HRS.jpg',
    category: 'other',
    year: 2014
  },
  {
    id: 'j2me',
    title: { pt: 'Programação J2ME', en: 'J2ME Programming' },
    institution: 'Fundação Bradesco',
    hours: 54,
    image: '/assets/certificates/J2ME - 54 HRS.jpg',
    category: 'mobile',
    year: 2015
  },
  {
    id: 'nlw-devops',
    title: { pt: 'NLW Unite - DevOps', en: 'NLW Unite - DevOps' },
    institution: 'Rocketseat',
    hours: 8,
    image: '/assets/certificates/NLW Unite - DevOps.jpg',
    category: 'backend',
    year: 2024
  },
  {
    id: 'nlw-fullstack',
    title: { pt: 'NLW Unite - Fullstack', en: 'NLW Unite - Fullstack' },
    institution: 'Rocketseat',
    hours: 12,
    image: '/assets/certificates/NLW Unite - Fullstack.jpg',
    category: 'web',
    year: 2024
  },
  {
    id: 'nlw-nodejs',
    title: { pt: 'NLW Unite - Node.js', en: 'NLW Unite - Node.js' },
    institution: 'Rocketseat',
    hours: 10,
    image: '/assets/certificates/NLW Unite - Nodejs.jpg',
    category: 'backend',
    year: 2024
  },
  {
    id: 'nlw-react-native',
    title: { pt: 'NLW Unite - React Native', en: 'NLW Unite - React Native' },
    institution: 'Rocketseat',
    hours: 10,
    image: '/assets/certificates/NLW Unite - React Native.jpg',
    category: 'mobile',
    year: 2024
  },
  {
    id: 'nlw-reactjs',
    title: { pt: 'NLW Unite - React.js', en: 'NLW Unite - React.js' },
    institution: 'Rocketseat',
    hours: 10,
    image: '/assets/certificates/NLW Unite - Reactjs.jpg',
    category: 'web',
    year: 2024
  },
  {
    id: 'programacao-c',
    title: { pt: 'Programação em C', en: 'C Programming' },
    institution: 'Fundação Bradesco',
    hours: 42,
    image: '/assets/certificates/PROGRAMAÇÃO EM C.jpg',
    category: 'backend',
    year: 2015
  }
];
