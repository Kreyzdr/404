import { useEffect, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import Landing from "@/components/Landing";
import ContactModal from "@/components/ContactModal/ContactModal";
import DocumentPage from "@/components/DocumentPage/DocumentPage";
import PaywallModal from "@/components/PaywallModal/PaywallModal";
import PaymentStatus from "@/components/PaymentStatus/PaymentStatus";
import { useAppLocation } from "@/hooks/useAppLocation";
import { getDocumentRoute, useI18n } from "@/i18n";
import { trackLandingBuyClick } from "@/lib/landingAnalytics";
import {
  CONTACT_FORM_SOURCE,
  CONTACT_FORM_SUBJECT,
  CONTACT_URL,
} from "@/lib/site";

export default function App() {
  const { location, pathname } = useAppLocation();
  const { locale } = useI18n();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  useEffect(() => {
    setIsContactOpen(false);
    setIsPaywallOpen(false);
  }, [location.pathname]);

  const handleOpenPaywall = () => {
    trackLandingBuyClick();
    setIsPaywallOpen(true);
  };

  const documentRoute = getDocumentRoute(pathname, locale);

  if (documentRoute) {
    return (
      <DocumentPage content={documentRoute.content} pathname={pathname} />
    );
  }

  if (pathname === "/payment-success") {
    return <PaymentStatus variant="success" />;
  }

  if (pathname === "/payment-error") {
    return <PaymentStatus variant="error" />;
  }

  return (
    <>
      <div className="min-h-full w-full overflow-x-hidden bg-ink">
        <main>
          <Landing onOpenPaywall={handleOpenPaywall} />
        </main>
        <SiteFooter onOpenContact={() => setIsContactOpen(true)} />
      </div>
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        submitUrl={CONTACT_URL}
        subject={CONTACT_FORM_SUBJECT}
        source={CONTACT_FORM_SOURCE}
      />
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
    </>
  );
}
