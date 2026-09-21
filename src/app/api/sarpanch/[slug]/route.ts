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

async function getUniqueSlug(rawSlug: string, fallbackText: string, currentSlug: string) {
  const baseSlug = toSlug(rawSlug) || toSlug(fallbackText) || "profile";
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existing = await prisma.sarpanch.findUnique({
      where: { slug: candidate },
      select: { slug: true },
    });

    if (!existing || existing.slug === currentSlug) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

async function buildUpdateData(payload: SarpanchPayload, currentSlug: string): Promise<Prisma.SarpanchUpdateInput> {
  const name = asString(payload.name) || "New Profile";
  const village = asString(payload.village);
  const phone = asString(payload.phone);
  const description = asString(payload.description);
  const image = asString(payload.image) || "/placeholder-portrait.jpg";
  const slug = await getUniqueSlug(asString(payload.slug), `${name} ${village}`, currentSlug);

  return {
    slug,
    name,
    image,
    phone: phone || null,
    description: description || null,
    village: village || null,
  };
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const sarpanch = await prisma.sarpanch.findUnique({
      where: { slug },
    });
    if (!sarpanch) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(sarpanch);
  } catch {
    return NextResponse.json({ error: "Failed to fetch sarpanch" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const data = await buildUpdateData(body, slug);
    const sarpanch = await prisma.sarpanch.update({
      where: { slug },
      data,
    });
    return NextResponse.json(sarpanch);
  } catch {
    return NextResponse.json({ error: "Failed to update sarpanch" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await prisma.sarpanch.delete({
      where: { slug },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete sarpanch" }, { status: 500 });
  }
}
