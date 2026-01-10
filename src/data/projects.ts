import { Project } from "../types";

export const PROJECT_OVERRIDES: Record<string, Partial<Project>> = {
  "jornadaser": {
    title: {
      pt: "Jornada do Ser",
      en: "Journey of Being"
    },
    description: {
      pt: "Ecossistema de streaming e E-learning gamificado focado em alta escalabilidade e retenção de usuários.",
      en: "Gamified streaming and E-learning ecosystem focused on high scalability and user retention."
    },
    images: ["/assets/projects/jornada_do_ser.jpg"],
    tags: ["React", "Next.js", "Streaming", "Gamificação", "SSR", "SEO Expert"],
    content: {
      pt: `
### Arquitetura de Streaming e E-learning
Desenvolvimento de uma plataforma robusta para consumo de conteúdo em vídeo com foco em performance e experiência do usuário (UX).

#### Engenharia e Desafios:
- **SSG/SSR**: Implementação de Next.js para garantir indexação perfeita (SEO) e carregamento instantâneo.
- **Player Customizado**: Integração de players otimizados com controle de progresso e bitrate adaptativo.
- **Engagement Engine**: Sistema de gamificação com conquistas e trilhas de aprendizado dinâmicas.

#### Impacto Técnico:
- Redução de 40% no Time to Interactive (TTI) através de code-splitting e lazy loading avançado.
- Estrutura modular preparada para suportar +100k alunos simultâneos.
    `,
      en: `
### Streaming & E-learning Architecture
Development of a robust platform for video content consumption focused on performance and user experience (UX).

#### Engineering & Challenges:
- **SSG/SSR**: Next.js implementation to ensure perfect indexing (SEO) and instant loading.
- **Custom Player**: Integration of optimized players with progress control and adaptive bitrate.
- **Engagement Engine**: Gamification system with achievements and dynamic learning paths.

#### Technical Impact:
- 40% reduction in Time to Interactive (TTI) through code-splitting and advanced lazy loading.
- Modular structure prepared to support +100k simultaneous students.
    `
    }
  },
  "simerpay": {
    title: {
      pt: "SimerPay",
      en: "SimerPay"
    },
    description: {
      pt: "Ecosistema Fintech completo englobando E-commerce, Mobile App e Dashboard Administrativo de alta complexidade.",
      en: "Complete Fintech ecosystem encompassing E-commerce, Mobile App, and highly complex Administrative Dashboard."
    },
    images: [
      "/assets/projects/simerpay.png",
      "/assets/projects/simerpay_app_1.png",
      "/assets/projects/simerpay_app_2.png",
      "/assets/projects/simerpay_app_3.png",
      "/assets/projects/simerpay_app_4.png",
      "/assets/projects/simerpay_app_5.png"
    ],
    tags: ["Fintech", "React", "React Native", "Gateways", "Transacional", "E-commerce"],
    links: [
      { texto: "Site Oficial", url: "https://www.simerenergia.com.br/" },
      { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.simerpay&hl=pt_BR" },
      { texto: "Apple Store", url: "https://apps.apple.com/br/app/simer-pay/id1590387388" }
    ],
    content: {
      pt: `
### Fintech Ecosystem & Financial Management
Desenvolvimento Full-Cycle de uma plataforma financeira robusta para gestão de microtransações e e-commerce de energia.

#### Destaques Técnicos:
- **Unified Codebase**: Utilização de padrões de design compartilhados entre Web (React) e Mobile (React Native).
- **Transacional Segura**: Fluxos de checkout complexos com integração direta a múltiplos gateways de pagamento.
- **Data Visualization**: Dashboards analíticos para monitoramento de vendas e fluxos de caixa em tempo real.

#### Minha Atuação Estratégica:
- Definição da arquitetura de frontend focada em manutenibilidade e escalabilidade.
- Implementação de segurança avançada seguindo padrões PCI para proteção de dados sensíveis.
    `,
      en: `
### Fintech Ecosystem & Financial Management
Full-Cycle development of a robust financial platform for microtransaction management and energy e-commerce.

#### Technical Highlights:
- **Unified Codebase**: Use of shared design patterns between Web (React) and Mobile (React Native).
- **Secure Transactions**: Complex checkout flows with direct integration to multiple payment gateways.
- **Data Visualization**: Analytical dashboards for real-time sales monitoring and cash flow.

#### My Strategic Role:
- Definition of frontend architecture focused on maintainability and scalability.
- Implementation of advanced security following PCI standards for sensitive data protection.
    `
    }
  },
  "metodocis": {
    title: {
      pt: "Método CIS",
      en: "CIS Method"
    },
    description: {
      pt: "Hub digital de inteligência emocional projetado para suportar tráfego massivo e gestão crítica de eventos ao vivo.",
      en: "Digital emotional intelligence hub designed to support massive traffic and critical live event management."
    },
    images: ["/assets/projects/metodo_cis.png"],
    tags: ["High Traffic", "Next.js", "Azure", "Sustentação Crítica", "Performance"],
    content: {
      pt: `
### Plataforma de Alta Disponibilidade para Grandes Eventos
Suporte tecnológico ao maior treinamento de inteligência emocional do mundo, exigindo 99.9% de uptime sob carga extrema.

#### Engenharia de Performance:
- **Sustentação em Eventos**: Monitoramento em tempo real e escalonamento reativo durante picos de acesso.
- **Refatoração Estrutural**: Migração sistêmica de módulos críticos para TypeScript para aumentar a segurança de tipos.
- **Otimização de Assets**: Estratégias de cache agressivas via CDN para entrega de conteúdo global.

#### Resultados Obtidos:
- Experiência de usuário fluida mesmo durante picos de +50k usuários simultâneos no portal.
- Redução drástica de bugs em produção através de testes de integração e cobertura de tipos.
    `,
      en: `
### High Availability Platform for Large Events
Technological support for the world's largest emotional intelligence training, requiring 99.9% uptime under extreme load.

#### Performance Engineering:
- **Event Support**: Real-time monitoring and reactive scaling during access peaks.
- **Structural Refactoring**: Systemic migration of critical modules to TypeScript to increase type safety.
- **Asset Optimization**: Aggressive caching strategies via CDN for global content delivery.

#### Results Achieved:
- Smooth user experience even during peaks of +50k simultaneous users on the portal.
- Drastic reduction of production bugs through integration testing and type coverage.
    `
    }
  },
  "autoconect": {
    title: {
      pt: "Autoconect",
      en: "Autoconect"
    },
    description: {
      pt: "Plataforma CRM e de Gestão de Vendas dedicada ao setor automotivo e segurador, com foco em automação de funil.",
      en: "CRM and Sales Management platform dedicated to the automotive and insurance sector, focused on funnel automation."
    },
    images: ["/assets/projects/autoconect_logo.png"],
    tags: ["CRM", "React", "Dashboard", "Sales Automation", "Analytics"],
    content: {
      pt: `
### Gestão Inteligente para o Setor Automotivo
Sistema focado em otimizar o ciclo de vendas e pós-vendas de veículos e corretagem de seguros.

#### Funcionalidades Profissionais:
- **Funil de Vendas Automatizado**: Gestão de leads com automação de notificações e follow-ups.
- **Relatórios Customizados**: Motor de geração de relatórios dinâmicos para análise de KPIs comerciais.
- **Interface Inteligente**: Dashboard focado em produtividade para consultores de vendas.

#### Diferencial Técnico:
- Arquitetura de componentes reutilizáveis que acelerou o tempo de desenvolvimento de novas features em 30%.
- Integração de APIs de terceiros para consulta de fipe e bases seguradoras.
    `,
      en: `
### Intelligent Management for the Automotive Sector
System focused on optimizing the sales and after-sales cycle of vehicles and insurance brokerage.

#### Professional Features:
- **Automated Sales Funnel**: Lead management with notification and follow-up automation.
- **Custom Reports**: Dynamic report generation engine for commercial KPI analysis.
- **Intelligent Interface**: Productivity-focused dashboard for sales consultants.

#### Technical Advantage:
- Reusable component architecture that accelerated new feature development time by 30%.
- Third-party API integration for FIPE consultation and insurance databases.
    `
    }
  },
  "bevaswm": {
    title: {
      pt: "Bevas Wealth Management",
      en: "Bevas Wealth Management"
    },
    description: {
      pt: "Plataforma exclusiva de gestão patrimonial e investimentos focada em High Net Worth Individuals (HNWI).",
      en: "Exclusive wealth management and investment platform focused on High Net Worth Individuals (HNWI)."
    },
    images: ["/assets/projects/bevas_logo.png"],
    tags: ["Fintech", "Wealth", "Security", "React", "Data Visualization"],
    content: {
      pt: `
### Gestão Patrimonial de Alta Precisão
Boutique system developed to manage complex investment portfolios with banking-grade security.

#### Foco no Cliente Premium:
- **Visão 360º de Ativos**: Dashboard consolidado que agrega investimentos on-shore e off-shore.
- **Segurança Militar**: Criptografia de ponta a ponta e autenticação multifator para proteção de dados sensíveis.
- **Relatórios Automatizados**: Geração de PDFs detalhados de performance e rentabilidade mensal.

#### Engenharia de Software:
- Arquitetura segura isolada da internet pública para dados críticos.
- Interface minimalista e elegante, refletindo a sofisticação da marca.
    `,
      en: `
### High Precision Wealth Management
Boutique system developed to manage complex investment portfolios with banking-grade security.

#### Focus on Premium Client:
- **360º Asset View**: Consolidated dashboard aggregating on-shore and off-shore investments.
- **Military Security**: End-to-end encryption and multi-factor authentication for sensitive data protection.
- **Automated Reports**: Generation of detailed monthly performance and profitability PDFs.

#### Software Engineering:
- Secure architecture isolated from public internet for critical data.
- Minimalist and elegant interface, reflecting the brand's sophistication.
    `
    }
  },
  "minimegaleitor": {
    title: {
      pt: "Mini Mega Leitor",
      en: "Mini Mega Reader"
    },
    description: {
      pt: "EdTech focada em alfabetização e fluência em leitura através de uma jornada de aprendizado gamificada e interativa.",
      en: "EdTech focused on literacy and reading fluency through a gamified and interactive learning journey."
    },
    images: ["/assets/projects/minimegaleitor_logo.png"],
    tags: ["EdTech", "Education", "React", "Gamification", "LMS"],
    content: {
      pt: `
### Inovação na Educação Infantil
Plataforma educacional complexa que transforma o processo de aprendizagem em uma experiência lúdica e engajadora.

#### Implementação Técnica:
- **Interatividade Avançada**: Utilização de animações e transições suaves para manter o engajamento infantil.
- **Acompanhamento Pedagógico**: Painel completo para que educadores e pais monitorem a evolução individual.
- **Trilhas Adaptativas**: Lógica que ajusta o nível de dificuldade com base no desempenho do aluno.

#### Resultados:
- Plataforma premiada por sua facilidade de uso e impacto positivo no desenvolvimento de leitura.
- Arquitetura front-end modular facilitando a expansão para novos módulos educativos.
    `,
      en: `
### Innovation in Early Childhood Education
Complex educational platform that transforms the learning process into a playful and engaging experience.

#### Technical Implementation:
- **Advanced Interactivity**: Use of animations and smooth transitions to maintain children's engagement.
- **Pedagogical Monitoring**: Complete panel for educators and parents to monitor individual progress.
- **Adaptive Paths**: Logic that adjusts difficulty level based on student performance.

#### Results:
- Award-winning platform for its ease of use and positive impact on reading development.
- Modular front-end architecture facilitating expansion to new educational modules.
    `
    }
  },
  "meusocialpost": {
    title: {
      pt: "Meu Social Post",
      en: "My Social Post"
    },
    description: {
      pt: "Plataforma SaaS de Marketing Digital para automação de postagens e gestão estratégica de presença social.",
      en: "Digital Marketing SaaS platform for post automation and strategic social presence management."
    },
    images: ["/assets/projects/meusocialpost_logo.png"],
    tags: ["SaaS", "Social Media", "Marketing Tech", "React", "Automation"],
    content: {
      pt: `
### Gestão Estratégica de Redes Sociais
Solução para profissionais de marketing gerenciarem múltiplos perfis e agendarem conteúdos de forma centralizada.

#### Inovações Técnicas:
- **Scheduler Inteligente**: Sistema de agendamento visual com calendário dinâmico e drag-and-drop.
- **Analytics Integrado**: Visualização clara de métricas de engajamento e performance de posts.
- **Multi-tenant SaaS**: Arquitetura escalável para servir desde pequenos usuários a grandes agências.

#### Atuação Sênior:
- Liderança no desenvolvimento da interface do usuário, focando em usabilidade e redução de cliques para tarefas comuns.
- Integração com APIs de redes sociais respeitando limites de taxa e políticas oficiais.
    `,
      en: `
### Strategic Social Media Management
Solution for marketing professionals to manage multiple profiles and schedule content centrally.

#### Technical Innovations:
- **Smart Scheduler**: Visual scheduling system with dynamic calendar and drag-and-drop.
- **Integrated Analytics**: Clear visualization of engagement metrics and post performance.
- **Multi-tenant SaaS**: Scalable architecture to serve from small users to large agencies.

#### Senior Role:
- Leadership in user interface development, focusing on usability and reducing clicks for common tasks.
- Integration with social media APIs respecting rate limits and official policies.
    `
    }
  },
  "plantaoextra": {
    title: {
      pt: "Plantão Extra",
      en: "Extra Shift"
    },
    description: {
      pt: "Sistema de missão crítica para gestão de escalas médicas e rostering hospitalar de alta disponibilidade.",
      en: "Mission-critical system for medical shift management and high-availability hospital rostering."
    },
    images: ["/assets/projects/plantao_extra_logo.png"],
    tags: ["HealthTech", "Resilience", "React Native", "Real-time Telemetry", "Node.js"],
    content: {
      pt: `
### Gestão Hospitalar de Missão Crítica
Solução vital para a operação de hospitais, gerenciando escalas complexas de médicos e equipes de saúde.

#### Engenharia e Resiliência:
- **Zero Downtime**: Sistema projetado com alta tolerância a falhas, crucial durante picos de demanda na saúde pública.
- **Telemetria em Tempo Real**: Painéis de monitoramento para gestores hospitalares visualizarem alocação de equipes instantaneamente.
- **App Multi-plataforma**: Aplicação mobile para que médicos gerenciem seus plantões e trocas de forma intuitiva.

#### Impacto Social e Técnico:
- Peça fundamental na gestão de equipes de saúde no estado de Goiás durante a pandemia.
- UX otimizada para profissionais sob alta pressão, garantindo rapidez e precisão na gestão de plantões.
    `,
      en: `
### Mission-Critical Hospital Management
Vital solution for hospital operations, managing complex schedules of doctors and healthcare teams.

#### Engineering & Resilience:
- **Zero Downtime**: System designed with high fault tolerance, crucial during public health demand peaks.
- **Real-time Telemetry**: Monitoring panels for hospital managers to instantly visualize team allocation.
- **Multi-platform App**: Mobile application for doctors to intuitively manage their shifts and exchanges.

#### Social & Technical Impact:
- Fundamental piece in healthcare team management in Goiás state during the pandemic.
- Optimized UX for professionals under high pressure, ensuring speed and precision in shift management.
    `
    }
  },
  "plantao-extra": {
    title: {
      pt: "Plantão Extra",
      en: "Extra Shift"
    },
    description: {
      pt: "Sistema de missão crítica para gestão de escalas médicas e rostering hospitalar de alta disponibilidade.",
      en: "Mission-critical system for medical shift management and high-availability hospital rostering."
    },
    images: ["/assets/projects/plantao_extra_logo.png"],
    tags: ["HealthTech", "Resilience", "React Native", "Real-time Telemetry", "Node.js"],
    content: {
      pt: `
### Gestão Hospitalar de Missão Crítica
Solução vital para a operação de hospitais, gerenciando escalas complexas de médicos e equipes de saúde.

#### Engenharia e Resiliência:
- **Zero Downtime**: Sistema projetado com alta tolerância a falhas, crucial durante picos de demanda na saúde pública.
- **Telemetria em Tempo Real**: Painéis de monitoramento para gestores hospitalares visualizarem alocação de equipes instantaneamente.
- **App Multi-plataforma**: Aplicação mobile para que médicos gerenciem seus plantões e trocas de forma intuitiva.

#### Impacto Social e Técnico:
- Peça fundamental na gestão de equipes de saúde no estado de Goiás durante a pandemia.
- UX otimizada para profissionais sob alta pressão, garantindo rapidez e precisão na gestão de plantões.
    `,
      en: `
### Mission-Critical Hospital Management
Vital solution for hospital operations, managing complex schedules of doctors and healthcare teams.

#### Engineering & Resilience:
- **Zero Downtime**: System designed with high fault tolerance, crucial during public health demand peaks.
- **Real-time Telemetry**: Monitoring panels for hospital managers to instantly visualize team allocation.
- **Multi-platform App**: Mobile application for doctors to intuitively manage their shifts and exchanges.

#### Social & Technical Impact:
- Fundamental piece in healthcare team management in Goiás state during the pandemic.
- Optimized UX for professionals under high pressure, ensuring speed and precision in shift management.
    `
    }
  },
  "portaltempoderquemage": {
    title: {
      pt: "Portal Tem Poder Quem Age",
      en: "Power to Those Who Act Portal"
    },
    description: {
      pt: "Home oficial dos alunos da Febracis, conectando milhares de usuários a conteúdos transformadores de inteligência emocional.",
      en: "Official home for Febracis students, connecting thousands of users to transformative emotional intelligence content."
    },
    images: ["/assets/projects/portaltempoderquemage_logo.png"],
    tags: ["Education", "Coaching", "React", "High Traffic", "Video Streaming"],
    content: {
      pt: `
### O Maior Portal de Desenvolvimento Humano da América Latina
Hub central para distribuição de conteúdo, gestão de ingressos e comunidade para alunos da Febracis.

#### Desafios de Escala e UX:
- **Streaming Seguro**: Entrega de vídeo protegida para conteúdos exclusivos de cursos premium.
- **Integração de Ecossistema**: Single Sign-On (SSO) conectando múltiplas plataformas educacionais da holding.
- **Gamificação de Aprendizado**: Sistema de progresso que incentiva o consumo contínuo de material didático.

#### Minha Contribuição:
- Reescrita da camada de frontend para melhorar o SEO e o tempo de carregamento inicial.
- Implementação de área de membros com suporte a múltiplos níveis de acesso (ACL).
    `,
      en: `
### Latin America's Largest Human Development Portal
Central hub for content distribution, ticket management, and community for Febracis students.

#### Scale & UX Challenges:
- **Secure Streaming**: Protected video delivery for exclusive premium course content.
- **Ecosystem Integration**: Single Sign-On (SSO) connecting multiple educational platforms of the holding.
- **Learning Gamification**: Progress system that encourages continuous consumption of educational material.

#### My Contribution:
- Rewriting the frontend layer to improve SEO and initial load time.
- Implementation of member area with support for multiple access levels (ACL).
    `
    }
  }
};

export const NEW_STATIC_PROJECTS: Project[] = [
  {
    id: "neoidea-ai-chat",
    title: {
      pt: "NeoIdea AI Chat & RAG",
      en: "NeoIdea AI Chat & RAG"
    },
    description: {
      pt: "Engine corporativa de IA com RAG (Retrieval-Augmented Generation) para processamento de conhecimento massivo.",
      en: "Corporate AI engine with RAG (Retrieval-Augmented Generation) for massive knowledge processing."
    },
    category: "development",
    images: ["/assets/projects/neoidea_logo_new.jpg", "/assets/projects/neoidea_chat.png"],
    tags: ["Artificial Intelligence", "RAG", "GPT-4", "Vector Databases", "AI Agents"],
    content: {
      pt: `
### Autoridade e Inteligência em Videoconferência
A sua videoconferência diz muito sobre o nível da sua marca. E quando ela acontece em um ambiente genérico, o impacto também é genérico. 

Com a **Neo Idea**, você cria um espaço que realmente representa o seu negócio: um ambiente próprio, com sua identidade, sua URL e um **Agente de IA** capaz de lembrar tudo o que foi dito na reunião. É a combinação de tecnologia, autoridade e experiência que sua marca merece desde o primeiro clique.

#### Arquitetura de Inteligência:
- **Core Engine**: Orquestração sofisticada de LLMs (OpenAI GPT-4) utilizando padrões de Agentes de IA para sumarização e memória de reuniões.
- **Vector Pipeline**: Processamento e armazenamento vetorial via Supabase (pgvector) para busca semântica em históricos de conversas.
- **Data Ingestion**: Base dinâmica que processa áudio e documentos transformando-os em conhecimento ativo em tempo real.

#### Soluções de Engenharia:
- **Branded Environments**: White-labeling completo com subdomínios personalizados e identidade visual dinâmica.
- **Streaming UI**: Interface de chat e interatividade com respostas em tempo real para uma experiência premium.
- **Context Memory**: Algoritmos de RAG otimizados para recuperar contextos específicos de reuniões passadas.
    `,
      en: `
### Authority and Intelligence in Video Conferencing
Your video conference says a lot about your brand's level. When it happens in a generic environment, the impact is also generic.

With **Neo Idea**, you create a space that truly represents your business: your own environment, with your identity, your URL, and an **AI Agent** capable of remembering everything said in the meeting. It's the combination of technology, authority, and experience your brand deserves from the first click.

#### Intelligence Architecture:
- **Core Engine**: Sophisticated orchestration of LLMs (OpenAI GPT-4) using AI Agent patterns for meeting summarization and memory.
- **Vector Pipeline**: Vector processing and storage via Supabase (pgvector) for semantic search in conversation histories.
- **Data Ingestion**: Dynamic base that processes audio and documents, transforming them into active knowledge in real-time.

#### Engineering Solutions:
- **Branded Environments**: Complete white-labeling with custom subdomains and dynamic visual identity.
- **Streaming UI**: Chat and interactivity interface with real-time responses for a premium experience.
- **Context Memory**: Optimized RAG algorithms to retrieve specific contexts from past meetings.
    `
    },
    links: [
      { texto: "Demo Chat", url: "https://ai-srv.neoidea.com.br/?uuid=bca740bd02d746f1adfb97e6d8e3d2ae&room_id=e39ca8003b410be0be0afdb81ec6e0ce&user=2fffe3b570e2e33eff1ee9d3ec3f6746&password=23e4b3eb0ac3ae12d4f9e13372b49cda" }
    ],
    // Removed new Date calls to ensure historical accuracy, handled via projectDates mapping
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "neoidea-platform-v2",
    title: {
      pt: "Plataforma NeoIdea 2.0",
      en: "NeoIdea Platform 2.0"
    },
    description: {
      pt: "Plataforma SaaS Enterprise Multitenant e Whitelabel com alto grau de customização dinâmica.",
      en: "Multitenant and Whitelabel Enterprise SaaS Platform with high degree of dynamic customization."
    },
    category: "development",
    images: [
      "/assets/projects/neoidea_logo_2024.png",
      "/assets/projects/neoidea_platform.png",
      "/assets/projects/neoidea_repi.png"
    ],
    tags: ["Whitelabel", "SaaS Enterprise", "Multitenancy", "Theming Engine", "React"],
    content: {
      pt: `
### Arquitetura SaaS Enterprise Whitelabel
Desenvolvimento de uma plataforma 'Core' capaz de servir múltiplos grandes clientes corporativos através de uma única infraestrutura.

#### Engenharia do Motor Whitelabel:
- **Dynamic Theming Engine**: Lógica central que injeta CSS Variables e configurações visuais baseadas no contexto do Tenant.
- **Slug-based Routing**: Sistema de detecção de empresa via URL que carrega módulos e permissões em runtime.
- **Modular Framework**: Biblioteca de componentes internos agnóstica a marca, permitindo reuso total de código.

#### Cases de Sucesso Integrados:
- **Inova Plástica**: Workflow complexo de submissão e avaliação de projetos industriais.
- **REPI**: Módulo de incentivos fiscais e programas de inovação recorrentes.
- **SimerPay**: Integração seamless de fluxos financeiros e dashboards de pagamento dentro do portal Panda.
    `,
      en: `
### Enterprise SaaS Whitelabel Architecture
Development of a 'Core' platform capable of serving multiple large corporate clients through a single infrastructure.

#### Whitelabel Engine Engineering:
- **Dynamic Theming Engine**: Central logic that injects CSS Variables and visual configurations based on Tenant context.
- **Slug-based Routing**: Company detection system via URL that loads modules and permissions at runtime.
- **Modular Framework**: Brand-agnostic internal component library, allowing complete code reuse.

#### Integrated Success Cases:
- **Inova Plástica**: Complex workflow for submission and evaluation of industrial projects.
- **REPI**: Tax incentive module and recurring innovation programs.
- **SimerPay**: Seamless integration of financial flows and payment dashboards within the Panda portal.
    `
    },
    links: [
      { texto: "Plataforma Base", url: "https://plataforma.neoidea.com.br/" },
      { texto: "Case Inova Plástica", url: "https://plataforma.neoidea.com.br/inovaplastica" },
      { texto: "Case REPI", url: "http://plataforma.neoidea.com.br/repi" }
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "clubshare",
    title: {
      pt: "ClubShare",
      en: "ClubShare"
    },
    description: {
      pt: "Fintech de benefícios corporativos com foco em escalabilidade, arquitetura mobile-first e UX de alta conversão.",
      en: "Corporate benefits Fintech focused on scalability, mobile-first architecture, and high-conversion UX."
    },
    category: "development",
    images: ["/assets/projects/clubshare_logo.png", "/assets/projects/clubshare_screenshot.png"],
    tags: ["Fintech", "Mobile First", "React", "TypeScript", "Branding Transition"],
    content: {
      pt: `
### Modernização e Liderança em Digital Benefits
Atuação como especialista front-end na transformação da marca (rebranding) e escalabilidade da plataforma de benefícios.

#### Desafios e Soluções:
- **Otimização de Performance**: Redução massiva do bundle size para garantir carregamento instantâneo em conexões instáveis.
- **Geolocalização**: Sistema inteligente de descoberta de benefícios baseados na localização física do colaborador.
- **Arquitetura modular de Estilos**: Implementação de um Design System via Styled Components com suporte a multi-branding.

#### Core Business Modules:
- **Benefícios Flexíveis**: Fluxo complexo de resgate e gestão de saldo de benefícios.
- **Merchant Dashboard**: Painel para lojistas parceiros gerenciarem suas ofertas e cashback.
    `,
      en: `
### Modernization and Leadership in Digital Benefits
Acting as a front-end specialist in brand transformation (rebranding) and benefits platform scalability.

#### Challenges and Solutions:
- **Performance Optimization**: Massive bundle size reduction to ensure instant loading on unstable connections.
- **Geolocation**: Intelligent benefit discovery system based on employee's physical location.
- **Modular Style Architecture**: Implementation of a Design System via Styled Components with multi-branding support.

#### Core Business Modules:
- **Flexible Benefits**: Complex flow for benefit redemption and balance management.
- **Merchant Dashboard**: Panel for partner merchants to manage their offers and cashback.
    `
    },
    links: [
      { texto: "Acessar Plataforma", url: "https://www.clubshare.com.br/login" }
    ],
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01")
  },
  {
    id: "pegpag-smart24",
    title: {
      pt: "Peg Pag Smart 24h",
      en: "Peg Pag Smart 24h"
    },
    description: {
      pt: "Ecossistema Retail Tech para Micromarkets (lojas autônomas) com integração HW/Mobile de alta disponibilidade.",
      en: "Retail Tech ecosystem for Micromarkets (autonomous stores) with high-availability HW/Mobile integration."
    },
    category: "development",
    images: [
      "/assets/projects/pegpag_logo.png",
      "/assets/projects/pegpag_logo_clean.png",
      "/assets/projects/pegpag_login.png",
      "/assets/projects/pegpag_home.png",
      "/assets/projects/pegpag_admin_dashboard.png",
      "/assets/projects/pegpag_admin_sms.png",
      "/assets/projects/pegpag_admin_login.png",
      "/assets/projects/pegpag_access_logs.png",
      "/assets/projects/pegpag_registration.png"
    ],
    tags: ["Micromarkets", "React Native", "Retail Tech", "Hardware Integration", "Dashboard"],
    content: {
      pt: `
### Ecossistema Completo para Varejo Autônomo
Arquitetura integrada de ponta a ponta que permite a operação de lojas 24h sem funcionários, com total controle remoto.

#### Engenharia Full-Stack:
- **App de Compra (React Native)**: Experiência 'Scan & Go' otimizada, com integração de scanner de alto desempenho e check-out em 3 cliques.
- **Admin Command Center**: Painel administrativo para gestão de inventário, monitoramento de saúde de PDVs e conciliação financeira automatizada.
- **Hardware Bridge**: Desenvolvimento de serviços de integração com fechaduras biométricas e sistemas de pesagem inteligente.

#### Confiabilidade e Operação:
- **Offline Resilience**: Lógica de sincronização que permite compras básicas mesmo com instabilidade momentânea de internet.
- **Store Stewardship**: Responsável por todo o pipeline de deploy nas lojas oficiais Apple e Google.
    `,
      en: `
### Complete Ecosystem for Autonomous Retail
End-to-end integrated architecture that enables 24/7 store operations without employees, with full remote control.

#### Full-Stack Engineering:
- **Shopping App (React Native)**: Optimized 'Scan & Go' experience, with high-performance scanner integration and 3-click checkout.
- **Admin Command Center**: Administrative panel for inventory management, POS health monitoring, and automated financial reconciliation.
- **Hardware Bridge**: Development of integration services with biometric locks and intelligent weighing systems.

#### Reliability and Operation:
- **Offline Resilience**: Synchronization logic that allows basic purchases even with momentary internet instability.
- **Store Stewardship**: Responsable for the entire deployment pipeline on official Apple and Google stores.
    `
    },
    links: [
      { texto: "Painel Admin", url: "https://pegpagsmart24.com/login" },
      { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.pegpag.smart24&hl=pt_BR" },
      { texto: "Apple Store", url: "https://apps.apple.com/br/app/peg-pag-smart-24h/id6740469103" }
    ],
    createdAt: new Date("2022-01-01"),
    updatedAt: new Date("2022-01-01")
  },
  {
    id: "pandaparking",
    title: {
      pt: "Panda Parking - Zona Azul",
      en: "Panda Parking - Blue Zone"
    },
    description: {
      pt: "App de Smart City para mobilidade urbana, utilizando geofencing e integração governamental de tempo real.",
      en: "Smart City app for urban mobility, using geofencing and real-time government integration."
    },
    category: "development",
    images: [
      "/assets/projects/pandaparking_logo.png",
      "/assets/projects/panda_mockup_1.png",
      "/assets/projects/panda_dashboard.png",
      "/assets/projects/panda_login.png",
      "/assets/projects/panda_history.png",
      "/assets/projects/panda_mockup_2.png"
    ],
    tags: ["Smart City", "React Native", "Geofencing", "Mobilidade Urbana", "GovTech"],
    content: {
      pt: `
### Solução de Mobilidade para Cidades Inteligentes
Plataforma oficial de estacionamento rotativo que simplifica a vida de milhares de motoristas diariamente.

#### Desafios Técnicos Superados:
- **Low-Power Geolocation**: Otimização de algoritmos de localização para geofencing sem drenar a bateria do usuário.
- **Escalabilidade Transacional**: Motor de pagamentos preparado para processar milhares de cupons de estacionamento por hora.
- **Integração com Órgãos de Trânsito**: Barramento de serviços que garante a integridade e validade jurídica de cada cupom emitido.

#### Diferenciais do Produto:
- **Multi-city Core**: Aplicativo unificado que adapta regras tarifárias e interface baseando-se na geolocalização exata do veículo.
- **PDV Web App**: Sistema para micro-comerciantes venderem cupons físicos integrados à frota digital.
    `,
      en: `
### Mobility Solution for Smart Cities
Official rotating parking platform that simplifies the lives of thousands of drivers daily.

#### Technical Challenges Overcome:
- **Low-Power Geolocation**: Optimization of location algorithms for geofencing without draining user battery.
- **Transactional Scalability**: Payment engine prepared to process thousands of parking coupons per hour.
- **Integration with Traffic Authorities**: Service bus that ensures the integrity and legal validity of each issued coupon.

#### Product Differentials:
- **Multi-city Core**: Unified application that adapts tariff rules and interface based on exact vehicle geolocation.
- **PDV Web App**: System for micro-merchants to sell physical coupons integrated with the digital fleet.
    `
    },
    links: [
      { texto: "Site Oficial", url: "http://pandaparking.com.br/" },
      { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.pandaparkingmobile&hl=pt_BR" },
      { texto: "Apple Store", url: "https://apps.apple.com/br/app/novo-panda-parking-zona-azul/id6449155370" }
    ],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01")
  },
  {
    id: "teste-gerenciamento-produtos",
    title: {
      pt: "Sistema de Gerenciamento de Produtos",
      en: "Product Management System"
    },
    description: {
      pt: "Aplicação web completa para gerenciamento de produtos com filtros avançados, paginação e layout totalmente responsivo.",
      en: "Complete web application for product management with advanced filters, pagination, and fully responsive layout."
    },
    category: "development",
    images: ["/assets/projects/gerenciamento_produtos.png"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "State Management", "Responsive Design", "Testing"],
    links: [
      { texto: "Ver Demo", url: "https://teste-gerenciamento-produtos.vercel.app/" },
      { texto: "GitHub", url: "https://github.com/rogeriojr/teste-gerenciamento-produtos" }
    ],
    content: {
      pt: `
### Sistema de Gerenciamento de Produtos
Interface administrativa moderna desenvolvida com o ecossistema Next.js, focada em alto desempenho e experiência de usuário fluida.

#### Arquitetura e Engenharia:
- **Next.js 14 + App Router**: Utilização de Server Components para renderização otimizada e Client Components para interatividade.
- **Gerenciamento de Estado**: Implementação de fluxos de dados eficientes para filtros complexos e paginação.
- **Tailwind CSS**: Design system customizado seguindo padrões modernos de UI/UX.

#### Funcionalidades Críticas:
- **Dashboard de Produtos**: Visualização clara com métricas de inventário.
- **Filtros Inteligentes**: Sistema de busca e filtragem multi-critério (categoria, preço, status).
- **CRUD Operacional**: Gerenciamento completo do ciclo de vida dos produtos com validação rigorosa.

#### Impacto Técnico:
- Core Web Vitals com excelente pontuação devido à otimização de renderização.
- Código estruturado seguindo princípios SOLID para fácil escalabilidade.
      `,
      en: `
### Product Management System
Modern administrative interface developed with the Next.js ecosystem, focused on high performance and fluid user experience.

#### Architecture & Engineering:
- **Next.js 14 + App Router**: Utilization of Server Components for optimized rendering and Client Components for interactivity.
- **State Management**: Implementation of efficient data flows for complex filters and pagination.
- **Tailwind CSS**: Customized design system following modern UI/UX standards.

#### Critical Features:
- **Product Dashboard**: Clear visualization with inventory metrics.
- **Smart Filters**: Multi-criteria search and filtering system (category, price, status).
- **Operational CRUD**: Complete management of the product life cycle with rigorous validation.

#### Technical Impact:
- Core Web Vitals with excellent scores due to rendering optimization.
- Structured code following SOLID principles for easy scalability.
      `
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "projeto-nlw-rocketseat",
    title: {
      pt: "Projeto NLW Rocketseat",
      en: "NLW Rocketseat Project"
    },
    description: {
      pt: "API REST desenvolvida com Node.js e Fastify durante evento NLW da Rocketseat, focada em alta performance e boas práticas.",
      en: "REST API developed with Node.js and Fastify during Rocketseat's NLW event, focused on high performance and best practices."
    },
    category: "development",
    images: ["/assets/projects/nlw_rocketseat.png"],
    tags: ["Node.js", "Fastify", "TypeScript", "REST API", "Backend", "Microservices"],
    content: {
      pt: `
### API com Microframework Fastify
Projeto desenvolvido durante o evento Next Level Week da Rocketseat, demonstrando expertise em arquitetura backend moderna.

#### Arquitetura e Implementação:
- **Microframework Fastify**: Escolha estratégica para máxima performance e overhead mínimo.
- **TypeScript Nativo**: Tipagem forte em toda a aplicação para maior confiabilidade.
- **Arquitetura em Camadas**: Separação clara entre controllers, services e repositories.
- **Validação de Schemas**: Uso de schemas Fastify para validação automática de requisições.

#### Performance e Escalabilidade:
- Suporte a alta concorrência através do event loop do Node.js.
- Implementação de melhores práticas para APIs RESTful.
- Documentação automática com Swagger/OpenAPI.

#### Aprendizados e Aplicação:
Projeto focado em solidificar conhecimentos em backend Node.js, demonstrando capacidade de absorver novos frameworks rapidamente e aplicar padrões da indústria.
    `,
      en: `
### API with Fastify Microframework
Project developed during Rocketseat's Next Level Week event, demonstrating expertise in modern backend architecture.

#### Architecture and Implementation:
- **Fastify Microframework**: Strategic choice for maximum performance and minimal overhead.
- **Native TypeScript**: Strong typing throughout the application for greater reliability.
- **Layered Architecture**: Clear separation between controllers, services, and repositories.
- **Schema Validation**: Use of Fastify schemas for automatic request validation.

#### Performance and Scalability:
- Support for high concurrency through Node.js event loop.
- Implementation of REST API best practices.
- Automatic documentation with Swagger/OpenAPI.

#### Learning and Application:
Project focused on solidifying knowledge in Node.js backend, demonstrating ability to quickly absorb new frameworks and apply industry standards.
    `
    },
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/projeto-nlw-node-fastify" }
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "mobile-challenge-codesh",
    title: {
      pt: "Mobile Challenge - Coodesh",
      en: "Mobile Challenge - Coodesh"
    },
    description: {
      pt: "Desafio técnico mobile desenvolvido para Coodesh, demonstrando habilidades avançadas em desenvolvimento React Native e TypeScript.",
      en: "Mobile technical challenge developed for Coodesh, demonstrating advanced skills in React Native and TypeScript development."
    },
    category: "development",
    images: ["/assets/projects/coodesh_challenge.png"],
    tags: ["React Native", "TypeScript", "Mobile", "API Integration", "State Management"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/mobile-chalenge-20240202-codesh" }
    ],
    content: {
      pt: `
### Mobile Challenge - Coodesh
Aplicação mobile de alta fidelidade desenvolvida para o desafio técnico da Coodesh, focada em performance e arquitetura limpa.

#### Destaques Técnicos:
- **Stack Moderna**: React Native com TypeScript para máxima segurança de tipos e velocidade de desenvolvimento.
- **Arquitetura de Dados**: Implementação de Fetch API com tratamento de erros robusto e estados de loading globais.
- **UI/UX Nativa**: Componentização focada em performance, garantindo scroll suave e transições fluidas em iOS e Android.

#### Funcionalidades Implementadas:
- **Listagem Dinâmica**: Consumo de API remota com atualização em tempo real.
- **Detalhes de Itens**: Visualização rica com tratamento de imagens e dados complexos.
- **Offline First**: Estratégias básicas de cache para melhor experiência em conexões lentas.

#### Excelência em Engenharia:
- Código documentado e testado.
- Estrutura de pastas modular facilitando a manutenção.
      `,
      en: `
### Mobile Challenge - Coodesh
High-fidelity mobile application developed for the Coodesh technical challenge, focused on performance and clean architecture.

#### Technical Highlights:
- **Modern Stack**: React Native with TypeScript for maximum type safety and development speed.
- **Data Architecture**: Fetch API implementation with robust error handling and global loading states.
- **Native UI/UX**: Performance-focused componentization, ensuring smooth scrolling and fluid transitions on iOS and Android.

#### Implemented Features:
- **Dynamic Listing**: Remote API consumption with real-time updates.
- **Item Details**: Rich visualization with image and complex data handling.
- **Offline First**: Basic caching strategies for better experience on slow connections.

#### Engineering Excellence:
- Documented and tested code.
- Modular folder structure facilitating maintenance.
      `
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "yellot-cupons-app",
    title: {
      pt: "Yellot Cupons",
      en: "Yellot Coupons"
    },
    description: {
      pt: "Aplicativo mobile para gestão e resgate de cupons de desconto, integrado com sistema de fidelidade.",
      en: "Mobile app for coupon management and redemption, integrated with loyalty system."
    },
    category: "development",
    images: ["/assets/projects/yellot_cupons.png"],
    tags: ["React Native", "Mobile", "Loyalty", "UX/UI"],
    links: [
      { texto: "Google Play", url: "https://play.google.com/store/search?q=yellot&c=apps" }
    ],
    content: {
      pt: `
### Ecossistema Yellot Cupons
Plataforma mobile focada em fidelização de clientes e gestão de benefícios através de um sistema de cupons dinâmico.

#### Engenharia e Funcionalidades:
- **Gestão de Cupons**: Sistema intuitivo para visualização, ativação e resgate de diversos tipos de benefícios.
- **Integração de Fidelidade**: Conexão direta com a base de clientes Yellot para ofertas personalizadas.
- **Mobile Experience**: Desenvolvido com React Native, oferecendo uma experiência fluida de aplicativo nativo.

#### Impacto no Negócio:
- Aumento no engajamento de usuários através de notificações push estratégicas.
- Facilidade de uso garantindo alta taxa de resgate de cupons.
      `,
      en: `
### Yellot Coupons Ecosystem
Mobile platform focused on customer loyalty and benefits management through a dynamic coupon system.

#### Engineering & Features:
- **Coupon Management**: Intuitive system for viewing, activating, and redeeming various types of benefits.
- **Loyalty Integration**: Direct connection with the Yellot customer base for personalized offers.
- **Mobile Experience**: Developed with React Native, offering a fluid native app experience.

#### Business Impact:
- Increased user engagement through strategic push notifications.
- Ease of use ensuring high coupon redemption rate.
      `
    },
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: "neo-carrossel",
    title: {
      pt: "Neo Carrossel 3D",
      en: "Neo Carousel 3D"
    },
    description: {
      pt: "Componente React avançado de carrossel 3D com física realista e suporte a gestos.",
      en: "Advanced React 3D carousel component with realistic physics and gesture support."
    },
    category: "development",
    images: ["/assets/projects/neo_carrossel_carousel.png", "/assets/projects/neo_carrossel_gallery.png"],
    tags: ["React", "Three.js", "Framer Motion", "UI Component"],
    content: {
      pt: `
### Experiência 3D Interativa
Desenvolvimento de um componente de carrossel tridimensional de alta performance para vitrines digitais.

#### Tecnologia:
- **Framer Motion**: Animações fluidas baseadas em física (springs).
- **Gestos**: Suporte a arraste e toque com inércia realista.
- **Acessibilidade**: Navegação por teclado e leitores de tela.
      `,
      en: `
### Interactive 3D Experience
Development of a high-performance three-dimensional carousel component for digital showcases.

#### Technology:
- **Framer Motion**: Fluid physics-based animations (springs).
- **Gestures**: Support for drag and touch with realistic inertia.
- **Accessibility**: Keyboard navigation and screen readers.
      `
    },
    links: [
      { texto: "Demo", url: "#" }
    ],
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15")
  }
];
