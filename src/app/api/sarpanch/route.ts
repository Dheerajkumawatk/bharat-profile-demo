import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const sarpanchs = await prisma.sarpanch.findMany();
    return NextResponse.json(sarpanchs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sarpanchs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sarpanch = await prisma.sarpanch.create({
      data: body,
    });
    return NextResponse.json(sarpanch, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create sarpanch" }, { status: 500 });
  }
}
