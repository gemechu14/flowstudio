"use client";

import { KeyRound, Plug, Plus, Webhook } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { workflows } from "@/lib/mock-data";

const apiKeys = [
  {
    name: "Anthropic API Key",
    env: "ANTHROPIC_API_KEY",
    configured: false,
  },
  {
    name: "OpenAI API Key",
    env: "OPENAI_API_KEY",
    configured: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header
        title="Settings"
        description="Platform configuration and preferences."
      />

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Configuration
            </p>
            <div className="mt-1 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  MCP Tool Servers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect remote Model Context Protocol servers to expose their
                  tools to agents.
                </p>
              </div>
              <Button size="sm" className="shrink-0">
                <Plus className="h-4 w-4" />
                Add MCP Server
              </Button>
            </div>

            <Card className="mt-5">
              <CardContent className="flex flex-col items-center px-6 py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/50 text-muted-foreground">
                  <Plug className="h-5 w-5" />
                </div>
                <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                  No MCP servers configured. Add an MCP server to expose its
                  tools to your agents.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Integrations
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">
              API Keys
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set API keys for each provider. Keys are stored encrypted and
              scoped to your organisation.
            </p>

            <div className="mt-5 space-y-3">
              {apiKeys.map((key) => (
                <Card key={key.env}>
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <KeyRound className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{key.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {key.env}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={key.configured ? "success" : "warning"}>
                        {key.configured ? "Configured" : "Not set"}
                      </Badge>
                      {key.configured ? (
                        <>
                          <Button size="sm" variant="outline">
                            Update
                          </Button>
                          <Button size="sm" variant="destructive">
                            Remove
                          </Button>
                        </>
                      ) : (
                        <Button size="sm">Set Key</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Keys are encrypted with AES-256 at rest. They are never returned
              to the browser after being set. If a key is not configured here,
              the platform falls back to its environment variable.
            </p>
          </section>

          <section>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Automation
            </p>
            <div className="mt-1 flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Webhook className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold tracking-tight">
                  Triggers
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Schedule workflows on a cron, or fire them via webhook from
                  any external app.
                </p>

                <Card className="mt-5">
                  <CardContent className="p-5">
                    <label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Select Workflow
                    </label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="— choose a workflow —" />
                      </SelectTrigger>
                      <SelectContent>
                        {workflows.map((wf) => (
                          <SelectItem key={wf.id} value={wf.id}>
                            {wf.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
