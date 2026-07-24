"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  CheckCircle2,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { runHistory, workflows } from "@/lib/mock-data";
import { cn, formatTokens } from "@/lib/utils";

type AgentNodeData = {
  label: string;
  kind: "orchestrator" | "agent";
  timeout: string;
  retry: string;
};

function FlowNode({ data }: NodeProps) {
  const d = data as AgentNodeData;
  const isOrch = d.kind === "orchestrator";

  return (
    <div
      className={cn(
        "min-w-[220px] rounded-xl border bg-card px-3.5 py-3 shadow-lg backdrop-blur",
        isOrch ? "border-primary/50 shadow-primary/10" : "border-border"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-0 !bg-primary"
      />
      <div className="flex items-center justify-between gap-2">
        <Badge variant={isOrch ? "default" : "secondary"} className="uppercase">
          {isOrch ? "Orchestrator" : "Agent"}
        </Badge>
        <button
          type="button"
          className="rounded p-0.5 text-muted-foreground hover:text-destructive"
          aria-label="Delete node"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-2 font-mono text-xs font-semibold">{d.label}</p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <label className="text-[10px] text-muted-foreground">
          Timeout
          <input
            defaultValue={d.timeout}
            className="mt-0.5 w-full rounded-md border border-input bg-background px-1.5 py-1 font-mono text-[11px]"
          />
        </label>
        <label className="text-[10px] text-muted-foreground">
          Retry
          <input
            defaultValue={d.retry}
            className="mt-0.5 w-full rounded-md border border-input bg-background px-1.5 py-1 font-mono text-[11px]"
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-0 !bg-primary"
      />
    </div>
  );
}

const nodeTypes = { flowNode: FlowNode };

const initialNodes: Node[] = [
  {
    id: "orch",
    type: "flowNode",
    position: { x: 280, y: 20 },
    data: {
      label: "dosecolor-orchestrator",
      kind: "orchestrator",
      timeout: "1.0s",
      retry: "1.0s",
    },
  },
  {
    id: "a1",
    type: "flowNode",
    position: { x: 20, y: 220 },
    data: {
      label: "client-history-agent",
      kind: "agent",
      timeout: "1.0s",
      retry: "1.0s",
    },
  },
  {
    id: "a2",
    type: "flowNode",
    position: { x: 260, y: 220 },
    data: {
      label: "color-formula-agent",
      kind: "agent",
      timeout: "1.0s",
      retry: "1.0s",
    },
  },
  {
    id: "a3",
    type: "flowNode",
    position: { x: 500, y: 220 },
    data: {
      label: "color-formula-agent",
      kind: "agent",
      timeout: "1.0s",
      retry: "1.0s",
    },
  },
  {
    id: "a4",
    type: "flowNode",
    position: { x: 740, y: 220 },
    data: {
      label: "profit-analysis-agent",
      kind: "agent",
      timeout: "1.0s",
      retry: "1.0s",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "orch", target: "a1", style: { strokeDasharray: "4 4" } },
  { id: "e2", source: "orch", target: "a2", style: { strokeDasharray: "4 4" } },
  { id: "e3", source: "orch", target: "a3", style: { strokeDasharray: "4 4" } },
  { id: "e4", source: "orch", target: "a4", style: { strokeDasharray: "4 4" } },
];

const modes = [
  "Sequential",
  "Parallel",
  "Hierarchical",
  "Hybrid",
  "Collaborative",
  "Event-driven",
] as const;

const logicButtons = [
  "+ Loop",
  "+ Condition",
  "+ Switch",
  "+ Sub-workflow",
  "+ Collab Mode",
];

const actorButtons = ["+ Agent Node", "+ Orchestrator", "+ Fan-out"];

export function WorkflowsView() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);
  const [mode, setMode] = useState<(typeof modes)[number]>("Hybrid");
  const [title, setTitle] = useState(workflows[0].name);
  const [prompt, setPrompt] = useState("");

  const onNodesChange = useCallback(() => {
    /* controlled via local drag in ReactFlow default */
  }, []);

  const assigned = useMemo(() => nodes.length, [nodes]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header
        title="Workflows"
        description="Build and run agentic workflow pipelines."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button size="sm">Run</Button>
          </>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-[280px] shrink-0 flex-col border-r border-border bg-card/30">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Workflows</h2>
              <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                <Plus className="h-3 w-3" />
                New
              </Button>
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="h-8 pl-8 text-xs" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="mt-2 h-8 text-xs">
                <SelectValue placeholder="All modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All modes</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-3 space-y-2">
              {workflows.map((wf) => (
                <div
                  key={wf.id}
                  className="rounded-lg border border-primary/30 bg-primary/10 p-3"
                >
                  <p className="text-xs font-medium leading-snug">{wf.name}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="hybrid">{wf.mode}</Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {wf.nodes} nodes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-hidden p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Run History</h2>
              <button
                type="button"
                className="text-[11px] font-medium text-amber-600 hover:underline dark:text-amber-400"
              >
                Clear all + memory
              </button>
            </div>
            <div className="mt-3 space-y-2 overflow-y-auto">
              {runHistory.map((run) => (
                <div
                  key={run.id}
                  className="flex items-start gap-2 rounded-lg border border-border bg-card p-2.5"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-success" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="hybrid" className="text-[10px]">
                        {run.mode}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {run.at}
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {formatTokens(run.tokens)} tok
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-end gap-3 border-b border-border bg-card/40 px-4 py-3">
            <div className="min-w-[200px] flex-1">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Workflow Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 h-8 text-sm"
              />
            </div>
            <div className="w-[220px]">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Execution
              </label>
              <Select defaultValue="hybrid">
                <SelectTrigger className="mt-1 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hybrid">Hybrid · DAG + Orchestrator</SelectItem>
                  <SelectItem value="sequential">Sequential</SelectItem>
                  <SelectItem value="parallel">Parallel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="mb-1 text-xs text-muted-foreground">100%</span>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-border px-4 py-2">
            {logicButtons.map((b) => (
              <Button key={b} variant="outline" size="sm" className="h-7 text-xs">
                {b}
              </Button>
            ))}
            <span className="mx-1 self-center text-border">|</span>
            {actorButtons.map((b) => (
              <Button key={b} variant="secondary" size="sm" className="h-7 text-xs">
                {b}
              </Button>
            ))}
          </div>

          <div className="relative min-h-0 flex-1 canvas-grid">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={(changes) => {
                setNodes((nds) => {
                  // simple position updates
                  const next = [...nds];
                  for (const c of changes) {
                    if (c.type === "position" && c.position) {
                      const i = next.findIndex((n) => n.id === c.id);
                      if (i >= 0) next[i] = { ...next[i], position: c.position };
                    }
                  }
                  return next;
                });
                void onNodesChange;
              }}
              fitView
              proOptions={{ hideAttribution: true }}
              className="bg-transparent!"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="var(--border)"
              />
              <Controls className="!rounded-lg !border-border !bg-card !shadow-md" />
              <MiniMap
                className="!rounded-lg !border !border-border !bg-card"
                maskColor="rgba(0,0,0,0.4)"
              />
            </ReactFlow>
          </div>

          <div className="border-t border-border bg-card/50 p-4">
            <div className="mb-3 flex flex-wrap gap-1">
              {modes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    mode === m
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {m}
                </button>
              ))}
              <span className="ml-auto self-center text-[11px] text-muted-foreground">
                {assigned}/{assigned} nodes assigned
              </span>
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Initial prompt / input for the workflow..."
              className="min-h-[72px] resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
