import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@jurilead.com.br" },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@jurilead.com.br",
      senhaHash: adminPassword,
      role: "MASTER",
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Create packages
  const pacotes = [
    { nome: "Starter", descricao: "Ideal para começar", creditos: 10, precoCentavos: 50000 },
    { nome: "Profissional", descricao: "Melhor custo-benefício", creditos: 25, precoCentavos: 110000 },
    { nome: "Premium", descricao: "Para escritórios maiores", creditos: 50, precoCentavos: 200000 },
  ];

  for (const p of pacotes) {
    const existing = await prisma.pacote.findFirst({ where: { nome: p.nome } });
    if (existing) {
      console.log(`⏭️  Pacote já existe: ${p.nome}`);
      continue;
    }
    const pacote = await prisma.pacote.create({
      data: {
        nome: p.nome,
        descricao: p.descricao,
        creditos: p.creditos,
        precoCentavos: p.precoCentavos,
        ativo: true,
      },
    });
    console.log(`✅ Pacote: ${pacote.nome} — ${pacote.creditos} créditos`);
  }

  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
