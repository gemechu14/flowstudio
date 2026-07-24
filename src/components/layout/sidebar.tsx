"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Bot,
  Database,
  GitBranch,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/data-sources", label: "Data Sources", icon: Database },
  { href: "/workflows", label: "Workflows", icon: GitBranch },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="border-b border-sidebar-border px-5 py-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary shadow-[0_0_20px_-4px] shadow-primary/50">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-white" />
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold tracking-[0.12em] text-white">
              FLOWSTUDIO
            </div>
            <div className="text-[9px] font-medium tracking-[0.14em] text-sidebar-muted">
              POWERED BY CRESTWARD LABS
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
        <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.16em] text-sidebar-muted">
          NAVIGATION
        </p>
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all",
                active
                  ? "bg-sidebar-accent text-blue-300"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
              )}
            >
              {active && (
                <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-primary" />
              )}
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  active ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/[0.04]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            G
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-zinc-200">Gemma</p>
            <p className="truncate text-[11px] text-sidebar-muted">
              gemma@crestward.io
            </p>
          </div>
          <button
            type="button"
            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
