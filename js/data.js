export const phrases = [
  'Building LLM-powered applications',
  'Designing RAG systems',
  'Developing AI agents with LangGraph',
  'Semantic search with vector DBs',
  'Production-ready NLP solutions',
];

export const skillCategories = [
  {
    title: 'AI / ML Core',
    icon: '🤖',
    items: ['LLMs & RAG', 'Machine Learning', 'NLP / Semantic Search', 'Prompt Engineering'],
  },
  {
    title: 'Orchestration',
    icon: '🔀',
    items: ['LangChain', 'LangGraph', 'LangSmith', 'n8n / Make.com'],
  },
  {
    title: 'Infra & Storage',
    icon: '🗄️',
    items: ['pgvector / Supabase', 'Qdrant / Pinecone', 'FastAPI / BullMQ', 'Next.js 14'],
  },
  {
    title: 'LLM APIs',
    icon: '⚡',
    items: ['Claude API (Sonnet)', 'OpenAI GPT-4', 'Ragie.ai', 'AWS'],
  },
  {
    title: 'Languages',
    icon: '🐍',
    items: ['Python', 'TypeScript', 'SQL', 'JavaScript'],
  },
];

export const tickerItems = [
  'Python', 'FastAPI', 'LangChain', 'LangGraph', 'RAG Systems',
  'LLM Agents', 'Claude API', 'Next.js', 'Qdrant', 'Pinecone',
  'pgvector', 'n8n', 'LangSmith', 'Ragie.ai', 'BullMQ', 'NLP',
];

export const currentlyBuilding = [
  { name: 'Aurium AI', detail: 'Australian Tax SaaS · Claude + LangGraph + RAG' },
  { name: 'BOTIQ AI', detail: 'WhatsApp SaaS · India SMB' },
  { name: 'DocMind', detail: 'BYOK Doc Q&A · Ragie.ai + FastAPI' },
];

export const terminalAgentLines = [
  { type: 'cmd', text: 'python run_agent.py --task "ATO tax research Q4"' },
  { type: 'info', text: '[INFO] Loading RAG pipeline...' },
  { type: 'info', text: '[INFO] Querying ATO vector store... (k=12)' },
  { type: 'info', text: '[INFO] Running citation verifier...' },
  { type: 'ok', text: '[✓] Matched s.8-1 ITAA 1997' },
  { type: 'ok', text: '[✓] Response generated — 1.24s latency' },
  { type: 'ok', text: '[✓] Confidence: 0.94' },
];

export const projects = [
  {
    num: '01',
    title: 'Aurium AI',
    source: 'Personal SaaS · Australian Tax Intelligence',
    status: 'in-dev',
    featured: true,
    desc: 'Australian Tax SaaS powered by Claude API, LangGraph multi-agent orchestration, and RAG over ATO legislation. Delivers citation-verified tax research, skill-layer routing, and production-grade compliance workflows for accountants and SMBs.',
    tags: [
      { icon: '🧬', label: 'Claude API' },
      { icon: '🔀', label: 'LangGraph' },
      { icon: '🤖', label: 'RAG' },
      { icon: '🚀', label: 'FastAPI' },
      { icon: '▲', label: 'Next.js' },
      { icon: '📌', label: 'Pinecone' },
    ],
    links: { muted: 'In Development' },
  },
  {
    num: '02',
    title: 'BOTIQ AI',
    source: 'Personal SaaS · WhatsApp for Indian SMBs',
    status: 'live',
    featured: false,
    desc: 'Multi-tenant WhatsApp Business SaaS for small businesses. Menu bot, FAQ engine, lead pipeline, broadcast campaigns, JWT auth, Razorpay billing, and FastAPI + Next.js full-stack architecture.',
    tags: [
      { icon: '▲', label: 'Next.js' },
      { icon: '🚀', label: 'FastAPI' },
      { icon: '🗄️', label: 'PostgreSQL' },
      { icon: '📬', label: 'Redis' },
      { icon: '💬', label: 'WhatsApp API' },
      { icon: '📘', label: 'TypeScript' },
    ],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/Whatsapp-Bot' },
  },
  {
    num: '03',
    title: 'DocMind',
    source: 'Personal SaaS · BYOK Document Q&A',
    status: 'in-dev',
    featured: false,
    desc: 'Bring-your-own-key document intelligence platform. Upload PDFs, query with RAG via Ragie.ai, semantic search, and FastAPI backend — designed for privacy-conscious teams who control their LLM keys.',
    tags: [
      { icon: '🚀', label: 'FastAPI' },
      { icon: '🐍', label: 'Python' },
      { icon: '📄', label: 'Ragie.ai' },
      { icon: '🤖', label: 'RAG' },
      { icon: '⚡', label: 'OpenAI API' },
    ],
    links: { muted: 'In Development' },
  },
  {
    num: '04',
    title: 'HIRE Framework™',
    source: 'Personal Project · AI Recruiter Evaluation',
    status: 'in-dev',
    featured: false,
    desc: 'AI recruiter evaluation system using n8n workflow automation and weighted scoring. Automates candidate screening, skill matching, and structured feedback for hiring pipelines.',
    tags: [
      { icon: '🔗', label: 'n8n' },
      { icon: '🤖', label: 'LLM Agents' },
      { icon: '⛓️', label: 'LangChain' },
      { icon: '🐍', label: 'Python' },
    ],
    links: { muted: 'In Development' },
  },
  {
    num: '05',
    title: 'DocWise',
    source: 'Personal SaaS',
    status: 'live',
    featured: false,
    desc: 'Secure multi-document AI workspace for teams. RAG over large libraries, verifiable citations, Claude chat, Pinecone search, BullMQ ingestion, multi-tenant auth, and usage-based billing.',
    tags: [
      { icon: '▲', label: 'Next.js' },
      { icon: '📘', label: 'TypeScript' },
      { icon: '🚀', label: 'Fastify' },
      { icon: '📌', label: 'Pinecone' },
      { icon: '🤖', label: 'RAG' },
      { icon: '🧬', label: 'Claude' },
    ],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/DocWise' },
  },
  {
    num: '06',
    title: 'Resume Chatbot',
    source: '7Span · AIML Developer · 3 months',
    status: 'archived',
    featured: false,
    desc: 'AI resume chatbot with FastAPI, LangGraph, and LangChain multi-agent architecture. OpenAI/Claude LLMs generate structured resume content via REST APIs and conversational workflows.',
    tags: [
      { icon: '🐍', label: 'Python' },
      { icon: '🚀', label: 'FastAPI' },
      { icon: '🔀', label: 'LangGraph' },
      { icon: '⛓️', label: 'LangChain' },
      { icon: '💬', label: 'NLP' },
    ],
    links: { muted: 'Private · NDA · 7Span' },
  },
  {
    num: '07',
    title: 'Denny Solution',
    source: '7Span · AIML Developer · 2 months',
    status: 'archived',
    featured: false,
    desc: 'RAG document intelligence platform with Streamlit. PDF ingestion, semantic search, and deep search V2 with two-stage retrieval and re-ranking using OpenAI and Ragie APIs.',
    tags: [
      { icon: '📊', label: 'Streamlit' },
      { icon: '🐍', label: 'Python' },
      { icon: '⚡', label: 'OpenAI API' },
      { icon: '🤖', label: 'RAG' },
      { icon: '📄', label: 'Ragie' },
    ],
    links: { muted: 'Private · NDA · 7Span' },
  },
  {
    num: '08',
    title: 'WhatsApp Bot (WapiSend)',
    source: 'Personal SaaS',
    status: 'live',
    featured: false,
    desc: 'Early WhatsApp Business automation SaaS — precursor to BOTIQ AI. Meta Cloud API integration, menu bot, lead capture, and FastAPI + Next.js stack.',
    tags: [
      { icon: '▲', label: 'Next.js' },
      { icon: '🚀', label: 'FastAPI' },
      { icon: '🗄️', label: 'PostgreSQL' },
      { icon: '💬', label: 'WhatsApp API' },
    ],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/Whatsapp-Bot' },
  },
];

export const statusLabels = {
  live: { text: '● LIVE', className: 'status-live' },
  'in-dev': { text: '◉ IN DEV', className: 'status-dev' },
  archived: { text: '○ ARCHIVED', className: 'status-archived' },
};
