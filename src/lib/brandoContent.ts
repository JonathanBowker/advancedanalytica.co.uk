import usesPurposeUnderstandingImg from "../components/uses/assessment.svg?url";
import usesSystemFramingImg from "../components/uses/frame.svg?url";
import usesSpecificationDesignImg from "../components/uses/codification.svg?url";
import usesValidationEvaluationImg from "../components/uses/evaluation.svg?url";
import usesExecutionGenerationImg from "../components/uses/operation.svg?url";

export const brandoBenefits = [
  {
    label: "Knowledge Asset",
    heading: "Brand knowledge you can keep",
    body: "Your brand standards, rules, exceptions, and judgement are captured in a structured format your business owns outright.",
  },
  {
    label: "Structure",
    heading: "Rules AI can actually follow",
    body: "Your standards, approvals, and escalation paths become specifications AI agents can interpret consistently.",
  },
  {
    label: "Control",
    heading: "A controlled governance layer",
    body: "Access, behaviour, and execution are controlled through one layer connecting your people, knowledge, and AI systems.",
  },
  {
    label: "Alignment",
    heading: "One shared operating logic",
    body: "Brand and communication operations, and all other business functions can work from the same governed knowledge base.",
  },
  {
    label: "Assurance",
    heading: "Testable, traceable systems",
    body: "Specifications, controls, and runtime behaviour are reviewable, testable, and traceable as the system evolves.",
  },
  {
    label: "Continuity",
    heading: "Systems that can evolve safely",
    body: "As needs, risks, tools, and models change, you can revise the knowledge base and controls without losing alignment.",
  },
] as const;

export const personaPositioningCards = [
  {
    role: "CMO",
    heading: "For the CMO",
    body: "Your teams are already pasting brand guidelines into ChatGPT. The output looks plausible and drifts off-brand at scale, because fragments carry no governance. Brando deploys an AI agent governed by your Brand Operator, enforcing your rules at the moment content is created, so approval happens in hours, not days.",
  },
  {
    role: "Head of Brand",
    heading: "For the Head of Brand",
    body: "You own the nuance, but a PDF cannot enforce it. Your Brand Operator holds the interlinked intent behind every rule, and the agent that reads it applies them. Update a policy once and the agent cascades that change across everything it governs.",
  },
  {
    role: "Chief Legal Officer",
    heading: "For the Chief Legal Officer",
    body: "AI-generated brand content is a liability surface: IP misuse, regulatory exposure, unapproved claims. The agent validates every output against your Brand Operator before content ships, with audit trails recording what was generated, against which policy, and who approved it.",
  },
  {
    role: "Head of AI",
    heading: "For the Head of AI",
    body: "You need brand knowledge your systems can actually consume. Brando delivers a structured, schema-defined Brand Operator served over Model Context Protocol, with validators, an LLM judge, and drift measurement in the loop.",
  },
  {
    role: "CTO",
    heading: "For the CTO",
    body: "No new platform to run. Brando ships as code: the pipeline, the Brand Operator, the MCP endpoint, and the governing agent. Deploy it in your infrastructure or take it as a container.",
  },
  {
    role: "CFO",
    heading: "For the CFO",
    body: "Brand is a shortcut to trust, and trust is the asset nobody prices until it is damaged. Brando automates governance at scale, cutting manual review cycles and the cost of brand inconsistency.",
  },
] as const;

export const ibomStages = [
  {
    key: "platform_asset_pack_architecture",
    label: "1. Architect",
    stage: "Stage 1",
    phase: "Phase 1",
    heading: "Architect",
    subheading: "Design the blueprint agents execute.",
    body: "We locate where your brand assets live, gather them into a staged repository, and design the Platform Asset Pack: the strategic blueprint for the system.",
    image: usesPurposeUnderstandingImg,
  },
  {
    key: "brand_constitution_schema",
    label: "2. Constitute",
    stage: "Stage 2",
    phase: "Phase 1",
    heading: "Constitute",
    subheading: "Define the principles and architecture everything after refers to.",
    body: "We define what gets extracted, which models analyse which asset types, and the schema every asset must conform to.",
    image: usesSystemFramingImg,
  },
  {
    key: "brand_specification_atomisation",
    label: "3. Specify",
    stage: "Stage 3",
    phase: "Phase 2",
    heading: "Specify",
    subheading: "Produce the interconnected brand data asset AI can read.",
    body: "Every element is tagged, categorised, and structured against the Brando schema. The output is your governed Brand Operator.",
    image: usesExecutionGenerationImg,
  },
  {
    key: "brand_model_validation_plan",
    label: "4. Checkpoint",
    stage: "Stage 4",
    phase: "Phase 2",
    heading: "Checkpoint",
    subheading: "Validate the specification, plan, and task architecture.",
    body: "Before execution, AI-assisted planning turns the structured brand asset into a validated specification, implementation plan, and task sequence. Assumptions, dependencies, acceptance criteria, and governance evidence are checked before build work begins.",
    image: usesSpecificationDesignImg,
  },
  {
    key: "brand_model_build_execution",
    label: "5. Execute",
    stage: "Stage 5",
    phase: "Phase 3",
    heading: "Execute",
    subheading: "Build Brando against validated tasks.",
    body: "Execution starts from the checked plan, not from loose intent. Agents do the work at speed while senior practitioners hold the standard, resolve judgement calls, and sign off each section.",
    image: usesValidationEvaluationImg,
  },
  {
    key: "agentic_brand_implementation",
    label: "6. Implement",
    stage: "Stage 6",
    phase: "Phase 3",
    heading: "Implement",
    subheading: "Operationalise into live brand operations and agentic systems.",
    body: "We integrate controlled brand workflows into your tools, platforms, and orchestration layers with human control at every stage.",
    image: usesValidationEvaluationImg,
  },
] as const;

export const howItWorksCards = [
  {
    heading: "Brando Mapping",
    body: "We map the rules, approvals, exceptions, and judgement your teams already use. The system starts with how your business really works.",
  },
  {
    heading: "Brando Data Modelling",
    body: "We turn brand and business logic into an interconnected, machine-readable data asset that AI can interpret and follow.",
  },
  {
    heading: "Brando Deployment",
    body: "We build, test, and deploy Brando into controlled workflows, review paths, and agent behaviours.",
  },
] as const;
