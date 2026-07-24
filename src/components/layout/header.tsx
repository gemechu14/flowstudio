"use client";

import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type HeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function Header({ title, description, actions }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-6 py-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {actions}
        <Badge
          variant="success"
          className="hidden border border-success/20 bg-success-muted px-2.5 py-1 text-success sm:inline-flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          SYSTEM ONLINE
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {mounted ? (
            isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
