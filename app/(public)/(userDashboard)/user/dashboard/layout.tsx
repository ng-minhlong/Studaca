import {
  DashboardSidebar
} from "../_components/UserDashboard";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/60 flex">
      {/* Sidebar bên trái */}
      <div className="hidden md:block shrink-0">
        <DashboardSidebar />
      </div>

      {/* Main Content bên phải */}
      <main className="flex-1 min-w-0 p-6 md:p-10 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}