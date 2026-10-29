# Codex Brief: Search Index and Retrieval API Market Map

## 1. Purpose

Produce a research paper of 5,000 to 7,000 words, written as a markdown file, that maps the market for web search indexes and retrieval APIs by layer. The paper must make clear where each provider sits in the stack, what each layer does, and what a provider needs to move up it.

The paper is neutral. It describes the market. It does not argue for or against any provider. Mojeek is one subject among many and is placed on the map as a position to be verified, not as a conclusion.

**Authorship and independence.** Jonny Bowker, Managing Director of Advanced Analytica Ltd, is the research lead and the named author. Codex is the research assistant. The paper states this on its first page, with the date, the scope and the limits of the study.

The paper has two parts. Part One is a neutral landscape study: the market, the layers, the shares and the gaps. Part Two is a proposal for an active role, a Fractional AI Director, built only on what Part One proves. Part One must not bend to fit Part Two. Where the evidence doesn't support the proposal, Part Two says so.

The paper is a landscape study and a proposal. It is not financial, legal or investment advice.

Open the paper with a one-page decision summary: the verdict, the three or four findings that drive it, and a plain split between what is confirmed and what is unconfirmed.

## 2. Style and constraints

- British English throughout.
- No em dashes. No exclamation marks.
- Short sentences. Aim for 16 words, never more than 24.
- Use contractions where natural.
- No hedging language. State what the evidence shows, and state plainly when evidence is missing.
- Do not use these words: leverage, robust, innovative, solutions, myriad, optimal, organisations.
- No marketing language or hollow positioning.
- Every factual claim carries a source. Use inline links or a numbered source list.
- Label each claim with a confidence status: confirmed (primary source such as official docs, pricing pages, filings), reported (credible secondary source), or unverified (inference or vendor claim without proof).
- Exclude pricing from any conclusions. Pricing may appear in the evidence tables only as a published data point with a date.

### Citation standard

Every fact must be checkable by a person who has only the paper and a browser. Apply these rules to every claim, table cell and figure.

1. **One source per claim, at the claim.** Put the citation directly beside the sentence or table cell it supports, not at the end of the section. Use a numbered reference such as \[12\] that maps to the source list.
2. **Primary source first.** Cite official documentation, pricing pages, API schemas, company blogs, filings and registers before any secondary source. If only a secondary source exists, say so in the citation.
3. **Full citation record.** Each source entry in the list carries: number, title, publisher, exact URL, access date, and the source type (official, filing, secondary, community).
4. **Quote the evidence for key claims.** For every claim about what a provider does or doesn't offer, add a short verbatim quote of no more than 25 words from the source, in the source list entry. Mark the quote as verbatim.
5. **Archive links.** For every web source, add an archive URL (for example from the Internet Archive) so the page can be checked if it changes. If no archive exists, state that.
6. **Pages actually opened.** Cite only pages Codex has opened and read. A search snippet is not a source. Don't cite a page from memory.
7. **Dates matter.** Give the access date and, where the page shows one, the publication or last-updated date. Pricing, plan limits and API status must carry both.
8. **Direct tests count as sources.** Where Codex runs an API call or downloads a dataset, record the endpoint or file, the date and time, the request made, and the relevant part of the response. Save raw test output to a `evidence/` folder in the project and cite the file name.
9. **Conflicts stay visible.** If two sources disagree, cite both, say which is stronger and why, and don't merge them into one claim.
10. **No source, no claim.** A statement with no citation goes in the Open questions section as unverified, not in the body as fact.

Also produce a separate file, `sources.csv`, with one row per source and these columns: number, title, publisher, url, archive\_url, access\_date, published\_date, source\_type, verbatim\_quote, claims\_supported. This lets the sources be checked in bulk.

## 3. The stack to use as the organising model

Use this layered model throughout. Refine it if the research shows a layer is missing, and say so explicitly.

1. **Crawl.** Discovering and fetching pages. Includes crawler identity, robots.txt compliance, rate limits and scale.
2. **Index.** Storing and organising fetched content so it can be searched. Includes index size, freshness, deduplication and quality filtering.
3. **Search API.** Keyword or ranked retrieval over the index. Returns URLs, titles and snippets.
4. **Extraction and enrichment.** Turning pages into structured content. Includes full-text extraction, entity extraction, geolocation, language, publication dates, sentiment and link data.
5. **Semantic layer.** Chunking, embeddings and a vector store, so retrieval works by meaning. Includes the embedding model, chunking strategy, and whether embeddings exist at chunk or page level.
6. **Query API.** REST or GraphQL over the semantic and structured data. Includes filtering by entity, date, source and region.
7. **Agent access.** A Model Context Protocol server or equivalent, so AI agents can call the query API directly.
8. **Assurance and rights.** Certifications, data protection position, publisher rights, provenance and audit trail. This sits across all layers.

For each provider, record which layers it owns, which it resells or sources from others, and which it doesn't offer.

## 4. Research questions

### 4.1 Why Google and Bing are withdrawing their search APIs

Establish what has actually happened and when. Use official announcements first.

- Bing Search API retirement: dates, replacement offers, and what Microsoft has said about the reason.
- Google: the status of Custom Search JSON API and Programmable Search Engine, any closure to new customers, and what Google has said.
- The working hypothesis to test: the platforms no longer want to give away access to their crawl and index to third parties.
- Test that hypothesis against alternatives. Consider at least: the cost of serving API traffic that feeds competing AI products, licensing and publisher pressure, protecting their own AI answer products, regulatory exposure, and ordinary product rationalisation.
- State which explanation the evidence supports and which it doesn't. Separate what the companies said from what analysts inferred.

### 4.2 Who owns an index, and who doesn't

For every provider, establish whether it owns a crawler and index, or sources results from someone else. This distinction is central.

Providers to cover at minimum:

- **Index owners:** Google, Bing, Brave Search, Mojeek, Yandex, and any others found (for example Marginalia, Common Crawl as a public dataset, and regional engines).
- **Retrieval layers for AI agents:** Tavily, Exa, You.com, Perplexity (Sonar API), Kagi, Firecrawl, Jina, and any others found.
- **Structured web data and entity providers:** Diffbot, Webz.io (Webhose), GDELT, and any others found.
- **Crawling and extraction services:** Zyte (the company behind Scrapy), Bright Data, Apify, and any others found.

For each, record: crawler identity and robots.txt behaviour, index size where stated, freshness, what the API returns, and which layers of the stack it covers.

#### Crawler register

Build a register of crawlers and index operators with their full names. Don't stop at the well-known engines. Include older, smaller, regional and specialist operators, and the commercial crawling services.

For each entry record:

- Full legal name of the operator, and the trading name.
- Crawler name and user-agent string as published (for example MojeekBot), with the page where it is documented.
- Whether it runs its own crawler and index, or sources results from another operator.
- Country of operation and, where published, hosting location.
- Status: active, acquired, rebranded, defunct. Give dates.
- What the crawl feeds: a public search engine, an API, an SEO or link index, an enterprise search product, or a data feed.

Start with these, and add every other operator the research finds:

- Google (Googlebot), Microsoft Bing (Bingbot), Brave, Yandex, Baidu, Naver, Seznam, Mojeek (MojeekBot), Marginalia.
- Exalead (Dassault Systemes): record its history, current status and whether it still operates a web index.
- Common Crawl (CCBot) as a public dataset.
- SEO and link-index crawlers, for example Ahrefs, Majestic, Semrush, Moz, and Linkdex (later part of Brandwatch): record who owns each and what it crawls.
- Commercial crawling and extraction services, for example Zyte, Bright Data, Apify, Oxylabs, and others found.
- AI company crawlers, for example GPTBot, ClaudeBot, PerplexityBot, and others found, with each operator's published robots.txt position.

Treat every claim of the form "X uses Y's index or crawl" as unverified until a primary source confirms it. That includes the claim that Linkdex used Mojeek. Search for the claim's origin, record where it appears, and test it against official documentation, company statements, user-agent evidence and archived pages. Report one of: confirmed, contradicted, or unresolved. If it is contradicted or unresolved, say what evidence would settle it.

Cover the register as a table in the paper and as a column in the coverage matrix.

### 4.3 Where the value sits above the index

Even without a semantic layer, some providers add value through entities and structure. Investigate:

- Diffbot: the Knowledge Graph, entity extraction, and how its data is accessed.
- Webz.io: news, blogs, forums and reviews feeds, entity and sentiment enrichment, and delivery formats.
- GDELT: structured global event and entity signals, and whether Codex can use its public datasets directly as a test bed.
- Any other provider that sells entities, geolocation or provenance.

For each, state what the customer actually receives that a plain search API does not provide.

### 4.4 The semantic layer

- Which providers publish vector or embedding search over their own index?
- Which publish the embedding model, chunking approach, or chunk-level fields?
- Which expose semantic or authority scores, and on what terms?
- Which expose a GraphQL or MCP interface?
- Identify the providers that cover the whole stack from crawl to agent access, and the providers that sit at one layer only.

### 4.5 Assurance, certification and rights

- For each provider, record published certifications (for example Cyber Essentials, Cyber Essentials Plus, ISO 27001, SOC 2) and whether they cover the provider's own systems or only the hosting facility.
- Record published data protection terms, retention terms, and any stated policy on searches about named individuals.
- Record the stated position on publisher rights, robots.txt and opt-out.
- Record any stated position on use of results for AI training or storage.
- Distinguish published evidence from claims.

### 4.6 Mojeek in the map

Place Mojeek on the stack using public evidence only. For each layer, mark it as confirmed, unconfirmed or not evidenced.

Use these starting points, and verify each against primary sources:

- Mojeek runs its own crawler (MojeekBot) and index, built in-house.
- The public API returns URL, title and query-dependent snippet. Scores for authority, keyword and semantic matching are described as available on custom plans only.
- No entity, vector or embedding field appears in the public API schema.
- Mojeek's stated aspiration, per its own newsletters and blog, includes better contextual understanding of queries and opt-in AI summaries.
- Published certifications: check public registers and Mojeek's own pages. Record what is found and what is not.
- Public pricing and plan limits as a dated data point only.

Then state, as a neutral gap analysis, which layers sit between Mojeek's confirmed position and a full-stack provider. Do not speculate about internal spending, finances or staffing. Describe gaps in capability only.

Mark clearly that Mojeek's internal data holdings are the subject of separate due diligence and are not assumed here.

### 4.7 Market structure and scale

- Group providers into categories by the layers they own.
- Estimate relative scale for each where public data allows: index size, crawl volume, customer counts, published funding, or traffic. Mark estimates as reported or unverified.
- Identify which categories are crowded and which are thin.
- Identify the largest unmet need visible in developer discussion, documentation and product changes, particularly for agent and headless use.

### 4.8 Buyers and personas

Identify who buys or uses services at each layer of the stack, what pain they have, and why they choose or leave each type of provider. Then turn the findings into detailed buyer personas that can later be loaded as AI personas for synthetic interviews.

**Step one: find the buyers.** For each layer and provider category, establish who pays and who uses. Consider at least:

- Developers building AI agents and retrieval pipelines (users of Tavily, Exa, Brave, Firecrawl, Jina and similar).
- Teams that run their own crawlers and index, and why they chose to build.
- Enterprise search and knowledge teams.
- Security operations and threat intelligence teams that enrich alerts with web data (SIEM and SOC buyers).
- Brand, reputation and risk teams that monitor news, forums and reviews (users of Webz.io and similar).
- Financial, legal and compliance teams that need provenance and an audit trail.
- Researchers and data scientists who build training or evaluation datasets.
- SEO and marketing teams that buy link and crawl data.
- Public sector buyers, including those buying through G-Cloud or similar frameworks, and the assurance they require.
- Any further buyer type the evidence reveals.

**Step two: gather evidence of pain.** Use primary evidence where possible: developer forums, GitHub issues, Hacker News and Reddit threads, review sites, migration write-ups, provider changelogs, and public procurement documents. Look for:

- What buyers complain about for each provider (recall, freshness, rate limits, cost, blocked crawls, thin content, lack of entities, lack of provenance, lack of certification).
- Why buyers switched providers, and what they switched to.
- Why buyers built their own extraction layer on top of a search API, and what the raw API output lacked.
- Why buyers reject a provider outright, such as missing certification, unclear rights, an undeclared crawler, or lock-in.
- What buyers say they would pay more for.

Cite every pain point to the source it came from, using the citation standard above. A pain point with no source is a hypothesis and must be labelled as one.

**Step three: build the personas.** Produce at least eight personas, covering every layer and buyer type above. Each persona must include:

1. Name, role, sector, company size and where they sit in the buying decision (user, influencer, budget holder, blocker).
2. Goals and the job they are trying to get done.
3. Current stack: which providers they use at which layers, and what they built themselves.
4. Top pain points, each linked to a cited source or labelled as a hypothesis.
5. Why they chose their current provider.
6. Why they rejected or left other providers, by provider name where the evidence supports it.
7. Buying criteria in order of weight, including security, certification, rights, provenance, freshness, entities, semantic quality and integration with MCP or agent frameworks.
8. Objections they would raise to a new semantic and entity layer built on an independent UK index.
9. What would make them switch, and what would stop them.
10. Questions they would ask in a first call.

**Step four: make them interrogable.** Save each persona as its own markdown file in a `personas/` folder, written as a system prompt another model can role-play. Each file starts with a plain-language header saying the persona is a synthetic hypothesis built from cited sources, not a real person and not evidence of demand. Add a shared `personas/README.md` explaining how to run interviews with them, and a starter interview script of ten questions.

**Limits.** Synthetic personas sharpen hypotheses and objections. They don't prove demand, and the paper must never present their answers as market evidence. Where the paper uses a persona's view, state the source that supports it. Real developer interviews are planned separately and will test these hypotheses.

### 4.9 Market size and share by layer

Establish who owns what part of the market at each layer of the stack, and what each layer is worth. Use only trusted sources, as defined in section 4.10.

For each layer and provider category, report:

- Market size in currency, with the year, the geography and exactly what is counted.
- Provider shares where a trusted source publishes them: share of queries, index, revenue, API traffic or customers.
- Growth rate and the period it covers.
- Where no trustworthy figure exists, say so. Don't estimate to fill the gap. Give a range only if the sources allow one, and show how it was built.

Layers and categories to cover at minimum:

- Web search share by engine (consumer and API), including independent index owners.
- Search and web data API revenue, including the effect of the Bing API withdrawal and the Google API restrictions.
- AI agent retrieval and web grounding services.
- Web scraping, crawling and extraction services.
- Structured web data, news data and entity or knowledge graph providers.
- SEO and link index data.
- Public sector and enterprise search procurement where figures are published.

For private companies, use filed accounts, funding announcements from the company or investors, and official statistics before any analyst estimate. Record the revenue, headcount and funding for each provider where published, with the source.

Where sources disagree, show every figure in a table with its source, date, method and what it counts. State which figure the paper treats as stronger and why. Don't average conflicting figures.

Present the results as a table of layers against providers and shares, and as a Mermaid chart where the data supports one. Every number carries a citation under the citation standard.

### 4.10 Source trust rules

Claims about market size, share and revenue must come from sources that pass a documented trust test. Don't use anonymous, undated or unsourced market reports.

**Source hierarchy, strongest first:**

1. Primary: company filings, annual reports, official registers such as Companies House and SEC filings, regulator publications, and official statistics.
2. Provider statements: documentation, pricing pages, engineering blogs and announcements from the company concerned, treated as claims by that company.
3. Established measurement sources: for example StatCounter and similar published methodology for search share, with the method stated.
4. Reputable secondary sources: established news organisations and analyst firms that show their method and name their data.
5. Everything else: community posts and vendor-written reports. Use these only for pain points and anecdotes, never for market size or share.

**Domain ranking test.** Before relying on any secondary source for a market figure, check its domain against the Common Crawl web graph ranking.

- Use the latest quarterly host-level and domain-level web graph releases from Common Crawl, which publish harmonic centrality and PageRank.
- Record the release used, the date, and the rank for each domain.
- Build a short list of trusted domains from the sources that pass, and save it as `trusted-domains.csv` with columns: domain, harmonic\_centrality\_rank, pagerank\_rank, source\_type, reason\_trusted.
- Set a rank threshold and state it. Document any manual overrides, for example a small specialist site that ranks low but publishes a rigorous method, with the reason.

**Limits of the ranking test.** A high link rank shows prominence, not accuracy. Use it as a filter, never as proof. A source that passes the ranking test must still show its method, date and author or publisher. A source that fails the ranking test may still be used if it is a primary source, such as a company's own filing.

**Record every source decision.** For each market figure used, record the domain, its rank, its position in the hierarchy, and why it was accepted. Save the log as `source-decisions.csv`. List every rejected source for a figure, with the reason.

### 4.11 Decision criteria for an active investor

Write this section from the seat of someone considering putting in their own time, not money. State what must be true at each layer before they would commit.

Criteria to assess, at minimum:

- Documented data lineage from crawl to index to any enrichment.
- Rights to store, reuse and resell the data, with the licence position stated.
- Security and assurance certifications actually held, such as Cyber Essentials Plus, ISO 27001 and SOC 2, as distinct from planned.
- A team able to support enterprise buyers: support, uptime commitments, contracts and security questionnaires.
- A credible route to revenue at the layer the business actually occupies.
- Evidence of buyer demand from section 4.8, labelled as hypothesis where it is synthetic.

Give each criterion a status of met, not met or unknown, with the evidence and its citation. Where a status is unknown, say what would confirm it.

### 4.12 Gaps and de-risking

For every criterion that is not met or unknown, state what it would take to close it: the work involved, the elapsed time, the likely cost range where published sources allow one, and who would do it. Don't invent costs. Where no source exists, say so.

## Part Two. The offer: Fractional AI Director (written after Part One is complete)

Part Two is a proposal for a role. It uses only findings from Part One and cites them by section. It is written in Jonny Bowker's voice, in the first person, under the same style rules as the rest of the paper.

### P2.1 The role

Define a Fractional AI Director as one person who owns AI direction across a small business on a part-time basis, with a focus on five areas: data, risk, brand, marketing and sales. Brand is treated as part of marketing and sales, not a separate function.

State what the role owns:

- AI and data direction: where AI is used, what data it relies on, and how that data is governed.
- Risk: certification roadmap, security posture and the evidence a buyer's procurement team will ask for.
- Brand, marketing and sales strategy: positioning, messaging and go-to-market, using AI to drive and test them.
- Buyer strategy: which buyer personas to pursue first, drawn from section 4.8.

State what the role does not own: day-to-day engineering, fundraising and legal advice.

### P2.2 First ninety days

Build a plan tied directly to the unmet and unknown criteria in sections 4.11 and 4.12. Each action names the criterion it closes, the output it produces and how success is checked. Order the actions by what unlocks the most value first.

### P2.3 Engagement model

Describe the shape of the engagement: time commitment, reporting line, decision rights, review points and exit conditions. Offer three entry routes with the conditions that make each sensible: a technical and brand audit first, a time-boxed pilot, or an ongoing fractional role. Include walking away as a stated option, with the findings that would trigger it.

Exclude pricing and fees from this paper.

### P2.4 Independence and conflicts statement

Open this statement with the following facts, in the author's first-person voice, and don't soften them.

- I support Edward Iliffe, a major shareholder in Mojeek, in assessing this opportunity. I am not a funder of Mojeek and I do not work for it.
- Advanced Analytica Ltd, my firm, would earn fees from the audit and from any fractional role this paper proposes.
- I have a commercial interest in the conclusion that Mojeek needs the capabilities I offer.

Then state what I did to keep Part One independent: primary sources first, conflicting figures shown side by side, gaps stated instead of filled, every claim cited, and Part One written before Part Two. State that Mojeek's management has not reviewed this paper and that no figure in it comes from Mojeek unless cited as a company statement.

Invite the reader to challenge any finding, and say which findings would change the proposal if they proved wrong.

## 5. Method

- Start from primary sources: official documentation, pricing pages, API schemas, company blogs, regulatory filings and Companies House or equivalent registers.
- Use secondary sources to cross-check, not to replace primary ones.
- Where Codex can test an API or public dataset directly (for example GDELT, Common Crawl host graphs, or a free tier), run a small test and record the result and the date.
- Record every source with title, URL and access date.
- When two sources conflict, report both and say which is stronger and why.
- Do not fill gaps with assumption. A gap goes in the paper as a gap.

## 6. Deliverable structure

Write the paper as a single markdown file with these sections.

1. Summary. One page. The market in plain terms and the main findings.
2. The stack. Definition of each layer.
3. Why Google and Bing are closing their APIs. Evidence, hypotheses tested, conclusion.
4. The market by category. Each category with its providers and what they own.
5. Provider profiles. One short profile per provider, with layers covered, evidence and status labels.
6. The coverage matrix. A table of providers against layers, using confirmed, reported, unverified and not offered. Add a second table for assurance and rights.
7. Where the value sits. Analysis of what buyers receive at each layer, and where entity and semantic enrichment add something a plain index doesn't.
8. Mojeek in context. Position on the map, aspirations from public statements, and capability gaps to a full-stack position.
9. Open questions. What the public evidence can't answer, and which questions need direct diligence.
10. Sources. Numbered list with access dates.

**Second output: buyer personas.** Alongside the paper, produce the persona set described in section 4.8. It is a separate deliverable, not a chapter of the paper. The paper summarises the buyer findings in the section on where the value sits. The full personas live in a `personas/` folder, each as its own markdown file, with a `README.md` and a starter interview script.

**Other files to produce.** `sources.csv`, an `evidence/` folder of raw test output, and a `diagrams/` folder of Mermaid sources.

Include a layered diagram described in text, with colour keys in a legend: green for confirmed, amber for reported or unconfirmed, red for not offered or not evidenced. If a Mermaid block is useful, include it as a code block.

### Diagrams

Use Mermaid diagrams inside the markdown file wherever a picture shows the data more clearly than prose or a table. Each diagram goes in a fenced `mermaid` code block so it renders in VS Code and on GitHub. Don't add diagrams for decoration.

Required diagrams:

1. **The stack.** The eight layers as a vertical flow from crawl to agent access, with assurance and rights drawn as a band across all layers.
2. **The market map.** Providers grouped by category, with each provider connected to the layers it owns. Show which providers cover one layer and which span several.
3. **Mojeek in the map.** The same stack with Mojeek's layers coloured by status: confirmed, unconfirmed, not evidenced. Show the gap to a full-stack position as the uncoloured layers.
4. **Provider coverage by type.** One compact diagram per category (index owners, retrieval layers, structured data and entity providers, crawling services) showing where its members sit.
5. **The Google and Bing API withdrawal.** A timeline or flow of what each company announced and when, with each step cited.

Optional diagrams, where the evidence supports them:

- A data flow from crawl to agent, showing where chunking, embedding and entity extraction occur.
- A comparison of how a query travels through a plain search API, an entity provider, and a full semantic stack.
- A dependency diagram showing that query embedding must use the same model as the stored vectors.

Rules for every diagram:

- Colour key: green for confirmed, amber for reported or unconfirmed, red for not offered or not evidenced. Include the key as a legend beside or beneath the diagram.
- Every node or edge that states a fact carries the same citation number used in the body. The diagram must match the coverage matrix exactly.
- Give each diagram a one-line caption stating what it shows and its as-of date.
- Add a plain-text description under each diagram, so the content survives if the diagram doesn't render.
- Keep each diagram readable: no more than about 15 nodes. Split a larger one into two.
- Save each diagram's source as its own `.mmd` file in a `diagrams/` folder, and render a PNG or SVG of each if a Mermaid renderer is available, saved in the same folder.

## 7. Quality checks before finishing

- Word count between 5,000 and 7,000.
- Every provider in 4.2 appears in the coverage matrix.
- Every claim has a source and a status label.
- No em dashes, no exclamation marks, no forbidden words.
- No claim about Mojeek's finances, staffing or internal spending.
- Open questions section lists everything the research couldn't confirm.

* Every claim carries a numbered citation beside it, and every number maps to a full entry in the source list.
* `sources.csv` exists and matches the numbered source list one to one.
* Every claim about what a provider does or doesn't offer has a verbatim quote in its source entry.
* Every web source has an archive link or a stated reason there isn't one.
* No source was cited without being opened.
* Raw test output is saved in `evidence/` and cited by file name.

- All five required diagrams are present, each with a legend, caption, as-of date and plain-text description.
- Every diagram matches the coverage matrix, with no provider shown in a layer the matrix doesn't support.
- Every fact in a diagram carries a citation number from the source list.
- Each diagram's `.mmd` source is saved in `diagrams/`.

* The crawler register is complete: each entry has a full operator name, crawler name, user-agent source, status and what the crawl feeds.
* Every "X uses Y" claim found in the research is marked confirmed, contradicted or unresolved, with sources.

- At least eight personas exist as separate files in `personas/`, each with all ten required elements.
- Every pain point is cited or labelled as a hypothesis.
- Each persona file carries the synthetic-hypothesis header, and `personas/README.md` and the interview script exist.
- The paper doesn't present persona responses as evidence of demand.

* Section 4.9 is complete: every layer has a market size, provider shares where trusted sources exist, and a stated gap where they don't.
* No market figure comes from a source that fails the section 4.10 trust test, unless it is a primary source.
* `trusted-domains.csv` and `source-decisions.csv` exist, and the Common Crawl release used is named.
* Conflicting figures are shown side by side, not averaged.

- The first page names Jonny Bowker as research lead and carries the decision summary.
- Part One stays neutral. Part Two cites Part One for every claim and says where the evidence doesn't support the offer.
- Each decision criterion in section 4.11 has a status of met, not met or unknown, with evidence.
- Part Two contains no pricing and includes the independence statement.

* Part Two sections are numbered P2.1 to P2.4 and the independence statement names the author's support for Edward Iliffe and Advanced Analytica's fee interest.

Save the output as `search-index-market-map.md` in the project root.
