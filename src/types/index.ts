export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

export type BilingualString = {
  pt: string;
  en: string;
};

export interface Project {
  id: string;
  title: BilingualString;
  description: BilingualString;
  category: 'development' | 'design' | 'social-media' | 'latest' | 'popular' | null | '' | any;
  images: string[];
  tags?: string[];
  content: BilingualString;
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