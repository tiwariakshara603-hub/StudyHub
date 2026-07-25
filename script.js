/* ================================================================
   SmartPrep AI – script.js
   All application logic: AI engines, DOM management, Local Storage
   ================================================================ */

'use strict';

/* ================================================================
   1. CONSTANTS & CONFIGURATION
   ================================================================ */

const STORAGE_KEYS = {
  THEME: 'smartprep_theme',
  SUBJECTS: 'smartprep_subjects',
  LAST_PLAN: 'smartprep_last_plan',
};

// Subject colors cycling palette
const SUBJECT_COLORS = [
  'color-0', 'color-1', 'color-2', 'color-3',
  'color-4', 'color-5', 'color-6', 'color-7',
];

/* ================================================================
   2. AI KNOWLEDGE BASE
   A rich, topic-aware content engine (no backend required)
   ================================================================ */

const AI = {

  /* ---- 2a. Topic Explainer Engine ---- */
  explainTopic(topic) {
    const t = topic.trim().toLowerCase();

    // Comprehensive exam-oriented revision knowledge map
    const knowledgeBase = {
      photosynthesis: {
        definition: 'Photosynthesis is the endothermic biochemical process by which autotrophic organisms (plants, algae, cyanobacteria) synthesize glucose (C₆H₁₂O₆) and oxygen (O₂) from carbon dioxide (CO₂), water (H₂O), and solar energy.',
        keyConcepts: [
          'Photolysis: Water molecules split using light energy, releasing O₂ as a byproduct.',
          'Energy Carriers: Light energy is trapped as chemical energy in ATP and NADPH.',
          'Carbon Fixation: CO₂ is incorporated into 3-carbon sugars during the Calvin Cycle.'
        ],
        features: [
          'Occurs inside chloroplast organelles containing thylakoid membranes and stroma.',
          'Driven by photosynthetic pigments (Chlorophyll a, Chlorophyll b, and Carotenoids).',
        ],
        functions: [
          'Converts solar radiation into storable chemical bond energy.',
          'Generates atmospheric oxygen essential for aerobic respiration in ecosystems.'
        ],
        types: [
          'C3 Photosynthesis: Standard pathway (e.g., wheat, rice) forming 3-PGA.',
          'C4 Photosynthesis: Spatial separation of CO₂ capture (e.g., corn, sugarcane) to minimize photorespiration.',
          'CAM Photosynthesis: Temporal separation (nighttime CO₂ capture) in desert plants (e.g., cacti).'
        ],
        advantages: [
          'Forms the primary trophic energy foundation of terrestrial and aquatic food chains.',
          'Acts as a massive global carbon sink regulating atmospheric CO₂ levels.'
        ],
        disadvantages: [
          'Low overall energy conversion efficiency (~1-2% in most crop plants).',
          'Highly vulnerable to water stress, extreme temperatures, and photoinhibition.'
        ],
        syntax: '6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂',
        example: 'Oak tree leaves absorbing sunlight at 430nm (blue) and 660nm (red) wavelengths to manufacture starches.',
        examQuestions: [
          { q: 'What is the primary difference between Light-Dependent and Light-Independent reactions?', a: 'Light reactions occur in thylakoids and require direct sunlight to split H₂O and make ATP/NADPH. Light-independent reactions (Calvin cycle) occur in the stroma and use ATP/NADPH to fix CO₂ into glucose without requiring direct light.' },
          { q: 'Why is photorespiration considered wasteful in C3 plants?', a: 'Because RuBisCO binds with O₂ instead of CO₂, consuming energy and releasing CO₂ without producing ATP or sugars.' }
        ]
      },
      programming: {
        definition: 'Programming is the systematic process of designing, writing, testing, debugging, and maintaining instruction code for computing systems to perform automated algorithms.',
        keyConcepts: [
          'Control Flow: Executing code sequentially, conditionally (if/else), or iteratively (loops).',
          'Data Abstraction: Storing values in variable types (integers, strings, arrays, objects).',
          'Modularization: Dividing logic into reusable functions/methods to minimize code duplication.'
        ],
        features: [
          'High readability through standardized syntax and naming conventions.',
          'Extensibility via external libraries, modules, and framework ecosystems.'
        ],
        functions: [
          'Translates human problem-solving logic into computer-executable instructions.',
          'Processes input data stream and generates formatted output results.'
        ],
        types: [
          'Imperative / Procedural Programming: Focuses on step-by-step state modification.',
          'Object-Oriented Programming (OOP): Bundles state and behavior into classes/objects.',
          'Functional Programming: Treats computation as evaluation of pure mathematical functions.'
        ],
        advantages: [
          'Automates repetitive tasks with high precision and speed.',
          'Scales computation to handle massive data sets efficiently.'
        ],
        disadvantages: [
          'Requires rigorous debugging, testing, and memory management.',
          'Susceptible to runtime exceptions, logic errors, and security vulnerabilities.'
        ],
        syntax: '// Function definition syntax\nfunction computeSum(a, b) {\n  return a + b;\n}',
        example: 'Writing a binary search algorithm in Python to find a target value in a sorted list of 1 million records in O(log N) time.',
        examQuestions: [
          { q: 'What is the key difference between Compiled and Interpreted languages?', a: 'Compiled languages (e.g. C++) translate code directly into machine code before execution (faster runtime). Interpreted languages (e.g. Python) translate code line-by-line during execution (more flexible, easier debugging).' },
          { q: 'What are the 4 main pillars of OOP?', a: 'Encapsulation, Abstraction, Inheritance, and Polymorphism.' }
        ]
      },
      python: {
        definition: 'Python is a high-level, interpreted, dynamically typed, multi-paradigm programming language known for clear syntax, automatic memory management, and extensive standard libraries.',
        keyConcepts: [
          'Dynamic Typing: Variables adopt types automatically at runtime without explicit declarations.',
          'Indentation Syntax: Code blocks are demarcated by white space indentation instead of curly braces.',
          'Garbage Collection: Automatic reference counting and memory reclamation.'
        ],
        features: [
          'Rich ecosystem of third-party packages (PyPI, NumPy, Pandas, PyTorch).',
          'Cross-platform compatibility (runs on Windows, macOS, Linux).'
        ],
        functions: [
          'Used for web backends (Django, Flask), data science, AI/ML engineering, and automation scripts.'
        ],
        types: [
          'C-Python: Reference implementation written in C.',
          'PyPy: JIT-compiled high-performance implementation.',
          'Jython & IronPython: Java and .NET runtime integrations.'
        ],
        advantages: [
          'Extremely rapid prototyping and minimal boilerplate code.',
          'Huge developer ecosystem and extensive documentation.'
        ],
        disadvantages: [
          'Slower execution speed compared to C/C++ due to GIL (Global Interpreter Lock).',
          'High memory consumption and runtime type error risk.'
        ],
        syntax: '# List comprehension syntax\neven_squares = [x**2 for x in range(10) if x % 2 == 0]',
        example: 'Importing pandas to load a CSV dataset with `df = pd.read_csv("data.csv")` and running statistical analysis.',
        examQuestions: [
          { q: 'What is the Global Interpreter Lock (GIL) in Python?', a: 'A mutex mechanism that allows only one native thread to execute Python bytecodes at a time, preventing true multi-threaded CPU parallel execution.' },
          { q: 'How does a Python List differ from a Tuple?', a: 'Lists are mutable (modifiable) defined with `[]`; Tuples are immutable (read-only) defined with `()`, rendering tuples faster and hashable.' }
        ]
      },
      calculus: {
        definition: 'Calculus is the branch of mathematics studying continuous change, divided into Differential Calculus (rates of change) and Integral Calculus (accumulation of quantities).',
        keyConcepts: [
          'Limits: Evaluating function behavior as inputs approach a target point.',
          'Derivatives: Instantaneous rate of change / tangent slope of f(x).',
          'Integrals: Accumulation of quantities / exact net area under f(x).'
        ],
        features: [
          'Connects rates of change to net accumulated quantities via Fundamental Theorem of Calculus.',
          'Handles non-linear, continuous dynamic functions.'
        ],
        functions: [
          'Models motion trajectories, rate equations, optimization maxima/minima, and area/volume calculations.'
        ],
        types: [
          'Single-Variable Calculus: Functions with one independent variable f(x).',
          'Multivariable / Vector Calculus: Functions with multiple variables f(x, y, z).'
        ],
        advantages: [
          'Provides exact mathematical solutions for complex physical and economic systems.',
          'Enables continuous optimization in engineering design.'
        ],
        disadvantages: [
          'Requires function continuity and differentiability.',
          'Symbolic integration can be intractable, requiring numerical approximation methods.'
        ],
        syntax: 'Derivative: d/dx(xⁿ) = n·xⁿ⁻¹\nIntegral: ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C',
        example: 'Computing the derivative of displacement function s(t) = 5t² + 3t to find instantaneous velocity v(t) = 10t + 3.',
        examQuestions: [
          { q: 'What does the Fundamental Theorem of Calculus state?', a: 'It proves that differentiation and integration are inverse operations: if F\'(x) = f(x), then ∫ₐᵇ f(x)dx = F(b) - F(a).' },
          { q: 'How do you find local extrema (maxima/minima) using calculus?', a: 'Set the first derivative to zero (f\'(x) = 0) to find critical points, then test second derivative: f\'\'(x) > 0 is local minimum, f\'\'(x) < 0 is local maximum.' }
        ]
      }
    };

    // Match topic or build structured generic exam content
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (t.includes(key)) {
        return data;
      }
    }

    return this.generateGenericExplanation(topic);
  },

  generateGenericExplanation(topic) {
    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
    const lower = topic.toLowerCase();

    // Comprehensive multi-domain detection
    const isLit = /literature|poem|poetry|novel|drama|play|shakespear|metaphor|character|prose|fiction|theme|narrative|author|literary|sonnet|gothic|romanticism|rhetoric|allegory/.test(lower);
    const isHist = /history|historical|war|revolution|empire|century|king|queen|reign|dynasty|battle|treaty|civilization|colonial|independence|movement|ancient|medieval|world war|renaissance/.test(lower);
    const isGeo = /geography|climate|map|river|mountain|tectonic|earth|ocean|continent|population|atmosphere|soil|biomes|latitude|longitude|ecosystem|glacier|volcano|weather|topography/.test(lower);
    const isPol = /politic|constitution|democracy|government|parliament|judiciary|rights|state|election|governance|citizenship|policy|legislature|sovereign|liberty|justice|monarchy/.test(lower);
    const isEcon = /economic|microeconomic|macroeconomic|market|gdp|inflation|elasticity|monopoly|demand|supply|fiscal|monetary|currency|trade|banking|revenue|utility|capitalism/.test(lower);
    const isComm = /commerce|account|finance|business|audit|ledger|balance sheet|taxation|debit|credit|marketing|management|asset|liability|stock|capital|entrepreneur|invoice/.test(lower);
    const isLang = /language|grammar|linguistic|phonetics|syntax|tenses|noun|verb|adjective|translation|semantics|vocabulary|idiom|phrase|punctuation|preposition/.test(lower);
    const isArt = /art|painting|music|sculpture|architecture|design|dance|theatre|aesthetic|baroque|impressionism|composition|harmony|melody|rhythm|canvas|artistic/.test(lower);
    const isCS = /code|program|python|java|c\+\+|c#|js|javascript|sql|api|web|script|html|css|php|ruby|swift|kotlin|rust|go|typescript|database|algorithm|network|cyber|software|ai|machine learning|data structure/.test(lower);
    const isMath = /math|calculus|algebra|geometry|trigonometry|matrix|vector|derivative|integral|probability|statistics|equation|theorem|function|arithmetic|number theory|logarithm/.test(lower);
    const isBio = /biology|cell|genetics|dna|rna|organism|botany|zoology|anatomy|physiology|ecosystem|evolution|enzyme|protein|microbiology|photosynthesis|mitosis|meiosis|neuron/.test(lower);
    const isChem = /chemistry|acid|base|reaction|element|compound|molecule|periodic table|stoichiometry|organic|inorganic|bond|thermodynamics|atom|solution|catalyst|oxidation/.test(lower);
    const isPhys = /physics|force|motion|energy|velocity|gravity|mass|momentum|wave|optics|electric|magnetic|thermodynamics|quantum|relativity|kinematics|friction|photon/.test(lower);
    const isPsych = /psychology|sociology|philosophy|behavior|cognition|mind|brain|perception|personality|society|ethics|logic|moral|existential|consciousness|empathy/.test(lower);

    if (isLit) {
      return {
        definition: `${cap} is a significant literary subject or concept that explores human expression, narrative structures, stylistic devices, and thematic depth across artistic works.`,
        keyConcepts: [
          `Thematic Analysis: Uncovering underlying message, motifs, and moral/social commentary.`,
          `Literary Devices: Use of metaphors, symbolism, imagery, and narrative perspective.`,
          `Contextual Significance: How socio-cultural and historical settings influence textual interpretation.`
        ],
        features: [
          `Employs figurative language and creative narrative techniques to convey meaning.`,
          `Reflects human emotions, societal values, and philosophical reflections across eras.`
        ],
        functions: [
          `Enhances critical thinking, textual analysis, and empathetic understanding of diverse human experiences.`,
          `Provides historical and aesthetic appreciation of language and oral/written traditions.`
        ],
        types: [
          `Prose & Fiction: Novels, short stories, and narrative essays.`,
          `Poetry & Verse: Lyric, epic, sonnets, and free verse.`,
          `Drama & Theatre: Tragedy, comedy, and theatrical performative works.`
        ],
        advantages: [
          `Develops advanced critical interpretation and persuasive writing abilities.`,
          `Fosters cross-cultural empathy and deep comprehension of symbolism.`
        ],
        disadvantages: [
          `Interpretations can be subjective and open to multiple valid critical readings.`,
          `Requires close reading skills and sensitivity to archaic or complex language.`
        ],
        syntax: `Form / Structure: Stanza / Scene / Chapter\nRhyme Scheme / Meter: e.g., iambic pentameter (da-DUM da-DUM)`,
        example: `Analyzing how the central motif of light vs. darkness represents hope and despair in classic literature.`,
        examQuestions: [
          { q: `What is the role of theme and symbolism in ${cap}?`, a: `Theme provides the core message or insight into life, while symbolism uses concrete objects or actions to represent abstract literary ideas.` },
          { q: `How does narrative perspective affect reader interpretation?`, a: `First-person POV offers intimate internal thoughts but may be unreliable; third-person omniscient provides an objective, all-knowing view of all characters.` }
        ]
      };
    }

    if (isHist) {
      return {
        definition: `${cap} is a major historical event, movement, era, or development that shaped political structures, socio-economic conditions, and human civilization.`,
        keyConcepts: [
          `Cause and Effect: Identifying immediate triggers and long-term socio-political causes.`,
          `Primary vs. Secondary Sources: Evaluating eyewitness evidence against historical analysis.`,
          `Historical Significance: Understanding how ${cap} transformed governance, society, or trade.`
        ],
        features: [
          `Involves key historical figures, key timelines, treaties, or revolutionary shifts.`,
          `Influences subsequent historical trajectories and modern institutional frameworks.`
        ],
        functions: [
          `Explains how contemporary societies, borders, and political systems evolved over time.`,
          `Teaches critical analysis of historical bias, historiography, and primary documentation.`
        ],
        types: [
          `Political & Military History: Revolutions, treaties, dynastic rule, and conflicts.`,
          `Social & Cultural History: Changes in daily life, popular movements, and rights.`,
          `Economic History: Trade routes, industrialization, and financial systems.`
        ],
        advantages: [
          `Provides essential context for understanding modern global politics and international relations.`,
          `Prevents historical repetition by analyzing past strategic successes and policy failures.`
        ],
        disadvantages: [
          `Historical records may contain ideological bias or incomplete source materials.`,
          `Requires memorizing detailed chronologies, dates, key actors, and geopolitical contexts.`
        ],
        syntax: `Timeline Framework:\nCauses → Key Event / Crisis → Resolution / Treaty → Long-term Impact`,
        example: `Examining how the industrial transformation during ${cap} altered urbanization and labor policies globally.`,
        examQuestions: [
          { q: `What were the primary causes and long-term consequences of ${cap}?`, a: `Immediate factors included social unrest and economic hardship, while long-term consequences led to modern democratic governance and institutional reform.` },
          { q: `Why are primary sources essential when analyzing ${cap}?`, a: `Primary sources offer unmediated first-hand evidence from contemporary participants, reflecting original attitudes without modern retrospective bias.` }
        ]
      };
    }

    if (isGeo) {
      return {
        definition: `${cap} is a spatial geographic process, physical feature, or human-environmental system that shapes Earth's landscapes, ecosystems, and resources.`,
        keyConcepts: [
          `Physical Processes: Natural forces such as plate tectonics, erosion, weathering, and atmospheric circulation.`,
          `Spatial Distribution: How features or phenomena are arranged across Earth's surface.`,
          `Human-Environment Interaction: How human activity influences and adapts to physical geography.`
        ],
        features: [
          `Interacts with Earth's spheres (lithosphere, atmosphere, hydrosphere, biosphere).`,
          `Exhibits spatial variation across different latitudes, elevations, and climatic zones.`
        ],
        functions: [
          `Helps predict weather patterns, natural hazards, landform evolution, and resource availability.`,
          `Guides urban planning, environmental conservation, and sustainable development.`
        ],
        types: [
          `Physical Geography: Geomorphology, climatology, hydrology, and biogeography.`,
          `Human Geography: Population dynamics, economic geography, and urban settlements.`,
          `GIS & Remote Sensing: Digital mapping and spatial satellite data analysis.`
        ],
        advantages: [
          `Essential for managing natural resources, disaster mitigation, and climate policy.`,
          `Combines physical science with social science to address global sustainability challenges.`
        ],
        disadvantages: [
          `Complex multi-variable interaction makes exact long-term climate prediction challenging.`,
          `Requires understanding both micro-level field observations and global macro-scale systems.`
        ],
        syntax: `Spatial Scale Formula:\nReal Distance = Map Distance × Scale Factor`,
        example: `Analyzing how ocean currents and relief features create distinct local microclimates and vegetation zones.`,
        examQuestions: [
          { q: `How does ${cap} influence climate and ecosystem distribution?`, a: `By regulating heat distribution, moisture movement, and topographic barriers, creating specialized biomes and agricultural zones.` },
          { q: `Differentiate between Physical and Human Geography in relation to ${cap}.`, a: `Physical Geography focuses on natural earth processes (landforms, weather), whereas Human Geography studies spatial human behaviors (settlements, trade).` }
        ]
      };
    }

    if (isPol) {
      return {
        definition: `${cap} is a foundational political science concept, constitutional mechanism, or governance structure that regulates state power, rights, and political behavior.`,
        keyConcepts: [
          `Sovereignty & Power: How political authority is established, exercised, and legitimized.`,
          `Constitutional Rights: Legal protections, civil liberties, and duties of citizens.`,
          `Institutional Checks: Division of powers among executive, legislative, and judicial branches.`
        ],
        features: [
          `Codified through legal statutes, constitutional provisions, or international law.`,
          `Provides mechanisms for public policy, lawmaking, conflict resolution, and representation.`
        ],
        functions: [
          `Ensures social order, protects fundamental rights, and resolves conflicting political interests.`,
          `Sustains democratic accountability and transparent administrative processes.`
        ],
        types: [
          `Comparative Politics: Comparing democratic, parliamentary, and federal systems.`,
          `International Relations: Global diplomacy, treaties, and international organizations.`,
          `Political Theory: Liberalism, socialism, federalism, and constitutionalism.`
        ],
        advantages: [
          `Prevents abuse of state power through rule of law and constitutional safeguards.`,
          `Empowers citizens to participate effectively in civic life and electoral processes.`
        ],
        disadvantages: [
          `Political consensus building can lead to legislative gridlock or slow policymaking.`,
          `Implementation can be hindered by institutional corruption or bureaucratic delays.`
        ],
        syntax: `Constitutional Structure:\nPreamble → Fundamental Rights → State Directives → Judicial Review`,
        example: `Examining how the separation of powers prevents autocratic consolidation by balancing statutory authorities.`,
        examQuestions: [
          { q: `What is the significance of ${cap} in a modern constitutional democracy?`, a: `It establishes the legal framework for citizen rights, prevents arbitrary state authority, and maintains institutional accountability.` },
          { q: `How do Fundamental Rights differ from Directive Principles?`, a: `Fundamental Rights are legally enforceable in court (justiciable), while Directive Principles guide government policy but are non-justiciable.` }
        ]
      };
    }

    if (isEcon) {
      return {
        definition: `${cap} is a fundamental economic theory, market force, or policy tool used to analyze how scarce resources are allocated among competing human wants.`,
        keyConcepts: [
          `Scarcity & Opportunity Cost: Evaluating trade-offs when allocating limited resources.`,
          `Market Equilibrium: Balance point where price equates quantity supplied with quantity demanded.`,
          `Policy Instruments: Using monetary interest rates and fiscal taxation/spending to stabilize economic growth.`
        ],
        features: [
          `Utilizes mathematical models, supply-demand curves, and empirical statistical indicators.`,
          `Predicts producer and consumer behavioral choices under varying market incentives.`
        ],
        functions: [
          `Guides government economic policy, corporate strategic pricing, and monetary management.`,
          `Assesses national productivity, employment trends, trade balances, and inflation.`
        ],
        types: [
          `Microeconomics: Individual consumer behavior, firm production costs, and market structures.`,
          `Macroeconomics: Aggregate economy-wide output (GDP), inflation rates, and unemployment.`,
          `International Economics: Global trade tariffs, exchange rates, and balance of payments.`
        ],
        advantages: [
          `Provides quantitative framework for maximizing market efficiency and social welfare.`,
          `Enables policymakers to mitigate economic recessions and control hyperinflation.`
        ],
        disadvantages: [
          `Economic models often rely on simplifying assumptions (e.g., ceteris paribus, rational agents).`,
          `Unforeseen external shocks (e.g., pandemics, geopolitical crises) can disrupt model accuracy.`
        ],
        syntax: `Equilibrium Formula: Qd = Qs\nElasticity = (% Δ Quantity) / (% Δ Price)`,
        example: `Analyzing how raising central bank interest rates curbs inflationary pressure by reducing consumer borrowing.`,
        examQuestions: [
          { q: `Explain the core mechanism of ${cap} and its effect on market equilibrium.`, a: `When market conditions change, price adjusts dynamically until quantity demanded equals quantity supplied at a new equilibrium point.` },
          { q: `How does Fiscal Policy differ from Monetary Policy?`, a: `Fiscal policy is controlled by government taxation and spending; Monetary policy is managed by the central bank via interest rates and money supply.` }
        ]
      };
    }

    if (isComm) {
      return {
        definition: `${cap} is an essential commerce, accounting, or business concept that deals with financial transactions, organizational governance, trade, or asset management.`,
        keyConcepts: [
          `Double-Entry Bookkeeping: Recording every transaction with equal debit and credit entries.`,
          `Financial Auditing: Verifying accuracy, legal compliance, and transparency of financial statements.`,
          `Working Capital Management: Balancing current assets and liabilities to ensure corporate liquidity.`
        ],
        features: [
          `Adheres to Generally Accepted Accounting Principles (GAAP) or IFRS standards.`,
          `Evaluates profitability, solvency, cash flows, and operational efficiency.`
        ],
        functions: [
          `Facilitates commercial transactions, capital investment, and enterprise management.`,
          `Provides investors and tax authorities with accurate financial reports.`
        ],
        types: [
          `Financial Accounting: Balance sheets, income statements, and cash flow reports.`,
          `Cost & Management Accounting: Budgeting, variance analysis, and internal decision-making.`,
          `Corporate Finance: Risk management, capital structure, and stock market valuation.`
        ],
        advantages: [
          `Ensures financial accountability, fraud prevention, and optimized capital allocation.`,
          `Enables businesses to measure financial health and satisfy statutory compliance.`
        ],
        disadvantages: [
          `Subject to regulatory changes, tax law revisions, and accounting complexities.`,
          `Historical cost accounting may not reflect real-time market value fluctuations.`
        ],
        syntax: `Accounting Equation:\nAssets = Liabilities + Owner's Equity\nNet Income = Revenue - Expenses`,
        example: `Preparing a trial balance for a corporation to ensure total debits match total credits before drafting financial statements.`,
        examQuestions: [
          { q: `What is the fundamental accounting equation and why must it always balance?`, a: `Assets = Liabilities + Equity. It balances because every financial asset is funded either by debt (liabilities) or capital (equity).` },
          { q: `Differentiate between Capital Expenditure and Revenue Expenditure.`, a: `Capital expenditure provides long-term benefits beyond 1 year (e.g., buying machinery); Revenue expenditure covers day-to-day operational costs (e.g., rent, salaries).` }
        ]
      };
    }

    if (isLang) {
      return {
        definition: `${cap} is a structural linguistic rule, grammatical principle, or language mechanism that governs effective communication, word formation, and sentence syntax.`,
        keyConcepts: [
          `Syntax & Morphology: Structural arrangement of words and internal formation of vocabulary.`,
          `Semantics & Pragmatics: Literal word meanings vs. contextual communicative intent.`,
          `Grammatical Agreement: Ensuring subject-verb, gender, and tense consistency.`
        ],
        features: [
          `Provides standardized rules for oral articulation, writing, and punctuation.`,
          `Evolves through cultural usage, literature, and cross-linguistic borrowing.`
        ],
        functions: [
          `Ensures clear, unambiguous communication across personal, academic, and professional contexts.`,
          `Forms the basis for language learning, translation, and computational natural language processing.`
        ],
        types: [
          `Prescriptive Grammar: Traditional normative rules of correct language usage.`,
          `Descriptive Linguistics: Studying how native speakers actually use language in practice.`,
          `Phonetics & Phonology: Study of speech sounds, intonation, and pronunciation.`
        ],
        advantages: [
          `Improves reading comprehension, persuasive writing, and communication precision.`,
          `Prevents grammatical ambiguity and misinterpretation in official documentation.`
        ],
        disadvantages: [
          `Irregular grammatical exceptions and idioms require memorization rather than strict logic.`,
          `Language evolution often creates tension between traditional rules and modern colloquial usage.`
        ],
        syntax: `Sentence Structure:\nSubject + Verb + Object (SVO)\nActive: [Actor] + [Action] + [Target]\nPassive: [Target] + [was/is Verb-ed] + by [Actor]`,
        example: `Correcting subject-verb agreement in complex sentences containing compound subjects and modifying clauses.`,
        examQuestions: [
          { q: `Explain the rule governing ${cap} with a clear grammatical example.`, a: `The rule requires consistent agreement between grammatical elements; e.g., singular subjects demand singular verbs regardless of intervening prepositions.` },
          { q: `What is the difference between Active and Passive Voice?`, a: `Active Voice emphasizes the subject performing the action; Passive Voice emphasizes the recipient or outcome of the action.` }
        ]
      };
    }

    if (isArt) {
      return {
        definition: `${cap} is a creative artistic discipline, aesthetic movement, or design principle that explores visual, auditory, or spatial expression of human imagination.`,
        keyConcepts: [
          `Elements of Design: Color theory, form, line, texture, value, and spatial perspective.`,
          `Principles of Composition: Balance, contrast, emphasis, harmony, movement, and proportion.`,
          `Aesthetic Criticism: Interpreting historical movement context and artistic intent.`
        ],
        features: [
          `Uses physical or digital mediums (pigments, stone, acoustic sound, digital pixels).`,
          `Communicates sensory experience, cultural identity, and emotional narratives.`
        ],
        functions: [
          `Enriches cultural heritage, fosters creative innovation, and expresses societal commentary.`,
          `Used in visual media, architectural design, performing arts, and therapeutic applications.`
        ],
        types: [
          `Visual Arts: Painting, sculpture, printmaking, and photography.`,
          `Performing Arts: Music composition, dance, theatre, and opera.`,
          `Applied Arts & Architecture: Industrial design, fashion, and structural design.`
        ],
        advantages: [
          `Stimulates creative problem-solving, visual literacy, and emotional intelligence.`,
          `Preserves cultural traditions while inspiring contemporary design trends.`
        ],
        disadvantages: [
          `Aesthetic evaluation is subjective and varies across different cultural paradigms.`,
          `Mastery requires extensive physical practice, specialized tools, or creative incubation.`
        ],
        syntax: `Composition Rule:\nRule of Thirds / Golden Ratio (1 : 1.618) → Harmony of Focus Points`,
        example: `Analyzing how complementary color schemes and directional lighting create emotional contrast in fine art.`,
        examQuestions: [
          { q: `How do the principles of design apply to ${cap}?`, a: `They guide the arrangement of visual elements (lines, colors) to create balance, focal emphasis, and visual rhythm in the artwork.` },
          { q: `What distinguishes historical artistic movements from contemporary styles?`, a: `Historical movements followed strict academic canons, while contemporary art emphasizes conceptual freedom, mixed media, and personal narrative.` }
        ]
      };
    }

    if (isCS) {
      return {
        definition: `${cap} is a computer science concept, software engineering paradigm, or digital architecture used to build, process, and optimize computational systems.`,
        keyConcepts: [
          `Algorithms & Complexity: Designing efficient step-by-step procedures measured by Big-O notation.`,
          `Data Abstraction & Structures: Organizing data in memory (arrays, trees, graphs, hash tables).`,
          `System Architecture: Modular software components, database management, and network protocols.`
        ],
        features: [
          `Provides high reliability, scalability, and automated logic execution.`,
          `Supports cross-platform interoperability through standardized APIs and protocols.`
        ],
        functions: [
          `Automates complex computations, powers web/mobile software, and protects digital data.`,
          `Enables machine intelligence, cloud storage, and real-time global connectivity.`
        ],
        types: [
          `Software Engineering: Systems development, web backends, and mobile applications.`,
          `Data & AI: Machine learning, database management, and big data analytics.`,
          `Cybersecurity & Networking: Cryptography, network routing, and system security.`
        ],
        advantages: [
          `Automates manual workflows with lightning speed and zero human calculation errors.`,
          `Scales compute power to handle millions of simultaneous user queries.`
        ],
        disadvantages: [
          `Susceptible to software bugs, security vulnerabilities, and memory leaks.`,
          `Requires continuous learning as tech stacks and security standards evolve.`
        ],
        syntax: `// Standard Algorithm Structure\nfunction execute(data) {\n  // Processing logic\n  return result;\n}`,
        example: `Implementing a fast search index using a hash map to retrieve record values in O(1) average time.`,
        examQuestions: [
          { q: `What is the significance of time and space complexity in ${cap}?`, a: `Complexity dictates how runtime memory and CPU cycles scale as input size grows, determining software scalability.` },
          { q: `Compare procedural programming with object-oriented programming.`, a: `Procedural focuses on sequential steps and standalone functions; OOP encapsulates state (data) and behavior (methods) into reusable objects.` }
        ]
      };
    }

    if (isMath) {
      return {
        definition: `${cap} is a mathematical branch, theorem, or operational method used to model quantities, geometric relationships, dynamic rates, or logical structures.`,
        keyConcepts: [
          `Axioms & Proofs: Establishing mathematical truth through rigorous deductive logic.`,
          `Functional Relations: Mapping input values to unique output values via explicit equations.`,
          `Optimization & Rate Evaluation: Solving for maximum/minimum bounds or continuous change.`
        ],
        features: [
          `Provides exact, universal mathematical solutions independent of subjective interpretation.`,
          `Expressible in standardized symbolic notation, equations, and graphical coordinate systems.`
        ],
        functions: [
          `Essential for engineering calculations, physics modeling, financial forecasting, and computer algorithms.`,
          `Provides tools for measuring physical space, statistical probability, and structural stability.`
        ],
        types: [
          `Pure Mathematics: Algebra, geometry, number theory, and mathematical logic.`,
          `Applied Mathematics: Calculus, statistics, differential equations, and numerical analysis.`,
          `Discrete Mathematics: Graph theory, combinatorics, and boolean logic.`
        ],
        advantages: [
          `Delivers precise, verifiable quantitative answers to complex physical problems.`,
          `Develops logical reasoning skills applicable across science and technology.`
        ],
        disadvantages: [
          `Abstract concepts can be challenging without strong foundational prerequisites.`,
          `Symbolic calculations require high precision to avoid cascading calculation errors.`
        ],
        syntax: `Standard Formula / Notation:\nf(x) = ax² + bx + c  (Quadratic Form)\ny - y₁ = m(x - x₁)  (Line Equation)`,
        example: `Evaluating the derivative of a cost function to determine the exact production volume that minimizes expenses.`,
        examQuestions: [
          { q: `State the fundamental theorem or formula associated with ${cap} and explain its variables.`, a: `The formula relates key variables through exact algebraic operations, where each parameter represents a physical or geometric dimension.` },
          { q: `Why is step-by-step verification important in mathematical proofs?`, a: `Because each step must logically follow from previous axioms; an unverified assumption invalidates the entire mathematical proof.` }
        ]
      };
    }

    if (isBio) {
      return {
        definition: `${cap} is a biological concept, physiological process, or ecological system that governs living organisms, cellular mechanisms, or life cycles.`,
        keyConcepts: [
          `Cellular Mechanism: How organelles, membranes, and biochemical pathways sustain cellular life.`,
          `Genetics & Inheritance: Transmission of hereditary information via nucleic acids (DNA/RNA).`,
          `Homeostasis & Adaptation: Maintaining internal biological equilibrium in response to environment.`
        ],
        features: [
          `Regulated by enzymatic reactions, feedback loops, and genetic code expression.`,
          `Operates across hierarchical biological levels (molecules → cells → tissues → organs → ecosystems).`
        ],
        functions: [
          `Sustains growth, reproduction, metabolic energy transformation, and species survival.`,
          `Forms the basis of medical diagnostics, biotechnology, agriculture, and pharmacology.`
        ],
        types: [
          `Molecular & Cell Biology: Genetics, cellular respiration, and enzyme kinetics.`,
          `Organismal Biology: Human anatomy, plant physiology, and microbiology.`,
          `Ecology & Evolution: Population dynamics, natural selection, and biodiversity.`
        ],
        advantages: [
          `Enables medical breakthroughs, disease treatments, and sustainable agricultural yields.`,
          `Fosters deep understanding of human health, ecology, and biological conservation.`
        ],
        disadvantages: [
          `Biological systems involve thousands of interconnected metabolic pathways.`,
          `Experimental studies require ethical considerations and controlled laboratory conditions.`
        ],
        syntax: `Biological Pathway:\nStimulus → Receptor → Signal Transduction → Cellular Response`,
        example: `Tracing how hormone binding triggers downstream intracellular second messengers to regulate glucose levels.`,
        examQuestions: [
          { q: `Describe the biological mechanism of ${cap} and its role in homeostasis.`, a: `It acts through regulated biochemical pathways to keep physiological parameters within optimal living ranges.` },
          { q: `Explain the structural difference between prokaryotic and eukaryotic organisms regarding ${cap}.`, a: `Eukaryotes possess membrane-bound organelles and a enclosed nucleus, whereas prokaryotes lack a nucleus and organelle compartmentalization.` }
        ]
      };
    }

    if (isChem) {
      return {
        definition: `${cap} is a chemical principle, reaction mechanism, or molecular property that governs matter composition, bonding, and energy transformation.`,
        keyConcepts: [
          `Atomic Structure & Bonding: Valence electron arrangements, ionic/covalent/metallic bonds.`,
          `Chemical Reaction Dynamics: Reactants transforming into products following stoichiometry.`,
          `Thermodynamics & Equilibrium: Energy changes (enthalpy ΔH, entropy ΔS) and reversible reaction balance.`
        ],
        features: [
          `Governed by fundamental laws of conservation of mass and energy.`,
          `Characterized by observable changes (color, gas release, precipitate, temperature shift).`
        ],
        functions: [
          `Enables synthesis of new materials, pharmaceuticals, polymers, and clean energy fuels.`,
          `Explains industrial chemical manufacturing, battery technology, and environmental chemistry.`
        ],
        types: [
          `Physical Chemistry: Thermodynamics, reaction kinetics, and electrochemistry.`,
          `Organic Chemistry: Carbon-based compounds, functional groups, and synthesis.`,
          `Inorganic Chemistry: Metals, coordination complexes, and crystalline structures.`
        ],
        advantages: [
          `Provides precise molecular control for manufacturing medicine, materials, and agrochemicals.`,
          `Allows predicting reaction yields and energetic outcomes before laboratory mixing.`
        ],
        disadvantages: [
          `Hazardous chemical reactions require strict laboratory safety and waste disposal protocols.`,
          `Reaction kinetics can be sensitive to minute temperature or pressure variations.`
        ],
        syntax: `Balanced Equation:\naA + bB → cC + dD\nReaction Quotient: Keq = [C]^c [D]^d / ([A]^a [B]^b)`,
        example: `Calculating the theoretical yield of a neutralization reaction using balanced stoichiometric ratios.`,
        examQuestions: [
          { q: `What is the significance of Le Chatelier’s Principle in relation to ${cap}?`, a: `If a chemical system at equilibrium is disturbed, the system shifts reaction direction to counteract the disturbance.` },
          { q: `How do Exothermic and Endothermic reactions differ regarding enthalpy change (ΔH)?`, a: `Exothermic reactions release heat (negative ΔH); Endothermic reactions absorb heat from surroundings (positive ΔH).` }
        ]
      };
    }

    if (isPhys) {
      return {
        definition: `${cap} is a fundamental physical law, energy mechanism, or natural force that governs the behavior of matter, space, time, and radiation in the universe.`,
        keyConcepts: [
          `Conservation Laws: Conservation of energy, linear momentum, angular momentum, and electric charge.`,
          `Field Theory & Forces: Gravitational, electromagnetic, strong nuclear, and weak nuclear interactions.`,
          `Wave-Particle Dynamics: Oscillations, wave propagation, optics, and quantum energy quantization.`
        ],
        features: [
          `Formulated through empirical experiment, vector mechanics, and mathematical equations.`,
          `Applies universally across micro-atomic scales to macro-cosmological space.`
        ],
        functions: [
          `Underpins mechanical engineering, electronics, aerospace technology, telecommunications, and energy generation.`,
          `Explains planetary orbits, electrical circuits, optical lenses, and quantum devices.`
        ],
        types: [
          `Classical Mechanics: Motion laws, kinematics, work, and energy dynamics.`,
          `Electromagnetism & Optics: Electric fields, magnetic induction, light waves, and lasers.`,
          `Modern Physics: Quantum mechanics, special/general relativity, and nuclear physics.`
        ],
        advantages: [
          `Provides predictive mathematical laws for designing machine structures and electrical devices.`,
          `Forms the core physical foundation of all technological engineering disciplines.`
        ],
        disadvantages: [
          `Requires advanced calculus and vector mathematics for complete formal derivation.`,
          `Idealized theoretical models (e.g., frictionless surfaces, point masses) require real-world correction.`
        ],
        syntax: `Fundamental Equations:\nF = m·a  (Newton's 2nd Law)\nE = m·c²  (Mass-Energy Equivalence)\nV = I·R  (Ohm's Law)`,
        example: `Applying conservation of momentum to calculate rebound velocities after a two-body elastic collision.`,
        examQuestions: [
          { q: `State the primary physical law governing ${cap} and write its mathematical equation.`, a: `The law relates fundamental vector quantities (force, energy, field) showing direct proportionality between rate of change and applied force.` },
          { q: `How does energy conservation apply during physical transformations in ${cap}?`, a: `Energy cannot be created or destroyed; it transforms between kinetic, potential, thermal, and radiative states while total energy remains constant.` }
        ]
      };
    }

    if (isPsych) {
      return {
        definition: `${cap} is a psychological or sociological concept, behavioral theory, or cognitive process that explains human mental function, social interactions, or societal structures.`,
        keyConcepts: [
          `Cognition & Perception: How the brain processes sensory inputs, forms memories, and makes decisions.`,
          `Behavioral Conditioning: Learning mechanisms through reinforcement, classical conditioning, or observation.`,
          `Social Dynamics: Group behavior, cultural norms, social stratification, and interpersonal relations.`
        ],
        features: [
          `Evaluated through qualitative observations, psychological experiments, and statistical surveys.`,
          `Examines interactions between biological neural processes and socio-cultural environments.`
        ],
        functions: [
          `Improves mental healthcare, educational strategies, workplace productivity, and conflict resolution.`,
          `Provides deep insight into human motivation, emotional regulation, and social harmony.`
        ],
        types: [
          `Cognitive & Behavioral Psychology: Memory, learning theories, and behavioral therapy.`,
          `Social & Organizational Psychology: Group dynamics, leadership, and social influence.`,
          `Developmental Psychology: Human cognitive and emotional growth across life stages.`
        ],
        advantages: [
          `Enhances self-awareness, emotional intelligence, and interpersonal communication skills.`,
          `Helps design supportive social policies and evidence-based mental health interventions.`
        ],
        disadvantages: [
          `Human behavior is complex and influenced by numerous uncontrolled psychological variables.`,
          `Psychological experiments require strict ethical protocols regarding participant consent.`
        ],
        syntax: `Behavioral Framework:\nStimulus → Cognitive Processing → Emotional / Behavioral Response`,
        example: `Studying how positive reinforcement increases desired habits by triggering brain reward pathways.`,
        examQuestions: [
          { q: `How does ${cap} influence human cognitive processing and behavior?`, a: `It shapes how individuals perceive sensory information, store memories, and select behavioral responses under social conditions.` },
          { q: `Differentiate between Classical Conditioning and Operant Conditioning.`, a: `Classical conditioning associates involuntary responses with new stimuli; Operant conditioning shapes voluntary behavior through rewards or consequences.` }
        ]
      };
    }

    // Default versatile academic explanation
    return {
      definition: `${cap} is a fundamental academic topic that encompasses key principles, theoretical models, and practical applications within its field.`,
      keyConcepts: [
        `Core Terminology: Understanding essential vocabulary, definitions, and foundational concepts of ${cap}.`,
        `Governing Principles: The underlying rules, theories, and framework that define ${cap}.`,
        `Practical Applications: How concepts of ${cap} are utilized in academic study and real-world scenarios.`
      ],
      features: [
        `Combines theoretical foundation with practical problem-solving methodologies.`,
        `Follows a structured learning progression from elementary concepts to advanced mastery.`
      ],
      functions: [
        `Provides essential analytical tools and background knowledge required for competitive exams.`,
        `Helps students analyze complex problems and draw evidence-based conclusions.`
      ],
      types: [
        `Theoretical Study: Focuses on core concepts, definitions, and conceptual understanding.`,
        `Applied Practice: Focuses on practical problem solving, case studies, and real-world implementation.`
      ],
      advantages: [
        `Develops critical thinking, structured reasoning, and comprehensive domain knowledge.`,
        `Prepares students for academic excellence, examinations, and professional applications.`
      ],
      disadvantages: [
        `Mastery requires consistent revision, practice questions, and active recall.`,
        `Some sub-topics can be abstract and require clear foundational understanding.`
      ],
      syntax: null,
      example: `A student studying ${cap} applies foundational rules to analyze textbook cases and answer examination questions accurately.`,
      examQuestions: [
        { q: `Define ${cap} and outline its core significance in examinations.`, a: `${cap} is the systematic study of its core principles. It is essential because it forms the basis for structured exam questions and practical problem solving.` },
        { q: `List three major features of ${cap} and explain one practical application.`, a: `Features: 1. Structured principles. 2. Wide applicability. 3. Logical framework. Application: Solves real-world problems using domain rules.` }
      ]
    };
  },

  /* ---- 2b. Notes Summarizer Engine ---- */
  summarizeNotes(text) {
    // 1. Clean and separate prose lines vs code lines
    let cleanedText = text
      .replace(/\r\n/g, '\n')
      .replace(/([^\n])\s*(>>>|\bpython>|\bIn \[\d+\]:)\s*/g, '$1\n$2 ')
      .replace(/(>>>|\bpython>|\bIn \[\d+\]:)\s*/g, '\n>>> ');

    const rawLines = cleanedText.split('\n').map(l => l.trim()).filter(Boolean);
    const codeLines = [];
    const proseLines = [];

    const isCodeLine = line => /^>>>|^\s*(def\s|class\s|import\s|from\s|if\s|for\s|while\s|return\s|print\(|\w+\.\w+\(|\w+\[.*\]|\bValueError:|\bTypeError:|\bIndexError:|\bSyntaxError:|\b\w+\s*=\s*\[|^\s*[\{\[\(])/i.test(line);

    rawLines.forEach(line => {
      if (isCodeLine(line)) {
        codeLines.push(line);
      } else {
        proseLines.push(line);
      }
    });

    // 2. Extract clean sentences from prose lines
    const proseText = proseLines.join(' ');
    const rawSentences = proseText
      .split(/(?<=[.!?])\s+|(?<=\n)\s*/g)
      .map(s => s.trim())
      .filter(s => s.length > 15 && !isCodeLine(s));

    // Deduplicate while preserving order
    const sentences = Array.from(new Set(rawSentences));

    // 3. Score sentences by importance
    const scored = sentences.map(sentence => {
      let score = 0;
      const lower = sentence.toLowerCase();

      if (/define|definition|is called|known as|refers to|is defined as|means/.test(lower)) score += 6;
      if (/important|key|main|essential|fundamental|critical|primary|significant|vital|major/.test(lower)) score += 5;
      if (/therefore|thus|hence|as a result|consequently|because|due to|leads to|causes/.test(lower)) score += 3;
      if (/first|second|third|finally|lastly|in conclusion|in summary|types of|kinds of|classified/.test(lower)) score += 3;
      if (/always|never|must|should|required|necessary|rule|law|principle|formula/.test(lower)) score += 3;
      if (/example|for instance|such as|e\.g\.|like|including/.test(lower)) score += 2;
      if (/difference|unlike|whereas|compared to|distinction|on the other hand/.test(lower)) score += 2;
      if (sentence.length > 40 && sentence.length < 200) score += 1;
      if (/\d+/.test(sentence)) score += 1;

      return { sentence, score };
    });

    const sortedSentences = [...scored].sort((a, b) => b.score - a.score);
    const topCount = Math.min(6, Math.max(3, Math.ceil(sentences.length * 0.35)));
    const topSentences = sortedSentences.slice(0, topCount).map(s => s.sentence);

    // Short Summary
    let shortSummary = topSentences.slice(0, 2).join(' ');
    if (!shortSummary || shortSummary.length < 30) {
      shortSummary = sentences.slice(0, 2).join(' ') || (text.replace(/>>>/g, '').slice(0, 180) + '...');
    }

    // Quick Revision Points (distilled crisp 1-line takeaways)
    const quickRevisionPoints = sortedSentences.slice(0, Math.min(4, sortedSentences.length)).map(item => {
      let cleanStr = item.sentence.replace(/^[\d-•\s]+/, '');
      if (cleanStr.length > 110) cleanStr = cleanStr.substring(0, 107) + '...';
      return cleanStr;
    });

    // Key Points (detailed)
    const keyPoints = topSentences.length > 0 ? topSentences : (sentences.length > 0 ? sentences.slice(0, 4) : [text.slice(0, 100)]);

    // Clean Keywords
    const words = text.match(/\b[A-Z][a-z]{2,}\b|\b[a-z]{4,}\b/g) || [];
    const stopWords = /which|where|there|their|these|those|should|always|before|after|between|through|during|about|would|could|being|other|every|under|above|below|along|since|while|still|using|used|also|from|with|into|that|this|have|been|were|will|they|them|each|some|than|then|when|what|more|most|only|very|such|just|like|make|made|does|done|much|many|well|back|even|give|over|both|come|take|good|long|know|help|tell|call|find|here|look|want|first|last|next|came|seem|valueerror|typeerror|indexerror/;
    const freq = {};
    words.forEach(w => {
      const lower = w.toLowerCase();
      if (!stopWords.test(lower)) {
        freq[lower] = (freq[lower] || 0) + 1;
      }
    });
    const keywordEntries = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const keywords = keywordEntries.map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

    // "Remember This" callout content
    const ruleOrDef = scored.find(s => /rule|law|principle|formula|must|always|never|definition|refers to/.test(s.sentence.toLowerCase()));
    const rememberThis = ruleOrDef 
      ? ruleOrDef.sentence 
      : (sortedSentences[0] ? sortedSentences[0].sentence : 'Focus on foundational concepts and primary definitions during exam revision.');

    // Memory Tip / Mnemonics
    let memoryTip = 'Read key points aloud and test yourself using active recall.';
    if (keywords.length >= 3) {
      const mnemonicWords = keywords.slice(0, 5);
      const acronym = mnemonicWords.map(k => k.charAt(0).toUpperCase()).join('');
      memoryTip = `Mnemonic Hook: "${acronym}" → ${mnemonicWords.join(' • ')}. Associate each letter with its core concept for rapid exam recall.`;
    }

    // Exam Point
    const defSentence = scored.find(s => /define|definition|is called|known as|refers to|is defined as/.test(s.sentence.toLowerCase()));
    const examPoint = defSentence ? defSentence.sentence : (sortedSentences[0] ? sortedSentences[0].sentence : 'Focus on core definitions and standard syntax usage.');

    // Code Snippets formatted
    let formattedCodeBlock = null;
    if (codeLines.length > 0) {
      formattedCodeBlock = codeLines.map(l => l.replace(/^>>>\s*/, '')).join('\n');
    }

    // Revision Tips
    const lower = text.toLowerCase();
    const revisionTips = [];
    if (/definition|define|is called|known as/.test(lower)) {
      revisionTips.push('Memorize key definitions — examiners award direct marks for standard terminology.');
    }
    if (/difference|compare|unlike|whereas/.test(lower)) {
      revisionTips.push('Draw a structured comparison table for contrasting concepts.');
    }
    if (/formula|equation|calculate|compute|code|function|list|array/.test(lower)) {
      revisionTips.push('Practice writing syntax and formulas on paper without looking at reference notes.');
    }
    if (/example|for instance|such as|e\.g/.test(lower)) {
      revisionTips.push('Include at least one concrete example for every main concept in your answers.');
    }
    revisionTips.push('Self-test by writing down these key points from memory.');
    revisionTips.push('Revise these notes 24 hours before the exam for maximum long-term retention.');

    return {
      shortSummary,
      quickRevisionPoints: quickRevisionPoints.length > 0 ? quickRevisionPoints : [shortSummary],
      rememberThis,
      keyPoints,
      keywords: keywords.length > 0 ? keywords : ['Concept', 'Definition', 'Syntax', 'Example'],
      memoryTip,
      examPoint,
      formattedCodeBlock,
      revisionTips: revisionTips.slice(0, 5)
    };
  },

  /* ---- 2c. Quiz Generator Engine ---- */
  generateQuiz(topic) {
    const t = topic.trim().toLowerCase();

    const quizBank = {
      photosynthesis: [
        {
          q: 'Where does photosynthesis primarily take place in a plant cell?',
          options: ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Ribosomes'],
          answer: 1,
          explanation: 'Photosynthesis occurs in the chloroplasts, which contain the green pigment chlorophyll.',
        },
        {
          q: 'Which gas is produced as a byproduct of photosynthesis?',
          options: ['Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
          answer: 2,
          explanation: 'Oxygen (O₂) is released as a byproduct when water molecules are split during the light reactions.',
        },
        {
          q: 'What is the main energy source for photosynthesis?',
          options: ['Heat', 'Sunlight', 'Wind', 'Water'],
          answer: 1,
          explanation: 'Sunlight provides the energy that drives the light-dependent reactions of photosynthesis.',
        },
        {
          q: 'Which compound is the primary product of photosynthesis?',
          options: ['Starch', 'Protein', 'Glucose (C₆H₁₂O₆)', 'Lipids'],
          answer: 2,
          explanation: 'Glucose is the primary carbohydrate product, used as energy by the plant or stored as starch.',
        },
        {
          q: 'What does the Calvin Cycle produce?',
          options: ['ATP only', 'Oxygen', 'Glucose precursors (G3P)', 'Water'],
          answer: 2,
          explanation: 'The Calvin Cycle (light-independent reactions) uses CO₂ and ATP to produce G3P, which is used to make glucose.',
        },
      ],
      'machine learning': [
        {
          q: 'Which type of machine learning uses labeled training data?',
          options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Deep Learning'],
          answer: 2,
          explanation: 'Supervised Learning trains a model on labeled data, where the correct output is provided for each input.',
        },
        {
          q: 'What is overfitting in machine learning?',
          options: [
            'Model performs well on both training and test data',
            'Model memorizes training data and performs poorly on new data',
            'Model is too simple to capture patterns',
            'Model trains too slowly',
          ],
          answer: 1,
          explanation: 'Overfitting occurs when a model learns the training data too well, including noise, and fails to generalize to new data.',
        },
        {
          q: 'Which algorithm is commonly used for classification tasks?',
          options: ['K-Means Clustering', 'Principal Component Analysis', 'Decision Tree', 'Linear Regression'],
          answer: 2,
          explanation: 'Decision Trees are widely used for classification by splitting data based on feature values at each node.',
        },
        {
          q: 'What does the term "epoch" mean in machine learning?',
          options: [
            'A single training example',
            'One complete pass through the entire training dataset',
            'A type of neural network layer',
            'The learning rate value',
          ],
          answer: 1,
          explanation: 'An epoch represents one full pass over the entire training dataset during the training process.',
        },
        {
          q: 'What is the purpose of a training-test split?',
          options: [
            'To make the model train faster',
            'To reduce the dataset size',
            'To evaluate model performance on unseen data',
            'To increase the number of features',
          ],
          answer: 2,
          explanation: 'The test set contains data the model has never seen, allowing an unbiased evaluation of its performance.',
        },
      ],
      programming: [
        {
          q: 'What does OOP stand for in programming?',
          options: ['Open-Ordered Programming', 'Object-Oriented Programming', 'Operator-Only Process', 'Output-Oriented Program'],
          answer: 1,
          explanation: 'OOP is a programming paradigm based on objects that combine data (attributes) and behavior (methods).',
        },
        {
          q: 'Which data structure operates on a LIFO (Last In, First Out) basis?',
          options: ['Queue', 'Array', 'Stack', 'Linked List'],
          answer: 2,
          explanation: 'A Stack uses LIFO — the last element pushed is the first one popped, like a stack of plates.',
        },
        {
          q: 'What is the time complexity of Binary Search?',
          options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
          answer: 2,
          explanation: 'Binary Search has O(log n) complexity because it halves the search space with each comparison.',
        },
        {
          q: 'Which keyword is used to define a function in Python?',
          options: ['function', 'define', 'def', 'fun'],
          answer: 2,
          explanation: 'In Python, the "def" keyword is used to define a function, followed by the function name and parentheses.',
        },
        {
          q: 'What is Git primarily used for?',
          options: ['Running programs', 'Managing databases', 'Version control and collaboration', 'Web hosting'],
          answer: 2,
          explanation: 'Git is a distributed version control system that tracks changes in source code during software development.',
        },
      ],
      'periodic table': [
        {
          q: 'Who created the modern Periodic Table?',
          options: ['Albert Einstein', 'Marie Curie', 'Dmitri Mendeleev', 'John Dalton'],
          answer: 2,
          explanation: 'Dmitri Mendeleev created the Periodic Table in 1869, arranging elements by atomic mass and grouping similar properties.',
        },
        {
          q: 'How many groups (columns) are in the modern Periodic Table?',
          options: ['7', '14', '18', '10'],
          answer: 2,
          explanation: 'The modern Periodic Table has 18 groups (vertical columns), each containing elements with similar electron configurations.',
        },
        {
          q: 'What determines an element\'s position in the Periodic Table?',
          options: ['Atomic mass', 'Atomic number', 'Number of neutrons', 'Melting point'],
          answer: 1,
          explanation: 'Elements are arranged by increasing atomic number (number of protons), not atomic mass.',
        },
        {
          q: 'Elements in the same group of the Periodic Table share:',
          options: ['Same atomic mass', 'Same number of neutrons', 'Same number of valence electrons', 'Same melting point'],
          answer: 2,
          explanation: 'Elements in the same group have the same number of valence electrons, giving them similar chemical properties.',
        },
        {
          q: 'Which block of the Periodic Table contains the transition metals?',
          options: ['s-block', 'p-block', 'd-block', 'f-block'],
          answer: 2,
          explanation: 'Transition metals are in the d-block (Groups 3-12), characterized by their partially filled d-electron orbitals.',
        },
      ],
      calculus: [
        {
          q: 'What does the derivative of a function represent?',
          options: ['Area under the curve', 'Instantaneous rate of change', 'Average value', 'The y-intercept'],
          answer: 1,
          explanation: 'The derivative represents the instantaneous rate of change of a function at any given point.',
        },
        {
          q: 'What is the derivative of f(x) = x³?',
          options: ['x²', '3x²', '3x', 'x⁴/4'],
          answer: 1,
          explanation: 'Using the Power Rule: d/dx(xⁿ) = nxⁿ⁻¹. So d/dx(x³) = 3x².',
        },
        {
          q: 'What does an integral represent geometrically?',
          options: ['The slope of the tangent line', 'The maximum value', 'The area under a curve', 'The average rate of change'],
          answer: 2,
          explanation: 'A definite integral represents the area between a function and the x-axis over a given interval.',
        },
        {
          q: 'The Fundamental Theorem of Calculus connects which two operations?',
          options: ['Addition and Subtraction', 'Differentiation and Integration', 'Multiplication and Division', 'Limits and Sequences'],
          answer: 1,
          explanation: 'The FTC states that differentiation and integration are inverse operations of each other.',
        },
        {
          q: 'Which rule is used to differentiate a product of two functions?',
          options: ['Chain Rule', 'Power Rule', 'Product Rule', 'Quotient Rule'],
          answer: 2,
          explanation: 'The Product Rule: d/dx[u·v] = u·v\' + v·u\', used when differentiating two functions multiplied together.',
        },
      ],
      economics: [
        {
          q: 'What does GDP stand for?',
          options: ['General Domestic Price', 'Gross Domestic Product', 'Government Data Plan', 'Global Distribution Pattern'],
          answer: 1,
          explanation: 'GDP (Gross Domestic Product) measures the total monetary value of all goods and services produced in a country.',
        },
        {
          q: 'What happens to quantity demanded when price increases (normal goods)?',
          options: ['Increases', 'Stays the same', 'Decreases', 'Doubles'],
          answer: 2,
          explanation: 'The Law of Demand states: as price rises, quantity demanded falls, all else being equal (inverse relationship).',
        },
        {
          q: 'What is opportunity cost?',
          options: [
            'The total cost of production',
            'The value of the next best alternative forgone',
            'Government taxes on goods',
            'The market price of a good',
          ],
          answer: 1,
          explanation: 'Opportunity cost is the value of what you give up when you choose one option over the next best alternative.',
        },
        {
          q: 'Inflation is best described as:',
          options: [
            'A decrease in government spending',
            'A fall in interest rates',
            'A sustained rise in the general price level',
            'An increase in GDP',
          ],
          answer: 2,
          explanation: 'Inflation is a persistent increase in the average price level of goods and services in an economy over time.',
        },
        {
          q: 'Fiscal policy involves:',
          options: [
            'Setting interest rates by the central bank',
            'Government spending and taxation decisions',
            'Trade agreements between countries',
            'Corporate profit strategies',
          ],
          answer: 1,
          explanation: 'Fiscal policy refers to government decisions about taxation and spending to influence the economy.',
        },
      ],
    };

    // Support text/notes input directly in quiz generator
    if (topic.length > 50 || topic.includes('\n') || (topic.match(/\./g) || []).length >= 2) {
      const sentences = topic.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
      if (sentences.length >= 3) {
        return this.generateNotesBasedQuiz(sentences);
      }
    }

    // Check quiz bank for matching topic
    for (const [key, questions] of Object.entries(quizBank)) {
      if (t.includes(key)) {
        return questions;
      }
    }

    // Generate textbook-style objective MCQs
    return this.generateGenericQuiz(topic.trim());
  },

  /**
   * Generate quiz questions from user-provided notes text.
   * Extracts factual statements and creates fill-in-the-blank style MCQs.
   */
  generateNotesBasedQuiz(sentences) {
    const questions = [];
    const usedSentences = sentences.slice(0, 7);

    usedSentences.forEach((sentence, i) => {
      const s = sentence.trim();
      if (s.length < 25) return;

      // Extract key terms from the sentence
      const words = s.split(/\s+/).filter(w => w.length > 3);
      const stopWords = /which|where|there|their|these|those|should|always|before|after|between|through|during|about|would|could|being|other|every|under|above|below|have|been|were|will|they|them|each|some|than|then|when|what|more|most|only|very|such|just|like|make|made|does|done|much|many|from|with|into|that|this|also|used|using/;
      const keyTerms = words.filter(w => !stopWords.test(w.toLowerCase()) && w.length > 4);

      if (keyTerms.length >= 2) {
        const keyTerm = keyTerms[0];
        const correctOption = s.length > 80 ? s.substring(0, 77) + '...' : s;
        const wrongOptions = [
          `${keyTerm} is not related to this topic`,
          `${keyTerm} has the opposite effect of what is described`,
          `${keyTerm} is only a theoretical concept with no practical use`
        ];

        // Deterministic placement: correct answer position based on question index
        const correctPos = i % 4;
        const options = [...wrongOptions];
        options.splice(correctPos, 0, correctOption);

        questions.push({
          q: `Based on the notes, which statement about "${keyTerm}" is correct?`,
          options: options.slice(0, 4),
          answer: correctPos,
          explanation: `As stated in your notes: "${s}"`
        });
      } else {
        // True/false style as MCQ
        questions.push({
          q: `According to your notes, is the following statement true?\n"${s.length > 90 ? s.substring(0, 87) + '...' : s}"`,
          options: ['True, as stated in the notes', 'False, the opposite is true', 'Partially true, but incomplete', 'Not mentioned in the notes'],
          answer: 0,
          explanation: `This statement is directly from your notes: "${s}"`
        });
      }
    });

    return questions.slice(0, 5);
  },

  generateGenericQuiz(topic) {
    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
    const lower = topic.toLowerCase();

    // Domain detection regexes
    const isLit = /literature|poem|poetry|novel|drama|play|shakespear|metaphor|character|prose|fiction|theme|narrative|author|literary|sonnet|gothic|romanticism|rhetoric|allegory/.test(lower);
    const isHist = /history|historical|war|revolution|empire|century|king|queen|reign|dynasty|battle|treaty|civilization|colonial|independence|movement|ancient|medieval|world war|renaissance/.test(lower);
    const isGeo = /geography|climate|map|river|mountain|tectonic|earth|ocean|continent|population|atmosphere|soil|biomes|latitude|longitude|ecosystem|glacier|volcano|weather|topography/.test(lower);
    const isPol = /politic|constitution|democracy|government|parliament|judiciary|rights|state|election|governance|citizenship|policy|legislature|sovereign|liberty|justice|monarchy/.test(lower);
    const isEcon = /economic|microeconomic|macroeconomic|market|gdp|inflation|elasticity|monopoly|demand|supply|fiscal|monetary|currency|trade|banking|revenue|utility|capitalism/.test(lower);
    const isComm = /commerce|account|finance|business|audit|ledger|balance sheet|taxation|debit|credit|marketing|management|asset|liability|stock|capital|entrepreneur|invoice/.test(lower);
    const isLang = /language|grammar|linguistic|phonetics|syntax|tenses|noun|verb|adjective|translation|semantics|vocabulary|idiom|phrase|punctuation|preposition/.test(lower);
    const isArt = /art|painting|music|sculpture|architecture|design|dance|theatre|aesthetic|baroque|impressionism|composition|harmony|melody|rhythm|canvas|artistic/.test(lower);
    const isCS = /code|program|python|java|c\+\+|c#|js|javascript|sql|api|web|script|html|css|php|ruby|swift|kotlin|rust|go|typescript|database|algorithm|network|cyber|software|ai|machine learning|data structure/.test(lower);
    const isMath = /math|calculus|algebra|geometry|trigonometry|matrix|vector|derivative|integral|probability|statistics|equation|theorem|function|arithmetic|number theory|logarithm/.test(lower);
    const isBio = /biology|cell|genetics|dna|rna|organism|botany|zoology|anatomy|physiology|ecosystem|evolution|enzyme|protein|microbiology|photosynthesis|mitosis|meiosis|neuron/.test(lower);
    const isChem = /chemistry|acid|base|reaction|element|compound|molecule|periodic table|stoichiometry|organic|inorganic|bond|thermodynamics|atom|solution|catalyst|oxidation/.test(lower);
    const isPhys = /physics|force|motion|energy|velocity|gravity|mass|momentum|wave|optics|electric|magnetic|thermodynamics|quantum|relativity|kinematics|friction|photon/.test(lower);
    const isPsych = /psychology|sociology|philosophy|behavior|cognition|mind|brain|perception|personality|society|ethics|logic|moral|existential|consciousness|empathy/.test(lower);

    if (isLit) {
      return [
        {
          q: `[Easy] What is the central focus when studying ${cap} in literary studies?`,
          options: [
            `Analyzing narrative structure, thematic motifs, and stylistic choices`,
            `Calculating numerical chemical reaction speeds`,
            `Designing digital database schemas`,
            `Measuring geographic atmospheric pressure`
          ],
          answer: 0,
          explanation: `In literature, studying ${cap} focuses on analyzing how narrative devices, themes, and stylistic expressions convey human meaning.`
        },
        {
          q: `[Easy] Which literary component is most closely associated with ${cap}?`,
          options: [
            `Electromagnetic wave spectrum`,
            `Metaphor, symbolism, and character development`,
            `Double-entry debit and credit records`,
            `Gross Domestic Product calculation`
          ],
          answer: 1,
          explanation: `Literary topics involve figurative language such as metaphors, symbolism, imagery, and character arcs.`
        },
        {
          q: `[Medium] How do scholars differentiate structural genres within ${cap}?`,
          options: [
            `By counting physical molecular weights`,
            `By evaluating form (e.g., Prose vs. Poetry vs. Drama) and stylistic meter`,
            `By measuring electrical resistance in Ohms`,
            `By running automated unit test suites`
          ],
          answer: 1,
          explanation: `Literary genres are categorized by structural form (prose, verse, drama) and stylistic features like rhyme and meter.`
        },
        {
          q: `[Medium] In a critical essay on ${cap}, what role does historical context play?`,
          options: [
            `It determines binary byte storage capacity`,
            `It provides socio-cultural background that shapes author perspective and textual meaning`,
            `It replaces the need for close textual reading`,
            `It calculates the financial interest rate of publication`
          ],
          answer: 1,
          explanation: `Historical context explains the cultural, political, and social environment influencing an author's literary work.`
        },
        {
          q: `[Hard] Which analytical approach offers the deepest interpretation of underlying symbolism in ${cap}?`,
          options: [
            `Ignoring figurative devices to focus only on word counts`,
            `Deconstructing thematic motifs and cross-referencing contextual imagery`,
            `Converting paragraphs into mathematical equations`,
            `Memorizing chapter titles without reading the text`
          ],
          answer: 1,
          explanation: `Deep literary analysis requires deconstructing recurrent motifs and analyzing how symbolic imagery reinforces the work's central theme.`
        }
      ];
    }

    if (isHist) {
      return [
        {
          q: `[Easy] What is the primary objective of examining ${cap} in historical studies?`,
          options: [
            `Understanding past causes, key events, human actors, and societal consequences`,
            `Synthesizing artificial organic chemical polymers`,
            `Solving quadratic algebraic equations`,
            `Writing computer source code compilers`
          ],
          answer: 0,
          explanation: `Historical inquiry analyzes key events, their underlying causes, key historical figures, and long-term societal impacts.`
        },
        {
          q: `[Easy] Which type of evidence is considered a primary historical source for ${cap}?`,
          options: [
            `Eyewitness diaries, official treaties, and contemporary photographs`,
            `Modern textbook chapter summaries written decades later`,
            `Fictional movies produced in the 21st century`,
            `Automated statistical software algorithms`
          ],
          answer: 0,
          explanation: `Primary sources are original first-hand records created during the time period under study (e.g., diaries, original treaties).`
        },
        {
          q: `[Medium] How did ${cap} influence socio-political institutional developments?`,
          options: [
            `By altering Earth's magnetic dipole orientation`,
            `By shifting power balances, inspiring legislative reform, or changing state governance`,
            `By changing the atomic structure of noble gases`,
            `By increasing CPU processor clock speed`
          ],
          answer: 1,
          explanation: `Major historical events like ${cap} lead to constitutional shifts, political reform, or geopolitical restructuring.`
        },
        {
          q: `[Medium] What is a major challenge historians encounter when analyzing records of ${cap}?`,
          options: [
            `Evaluating potential author bias, propaganda, or incomplete archives`,
            `Running out of digital storage on hard drives`,
            `Calculating gravitational acceleration constants`,
            `Translating text into programming bytecodes`
          ],
          answer: 0,
          explanation: `Historiography requires critically evaluating potential bias, political propaganda, and missing archival records.`
        },
        {
          q: `[Hard] When evaluating long-term consequences of ${cap}, which perspective provides the most objective analysis?`,
          options: [
            `Focusing solely on immediate 24-hour battle outcomes`,
            `Comparing multiple primary sources and weighing diplomatic, economic, and social impacts over generations`,
            `Assuming historical accounts are 100% objective without verification`,
            `Relying on a single political leader's speech`
          ],
          answer: 1,
          explanation: `Comprehensive historical synthesis cross-references multiple primary sources and measures multi-generational socio-economic impacts.`
        }
      ];
    }

    if (isGeo) {
      return [
        {
          q: `[Easy] What does spatial geography examine regarding ${cap}?`,
          options: [
            `The physical distribution of Earth features, natural processes, and human settlements`,
            `Writing abstract object-oriented code classes`,
            `Balancing corporate accounting ledger sheets`,
            `Analyzing poetic rhyme schemes`
          ],
          answer: 0,
          explanation: `Geography studies how physical phenomena, landforms, ecosystems, and human activities are spatially distributed across Earth.`
        },
        {
          q: `[Easy] Which of Earth's major systems interacts directly with ${cap}?`,
          options: [
            `Software source code repositories`,
            `Atmosphere, hydrosphere, lithosphere, or biosphere`,
            `Financial stock market exchanges`,
            `Grammatical sentence subjects and verbs`
          ],
          answer: 1,
          explanation: `Geographic processes involve interactions among Earth's physical spheres: atmosphere, hydrosphere, lithosphere, and biosphere.`
        },
        {
          q: `[Medium] How do geographers utilize map scale when studying ${cap}?`,
          options: [
            `To determine the ratio between map distance and real-world ground distance`,
            `To calculate corporate income tax percentages`,
            `To measure computer RAM memory usage`,
            `To identify literary character motivations`
          ],
          answer: 0,
          explanation: `Map scale expresses the quantitative relationship between distance on a map and actual distance on Earth's surface.`
        },
        {
          q: `[Medium] What is the key difference between Physical and Human Geography in the context of ${cap}?`,
          options: [
            `Physical studies natural landform processes; Human studies spatial population and cultural dynamics`,
            `Physical uses numbers; Human only uses words`,
            `Physical is only about oceans; Human is only about space`,
            `There is no difference between them`
          ],
          answer: 0,
          explanation: `Physical geography deals with natural environmental systems, whereas human geography investigates human activities and spatial organizations.`
        },
        {
          q: `[Hard] How does climate change or tectonic activity exacerbate environmental challenges related to ${cap}?`,
          options: [
            `By modifying weather patterns, altering soil erosion rates, and shifting vulnerable biome boundaries`,
            `By changing the rules of English syntax`,
            `By increasing accounting debit balances`,
            `By slowing down web browser page loads`
          ],
          answer: 0,
          explanation: `Macro-environmental changes shift ecological equilibrium, triggering cascading impacts on climate zones, natural hazards, and biodiversity.`
        }
      ];
    }

    if (isPol || isLaw) {
      return [
        {
          q: `[Easy] What is the primary role of ${cap} in political science and governance?`,
          options: [
            `Regulating state authority, protecting citizen rights, and structuring public policy`,
            `Synthesizing chemical compounds in a laboratory`,
            `Calculating speed and acceleration of objects`,
            `Creating digital 3D game graphics`
          ],
          answer: 0,
          explanation: `Political and legal principles establish the framework for state power, constitutional rights, and public administration.`
        },
        {
          q: `[Easy] Which organ of government is responsible for interpreting laws related to ${cap}?`,
          options: [
            `The Judiciary / Constitutional Courts`,
            `The Executive Branch`,
            `The Police Department`,
            `Commercial Banks`
          ],
          answer: 0,
          explanation: `The Judiciary interprets statutory laws, protects constitutional rights, and resolves legal disputes.`
        },
        {
          q: `[Medium] How does the system of Checks and Balances safeguard against authoritarian abuse in ${cap}?`,
          options: [
            `By allowing one branch to hold absolute unchecked power`,
            `By dividing state authority among independent Executive, Legislative, and Judicial branches`,
            `By eliminating elections entirely`,
            `By delegating governance to private corporations`
          ],
          answer: 1,
          explanation: `Checks and balances divide authority so that no single government branch can exercise unrestricted state power.`
        },
        {
          q: `[Medium] What distinguishes Fundamental Constitutional Rights from ordinary statutory laws regarding ${cap}?`,
          options: [
            `Fundamental Rights are constitutionally guaranteed and judicial remedies exist if violated`,
            `Statutory laws cannot be changed by parliament`,
            `Fundamental Rights only apply during wartime`,
            `Statutory laws are unwritten oral agreements`
          ],
          answer: 0,
          explanation: `Fundamental Rights are supreme constitutional guarantees that override conflicting statutory legislation.`
        },
        {
          q: `[Hard] Which theoretical doctrine best justifies judicial review over legislative acts concerning ${cap}?`,
          options: [
            `The Rule of Law and Constitutional Supremacy`,
            `Absolute Monarchical Privilege`,
            `Laissez-faire Economic Anarchy`,
            `Military Dictatorship`
          ],
          answer: 0,
          explanation: `Judicial review is grounded in Constitutional Supremacy — any legislative act violating the constitution is legally void.`
        }
      ];
    }

    if (isEcon || isComm) {
      return [
        {
          q: `[Easy] What is the core economic principle behind ${cap}?`,
          options: [
            `Allocating scarce resources to satisfy unlimited human needs and market demand`,
            `Writing poetic verses in iambic pentameter`,
            `Splitting atomic nuclei to generate radiation`,
            `Calculating geological plate movement speed`
          ],
          answer: 0,
          explanation: `Economics centers on how individuals, firms, and governments make choices under resource scarcity.`
        },
        {
          q: `[Easy] In market economics, what happens when demand for ${cap} exceeds supply?`,
          options: [
            `Market price tends to rise until equilibrium is reached`,
            `Market price immediately drops to zero`,
            `Production stops permanently`,
            `The central bank shuts down`
          ],
          answer: 0,
          explanation: `When demand exceeds supply (shortage), competition among buyers drives the market price upwards toward equilibrium.`
        },
        {
          q: `[Medium] What is Opportunity Cost in relation to decisions involving ${cap}?`,
          options: [
            `The total cash spent on a purchase`,
            `The value of the next best alternative option forgone when making a choice`,
            `The tax rate imposed by the government`,
            `The shipping cost of raw materials`
          ],
          answer: 1,
          explanation: `Opportunity cost measures the sacrificed benefits of the next best alternative given up when selecting a course of action.`
        },
        {
          q: `[Medium] How does Monetary Policy differ from Fiscal Policy regarding economic management of ${cap}?`,
          options: [
            `Monetary policy controls interest rates/money supply; Fiscal policy uses government taxation and spending`,
            `Monetary is run by private stores; Fiscal is run by schools`,
            `Monetary is only about gold; Fiscal is only about food`,
            `They are identical terms for government budgets`
          ],
          answer: 0,
          explanation: `Monetary policy is managed by central banks through interest rates; Fiscal policy is set by government tax and spending budgets.`
        },
        {
          q: `[Hard] In corporate finance and accounting, why must the fundamental balance sheet equation always balance for ${cap}?`,
          options: [
            `Because every corporate asset must be financed either through owner's equity or creditor liabilities`,
            `Because banks manually round numbers up`,
            `Because tax laws forbid storing current assets`,
            `Because total profit must always equal total debt`
          ],
          answer: 0,
          explanation: `The equation Assets = Liabilities + Equity must balance because every asset possessed by a firm is claimed either by creditors or equity owners.`
        }
      ];
    }

    if (isCS || isCode) {
      return [
        {
          q: `[Easy] What is the primary purpose of ${cap} in computer science?`,
          options: [
            `Designing logic, algorithms, or software architectures to solve computational tasks`,
            `Painting physical canvas portraits`,
            `Analyzing ancient historical treaties`,
            `Calculating plant transpiration rates`
          ],
          answer: 0,
          explanation: `Computer science concepts like ${cap} provide algorithms, data structures, and code logic to automate computational problem solving.`
        },
        {
          q: `[Easy] Which time complexity represents the most efficient search algorithm on a sorted list?`,
          options: [
            `O(n²) Quadratic Time`,
            `O(log n) Logarithmic Time (Binary Search)`,
            `O(n!) Factorial Time`,
            `O(2ⁿ) Exponential Time`
          ],
          answer: 1,
          explanation: `Logarithmic time O(log n) is significantly faster than linear O(n) or quadratic O(n²) time for large input datasets.`
        },
        {
          q: `[Medium] What is the main distinction between a Compiler and an Interpreter in ${cap}?`,
          options: [
            `Compiler translates entire source code before execution; Interpreter executes line by line at runtime`,
            `Compiler is a hardware chip; Interpreter is a computer monitor`,
            `Compiler only works on mobile phones; Interpreter only works on servers`,
            `Compiler deletes source code; Interpreter saves source code`
          ],
          answer: 0,
          explanation: `Compilers convert full source code to machine binary prior to execution, whereas interpreters parse and run code dynamically line by line.`
        },
        {
          q: `[Medium] In Object-Oriented Programming (OOP), what does Encapsulation accomplish?`,
          options: [
            `Bundling internal state data and methods together while restricting direct external access`,
            `Allowing any function to modify global variables freely`,
            `Converting text into high-resolution images`,
            `Formatting SQL database queries`
          ],
          answer: 0,
          explanation: `Encapsulation protects object data integrity by exposing controlled public methods while hiding internal private properties.`
        },
        {
          q: `[Hard] Which data structure provides O(1) average time complexity for key-value search operations?`,
          options: [
            `Singly Linked List`,
            `Hash Table / Dictionary`,
            `Unsorted Array`,
            `Binary Tree without balancing`
          ],
          answer: 1,
          explanation: `Hash Tables utilize a hashing function to map key strings to array buckets, achieving O(1) average lookup speed.`
        }
      ];
    }

    if (isMath) {
      return [
        {
          q: `[Easy] What is the fundamental objective of ${cap} in mathematics?`,
          options: [
            `Formulating exact mathematical equations, proofs, and quantitative relationships`,
            `Analyzing poetic imagery and metaphor`,
            `Writing commercial advertising copy`,
            `Studying historical political elections`
          ],
          answer: 0,
          explanation: `Mathematics uses rigorous logical axioms, symbolic equations, and quantitative proofs to model functional relationships.`
        },
        {
          q: `[Easy] What does the derivative of a function f(x) represent geometrically in ${cap}?`,
          options: [
            `The instantaneous rate of change or tangent slope of the curve`,
            `The perimeter of a circle`,
            `The volume of a 3D sphere`,
            `The y-intercept value when x = 100`
          ],
          answer: 0,
          explanation: `The first derivative f'(x) measures the instantaneous rate of change or slope of the tangent line at any point x.`
        },
        {
          q: `[Medium] What does a definite integral compute between bounds [a, b]?`,
          options: [
            `The exact net area bounded between the function curve f(x) and the x-axis`,
            `The product of two random variables`,
            `The square root of negative numbers`,
            `The standard deviation of a sample`
          ],
          answer: 0,
          explanation: `A definite integral evaluates the accumulated area under a continuous function curve over the interval [a, b].`
        },
        {
          q: `[Medium] The Fundamental Theorem of Calculus establishes that:`,
          options: [
            `Differentiation and Integration are inverse mathematical operations`,
            `Addition and Division are identical operations`,
            `Derivatives can never equal zero`,
            `Integrals only apply to linear equations`
          ],
          answer: 0,
          explanation: `The FTC proves that taking the derivative of an integral yields the original continuous function.`
        },
        {
          q: `[Hard] How do you identify local maxima or minima (extrema) of a differentiable function f(x)?`,
          options: [
            `Set f'(x) = 0 to find critical points, then use f''(x) (> 0 for minimum, < 0 for maximum)`,
            `Multiply f(x) by x and set to 1`,
            `Guess values by plugging in 1, 2, 3`,
            `Local extrema cannot be calculated mathematically`
          ],
          answer: 0,
          explanation: `Critical points occur where f'(x) = 0. The second derivative test classifies critical points: f''(x) > 0 is local min, f''(x) < 0 is local max.`
        }
      ];
    }

    // Default versatile quiz across all other topics
    return [
      {
        q: `[Easy] What is the core definition and primary scope of ${cap}?`,
        options: [
          `The systematic study and practical application of principles related to ${cap}`,
          `A musical performance technique used in classical opera`,
          `A chemical purification method for liquid solvents`,
          `An athletic workout routine for cardiovascular fitness`
        ],
        answer: 0,
        explanation: `${cap} involves studying core concepts, definitions, and domain methodologies.`
      },
      {
        q: `[Easy] Which feature is essential when studying ${cap} for academic exams?`,
        options: [
          `Following a structured approach based on established principles and definitions`,
          `Memorizing random numbers without understanding context`,
          `Ignoring textbook definitions entirely`,
          `Studying only 5 minutes before the exam`
        ],
        answer: 0,
        explanation: `Academic success in ${cap} requires grasping core definitions and understanding structured principles.`
      },
      {
        q: `[Medium] How is knowledge in ${cap} typically categorized for systematic study?`,
        options: [
          `Into Theoretical (concept-based) and Applied (practical/scenario-based) domains`,
          `Into Fast and Slow subjects`,
          `Into Heavy and Light subjects`,
          `It cannot be categorized`
        ],
        answer: 0,
        explanation: `Most subjects are divided into theoretical fundamentals and applied practical problem-solving.`
      },
      {
        q: `[Medium] What is one key advantage of mastering ${cap}?`,
        options: [
          `It builds domain analytical skills and problem-solving capabilities`,
          `It guarantees instant perfection without practice`,
          `It eliminates the need for any future learning`,
          `It is completely isolated from real-world applications`
        ],
        answer: 0,
        explanation: `Mastering ${cap} enhances critical analytical reasoning and practical problem-solving skills.`
      },
      {
        q: `[Hard] When answering complex examination questions on ${cap}, what strategy yields maximum marks?`,
        options: [
          `Stating a clear definition, listing key structured points, and providing a relevant concrete example`,
          `Writing one long unstructured paragraph without punctuation`,
          `Leaving the answer sheet blank`,
          `Copying the question text repeatedly`
        ],
        answer: 0,
        explanation: `Exam markers look for structured answers containing crisp definitions, key bullet points, and real-world examples.`
      }
    ];
  },

  /* ---- 2d. Study Planner Engine ---- */
  generateStudyPlan(subjects) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const plan = [];
    const totalCapacity = subjects.reduce((sum, s) => sum + parseFloat(s.dailyHours), 0);

    // Get max exam date
    let maxExamDate = new Date(today);
    subjects.forEach(subj => {
      const d = new Date(subj.examDate);
      d.setHours(0, 0, 0, 0);
      if (d > maxExamDate) {
        maxExamDate = d;
      }
    });

    const currentDate = new Date(today);
    while (currentDate <= maxExamDate) {
      // Find subjects whose exam is on currentDate
      const examSubjects = subjects.filter(s => {
        const d = new Date(s.examDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === currentDate.getTime();
      });

      // Find active subjects whose exam is in the future
      const activeSubjects = subjects.filter(s => {
        const d = new Date(s.examDate);
        d.setHours(0, 0, 0, 0);
        return currentDate < d;
      });

      const sessions = [];

      // 1. Add exam markers for today
      examSubjects.forEach(s => {
        const colorClass = SUBJECT_COLORS[subjects.indexOf(s) % SUBJECT_COLORS.length];
        sessions.push({
          subject: s.name,
          priority: s.priority || 'medium',
          hours: 0,
          colorClass,
          daysLeft: 0,
          sessionType: 'exam',
          sessionLabel: '🎯 Exam Day'
        });
      });

      // 2. Distribute total daily capacity among active subjects based on Priority Weight + Urgency
      if (activeSubjects.length > 0) {
        let totalWeight = 0;
        const weights = activeSubjects.map(s => {
          const examD = new Date(s.examDate);
          examD.setHours(0, 0, 0, 0);
          const daysLeft = Math.max(1, Math.ceil((examD - currentDate) / (1000 * 60 * 60 * 24)));
          
          // Priority Multiplier: High = 2.0, Medium = 1.2, Low = 0.8
          const priority = (s.priority || 'medium').toLowerCase();
          const priorityMult = priority === 'high' ? 2.0 : (priority === 'low' ? 0.8 : 1.2);
          
          // Urgency Weight: Inverse distance to exam
          const urgencyWeight = 1 / Math.pow(daysLeft, 1.4);
          
          // Combined Weight: Priority * Base Daily Hours * Urgency
          const weight = priorityMult * parseFloat(s.dailyHours) * urgencyWeight;
          totalWeight += weight;
          return { subject: s, weight, daysLeft, priority };
        });

        // Allocate hours proportionally
        const rawAllocations = weights.map(item => {
          const rawHours = totalCapacity * (item.weight / totalWeight);
          const hours = Math.round(rawHours * 2) / 2;
          return {
            subject: item.subject,
            priority: item.priority,
            hours,
            daysLeft: item.daysLeft
          };
        });

        // Ensure allocated hours if totalCapacity > 0
        const sumAllocated = rawAllocations.reduce((sum, item) => sum + item.hours, 0);
        if (sumAllocated === 0 && totalCapacity > 0) {
          let maxIdx = 0;
          let maxW = -1;
          weights.forEach((w, idx) => {
            if (w.weight > maxW) {
              maxW = w.weight;
              maxIdx = idx;
            }
          });
          rawAllocations[maxIdx].hours = Math.round(totalCapacity * 2) / 2;
        }

        // Assign intelligent session types
        rawAllocations.forEach(item => {
          if (item.hours > 0) {
            const colorClass = SUBJECT_COLORS[subjects.indexOf(item.subject) % SUBJECT_COLORS.length];
            
            // Session Type Logic
            let sessionType = 'study';
            let sessionLabel = '📖 Core Study';

            if (item.daysLeft === 1) {
              sessionType = 'final-revision';
              sessionLabel = '⭐ Final Exam Revision';
            } else if (item.daysLeft <= 3) {
              sessionType = 'revision';
              sessionLabel = '🔄 Intensive Revision';
            } else if (item.daysLeft % 3 === 0) {
              sessionType = 'practice';
              sessionLabel = '✍️ Practice & Self-Test';
            } else if (item.daysLeft % 5 === 0) {
              sessionType = 'revision';
              sessionLabel = '🔄 Topic Review';
            }

            sessions.push({
              subject: item.subject.name,
              priority: item.priority,
              hours: item.hours,
              colorClass,
              daysLeft: item.daysLeft,
              sessionType,
              sessionLabel
            });
          }
        });

        // Insert Short Break indicator if study hours >= 3.0
        const totalDailyStudyHrs = sessions.filter(s => s.sessionType !== 'exam').reduce((sum, s) => sum + s.hours, 0);
        if (totalDailyStudyHrs >= 3.0) {
          sessions.push({
            subject: 'Rest & Recharge',
            priority: 'low',
            hours: 0.5,
            colorClass: 'color-0',
            daysLeft: 0,
            sessionType: 'break',
            sessionLabel: '☕ 15-30m Short Break'
          });
        }
      }

      if (sessions.length > 0) {
        plan.push({
          date: new Date(currentDate),
          sessions: sessions
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return plan;
  },

  /* ---- 2e. Flashcard Generator Engine ---- */
  generateFlashcards(topic) {
    const t = topic.trim().toLowerCase();

    const flashcardBank = {
      photosynthesis: [
        { tag: 'DEFINITION', q: 'What is photosynthesis?', a: 'The biochemical process by which green plants, algae, and some bacteria convert light energy, carbon dioxide (CO₂), and water (H₂O) into glucose (C₆H₁₂O₆) and oxygen (O₂).' },
        { tag: 'KEY CONCEPT', q: 'What are the two main stages of photosynthesis and where do they occur?', a: '1. Light-dependent reactions (in Thylakoid membranes): split H₂O and release O₂.\n2. Calvin Cycle / Light-independent reactions (in Stroma): fix CO₂ to synthesize glucose.' },
        { tag: 'DIFFERENCE', q: 'How do Light Reactions differ from the Calvin Cycle?', a: 'Light reactions require direct sunlight to generate ATP and NADPH, releasing O₂. The Calvin Cycle does not require light directly and uses ATP/NADPH to build carbohydrates from CO₂.' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is the balanced chemical equation for photosynthesis?', a: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: Why is chlorophyll green and what factors affect photosynthetic rate?', a: 'Chlorophyll absorbs blue and red light wavelengths while reflecting green light. Primary limiting factors are light intensity, CO₂ concentration, temperature, and water availability.' }
      ],
      'machine learning': [
        { tag: 'DEFINITION', q: 'What is Machine Learning (ML)?', a: 'A branch of Artificial Intelligence (AI) focused on building algorithms that learn patterns from data to make predictions or decisions without being explicitly programmed.' },
        { tag: 'KEY CONCEPT', q: 'What are the 3 main types of Machine Learning paradigms?', a: '1. Supervised Learning: trained on labeled data.\n2. Unsupervised Learning: finds hidden patterns in unlabeled data.\n3. Reinforcement Learning: agent learns through trial-and-error rewards/penalties.' },
        { tag: 'DIFFERENCE', q: 'How does Classification differ from Regression in ML?', a: 'Classification predicts discrete categories or class labels (e.g. Spam vs. Not Spam), whereas Regression predicts continuous numeric values (e.g. predicting house prices).' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is Overfitting vs. Underfitting and how do you fix Overfitting?', a: 'Overfitting happens when a model learns training noise (high variance, low bias). Underfitting happens when a model is too simple (high bias). Fix overfitting with regularization (L1/L2), dropout, or more data.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is the purpose of train/test data splitting?', a: 'To evaluate model generalization on unseen test data, preventing biased evaluations and identifying overfitting before deployment.' }
      ],
      programming: [
        { tag: 'DEFINITION', q: 'What is Programming and Algorithm design?', a: 'Programming is translating problem-solving logic into computer instructions. An algorithm is a finite, step-by-step procedure to perform a specific calculation or data manipulation.' },
        { tag: 'KEY CONCEPT', q: 'What are the 4 fundamental pillars of Object-Oriented Programming (OOP)?', a: '1. Encapsulation: bundling data and methods inside classes.\n2. Abstraction: hiding complex implementation details.\n3. Inheritance: acquiring properties from parent classes.\n4. Polymorphism: unified interface for different types.' },
        { tag: 'DIFFERENCE', q: 'How does a Stack differ from a Queue in data structures?', a: 'A Stack uses LIFO (Last-In, First-Out) operations (push/pop). A Queue uses FIFO (First-In, First-Out) operations (enqueue/dequeue).' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is Recursion and what essential component must every recursive function have?', a: 'Recursion is when a function calls itself. Every recursive function MUST have a base case to terminate execution and prevent infinite loops / stack overflow.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Big-O notation and what are the time complexities of Binary Search vs Linear Search?', a: 'Big-O measures algorithm efficiency relative to input size (N). Linear Search is O(N) linear time; Binary Search on sorted data is O(log N) logarithmic time.' }
      ],
      python: [
        { tag: 'DEFINITION', q: 'What is Python and how is it executed?', a: 'Python is a high-level, interpreted, dynamically-typed, multi-paradigm programming language known for readability and concise syntax.' },
        { tag: 'KEY CONCEPT', q: 'What are mutable vs immutable data types in Python?', a: 'Mutable types (Lists, Dictionaries, Sets) can be modified in place after creation. Immutable types (Tuples, Strings, Integers, Floats) cannot be changed in place.' },
        { tag: 'DIFFERENCE', q: 'How do Lists differ from Tuples in Python syntax?', a: 'Lists use square brackets `[1, 2]`, are mutable, and slower. Tuples use parentheses `(1, 2)`, are immutable, hashable, and faster in memory.' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is List Comprehension syntax in Python?', a: 'A concise syntax to create lists: `[expression for item in iterable if condition]`. Example: `[x**2 for x in range(5) if x % 2 == 0]` returns `[0, 4, 16]`.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: How do `*args` and `**kwargs` function in Python parameters?', a: '`*args` passes a variable number of positional arguments as a tuple. `**kwargs` passes keyword arguments as a dictionary.' }
      ],
      calculus: [
        { tag: 'DEFINITION', q: 'What is Calculus?', a: 'The branch of mathematics studying continuous change, split into Differential Calculus (rates of change) and Integral Calculus (accumulation of quantities).' },
        { tag: 'KEY CONCEPT', q: 'What does a derivative geometrically represent?', a: 'The slope of the tangent line to a curve f(x) at a specific point, representing instantaneous rate of change dy/dx.' },
        { tag: 'DIFFERENCE', q: 'How does a Definite Integral differ from an Indefinite Integral?', a: 'An Indefinite Integral produces a family of antiderivative functions with constant C (∫f(x)dx = F(x) + C). A Definite Integral evaluates bounds [a, b] to compute exact net area.' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is the Power Rule for differentiation and integration?', a: 'Derivative Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹. Integral Power Rule: ∫xⁿ dx = (xⁿ⁺¹)/(n+1) + C (for n ≠ -1).' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is the Fundamental Theorem of Calculus (FTC)?', a: 'It bridges differentiation and integration: if F\'(x) = f(x), then ∫ₐᵇ f(x)dx = F(b) - F(a).' }
      ],
      chemistry: [
        { tag: 'DEFINITION', q: 'What is an Acid vs. a Base?', a: 'According to Brønsted-Lowry theory, an Acid is a proton (H⁺) donor, while a Base is a proton (H⁺) acceptor. pH scale: < 7 Acidic, 7 Neutral, > 7 Basic.' },
        { tag: 'KEY CONCEPT', q: 'What are covalent vs ionic bonds?', a: 'Ionic bonds form through the complete transfer of electrons between metals and non-metals. Covalent bonds form when non-metals share electron pairs.' },
        { tag: 'DIFFERENCE', q: 'How do Endothermic and Exothermic chemical reactions differ?', a: 'Exothermic reactions release thermal energy to surroundings (ΔH < 0). Endothermic reactions absorb thermal energy from surroundings (ΔH > 0).' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is Le Chatelier’s Principle?', a: 'If a chemical system at equilibrium experiences a change in concentration, temperature, or pressure, the system shifts to counteract the disturbance.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Avogadro’s number and how is molar mass used?', a: '1 mole = 6.022 × 10²³ particles. Moles = Mass (grams) / Molar Mass (g/mol).' }
      ],
      economics: [
        { tag: 'DEFINITION', q: 'What is Economics?', a: 'The social science studying how individuals, businesses, and governments allocate scarce resources to satisfy unlimited wants and needs.' },
        { tag: 'KEY CONCEPT', q: 'What is the Law of Supply and Demand?', a: 'Law of Demand: price rises → quantity demanded falls (inverse). Law of Supply: price rises → quantity supplied rises (direct). Market equilibrium is where supply meets demand.' },
        { tag: 'DIFFERENCE', q: 'How does Microeconomics differ from Macroeconomics?', a: 'Microeconomics studies decision-making of individual consumers and firms. Macroeconomics analyzes aggregate economy-wide outcomes (GDP, inflation, unemployment).' },
        { tag: 'EXAMPLE & SYNTAX', q: 'What is Opportunity Cost?', a: 'The value of the next best alternative given up when making a choice (e.g. studying for an exam instead of working a paid shift).' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Fiscal Policy vs Monetary Policy?', a: 'Fiscal policy uses government spending and tax policy to influence economy. Monetary policy uses interest rates and money supply controlled by central banks.' }
      ]
    };

    // Check pre-built revision flashcards bank
    for (const [key, cards] of Object.entries(flashcardBank)) {
      if (t.includes(key)) {
        return cards;
      }
    }

    // Dynamic smart subject generator for any user topic
    return this.generateSmartFlashcards(topic.trim());
  },

  generateSmartFlashcards(topic) {
    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
    const lower = topic.toLowerCase();

    // Detect topic domain
    const isCode = /code|program|python|java|javascript|c\+\+|c#|data|sql|api|system|network|algorithm|app|web|design|hardware|software|tech|html|css|php|ruby|swift|kotlin|rust|go|typescript/.test(lower);
    const isSci = /cell|bio|chem|phys|gene|atom|energy|space|body|plant|force|organ|health|neuro|earth|nature|molecule|electron|magnet|wave|gravity|evolution/.test(lower);
    const isMath = /math|algebra|geometry|trigonometry|calculus|statistics|probability|equation|arithmetic|number/.test(lower);

    if (isCode) {
      return [
        {
          tag: 'DEFINITION',
          q: `What is ${cap}?`,
          a: `${cap} is a programming concept, language, or technology used in software development to build applications and solve computational problems.`
        },
        {
          tag: 'KEY CONCEPT',
          q: `What are variables and data types in ${cap}?`,
          a: 'Variables are named containers that store data values. Common data types include Integer (whole numbers), Float (decimal numbers), String (text), and Boolean (true/false).'
        },
        {
          tag: 'FEATURE',
          q: `What is the difference between a compiler and an interpreter?`,
          a: 'A compiler translates the entire program into machine code at once before execution (e.g., C, C++). An interpreter translates code line by line during execution (e.g., Python, JavaScript).'
        },
        {
          tag: 'SYNTAX',
          q: `What is the syntax for declaring a function?`,
          a: 'In JavaScript: function name(params) { }\nIn Python: def name(params):\nIn Java: returnType name(params) { }\nIn C++: returnType name(params) { }'
        },
        {
          tag: 'EXAM QUESTION',
          q: `What are the four pillars of OOP?`,
          a: '1. Encapsulation — bundling data and methods together.\n2. Inheritance — child class inherits from parent class.\n3. Polymorphism — same method name, different behavior.\n4. Abstraction — hiding internal details, showing only functionality.'
        }
      ];
    }

    if (isSci) {
      return [
        {
          tag: 'DEFINITION',
          q: `What is ${cap}?`,
          a: `${cap} is a branch of science that studies natural phenomena, processes, and systems through observation, experimentation, and analysis.`
        },
        {
          tag: 'KEY CONCEPT',
          q: `What are the key principles of ${cap}?`,
          a: `The key principles include understanding fundamental laws, identifying cause-and-effect relationships, and applying scientific methods to test hypotheses.`
        },
        {
          tag: 'TYPES',
          q: `What are the main branches or types of ${cap}?`,
          a: `${cap} is typically divided into theoretical (concept-based study) and experimental (lab-based practical study) branches, each with specialized sub-fields.`
        },
        {
          tag: 'EXAMPLE',
          q: `Give one real-world example of ${cap}.`,
          a: `${cap} principles are applied in medicine, engineering, environmental science, and technology to solve real-world problems and improve quality of life.`
        },
        {
          tag: 'EXAM QUESTION',
          q: `What is one frequently asked exam question about ${cap}?`,
          a: `"Define ${cap} and explain its importance." — Answer by stating the definition, listing 2-3 key features, and giving one practical application.`
        }
      ];
    }

    if (isMath) {
      return [
        {
          tag: 'DEFINITION',
          q: `What is ${cap}?`,
          a: `${cap} is a branch of mathematics that deals with numbers, quantities, shapes, or logical reasoning to solve problems.`
        },
        {
          tag: 'KEY CONCEPT',
          q: `What are the basic operations or rules in ${cap}?`,
          a: `The basic operations include addition, subtraction, multiplication, and division. Advanced topics include equations, formulas, proofs, and graphing.`
        },
        {
          tag: 'FORMULA',
          q: `Why are formulas important in ${cap}?`,
          a: `Formulas provide a standard shortcut to calculate results. Memorizing key formulas saves time and ensures accuracy in exams.`
        },
        {
          tag: 'EXAMPLE',
          q: `How do you solve problems in ${cap}?`,
          a: `Step 1: Read the problem and identify given values. Step 2: Choose the correct formula. Step 3: Substitute values. Step 4: Solve and verify the answer.`
        },
        {
          tag: 'EXAM QUESTION',
          q: `What mistakes should you avoid in ${cap} exams?`,
          a: `1. Not reading the question fully. 2. Using the wrong formula. 3. Calculation errors. 4. Forgetting to write units. 5. Not showing steps (examiners give marks for working).`
        }
      ];
    }

    // General / theory topic flashcards
    return [
      {
        tag: 'DEFINITION',
        q: `What is ${cap}?`,
        a: `${cap} is a subject that covers the study of its core concepts, principles, and their applications in academics and real-world scenarios.`
      },
      {
        tag: 'KEY CONCEPT',
        q: `What are the key features of ${cap}?`,
        a: `Key features include: 1. Based on established theories and principles. 2. Has both theoretical and practical aspects. 3. Useful in academics, research, and professional fields.`
      },
      {
        tag: 'TYPES',
        q: `What are the different types or classifications in ${cap}?`,
        a: `${cap} can generally be classified into: 1. Theoretical — focuses on concepts and principles. 2. Applied — focuses on practical use in industry and daily life.`
      },
      {
        tag: 'ADVANTAGE',
        q: `What are the advantages of studying ${cap}?`,
        a: `1. Builds strong analytical skills. 2. Improves problem-solving ability. 3. Opens career opportunities in related fields. 4. Provides a foundation for advanced studies.`
      },
      {
        tag: 'EXAM QUESTION',
        q: `How should you answer a "Define ${cap}" question in an exam?`,
        a: `Start with a clear one-line definition. Then list 2-3 key points. Add one example if asked. Keep the answer concise and to the point.`
      }
    ];
  },
};

function $(id) { return document.getElementById(id); }

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showLoading(btn) {
  btn.classList.add('loading');
  btn.disabled = true;
}

function hideLoading(btn) {
  btn.classList.remove('loading');
  btn.disabled = false;
}

function showToast(message, type = 'info', duration = 3500) {
  const container = $('toast-container');
  const toast = document.createElement('div');
  const iconNames = { success: 'check-circle', error: 'alert-triangle', info: 'info', warning: 'alert-circle' };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i data-lucide="${iconNames[type] || 'info'}" class="toast-icon"></i><span>${message}</span>`;
  container.appendChild(toast);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

function simulateDelay(min = 600, max = 1200) {
  return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
}

function showOutput(placeholderId, contentId, outputEl, html) {
  $(placeholderId).hidden = true;
  $(contentId).hidden = false;
  $(contentId).innerHTML = html;
  outputEl.classList.add('has-content');
}

function clearOutput(placeholderId, contentId, outputEl) {
  $(placeholderId).hidden = false;
  $(contentId).hidden = true;
  $(contentId).innerHTML = '';
  outputEl.classList.remove('has-content');
}

/* ================================================================
   4. THEME MANAGEMENT
   ================================================================ */

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  const icon = $('toggle-icon');
  if (icon) {
    icon.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  showToast(`Switched to ${next} mode`, 'info', 2000);
}

/* ================================================================
   5. NAVBAR BEHAVIOR
   ================================================================ */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = $('hamburger');
  const mobileMenu = $('mobile-menu');

  // Scroll-based styling
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    });
  });

  // Active nav highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ================================================================
   6. SCROLL-TO-TOP BUTTON
   ================================================================ */

function initScrollTop() {
  const btn = $('scroll-top-btn');
  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ================================================================
   7. HERO PARTICLES
   ================================================================ */

function initParticles() {
  const container = $('hero-particles');
  const count = window.innerWidth < 600 ? 8 : 16;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 12 + 8;

    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;
    container.appendChild(p);
  }
}

/* ================================================================
   8. AI TOPIC EXPLAINER FEATURE
   ================================================================ */

function initExplainer() {
  const input = $('explainer-input');
  const btn = $('explainer-btn');
  const clearBtn = $('explainer-clear');
  const output = $('explainer-output');

  async function explain() {
    const topic = input.value.trim();
    if (!topic) {
      showToast('Please enter a topic to explain.', 'warning');
      input.focus();
      return;
    }

    showLoading(btn);
    await simulateDelay(700, 1400);

    try {
      const data = AI.explainTopic(topic);
      const capTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

      let html = `<div class="output-topic-title"><i data-lucide="book-open" class="inline-icon"></i> ${capTopic} — Exam Revision Guide</div>`;

      // 1. Definition
      if (data.definition) {
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="book" class="inline-icon"></i> 1. Definition
            </div>
            <p class="output-intro" style="margin-bottom:0;line-height:1.6;">${data.definition}</p>
          </div>`;
      }

      // 2. Key Concepts
      if (data.keyConcepts && data.keyConcepts.length > 0) {
        const items = data.keyConcepts.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${item}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="key" class="inline-icon"></i> 2. Key Concepts
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      // 3. Features
      if (data.features && data.features.length > 0) {
        const items = data.features.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${item}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="layers" class="inline-icon"></i> 3. Features
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      // 4. Functions
      if (data.functions && data.functions.length > 0) {
        const items = data.functions.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${item}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="cpu" class="inline-icon"></i> 4. Functions
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      // 5. Types
      if (data.types && data.types.length > 0) {
        const items = data.types.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${item}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="git-branch" class="inline-icon"></i> 5. Types & Classifications
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      // 6. Advantages
      if (data.advantages && data.advantages.length > 0) {
        const items = data.advantages.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${item}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-success);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="check-circle" class="inline-icon"></i> 6. Advantages
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      // 7. Disadvantages
      if (data.disadvantages && data.disadvantages.length > 0) {
        const items = data.disadvantages.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${item}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:#f43f5e;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="alert-triangle" class="inline-icon"></i> 7. Disadvantages & Limitations
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      // 8. Syntax
      if (data.syntax) {
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="code" class="inline-icon"></i> 8. Syntax / Formula
            </div>
            <div style="background:var(--clr-surface-2);border:1px solid var(--clr-border);padding:0.75rem 1rem;border-radius:var(--radius-md);font-family:monospace;font-size:0.9rem;white-space:pre-wrap;color:var(--clr-text-primary);">${data.syntax}</div>
          </div>`;
      }

      // 9. Example
      if (data.example) {
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="zap" class="inline-icon"></i> 9. Practical Example
            </div>
            <p class="output-intro" style="margin-bottom:0;line-height:1.6;">${data.example}</p>
          </div>`;
      }

      // 10. Frequently Asked Exam Questions
      if (data.examQuestions && data.examQuestions.length > 0) {
        const qaHtml = data.examQuestions.map((qa, i) => `
          <div style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.18);padding:0.75rem 1rem;border-radius:var(--radius-md);margin-bottom:0.6rem;">
            <div style="font-weight:700;font-size:0.9rem;color:var(--clr-primary);margin-bottom:0.25rem;">Q${i + 1}: ${qa.q}</div>
            <div style="font-size:0.88rem;color:var(--clr-text-primary);line-height:1.5;"><strong>Answer:</strong> ${qa.a}</div>
          </div>
        `).join('');
        html += `
          <div style="margin-bottom:0.5rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.4rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="help-circle" class="inline-icon"></i> 10. Frequently Asked Exam Questions
            </div>
            ${qaHtml}
          </div>`;
      }

      showOutput('explainer-placeholder', 'explainer-content', output, html);
      if (window.lucide) {
        window.lucide.createIcons();
      }
      showToast('Topic explained successfully!', 'success');
    } catch (e) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      hideLoading(btn);
    }
  }

  btn.addEventListener('click', explain);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') explain(); });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearOutput('explainer-placeholder', 'explainer-content', output);
    input.focus();
  });
}

/* ================================================================
   9. NOTES SUMMARIZER FEATURE
   ================================================================ */

function initSummarizer() {
  const textarea = $('summarizer-input');
  const counter = $('summarizer-counter');
  const btn = $('summarizer-btn');
  const clearBtn = $('summarizer-clear');
  const output = $('summarizer-output');

  // File Upload Elements
  const dropzone = $('summarizer-dropzone');
  const fileInput = $('summarizer-file-input');
  const dropzonePrompt = $('dropzone-prompt');
  const filePreview = $('dropzone-file-preview');
  const previewName = $('file-preview-name');
  const previewSize = $('file-preview-size');
  const previewIcon = $('file-preview-icon');
  const fileRemoveBtn = $('file-remove-btn');
  const progressContainer = $('ocr-progress-container');
  const progressFill = $('ocr-progress-fill');
  const statusText = $('ocr-status-text');

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function updateProgress(percent, message) {
    if (progressContainer) progressContainer.hidden = false;
    if (progressFill) progressFill.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    if (statusText && message) statusText.textContent = message;
  }

  function hideProgress() {
    if (progressContainer) progressContainer.hidden = true;
    if (progressFill) progressFill.style.width = '0%';
  }

  function resetFilePreview() {
    if (fileInput) fileInput.value = '';
    if (dropzonePrompt) dropzonePrompt.hidden = false;
    if (filePreview) filePreview.hidden = true;
    hideProgress();
  }

  // Handle Dropzone & Input Events
  if (dropzone) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#file-remove-btn')) return;
      fileInput.click();
    });

    dropzone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dropzone-hover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dropzone-hover');
      }, false);
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt ? dt.files : null;
      if (files && files.length > 0) {
        handleSelectedFile(files[0]);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        handleSelectedFile(fileInput.files[0]);
      }
    });
  }

  if (fileRemoveBtn) {
    fileRemoveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetFilePreview();
      showToast('File removed', 'info');
    });
  }

  // Router for parsing selected file
  async function handleSelectedFile(file) {
    if (!dropzonePrompt || !filePreview) return;

    dropzonePrompt.hidden = true;
    filePreview.hidden = false;
    previewName.textContent = file.name;
    previewSize.textContent = formatBytes(file.size);

    const ext = file.name.split('.').pop().toLowerCase();
    const isImage = file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif'].includes(ext);
    const isPdf = file.type === 'application/pdf' || ext === 'pdf';
    const isDocx = ext === 'docx' || ext === 'doc';

    if (isImage) {
      previewIcon.innerHTML = '<i data-lucide="image"></i>';
    } else if (isPdf) {
      previewIcon.innerHTML = '<i data-lucide="file-text"></i>';
    } else if (isDocx) {
      previewIcon.innerHTML = '<i data-lucide="file"></i>';
    } else {
      previewIcon.innerHTML = '<i data-lucide="file-code"></i>';
    }
    if (window.lucide) window.lucide.createIcons();

    updateProgress(10, 'Reading file...');

    try {
      let extractedText = '';

      if (isImage) {
        extractedText = await parseImageOCR(file);
      } else if (isPdf) {
        extractedText = await parsePdfText(file);
      } else if (isDocx) {
        extractedText = await parseDocxText(file);
      } else {
        extractedText = await parsePlainText(file);
      }

      if (extractedText && extractedText.trim().length > 0) {
        textarea.value = extractedText.trim();
        const len = textarea.value.length;
        counter.textContent = `${len.toLocaleString()} character${len !== 1 ? 's' : ''}`;
        counter.style.color = len < 50 ? 'var(--clr-warning)' : 'var(--clr-success)';

        updateProgress(100, 'Extraction complete!');
        showToast(`Successfully extracted text from ${file.name}!`, 'success');

        setTimeout(() => {
          hideProgress();
          summarize();
        }, 600);
      } else {
        hideProgress();
        showToast('No readable text could be extracted from this file.', 'warning');
      }
    } catch (err) {
      console.error('File parsing error:', err);
      hideProgress();
      showToast('Failed to parse file. Please try another file or paste text directly.', 'error');
    }
  }

  // Parser 1: Plain Text (.txt, .md, .csv, .json)
  function parsePlainText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
      reader.readAsText(file);
    });
  }

  // Parser 2: PDF Document (via PDF.js)
  async function parsePdfText(file) {
    if (typeof pdfjsLib === 'undefined') {
      throw new Error('PDF library not loaded');
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    updateProgress(25, 'Loading PDF document...');
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const percent = Math.round(25 + (pageNum / numPages) * 70);
      updateProgress(percent, `Extracting page ${pageNum} of ${numPages}...`);

      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageStrings = content.items.map(item => item.str);
      fullText += pageStrings.join(' ') + '\n\n';
    }

    return fullText;
  }

  // Parser 3: Word DOCX (via Mammoth.js)
  async function parseDocxText(file) {
    if (typeof mammoth === 'undefined') {
      throw new Error('Mammoth library not loaded');
    }
    updateProgress(50, 'Parsing Word document...');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    return result.value;
  }

  // Parser 4: Photos & Images OCR (via Tesseract.js)
  async function parseImageOCR(file) {
    if (typeof Tesseract === 'undefined') {
      throw new Error('OCR library not loaded');
    }
    updateProgress(15, 'Initializing AI OCR Engine...');

    const result = await Tesseract.recognize(file, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          const pct = Math.round(15 + (m.progress || 0) * 80);
          updateProgress(pct, `Scanning image text (${Math.round((m.progress || 0) * 100)}%)...`);
        } else if (m.status) {
          updateProgress(20, `${m.status.charAt(0).toUpperCase() + m.status.slice(1)}...`);
        }
      }
    });

    return result.data.text;
  }

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = `${len.toLocaleString()} character${len !== 1 ? 's' : ''}`;
    counter.style.color = len < 50 ? 'var(--clr-warning)' : 'var(--clr-success)';
  });

  async function summarize() {
    const text = textarea.value.trim();
    if (text.length < 20) {
      showToast('Please paste or upload at least 20 characters of notes.', 'warning');
      textarea.focus();
      return;
    }

    showLoading(btn);
    await simulateDelay(800, 1600);

    try {
      const data = AI.summarizeNotes(text);
      const wordCount = text.split(/\s+/).length;

      // 1. Output Header Actions Bar
      let html = `
        <div class="summary-output-header">
          <div class="output-topic-title" style="margin-bottom:0;border:none;padding-bottom:0;">
            <i data-lucide="file-text" class="inline-icon"></i> Notes Summary & Exam Digest
            <span class="summary-word-badge">~${wordCount} words</span>
          </div>
          <div class="summary-actions-toolbar">
            <button type="button" class="btn-summary-action" id="btn-copy-summary" title="Copy revision summary">
              <i data-lucide="copy" class="inline-icon"></i> Copy Notes
            </button>
            <button type="button" class="btn-summary-action" id="btn-download-summary" title="Download revision sheet">
              <i data-lucide="download" class="inline-icon"></i> Download
            </button>
          </div>
        </div>
        <div class="summary-header-divider"></div>
      `;

      // 2. Short Summary
      html += `
        <div class="summary-block">
          <div class="summary-block-title">
            <i data-lucide="align-left" class="inline-icon"></i> Short Summary
          </div>
          <div class="summary-card short-summary-card">
            <p style="margin:0;line-height:1.7;">${escapeHtml(data.shortSummary)}</p>
          </div>
        </div>
      `;

      // 3. Quick Revision Points
      if (data.quickRevisionPoints && data.quickRevisionPoints.length > 0) {
        const qrpItems = data.quickRevisionPoints.map((pt, idx) => `
          <div class="summary-point-card" style="animation-delay:${idx * 0.05}s">
            <div class="point-bullet" style="background:var(--clr-primary);color:#fff;font-weight:700;font-size:0.75rem;min-width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${idx + 1}</div>
            <div class="point-body">
              <span>${escapeHtml(pt)}</span>
            </div>
          </div>
        `).join('');

        html += `
          <div class="summary-block">
            <div class="summary-block-title">
              <i data-lucide="zap" class="inline-icon"></i> Quick Revision Points
            </div>
            <div class="summary-points-grid">${qrpItems}</div>
          </div>
        `;
      }

      // 4. Remember This Callout Card
      if (data.rememberThis) {
        html += `
          <div class="summary-block">
            <div class="summary-card exam-point-card" style="border-left: 4px solid var(--clr-warning); background: rgba(245, 158, 11, 0.08);">
              <div class="card-icon-header warning-header" style="color: var(--clr-warning); font-weight:700; display:flex; align-items:center; gap:0.4rem; margin-bottom:0.35rem;">
                <i data-lucide="bookmark" class="inline-icon"></i> Remember This
              </div>
              <p style="margin:0;font-size:0.92rem;font-weight:600;line-height:1.6;color:var(--clr-text-primary);">${escapeHtml(data.rememberThis)}</p>
            </div>
          </div>
        `;
      }

      // 5. Key Points & Core Concepts
      const keyPointsHtml = data.keyPoints.map((p, i) => {
        let title = '';
        let body = p;
        if (p.includes(':')) {
          const parts = p.split(':');
          title = parts[0].trim();
          body = parts.slice(1).join(':').trim();
        } else if (p.includes(' — ')) {
          const parts = p.split(' — ');
          title = parts[0].trim();
          body = parts.slice(1).join(' — ').trim();
        }

        return `
          <div class="summary-point-card" style="animation-delay:${i * 0.05}s">
            <div class="point-bullet"><i data-lucide="check" class="inline-icon"></i></div>
            <div class="point-body">
              ${title ? `<strong class="point-title">${escapeHtml(title)}:</strong> ` : ''}
              <span>${escapeHtml(body)}</span>
            </div>
          </div>
        `;
      }).join('');

      html += `
        <div class="summary-block">
          <div class="summary-block-title">
            <i data-lucide="list-checks" class="inline-icon"></i> Key Points & Core Concepts
          </div>
          <div class="summary-points-grid">${keyPointsHtml}</div>
        </div>
      `;

      // 6. Formatted Code Snippets & Syntax Examples
      if (data.formattedCodeBlock) {
        html += `
          <div class="summary-block">
            <div class="summary-block-title">
              <i data-lucide="code" class="inline-icon"></i> Code Snippets & Syntax Examples
            </div>
            <div class="code-container">
              <div class="code-header">
                <span class="code-lang-tag"><i data-lucide="terminal" class="inline-icon"></i> Code Examples</span>
                <button type="button" class="btn-copy-code" id="btn-copy-code-block">
                  <i data-lucide="copy" class="inline-icon"></i> Copy Code
                </button>
              </div>
              <pre class="summary-code-block"><code>${escapeHtml(data.formattedCodeBlock)}</code></pre>
            </div>
          </div>
        `;
      }

      // 7. Important Keywords
      const keywordsHtml = data.keywords
        .map(kw => `<span class="keyword-pill"><i data-lucide="tag" class="pill-icon"></i>${escapeHtml(kw)}</span>`)
        .join(' ');

      html += `
        <div class="summary-block">
          <div class="summary-block-title">
            <i data-lucide="hash" class="inline-icon"></i> Important Keywords
          </div>
          <div class="keywords-wrap">${keywordsHtml}</div>
        </div>
      `;

      // 8. Memory Tip / Mnemonic
      if (data.memoryTip) {
        html += `
          <div class="summary-block">
            <div class="summary-card memory-tip-card">
              <div class="card-icon-header warning-header">
                <i data-lucide="lightbulb" class="inline-icon"></i> Memory Tip / Mnemonic
              </div>
              <p style="margin:0;font-size:0.9rem;">${escapeHtml(data.memoryTip)}</p>
            </div>
          </div>
        `;
      }

      // 9. Important Exam Point
      if (data.examPoint) {
        html += `
          <div class="summary-block">
            <div class="summary-card exam-point-card">
              <div class="card-icon-header primary-header">
                <i data-lucide="target" class="inline-icon"></i> Important Exam Point
              </div>
              <p style="margin:0;font-size:0.9rem;font-weight:500;">${escapeHtml(data.examPoint)}</p>
            </div>
          </div>
        `;
      }

      // 10. Quick Revision Tips
      const revisionTipsHtml = data.revisionTips.map(tip => `
        <li><i data-lucide="check-circle-2" class="inline-icon tip-icon"></i> <span>${escapeHtml(tip)}</span></li>
      `).join('');

      html += `
        <div class="summary-block" style="margin-bottom:0;">
          <div class="summary-block-title">
            <i data-lucide="sparkles" class="inline-icon"></i> Quick Revision Tips
          </div>
          <ul class="revision-tips-list">${revisionTipsHtml}</ul>
        </div>
      `;

      showOutput('summarizer-placeholder', 'summarizer-content', output, html);
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Wire up Copy Notes, Copy Code, Download buttons
      const btnCopySummary = $('btn-copy-summary');
      if (btnCopySummary) {
        btnCopySummary.addEventListener('click', () => {
          const summaryContent = `SHORT SUMMARY:\n${data.shortSummary}\n\nKEY POINTS:\n${data.keyPoints.join('\n')}\n\nEXAM POINT:\n${data.examPoint}`;
          navigator.clipboard.writeText(summaryContent).then(() => {
            showToast('Summary copied to clipboard!', 'success');
          }).catch(() => {
            showToast('Failed to copy to clipboard', 'warning');
          });
        });
      }

      const btnCopyCode = $('btn-copy-code-block');
      if (btnCopyCode && data.formattedCodeBlock) {
        btnCopyCode.addEventListener('click', () => {
          navigator.clipboard.writeText(data.formattedCodeBlock).then(() => {
            showToast('Code copied to clipboard!', 'success');
          }).catch(() => {
            showToast('Failed to copy code', 'warning');
          });
        });
      }

      const btnDownloadSummary = $('btn-download-summary');
      if (btnDownloadSummary) {
        btnDownloadSummary.addEventListener('click', () => {
          let fileContent = `====================================================\nSMARTPREP AI - REVISION NOTES SUMMARY\n====================================================\n\n[SHORT SUMMARY]\n${data.shortSummary}\n\n[KEY POINTS]\n${data.keyPoints.map((kp, i) => `${i + 1}. ${kp}`).join('\n')}\n\n`;
          if (data.formattedCodeBlock) {
            fileContent += `[CODE EXAMPLES & SYNTAX]\n${data.formattedCodeBlock}\n\n`;
          }
          fileContent += `[IMPORTANT KEYWORDS]\n${data.keywords.join(', ')}\n\n[IMPORTANT EXAM POINT]\n${data.examPoint}\n\n[MEMORY TIP]\n${data.memoryTip}\n`;

          const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `SmartPrep_Summary_${Date.now()}.txt`;
          a.click();
          URL.revokeObjectURL(url);
          showToast('Summary downloaded as text file!', 'success');
        });
      }

      showToast(`Summarized into ${data.keyPoints.length} key points!`, 'success');
    } catch (e) {
      console.error('Summarizer error:', e);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      hideLoading(btn);
    }
  }

  btn.addEventListener('click', summarize);
  clearBtn.addEventListener('click', () => {
    textarea.value = '';
    counter.textContent = '0 characters';
    counter.style.color = '';
    resetFilePreview();
    clearOutput('summarizer-placeholder', 'summarizer-content', output);
    textarea.focus();
  });
}

/* ================================================================
   10. QUIZ GENERATOR FEATURE
   ================================================================ */

let quizState = { questions: [], selected: [], submitted: false };

function initQuiz() {
  const input = $('quiz-input');
  const btn = $('quiz-btn');
  const clearBtn = $('quiz-clear');
  const placeholder = $('quiz-placeholder');
  const content = $('quiz-content');
  const scoreArea = $('quiz-score-area');
  const retryBtn = $('quiz-retry-btn');

  async function generateQuiz() {
    const topic = input.value.trim();
    if (!topic) {
      showToast('Please enter a topic to generate a quiz.', 'warning');
      input.focus();
      return;
    }

    showLoading(btn);
    await simulateDelay(900, 1800);

    try {
      quizState.questions = AI.generateQuiz(topic);
      quizState.selected = new Array(quizState.questions.length).fill(null);
      quizState.submitted = false;
      renderQuiz(content, scoreArea, placeholder);
      showToast('Quiz generated! Select your answers.', 'success');
    } catch (e) {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      hideLoading(btn);
    }
  }

  btn.addEventListener('click', generateQuiz);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') generateQuiz(); });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    quizState = { questions: [], selected: [], submitted: false };
    placeholder.hidden = false;
    content.hidden = true;
    content.innerHTML = '';
    scoreArea.hidden = true;
    showToast('Quiz cleared.', 'info', 1800);
  });

  retryBtn.addEventListener('click', () => {
    if (quizState.questions.length > 0) {
      quizState.selected = new Array(quizState.questions.length).fill(null);
      quizState.submitted = false;
      renderQuiz(content, scoreArea, placeholder);
    }
  });
}

function renderQuiz(content, scoreArea, placeholder) {
  placeholder.hidden = true;
  scoreArea.hidden = true;
  content.hidden = false;
  content.innerHTML = '';

  quizState.questions.forEach((qData, qIdx) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.style.animationDelay = `${qIdx * 0.1}s`;

    const letters = ['A', 'B', 'C', 'D'];
    const optionsHtml = qData.options
      .map((opt, oIdx) => `
        <div class="quiz-option" data-q="${qIdx}" data-o="${oIdx}" role="radio" tabindex="0" aria-label="Option ${letters[oIdx]}: ${opt}">
          <span class="option-letter">${letters[oIdx]}</span>
          <span>${opt}</span>
        </div>
      `)
      .join('');

    card.innerHTML = `
      <div class="quiz-question-header">
        <span class="quiz-q-number">${qIdx + 1}</span>
        <span class="quiz-question-text">${qData.q}</span>
      </div>
      <div class="quiz-options" id="quiz-options-${qIdx}">${optionsHtml}</div>
    `;

    content.appendChild(card);
  });

  // Add submit button
  const submitRow = document.createElement('div');
  submitRow.style.cssText = 'display:flex;justify-content:center;margin-top:0.5rem;';
  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-primary';
  submitBtn.id = 'quiz-submit-btn';
  submitBtn.innerHTML = '✅ Submit Answers';
  submitRow.appendChild(submitBtn);
  content.appendChild(submitRow);

  // Option click listeners
  content.querySelectorAll('.quiz-option').forEach(opt => {
    const handler = () => handleOptionSelect(opt, content);
    opt.addEventListener('click', handler);
    opt.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    });
  });

  submitBtn.addEventListener('click', () => submitQuiz(content, scoreArea));
}

function handleOptionSelect(optEl, content) {
  if (quizState.submitted) return;
  const qIdx = parseInt(optEl.dataset.q);
  const oIdx = parseInt(optEl.dataset.o);
  quizState.selected[qIdx] = oIdx;

  // Update visuals for this question
  content.querySelectorAll(`.quiz-option[data-q="${qIdx}"]`).forEach(o => {
    o.classList.remove('selected');
  });
  optEl.classList.add('selected');
}

function submitQuiz(content, scoreArea) {
  const allAnswered = quizState.selected.every(s => s !== null);
  if (!allAnswered) {
    showToast('Please answer all questions before submitting.', 'warning');
    return;
  }

  quizState.submitted = true;
  let score = 0;

  quizState.questions.forEach((qData, qIdx) => {
    const correct = qData.answer;
    const chosen = quizState.selected[qIdx];

    content.querySelectorAll(`.quiz-option[data-q="${qIdx}"]`).forEach(optEl => {
      const oIdx = parseInt(optEl.dataset.o);
      optEl.classList.add('disabled');
      optEl.classList.remove('selected');

      if (oIdx === correct) {
        optEl.classList.add('correct');
      } else if (oIdx === chosen && chosen !== correct) {
        optEl.classList.add('incorrect');
      }
    });

    if (chosen === correct) score++;

    // Add explanation
    const optionsContainer = content.querySelector(`#quiz-options-${qIdx}`);
    const expEl = document.createElement('div');
    expEl.className = 'quiz-explanation';
    expEl.innerHTML = `<i data-lucide="info" class="inline-icon"></i> ${qData.explanation}`;
    optionsContainer.parentNode.insertBefore(expEl, optionsContainer.nextSibling);
  });

  // Remove submit button
  const sub = content.querySelector('#quiz-submit-btn');
  if (sub) sub.parentElement.remove();

  // Show score
  const total = quizState.questions.length;
  const pct = Math.round((score / total) * 100);
  const iconName = pct === 100 ? 'trophy' : pct >= 80 ? 'award' : pct >= 60 ? 'thumbs-up' : pct >= 40 ? 'book-open' : 'flame';
  const msg = pct === 100 ? 'Perfect Score!' : pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job!' : pct >= 40 ? 'Keep Studying!' : 'Need More Practice!';
  const color = pct >= 80 ? 'var(--clr-success)' : pct >= 60 ? 'var(--clr-warning)' : 'var(--clr-error)';

  scoreArea.hidden = false;
  $('quiz-score-display').innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:0.5rem;display:flex;justify-content:center"><i data-lucide="${iconName}" style="width:48px;height:48px;stroke-width:1.5px;color:var(--clr-primary)"></i></div>
    <div style="color:${color};font-size:2.5rem;font-weight:900;font-family:var(--font-heading)">${score}/${total}</div>
    <div style="font-size:1.1rem;font-weight:600;color:var(--clr-text-secondary);margin-bottom:0.5rem">${msg} (${pct}%)</div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  showToast(`You scored ${score}/${total}!`, pct >= 60 ? 'success' : 'info');
}

/* ================================================================
   10b. AI FLASHCARD GENERATOR FEATURE
   ================================================================ */

let flashcardState = { cards: [] };

function initFlashcards() {
  const input = $('flashcard-input');
  const btn = $('flashcard-btn');
  const clearBtn = $('flashcard-clear');
  const placeholder = $('flashcard-placeholder');
  const content = $('flashcard-content');

  async function handleGenerateFlashcards() {
    const topic = input.value.trim();
    if (!topic) {
      showToast('Please enter a topic to generate flashcards.', 'warning');
      input.focus();
      return;
    }

    showLoading(btn);
    await simulateDelay(800, 1600);

    try {
      flashcardState.cards = AI.generateFlashcards(topic);
      renderFlashcards(content, placeholder);
      showToast('Flashcards generated! Click any card to flip it.', 'success');
    } catch (e) {
      showToast('Something went wrong. Please try again.', 'error');
      console.error(e);
    } finally {
      hideLoading(btn);
    }
  }

  btn.addEventListener('click', handleGenerateFlashcards);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleGenerateFlashcards(); });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    flashcardState = { cards: [] };
    placeholder.hidden = false;
    content.hidden = true;
    content.innerHTML = '';
    showToast('Flashcards cleared.', 'info', 1800);
  });
}

const MASCOTS = {
  studying: `<svg class="mascot-mini-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="#e0f2fe"/>
    <ellipse cx="20" cy="23" rx="11" ry="12" fill="#0f172a"/>
    <ellipse cx="20" cy="24" rx="8" ry="9" fill="#f8fafc"/>
    <circle cx="16" cy="18" r="1.8" fill="#0f172a"/>
    <circle cx="24" cy="18" r="1.8" fill="#0f172a"/>
    <path d="M18 21 L22 21 L20 24 Z" fill="#f59e0b"/>
    <path d="M12 13 L20 9 L28 13 L20 17 Z" fill="#2563eb"/>
    <path d="M16 15.5 L16 18 C16 19.5 24 19.5 24 18 L24 15.5" stroke="#1d4ed8" stroke-width="1.2" fill="none"/>
    <path d="M28 13 L28 16.5" stroke="#fbbf24" stroke-width="1"/>
  </svg>`,
  celebrating: `<svg class="mascot-mini-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="20" cy="20" r="18" fill="#dcfce7"/>
    <ellipse cx="20" cy="23" rx="11" ry="12" fill="#0f172a"/>
    <ellipse cx="20" cy="24" rx="8" ry="9" fill="#f8fafc"/>
    <circle cx="16" cy="18" r="1.8" fill="#0f172a"/>
    <circle cx="24" cy="18" r="1.8" fill="#0f172a"/>
    <path d="M18 21 L22 21 L20 24 Z" fill="#f59e0b"/>
    <circle cx="14" cy="20" r="1.5" fill="#f43f5e" opacity="0.6"/>
    <circle cx="26" cy="20" r="1.5" fill="#f43f5e" opacity="0.6"/>
    <path d="M20 5 L21.2 7.8 L24 8 L21.8 10 L22.5 13 L20 11.4 L17.5 13 L18.2 10 L16 8 L18.8 7.8 Z" fill="#fbbf24"/>
  </svg>`
};

function renderFlashcards(content, placeholder) {
  placeholder.hidden = true;
  content.hidden = false;
  content.innerHTML = '';

  const total = flashcardState.cards.length;

  flashcardState.cards.forEach((card, idx) => {
    const flashcardEl = document.createElement('div');
    flashcardEl.className = 'flashcard';
    flashcardEl.setAttribute('role', 'button');
    flashcardEl.setAttribute('tabindex', '0');
    flashcardEl.setAttribute('aria-label', `Flashcard ${idx + 1} of ${total}. Tag: ${card.tag || 'CONCEPT'}. Question: ${card.q}. Press Enter or click to flip.`);
    flashcardEl.style.animationDelay = `${idx * 0.08}s`;

    flashcardEl.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <div class="flashcard-header-bar">
            <div class="flashcard-badge">
              ${MASCOTS.studying}
              <span>Question ${idx + 1} of ${total}</span>
            </div>
            <span class="flashcard-tag">${card.tag || 'REVISION'}</span>
          </div>
          <div class="flashcard-body-content">
            <div class="flashcard-text">${card.q}</div>
          </div>
          <div class="flashcard-hint">
            <i data-lucide="rotate-cw" class="inline-icon"></i> Click card to flip & reveal answer
          </div>
        </div>
        <div class="flashcard-back">
          <div class="flashcard-header-bar">
            <div class="flashcard-badge">
              ${MASCOTS.celebrating}
              <span>Answer ${idx + 1}</span>
            </div>
            <span class="flashcard-tag">${card.tag || 'EXPLANATION'}</span>
          </div>
          <div class="flashcard-body-content">
            <div class="flashcard-text">${card.a.replace(/\n/g, '<br/>')}</div>
          </div>
          <div class="flashcard-hint">
            <i data-lucide="rotate-cw" class="inline-icon"></i> Click card to flip back to question
          </div>
        </div>
      </div>
    `;

    // Click handler to flip
    const flipHandler = () => {
      flashcardEl.classList.toggle('flipped');
      const isFlipped = flashcardEl.classList.contains('flipped');
      flashcardEl.setAttribute('aria-label', `Flashcard ${idx + 1} of ${total}. ${isFlipped ? 'Answer: ' + card.a : 'Question: ' + card.q}. Press Enter or click to flip.`);
    };

    flashcardEl.addEventListener('click', flipHandler);
    flashcardEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipHandler();
      }
    });

    content.appendChild(flashcardEl);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ================================================================
   11. SMART STUDY PLANNER FEATURE
   ================================================================ */

let studySubjects = [];

function initPlanner() {
  // Load saved subjects
  const saved = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
  if (saved) {
    try {
      studySubjects = JSON.parse(saved);
      renderSubjectList();
    } catch (e) { studySubjects = []; }
  }

  // Set min date to today
  const dateInput = $('planner-date');
  const today = new Date();
  today.setDate(today.getDate() + 1);
  dateInput.min = today.toISOString().split('T')[0];

  $('planner-add-btn').addEventListener('click', addSubject);
  $('planner-generate-btn').addEventListener('click', generatePlan);
  $('planner-clear-btn').addEventListener('click', clearPlanner);

  // Enter key on subject input
  $('planner-subject').addEventListener('keydown', e => {
    if (e.key === 'Enter') addSubject();
  });
}

function addSubject() {
  const name = $('planner-subject').value.trim();
  const priorityEl = $('planner-priority');
  const priority = priorityEl ? priorityEl.value : 'medium';
  const date = $('planner-date').value;
  const hours = $('planner-hours').value;

  if (!name) { showToast('Please enter a subject name.', 'warning'); $('planner-subject').focus(); return; }
  if (!date) { showToast('Please select an exam date.', 'warning'); $('planner-date').focus(); return; }
  if (!hours || hours < 0.5 || hours > 12) {
    showToast('Please enter valid study hours (0.5 – 12).', 'warning');
    $('planner-hours').focus();
    return;
  }

  // Check date is future
  const examDate = new Date(date);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  if (examDate <= today) {
    showToast('Exam date must be in the future.', 'warning');
    return;
  }

  studySubjects.push({ name, priority, examDate: date, dailyHours: parseFloat(hours) });
  saveSubjects();
  renderSubjectList();

  // Clear inputs
  $('planner-subject').value = '';
  $('planner-date').value = '';
  $('planner-hours').value = '';
  if (priorityEl) priorityEl.value = 'medium';
  $('planner-subject').focus();

  showToast(`${name} (${priority.toUpperCase()} Priority) added to plan!`, 'success', 2000);
}

function removeSubject(idx) {
  const name = studySubjects[idx].name;
  studySubjects.splice(idx, 1);
  saveSubjects();
  renderSubjectList();
  showToast(`${name} removed.`, 'info', 2000);
}

function saveSubjects() {
  localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(studySubjects));
}

function renderSubjectList() {
  const empty = $('subject-list-empty');
  const items = $('subject-items');
  items.innerHTML = '';

  if (studySubjects.length === 0) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  studySubjects.forEach((subj, idx) => {
    const colorClass = SUBJECT_COLORS[idx % SUBJECT_COLORS.length];
    const examDate = new Date(subj.examDate);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));
    const dateStr = examDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const priority = subj.priority || 'medium';
    const prioIcon = priority === 'high' ? '🔥 High' : (priority === 'low' ? '🌱 Low' : '⚡ Med');

    const item = document.createElement('div');
    item.className = 'subject-item';
    item.innerHTML = `
      <div class="subject-item-info">
        <span class="subject-item-name">
          <span class="day-subject-badge ${colorClass}" style="margin-right:0.4rem">${subj.name}</span>
          <span style="font-size:0.75rem;font-weight:700;padding:0.15rem 0.5rem;border-radius:9999px;background:rgba(37,99,235,0.1);color:var(--clr-primary);">${prioIcon} Priority</span>
        </span>
        <span class="subject-item-meta">
          <i data-lucide="calendar" class="inline-icon"></i> Exam: ${dateStr} &nbsp;|&nbsp; 
          <i data-lucide="clock" class="inline-icon"></i> ${subj.dailyHours}h/day &nbsp;|&nbsp; 
          <i data-lucide="hourglass" class="inline-icon"></i> ${daysLeft} day${daysLeft !== 1 ? 's' : ''} left
        </span>
      </div>
      <button class="subject-remove-btn" onclick="removeSubject(${idx})" aria-label="Remove ${subj.name}"><i data-lucide="x" style="width:14px;height:14px;"></i></button>
    `;
    items.appendChild(item);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

async function generatePlan() {
  if (studySubjects.length === 0) {
    showToast('Please add at least one subject first.', 'warning');
    return;
  }

  const btn = $('planner-generate-btn');
  showLoading(btn);
  await simulateDelay(700, 1200);

  try {
    const schedule = AI.generateStudyPlan(studySubjects);
    renderTimetable(schedule);
    showToast('Study plan generated and saved!', 'success');

    // Save plan to localStorage
    localStorage.setItem(STORAGE_KEYS.LAST_PLAN, JSON.stringify({
      subjects: studySubjects,
      generated: new Date().toISOString(),
    }));

    // Scroll to output
    $('planner-content').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (e) {
    showToast('Could not generate plan. Please check your inputs.', 'error');
    console.error(e);
  } finally {
    hideLoading(btn);
  }
}

function renderTimetable(schedule) {
  const placeholder = $('planner-placeholder');
  const content = $('planner-content');
  const output = $('planner-output');

  placeholder.hidden = false;
  content.hidden = false;
  content.innerHTML = '';
  output.classList.add('has-content');
  placeholder.hidden = true;

  // Summary stats
  const totalDays = schedule.length;
  const totalHrs = schedule.reduce((acc, day) => {
    return acc + day.sessions.filter(s => s.sessionType !== 'exam' && s.sessionType !== 'break').reduce((sum, s) => sum + s.hours, 0);
  }, 0);
  const highPrioCount = studySubjects.filter(s => (s.priority || 'medium') === 'high').length;

  const summary = document.createElement('div');
  summary.className = 'planner-summary';
  summary.innerHTML = `
    <h3><i data-lucide="calendar" class="inline-icon"></i> Personalized Study Timetable</h3>
    <div class="planner-summary-stats">
      <div class="plan-stat">
        <span class="plan-stat-label">Subjects</span>
        <span class="plan-stat-value">${studySubjects.length}</span>
      </div>
      <div class="plan-stat">
        <span class="plan-stat-label">High Prio</span>
        <span class="plan-stat-value">${highPrioCount}</span>
      </div>
      <div class="plan-stat">
        <span class="plan-stat-label">Plan Days</span>
        <span class="plan-stat-value">${totalDays}</span>
      </div>
      <div class="plan-stat">
        <span class="plan-stat-label">Total Study</span>
        <span class="plan-stat-value">${totalHrs.toFixed(1)}h</span>
      </div>
    </div>
  `;
  content.appendChild(summary);

  // Timetable rows grouped by Week
  const today = new Date(); today.setHours(0, 0, 0, 0);
  let currentWeek = 0;

  schedule.forEach((day, dayIdx) => {
    const weekNum = Math.floor(dayIdx / 7) + 1;
    if (weekNum !== currentWeek) {
      currentWeek = weekNum;
      const weekHeader = document.createElement('div');
      weekHeader.style.cssText = 'font-weight:800;font-size:0.85rem;color:var(--clr-primary);text-transform:uppercase;letter-spacing:0.08em;margin:1.2rem 0 0.4rem;display:flex;align-items:center;gap:0.4rem;border-bottom:1px solid var(--clr-border);padding-bottom:0.25rem;';
      weekHeader.innerHTML = `<i data-lucide="calendar-days" class="inline-icon"></i> Week ${weekNum}`;
      content.appendChild(weekHeader);
    }

    const isToday = day.date.toDateString() === today.toDateString();
    const isPast = day.date < today;
    const dateStr = day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const row = document.createElement('div');
    row.className = 'schedule-day';
    row.style.animationDelay = `${dayIdx * 0.03}s`;

    if (isToday) row.style.borderColor = 'var(--clr-primary)';
    if (isPast) row.style.opacity = '0.5';

    const sessionsHtml = day.sessions.map((sess, sIdx) => {
      if (sess.sessionType === 'exam') {
        return `<span class="day-subject-badge ${sess.colorClass}" style="animation-delay:${sIdx * 0.05}s; font-weight:800;"><i data-lucide="target" class="inline-icon"></i> ${sess.subject} (EXAM DAY)</span>`;
      }
      if (sess.sessionType === 'break') {
        return `<span class="day-subject-badge" style="background:rgba(245, 158, 11, 0.15);color:var(--clr-warning);border:1px solid rgba(245, 158, 11, 0.3);">${sess.sessionLabel}</span>`;
      }
      
      const prioTag = sess.priority === 'high' ? '🔥' : '';
      return `<span class="day-subject-badge ${sess.colorClass}" style="animation-delay:${sIdx * 0.05}s" title="${sess.sessionLabel}">${prioTag} ${sess.subject} <small>(${sess.sessionLabel})</small></span>`;
    }).join(' ');

    const hoursHtml = day.sessions
      .filter(s => s.sessionType !== 'exam' && s.sessionType !== 'break')
      .map(s => `${s.subject}: ${s.hours}h`)
      .join(' | ');

    row.innerHTML = `
      <span class="day-label" style="min-width:110px;">${isToday ? '<i data-lucide="map-pin" class="inline-icon"></i> Today' : dateStr}</span>
      <span style="display:flex;gap:0.4rem;flex-wrap:wrap;align-items:center;flex:1;">${sessionsHtml}</span>
      ${hoursHtml ? `<span class="day-hours" style="font-size:0.8rem;"><i data-lucide="clock" class="inline-icon"></i> ${hoursHtml}</span>` : ''}
    `;
    content.appendChild(row);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function clearPlanner() {
  if (studySubjects.length === 0) {
    showToast('No subjects to clear.', 'info', 2000);
    return;
  }
  studySubjects = [];
  saveSubjects();
  localStorage.removeItem(STORAGE_KEYS.LAST_PLAN);
  renderSubjectList();

  // Clear output
  const placeholder = $('planner-placeholder');
  const content = $('planner-content');
  const output = $('planner-output');
  placeholder.hidden = false;
  content.hidden = true;
  content.innerHTML = '';
  output.classList.remove('has-content');

  showToast('Planner cleared.', 'info', 2000);
}

/* ================================================================
   12. SMOOTH SCROLL ENHANCEMENT & ANIMATIONS
   ================================================================ */

function initAnimations() {
  // Intersection Observer for scroll-reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  // Animate tool cards, feature cards, section headers on scroll
  document.querySelectorAll('.tool-card, .feature-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    observer.observe(el);
  });
}

/* ================================================================
   13. KEYBOARD SHORTCUTS
   ================================================================ */

function initKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    // Alt + D → toggle dark mode
    if (e.altKey && e.key === 'd') {
      e.preventDefault();
      toggleTheme();
    }
    // Escape → close mobile menu
    if (e.key === 'Escape') {
      const hamburger = $('hamburger');
      const mobileMenu = $('mobile-menu');
      if (hamburger.classList.contains('open')) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    }
  });
}

/* ================================================================
   14. INIT – ENTRY POINT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initScrollTop();
  initParticles();
  initExplainer();
  initSummarizer();
  initQuiz();
  initFlashcards();
  initPlanner();
  initAnimations();
  initKeyboardShortcuts();

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Theme toggle button
  $('theme-toggle').addEventListener('click', toggleTheme);

  // Set today's date as minimum for date pickers
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(d => {
    if (!d.min) d.min = today;
  });

  console.log('%c🎓 SmartPrep AI', 'color:#2563eb;font-size:1.5rem;font-weight:900;font-family:Outfit,sans-serif');
  console.log('%cBuilt with ❤️ | Press Alt+D to toggle dark mode', 'color:#38bdf8;font-size:0.9rem');
});
