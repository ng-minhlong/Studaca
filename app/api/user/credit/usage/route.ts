import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const takeParam = url.searchParams.get("take");
  const take = takeParam ? Math.min(100, Math.max(1, Number(takeParam))) : 20;

  const usages = await prisma.userCreditUsage.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take,
  });

  return NextResponse.json({ usages });
}
