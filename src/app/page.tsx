"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Bot,
  GitBranch,
  TrendingUp,
  Wrench,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  activityLast7Days,
  dashboardStats,
  recentRuns,
} from "@/lib/mock-data";
import { formatTokens } from "@/lib/utils";
import Link from "next/link";

const statCards = [
  {
    label: "Agents",
    value: dashboardStats.agents.count,
    detail: dashboardStats.agents.detail,
    icon: Users,
  },
  {
    label: "Workflows",
    value: dashboardStats.workflows.count,
    detail: dashboardStats.workflows.detail,
    icon: GitBranch,
  },
  {
    label: "Tools",
    value: dashboardStats.tools.count,
    detail: dashboardStats.tools.detail,
    icon: Wrench,
  },
  {
    label: "Runs This Week",
    value: dashboardStats.runsThisWeek.count,
    detail: dashboardStats.runsThisWeek.detail,
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Header
        title="Dashboard"
        description="Platform overview and activity."
      />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="relative min-h-[128px] overflow-hidden">
                  <CardContent className="flex h-full items-center p-6">
                    <div className="flex w-full items-start justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="mt-3 font-mono text-3xl font-semibold tracking-tight">
                          {stat.value}
                        </p>
                        <p className="mt-1.5 text-xs text-muted-foreground">
                          {stat.detail}
                        </p>
                      </div>
                      <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                  Activity · Last 7 Days
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityLast7Days} barSize={28}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--border)"
                    />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      domain={[0, 4]}
                    />
                    <Tooltip
                      cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Bar
                      dataKey="runs"
                      fill="var(--chart-1)"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    By Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Completed</span>
                    <span className="text-muted-foreground">2 runs · 100%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-full rounded-full bg-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Token Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Today
                      </p>
                      <p className="mt-1 font-mono text-2xl font-semibold text-primary">
                        {formatTokens(dashboardStats.tokensToday)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        This Week
                      </p>
                      <p className="mt-1 font-mono text-2xl font-semibold text-primary">
                        {formatTokens(dashboardStats.tokensWeek)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Recent Runs
              </CardTitle>
              <Link
                href="/workflows"
                className="text-xs font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-t border-border text-left text-xs text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Workflow</th>
                      <th className="px-5 py-3 font-medium">Mode</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Tokens</th>
                      <th className="px-5 py-3 font-medium">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRuns.map((run) => (
                      <tr
                        key={run.id}
                        className="border-t border-border transition-colors hover:bg-muted/40"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{run.workflow}</p>
                              <p className="font-mono text-[11px] text-muted-foreground">
                                {run.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <Badge variant="hybrid">{run.mode}</Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-success" />
                            Completed
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-muted-foreground">
                          {formatTokens(run.tokens)}
                        </td>
                        <td className="px-5 py-3.5 text-muted-foreground">
                          {run.when}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
