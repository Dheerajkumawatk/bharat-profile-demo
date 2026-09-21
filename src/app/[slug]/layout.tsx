import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import prisma from "@/lib/prisma";

export default async function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sarpanch = await prisma.sarpanch.findUnique({
    where: { slug },
  });

  if (!sarpanch) {
    notFound();
  }

  return (
    <>
      <Navbar sarpanch={sarpanch} slug={slug} />
      <main>{children}</main>
      <Footer sarpanch={sarpanch} slug={slug} />
    </>
  );
}
