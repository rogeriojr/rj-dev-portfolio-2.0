import { ReactNode } from 'react';
import { HolographicCard } from '../components/Lab/demos/HolographicCard';
import { ApiRequestSimulator } from '../components/Lab/demos/ApiRequestSimulator';
import { TokenStreamVisualizer } from '../components/Lab/demos/TokenStreamVisualizer';
import { InteractiveCalendar } from '../components/Lab/demos/InteractiveCalendar';
import { CurrencyConverter } from '../components/Lab/demos/CurrencyConverter';
import { LazyImageOverlay } from '../components/Lab/demos/LazyImageOverlay';
import { TouchGestureSandbox } from '../components/Lab/demos/TouchGestureSandbox';
import { CosmicDashboard } from '../components/Lab/demos/CosmicDashboard';

export interface LabItem {
  id: string;
  title: string;
  description: string;
  problemStatement?: string;
  solution?: string;
  features?: string[];
  type: 'component' | 'hook' | 'pattern' | 'architecture' | 'utility';
  category: 'system' | 'frontend' | 'backend' | 'ai' | 'mobile' | 'utilities';
  code?: string;
  demo?: ReactNode;
}

export interface LabCategory {
  id: 'system' | 'frontend' | 'backend' | 'ai' | 'mobile' | 'utilities';
  title: string;
  icon: string;
  items: LabItem[];
}

export const LAB_CONTENT: LabCategory[] = [
  {
    id: 'system',
    title: 'System Design & Architecture',
    icon: '🏗️',
    items: [
      {
        id: 'mission-control',
        title: 'Mission Control Dashboard',
        description: 'High-density SaaS dashboard demonstrating complex layout composition and professional aesthetics.',
        problemStatement: 'Building complex B2B interfaces requires managing high information density without overwhelming the user or sacrificing visual harmony.',
        solution: 'Implemented a "Bento Grid" layout system using CSS Grid Areas. Leveraged atomic design to compose high-order organismos (Analytics, Access Control) with unified design tokens.',
        features: [
          'Responsive Bento/Masonry Grid',
          'High-Density UI Patterns',
          'Atomic Composition Strategy',
          'Advanced CSS Grid Area Mapping'
        ],
        type: 'component',
        category: 'system',
        demo: <CosmicDashboard />,
        code: `// Grid Area Layout Composition
<Grid
  templateAreas={{
    base: '"pay" "team" "analytics"',
    lg: '"pay team analytics"'
  }}
  templateColumns="1fr 1fr 350px"
  gap={6}
>
  <GridItem area="pay"><PaymentWidget /></GridItem>
  <GridItem area="team"><TeamAccessPanel /></GridItem>
  <GridItem area="analytics"><UsageMetrics /></GridItem>
</Grid>`
      },
      {
        id: 'clean-architecture',
        title: 'Clean Architecture (Onion)',
        description: 'Scalable Node.js server structure enforcing strict Separation of Concerns.',
        problemStatement: 'Tight coupling between business logic and infrastructure prevents testing and scaling.',
        solution: 'Adopted Clean Architecture. The "Domain" layer is pure; "Infrastructure" is injected via interfaces.',
        features: [
          'Layered Isolation',
          'DDD Entity Mapping',
          'Dependency Inversion (DIP)',
          'Framework Agnostic Logic'
        ],
        type: 'architecture',
        category: 'system',
        code: `// DOMAIN LAYER
export class User {
  constructor(public id: string, public email: string) {}
}

export interface IUserRepository {
  save(user: User): Promise<void>;
}

// USE CASE LAYER
export class CreateUserUseCase {
  constructor(private repo: IUserRepository) {}
  async execute(email: string) { ... }
}`
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: '🛡️',
    items: [
      {
        id: 'crud-factory',
        title: 'Generic CRUD Automation',
        description: 'Type-safe TypeScript Factory to eliminate controller/service boilerplate.',
        problemStatement: 'Repetitive CRUD logic for diverse entities leads to maintenance debt and human error.',
        solution: 'Built a Generic Factory using TypeScript generics and abstract base classes for automated REST operations.',
        features: [
          'T-Safe CRUD Generics',
          'Base Service/Controller Inheritance',
          'Automated Pagination Logic',
          'Extensible Hook System'
        ],
        type: 'pattern',
        category: 'backend',
        code: `export abstract class CrudService<T> {
  constructor(protected readonly repo: Repo<T>) {}
  async create(dto: T): Promise<T> { ... }
}`
      },
      {
        id: 'api-visualizer',
        title: 'Network Lifecycle Engine',
        description: 'Interactive visualization of async state and latency handling.',
        type: 'architecture',
        category: 'backend',
        demo: <ApiRequestSimulator />,
        code: `const run = async () => {
  setStep('handshake');
  await delay(800);
  setStatus('success');
};`
      }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Mastery',
    icon: '⚛️',
    items: [
      {
        id: 'holographic-card',
        title: 'Holographic 3D Surface',
        description: 'Premium UI interaction using Framer Motion 3D transforms.',
        problemStatement: 'Static UIs lack the premium, tactile feel required for high-end digital brands.',
        solution: 'Mapped mouse vectors to CSS perspective matrices. Added a reactive light-source glare layer.',
        features: [
          '3D Transform Interpolation',
          'Variable Light Vector Reflection',
          'Physics-based Motion Smoothing',
          'GPU Accelerated Interactions'
        ],
        type: 'component',
        category: 'frontend',
        demo: <HolographicCard />,
        code: `const rotX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
<motion.div style={{ rotateX: rotX }} />`
      },
      {
        id: 'token-viz',
        title: 'LLM Token Streamer',
        description: 'Visualizing deterministic vs probabilistic text generation in AI.',
        type: 'architecture',
        category: 'frontend',
        demo: <TokenStreamVisualizer />,
        code: `setInterval(() => {
  setTokens(t => [...t, next()]);
}, 50);`
      }
    ]
  },
  {
    id: 'utilities',
    title: 'Optimization & Finance',
    icon: '🛠️',
    items: [
      {
        id: 'calendar-engine',
        title: 'Dynamic Event Calendar',
        description: 'Zero-dependency date manipulation and grid generation engine.',
        problemStatement: 'Heavy libraries like Moment.js are overkill for simple calendar grids.',
        solution: 'Built a dynamic grid generator using native Date math and month-offset algorithms.',
        type: 'utility',
        category: 'utilities',
        demo: <InteractiveCalendar />,
        code: `const days = new Date(Y, M + 1, 0).getDate();`
      },
      {
        id: 'currency-converter',
        title: 'Real-time FX Engine',
        description: 'Reactive finance utility with simulated network latency and caching.',
        type: 'utility',
        category: 'utilities',
        demo: <CurrencyConverter />,
        code: `useEffect(() => {
  const rate = prices[to] / prices[from];
  setResult(val * rate);
}, [from, to]);`
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile & Performance',
    icon: '📱',
    items: [
      {
        id: 'gesture-sandbox',
        title: 'Touch Gesture Physics',
        description: 'High-performance pan/drag interactions for mobile contexts.',
        problemStatement: 'Mobile web gestures often feel "sticky" without proper inertia and boundary math.',
        solution: 'Implemented physics-based drag with elastic boundaries and momentum tracking.',
        type: 'component',
        category: 'mobile',
        demo: <TouchGestureSandbox />,
        code: `<motion.div drag dragElastic={0.2} />`
      },
      {
        id: 'lazy-image',
        title: 'Progressive Media Loading',
        description: 'Blur-up technique for optimizing LCP and visual stability.',
        problemStatement: 'Large high-res assets cause layout shifts (CLS) and slow down initial paint.',
        solution: 'Instant base64 placeholder → High-res lazy load → Graceful fade transition.',
        type: 'component',
        category: 'mobile',
        demo: <LazyImageOverlay />,
        code: `<Image src={H_RES} onLoad={() => setLoaded(true)} />`
      }
    ]
  }
];
