export type Agent = {
  id: string;
  name: string;
  model: string;
  provider: "openai" | "anthropic" | "google";
  description: string;
  tools: string[];
  workflows: string[];
  createdAt: string;
  updatedAt?: string;
};

export type DataSource = {
  id: string;
  name: string;
  type: "document" | "database" | "website";
  connection?: string;
  usedByAgents: string[];
};

export type WorkflowRun = {
  id: string;
  workflow: string;
  mode: string;
  status: "completed" | "failed" | "running";
  tokens: number;
  when: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  status: "pending" | "approved" | "rejected";
};

export const agents: Agent[] = [
  {
    id: "1",
    name: "colorist-recommendation-agent",
    model: "GPT-4o mini",
    provider: "openai",
    description:
      "Recommends hair color formulas based on client history, desired outcome, and inventory availability.",
    tools: [],
    workflows: ["AI-Powered Hair Color Optimization Workflow"],
    createdAt: "Jul 24, 2026",
  },
  {
    id: "2",
    name: "profit-analysis-agent",
    model: "GPT-4o mini",
    provider: "openai",
    description:
      "Calculates service costs, product usage costs, and expected salon profit for each recommendation.",
    tools: [],
    workflows: ["AI-Powered Hair Color Optimization Workflow"],
    createdAt: "Jul 24, 2026",
    updatedAt: "Jul 24, 2026",
  },
  {
    id: "3",
    name: "inventory-agent",
    model: "GPT-4o mini",
    provider: "openai",
    description:
      "Checks product stock levels and suggests substitutions when preferred shades are unavailable.",
    tools: [],
    workflows: ["AI-Powered Hair Color Optimization Workflow"],
    createdAt: "Jul 24, 2026",
  },
  {
    id: "4",
    name: "color-formula-agent",
    model: "GPT-4o mini",
    provider: "openai",
    description:
      "Generates precise mixing ratios and developer strengths for professional color applications.",
    tools: [],
    workflows: ["AI-Powered Hair Color Optimization Workflow"],
    createdAt: "Jul 24, 2026",
  },
  {
    id: "5",
    name: "client-history-agent",
    model: "GPT-4o mini",
    provider: "openai",
    description:
      "Retrieves and summarizes prior color services, allergies, and preference notes for a client.",
    tools: [],
    workflows: ["AI-Powered Hair Color Optimization Workflow"],
    createdAt: "Jul 24, 2026",
  },
  {
    id: "6",
    name: "dosecolor-orchestrator",
    model: "GPT-4o mini",
    provider: "openai",
    description:
      "Coordinates specialist agents, merges results, and produces the final color optimization plan.",
    tools: [],
    workflows: ["AI-Powered Hair Color Optimization Workflow"],
    createdAt: "Jul 24, 2026",
  },
];

export const dataSources: DataSource[] = [
  {
    id: "doc-1",
    name: "DoseColor_Hair_Color_Knowledge.pdf",
    type: "document",
    usedByAgents: ["colorist-recommendation-agent", "color-formula-agent"],
  },
  {
    id: "db-1",
    name: "dose",
    type: "database",
    connection: "postgresql://chroma:***@18.222.138.193:5432/chroma",
    usedByAgents: [
      "colorist-recommendation-agent",
      "profit-analysis-agent",
      "inventory-agent",
      "color-formula-agent",
      "client-history-agent",
      "dosecolor-orchestrator",
    ],
  },
];

export const recentRuns: WorkflowRun[] = [
  {
    id: "run_8f2a91c3",
    workflow: "AI-Powered Hair Color Optimization Workflow",
    mode: "hybrid",
    status: "completed",
    tokens: 3000,
    when: "57m ago",
  },
  {
    id: "run_3b7e04d1",
    workflow: "AI-Powered Hair Color Optimization Workflow",
    mode: "hybrid",
    status: "completed",
    tokens: 3000,
    when: "1h ago",
  },
];

export const activityLast7Days = [
  { day: "Sat", runs: 0 },
  { day: "Sun", runs: 0 },
  { day: "Mon", runs: 0 },
  { day: "Tue", runs: 0 },
  { day: "Wed", runs: 0 },
  { day: "Thu", runs: 0 },
  { day: "Fri", runs: 2 },
];

export const tools: Tool[] = [];

export const workflows = [
  {
    id: "wf-1",
    name: "AI-Powered Hair Color Optimization Workflow",
    mode: "hybrid",
    nodes: 6,
  },
];

export const runHistory = [
  { id: "h1", mode: "hybrid", at: "Jul 24, 12:27 PM", tokens: 85889, status: "completed" as const },
  { id: "h2", mode: "hybrid", at: "Jul 24, 11:30 AM", tokens: 74988, status: "completed" as const },
];

export const dashboardStats = {
  agents: { count: 6, detail: "openai · 6" },
  workflows: { count: 1, detail: "hybrid · 1" },
  tools: { count: 0, detail: "none configured" },
  runsThisWeek: { count: 2, detail: "2 today · 100% success" },
  tokensToday: 5900,
  tokensWeek: 5900,
};
