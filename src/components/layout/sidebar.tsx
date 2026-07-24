"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Wrench,
  Bot,
  Database,
  GitBranch,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
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

const STORAGE_KEY = "flowstudio-sidebar-collapsed";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setCollapsed(true);
    setMounted(true);
  }, []);

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "group/sidebar relative flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-[68px]" : "w-[240px]",
        !mounted && "w-[240px]"
      )}
    >
      {/* Edge toggle — sits on the sidebar border */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand" : "Collapse"}
        className={cn(
          "absolute top-[22px] z-20 flex h-6 w-6 items-center justify-center rounded-full",
          "bg-sidebar text-zinc-400",
          "opacity-0 transition-all duration-200",
          "hover:text-white group-hover/sidebar:opacity-100",
          "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
          collapsed ? "-right-3 opacity-100" : "-right-3"
        )}
      >
        {collapsed ? (
          <ChevronsRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronsLeft className="h-3.5 w-3.5" />
        )}
      </button>

      <div
        className={cn(
          "flex h-[65px] items-center border-b border-sidebar-border",
          collapsed ? "justify-center px-0" : "px-4"
        )}
      >
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          title="FlowStudio"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary shadow-[0_0_20px_-4px] shadow-primary/50">
            <span className="h-2.5 w-2.5 rounded-[2px] bg-white" />
          </span>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[13px] font-semibold tracking-[0.12em] text-white">
                FLOWSTUDIO
              </div>
              <div className="truncate text-[9px] font-medium tracking-[0.14em] text-sidebar-muted">
                POWERED BY CRESTWARD LABS
              </div>
            </div>
          )}
        </Link>
      </div>

      <nav
        className={cn(
          "flex flex-1 flex-col gap-1 py-4",
          collapsed ? "items-center px-2" : "px-3"
        )}
      >
        {!collapsed && (
          <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.16em] text-sidebar-muted">
            NAVIGATION
          </p>
        )}
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
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex items-center rounded-lg text-[13px] font-medium transition-all",
                collapsed ? "h-10 w-10 justify-center" : "gap-3 px-3 py-2.5",
                active
                  ? "bg-sidebar-accent text-blue-300"
                  : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
              )}
            >
              {active && !collapsed && (
                <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-primary" />
              )}
              {active && collapsed && (
                <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
              )}
              <Icon
                className={cn(
                  "h-[18px] w-[18px] shrink-0",
                  active ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
                  )}
                </>
              )}

              {collapsed && (
                <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2.5">
        <div
          className={cn(
            "flex items-center rounded-lg",
            collapsed ? "justify-center py-1" : "gap-3 px-2 py-2 hover:bg-white/[0.04]"
          )}
          title={collapsed ? "gemma@crestward.io" : undefined}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
            G
          </div>
          {!collapsed && (
            <>
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
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
