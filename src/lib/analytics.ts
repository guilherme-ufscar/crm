type EventName =
  | "clique_whatsapp_home"
  | "clique_enviar_caso_home"
  | "clique_area_card"
  | "form_start"
  | "form_step_complete"
  | "form_submit_success"
  | "form_submit_blocked"
  | "redirect_whatsapp_success"
  | "advogado_cadastro"
  | "advogado_login"
  | "advogado_compra_pacote"
  | "advogado_adquiriu_lead"
  | "advogado_clique_whatsapp_lead"
  | "page_view";

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track an event to Google Analytics 4
 */
export function trackEvent(name: EventName, params?: EventParams) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${name}`, params);
  }
}

/**
 * Get UTM parameters from the URL
 */
export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const utms: Record<string, string> = {};

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });

  // Also save referer
  if (document.referrer) {
    utms.referer = document.referrer;
  }

  return utms;
}

/**
 * Store UTM params in sessionStorage on first visit
 */
export function persistUtmParams() {
  if (typeof window === "undefined") return;

  const stored = sessionStorage.getItem("utm_params");
  if (stored) return; // Already saved this session

  const utms = getUtmParams();
  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem("utm_params", JSON.stringify(utms));
  }
}

/**
 * Get stored UTM params
 */
export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem("utm_params");
    return stored ? JSON.parse(stored) : getUtmParams();
  } catch {
    return {};
  }
}

// Extend window for gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
