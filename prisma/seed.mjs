import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run seed.");
}

const pool = new pg.Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

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
  console.log(`Admin ready: ${admin.email}`);

  const pacotes = [
    { nome: "Starter", descricao: "Ideal para comecar", creditos: 10, precoCentavos: 50000 },
    { nome: "Profissional", descricao: "Melhor custo-beneficio", creditos: 25, precoCentavos: 110000 },
    { nome: "Premium", descricao: "Para escritorios maiores", creditos: 50, precoCentavos: 200000 },
  ];

  for (const p of pacotes) {
    const existing = await prisma.pacote.findFirst({ where: { nome: p.nome } });
    if (existing) {
      console.log(`Pacote ja existe: ${p.nome}`);
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
    console.log(`Pacote criado: ${pacote.nome} (${pacote.creditos} creditos)`);
  }

  console.log("Seed complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
