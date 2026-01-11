import { Project } from "../types";

export const PROJECT_OVERRIDES: Record<string, Partial<Project> & { featured?: boolean }> = {
  "jornadaser": {
    title: {
      pt: "Jornada do Ser",
      en: "Journey of Being"
    },
    description: {
      pt: "Ecossistema de streaming e E-learning gamificado focado em alta escalabilidade e retenção de usuários.",
      en: "Gamified streaming and E-learning ecosystem focused on high scalability and user retention."
    },
    featured: true,
    images: ["/assets/projects/jornada_do_ser.jpg"],
    tags: ["React", "Next.js", "Streaming", "Gamificação", "SSR", "SEO Expert"],
    content: {
      pt: `
### 🚀 Jornada do Ser - Ecossistema de Streaming e E-learning

Ecossistema de streaming e E-learning gamificado focado em alta escalabilidade e retenção de usuários. Desenvolvimento de uma plataforma robusta para consumo de conteúdo em vídeo com foco em performance e experiência do usuário (UX), impactando milhares de alunos em sua jornada de aprendizado.

---

#### 🏗️ Arquitetura de Streaming e E-learning

O projeto implementa uma arquitetura moderna e escalável:

- ⚡ **SSG/SSR**: Implementação de Next.js para garantir indexação perfeita (SEO) e carregamento instantâneo. Server-Side Rendering para conteúdo dinâmico e Static Site Generation para páginas estáticas, otimizando performance e SEO.
- 🎬 **Player Customizado**: Integração de players otimizados com controle de progresso, bitrate adaptativo e suporte a múltiplos formatos de vídeo. Player com buffer inteligente, qualidade adaptativa baseada em conexão e controles personalizados.
- 🎮 **Engagement Engine**: Sistema de gamificação completo com conquistas, trilhas de aprendizado dinâmicas, badges e sistema de pontuação. Mecânicas de engajamento que aumentam retenção e completude de cursos.

---

#### 🛠️ Stack Tecnológica

- **Next.js**: Framework React com SSR/SSG
- **Video.js / HLS.js**: Players de vídeo otimizados
- **PostgreSQL**: Banco de dados para persistência
- **Redis**: Cache para performance
- **CDN**: Distribuição global de conteúdo
- **Analytics**: Tracking de engajamento e progresso

---

#### ⚡ Desafios Técnicos e Soluções

- **Escalabilidade de Vídeo**: Implementação de CDN global, streaming adaptativo (HLS/DASH) e otimização de encoding para reduzir custos de banda.
- **Performance de Carregamento**: Code-splitting avançado, lazy loading de componentes e otimização de bundle para reduzir tempo de carregamento inicial.
- **Gamificação Eficiente**: Sistema de gamificação que não impacta performance, com atualizações assíncronas e cache de progresso.
- **Retenção de Usuários**: Implementação de notificações inteligentes, lembretes de progresso e recomendações personalizadas.

---

#### 📊 Impacto Técnico

- **Redução de 40% no TTI**: Time to Interactive reduzido através de code-splitting e lazy loading avançado, melhorando significativamente a experiência do usuário.
- **Escalabilidade**: Estrutura modular preparada para suportar +100k alunos simultâneos sem degradação de performance.
- **SEO Otimizado**: Indexação perfeita de conteúdo através de SSR, melhorando visibilidade e descoberta de cursos.
- **Engajamento**: Sistema de gamificação que aumenta taxa de conclusão de cursos em 35% e retenção de usuários.
    `,
      en: `
### 🚀 Journey of Being - Streaming & E-learning Ecosystem

Gamified streaming and E-learning ecosystem focused on high scalability and user retention. Development of a robust platform for video content consumption focused on performance and user experience (UX), impacting thousands of students in their learning journey.

---

#### 🏗️ Streaming & E-learning Architecture

The project implements a modern and scalable architecture:

- ⚡ **SSG/SSR**: Next.js implementation to ensure perfect indexing (SEO) and instant loading. Server-Side Rendering for dynamic content and Static Site Generation for static pages, optimizing performance and SEO.
- 🎬 **Custom Player**: Integration of optimized players with progress control, adaptive bitrate and support for multiple video formats. Player with intelligent buffering, connection-based adaptive quality and custom controls.
- 🎮 **Engagement Engine**: Complete gamification system with achievements, dynamic learning paths, badges and scoring system. Engagement mechanics that increase retention and course completion.

---

#### 🛠️ Technology Stack

- **Next.js**: React framework with SSR/SSG
- **Video.js / HLS.js**: Optimized video players
- **PostgreSQL**: Database for persistence
- **Redis**: Cache for performance
- **CDN**: Global content distribution
- **Analytics**: Engagement and progress tracking

---

#### ⚡ Technical Challenges & Solutions

- **Video Scalability**: Implementation of global CDN, adaptive streaming (HLS/DASH) and encoding optimization to reduce bandwidth costs.
- **Loading Performance**: Advanced code-splitting, component lazy loading and bundle optimization to reduce initial load time.
- **Efficient Gamification**: Gamification system that doesn't impact performance, with asynchronous updates and progress caching.
- **User Retention**: Implementation of intelligent notifications, progress reminders and personalized recommendations.

---

#### 📊 Technical Impact

- **40% TTI Reduction**: Time to Interactive reduced through code-splitting and advanced lazy loading, significantly improving user experience.
- **Scalability**: Modular structure prepared to support +100k simultaneous students without performance degradation.
- **SEO Optimized**: Perfect content indexing through SSR, improving visibility and course discovery.
- **Engagement**: Gamification system that increases course completion rate by 35% and user retention.
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
    featured: true,
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
### 🚀 SimerPay - Ecossistema Fintech Completo

Ecosistema Fintech completo englobando E-commerce, Mobile App e Dashboard Administrativo de alta complexidade. Desenvolvimento Full-Cycle de uma plataforma financeira robusta para gestão de microtransações e e-commerce de energia, processando milhões de transações com segurança e confiabilidade.

---

#### 🏗️ Arquitetura Full-Stack

O projeto implementa uma arquitetura unificada e escalável:

- 🔄 **Unified Codebase**: Utilização de padrões de design compartilhados entre Web (React) e Mobile (React Native). Componentes reutilizáveis, lógica compartilhada e design system único garantindo consistência entre plataformas.
- 💳 **Transacional Segura**: Fluxos de checkout complexos com integração direta a múltiplos gateways de pagamento (Stripe, PagSeguro, Mercado Pago). Processamento seguro de pagamentos com validação em múltiplas camadas e tratamento de edge cases.
- 📊 **Data Visualization**: Dashboards analíticos para monitoramento de vendas e fluxos de caixa em tempo real. Visualizações interativas com gráficos, métricas de negócio e relatórios customizáveis.

---

#### 🛠️ Stack Tecnológica

- **React**: Framework web principal
- **React Native**: Aplicativo mobile multiplataforma
- **TypeScript**: Tipagem estática em todo o projeto
- **Payment Gateways**: Integração com múltiplos gateways
- **Chart.js / D3.js**: Visualização de dados
- **Node.js Backend**: API para processamento de transações

---

#### ⚡ Desafios Técnicos e Soluções

- **Sincronização Multi-plataforma**: Implementação de estratégias para manter dados sincronizados entre web e mobile, com cache inteligente e sincronização em tempo real.
- **Segurança de Pagamentos**: Implementação de segurança avançada seguindo padrões PCI-DSS, criptografia de dados sensíveis e validação rigorosa de transações.
- **Performance de Dashboards**: Otimização de queries complexas, cache de dados agregados e renderização eficiente de gráficos para garantir performance mesmo com grandes volumes de dados.
- **Escalabilidade Transacional**: Arquitetura preparada para processar milhares de transações simultâneas sem degradação.

---

#### 🎯 Minha Atuação Estratégica

- **Definição de Arquitetura**: Definição da arquitetura de frontend focada em manutenibilidade e escalabilidade. Decisões técnicas que impactaram todo o desenvolvimento.
- **Segurança Avançada**: Implementação de segurança avançada seguindo padrões PCI para proteção de dados sensíveis. Validação de entrada, sanitização e proteção contra vulnerabilidades comuns.
- **Design System**: Criação de design system unificado que acelerou desenvolvimento e garantiu consistência visual.
- **Otimização de Performance**: Implementação de otimizações que reduziram tempo de carregamento em 50% e melhoraram Core Web Vitals.
    `,
      en: `
### 🚀 SimerPay - Complete Fintech Ecosystem

Complete Fintech ecosystem encompassing E-commerce, Mobile App, and highly complex Administrative Dashboard. Full-Cycle development of a robust financial platform for microtransaction management and energy e-commerce, processing millions of transactions with security and reliability.

---

#### 🏗️ Full-Stack Architecture

The project implements a unified and scalable architecture:

- 🔄 **Unified Codebase**: Use of shared design patterns between Web (React) and Mobile (React Native). Reusable components, shared logic and unique design system ensuring consistency across platforms.
- 💳 **Secure Transactions**: Complex checkout flows with direct integration to multiple payment gateways (Stripe, PagSeguro, Mercado Pago). Secure payment processing with multi-layer validation and edge case handling.
- 📊 **Data Visualization**: Analytical dashboards for real-time sales monitoring and cash flow. Interactive visualizations with charts, business metrics and customizable reports.

---

#### 🛠️ Technology Stack

- **React**: Main web framework
- **React Native**: Cross-platform mobile application
- **TypeScript**: Static typing throughout the project
- **Payment Gateways**: Integration with multiple gateways
- **Chart.js / D3.js**: Data visualization
- **Node.js Backend**: API for transaction processing

---

#### ⚡ Technical Challenges & Solutions

- **Multi-platform Synchronization**: Implementation of strategies to keep data synchronized between web and mobile, with intelligent cache and real-time synchronization.
- **Payment Security**: Implementation of advanced security following PCI-DSS standards, encryption of sensitive data and rigorous transaction validation.
- **Dashboard Performance**: Optimization of complex queries, aggregated data caching and efficient chart rendering to ensure performance even with large data volumes.
- **Transactional Scalability**: Architecture prepared to process thousands of simultaneous transactions without degradation.

---

#### 🎯 My Strategic Role

- **Architecture Definition**: Definition of frontend architecture focused on maintainability and scalability. Technical decisions that impacted the entire development.
- **Advanced Security**: Implementation of advanced security following PCI standards for sensitive data protection. Input validation, sanitization and protection against common vulnerabilities.
- **Design System**: Creation of unified design system that accelerated development and ensured visual consistency.
- **Performance Optimization**: Implementation of optimizations that reduced load time by 50% and improved Core Web Vitals.
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
### 🚀 Método CIS - Plataforma de Alta Disponibilidade

Hub digital de inteligência emocional projetado para suportar tráfego massivo e gestão crítica de eventos ao vivo. Suporte tecnológico ao maior treinamento de inteligência emocional do mundo, exigindo 99.9% de uptime sob carga extrema.

---

#### 🏗️ Arquitetura de Alta Disponibilidade

O projeto implementa uma arquitetura robusta para suportar eventos de grande escala:

- 📊 **Sustentação em Eventos**: Monitoramento em tempo real e escalonamento reativo durante picos de acesso. Sistema de auto-scaling que ajusta recursos automaticamente baseado em métricas de uso.
- 🔄 **Refatoração Estrutural**: Migração sistêmica de módulos críticos para TypeScript para aumentar a segurança de tipos. Refatoração completa de código legado para código moderno e tipado.
- ⚡ **Otimização de Assets**: Estratégias de cache agressivas via CDN para entrega de conteúdo global. Cache em múltiplas camadas (browser, CDN, servidor) para reduzir latência.

---

#### 🛠️ Stack Tecnológica

- **Next.js**: Framework React com SSR
- **TypeScript**: Tipagem estática completa
- **Azure**: Infraestrutura cloud com auto-scaling
- **CDN**: Distribuição global de conteúdo
- **Redis**: Cache de alta performance
- **Monitoring**: Monitoramento em tempo real

---

#### ⚡ Desafios Técnicos e Soluções

- **Tráfego Massivo**: Implementação de arquitetura distribuída, load balancing e auto-scaling para suportar picos de +50k usuários simultâneos.
- **Uptime Crítico**: Sistema de redundância, failover automático e monitoramento proativo para garantir 99.9% de disponibilidade.
- **Performance sob Carga**: Otimização de queries, cache inteligente e otimização de assets para manter performance mesmo durante picos.
- **Migração para TypeScript**: Migração gradual de JavaScript para TypeScript, garantindo zero downtime durante a transição.

---

#### 📊 Resultados Obtidos

- **Experiência Fluida**: Experiência de usuário fluida mesmo durante picos de +50k usuários simultâneos no portal, sem degradação de performance.
- **Redução de Bugs**: Redução drástica de bugs em produção através de testes de integração e cobertura de tipos. TypeScript ajudou a prevenir erros antes mesmo de chegar em produção.
- **Alta Disponibilidade**: 99.9% de uptime alcançado mesmo durante eventos de grande escala, garantindo acesso contínuo aos usuários.
- **Escalabilidade**: Sistema preparado para escalar automaticamente conforme demanda, reduzindo custos e garantindo performance.
    `,
      en: `
### 🚀 CIS Method - High Availability Platform

Digital emotional intelligence hub designed to support massive traffic and critical live event management. Technological support for the world's largest emotional intelligence training, requiring 99.9% uptime under extreme load.

---

#### 🏗️ High Availability Architecture

The project implements a robust architecture to support large-scale events:

- 📊 **Event Support**: Real-time monitoring and reactive scaling during access peaks. Auto-scaling system that automatically adjusts resources based on usage metrics.
- 🔄 **Structural Refactoring**: Systemic migration of critical modules to TypeScript to increase type safety. Complete refactoring of legacy code to modern and typed code.
- ⚡ **Asset Optimization**: Aggressive caching strategies via CDN for global content delivery. Multi-layer caching (browser, CDN, server) to reduce latency.

---

#### 🛠️ Technology Stack

- **Next.js**: React framework with SSR
- **TypeScript**: Complete static typing
- **Azure**: Cloud infrastructure with auto-scaling
- **CDN**: Global content distribution
- **Redis**: High-performance cache
- **Monitoring**: Real-time monitoring

---

#### ⚡ Technical Challenges & Solutions

- **Massive Traffic**: Implementation of distributed architecture, load balancing and auto-scaling to support peaks of +50k simultaneous users.
- **Critical Uptime**: Redundancy system, automatic failover and proactive monitoring to ensure 99.9% availability.
- **Performance Under Load**: Query optimization, intelligent cache and asset optimization to maintain performance even during peaks.
- **TypeScript Migration**: Gradual migration from JavaScript to TypeScript, ensuring zero downtime during transition.

---

#### 📊 Results Achieved

- **Smooth Experience**: Smooth user experience even during peaks of +50k simultaneous users on the portal, without performance degradation.
- **Bug Reduction**: Drastic reduction of production bugs through integration testing and type coverage. TypeScript helped prevent errors before reaching production.
- **High Availability**: 99.9% uptime achieved even during large-scale events, ensuring continuous user access.
- **Scalability**: System prepared to automatically scale according to demand, reducing costs and ensuring performance.
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
### 🚀 Autoconect - Gestão Inteligente para o Setor Automotivo

Plataforma CRM e de Gestão de Vendas dedicada ao setor automotivo e segurador, com foco em automação de funil. Sistema focado em otimizar o ciclo de vendas e pós-vendas de veículos e corretagem de seguros, aumentando produtividade e conversão de vendas.

---

#### 🏗️ Arquitetura CRM e Automação

O projeto implementa uma plataforma completa de gestão:

- 📊 **Funil de Vendas Automatizado**: Gestão completa de leads com automação de notificações, follow-ups inteligentes e scoring de leads. Sistema que prioriza leads mais qualificados e automatiza tarefas repetitivas.
- 📈 **Relatórios Customizados**: Motor de geração de relatórios dinâmicos para análise de KPIs comerciais. Dashboards interativos com métricas de vendas, conversão e performance de equipe.
- 🎯 **Interface Inteligente**: Dashboard focado em produtividade para consultores de vendas. Interface intuitiva que reduz tempo de navegação e aumenta eficiência operacional.

---

#### 🛠️ Stack Tecnológica

- **React**: Framework web principal
- **TypeScript**: Tipagem estática
- **Node.js Backend**: API para processamento
- **PostgreSQL**: Banco de dados
- **Third-party APIs**: Integração com FIPE e seguradoras
- **Email/SMS Services**: Automação de comunicação

---

#### ⚡ Desafios Técnicos e Soluções

- **Automação Complexa**: Implementação de sistema de automação que permite criar fluxos personalizados sem necessidade de código, com interface visual intuitiva.
- **Integração com APIs Externas**: Integração robusta com APIs de terceiros (FIPE, seguradoras) com tratamento de erros, retry logic e cache para reduzir chamadas.
- **Performance de Relatórios**: Otimização de queries complexas e cache de dados agregados para garantir performance mesmo com grandes volumes de dados.
- **Escalabilidade**: Arquitetura preparada para suportar múltiplas empresas e equipes simultaneamente.

---

#### 🎯 Diferencial Técnico

- **Componentes Reutilizáveis**: Arquitetura de componentes reutilizáveis que acelerou o tempo de desenvolvimento de novas features em 30%. Design system consistente e modular.
- **Integração de APIs**: Integração de APIs de terceiros para consulta de FIPE e bases seguradoras, automatizando processos que antes eram manuais.
- **Automação Inteligente**: Sistema de automação que aprende com padrões de uso e sugere otimizações de fluxo.
- **Mobile-First**: Interface responsiva que funciona perfeitamente em dispositivos móveis, permitindo trabalho remoto eficiente.
    `,
      en: `
### 🚀 Autoconect - Intelligent Management for Automotive Sector

CRM and Sales Management platform dedicated to the automotive and insurance sector, focused on funnel automation. System focused on optimizing the sales and after-sales cycle of vehicles and insurance brokerage, increasing productivity and sales conversion.

---

#### 🏗️ CRM and Automation Architecture

The project implements a complete management platform:

- 📊 **Automated Sales Funnel**: Complete lead management with notification automation, intelligent follow-ups and lead scoring. System that prioritizes most qualified leads and automates repetitive tasks.
- 📈 **Custom Reports**: Dynamic report generation engine for commercial KPI analysis. Interactive dashboards with sales metrics, conversion and team performance.
- 🎯 **Intelligent Interface**: Productivity-focused dashboard for sales consultants. Intuitive interface that reduces navigation time and increases operational efficiency.

---

#### 🛠️ Technology Stack

- **React**: Main web framework
- **TypeScript**: Static typing
- **Node.js Backend**: Processing API
- **PostgreSQL**: Database
- **Third-party APIs**: Integration with FIPE and insurers
- **Email/SMS Services**: Communication automation

---

#### ⚡ Technical Challenges & Solutions

- **Complex Automation**: Implementation of automation system that allows creating custom flows without code, with intuitive visual interface.
- **External API Integration**: Robust integration with third-party APIs (FIPE, insurers) with error handling, retry logic and cache to reduce calls.
- **Report Performance**: Optimization of complex queries and aggregated data caching to ensure performance even with large data volumes.
- **Scalability**: Architecture prepared to support multiple companies and teams simultaneously.

---

#### 🎯 Technical Advantage

- **Reusable Components**: Reusable component architecture that accelerated new feature development time by 30%. Consistent and modular design system.
- **API Integration**: Third-party API integration for FIPE consultation and insurance databases, automating processes that were previously manual.
- **Intelligent Automation**: Automation system that learns from usage patterns and suggests flow optimizations.
- **Mobile-First**: Responsive interface that works perfectly on mobile devices, enabling efficient remote work.
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
### 🚀 Bevas Wealth Management - Gestão Patrimonial Premium

Plataforma exclusiva de gestão patrimonial e investimentos focada em High Net Worth Individuals (HNWI). Boutique system developed to manage complex investment portfolios with banking-grade security, oferecendo experiência premium e segurança máxima.

---

#### 🏗️ Arquitetura de Segurança e Performance

O projeto implementa uma arquitetura focada em segurança e precisão:

- 📊 **Visão 360º de Ativos**: Dashboard consolidado que agrega investimentos on-shore e off-shore. Visualização unificada de portfólio completo com análise de risco, diversificação e performance histórica.
- 🔒 **Segurança Militar**: Criptografia de ponta a ponta e autenticação multifator para proteção de dados sensíveis. Segurança em múltiplas camadas seguindo padrões bancários e regulatórios.
- 📈 **Relatórios Automatizados**: Geração de PDFs detalhados de performance e rentabilidade mensal. Relatórios personalizados com análises profundas e recomendações estratégicas.

---

#### 🛠️ Stack Tecnológica

- **React**: Framework web principal
- **TypeScript**: Tipagem estática completa
- **Node.js Backend**: API segura para processamento
- **PostgreSQL**: Banco de dados com criptografia
- **PDF Generation**: Geração de relatórios em PDF
- **Security Services**: Serviços de segurança e autenticação

---

#### ⚡ Desafios Técnicos e Soluções

- **Segurança de Dados**: Implementação de criptografia end-to-end, autenticação multifator e isolamento de dados críticos da internet pública.
- **Precisão de Cálculos**: Sistema de cálculos financeiros com precisão decimal alta, tratamento de arredondamentos e validação rigorosa de dados.
- **Performance de Visualizações**: Otimização de renderização de gráficos complexos e dashboards interativos para garantir fluidez mesmo com grandes volumes de dados.
- **Conformidade Regulatória**: Implementação de controles de acesso, auditoria completa e conformidade com regulamentações financeiras.

---

#### 🎯 Engenharia de Software

- **Arquitetura Segura**: Arquitetura segura isolada da internet pública para dados críticos. Rede privada, VPN e acesso restrito garantindo máxima segurança.
- **Interface Premium**: Interface minimalista e elegante, refletindo a sofisticação da marca. Design que transmite confiança e profissionalismo.
- **Performance Otimizada**: Sistema otimizado para carregamento rápido mesmo com grandes volumes de dados históricos.
- **Experiência do Cliente**: Foco em experiência do usuário premium, com atenção aos detalhes e personalização.
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
    featured: true,
    images: ["/assets/projects/neoidea_logo_new.jpg", "/assets/projects/neoidea_chat.png"],
    tags: ["Artificial Intelligence", "RAG", "GPT-4", "Vector Databases", "AI Agents"],
    content: {
      pt: `
### 🚀 NeoIdea AI Chat & RAG - Engine de Inteligência Corporativa

Engine corporativa de IA com RAG (Retrieval-Augmented Generation) para processamento de conhecimento massivo. Plataforma que transforma videoconferências em espaços inteligentes e memoráveis, onde cada reunião gera conhecimento ativo e acionável.

---

#### 🏗️ Arquitetura de Inteligência Artificial

O sistema implementa uma arquitetura sofisticada de IA generativa com RAG:

- 🤖 **Core Engine**: Orquestração sofisticada de LLMs (OpenAI GPT-4) utilizando padrões de Agentes de IA para sumarização automática, extração de insights e memória persistente de reuniões. Processamento de contexto em múltiplas camadas para compreensão profunda.
- 🔍 **Vector Pipeline**: Processamento e armazenamento vetorial via Supabase (pgvector) para busca semântica em históricos de conversas. Embeddings de alta dimensão para representação contextual precisa de informações.
- 📥 **Data Ingestion**: Base dinâmica que processa áudio, documentos, transcrições e metadados transformando-os em conhecimento ativo em tempo real. Pipeline de ETL otimizado para processamento assíncrono.

---

#### 🛠️ Stack Tecnológica Avançada

- **OpenAI GPT-4**: Modelo de linguagem de última geração para processamento de texto e geração de respostas
- **Supabase + pgvector**: Banco de dados vetorial para busca semântica e armazenamento de embeddings
- **React + TypeScript**: Interface moderna e tipada para interação com o agente de IA
- **WebSockets**: Comunicação em tempo real para streaming de respostas
- **Node.js Backend**: API robusta para processamento e orquestração de serviços de IA

---

#### ⚡ Desafios Técnicos e Soluções

- **Latência em Respostas**: Implementação de streaming de tokens para respostas progressivas, reduzindo tempo percebido de resposta.
- **Context Window Management**: Estratégias inteligentes de truncamento e sumarização para manter contexto relevante dentro dos limites do modelo.
- **Busca Semântica Otimizada**: Algoritmos de similaridade vetorial otimizados para recuperação rápida de contextos relevantes em grandes volumes de dados.
- **Escalabilidade**: Arquitetura distribuída para processar múltiplas reuniões simultaneamente sem degradação de performance.

---

#### 🎯 Soluções de Engenharia

- **Branded Environments**: White-labeling completo com subdomínios personalizados, identidade visual dinâmica e customização de marca por cliente.
- **Streaming UI**: Interface de chat e interatividade com respostas em tempo real, indicadores de processamento e feedback visual imediato.
- **Context Memory**: Algoritmos de RAG otimizados para recuperar contextos específicos de reuniões passadas, mantendo continuidade conversacional.
- **Analytics e Insights**: Dashboard de métricas de uso, análise de tópicos discutidos e geração automática de resumos executivos.
    `,
      en: `
### 🚀 NeoIdea AI Chat & RAG - Corporate Intelligence Engine

Corporate AI engine with RAG (Retrieval-Augmented Generation) for massive knowledge processing. Platform that transforms video conferences into intelligent and memorable spaces, where each meeting generates active and actionable knowledge.

---

#### 🏗️ Artificial Intelligence Architecture

The system implements a sophisticated generative AI architecture with RAG:

- 🤖 **Core Engine**: Sophisticated orchestration of LLMs (OpenAI GPT-4) using AI Agent patterns for automatic summarization, insight extraction and persistent meeting memory. Multi-layer context processing for deep understanding.
- 🔍 **Vector Pipeline**: Vector processing and storage via Supabase (pgvector) for semantic search in conversation histories. High-dimensional embeddings for precise contextual representation of information.
- 📥 **Data Ingestion**: Dynamic base that processes audio, documents, transcripts and metadata transforming them into active knowledge in real-time. Optimized ETL pipeline for asynchronous processing.

---

#### 🛠️ Advanced Technology Stack

- **OpenAI GPT-4**: State-of-the-art language model for text processing and response generation
- **Supabase + pgvector**: Vector database for semantic search and embedding storage
- **React + TypeScript**: Modern and typed interface for interaction with AI agent
- **WebSockets**: Real-time communication for response streaming
- **Node.js Backend**: Robust API for processing and orchestration of AI services

---

#### ⚡ Technical Challenges & Solutions

- **Response Latency**: Implementation of token streaming for progressive responses, reducing perceived response time.
- **Context Window Management**: Intelligent truncation and summarization strategies to maintain relevant context within model limits.
- **Optimized Semantic Search**: Optimized vector similarity algorithms for fast retrieval of relevant contexts in large data volumes.
- **Scalability**: Distributed architecture to process multiple meetings simultaneously without performance degradation.

---

#### 🎯 Engineering Solutions

- **Branded Environments**: Complete white-labeling with custom subdomains, dynamic visual identity and per-client brand customization.
- **Streaming UI**: Chat and interactivity interface with real-time responses, processing indicators and immediate visual feedback.
- **Context Memory**: Optimized RAG algorithms to retrieve specific contexts from past meetings, maintaining conversational continuity.
- **Analytics and Insights**: Usage metrics dashboard, analysis of discussed topics and automatic generation of executive summaries.
    `
    },
    links: [
      { texto: "Demo Chat", url: "https://ai-srv.neoidea.com.br/?uuid=bca740bd02d746f1adfb97e6d8e3d2ae&room_id=e39ca8003b410be0be0afdb81ec6e0ce&user=2fffe3b570e2e33eff1ee9d3ec3f6746&password=23e4b3eb0ac3ae12d4f9e13372b49cda" }
    ],
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
    featured: true,
    images: [
      "/assets/projects/neoidea_logo_2024.png",
      "/assets/projects/neoidea_platform.png",
      "/assets/projects/neoidea_repi.png"
    ],
    tags: ["Whitelabel", "SaaS Enterprise", "Multitenancy", "Theming Engine", "React"],
    content: {
      pt: `
### 🚀 Plataforma NeoIdea 2.0 - SaaS Enterprise Multitenant

Plataforma SaaS Enterprise Multitenant e Whitelabel com alto grau de customização dinâmica. Desenvolvimento de uma plataforma 'Core' capaz de servir múltiplos grandes clientes corporativos através de uma única infraestrutura, mantendo isolamento completo de dados e identidade visual personalizada.

---

#### 🏗️ Arquitetura Multitenant e Whitelabel

O sistema implementa uma arquitetura sofisticada de multi-tenancy com isolamento completo:

- 🎨 **Dynamic Theming Engine**: Lógica central que injeta CSS Variables e configurações visuais baseadas no contexto do Tenant em tempo real. Sistema de temas dinâmicos que permite customização completa de cores, fontes, logos e estilos sem necessidade de rebuild.
- 🔀 **Slug-based Routing**: Sistema de detecção de empresa via URL que carrega módulos e permissões em runtime. Roteamento inteligente que identifica o tenant através do subdomínio ou path, carregando configurações específicas dinamicamente.
- 📦 **Modular Framework**: Biblioteca de componentes internos agnóstica a marca, permitindo reuso total de código. Componentes base que se adaptam automaticamente ao tema do tenant, garantindo consistência visual e redução de código duplicado.

---

#### 🛠️ Stack Tecnológica

- **React + TypeScript**: Framework principal com tipagem forte para segurança e produtividade
- **CSS Variables**: Sistema de theming dinâmico baseado em variáveis CSS
- **Module Federation**: Arquitetura de microfrontends para isolamento de módulos
- **Context API + State Management**: Gerenciamento de estado global com isolamento por tenant
- **Dynamic Imports**: Carregamento dinâmico de módulos e assets por tenant

---

#### ⚡ Desafios Técnicos e Soluções

- **Isolamento de Dados**: Implementação de row-level security e filtros automáticos por tenant em todas as queries, garantindo isolamento completo de dados.
- **Performance com Múltiplos Tenants**: Cache inteligente por tenant, otimização de queries e lazy loading de módulos não utilizados.
- **Customização Dinâmica**: Sistema de CSS Variables injetado em runtime, permitindo mudanças de tema sem rebuild ou deploy.
- **Escalabilidade**: Arquitetura preparada para suportar centenas de tenants simultâneos sem degradação de performance.

---

#### 🎯 Cases de Sucesso Integrados

- **Inova Plástica**: Workflow complexo de submissão e avaliação de projetos industriais com customização completa de marca e fluxos específicos do cliente.
- **REPI**: Módulo de incentivos fiscais e programas de inovação recorrentes com dashboard personalizado e relatórios customizados.
- **SimerPay**: Integração seamless de fluxos financeiros e dashboards de pagamento dentro do portal Panda, demonstrando flexibilidade da plataforma.
- **Múltiplos Clientes Corporativos**: Plataforma servindo diversos clientes simultaneamente, cada um com sua identidade visual e configurações específicas.
    `,
      en: `
### 🚀 NeoIdea Platform 2.0 - Enterprise Multitenant SaaS

Multitenant and Whitelabel Enterprise SaaS Platform with high degree of dynamic customization. Development of a 'Core' platform capable of serving multiple large corporate clients through a single infrastructure, maintaining complete data isolation and personalized visual identity.

---

#### 🏗️ Multitenant and Whitelabel Architecture

The system implements a sophisticated multi-tenancy architecture with complete isolation:

- 🎨 **Dynamic Theming Engine**: Central logic that injects CSS Variables and visual configurations based on Tenant context in real-time. Dynamic theme system that allows complete customization of colors, fonts, logos and styles without rebuild.
- 🔀 **Slug-based Routing**: Company detection system via URL that loads modules and permissions at runtime. Intelligent routing that identifies tenant through subdomain or path, dynamically loading specific configurations.
- 📦 **Modular Framework**: Brand-agnostic internal component library, allowing complete code reuse. Base components that automatically adapt to tenant theme, ensuring visual consistency and reduced code duplication.

---

#### 🛠️ Technology Stack

- **React + TypeScript**: Main framework with strong typing for security and productivity
- **CSS Variables**: Dynamic theming system based on CSS variables
- **Module Federation**: Microfrontends architecture for module isolation
- **Context API + State Management**: Global state management with tenant isolation
- **Dynamic Imports**: Dynamic loading of modules and assets per tenant

---

#### ⚡ Technical Challenges & Solutions

- **Data Isolation**: Implementation of row-level security and automatic tenant filters in all queries, ensuring complete data isolation.
- **Performance with Multiple Tenants**: Intelligent cache per tenant, query optimization and lazy loading of unused modules.
- **Dynamic Customization**: CSS Variables system injected at runtime, allowing theme changes without rebuild or deploy.
- **Scalability**: Architecture prepared to support hundreds of simultaneous tenants without performance degradation.

---

#### 🎯 Integrated Success Cases

- **Inova Plástica**: Complex workflow for submission and evaluation of industrial projects with complete brand customization and client-specific flows.
- **REPI**: Tax incentive module and recurring innovation programs with personalized dashboard and customized reports.
- **SimerPay**: Seamless integration of financial flows and payment dashboards within the Panda portal, demonstrating platform flexibility.
- **Multiple Corporate Clients**: Platform serving various clients simultaneously, each with their visual identity and specific configurations.
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
    featured: true,
    images: ["/assets/projects/clubshare_logo.png", "/assets/projects/clubshare_screenshot.png"],
    tags: ["Fintech", "Mobile First", "React", "TypeScript", "Branding Transition"],
    content: {
      pt: `
### 🚀 ClubShare - Fintech de Benefícios Corporativos

Fintech de benefícios corporativos com foco em escalabilidade, arquitetura mobile-first e UX de alta conversão. Atuação como especialista front-end na transformação da marca (rebranding) e escalabilidade da plataforma de benefícios, impactando milhares de colaboradores e empresas parceiras.

---

#### 🏗️ Arquitetura e Modernização

O projeto envolveu uma transformação completa da plataforma com foco em performance e experiência do usuário:

- 📱 **Mobile-First Architecture**: Arquitetura pensada primeiro para mobile, garantindo experiência otimizada em dispositivos móveis e adaptação perfeita para desktop. Progressive Web App (PWA) com funcionalidades offline.
- ⚡ **Otimização de Performance**: Redução massiva do bundle size (de ~2MB para ~400KB) através de code splitting, tree shaking e lazy loading. Carregamento instantâneo mesmo em conexões instáveis (3G/4G).
- 📍 **Geolocalização Inteligente**: Sistema inteligente de descoberta de benefícios baseados na localização física do colaborador. Integração com Google Maps API para busca de estabelecimentos próximos e rotas otimizadas.
- 🎨 **Arquitetura Modular de Estilos**: Implementação de um Design System completo via Styled Components com suporte a multi-branding. Sistema de tokens de design para consistência visual e fácil manutenção.

---

#### 🛠️ Stack Tecnológica

- **React + TypeScript**: Framework principal com tipagem forte
- **Styled Components**: CSS-in-JS com suporte a theming dinâmico
- **React Query**: Gerenciamento de estado do servidor e cache
- **Google Maps API**: Integração para geolocalização e mapas
- **PWA**: Progressive Web App com service workers
- **Webpack**: Build tool otimizado com code splitting

---

#### ⚡ Desafios Técnicos e Soluções

- **Bundle Size Optimization**: Análise profunda de dependências, remoção de código não utilizado e implementação de imports dinâmicos para reduzir bundle inicial em 80%.
- **Geolocalização Eficiente**: Implementação de cache de localização, throttling de requisições e fallback para IP-based location quando GPS não disponível.
- **Multi-Branding**: Sistema de theming que permite diferentes identidades visuais por cliente sem duplicação de código.
- **Conversão e UX**: A/B testing de interfaces, otimização de fluxos de resgate e implementação de micro-interações para aumentar engajamento.

---

#### 🎯 Core Business Modules

- **Benefícios Flexíveis**: Fluxo complexo de resgate e gestão de saldo de benefícios com validação em tempo real, múltiplos métodos de pagamento e histórico completo de transações.
- **Merchant Dashboard**: Painel completo para lojistas parceiros gerenciarem suas ofertas, cashback, analytics de vendas e configurações de estabelecimento.
- **Gestão de Saldo**: Sistema de carteira virtual com recarga automática, transferências entre colaboradores e controle de limites.
- **Marketplace de Benefícios**: Catálogo dinâmico de benefícios com busca avançada, filtros por categoria e recomendações personalizadas.
    `,
      en: `
### 🚀 ClubShare - Corporate Benefits Fintech

Corporate benefits Fintech focused on scalability, mobile-first architecture, and high-conversion UX. Acting as a front-end specialist in brand transformation (rebranding) and benefits platform scalability, impacting thousands of employees and partner companies.

---

#### 🏗️ Architecture & Modernization

The project involved a complete platform transformation with focus on performance and user experience:

- 📱 **Mobile-First Architecture**: Architecture designed first for mobile, ensuring optimized experience on mobile devices and perfect adaptation for desktop. Progressive Web App (PWA) with offline functionality.
- ⚡ **Performance Optimization**: Massive bundle size reduction (from ~2MB to ~400KB) through code splitting, tree shaking and lazy loading. Instant loading even on unstable connections (3G/4G).
- 📍 **Intelligent Geolocation**: Intelligent benefit discovery system based on employee's physical location. Integration with Google Maps API for nearby establishment search and optimized routes.
- 🎨 **Modular Style Architecture**: Complete Design System implementation via Styled Components with multi-branding support. Design token system for visual consistency and easy maintenance.

---

#### 🛠️ Technology Stack

- **React + TypeScript**: Main framework with strong typing
- **Styled Components**: CSS-in-JS with dynamic theming support
- **React Query**: Server state management and caching
- **Google Maps API**: Integration for geolocation and maps
- **PWA**: Progressive Web App with service workers
- **Webpack**: Optimized build tool with code splitting

---

#### ⚡ Technical Challenges & Solutions

- **Bundle Size Optimization**: Deep dependency analysis, removal of unused code and implementation of dynamic imports to reduce initial bundle by 80%.
- **Efficient Geolocation**: Implementation of location cache, request throttling and fallback to IP-based location when GPS unavailable.
- **Multi-Branding**: Theming system that allows different visual identities per client without code duplication.
- **Conversion and UX**: A/B testing of interfaces, redemption flow optimization and micro-interaction implementation to increase engagement.

---

#### 🎯 Core Business Modules

- **Flexible Benefits**: Complex redemption and benefit balance management flow with real-time validation, multiple payment methods and complete transaction history.
- **Merchant Dashboard**: Complete panel for partner merchants to manage offers, cashback, sales analytics and establishment settings.
- **Balance Management**: Virtual wallet system with automatic recharge, transfers between employees and limit control.
- **Benefits Marketplace**: Dynamic benefits catalog with advanced search, category filters and personalized recommendations.
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
    featured: true,
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
### 🚀 Peg Pag Smart 24h - Ecossistema Retail Tech

Ecossistema Retail Tech completo para Micromarkets (lojas autônomas) com integração HW/Mobile de alta disponibilidade. Arquitetura integrada de ponta a ponta que permite a operação de lojas 24h sem funcionários, com total controle remoto e experiência de compra fluida.

---

#### 🏗️ Arquitetura Full-Stack Integrada

O sistema implementa uma arquitetura completa que conecta hardware, mobile e backend:

- 📱 **App de Compra (React Native)**: Experiência 'Scan & Go' otimizada, com integração de scanner de alto desempenho e check-out em 3 cliques. Interface intuitiva que guia o usuário através do processo de compra sem fricção.
- 🖥️ **Admin Command Center**: Painel administrativo completo para gestão de inventário em tempo real, monitoramento de saúde de PDVs, conciliação financeira automatizada e analytics avançados. Dashboard com métricas de vendas, estoque e operação.
- 🔌 **Hardware Bridge**: Desenvolvimento de serviços de integração com fechaduras biométricas, sistemas de pesagem inteligente, sensores de presença e dispositivos IoT. Comunicação bidirecional entre hardware e software.

---

#### 🛠️ Stack Tecnológica

- **React Native**: Aplicativo mobile multiplataforma
- **Node.js Backend**: API robusta para processamento de transações
- **PostgreSQL**: Banco de dados para persistência de dados
- **WebSocket**: Comunicação em tempo real entre app e hardware
- **Biometric SDK**: Integração com sistemas biométricos
- **IoT Protocols**: Comunicação com dispositivos IoT (MQTT, HTTP)

---

#### ⚡ Desafios Técnicos e Soluções

- **Sincronização Hardware-Software**: Implementação de protocolos de comunicação robustos para garantir sincronização precisa entre dispositivos físicos e aplicativo.
- **Offline Resilience**: Lógica de sincronização que permite compras básicas mesmo com instabilidade momentânea de internet. Cache local inteligente e queue de operações pendentes.
- **Performance de Scanner**: Otimização de algoritmos de reconhecimento de código de barras para leitura rápida e precisa mesmo em condições de iluminação variáveis.
- **Escalabilidade Transacional**: Sistema preparado para processar milhares de transações simultâneas sem degradação.

---

#### 🎯 Funcionalidades Principais

- **Scan & Go**: Experiência de compra sem filas com scanner otimizado e checkout em 3 cliques
- **Gestão de Inventário**: Controle completo de estoque com atualizações em tempo real e alertas automáticos
- **Monitoramento de PDVs**: Dashboard de saúde dos pontos de venda com métricas de disponibilidade e performance
- **Conciliação Financeira**: Automação completa de conciliação de vendas e pagamentos
- **Controle de Acesso**: Integração com fechaduras biométricas para controle de acesso às lojas
- **Analytics Avançados**: Relatórios detalhados de vendas, produtos mais vendidos e análise de comportamento do consumidor
    `,
      en: `
### 🚀 Peg Pag Smart 24h - Retail Tech Ecosystem

Complete Retail Tech ecosystem for Micromarkets (autonomous stores) with high-availability HW/Mobile integration. End-to-end integrated architecture that enables 24/7 store operations without employees, with full remote control and fluid shopping experience.

---

#### 🏗️ Integrated Full-Stack Architecture

The system implements a complete architecture that connects hardware, mobile and backend:

- 📱 **Shopping App (React Native)**: Optimized 'Scan & Go' experience, with high-performance scanner integration and 3-click checkout. Intuitive interface that guides users through the purchase process without friction.
- 🖥️ **Admin Command Center**: Complete administrative panel for real-time inventory management, POS health monitoring, automated financial reconciliation and advanced analytics. Dashboard with sales, inventory and operation metrics.
- 🔌 **Hardware Bridge**: Development of integration services with biometric locks, intelligent weighing systems, presence sensors and IoT devices. Bidirectional communication between hardware and software.

---

#### 🛠️ Technology Stack

- **React Native**: Cross-platform mobile application
- **Node.js Backend**: Robust API for transaction processing
- **PostgreSQL**: Database for data persistence
- **WebSocket**: Real-time communication between app and hardware
- **Biometric SDK**: Integration with biometric systems
- **IoT Protocols**: Communication with IoT devices (MQTT, HTTP)

---

#### ⚡ Technical Challenges & Solutions

- **Hardware-Software Synchronization**: Implementation of robust communication protocols to ensure precise synchronization between physical devices and application.
- **Offline Resilience**: Synchronization logic that allows basic purchases even with momentary internet instability. Intelligent local cache and pending operations queue.
- **Scanner Performance**: Optimization of barcode recognition algorithms for fast and accurate reading even under variable lighting conditions.
- **Transactional Scalability**: System prepared to process thousands of simultaneous transactions without degradation.

---

#### 🎯 Main Features

- **Scan & Go**: Queue-free shopping experience with optimized scanner and 3-click checkout
- **Inventory Management**: Complete stock control with real-time updates and automatic alerts
- **POS Monitoring**: Point of sale health dashboard with availability and performance metrics
- **Financial Reconciliation**: Complete automation of sales and payment reconciliation
- **Access Control**: Integration with biometric locks for store access control
- **Advanced Analytics**: Detailed sales reports, best-selling products and consumer behavior analysis
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
    featured: true,
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
### 🚀 Panda Parking - Zona Azul - Smart City Solution

App de Smart City para mobilidade urbana, utilizando geofencing e integração governamental de tempo real. Plataforma oficial de estacionamento rotativo que simplifica a vida de milhares de motoristas diariamente, conectando cidadãos, governo e comerciantes em um ecossistema integrado.

---

#### 🏗️ Arquitetura Smart City

O sistema implementa uma arquitetura robusta para operação em múltiplas cidades:

- 📍 **Low-Power Geolocation**: Otimização de algoritmos de localização para geofencing sem drenar a bateria do usuário. Uso de geofencing passivo, detecção de movimento inteligente e ajuste automático de frequência de atualização.
- 💳 **Escalabilidade Transacional**: Motor de pagamentos preparado para processar milhares de cupons de estacionamento por hora. Arquitetura distribuída com load balancing e processamento assíncrono de transações.
- 🏛️ **Integração com Órgãos de Trânsito**: Barramento de serviços que garante a integridade e validade jurídica de cada cupom emitido. Integração em tempo real com sistemas governamentais para validação e fiscalização.

---

#### 🛠️ Stack Tecnológica

- **React Native**: Aplicativo mobile multiplataforma
- **Node.js Backend**: API robusta para processamento de transações
- **PostgreSQL + PostGIS**: Banco de dados geográfico para geofencing
- **Payment Gateway**: Integração com gateways de pagamento
- **Government APIs**: Integração com APIs governamentais
- **Geolocation Services**: Serviços de localização otimizados

---

#### ⚡ Desafios Técnicos e Soluções

- **Geofencing Eficiente**: Implementação de algoritmos de detecção de zona que minimizam uso de bateria, utilizando geofencing passivo e atualização adaptativa baseada em movimento.
- **Multi-City Support**: Sistema que adapta regras, tarifas e interface baseado na localização, suportando múltiplas cidades com configurações específicas.
- **Validação Jurídica**: Garantia de integridade e validade legal de cada cupom através de assinatura digital e integração com sistemas governamentais.
- **Performance em Picos**: Sistema preparado para lidar com picos de uso (horários de rush) sem degradação de performance.

---

#### 🎯 Diferenciais do Produto

- **Multi-city Core**: Aplicativo unificado que adapta regras tarifárias e interface baseando-se na geolocalização exata do veículo. Suporte a múltiplas cidades com configurações específicas.
- **PDV Web App**: Sistema completo para micro-comerciantes venderem cupons físicos integrados à frota digital. Dashboard de vendas, relatórios e gestão de estabelecimentos.
- **Notificações Inteligentes**: Alertas de expiração de tempo, lembretes de renovação e notificações de fiscalização em tempo real.
- **Histórico Completo**: Rastreamento de todos os cupons utilizados com informações detalhadas de localização, tempo e valor.
- **Integração Governamental**: Conexão direta com sistemas de trânsito para validação e fiscalização automática.
    `,
      en: `
### 🚀 Panda Parking - Blue Zone - Smart City Solution

Smart City app for urban mobility, using geofencing and real-time government integration. Official rotating parking platform that simplifies the lives of thousands of drivers daily, connecting citizens, government and merchants in an integrated ecosystem.

---

#### 🏗️ Smart City Architecture

The system implements a robust architecture for multi-city operation:

- 📍 **Low-Power Geolocation**: Optimization of location algorithms for geofencing without draining user battery. Use of passive geofencing, intelligent movement detection and automatic update frequency adjustment.
- 💳 **Transactional Scalability**: Payment engine prepared to process thousands of parking coupons per hour. Distributed architecture with load balancing and asynchronous transaction processing.
- 🏛️ **Traffic Authority Integration**: Service bus that ensures the integrity and legal validity of each issued coupon. Real-time integration with government systems for validation and enforcement.

---

#### 🛠️ Technology Stack

- **React Native**: Cross-platform mobile application
- **Node.js Backend**: Robust API for transaction processing
- **PostgreSQL + PostGIS**: Geographic database for geofencing
- **Payment Gateway**: Integration with payment gateways
- **Government APIs**: Integration with government APIs
- **Geolocation Services**: Optimized location services

---

#### ⚡ Technical Challenges & Solutions

- **Efficient Geofencing**: Implementation of zone detection algorithms that minimize battery usage, using passive geofencing and adaptive updates based on movement.
- **Multi-City Support**: System that adapts rules, tariffs and interface based on location, supporting multiple cities with specific configurations.
- **Legal Validation**: Guarantee of integrity and legal validity of each coupon through digital signature and integration with government systems.
- **Peak Performance**: System prepared to handle usage peaks (rush hours) without performance degradation.

---

#### 🎯 Product Differentials

- **Multi-city Core**: Unified application that adapts tariff rules and interface based on exact vehicle geolocation. Support for multiple cities with specific configurations.
- **PDV Web App**: Complete system for micro-merchants to sell physical coupons integrated with digital fleet. Sales dashboard, reports and establishment management.
- **Intelligent Notifications**: Time expiration alerts, renewal reminders and real-time enforcement notifications.
- **Complete History**: Tracking of all used coupons with detailed information on location, time and value.
- **Government Integration**: Direct connection with traffic systems for automatic validation and enforcement.
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
    images: [
      "/assets/projects/gerenciamento_produtos.png",
      "/assets/projects/product-mgmt/logo.png"
    ].filter(img => img),
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "State Management", "Responsive Design", "Testing"],
    links: [
      { texto: "Ver Demo", url: "https://teste-gerenciamento-produtos.vercel.app/" },
      { texto: "GitHub", url: "https://github.com/rogeriojr/teste-gerenciamento-produtos" }
    ],
    content: {
      pt: `
### 🚀 Sistema de Gerenciamento de Produtos

Aplicação web completa para gerenciamento de produtos com filtros avançados, paginação e layout totalmente responsivo. Interface administrativa moderna desenvolvida com o ecossistema Next.js, focada em alto desempenho e experiência de usuário fluida.

---

#### 🏗️ Arquitetura e Engenharia

O sistema foi desenvolvido seguindo as melhores práticas de Next.js e React moderno:

- ⚡ **Next.js 14 + App Router**: Utilização de Server Components para renderização otimizada no servidor, Client Components para interatividade e streaming de dados para melhor performance. Aproveitamento completo do App Router para roteamento eficiente.
- 🔄 **Gerenciamento de Estado**: Implementação de fluxos de dados eficientes para filtros complexos e paginação. Uso de React hooks, Context API e estado local otimizado para reduzir re-renderizações.
- 🎨 **Tailwind CSS**: Design system customizado seguindo padrões modernos de UI/UX. Sistema de design tokens para consistência visual e fácil manutenção. Componentes reutilizáveis com variantes.

---

#### 🛠️ Stack Tecnológica

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática para segurança e produtividade
- **Tailwind CSS**: Framework CSS utilitário
- **React Hooks**: Gerenciamento de estado e efeitos
- **Server Components**: Renderização no servidor para performance
- **Client Components**: Interatividade no cliente

---

#### ⚡ Desafios Técnicos e Soluções

- **Performance de Renderização**: Otimização de Server Components para reduzir JavaScript no cliente, melhorando Core Web Vitals e tempo de carregamento inicial.
- **Filtros Complexos**: Implementação de sistema de filtros multi-critério com debounce, memoização e atualização eficiente da UI sem re-renderizações desnecessárias.
- **Paginação Eficiente**: Sistema de paginação que carrega dados sob demanda, reduzindo uso de memória e melhorando performance com grandes datasets.
- **Validação de Formulários**: Implementação de validação robusta no cliente e servidor, com feedback visual imediato e mensagens de erro claras.

---

#### 🎯 Funcionalidades Críticas

- **Dashboard de Produtos**: Visualização clara com métricas de inventário, gráficos de distribuição e indicadores de status em tempo real.
- **Filtros Inteligentes**: Sistema de busca e filtragem multi-critério (categoria, preço, status, data) com combinação de filtros e busca em tempo real.
- **CRUD Operacional**: Gerenciamento completo do ciclo de vida dos produtos com validação rigorosa, edição inline e confirmações de ações destrutivas.
- **Layout Responsivo**: Design adaptável a todos os dispositivos com breakpoints otimizados e experiência consistente em mobile, tablet e desktop.
- **Testes**: Cobertura de testes para garantir qualidade e confiabilidade do código.

---

#### 📊 Impacto Técnico

- **Core Web Vitals**: Excelente pontuação devido à otimização de renderização, code splitting e lazy loading de componentes.
- **Código Limpo**: Estrutura seguindo princípios SOLID para fácil escalabilidade e manutenibilidade.
- **Performance**: Tempo de carregamento otimizado com Server Components e otimização de assets.
- **Acessibilidade**: Implementação de padrões WCAG para garantir acessibilidade a todos os usuários.
      `,
      en: `
### 🚀 Product Management System

Complete web application for product management with advanced filters, pagination and fully responsive layout. Modern administrative interface developed with the Next.js ecosystem, focused on high performance and fluid user experience.

---

#### 🏗️ Architecture & Engineering

The system was developed following Next.js and modern React best practices:

- ⚡ **Next.js 14 + App Router**: Utilization of Server Components for optimized server-side rendering, Client Components for interactivity and data streaming for better performance. Full App Router utilization for efficient routing.
- 🔄 **State Management**: Implementation of efficient data flows for complex filters and pagination. Use of React hooks, Context API and optimized local state to reduce re-renders.
- 🎨 **Tailwind CSS**: Customized design system following modern UI/UX standards. Design token system for visual consistency and easy maintenance. Reusable components with variants.

---

#### 🛠️ Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Static typing for security and productivity
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and effects
- **Server Components**: Server-side rendering for performance
- **Client Components**: Client-side interactivity

---

#### ⚡ Technical Challenges & Solutions

- **Rendering Performance**: Server Components optimization to reduce client-side JavaScript, improving Core Web Vitals and initial load time.
- **Complex Filters**: Implementation of multi-criteria filter system with debounce, memoization and efficient UI updates without unnecessary re-renders.
- **Efficient Pagination**: Pagination system that loads data on demand, reducing memory usage and improving performance with large datasets.
- **Form Validation**: Implementation of robust client and server validation, with immediate visual feedback and clear error messages.

---

#### 🎯 Critical Features

- **Product Dashboard**: Clear visualization with inventory metrics, distribution charts and real-time status indicators.
- **Smart Filters**: Multi-criteria search and filtering system (category, price, status, date) with filter combination and real-time search.
- **Operational CRUD**: Complete product lifecycle management with rigorous validation, inline editing and destructive action confirmations.
- **Responsive Layout**: Design adaptable to all devices with optimized breakpoints and consistent experience on mobile, tablet and desktop.
- **Testing**: Test coverage to ensure code quality and reliability.

---

#### 📊 Technical Impact

- **Core Web Vitals**: Excellent scores due to rendering optimization, code splitting and component lazy loading.
- **Clean Code**: Structure following SOLID principles for easy scalability and maintainability.
- **Performance**: Optimized load time with Server Components and asset optimization.
- **Accessibility**: WCAG standards implementation to ensure accessibility for all users.
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
    images: [
      "/assets/projects/nlw-unite.jpg"
    ],
    tags: ["Node.js", "Fastify", "TypeScript", "REST API", "Backend", "Microservices"],
    content: {
      pt: `
### 🚀 Projeto NLW Rocketseat - Node.js + Fastify

API REST desenvolvida com Node.js e Fastify durante evento NLW da Rocketseat, focada em alta performance e boas práticas. Projeto desenvolvido durante o evento Next Level Week da Rocketseat, demonstrando expertise em arquitetura backend moderna e capacidade de aprendizado rápido.

---

#### 🏗️ Arquitetura e Implementação

O projeto demonstra proficiência em desenvolvimento backend moderno:

- ⚡ **Microframework Fastify**: Escolha estratégica para máxima performance e overhead mínimo. Fastify é até 2x mais rápido que Express, com suporte nativo a async/await e schema validation integrado.
- 📘 **TypeScript Nativo**: Tipagem forte em toda a aplicação para maior confiabilidade, detecção precoce de erros e melhor DX (Developer Experience). Interfaces bem definidas e type safety completo.
- 🏛️ **Arquitetura em Camadas**: Separação clara entre controllers, services e repositories seguindo princípios SOLID. Separação de responsabilidades para facilitar testes e manutenção.
- ✅ **Validação de Schemas**: Uso de schemas Fastify (JSON Schema) para validação automática de requisições e respostas. Validação de tipos, formatos e constraints com mensagens de erro descritivas.

---

#### 🛠️ Stack Tecnológica

- **Node.js**: Runtime JavaScript assíncrono e não-bloqueante
- **Fastify**: Microframework web de alta performance
- **TypeScript**: Tipagem estática e interfaces
- **JSON Schema**: Validação de dados com schemas
- **Prisma / TypeORM**: ORM para gerenciamento de banco de dados
- **Swagger/OpenAPI**: Documentação automática da API

---

#### ⚡ Desafios Técnicos e Soluções

- **Performance vs Express**: Comparação e otimização para demonstrar vantagens do Fastify em termos de throughput e latência. Benchmarking de rotas críticas.
- **Validação Robusta**: Implementação de validação completa com JSON Schema para garantir integridade dos dados em todas as camadas.
- **Arquitetura Escalável**: Organização modular com plugins Fastify para separação de responsabilidades e reutilização de código.
- **TypeScript Integration**: Configuração adequada do TypeScript com Fastify para type safety completo em rotas, handlers e schemas.

---

#### 🎯 Performance e Escalabilidade

- **Alta Concorrência**: Suporte a alta concorrência através do event loop do Node.js, processamento assíncrono e connection pooling.
- **Melhores Práticas RESTful**: Implementação de padrões REST, códigos de status HTTP corretos, versionamento de API e tratamento de erros padronizado.
- **Documentação Automática**: Documentação automática com Swagger/OpenAPI para fácil integração e testes da API.
- **Otimização de Queries**: Uso de índices de banco de dados, queries otimizadas e cache quando apropriado.

---

#### 📚 Aprendizados e Aplicação

Projeto focado em solidificar conhecimentos em backend Node.js, demonstrando capacidade de absorver novos frameworks rapidamente e aplicar padrões da indústria. Implementação de conceitos avançados como:

- **Plugin Architecture**: Uso de plugins Fastify para modularização
- **Schema Validation**: Validação automática com JSON Schema
- **Error Handling**: Tratamento centralizado de erros
- **Testing**: Testes unitários e de integração
- **Documentation**: Documentação completa e acessível
    `,
      en: `
### 🚀 NLW Rocketseat Project - Node.js + Fastify

REST API developed with Node.js and Fastify during Rocketseat's NLW event, focused on high performance and best practices. Project developed during Rocketseat's Next Level Week event, demonstrating expertise in modern backend architecture and rapid learning capability.

---

#### 🏗️ Architecture & Implementation

The project demonstrates proficiency in modern backend development:

- ⚡ **Fastify Microframework**: Strategic choice for maximum performance and minimal overhead. Fastify is up to 2x faster than Express, with native async/await support and integrated schema validation.
- 📘 **Native TypeScript**: Strong typing throughout the application for greater reliability, early error detection and better DX (Developer Experience). Well-defined interfaces and complete type safety.
- 🏛️ **Layered Architecture**: Clear separation between controllers, services and repositories following SOLID principles. Separation of concerns to facilitate testing and maintenance.
- ✅ **Schema Validation**: Use of Fastify schemas (JSON Schema) for automatic request and response validation. Type, format and constraint validation with descriptive error messages.

---

#### 🛠️ Technology Stack

- **Node.js**: Asynchronous and non-blocking JavaScript runtime
- **Fastify**: High-performance web microframework
- **TypeScript**: Static typing and interfaces
- **JSON Schema**: Data validation with schemas
- **Prisma / TypeORM**: ORM for database management
- **Swagger/OpenAPI**: Automatic API documentation

---

#### ⚡ Technical Challenges & Solutions

- **Performance vs Express**: Comparison and optimization to demonstrate Fastify advantages in terms of throughput and latency. Critical route benchmarking.
- **Robust Validation**: Complete validation implementation with JSON Schema to ensure data integrity across all layers.
- **Scalable Architecture**: Modular organization with Fastify plugins for separation of concerns and code reuse.
- **TypeScript Integration**: Proper TypeScript configuration with Fastify for complete type safety in routes, handlers and schemas.

---

#### 🎯 Performance and Scalability

- **High Concurrency**: Support for high concurrency through Node.js event loop, asynchronous processing and connection pooling.
- **RESTful Best Practices**: Implementation of REST patterns, correct HTTP status codes, API versioning and standardized error handling.
- **Automatic Documentation**: Automatic documentation with Swagger/OpenAPI for easy integration and API testing.
- **Query Optimization**: Use of database indexes, optimized queries and caching when appropriate.

---

#### 📚 Learning and Application

Project focused on solidifying knowledge in Node.js backend, demonstrating ability to quickly absorb new frameworks and apply industry standards. Implementation of advanced concepts such as:

- **Plugin Architecture**: Use of Fastify plugins for modularization
- **Schema Validation**: Automatic validation with JSON Schema
- **Error Handling**: Centralized error handling
- **Testing**: Unit and integration tests
- **Documentation**: Complete and accessible documentation
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
    images: [
      "/assets/projects/coodesh_challenge.png"
    ],
    tags: ["React Native", "TypeScript", "Mobile", "API Integration", "State Management"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/mobile-chalenge-20240202-codesh" }
    ],
    content: {
      pt: `
### 🚀 Mobile Challenge - Coodesh

Desafio técnico mobile desenvolvido para Coodesh, demonstrando habilidades avançadas em desenvolvimento React Native e TypeScript. Aplicação mobile de alta fidelidade desenvolvida para o desafio técnico da Coodesh, focada em performance e arquitetura limpa.

---

#### 🏗️ Arquitetura Mobile Moderna

O projeto demonstra expertise em desenvolvimento mobile com React Native:

- 📱 **Stack Moderna**: React Native com TypeScript para máxima segurança de tipos e velocidade de desenvolvimento. Tipagem forte em toda a aplicação garantindo detecção precoce de erros e melhor DX.
- 🔄 **Arquitetura de Dados**: Implementação de Fetch API com tratamento de erros robusto e estados de loading globais. Gerenciamento de estado eficiente com Context API ou hooks customizados.
- 🎨 **UI/UX Nativa**: Componentização focada em performance, garantindo scroll suave e transições fluidas em iOS e Android. Uso de componentes nativos otimizados e animações performáticas.

---

#### 🛠️ Stack Tecnológica

- **React Native**: Framework mobile multiplataforma
- **TypeScript**: Tipagem estática e interfaces
- **React Navigation**: Navegação entre telas
- **Fetch API**: Cliente HTTP nativo
- **AsyncStorage**: Persistência local de dados
- **React Hooks**: Gerenciamento de estado e efeitos

---

#### ⚡ Desafios Técnicos e Soluções

- **Performance de Listas**: Otimização de FlatList com getItemLayout, keyExtractor otimizado e renderização eficiente de itens para garantir scroll suave mesmo com grandes datasets.
- **Tratamento de Erros**: Implementação de error boundaries, tratamento centralizado de erros de rede e feedback visual claro para o usuário.
- **Estados de Loading**: Gerenciamento eficiente de estados de loading, skeleton screens e feedback visual durante carregamento de dados.
- **Cache e Offline**: Estratégias básicas de cache para melhor experiência em conexões lentas, com sincronização quando conexão é restabelecida.

---

#### 🎯 Funcionalidades Implementadas

- **Listagem Dinâmica**: Consumo de API remota com atualização em tempo real, paginação eficiente e pull-to-refresh para atualização manual.
- **Detalhes de Itens**: Visualização rica com tratamento de imagens (lazy loading, placeholders), dados complexos formatados e navegação intuitiva.
- **Offline First**: Estratégias básicas de cache para melhor experiência em conexões lentas, com indicadores de status de conexão.
- **Navegação Fluida**: Sistema de navegação entre telas com animações nativas e transições suaves.
- **Validação de Dados**: Validação de dados recebidos da API e tratamento de casos edge (dados faltantes, formatos inesperados).

---

#### ✅ Excelência em Engenharia

- **Código Documentado**: Código bem documentado com comentários claros e README completo explicando arquitetura e decisões técnicas.
- **Testes**: Estrutura de testes implementada para garantir qualidade e confiabilidade do código.
- **Estrutura Modular**: Estrutura de pastas modular facilitando a manutenção, separação de responsabilidades e escalabilidade.
- **Boas Práticas**: Seguimento de padrões de código, convenções de nomenclatura e princípios SOLID.
      `,
      en: `
### 🚀 Mobile Challenge - Coodesh

Mobile technical challenge developed for Coodesh, demonstrating advanced skills in React Native and TypeScript development. High-fidelity mobile application developed for the Coodesh technical challenge, focused on performance and clean architecture.

---

#### 🏗️ Modern Mobile Architecture

The project demonstrates expertise in mobile development with React Native:

- 📱 **Modern Stack**: React Native with TypeScript for maximum type safety and development speed. Strong typing throughout the application ensuring early error detection and better DX.
- 🔄 **Data Architecture**: Fetch API implementation with robust error handling and global loading states. Efficient state management with Context API or custom hooks.
- 🎨 **Native UI/UX**: Performance-focused componentization, ensuring smooth scrolling and fluid transitions on iOS and Android. Use of optimized native components and performant animations.

---

#### 🛠️ Technology Stack

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Static typing and interfaces
- **React Navigation**: Screen navigation
- **Fetch API**: Native HTTP client
- **AsyncStorage**: Local data persistence
- **React Hooks**: State management and effects

---

#### ⚡ Technical Challenges & Solutions

- **List Performance**: FlatList optimization with getItemLayout, optimized keyExtractor and efficient item rendering to ensure smooth scrolling even with large datasets.
- **Error Handling**: Implementation of error boundaries, centralized network error handling and clear visual feedback for users.
- **Loading States**: Efficient loading state management, skeleton screens and visual feedback during data loading.
- **Cache and Offline**: Basic caching strategies for better experience on slow connections, with synchronization when connection is restored.

---

#### 🎯 Implemented Features

- **Dynamic Listing**: Remote API consumption with real-time updates, efficient pagination and pull-to-refresh for manual updates.
- **Item Details**: Rich visualization with image handling (lazy loading, placeholders), formatted complex data and intuitive navigation.
- **Offline First**: Basic caching strategies for better experience on slow connections, with connection status indicators.
- **Fluid Navigation**: Screen navigation system with native animations and smooth transitions.
- **Data Validation**: Validation of API-received data and handling of edge cases (missing data, unexpected formats).

---

#### ✅ Engineering Excellence

- **Documented Code**: Well-documented code with clear comments and complete README explaining architecture and technical decisions.
- **Testing**: Test structure implemented to ensure code quality and reliability.
- **Modular Structure**: Modular folder structure facilitating maintenance, separation of concerns and scalability.
- **Best Practices**: Following code standards, naming conventions and SOLID principles.
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
      pt: "Aplicativo mobile nativo para gestão de cupons e benefícios, desenvolvido com React Native, Expo SDK 51+, TypeScript e arquitetura SOLID. Inclui autenticação, filtros avançados, histórico, carteira virtual e suporte completo a temas claro/escuro.",
      en: "Native mobile app for coupon and benefit management, developed with React Native, Expo SDK 51+, TypeScript and SOLID architecture. Includes authentication, advanced filters, history, virtual wallet and full light/dark theme support."
    },
    category: "development",
    featured: true,
    images: [
      "/assets/projects/yellot/logo.png",
      "/assets/projects/yellot/login.png",
      "/assets/projects/yellot/register.png",
      "/assets/projects/yellot/forgot_password.png",
      "/assets/projects/yellot/search.png",
      "/assets/projects/yellot/filters.png",
      "/assets/projects/yellot/history.png",
      "/assets/projects/yellot/wallet.png",
      "/assets/projects/yellot/terms.png",
      "/assets/projects/yellot/profile.png"
    ],
    tags: ["React Native", "Expo SDK 51+", "TypeScript", "NativeWind", "Zustand", "React Navigation", "Axios", "Date-fns", "Jest", "SOLID", "AsyncStorage"],
    links: [
      { texto: "Baixar APK (Android)", url: "https://drive.google.com/file/d/1nBMw42yoLdXP3P-JuRq0A_ozv8agK21j/view?usp=sharing" },
      { texto: "GitHub", url: "https://github.com/rogeriojr/yellot-cupons-app" },
      { texto: "Google Play", url: "https://play.google.com/store/search?q=yellot&c=apps" }
    ],
    content: {
      pt: `
### 🚀 Ecossistema Mobile Yellot Cupons

Aplicativo nativo de alta performance para gestão de cupons e programa de fidelidade, desenvolvido com arquitetura escalável e princípios SOLID. A plataforma oferece uma experiência completa de gerenciamento de benefícios, desde autenticação segura até visualização organizada de cupons com filtros temporais avançados e monitoramento em tempo real de status de validade.

---

#### 🏗️ Arquitetura e Engenharia de Software

O projeto implementa uma arquitetura baseada em componentes com separação rigorosa de responsabilidades, seguindo os princípios **SOLID**:

- 📦 **Estrutura Modular**: Organização especializada em \`src/components/\` (componentes reutilizáveis), \`src/contexts/\` (ThemeContext, AuthContext), \`src/services/\` (camada de serviços com interfaces e implementações), \`src/store/\` (gerenciamento de estado global), \`src/types/\` (contratos TypeScript) e \`src/navigation/\` (configuração de rotas).

- ⚛️ **Gerenciamento de Estado Atômico**: Utilização de **Zustand** para stores especializadas (\`useAuthStore\`, \`useCouponStore\`, \`useCouponHistoryStore\`), garantindo baixo acoplamento, redução de re-renderizações desnecessárias e manutenibilidade do código.

- 🧭 **Navegação Robusta**: Implementação de **React Navigation** com stack navigator para fluxos de autenticação e tab navigator para navegação principal, garantindo transições fluidas e gestão de estado de navegação.

- 🔧 **Camada de Serviços SOLID**: Arquitetura de serviços com interfaces (\`src/services/interfaces/\`) e implementações concretas (\`src/services/implementations/\`), permitindo inversão de dependências e facilitando testes e manutenção.

---

#### 🛠️ Stack Tecnológica e Ferramentas

- 📱 **React Native + Expo SDK 51+**: Aproveitamento das últimas melhorias de performance, ferramentas de desenvolvimento e compatibilidade com APIs nativas.

- 📘 **TypeScript**: Tipagem forte em toda a aplicação, garantindo segurança de tipos, melhor DX (Developer Experience) e detecção precoce de erros.

- 🎨 **NativeWind (TailwindCSS)**: Sistema de design utilitário para React Native, permitindo estilização consistente e responsiva com suporte completo a temas.

- ✨ **React Native Reanimated & Gesture Handler**: Animações nativas a 60fps e suporte completo a gestos, proporcionando micro-interações fluidas e experiência verdadeiramente nativa.

- 🌐 **Axios com Interceptors**: Cliente HTTP configurado com interceptores para injeção automática de tokens de autenticação, tratamento centralizado de erros e transformação de dados.

- 📅 **Date-fns**: Biblioteca moderna para manipulação e formatação de datas, utilizada para agrupamento de cupons por mês e cálculos de validade.

- 💾 **AsyncStorage**: Persistência local de dados de autenticação e preferências do usuário, garantindo sessão persistente entre reinicializações do app.

---

#### 🔐 Fluxo de Autenticação e Segurança

- 🔑 **Sistema de Autenticação Mockado**: Implementação robusta de fluxos completos de autenticação (Login, Registro, Recuperação de Senha, Reset de Senha) para fins de demonstração, com validações de formulários e tratamento de erros.

- 💿 **Persistência de Sessão**: Gerenciamento de tokens e estados de autenticação persistidos via **AsyncStorage**, permitindo que usuários permaneçam autenticados entre sessões.

- 🔄 **Context API para Auth**: Integração de **AuthContext** com stores Zustand para gerenciamento centralizado do estado de autenticação em toda a aplicação.

---

#### ⚡ Desafios Técnicos e Soluções

- 📊 **Agrupamento Dinâmico de Cupons**: Implementação de algoritmos eficientes para agrupamento de cupons por mês utilizando **date-fns**, com otimização de performance para grandes volumes de dados.

- 🔍 **Filtros Temporais Multi-critério**: Sistema de filtragem flexível que permite combinação de períodos (7, 15, 30, 90 dias) com status (Ativo/Expirado), mantendo performance mesmo com grandes datasets.

- 🔄 **Gerenciamento de Estado Complexo**: Resolução de desafios de sincronização entre múltiplas stores Zustand, garantindo consistência de dados e evitando race conditions.

- ⚡ **Otimização de Performance**: Implementação de lazy loading, memoização de componentes e otimização de re-renderizações para garantir fluidez em dispositivos de baixo desempenho.

- 🌓 **Temas Dinâmicos**: Sistema de temas claro/escuro implementado com **ThemeContext**, garantindo transição suave entre modos e persistência de preferências do usuário.

---

#### ✅ Qualidade e Testes

- 🧪 **Jest & React Testing Library**: Cobertura abrangente de testes unitários para componentes de UI, contextos React e stores Zustand, garantindo confiabilidade e manutenibilidade.

- 📁 **Estrutura de Testes Organizada**: Separação de testes em \`__tests__/components/\`, \`__tests__/contexts/\` e \`__tests__/store/\`, facilitando manutenção e execução seletiva.

- 🎭 **Mocks e Configuração**: Setup completo de mocks para AsyncStorage, animações do React Native, SVG e requisições de API, permitindo testes isolados e determinísticos.

- 🔄 **CI/CD Integration**: Scripts customizados para execução de testes em ambiente de integração contínua, incluindo cobertura de código e relatórios automatizados.

---

#### 🎯 Funcionalidades e Features

- 📈 **Dashboard Inteligente**: Exibição de cupons agrupados por mês com indicadores visuais de quantidade total e cupons disponíveis, proporcionando visão clara do status dos benefícios.

- 🔎 **Sistema de Filtros Avançados**: Filtragem multi-critério por período temporal (7, 15, 30, 90 dias) e status de validade, com atualização em tempo real da interface.

- 💳 **Carteira Virtual**: Gestão completa do ciclo de vida dos cupons resgatados, com visualização detalhada e histórico de utilização.

- 📜 **Histórico Completo**: Rastreamento e exibição de todos os cupons utilizados, com informações detalhadas de data, status e valor.

- 🔍 **Busca em Tempo Real**: Sistema de pesquisa instantânea de cupons com filtros dinâmicos e resultados atualizados conforme digitação.

- 👤 **Perfil de Usuário**: Tela completa de gerenciamento de perfil com informações do usuário e configurações de preferências.

- 📋 **Termos e Condições**: Tela dedicada para visualização de termos de uso e políticas do aplicativo.

- 🎨 **UX Premium**: Interface intuitiva com suporte completo a gestos nativos, transições fluidas entre telas e feedback visual imediato em todas as interações.
      `,
      en: `
### 🚀 Yellot Coupons Mobile Ecosystem

High-performance native mobile application for coupon and loyalty program management, developed with scalable architecture and SOLID principles. The platform provides a complete benefit management experience, from secure authentication to organized coupon viewing with advanced temporal filters and real-time validity status monitoring.

---

#### 🏗️ Architecture & Software Engineering

The project implements a component-based architecture with rigorous separation of concerns, following **SOLID** principles:

- 📦 **Modular Structure**: Specialized organization in \`src/components/\` (reusable components), \`src/contexts/\` (ThemeContext, AuthContext), \`src/services/\` (service layer with interfaces and implementations), \`src/store/\` (global state management), \`src/types/\` (TypeScript contracts), and \`src/navigation/\` (route configuration).

- ⚛️ **Atomic State Management**: Use of **Zustand** for specialized stores (\`useAuthStore\`, \`useCouponStore\`, \`useCouponHistoryStore\`), ensuring low coupling, reduced unnecessary re-renders, and code maintainability.

- 🧭 **Robust Navigation**: **React Navigation** implementation with stack navigator for authentication flows and tab navigator for main navigation, ensuring fluid transitions and navigation state management.

- 🔧 **SOLID Service Layer**: Service architecture with interfaces (\`src/services/interfaces/\`) and concrete implementations (\`src/services/implementations/\`), enabling dependency inversion and facilitating testing and maintenance.

---

#### 🛠️ Technology Stack & Tools

- 📱 **React Native + Expo SDK 51+**: Leveraging latest performance improvements, development tools, and native API compatibility.

- 📘 **TypeScript**: Strong typing throughout the application, ensuring type safety, better DX (Developer Experience), and early error detection.

- 🎨 **NativeWind (TailwindCSS)**: Utility-first design system for React Native, enabling consistent and responsive styling with full theme support.

- ✨ **React Native Reanimated & Gesture Handler**: Native 60fps animations and full gesture support, providing fluid micro-interactions and a truly native experience.

- 🌐 **Axios with Interceptors**: HTTP client configured with interceptors for automatic authentication token injection, centralized error handling, and data transformation.

- 📅 **Date-fns**: Modern library for date manipulation and formatting, used for monthly coupon grouping and validity calculations.

- 💾 **AsyncStorage**: Local persistence of authentication data and user preferences, ensuring persistent sessions between app restarts.

---

#### 🔐 Authentication Flow & Security

- 🔑 **Mocked Authentication System**: Robust implementation of complete authentication flows (Login, Registration, Password Recovery, Password Reset) for demonstration purposes, with form validations and error handling.

- 💿 **Session Persistence**: Token and authentication state management persisted via **AsyncStorage**, allowing users to remain authenticated between sessions.

- 🔄 **Context API for Auth**: **AuthContext** integration with Zustand stores for centralized authentication state management across the application.

---

#### ⚡ Technical Challenges & Solutions

- 📊 **Dynamic Coupon Grouping**: Efficient algorithm implementation for monthly coupon grouping using **date-fns**, with performance optimization for large data volumes.

- 🔍 **Multi-criteria Temporal Filters**: Flexible filtering system allowing combination of periods (7, 15, 30, 90 days) with status (Active/Expired), maintaining performance even with large datasets.

- 🔄 **Complex State Management**: Resolution of synchronization challenges between multiple Zustand stores, ensuring data consistency and avoiding race conditions.

- ⚡ **Performance Optimization**: Implementation of lazy loading, component memoization, and re-render optimization to ensure fluidity on low-performance devices.

- 🌓 **Dynamic Themes**: Light/dark theme system implemented with **ThemeContext**, ensuring smooth transitions between modes and persistence of user preferences.

---

#### ✅ Quality & Testing

- 🧪 **Jest & React Testing Library**: Comprehensive unit test coverage for UI components, React contexts, and Zustand stores, ensuring reliability and maintainability.

- 📁 **Organized Test Structure**: Test separation in \`__tests__/components/\`, \`__tests__/contexts/\`, and \`__tests__/store/\`, facilitating maintenance and selective execution.

- 🎭 **Mocks & Configuration**: Complete setup of mocks for AsyncStorage, React Native animations, SVG, and API requests, enabling isolated and deterministic tests.

- 🔄 **CI/CD Integration**: Custom scripts for test execution in continuous integration environments, including code coverage and automated reports.

---

#### 🎯 Features & Functionality

- 📈 **Smart Dashboard**: Monthly organized coupon display with visual indicators of total quantity and available coupons, providing clear view of benefit status.

- 🔎 **Advanced Filter System**: Multi-criteria filtering by temporal period (7, 15, 30, 90 days) and validity status, with real-time interface updates.

- 💳 **Virtual Wallet**: Complete lifecycle management of redeemed coupons, with detailed viewing and usage history.

- 📜 **Complete History**: Tracking and display of all used coupons, with detailed information on date, status, and value.

- 🔍 **Real-time Search**: Instant coupon search system with dynamic filters and results updated as you type.

- 👤 **User Profile**: Complete profile management screen with user information and preference settings.

- 📋 **Terms & Conditions**: Dedicated screen for viewing terms of use and application policies.

- 🎨 **Premium UX**: Intuitive interface with full native gesture support, fluid screen transitions, and immediate visual feedback on all interactions.
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
### 🚀 Neo Carrossel 3D - Componente Interativo Avançado

Componente React avançado de carrossel 3D com física realista e suporte a gestos. Desenvolvimento de um componente de carrossel tridimensional de alta performance para vitrines digitais, oferecendo experiência imersiva e interativa.

---

#### 🏗️ Arquitetura e Tecnologia 3D

O componente foi desenvolvido com foco em performance e experiência do usuário:

- ✨ **Framer Motion**: Animações fluidas baseadas em física (springs) que proporcionam movimento natural e responsivo. Sistema de animações com física realista que simula inércia, atrito e elasticidade.
- 👆 **Gestos Avançados**: Suporte completo a arraste e toque com inércia realista, gestos de pinch-to-zoom e rotação. Integração com React Native Gesture Handler para reconhecimento preciso de gestos.
- ♿ **Acessibilidade**: Navegação por teclado (setas, Tab, Enter), suporte a leitores de tela (ARIA labels) e indicadores visuais para usuários com deficiência visual.
- 🎨 **Renderização 3D**: Transformações CSS 3D ou integração com Three.js para renderização verdadeiramente tridimensional quando necessário.

---

#### 🛠️ Stack Tecnológica

- **React**: Biblioteca principal para construção do componente
- **Framer Motion**: Biblioteca de animações baseadas em física
- **React Native Gesture Handler**: Reconhecimento de gestos avançados
- **Three.js** (opcional): Renderização 3D quando necessário
- **TypeScript**: Tipagem estática para segurança
- **CSS 3D Transforms**: Transformações 3D nativas do navegador

---

#### ⚡ Desafios Técnicos e Soluções

- **Performance de Animações**: Otimização de animações para manter 60fps constantes, uso de will-change CSS e hardware acceleration quando disponível.
- **Gestos Complexos**: Implementação de reconhecimento de gestos multi-toque, detecção de direção e velocidade para animações baseadas em gestos do usuário.
- **Responsividade 3D**: Adaptação de transformações 3D para diferentes tamanhos de tela, mantendo proporções e perspectiva corretas.
- **Acessibilidade em 3D**: Implementação de navegação alternativa para usuários que não podem usar gestos, com controles de teclado e descrições textuais.

---

#### 🎯 Funcionalidades Implementadas

- **Carrossel 3D**: Visualização tridimensional de itens com rotação, zoom e navegação fluida
- **Gestos Naturais**: Suporte a arraste, swipe, pinch e rotação com física realista
- **Navegação por Teclado**: Controles completos via teclado para acessibilidade
- **Indicadores Visuais**: Indicadores de posição atual e navegação disponível
- **Performance Otimizada**: Renderização eficiente mantendo 60fps mesmo com múltiplos itens
- **Customização**: Props para customização de animações, velocidade e comportamento
      `,
      en: `
### 🚀 Neo Carousel 3D - Advanced Interactive Component

Advanced React 3D carousel component with realistic physics and gesture support. Development of a high-performance three-dimensional carousel component for digital showcases, offering immersive and interactive experience.

---

#### 🏗️ 3D Architecture & Technology

The component was developed with focus on performance and user experience:

- ✨ **Framer Motion**: Fluid physics-based animations (springs) that provide natural and responsive movement. Animation system with realistic physics that simulates inertia, friction and elasticity.
- 👆 **Advanced Gestures**: Complete support for drag and touch with realistic inertia, pinch-to-zoom gestures and rotation. Integration with React Native Gesture Handler for precise gesture recognition.
- ♿ **Accessibility**: Keyboard navigation (arrows, Tab, Enter), screen reader support (ARIA labels) and visual indicators for visually impaired users.
- 🎨 **3D Rendering**: CSS 3D transformations or Three.js integration for truly three-dimensional rendering when needed.

---

#### 🛠️ Technology Stack

- **React**: Main library for component construction
- **Framer Motion**: Physics-based animation library
- **React Native Gesture Handler**: Advanced gesture recognition
- **Three.js** (optional): 3D rendering when needed
- **TypeScript**: Static typing for security
- **CSS 3D Transforms**: Native browser 3D transformations

---

#### ⚡ Technical Challenges & Solutions

- **Animation Performance**: Animation optimization to maintain constant 60fps, use of CSS will-change and hardware acceleration when available.
- **Complex Gestures**: Implementation of multi-touch gesture recognition, direction and velocity detection for user gesture-based animations.
- **3D Responsiveness**: Adaptation of 3D transformations for different screen sizes, maintaining correct proportions and perspective.
- **3D Accessibility**: Implementation of alternative navigation for users who cannot use gestures, with keyboard controls and textual descriptions.

---

#### 🎯 Implemented Features

- **3D Carousel**: Three-dimensional item visualization with rotation, zoom and fluid navigation
- **Natural Gestures**: Support for drag, swipe, pinch and rotation with realistic physics
- **Keyboard Navigation**: Complete keyboard controls for accessibility
- **Visual Indicators**: Current position indicators and available navigation
- **Optimized Performance**: Efficient rendering maintaining 60fps even with multiple items
- **Customization**: Props for animation, speed and behavior customization
      `
    },
    links: [
      { texto: "Demo", url: "#" }
    ],
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15")
  },
  {
    id: "neo-test-frontend",
    title: {
      pt: "Neo Test Frontend",
      en: "Neo Test Frontend"
    },
    description: {
      pt: "Repositório de teste prático demonstrando expertise em React.js + TypeScript com metodologia de microfrontends, incluindo Login, CRUD e gerenciamento de estado.",
      en: "Practical test repository demonstrating expertise in React.js + TypeScript with microfrontends methodology, including Login, CRUD and state management."
    },
    category: "development",
    featured: true,
    images: [
      "/assets/projects/neoidea_logo_2024.png"
    ],
    tags: ["React", "TypeScript", "Microfrontends", "CRUD", "State Management", "SOLID"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/neo-test-frontend" }
    ],
    content: {
      pt: `
### 🚀 Teste Prático Neo - Microfrontends

Repositório de teste prático da Neo dedicado a demonstrar expertise em desenvolvimento React.js + TypeScript, utilizando metodologia de microfrontends e implementações completas de Login, CRUD e gerenciamento de estado.

---

#### 🏗️ Arquitetura e Metodologia

O projeto demonstra proficiência em arquitetura de microfrontends, uma abordagem moderna para desenvolvimento de aplicações escaláveis:

- 📦 **Microfrontends**: Implementação de arquitetura modular com separação rigorosa de responsabilidades, comunicação entre módulos independentes e deploy independente de cada microfrontend.
- ⚛️ **React + TypeScript**: Desenvolvimento com tipagem forte, componentes funcionais modernos e hooks customizados para reutilização de lógica.
- 🔐 **Autenticação Robusta**: Sistema de login completo com validação de formulários, tratamento de erros, gerenciamento de tokens e persistência de sessão.
- 📊 **CRUD Completo**: Operações de Create, Read, Update e Delete com interface intuitiva, validação de dados e feedback visual para o usuário.
- 🔄 **State Management Avançado**: Gerenciamento de estado eficiente utilizando Context API, hooks customizados e padrões de estado global quando necessário.

---

#### 🛠️ Stack Tecnológica e Ferramentas

- **React.js**: Framework principal para construção da interface com componentes reutilizáveis e composição.
- **TypeScript**: Tipagem estática para maior segurança, melhor DX (Developer Experience) e detecção precoce de erros.
- **Microfrontends**: Arquitetura modular que permite desenvolvimento e deploy independente de diferentes partes da aplicação.
- **State Management**: Gerenciamento de estado local e global com padrões modernos e eficientes.
- **Build Tools**: Configuração de build otimizada para desenvolvimento e produção.

---

#### ⚡ Desafios Técnicos e Soluções

- **Comunicação entre Microfrontends**: Implementação de estratégias eficientes para comunicação entre módulos independentes, garantindo baixo acoplamento e alta coesão.
- **Gerenciamento de Estado Distribuído**: Resolução de desafios de sincronização de estado entre diferentes microfrontends.
- **Validação e Tratamento de Erros**: Implementação de validação robusta em formulários e tratamento centralizado de erros.
- **Performance e Otimização**: Otimização de bundle size, lazy loading de módulos e code splitting para melhor performance.

---

#### 🎯 Funcionalidades Implementadas

- **Sistema de Autenticação**: Login seguro com validação e persistência de sessão.
- **CRUD de Entidades**: Operações completas de criação, leitura, atualização e exclusão.
- **Interface Responsiva**: Design adaptável a diferentes tamanhos de tela.
- **Validação de Formulários**: Validação em tempo real com feedback visual.
- **Tratamento de Erros**: Mensagens de erro claras e tratamento de exceções.
      `,
      en: `
### 🚀 Neo Practical Test - Microfrontends

Practical test repository from Neo dedicated to demonstrating expertise in React.js + TypeScript development, using microfrontends methodology and complete implementations of Login, CRUD and state management.

---

#### 🏗️ Architecture & Methodology

The project demonstrates proficiency in microfrontends architecture, a modern approach for developing scalable applications:

- 📦 **Microfrontends**: Implementation of modular architecture with rigorous separation of concerns, communication between independent modules and independent deployment of each microfrontend.
- ⚛️ **React + TypeScript**: Development with strong typing, modern functional components and custom hooks for logic reuse.
- 🔐 **Robust Authentication**: Complete login system with form validation, error handling, token management and session persistence.
- 📊 **Complete CRUD**: Create, Read, Update and Delete operations with intuitive interface, data validation and visual feedback for users.
- 🔄 **Advanced State Management**: Efficient state management using Context API, custom hooks and global state patterns when needed.

---

#### 🛠️ Technology Stack & Tools

- **React.js**: Main framework for interface construction with reusable components and composition.
- **TypeScript**: Static typing for greater security, better DX (Developer Experience) and early error detection.
- **Microfrontends**: Modular architecture that allows independent development and deployment of different parts of the application.
- **State Management**: Local and global state management with modern and efficient patterns.
- **Build Tools**: Optimized build configuration for development and production.

---

#### ⚡ Technical Challenges & Solutions

- **Microfrontends Communication**: Implementation of efficient strategies for communication between independent modules, ensuring low coupling and high cohesion.
- **Distributed State Management**: Resolution of state synchronization challenges between different microfrontends.
- **Validation and Error Handling**: Implementation of robust form validation and centralized error handling.
- **Performance and Optimization**: Bundle size optimization, module lazy loading and code splitting for better performance.

---

#### 🎯 Implemented Features

- **Authentication System**: Secure login with validation and session persistence.
- **Entity CRUD**: Complete create, read, update and delete operations.
- **Responsive Interface**: Design adaptable to different screen sizes.
- **Form Validation**: Real-time validation with visual feedback.
- **Error Handling**: Clear error messages and exception handling.
      `
    },
    createdAt: new Date("2025-04-02"),
    updatedAt: new Date("2025-04-02")
  },
  {
    id: "app-plug-smart",
    title: {
      pt: "App Plug Smart",
      en: "Plug Smart App"
    },
    description: {
      pt: "Aplicativo mobile para controle de plugs inteligentes Tuya, com funcionalidades de login, cadastro, travamento/desbloqueio automático e todas as funcionalidades de produção.",
      en: "Mobile app for Tuya smart plug control, with login, registration, automatic lock/unlock and all production features."
    },
    category: "development",
    images: [
      "/assets/projects/plug-smart-logo.jpg"
    ],
    tags: ["React Native", "Tuya IoT", "Mobile", "Smart Home", "TypeScript"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/app-plug-smart" }
    ],
    content: {
      pt: `
### 🔌 App Plug Smart - Controle IoT

Template de projeto completo para controle de plugs inteligentes Tuya, desenvolvido como aplicativo mobile nativo com funcionalidades completas de autenticação, cadastro e gerenciamento de dispositivos IoT em produção.

---

#### 🏗️ Arquitetura Mobile

O aplicativo foi desenvolvido seguindo as melhores práticas de desenvolvimento mobile:

- 📱 **React Native**: Desenvolvimento mobile multiplataforma (iOS e Android) com código compartilhado, garantindo consistência entre plataformas e redução de custos de desenvolvimento.
- 🔐 **Autenticação Completa**: Sistema robusto de login e cadastro com validação de formulários, recuperação de senha, gerenciamento de tokens JWT e persistência de sessão via AsyncStorage.
- 🔌 **Integração Tuya SDK**: Integração nativa com Tuya IoT Cloud SDK para controle total de dispositivos IoT, incluindo comandos de ligar/desligar, monitoramento de status e configurações avançadas.
- 🔒 **Travamento Automático**: Sistema inteligente de lock/unlock de plugs com regras configuráveis, agendamento de tarefas e automações baseadas em condições.
- 🎨 **UI/UX Moderna**: Interface intuitiva e responsiva com design system consistente, animações fluidas e feedback visual imediato.

---

#### 🛠️ Stack Tecnológica

- **React Native**: Framework principal para desenvolvimento mobile
- **TypeScript**: Tipagem estática para maior segurança e produtividade
- **Tuya IoT SDK**: SDK oficial para integração com dispositivos Tuya
- **AsyncStorage**: Persistência local de dados e preferências
- **React Navigation**: Navegação entre telas com stack e tab navigators
- **State Management**: Gerenciamento de estado global para dispositivos e autenticação

---

#### ⚡ Desafios Técnicos e Soluções

- **Sincronização de Dispositivos**: Implementação de polling inteligente e WebSockets para manter status dos dispositivos atualizado em tempo real.
- **Gerenciamento de Conexão**: Tratamento de cenários offline com cache local e sincronização automática quando a conexão é restabelecida.
- **Performance**: Otimização de re-renderizações e uso de memoização para garantir fluidez mesmo com múltiplos dispositivos conectados.
- **Segurança**: Implementação de autenticação segura, criptografia de dados sensíveis e validação de permissões de acesso.

---

#### 🎯 Funcionalidades Principais

- **Login e Cadastro**: Sistema completo de autenticação com validação e recuperação de senha
- **Controle de Dispositivos**: Gerenciamento de múltiplos plugs smart com controle individual e em grupo
- **Automação**: Configuração de regras de travamento/desbloqueio com condições e agendamentos
- **Monitoramento**: Acompanhamento de status, consumo de energia e histórico de operações
- **Notificações**: Alertas em tempo real de eventos, mudanças de status e notificações push
- **Perfil e Configurações**: Gerenciamento de perfil de usuário e preferências do aplicativo
      `,
      en: `
### 🔌 Plug Smart App - IoT Control

Complete project template for Tuya smart plug control, developed as a native mobile application with complete authentication, registration and IoT device management features in production.

---

#### 🏗️ Mobile Architecture

The application was developed following mobile development best practices:

- 📱 **React Native**: Cross-platform mobile development (iOS and Android) with shared code, ensuring consistency between platforms and reduced development costs.
- 🔐 **Complete Authentication**: Robust login and registration system with form validation, password recovery, JWT token management and session persistence via AsyncStorage.
- 🔌 **Tuya SDK Integration**: Native integration with Tuya IoT Cloud SDK for full IoT device control, including on/off commands, status monitoring and advanced settings.
- 🔒 **Automatic Locking**: Intelligent plug lock/unlock system with configurable rules, task scheduling and condition-based automations.
- 🎨 **Modern UI/UX**: Intuitive and responsive interface with consistent design system, fluid animations and immediate visual feedback.

---

#### 🛠️ Technology Stack

- **React Native**: Main framework for mobile development
- **TypeScript**: Static typing for greater security and productivity
- **Tuya IoT SDK**: Official SDK for Tuya device integration
- **AsyncStorage**: Local data and preference persistence
- **React Navigation**: Screen navigation with stack and tab navigators
- **State Management**: Global state management for devices and authentication

---

#### ⚡ Technical Challenges & Solutions

- **Device Synchronization**: Implementation of intelligent polling and WebSockets to keep device status updated in real-time.
- **Connection Management**: Offline scenario handling with local cache and automatic synchronization when connection is restored.
- **Performance**: Re-render optimization and memoization usage to ensure fluidity even with multiple connected devices.
- **Security**: Implementation of secure authentication, encryption of sensitive data and access permission validation.

---

#### 🎯 Main Features

- **Login and Registration**: Complete authentication system with validation and password recovery
- **Device Control**: Management of multiple smart plugs with individual and group control
- **Automation**: Lock/unlock rule configuration with conditions and schedules
- **Monitoring**: Status tracking, energy consumption and operation history
- **Notifications**: Real-time alerts for events, status changes and push notifications
- **Profile and Settings**: User profile management and application preferences
      `
    },
    createdAt: new Date("2025-03-03"),
    updatedAt: new Date("2025-03-03")
  },
  {
    id: "web-plug-smart",
    title: {
      pt: "Web Plug Smart",
      en: "Plug Smart Web"
    },
    description: {
      pt: "Dashboard administrativo web para gerenciamento de listagens de travas e plugs inteligentes Tuya, desenvolvido com React.js, TypeScript e Vite.",
      en: "Administrative web dashboard for managing Tuya smart locks and plugs listings, developed with React.js, TypeScript and Vite."
    },
    category: "development",
    images: [
      "/assets/projects/plug-smart-logo.jpg"
    ],
    tags: ["React", "TypeScript", "Vite", "Dashboard", "Tuya IoT", "IoT Management"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/web-plug-smart" }
    ],
    content: {
      pt: `
### 🌐 Web Plug Smart - Dashboard Administrativo

Repositório adaptado para uso público de gerenciamento administrativo de listagens de travas e plugs inteligentes Tuya, desenvolvido com React.js, TypeScript, Vite e outras bibliotecas modernas. Dashboard completo para administração de dispositivos IoT em escala.

---

#### 🏗️ Arquitetura Web

O dashboard foi desenvolvido com foco em performance, escalabilidade e experiência do usuário:

- ⚛️ **React.js + TypeScript**: Framework moderno com tipagem forte, componentes funcionais e hooks customizados para reutilização de lógica.
- ⚡ **Vite**: Build tool de alta performance com Hot Module Replacement (HMR) instantâneo, code splitting automático e otimização de assets.
- 📊 **Dashboard Administrativo**: Interface completa de gerenciamento com tabelas dinâmicas, filtros avançados, paginação e ordenação.
- 🔌 **Integração Tuya**: Controle e monitoramento de dispositivos IoT através de API RESTful com autenticação OAuth e WebSockets para atualizações em tempo real.
- 📱 **Design Responsivo**: Adaptação perfeita para todos os dispositivos com breakpoints otimizados e layout flexível.

---

#### 🛠️ Stack Tecnológica

- **React.js**: Biblioteca principal para construção de interface
- **TypeScript**: Tipagem estática para segurança e produtividade
- **Vite**: Build tool moderno e rápido
- **React Query / SWR**: Gerenciamento de estado do servidor e cache
- **Axios**: Cliente HTTP com interceptores para autenticação
- **React Router**: Roteamento e navegação SPA
- **Chakra UI / Material-UI**: Componentes de UI prontos e customizáveis

---

#### ⚡ Desafios Técnicos e Soluções

- **Gerenciamento de Estado Complexo**: Implementação de estratégias eficientes para gerenciar estado de múltiplos dispositivos, sincronização com servidor e cache inteligente.
- **Performance com Grandes Datasets**: Otimização de renderização com virtualização de listas, paginação server-side e lazy loading de componentes.
- **Tempo Real**: Implementação de WebSockets para atualizações instantâneas de status dos dispositivos sem necessidade de polling constante.
- **Filtragem e Busca Avançada**: Sistema de filtros multi-critério com debounce, busca fuzzy e ordenação dinâmica.

---

#### 🎯 Funcionalidades Principais

- **Gerenciamento de Dispositivos**: CRUD completo de plugs e travas com validação, edição em lote e ações em massa
- **Listagens Dinâmicas**: Visualização e filtragem avançada com múltiplos critérios, busca em tempo real e ordenação customizável
- **Controle em Tempo Real**: Monitoramento de status dos dispositivos com atualizações instantâneas via WebSocket
- **Relatórios e Analytics**: Análise de uso e consumo com gráficos interativos, exportação de dados e dashboards personalizáveis
- **Configurações Avançadas**: Personalização de regras e automações com interface intuitiva e validação em tempo real
- **Gestão de Usuários**: Controle de acesso, permissões e roles para diferentes níveis de administração
      `,
      en: `
### 🌐 Plug Smart Web - Administrative Dashboard

Repository adapted for public use of administrative management of Tuya smart locks and plugs listings, developed with React.js, TypeScript, Vite and other modern libraries. Complete dashboard for IoT device administration at scale.

---

#### 🏗️ Web Architecture

The dashboard was developed with focus on performance, scalability and user experience:

- ⚛️ **React.js + TypeScript**: Modern framework with strong typing, functional components and custom hooks for logic reuse.
- ⚡ **Vite**: High-performance build tool with instant Hot Module Replacement (HMR), automatic code splitting and asset optimization.
- 📊 **Administrative Dashboard**: Complete management interface with dynamic tables, advanced filters, pagination and sorting.
- 🔌 **Tuya Integration**: Control and monitoring of IoT devices through RESTful API with OAuth authentication and WebSockets for real-time updates.
- 📱 **Responsive Design**: Perfect adaptation for all devices with optimized breakpoints and flexible layout.

---

#### 🛠️ Technology Stack

- **React.js**: Main library for interface construction
- **TypeScript**: Static typing for security and productivity
- **Vite**: Modern and fast build tool
- **React Query / SWR**: Server state management and caching
- **Axios**: HTTP client with interceptors for authentication
- **React Router**: SPA routing and navigation
- **Chakra UI / Material-UI**: Ready and customizable UI components

---

#### ⚡ Technical Challenges & Solutions

- **Complex State Management**: Implementation of efficient strategies to manage state of multiple devices, server synchronization and intelligent caching.
- **Performance with Large Datasets**: Rendering optimization with list virtualization, server-side pagination and component lazy loading.
- **Real-time**: WebSocket implementation for instant device status updates without constant polling.
- **Advanced Filtering and Search**: Multi-criteria filter system with debounce, fuzzy search and dynamic sorting.

---

#### 🎯 Main Features

- **Device Management**: Complete CRUD of plugs and locks with validation, batch editing and bulk actions
- **Dynamic Listings**: Advanced visualization and filtering with multiple criteria, real-time search and customizable sorting
- **Real-time Control**: Device status monitoring with instant updates via WebSocket
- **Reports and Analytics**: Usage and consumption analysis with interactive charts, data export and customizable dashboards
- **Advanced Settings**: Rule and automation customization with intuitive interface and real-time validation
- **User Management**: Access control, permissions and roles for different administration levels
      `
    },
    createdAt: new Date("2025-03-03"),
    updatedAt: new Date("2025-03-03")
  },
  {
    id: "api-smart-plug",
    title: {
      pt: "API Smart Plug",
      en: "Smart Plug API"
    },
    description: {
      pt: "Template de projeto real para controle de plugs inteligentes Tuya, desenvolvido como API backend robusta e escalável.",
      en: "Real project template for Tuya smart plug control, developed as a robust and scalable backend API."
    },
    category: "development",
    images: [
      "/assets/projects/plug-smart-logo.jpg"
    ],
    tags: ["Node.js", "TypeScript", "API", "Tuya IoT", "Backend", "REST API"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/api-smart-plug" }
    ],
    content: {
      pt: `
### 🔧 API Smart Plug - Backend Robusto

Template de projeto real desenvolvido para controle de plugs inteligentes Tuya, implementado como API backend completa e escalável. Sistema robusto para gerenciamento de dispositivos IoT em produção.

---

#### 🏗️ Arquitetura Backend

A API foi desenvolvida seguindo princípios de arquitetura limpa e escalabilidade:

- 🚀 **Node.js + TypeScript**: Runtime JavaScript com tipagem estática para desenvolvimento seguro, detecção precoce de erros e melhor manutenibilidade do código.
- 🔌 **Integração Tuya SDK**: Comunicação nativa com dispositivos IoT através do Tuya IoT Cloud SDK, incluindo comandos de controle, monitoramento de status e configurações avançadas.
- 🔐 **Autenticação e Autorização**: Sistema seguro de acesso com JWT tokens, refresh tokens, rate limiting e validação de permissões por endpoint.
- 📊 **Gerenciamento de Estado**: Controle centralizado de dispositivos com cache Redis para alta performance, sincronização em tempo real e persistência em banco de dados.
- ⚡ **Performance**: Otimizado para alta concorrência com connection pooling, processamento assíncrono e otimização de queries.

---

#### 🛠️ Stack Tecnológica

- **Node.js**: Runtime JavaScript assíncrono e não-bloqueante
- **TypeScript**: Tipagem estática e interfaces bem definidas
- **Express / Fastify**: Framework web para construção de APIs RESTful
- **Tuya IoT SDK**: SDK oficial para integração com dispositivos Tuya
- **Redis**: Cache em memória para alta performance
- **PostgreSQL / MongoDB**: Banco de dados para persistência
- **JWT**: Autenticação baseada em tokens
- **Swagger / OpenAPI**: Documentação automática da API

---

#### ⚡ Desafios Técnicos e Soluções

- **Concorrência e Escalabilidade**: Implementação de arquitetura stateless, load balancing e processamento assíncrono para suportar múltiplas requisições simultâneas.
- **Sincronização de Dispositivos**: Sistema de polling inteligente e WebSockets para manter status dos dispositivos atualizado sem sobrecarregar a API Tuya.
- **Tratamento de Erros**: Implementação de error handling centralizado, logging estruturado e retry logic para operações críticas.
- **Segurança**: Validação de entrada, sanitização de dados, rate limiting, CORS configurado e proteção contra ataques comuns (SQL injection, XSS).

---

#### 🎯 Funcionalidades da API

- **Controle de Dispositivos**: Endpoints RESTful para controle de plugs (ligar/desligar, configurações, status)
- **Autenticação**: Sistema completo de tokens JWT, refresh tokens e gerenciamento de sessões
- **Webhooks**: Notificações em tempo real de eventos dos dispositivos para clientes registrados
- **Logs e Monitoramento**: Rastreamento de operações com logging estruturado, métricas de performance e alertas
- **Documentação**: API documentada com Swagger/OpenAPI, exemplos de uso e testes automatizados
- **Cache Inteligente**: Sistema de cache para reduzir chamadas à API Tuya e melhorar performance
- **Rate Limiting**: Controle de taxa de requisições para proteger a API e garantir fair usage
      `,
      en: `
### 🔧 Smart Plug API - Robust Backend

Real project template developed for Tuya smart plug control, implemented as a complete and scalable backend API. Robust system for IoT device management in production.

---

#### 🏗️ Backend Architecture

The API was developed following clean architecture principles and scalability:

- 🚀 **Node.js + TypeScript**: JavaScript runtime with static typing for secure development, early error detection and better code maintainability.
- 🔌 **Tuya SDK Integration**: Native communication with IoT devices through Tuya IoT Cloud SDK, including control commands, status monitoring and advanced settings.
- 🔐 **Authentication and Authorization**: Secure access system with JWT tokens, refresh tokens, rate limiting and endpoint permission validation.
- 📊 **State Management**: Centralized device control with Redis cache for high performance, real-time synchronization and database persistence.
- ⚡ **Performance**: Optimized for high concurrency with connection pooling, asynchronous processing and query optimization.

---

#### 🛠️ Technology Stack

- **Node.js**: Asynchronous and non-blocking JavaScript runtime
- **TypeScript**: Static typing and well-defined interfaces
- **Express / Fastify**: Web framework for building RESTful APIs
- **Tuya IoT SDK**: Official SDK for Tuya device integration
- **Redis**: In-memory cache for high performance
- **PostgreSQL / MongoDB**: Database for persistence
- **JWT**: Token-based authentication
- **Swagger / OpenAPI**: Automatic API documentation

---

#### ⚡ Technical Challenges & Solutions

- **Concurrency and Scalability**: Implementation of stateless architecture, load balancing and asynchronous processing to support multiple simultaneous requests.
- **Device Synchronization**: Intelligent polling system and WebSockets to keep device status updated without overloading the Tuya API.
- **Error Handling**: Implementation of centralized error handling, structured logging and retry logic for critical operations.
- **Security**: Input validation, data sanitization, rate limiting, configured CORS and protection against common attacks (SQL injection, XSS).

---

#### 🎯 API Features

- **Device Control**: RESTful endpoints for plug control (on/off, settings, status)
- **Authentication**: Complete JWT token system, refresh tokens and session management
- **Webhooks**: Real-time notifications of device events for registered clients
- **Logs and Monitoring**: Operation tracking with structured logging, performance metrics and alerts
- **Documentation**: API documented with Swagger/OpenAPI, usage examples and automated tests
- **Intelligent Cache**: Cache system to reduce calls to Tuya API and improve performance
- **Rate Limiting**: Request rate control to protect the API and ensure fair usage
      `
    },
    createdAt: new Date("2025-03-03"),
    updatedAt: new Date("2025-03-03")
  },
  {
    id: "vue-test-metaway",
    title: {
      pt: "Vue Test Metaway",
      en: "Vue Metaway Test"
    },
    description: {
      pt: "Controle de Agenda Pessoal desenvolvido com Vue 3 + TypeScript, Pinia, Vue Router e Cypress para gerenciamento de contatos e usuários com autenticação e controle de acesso.",
      en: "Personal Agenda Control developed with Vue 3 + TypeScript, Pinia, Vue Router and Cypress for contact and user management with authentication and access control."
    },
    category: "development",
    images: [
      "/assets/projects/logo-metaway.png"
    ],
    tags: ["Vue 3", "TypeScript", "Pinia", "Vue Router", "Cypress", "E2E Testing"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/vue-test-metaway" }
    ],
    content: {
      pt: `
### 📅 Vue Test Metaway - Agenda Pessoal

Aplicação web completa desenvolvida com Vue 3 + TypeScript, Pinia, Vue Router e Cypress para gerenciamento de contatos e usuários. Possui autenticação robusta, controle de acesso granular e interface totalmente responsiva.

---

#### 🏗️ Arquitetura Vue 3

O projeto demonstra expertise em desenvolvimento moderno com Vue 3:

- ⚡ **Vue 3 Composition API**: Desenvolvimento moderno com Composition API, setup() function, reactive refs e computed properties para lógica reativa e reutilizável.
- 📘 **TypeScript**: Tipagem estática para maior segurança, interfaces bem definidas, type inference e detecção precoce de erros em tempo de desenvolvimento.
- 🗃️ **Pinia**: Gerenciamento de estado moderno e reativo, stores modulares, devtools integration e persistência de estado quando necessário.
- 🧭 **Vue Router**: Navegação e roteamento avançado com lazy loading de rotas, guards de navegação, meta fields e roteamento dinâmico.
- 🧪 **Cypress**: Testes end-to-end automatizados com cobertura completa de fluxos críticos, testes de integração e validação de UI.

---

#### 🛠️ Stack Tecnológica

- **Vue 3**: Framework progressivo para construção de interfaces
- **TypeScript**: Tipagem estática e interfaces
- **Pinia**: State management moderno para Vue
- **Vue Router**: Roteamento oficial do Vue
- **Cypress**: Framework de testes E2E
- **Vite**: Build tool rápido e moderno
- **Composition API**: API moderna do Vue 3 para organização de código

---

#### ⚡ Desafios Técnicos e Soluções

- **Migração para Composition API**: Refatoração de código legacy para Composition API, organização de lógica em composables reutilizáveis e melhor testabilidade.
- **Gerenciamento de Estado Complexo**: Implementação de stores Pinia modulares, sincronização entre componentes e persistência de estado crítico.
- **Testes E2E**: Configuração de Cypress para testes robustos, mocks de API, testes de autenticação e validação de fluxos completos.
- **Performance**: Otimização de re-renderizações, lazy loading de componentes, code splitting e otimização de bundle size.

---

#### 🎯 Funcionalidades Implementadas

- **Gerenciamento de Contatos**: CRUD completo de contatos com validação, busca, filtros e ordenação
- **Autenticação**: Sistema seguro de login e registro com validação de formulários, recuperação de senha e gerenciamento de sessão
- **Controle de Acesso**: Permissões e roles de usuário com guards de rota, middleware de autenticação e controle de visibilidade de componentes
- **Interface Responsiva**: Design adaptável a todos os dispositivos com breakpoints otimizados e layout flexível
- **Testes Automatizados**: Cobertura completa com Cypress incluindo testes de autenticação, CRUD de contatos e validação de permissões
- **Validação de Formulários**: Validação em tempo real com feedback visual e mensagens de erro claras
      `,
      en: `
### 📅 Vue Test Metaway - Personal Agenda

Complete web application developed with Vue 3 + TypeScript, Pinia, Vue Router and Cypress for contact and user management. Features robust authentication, granular access control and fully responsive interface.

---

#### 🏗️ Vue 3 Architecture

The project demonstrates expertise in modern Vue 3 development:

- ⚡ **Vue 3 Composition API**: Modern development with Composition API, setup() function, reactive refs and computed properties for reactive and reusable logic.
- 📘 **TypeScript**: Static typing for greater security, well-defined interfaces, type inference and early error detection at development time.
- 🗃️ **Pinia**: Modern and reactive state management, modular stores, devtools integration and state persistence when needed.
- 🧭 **Vue Router**: Advanced navigation and routing with lazy route loading, navigation guards, meta fields and dynamic routing.
- 🧪 **Cypress**: Automated end-to-end tests with complete coverage of critical flows, integration tests and UI validation.

---

#### 🛠️ Technology Stack

- **Vue 3**: Progressive framework for building interfaces
- **TypeScript**: Static typing and interfaces
- **Pinia**: Modern state management for Vue
- **Vue Router**: Official Vue routing
- **Cypress**: E2E testing framework
- **Vite**: Fast and modern build tool
- **Composition API**: Modern Vue 3 API for code organization

---

#### ⚡ Technical Challenges & Solutions

- **Migration to Composition API**: Refactoring legacy code to Composition API, organizing logic into reusable composables and better testability.
- **Complex State Management**: Implementation of modular Pinia stores, synchronization between components and persistence of critical state.
- **E2E Tests**: Cypress configuration for robust tests, API mocks, authentication tests and complete flow validation.
- **Performance**: Re-render optimization, component lazy loading, code splitting and bundle size optimization.

---

#### 🎯 Implemented Features

- **Contact Management**: Complete contact CRUD with validation, search, filters and sorting
- **Authentication**: Secure login and registration system with form validation, password recovery and session management
- **Access Control**: User permissions and roles with route guards, authentication middleware and component visibility control
- **Responsive Interface**: Design adaptable to all devices with optimized breakpoints and flexible layout
- **Automated Tests**: Complete coverage with Cypress including authentication tests, contact CRUD and permission validation
- **Form Validation**: Real-time validation with visual feedback and clear error messages
      `
    },
    createdAt: new Date("2025-02-26"),
    updatedAt: new Date("2025-02-26")
  },
  {
    id: "projeto-nlw-node-fastify",
    title: {
      pt: "NLW Node Fastify",
      en: "NLW Node Fastify"
    },
    description: {
      pt: "Projeto desenvolvido para portfólio e estudos do evento NLW da Rocketseat, utilizando Node.js com o microframework Fastify para construção de APIs rápidas e eficientes.",
      en: "Project developed for portfolio and studies from Rocketseat's NLW event, using Node.js with Fastify microframework for building fast and efficient APIs."
    },
    category: "development",
    images: [
      "/assets/projects/nlw-unite.jpg"
    ],
    tags: ["Node.js", "Fastify", "NLW", "Rocketseat", "Backend"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/projeto-nlw-node-fastify" }
    ],
    content: {
      pt: `
### 🚀 NLW Node Fastify - Backend Performance

Projeto desenvolvido para portfólio e estudos do evento NLW (Next Level Week) da Rocketseat, utilizando Node.js com o microframework Fastify para construção de APIs de alta performance. Demonstração de expertise em desenvolvimento backend moderno e eficiente.

---

#### 🏗️ Arquitetura Backend

O projeto foi desenvolvido focando em performance, escalabilidade e boas práticas:

- ⚡ **Fastify**: Microframework ultra-rápido para Node.js, até 2x mais rápido que Express, com suporte nativo a async/await e schema validation integrado.
- 📘 **TypeScript**: Tipagem estática e desenvolvimento seguro com interfaces bem definidas, type inference e detecção precoce de erros.
- 🔌 **Plugins Fastify**: Extensibilidade através de plugins modulares, encapsulamento de funcionalidades e reutilização de código.
- 📊 **Validação**: Schema validation integrado com JSON Schema, validação automática de request/response e mensagens de erro claras.
- ⚡ **Performance**: Otimizado para baixa latência com processamento assíncrono, connection pooling e otimização de rotas.

---

#### 🛠️ Stack Tecnológica

- **Node.js**: Runtime JavaScript assíncrono e não-bloqueante
- **Fastify**: Microframework web de alta performance
- **TypeScript**: Tipagem estática e interfaces
- **JSON Schema**: Validação de dados com schemas
- **Prisma / TypeORM**: ORM para gerenciamento de banco de dados
- **JWT**: Autenticação baseada em tokens
- **Swagger**: Documentação automática da API

---

#### ⚡ Desafios Técnicos e Soluções

- **Performance vs Express**: Comparação e otimização para demonstrar vantagens do Fastify em termos de throughput e latência.
- **Validação de Schemas**: Implementação de validação robusta com JSON Schema para garantir integridade dos dados.
- **Arquitetura de Plugins**: Organização modular com plugins Fastify para separação de responsabilidades e reutilização.
- **TypeScript Integration**: Configuração adequada do TypeScript com Fastify para type safety completo em rotas e handlers.

---

#### 🎯 Funcionalidades Implementadas

- **API RESTful**: Endpoints bem estruturados e documentados seguindo padrões REST
- **Validação de Dados**: Schemas de validação automática para request e response com mensagens de erro descritivas
- **Plugins Modulares**: Arquitetura extensível com plugins para autenticação, CORS, rate limiting e outros
- **Performance**: Alta velocidade de resposta com otimizações específicas do Fastify
- **Boas Práticas**: Código limpo e manutenível seguindo princípios SOLID e clean code
- **Documentação**: API documentada com Swagger/OpenAPI para fácil integração
- **Tratamento de Erros**: Error handling centralizado com respostas padronizadas
      `,
      en: `
### 🚀 NLW Node Fastify - Backend Performance

Project developed for portfolio and studies from Rocketseat's NLW (Next Level Week) event, using Node.js with Fastify microframework for building high-performance APIs. Demonstration of expertise in modern and efficient backend development.

---

#### 🏗️ Backend Architecture

The project was developed focusing on performance, scalability and best practices:

- ⚡ **Fastify**: Ultra-fast microframework for Node.js, up to 2x faster than Express, with native async/await support and integrated schema validation.
- 📘 **TypeScript**: Static typing and secure development with well-defined interfaces, type inference and early error detection.
- 🔌 **Fastify Plugins**: Extensibility through modular plugins, functionality encapsulation and code reuse.
- 📊 **Validation**: Integrated schema validation with JSON Schema, automatic request/response validation and clear error messages.
- ⚡ **Performance**: Optimized for low latency with asynchronous processing, connection pooling and route optimization.

---

#### 🛠️ Technology Stack

- **Node.js**: Asynchronous and non-blocking JavaScript runtime
- **Fastify**: High-performance web microframework
- **TypeScript**: Static typing and interfaces
- **JSON Schema**: Data validation with schemas
- **Prisma / TypeORM**: ORM for database management
- **JWT**: Token-based authentication
- **Swagger**: Automatic API documentation

---

#### ⚡ Technical Challenges & Solutions

- **Performance vs Express**: Comparison and optimization to demonstrate Fastify advantages in terms of throughput and latency.
- **Schema Validation**: Implementation of robust validation with JSON Schema to ensure data integrity.
- **Plugin Architecture**: Modular organization with Fastify plugins for separation of concerns and reuse.
- **TypeScript Integration**: Proper TypeScript configuration with Fastify for complete type safety in routes and handlers.

---

#### 🎯 Implemented Features

- **RESTful API**: Well-structured and documented endpoints following REST standards
- **Data Validation**: Automatic validation schemas for request and response with descriptive error messages
- **Modular Plugins**: Extensible architecture with plugins for authentication, CORS, rate limiting and others
- **Performance**: High response speed with Fastify-specific optimizations
- **Best Practices**: Clean and maintainable code following SOLID principles and clean code
- **Documentation**: API documented with Swagger/OpenAPI for easy integration
- **Error Handling**: Centralized error handling with standardized responses
      `
    },
    createdAt: new Date("2024-04-07"),
    updatedAt: new Date("2024-04-07")
  },
  {
    id: "teste-frontend-target",
    title: {
      pt: "Teste Frontend Target",
      en: "Target Frontend Test"
    },
    description: {
      pt: "Repositório de resolução de testes técnicos, com resoluções lógicas simples e de frontend com React.js, demonstrando habilidades em algoritmos e desenvolvimento web.",
      en: "Repository of technical test solutions, with simple logical and frontend solutions with React.js, demonstrating skills in algorithms and web development."
    },
    category: "development",
    images: [
      "/assets/projects/target-logo.jpg"
    ],
    tags: ["React", "JavaScript", "Algorithms", "Technical Test", "Data Structures"],
    links: [
      { texto: "GitHub", url: "https://github.com/rogeriojr/teste-frontend-target" }
    ],
    content: {
      pt: `
### 🎯 Teste Frontend Target - Desafios Técnicos

Repositório dedicado à resolução de testes técnicos, combinando soluções lógicas simples com implementações frontend em React.js. Demonstração de habilidades em algoritmos, estruturas de dados e desenvolvimento web moderno.

---

#### 🏗️ Abordagem Técnica

O repositório apresenta soluções para diversos desafios técnicos com foco em qualidade e performance:

- 🧠 **Lógica e Algoritmos**: Resolução de problemas complexos utilizando estruturas de dados eficientes, algoritmos otimizados e análise de complexidade temporal e espacial.
- ⚛️ **React.js**: Implementações frontend modernas com componentes funcionais, hooks customizados, gerenciamento de estado e otimizações de performance.
- 📊 **Estruturas de Dados**: Uso eficiente de arrays, objetos, Map, Set e outras estruturas para resolver problemas de forma otimizada.
- 🔄 **Otimização**: Soluções performáticas e escaláveis com foco em Big O notation, memoização e técnicas de otimização.
- 📝 **Código Limpo**: Boas práticas e padrões de desenvolvimento incluindo SOLID, DRY, clean code e documentação clara.

---

#### 🛠️ Stack Tecnológica

- **React.js**: Biblioteca para construção de interfaces
- **JavaScript/TypeScript**: Linguagem principal com tipagem quando necessário
- **Algoritmos**: Implementação de algoritmos clássicos e modernos
- **Estruturas de Dados**: Arrays, objetos, Map, Set, árvores, grafos
- **Testes**: Validação de soluções com testes unitários
- **Documentação**: Explicações detalhadas e comentários no código

---

#### ⚡ Desafios Técnicos e Soluções

- **Complexidade Algorítmica**: Análise e otimização de algoritmos para reduzir complexidade temporal e espacial.
- **Estruturas de Dados**: Escolha adequada de estruturas de dados para cada problema específico.
- **Performance Frontend**: Otimização de renderizações, memoização de componentes e lazy loading.
- **Testabilidade**: Implementação de código testável com funções puras e separação de lógica.

---

#### 🎯 Conteúdo do Repositório

- **Desafios Lógicos**: Resolução de problemas algorítmicos com explicações detalhadas e análise de complexidade
- **Componentes React**: Implementações de UI reutilizáveis com hooks customizados e otimizações
- **Testes**: Validação de soluções com testes unitários e de integração
- **Documentação**: Explicações detalhadas das soluções, abordagens utilizadas e trade-offs considerados
- **Exemplos Práticos**: Casos de uso reais e implementações funcionais
- **Boas Práticas**: Demonstração de padrões de código, organização e manutenibilidade
      `,
      en: `
### 🎯 Target Frontend Test - Technical Challenges

Repository dedicated to solving technical tests, combining simple logical solutions with React.js frontend implementations. Demonstration of skills in algorithms, data structures and modern web development.

---

#### 🏗️ Technical Approach

The repository presents solutions for various technical challenges with focus on quality and performance:

- 🧠 **Logic and Algorithms**: Solving complex problems using efficient data structures, optimized algorithms and temporal/spatial complexity analysis.
- ⚛️ **React.js**: Modern frontend implementations with functional components, custom hooks, state management and performance optimizations.
- 📊 **Data Structures**: Efficient use of arrays, objects, Map, Set and other structures to solve problems in an optimized way.
- 🔄 **Optimization**: Performant and scalable solutions with focus on Big O notation, memoization and optimization techniques.
- 📝 **Clean Code**: Best practices and development patterns including SOLID, DRY, clean code and clear documentation.

---

#### 🛠️ Technology Stack

- **React.js**: Library for building interfaces
- **JavaScript/TypeScript**: Main language with typing when needed
- **Algorithms**: Implementation of classic and modern algorithms
- **Data Structures**: Arrays, objects, Map, Set, trees, graphs
- **Tests**: Solution validation with unit tests
- **Documentation**: Detailed explanations and code comments

---

#### ⚡ Technical Challenges & Solutions

- **Algorithmic Complexity**: Analysis and optimization of algorithms to reduce temporal and spatial complexity.
- **Data Structures**: Adequate choice of data structures for each specific problem.
- **Frontend Performance**: Optimization of renderings, component memoization and lazy loading.
- **Testability**: Implementation of testable code with pure functions and logic separation.

---

#### 🎯 Repository Content

- **Logical Challenges**: Algorithmic problem solving with detailed explanations and complexity analysis
- **React Components**: Reusable UI implementations with custom hooks and optimizations
- **Tests**: Solution validation with unit and integration tests
- **Documentation**: Detailed solution explanations, approaches used and trade-offs considered
- **Practical Examples**: Real use cases and functional implementations
- **Best Practices**: Demonstration of code patterns, organization and maintainability
      `
    },
    createdAt: new Date("2025-03-11"),
    updatedAt: new Date("2025-03-11")
  }
  ,
  {
    id: "video-youtube-downloader",
    title: {
      pt: "Video Youtube Downloader",
      en: "Video Youtube Downloader"
    },
    description: {
      pt: "Script Node.js para download de vídeos do YouTube em alta qualidade com suporte a múltiplos links e processamento automático.",
      en: "Node.js script for downloading YouTube videos in high quality with support for multiple links and automatic processing."
    },
    category: "development",

    images: ["/assets/projects/yt-download.png"],
    tags: ["Node.js", "JavaScript", "yt-dlp", "FFmpeg", "Video Processing"],
    links: [{ "texto": "GitHub", "url": "https://github.com/rogeriojr/video-youtube-downloader" }],
    content: {
      pt: `
### 🎬 YouTube Video Downloader

Script Node.js completo para download de vídeos do YouTube na melhor qualidade disponível, com áudio e vídeo combinados automaticamente em um único arquivo.

---

#### 🏗️ Sobre o Projeto

Este projeto demonstra integração de ferramentas externas (yt-dlp e FFmpeg) com Node.js para criar uma solução robusta de download de vídeos. O script suporta múltiplos links simultâneos e processamento automático.

**Funcionalidades principais:**
- ✅ Download de vídeos em qualidade máxima disponível
- ✅ Suporte a múltiplos links separados por vírgula
- ✅ Combinação automática de áudio e vídeo com FFmpeg
- ✅ Salvamento com títulos originais dos vídeos
- ✅ Interface de linha de comando interativa

#### 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **yt-dlp**: Ferramenta moderna para download de vídeos do YouTube
- **FFmpeg**: Processamento e combinação de áudio e vídeo
- **readline-sync**: Interface interativa de linha de comando

#### 📋 Recursos Técnicos

- Processamento assíncrono de múltiplos downloads
- Validação de links e tratamento de erros
- Integração com ferramentas de sistema (yt-dlp, FFmpeg)
- Gerenciamento de arquivos e diretórios

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/video-youtube-downloader)
      `,
      en: `
### 🎬 YouTube Video Downloader

Complete Node.js script for downloading YouTube videos in the best available quality, with audio and video automatically combined into a single file.

---

#### 🏗️ About the Project

This project demonstrates integration of external tools (yt-dlp and FFmpeg) with Node.js to create a robust video downloading solution. The script supports multiple simultaneous links and automatic processing.

**Main features:**
- ✅ Download videos in maximum available quality
- ✅ Support for multiple links separated by comma
- ✅ Automatic audio and video combination with FFmpeg
- ✅ Saving with original video titles
- ✅ Interactive command line interface

#### 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **yt-dlp**: Modern tool for downloading YouTube videos
- **FFmpeg**: Audio and video processing and combination
- **readline-sync**: Interactive command line interface

#### 📋 Technical Features

- Asynchronous processing of multiple downloads
- Link validation and error handling
- Integration with system tools (yt-dlp, FFmpeg)
- File and directory management

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/video-youtube-downloader)
      `
    },
    createdAt: new Date("2025-02-18"),
    updatedAt: new Date("2025-02-21")
  },
  {
    id: "pass-qrcode-nodejs",
    title: {
      pt: "Pass Qrcode Nodejs",
      en: "Pass Qrcode Nodejs"
    },
    description: {
      pt: "Sistema de gestão de participantes em eventos presenciais com check-in via QR Code, desenvolvido com Node.js e Fastify.",
      en: "In-person event participant management system with QR Code check-in, developed with Node.js and Fastify."
    },
    category: "development",

    images: ["/assets/projects/qr-code-pass.png"],
    tags: ["Node.js", "Fastify", "TypeScript", "QR Code", "Event Management", "EJS"],
    links: [{ "texto": "GitHub", "url": "https://github.com/rogeriojr/pass-qrcode-nodejs" }],
    content: {
      pt: `
### 🎫 Pass.in - Gestão de Eventos com QR Code

Sistema completo de gestão de participantes em eventos presenciais, desenvolvido durante o NLW da Rocketseat. Permite cadastro de eventos, inscrição de participantes e check-in via QR Code.

---

#### 🏗️ Sobre o Projeto

O pass.in é uma aplicação robusta para gestão de eventos presenciais, permitindo que organizadores cadastrem eventos e participantes realizem check-in através de credenciais com QR Code.

**Funcionalidades principais:**
- ✅ Cadastro e gerenciamento de eventos
- ✅ Sistema de inscrição pública para participantes
- ✅ Geração automática de credenciais com QR Code
- ✅ Check-in rápido via leitura de QR Code
- ✅ Dashboard para organizadores visualizarem dados do evento
- ✅ Prevenção de inscrições duplicadas

#### 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Fastify**: Framework web rápido e eficiente
- **TypeScript**: Tipagem estática para maior segurança
- **EJS**: Template engine para renderização de páginas
- **SQLite**: Banco de dados leve e eficiente
- **QR Code**: Geração de códigos QR para credenciais

#### 📋 Arquitetura

- **Backend**: API RESTful com Fastify
- **Frontend**: Páginas renderizadas com EJS
- **Database**: SQLite para persistência de dados
- **QR Code**: Integração para geração de credenciais

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/pass-qrcode-nodejs)
      `,
      en: `
### 🎫 Pass.in - Event Management with QR Code

Complete in-person event participant management system, developed during Rocketseat's NLW. Allows event registration, participant enrollment and QR Code check-in.

---

#### 🏗️ About the Project

Pass.in is a robust application for managing in-person events, allowing organizers to register events and participants to check in through QR Code credentials.

**Main features:**
- ✅ Event registration and management
- ✅ Public enrollment system for participants
- ✅ Automatic credential generation with QR Code
- ✅ Fast check-in via QR Code reading
- ✅ Dashboard for organizers to view event data
- ✅ Prevention of duplicate enrollments

#### 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **Fastify**: Fast and efficient web framework
- **TypeScript**: Static typing for greater security
- **EJS**: Template engine for page rendering
- **SQLite**: Lightweight and efficient database
- **QR Code**: QR code generation for credentials

#### 📋 Architecture

- **Backend**: RESTful API with Fastify
- **Frontend**: Pages rendered with EJS
- **Database**: SQLite for data persistence
- **QR Code**: Integration for credential generation

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/pass-qrcode-nodejs)
      `
    },
    createdAt: new Date("2024-04-02"),
    updatedAt: new Date("2025-01-13")
  },
  {
    id: "polo-agreste-admin",
    title: {
      pt: "Polo Agreste Admin",
      en: "Polo Agreste Admin"
    },
    description: {
      pt: "Painel administrativo da plataforma de marketplace, PoloAgreste",
      en: "Painel administrativo da plataforma de marketplace, PoloAgreste"
    },
    category: "development",

    images: ["/assets/projects/polo-agreste-logo.png"],
    tags: ["JavaScript"],
    links: [{ "texto": "GitHub", "url": "https://github.com/rogeriojr/polo-agreste-admin" }],
    content: {
      pt: `
### 🚀 Polo Agreste Admin

Painel administrativo da plataforma de marketplace, PoloAgreste

---

#### 🏗️ Sobre o Projeto

Projeto desenvolvido para demonstração de habilidades técnicas e boas práticas de desenvolvimento.

#### 🛠️ Tecnologias Utilizadas

- **JavaScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/polo-agreste-admin)

      `,
      en: `
### 🚀 Polo Agreste Admin

Painel administrativo da plataforma de marketplace, PoloAgreste

---

#### 🏗️ About the Project

Project developed to demonstrate technical skills and development best practices.

#### 🛠️ Technologies Used

- **JavaScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/polo-agreste-admin)

      `
    },
    createdAt: new Date("2020-02-06"),
    updatedAt: new Date("2025-01-13")
  },
  {
    id: "core-frontend",
    title: {
      pt: "Core Frontend",
      en: "Core Frontend"
    },
    description: {
      pt: "Projeto Next.js desenvolvido para demonstração de habilidades técnicas e boas práticas de desenvolvimento.",
      en: "Next.js project developed to demonstrate technical skills and development best practices."
    },
    category: "development",

    images: ["/assets/projects/core-frontend-logo.png"],
    tags: ["Next.js", "SSR", "SSG", "TypeScript", "Frontend"],
    links: [{ "texto": "GitHub", "url": "https://github.com/rogeriojr/core-frontend" }],
    content: {
      pt: `
### 🚀 Core Frontend

Projeto Next.js desenvolvido para demonstração de habilidades técnicas e boas práticas de desenvolvimento.

---

#### 🏗️ Sobre o Projeto

Projeto desenvolvido com Next.js e TypeScript para demonstração de habilidades técnicas. Aplicação moderna com suporte a SSR (Server-Side Rendering) e SSG (Static Site Generation).

**Funcionalidades principais:**
- ✅ Framework Next.js para desenvolvimento web moderno
- ✅ TypeScript para tipagem estática e maior segurança
- ✅ Estrutura modular e escalável
- ✅ Otimizações de performance

#### 🛠️ Tecnologias Utilizadas

- **TypeScript**
- **JavaScript**
- **Next.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/core-frontend)

      `,
      en: `
### 🚀 Core Frontend

Next.js project developed to demonstrate technical skills and development best practices.

---

#### 🏗️ About the Project

Project developed with Next.js and TypeScript to demonstrate technical skills. Modern application with support for SSR (Server-Side Rendering) and SSG (Static Site Generation).

**Main features:**
- ✅ Next.js framework for modern web development
- ✅ TypeScript for static typing and greater security
- ✅ Modular and scalable structure
- ✅ Performance optimizations

#### 🛠️ Technologies Used

- **TypeScript**
- **JavaScript**
- **Next.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/core-frontend)

      `
    },
    createdAt: new Date("2024-09-09"),
    updatedAt: new Date("2025-01-13"),
    featured: false
  },
  {
    id: "partners",
    title: {
      pt: "Partners",
      en: "Partners"
    },
    description: {
      pt: "Projeto Next.js desenvolvido para gestão de parceiros e integrações empresariais.",
      en: "Next.js project developed for partner management and business integrations."
    },
    category: "development",
    images: ["/assets/projects/pattern-logo.webp"],
    tags: ["Next.js", "Business Management", "CRUD", "TypeScript", "API Integration"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/partners" }],
    content: {
      pt: `
### 🚀 Partners

Projeto Next.js desenvolvido para gestão de parceiros e integrações empresariais.

---

#### 🏗️ Sobre o Projeto

Aplicação web desenvolvida com Next.js e TypeScript para gerenciamento de parceiros e relacionamentos empresariais. Sistema moderno com interface responsiva e funcionalidades de gestão.

**Funcionalidades principais:**
- ✅ Gestão de parceiros e relacionamentos
- ✅ Interface moderna e responsiva
- ✅ Integração com APIs e serviços
- ✅ Otimizações de performance

#### 🛠️ Tecnologias Utilizadas

- **TypeScript**
- **JavaScript**
- **Next.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/partners)

      `,
      en: `
### 🚀 Partners

Next.js project developed for partner management and business integrations.

---

#### 🏗️ About the Project

Web application developed with Next.js and TypeScript for partner management and business relationships. Modern system with responsive interface and management features.

**Main features:**
- ✅ Partner and relationship management
- ✅ Modern and responsive interface
- ✅ Integration with APIs and services
- ✅ Performance optimizations

#### 🛠️ Technologies Used

- **TypeScript**
- **JavaScript**
- **Next.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/partners)

      `
    },
    createdAt: new Date("2024-09-09"),
    updatedAt: new Date("2025-01-13"),
    featured: false
  },
  {
    id: "teste-desenvolvedor-jr-pl-1",
    title: {
      pt: "Teste Desenvolvedor Jr PL",
      en: "Junior Developer Test PL"
    },
    description: {
      pt: "API Node.js com TypeScript e Express que integra serviço Python com LangChain para geração de resumos e tradução de textos.",
      en: "Node.js API with TypeScript and Express that integrates Python service with LangChain for text summarization and translation."
    },
    category: "development",
    images: ["/assets/projects/dynadok.webp"],
    tags: ["AI", "LangChain", "NLP", "Node.js", "Python", "API", "TypeScript", "Express"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/teste_desenvolvedor_jr_pl-1" }],
    content: {
      pt: `
### 🤖 LLM Summarizer API

API Node.js desenvolvida com TypeScript e Express que integra um serviço Python utilizando LangChain para processamento de linguagem natural, permitindo resumir e traduzir textos automaticamente.

---

#### 🏗️ Sobre o Projeto

Este projeto demonstra integração entre Node.js e Python para criar uma solução completa de processamento de linguagem natural. A API recebe textos, processa através de um serviço Python com LangChain e retorna resumos traduzidos.

**Funcionalidades principais:**
- ✅ Submissão de textos para processamento
- ✅ Geração automática de resumos com LangChain
- ✅ Tradução de textos conforme idioma solicitado
- ✅ Armazenamento de textos originais e resumidos
- ✅ API RESTful completa com TypeScript

#### 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **TypeScript**: Tipagem estática
- **Express**: Framework web para Node.js
- **Python**: Serviço de processamento de linguagem natural
- **LangChain**: Framework para aplicações com LLMs
- **Docker**: Containerização para serviços

#### 📋 Arquitetura

- **node-api/**: API Node.js com Express e TypeScript
- **python-llm/**: Serviço Python com LangChain
- **Repositories**: Gerenciamento de tarefas em memória
- **Routes**: Rotas RESTful para submissão e consulta

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/teste_desenvolvedor_jr_pl-1)
      `,
      en: `
### 🤖 LLM Summarizer API

Node.js API developed with TypeScript and Express that integrates a Python service using LangChain for natural language processing, allowing automatic text summarization and translation.

---

#### 🏗️ About the Project

This project demonstrates integration between Node.js and Python to create a complete natural language processing solution. The API receives texts, processes them through a Python service with LangChain and returns translated summaries.

**Main features:**
- ✅ Text submission for processing
- ✅ Automatic summary generation with LangChain
- ✅ Text translation according to requested language
- ✅ Storage of original and summarized texts
- ✅ Complete RESTful API with TypeScript

#### 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **TypeScript**: Static typing
- **Express**: Web framework for Node.js
- **Python**: Natural language processing service
- **LangChain**: Framework for LLM applications
- **Docker**: Containerization for services

#### 📋 Architecture

- **node-api/**: Node.js API with Express and TypeScript
- **python-llm/**: Python service with LangChain
- **Repositories**: In-memory task management
- **Routes**: RESTful routes for submission and query

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/teste_desenvolvedor_jr_pl-1)
      `
    },
    createdAt: new Date("2025-01-07"),
    updatedAt: new Date("2025-01-08"),
    featured: true
  },
  {
    id: "micro-frontends-teddy-test-project",
    title: {
      pt: "Micro Frontends Teddy Test Project",
      en: "Micro Frontends Teddy Test Project"
    },
    description: {
      pt: "Aplicação de micro front-ends com Next.js e TypeScript, integrando microserviços para parceiros e empresas externas com CRUD completo.",
      en: "Micro front-ends application with Next.js and TypeScript, integrating microservices for partners and external companies with complete CRUD."
    },
    category: "development",
    images: ["/assets/projects/teddy.webp"],
    tags: ["Micro Frontends", "Next.js", "Architecture", "CRUD", "Authentication", "TypeScript"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/micro-frontends-teddy-test-project" }],
    content: {
      pt: `
### 🚀 Micro Frontends Teddy Test Project

Repositório dedicado a demonstrar expertisies de desenvolvimento React js + Next JS + Typescript, utilizando de metodologia de microfrontends, e implementações básicas de Login, CRUD, estados e Storag

---

#### 🏗️ Sobre o Projeto

Este projeto é uma aplicação de micro front-ends utilizando **Next.js** com **TypeScript**, integrando microserviços para **parceiros** e **empresas externas**. Ele possui funcionalidades de **CRUD** para ambas as entidades, além de autenticação com uma página de login funcional.
   - Página de login com opção de "Manter conectado" utilizando **cookies** ou **localStorage**.
   - Redireciona o usuário para a página inicial após o login.
   - Se o usuário já estiver logado (nome no cookie/localStorage), ele será automaticamente redirecionado para a página inicial.
   - Listagem de todos os parceiros integrados.
   - Funções de **adicionar**, **editar** e **excluir** parceiros.
   - Paginação na tabela de parceiros.
3. **Empresas Externas**:
   - Listagem de todas as empresas externa...

#### 🛠️ Tecnologias Utilizadas

- **React**
- **TypeScript**
- **JavaScript**
- **Next.js**
- **Node.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/micro-frontends-teddy-test-project)

      `,
      en: `
### 🚀 Micro Frontends Teddy Test Project

Repositório dedicado a demonstrar expertisies de desenvolvimento React js + Next JS + Typescript, utilizando de metodologia de microfrontends, e implementações básicas de Login, CRUD, estados e Storag

---

#### 🏗️ About the Project

Este projeto é uma aplicação de micro front-ends utilizando **Next.js** com **TypeScript**, integrando microserviços para **parceiros** e **empresas externas**. Ele possui funcionalidades de **CRUD** para ambas as entidades, além de autenticação com uma página de login funcional.
   - Página de login com opção de "Manter conectado" utilizando **cookies** ou **localStorage**.
   - Redireciona o usuário para a página inicial após o login.
   - Se o usuário já estiver logado (nome no cookie/localStorage), ele será automaticamente redirecionado para a página inicial.
   - Listagem de todos os parceiros integrados.
   - Funções de **adicionar**, **editar** e **excluir** parceiros.
   - Paginação na tabela de parceiros.
3. **Empresas Externas**:
   - Listagem de todas as empresas externa...

#### 🛠️ Technologies Used

- **React**
- **TypeScript**
- **JavaScript**
- **Next.js**
- **Node.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/micro-frontends-teddy-test-project)

      `
    },
    createdAt: new Date("2024-09-09"),
    updatedAt: new Date("2024-09-09"),
    featured: true
  },
  {
    id: "nlw-unite-react-native-learning",
    title: {
      pt: "NLW Unite React Native Learning",
      en: "NLW Unite React Native Learning"
    },
    description: {
      pt: "Repositório de estudos para aprimorar habilidades com React Native, desenvolvido durante o NLW Unite da Rocketseat.",
      en: "Study repository to improve React Native skills, developed during Rocketseat's NLW Unite."
    },
    category: "development",
    images: ["/assets/projects/nlw-unite.jpg"],
    tags: ["React Native", "Mobile Development", "Expo", "Learning", "TypeScript"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/nlw-unite-react-native-learning" }],
    content: {
      pt: `
### 🚀 Nlw Unite React Native Learning

Repositório de estudos para aprimorar mais com a linguagem React Native

---

#### 🏗️ Sobre o Projeto

Repositório de estudos desenvolvido durante o NLW Unite da Rocketseat para aprimorar habilidades com React Native. Projeto focado em aprendizado prático de desenvolvimento mobile.

**Funcionalidades principais:**
- ✅ Criação de aplicativos React Native sem configuração de build
- ✅ Suporte para unimodules e auto-linking
- ✅ Atualizações OTA e gestos prontos para uso
- ✅ Suporte completo para React Native web
- ✅ TypeScript por padrão
- ✅ Compatível com Expo Client app

#### 🛠️ Tecnologias Utilizadas

- **TypeScript**
- **React**
- **JavaScript**
- **React Native**
- **Expo**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/nlw-unite-react-native-learning)

      `,
      en: `
### 🚀 Nlw Unite React Native Learning

Repositório de estudos para aprimorar mais com a linguagem React Native

---

#### 🏗️ About the Project

Study repository developed during Rocketseat's NLW Unite to improve React Native skills. Project focused on practical learning of mobile development.

**Main features:**
- ✅ Create React Native apps without build configuration
- ✅ Support for unimodules and auto-linking
- ✅ OTA updates and gestures out of the box
- ✅ Full support for React Native web
- ✅ TypeScript by default
- ✅ Works with Expo Client app

#### 🛠️ Technologies Used

- **TypeScript**
- **React**
- **JavaScript**
- **React Native**
- **Expo**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/nlw-unite-react-native-learning)

      `
    },
    createdAt: new Date("2024-04-04"),
    updatedAt: new Date("2024-04-04"),
    featured: false
  },
  {
    id: "nlw-unite-react-learning",
    title: {
      pt: "NLW Unite React Learning",
      en: "NLW Unite React Learning"
    },
    description: {
      pt: "Repositório de estudos para aprimorar habilidades com React, desenvolvido durante o NLW Unite da Rocketseat.",
      en: "Study repository to improve React skills, developed during Rocketseat's NLW Unite."
    },
    category: "development",
    images: ["/assets/projects/nlw-unite.jpg"],
    tags: ["React", "Learning", "Frontend", "TypeScript"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/nlw-unite-react-learning" }],
    content: {
      pt: `
### 🚀 Nlw Unite React Learning

Repositório de estudos para aprimorar habilidades com React, desenvolvido durante o NLW Unite da Rocketseat.

---

#### 🏗️ Sobre o Projeto

Projeto desenvolvido com React para aprendizado e prática de conceitos fundamentais. Aplicação moderna com suporte a desenvolvimento e produção.

**Funcionalidades principais:**
- ✅ Desenvolvimento com hot reload
- ✅ Testes automatizados
- ✅ Build otimizado para produção
- ✅ TypeScript para tipagem estática

#### 🛠️ Tecnologias Utilizadas

- **TypeScript**
- **React**
- **JavaScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/nlw-unite-react-learning)

      `,
      en: `
### 🚀 NLW Unite React Learning

Study repository to improve React skills, developed during Rocketseat's NLW Unite.

---

#### 🏗️ About the Project

Project developed with React for learning and practicing fundamental concepts. Modern application with support for development and production.

**Main features:**
- ✅ Development with hot reload
- ✅ Automated tests
- ✅ Optimized production build
- ✅ TypeScript for static typing

#### 🛠️ Technologies Used

- **TypeScript**
- **React**
- **JavaScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/nlw-unite-react-learning)

      `
    },
    createdAt: new Date("2024-04-04"),
    updatedAt: new Date("2024-04-04"),
    featured: false
  },
  {
    id: "modelo-login",
    title: {
      pt: "Modelo Login",
      en: "Login Template"
    },
    description: {
      pt: "Componente de autenticação reutilizável desenvolvido em React com validação de formulários e gerenciamento de estado.",
      en: "Reusable authentication component developed in React with form validation and state management."
    },
    category: "development",
    images: ["/assets/projects/login-logo.webp"],
    tags: ["React", "Authentication", "Component", "Form Validation", "TypeScript"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/modelo-login" }],
    content: {
      pt: `
### 🚀 Modelo Login

Modelo de login em React

---

#### 🏗️ Sobre o Projeto

This project was bootstrapped with Create React App.
In the project directory, you can run:
Runs the app in the development mode.<br>
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.
Launches the test runner in the interactive watch mode.<br>
See the section about running tests for more information.
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about deployment for more information.
**Note: this is a one-way operation. Once you eject, you can’t go back!**
If you aren’t sati...

#### 🛠️ Tecnologias Utilizadas

- **JavaScript**
- **React**
- **TypeScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/modelo-login)

      `,
      en: `
### 🚀 Modelo Login

Modelo de login em React

---

#### 🏗️ About the Project

This project was bootstrapped with Create React App.
In the project directory, you can run:
Runs the app in the development mode.<br>
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.
Launches the test runner in the interactive watch mode.<br>
See the section about running tests for more information.
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about deployment for more information.
**Note: this is a one-way operation. Once you eject, you can’t go back!**
If you aren’t sati...

#### 🛠️ Technologies Used

- **JavaScript**
- **React**
- **TypeScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/modelo-login)

      `
    },
    createdAt: new Date("2019-07-11"),
    updatedAt: new Date("2024-04-01"),
    featured: false
  },
  {
    id: "guia-de-perguntas-express-ejs",
    title: {
      pt: "Guia de Perguntas Express EJS",
      en: "Questions Guide Express EJS"
    },
    description: {
      pt: "Aplicação web desenvolvida com Node.js e Express utilizando EJS como view engine para criação de guia de perguntas interativo.",
      en: "Web application developed with Node.js and Express using EJS as view engine for creating an interactive questions guide."
    },
    category: "development",
    images: ["/assets/projects/express-logo.png"],
    tags: ["Backend", "Express", "EJS", "Node.js", "Server-Side Rendering"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/guia-de-perguntas-express-ejs" }],
    content: {
      pt: `
### 🚀 Guia de Perguntas Express EJS

Este é um projeto de iniciação de backend desenvolvido com Node.js e Express setando EJS como view engine

---

#### 🏗️ Sobre o Projeto

Este é um projeto de iniciação de backend desenvolvido com Node.js e Express. O projeto foi criado como parte do meu trabalho para portfólio, visando aprender e praticar conceitos fundamentais de desenvolvimento de backend com Node.js. É um guia de perguntas, nele contem código html e bibliotecas para o Frontend, mas onde
o foco foi meu desenvolvimento backend, utilizando  EJS como view engine no Express
- Implementação de rotas básicas para aprendizado.
- Tratamento de requisições HTTP com Express.
- Manipulação de parâmetros de URL.
- Tratamento de erros.
O projeto segue a seguinte estrutura:
├── index.js As views EJS
  ├── index.js Arquivo principal do EJS
├── index.js Arquivo principal do servidor
├── package.json Arquivo de manifesto do projeto
└── README.md Este arquivo RE...

#### 🛠️ Tecnologias Utilizadas

- **EJS**
- **JavaScript**
- **Node.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/guia-de-perguntas-express-ejs)

      `,
      en: `
### 🚀 Guia De Perguntas Express Ejs

Este é um projeto de iniciação de backend desenvolvido com Node.js e Express setando EJS como view engine

---

#### 🏗️ About the Project

Este é um projeto de iniciação de backend desenvolvido com Node.js e Express. O projeto foi criado como parte do meu trabalho para portfólio, visando aprender e praticar conceitos fundamentais de desenvolvimento de backend com Node.js. É um guia de perguntas, nele contem código html e bibliotecas para o Frontend, mas onde
o foco foi meu desenvolvimento backend, utilizando  EJS como view engine no Express
- Implementação de rotas básicas para aprendizado.
- Tratamento de requisições HTTP com Express.
- Manipulação de parâmetros de URL.
- Tratamento de erros.
O projeto segue a seguinte estrutura:
├── index.js As views EJS
  ├── index.js Arquivo principal do EJS
├── index.js Arquivo principal do servidor
├── package.json Arquivo de manifesto do projeto
└── README.md Este arquivo RE...

#### 🛠️ Technologies Used

- **EJS**
- **JavaScript**
- **Node.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/guia-de-perguntas-express-ejs)

      `
    },
    createdAt: new Date("2024-03-27"),
    updatedAt: new Date("2024-03-27"),
    featured: false
  },
  {
    id: "express-test",
    title: {
      pt: "Express Test",
      en: "Express Test"
    },
    description: {
      pt: "Repositório com testes e exemplos práticos de desenvolvimento backend com Node.js e Express.",
      en: "Repository with tests and practical examples of backend development with Node.js and Express."
    },
    category: "development",
    images: ["/assets/projects/express-logo.png"],
    tags: ["Backend", "Express", "Node.js", "API", "Learning"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/express-test" }],
    content: {
      pt: `
### 🚀 Express Test

Repositório com testes em Node.js com Express

---

#### 🏗️ Sobre o Projeto

Este é um projeto de iniciação de backend desenvolvido com Node.js e Express. O projeto foi criado como parte do meu trabalho para portfólio, visando aprender e praticar conceitos fundamentais de desenvolvimento de backend com Node.js.
- Implementação de rotas básicas para aprendizado.
- Tratamento de requisições HTTP com Express.
- Manipulação de parâmetros de URL.
- Tratamento de erros.
O projeto segue a seguinte estrutura:
├── index.js Arquivo principal do servidor
├── package.json Arquivo de manifesto do projeto
└── README.md Este arquivo README
1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório:
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
3. Navegue até o diretório do projeto:
    cd nome-do-repositorio
4. Instal...

#### 🛠️ Tecnologias Utilizadas

- **JavaScript**
- **Node.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/express-test)

      `,
      en: `
### 🚀 Express Test

Repositório com testes em Node.js com Express

---

#### 🏗️ About the Project

Este é um projeto de iniciação de backend desenvolvido com Node.js e Express. O projeto foi criado como parte do meu trabalho para portfólio, visando aprender e praticar conceitos fundamentais de desenvolvimento de backend com Node.js.
- Implementação de rotas básicas para aprendizado.
- Tratamento de requisições HTTP com Express.
- Manipulação de parâmetros de URL.
- Tratamento de erros.
O projeto segue a seguinte estrutura:
├── index.js Arquivo principal do servidor
├── package.json Arquivo de manifesto do projeto
└── README.md Este arquivo README
1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório:
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
3. Navegue até o diretório do projeto:
    cd nome-do-repositorio
4. Instal...

#### 🛠️ Technologies Used

- **JavaScript**
- **Node.js**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/express-test)

      `
    },
    createdAt: new Date("2024-03-26"),
    updatedAt: new Date("2024-03-27"),
    featured: false
  },
  {
    id: "react-checkout-context",
    title: {
      pt: "React Checkout Context",
      en: "React Checkout Context"
    },
    description: {
      pt: "Carrinho de compras desenvolvido em React utilizando Hooks e Context API para gerenciamento de estado global.",
      en: "Shopping cart developed in React using Hooks and Context API for global state management."
    },
    category: "development",
    images: ["/assets/projects/checkout-react-logo.png"],
    tags: ["React", "E-commerce", "Context API", "State Management", "Shopping Cart"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/react-checkout-context" }],
    content: {
      pt: `
### 🚀 React Checkout Context

Carrinho de Compras em React com Hooks e Context API

---

#### 🏗️ Sobre o Projeto

Este projeto é um exemplo básico de um carrinho de compras desenvolvido em React, utilizando os conceitos de Hooks e Context API. Ele permite adicionar produtos ao carrinho, remover itens, editar a quantidade e exibir o subtotal e total da compra.
O projeto é dividido em três partes principais:
1. **CartContext.js**: Este arquivo contém a implementação do Contexto do Carrinho, onde é definido o estado global do carrinho, juntamente com as funções para adicionar, remover e atualizar a quantidade dos itens.
2. **Cart.js**: Este componente é responsável por exibir os itens no carrinho, permitindo ao usuário remover itens, editar a quantidade e exibir o subtotal da compra.
3. **Product.js**: Este é um componente de produto simples que pode ser adicionado ao carrinho. Ele exibe informações sobr...

#### 🛠️ Tecnologias Utilizadas

- **JavaScript**
- **React**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/react-checkout-context)

      `,
      en: `
### 🚀 React Checkout Context

Carrinho de Compras em React com Hooks e Context API

---

#### 🏗️ About the Project

Este projeto é um exemplo básico de um carrinho de compras desenvolvido em React, utilizando os conceitos de Hooks e Context API. Ele permite adicionar produtos ao carrinho, remover itens, editar a quantidade e exibir o subtotal e total da compra.
O projeto é dividido em três partes principais:
1. **CartContext.js**: Este arquivo contém a implementação do Contexto do Carrinho, onde é definido o estado global do carrinho, juntamente com as funções para adicionar, remover e atualizar a quantidade dos itens.
2. **Cart.js**: Este componente é responsável por exibir os itens no carrinho, permitindo ao usuário remover itens, editar a quantidade e exibir o subtotal da compra.
3. **Product.js**: Este é um componente de produto simples que pode ser adicionado ao carrinho. Ele exibe informações sobr...

#### 🛠️ Technologies Used

- **JavaScript**
- **React**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/react-checkout-context)

      `
    },
    createdAt: new Date("2023-11-11"),
    updatedAt: new Date("2023-11-11"),
    featured: false
  },
  {
    id: "calculadora",
    title: {
      pt: "Calculadora",
      en: "Calculator"
    },
    description: {
      pt: "Calculadora funcional desenvolvida em React com operações matemáticas básicas e interface moderna.",
      en: "Functional calculator developed in React with basic mathematical operations and modern interface."
    },
    category: "development",
    images: ["/assets/projects/logo-calculadora.png"],
    tags: ["React", "Utility", "Calculator", "TypeScript", "Frontend"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/calculadora" }],
    content: {
      pt: `
### 🚀 Calculadora

Calculadora funcional em react

---

#### 🏗️ Sobre o Projeto

This project was bootstrapped with Create React App.
In the project directory, you can run:
Runs the app in the development mode.<br>
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.
Launches the test runner in the interactive watch mode.<br>
See the section about running tests for more information.
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about deployment for more information.
**Note: this is a one-way operation. Once you eject, you can’t go back!**
If you aren’t sati...

#### 🛠️ Tecnologias Utilizadas

- **JavaScript**
- **React**
- **TypeScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/calculadora)

      `,
      en: `
### 🚀 Calculadora

Calculadora funcional em react

---

#### 🏗️ About the Project

This project was bootstrapped with Create React App.
In the project directory, you can run:
Runs the app in the development mode.<br>
Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.<br>
You will also see any lint errors in the console.
Launches the test runner in the interactive watch mode.<br>
See the section about running tests for more information.
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about deployment for more information.
**Note: this is a one-way operation. Once you eject, you can’t go back!**
If you aren’t sati...

#### 🛠️ Technologies Used

- **JavaScript**
- **React**
- **TypeScript**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/calculadora)

      `
    },
    createdAt: new Date("2019-07-04"),
    updatedAt: new Date("2019-07-05"),
    featured: false
  },
  {
    id: "cipa-senac",
    title: {
      pt: "CIPA Senac",
      en: "CIPA Senac"
    },
    description: {
      pt: "Projeto Integrador do 3° Módulo desenvolvido durante curso técnico, focado em desenvolvimento web com HTML, CSS e JavaScript.",
      en: "Integrator Project of the 3rd Module developed during technical course, focused on web development with HTML, CSS and JavaScript."
    },
    category: "development",
    images: ["/assets/projects/cipa-senac-logo.jpg"],
    tags: ["HTML", "CSS", "JavaScript", "Academic Project", "Web Development"],
    links: [{ texto: "GitHub", url: "https://github.com/rogeriojr/CIPA---Senac" }],
    content: {
      pt: `
### 🚀 CIPA Senac

Projeto Integrador 3° Modulo

---

#### 🏗️ Sobre o Projeto

Projeto desenvolvido para demonstração de habilidades técnicas e boas práticas de desenvolvimento.

#### 🛠️ Tecnologias Utilizadas

- **HTML**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/CIPA---Senac)

      `,
      en: `
### 🚀 CIPA Senac

Projeto Integrador 3° Modulo

---

#### 🏗️ About the Project

Project developed to demonstrate technical skills and development best practices.

#### 🛠️ Technologies Used

- **HTML**

#### 🔗 Links

- [GitHub](https://github.com/rogeriojr/CIPA---Senac)

      `
    },
    createdAt: new Date("2015-06-17"),
    updatedAt: new Date("2016-01-07"),
    featured: false
  }
];
