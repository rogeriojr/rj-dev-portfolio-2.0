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
    images: ["/assets/projects/simerpay.png"],
    tags: ["Fintech", "React", "React Native", "Gateways", "Transacional", "E-commerce"],
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
      pt: "Bevas WM",
      en: "Bevas WM"
    },
    description: {
      pt: "Solução robusta de POS (Point of Sale) e WMS para gestão de varejo autônomo e controle rigoroso de estoque.",
      en: "Robust POS (Point of Sale) and WMS solution for autonomous retail management and strict inventory control."
    },
    tags: ["POS", "WMS", "Retail Tech", "Inventory Management", "React"],
    content: {
      pt: `
### Retail Technology & Smart Inventory
Sistema de Ponto de Venda e Gestão de Armazém (WMS) projetado para operações de varejo modernas e autônomas.

#### Desafios de Engenharia:
- **Conciliação de Estoque**: Algoritmos de sincronização em tempo real entre vendas físicas e sistema central.
- **Alta Estabilidade**: Interface de checkout otimizada para transações rápidas e sem falhas.
- **Lógica de Negócio Complexa**: Gestão de múltiplas tabelas de preço e regras de fidelidade.

#### Impacto na Operação:
- Interface intuitiva que reduz o tempo de treinamento de novos operadores.
- Sistema de controle de perdas integrado que aumentou a acurácia do inventário.
    `,
      en: `
### Retail Technology & Smart Inventory
Point of Sale and Warehouse Management System (WMS) designed for modern and autonomous retail operations.

#### Engineering Challenges:
- **Inventory Reconciliation**: Real-time synchronization algorithms between physical sales and central system.
- **High Stability**: Optimized checkout interface for fast and flawless transactions.
- **Complex Business Logic**: Management of multiple price tables and loyalty rules.

#### Operational Impact:
- Intuitive interface that reduces training time for new operators.
- Integrated loss control system that increased inventory accuracy.
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
      pt: "Portal tem poder quem age",
      en: "Power to Those Who Act Portal"
    },
    description: {
      pt: "Plataforma de alta performance para o setor de turismo e sorteios certificados, unindo UX fluida e segurança.",
      en: "High-performance platform for tourism and certified raffles, combining fluid UX and security."
    },
    tags: ["React", "Vite", "Turismo", "Sorteios Certificados", "High Performance"],
    content: {
      pt: `
### Engenharia de Frontend para Entretenimento e Viagens
Plataforma que integra checkout de sorteios, gestão de viagens e painel administrativo completo.

#### Destaques Tecnológicos:
- **Vite Setup**: Stack moderna garantindo o menor tempo de carregamento possível para usuários mobile.
- **Security First**: Implementação de fluxos seguros para transações de sorteios certificados.
- **Portal Admin**: Dashboard robusto para gestão total de campanhas, prêmios e relatórios de vendas.

#### Contribuição Profissional:
- Criação de uma identidade visual proprietária e implementação de componentes UI premium.
- Otimização de conversão através de testes A/B e melhorias contínuas em fluxos de checkout.
    `,
      en: `
### Frontend Engineering for Entertainment and Travel
Platform that integrates raffle checkout, travel management, and complete administrative panel.

#### Technological Highlights:
- **Vite Setup**: Modern stack ensuring the shortest possible loading time for mobile users.
- **Security First**: Implementation of secure flows for certified raffle transactions.
- **Admin Portal**: Robust dashboard for complete campaign management, prizes, and sales reports.

#### Professional Contribution:
- Creation of proprietary visual identity and implementation of premium UI components.
- Conversion optimization through A/B testing and continuous improvements in checkout flows.
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
### Engenharia de IA e RAG (Retrieval-Augmented Generation)
Transformação de dados não estruturados em uma base de conhecimento ativa e consultável através de linguagem natural.

#### Arquitetura de Inteligência:
- **Core Engine**: Orquestração sofisticada de LLMs (OpenAI GPT-4) utilizando padrões de Agentes de IA.
- **Vector Pipeline**: Processamento e armazenamento vetorial via Supabase (pgvector) para busca semântica de alta fidelidade.
- **Data Ingestion**: Base dinâmica que processa documentos (PDF, Excel, Docx) transformando-os em embeds vetoriais em tempo real.

#### Soluções de Engenharia:
- **Context Window Optimization**: Algoritmos para seleção dos trechos mais relevantes, minimizando latência e custos.
- **Streaming UI**: Interface de chat com respostas em tempo real (Server-Sent Events) para UX superior.
- **System Prompt Engineering**: Desenvolvimento de guardrails e personas especializadas para alta precisão nas respostas.
    `,
      en: `
### AI Engineering & RAG (Retrieval-Augmented Generation)
Transforming unstructured data into an active, queryable knowledge base through natural language.

#### Intelligence Architecture:
- **Core Engine**: Sophisticated orchestration of LLMs (OpenAI GPT-4) using AI Agent patterns.
- **Vector Pipeline**: Vector processing and storage via Supabase (pgvector) for high-fidelity semantic search.
- **Data Ingestion**: Dynamic base that processes documents (PDF, Excel, Docx) transforming them into vector embeddings in real-time.

#### Engineering Solutions:
- **Context Window Optimization**: Algorithms for selecting the most relevant excerpts, minimizing latency and costs.
- **Streaming UI**: Chat interface with real-time responses (Server-Sent Events) for superior UX.
- **System Prompt Engineering**: Development of guardrails and specialized personas for high-precision responses.
    `
    },
    links: [
      { texto: "Demo Chat", url: "https://ai-srv.neoidea.com.br/?uuid=bca740bd02d746f1adfb97e6d8e3d2ae&room_id=e39ca8003b410be0be0afdb81ec6e0ce&user=2fffe3b570e2e33eff1ee9d3ec3f6746&password=23e4b3eb0ac3ae12d4f9e13372b49cda" }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
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
    createdAt: new Date(),
    updatedAt: new Date()
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
      "/assets/projects/pegpag_logo.png"
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
- **Store Stewardship**: Responsible for the entire deployment pipeline on official Apple and Google stores.
    `
    },
    links: [
      { texto: "Painel Admin", url: "https://pegpagsmart24.com/login" },
      { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.pegpag.smart24&hl=pt_BR" },
      { texto: "Apple Store", url: "https://apps.apple.com/br/app/peg-pag-smart-24h/id6740469103" }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
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
      "/assets/projects/pandaparking_logo.png"
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
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
