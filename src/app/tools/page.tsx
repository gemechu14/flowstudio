"use client";

import { useMemo, useState } from "react";
import {
  Code2,
  FileCode2,
  Search,
  Upload,
  CheckCircle2,
  ShieldAlert,
  FlaskConical,
  Bot,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { tools } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = ["All", "Pending Review", "Approved", "Rejected"] as const;

const lifecycle = [
  {
    step: 1,
    title: "Upload or write a .py tool",
    icon: FileCode2,
    color: "bg-blue-500/15 text-blue-500",
  },
  {
    step: 2,
    title: "Review risk flags & approve",
    icon: ShieldAlert,
    color: "bg-amber-500/15 text-amber-500",
  },
  {
    step: 3,
    title: "Test before deploying",
    icon: FlaskConical,
    color: "bg-violet-500/15 text-violet-400",
  },
  {
    step: 4,
    title: "Agents can now use it",
    icon: Bot,
    color: "bg-emerald-500/15 text-emerald-500",
  },
];

export default function ToolsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesTab =
        tab === "All" ||
        (tab === "Pending Review" && t.status === "pending") ||
        (tab === "Approved" && t.status === "approved") ||
        (tab === "Rejected" && t.status === "rejected");
      const matchesQuery =
        !query ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header
        title="Tool Library"
        description="Manage built-in and custom tools available to your agents."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Code2 className="h-4 w-4" />
              Write Code
            </Button>
            <Button size="sm">
              <Upload className="h-4 w-4" />
              Upload File
            </Button>
          </>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Configuration
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            Tool Management
          </h2>

          <div className="mt-6 flex gap-6 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative pb-3 text-sm font-medium transition-colors",
                  tab === t
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
                {tab === t && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="relative mt-5">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools by name or description..."
              className="pl-9"
            />
          </div>

          <div className="mt-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
            {filtered.length === 0 ? (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/50 text-muted-foreground">
                  <Code2 className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  No tools in this category.
                </p>
              </>
            ) : (
              <div className="w-full space-y-3">
                {filtered.map((tool) => (
                  <Card key={tool.id}>
                    <CardContent className="p-4">
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="hidden w-[300px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-border bg-card/40 p-5 xl:flex">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">Add a Custom Tool</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Write Python code directly in the editor, or upload an existing
                .py file. Tools go through a review process before agents can
                use them.
              </p>
              <Button className="mt-5 w-full" size="sm">
                <Code2 className="h-4 w-4" />
                Write Code
              </Button>
              <Button variant="outline" className="mt-2 w-full" size="sm">
                <Upload className="h-4 w-4" />
                Upload .py File
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Tool Lifecycle
              </p>
              <ol className="mt-4 space-y-4">
                {lifecycle.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.step} className="flex gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          item.color
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-muted-foreground">
                          Step {item.step}
                        </p>
                        <p className="text-sm font-medium leading-snug">
                          {item.title}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-success-muted px-3 py-2 text-xs text-success">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approved tools are live for agents
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
