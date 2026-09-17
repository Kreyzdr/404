import privacyDe from "@/i18n/de/Privacy_Policy.txt?raw";
import refundDe from "@/i18n/de/Refund_Policy.txt?raw";
import termsDe from "@/i18n/de/Terms_of_Service.txt?raw";
import privacyEn from "@/i18n/en/Privacy_Policy.txt?raw";
import refundEn from "@/i18n/en/Refund_Policy.txt?raw";
import termsEn from "@/i18n/en/Terms_of_Service.txt?raw";
import privacyEs from "@/i18n/es/Privacy_Policy.txt?raw";
import refundEs from "@/i18n/es/Refund_Policy.txt?raw";
import termsEs from "@/i18n/es/Terms_of_Service.txt?raw";
import privacyRu from "@/i18n/ru/Privacy_Policy.txt?raw";
import refundRu from "@/i18n/ru/Refund_Policy.txt?raw";
import termsRu from "@/i18n/ru/Terms_of_Service.txt?raw";
import privacyZh from "@/i18n/zh/Privacy_Policy.txt?raw";
import refundZh from "@/i18n/zh/Refund_Policy.txt?raw";
import termsZh from "@/i18n/zh/Terms_of_Service.txt?raw";

import type { Locale } from "./types";

export interface DocumentRoute {
  content: string;
}

const documents: Record<Locale, Record<string, DocumentRoute>> = {
  en: {
    "/terms": { content: termsEn },
    "/privacy-policy": { content: privacyEn },
    "/refund-policy": { content: refundEn },
  },
  de: {
    "/terms": { content: termsDe },
    "/privacy-policy": { content: privacyDe },
    "/refund-policy": { content: refundDe },
  },
  es: {
    "/terms": { content: termsEs },
    "/privacy-policy": { content: privacyEs },
    "/refund-policy": { content: refundEs },
  },
  ru: {
    "/terms": { content: termsRu },
    "/privacy-policy": { content: privacyRu },
    "/refund-policy": { content: refundRu },
  },
  zh: {
    "/terms": { content: termsZh },
    "/privacy-policy": { content: privacyZh },
    "/refund-policy": { content: refundZh },
  },
};

export function getDocumentRoute(pathname: string, locale: Locale): DocumentRoute | undefined {
  return documents[locale][pathname];
}

export const TITLE_PATHS: Record<string, string> = {
  "/terms": "meta.termsTitle",
  "/privacy-policy": "meta.privacyTitle",
  "/refund-policy": "meta.refundTitle",
  "/payment-success": "meta.paymentSuccessTitle",
  "/payment-error": "meta.paymentErrorTitle",
};
