export type BusinessFunction = {
  slug: string;
  eyebrow: string;
  heading: string;
  homeBody: string;
  title: string;
  description: string;
  intro: string;
  startingPoint: string;
  focusAreas: {
    title: string;
    body: string;
  }[];
  journey: {
    title: string;
    body: string;
  }[];
  useCasesHref: string;
  opinionsHref: string;
  useCaseTags: string[];
  opinionTags: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  closing: string;
};

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getRolePath = (functionSlug: string, roleTitle: string) =>
  `/functions/${functionSlug}/roles/${toSlug(roleTitle)}/`;

export const businessFunctions: BusinessFunction[] = [
  {
    slug: "brand-marketing",
    eyebrow: "Brand & Marketing",
    heading: "Shape a governed brand intelligence layer.",
    homeBody:
      "We often start with brand because it spans the whole organisation. See how iBOM turns identity, standards, and approvals into a usable operating asset for AI.",
    title: "Brand & Marketing",
    description:
      "Build a governed brand intelligence layer that turns standards, approvals, and identity into machine-usable operating assets.",
    intro:
      "Brand is often the first place we begin because it crosses the whole organisation. iBOM turns brand standards, approval logic, and institutional knowledge into structured assets that teams, tools, and AI systems can all work from consistently.",
    startingPoint:
      "This function is where organisations most clearly feel the gap between written guidance and machine behaviour. By structuring brand knowledge first, you create an operating logic that can later be extended into other business functions.",
    focusAreas: [
      {
        title: "Turn standards into structured assets",
        body: "Translate identity, tone, policy, and approval logic into specifications, linked datasets, and reusable knowledge structures.",
      },
      {
        title: "Govern content and approvals",
        body: "Create one operating model for campaign creation, review, approval, and reuse across internal teams and external partners.",
      },
      {
        title: "Scale consistency across channels",
        body: "Give AI-assisted content systems a governed brand layer they can actually use across web, campaigns, CRM, and service touchpoints.",
      },
    ],
    journey: [
      {
        title: "Build the brand knowledge base",
        body: "Capture standards, examples, approval logic, and domain language in structured formats and linked datasets.",
      },
      {
        title: "Deploy the AICE layer",
        body: "Use the AICE to govern how AI systems access brand knowledge, apply rules, and work with approved tools.",
      },
      {
        title: "Operate with assurance",
        body: "Test outputs, monitor drift, and refine the operating model as teams, channels, and brand requirements evolve.",
      },
    ],
    useCasesHref: "/use-cases/tag/Brand/",
    opinionsHref: "/opinions/tag/Semantics/",
    useCaseTags: ["Brand", "Approvals", "Governance"],
    opinionTags: ["Semantics", "Policy", "Execution"],
    faqs: [
      {
        question: "Why do you often start with brand?",
        answer: "Brand usually spans the whole organisation. It gives us a practical place to structure standards, approvals, and shared language before extending the same operating logic into other business functions.",
      },
      {
        question: "Is this just for content generation?",
        answer: "No. The aim is to build a governed brand intelligence layer that can shape approvals, decision-making, channel execution, and AI-assisted workflows more broadly.",
      },
      {
        question: "How does the AICE help brand teams?",
        answer: "The AICE controls how AI systems access brand knowledge, apply rules, and interact with approved tools, which makes outputs easier to govern and operations easier to assure.",
      },
      {
        question: "What kinds of brand material can be structured?",
        answer: "Standards, examples, tone guidance, approval rules, content patterns, and internal language can all be captured in structured formats and linked datasets.",
      },
      {
        question: "Can this support agencies and external partners too?",
        answer: "Yes. One of the advantages of a governed brand knowledge layer is that internal teams and external partners can work from the same operating logic instead of fragmented interpretations.",
      },
      {
        question: "What changes once brand knowledge is structured?",
        answer: "Teams stop relying on static guidance alone. Instead, brand becomes a reusable operating asset that can guide approvals, workflows, and AI-assisted systems much more consistently.",
      },
    ],
    closing:
      "This is the fastest way to move brand from static guidance into a governed, reusable operating asset for AI-assisted delivery.",
  },
  {
    slug: "sales-operations-service",
    eyebrow: "Sales, Operations & Service",
    heading: "Reduce drift across live workflows.",
    homeBody:
      "Apply the same operating logic across service, delivery, and internal operations so teams and systems work from governed instructions instead of local workarounds.",
    title: "Sales, Operations & Service",
    description:
      "Use iBOM and the AICE to bring governed AI into live workflows across sales, operations, and service teams.",
    intro:
      "Sales, operational, and service teams need AI to work inside live workflows, not beside them. iBOM structures the knowledge these functions rely on, and the AICE turns that knowledge into governed behaviour across day-to-day systems and decisions.",
    startingPoint:
      "This function benefits when playbooks, service logic, workflow rules, and operational exceptions are captured once and reused consistently across teams, channels, and tools.",
    focusAreas: [
      {
        title: "Structure operational knowledge",
        body: "Turn playbooks, workflow rules, escalation logic, and service standards into machine-usable specifications.",
      },
      {
        title: "Connect governed workflow execution",
        body: "Use the AICE to coordinate access to CRM, service systems, internal tooling, and operational data through one controlled layer.",
      },
      {
        title: "Reduce contradiction and drift",
        body: "Make sure teams and AI systems work from the same operating logic instead of competing local interpretations.",
      },
    ],
    journey: [
      {
        title: "Capture workflow logic",
        body: "Map the data, tools, service rules, and operational realities that shape day-to-day work.",
      },
      {
        title: "Create governed execution",
        body: "Use the AICE to translate requests into controlled actions across systems, approvals, and operational boundaries.",
      },
      {
        title: "Run and refine live operations",
        body: "Measure performance, assure quality, and revise the operating logic as processes and service conditions change.",
      },
    ],
    useCasesHref: "/use-cases/tag/Operation/",
    opinionsHref: "/opinions/tag/Operation/",
    useCaseTags: ["Operation", "Assurance", "Governance"],
    opinionTags: ["Operation", "Optimisation", "Governance"],
    faqs: [
      {
        question: "Where does governed AI help most in operations?",
        answer: "It helps most where teams rely on repeatable workflow logic, service rules, and decisions that currently drift between systems, channels, or individuals.",
      },
      {
        question: "Can this work across sales and service together?",
        answer: "Yes. The goal is to create one governed operating logic that can support CRM workflows, handoffs, service processes, and live operational execution across connected functions.",
      },
      {
        question: "What changes once the AICE is in place?",
        answer: "The AICE becomes the governed control layer between AI systems and your operational tools, which makes access, actions, and runtime behaviour easier to manage and observe.",
      },
      {
        question: "Do we have to replace existing tools?",
        answer: "No. The AICE is designed to sit between AI systems and the tools you already use, so the emphasis is on governed coordination rather than wholesale replacement.",
      },
      {
        question: "How does this reduce operational drift?",
        answer: "It captures workflow rules and decision logic once, then applies them more consistently across teams, systems, and AI-assisted processes.",
      },
      {
        question: "Can this help with service quality assurance?",
        answer: "Yes. Structured operating logic and governed runtime controls make it easier to test outcomes, review edge cases, and refine live service behaviour over time.",
      },
    ],
    closing:
      "The result is AI-assisted workflow execution that is practical, observable, and much easier to trust in live operational environments.",
  },
  {
    slug: "product-engineering",
    eyebrow: "Product & Engineering",
    heading: "Build systems from specification, not guesswork.",
    homeBody:
      "See how structured specifications, governed runtime controls, and the AICE create a clearer path from business logic to production systems.",
    title: "Product & Engineering",
    description:
      "Move from business logic to governed production systems through structured specifications, controlled runtime behaviour, and the AICE.",
    intro:
      "Product and engineering teams need business logic that can be used directly in system design, delivery, and runtime control. iBOM gives these teams a structured specification base, while the AICE provides the governed interface for deployment and operation.",
    startingPoint:
      "When product and engineering teams inherit vague requirements, AI builds drift quickly. When they inherit structured specifications, delivery becomes faster, clearer, and easier to assure.",
    focusAreas: [
      {
        title: "Engineer from structured specification",
        body: "Turn business rules, processes, and constraints into design-ready logic that teams and AI agents can both use.",
      },
      {
        title: "Control runtime behaviour",
        body: "Deploy the AICE as the governed layer between systems, tools, models, and internal data sources.",
      },
      {
        title: "Improve delivery assurance",
        body: "Make testing, evaluation, and operational traceability part of the system design rather than an afterthought.",
      },
    ],
    journey: [
      {
        title: "Specify the operating logic",
        body: "Define the business knowledge, tool access, rules, and constraints that the system must respect.",
      },
      {
        title: "Build through governed infrastructure",
        body: "Use the AICE to coordinate tool connection, instruction flow, and controlled machine action in production.",
      },
      {
        title: "Assure and evolve",
        body: "Test quality and policy adherence, then revise the specification and runtime behaviour as the system matures.",
      },
    ],
    useCasesHref: "/use-cases/tag/Systems/",
    opinionsHref: "/opinions/tag/Systems/",
    useCaseTags: ["Systems", "MCP", "Governance"],
    opinionTags: ["Systems", "Execution", "MCP"],
    faqs: [
      {
        question: "How is this different from normal requirements gathering?",
        answer: "The emphasis is on turning business logic into structured specifications that can directly guide design, build, runtime behaviour, and assurance rather than stopping at narrative requirements.",
      },
      {
        question: "Does this replace engineering teams?",
        answer: "No. It gives engineering teams a clearer governed foundation for building and operating systems, while the AICE provides a controlled runtime layer for connected tools and models.",
      },
      {
        question: "Why bring iBOM into product delivery?",
        answer: "Because it reduces ambiguity. When product and engineering teams work from the same specification base, delivery becomes easier to control, test, and evolve.",
      },
      {
        question: "Where does the AICE sit in the architecture?",
        answer: "It sits as the governed interface between AI systems and the tools, models, and internal data sources they need to use, helping control runtime access and behaviour.",
      },
      {
        question: "How does this improve assurance?",
        answer: "It creates a clearer link between business logic, implementation, and runtime behaviour, which makes testing, evaluation, and revision more disciplined.",
      },
      {
        question: "Is this only relevant for agent systems?",
        answer: "No. It is useful anywhere teams need business logic to shape applications, workflows, automations, or AI-assisted services in a governed way.",
      },
    ],
    closing:
      "This gives product and engineering teams a much clearer route from business intent to governed, production-ready AI systems.",
  },
  {
    slug: "research-development",
    eyebrow: "Research & Development",
    heading: "Turn specialist knowledge into governed systems.",
    homeBody:
      "Use structured specifications, linked knowledge, and the AICE to move from exploration and domain insight into practical, testable AI systems.",
    title: "Research & Development",
    description:
      "Translate specialist knowledge, domain insight, and experimental work into structured assets and governed AI systems.",
    intro:
      "Research and development teams often sit on high-value specialist knowledge that is difficult to operationalise. iBOM structures that domain insight into reusable knowledge assets, and the AICE helps turn it into controlled, testable systems.",
    startingPoint:
      "This function works best when experimentation is connected to structured knowledge, clear evaluation, and a path into operational deployment rather than isolated prototypes.",
    focusAreas: [
      {
        title: "Capture domain knowledge properly",
        body: "Structure concepts, evidence, rules, and expert input in formats that support machine use and long-term governance.",
      },
      {
        title: "Move from prototypes to systems",
        body: "Translate exploration into a governed delivery path so useful experiments can become practical operating capability.",
      },
      {
        title: "Create repeatable learning loops",
        body: "Use specifications and the AICE to connect new knowledge, testing, and revision without losing control of the system.",
      },
    ],
    journey: [
      {
        title: "Structure specialist knowledge",
        body: "Capture domain insight, evidence, and operational nuance in structured formats and linked datasets.",
      },
      {
        title: "Build governed applications",
        body: "Use the AICE to connect knowledge, tools, and runtime control so systems can operate safely in real environments.",
      },
      {
        title: "Evaluate and refine",
        body: "Test assumptions, measure outcomes, and improve both the knowledge layer and the systems built on top of it.",
      },
    ],
    useCasesHref: "/use-cases/tag/Knowledge/",
    opinionsHref: "/opinions/tag/Schema/",
    useCaseTags: ["Knowledge", "Regulation", "RAG"],
    opinionTags: ["Schema", "Semantics", "iBOM"],
    faqs: [
      {
        question: "How does this help research teams move beyond prototypes?",
        answer: "It creates a governed path from specialist knowledge and experimental work into structured assets, practical systems, and repeatable evaluation rather than one-off demonstrations.",
      },
      {
        question: "What kinds of knowledge can be captured?",
        answer: "Concepts, evidence, rules, edge cases, and expert reasoning can all be structured in formats and linked datasets that support machine use and controlled revision.",
      },
      {
        question: "Why is the AICE relevant to R&D?",
        answer: "Because it helps operationalise specialist knowledge safely. It provides the governed runtime layer that connects new knowledge assets to systems, tools, and live environments.",
      },
      {
        question: "Can this support regulated or high-complexity domains?",
        answer: "Yes. It is especially useful where specialist knowledge, evidence, and decision logic need to be captured carefully and reused in a controlled way.",
      },
      {
        question: "How do you avoid losing nuance when structuring expert knowledge?",
        answer: "The aim is not to flatten expertise but to capture it in a form that preserves concepts, evidence, exceptions, and operating context well enough to guide systems reliably.",
      },
      {
        question: "What does success look like for this function?",
        answer: "Success means research and specialist insight can move into practical systems, governed workflows, and repeatable evaluation without being trapped in isolated experiments.",
      },
    ],
    closing:
      "The result is a clearer bridge from specialist expertise and experimentation into governed systems that can be trusted and reused.",
  },
  {
    slug: "legal-risk-compliance",
    eyebrow: "Legal, Risk & Compliance",
    heading: "Make policy operational in AI.",
    homeBody:
      "Use one governed model to turn policy, controls, and risk requirements into enforceable behaviour across AI-assisted processes and agent systems.",
    title: "Legal, Risk & Compliance",
    description:
      "Turn policy, controls, and risk requirements into enforceable AI operating logic through structured specification and the AICE.",
    intro:
      "Legal, risk, and compliance teams need more than policies on paper. iBOM helps convert policy into structured operating logic, and the AICE helps enforce that logic at runtime across systems, agents, and AI-assisted workflows.",
    startingPoint:
      "This function becomes much stronger when policy is not simply documented but translated into testable, traceable rules that can shape behaviour before problems reach production.",
    focusAreas: [
      {
        title: "Translate policy into machine logic",
        body: "Turn governance requirements, controls, and decision boundaries into usable specifications instead of relying on interpretation alone.",
      },
      {
        title: "Enforce controlled access and action",
        body: "Use the AICE to control data exposure, permitted actions, and system behaviour across AI-assisted workflows.",
      },
      {
        title: "Strengthen auditability and assurance",
        body: "Create a clearer record of what the system was allowed to do, how it behaved, and where revisions are needed.",
      },
    ],
    journey: [
      {
        title: "Structure policy and controls",
        body: "Capture obligations, exceptions, approvals, and risk rules in a format that can guide systems directly.",
      },
      {
        title: "Deploy governed runtime enforcement",
        body: "Use the AICE to apply those controls at the point of interaction with data, tools, and AI systems.",
      },
      {
        title: "Review, assure, and update",
        body: "Measure policy adherence, monitor drift, and revise controls as regulation, risk, and operating conditions change.",
      },
    ],
    useCasesHref: "/use-cases/tag/Compliance/",
    opinionsHref: "/opinions/tag/Governance/",
    useCaseTags: ["Compliance", "Risk", "Policy", "Governance"],
    opinionTags: ["Governance", "Policy", "Operating Model"],
    faqs: [
      {
        question: "How does this help compliance beyond documentation?",
        answer: "It turns controls and obligations into structured operating logic that can influence behaviour directly, rather than relying only on static documents and after-the-fact review.",
      },
      {
        question: "Can the AICE enforce policy at runtime?",
        answer: "Yes. That is one of its core roles. It helps control what systems can access, what actions are allowed, and how policy constraints are applied during live operation.",
      },
      {
        question: "What does assurance look like here?",
        answer: "Assurance means being able to test policy adherence, review system behaviour, and trace how decisions map back to the structured rules and controls you defined.",
      },
      {
        question: "Does this reduce the need for manual oversight?",
        answer: "It reduces the need to rely on manual oversight alone by moving more policy logic into structured specifications and governed runtime controls, though human governance still matters.",
      },
      {
        question: "Can this support changing regulations and policies?",
        answer: "Yes. Because the rules are structured, they can be revised in a controlled way as obligations, risk conditions, and governance requirements evolve.",
      },
      {
        question: "Why is traceability so important here?",
        answer: "Traceability makes it easier to understand what the system was designed to do, how policy logic was applied, and where operational behaviour needs to be reviewed or corrected.",
      },
    ],
    closing:
      "This gives governance teams a practical route from policy intent to enforceable operational control in live AI systems.",
  },
  {
    slug: "leadership",
    eyebrow: "Leadership",
    heading: "Start with the right business entry point.",
    homeBody:
      "If you are shaping the wider operating model, see how iBOM connects knowledge assets, governed infrastructure, and phased delivery into one commercial programme.",
    title: "Leadership",
    description:
      "See how iBOM and the AICE connect business knowledge, governed infrastructure, and phased delivery into one operating model for AI.",
    intro:
      "Leadership teams need a way to move beyond disconnected pilots and tool purchases. iBOM gives you a structured operating model for knowledge capture, system delivery, and governed runtime control, while the AICE provides the infrastructure that makes it operational.",
    startingPoint:
      "This is about choosing where to begin, how to sequence delivery, and how to turn business knowledge into a long-term operating asset rather than a short-lived experiment.",
    focusAreas: [
      {
        title: "Choose the right entry point",
        body: "Decide whether to begin with brand, operational workflow, governance, research, or a broader programme shaped around the strongest commercial need.",
      },
      {
        title: "Create reusable business assets",
        body: "Turn knowledge and policy into structured assets that can be extended across functions instead of rebuilding from scratch each time.",
      },
      {
        title: "Build with governance from the start",
        body: "Use the AICE and shared specifications so scale does not come at the cost of control, trust, or operating discipline.",
      },
    ],
    journey: [
      {
        title: "Set the business direction",
        body: "Define outcomes, constraints, and the function where a governed knowledge-first approach will create the most value first.",
      },
      {
        title: "Build the shared operating model",
        body: "Use iBOM to structure knowledge and deploy the AICE so delivery and runtime control work from the same foundation.",
      },
      {
        title: "Scale across functions",
        body: "Extend the same operating logic into more teams, systems, and use cases as confidence and capability grow.",
      },
    ],
    useCasesHref: "/use-cases/tag/iBOM/",
    opinionsHref: "/opinions/tag/Operating%20Model/",
    useCaseTags: ["iBOM", "Governance", "Brand"],
    opinionTags: ["Operating Model", "iBOM", "Governance"],
    faqs: [
      {
        question: "Where should we start?",
        answer: "Usually with the function where governed knowledge will create the clearest operational value first. Brand is often a strong entry point because it spans the organisation, but it is not the only one.",
      },
      {
        question: "How does this differ from buying AI tools?",
        answer: "Tools alone do not create an operating model. iBOM creates the structured knowledge layer, and the AICE provides the governed infrastructure needed to turn that knowledge into reliable capability.",
      },
      {
        question: "Can this scale across multiple functions?",
        answer: "Yes. That is the point. Once you have a reusable knowledge model and a governed runtime layer, the same logic can be extended across more teams, systems, and use cases with greater control.",
      },
      {
        question: "Why start with one function instead of the whole business?",
        answer: "Starting with one function creates a clearer commercial and operational entry point. Once the model is proven there, the same logic can be extended into other areas with more confidence.",
      },
      {
        question: "What role does the AICE play at leadership level?",
        answer: "It is the infrastructure layer that turns strategy into governed operation. It helps ensure scale does not come at the cost of control, visibility, or policy adherence.",
      },
      {
        question: "What should we expect from the first engagement?",
        answer: "Typically a focused conversation about priorities, constraints, and the strongest starting point, followed by a clearer view of how knowledge capture, governed delivery, and assured operations would be sequenced.",
      },
    ],
    closing:
      "This creates a more coherent commercial path for AI: one operating model, one governed infrastructure layer, and a clearer route from pilot to scale.",
  },
];
