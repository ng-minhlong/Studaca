"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  CreditCard, 
  BookOpen, 
  History, 
  LayoutDashboard, 
  LogOut, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils"; // Hoặc dùng clsx / tailwind-merge nếu có

const navItems = [
  {
    title: "Credit & Nạp Tiền",
    href: "/dashboard/credit",
    icon: CreditCard,
    badge: "Hot",
  },
  {
    title: "Khóa Học Của Tôi",
    href: "/dashboard/my-course",
    icon: BookOpen,
  },
  {
    title: "Lịch Sử Luyện Thi",
    href: "/dashboard/test-history",
    icon: History,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200/80 bg-white flex flex-col justify-between min-h-[calc(100vh-4rem)] p-4 select-none">
      <div className="space-y-6">
        {/* Profile / Header mini */}
        <div className="px-3 py-2 flex items-center gap-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-200">
            U
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold text-slate-800 truncate">Học viên</h3>
            <p className="text-xs text-slate-500 truncate">Dashboard cá nhân</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Quản lý
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ease-in-out",
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                    )}
                  />
                  <span>{item.title}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-100 text-amber-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Card nhận ưu đãi / CTA nhỏ ở chân Sidebar */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-3 relative overflow-hidden">
        <Sparkles className="h-12 w-12 text-indigo-400/20 absolute -right-2 -bottom-2 pointer-events-none" />
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-indigo-200">Hệ thống sẵn sàng</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Tích lũy credit để mở khóa các bài thi và khóa học cao cấp.
        </p>
      </div>
    </aside>
  );
}