import prisma from '../src/lib/prisma';

async function main() {
  const sarpanchs = [
    {
      slug: "dheeraj",
      name: "श्री धीरज कुमार",
      image: "/placeholder-portrait.jpg",
      phone: "+91 98765 11111",
      description: "गांव के विकास के लिए समर्पित।",
      village: "रामपुर",
    },
    {
      slug: "sadeed",
      name: "श्री सदीद खान",
      image: "/placeholder-portrait.jpg",
      phone: "+91 98765 22222",
      description: "सच्चाई और ईमानदारी से सेवा।",
      village: "कमालपुर",
    },
    {
      slug: "sanjay",
      name: "श्री संजय शर्मा",
      image: "/placeholder-portrait.jpg",
      phone: "+91 98765 33333",
      description: "हमारा गांव, हमारा अभिमान।",
      village: "सीतापुर",
    },
  ];

  for (const s of sarpanchs) {
    await prisma.sarpanch.upsert({
      where: { slug: s.slug },
      update: {},
      create: s,
    });
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
