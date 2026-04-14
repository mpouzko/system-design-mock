import type { DiagramNodeType } from '../types';
import type { ReactNode } from 'react';

export type TechOption = {
  id: string;
  name: string;
  icon: ReactNode;
};

// Simple colored letter/symbol icons for each tech
function LetterIcon({ letter, bg, fg = 'white' }: { letter: string; bg: string; fg?: string }) {
  return (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <rect width="20" height="20" rx="4" fill={bg} />
      <text x="10" y="14.5" textAnchor="middle" fontSize="11" fontWeight="bold" fill={fg} fontFamily="system-ui">
        {letter}
      </text>
    </svg>
  );
}

function CircleIcon({ letter, bg, fg = 'white' }: { letter: string; bg: string; fg?: string }) {
  return (
    <svg viewBox="0 0 20 20" className="w-full h-full">
      <circle cx="10" cy="10" r="9" fill={bg} />
      <text x="10" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill={fg} fontFamily="system-ui">
        {letter}
      </text>
    </svg>
  );
}

const serviceOptions: TechOption[] = [
  { id: 'nodejs', name: 'Node.js', icon: <LetterIcon letter="N" bg="#339933" /> },
  { id: 'express', name: 'Express', icon: <LetterIcon letter="Ex" bg="#333333" /> },
  { id: 'spring', name: 'Spring Boot', icon: <CircleIcon letter="S" bg="#6DB33F" /> },
  { id: 'django', name: 'Django', icon: <LetterIcon letter="Dj" bg="#092E20" /> },
  { id: 'go', name: 'Go', icon: <LetterIcon letter="Go" bg="#00ADD8" /> },
  { id: 'dotnet', name: '.NET', icon: <LetterIcon letter=".N" bg="#512BD4" /> },
  { id: 'fastapi', name: 'FastAPI', icon: <LetterIcon letter="FA" bg="#009688" /> },
  { id: 'rails', name: 'Ruby on Rails', icon: <LetterIcon letter="R" bg="#CC0000" /> },
];

const databaseOptions: TechOption[] = [
  { id: 'postgresql', name: 'PostgreSQL', icon: <CircleIcon letter="P" bg="#336791" /> },
  { id: 'mysql', name: 'MySQL', icon: <CircleIcon letter="M" bg="#4479A1" /> },
  { id: 'mongodb', name: 'MongoDB', icon: <LetterIcon letter="M" bg="#47A248" /> },
  { id: 'dynamodb', name: 'DynamoDB', icon: <LetterIcon letter="D" bg="#4053D6" /> },
  { id: 'redis-db', name: 'Redis', icon: <LetterIcon letter="R" bg="#DC382D" /> },
  { id: 'sqlite', name: 'SQLite', icon: <LetterIcon letter="SL" bg="#003B57" /> },
  { id: 'cassandra', name: 'Cassandra', icon: <CircleIcon letter="C" bg="#1287B1" /> },
];

const queueOptions: TechOption[] = [
  { id: 'kafka', name: 'Kafka', icon: <LetterIcon letter="K" bg="#231F20" /> },
  { id: 'rabbitmq', name: 'RabbitMQ', icon: <LetterIcon letter="RQ" bg="#FF6600" /> },
  { id: 'sqs', name: 'AWS SQS', icon: <LetterIcon letter="SQ" bg="#FF9900" /> },
  { id: 'nats', name: 'NATS', icon: <LetterIcon letter="N" bg="#27AAE1" /> },
  { id: 'pubsub', name: 'Pub/Sub', icon: <LetterIcon letter="PS" bg="#4285F4" /> },
];

const loadBalancerOptions: TechOption[] = [
  { id: 'nginx', name: 'Nginx', icon: <LetterIcon letter="Nx" bg="#009639" /> },
  { id: 'haproxy', name: 'HAProxy', icon: <LetterIcon letter="HA" bg="#106DA4" /> },
  { id: 'alb', name: 'AWS ALB', icon: <LetterIcon letter="AL" bg="#FF9900" /> },
  { id: 'traefik', name: 'Traefik', icon: <LetterIcon letter="Tk" bg="#24A1C1" /> },
  { id: 'envoy', name: 'Envoy', icon: <CircleIcon letter="E" bg="#AC6199" /> },
];

const cacheOptions: TechOption[] = [
  { id: 'redis', name: 'Redis', icon: <LetterIcon letter="R" bg="#DC382D" /> },
  { id: 'memcached', name: 'Memcached', icon: <LetterIcon letter="Mc" bg="#1D8A43" /> },
  { id: 'varnish', name: 'Varnish', icon: <LetterIcon letter="V" bg="#59A4CE" /> },
  { id: 'cloudfront', name: 'CloudFront', icon: <LetterIcon letter="CF" bg="#8C4FFF" /> },
];

const cloudOptions: TechOption[] = [
  { id: 'aws', name: 'AWS', icon: <LetterIcon letter="A" bg="#FF9900" fg="#232F3E" /> },
  { id: 'gcp', name: 'GCP', icon: <LetterIcon letter="G" bg="#4285F4" /> },
  { id: 'azure', name: 'Azure', icon: <LetterIcon letter="Az" bg="#0078D4" /> },
  { id: 'cloudflare', name: 'Cloudflare', icon: <LetterIcon letter="CF" bg="#F38020" /> },
  { id: 'vercel', name: 'Vercel', icon: <LetterIcon letter="V" bg="#000000" /> },
  { id: 'netlify', name: 'Netlify', icon: <LetterIcon letter="N" bg="#00C7B7" fg="#000" /> },
];

const userOptions: TechOption[] = [
  { id: 'browser', name: 'Browser', icon: <CircleIcon letter="W" bg="#4285F4" /> },
  { id: 'mobile', name: 'Mobile', icon: <LetterIcon letter="M" bg="#A4C639" /> },
  { id: 'desktop', name: 'Desktop', icon: <LetterIcon letter="D" bg="#6B7280" /> },
  { id: 'cli', name: 'CLI', icon: <LetterIcon letter=">_" bg="#1E293B" /> },
];

const environmentOptions: TechOption[] = [
  { id: 'kubernetes', name: 'Kubernetes', icon: <CircleIcon letter="K8" bg="#326CE5" /> },
  { id: 'docker', name: 'Docker', icon: <LetterIcon letter="Dk" bg="#2496ED" /> },
  { id: 'linux', name: 'Linux', icon: <CircleIcon letter="Lx" bg="#FCC624" fg="#333" /> },
  { id: 'terraform', name: 'Terraform', icon: <LetterIcon letter="Tf" bg="#7B42BC" /> },
  { id: 'rancher', name: 'Rancher', icon: <LetterIcon letter="Rn" bg="#0075A8" /> },
  { id: 'ecs', name: 'AWS ECS', icon: <LetterIcon letter="EC" bg="#FF9900" /> },
  { id: 'nomad', name: 'Nomad', icon: <LetterIcon letter="Nm" bg="#00CA8E" /> },
  { id: 'podman', name: 'Podman', icon: <CircleIcon letter="Pm" bg="#892CA0" /> },
];

const engineOptions: TechOption[] = [
  { id: 'nodejs', name: 'Node.js', icon: <LetterIcon letter="Nd" bg="#339933" /> },
  { id: 'deno', name: 'Deno', icon: <LetterIcon letter="Dn" bg="#000000" /> },
  { id: 'bun', name: 'Bun', icon: <CircleIcon letter="Bn" bg="#fbf0df" fg="#000" /> },
  { id: 'python', name: 'Python', icon: <LetterIcon letter="Py" bg="#3776AB" /> },
  { id: 'go', name: 'Go', icon: <LetterIcon letter="Go" bg="#00ADD8" /> },
  { id: 'java', name: 'Java', icon: <LetterIcon letter="Jv" bg="#ED8B00" /> },
  { id: 'dotnet', name: '.NET', icon: <LetterIcon letter=".N" bg="#512BD4" /> },
  { id: 'rust', name: 'Rust', icon: <LetterIcon letter="Rs" bg="#CE422B" /> },
  { id: 'php', name: 'PHP', icon: <CircleIcon letter="Ph" bg="#777BB4" /> },
  { id: 'ruby', name: 'Ruby', icon: <CircleIcon letter="Rb" bg="#CC342D" /> },
];

const aiOptions: TechOption[] = [
  { id: 'openai', name: 'OpenAI / GPT', icon: <CircleIcon letter="OA" bg="#412991" /> },
  { id: 'claude', name: 'Claude', icon: <LetterIcon letter="Cl" bg="#D97757" /> },
  { id: 'gemini', name: 'Gemini', icon: <CircleIcon letter="Gm" bg="#4285F4" /> },
  { id: 'llama', name: 'Llama', icon: <LetterIcon letter="Ll" bg="#0467DF" /> },
  { id: 'mistral', name: 'Mistral', icon: <LetterIcon letter="Ms" bg="#F7D046" fg="#000" /> },
  { id: 'qwen', name: 'Qwen', icon: <LetterIcon letter="Qw" bg="#6F42C1" /> },
  { id: 'deepseek', name: 'DeepSeek', icon: <LetterIcon letter="DS" bg="#4D6BFE" /> },
  { id: 'codex', name: 'Codex', icon: <LetterIcon letter="Cx" bg="#10A37F" /> },
  { id: 'cohere', name: 'Cohere', icon: <LetterIcon letter="Co" bg="#39594D" /> },
  { id: 'huggingface', name: 'Hugging Face', icon: <LetterIcon letter="HF" bg="#FFD21E" fg="#000" /> },
  { id: 'replicate', name: 'Replicate', icon: <LetterIcon letter="Rp" bg="#262626" /> },
  { id: 'stability', name: 'Stability AI', icon: <LetterIcon letter="St" bg="#7C3AED" /> },
];

const bundlerOptions: TechOption[] = [
  { id: 'webpack', name: 'Webpack', icon: <LetterIcon letter="Wp" bg="#8DD6F9" fg="#1a1a1a" /> },
  { id: 'vite', name: 'Vite', icon: <LetterIcon letter="Vi" bg="#646CFF" /> },
  { id: 'parcel', name: 'Parcel', icon: <LetterIcon letter="Pc" bg="#E6A520" /> },
  { id: 'rollup', name: 'Rollup', icon: <CircleIcon letter="Ru" bg="#EC4A3F" /> },
  { id: 'esbuild', name: 'esbuild', icon: <LetterIcon letter="Es" bg="#FFCF00" fg="#000" /> },
  { id: 'turbopack', name: 'Turbopack', icon: <LetterIcon letter="Tp" bg="#EF4444" /> },
  { id: 'swc', name: 'SWC', icon: <LetterIcon letter="SW" bg="#F8C457" fg="#000" /> },
  { id: 'rspack', name: 'Rspack', icon: <LetterIcon letter="Rs" bg="#FF6633" /> },
  { id: 'gulp', name: 'Gulp', icon: <LetterIcon letter="Gp" bg="#CF4647" /> },
  { id: 'nx', name: 'Nx', icon: <LetterIcon letter="Nx" bg="#143055" /> },
];

const uiFrameworkOptions: TechOption[] = [
  { id: 'react', name: 'React', icon: <CircleIcon letter="Re" bg="#61DAFB" fg="#000" /> },
  { id: 'angular', name: 'Angular', icon: <LetterIcon letter="Ng" bg="#DD0031" /> },
  { id: 'vue', name: 'Vue', icon: <LetterIcon letter="Vu" bg="#4FC08D" /> },
  { id: 'svelte', name: 'Svelte', icon: <LetterIcon letter="Sv" bg="#FF3E00" /> },
  { id: 'solid', name: 'Solid', icon: <LetterIcon letter="So" bg="#2C4F7C" /> },
  { id: 'preact', name: 'Preact', icon: <CircleIcon letter="Pr" bg="#673AB8" /> },
  { id: 'htmx', name: 'HTMX', icon: <LetterIcon letter="Hx" bg="#3366CC" /> },
  { id: 'lit', name: 'Lit', icon: <LetterIcon letter="Lt" bg="#324FFF" /> },
  { id: 'qwik', name: 'Qwik', icon: <LetterIcon letter="Qk" bg="#18B6F6" /> },
  { id: 'ember', name: 'Ember', icon: <LetterIcon letter="Em" bg="#E04E39" /> },
];

const serverFrameworkOptions: TechOption[] = [
  { id: 'nextjs', name: 'Next.js', icon: <LetterIcon letter="Nx" bg="#000000" /> },
  { id: 'nestjs', name: 'NestJS', icon: <LetterIcon letter="Ns" bg="#E0234E" /> },
  { id: 'nuxt', name: 'Nuxt', icon: <LetterIcon letter="Nu" bg="#00DC82" fg="#000" /> },
  { id: 'express', name: 'Express', icon: <LetterIcon letter="Ex" bg="#333333" /> },
  { id: 'fastify', name: 'Fastify', icon: <LetterIcon letter="Fy" bg="#000000" /> },
  { id: 'adonis', name: 'AdonisJS', icon: <LetterIcon letter="Ad" bg="#5A45FF" /> },
  { id: 'remix', name: 'Remix', icon: <LetterIcon letter="Rm" bg="#121212" /> },
  { id: 'astro', name: 'Astro', icon: <LetterIcon letter="As" bg="#BC52EE" /> },
  { id: 'hono', name: 'Hono', icon: <CircleIcon letter="Ho" bg="#FF5B11" /> },
  { id: 'koa', name: 'Koa', icon: <CircleIcon letter="Ko" bg="#33333D" /> },
  { id: 'sveltekit', name: 'SvelteKit', icon: <LetterIcon letter="SK" bg="#FF3E00" /> },
];

const stateManagementOptions: TechOption[] = [
  { id: 'redux', name: 'Redux', icon: <LetterIcon letter="Rx" bg="#764ABC" /> },
  { id: 'mobx', name: 'MobX', icon: <LetterIcon letter="Mx" bg="#FF9955" /> },
  { id: 'zustand', name: 'Zustand', icon: <LetterIcon letter="Zu" bg="#453F39" /> },
  { id: 'ngrx', name: 'NgRx', icon: <LetterIcon letter="NR" bg="#BA2BD2" /> },
  { id: 'pinia', name: 'Pinia', icon: <LetterIcon letter="Pi" bg="#FFD859" fg="#000" /> },
  { id: 'jotai', name: 'Jotai', icon: <CircleIcon letter="Jo" bg="#000000" /> },
  { id: 'recoil', name: 'Recoil', icon: <LetterIcon letter="Rc" bg="#3578E5" /> },
  { id: 'xstate', name: 'XState', icon: <LetterIcon letter="Xs" bg="#2C3E50" /> },
  { id: 'tanstack', name: 'TanStack Query', icon: <LetterIcon letter="TQ" bg="#FF4154" /> },
  { id: 'signals', name: 'Signals', icon: <CircleIcon letter="Sg" bg="#4FC08D" /> },
];

const uiToolkitOptions: TechOption[] = [
  { id: 'tailwind', name: 'Tailwind CSS', icon: <LetterIcon letter="Tw" bg="#06B6D4" /> },
  { id: 'mui', name: 'Material UI', icon: <LetterIcon letter="MU" bg="#007FFF" /> },
  { id: 'antd', name: 'Ant Design', icon: <LetterIcon letter="An" bg="#1677FF" /> },
  { id: 'bootstrap', name: 'Bootstrap', icon: <LetterIcon letter="Bs" bg="#7952B3" /> },
  { id: 'chakra', name: 'Chakra UI', icon: <CircleIcon letter="Ch" bg="#319795" /> },
  { id: 'shadcn', name: 'shadcn/ui', icon: <LetterIcon letter="Sh" bg="#000000" /> },
  { id: 'radix', name: 'Radix', icon: <LetterIcon letter="Rd" bg="#1B1B1F" /> },
  { id: 'headless', name: 'Headless UI', icon: <LetterIcon letter="Hl" bg="#66E3FF" fg="#000" /> },
  { id: 'primeng', name: 'PrimeNG', icon: <LetterIcon letter="Pg" bg="#DD0031" /> },
  { id: 'vuetify', name: 'Vuetify', icon: <LetterIcon letter="Vy" bg="#1867C0" /> },
];

const cssOptions: TechOption[] = [
  { id: 'sass', name: 'Sass', icon: <LetterIcon letter="Sa" bg="#CC6699" /> },
  { id: 'scss', name: 'SCSS', icon: <LetterIcon letter="Sc" bg="#CF649A" /> },
  { id: 'less', name: 'Less', icon: <LetterIcon letter="Le" bg="#1D365D" /> },
  { id: 'postcss', name: 'PostCSS', icon: <LetterIcon letter="Pc" bg="#DD3A0A" /> },
  { id: 'stylus', name: 'Stylus', icon: <LetterIcon letter="St" bg="#333333" /> },
  { id: 'css-modules', name: 'CSS Modules', icon: <LetterIcon letter="CM" bg="#000000" /> },
  { id: 'styled', name: 'Styled Comp.', icon: <LetterIcon letter="SC" bg="#DB7093" /> },
  { id: 'emotion', name: 'Emotion', icon: <CircleIcon letter="Em" bg="#D36AC2" /> },
  { id: 'vanilla-extract', name: 'Vanilla Extract', icon: <LetterIcon letter="VE" bg="#99F5FF" fg="#000" /> },
  { id: 'linaria', name: 'Linaria', icon: <LetterIcon letter="Li" bg="#DE2D68" /> },
];

const ormOptions: TechOption[] = [
  { id: 'prisma', name: 'Prisma', icon: <LetterIcon letter="Pr" bg="#2D3748" /> },
  { id: 'typeorm', name: 'TypeORM', icon: <LetterIcon letter="TO" bg="#FE0902" /> },
  { id: 'sequelize', name: 'Sequelize', icon: <LetterIcon letter="Sq" bg="#52B0E7" /> },
  { id: 'mongoose', name: 'Mongoose', icon: <LetterIcon letter="Mg" bg="#880000" /> },
  { id: 'mikroorm', name: 'MikroORM', icon: <LetterIcon letter="Mi" bg="#0F2B46" /> },
  { id: 'drizzle', name: 'Drizzle', icon: <LetterIcon letter="Dr" bg="#C5F74F" fg="#000" /> },
  { id: 'knex', name: 'Knex.js', icon: <LetterIcon letter="Kx" bg="#E16426" /> },
  { id: 'hibernate', name: 'Hibernate', icon: <LetterIcon letter="Hb" bg="#59666C" /> },
  { id: 'sqlalchemy', name: 'SQLAlchemy', icon: <LetterIcon letter="SA" bg="#D71F00" /> },
  { id: 'django-orm', name: 'Django ORM', icon: <LetterIcon letter="Dj" bg="#092E20" /> },
  { id: 'gorm', name: 'GORM', icon: <LetterIcon letter="Gm" bg="#00ADD8" /> },
  { id: 'objection', name: 'Objection.js', icon: <LetterIcon letter="Ob" bg="#FF6F00" /> },
];

export const techOptions: Record<DiagramNodeType, TechOption[]> = {
  service: serviceOptions,
  database: databaseOptions,
  queue: queueOptions,
  loadBalancer: loadBalancerOptions,
  cache: cacheOptions,
  cloud: cloudOptions,
  user: userOptions,
  environment: environmentOptions,
  engine: engineOptions,
  ai: aiOptions,
  bundler: bundlerOptions,
  uiFramework: uiFrameworkOptions,
  serverFramework: serverFrameworkOptions,
  stateManagement: stateManagementOptions,
  uiToolkit: uiToolkitOptions,
  css: cssOptions,
  orm: ormOptions,
  otherSoftware: [],
  text: [],
  rectangle: [],
  arrow: [],
  image: [],
};

export function getTechOption(nodeType: DiagramNodeType, techId: string): TechOption | undefined {
  return techOptions[nodeType]?.find((t) => t.id === techId);
}
