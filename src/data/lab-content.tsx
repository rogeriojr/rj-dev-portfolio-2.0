import { ReactNode } from 'react';
import { ApiRequestSimulator } from '../components/Lab/demos/ApiRequestSimulator';
import { TokenStreamVisualizer } from '../components/Lab/demos/TokenStreamVisualizer';
import { InteractiveCalendar } from '../components/Lab/demos/InteractiveCalendar';
import { CurrencyConverter } from '../components/Lab/demos/CurrencyConverter';
import { LazyImageOverlay } from '../components/Lab/demos/LazyImageOverlay';
import { TouchGestureSandbox } from '../components/Lab/demos/TouchGestureSandbox';
import { CosmicDashboard } from '../components/Lab/demos/CosmicDashboard';

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
  type: 'component' | 'hook' | 'pattern' | 'architecture' | 'utility' | 'infra' | 'security';
  category: 'system' | 'frontend' | 'backend' | 'ai' | 'mobile' | 'utilities' | 'architecture' | 'devops' | 'security' | 'data';
  code?: string;
  demo?: ReactNode;
  mermaid?: string;
}

export interface LabCategory {
  id: 'system' | 'frontend' | 'backend' | 'ai' | 'mobile' | 'utilities' | 'architecture' | 'devops' | 'security' | 'data';
  title: LocalizedString;
  icon: string;
  items: LabItem[];
}

export const LAB_CONTENT: LabCategory[] = [
  {
    id: 'architecture',
    title: { en: 'Architecture & Design', pt: 'Arquitetura e Design' },
    icon: '🏛️',
    items: [
      {
        id: 'solid-principles',
        title: { en: 'SOLID Principles Masterclass', pt: 'Masterclass de Princípios SOLID' },
        description: {
          en: 'Applying clean code principles to build hyper-scalable and testable frontend/backend systems.',
          pt: 'Aplicando princípios de código limpo para construir sistemas frontend/backend hiper-escaláveis e testáveis.'
        },
        type: 'architecture',
        category: 'architecture',
        seniorTips: [
          { en: "Favor 'Composition' over 'Inheritance' to stay flexible.", pt: "Favoreça 'Composição' sobre 'Herança' para manter a flexibilidade." },
          { en: "Invert dependencies at the architectural boundary.", pt: "Inverta dependências no limite arquitetural." }
        ],
        mermaid: `graph TD
          App[Application Core] --> |Interfaces| ServicePorts[Service Ports]
          ServicePorts --> |Implementation| API[REST/GraphQL Adapters]
          ServicePorts --> |Implementation| Storage[Database Adapters]`,
        code: `// DIP Handler
interface IStorage { save(data: any): void }
class DataHandler {
  constructor(private storage: IStorage) {}
  execute(data) { this.storage.save(data) }
}`
      },
      {
        id: 'cqrs-pattern',
        title: { en: 'CQRS & Data Segregation', pt: 'CQRS e Segregação de Dados' },
        description: { en: 'Separating read and write operations for high-scale performance.', pt: 'Separando operações de leitura e escrita para performance de alta escala.' },
        type: 'architecture',
        category: 'architecture',
        mermaid: `graph TD
          UI[Client] -->|Commands| W[Write Model]
          W -->|Events| R[Read Model]
          UI -->|Queries| R`,
        code: `// Command Side
async handle(cmd: CreateOrder) {
  const order = new Order(cmd.data);
  await this.repo.save(order);
}`
      }
    ]
  },
  {
    id: 'devops',
    title: { en: 'Infra & DevOps', pt: 'Infra e DevOps' },
    icon: '☸️',
    items: [
      {
        id: 'k8s-topology',
        title: { en: 'Kubernetes Cluster Topology', pt: 'Topologia de Cluster K8s' },
        description: { en: 'Visualizing pod orchestration and control plane communication.', pt: 'Visualizando orquestração de pods e comunicação do control plane.' },
        type: 'infra',
        category: 'devops',
        seniorTips: [
          { en: "Use Helm for managing complex manifest releases.", pt: "Use Helm para gerenciar releases de manifestos complexos." },
          { en: "Always set resource limits (CPU/MEM) to prevent 'noisy neighbor' syndrome.", pt: "Sempre defina limites de recursos (CPU/MEM) para evitar a síndrome do 'vizinho barulhento'." }
        ],
        mermaid: `graph TD
          Control[Control Plane] -->|Manage| W1[Worker Node 1]
          Control -->|Manage| W2[Worker Node 2]
          W1 -->|Pods| P1[App Pod]
          W1 -->|Pods| P2[Sidecar]
          LB[Global Load Balancer] --> Ingress[Ingress Controller]
          Ingress --> Service[ClusterIP Service]
          Service --> P1`,
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: cosmic-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api`
      }
    ]
  },
  {
    id: 'security',
    title: { en: 'Cybersecurity', pt: 'Cibersegurança' },
    icon: '🛡️',
    items: [
      {
        id: 'oauth2-pkce',
        title: { en: 'OAuth2 + PKCE Flow', pt: 'Fluxo OAuth2 + PKCE' },
        description: { en: 'Modern authentication standard for single-page applications and mobile.', pt: 'Padrão de autenticação moderno para SPAs e mobile.' },
        type: 'security',
        category: 'security',
        seniorTips: [
          { en: "Never store JWTs in LocalStorage; use HttpOnly Secure cookies to prevent XSS.", pt: "Nunca armazene JWTs no LocalStorage; use cookies HttpOnly Secure para evitar XSS." },
          { en: "PKCE is mandatory even for public clients to prevent code interception attacks.", pt: "PKCE é obrigatório mesmo para clientes públicos para evitar ataques de interceptação de código." }
        ],
        mermaid: `sequenceDiagram
          User->>Client: Login Click
          Client->>Auth: Auth Request + Code Challenge
          Auth-->>User: Logic Screen
          User->>Auth: Credentials
          Auth->>Client: Auth Code
          Client->>Auth: Code + Code Verifier
          Auth-->>Client: ID Token + Access Token`,
        code: `// Generate Code Challenge (Web Crypto)
const verifier = generateRandomString();
const challenge = await sha256(verifier);`
      }
    ]
  },
  {
    id: 'data',
    title: { en: 'Data Engineering', pt: 'Engenharia de Dados' },
    icon: '💾',
    items: [
      {
        id: 'medallion-arch',
        title: { en: 'Medallion Data Lakehouse', pt: 'Data Lakehouse Medalhão' },
        description: { en: 'Organizing data quality from raw ingestion to business-ready tables.', pt: 'Organizando a qualidade dos dados desde a ingestão bruta até tabelas prontas para negócios.' },
        type: 'architecture',
        category: 'data',
        seniorTips: [
          { en: "Bronze layer should be immutable; never data-wipe the source of truth.", pt: "A camada Bronze deve ser imutável; nunca apague a fonte da verdade." },
          { en: "Enforce schema validation at the Silver layer to prevent data garbage in Gold.", pt: "Force a validação de schema na camada Silver para evitar lixo de dados na Gold." }
        ],
        mermaid: `graph LR
          Src[Sources] -->|Ingestion| Bronze[Bronze: Raw Data]
          Bronze -->|Cleansing| Silver[Silver: Validated Data]
          Silver -->|Aggregation| Gold[Gold: Business KPIs]
          Gold -->|Analysis| BI[BI Dashboard]`,
        code: `SELECT 
  customer_id, 
  SUM(order_value) as lifetime_value
FROM silver_orders
GROUP BY customer_id`
      }
    ]
  },
  {
    id: 'ai',
    title: { en: 'AI Orchestration', pt: 'Orquestração de IA' },
    icon: '🧠',
    items: [
      {
        id: 'agentic-loops',
        title: { en: 'Self-Correcting Agentic Loops', pt: 'Loops Agênticos Self-Correcting' },
        description: { en: 'Advanced AI chains where agents review and fix their own outputs.', pt: 'Cadeias de IA avançadas onde agentes revisam e corrigem seus próprios resultados.' },
        type: 'architecture',
        category: 'ai',
        demo: <TokenStreamVisualizer />,
        mermaid: `graph TD
          Q[Query] --> P[Planner]
          P --> E[Executor]
          E --> C[Critic]
          C -->|Error Found| E
          C -->|Validated| User[Response]`,
        code: `while (attempts < 3 && !isValid) {
  const result = await agent.run();
  isValid = await monitor.eval(result);
}`
      }
    ]
  },
  {
    id: 'frontend',
    title: { en: 'Frontend Mastery', pt: 'Maestria Frontend' },
    icon: '⚛️',
    items: [
      {
        id: 'rsc-boundary',
        title: { en: 'Server Components Boundary', pt: 'Limite de Server Components' },
        description: { en: 'Visualizing the React 19 server/client lifecycle.', pt: 'Visualizando o ciclo de vida server/client do React 19.' },
        type: 'architecture',
        category: 'frontend',
        seniorTips: [
          { en: "Keep large libraries in Server Components to reduce client bundle size (0kb JS).", pt: "Mantenha bibliotecas grandes em Server Components para reduzir o bundle do client (0kb JS)." },
          { en: "Use 'use client' only at the leaf nodes of your tree to maximize server-side work.", pt: "Use 'use client' apenas nos nós folha da sua árvore para maximizar o trabalho no servidor." }
        ],
        mermaid: `graph TD
          Server[Next.js Server] -->|Fetch Data| DB[(DB)]
          Server -->|Render RSC| HTML[Static HTML + RSC Payload]
          HTML -->|Stream| Browser[Client Browser]
          Browser -->|Hydrate| Island[Client Islands: 'use client']`,
        code: `// Server Component (RSC)
async function Page() {
  const data = await db.query(); // Direct DB access
  return <ClientList initial={data} />;
}`
      },
      {
        id: 'dashboard-sys',
        title: { en: 'SaaS Design System', pt: 'Design System SaaS' },
        description: { en: 'Premium dashboard logic with high-density Bento grids.', pt: 'Lógica de dashboard premium com bento grids de alta densidade.' },
        type: 'component',
        category: 'frontend',
        demo: <CosmicDashboard />
      }
    ]
  },
  {
    id: 'mobile',
    title: { en: 'Mobile Mechanics', pt: 'Mecânicas Mobile' },
    icon: '📱',
    items: [
      {
        id: 'jsi-sync',
        title: { en: 'Synchronous Bridge (JSI)', pt: 'Bridge Síncrona (JSI)' },
        description: { en: 'Bypassing the async serialize/deserialize bottleneck in React Native.', pt: 'Contornando o gargalo de serialização assíncrona no React Native.' },
        type: 'architecture',
        category: 'mobile',
        seniorTips: [
          { en: "JSI allows C++ pointers to be shared with JS environment directly.", pt: "O JSI permite que ponteiros C++ sejam compartilhados diretamente com o ambiente JS." }
        ],
        mermaid: `graph LR
          JS[JS Thread] <-->|Shared Memory| JSI[C++ Layer]
          JSI <-->|Direct Call| Native[iOS/Android Runtime]`,
        demo: <TouchGestureSandbox />
      },
      {
        id: 'lazy-overlay',
        title: { en: 'Progressive Image Loading', pt: 'Carregamento Progressivo' },
        description: { en: 'Blur-up technique for mobile low-bandwidth UX.', pt: 'Técnica blur-up para UX mobile em baixa largura de banda.' },
        type: 'component',
        category: 'mobile',
        demo: <LazyImageOverlay />
      }
    ]
  },
  {
    id: 'utilities',
    title: { en: 'Advanced Utilities', pt: 'Utilitários Avançados' },
    icon: '🛠️',
    items: [
      {
        id: 'perf-cal',
        title: { en: 'Performance Calendar', pt: 'Calendário de Performance' },
        description: { en: 'Infinite scrolling date engine with zero re-renders.', pt: 'Motor de datas com scroll infinito e zero re-renders.' },
        type: 'utility',
        category: 'utilities',
        demo: <InteractiveCalendar />
      },
      {
        id: 'fx-engine',
        title: { en: 'Real-time FX Engine', pt: 'Motor FX em Tempo Real' },
        description: { en: 'Reactive currency conversion with slippage simulation.', pt: 'Conversão de moeda reativa com simulação de slippage.' },
        type: 'utility',
        category: 'utilities',
        demo: <CurrencyConverter />
      },
      {
        id: 'api-sim',
        title: { en: 'Network Simulator', pt: 'Simulador de Rede' },
        description: { en: 'Visualizing TCP/UDP and API lifecycle steps.', pt: 'Visualizando steps do ciclo de vida de TCP/UDP e API.' },
        type: 'architecture',
        category: 'utilities',
        demo: <ApiRequestSimulator />
      }
    ]
  }
];
