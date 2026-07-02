export const sectionMarquees = [
  {
    items: ['LangChain', 'FastAPI', 'Claude API', 'LangGraph', 'pgvector', 'RAG Systems', 'Pinecone', 'LangSmith'],
    speed: 28,
    reverse: false,
  },
];

export const heroStats = [
  { value: '2', label: 'Live SaaS products shipped' },
  { value: '4+', label: 'Production LLM systems' },
  { value: '6+', label: 'POCs & experiments' },
  { value: 'AWS', label: 'Certified AI Practitioner' },
];

export const aboutTags = ['LangGraph', 'RAG', 'FastAPI', 'Claude API', 'Multi-Agent', 'pgvector', 'Next.js', 'AWS'];

export const projects = [
  {
    title: 'DocWise',
    type: 'personal',
    context: 'Personal · Document AI SaaS',
    status: 'live',
    featured: true,
    role: 'Founder · AI/ML Engineer',
    responsibilities: 'Designed and built the full product: multi-tenant document ingestion, RAG retrieval, Claude chat workflows, and secure workspace-level data separation.',
    outcome: 'Live SaaS product — production document intelligence with auth and tenant isolation.',
    shortTags: ['Claude API', 'Pinecone', 'FastAPI', 'Next.js'],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/DocWise' },
  },
  {
    title: 'BOTIQ AI',
    type: 'personal',
    context: 'Personal · WhatsApp SMB SaaS',
    status: 'live',
    featured: false,
    role: 'Founder · AI Automation Engineer',
    responsibilities: 'Built the WhatsApp automation flow, lead pipeline, payment integration, and customer menu experience for small business lead capture.',
    outcome: 'Live product automating lead capture and menu-driven customer flows for SMBs.',
    shortTags: ['WhatsApp API', 'Razorpay', 'Node.js', 'FastAPI'],
    links: { github: 'https://github.com/TRUSHAKHACHARIYA/Whatsapp-Bot' },
  },
  {
    title: 'Resume AI',
    type: '7span',
    context: '7Span · Recruitment AI',
    status: 'nda',
    featured: false,
    role: 'AI/ML Engineer',
    responsibilities: 'Built a multi-agent resume screening system with LangGraph and FastAPI, including specialized analysis flows for resume parsing, evaluation, and recruiter-facing decision support.',
    outcome: 'Production system processing hundreds of resumes — cut manual screening time for hiring teams.',
    shortTags: ['LangGraph', 'FastAPI', 'LangChain'],
    links: {},
  },
  {
    title: 'Enterprise RAG Platform',
    type: '7span',
    context: '7Span · Enterprise Search · Recruitment',
    status: 'live',
    featured: false,
    role: 'AI/ML Engineer',
    responsibilities: 'Delivered a two-stage RAG search platform with retrieval, re-ranking, and recruiter-oriented document discovery workflows for large internal knowledge bases.',
    outcome: 'Live at 7Span — faster document lookup and more relevant search results for recruitment workflows.',
    shortTags: ['RAG', 'Ragie.ai', 'Streamlit'],
    links: {},
  },
];

export const pocProjects = [
  {
    title: 'Aurium AI',
    context: 'POC · Australian Tax SaaS',
    status: 'in-dev',
    desc: 'Claude + LangGraph RAG tool for citation-verified Australian tax research — in active development.',
    shortTags: ['LangGraph', 'Claude', 'pgvector'],
  },
  {
    title: 'BMax · AI Nutrition Coach',
    context: 'POC · Prompt Engineering & Evals',
    status: 'complete',
    desc: 'LLM eval workflows and prompt engineering for Max NutriFit\'s AI nutrition coaching platform at 7Span.',
    shortTags: ['Prompt Engineering', 'LLM Evals', 'OpenAI'],
  },
  {
    title: 'LangGraph & LangChain Demo',
    context: 'POC · LLM Orchestration',
    status: 'complete',
    desc: 'Stateful LangGraph workflows and LangChain prompt chaining — retrieve, generate, and state-update nodes.',
    shortTags: ['LangGraph', 'LangChain', 'OpenAI', 'Python'],
    github: 'https://github.com/TRUSHAKHACHARIYA/LangGraph-LangChain-Demo',
  },
  {
    title: 'Model Context Protocol Demo',
    context: 'POC · MCP',
    status: 'complete',
    desc: 'Movie recommendation app using MCP to store preferences and history for context-aware suggestions.',
    shortTags: ['MCP', 'Python', 'Flask'],
    github: 'https://github.com/TRUSHAKHACHARIYA/Model-Contex-Protocol_Demo',
  },
  {
    title: 'Vectorless RAG',
    context: 'POC · Document Q&A',
    status: 'in-dev',
    desc: 'BM25 keyword retrieval + Ollama local LLM — no embeddings, no vector DB, zero cost.',
    shortTags: ['BM25', 'Ollama', 'FastAPI', 'LangChain'],
    github: 'https://github.com/TRUSHAKHACHARIYA/vectorless-rag-poc',
  },
  {
    title: 'Firecrawl Web Scraper Dashboard',
    context: 'POC · Web Scraping',
    status: 'in-dev',
    desc: 'Scrape, crawl, and map any site into clean Markdown — FastAPI backend + React/Vite frontend.',
    shortTags: ['Firecrawl', 'FastAPI', 'React', 'Vite'],
    github: 'https://github.com/TRUSHAKHACHARIYA/firecrawl-poc',
  },
];

export const experience = [
  {
    period: 'Sep 2025 · Present',
    role: 'AI/ML Engineer · 7Span · Ahmedabad',
    description:
      'Own production LLM systems for recruitment and enterprise search — multi-agent resume pipelines, RAG platforms, and LLM evaluation workflows.',
    outcome: '4+ production AI systems in active use, including a multi-agent resume tool processing hundreds of resumes.',
    tags: ['FastAPI', 'LangGraph', 'pgvector', 'Claude API'],
  },
  {
    period: 'Jan 2025 · Jul 2025',
    role: 'AI/ML Engineering Intern · 7Span',
    description:
      'Built Resume AI from prototype to production and delivered an enterprise RAG search platform for recruitment document lookup.',
    outcome: 'Shipped two production LLM systems — integrated OpenAI, Claude, and Ragie APIs end to end.',
    tags: ['LangChain', 'Ragie.ai', 'Streamlit', 'OpenAI'],
  },
  {
    period: 'Oct 2023 · Dec 2023',
    role: 'AI & ML Intern · Acmegrade · Remote · Bengaluru',
    description:
      'Remote internship focused on applied machine learning with Google Colab, Jupyter Notebook, and Kaggle datasets.',
    outcome: 'Completed 3+ end-to-end ML projects — from data exploration to model training and evaluation.',
    tags: ['Google Colab', 'Jupyter Notebook', 'Kaggle'],
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
    id: 'distinction-aws-ai',
    name: 'AWS Certified AI Practitioner (AIF-C01)',
    platform: 'Distinction',
    desc: 'A structured course I built on Distinction to prepare learners for the AWS Certified AI Practitioner exam — core AI/ML concepts, AWS AI services, and exam-focused study paths.',
    status: 'Live',
    url: 'https://distinction.app/courses/7f3bd25b-5efd-4aa3-a2c8-5e21b666676a',
    linkLabel: 'View Course on Distinction ↗',
  },
];

export const writingPosts = [
  {
    id: 'aws-ai-practitioner',
    platform: 'Medium',
    title: 'AWS AI Practitioner Journey',
    desc: 'My Medium article on preparing for the AWS Certified AI Practitioner exam — study resources, topics I focused on, and what showed up on test day.',
    status: 'Published on Medium',
    mediumUrl: 'https://medium.com/@khachariyatrusha/aws-ai-practitioner-aif-c01-everything-i-studied-before-the-exam-166fb2ec3217',
  },
  {
    id: 'okf',
    platform: 'Medium',
    title: 'Open Knowledge Format (OKF): Google\'s New Standard for AI-Ready Knowledge',
    desc: 'A deep dive into Google\'s OKF v0.1 spec — how Markdown + YAML frontmatter bundles make organizational knowledge portable and agent-ready.',
    status: 'Published on Medium',
    mediumUrl: 'https://medium.com/@khachariyatrusha/open-knowledge-format-okf-googles-new-standard-for-ai-ready-knowledge-c49b17b7cb5f',
  },
];

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
