/* ================================================================
   StudyMate AI – script.js
   All application logic: AI engines, DOM management, Local Storage
   ================================================================ */

'use strict';

/* ================================================================
   1. CONSTANTS & CONFIGURATION
   ================================================================ */

const STORAGE_KEYS = {
  THEME: 'studymate_theme',
  SUBJECTS: 'studymate_subjects',
  LAST_PLAN: 'studymate_last_plan',
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
    const isCode = /code|program|python|java|c\+\+|c#|js|javascript|sql|api|web|script|html|css|php|ruby|swift|kotlin|rust|go|typescript/.test(lower);

    if (isCode) {
      return {
        definition: `${cap} is a technology or programming concept used in software development to build, structure, and execute programs or applications.`,
        keyConcepts: [
          `Syntax: The set of rules that define how ${cap} code is written and structured.`,
          `Variables and Data Types: How data is stored and manipulated in ${cap}.`,
          `Control Flow: Using if-else conditions, loops, and switch statements to control program execution.`
        ],
        features: [
          `Supports modular code organization through functions, classes, or modules.`,
          `Provides built-in error handling and debugging mechanisms.`
        ],
        functions: [
          `Used to write instructions that a computer can execute to perform specific tasks.`,
          `Enables data processing, user interaction, and system automation.`
        ],
        types: [
          `Frontend: Code that runs in the browser and handles user interface (HTML, CSS, JavaScript).`,
          `Backend: Server-side code that handles data, logic, and database operations.`,
          `Full-Stack: Combination of both frontend and backend development.`
        ],
        advantages: [
          `Automates repetitive tasks and reduces manual effort.`,
          `Enables building scalable applications that can handle large amounts of data.`
        ],
        disadvantages: [
          `Bugs and errors can be difficult to trace in large codebases.`,
          `Requires continuous learning as languages and frameworks evolve frequently.`
        ],
        syntax: `// Basic ${cap} example\n// Variable declaration\nlet value = 10;\n\n// Function definition\nfunction process(input) {\n  return input * 2;\n}\n\n// Function call\nconsole.log(process(value)); // Output: 20`,
        example: `Writing a function in ${cap} that takes user input, processes it, and returns a formatted result.`,
        examQuestions: [
          { q: `What is the difference between a compiler and an interpreter?`, a: `A compiler translates the entire source code into machine code before execution (e.g., C, C++). An interpreter translates and executes code line by line at runtime (e.g., Python, JavaScript).` },
          { q: `What are the four pillars of Object-Oriented Programming?`, a: `Encapsulation (data hiding), Inheritance (reusing parent class properties), Polymorphism (same method behaving differently), and Abstraction (hiding complex implementation details).` }
        ]
      };
    }

    return {
      definition: `${cap} is a subject area that deals with the study, analysis, and understanding of its core principles, theories, and real-world applications.`,
      keyConcepts: [
        `Basic Terminology: Understanding the key terms and definitions used in ${cap}.`,
        `Core Principles: The fundamental rules and laws that govern ${cap}.`,
        `Applications: How ${cap} concepts are applied in practical and real-world scenarios.`
      ],
      features: [
        `Covers both theoretical knowledge and practical applications.`,
        `Follows a structured approach from basic concepts to advanced topics.`
      ],
      functions: [
        `Helps in understanding natural phenomena, processes, or systems related to ${cap}.`,
        `Provides a foundation for advanced study and professional applications.`
      ],
      types: [
        `Theoretical: Focuses on concepts, laws, and mathematical models.`,
        `Applied: Focuses on practical usage in industry, research, or daily life.`
      ],
      advantages: [
        `Builds strong analytical and problem-solving skills.`,
        `Knowledge is applicable across multiple fields and career paths.`
      ],
      disadvantages: [
        `Some topics can be abstract and require strong foundational knowledge.`,
        `Practical application may require additional tools, equipment, or software.`
      ],
      syntax: null,
      example: `A student studying ${cap} applies core concepts to solve textbook problems and answer exam questions accurately.`,
      examQuestions: [
        { q: `Define ${cap} and state its importance.`, a: `${cap} is the systematic study of its core subject matter. It is important because it provides foundational knowledge required for advanced study, competitive exams, and real-world problem solving.` },
        { q: `List any four key features of ${cap}.`, a: `1. Based on established principles and theories. 2. Has both theoretical and practical components. 3. Widely used in academics and industry. 4. Follows a logical and structured learning path.` }
      ]
    };
  },

  /* ---- 2b. Notes Summarizer Engine ---- */
  summarizeNotes(text) {
    const sentences = text
      .replace(/\r\n/g, '\n')
      .split(/(?<=[.!?])\s+|(?<=\n)\s*(?=[A-Z])/g)
      .map(s => s.trim())
      .filter(s => s.length > 15);

    // Score sentences by importance signals
    const scored = sentences.map(sentence => {
      let score = 0;
      const lower = sentence.toLowerCase();

      // Definition signals — highest priority for exam revision
      if (/define|definition|is called|known as|refers to|is defined as|means/.test(lower)) score += 6;
      // Importance markers
      if (/important|key|main|essential|fundamental|critical|primary|significant|vital|major/.test(lower)) score += 5;
      // Cause-effect and reasoning
      if (/therefore|thus|hence|as a result|consequently|because|due to|leads to|causes/.test(lower)) score += 3;
      // Structural markers
      if (/first|second|third|finally|lastly|in conclusion|in summary|types of|kinds of|classified/.test(lower)) score += 3;
      // Imperative / rule statements
      if (/always|never|must|should|required|necessary|rule|law|principle|formula/.test(lower)) score += 3;
      // Examples and illustrations
      if (/example|for instance|such as|e\.g\.|like|including/.test(lower)) score += 2;
      // Comparison / difference signals
      if (/difference|unlike|whereas|compared to|distinction|on the other hand/.test(lower)) score += 2;
      // Prefer medium-length informative sentences
      if (sentence.length > 40 && sentence.length < 200) score += 1;
      // Numeric data often important
      if (/\d+/.test(sentence)) score += 1;

      return { sentence, score };
    });

    const sortedSentences = [...scored].sort((a, b) => b.score - a.score);
    const topCount = Math.min(6, Math.max(3, Math.ceil(sentences.length * 0.35)));
    const topSentences = sortedSentences.slice(0, topCount).map(s => s.sentence);

    // 1. Short Summary — combine the two highest-scoring sentences
    const shortSummary = topSentences.slice(0, 2).join(' ') || (sentences.slice(0, 2).join(' ') || text.slice(0, 150) + '...');

    // 2. Key Points
    const keyPoints = topSentences.length > 0 ? topSentences : sentences.slice(0, 4);

    // 3. Extract Keywords — filter out common stop words and filler words
    const words = text.match(/\b[A-Z][a-z]{2,}\b|\b[a-z]{4,}\b/g) || [];
    const stopWords = /which|where|there|their|these|those|should|always|before|after|between|through|during|about|would|could|being|other|every|under|above|below|along|since|while|still|using|used|also|from|with|into|that|this|have|been|were|will|they|them|each|some|than|then|when|what|more|most|only|very|such|just|like|make|made|does|done|much|many|well|back|even|give|over|both|come|take|good|long|know|help|tell|call|find|here|look|want|first|last|next|came|seem/;
    const freq = {};
    words.forEach(w => {
      const lower = w.toLowerCase();
      if (!stopWords.test(lower)) {
        freq[lower] = (freq[lower] || 0) + 1;
      }
    });
    // Sort by frequency and pick top keywords, preserving original casing
    const keywordEntries = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8);
    const keywords = keywordEntries.map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

    // 4. Memory Tip / Mnemonic
    let memoryTip = 'Read the key points aloud and try to explain them in your own words without looking at the notes.';
    if (keywords.length >= 3) {
      const mnemonicWords = keywords.slice(0, 5);
      const letters = mnemonicWords.map(k => k.charAt(0).toUpperCase()).join('');
      memoryTip = `Remember "${letters}" — ${mnemonicWords.join(', ')}. Create a sentence using these initials to recall the key concepts quickly.`;
    }

    // 5. Important Exam Point — pick the most important definition or rule
    const definitionSentence = scored.find(s => /define|definition|is called|known as|refers to|is defined as/.test(s.sentence.toLowerCase()));
    const examPoint = definitionSentence
      ? definitionSentence.sentence
      : (sortedSentences[0] ? sortedSentences[0].sentence : 'Focus on learning exact definitions and key differences between related concepts.');

    // 6. Quick Revision Tips — contextual based on note content
    const lower = text.toLowerCase();
    const revisionTips = [];
    if (/definition|define|is called|known as/.test(lower)) {
      revisionTips.push('Memorize all definitions word-by-word — they are commonly asked in exams.');
    }
    if (/difference|compare|unlike|whereas/.test(lower)) {
      revisionTips.push('Make a comparison table for differences mentioned in the notes.');
    }
    if (/formula|equation|calculate|compute/.test(lower)) {
      revisionTips.push('Write down all formulas separately and practice solving numerical problems.');
    }
    if (/example|for instance|such as|e\.g/.test(lower)) {
      revisionTips.push('Learn at least one example for each concept — examiners often ask for examples.');
    }
    if (/advantage|disadvantage|benefit|limitation|drawback/.test(lower)) {
      revisionTips.push('List advantages and disadvantages in a two-column table for quick recall.');
    }
    // Always include these general tips
    revisionTips.push('Cover the notes and try to write the key points from memory.');
    revisionTips.push('Revise these points again 24 hours before the exam for best retention.');
    if (revisionTips.length < 4) {
      revisionTips.push('Practice writing short 2-line answers for each key point.');
    }

    return {
      shortSummary,
      keyPoints,
      keywords: keywords.length > 0 ? keywords : ['Definition', 'Concept', 'Feature', 'Application'],
      memoryTip,
      examPoint,
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
    const isCode = /code|program|python|java|c\+\+|c#|js|javascript|sql|api|web|script|html|css|php|ruby|swift|kotlin|rust|go|typescript/.test(lower);

    if (isCode) {
      return [
        {
          q: `What is ${cap} primarily used for?`,
          options: [
            'Writing and executing computer programs',
            'Designing hardware circuits',
            'Managing accounting records',
            'Creating physical prototypes'
          ],
          answer: 0,
          explanation: `${cap} is a programming technology used for writing, testing, and executing software programs.`
        },
        {
          q: `Which of the following is a valid data type in most programming languages?`,
          options: [
            'Paragraph',
            'Integer',
            'Document',
            'Slide'
          ],
          answer: 1,
          explanation: 'Integer (int) is a fundamental data type used to store whole numbers in most programming languages.'
        },
        {
          q: `What is a function in programming?`,
          options: [
            'A reusable block of code that performs a specific task',
            'A type of variable that stores text',
            'A file format for saving programs',
            'A hardware component of the computer'
          ],
          answer: 0,
          explanation: 'A function is a named, reusable block of code designed to perform a particular task, improving code organization and reusability.'
        },
        {
          q: `What does the term "debugging" mean?`,
          options: [
            'Adding new features to software',
            'Finding and fixing errors in code',
            'Deleting old programs',
            'Installing software updates'
          ],
          answer: 1,
          explanation: 'Debugging is the process of identifying, analyzing, and removing errors (bugs) from a program.'
        },
        {
          q: `Which symbol is commonly used for single-line comments in JavaScript, Java, and C++?`,
          options: [
            '<!-- -->',
            '//',
            '##',
            '**'
          ],
          answer: 1,
          explanation: 'The double forward slash (//) is used for single-line comments in JavaScript, Java, C, C++, and many other languages.'
        }
      ];
    }

    // Theory / general topic quiz
    return [
      {
        q: `What is the correct definition of ${cap}?`,
        options: [
          `The study and application of core principles related to ${cap}`,
          `A branch of fine arts and music composition`,
          `A cooking technique used in food science`,
          `A type of physical exercise routine`
        ],
        answer: 0,
        explanation: `${cap} involves the study of its fundamental principles, theories, and their applications.`
      },
      {
        q: `Which of the following is a key feature of ${cap}?`,
        options: [
          'It is only useful for entertainment purposes',
          'It follows a systematic and structured approach',
          'It has no practical applications',
          'It cannot be studied in schools or colleges'
        ],
        answer: 1,
        explanation: `${cap} follows a structured approach based on established principles and methodologies.`
      },
      {
        q: `What is one major advantage of studying ${cap}?`,
        options: [
          'It helps develop analytical and problem-solving skills',
          'It guarantees immediate financial rewards',
          'It requires no effort or practice',
          'It is unrelated to any career field'
        ],
        answer: 0,
        explanation: `Studying ${cap} builds analytical thinking, problem-solving abilities, and domain-specific knowledge.`
      },
      {
        q: `${cap} can be classified into which of the following categories?`,
        options: [
          'Theoretical and Applied',
          'Hot and Cold',
          'Liquid and Solid',
          'Indoor and Outdoor'
        ],
        answer: 0,
        explanation: `Most academic subjects including ${cap} can be broadly classified into theoretical (concept-based) and applied (practical) categories.`
      },
      {
        q: `Which of the following is the best way to prepare ${cap} for exams?`,
        options: [
          'Memorize everything without understanding',
          'Learn definitions, understand concepts, and practice questions',
          'Only read the chapter headings',
          'Skip the subject entirely'
        ],
        answer: 1,
        explanation: 'Effective exam preparation involves understanding definitions, grasping core concepts, and practicing previous year questions.'
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

    // Loop day-by-day until all exams are over
    const currentDate = new Date(today);
    while (currentDate <= maxExamDate) {
      // Find subjects whose exam is exactly on currentDate
      const examSubjects = subjects.filter(s => {
        const d = new Date(s.examDate);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === currentDate.getTime();
      });

      // Find subjects whose exam is in the future relative to currentDate
      const activeSubjects = subjects.filter(s => {
        const d = new Date(s.examDate);
        d.setHours(0, 0, 0, 0);
        return currentDate < d;
      });

      const sessions = [];

      // Add exam markers for today
      examSubjects.forEach(s => {
        const colorClass = SUBJECT_COLORS[subjects.indexOf(s) % SUBJECT_COLORS.length];
        sessions.push({
          subject: s.name,
          hours: 0,
          colorClass,
          daysLeft: 0,
          isExamDay: true
        });
      });

      // Distribute total daily capacity among active subjects
      if (activeSubjects.length > 0) {
        let totalWeight = 0;
        const weights = activeSubjects.map(s => {
          const examD = new Date(s.examDate);
          examD.setHours(0, 0, 0, 0);
          const daysLeft = Math.max(1, Math.ceil((examD - currentDate) / (1000 * 60 * 60 * 24)));
          // Weight function: inverse square of days remaining multiplied by base preference hours
          const weight = parseFloat(s.dailyHours) / Math.pow(daysLeft, 2);
          totalWeight += weight;
          return { subject: s, weight, daysLeft };
        });

        // Allocate hours based on weights
        const rawAllocations = weights.map(item => {
          const rawHours = totalCapacity * (item.weight / totalWeight);
          // Round to nearest 0.5 hours
          const hours = Math.round(rawHours * 2) / 2;
          return {
            subject: item.subject,
            hours,
            daysLeft: item.daysLeft
          };
        });

        // If all subjects get rounded down to 0 but we have totalCapacity, allocate to the highest priority
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

        // Add active subjects with hours > 0
        rawAllocations.forEach(item => {
          if (item.hours > 0) {
            const colorClass = SUBJECT_COLORS[subjects.indexOf(item.subject) % SUBJECT_COLORS.length];
            sessions.push({
              subject: item.subject.name,
              hours: item.hours,
              colorClass,
              daysLeft: item.daysLeft,
              isExamDay: false
            });
          }
        });
      }

      // Add to plan if we have any session
      if (sessions.length > 0) {
        plan.push({
          date: new Date(currentDate),
          sessions: sessions
        });
      }

      // Increment day
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

/* ================================================================
   3. DOM UTILITIES
   ================================================================ */

function $(id) { return document.getElementById(id); }

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

      const keyPointsHtml = data.keyPoints
        .map((p, i) => `<div class="summary-point" style="animation-delay:${i * 0.05}s"><span><i data-lucide="check" class="inline-icon" style="color:var(--clr-success)"></i></span><span>${p}</span></div>`)
        .join('');

      const keywordsHtml = data.keywords
        .map(kw => `<span style="font-size:0.75rem;font-weight:700;padding:0.2rem 0.6rem;border-radius:var(--radius-full);background:rgba(56,189,248,0.12);color:var(--clr-primary);border:1px solid rgba(56,189,248,0.25);">${kw}</span>`)
        .join(' ');

      const revisionTipsHtml = data.revisionTips
        .map(tip => `<li>${tip}</li>`)
        .join('');

      const wordCount = text.split(/\s+/).length;
      const html = `
        <div class="output-topic-title"><i data-lucide="file-text" class="inline-icon"></i> Notes Summary & Exam Digest (~${wordCount} words analyzed)</div>

        <!-- 1. Short Summary -->
        <div style="margin-bottom:1.2rem;">
          <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.3rem;">Short Summary</div>
          <p class="output-intro" style="line-height:1.6;margin-bottom:0;">${data.shortSummary}</p>
        </div>

        <!-- 2. Key Points -->
        <div style="margin-bottom:1.2rem;">
          <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.4rem;">Key Points</div>
          <div class="output-summary-section">${keyPointsHtml}</div>
        </div>

        <!-- 3. Important Keywords -->
        <div style="margin-bottom:1.2rem;">
          <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.4rem;">Important Keywords</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;">${keywordsHtml}</div>
        </div>

        <!-- 4. Memory Tip / Mnemonic -->
        ${data.memoryTip ? `
        <div style="margin-bottom:1.2rem;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.25);padding:0.75rem 1rem;border-radius:var(--radius-md);">
          <div style="font-weight:700;font-size:0.85rem;color:#f59e0b;margin-bottom:0.25rem;display:flex;align-items:center;gap:0.4rem;">
            <i data-lucide="lightbulb" class="inline-icon"></i> Memory Tip / Mnemonic
          </div>
          <div style="font-size:0.9rem;color:var(--clr-text-primary);">${data.memoryTip}</div>
        </div>` : ''}

        <!-- 5. Important Exam Point -->
        <div style="margin-bottom:1.2rem;background:rgba(37,99,235,0.08);border:1px solid rgba(37,99,235,0.25);padding:0.75rem 1rem;border-radius:var(--radius-md);">
          <div style="font-weight:700;font-size:0.85rem;color:var(--clr-primary);margin-bottom:0.25rem;display:flex;align-items:center;gap:0.4rem;">
            <i data-lucide="target" class="inline-icon"></i> Important Exam Point
          </div>
          <div style="font-size:0.9rem;color:var(--clr-text-primary);font-weight:500;">${data.examPoint}</div>
        </div>

        <!-- 6. Quick Revision Tips -->
        <div style="margin-bottom:0.5rem;">
          <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.4rem;">Quick Revision Tips</div>
          <ul class="output-key-points">${revisionTipsHtml}</ul>
        </div>
      `;

      showOutput('summarizer-placeholder', 'summarizer-content', output, html);
      if (window.lucide) {
        window.lucide.createIcons();
      }
      showToast(`Summarized into ${data.keyPoints.length} key points!`, 'success');
    } catch (e) {
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

  studySubjects.push({ name, examDate: date, dailyHours: parseFloat(hours) });
  saveSubjects();
  renderSubjectList();

  // Clear inputs
  $('planner-subject').value = '';
  $('planner-date').value = '';
  $('planner-hours').value = '';
  $('planner-subject').focus();

  showToast(`${name} added to your plan!`, 'success', 2000);
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

    const item = document.createElement('div');
    item.className = 'subject-item';
    item.innerHTML = `
      <div class="subject-item-info">
        <span class="subject-item-name">
          <span class="day-subject-badge ${colorClass}" style="margin-right:0.4rem">${subj.name}</span>
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
  // Calculate total study hours dynamically based on generated plan
  const totalHrs = schedule.reduce((acc, day) => {
    return acc + day.sessions.filter(s => !s.isExamDay).reduce((sum, s) => sum + s.hours, 0);
  }, 0);

  const summary = document.createElement('div');
  summary.className = 'planner-summary';
  summary.innerHTML = `
    <h3><i data-lucide="trending-up" class="inline-icon"></i> Your Personalized Study Plan</h3>
    <div class="planner-summary-stats">
      <div class="plan-stat">
        <span class="plan-stat-label">Subjects</span>
        <span class="plan-stat-value">${studySubjects.length}</span>
      </div>
      <div class="plan-stat">
        <span class="plan-stat-label">Plan Days</span>
        <span class="plan-stat-value">${totalDays}</span>
      </div>
      <div class="plan-stat">
        <span class="plan-stat-label">Total Hours</span>
        <span class="plan-stat-value">${totalHrs.toFixed(1)}h</span>
      </div>
      <div class="plan-stat">
        <span class="plan-stat-label">Saved</span>
        <span class="plan-stat-value" style="font-size:1rem;display:flex;align-items:center;gap:4px;"><i data-lucide="check-circle" class="inline-icon" style="color:var(--clr-success);margin-right:0;"></i> Yes</span>
      </div>
    </div>
  `;
  content.appendChild(summary);

  // Timetable rows
  const today = new Date(); today.setHours(0, 0, 0, 0);

  schedule.forEach((day, dayIdx) => {
    const isToday = day.date.toDateString() === today.toDateString();
    const isPast = day.date < today;
    const dateStr = day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const row = document.createElement('div');
    row.className = 'schedule-day';
    row.style.animationDelay = `${dayIdx * 0.05}s`;

    if (isToday) row.style.borderColor = 'var(--clr-primary)';
    if (isPast) row.style.opacity = '0.5';

    const sessionsHtml = day.sessions.map((sess, sIdx) => {
      if (sess.isExamDay) {
        return `<span class="day-subject-badge ${sess.colorClass}" style="animation-delay:${sIdx * 0.05}s"><i data-lucide="target" class="inline-icon"></i> ${sess.subject} EXAM</span>`;
      }
      return `<span class="day-subject-badge ${sess.colorClass}" style="animation-delay:${sIdx * 0.05}s">${sess.subject}</span>`;
    }).join(' ');

    const hoursHtml = day.sessions
      .filter(s => !s.isExamDay)
      .map(s => `${s.subject}: ${s.hours}h`)
      .join(' | ');

    row.innerHTML = `
      <span class="day-label">${isToday ? '<i data-lucide="map-pin" class="inline-icon"></i> Today' : dateStr}</span>
      <span style="display:flex;gap:0.4rem;flex-wrap:wrap;align-items:center">${sessionsHtml}</span>
      ${hoursHtml ? `<span class="day-hours"><i data-lucide="clock" class="inline-icon"></i> ${hoursHtml}</span>` : ''}
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

  console.log('%c🎓 StudyMate AI', 'color:#2563eb;font-size:1.5rem;font-weight:900;font-family:Outfit,sans-serif');
  console.log('%cBuilt with ❤️ | Press Alt+D to toggle dark mode', 'color:#38bdf8;font-size:0.9rem');
});
