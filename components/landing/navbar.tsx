"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, GraduationCap, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSignOut } from "@/hooks/use-signout";

const links = [
  { label: "Features", href: "#features" },
  { label: "Question Bank", href: "#question-bank" },
  { label: "AI Learning", href: "#ai-learning" },
  { label: "Courses", href: "#courses" },
  { label: "Coding", href: "#coding" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = useSignOut();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link href="#top" className="flex min-w-0 shrink-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-primary text-primary-foreground">
            <GraduationCap className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-ink">Studaca</span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {!isPending && session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-background/80 p-1 pr-3 shadow-sm transition-colors hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user.image ?? ""} alt={session.user.name || "User"} />
                    <AvatarFallback>
                      {(session.user.name || session.user.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-ink">
                    {session.user.name || session.user.email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  {session.user.name || session.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/history">History</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login" className="rounded-btn px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-ink">
                Sign In
              </Link>
              <Link href="/register" className="rounded-btn bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:brightness-110 active:scale-[0.98]">
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-border bg-card lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
              {!isPending && session ? (
                <>
                  <Link href="/profile" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-ink">
                    Profile
                  </Link>
                  <Link href="/history" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-ink">
                    History
                  </Link>
                  <button onClick={() => { setOpen(false); handleSignOut(); }} className="mt-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground text-center">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/register" onClick={() => setOpen(false)} className="mt-2 rounded-btn bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground text-center">
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
