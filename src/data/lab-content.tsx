import { ReactNode } from 'react';
import { ApiRequestSimulator } from '../components/Lab/demos/ApiRequestSimulator';
import { InteractiveCalendar } from '../components/Lab/demos/InteractiveCalendar';
import { CurrencyConverter } from '../components/Lab/demos/CurrencyConverter';
import { LazyImageOverlay } from '../components/Lab/demos/LazyImageOverlay';
import { TouchGestureSandbox } from '../components/Lab/demos/TouchGestureSandbox';
import { CosmicDashboard } from '../components/Lab/demos/CosmicDashboard';
import { ComplexFormSimulator } from '../components/Lab/demos/ComplexFormSimulator';
import { UnitTestRunner } from '../components/Lab/demos/UnitTestRunner';
import { LogStreamSimulator } from '../components/Lab/demos/LogStreamSimulator';
import { MetricsDashboard } from '../components/Lab/demos/MetricsDashboard';
import { FolderTreeVisualizer } from '../components/Lab/demos/FolderTreeVisualizer';
import { DebuggerSimulator } from '../components/Lab/demos/DebuggerSimulator';
import { DynamicFormBuilder } from '../components/Lab/demos/DynamicFormBuilder';
import { CPFValidationSimulator } from '../components/Lab/demos/CPFValidationSimulator';
import { FilePipelineSimulator } from '../components/Lab/demos/FilePipelineSimulator';
import { MarkdownEngineSimulator } from '../components/Lab/demos/MarkdownEngineSimulator';
import { DocumentPreviewSimulator } from '../components/Lab/demos/DocumentPreviewSimulator';
import { ValidationSuiteSimulator } from '../components/Lab/demos/ValidationSuiteSimulator';

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
        demo: <FolderTreeVisualizer />,
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
        demo: <CPFValidationSimulator />,
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
        demo: <ValidationSuiteSimulator />,
        seniorTips: [{ en: "Always consider the digit 9 for mobile numbers in Brazil.", pt: "Sempre considere o dígito 9 para números de celular no Brasil." }]
      },
      {
        id: 'email-purity-engine',
        title: { en: 'Email Purity Engine', pt: 'Motor de Pureza de Email' },
        description: { en: 'RFC-compliant email validation beyond simple regex.', pt: 'Validação de email em conformidade com RFC além de regex simples.' },
        type: 'utility',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'cnpj-corporate-check',
        title: { en: 'CNPJ Corporate Check', pt: 'Verificação Corporativa CNPJ' },
        description: { en: 'Mathematical validation for Brazilian corporate tax IDs.', pt: 'Validação matemática para IDs fiscais corporativos brasileiros.' },
        type: 'utility',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'password-strength-calc',
        title: { en: 'Entropy Password Strength', pt: 'Força de Senha por Entropia' },
        description: { en: 'Measuring security depth based on character diversity.', pt: 'Medindo a profundidade de segurança com base na diversidade de caracteres.' },
        type: 'security',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'credit-card-validator',
        title: { en: 'Luhn Algorithm Master', pt: 'Mestre do Algoritmo de Luhn' },
        description: { en: 'Real-time credit card checksum and brand detection.', pt: 'Checksum de cartão de crédito em tempo real e detecção de bandeira.' },
        type: 'security',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'ipv4-network-validator',
        title: { en: 'IPv4 Network Validator', pt: 'Validador de Rede IPv4' },
        description: { en: 'Checking octet ranges and CIDR notation validity.', pt: 'Verificando intervalos de octetos e validade de notação CIDR.' },
        type: 'infra',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'url-integrity-check',
        title: { en: 'URL Integrity Engine', pt: 'Motor de Integridade de URL' },
        description: { en: 'Parsing protocols, domains, and safe path traversal.', pt: 'Parsing de protocolos, domínios e caminhos seguros.' },
        type: 'utility',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'hex-color-precision',
        title: { en: 'HEX Color Precision', pt: 'Precisão de Cor HEX' },
        description: { en: 'Validating 3, 6, and 8 digit hex color codes.', pt: 'Validando códigos de cor hex de 3, 6 e 8 dígitos.' },
        type: 'component',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'date-format-iso',
        title: { en: 'ISO Date Validation', pt: 'Validação de Data ISO' },
        description: { en: 'Ensuring calendar consistency and leap year logic.', pt: 'Garantindo consistência de calendário e lógica de ano bissexto.' },
        type: 'utility',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
      },
      {
        id: 'postal-code-brazil',
        title: { en: 'CEP Postal Mastery', pt: 'Maestria Postal CEP' },
        description: { en: 'Validating Brazilian postal codes with mask handling.', pt: 'Validando CEPs brasileiros com tratamento de máscara.' },
        type: 'utility',
        category: 'data-validation',
        demo: <ValidationSuiteSimulator />
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
        demo: <FilePipelineSimulator />,
        seniorTips: [{ en: "Always validate file magic numbers, not just extensions.", pt: "Sempre valide os 'magic numbers' dos arquivos, não apenas extensões." }]
      },
      {
        id: 'pdf-document-engine',
        title: { en: 'Document Preview Engine', pt: 'Motor de Preview de Documentos' },
        description: { en: 'WASM-accelerated PDF rendering with UI orchestration.', pt: 'Renderização de PDF acelerada via WASM com orquestração de UI.' },
        type: 'component',
        category: 'media-pipeline',
        demo: <DocumentPreviewSimulator />,
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
        demo: <MarkdownEngineSimulator />,
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
        demo: <LogStreamSimulator />
      },
      {
        id: 'metrics-dash-demo',
        title: { en: 'Real-time Metrics Engine', pt: 'Motor de Métricas Real-time' },
        description: { en: 'Visualizing CPU, Memory, and P99 Latency under load.', pt: 'Visualizando CPU, Memória e Latência P99 sob carga.' },
        type: 'performance',
        category: 'observability',
        demo: <MetricsDashboard />
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
        demo: <ComplexFormSimulator />
      },
      {
        id: 'dynamic-form-builder',
        title: { en: 'Declarative Form Engine', pt: 'Motor de Form Declarativo' },
        description: { en: 'JSON-to-UI generation with dynamic input mapping.', pt: 'Geração JSON-to-UI com mapeamento dinâmico de inputs.' },
        type: 'pattern',
        category: 'frontend-mastery',
        demo: <DynamicFormBuilder />
      },
      {
        id: 'debugger-demo',
        title: { en: 'Logic Debugger Simulator', pt: 'Simulador de Debug de Lógica' },
        description: { en: 'Visualizing step-through execution and variable shifts.', pt: 'Visualizando execução passo-a-passo e variações de variáveis.' },
        type: 'utility',
        category: 'frontend-mastery',
        demo: <DebuggerSimulator />
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
        demo: <UnitTestRunner />
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
        demo: <ApiRequestSimulator />
      },
      {
        id: 'bento-dashboard-sys',
        title: { en: 'SaaS Mission Control', pt: 'Controle de Missão SaaS' },
        description: { en: 'Bento-grid architecture for high-density interfaces.', pt: 'Arquitetura bento-grid para interfaces de alta densidade.' },
        type: 'component',
        category: 'standards',
        demo: <CosmicDashboard />
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
        demo: <InteractiveCalendar />
      },
      {
        id: 'touch-gesture-lab',
        title: { en: 'Gesture Physics Sandbox', pt: 'Sandbox de Física de Gestos' },
        description: { en: 'Proprietary touch mechanics for mobile apps.', pt: 'Mecânicas de toque proprietárias para apps mobile.' },
        type: 'component',
        category: 'utilities',
        demo: <TouchGestureSandbox />
      },
      {
        id: 'reactive-fx-engine',
        title: { en: 'Real-time FX Engine', pt: 'Motor FX Real-time' },
        description: { en: 'Safe currency arithmetic in high-volatility environments.', pt: 'Aritmética de moeda segura em ambientes de alta volatilidade.' },
        type: 'utility',
        category: 'utilities',
        demo: <CurrencyConverter />
      },
      {
        id: 'media-blur-loading',
        title: { en: 'Progressive Image Pipeline', pt: 'Pipeline de Imagem Progressiva' },
        description: { en: 'Maximizing perceived performance with blur-up UX.', pt: 'Maximizando performance percebida com UX blur-up.' },
        type: 'component',
        category: 'utilities',
        demo: <LazyImageOverlay />
      }
    ]
  }
];
