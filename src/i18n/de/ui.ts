import type { DeepString } from "../types"

type En = typeof import("../en/ui").en

export const de: DeepString<En> = {
  lang: {
    label: "Sprache",
  },
  meta: {
    landingTitle: "404: Developer Not Found — KI-Detektivspiel",
    landingDescription:
      "Ein Creator ist verschwunden. Befrage Verdächtige, knacke Passwörter und finde versteckte Akten. Detektivspiel im Browser, 2–3 Stunden. Solo oder mit Freunden.",
    termsTitle: "AGB — 404: Developer Not Found",
    privacyTitle: "Datenschutz — 404: Developer Not Found",
    refundTitle: "Rückerstattung — 404: Developer Not Found",
    paymentSuccessTitle: "Zahlung erfolgreich — 404: Developer Not Found",
    paymentErrorTitle: "Zahlung fehlgeschlagen — 404: Developer Not Found",
  },
  brand: "404: Developer Not Found",
  page: {
    ctaSearch: "Suche starten",
    ctaReady: "Ich bin bereit!",
    ctaBuy: "Ermittlung starten",
    price: "$15.",
    heroKicker: "404:",
    heroTitle: "Entwickler nicht gefunden",
    heroTagline: "Ein KI-Detektivspiel der nächsten Generation",
    challengeTitle: "Endlich *eine Herausforderung* für dein Gehirn",
    challengeBody: [
      "Finde dich mitten in einem",
      "interaktiven Thriller wieder.",
    ],
    bigTechTitle: "Was, wenn Big Tech *etwas verbirgt?*",
    bigTechBody: ["Traust du dich, die", "richtigen Fragen zu stellen?"],
    missingTitle: "Noch ein genialer KI-Entwickler *ist verschwunden*",
    missingBody: "Finde ihn, um die Wahrheit zu erfahren.",
    investigateTitle: "Komm der Sache *auf den Grund*",
    investigate: [
      "Externe Systeme hacken",
      "Spuren in Mediendateien finden",
      "Die Geschichte im Chat erkunden",
    ],
    notForYouTitle: "Das ist *nichts* für dich, wenn du",
    notForYouItems: [
      "Lieber passiv unterhalten wirst",
      "Konzernen jedes Wort glaubst",
      "Nicht gern selbst nachdenkst",
    ],
    charactersTitle: "Komplexe Figuren und *schwere Entscheidungen*",
    charactersBody: [
      "Keine NPCs, keine fertigen Dialoge.",
      "Jeder Durchlauf ist einzigartig.",
    ],
    questsTitle: "Anspruchsvolle und *lohnende* Quests",
    questsItems: [
      "Hacking",
      "Social Engineering",
      "Kreuzverhör",
      "Kryptografie",
    ],
    immersionTitle: "3+ Stunden *tiefe Immersion*",
    immersionBody: [
      "Kein Download-Inhalt.",
      "Keine Mikrotransaktionen. Kein Zeitlimit.",
    ],
    pricingTitle: "Der komplette Fall.",
    pricingBenefits: [
      "Direkt im Browser",
      "Einmaliger Kauf",
      "Solo oder mit Freunden",
      "3+ Stunden volle Immersion",
      "Für neugierige Köpfe",
      "Jagd auf Easter Eggs",
    ],
    faqTitle: "Fragen? *Stell sie hier*",
  },
  scenes: {
    dominic:
      "Ermittlungstafel um das Porträt des verschwundenen Entwicklers: Terminalfenster, Überwachungsbilder und Zeitungsausschnitte",
    corporation:
      "Ein einzelnes erleuchtetes Büro in einem dunklen Konzernturm bei Nacht, darin eine Silhouette",
    missing:
      "Überwachungsbild eines Mannes, der durch den Haupteingang einer Bürolobby hinausgeht",
    externalSystems:
      "Ein Laptop mit einer Terminalsitzung, verbunden mit dem Dateiarchiv eines externen Systems",
    mediaFiles:
      "Ein Beweisordner mit Überwachungsvideos, Audioaufnahmen, Fotos und Dokumenten",
    chat: "Ein Gruppenchat, in dem die Figuren des Falls Sprachnachrichten, Fotos und Dateien austauschen",
    notForYou:
      "Jemand sieht aus einem Sessel in einem dunklen Raum ein Konzerninterview im Fernsehen",
    characters:
      "Fünf Figuren des Falls — Carter, Marie, Dominic, Ethan und Jessica — in einem dunklen Büro",
    quests:
      "Eine Hacking-Oberfläche mit Passwortabfrage, Entschlüsselungspanel und Ortungskarte",
    immersion:
      "Ein Tunnel aus Fallmaterial: Dokumente, Screenshots, Chats und ein Zettel mit „Find him.“",
  },
  faq: {
    heading: "Noch Fragen?",
    inputLabel: "Deine Frage",
    placeholder: "Hier fragen…",
    intro1: "Frag mich alles über das Spiel.",
    intro2: "Moment, ich darf dich wirklich alles über das Spiel fragen?",
    intro3: "Absolut. Leg los.",
    ended: "Chat beendet",
    send: "Senden",
    channelDead: "Die Leitung ist tot. Der Rest der Antworten liegt im Fall.",
    sendFailed: "Nachricht nicht gesendet. Bitte nochmal versuchen.",
    notReady: "Chat ist noch nicht bereit",
  },
  footer: {
    navLabel: "Hauptnavigation",
    legalLabel: "Fußzeilennavigation",
    headings: {
      explore: "Entdecken",
      legal: "Rechtliches",
      studio: "Studio",
    },
    contact: "Kontakt",
    cookieSettings: "Cookie-Einstellungen",
    copyright: "©2026 EPILOGIC STUDIO",
    address:
      "Kobaltstack LLC\n447 Broadway, 2nd Floor, 3436, New York, NY 10013, New York, US",
    main: [
      { label: "Geschichte", href: "/#story" },
      { label: "Charaktere", href: "/#characters" },
      { label: "Kaufen", href: "/#pricing" },
    ],
    legal: [
      { label: "AGB", href: "/terms" },
      { label: "Datenschutz", href: "/privacy-policy" },
      { label: "Erstattung", href: "/refund-policy" },
      { label: "Cookies", href: "/privacy-policy#cookie-policy" },
    ],
    studio: [
      { label: "Über uns", hrefKey: "studio" },
      { label: "Jobs", hrefKey: "studio" },
    ],
  },
  docs: {
    navLabel: "Dokumentnavigation",
    back: "Zurück zu 404: Developer Not Found",
    copyright: "© SHIFT LLC",
    nav: [
      { to: "/terms", label: "AGB" },
      { to: "/privacy-policy", label: "Datenschutz" },
      { to: "/refund-policy", label: "Erstattung" },
    ],
  },
  contact: {
    title: "Kontakt",
    name: "Name",
    email: "E-Mail",
    message: "Nachricht",
    submit: "Senden",
    sending: "Wird gesendet...",
    sentKicker: "Nachricht gesendet",
    sentTitle: "Wir melden uns",
    close: "Schließen",
    success: "Erfolgreich gesendet",
    error: "Nachricht konnte nicht gesendet werden",
    errors: {
      name: "Bitte Namen angeben",
      email: "Bitte E-Mail angeben",
      emailInvalid: "Bitte gültige E-Mail angeben",
      message: "Bitte Nachricht eingeben",
      agreement: "Bitte AGB und Datenschutz akzeptieren",
    },
  },
  paywall: {
    kicker: "Kauf abschließen",
    title: "Detektivlizenz",
    points: ["2–3 Stunden", "Solo oder Team", "Sofortzugang"],
    priceLabel: "Preis: 15 US-Dollar",
    terms: "Einmalig · Kein Abo · Kein Download",
    delivery: "Den Spiellink erhältst du nach der Zahlung per E-Mail.",
    email: "E-Mail",
    emailHint: "E-Mail, an die wir den Spielzugang schicken sollen.",
    privacy: "Deine E-Mail geben wir nicht weiter.",
    submit: "Zur Kasse",
    processing: "WIRD VERARBEITET...",
    errors: {
      email: "Bitte E-Mail angeben",
      emailInvalid: "Bitte gültige E-Mail angeben",
      agreement: "Bitte AGB und Datenschutz akzeptieren",
      generic: "Etwas ist schiefgelaufen. Bitte nochmal versuchen.",
      missingUrl: "Zahlungslink nicht verfügbar. Bitte nochmal versuchen.",
      network: "Netzwerkfehler. Verbindung prüfen und nochmal versuchen.",
    },
  },
  payment: {
    successKicker: "Zahlung erfolgreich",
    errorKicker: "Zahlung fehlgeschlagen",
    successTitle: "Du bist drin",
    errorTitle: "Etwas ist schiefgelaufen",
    back: "Zur Startseite",
  },
  legal: {
    agreeLead: "Mit Klick auf den Button akzeptiere ich die",
    agreeMid: "und die",
    terms: "AGB",
    privacy: "Datenschutzerklärung",
  },
  modal: {
    close: "Schließen",
  },
}
