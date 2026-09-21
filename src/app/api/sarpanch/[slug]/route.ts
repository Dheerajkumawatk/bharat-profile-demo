import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const sarpanch = await prisma.sarpanch.findUnique({
      where: { slug },
    });
    if (!sarpanch) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(sarpanch);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sarpanch" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const sarpanch = await prisma.sarpanch.update({
      where: { slug },
      data: body,
    });
    return NextResponse.json(sarpanch);
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete sarpanch" }, { status: 500 });
  }
}
