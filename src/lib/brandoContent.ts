import usesPurposeUnderstandingImg from "../components/uses/assessment.svg?url";
import usesSystemFramingImg from "../components/uses/frame.svg?url";
import usesSpecificationDesignImg from "../components/uses/codification.svg?url";
import usesValidationEvaluationImg from "../components/uses/evaluation.svg?url";
import usesExecutionGenerationImg from "../components/uses/operation.svg?url";

export const ibomBenefits = [
  {
    label: "Knowledge Asset",
    heading: "Business knowledge you can govern",
    body: "Your data, knowledge, policies, rules, exceptions, and judgement become controlled information your people and agents can use.",
  },
  {
    label: "Structure",
    heading: "Every source keeps its context",
    body: "Ownership, provenance, permissions, relationships, and status stay attached as information moves into AI-assisted work.",
  },
  {
    label: "Control",
    heading: "A controlled governance layer",
    body: "Access, behaviour, and execution are controlled through one technology layer connecting your people, data, knowledge, and AI.",
  },
  {
    label: "Alignment",
    heading: "One shared operating logic",
    body: "Business functions can work from the same governed information while retaining their own rules, permissions, workflows, and responsibilities.",
  },
  {
    label: "Assurance",
    heading: "Brand detail stays usable",
    body: "Brand colours, typography, imagery, language, assets, standards, and approval rules remain available as governed business data.",
  },
  {
    label: "Continuity",
    heading: "Agent in the Room has context",
    body: "IBOM gives Agent in the Room approved business context so live conversations remain useful, controlled, and grounded in evidence.",
  },
] as const;

export const personaPositioningCards = [
  {
    role: "CMO",
    heading: "For the CMO",
    body: "Your teams are already pasting brand guidelines into ChatGPT. The output looks plausible and drifts off-brand at scale, because fragments carry no governance. IBOM deploys an AI agent governed by your Brand Operator, enforcing your rules at the moment content is created, so approval happens in hours, not days.",
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
    body: "You need brand knowledge your systems can actually consume. IBOM delivers a structured, schema-defined Brand Operator served over Model Context Protocol, with validators, an LLM judge, and drift measurement in the loop.",
  },
  {
    role: "CTO",
    heading: "For the CTO",
    body: "No new platform to run. IBOM ships as code: the pipeline, the Brand Operator, the MCP endpoint, and the governing agent. Deploy it in your infrastructure or take it as a container.",
  },
  {
    role: "CFO",
    heading: "For the CFO",
    body: "Brand is a shortcut to trust, and trust is the asset nobody prices until it is damaged. IBOM automates governance at scale, cutting manual review cycles and the cost of brand inconsistency.",
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
    body: "Every element is tagged, categorised, and structured against the IBOM schema. The output is your governed Brand Operator.",
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
    subheading: "Build IBOM against validated tasks.",
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
    heading: "Process Mapping",
    body: "We map the rules, approvals, exceptions, and judgement your teams already use. The system starts with how your business really works.",
  },
  {
    heading: "Data Modelling",
    body: "We turn brand and business logic into an interconnected, machine-readable data asset that AI can interpret and follow.",
  },
  {
    heading: "Agent Deployment",
    body: "We build, test, and deploy IBOM into controlled workflows, review paths, and agent behaviours.",
  },
] as const;
