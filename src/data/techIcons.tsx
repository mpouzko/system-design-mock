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

export const techOptions: Record<DiagramNodeType, TechOption[]> = {
  service: serviceOptions,
  database: databaseOptions,
  queue: queueOptions,
  loadBalancer: loadBalancerOptions,
  cache: cacheOptions,
  cloud: cloudOptions,
  user: userOptions,
};

export function getTechOption(nodeType: DiagramNodeType, techId: string): TechOption | undefined {
  return techOptions[nodeType]?.find((t) => t.id === techId);
}
