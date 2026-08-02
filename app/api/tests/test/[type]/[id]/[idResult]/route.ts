import { NextResponse } from "next/server";
import { getDbTestForSession } from "@/modules/exam/db";
import { isValidType } from "@/modules/exam/registry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string; id: string; idResult: string }> }
) {
  const { type, id, idResult } = await params;

  console.log("id result: ", idResult);
  console.log("id type: ", type);

  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid test type" }, { status: 400 });
  }

  const test = await getDbTestForSession(type, id, idResult);

  if (!test) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ test });
}
