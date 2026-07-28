import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const credit = await prisma.userCredit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json({
    credit: credit ?? {
      userId: session.user.id,
      balance: 0,
    },
  });
}
