export const sectionMarquees = [
  {
    items: ['LangChain', 'FastAPI', 'Claude API', 'LangGraph', 'pgvector', 'RAG Systems', 'OpenAI GPT-4', 'Pinecone'],
    speed: 25,
    reverse: false,
  },
  {
    items: ['SHIP FAST', 'NO DEMO GRAVEYARD', 'RAG OVER FINE-TUNING', 'AURIUM AI IN PROD', 'OPEN TO WORK'],
    speed: 28,
    reverse: true,
  },
  {
    items: ['CLAUDE API', 'LANGGRAPH', 'PGVECTOR', 'MULTI-AGENT', 'PRODUCTION SAAS', 'BOTIQ AI'],
    speed: 32,
    reverse: false,
  },
];

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'personal', label: 'Personal SaaS' },
  { id: '7span', label: '7Span' },
  { id: 'archived', label: 'Archived' },
];

export const projects = [
  {
    title: 'DocWise',
    category: 'personal',
    type: 'Personal SaaS',
    status: 'live',
    desc: 'Multi-document AI workspace with RAG, Claude, Pinecone, and multi-tenant auth.',
    shortTags: ['RAG', 'Claude', 'Pinecone', 'Next.js'],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/DocWise' },
  },
  {
    title: 'BOTIQ AI',
    category: 'personal',
    type: 'WhatsApp SaaS',
    status: 'live',
    desc: 'WhatsApp Business SaaS with menu bot, lead pipeline, and Razorpay billing.',
    shortTags: ['WhatsApp', 'FastAPI', 'Razorpay'],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/Whatsapp-Bot' },
  },
  {
    title: 'Aurium AI',
    category: 'personal',
    type: 'Personal SaaS',
    status: 'in-dev',
    desc: 'Australian tax SaaS with citation-verified RAG, LangGraph, and pgvector.',
    shortTags: ['SaaS', 'LangGraph', 'FastAPI'],
    links: {},
  },
  {
    title: 'DocMind',
    category: 'personal',
    type: 'Personal SaaS',
    status: 'in-dev',
    desc: 'BYOK document Q&A using Ragie.ai, FastAPI, and semantic search.',
    shortTags: ['RAG', 'BYOK', 'FastAPI'],
    links: {},
  },
  {
    title: 'HIRE Framework',
    category: 'personal',
    type: 'Personal SaaS',
    status: 'in-dev',
    desc: 'AI recruiter evaluation with n8n workflows and LangChain scoring.',
    shortTags: ['n8n', 'LangChain', 'Agents'],
    links: {},
  },
  {
    title: 'Resume Chatbot',
    category: '7span',
    type: '7Span',
    status: 'nda',
    desc: 'Multi-agent LangGraph resume assistant with FastAPI and specialized sub-agents.',
    shortTags: ['LangGraph', 'FastAPI', 'NLP'],
    links: {},
  },
  {
    title: 'Denny Solution',
    category: '7span',
    type: '7Span',
    status: 'nda',
    desc: 'RAG platform with two-stage retrieval and re-ranking using Streamlit and Ragie.ai.',
    shortTags: ['RAG', 'Ragie.ai', 'Streamlit'],
    links: {},
  },
];

export const skillCapabilities = [
  {
    title: 'AI & Machine Learning',
    items: [
      { name: 'LangChain', level: 80 },
      { name: 'RAG Systems', level: 80 },
      { name: 'LangGraph', level: 60 },
      { name: 'Prompt Engineering', level: 75 },
    ],
  },
  {
    title: 'LLM Orchestration',
    items: [
      { name: 'Multi-Agent Systems', level: 70 },
      { name: 'LangSmith', level: 55 },
      { name: 'n8n Automation', level: 65 },
      { name: 'Vector Pipelines', level: 75 },
    ],
  },
  {
    title: 'Infrastructure & Databases',
    items: [
      { name: 'pgvector', level: 65 },
      { name: 'Qdrant', level: 60 },
      { name: 'Pinecone', level: 65 },
      { name: 'PostgreSQL', level: 70 },
    ],
  },
  {
    title: 'LLM Providers & APIs',
    items: [
      { name: 'Claude API', level: 80 },
      { name: 'OpenAI API', level: 75 },
      { name: 'Ragie.ai', level: 65 },
      { name: 'Embeddings APIs', level: 70 },
    ],
  },
  {
    title: 'Programming Languages',
    items: [
      { name: 'Python', level: 90 },
      { name: 'TypeScript', level: 55 },
      { name: 'SQL', level: 70 },
      { name: 'JavaScript', level: 65 },
    ],
  },
  {
    title: 'Dev Tools',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 70 },
      { name: 'VS Code', level: 90 },
      { name: 'Vercel / AWS', level: 65 },
    ],
  },
];

export const courses = [
  {
    id: 'distinction-ml',
    name: 'AI & Machine Learning',
    platform: 'Distinction',
    status: 'Completed',
    certUrl: 'https://distinction.app/courses/7f3bd25b-5efd-4aa3-a2c8-5e21b666676a',
    summary:
      'Covers supervised learning, model evaluation, feature engineering, and practical ML workflows for real-world datasets.',
    nextSteps: 'Deepen into LLM fine-tuning, RAG evaluation metrics, and MLOps with FastAPI deployments.',
  },
  {
    id: 'aws-ai',
    name: 'AWS Certified AI Practitioner',
    platform: 'AWS / Skill Builder',
    status: 'Completed',
    certUrl: 'https://www.credly.com/badges/83350457-f130-4255-9f55-73f12cde7d52/public_url',
    summary:
      'Foundational AWS AI services, responsible AI, generative AI concepts, and cloud-native ML deployment patterns.',
    nextSteps: 'Explore SageMaker pipelines, Bedrock integrations, and production monitoring on AWS.',
  },
];

export const siteConfig = {
  email: 'khachariyatrusha@gmail.com',
  resumePath: 'assets/Trusha_Khachariya.pdf',
  siteUrl: 'https://portfolio-seven-phi-zyohdnoii5.vercel.app',
  distinctionUrl: 'https://distinction.app/courses/7f3bd25b-5efd-4aa3-a2c8-5e21b666676a',
};
