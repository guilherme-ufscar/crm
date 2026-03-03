import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: "advogado-credentials",
      name: "Advogado",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        const advogado = await prisma.advogado.findUnique({
          where: { email: credentials.email as string },
        });

        if (!advogado) return null;

        const isValid = await bcrypt.compare(
          credentials.senha as string,
          advogado.senhaHash
        );

        if (!isValid) return null;

        // Update last login
        await prisma.advogado.update({
          where: { id: advogado.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: advogado.id,
          email: advogado.email,
          name: advogado.nome,
          role: "advogado" as const,
        };
      },
    }),
    Credentials({
      id: "admin-credentials",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) return null;

        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) return null;

        const isValid = await bcrypt.compare(
          credentials.senha as string,
          admin.senhaHash
        );

        if (!isValid) return null;

        return {
          id: admin.id,
          email: admin.email,
          name: admin.nome,
          role: admin.role as string,
        };
      },
    }),
  ],
});
