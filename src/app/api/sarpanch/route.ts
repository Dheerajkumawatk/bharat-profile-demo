import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

type SarpanchPayload = {
  slug?: unknown;
  name?: unknown;
  image?: unknown;
  phone?: unknown;
  description?: unknown;
  village?: unknown;
};

const asString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function getUniqueSlug(rawSlug: string, fallbackText: string) {
  const baseSlug = toSlug(rawSlug) || toSlug(fallbackText) || "profile";
  let candidate = baseSlug;
  let suffix = 2;

  while (await prisma.sarpanch.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

async function buildCreateData(payload: SarpanchPayload): Promise<Prisma.SarpanchCreateInput> {
  const name = asString(payload.name) || "New Profile";
  const village = asString(payload.village);
  const phone = asString(payload.phone);
  const description = asString(payload.description);
  const image = asString(payload.image) || "/placeholder-portrait.jpg";
  const slug = await getUniqueSlug(asString(payload.slug), `${name} ${village}`);

  return {
    slug,
    name,
    image,
    phone: phone || null,
    description: description || null,
    village: village || null,
  };
}

export async function GET() {
  try {
    const sarpanchs = await prisma.sarpanch.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(sarpanchs);
  } catch {
    return NextResponse.json({ error: "Failed to fetch sarpanchs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await buildCreateData(body);
    const sarpanch = await prisma.sarpanch.create({
      data,
    });
    return NextResponse.json(sarpanch, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create sarpanch" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Valid profile id is required" }, { status: 400 });
    }

    await prisma.sarpanch.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete sarpanch" }, { status: 500 });
  }
}
