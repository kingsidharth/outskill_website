import type { QuizQuestion } from './types';

export const quiz: QuizQuestion[] = [
  {
    id: 'llm-answer',
    prompt: 'Conversation: "What is the capital of France?" → "Paris". How did the LLM answer?',
    options: ['Looked up a database', 'Searched the internet', 'Cache', 'None of the above'],
    correct: 3,
    why: 'An LLM generates an answer from patterns encoded in learned parameters; it did not necessarily look anything up.',
  },
  {
    id: 'pretraining',
    prompt: 'What is pre-training?',
    options: ['Something before training', 'Something to do with data', 'Test before training', 'None of the above'],
    correct: 3,
    why: 'Pre-training is next-token prediction over huge text and other data corpora that teaches a model broad statistical structure.',
  },
  {
    id: 'model-choice',
    prompt: 'How do you know which model is best for a task?',
    options: ['Trial & error', 'Benchmarks', 'Need more information'],
    correct: 2,
    why: 'Model choice needs the task, latency and cost limits, and an evaluation designed for the outcome you care about.',
  },
  {
    id: 'support-bot',
    prompt: 'If you built a customer-support AI bot for your company you\'d need:',
    options: ['Fine-tuning', 'Training', 'ML', 'None of the above'],
    correct: 3,
    why: 'A support bot usually needs retrieval, tools, and well-designed prompts grounded in company data—not fine-tuning by default.',
  },
];
