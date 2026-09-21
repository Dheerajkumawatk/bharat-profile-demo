import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WorksGrid } from "@/components/home/WorksGrid";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sarpanch = await prisma.sarpanch.findUnique({
    where: { slug },
  });

  if (!sarpanch) {
    notFound();
  }

  return (
    <>
      <Hero sarpanch={sarpanch} slug={slug} />
      <StatsBar />
      <AboutPreview sarpanch={sarpanch} slug={slug} />
      <WorksGrid />
      <GalleryPreview />
      <NewsPreview />
    </>
  );
}
