"use client";

import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/public-env";

export function WhatsAppFloat() {
  const handleClick = () => {
    trackEvent("clique_whatsapp_home", { location: "floating_button" });
  };

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
    </a>
  );
}

