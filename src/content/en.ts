import type { Dictionary } from "./cs"

/** English copy. Must mirror the shape of `cs.ts`. */
export const en: Dictionary = {
  meta: {
    siteTitleSuffix: "Catsitting Brno",
    home: {
      title: "Cat sitting in Brno – care in the comfort of home",
      description:
        "Professional cat sitting in Brno and the surrounding area. While you are on holiday or a business trip, we look after your cat at home – feeding, litter, play and regular updates.",
    },
    about: {
      title: "About us – cat care in Brno",
      description:
        "Who we are and how we approach cat sitting in Brno: with love, responsibility, respect for every cat's routine and open communication.",
    },
    services: {
      title: "Services – cat sitting at your home",
      description:
        "In-home cat sitting in Brno: feeding and fresh water, litter box cleaning, play and company, photos and updates, and tailored care.",
    },
    pricing: {
      title: "Cat sitting prices",
      description:
        "Overview of cat care packages in Brno – short, standard and longer visits plus tailored care. Prices are available on request.",
    },
    process: {
      title: "How it works – cat sitting step by step",
      description:
        "From a no-obligation enquiry and meeting your cat to regular updates. See how cat care during your holiday works.",
    },
    gallery: {
      title: "Gallery",
      description: "A gallery of cats – a glimpse of calm, happy care for cats in their own home.",
    },
    contact: {
      title: "Contact and no-obligation enquiry",
      description: "Send us a no-obligation enquiry for cat sitting in Brno. We will get back to you and agree on the details.",
    },
    privacy: {
      title: "Privacy policy",
      description: "How Catsitting Brno processes personal data in line with the GDPR.",
    },
    terms: {
      title: "Terms of service",
      description: "Terms of service for the Catsitting Brno cat sitting service.",
    },
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    pricing: "Pricing",
    process: "How it works",
    gallery: "Gallery",
    contact: "Contact",
    cta: "Send an enquiry",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main navigation",
    skipToContent: "Skip to content",
    switchLanguage: "Přepnout do češtiny",
    otherLanguageShort: "CZ",
    homeLink: "Home page",
  },

  common: {
    slogan: "We look after your cat with love when you can't.",
    serviceArea: "Brno and surroundings",
    priceOnRequest: "Price on request",
    learnMore: "Learn more",
    allServices: "All services",
    aboutUs: "More about us",
    howItWorks: "How it works",
    sendInquiry: "Send an enquiry",
    ourServices: "Our services",
    toBeAdded: "Coming soon",
    illustrativePhoto: "Illustrative photo",
  },

  hero: {
    eyebrow: "Cat sitting · Brno and surroundings",
    title: "Professional cat sitting in Brno",
    lead: "Going on holiday or a business trip? We will gladly look after your cat in the comfort of its own home.",
    primaryCta: "Our services",
    secondaryCta: "Send an enquiry",
    highlights: ["Care in a place your cat knows", "Updates and photos after visits", "No-obligation enquiry"],
    badgeTitle: "Peace of mind for you and your cat",
    badgeText: "Your cat stays at home, in its routine.",
  },

  home: {
    intro: {
      eyebrow: "Who we are",
      title: "Cat sitting with love and responsibility",
      paragraphs: [
        "Catsitting Brno is a service for cat owners in Brno and the surrounding area who need reliable care while they are away – on holiday, on a business trip or, say, in hospital.",
        "Cats are sensitive to change. That is why we visit them at your home, where they feel familiar, and stick to their habits. And you always know how your cat is doing.",
      ],
      link: "More about us",
    },
    benefits: {
      eyebrow: "Why care at home",
      title: "Home is the safest place for a cat",
      lead: "Care at your home spares your cat the stress of travel and unfamiliar surroundings.",
      items: [
        {
          title: "No travel stress",
          text: "No carrier, no car, no strange place. Your cat stays where it feels secure.",
        },
        {
          title: "Routine kept intact",
          text: "Meals, play and rest happen just the way your cat is used to.",
        },
        {
          title: "Regular updates",
          text: "After each visit we send a short message and photos so you can relax.",
        },
        {
          title: "Personal approach",
          text: "Every cat is different. We adapt our care to its personality, age and needs.",
        },
      ],
    },
    featured: {
      eyebrow: "Services",
      title: "What we do for your cat",
      lead: "We put together care based on what your cat needs.",
    },
    process: {
      eyebrow: "How it works",
      title: "Five simple steps",
      lead: "From your first message until you are back home – you know what to expect.",
    },
    promise: {
      eyebrow: "What we stand for",
      title: "We are just starting out – and we want to do it right",
      lead: "We will publish reviews here once our first happy clients send them. Until then, here is what you can expect from us.",
      items: [
        {
          title: "Honesty",
          text: "If anything does not go to plan, you will hear it from us straight away.",
        },
        {
          title: "Reliability",
          text: "We treat agreed visits as a commitment. Your cat can count on us.",
        },
        {
          title: "Respect for your cat",
          text: "We never push a shy cat. We let it get to know us at its own pace.",
        },
      ],
    },
    testimonials: {
      eyebrow: "Reviews",
      title: "What cat owners say about us",
    },
    contact: {
      eyebrow: "Contact",
      title: "Write to us – we would love to look after your cat",
      lead: "Fill in the short form. We will get back to you and agree on the details together – the enquiry is free of obligation.",
    },
  },

  services: {
    header: {
      eyebrow: "Our services",
      title: "Cat care at your home",
      lead: "We tailor each visit to your cat. Below you will find what we can provide – we always agree on the exact scope in advance.",
    },
    items: [
      {
        id: "home-sitting",
        title: "Cat sitting at your home",
        short: "Regular visits in a place your cat knows and feels safe in.",
        description:
          "We come to your home at agreed times, so your cat does not have to travel anywhere. One visit a day or more – depending on your cat's needs.",
        includes: ["Visits at agreed times", "Checking that your cat is well", "Care according to your instructions"],
      },
      {
        id: "feeding",
        title: "Feeding and fresh water",
        short: "Meals on your schedule and always fresh water.",
        description:
          "We feed exactly what your cat is used to, in the usual portions and at the usual times. We wash the bowls and refresh the water.",
        includes: ["Feeding on your schedule", "Fresh water and clean bowls", "Keeping an eye on appetite"],
      },
      {
        id: "litter",
        title: "Litter box cleaning",
        short: "A clean litter box so your cat feels good at home.",
        description:
          "We clean the litter box on every visit and top up litter as agreed. We also notice any changes that could signal a problem.",
        includes: ["Cleaning on every visit", "Topping up litter", "Flagging unusual changes"],
      },
      {
        id: "play",
        title: "Play and company",
        short: "Time for play, cuddles or simply company.",
        description:
          "Cats need attention too. We play with them, cuddle if they want to, or just sit with them quietly for a while.",
        includes: ["Play with favourite toys", "Cuddles if your cat is in the mood", "Calm company"],
      },
      {
        id: "updates",
        title: "Photos and updates",
        short: "After each visit you get photos and a short update.",
        description:
          "After every visit we send you a photo and a few lines about how your cat is doing, what it ate and how it spent its time. We will agree on the channel that suits you.",
        includes: ["A photo after each visit", "A short update about your cat", "Your preferred messaging channel"],
      },
      {
        id: "custom",
        title: "Tailored care",
        short: "Personalised care for cats with special needs.",
        description:
          "An older cat, a special diet or several pets at home? Tell us what your cat needs and we will agree on what we can provide.",
        includes: ["Care for senior cats", "Special diets as instructed", "Multi-cat households"],
      },
    ],
    includesLabel: "Includes",
    note: "This list is a guide. If you need something you don't see here, just write to us – we are happy to find a solution.",
    cta: {
      title: "Not sure what your cat needs?",
      text: "Tell us about your cat and we will suggest suitable care.",
      button: "Send an enquiry",
    },
  },

  pricing: {
    header: {
      eyebrow: "Pricing",
      title: "Care packages",
      lead: "The price depends on visit length, the number of cats and your cat's needs. Send us an enquiry and we will give you an exact price in advance.",
    },
    packages: [
      {
        id: "short",
        name: "Short visit",
        description: "For independent cats that only need the essentials.",
        includes: ["Feeding and fresh water", "Litter box cleaning", "A short update with a photo"],
        featured: false,
      },
      {
        id: "standard",
        name: "Standard visit",
        description: "Balanced care with an update and time to play.",
        includes: ["Everything in the short visit", "Play and company", "Photos and a detailed update"],
        featured: true,
      },
      {
        id: "long",
        name: "Longer visit",
        description: "For cats that need more attention and company.",
        includes: ["Everything in the standard visit", "More time for play and cuddles", "Care for several cats"],
        featured: false,
      },
      {
        id: "custom",
        name: "Tailored care",
        description: "Personalised care for cats with special needs.",
        includes: ["Scope as agreed", "Senior cats or special diets", "A tailored care plan"],
        featured: false,
      },
    ],
    featuredLabel: "Most popular",
    requestButton: "Request a price",
    factorsTitle: "What affects the price",
    factors: [
      "Length and number of visits per day",
      "Number of cats in the household",
      "Location in Brno or nearby",
      "Your cat's special needs",
    ],
    note: "We are finalising our price list. We always confirm the final price in advance – no hidden fees.",
  },

  process: {
    header: {
      eyebrow: "How it works",
      title: "From enquiry to attentive care",
      lead: "The whole process is simple and transparent. You know what to expect, and your cat stays comfortable.",
    },
    steps: [
      {
        title: "Send us a no-obligation enquiry",
        text: "Fill in the form with your dates and a little about your cat. It costs nothing and commits you to nothing.",
      },
      {
        title: "We agree on the details of care",
        text: "We get in touch and go through feeding, number of visits, your cat's habits and the key handover.",
      },
      {
        title: "We meet your cat",
        text: "Before the sitting starts, we stop by so we can get to know your cat and you can show us everything.",
      },
      {
        title: "We look after your cat as agreed",
        text: "While you are away, we visit your home and care for your cat exactly as we agreed.",
      },
      {
        title: "We keep you updated",
        text: "After visits we send you messages and photos, so you know your cat is fine.",
      },
    ],
    stepLabel: "Step",
    faqTitle: "Frequently asked questions",
    faq: [
      {
        q: "How far in advance should I send an enquiry?",
        a: "The sooner the better – especially during school holidays and public holidays. But you can contact us any time and we will try to make it work.",
      },
      {
        q: "How does the key handover work?",
        a: "We usually take the keys at the first meeting with your cat. We always agree individually on how they are handed over and returned.",
      },
      {
        q: "How many times a day will you visit?",
        a: "It depends on your cat's needs. Most cats are fine with one visit a day, some need two. We will recommend what suits your cat.",
      },
      {
        q: "Can you care for a cat that needs medication or special care?",
        a: "Tell us exactly what is involved. We will honestly say whether we can handle it – and if not, we won't promise anything.",
      },
      {
        q: "Which area do you cover?",
        a: "Brno and the surrounding area. If you live outside Brno, write to us and we will see whether we can travel to you.",
      },
    ],
  },

  about: {
    header: {
      eyebrow: "About us",
      title: "Cats are close to our hearts",
      lead: "Catsitting Brno started with a simple idea: a cat should be happy even when its human is not at home.",
    },
    story: {
      title: "Why we care for cats",
      paragraphs: [
        "We know what it is like to leave home and wonder whether your cat is all right. That is why we offer care where your cat stays in its own environment and you can relax.",
        "We approach every cat individually. First we get to know it, find out what it likes and dislikes, and then stick to what it is used to.",
        "We want you to be able to trust us. That is why we communicate openly and regularly let you know how your cat is doing.",
      ],
    },
    values: {
      eyebrow: "Our values",
      title: "What matters to us",
      items: [
        {
          title: "Love for cats",
          text: "We love cats and take caring for them seriously. Every cat deserves attention and kindness.",
        },
        {
          title: "Care and responsibility",
          text: "We keep to agreed visits and forget nothing. Looking after your cat is a commitment for us.",
        },
        {
          title: "Respect for routine",
          text: "Meals, play and rest follow your cat's habits. Changes in routine only add stress.",
        },
        {
          title: "Open communication",
          text: "We write to you regularly, send photos and tell you about anything important right away.",
        },
        {
          title: "Safety and comfort",
          text: "Our goal is for your cat to feel safe and content even while you are away.",
        },
      ],
    },
    cta: {
      title: "Shall we meet?",
      text: "Write us a few words about your cat and the dates you need care.",
      button: "Send an enquiry",
    },
  },

  gallery: {
    header: {
      eyebrow: "Gallery",
      title: "Happy cats at home",
      lead: "A glimpse of what calm cat care in their own home looks like.",
    },
    albums: {
      all: "All",
      home: "Safe at home",
      play: "Play and company",
      rest: "Rest",
    },
    albumsLabel: "Albums",
    disclaimer:
      "These photos are illustrative (source: Unsplash) and do not show our clients. Photos from our own visits will be added with the owners' consent.",
    openImage: "Enlarge photo",
    lightbox: {
      label: "Photo viewer",
      close: "Close",
      previous: "Previous photo",
      next: "Next photo",
    },
  },

  contact: {
    header: {
      eyebrow: "Contact",
      title: "No-obligation enquiry",
      lead: "Tell us when you need cat sitting and a little about your cat. We will get back to you and agree on the details.",
    },
    info: {
      title: "Contact details",
      phone: "Phone",
      email: "Email",
      area: "Service area",
      hours: "Opening hours",
      company: "Operator",
      ico: "Company ID (IČO)",
      pending: "Coming soon",
      formHint: "The easiest way to reach us is the form – we will get back to you.",
    },
    form: {
      title: "Enquiry form",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      location: "Area in Brno",
      locationPlaceholder: "e.g. Brno-Žabovřesky",
      dateFrom: "Sitting dates – from",
      dateTo: "Sitting dates – to",
      catCount: "Number of cats",
      catCountMore: "6 or more",
      message: "Message",
      messagePlaceholder: "Tell us about your cat – personality, feeding, special needs…",
      optional: "optional",
      required: "required",
      submit: "Send a no-obligation enquiry",
      submitting: "Sending…",
      honeypot: "Leave this field empty",
      gdpr: "By submitting the form you share your personal data with us. We use it only to handle your enquiry. Read more in our",
      gdprLink: "Privacy policy",
    },
    errors: {
      required: "This field is required.",
      tooShort: "Please enter at least 2 characters.",
      tooLong: "The text is too long.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number.",
      date: "Please enter a valid date.",
      datePast: "The date cannot be in the past.",
      dateOrder: "The end date must be the same as or later than the start date.",
      catCount: "Please select the number of cats.",
    },
    status: {
      success: {
        title: "Thank you, your enquiry has been sent",
        text: "We will get back to you as soon as possible, usually by email or phone.",
      },
      invalid: {
        title: "Please check the form",
        text: "Some fields are not filled in correctly.",
      },
      notConfigured: {
        title: "The form is not active yet",
        text: "We are still setting up enquiry delivery and your message was not sent. Please try again later.",
      },
      rateLimited: {
        title: "Too many attempts",
        text: "You have sent several enquiries in a short time. Please try again in a few minutes.",
      },
      spam: {
        title: "Your enquiry could not be sent",
        text: "The form was submitted too quickly. Please wait a moment and try again.",
      },
      error: {
        title: "Your enquiry could not be sent",
        text: "A technical error occurred and the message was not delivered. Please try again in a moment.",
      },
    },
  },

  footer: {
    tagline: "Cat care in the comfort of their own home. Brno and surroundings.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    legalTitle: "Information",
    privacy: "Privacy policy",
    terms: "Terms of service",
    rights: "All rights reserved.",
    photoCredit: "Illustrative photos: Unsplash.",
  },

  privacy: {
    title: "Privacy policy",
    draftNotice:
      "We are still adding the controller's details (name, company ID, address). Until then, please contact us about personal data through the enquiry form.",
    updated: "Last updated",
    sections: [
      {
        title: "1. Data controller",
        body: ["The controller of personal data is the operator of the Catsitting Brno service, whose details are listed below."],
        showController: true,
      },
      {
        title: "2. What data we process",
        body: [
          "Through the enquiry form we process: full name, email, phone (optional), location, sitting dates, number of cats and the content of your message.",
          "If you entrust us with keys or information about your household in connection with cat sitting, we treat it confidentially and only to the extent necessary to provide the service.",
        ],
        showController: false,
      },
      {
        title: "3. Purpose and legal basis",
        body: [
          "We use the data to handle your enquiry and to negotiate or perform a contract – the legal basis is Article 6(1)(b) GDPR (performance of a contract and pre-contractual steps).",
          "We do not use the data to send marketing messages and we do not sell it to third parties.",
        ],
        showController: false,
      },
      {
        title: "4. Retention",
        body: [
          "We keep enquiry data for as long as needed to handle it. If no contract is concluded, we delete the data within 12 months at the latest. If we provide the service, we keep it for the period required by law (e.g. accounting rules).",
        ],
        showController: false,
      },
      {
        title: "5. Recipients",
        body: [
          "Data may be processed by technical service providers that operate the website and deliver email for us (processors). We have agreements with them that protect your data.",
        ],
        showController: false,
      },
      {
        title: "6. Your rights",
        body: [
          "You have the right to access your data, to have it corrected or erased, to restrict processing, to data portability and to object.",
          "You also have the right to lodge a complaint with the supervisory authority – the Czech Office for Personal Data Protection (www.uoou.gov.cz).",
        ],
        showController: false,
      },
      {
        title: "7. Cookies",
        body: [
          "This website does not use analytics, marketing or other tracking cookies. We only use technically necessary means required for the site to work, which do not require consent.",
        ],
        showController: false,
      },
    ],
    controller: {
      name: "Operator",
      ico: "Company ID (IČO)",
      address: "Registered address",
      email: "Email",
      phone: "Phone",
    },
  },

  terms: {
    title: "Terms of service",
    pendingTitle: "Our terms of service are being prepared",
    pendingText:
      "We will publish binding terms of service here before we start providing the service. The details of our cooperation – scope of care, price, key handover and cancellation terms – are always agreed individually before the cat sitting begins.",
    contactCta: "Any questions? Write to us",
  },

  notFound: {
    title: "Page not found",
    text: "This page has wandered off – just like a cat hiding behind the sofa.",
    back: "Back to home",
  },
}
