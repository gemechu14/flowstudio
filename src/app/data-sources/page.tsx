"use client";

import { useMemo, useState } from "react";
import {
  Database,
  FileText,
  Globe,
  Pencil,
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
import { agents, dataSources } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const typeIcon = {
  document: FileText,
  database: Database,
  website: Globe,
};

export default function DataSourcesPage() {
  const [selectedId, setSelectedId] = useState(dataSources[1]?.id ?? dataSources[0]?.id);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    return dataSources.filter((s) => {
      const matchesQuery =
        !query || s.name.toLowerCase().includes(query.toLowerCase());
      const matchesType = typeFilter === "all" || s.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [query, typeFilter]);

  const selected = dataSources.find((s) => s.id === selectedId) ?? filtered[0];
  const SelectedIcon = selected ? typeIcon[selected.type] : Database;

  const linkedAgents = agents.filter((a) =>
    selected?.usedByAgents.includes(a.name)
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header
        title="Data Sources"
        description="Connect documents, databases, and websites to your agents."
      />

      <div className="flex flex-1 overflow-hidden">
        <aside className="flex w-full max-w-sm shrink-0 flex-col border-r border-border bg-card/30 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Sources</h2>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              New source
            </Button>
          </div>

          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sources..."
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="website">Website</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 space-y-2 overflow-y-auto">
            {filtered.map((source) => {
              const Icon = typeIcon[source.type];
              const active = source.id === selected?.id;
              return (
                <button
                  key={source.id}
                  type="button"
                  onClick={() => setSelectedId(source.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                    active
                      ? "border-primary/40 bg-primary/10 shadow-sm"
                      : "border-transparent bg-card hover:border-border"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      active
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{source.name}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {source.type}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto p-6">
          {selected ? (
            <div className="mx-auto max-w-3xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <SelectedIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {selected.name.replace(/\.[^.]+$/, "")}
                      </h2>
                      <Badge variant="default" className="capitalize">
                        {selected.type}
                      </Badge>
                    </div>
                    <p className="mt-0.5 font-mono text-sm text-muted-foreground">
                      {selected.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>

              {selected.connection && (
                <section className="mt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Connection
                  </p>
                  <Input
                    readOnly
                    value={selected.connection}
                    className="mt-3 font-mono text-xs"
                  />
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Test connection</Button>
                    <Button size="sm" variant="outline">
                      View schema
                    </Button>
                  </div>
                </section>
              )}

              <section className="mt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Used by Agents
                </p>
                <div className="mt-3 space-y-2">
                  {linkedAgents.map((agent) => (
                    <Card key={agent.id}>
                      <CardContent className="flex items-center gap-3 p-3.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted font-mono text-xs font-semibold text-muted-foreground">
                          A
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-sm font-medium">
                            {agent.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {agent.model}
                          </p>
                        </div>
                        <Badge variant="secondary" className="uppercase">
                          {agent.provider}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Select a source to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
