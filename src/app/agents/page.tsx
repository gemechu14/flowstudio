"use client";

import { useMemo, useState } from "react";
import {
  Pencil,
  Play,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agents } from "@/lib/mock-data";

export default function AgentsPage() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("all");

  const filtered = useMemo(() => {
    return agents.filter((a) => {
      const matchesQuery =
        !query ||
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.description.toLowerCase().includes(query.toLowerCase());
      const matchesProvider =
        provider === "all" || a.provider === provider;
      return matchesQuery && matchesProvider;
    });
  }, [query, provider]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header
        title="Agents"
        description="Configure and monitor AI agents"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            New Agent
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Configuration · Agents
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure AI agents: assign tools, pick a model, and set a system
            prompt.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agents..."
                className="pl-9"
              />
            </div>
            <Select value={provider} onValueChange={setProvider}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Providers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="google">Google</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-models">
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Models" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-models">All Models</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4o mini</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-wf">
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="All Workflows" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-wf">All Workflows</SelectItem>
                <SelectItem value="hair">Hair Color Optimization</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 space-y-3">
            {filtered.map((agent) => (
              <Card
                key={agent.id}
                className="transition-colors hover:border-primary/30"
              >
                <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-mono text-sm font-semibold">
                        {agent.name}
                      </h3>
                      <Badge variant="secondary">{agent.model}</Badge>
                      <Badge variant="default" className="uppercase">
                        {agent.provider}
                      </Badge>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {agent.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-medium uppercase tracking-wide text-muted-foreground">
                        {agent.tools.length === 0
                          ? "No tools assigned"
                          : `${agent.tools.length} tools`}
                      </span>
                      <span className="text-border">|</span>
                      <span className="font-medium uppercase tracking-wide text-muted-foreground">
                        Workflows:
                      </span>
                      {agent.workflows.map((wf) => (
                        <Badge key={wf} variant="default" className="font-normal">
                          {wf}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm">
                        <Play className="h-3.5 w-3.5" />
                        Test
                      </Button>
                      <Button size="sm" variant="outline">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Created {agent.createdAt}
                      {agent.updatedAt ? ` · Updated ${agent.updatedAt}` : ""}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
