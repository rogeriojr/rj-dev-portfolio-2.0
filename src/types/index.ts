export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'social-media' | 'latest' | 'popular';
  images: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  links?: {
    texto: string;
    url: string;
  }[];
}

export interface Certificate {
  titulo: string;
  imagem: string;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: {
    linkedin: string;
    github: string;
    workana: string;
  };
}