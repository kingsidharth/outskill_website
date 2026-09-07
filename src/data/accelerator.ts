import type { Program, Feature, PricingBlock } from './types';

/**
 * V3 additions for the Accelerator page (BRIEF-V3 §4).
 *
 * These live here rather than in `types.ts` because that file is shared with
 * the other program pages and holds the V1 `Program` contract. The exported
 * object is `Program & AcceleratorExtras`, so every existing importer that
 * types against `Program` keeps working.
 */
export type SkillLine = { title: string; body: string };
export type CoverItem = { item: string; but?: string };
export type StillUnsurePrompt = { id: string; prompt: string };

export type AcceleratorExtras = {
  skills: SkillLine[];
  hackathon: Feature;
  network: Feature;
  stackBenefits: SkillLine[];
  community: { figures: { value: string; label: string }[]; roles: string[] };
  pythonBasecamp: { title: string; body: string; helpsIf: string[] };
  cover: string[];
  dontCover: CoverItem[];
  stillUnsure: { prompts: StillUnsurePrompt[]; roles: string[]; rolesLine: string };
  openSourceLine: string;
  tools: string[];
  solveFor: string[];
  pricing: PricingBlock;
  whatYouGet: string[];
  isThisForMe: string[];
};

export const accelerator: Program & AcceleratorExtras = {
  slug: 'accelerator',
  name: 'AI Engineering Accelerator',
  eyebrow: '14 days · daily · live',
  headline: 'Fourteen days. Seven apps. One in production.',
  subhead: 'Build AI software end to end, then run one of them for real.',
  ctaLabel: 'Apply now',
  ctaHref: '#apply',
  stats: [{ label: 'Duration', value: '14 days' }, { label: 'Applications', value: '7+ built' }, { label: 'Training', value: '70+ hours' }, { label: 'Updates', value: '1 year live' }],
  price: { current: '₹1,25,000', note: 'Applications reviewed in 48 hours' },

  /* ---------------------------------------------------------------- skills */
  skills: [
    { title: 'Build ChatGPT / Perplexity-like apps.', body: 'Chat, search and multimodal interfaces, wired to more than one provider.' },
    { title: 'Sophisticated apps & automations with AI.', body: 'End-to-end workflows that do real work, with an interface people can use.' },
    { title: 'Customise AI with your data.', body: 'Documents, media and private records the model answers from.' },
    { title: 'Demo to production.', body: 'How do you scale, monitor, measure and control this once it is live?' },
    { title: 'Build your own Cursor / Claude Code.', body: 'An agent that reads, writes and changes code — and your own productivity around it.' },
    { title: 'Build an AI team.', body: 'Specialist agents that hand work to each other and report what they did.' },
  ],
  hackathon: {
    title: 'Hackathon',
    body: 'Steal the skills by putting them to use. You build with other people in the room.',
  },
  network: {
    title: 'Network',
    body: 'Fourteen days beside experienced engineers, founders and PMs.',
  },

  /* --------------------------------------------------- the stack, as benefits */
  stackBenefits: [
    { title: 'AI as part of software', body: 'Where the model sits in a system that already has users, data and rules.' },
    { title: 'Control & hallucination', body: 'How you constrain output, verify it, and make it useful rather than plausible.' },
    { title: 'Deployment', body: 'Getting it off your laptop, and keeping it up once it is out there.' },
    { title: 'Customisation', body: 'Making it answer from your data, in your format, with your guardrails.' },
    { title: 'Cost prediction & control', body: 'Knowing the bill before it arrives, and holding it where you want it.' },
  ],

  /* ------------------------------------------------------------- community */
  community: {
    figures: [
      { value: '10–15+ yrs', label: 'Experience in the room' },
      { value: '~75%', label: 'Of the room, at that level' },
    ],
    roles: ['Founders', 'PMs', 'Vibe coders', 'Indie hackers', 'You?'],
  },

  /* -------------------------------------------------------- python basecamp */
  pythonBasecamp: {
    title: 'Python Basecamp',
    body: 'A fresher session plus resources, so day one does not start with syntax.',
    helpsIf: [
      "You're not familiar with Python",
      "You haven't coded in a while",
      "You're a vibe coder",
      "You don't write Python every day",
    ],
  },

  /* ------------------------------------------------------ cover / don't cover */
  cover: [
    'Gen AI application engineering, end to end',
    'Retrieval, memory and context over your own data',
    'Agents, tools and multi-agent workflows',
    'Evaluation, monitoring and cost control',
    'Open models, local inference and deployment',
    'Production considerations that change because of AI',
  ],
  dontCover: [
    { item: 'The full traditional SWE stack — front end and back end', but: 'We do cover how they change when you use AI.' },
    { item: 'Database modelling from first principles', but: 'We do cover data patterns specific to gen AI.' },
    { item: 'InfoSec and traditional application security', but: 'We do cover security, data and privacy questions AI creates.' },
  ],

  /* ------------------------------------------------------------ still unsure */
  stillUnsure: {
    prompts: [
      { id: 'q1', prompt: "Imagine you work at ChatGPT. You're the engineer. You don't prompt your AI — your user does. How does that change prompt engineering for you?" },
      { id: 'q2', prompt: 'AI is stateless — it has no memory. How do you give it memory?' },
      { id: 'q3', prompt: 'Your support bot needs to know the customer, their orders, status and options. How do you teach it that?' },
      { id: 'q4', prompt: 'How do you know which model is best for your task?' },
      { id: 'q5', prompt: 'How do you build something like Cursor — an agent that reads, writes and changes code for you?' },
      { id: 'q6', prompt: 'If you could build your own team with AI, who would you hire?' },
    ],
    roles: ['Product team roles', 'Marketing team roles', 'Media / YouTuber team roles'],
    rolesLine: 'Learn to build any of these.',
  },

  openSourceLine:
    'You run local models, compare them against hosted ones, and keep the choice open.',

  tools: [
    'Cursor', 'Claude Code', 'Codex', 'OpenAI SDK', 'Gemini SDK', 'Anthropic', 'OpenRouter',
    'HuggingFace', 'Google Colab', 'MCP', 'Skills', 'Render', 'Vercel', 'Qdrant', 'Pinecone',
    'LanceDB', 'CrewAI', 'LangGraph', 'Langfuse', 'Pydantic', 'Python', 'UV', 'FastAPI',
  ],

  solveFor: [
    'Hallucinations',
    'Customisation',
    'Data & maths',
    'Cost & estimation',
    'Handling a ton of data',
    'Standard or custom tools for agents',
    'Turning your code into tools for agents',
    'Taking advantage of the open-source community',
    'Comparing options and models',
    'Powering your API with AI, or AI with your API',
    'Memory, context windows, limits, verification',
    'Speed & latency',
  ],

  /* ------------------------------------------------------------ V3 pricing */
  pricing: {
    current: '₹1,25,000',
    includes: [
      '14 live days, back to back',
      '70+ hours of core training',
      '7+ applications built end to end',
      'Capstone hackathon and deployment',
      'Python Basecamp, before day one',
      'Tool and workflow deep dives',
      'Business foundations sessions',
      'Monetisation modules',
      'Weekly AI updates for a year',
    ],
    note: 'Applications reviewed in 48 hours. Nothing is charged on this page.',
    ctaLabel: 'Apply now',
    ctaHref: '#apply',
    kind: 'apply',
  },

  whatYouGet: [
    'Seven or more applications built and deployed',
    'One system taken to production, not to a demo',
    'Evals you can point at when someone asks if it works',
    'Cost limits and monitoring on live traffic',
    'A retrieval system grounded in your own data',
    'A coding agent you built yourself',
    'A team of agents running a real workflow',
    'Model choices you can defend on cost and latency',
    'Python Basecamp access before the cohort starts',
    'A year of live AI updates after it ends',
  ],

  isThisForMe: [
    'I write code, or I can read it comfortably',
    'I can clear fourteen days back to back',
    'I have shipped something with an LLM already',
    'My prototypes stall before they reach users',
    'I need to justify model and cost decisions at work',
    'I want to build agents, not just call an API',
    'I would rather build in a room than watch recordings',
  ],

  features: [
    { title: 'LLM applications', body: 'Build provider-aware chat and multimodal applications with production concerns in view.' },
    { title: 'Automation', body: 'Turn repetitive work into end-to-end workflows with useful interfaces.' },
    { title: 'RAG', body: 'Make applications answer from your documents, media, and other private data.' },
    { title: 'Open-source AI', body: 'Run and evaluate open models, then choose the right deployment trade-off.' },
    { title: 'Agents', body: 'Build tool-enabled systems that can plan, act, and report what they did.' },
    { title: 'Multi-agent systems', body: 'Coordinate specialist agents around complex engineering workflows.' },
    { title: 'Production', body: 'Deploy with monitoring, security, cost controls, and a path to maintenance.' },
  ],
  sprints: [
    { n: 0, title: 'Python Basecamp Foundation Setup', days: 'Foundation setup', focus: 'Engineering base', learn: ['Python environment', 'Data structures and algorithms', 'NumPy, Pandas, threading, multiprocessing'], ship: 'A Python foundation ready for advanced AI development.', tools: ['Python', 'NumPy', 'Pandas'] },
    { n: 1, title: 'Building ChatGPT-Level Applications', days: 'Days 1–3', focus: 'Advanced LLM integration', learn: ['Multi-provider chat', 'XML and JSON prompts', 'Gradio and local models'], ship: 'A production-ready chatbot.', tools: ['OpenAI', 'Gradio', 'Local models'] },
    { n: 2, title: 'AI-Powered Automation Systems', days: 'Days 4–5', focus: 'Workflow engineering', learn: ['Job-search automation', 'Resume and cover-letter pipeline', 'Full-stack interfaces'], ship: 'A complete job-application automation app.', tools: ['APIs', 'HeyGen', 'Web UI'] },
    { n: 3, title: 'Custom AI with Your Data (RAG Systems)', days: 'Days 6–7', focus: 'Advanced AI customization', learn: ['Document RAG', 'A personal AI second brain', 'Text, image, and voice inputs'], ship: 'A personal assistant grounded in your media.', tools: ['Embeddings', 'Vector search', 'Multimodal models'] },
    { n: 4, title: 'Open Source AI & Production Deployment', days: 'Days 8–9', focus: 'Enterprise-grade systems', learn: ['Vision, audio, and text systems', 'Cost optimization', 'Security and deployment'], ship: 'A monitored, secure production AI system.', tools: ['Open models', 'Docker', 'Monitoring'] },
    { n: 5, title: 'AI Agents & Autonomous Systems', days: 'Days 10–11', focus: 'Agentic architecture', learn: ['Code-generating agents', 'MCP tools', 'Sequential workflows'], ship: 'An AI coding assistant that writes and deploys code.', tools: ['MCP', 'Tool APIs', 'Workflow runtimes'] },
    { n: 6, title: 'Multi-Agent AI Systems', days: 'Days 12–13', focus: 'Advanced agentic architecture', learn: ['Engineering agents', 'Project bots', 'Memory-enabled teams'], ship: 'A team of agents for a development workflow.', tools: ['Discord', 'Queues', 'Agent memory'] },
    { n: 7, title: 'Capstone Hackathon', days: 'Days 13–14', focus: 'Portfolio project', learn: ['Original product scope', 'Production deployment', 'Technical presentation'], ship: 'A real AI product that demonstrates your engineering.', tools: ['Your stack', 'CI/CD', 'Cloud deployment'] },
  ],
  outcomes: ['Seven or more AI applications built and deployed, not sketched', 'One system taken to production with evals, cost limits, and monitoring', 'Applications that answer from your own documents and media', 'A team of agents that completes a real development workflow', 'Model choices you can defend with latency, cost, and eval evidence', 'A year of live updates so the work does not go stale'],
  audience: ['Engineers who want the full AI application stack', 'Developers moving from experiments to deployed systems', 'Technical founders building a portfolio of products', 'People who can clear fourteen days back-to-back for this'],
  faq: [
    { q: 'What is the AI Engineering Accelerator?', a: 'Fourteen back-to-back days covering applications, automation, RAG, agents, multi-agent systems, and production deployment, ending in a capstone you deploy.' },
    { q: 'Is coding background needed?', a: 'Yes. The program is built for engineers and assumes basic programming comfort. Python Basecamp is there if you are rusty.' },
    { q: 'How much time do I need to dedicate?', a: 'All fourteen days, back to back. The 70+ hours of core training plus build time run at full-time intensity, so plan for it the way you would plan leave.' },
    { q: 'Why apply instead of buying a seat?', a: 'Fourteen back-to-back days only works if the cohort is ready for it. Applications are reviewed in 48 hours.' },
    { q: 'What if I am not a Python developer?', a: 'Python Basecamp is included and free: a fresher session and resources that get you to the level day one assumes.' },
    { q: 'Will I receive a certificate upon completion?', a: 'Completion details and any certificate process are shared with participants once they are selected.' },
    { q: 'What is the format of the learning?', a: 'Live sessions every day for fourteen days, with the build work happening between them, plus one year of AI updates afterwards.' },
    { q: 'What are the add-on libraries?', a: 'The wider program includes tool and workflow deep dives, business foundations, monetization modules, and weekly AI updates.' },
  ],
  seo: { title: '14 days back-to-back — take one AI system to production', description: 'Seven or more applications built in fourteen back-to-back days, and one of them deployed with evals, cost controls, and monitoring. Application only.' },
};
