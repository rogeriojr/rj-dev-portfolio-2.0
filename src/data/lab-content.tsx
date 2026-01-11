import { ReactNode, lazy, ComponentType } from 'react';

const lazyComponentMap: Record<string, () => Promise<{ default: ComponentType<any> }>> = {
  'ApiRequestSimulator': () => import('../components/Lab/demos/ApiRequestSimulator').then(m => ({ default: m.ApiRequestSimulator })),
  'InteractiveCalendar': () => import('../components/Lab/demos/InteractiveCalendar').then(m => ({ default: m.InteractiveCalendar })),
  'CurrencyConverter': () => import('../components/Lab/demos/CurrencyConverter').then(m => ({ default: m.CurrencyConverter })),
  'LazyImageOverlay': () => import('../components/Lab/demos/LazyImageOverlay').then(m => ({ default: m.LazyImageOverlay })),
  'TouchGestureSandbox': () => import('../components/Lab/demos/TouchGestureSandbox').then(m => ({ default: m.TouchGestureSandbox })),
  'CosmicDashboard': () => import('../components/Lab/demos/CosmicDashboard').then(m => ({ default: m.CosmicDashboard })),
  'ComplexFormSimulator': () => import('../components/Lab/demos/ComplexFormSimulator').then(m => ({ default: m.ComplexFormSimulator })),
  'UnitTestRunner': () => import('../components/Lab/demos/UnitTestRunner').then(m => ({ default: m.UnitTestRunner })),
  'LogStreamSimulator': () => import('../components/Lab/demos/LogStreamSimulator').then(m => ({ default: m.LogStreamSimulator })),
  'MetricsDashboard': () => import('../components/Lab/demos/MetricsDashboard').then(m => ({ default: m.MetricsDashboard })),
  'FolderTreeVisualizer': () => import('../components/Lab/demos/FolderTreeVisualizer').then(m => ({ default: m.FolderTreeVisualizer })),
  'DebuggerSimulator': () => import('../components/Lab/demos/DebuggerSimulator').then(m => ({ default: m.DebuggerSimulator })),
  'DynamicFormBuilder': () => import('../components/Lab/demos/DynamicFormBuilder').then(m => ({ default: m.DynamicFormBuilder })),
  'CPFValidationSimulator': () => import('../components/Lab/demos/CPFValidationSimulator').then(m => ({ default: m.CPFValidationSimulator })),
  'FilePipelineSimulator': () => import('../components/Lab/demos/FilePipelineSimulator').then(m => ({ default: m.FilePipelineSimulator })),
  'MarkdownEngineSimulator': () => import('../components/Lab/demos/MarkdownEngineSimulator').then(m => ({ default: m.MarkdownEngineSimulator })),
  'DocumentPreviewSimulator': () => import('../components/Lab/demos/DocumentPreviewSimulator').then(m => ({ default: m.DocumentPreviewSimulator })),
  'ValidationSuiteSimulator': () => import('../components/Lab/demos/ValidationSuiteSimulator').then(m => ({ default: m.ValidationSuiteSimulator })),
  'WebSocketSimulator': () => import('../components/Lab/demos/WebSocketSimulator').then(m => ({ default: m.WebSocketSimulator })),
  'StateMachineVisualizer': () => import('../components/Lab/demos/StateMachineVisualizer').then(m => ({ default: m.StateMachineVisualizer })),
  'CodeEditorSimulator': () => import('../components/Lab/demos/CodeEditorSimulator').then(m => ({ default: m.CodeEditorSimulator })),
  'PerformanceMonitor': () => import('../components/Lab/demos/PerformanceMonitor').then(m => ({ default: m.PerformanceMonitor })),
  'MapComponent': () => import('../components/Lab/demos/MapComponent').then(m => ({ default: m.MapComponent })),
  'AdvancedGeolocation': () => import('../components/Lab/demos/AdvancedGeolocation').then(m => ({ default: m.AdvancedGeolocation })),
  'TodoList': () => import('../components/Lab/demos/TodoList').then(m => ({ default: m.TodoList })),
  'KanbanBoard': () => import('../components/Lab/demos/KanbanBoard').then(m => ({ default: m.KanbanBoard })),
  'AIChatInterface': () => import('../components/Lab/demos/AIChatInterface').then(m => ({ default: m.AIChatInterface })),
  'AIImageGenerator': () => import('../components/Lab/demos/AIImageGenerator').then(m => ({ default: m.AIImageGenerator })),
  'DataVisualization': () => import('../components/Lab/demos/DataVisualization').then(m => ({ default: m.DataVisualization })),
  'FormBuilder': () => import('../components/Lab/demos/FormBuilder').then(m => ({ default: m.FormBuilder })),
  'RealTimeCollaboration': () => import('../components/Lab/demos/RealTimeCollaboration').then(m => ({ default: m.RealTimeCollaboration })),
  'VoiceRecorder': () => import('../components/Lab/demos/VoiceRecorder').then(m => ({ default: m.VoiceRecorder })),
  'FileUploader': () => import('../components/Lab/demos/FileUploader').then(m => ({ default: m.FileUploader })),
  'CodeDiffViewer': () => import('../components/Lab/demos/CodeDiffViewer').then(m => ({ default: m.CodeDiffViewer })),
};

const createLazyComponent = (componentName: string): ReactNode => {
  const loader = lazyComponentMap[componentName];
  if (!loader) return null;
  const LazyComponent = lazy(loader);
  return <LazyComponent />;
};

export type LocalizedString = {
  en: string;
  pt: string;
};

export interface LabItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  problemStatement?: LocalizedString;
  solution?: LocalizedString;
  features?: LocalizedString[];
  seniorTips?: LocalizedString[];
  type: 'component' | 'hook' | 'pattern' | 'architecture' | 'utility' | 'infra' | 'security' | 'testing' | 'performance' | 'leadership' | 'mission-critical' | 'iot' | 'ai-advanced' | 'god-tier';
  category: string;
  code?: string;
  demo?: ReactNode;
  mermaid?: string;
}

export interface LabCategory {
  id: string;
  title: LocalizedString;
  icon: string;
  items: LabItem[];
}

export const LAB_CONTENT: LabCategory[] = [
  {
    id: 'god-tier-backend',
    title: { en: 'Backend Sovereignty', pt: 'Soberania Backend' },
    icon: '⚡',
    items: [
      {
        id: 'dist-locking-redlock',
        title: { en: 'Distributed Locking (Redlock)', pt: 'Lock Distribuído (Redlock)' },
        description: { en: 'Industrial-grade race condition prevention across clusters.', pt: 'Prevenção de race conditions nível industrial em clusters.' },
        type: 'god-tier',
        category: 'god-tier-backend',
        mermaid: `sequenceDiagram\n  A->>Redis: SET lock_key NX PX 10000\n  Redis-->>A: OK\n  B->>Redis: SET lock_key NX PX 10000\n  Redis-->>B: FAIL`,
        code: `// Global concurrency lock\nconst lock = await redis.set(key, '1', 'NX', 'PX', 10000);`
      },
      {
        id: 'hexagonal-architecture',
        title: { en: 'Hexagonal Architecture', pt: 'Arquitetura Hexagonal' },
        description: { en: 'Ports and Adapters for framework-agnostic core logic.', pt: 'Ports and Adapters para lógica core agnóstica a frameworks.' },
        type: 'architecture',
        category: 'god-tier-backend',
        demo: createLazyComponent('FolderTreeVisualizer'),
        mermaid: `graph LR\n  UI[Primary Adapter] --> PortIn[Input Port]\n  PortIn --> Core[Domain]\n  Core --> PortOut[Output Port]\n  PortOut --> DB[Secondary Adapter]`,
        seniorTips: [{ en: "Domain logic should never depend on your choice of database.", pt: "Lógica de domínio nunca deve depender da sua escolha de banco de dados." }]
      }
    ]
  },
  {
    id: 'data-validation',
    title: { en: 'Data & Precision', pt: 'Dados e Precisão' },
    icon: '✅',
    items: [
      {
        id: 'cpf-validation-engine',
        title: { en: 'CPF Validation Mastery', pt: 'Maestria em Validação de CPF' },
        description: { en: 'Complex Brazilian document validation with logic visualization.', pt: 'Validação complexa de documentos brasileiros com visualização de lógica.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('CPFValidationSimulator'),
        code: `function validateCPF(cpf) {\n  // Sum algorithm for 1st and 2nd digits\n  let sum = 0;\n  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i-1]) * (11 - i);\n  return (sum * 10) % 11 === parseInt(cpf[9]);\n}`,
        problemStatement: { en: "Simple regex doesn't catch false mathematical documents.", pt: "Regex simples não pega documentos matematicamente falsos." },
        solution: { en: "Implement the dual-digit check algorithm from Ministry of Finance.", pt: "Implementar o algoritmo de verificação de dois dígitos do Ministério da Fazenda." }
      },
      {
        id: 'phone-validation-mastery',
        title: { en: 'Phone Validation (BR)', pt: 'Validação de Telefone (BR)' },
        description: { en: 'Regex patterns for Brazilian mobile and landline standards.', pt: 'Padrões Regex para padrões brasileiros de celular e fixo.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator'),
        seniorTips: [{ en: "Always consider the digit 9 for mobile numbers in Brazil.", pt: "Sempre considere o dígito 9 para números de celular no Brasil." }]
      },
      {
        id: 'email-purity-engine',
        title: { en: 'Email Purity Engine', pt: 'Motor de Pureza de Email' },
        description: { en: 'RFC-compliant email validation beyond simple regex.', pt: 'Validação de email em conformidade com RFC além de regex simples.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'cnpj-corporate-check',
        title: { en: 'CNPJ Corporate Check', pt: 'Verificação Corporativa CNPJ' },
        description: { en: 'Mathematical validation for Brazilian corporate tax IDs.', pt: 'Validação matemática para IDs fiscais corporativos brasileiros.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'password-strength-calc',
        title: { en: 'Entropy Password Strength', pt: 'Força de Senha por Entropia' },
        description: { en: 'Measuring security depth based on character diversity.', pt: 'Medindo a profundidade de segurança com base na diversidade de caracteres.' },
        type: 'security',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'credit-card-validator',
        title: { en: 'Luhn Algorithm Master', pt: 'Mestre do Algoritmo de Luhn' },
        description: { en: 'Real-time credit card checksum and brand detection.', pt: 'Checksum de cartão de crédito em tempo real e detecção de bandeira.' },
        type: 'security',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'ipv4-network-validator',
        title: { en: 'IPv4 Network Validator', pt: 'Validador de Rede IPv4' },
        description: { en: 'Checking octet ranges and CIDR notation validity.', pt: 'Verificando intervalos de octetos e validade de notação CIDR.' },
        type: 'infra',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'url-integrity-check',
        title: { en: 'URL Integrity Engine', pt: 'Motor de Integridade de URL' },
        description: { en: 'Parsing protocols, domains, and safe path traversal.', pt: 'Parsing de protocolos, domínios e caminhos seguros.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'hex-color-precision',
        title: { en: 'HEX Color Precision', pt: 'Precisão de Cor HEX' },
        description: { en: 'Validating 3, 6, and 8 digit hex color codes.', pt: 'Validando códigos de cor hex de 3, 6 e 8 dígitos.' },
        type: 'component',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'date-format-iso',
        title: { en: 'ISO Date Validation', pt: 'Validação de Data ISO' },
        description: { en: 'Ensuring calendar consistency and leap year logic.', pt: 'Garantindo consistência de calendário e lógica de ano bissexto.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      },
      {
        id: 'postal-code-brazil',
        title: { en: 'CEP Postal Mastery', pt: 'Maestria Postal CEP' },
        description: { en: 'Validating Brazilian postal codes with mask handling.', pt: 'Validando CEPs brasileiros com tratamento de máscara.' },
        type: 'utility',
        category: 'data-validation',
        demo: createLazyComponent('ValidationSuiteSimulator')
      }
    ]
  },
  {
    id: 'media-pipeline',
    title: { en: 'Media Pipelines', pt: 'Pipelines de Mídia' },
    icon: '📁',
    items: [
      {
        id: 'file-pipeline-sim',
        title: { en: 'Advanced File Handling', pt: 'Gestão Avançada de Arquivos' },
        description: { en: 'Multi-part uploads, image previews, and cloud integration.', pt: 'Uploads multi-part, previews de imagem e integração cloud.' },
        type: 'infra',
        category: 'media-pipeline',
        demo: createLazyComponent('FilePipelineSimulator'),
        seniorTips: [{ en: "Always validate file magic numbers, not just extensions.", pt: "Sempre valide os 'magic numbers' dos arquivos, não apenas extensões." }]
      },
      {
        id: 'pdf-document-engine',
        title: { en: 'Document Preview Engine', pt: 'Motor de Preview de Documentos' },
        description: { en: 'WASM-accelerated PDF rendering with UI orchestration.', pt: 'Renderização de PDF acelerada via WASM com orquestração de UI.' },
        type: 'component',
        category: 'media-pipeline',
        demo: createLazyComponent('DocumentPreviewSimulator'),
        problemStatement: { en: "Native browser PDF views lack custom branding and control.", pt: "Visualizadores nativos de PDF carecem de marca personalizada e controle." },
        solution: { en: "Use PDF.js on a Canvas layer for absolute control.", pt: "Usar PDF.js em uma camada Canvas para controle absoluto." }
      }
    ]
  },
  {
    id: 'interactive-logic',
    title: { en: 'Interactive Logic', pt: 'Lógica Interativa' },
    icon: '📝',
    items: [
      {
        id: 'markdown-core-engine',
        title: { en: 'Markdown Content Engine', pt: 'Motor de Conteúdo Markdown' },
        description: { en: 'Real-time parsing and preview system for enterprise editors.', pt: 'Sistema de parsing e preview em tempo real para editores corporativos.' },
        type: 'pattern',
        category: 'interactive-logic',
        demo: createLazyComponent('MarkdownEngineSimulator'),
        code: `const html = await unified().use(remarkParse).use(remarkHtml).process(markdown);`,
        seniorTips: [{ en: "Sanitize HTML output to prevent XSS attacks when rendering markdown.", pt: "Sanitize o output HTML para prevenir ataques XSS ao renderizar markdown." }]
      }
    ]
  },
  {
    id: 'observability',
    title: { en: 'Observability & SRE', pt: 'Observabilidade e SRE' },
    icon: '📊',
    items: [
      {
        id: 'log-stream-demo',
        title: { en: 'Structured Log Streaming', pt: 'Streaming de Logs Estruturados' },
        description: { en: 'Real-time log ingestion with JSON payload inspection.', pt: 'Ingestão de logs em tempo real com inspeção de payload JSON.' },
        type: 'infra',
        category: 'observability',
        demo: createLazyComponent('LogStreamSimulator')
      },
      {
        id: 'metrics-dash-demo',
        title: { en: 'Real-time Metrics Engine', pt: 'Motor de Métricas Real-time' },
        description: { en: 'Visualizing CPU, Memory, and P99 Latency under load.', pt: 'Visualizando CPU, Memória e Latência P99 sob carga.' },
        type: 'performance',
        category: 'observability',
        demo: createLazyComponent('MetricsDashboard')
      }
    ]
  },
  {
    id: 'frontend-mastery',
    title: { en: 'Frontend Engineering', pt: 'Engenharia Frontend' },
    icon: '👑',
    items: [
      {
        id: 'complex-form-master',
        title: { en: 'Advanced Form Orchestration', pt: 'Orquestração de Forms Avançados' },
        description: { en: 'Multi-step validation with Zod schemas and live state.', pt: 'Validação multi-etapa com schemas Zod e estado vivo.' },
        type: 'component',
        category: 'frontend-mastery',
        demo: createLazyComponent('ComplexFormSimulator')
      },
      {
        id: 'dynamic-form-builder',
        title: { en: 'Declarative Form Engine', pt: 'Motor de Form Declarativo' },
        description: { en: 'JSON-to-UI generation with dynamic input mapping.', pt: 'Geração JSON-to-UI com mapeamento dinâmico de inputs.' },
        type: 'pattern',
        category: 'frontend-mastery',
        demo: createLazyComponent('DynamicFormBuilder')
      },
      {
        id: 'debugger-demo',
        title: { en: 'Logic Debugger Simulator', pt: 'Simulador de Debug de Lógica' },
        description: { en: 'Visualizing step-through execution and variable shifts.', pt: 'Visualizando execução passo-a-passo e variações de variáveis.' },
        type: 'utility',
        category: 'frontend-mastery',
        demo: createLazyComponent('DebuggerSimulator')
      }
    ]
  },
  {
    id: 'testing-lab',
    title: { en: 'Testing Lab', pt: 'Laboratório de Testes' },
    icon: '🧪',
    items: [
      {
        id: 'unit-test-engine',
        title: { en: 'Visual Test Suite Runner', pt: 'Visualizador de Suite de Testes' },
        description: { en: 'Demonstrating Jest execution logic and report generation.', pt: 'Demonstrando lógica de execução Jest e geração de relatórios.' },
        type: 'testing',
        category: 'testing-lab',
        demo: createLazyComponent('UnitTestRunner')
      }
    ]
  },
  {
    id: 'standards',
    title: { en: 'Engineering Standards', pt: 'Padrões de Engenharia' },
    icon: '🏗️',
    items: [
      {
        id: 'api-lifecycle-sim',
        title: { en: 'Network Handshake Engine', pt: 'Motor de Handshake de Rede' },
        description: { en: 'Visualizing latency and timeout handling.', pt: 'Visualizando latência e tratativa de timeouts.' },
        type: 'architecture',
        category: 'standards',
        demo: createLazyComponent('ApiRequestSimulator')
      },
      {
        id: 'bento-dashboard-sys',
        title: { en: 'SaaS Mission Control', pt: 'Controle de Missão SaaS' },
        description: { en: 'Bento-grid architecture for high-density interfaces.', pt: 'Arquitetura bento-grid para interfaces de alta densidade.' },
        type: 'component',
        category: 'standards',
        demo: createLazyComponent('CosmicDashboard')
      }
    ]
  },
  {
    id: 'utilities',
    title: { en: 'Optimization Labs', pt: 'Laboratórios de Otimização' },
    icon: '🛠️',
    items: [
      {
        id: 'perf-calendar-engine',
        title: { en: 'Virtualization Calendar', pt: 'Calendário com Virtualização' },
        description: { en: 'Optimizing render loops for large date ranges.', pt: 'Otimizando loops de render para grandes intervalos de datas.' },
        type: 'utility',
        category: 'utilities',
        demo: createLazyComponent('InteractiveCalendar')
      },
      {
        id: 'touch-gesture-lab',
        title: { en: 'Gesture Physics Sandbox', pt: 'Sandbox de Física de Gestos' },
        description: { en: 'Proprietary touch mechanics for mobile apps.', pt: 'Mecânicas de toque proprietárias para apps mobile.' },
        type: 'component',
        category: 'utilities',
        demo: createLazyComponent('TouchGestureSandbox')
      },
      {
        id: 'reactive-fx-engine',
        title: { en: 'Real-time FX Engine', pt: 'Motor FX Real-time' },
        description: { en: 'Safe currency arithmetic in high-volatility environments.', pt: 'Aritmética de moeda segura em ambientes de alta volatilidade.' },
        type: 'utility',
        category: 'utilities',
        demo: createLazyComponent('CurrencyConverter')
      },
      {
        id: 'media-blur-loading',
        title: { en: 'Progressive Image Pipeline', pt: 'Pipeline de Imagem Progressiva' },
        description: { en: 'Maximizing perceived performance with blur-up UX.', pt: 'Maximizando performance percebida com UX blur-up.' },
        type: 'component',
        category: 'utilities',
        demo: createLazyComponent('LazyImageOverlay')
      }
    ]
  },
  {
    id: 'real-time-systems',
    title: { en: 'Real-time Systems', pt: 'Sistemas Real-time' },
    icon: '⚡',
    items: [
      {
        id: 'websocket-engine',
        title: { en: 'WebSocket Communication Engine', pt: 'Motor de Comunicação WebSocket' },
        description: { en: 'Full-duplex real-time communication protocol implementation with connection management.', pt: 'Implementação de protocolo de comunicação real-time full-duplex com gerenciamento de conexão.' },
        type: 'architecture',
        category: 'real-time-systems',
        demo: createLazyComponent('WebSocketSimulator'),
        code: `const ws = new WebSocket('wss://api.example.com');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  handleMessage(data);
};
ws.send(JSON.stringify({ type: 'ping' }));`,
        problemStatement: { en: "HTTP polling creates unnecessary overhead and latency for real-time applications.", pt: "Polling HTTP cria overhead desnecessário e latência para aplicações real-time." },
        solution: { en: "WebSocket provides persistent bidirectional communication with minimal overhead.", pt: "WebSocket fornece comunicação bidirecional persistente com overhead mínimo." },
        seniorTips: [
          { en: "Always implement reconnection logic with exponential backoff.", pt: "Sempre implemente lógica de reconexão com backoff exponencial." },
          { en: "Use heartbeat/ping messages to detect stale connections.", pt: "Use mensagens heartbeat/ping para detectar conexões obsoletas." }
        ]
      },
      {
        id: 'state-machine-pattern',
        title: { en: 'State Machine Pattern', pt: 'Padrão State Machine' },
        description: { en: 'Predictable state transitions for complex UI flows and business logic.', pt: 'Transições de estado previsíveis para fluxos de UI complexos e lógica de negócio.' },
        type: 'pattern',
        category: 'real-time-systems',
        demo: createLazyComponent('StateMachineVisualizer'),
        code: `const stateMachine = {
  states: { idle: {}, loading: {}, success: {}, error: {} },
  transitions: {
    FETCH: { from: 'idle', to: 'loading' },
    SUCCESS: { from: 'loading', to: 'success' },
    ERROR: { from: 'loading', to: 'error' }
  }
};`,
        seniorTips: [
          { en: "State machines prevent impossible states and make logic testable.", pt: "State machines previnem estados impossíveis e tornam a lógica testável." },
          { en: "Use libraries like XState for complex state machines.", pt: "Use bibliotecas como XState para state machines complexas." }
        ]
      }
    ]
  },
  {
    id: 'developer-tools',
    title: { en: 'Developer Tools', pt: 'Ferramentas de Desenvolvimento' },
    icon: '🛠️',
    items: [
      {
        id: 'code-editor-engine',
        title: { en: 'Code Editor Engine', pt: 'Motor de Editor de Código' },
        description: { en: 'Syntax highlighting, autocomplete, and code execution in the browser.', pt: 'Syntax highlighting, autocomplete e execução de código no navegador.' },
        type: 'component',
        category: 'developer-tools',
        demo: createLazyComponent('CodeEditorSimulator'),
        code: `import { Editor } from '@monaco-editor/react';
<Editor
  language="javascript"
  value={code}
  onChange={setCode}
  theme="vs-dark"
/>`,
        problemStatement: { en: "Plain textareas don't provide developer experience for code editing.", pt: "Textareas simples não fornecem experiência de desenvolvedor para edição de código." },
        solution: { en: "Use Monaco Editor or CodeMirror for professional code editing features.", pt: "Use Monaco Editor ou CodeMirror para recursos profissionais de edição de código." },
        seniorTips: [
          { en: "Monaco Editor powers VS Code and provides excellent TypeScript support.", pt: "Monaco Editor alimenta o VS Code e fornece excelente suporte a TypeScript." },
          { en: "Consider bundle size - Monaco is large but feature-rich.", pt: "Considere o tamanho do bundle - Monaco é grande mas rico em recursos." }
        ]
      },
      {
        id: 'performance-monitoring',
        title: { en: 'Performance Monitoring', pt: 'Monitoramento de Performance' },
        description: { en: 'Real-time metrics tracking for CPU, memory, network, and response times.', pt: 'Rastreamento de métricas em tempo real para CPU, memória, rede e tempos de resposta.' },
        type: 'performance',
        category: 'developer-tools',
        demo: createLazyComponent('PerformanceMonitor'),
        code: `const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});
observer.observe({ entryTypes: ['measure', 'navigation'] });`,
        seniorTips: [
          { en: "Use Performance API for client-side metrics.", pt: "Use Performance API para métricas do lado do cliente." },
          { en: "Monitor Core Web Vitals for SEO and user experience.", pt: "Monitore Core Web Vitals para SEO e experiência do usuário." }
        ]
      }
    ]
  },
  {
    id: 'maps-geolocation',
    title: { en: 'Maps & Geolocation', pt: 'Mapas e Geolocalização' },
    icon: '🗺️',
    items: [
      {
        id: 'interactive-map',
        title: { en: 'Interactive Map Component', pt: 'Componente de Mapa Interativo' },
        description: { en: 'Geolocation API integration with markers, search, and route planning.', pt: 'Integração com Geolocation API com marcadores, busca e planejamento de rotas.' },
        type: 'component',
        category: 'maps-geolocation',
        demo: createLazyComponent('MapComponent'),
        code: `navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  // Use coordinates for map centering
});`,
        problemStatement: { en: 'Need to display locations and allow user interaction with geographic data.', pt: 'Necessidade de exibir localizações e permitir interação do usuário com dados geográficos.' },
        solution: { en: 'Integrate Geolocation API with interactive map markers and search functionality.', pt: 'Integrar Geolocation API com marcadores interativos e funcionalidade de busca.' },
        features: [
          { en: 'Real-time geolocation tracking', pt: 'Rastreamento de geolocalização em tempo real' },
          { en: 'Interactive markers with click events', pt: 'Marcadores interativos com eventos de clique' },
          { en: 'Search and filter locations', pt: 'Busca e filtro de localizações' },
          { en: 'Route planning capabilities', pt: 'Capacidades de planejamento de rotas' }
        ],
        seniorTips: [
          { en: 'Always request location permissions gracefully and handle denial cases.', pt: 'Sempre solicite permissões de localização de forma elegante e trate casos de negação.' },
          { en: 'Consider using Web Workers for heavy geospatial calculations.', pt: 'Considere usar Web Workers para cálculos geoespaciais pesados.' }
        ]
      }
    ]
  },
  {
    id: 'productivity-tools',
    title: { en: 'Productivity Tools', pt: 'Ferramentas de Produtividade' },
    icon: '📋',
    items: [
      {
        id: 'advanced-todo-list',
        title: { en: 'Advanced Todo List', pt: 'Lista de Tarefas Avançada' },
        description: { en: 'Full-featured todo list with priorities, filters, and drag-and-drop.', pt: 'Lista de tarefas completa com prioridades, filtros e drag-and-drop.' },
        type: 'component',
        category: 'productivity-tools',
        demo: createLazyComponent('TodoList'),
        code: `const [todos, setTodos] = useState<Todo[]>([]);
const toggleTodo = (id: string) => {
  setTodos(todos.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  ));
};`,
        features: [
          { en: 'Priority levels (low, medium, high)', pt: 'Níveis de prioridade (baixa, média, alta)' },
          { en: 'Filter by status (all, active, completed)', pt: 'Filtrar por status (todas, ativas, concluídas)' },
          { en: 'Inline editing with validation', pt: 'Edição inline com validação' },
          { en: 'Animated transitions', pt: 'Transições animadas' }
        ],
        seniorTips: [
          { en: 'Use useMemo for filtered lists to avoid unnecessary recalculations.', pt: 'Use useMemo para listas filtradas para evitar recálculos desnecessários.' },
          { en: 'Consider implementing optimistic updates for better UX.', pt: 'Considere implementar atualizações otimistas para melhor UX.' }
        ]
      }
    ]
  },
  {
    id: 'ai-driven',
    title: { en: 'AI Driven Solutions', pt: 'Soluções Impulsionadas por IA' },
    icon: '🤖',
    items: [
      {
        id: 'ai-chat-interface',
        title: { en: 'AI Chat Interface', pt: 'Interface de Chat com IA' },
        description: { en: 'Natural language processing chat interface with context awareness and RAG integration.', pt: 'Interface de chat com processamento de linguagem natural, consciência de contexto e integração RAG.' },
        type: 'ai-advanced',
        category: 'ai-driven',
        demo: createLazyComponent('AIChatInterface'),
        code: `const generateAIResponse = (userMessage: string): string => {
  // RAG: Retrieve relevant context
  const context = retrieveContext(userMessage);
  // Generate response using LLM
  return llm.generate(context, userMessage);
};`,
        problemStatement: { en: 'Users need intelligent, context-aware responses to questions about the portfolio.', pt: 'Usuários precisam de respostas inteligentes e conscientes de contexto sobre o portfólio.' },
        solution: { en: 'Implement RAG (Retrieval-Augmented Generation) system with context retrieval and LLM integration.', pt: 'Implementar sistema RAG (Retrieval-Augmented Generation) com recuperação de contexto e integração LLM.' },
        features: [
          { en: 'Natural language understanding', pt: 'Compreensão de linguagem natural' },
          { en: 'Context-aware responses', pt: 'Respostas conscientes de contexto' },
          { en: 'Real-time typing indicators', pt: 'Indicadores de digitação em tempo real' },
          { en: 'Message history and persistence', pt: 'Histórico e persistência de mensagens' }
        ],
        seniorTips: [
          { en: 'Implement token limits and rate limiting for production AI systems.', pt: 'Implemente limites de tokens e rate limiting para sistemas de IA em produção.' },
          { en: 'Use streaming responses for better perceived performance.', pt: 'Use respostas em streaming para melhor performance percebida.' }
        ]
      },
      {
        id: 'ai-image-generator',
        title: { en: 'AI Image Generator', pt: 'Gerador de Imagens com IA' },
        description: { en: 'Text-to-image generation using diffusion models (Stable Diffusion, DALL-E).', pt: 'Geração de imagens a partir de texto usando modelos de difusão (Stable Diffusion, DALL-E).' },
        type: 'ai-advanced',
        category: 'ai-driven',
        demo: createLazyComponent('AIImageGenerator'),
        code: `const generateImage = async (prompt: string, style: string) => {
  const response = await fetch('/api/ai/generate-image', {
    method: 'POST',
    body: JSON.stringify({ prompt, style })
  });
  return response.blob();
};`,
        features: [
          { en: 'Multiple artistic styles', pt: 'Múltiplos estilos artísticos' },
          { en: 'Progress tracking during generation', pt: 'Rastreamento de progresso durante geração' },
          { en: 'Image gallery with metadata', pt: 'Galeria de imagens com metadados' },
          { en: 'Download functionality', pt: 'Funcionalidade de download' }
        ],
        seniorTips: [
          { en: 'Implement queue system for image generation to handle high load.', pt: 'Implemente sistema de fila para geração de imagens para lidar com alta carga.' },
          { en: 'Cache generated images to reduce API costs.', pt: 'Faça cache de imagens geradas para reduzir custos de API.' }
        ]
      }
    ]
  },
  {
    id: 'data-visualization',
    title: { en: 'Data Visualization', pt: 'Visualização de Dados' },
    icon: '📊',
    items: [
      {
        id: 'interactive-charts',
        title: { en: 'Interactive Data Charts', pt: 'Gráficos de Dados Interativos' },
        description: { en: 'Multiple chart types (bar, line, pie, area) with animations and interactivity.', pt: 'Múltiplos tipos de gráficos (barras, linha, pizza, área) com animações e interatividade.' },
        type: 'component',
        category: 'data-visualization',
        demo: createLazyComponent('DataVisualization'),
        code: `const renderBarChart = () => {
  return data.map(item => (
    <Bar 
      key={item.label}
      value={item.value}
      color={item.color}
      animated
    />
  ));
};`,
        features: [
          { en: 'Multiple chart types (bar, line, pie, area)', pt: 'Múltiplos tipos de gráficos (barras, linha, pizza, área)' },
          { en: 'Smooth animations and transitions', pt: 'Animações e transições suaves' },
          { en: 'Interactive legends and tooltips', pt: 'Legendas e tooltips interativos' },
          { en: 'Responsive design', pt: 'Design responsivo' }
        ],
        seniorTips: [
          { en: 'Use WebGL for rendering large datasets (10k+ points).', pt: 'Use WebGL para renderizar grandes conjuntos de dados (10k+ pontos).' },
          { en: 'Implement virtual scrolling for long data lists.', pt: 'Implemente virtual scrolling para listas longas de dados.' }
        ]
      }
    ]
  },
  {
    id: 'form-engineering',
    title: { en: 'Form Engineering', pt: 'Engenharia de Formulários' },
    icon: '📝',
    items: [
      {
        id: 'dynamic-form-builder',
        title: { en: 'Dynamic Form Builder', pt: 'Construtor de Formulários Dinâmico' },
        description: { en: 'Visual form builder with drag-and-drop, field configuration, and live preview.', pt: 'Construtor visual de formulários com drag-and-drop, configuração de campos e preview ao vivo.' },
        type: 'pattern',
        category: 'form-engineering',
        demo: createLazyComponent('FormBuilder'),
        code: `const addField = (type: FieldType) => {
  const field = {
    id: generateId(),
    type,
    label: 'New Field',
    required: false
  };
  setFields([...fields, field]);
};`,
        features: [
          { en: 'Drag-and-drop field reordering', pt: 'Reordenação de campos com drag-and-drop' },
          { en: 'Multiple field types (text, email, select, etc.)', pt: 'Múltiplos tipos de campos (texto, email, select, etc.)' },
          { en: 'Live preview of generated form', pt: 'Preview ao vivo do formulário gerado' },
          { en: 'Field validation configuration', pt: 'Configuração de validação de campos' }
        ],
        seniorTips: [
          { en: 'Store form schema as JSON for easy serialization and API integration.', pt: 'Armazene o schema do formulário como JSON para fácil serialização e integração com API.' },
          { en: 'Implement field dependencies and conditional logic.', pt: 'Implemente dependências de campos e lógica condicional.' }
        ]
      }
    ]
  },
  {
    id: 'real-time-systems',
    title: { en: 'Real-time Systems', pt: 'Sistemas em Tempo Real' },
    icon: '⚡',
    items: [
      {
        id: 'realtime-collaboration',
        title: { en: 'Real-time Collaboration', pt: 'Colaboração em Tempo Real' },
        description: { en: 'Multi-user document editing with WebSocket synchronization and Operational Transform.', pt: 'Edição de documentos multi-usuário com sincronização WebSocket e Operational Transform.' },
        type: 'architecture',
        category: 'real-time-systems',
        demo: createLazyComponent('RealTimeCollaboration'),
        code: `// Operational Transform for conflict resolution
const transform = (op1: Operation, op2: Operation) => {
  // Resolve conflicts when users edit simultaneously
  return transformedOp;
};`,
        features: [
          { en: 'Multi-user presence indicators', pt: 'Indicadores de presença multi-usuário' },
          { en: 'Real-time change synchronization', pt: 'Sincronização de mudanças em tempo real' },
          { en: 'Change history tracking', pt: 'Rastreamento de histórico de mudanças' },
          { en: 'Conflict resolution with OT', pt: 'Resolução de conflitos com OT' }
        ],
        seniorTips: [
          { en: 'Use Operational Transform or CRDTs for conflict-free collaborative editing.', pt: 'Use Operational Transform ou CRDTs para edição colaborativa sem conflitos.' },
          { en: 'Implement heartbeat mechanism to detect disconnected users.', pt: 'Implemente mecanismo de heartbeat para detectar usuários desconectados.' }
        ]
      }
    ]
  },
  {
    id: 'media-handling',
    title: { en: 'Media Handling', pt: 'Manipulação de Mídia' },
    icon: '🎤',
    items: [
      {
        id: 'voice-recorder',
        title: { en: 'Voice Recorder', pt: 'Gravador de Voz' },
        description: { en: 'Browser-based audio recording using MediaRecorder API with playback and management.', pt: 'Gravação de áudio no navegador usando MediaRecorder API com reprodução e gerenciamento.' },
        type: 'component',
        category: 'media-handling',
        demo: createLazyComponent('VoiceRecorder'),
        code: `const mediaRecorder = new MediaRecorder(stream);
mediaRecorder.ondataavailable = (event) => {
  audioChunks.push(event.data);
};
mediaRecorder.start();`,
        features: [
          { en: 'Real-time audio capture', pt: 'Captura de áudio em tempo real' },
          { en: 'Playback with progress tracking', pt: 'Reprodução com rastreamento de progresso' },
          { en: 'Recording management (delete, list)', pt: 'Gerenciamento de gravações (deletar, listar)' },
          { en: 'Duration tracking', pt: 'Rastreamento de duração' }
        ],
        seniorTips: [
          { en: 'Request microphone permissions early in the user flow.', pt: 'Solicite permissões do microfone cedo no fluxo do usuário.' },
          { en: 'Compress audio before uploading to reduce bandwidth.', pt: 'Comprima áudio antes de fazer upload para reduzir largura de banda.' }
        ]
      },
      {
        id: 'file-uploader',
        title: { en: 'Advanced File Uploader', pt: 'Upload de Arquivos Avançado' },
        description: { en: 'Drag-and-drop file upload with preview, progress tracking, and validation.', pt: 'Upload de arquivos com drag-and-drop, preview, rastreamento de progresso e validação.' },
        type: 'component',
        category: 'media-handling',
        demo: createLazyComponent('FileUploader'),
        code: `const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  files.forEach(file => {
    // Validate file type and size
    // Generate preview for images
    // Upload with progress tracking
  });
};`,
        features: [
          { en: 'Drag-and-drop interface', pt: 'Interface drag-and-drop' },
          { en: 'Image preview generation', pt: 'Geração de preview de imagens' },
          { en: 'Upload progress tracking', pt: 'Rastreamento de progresso de upload' },
          { en: 'File type and size validation', pt: 'Validação de tipo e tamanho de arquivo' }
        ],
        seniorTips: [
          { en: 'Implement chunked uploads for large files to handle network interruptions.', pt: 'Implemente uploads em chunks para arquivos grandes para lidar com interrupções de rede.' },
          { en: 'Use Web Workers for image processing to avoid blocking UI.', pt: 'Use Web Workers para processamento de imagens para evitar bloqueio da UI.' }
        ]
      }
    ]
  },
  {
    id: 'developer-tools',
    title: { en: 'Developer Tools', pt: 'Ferramentas de Desenvolvedor' },
    icon: '🛠️',
    items: [
      {
        id: 'code-diff-viewer',
        title: { en: 'Code Diff Viewer', pt: 'Visualizador de Diff de Código' },
        description: { en: 'Side-by-side code comparison with syntax highlighting and change detection.', pt: 'Comparação lado a lado de código com syntax highlighting e detecção de mudanças.' },
        type: 'utility',
        category: 'developer-tools',
        demo: createLazyComponent('CodeDiffViewer'),
        code: `const calculateDiff = (oldCode: string, newCode: string) => {
  const oldLines = oldCode.split('\\n');
  const newLines = newCode.split('\\n');
  // Compare line by line
  // Mark as added, removed, or unchanged
  return diffLines;
};`,
        features: [
          { en: 'Side-by-side code comparison', pt: 'Comparação lado a lado de código' },
          { en: 'Line-by-line diff highlighting', pt: 'Destaque de diff linha por linha' },
          { en: 'Added/removed/unchanged indicators', pt: 'Indicadores de adicionado/removido/inalterado' },
          { en: 'Statistics (lines added/removed)', pt: 'Estatísticas (linhas adicionadas/removidas)' }
        ],
        seniorTips: [
          { en: 'Use Myers diff algorithm for optimal change detection.', pt: 'Use algoritmo de diff de Myers para detecção ótima de mudanças.' },
          { en: 'Implement syntax highlighting for better readability.', pt: 'Implemente syntax highlighting para melhor legibilidade.' }
        ]
      },
      {
        id: 'advanced-geolocation',
        title: { en: 'Advanced Geolocation Tracking', pt: 'Rastreamento Avançado de Geolocalização' },
        description: { en: 'Real-time location tracking with accuracy, heading, speed, and distance calculations.', pt: 'Rastreamento de localização em tempo real com precisão, direção, velocidade e cálculos de distância.' },
        type: 'component',
        category: 'maps-geolocation',
        demo: createLazyComponent('AdvancedGeolocation'),
        code: `navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude, accuracy, heading, speed } = position.coords;
    // Update location in real-time
  },
  null,
  { enableHighAccuracy: true }
);`,
        features: [
          { en: 'Real-time location tracking with watchPosition', pt: 'Rastreamento de localização em tempo real com watchPosition' },
          { en: 'Distance calculation using Haversine formula', pt: 'Cálculo de distância usando fórmula de Haversine' },
          { en: 'Accuracy, heading, and speed monitoring', pt: 'Monitoramento de precisão, direção e velocidade' },
          { en: 'Sorted locations by distance', pt: 'Localizações ordenadas por distância' }
        ],
        seniorTips: [
          { en: 'Use enableHighAccuracy for better precision but higher battery consumption.', pt: 'Use enableHighAccuracy para melhor precisão mas maior consumo de bateria.' },
          { en: 'Always clear watchPosition when component unmounts to prevent memory leaks.', pt: 'Sempre limpe watchPosition quando o componente desmontar para prevenir vazamentos de memória.' }
        ]
      }
    ]
  },
  {
    id: 'productivity-tools',
    title: { en: 'Productivity Tools', pt: 'Ferramentas de Produtividade' },
    icon: '📋',
    items: [
      {
        id: 'advanced-todo-list',
        title: { en: 'Advanced Todo List', pt: 'Lista de Tarefas Avançada' },
        description: { en: 'Full-featured todo list with priorities, filters, and drag-and-drop.', pt: 'Lista de tarefas completa com prioridades, filtros e drag-and-drop.' },
        type: 'component',
        category: 'productivity-tools',
        demo: createLazyComponent('TodoList'),
        code: `const [todos, setTodos] = useState<Todo[]>([]);
const toggleTodo = (id: string) => {
  setTodos(todos.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  ));
};`,
        features: [
          { en: 'Priority levels (low, medium, high)', pt: 'Níveis de prioridade (baixa, média, alta)' },
          { en: 'Filter by status (all, active, completed)', pt: 'Filtrar por status (todas, ativas, concluídas)' },
          { en: 'Inline editing with validation', pt: 'Edição inline com validação' },
          { en: 'Animated transitions', pt: 'Transições animadas' }
        ],
        seniorTips: [
          { en: 'Use useMemo for filtered lists to avoid unnecessary recalculations.', pt: 'Use useMemo para listas filtradas para evitar recálculos desnecessários.' },
          { en: 'Consider implementing optimistic updates for better UX.', pt: 'Considere implementar atualizações otimistas para melhor UX.' }
        ]
      },
      {
        id: 'kanban-board',
        title: { en: 'Kanban Board', pt: 'Quadro Kanban' },
        description: { en: 'Visual task management with drag-and-drop between columns (Todo, In Progress, Done).', pt: 'Gerenciamento visual de tarefas com drag-and-drop entre colunas (A Fazer, Em Progresso, Concluído).' },
        type: 'component',
        category: 'productivity-tools',
        demo: createLazyComponent('KanbanBoard'),
        code: `const moveTask = (taskId: string, newStatus: Task['status']) => {
  setTasks(tasks.map(task => 
    task.id === taskId ? { ...task, status: newStatus } : task
  ));
};`,
        features: [
          { en: 'Three-column Kanban layout', pt: 'Layout Kanban de três colunas' },
          { en: 'Task creation and editing', pt: 'Criação e edição de tarefas' },
          { en: 'Priority badges', pt: 'Badges de prioridade' },
          { en: 'Animated task movements', pt: 'Movimentos animados de tarefas' }
        ],
        seniorTips: [
          { en: 'Implement drag-and-drop using react-beautiful-dnd or dnd-kit for better UX.', pt: 'Implemente drag-and-drop usando react-beautiful-dnd ou dnd-kit para melhor UX.' },
          { en: 'Consider adding task dependencies and blocking relationships.', pt: 'Considere adicionar dependências de tarefas e relacionamentos de bloqueio.' }
        ]
      }
    ]
  }
];
