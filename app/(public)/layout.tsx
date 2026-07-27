import { ReactNode } from "react";
import { Navbar } from "@/components/landing/navbar";

export default function LayoutPublic({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:p-x-6 lg:px-8 mb-32">
        {children}
      </main>
    </div>
  );
}
