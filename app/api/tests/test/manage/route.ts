import { readFileSync } from "node:fs";
import path from "node:path";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

type EnumOption = {
  value: string;
  label: string;
};

const managedModelNames = [
  "DigitalSatQuestionBankMath",
  "DigitalSatQuestionBankVerbal",
  "DigitalSatTestList",
  "HsaTests",
  "HsaTestLists",
  "HsaTestPartList",
  "IeltsListeningTestListPart",
  "IeltsListeningTestList",
  "IeltsReadingTestListPart",
  "IeltsReadingTestList",
  "IeltsSpeakingTestListPart",
  "IeltsSpeakingTestList",
  "IeltsWritingTestListPart",
  "IeltsWritingTestList",
  "JlptTestList",
  "JlptTestPartList",
  "ThptqgQuestion",
  "ToeicListeningTestList",
  "ToeicListeningTestListPart",
  "ToeicReadingTestList",
  "ToeicReadingTestListPart",
  "ToeicSpeakingTestList",
  "ToeicSpeakingTestListPart",
  "ToeicWritingTestList",
  "ToeicWritingTestListPart",
  "TopikListeningTestList",
  "TopikReadingTestList",
  "VactTests",
  "HskTestList",
  "HskTestPartList",
  "TestCollection",
];

function getSchemaEnumMetadata(schemaText: string) {
  const enumBlocks = Array.from(schemaText.matchAll(/enum\s+(\w+)\s*\{([\s\S]*?)\n\}/g));

  return Object.fromEntries(
    enumBlocks.map(([_, name, block]) => {
      const values = block
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("//"))
        .map((line) => {
          const match = line.match(/^([A-Za-z0-9_]+)(?:\s+.*)?$/);
          if (!match) {
            return null;
          }

          const value = match[1];
          const labelMatch = line.match(/@map\("([^"]+)"\)/);
          return {
            value,
            label: labelMatch?.[1] ?? value,
          } as EnumOption;
        })
        .filter((item): item is EnumOption => Boolean(item));

      return [name, values];
    }),
  );
}

function getSchemaModelMetadata() {
  const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
  const schemaText = readFileSync(schemaPath, "utf8");
  const enumMetadata = getSchemaEnumMetadata(schemaText);
  const modelBlocks = Array.from(schemaText.matchAll(/model\s+(\w+)\s*\{([\s\S]*?)\n\}/g));

  return modelBlocks
    .filter(([_, name]) => managedModelNames.includes(name))
    .map(([_, name, block]) => {
      const fields = block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("@@") && !line.startsWith("//"))
        .map((line) => {
          const match = line.match(/^(\w+)\s+([A-Za-z0-9_?]+)(?:\s+.*)?$/);
          if (!match) {
            return null;
          }

          const [, fieldName, fieldType] = match;
          const normalizedType = fieldType.replace(/\?$/, "");
          const isOptional = fieldType.endsWith("?");
          const isId = line.includes("@id");
          const hasDefaultValue = line.includes("@default") || line.includes("@updatedAt") || line.includes("@map") || line.includes("@unique");
          const enumValues = enumMetadata[normalizedType];

          return {
            name: fieldName,
            type: normalizedType,
            isId,
            isRequired: !isOptional && !hasDefaultValue,
            hasDefaultValue,
            enumName: enumValues ? normalizedType : undefined,
            enumValues,
          };
        })
        .filter((field): field is NonNullable<typeof field> => Boolean(field));

      return {
        name,
        label: name.replace(/([A-Z])/g, " $1").trim(),
        tableName: name,
        fields,
      };
    });
}

const modelMetadata = getSchemaModelMetadata();

function getModelMeta(modelName: string) {
  return modelMetadata.find((model) => model.name === modelName);
}

function getPrismaModelKey(modelName: string) {
  return modelName.charAt(0).toLowerCase() + modelName.slice(1);
}

function buildError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function sanitizeRecord(record: Record<string, unknown> | null | undefined) {
  if (!record) return {};

  const nextRecord: Record<string, unknown> = {};

  Object.entries(record).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === "string" && value.trim() === "") {
      nextRecord[key] = value;
      return;
    }

    nextRecord[key] = value;
  });

  return nextRecord;
}

async function ensureAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  if (session.user.role !== "admin") {
    return null;
  }

  return session;
}

export async function GET(request: NextRequest) {
  const adminSession = await ensureAdmin();
  if (!adminSession) {
    return buildError("Unauthorized", 401);
  }

  const modelName = request.nextUrl.searchParams.get("model") ?? "DigitalSatQuestionBankMath";
  const model = getModelMeta(modelName);

  if (!model) {
    return buildError("Unsupported model", 400);
  }

  const prismaModel = (prisma as unknown as Record<string, unknown>)[getPrismaModelKey(model.name)] as {
    findMany: (args?: Record<string, unknown>) => Promise<unknown[]>;
  };

  if (!prismaModel?.findMany) {
    return buildError("Model is not available in Prisma client", 400);
  }

  const records = await prismaModel.findMany({
    orderBy: { number: "asc" },
  });

  return NextResponse.json({
    model,
    models: modelMetadata,
    records,
  });
}

export async function POST(request: NextRequest) {
  const adminSession = await ensureAdmin();
  if (!adminSession) {
    return buildError("Unauthorized", 401);
  }

  const body = await request.json().catch(() => null);
  const modelName = body?.model;
  const record = body?.record;

  if (!modelName || typeof modelName !== "string") {
    return buildError("Missing model name", 400);
  }

  const model = getModelMeta(modelName);
  if (!model) {
    return buildError("Unsupported model", 400);
  }

  const prismaModel = (prisma as unknown as Record<string, unknown>)[getPrismaModelKey(model.name)] as {
    create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  };

  if (!prismaModel?.create) {
    return buildError("Model is not available in Prisma client", 400);
  }

  const created = await prismaModel.create({
    data: sanitizeRecord(record),
  });

  return NextResponse.json({ success: true, record: created });
}

export async function PATCH(request: NextRequest) {
  const adminSession = await ensureAdmin();
  if (!adminSession) {
    return buildError("Unauthorized", 401);
  }

  const body = await request.json().catch(() => null);
  const modelName = body?.model;
  const record = body?.record;

  if (!modelName || typeof modelName !== "string") {
    return buildError("Missing model name", 400);
  }

  const model = getModelMeta(modelName);
  if (!model) {
    return buildError("Unsupported model", 400);
  }

  const prismaModel = (prisma as unknown as Record<string, unknown>)[getPrismaModelKey(model.name)] as {
    update: (args: { where: { number: number }; data: Record<string, unknown> }) => Promise<unknown>;
  };

  if (!prismaModel?.update) {
    return buildError("Model is not available in Prisma client", 400);
  }

  const number = Number(record?.number);
  if (!Number.isFinite(number)) {
    return buildError("Missing numeric id field", 400);
  }

  const updated = await prismaModel.update({
    where: { number },
    data: sanitizeRecord(record),
  });

  return NextResponse.json({ success: true, record: updated });
}

export async function DELETE(request: NextRequest) {
  const adminSession = await ensureAdmin();
  if (!adminSession) {
    return buildError("Unauthorized", 401);
  }

  const body = await request.json().catch(() => null);
  const modelName = body?.model;
  const number = Number(body?.number);

  if (!modelName || typeof modelName !== "string") {
    return buildError("Missing model name", 400);
  }

  const model = getModelMeta(modelName);
  if (!model) {
    return buildError("Unsupported model", 400);
  }

  const prismaModel = (prisma as unknown as Record<string, unknown>)[getPrismaModelKey(model.name)] as {
    delete: (args: { where: { number: number } }) => Promise<unknown>;
  };

  if (!prismaModel?.delete) {
    return buildError("Model is not available in Prisma client", 400);
  }

  await prismaModel.delete({ where: { number } });

  return NextResponse.json({ success: true });
}
