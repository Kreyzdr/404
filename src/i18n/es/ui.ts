import type { DeepString } from "../types"

type En = typeof import("../en/ui").en

export const es: DeepString<En> = {
  lang: {
    label: "Idioma",
  },
  meta: {
    landingTitle: "404: Creator Not Found — detective en el navegador",
    landingDescription:
      "Un creator desapareció. Interroga sospechosos, rompe contraseñas y halla archivos ocultos. Detective en el navegador, 2–3 horas. Solo o con amigos.",
    termsTitle: "Términos — 404: Creator Not Found",
    privacyTitle: "Privacidad — 404: Creator Not Found",
    refundTitle: "Reembolsos — 404: Creator Not Found",
    paymentSuccessTitle: "Pago correcto — 404: Creator Not Found",
    paymentErrorTitle: "Pago fallido — 404: Creator Not Found",
  },
  brand: "404: Creator Not Found",
  page: {
    ctaSearch: "Empezar la búsqueda",
    ctaReady: "¡Estoy listo!",
    ctaBuy: "Empezar la investigación",
    price: "$45.",
    heroKicker: "404:",
    heroTitle: "Desarrollador no encontrado",
    heroTagline: "Un juego de detectives con IA de nueva generación",
    challengeTitle: "Por fin, *un reto* para tu mente",
    challengeBody: ["Encuéntrate en medio de un", "thriller interactivo."],
    bigTechTitle: "¿Y si big tech *oculta algo?*",
    bigTechBody: ["¿Te atreverás a hacer", "las preguntas correctas?"],
    missingTitle: "Otro genio desarrollador de IA *ha desaparecido*",
    missingBody: "Encuéntralo para saber la verdad.",
    investigateTitle: "Llega *al fondo* del asunto",
    investigate: [
      "Hackea sistemas externos",
      "Halla pistas en archivos multimedia",
      "Explora la historia en un chat",
    ],
    notForYouTitle: "Esto *no* es para ti si",
    notForYouItems: [
      "Prefieres un papel pasivo en el entretenimiento",
      "Te crees todo lo que dicen las corporaciones",
      "No te gusta poner a prueba tu mente",
    ],
    charactersTitle: "Personajes complejos y *decisiones difíciles*",
    charactersBody: [
      "Sin NPCs ni frases prefabricadas.",
      "Cada partida es única.",
    ],
    questsTitle: "Misiones exigentes y *gratificantes*",
    questsItems: [
      "Hackeo",
      "Ingeniería social",
      "Interrogatorio cruzado",
      "Criptografía",
    ],
    immersionTitle: "3+ horas de *inmersión profunda*",
    immersionBody: [
      "Sin contenido descargable.",
      "Sin microtransacciones. Sin límite de tiempo.",
    ],
    pricingTitle: "El caso completo.",
    pricingBenefits: [
      "Directo en el navegador",
      "Compra única",
      "Solo o con amigos",
      "3+ horas de inmersión total",
      "Para mentes curiosas",
      "Caza de easter eggs",
    ],
    faqTitle: "¿Preguntas? *Hazlas aquí*",
  },
  scenes: {
    dominic:
      "Tablero del caso alrededor del retrato del desarrollador desaparecido: terminales, capturas de vigilancia y recortes de prensa",
    corporation:
      "Una única oficina iluminada en una torre corporativa a oscuras, con una silueta dentro",
    missing:
      "Imagen de vigilancia de un hombre saliendo por la entrada principal del vestíbulo de una oficina",
    externalSystems:
      "Un portátil con una sesión de terminal conectada al archivo de ficheros de un sistema externo",
    mediaFiles:
      "Una carpeta de pruebas con vídeos de vigilancia, grabaciones de audio, fotos y documentos",
    chat: "Un chat de grupo donde los personajes del caso intercambian notas de voz, fotos y archivos",
    notForYou:
      "Alguien viendo una entrevista corporativa en la tele desde un sillón, en una sala a oscuras",
    characters:
      "Cinco personajes del caso — Carter, Marie, Dominic, Ethan y Jessica — en una oficina a oscuras",
    quests:
      "Una interfaz de hackeo con petición de contraseña, panel de descifrado y mapa de rastreo",
    immersion:
      "Un túnel de material del caso: documentos, capturas, chats y una nota que dice «Find him.»",
  },
  faq: {
    heading: "¿Aún tienes preguntas?",
    inputLabel: "Tu pregunta",
    placeholder: "Pregunta aquí…",
    intro1: "Pregúntame lo que quieras sobre el juego.",
    intro2: "Espera, ¿de verdad puedo preguntarte lo que sea del juego?",
    intro3: "Por supuesto. Adelante.",
    ended: "Chat cerrado",
    send: "Enviar",
    channelDead:
      "La línea se cortó. El resto de las respuestas está en el caso.",
    sendFailed: "No se pudo enviar. Inténtalo de nuevo.",
    notReady: "El chat aún no está listo",
  },
  footer: {
    navLabel: "Navegación principal",
    legalLabel: "Navegación del pie",
    headings: {
      explore: "Explorar",
      legal: "Legal",
      studio: "Estudio",
    },
    contact: "Contacto",
    copyright: "©2026 EPILOGIC STUDIO",
    address:
      "SHIFT LLC. 5, street 17, Argel, Nor Hachn, Kotayk region, 2404, RA",
    main: [
      { label: "Historia", href: "/#story" },
      { label: "Personajes", href: "/#characters" },
      { label: "Comprar", href: "/#pricing" },
    ],
    legal: [
      { label: "Términos", href: "/terms" },
      { label: "Privacidad", href: "/privacy-policy" },
      { label: "Reembolsos", href: "/refund-policy" },
      { label: "Cookies", href: "/privacy-policy#cookie-policy" },
    ],
    studio: [
      { label: "Sobre nosotros", hrefKey: "studio" },
      { label: "Empleo", hrefKey: "studio" },
    ],
  },
  docs: {
    navLabel: "Navegación de documentos",
    back: "Volver a 404: Creator Not Found",
    copyright: "© SHIFT LLC",
    nav: [
      { to: "/terms", label: "Términos" },
      { to: "/privacy-policy", label: "Privacidad" },
      { to: "/refund-policy", label: "Reembolsos" },
    ],
  },
  contact: {
    title: "Contacto",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    submit: "Enviar",
    sending: "Enviando...",
    sentKicker: "Mensaje enviado",
    sentTitle: "Te escribimos",
    close: "Cerrar",
    success: "Enviado con éxito",
    error: "No se pudo enviar el mensaje",
    errors: {
      name: "Indica tu nombre",
      email: "Indica tu email",
      emailInvalid: "Indica un email válido",
      message: "Escribe tu mensaje",
      agreement: "Acepta los Términos y la Privacidad",
    },
  },
  paywall: {
    kicker: "Completar la compra",
    title: "Licencia de detective",
    points: ["2–3 horas", "Solo o en equipo", "Acceso al instante"],
    priceLabel: "Precio: 45 USD",
    terms: "Pago único · Sin suscripción · Sin descargas",
    delivery: "El enlace del juego llega a tu email tras el pago.",
    email: "Email",
    emailHint: "Email al que quieres que enviemos el acceso al juego.",
    privacy: "No compartimos tu email con nadie.",
    submit: "Ir al pago",
    processing: "PROCESANDO...",
    errors: {
      email: "Indica tu email",
      emailInvalid: "Indica un email válido",
      agreement: "Acepta los Términos y la Privacidad",
      generic: "Algo salió mal. Inténtalo de nuevo.",
      missingUrl: "El enlace de pago no está disponible. Inténtalo de nuevo.",
      network: "Error de red. Revisa la conexión e inténtalo de nuevo.",
    },
  },
  payment: {
    successKicker: "Pago correcto",
    errorKicker: "Pago fallido",
    successTitle: "Ya estás dentro",
    errorTitle: "Algo salió mal",
    back: "Volver al inicio",
  },
  legal: {
    agreeLead: "Al hacer clic en el botón, acepto los",
    agreeMid: "y la",
    terms: "Términos de servicio",
    privacy: "Política de privacidad",
  },
  modal: {
    close: "Cerrar",
  },
}
