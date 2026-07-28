import type { ReactNode } from "react";
import { requireUser } from "@/app/data/user/require-user";

export default async function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireUser();

  return <>{children}</>;
}
