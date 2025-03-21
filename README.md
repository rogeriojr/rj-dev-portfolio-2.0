# Portfólio Profissional

🌐 **[Veja o Projeto](https://rj-dev-portfolio-20.vercel.app/)**

## 📝 Sobre o Projeto

Este é um portfólio profissional desenvolvido com tecnologias modernas, destacando-se por sua temática espacial única e animações interativas. O projeto apresenta uma interface intuitiva e responsiva, com elementos visuais inspirados no espaço e efeitos de animação envolventes que proporcionam uma experiência imersiva aos visitantes.

## 🚀 Tecnologias Utilizadas

- React.js com TypeScript
- Vite como bundler
- Chakra UI para interface
- Firebase (Authentication e Firestore)
- React Router para navegação
- Framer Motion para animações
- Emotion para estilização
- React Icons para ícones temáticos

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Firebase

### Passos para Instalação

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITÓRIO]
```

1. Instale as dependências:

```bash
npm install
```

1. Configure as variáveis de ambiente:

- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais do Firebase:

```properties
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

1. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 📁 Estrutura de Pastas

```plaintext
├── public/               # Arquivos públicos estáticos
├── src/                  # Código fonte
│   ├── assets/           # Recursos estáticos (imagens, etc)
│   ├── components/       # Componentes React
│   ├── config/          # Configurações (Firebase, etc)
│   ├── contexts/        # Contextos React (Auth, etc)
│   ├── types/           # Definições de tipos TypeScript
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Ponto de entrada da aplicação
├── .env.example         # Exemplo de variáveis de ambiente
└── package.json         # Dependências e scripts
```

## 🖥️ Funcionalidades

### Área Pública

- **Home**: Apresentação pessoal e links profissionais
- **Sobre**: Informações detalhadas sobre experiência e habilidades
- **Portfólio**: Projetos organizados por categorias
  - Desenvolvimento
  - Design
  - Social Media

### Área Administrativa

- Login seguro com Firebase Authentication
- Gerenciamento de projetos
- Upload de imagens
- Edição de conteúdo

### Componentes Interativos

- **Imagem de Perfil Espacial**:
  - Efeitos de borda animados com diferentes temas
  - Botões orbitais interativos (Sol, Lua, Estrela)
  - Animações suaves de pulso e brilho
  - Efeitos de hover em elementos interativos

### Navegação e Interface

- **Design Responsivo**: Adaptação perfeita para diferentes dispositivos
- **Tema Claro/Escuro**: Alternância suave entre modos de visualização
- **Animações Fluidas**: Transições suaves entre componentes e páginas
- **Elementos Espaciais**: Botões e ícones temáticos com efeitos visuais únicos

## 📸 Screenshots
![Preview](https://github.com/user-attachments/assets/6ee0bd6e-0705-43f0-8024-27b66b249ba6)

### Visualização da Home



### Visualização do Portfólio

[Adicionar screenshot da página de portfólio]

### Visualização da Área Administrativa

[Adicionar screenshot do painel administrativo]

## 🔐 Segurança

O projeto implementa as seguintes medidas de segurança:

- Autenticação via Firebase
- Rotas protegidas para área administrativa
- Validação de dados no cliente e servidor
- Variáveis de ambiente para informações sensíveis

## 🚀 Deploy

1. Build do projeto:

```bash
npm run build
```

1. Preview do build:

```bash
npm run preview
```

## 📄 Licença

Este projeto está sob a licença [Adicionar tipo de licença]. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Rogério Júnior

- LinkedIn: [Rogério Júnior](https://www.linkedin.com/in/rogério-júnior-174719120/)
- GitHub: [rogeriojr](https://github.com/rogeriojr)
- Workana: [Perfil Workana](https://www.workana.com/freelancer/5aea67e6fd911e0c207642b63c50fb9d)

---

⭐️ Se este projeto te ajudou, não esqueça de deixar uma estrela!
