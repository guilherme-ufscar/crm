import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function maskPhone(phone: string): string {
  // Show only last 4 digits: (**) *****-1234
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 4) return "(**) *****-****";
  const last4 = cleaned.slice(-4);
  return `(**) *****-${last4}`;
}

export function maskName(name: string): string {
  const parts = name.split(" ");
  if (parts.length <= 1) return name.charAt(0) + "***";
  return parts[0] + " " + parts.slice(1).map((p) => p.charAt(0) + ".").join(" ");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export const AREAS_DIREITO = [
  { value: "TRABALHISTA", label: "Trabalhista", slug: "trabalhista", icon: "Briefcase" },
  { value: "PREVIDENCIARIO", label: "Previdenciário (INSS)", slug: "previdenciario", icon: "Shield" },
  { value: "CONSUMIDOR", label: "Consumidor", slug: "consumidor", icon: "ShoppingBag" },
  { value: "FAMILIA", label: "Direito de Família", slug: "familia", icon: "Users" },
  { value: "CRIMINAL", label: "Direito Criminal", slug: "criminal", icon: "Scale" },
  { value: "IMOVEIS", label: "Direito Imobiliário", slug: "imoveis", icon: "Home" },
  { value: "EMPRESARIAL", label: "Direito Empresarial", slug: "empresarial", icon: "Building" },
  { value: "OUTROS", label: "Outras Áreas", slug: "outros", icon: "MoreHorizontal" },
] as const;

export const UFS_BRASIL = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"
] as const;

export function getAreaBySlug(slug: string) {
  return AREAS_DIREITO.find((a) => a.slug === slug);
}

export function getAreaByValue(value: string) {
  return AREAS_DIREITO.find((a) => a.value === value);
}
