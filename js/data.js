export const sectionMarquees = [
  {
    items: ['LangChain', 'FastAPI', 'Claude API', 'LangGraph', 'pgvector', 'RAG Systems', 'Pinecone', 'LangSmith'],
    speed: 28,
    reverse: false,
  },
];

export const aboutTags = ['LangGraph', 'RAG', 'FastAPI', 'Claude API', 'Multi-Agent', 'pgvector', 'Next.js', 'AWS'];

export const projects = [
  {
    num: '01',
    title: 'DocWise',
    type: 'personal',
    context: 'Personal Project · Document AI',
    status: 'live',
    featured: true,
    desc: 'Secure multi-document AI workspace with RAG, Claude chat, Pinecone search, and multi-tenant auth.',
    shortTags: ['Claude API', 'Pinecone', 'FastAPI', 'Next.js'],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/DocWise' },
  },
  {
    num: '02',
    title: 'BOTIQ AI',
    type: 'personal',
    context: 'Personal Project · WhatsApp SMB',
    status: 'live',
    featured: false,
    desc: 'WhatsApp Business SaaS with menu bot, lead pipeline, and Razorpay billing.',
    shortTags: ['WhatsApp API', 'Razorpay', 'Node.js', 'FastAPI'],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/Whatsapp-Bot' },
  },
  {
    num: '03',
    title: 'Aurium AI',
    type: 'personal',
    context: 'Personal Project · Australian Tax SaaS',
    status: 'in-dev',
    featured: false,
    desc: 'Claude, LangGraph, and RAG-powered, citation-verified tax research tool. Coming soon.',
    shortTags: ['LangGraph', 'Claude', 'pgvector'],
    links: {},
  },
  {
    num: '04',
    title: 'Resume AI',
    type: '7span',
    context: '7Span · Work Project · AI/ML',
    status: 'nda',
    featured: false,
    desc: 'Multi-agent LangGraph resume assistant with FastAPI and specialized sub-agents, built as part of my role at 7Span.',
    shortTags: ['LangGraph', 'FastAPI', 'LangChain'],
    links: {},
  },
  {
    num: '05',
    title: 'Denny Solution',
    type: '7span',
    context: '7Span · Work Project · AI/ML',
    status: 'live',
    featured: false,
    desc: 'RAG platform with two-stage retrieval and re-ranking using Streamlit and Ragie.ai, built as part of my role at 7Span.',
    shortTags: ['RAG', 'Ragie.ai', 'Streamlit'],
    links: {},
  },
  {
    num: '06',
    title: 'BMax',
    type: '7span',
    context: '7Span · Max NutriFit · Prompt Engineering & Evals',
    status: 'live',
    featured: false,
    desc: 'AI nutrition and fitness coaching platform for Max NutriFit. I own prompt engineering and LLM evaluation workflows to keep production responses accurate and on-brand.',
    shortTags: ['Prompt Engineering', 'LLM Evaluation', 'OpenAI', 'AI Coach'],
    links: {},
  },
];

export const skillCapabilities = [
  {
    title: 'AI / ML Core',
    icon: '◈',
    items: ['LLMs & RAG', 'Machine Learning', 'NLP / Semantic Search', 'Prompt Engineering'],
  },
  {
    title: 'Orchestration',
    icon: '⇄',
    items: ['LangChain', 'LangGraph', 'LangSmith', 'DeepEval', 'n8n / Make.com'],
  },
  {
    title: 'LLM APIs',
    icon: '⚡',
    items: ['Claude API', 'OpenAI GPT-4', 'Ragie.ai', 'AWS Bedrock'],
  },
  {
    title: 'Infra & Storage',
    icon: '⚙',
    items: ['pgvector / Supabase', 'Qdrant / Pinecone', 'FastAPI', 'Next.js 14'],
  },
  {
    title: 'Languages',
    icon: '{}',
    items: ['Python', 'TypeScript', 'SQL', 'JavaScript'],
  },
];

export const degrees = [
  {
    period: 'Oct 2023 · Jun 2025',
    title: 'B.E. Computer Science (AI & Machine Learning)',
    institution: 'New L J Institute of Engineering & Technology, Ahmedabad',
    icon: '🎓',
  },
  {
    period: 'Jun 2020 · Jul 2023',
    title: 'Diploma · Computer Engineering',
    institution: 'OM Engineering College, Junagadh',
    icon: '📘',
  },
];

export const certifications = [
  {
    id: 'aws-ai',
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    featured: true,
    featuredLabel: 'Primary Certification',
    status: 'Verified',
    verifyUrl: 'https://www.credly.com/badges/83350457-f130-4255-9f55-73f12cde7d52/public_url',
    linkLabel: 'Verify on Credly ↗',
  },
  {
    id: 'anthropic-cpn',
    name: 'Anthropic CPN Learning Path',
    issuer: 'Anthropic',
    featured: true,
    featuredLabel: 'Learning Path',
    status: 'Completed · 4 modules',
    modules: [
      {
        name: 'Introduction to Agent Skills',
        verifyUrl: 'https://verify.skilljar.com/c/2bz6a496ic66',
      },
      {
        name: 'Building with the Claude API',
        verifyUrl: 'https://verify.skilljar.com/c/7bx8tq25bszv',
      },
      {
        name: 'Introduction to Model Context Protocol',
        verifyUrl: 'https://verify.skilljar.com/c/owu37ugd8xr3',
      },
      {
        name: 'Claude Code in Action',
        verifyUrl: 'https://verify.skilljar.com/c/9wgte6dvwpqq',
      },
    ],
  },
];

export const publishedCourses = [
  {
    id: 'distinction-ml',
    name: 'AI & Machine Learning',
    platform: 'Distinction',
    desc: 'A structured course I launched on Distinction, covering practical AI and machine learning fundamentals.',
    status: 'Live',
    url: 'https://distinction.app/courses/7f3bd25b-5efd-4aa3-a2c8-5e21b666676a',
    linkLabel: 'View Course on Distinction ↗',
  },
];

export const writingFeatured = {
  platform: 'Medium',
  title: 'AWS AI Practitioner Journey',
  desc: 'My Medium article on preparing for the AWS Certified AI Practitioner exam — study resources, topics I focused on, and what showed up on test day.',
  status: 'Published on Medium',
  url: 'https://medium.com/@khachariyatrusha/aws-ai-practitioner-aif-c01-everything-i-studied-before-the-exam-166fb2ec3217',
  linkLabel: 'Read on Medium ↗',
};

export const socialLinks = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/TRUSHAKHACHARIYA' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/trusha-khachariya-tk' },
  { id: 'reddit', label: 'Reddit', url: 'https://www.reddit.com/u/Trusha216/s/IwdpF9aUdO' },
  { id: 'medium', label: 'Medium', url: 'https://medium.com/@khachariyatrusha' },
  { id: 'credly', label: 'Credly', url: 'https://www.credly.com/badges/83350457-f130-4255-9f55-73f12cde7d52/public_url' },
  { id: 'distinction', label: 'My Distinction Course', url: 'https://distinction.app/courses/7f3bd25b-5efd-4aa3-a2c8-5e21b666676a' },
  { id: 'email', label: 'Email', url: 'mailto:khachariyatrusha@gmail.com' },
];

export const siteConfig = {
  email: 'khachariyatrusha@gmail.com',
  resumePath: 'assets/Trusha_Khachariya.pdf',
  resumeUpdated: 'June 2026',
  siteUrl: 'https://portfolio-seven-phi-zyohdnoii5.vercel.app',
  mediumUrl: 'https://medium.com/@khachariyatrusha',
};
