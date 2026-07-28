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
  QUIZ_HISTORY: 'smartprep_quiz_history',
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

    /* ---- Universal Academic Subject Detector ---- */
  detectSubject(topic) {
    const lower = topic.toLowerCase().trim();

    // Programming / Computer Science / OOP
    const isCS = /\b(code|coding|program|programming|python|java|c\+\+|cpp|c#|js|javascript|sql|api|web|script|html|css|php|ruby|swift|kotlin|rust|golang|go|typescript|database|dbms|operating system|os|algorithm|algorithms|data structure|data structures|network|networking|cyber|security|software|oop|oops|inheritance|polymorphism|encapsulation|abstraction|class|classes|pointer|pointers|array|arrays|function|functions|compiler|dev|machine learning|ai|artificial intelligence)\b/i.test(lower);
    
    // Mathematics
    const isMath = /\b(math|mathematics|calculus|algebra|geometry|trigonometry|pythagoras|pythagorean|theorem|theorems|matrix|matrices|vector|vectors|derivative|derivatives|integral|integrals|probability|statistics|equation|equations|arithmetic|number|numbers|logarithm|permutation|combination|fraction|differential)\b/i.test(lower);
    
    // Physics
    const isPhys = /\b(physics|force|forces|motion|energy|velocity|gravity|mass|momentum|wave|waves|optics|electric|electricity|magnetic|magnetism|thermodynamics|quantum|relativity|kinematics|friction|photon|photons|circuit|circuits|voltage|current|resistance|capacitance|nuclear|newton|newtons)\b/i.test(lower);
    
    // Chemistry
    const isChem = /\b(chemistry|acid|acids|base|bases|reaction|reactions|element|elements|compound|compounds|molecule|molecules|periodic table|stoichiometry|organic|inorganic|bond|bonding|atom|atoms|solution|solutions|catalyst|oxidation|reduction|mole|moles|molar|polymer|titration|electrochemistry)\b/i.test(lower);
    
    // Biology & Biochemistry
    const isBio = /\b(biology|biochemistry|cell|cells|genetics|dna|rna|organism|organisms|botany|zoology|anatomy|physiology|ecosystem|ecosystems|evolution|enzyme|enzymes|protein|proteins|photosynthesis|mitosis|meiosis|neuron|neurons|metabolism|amino acid|respiration|carbohydrate|lipid|lipids|gene|genes|chromosome|chromosomes)\b/i.test(lower);
    
    // History
    const isHist = /\b(history|historical|war|wars|revolution|revolutions|french revolution|industrial revolution|empire|empires|century|king|queen|reign|dynasty|dynasties|battle|battles|treaty|civilization|colonial|independence|movement|ancient|medieval|world war|renaissance|archaeology)\b/i.test(lower);
    
    // Geography
    const isGeo = /\b(geography|climate|map|maps|river|rivers|mountain|mountains|tectonic|plate tectonics|earth|ocean|oceans|continent|continents|population|atmosphere|soil|biomes|latitude|longitude|glacier|volcano|volcanoes|weather|topography|monsoon|landform|landforms)\b/i.test(lower);
    
    // Economics
    const isEcon = /\b(economic|economics|microeconomic|microeconomics|macroeconomic|macroeconomics|market|markets|gdp|inflation|elasticity|monopoly|demand|supply|fiscal|monetary|currency|trade|banking|revenue|utility|capitalism|socialism|budget|poverty)\b/i.test(lower);
    
    // Political Science
    const isPol = /\b(politic|politics|political|constitution|democracy|government|parliament|judiciary|rights|state|election|elections|governance|citizenship|policy|legislature|sovereign|liberty|justice|monarchy|executive|federalism)\b/i.test(lower);
    
    // Commerce & Accountancy
    const isComm = /\b(commerce|account|accounting|accountancy|finance|business|audit|auditing|ledger|balance sheet|taxation|debit|credit|marketing|management|asset|assets|liability|liabilities|stock|stocks|capital|entrepreneur|invoice|profit|loss|journal|depreciation)\b/i.test(lower);
    
    // Environmental Science
    const isEnv = /\b(environment|environmental|pollution|sustainability|biodiversity|conservation|climate change|renewable|waste management|global warming|deforestation|ozone|ecology|greenhouse|carbon)\b/i.test(lower);
    
    // English & Literature
    const isEng = /\b(english|literature|poem|poetry|novel|drama|play|shakespeare|shakespear|metaphor|character|prose|fiction|theme|narrative|author|literary|sonnet|rhetoric|grammar|syntax|verb|noun|adjective|tenses|idiom|vocabulary)\b/i.test(lower);
    
    // Hindi
    const isHindi = /\b(hindi|vyakaran|sahitya|kabir|tulsi|surdas|kavita|nibandh|bhasha|upanyas|muhavare|sandhi|samash|ras|chhand|alankar)\b/i.test(lower);
    
    // General Knowledge
    const isGK = /\b(general knowledge|gk|current affairs|world trivia|inventions|discoveries|first in world|headquarters|national park|awards|capitals|currencies|symbols)\b/i.test(lower);

    const isProgramming = isCS || /^\s*(c|java|python|cpp|c\+\+|javascript|js|html|css|sql|oop|oops|inheritance)\s*$/i.test(lower);

    let subjectName = 'General Academic Subject';
    if (isCS) subjectName = 'Computer Science & Programming';
    else if (isHist) subjectName = 'History';
    else if (isBio) subjectName = 'Biology & Biochemistry';
    else if (isMath) subjectName = 'Mathematics';
    else if (isPhys) subjectName = 'Physics';
    else if (isChem) subjectName = 'Chemistry';
    else if (isGeo) subjectName = 'Geography';
    else if (isEcon) subjectName = 'Economics';
    else if (isPol) subjectName = 'Political Science';
    else if (isComm) subjectName = 'Commerce & Accountancy';
    else if (isEnv) subjectName = 'Environmental Science';
    else if (isEng) subjectName = 'English & Literature';
    else if (isHindi) subjectName = 'Hindi Language & Literature';
    else if (isGK) subjectName = 'General Knowledge';

    return { subjectName, isProgramming };
  },


  /* ---- 2a. Topic Explainer Engine ---- */
  explainTopic(topic) {
    const t = topic.trim().toLowerCase();
    const sub = this.detectSubject(topic);

    /* ──────────────────────────────────────────────────────────────────
       CURATED KNOWLEDGE BASE — rich, specific entries for popular topics
       across ALL academic subjects. Each entry contains real definitions,
       real examples, and subject-accurate content.
       ────────────────────────────────────────────────────────────────── */
    const knowledgeBase = {

      /* ═══════ COMPUTER SCIENCE & PROGRAMMING ═══════ */
      c: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It provides low-level memory access via pointers, minimal runtime overhead, and a small set of keywords, making it ideal for systems programming.',
        easyExplanation: 'Think of C as talking directly to the computer\'s hardware. Unlike modern languages that hide memory details, C lets you allocate, access, and free memory manually using pointers — giving you complete control but also complete responsibility.',
        syntax: `#include <stdio.h>\n\nint main() {\n    int num = 42;\n    printf("Value: %d\\n", num);\n    return 0;\n}`,
        example: 'Dynamic memory allocation: int *arr = (int*) malloc(10 * sizeof(int)); — allocates space for 10 integers on the heap. Always free with free(arr); to prevent memory leaks.',
        importantKeywords: ['Pointers & Addresses', 'malloc() / free()', 'Structures & Unions', 'Header Files (#include)', 'Compiled Language'],
        memoryTips: 'Remember "C = Control": You Control memory (malloc/free), Control flow (if/for/while), and Control hardware (pointers). If you forget free(), you leak!',
        quickSummary: ['Procedural compiled language created in 1972 by Dennis Ritchie.', 'Direct hardware access via pointers and manual memory management.', 'Foundation for C++, Java, and modern operating systems like Linux.'],
        keyConcepts: ['Pointers: Variables that store memory addresses, accessed with * and & operators.', 'Manual Memory: malloc() allocates heap memory; free() releases it.', 'Structs: Group related variables of different types into one record.']
      },

      'c++': {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'C++ is a general-purpose programming language created by Bjarne Stroustrup in 1979 as an extension of C. It adds object-oriented programming (classes, inheritance, polymorphism) while retaining C\'s low-level capabilities.',
        easyExplanation: 'C++ is like C with superpowers. It keeps all of C\'s speed and hardware control but adds the ability to organize code into classes and objects — making large programs easier to manage.',
        syntax: `#include <iostream>\nusing namespace std;\n\nclass Animal {\npublic:\n    string name;\n    void speak() { cout << name << " says hello!" << endl; }\n};\n\nint main() {\n    Animal a;\n    a.name = "Dog";\n    a.speak();\n    return 0;\n}`,
        example: 'Inheritance in C++: class Dog : public Animal { } — Dog inherits all public members of Animal and can override virtual functions for polymorphism.',
        importantKeywords: ['Classes & Objects', 'Inheritance & Polymorphism', 'STL (Standard Template Library)', 'Constructors & Destructors', 'Virtual Functions'],
        memoryTips: 'C++ = C + Classes. Remember the four OOP pillars: "A PIE" = Abstraction, Polymorphism, Inheritance, Encapsulation.',
        quickSummary: ['Extension of C with object-oriented programming features.', 'Supports both procedural and OOP paradigms.', 'Used in game engines, browsers, and system software.'],
        keyConcepts: ['OOP: Organize code into classes with data and methods together.', 'STL: Ready-made containers (vector, map) and algorithms (sort, find).', 'Memory: Supports both manual (new/delete) and smart pointers.']
      },

      cpp: { get subjectName() { return knowledgeBase['c++'].subjectName; }, get isProgramming() { return knowledgeBase['c++'].isProgramming; }, get definition() { return knowledgeBase['c++'].definition; }, get easyExplanation() { return knowledgeBase['c++'].easyExplanation; }, get syntax() { return knowledgeBase['c++'].syntax; }, get example() { return knowledgeBase['c++'].example; }, get importantKeywords() { return knowledgeBase['c++'].importantKeywords; }, get memoryTips() { return knowledgeBase['c++'].memoryTips; }, get quickSummary() { return knowledgeBase['c++'].quickSummary; }, get keyConcepts() { return knowledgeBase['c++'].keyConcepts; } },

      java: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Java is a high-level, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems (1995). Its "Write Once, Run Anywhere" principle means compiled bytecode runs on any platform with a JVM.',
        easyExplanation: 'Java is like a universal translator for computers. You write code once, and the Java Virtual Machine (JVM) translates it for any operating system — Windows, Mac, or Linux — without rewriting a single line.',
        syntax: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, SmartPrep AI!");\n    }\n}`,
        example: 'Creating a dynamic list: ArrayList<String> names = new ArrayList<>(); names.add("Alice"); Collections.sort(names); — stores objects dynamically and sorts them.',
        importantKeywords: ['JVM & Bytecode', 'OOP (Encapsulation, Inheritance, Polymorphism)', 'Garbage Collection', 'Platform Independence', 'Exception Handling'],
        memoryTips: 'WORA = Write Once, Run Anywhere. Java compiles to bytecode (.class files) → JVM executes it on any platform. GC = Garbage Collector auto-frees unused memory.',
        quickSummary: ['Object-oriented language running on JVM bytecode.', 'Automatic memory management via garbage collection.', 'Powers Android apps, enterprise backends, and big data systems.'],
        keyConcepts: ['JVM: Executes platform-independent bytecode on any OS.', 'OOP Pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.', 'Exception Handling: try-catch-finally blocks manage runtime errors.']
      },

      python: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Python is an interpreted, high-level, dynamically-typed programming language created by Guido van Rossum in 1991. It emphasizes code readability with significant whitespace and supports multiple paradigms (procedural, OOP, functional).',
        easyExplanation: 'Python reads almost like English. Instead of curly braces, it uses indentation. Variables don\'t need type declarations — Python figures out types automatically. Its huge library ecosystem makes it the go-to language for AI, data science, and web development.',
        syntax: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("SmartPrep"))  # Output: Hello, SmartPrep!`,
        example: 'List comprehension: squares = [x**2 for x in range(10) if x % 2 == 0] — creates [0, 4, 16, 36, 64] in a single readable line.',
        importantKeywords: ['Dynamic Typing', 'Interpreted Language', 'List Comprehensions', 'pip & Libraries', 'Indentation-Based Syntax'],
        memoryTips: 'Python = "Readability First". No semicolons, no curly braces — just clean indentation. Remember: def for functions, class for OOP, import for libraries.',
        quickSummary: ['High-level interpreted language with clean, readable syntax.', 'Dynamic typing — no need to declare variable types.', 'Dominant in AI, Machine Learning, Data Science, and Web (Django/Flask).'],
        keyConcepts: ['Interpreted: Code runs line-by-line via the Python interpreter.', 'Dynamic Typing: x = 5 (int), x = "hello" (str) — type changes automatically.', 'Rich Ecosystem: NumPy, Pandas, TensorFlow, Django, Flask, and 300k+ packages.']
      },

      javascript: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web. It enables interactive web pages and runs in browsers as well as servers (Node.js).',
        easyExplanation: 'If HTML is the skeleton of a website and CSS is the skin, JavaScript is the brain — it makes websites interactive. Click a button, submit a form, animate an element? That\'s all JavaScript.',
        syntax: `// Variables and functions\nconst greet = (name) => \`Hello, \${name}!\`;\nconsole.log(greet("SmartPrep")); // Hello, SmartPrep!`,
        example: 'DOM manipulation: document.getElementById("btn").addEventListener("click", () => { alert("Clicked!"); }); — adds interactivity to HTML elements.',
        importantKeywords: ['DOM Manipulation', 'Event Listeners', 'ES6+ (Arrow Functions, Promises)', 'Async/Await', 'Node.js'],
        memoryTips: 'JS = "The Language of the Web". Frontend (React, Vue) + Backend (Node.js) + Mobile (React Native). Remember: var (old) → let/const (modern).',
        quickSummary: ['Core web technology enabling interactive, dynamic websites.', 'Runs in browsers (client-side) and servers (Node.js).', 'ES6+ introduced let/const, arrow functions, promises, and modules.'],
        keyConcepts: ['DOM: Document Object Model — JS reads and modifies HTML elements.', 'Events: User interactions (click, submit, keypress) trigger JavaScript functions.', 'Async: Promises and async/await handle non-blocking operations like API calls.']
      },

      js: { get subjectName() { return knowledgeBase.javascript.subjectName; }, get isProgramming() { return knowledgeBase.javascript.isProgramming; }, get definition() { return knowledgeBase.javascript.definition; }, get easyExplanation() { return knowledgeBase.javascript.easyExplanation; }, get syntax() { return knowledgeBase.javascript.syntax; }, get example() { return knowledgeBase.javascript.example; }, get importantKeywords() { return knowledgeBase.javascript.importantKeywords; }, get memoryTips() { return knowledgeBase.javascript.memoryTips; }, get quickSummary() { return knowledgeBase.javascript.quickSummary; }, get keyConcepts() { return knowledgeBase.javascript.keyConcepts; } },

      sql: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'SQL (Structured Query Language) is a domain-specific language used to manage and query relational databases. It allows creating, reading, updating, and deleting data stored in structured tables.',
        easyExplanation: 'SQL is the language you use to talk to databases. Want to find all students who scored above 90? SQL lets you ask the database that question in a structured way using SELECT, WHERE, and other commands.',
        syntax: `SELECT name, marks FROM students\nWHERE marks > 90\nORDER BY marks DESC;`,
        example: 'JOIN example: SELECT s.name, c.course_name FROM students s INNER JOIN courses c ON s.course_id = c.id; — combines data from two related tables.',
        importantKeywords: ['SELECT / FROM / WHERE', 'JOIN (INNER, LEFT, RIGHT)', 'GROUP BY & HAVING', 'PRIMARY KEY & FOREIGN KEY', 'CRUD Operations'],
        memoryTips: 'SQL operations = CRUD: Create (INSERT), Read (SELECT), Update (UPDATE), Delete (DELETE). Remember JOINs connect tables like bridges!',
        quickSummary: ['Standard language for managing relational databases.', 'Core commands: SELECT, INSERT, UPDATE, DELETE.', 'JOINs combine data from multiple related tables.'],
        keyConcepts: ['Queries: SELECT retrieves data; WHERE filters rows; ORDER BY sorts results.', 'JOINs: Combine rows from two or more tables based on related columns.', 'Normalization: Organizing tables to reduce redundancy and improve integrity.']
      },

      html: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It defines the structure and content of a webpage using elements represented by tags like <div>, <p>, <h1>, etc.',
        easyExplanation: 'HTML is the skeleton of every website. It tells the browser what content to display — headings, paragraphs, images, links, and forms. Without HTML, there would be no web pages.',
        syntax: `<!DOCTYPE html>\n<html>\n<head><title>My Page</title></head>\n<body>\n  <h1>Hello World</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>`,
        example: 'Creating a form: <form action="/submit"><input type="text" name="name"><button type="submit">Send</button></form> — collects user input.',
        importantKeywords: ['Tags & Elements', 'Attributes (id, class, src)', 'Semantic HTML (header, nav, main)', 'Forms & Inputs', 'DOCTYPE Declaration'],
        memoryTips: 'HTML = "HyperText Markup Language". Every tag opens <tag> and closes </tag>. Semantic tags tell the browser what content means, not just how it looks.',
        quickSummary: ['Standard markup language for web page structure.', 'Uses tags (<h1>, <p>, <div>) to define content.', 'HTML5 added semantic elements: <header>, <nav>, <article>, <footer>.'],
        keyConcepts: ['Elements: Building blocks like headings, paragraphs, images, and links.', 'Attributes: id, class, src, href — provide additional info to elements.', 'Semantic HTML: <header>, <main>, <footer> improve accessibility and SEO.']
      },

      css: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of HTML documents. It controls layout, colors, fonts, spacing, animations, and responsive design.',
        easyExplanation: 'If HTML is the skeleton, CSS is the clothing and makeup. It makes websites beautiful by controlling colors, fonts, layouts, spacing, and animations. The "Cascading" means styles can inherit and override each other.',
        syntax: `.card {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  border-radius: 12px;\n  padding: 2rem;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.1);\n}`,
        example: 'Flexbox layout: .container { display: flex; justify-content: center; align-items: center; } — centers child elements both horizontally and vertically.',
        importantKeywords: ['Selectors (class, id, element)', 'Box Model (margin, border, padding)', 'Flexbox & Grid', 'Media Queries', 'Animations & Transitions'],
        memoryTips: 'CSS Box Model = "MBPC" from outside in: Margin → Border → Padding → Content. Flexbox = 1D layout, Grid = 2D layout.',
        quickSummary: ['Stylesheet language controlling visual presentation of web pages.', 'Box Model: margin → border → padding → content.', 'Flexbox (1D) and Grid (2D) are modern layout systems.'],
        keyConcepts: ['Selectors: Target HTML elements by tag, class (.), or id (#).', 'Box Model: Every element is a box with margin, border, padding, and content.', 'Responsive Design: Media queries adapt layout to different screen sizes.']
      },

      inheritance: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Inheritance is a fundamental OOP mechanism where a child class (subclass) acquires the properties and methods of a parent class (superclass). It promotes code reusability and establishes an "is-a" relationship between classes.',
        easyExplanation: 'Just like a child inherits traits from parents in real life, in programming a child class inherits code from a parent class. A Dog class can inherit from Animal class — getting all Animal\'s properties while adding its own unique behaviors like bark().',
        syntax: `// Java Example\nclass Animal {\n    void eat() { System.out.println("Eating..."); }\n}\nclass Dog extends Animal {\n    void bark() { System.out.println("Woof!"); }\n}\n// Dog inherits eat() from Animal`,
        example: 'Types: Single (A→B), Multilevel (A→B→C), Hierarchical (A→B, A→C). Java uses "extends" for classes and "implements" for interfaces. Python supports multiple inheritance.',
        importantKeywords: ['extends / implements', 'super keyword', 'Method Overriding', 'Single / Multilevel / Hierarchical', 'IS-A Relationship'],
        memoryTips: 'Inheritance = "IS-A" relationship. Dog IS-A Animal. Think of a family tree: parent passes traits to children. "extends" = class inheritance, "implements" = interface inheritance.',
        quickSummary: ['Child class acquires properties/methods of parent class.', 'Types: Single, Multilevel, Hierarchical, Multiple (interfaces).', 'Promotes code reuse via the "is-a" relationship.'],
        keyConcepts: ['Method Overriding: Child redefines parent\'s method for specialized behavior.', 'super keyword: Calls parent\'s constructor or method from the child class.', 'Abstract Classes: Cannot be instantiated; provide a template for subclasses.']
      },

      polymorphism: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Polymorphism (meaning "many forms") is an OOP concept where a single interface or method name can take multiple forms. It allows objects of different classes to be treated through the same interface.',
        easyExplanation: 'Think of the word "draw" — an artist draws a painting, a cowboy draws a gun, a programmer draws a shape on screen. Same word, different actions depending on context. That\'s polymorphism in programming — same method name, different behavior depending on the object.',
        syntax: `// Java Method Overloading (Compile-time)\nint add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\n\n// Method Overriding (Runtime)\nclass Shape { void draw() { } }\nclass Circle extends Shape { void draw() { System.out.println("Drawing Circle"); } }`,
        example: 'Animal a = new Dog(); a.speak(); — calls Dog\'s speak() method even though the reference type is Animal. This is runtime polymorphism via method overriding.',
        importantKeywords: ['Method Overloading (Compile-time)', 'Method Overriding (Runtime)', 'Dynamic Dispatch', 'Virtual Functions', 'Upcasting'],
        memoryTips: 'Polymorphism = "Many Forms". Two types: Overloading (same name, different parameters — compile time) vs Overriding (same signature, different class — runtime).',
        quickSummary: ['One interface, multiple implementations.', 'Compile-time: Method overloading (different parameters).', 'Runtime: Method overriding (child redefines parent method).'],
        keyConcepts: ['Overloading: Same method name with different parameter lists in the same class.', 'Overriding: Child class provides specific implementation of parent\'s method.', 'Dynamic Binding: JVM decides at runtime which overridden method to call.']
      },

      encapsulation: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Encapsulation is an OOP principle of bundling data (variables) and methods (functions) that operate on that data within a single unit (class), while restricting direct access to internal state using access modifiers.',
        easyExplanation: 'Think of a capsule pill — the medicine is wrapped inside a shell. Similarly, encapsulation wraps data inside a class and only allows access through controlled methods (getters and setters). You can\'t directly touch the internal data from outside.',
        syntax: `class BankAccount {\n    private double balance = 0;\n    public double getBalance() { return balance; }\n    public void deposit(double amt) {\n        if (amt > 0) balance += amt;\n    }\n}`,
        example: 'private fields with public getters/setters: balance is hidden (private), deposit() validates before modifying it, getBalance() provides read-only access.',
        importantKeywords: ['private / public / protected', 'Getters & Setters', 'Data Hiding', 'Access Modifiers', 'Information Hiding'],
        memoryTips: 'Encapsulation = "Data in a Capsule". Private = hidden, Public = visible. Always use getters/setters to control access. Think: ATM machine — you can\'t open it, but you can use its interface.',
        quickSummary: ['Bundles data and methods into a single class.', 'Restricts direct access using private/protected modifiers.', 'Provides controlled access via public getter/setter methods.'],
        keyConcepts: ['Access Modifiers: private (class only), protected (package + subclass), public (everywhere).', 'Getters/Setters: Methods that provide controlled read/write to private fields.', 'Data Hiding: Internal implementation is hidden from external code.']
      },

      abstraction: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Abstraction is an OOP principle of hiding complex implementation details and showing only the essential features of an object. It is achieved through abstract classes and interfaces.',
        easyExplanation: 'When you drive a car, you use the steering wheel and pedals — you don\'t need to know how the engine works internally. Abstraction works the same way: it hides complexity and shows only what\'s necessary.',
        syntax: `// Java Abstract Class\nabstract class Shape {\n    abstract double area(); // no body — must be implemented by subclass\n}\nclass Circle extends Shape {\n    double radius;\n    double area() { return Math.PI * radius * radius; }\n}`,
        example: 'Interface example: interface Drawable { void draw(); } — any class implementing Drawable must provide its own draw() method. ArrayList, LinkedList both implement the List interface.',
        importantKeywords: ['Abstract Class', 'Interface', 'abstract keyword', 'implements keyword', 'Hiding Complexity'],
        memoryTips: 'Abstraction = "Show WHAT, hide HOW". Abstract class = partial abstraction (can have concrete methods). Interface = full abstraction (all methods must be implemented).',
        quickSummary: ['Hides complex details, exposes only essential features.', 'Abstract class: Template with some implemented methods.', 'Interface: Contract that classes must fulfill.'],
        keyConcepts: ['Abstract Class: Cannot be instantiated; may have abstract and concrete methods.', 'Interface: Pure contract — all methods are abstract (before Java 8).', 'Purpose: Reduces complexity and isolates impact of changes.']
      },

      oop: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects — instances of classes that bundle data (attributes) and behavior (methods). The four pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism.',
        easyExplanation: 'OOP models software like the real world. A "Car" class defines attributes (color, speed) and methods (drive, brake). Each real car is an object (instance) of that class. OOP makes code reusable, modular, and easier to maintain.',
        syntax: `class Student {\n    String name;\n    int marks;\n    void display() {\n        System.out.println(name + ": " + marks);\n    }\n}\nStudent s = new Student();\ns.name = "Alice"; s.marks = 95;\ns.display();`,
        example: 'Real-world OOP: Class = Blueprint of a House, Object = Actual House built from that blueprint. Each house (object) has its own color and rooms (attributes).',
        importantKeywords: ['Class & Object', 'Encapsulation', 'Abstraction', 'Inheritance', 'Polymorphism'],
        memoryTips: 'Four Pillars = "A PIE": Abstraction, Polymorphism, Inheritance, Encapsulation. Class = blueprint, Object = real thing built from it.',
        quickSummary: ['Paradigm organizing code into objects with data and methods.', 'Four pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.', 'Promotes code reuse, modularity, and real-world modeling.'],
        keyConcepts: ['Class: Template/blueprint defining attributes and methods.', 'Object: Instance of a class with actual values.', 'Four Pillars: Encapsulation (data hiding), Abstraction (simplification), Inheritance (reuse), Polymorphism (flexibility).']
      },

      oops: { get subjectName() { return knowledgeBase.oop.subjectName; }, get isProgramming() { return knowledgeBase.oop.isProgramming; }, get definition() { return knowledgeBase.oop.definition; }, get easyExplanation() { return knowledgeBase.oop.easyExplanation; }, get syntax() { return knowledgeBase.oop.syntax; }, get example() { return knowledgeBase.oop.example; }, get importantKeywords() { return knowledgeBase.oop.importantKeywords; }, get memoryTips() { return knowledgeBase.oop.memoryTips; }, get quickSummary() { return knowledgeBase.oop.quickSummary; }, get keyConcepts() { return knowledgeBase.oop.keyConcepts; } },

      dbms: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'A Database Management System (DBMS) is software that manages databases — it stores, retrieves, and manipulates data efficiently. Examples include MySQL, PostgreSQL, Oracle, and MongoDB.',
        easyExplanation: 'A DBMS is like a librarian for data. Instead of you searching through thousands of files manually, the DBMS organizes everything into tables, lets you search with queries, and ensures data stays consistent and secure.',
        syntax: `-- Creating a table\nCREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    marks INT\n);\n\n-- Querying data\nSELECT * FROM students WHERE marks > 80;`,
        example: 'Normalization example: Splitting a single large table into Students and Courses tables linked by a foreign key (course_id) to reduce data redundancy.',
        importantKeywords: ['Normalization (1NF, 2NF, 3NF, BCNF)', 'ACID Properties', 'ER Diagrams', 'Primary Key / Foreign Key', 'SQL Queries'],
        memoryTips: 'ACID = Atomicity (all or nothing), Consistency (valid state), Isolation (no interference), Durability (permanent). Normal forms reduce redundancy step by step.',
        quickSummary: ['Software system to store, retrieve, and manage structured data.', 'Uses tables with rows (records) and columns (fields).', 'ACID properties ensure reliable transactions.'],
        keyConcepts: ['Normalization: Decompose tables to eliminate redundancy (1NF → 2NF → 3NF).', 'ER Model: Entity-Relationship diagrams represent database structure visually.', 'Transactions: ACID properties guarantee data integrity during operations.']
      },

      'operating system': {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'An Operating System (OS) is system software that manages computer hardware and software resources and provides services for application programs. Examples: Windows, Linux, macOS, Android.',
        easyExplanation: 'The OS is the manager of your computer. It decides which program gets CPU time, how memory is shared, how files are organized, and how devices communicate. Without an OS, applications couldn\'t run.',
        syntax: `// Process creation in C (Unix)\n#include <unistd.h>\npid_t pid = fork(); // Creates child process\nif (pid == 0) {\n    printf("Child process");\n} else {\n    printf("Parent process");\n}`,
        example: 'CPU Scheduling: Round Robin assigns each process a fixed time slice (quantum). If process A gets 10ms, after 10ms it goes to the back of the queue and process B runs.',
        importantKeywords: ['Process & Thread Management', 'CPU Scheduling (FCFS, SJF, Round Robin)', 'Memory Management (Paging, Segmentation)', 'Deadlock', 'File Systems'],
        memoryTips: 'Deadlock conditions = "MHCN": Mutual Exclusion, Hold & Wait, Circular Wait, No Preemption — ALL four must hold for deadlock. Remove any one to prevent it.',
        quickSummary: ['Manages hardware resources and provides services to applications.', 'Key functions: Process management, memory management, file systems, I/O.', 'Scheduling algorithms decide which process runs when.'],
        keyConcepts: ['Process: A program in execution with its own memory space.', 'Paging: Divides memory into fixed-size pages to avoid external fragmentation.', 'Deadlock: Two or more processes blocked forever waiting for each other\'s resources.']
      },

      os: { get subjectName() { return knowledgeBase['operating system'].subjectName; }, get isProgramming() { return knowledgeBase['operating system'].isProgramming; }, get definition() { return knowledgeBase['operating system'].definition; }, get easyExplanation() { return knowledgeBase['operating system'].easyExplanation; }, get syntax() { return knowledgeBase['operating system'].syntax; }, get example() { return knowledgeBase['operating system'].example; }, get importantKeywords() { return knowledgeBase['operating system'].importantKeywords; }, get memoryTips() { return knowledgeBase['operating system'].memoryTips; }, get quickSummary() { return knowledgeBase['operating system'].quickSummary; }, get keyConcepts() { return knowledgeBase['operating system'].keyConcepts; } },

      'data structure': {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'A Data Structure is a way of organizing and storing data in a computer so that it can be accessed and modified efficiently. Common types include arrays, linked lists, stacks, queues, trees, and graphs.',
        easyExplanation: 'Data structures are like different types of containers. An array is like a row of numbered boxes, a stack is like a pile of plates (last in, first out), and a queue is like a line at a ticket counter (first in, first out). Choosing the right container makes your program faster.',
        syntax: `// Stack in Java\nStack<Integer> stack = new Stack<>();\nstack.push(10);\nstack.push(20);\nint top = stack.pop(); // Returns 20 (LIFO)`,
        example: 'Binary Search Tree: Left child < parent < right child. Searching for a value takes O(log n) time on average — much faster than scanning an array linearly.',
        importantKeywords: ['Array & Linked List', 'Stack (LIFO) & Queue (FIFO)', 'Binary Tree & BST', 'Hash Table', 'Graph (BFS, DFS)'],
        memoryTips: 'Stack = LIFO (Last In First Out, like a stack of plates). Queue = FIFO (First In First Out, like a line). Tree = Hierarchical, Graph = Network.',
        quickSummary: ['Ways to organize data for efficient access and modification.', 'Linear: Array, Linked List, Stack, Queue.', 'Non-linear: Tree, Graph, Heap, Hash Table.'],
        keyConcepts: ['Time Complexity: Measures how fast operations run (O(1), O(n), O(log n)).', 'Stack/Queue: LIFO vs FIFO data access patterns.', 'Trees: Hierarchical structures for fast searching and sorting.']
      },

      algorithm: {
        subjectName: 'Computer Science & Programming', isProgramming: true,
        definition: 'An Algorithm is a step-by-step procedure or formula for solving a problem. In computer science, algorithms are analyzed by their time complexity (Big O notation) and space complexity.',
        easyExplanation: 'An algorithm is like a recipe. Just as a recipe gives step-by-step instructions to cook a dish, an algorithm gives step-by-step instructions to solve a problem. Some recipes (algorithms) are faster and use fewer ingredients (resources) than others.',
        syntax: `// Binary Search Algorithm (Python)\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1`,
        example: 'Sorting comparison: Bubble Sort = O(n^2) — slow for large data. Merge Sort = O(n log n) — much faster. Quick Sort = O(n log n) average, O(n^2) worst case.',
        importantKeywords: ['Big O Notation', 'Sorting (Bubble, Merge, Quick)', 'Searching (Linear, Binary)', 'Recursion', 'Dynamic Programming'],
        memoryTips: 'Big O = "How does time grow with input size?" O(1) = constant, O(log n) = binary search, O(n) = linear scan, O(n^2) = nested loops.',
        quickSummary: ['Step-by-step procedure to solve a computational problem.', 'Analyzed by time complexity (Big O) and space complexity.', 'Key types: Sorting, Searching, Graph, Dynamic Programming.'],
        keyConcepts: ['Big O: Describes worst-case growth rate of time/space.', 'Divide & Conquer: Split problem into subproblems (Merge Sort, Quick Sort).', 'Dynamic Programming: Store solutions to overlapping subproblems (Fibonacci, Knapsack).']
      },

      /* ═══════ MATHEMATICS ═══════ */
      'pythagoras theorem': {
        subjectName: 'Mathematics', isProgramming: false,
        definition: 'The Pythagoras Theorem states that in a right-angled triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides: a² + b² = c².',
        easyExplanation: 'Imagine a right-angled triangle. If you build squares on each of its three sides, the area of the biggest square (on the hypotenuse) will exactly equal the combined area of the two smaller squares. This is Pythagoras\' Theorem: a² + b² = c².',
        example: 'If a right triangle has sides a = 3 cm and b = 4 cm, then c² = 3² + 4² = 9 + 16 = 25, so c = 5 cm. The (3, 4, 5) triple is the most famous Pythagorean triplet.',
        importantKeywords: ['Right-Angled Triangle', 'Hypotenuse', 'a² + b² = c²', 'Pythagorean Triplets (3-4-5, 5-12-13)', 'Converse Theorem'],
        memoryTips: 'Remember "3-4-5" — the simplest Pythagorean triplet. Legs Squared Added = Hypotenuse Squared. Also works with 5-12-13 and 8-15-17.',
        quickSummary: ['In a right triangle: a² + b² = c² (c = hypotenuse).', 'Used to find unknown sides when two sides are known.', 'Pythagorean triplets: (3,4,5), (5,12,13), (8,15,17).'],
        keyConcepts: ['Formula: a² + b² = c² applies only to right-angled triangles.', 'Converse: If a² + b² = c² holds, then the triangle is right-angled.', 'Applications: Distance between two points, construction, navigation.']
      },

      trigonometry: {
        subjectName: 'Mathematics', isProgramming: false,
        definition: 'Trigonometry is the branch of mathematics that studies relationships between angles and sides of triangles. The six trigonometric ratios — sin, cos, tan, cosec, sec, cot — are defined for right-angled triangles.',
        easyExplanation: 'Trigonometry helps you find unknown sides or angles in a triangle using ratios. In a right triangle: sin(θ) = opposite/hypotenuse, cos(θ) = adjacent/hypotenuse, tan(θ) = opposite/adjacent. These ratios remain constant for any given angle.',
        example: 'In a right triangle with angle θ = 30°: sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3. If the hypotenuse is 10 cm, opposite side = 10 × sin 30° = 5 cm.',
        importantKeywords: ['sin, cos, tan', 'cosec, sec, cot', 'SOH-CAH-TOA', 'Trigonometric Identities', 'Unit Circle'],
        memoryTips: 'SOH-CAH-TOA: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent. "Some Old Houses Can Always Hide Their Old Age."',
        quickSummary: ['Studies angle-side relationships in triangles.', 'Six ratios: sin, cos, tan and their reciprocals.', 'Key identity: sin²θ + cos²θ = 1.'],
        keyConcepts: ['SOH-CAH-TOA: Defines the three primary trigonometric ratios.', 'Standard Angles: 0°, 30°, 45°, 60°, 90° have exact ratio values.', 'Identities: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ.']
      },

      calculus: {
        subjectName: 'Mathematics', isProgramming: false,
        definition: 'Calculus is the branch of mathematics that studies continuous change. It has two main branches: Differential Calculus (rates of change and slopes) and Integral Calculus (accumulation and areas under curves).',
        easyExplanation: 'Calculus answers two big questions: (1) How fast is something changing right now? (differentiation — finding the slope at a point), and (2) How much has accumulated over time? (integration — finding the area under a curve).',
        example: 'If distance s = t², then velocity v = ds/dt = 2t (derivative). If velocity v = 2t, then distance s = ∫2t dt = t² + C (integral). Differentiation and integration are inverse operations.',
        importantKeywords: ['Differentiation', 'Integration', 'Limits', 'Derivative (dy/dx)', 'Fundamental Theorem of Calculus'],
        memoryTips: 'Differentiation = "breaking down" (finding rate of change). Integration = "building up" (finding total area). They are inverse operations, like multiplication and division.',
        quickSummary: ['Studies continuous change: Differentiation and Integration.', 'Derivative = instantaneous rate of change (slope of tangent).', 'Integral = total accumulation (area under curve).'],
        keyConcepts: ['Limits: Foundation of calculus — what value a function approaches.', 'Derivatives: d/dx(xⁿ) = nxⁿ⁻¹ (Power Rule).', 'Integrals: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (reverse of differentiation).']
      },

      algebra: {
        subjectName: 'Mathematics', isProgramming: false,
        definition: 'Algebra is the branch of mathematics dealing with symbols and rules for manipulating those symbols. It uses variables (like x, y) to represent unknown values and solves equations to find those values.',
        easyExplanation: 'Algebra is like solving puzzles with letters. Instead of saying "what number plus 3 equals 7?", algebra writes it as x + 3 = 7 and solves for x = 4. It\'s a powerful tool for representing and solving real-world problems.',
        example: 'Solving a quadratic equation: x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 or x = 3. The quadratic formula x = (-b ± √(b²-4ac)) / 2a works for any quadratic.',
        importantKeywords: ['Variables & Constants', 'Linear Equations', 'Quadratic Equations', 'Polynomials', 'Factorization'],
        memoryTips: 'Quadratic formula: "x equals negative b, plus or minus the square root, of b squared minus 4ac, all over 2a." Sing it to the tune of "Pop Goes the Weasel"!',
        quickSummary: ['Uses variables (x, y) to represent unknowns and solve equations.', 'Linear: ax + b = 0; Quadratic: ax² + bx + c = 0.', 'Factorization and the quadratic formula are key solving tools.'],
        keyConcepts: ['Equations: Statements of equality with unknowns to solve.', 'Factorization: Breaking expressions into products (x²-9 = (x+3)(x-3)).', 'Quadratic Formula: x = (-b ± √(b²-4ac)) / 2a solves any quadratic.']
      },

      /* ═══════ PHYSICS ═══════ */
      'newton': {
        subjectName: 'Physics', isProgramming: false,
        definition: 'Newton\'s Laws of Motion are three fundamental laws that describe the relationship between a body and the forces acting upon it: (1) Law of Inertia, (2) F = ma, (3) Action-Reaction.',
        easyExplanation: 'Newton\'s three laws explain why things move: (1) Objects stay still or keep moving unless a force acts — a ball won\'t roll by itself. (2) Push harder, it accelerates more (F = ma). (3) Every push has an equal pushback — when you jump, you push Earth down and Earth pushes you up.',
        example: 'Second Law in action: A 10 kg box pushed with 50 N force accelerates at a = F/m = 50/10 = 5 m/s². Third Law: A rocket pushes gas downward, and the gas pushes the rocket upward.',
        importantKeywords: ['Inertia (1st Law)', 'F = ma (2nd Law)', 'Action-Reaction (3rd Law)', 'Force & Acceleration', 'Momentum'],
        memoryTips: 'Newton\'s Laws = "I-F-A": Inertia (1st), Force = ma (2nd), Action-Reaction (3rd). Remember F = ma as "Force Makes things Accelerate."',
        quickSummary: ['1st Law: No net force → no change in motion (inertia).', '2nd Law: Force = mass × acceleration (F = ma).', '3rd Law: Every action has an equal and opposite reaction.'],
        keyConcepts: ['Inertia: Resistance to change in state of motion.', 'F = ma: Net force equals mass times acceleration.', 'Action-Reaction: Forces always occur in pairs of equal magnitude.']
      },

      gravity: {
        subjectName: 'Physics', isProgramming: false,
        definition: 'Gravity is the universal attractive force between any two objects with mass. Newton\'s Law of Universal Gravitation states F = G(m₁m₂)/r², where G is the gravitational constant (6.674 × 10⁻¹¹ N⋅m²/kg²).',
        easyExplanation: 'Gravity is the invisible force that pulls everything with mass toward everything else. It keeps you on the ground, the Moon orbiting Earth, and Earth orbiting the Sun. The heavier the objects and the closer they are, the stronger the pull.',
        example: 'On Earth\'s surface, g ≈ 9.8 m/s². A 1 kg apple falls with force F = mg = 1 × 9.8 = 9.8 N. On the Moon, g ≈ 1.6 m/s² — you\'d weigh about 1/6th of your Earth weight.',
        importantKeywords: ['Universal Gravitation', 'F = Gm₁m₂/r²', 'g = 9.8 m/s²', 'Gravitational Constant G', 'Free Fall'],
        memoryTips: 'g = 9.8 m/s² on Earth (round to 10 for quick calculations). Weight = mg (mass × gravity). Newton discovered it watching an apple fall (popular story).',
        quickSummary: ['Universal force of attraction between all masses.', 'F = G(m₁m₂)/r² — decreases with distance squared.', 'Earth\'s surface gravity: g ≈ 9.8 m/s².'],
        keyConcepts: ['Universal Law: Every mass attracts every other mass.', 'Inverse Square: Gravitational force decreases as distance squared increases.', 'Weight vs Mass: Weight (N) = mass (kg) × g; mass is constant, weight changes.']
      },

      'thermodynamics': {
        subjectName: 'Physics', isProgramming: false,
        definition: 'Thermodynamics is the branch of physics that deals with heat, work, temperature, and energy transfer. It is governed by four laws (0th, 1st, 2nd, 3rd) that describe how thermal energy is converted and flows between systems.',
        easyExplanation: 'Thermodynamics explains how heat moves and transforms. When you boil water, heat energy from the flame transfers to the water. The First Law says energy can\'t be created or destroyed — only transformed (heat → steam → mechanical energy in an engine).',
        example: 'Car engine: Chemical energy in fuel → heat → mechanical work (pistons). The Second Law says some energy is always lost as waste heat — no engine is 100% efficient.',
        importantKeywords: ['First Law (Energy Conservation)', 'Second Law (Entropy)', 'Entropy', 'Heat Transfer (Conduction, Convection, Radiation)', 'Specific Heat Capacity'],
        memoryTips: 'Laws order: 0th = Thermal equilibrium, 1st = Energy conserved (ΔU = Q - W), 2nd = Entropy always increases, 3rd = Absolute zero unreachable.',
        quickSummary: ['Study of heat, energy transfer, and work.', '1st Law: Energy cannot be created or destroyed, only transformed.', '2nd Law: Entropy (disorder) of an isolated system always increases.'],
        keyConcepts: ['First Law: ΔU = Q - W (internal energy change = heat added - work done).', 'Entropy: Measure of disorder; natural processes increase total entropy.', 'Heat Transfer: Conduction (contact), Convection (fluid flow), Radiation (waves).']
      },

      /* ═══════ CHEMISTRY ═══════ */
      'periodic table': {
        subjectName: 'Chemistry', isProgramming: false,
        definition: 'The Periodic Table is a tabular arrangement of chemical elements ordered by their atomic number (number of protons). Elements are organized into periods (rows) and groups (columns) based on their electron configuration and chemical properties.',
        easyExplanation: 'The Periodic Table is like a seating chart for all 118 known elements. Elements in the same column (group) behave similarly — like a family. Moving across a row (period), elements change gradually from metals to non-metals.',
        example: 'Group 1 (Alkali Metals): Li, Na, K — all are soft, reactive metals that explode in water. Group 18 (Noble Gases): He, Ne, Ar — all are stable and unreactive because their outer electron shell is full.',
        importantKeywords: ['Atomic Number', 'Periods & Groups', 'Metals, Non-metals, Metalloids', 'Electron Configuration', 'Periodic Trends'],
        memoryTips: 'First 20 elements: "H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca". Groups: 1=Alkali, 2=Alkaline Earth, 17=Halogens, 18=Noble Gases.',
        quickSummary: ['118 elements arranged by increasing atomic number.', 'Rows = Periods (energy levels), Columns = Groups (similar properties).', 'Periodic trends: Atomic size decreases across a period, increases down a group.'],
        keyConcepts: ['Groups: Elements in the same column share similar chemical properties.', 'Periods: Elements in the same row have the same number of electron shells.', 'Trends: Electronegativity, ionization energy, atomic radius follow predictable patterns.']
      },

      'chemical bonding': {
        subjectName: 'Chemistry', isProgramming: false,
        definition: 'Chemical Bonding is the process by which atoms combine to form molecules and compounds. The three main types are: Ionic (transfer of electrons), Covalent (sharing of electrons), and Metallic (sea of electrons).',
        easyExplanation: 'Atoms bond to become stable (fill their outer shell). Ionic bonding is like giving — Na gives an electron to Cl (forming NaCl/salt). Covalent bonding is like sharing — two H atoms share electrons (forming H₂). Metallic bonding is like pooling — metal atoms share a "sea" of electrons.',
        example: 'NaCl (table salt): Na loses 1 electron → Na⁺, Cl gains 1 electron → Cl⁻. Opposite charges attract = ionic bond. H₂O: Oxygen shares electrons with two hydrogens = covalent bonds.',
        importantKeywords: ['Ionic Bond', 'Covalent Bond', 'Metallic Bond', 'Electronegativity', 'Octet Rule'],
        memoryTips: 'Ionic = "I give" (electron transfer, metal + non-metal). Covalent = "Co-share" (electron sharing, non-metal + non-metal). Metallic = "sea of e⁻" (metal + metal).',
        quickSummary: ['Atoms bond to achieve stable electron configuration (octet).', 'Ionic: Electron transfer (NaCl). Covalent: Electron sharing (H₂O). Metallic: Electron pool.', 'Bond type depends on electronegativity difference between atoms.'],
        keyConcepts: ['Octet Rule: Atoms bond to achieve 8 electrons in their outer shell.', 'Ionic: Metal + Non-metal; forms crystal lattice; conducts electricity when dissolved.', 'Covalent: Non-metal + Non-metal; can be polar (HCl) or non-polar (O₂).']
      },

      /* ═══════ BIOLOGY & BIOCHEMISTRY ═══════ */
      photosynthesis: {
        subjectName: 'Biology & Biochemistry', isProgramming: false,
        definition: 'Photosynthesis is the biological process by which green plants, algae, and some bacteria convert light energy (sunlight) into chemical energy (glucose), using carbon dioxide (CO₂) and water (H₂O), and releasing oxygen (O₂) as a byproduct.',
        easyExplanation: 'Plants are nature\'s solar panels. They capture sunlight through chlorophyll (the green pigment in leaves), mix it with water from the soil and CO₂ from the air, and cook up glucose (food/energy). Oxygen is released as a bonus — which is what we breathe!',
        example: 'Overall equation: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂. This happens in two stages: Light Reactions (in thylakoids — capture sunlight) and Calvin Cycle (in stroma — build glucose).',
        importantKeywords: ['Chlorophyll', 'Light Reactions & Calvin Cycle', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂', 'Chloroplast (Thylakoid & Stroma)', 'ATP & NADPH'],
        memoryTips: 'Photosynthesis = "Photo" (light) + "Synthesis" (making). Plants use light to MAKE food. Equation: 6CO₂ + 6H₂O → Glucose + 6O₂. Remember "6-6-1-6" for the numbers!',
        quickSummary: ['Plants convert sunlight + CO₂ + H₂O into glucose + O₂.', 'Occurs in chloroplasts: Light reactions (thylakoids) → Calvin Cycle (stroma).', 'Chlorophyll absorbs sunlight — that\'s why leaves are green.'],
        keyConcepts: ['Light Reactions: Capture solar energy → produce ATP and NADPH in thylakoid membranes.', 'Calvin Cycle: Uses ATP and NADPH to fix CO₂ into glucose in the stroma.', 'Chlorophyll: Green pigment that absorbs red and blue light, reflects green.']
      },

      'cell division': {
        subjectName: 'Biology & Biochemistry', isProgramming: false,
        definition: 'Cell Division is the process by which a parent cell divides into two or more daughter cells. The two main types are Mitosis (producing identical cells for growth/repair) and Meiosis (producing gametes with half the chromosomes for reproduction).',
        easyExplanation: 'Cell division is how living things grow and reproduce. Mitosis is like photocopying — one cell makes an exact copy of itself (for growth and healing). Meiosis is for reproduction — it creates sex cells (sperm/eggs) with half the DNA, so when they combine, the baby gets a full set.',
        example: 'Mitosis: A skin cell with 46 chromosomes divides into 2 identical cells with 46 chromosomes each. Meiosis: A reproductive cell with 46 chromosomes produces 4 gametes with 23 chromosomes each.',
        importantKeywords: ['Mitosis (PMAT)', 'Meiosis I & II', 'Chromosome', 'Cytokinesis', 'Crossing Over'],
        memoryTips: 'Mitosis = "Makes Identical Two" (2 identical cells). Meiosis = "Makes Eggs/sperm" (4 unique cells). PMAT = Prophase, Metaphase, Anaphase, Telophase.',
        quickSummary: ['Mitosis: 1 cell → 2 identical cells (46 chromosomes) for growth.', 'Meiosis: 1 cell → 4 unique cells (23 chromosomes) for reproduction.', 'Phases: Prophase → Metaphase → Anaphase → Telophase (PMAT).'],
        keyConcepts: ['Mitosis: Prophase → Metaphase → Anaphase → Telophase; produces 2 diploid cells.', 'Meiosis: Two divisions (Meiosis I & II); produces 4 haploid gametes.', 'Crossing Over: Exchange of genetic material between homologous chromosomes in Meiosis I.']
      },

      mitosis: { get subjectName() { return knowledgeBase['cell division'].subjectName; }, get isProgramming() { return knowledgeBase['cell division'].isProgramming; }, get definition() { return knowledgeBase['cell division'].definition; }, get easyExplanation() { return knowledgeBase['cell division'].easyExplanation; }, get example() { return knowledgeBase['cell division'].example; }, get importantKeywords() { return knowledgeBase['cell division'].importantKeywords; }, get memoryTips() { return knowledgeBase['cell division'].memoryTips; }, get quickSummary() { return knowledgeBase['cell division'].quickSummary; }, get keyConcepts() { return knowledgeBase['cell division'].keyConcepts; } },

      meiosis: { get subjectName() { return knowledgeBase['cell division'].subjectName; }, get isProgramming() { return knowledgeBase['cell division'].isProgramming; }, get definition() { return knowledgeBase['cell division'].definition; }, get easyExplanation() { return knowledgeBase['cell division'].easyExplanation; }, get example() { return knowledgeBase['cell division'].example; }, get importantKeywords() { return knowledgeBase['cell division'].importantKeywords; }, get memoryTips() { return knowledgeBase['cell division'].memoryTips; }, get quickSummary() { return knowledgeBase['cell division'].quickSummary; }, get keyConcepts() { return knowledgeBase['cell division'].keyConcepts; } },

      dna: {
        subjectName: 'Biology & Biochemistry', isProgramming: false,
        definition: 'DNA (Deoxyribonucleic Acid) is a double-helix molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known living organisms. It is made of nucleotides containing a sugar, phosphate, and one of four bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C).',
        easyExplanation: 'DNA is like the instruction manual for building and running a living body. It\'s a twisted ladder (double helix) where the rungs are pairs of chemicals: A always pairs with T, and G always pairs with C. These "letters" spell out genes — recipes for making proteins.',
        example: 'Base pairing: A strand reading A-T-G-C pairs with T-A-C-G on the opposite strand. During replication, the strands separate and each builds a new complementary strand — creating two identical DNA molecules.',
        importantKeywords: ['Double Helix', 'Base Pairs (A-T, G-C)', 'Nucleotides', 'Replication', 'Genes & Chromosomes'],
        memoryTips: 'Base pairing: "Apples in Trees" (A-T) and "Cars in Garages" (C-G). DNA = Deoxyribonucleic Acid. RNA uses Uracil (U) instead of Thymine (T).',
        quickSummary: ['Double-helix molecule carrying genetic information.', 'Made of nucleotides with bases: A pairs with T, G pairs with C.', 'Replication creates two identical copies before cell division.'],
        keyConcepts: ['Structure: Sugar-phosphate backbone with base pair rungs (A-T, G-C).', 'Replication: Semi-conservative — each strand serves as template for a new copy.', 'Central Dogma: DNA → RNA (transcription) → Protein (translation).']
      },

      /* ═══════ HISTORY ═══════ */
      'french revolution': {
        subjectName: 'History', isProgramming: false,
        definition: 'The French Revolution (1789–1799) was a period of radical political and societal upheaval in France that overthrew the monarchy, established a republic, and fundamentally transformed French governance. It was driven by Enlightenment ideals of liberty, equality, and fraternity.',
        easyExplanation: 'France in the 1780s was deeply unequal — the king and nobles lived in luxury while common people starved. Frustrated citizens stormed the Bastille prison on July 14, 1789, sparking a revolution that ended the monarchy, executed King Louis XVI, and gave rise to the ideals of "Liberty, Equality, Fraternity."',
        example: 'Timeline: 1789 — Storming of the Bastille, Declaration of the Rights of Man. 1792 — France becomes a Republic. 1793 — King Louis XVI executed. 1799 — Napoleon Bonaparte seizes power in a coup, ending the Revolution.',
        importantKeywords: ['Storming of the Bastille (1789)', 'Liberty, Equality, Fraternity', 'King Louis XVI', 'Reign of Terror', 'Napoleon Bonaparte'],
        memoryTips: 'Key date: 1789 (Bastille). Three causes: "BET" = Bread crisis (famine), Enlightenment ideas, Taxation inequality. Three estates: Clergy, Nobility, Common People.',
        quickSummary: ['1789–1799: Overthrew French monarchy, established a republic.', 'Causes: Social inequality, Enlightenment ideas, financial crisis, famine.', 'Legacy: Inspired democratic movements worldwide; "Liberty, Equality, Fraternity."'],
        keyConcepts: ['Three Estates: Clergy (1st), Nobility (2nd), Common People (3rd — 97% of population).', 'Bastille: Symbol of royal tyranny; its storming on July 14, 1789 marks the start.', 'Reign of Terror (1793-94): Robespierre\'s radical phase; thousands executed by guillotine.']
      },

      'industrial revolution': {
        subjectName: 'History', isProgramming: false,
        definition: 'The Industrial Revolution (c. 1760–1840) was the transition from agrarian, handcraft economies to machine-based manufacturing. Beginning in Britain, it introduced the steam engine, factory system, and mass production, fundamentally transforming society.',
        easyExplanation: 'Before the Industrial Revolution, most things were made by hand in homes and small workshops. Then machines were invented — especially the steam engine — and factories were built. People moved from farms to cities for factory jobs, changing how the world lived, worked, and traveled forever.',
        example: 'James Watt improved the steam engine (1769), powering factories and trains. The spinning jenny and power loom mechanized textile production. The railway system (1825) revolutionized transportation.',
        importantKeywords: ['Steam Engine', 'Factory System', 'Urbanization', 'Mass Production', 'Child Labor'],
        memoryTips: 'Started in Britain (1760s). Key inventions: Steam engine (Watt), Spinning Jenny (Hargreaves), Power Loom (Cartwright). Effects: Urbanization + Pollution + New social classes.',
        quickSummary: ['Transition from hand production to machine manufacturing (1760–1840).', 'Started in Britain with textile industry and steam power.', 'Led to urbanization, new social classes, and global economic transformation.'],
        keyConcepts: ['Steam Power: James Watt\'s engine drove factories, railways, and ships.', 'Factory System: Centralized production replaced cottage industry.', 'Social Impact: Urbanization, middle class emergence, labor movements, child labor.']
      },

      'world war': {
        subjectName: 'History', isProgramming: false,
        definition: 'The World Wars were two global military conflicts. World War I (1914–1918) involved the Allied Powers vs Central Powers, triggered by the assassination of Archduke Franz Ferdinand. World War II (1939–1945) pitted the Allies against the Axis powers, sparked by Nazi Germany\'s aggression.',
        easyExplanation: 'WWI started after the assassination of Austria\'s Archduke Franz Ferdinand, pulling nations into war through alliances. It introduced trench warfare and ended with the Treaty of Versailles. WWII began when Hitler\'s Germany invaded Poland. It included the Holocaust and ended with the atomic bombing of Japan.',
        example: 'WWI: Treaty of Versailles (1919) punished Germany severely → economic hardship → rise of Hitler. WWII: D-Day invasion (June 6, 1944), Hiroshima/Nagasaki atomic bombs (August 1945), formation of United Nations.',
        importantKeywords: ['Archduke Franz Ferdinand', 'Treaty of Versailles', 'Adolf Hitler / Nazi Germany', 'Pearl Harbor', 'United Nations'],
        memoryTips: 'WWI: "MAIN" causes = Militarism, Alliances, Imperialism, Nationalism. WWII: "FART" = Fascism, Appeasement, Racism, Treaty of Versailles (consequences).',
        quickSummary: ['WWI (1914–18): Allied vs Central Powers; trench warfare; Treaty of Versailles.', 'WWII (1939–45): Allies vs Axis; Holocaust; atomic bombs; UN formed.', 'Both wars reshaped borders, governments, and international relations globally.'],
        keyConcepts: ['WWI Causes: MAIN — Militarism, Alliances, Imperialism, Nationalism.', 'Treaty of Versailles: Blamed Germany; imposed reparations; sowed seeds of WWII.', 'WWII Legacy: United Nations created; Cold War between USA and USSR began.']
      },

      /* ═══════ GEOGRAPHY ═══════ */
      'plate tectonics': {
        subjectName: 'Geography', isProgramming: false,
        definition: 'Plate Tectonics is the scientific theory that Earth\'s outer shell (lithosphere) is divided into several large plates that float on the semi-fluid asthenosphere and move, collide, and separate — causing earthquakes, volcanic activity, and mountain formation.',
        easyExplanation: 'Earth\'s surface is not one solid piece — it\'s made of giant puzzle pieces (tectonic plates) that slowly move on hot, soft rock beneath. When plates collide, mountains form (Himalayas). When they pull apart, volcanoes erupt (Mid-Atlantic Ridge). When they slide past each other, earthquakes happen (San Andreas Fault).',
        example: 'The Himalayas formed because the Indian Plate collided with the Eurasian Plate about 50 million years ago and is still pushing north. The "Ring of Fire" around the Pacific Plate has 75% of the world\'s active volcanoes.',
        importantKeywords: ['Lithosphere & Asthenosphere', 'Convergent / Divergent / Transform', 'Earthquakes & Volcanoes', 'Continental Drift', 'Ring of Fire'],
        memoryTips: 'Three boundary types: Convergent = "Coming together" (mountains), Divergent = "Drifting apart" (rift valleys), Transform = "Sliding past" (earthquakes). Alfred Wegener proposed Continental Drift in 1912.',
        quickSummary: ['Earth\'s lithosphere is divided into moving tectonic plates.', 'Three boundaries: Convergent (collision), Divergent (separation), Transform (sliding).', 'Plate movements cause earthquakes, volcanoes, and mountain formation.'],
        keyConcepts: ['Continental Drift: Wegener\'s theory that continents were once joined (Pangaea).', 'Boundary Types: Convergent (subduction/mountains), Divergent (mid-ocean ridges), Transform (faults).', 'Ring of Fire: Zone around the Pacific Plate with intense seismic and volcanic activity.']
      },

      climate: {
        subjectName: 'Geography', isProgramming: false,
        definition: 'Climate is the long-term average of weather conditions (temperature, humidity, precipitation, wind) in a region over 30+ years. It is influenced by latitude, altitude, ocean currents, and proximity to water bodies.',
        easyExplanation: 'Weather is what\'s happening outside right now; climate is the pattern over decades. India has a tropical monsoon climate (hot summers, rainy monsoon, mild winters). Factors like how close you are to the equator, the ocean, and mountains determine your region\'s climate.',
        example: 'India has diverse climates: Thar Desert (arid), Kerala (tropical wet), Ladakh (cold desert), Meghalaya (highest rainfall — Mawsynram). The monsoon brings 80% of India\'s annual rainfall between June and September.',
        importantKeywords: ['Temperature & Precipitation', 'Monsoon', 'Climate Zones (Tropical, Temperate, Polar)', 'Global Warming', 'El Niño & La Niña'],
        memoryTips: 'Climate ≠ Weather. Climate = "Clothing" (what you put in your wardrobe for the season). Weather = "What you wear today." Five climate zones: Tropical, Dry, Temperate, Continental, Polar.',
        quickSummary: ['Long-term pattern of weather in a region (30+ year average).', 'Factors: Latitude, altitude, ocean currents, distance from sea.', 'Climate change: Global temperatures rising due to greenhouse gas emissions.'],
        keyConcepts: ['Climate Zones: Tropical (hot, wet), Temperate (moderate), Polar (cold).', 'Monsoon: Seasonal wind reversal bringing heavy rainfall to South/Southeast Asia.', 'Climate Change: Human activities (fossil fuels, deforestation) increase greenhouse gases.']
      },

      /* ═══════ ECONOMICS ═══════ */
      'demand supply': {
        subjectName: 'Economics', isProgramming: false,
        definition: 'The Law of Demand states that as price rises, quantity demanded falls (inverse relationship). The Law of Supply states that as price rises, quantity supplied rises (direct relationship). Where the demand and supply curves intersect is the equilibrium price.',
        easyExplanation: 'Demand and Supply are like a seesaw. When a product gets expensive, fewer people buy it (demand falls). But sellers want to make more of it (supply rises). The market "balances" at a price where buyers and sellers agree — that\'s the equilibrium price.',
        example: 'If ice cream costs ₹10, demand is 100 units. At ₹50, demand drops to 20 units. Meanwhile, at ₹50, suppliers produce 80 units. Equilibrium might be at ₹30 where demand = supply = 50 units.',
        importantKeywords: ['Law of Demand', 'Law of Supply', 'Equilibrium Price', 'Elasticity', 'Market Forces'],
        memoryTips: 'Demand curve slopes DOWN (price up → quantity down). Supply curve slopes UP (price up → quantity up). They cross at EQUILIBRIUM. "Demand = Downward, Supply = Skyward."',
        quickSummary: ['Demand: Price ↑ → Quantity demanded ↓ (inverse relationship).', 'Supply: Price ↑ → Quantity supplied ↑ (direct relationship).', 'Equilibrium: Where demand equals supply — the market-clearing price.'],
        keyConcepts: ['Demand Curve: Downward sloping — consumers buy less at higher prices.', 'Supply Curve: Upward sloping — producers supply more at higher prices.', 'Elasticity: How sensitive quantity is to price changes (elastic vs inelastic).']
      },

      gdp: {
        subjectName: 'Economics', isProgramming: false,
        definition: 'GDP (Gross Domestic Product) is the total monetary value of all finished goods and services produced within a country\'s borders in a specific time period (usually one year). It is the broadest measure of a nation\'s economic activity.',
        easyExplanation: 'GDP is like a country\'s report card for its economy. It adds up the value of everything produced — cars, food, services, software. A higher GDP means the economy is producing more. GDP per capita (GDP ÷ population) shows average economic output per person.',
        example: 'India\'s GDP (2023): ~$3.7 trillion. USA: ~$25 trillion. GDP can be measured three ways: Production (output), Income (wages + profits), Expenditure (C + I + G + NX).',
        importantKeywords: ['Nominal vs Real GDP', 'GDP Per Capita', 'GDP = C + I + G + (X-M)', 'Economic Growth', 'GNP vs GDP'],
        memoryTips: 'GDP formula: "CIGN" = Consumption + Investment + Government spending + Net exports (X-M). Real GDP adjusts for inflation; Nominal GDP does not.',
        quickSummary: ['Total value of goods and services produced in a country annually.', 'Formula: GDP = C + I + G + (X - M).', 'Real GDP adjusts for inflation; GDP per capita measures per-person output.'],
        keyConcepts: ['Components: Consumption, Investment, Government spending, Net exports.', 'Real vs Nominal: Real GDP removes inflation effect for true comparison.', 'Limitations: Ignores income inequality, unpaid work, environmental costs.']
      },

      /* ═══════ POLITICAL SCIENCE ═══════ */
      democracy: {
        subjectName: 'Political Science', isProgramming: false,
        definition: 'Democracy is a system of government where power is vested in the people, who exercise it directly or through elected representatives. Its core principles include universal adult suffrage, rule of law, fundamental rights, and free and fair elections.',
        easyExplanation: 'Democracy means "rule by the people." Citizens vote to choose leaders who make decisions on their behalf. India is the world\'s largest democracy — every adult citizen (18+) has one vote, regardless of wealth, caste, or religion. The government is accountable to the people.',
        example: 'India\'s democracy: Citizens elect Members of Parliament (MPs) through general elections every 5 years. The party with the most seats forms the government. The Constitution guarantees fundamental rights (Article 14-32) to every citizen.',
        importantKeywords: ['Universal Adult Suffrage', 'Rule of Law', 'Fundamental Rights', 'Free & Fair Elections', 'Separation of Powers'],
        memoryTips: 'Democracy = "Demo" (people) + "Cracy" (rule). Pillars: Legislature (makes laws), Executive (implements), Judiciary (interprets). India = Largest democracy, UK = Oldest parliamentary democracy.',
        quickSummary: ['Government by the people, for the people, through elected representatives.', 'Core features: Universal suffrage, rule of law, fundamental rights.', 'India: World\'s largest democracy with 900+ million voters.'],
        keyConcepts: ['Direct vs Representative: Direct (citizens vote on laws) vs Representative (citizens elect leaders).', 'Separation of Powers: Legislature, Executive, Judiciary operate independently.', 'Fundamental Rights: Constitutional guarantees of equality, freedom, and justice.']
      },

      constitution: {
        subjectName: 'Political Science', isProgramming: false,
        definition: 'A Constitution is the supreme law of a nation that defines the framework of government, fundamental rights of citizens, directive principles, and the relationship between the state and its people. India\'s Constitution, adopted on January 26, 1950, is the longest written constitution in the world.',
        easyExplanation: 'A Constitution is the rulebook for running a country. It tells the government what it CAN and CANNOT do, and guarantees rights to citizens. India\'s Constitution — written by a committee led by Dr. B.R. Ambedkar — has 448 articles, 25 parts, and 12 schedules.',
        example: 'Indian Constitution: Preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic. Article 14 = Equality before law, Article 21 = Right to life, Article 32 = Right to Constitutional Remedies (Ambedkar called it the "heart and soul").',
        importantKeywords: ['Preamble', 'Fundamental Rights (Part III)', 'Directive Principles (Part IV)', 'Dr. B.R. Ambedkar', 'Amendment Process'],
        memoryTips: 'Constitution adopted: 26 November 1949 (Constitution Day), enacted: 26 January 1950 (Republic Day). "FRESH" Rights: Freedom, Right against Exploitation, Education/Cultural, right to constitutional remedieS, equality/rigHt to life.',
        quickSummary: ['Supreme law defining government structure and citizen rights.', 'India\'s: Longest written constitution; 448 articles; adopted Jan 26, 1950.', 'Key parts: Preamble, Fundamental Rights, Directive Principles, Amendments.'],
        keyConcepts: ['Preamble: States the ideals — Justice, Liberty, Equality, Fraternity.', 'Fundamental Rights: Six categories of guaranteed rights (Articles 14-32).', 'Amendments: 105+ amendments so far; require special majority in Parliament.']
      },

      /* ═══════ COMMERCE & ACCOUNTANCY ═══════ */
      'balance sheet': {
        subjectName: 'Commerce & Accountancy', isProgramming: false,
        definition: 'A Balance Sheet is a financial statement that reports a company\'s assets, liabilities, and shareholders\' equity at a specific point in time. It follows the accounting equation: Assets = Liabilities + Equity.',
        easyExplanation: 'A Balance Sheet is like a financial snapshot of a company on one specific day. The left side shows what the company OWNS (assets: cash, buildings, inventory). The right side shows what it OWES (liabilities: loans, bills) and what belongs to the owners (equity). Both sides must always be equal.',
        example: 'If a company has Assets of ₹50 lakhs, Liabilities of ₹30 lakhs, then Equity = ₹20 lakhs. Assets (₹50L) = Liabilities (₹30L) + Equity (₹20L) — the equation balances.',
        importantKeywords: ['Assets = Liabilities + Equity', 'Current vs Non-Current Assets', 'Shareholders\' Equity', 'Working Capital', 'Liquidity'],
        memoryTips: 'Balance Sheet ALWAYS balances: A = L + E. Assets = what you OWN. Liabilities = what you OWE. Equity = what\'s LEFT for owners. Current = within 1 year; Non-current = beyond 1 year.',
        quickSummary: ['Financial snapshot showing Assets, Liabilities, and Equity.', 'Accounting equation: Assets = Liabilities + Shareholders\' Equity.', 'Current (< 1 year) vs Non-current (> 1 year) classification.'],
        keyConcepts: ['Assets: Resources owned — Cash, Inventory, Property, Equipment.', 'Liabilities: Obligations owed — Loans, Accounts Payable, Bonds.', 'Equity: Owner\'s residual interest = Assets minus Liabilities.']
      },

      /* ═══════ ENVIRONMENTAL SCIENCE ═══════ */
      'global warming': {
        subjectName: 'Environmental Science', isProgramming: false,
        definition: 'Global Warming is the long-term increase in Earth\'s average surface temperature due to the enhanced greenhouse effect caused by human activities — primarily burning fossil fuels (coal, oil, gas), which release CO₂ and other greenhouse gases into the atmosphere.',
        easyExplanation: 'Earth is wrapped in a blanket of gases (atmosphere). Normally, this blanket keeps Earth warm enough for life (greenhouse effect). But burning coal, oil, and gas pumps extra CO₂ into this blanket, making it thicker — trapping more heat. Earth is getting warmer like a car left in the sun with windows closed.',
        example: 'Global average temperature has risen ~1.1°C since pre-industrial times. Effects: Arctic ice melting, sea levels rising (~20 cm since 1900), more extreme weather events (hurricanes, droughts, floods).',
        importantKeywords: ['Greenhouse Gases (CO₂, CH₄, N₂O)', 'Greenhouse Effect', 'Fossil Fuels', 'Sea Level Rise', 'Paris Agreement (2015)'],
        memoryTips: 'Greenhouse gases = "CNN": CO₂ (Carbon dioxide), N₂O (Nitrous oxide), CH₄ (Methane — cows and landfills). Paris Agreement goal: Limit warming to 1.5°C above pre-industrial levels.',
        quickSummary: ['Earth\'s temperature rising due to excess greenhouse gases from human activities.', 'Main cause: Burning fossil fuels releases CO₂, trapping more heat.', 'Effects: Melting ice, rising seas, extreme weather, biodiversity loss.'],
        keyConcepts: ['Greenhouse Effect: CO₂, CH₄, N₂O trap heat in the atmosphere.', 'Fossil Fuels: Coal, oil, natural gas — primary source of excess CO₂.', 'Solutions: Renewable energy, reforestation, reducing emissions (Paris Agreement).']
      },

      'climate change': { get subjectName() { return knowledgeBase['global warming'].subjectName; }, get isProgramming() { return knowledgeBase['global warming'].isProgramming; }, get definition() { return knowledgeBase['global warming'].definition; }, get easyExplanation() { return knowledgeBase['global warming'].easyExplanation; }, get example() { return knowledgeBase['global warming'].example; }, get importantKeywords() { return knowledgeBase['global warming'].importantKeywords; }, get memoryTips() { return knowledgeBase['global warming'].memoryTips; }, get quickSummary() { return knowledgeBase['global warming'].quickSummary; }, get keyConcepts() { return knowledgeBase['global warming'].keyConcepts; } },

      /* ═══════ ENGLISH & LITERATURE ═══════ */
      'shakespeare': {
        subjectName: 'English & Literature', isProgramming: false,
        definition: 'William Shakespeare (1564–1616) was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language. He wrote 37 plays, 154 sonnets, and several narrative poems.',
        easyExplanation: 'Shakespeare is called the "Bard of Avon." He wrote plays that people still perform 400+ years later — romantic tragedies (Romeo and Juliet), political dramas (Julius Caesar), comedies (A Midsummer Night\'s Dream), and psychological thrillers (Hamlet, Macbeth).',
        example: 'Famous works: "Romeo and Juliet" (tragic love), "Hamlet" (revenge and existential crisis — "To be or not to be"), "Macbeth" (ambition and guilt), "The Merchant of Venice" (justice and mercy).',
        importantKeywords: ['Tragedies & Comedies', 'Globe Theatre', 'Sonnets (154)', 'Elizabethan Era', 'Iambic Pentameter'],
        memoryTips: 'Four great tragedies: "HOLM" = Hamlet, Othello, (King) Lear, Macbeth. Shakespeare invented 1,700+ English words including "lonely," "generous," and "assassination."',
        quickSummary: ['Greatest English writer: 37 plays, 154 sonnets (1564–1616).', 'Genres: Tragedies (Hamlet, Macbeth), Comedies (Twelfth Night), Histories (Henry V).', 'Performed at the Globe Theatre; influenced English language and literature profoundly.'],
        keyConcepts: ['Tragedies: Hamlet, Othello, King Lear, Macbeth — explore ambition, jealousy, power.', 'Sonnets: 154 poems in iambic pentameter with ABAB CDCD EFEF GG rhyme scheme.', 'Legacy: Invented thousands of words; shaped modern English drama and storytelling.']
      },

      /* ═══════ HINDI ═══════ */
      sandhi: {
        subjectName: 'Hindi Language & Literature', isProgramming: false,
        definition: 'Sandhi (संधि) is a Hindi/Sanskrit grammar concept meaning the joining or combination of two sounds (letters/words) that are close together. The result is a change in the sounds at the junction point. Three main types: Swar Sandhi, Vyanjan Sandhi, Visarg Sandhi.',
        easyExplanation: 'Sandhi means "joining" in Sanskrit. When two words or sounds come together in Hindi, the letters at the meeting point sometimes merge or change. For example, "विद्या + आलय = विद्यालय" — the आ sounds merge into one. It\'s like how "do not" becomes "don\'t" in English.',
        example: 'Swar Sandhi: हिम + आलय = हिमालय (अ + आ = आ). Vyanjan Sandhi: जगत् + नाथ = जगन्नाथ. Visarg Sandhi: दुः + गम = दुर्गम. The type depends on what sounds meet at the junction.',
        importantKeywords: ['Swar Sandhi (स्वर संधि)', 'Vyanjan Sandhi (व्यंजन संधि)', 'Visarg Sandhi (विसर्ग संधि)', 'Sandhi Viched (संधि विच्छेद)', 'Deergh Sandhi (दीर्घ संधि)'],
        memoryTips: 'Three types = "SVV": Swar (vowel + vowel), Vyanjan (consonant + vowel/consonant), Visarg (visarg + vowel/consonant). संधि = जोड़ना, विच्छेद = तोड़ना.',
        quickSummary: ['Joining of two sounds with change at the junction point.', 'Three types: Swar (vowels), Vyanjan (consonants), Visarg.', 'Sandhi Viched = breaking the combined word back into original parts.'],
        keyConcepts: ['Swar Sandhi: Two vowels join (दीर्घ, गुण, वृद्धि, यण, अयादि subtypes).', 'Vyanjan Sandhi: Consonant meets vowel or consonant.', 'Sandhi Viched: Reverse process — splitting combined words into original components.']
      },

      /* ═══════ GENERAL KNOWLEDGE ═══════ */
      'solar system': {
        subjectName: 'General Knowledge', isProgramming: false,
        definition: 'The Solar System consists of the Sun and all objects gravitationally bound to it: 8 planets, their moons, dwarf planets (like Pluto), asteroids, comets, and meteoroids. The Sun contains 99.86% of the system\'s mass.',
        easyExplanation: 'Our Solar System is like a cosmic neighborhood with the Sun as the center. Eight planets orbit the Sun: 4 rocky inner planets (Mercury, Venus, Earth, Mars) and 4 gas giants (Jupiter, Saturn, Uranus, Neptune). Earth is the only planet known to support life.',
        example: 'Planet order from the Sun: Mercury → Venus → Earth → Mars → Jupiter → Saturn → Uranus → Neptune. Jupiter is the largest (1,300 Earths could fit inside). Saturn has spectacular rings made of ice and rock.',
        importantKeywords: ['Sun (Star)', '8 Planets', 'Inner (Rocky) vs Outer (Gas Giants)', 'Asteroid Belt', 'Dwarf Planets (Pluto)'],
        memoryTips: 'Planet order mnemonic: "My Very Educated Mother Just Served Us Nachos" = Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
        quickSummary: ['Sun + 8 planets + moons + asteroids + comets.', 'Inner rocky planets: Mercury, Venus, Earth, Mars.', 'Outer gas giants: Jupiter, Saturn, Uranus, Neptune.'],
        keyConcepts: ['Inner Planets: Small, rocky, close to Sun (Mercury, Venus, Earth, Mars).', 'Outer Planets: Large, gaseous, farther from Sun (Jupiter, Saturn, Uranus, Neptune).', 'Asteroid Belt: Rocky debris between Mars and Jupiter; Kuiper Belt beyond Neptune.']
      }
    };

    const enrich = (data) => {
      if (!data) return data;
      data.subjectName = data.subjectName || sub.subjectName;
      data.isProgramming = (typeof data.isProgramming === 'boolean') ? data.isProgramming : sub.isProgramming;

      if (!data.easyExplanation) {
        data.easyExplanation = `In simple terms, ${topic} is a key concept in ${sub.subjectName}. Think of it as a foundational mechanism that organizes core processes and relationships in this subject.`;
      }

      if (!data.memoryTips) {
        data.memoryTips = `Memory Trick: Focus on the core definition first, remember key operational rules, and connect concepts to practical examples.`;
      }

      if (!data.quickSummary || data.quickSummary.length === 0) {
        if (data.keyConcepts && data.keyConcepts.length > 0) {
          data.quickSummary = data.keyConcepts.slice(0, 4);
        } else {
          data.quickSummary = [
            `Core definition of ${topic} in ${sub.subjectName}.`,
            `Main principles and operational rules.`,
            `High-yield exam takeaways and practical applications.`
          ];
        }
      }

      if (!data.importantKeywords || data.importantKeywords.length === 0) {
        if (data.keyConcepts && data.keyConcepts.length > 0) {
          data.importantKeywords = data.keyConcepts.map(k => k.split(':')[0]);
        } else {
          data.importantKeywords = [`${topic} Principle`, 'Core Definition', 'Practical Application'];
        }
      }

      return data;
    };

    // Exact word boundary matching for curated knowledge base keys
    for (const key in knowledgeBase) {
      if (t === key || new RegExp('\\b' + key.replace(/[+]/g, '\\+') + '\\b', 'i').test(t)) {
        return enrich(knowledgeBase[key]);
      }
    }

    return enrich(this.generateGenericExplanation(topic));
  },


  generateGenericExplanation(topic) {
    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
    const sub = this.detectSubject(topic);

    /* ──────────────────────────────────────────────────────
       Subject-specific rich generic templates
       Instead of one bland generic, we provide different
       high-quality templates per detected subject area.
       ────────────────────────────────────────────────────── */

    let definition, easyExplanation, example, importantKeywords, memoryTips, quickSummary, keyConcepts;

    if (sub.isProgramming) {
      definition = `${cap} is a key concept in ${sub.subjectName}. It refers to a specific technique, structure, or paradigm used in software development to solve problems efficiently, improve code organization, and build robust applications.`;
      easyExplanation = `Think of ${cap} as a tool in a programmer's toolbox. Just like a carpenter uses different tools for different tasks, programmers use ${cap} to write cleaner, faster, and more maintainable code. Understanding it is essential for writing professional-level software.`;
      example = `// Code Example for ${cap}\nclass ${cap.replace(/[^a-zA-Z0-9]/g, '')}Demo {\n    public static void main(String[] args) {\n        System.out.println("Demonstrating ${cap}");\n        // Implement ${cap} logic here\n    }\n}`;
      importantKeywords = [`${cap} Definition`, 'Implementation Syntax', 'Use Cases & Best Practices', 'Time/Space Complexity', 'Real-world Applications'];
      memoryTips = `To remember ${cap}: First understand WHAT it does (definition), then HOW it works (mechanism), then WHERE to use it (applications). Practice writing code examples from memory.`;
      quickSummary = [`${cap} is a fundamental concept in ${sub.subjectName}.`, 'It solves specific problems in software design and development.', 'Master the definition, syntax, and at least one practical example for exams.'];
      keyConcepts = [`Core Idea: The fundamental purpose and mechanism of ${cap}.`, 'Syntax & Implementation: How to write and use it in code.', 'Applications: Where and when to apply it in real projects.'];

    } else if (sub.subjectName === 'History') {
      definition = `${cap} is a significant event/concept in History that shaped political, social, and economic structures. It represents a turning point where established systems were challenged, transformed, or replaced by new ideas and institutions.`;
      easyExplanation = `Imagine living during the time of ${cap} — the world was changing rapidly. Old systems were being questioned, people demanded change, and new ideas spread. Understanding ${cap} helps us see how today's world was shaped by yesterday's events.`;
      example = `Historical Context of ${cap}: This event/concept influenced governance, social structures, and cultural movements. Key figures emerged who led change, and the consequences — both intended and unintended — continue to shape modern institutions.`;
      importantKeywords = [`${cap} — Key Event`, 'Causes & Consequences', 'Important Figures & Dates', 'Social & Political Impact', 'Legacy & Modern Relevance'];
      memoryTips = `For ${cap}, remember the chain: CAUSE → EVENT → CONSEQUENCE. Who were the key people? What was the timeline? What changed as a result? Connect it to something in today's world.`;
      quickSummary = [`${cap} was a major historical event/concept that transformed society.`, 'Driven by specific social, economic, and political causes.', 'Its legacy continues to influence modern governance, culture, and rights.'];
      keyConcepts = ['Causes: The social, economic, and political factors that led to the event.', 'Key Events & Timeline: Major milestones and turning points.', 'Consequences: Short-term and long-term impact on society and governance.'];

    } else if (sub.subjectName === 'Mathematics') {
      definition = `${cap} is a mathematical concept that provides a systematic method for solving problems involving numbers, shapes, or logical relationships. It establishes precise rules and formulas that produce reliable, repeatable results.`;
      easyExplanation = `${cap} is a mathematical tool — like a formula or rule — that helps solve a specific type of problem step by step. Once you understand the pattern, you can apply it to many similar problems, from homework to real engineering challenges.`;
      example = `Mathematical Application of ${cap}: Apply the relevant formula or theorem, substitute known values, and solve step by step. Always verify your answer by substituting it back into the original equation or condition.`;
      importantKeywords = [`${cap} Formula/Theorem`, 'Variables & Constants', 'Step-by-Step Solution Method', 'Proof / Derivation', 'Applications in Problem Solving'];
      memoryTips = `For ${cap}: Learn the FORMULA first, then practice 5 problems. Understand WHY the formula works (derivation), and you'll never forget it. Draw diagrams for geometry topics.`;
      quickSummary = [`${cap} provides a systematic method for solving mathematical problems.`, 'Involves specific formulas, theorems, or rules.', 'Practice with examples and verify answers by substitution.'];
      keyConcepts = ['Formula/Theorem: The core mathematical expression or rule.', 'Conditions: When and where this concept applies.', 'Solved Examples: Step-by-step application to specific problems.'];

    } else if (sub.subjectName === 'Physics') {
      definition = `${cap} is a fundamental concept in Physics that explains how matter, energy, or forces interact in the natural world. It is typically described by mathematical equations and verified through experiments and observations.`;
      easyExplanation = `${cap} explains something about how the physical world works — whether it's how objects move, how energy transfers, or how forces interact. Physicists discovered these rules by observing nature and expressing patterns as mathematical laws.`;
      example = `Physics Application of ${cap}: Use the relevant physical law or equation, identify known quantities (mass, velocity, force, etc.), substitute into the formula, and calculate the unknown. Units matter — always include them!`;
      importantKeywords = [`${cap} Law/Principle`, 'Formula & Equations', 'SI Units', 'Experimental Verification', 'Real-world Applications'];
      memoryTips = `For ${cap}: Remember the FORMULA and its UNITS. Physics = understanding + calculation. Draw free-body diagrams, label forces, and solve step by step.`;
      quickSummary = [`${cap} describes fundamental interactions in the physical world.`, 'Expressed through mathematical equations and laws.', 'Verified through experiments; applicable to real-world engineering.'];
      keyConcepts = ['Law/Principle: The core statement or equation governing the phenomenon.', 'Units & Dimensions: SI units ensure consistent, correct calculations.', 'Applications: How this concept is used in technology, engineering, and daily life.'];

    } else if (sub.subjectName === 'Chemistry') {
      definition = `${cap} is an important concept in Chemistry that explains how substances interact, combine, or transform at the molecular and atomic level. It involves understanding the structure, properties, and reactions of matter.`;
      easyExplanation = `${cap} helps us understand what things are made of and how they change. Chemistry is everywhere — from cooking food (chemical reactions) to how medicines work in your body. ${cap} is one piece of this fascinating puzzle.`;
      example = `Chemical Application of ${cap}: Identify the reactants and products, balance the equation, and note the type of reaction (combination, decomposition, displacement, etc.). Pay attention to molecular formulas and reaction conditions.`;
      importantKeywords = [`${cap} Concept`, 'Atoms & Molecules', 'Chemical Reactions', 'Periodic Table Connection', 'Balancing Equations'];
      memoryTips = `For ${cap}: Learn the KEY REACTION or STRUCTURE first. Draw molecular diagrams. Remember: "Chemistry is just atoms playing musical chairs with electrons!"`;
      quickSummary = [`${cap} explains molecular/atomic interactions and transformations.`, 'Connected to the periodic table and chemical bonding principles.', 'Understand the reaction type, conditions, and products.'];
      keyConcepts = ['Structure: Atomic/molecular arrangement relevant to this concept.', 'Reactions: How substances transform — types and conditions.', 'Applications: Industrial, biological, or environmental significance.'];

    } else if (sub.subjectName === 'Biology & Biochemistry') {
      definition = `${cap} is a fundamental concept in Biology that explains how living organisms function, grow, reproduce, or interact with their environment. It encompasses processes at the cellular, organ, or ecosystem level.`;
      easyExplanation = `${cap} is about how life works. Whether it's how cells divide, how plants make food, or how animals adapt — biology reveals the beautiful machinery of living things. ${cap} is a key piece of this living puzzle.`;
      example = `Biological Significance of ${cap}: This concept plays a vital role in maintaining life processes. It can be observed in cellular activity, organism behavior, or ecosystem dynamics. Understanding it is crucial for medicine, agriculture, and environmental science.`;
      importantKeywords = [`${cap} Process`, 'Cell Biology', 'Organisms & Ecosystem', 'Genetics & Evolution', 'Biological Significance'];
      memoryTips = `For ${cap}: Think of the PROCESS step by step — what happens first, then next? Draw labeled diagrams. Biology loves diagrams! Connect it to real organisms you know.`;
      quickSummary = [`${cap} explains fundamental life processes in organisms.`, 'Operates at cellular, organ, or ecosystem level.', 'Essential for understanding health, medicine, and environmental science.'];
      keyConcepts = ['Process: Step-by-step mechanism of how it works.', 'Structure: Cellular or molecular components involved.', 'Significance: Role in organism survival, health, or ecosystem balance.'];

    } else if (sub.subjectName === 'Geography') {
      definition = `${cap} is a key concept in Geography that relates to Earth's physical features, climate patterns, natural resources, or human-environment interactions. It helps explain why landscapes, weather, and populations vary across the globe.`;
      easyExplanation = `${cap} helps us understand our planet — its mountains, rivers, climates, and how humans interact with the environment. Geography connects the dots between natural processes and human civilization.`;
      example = `Geographic Relevance of ${cap}: This concept influences climate patterns, landforms, resource distribution, or population settlement. It can be observed through maps, satellite imagery, and field studies.`;
      importantKeywords = [`${cap} Geographic Feature`, 'Climate & Weather', 'Physical & Human Geography', 'Maps & Data', 'Environmental Impact'];
      memoryTips = `For ${cap}: Visualize it on a MAP. Geography = "Geo" (Earth) + "Graphy" (writing about). Connect concepts to real places you know — your city, country, or famous landmarks.`;
      quickSummary = [`${cap} explains Earth's physical or human geographic features.`, 'Connected to climate, landforms, and natural resources.', 'Understanding it helps explain why places differ and how environments change.'];
      keyConcepts = ['Physical Features: Mountains, rivers, climate zones related to this concept.', 'Human Impact: How human activities affect or are affected by this feature.', 'Global Patterns: How this concept varies across different regions of the world.'];

    } else if (sub.subjectName === 'Economics') {
      definition = `${cap} is an important concept in Economics that analyzes how individuals, businesses, or governments make decisions about allocating scarce resources to satisfy unlimited wants.`;
      easyExplanation = `Economics is about choices — you have limited money and unlimited wants, so you must choose wisely. ${cap} helps explain how these choices are made, whether by a student buying lunch, a company setting prices, or a government planning its budget.`;
      example = `Economic Application of ${cap}: Consider a real market scenario — how do price changes, government policies, or consumer behavior affect this concept? Use supply-demand analysis or relevant economic models.`;
      importantKeywords = [`${cap} Principle`, 'Scarcity & Choice', 'Market Mechanism', 'Government Policy', 'Micro/Macroeconomic Impact'];
      memoryTips = `For ${cap}: Economics = study of CHOICES under SCARCITY. Ask: Who benefits? Who pays? What are the trade-offs? Use graphs (supply-demand curves) to visualize.`;
      quickSummary = [`${cap} analyzes resource allocation and decision-making.`, 'Involves understanding markets, prices, and government policies.', 'Key to understanding how economies function at micro and macro levels.'];
      keyConcepts = ['Theory: The economic model or principle behind this concept.', 'Market Impact: How it affects prices, production, and consumption.', 'Policy: Government interventions related to this concept.'];

    } else if (sub.subjectName === 'Political Science') {
      definition = `${cap} is a significant concept in Political Science that relates to governance, power structures, citizen rights, or political institutions. It shapes how societies organize authority and make collective decisions.`;
      easyExplanation = `${cap} is about how society is governed — who has power, how decisions are made, and what rights citizens have. Political Science studies these questions to build fairer, more effective governments and protect individual freedoms.`;
      example = `Political Relevance of ${cap}: This concept shapes constitutional frameworks, government policies, and citizen participation. It can be studied through legal documents, political events, and comparative analysis of different countries.`;
      importantKeywords = [`${cap} in Governance`, 'Rights & Duties', 'Government Structure', 'Constitution & Law', 'Democratic Principles'];
      memoryTips = `For ${cap}: Connect it to the CONSTITUTION (which article?) and REAL EVENTS. Political Science = who gets WHAT, WHEN, and HOW (Harold Lasswell's definition).`;
      quickSummary = [`${cap} relates to governance, rights, or political institutions.`, 'Shapes how societies organize power and make collective decisions.', 'Understanding it is key to being an informed, active citizen.'];
      keyConcepts = ['Concept: The core political idea or institution.', 'Constitutional Basis: Legal framework and articles relevant to it.', 'Impact: How it affects governance, rights, and citizen participation.'];

    } else if (sub.subjectName === 'Commerce & Accountancy') {
      definition = `${cap} is a key concept in Commerce that relates to business operations, financial management, or accounting principles. It helps businesses track performance, make decisions, and comply with regulations.`;
      easyExplanation = `${cap} is a concept that helps businesses manage money, track profits and losses, and make smart financial decisions. Whether you're running a small shop or a multinational corporation, understanding ${cap} is essential for financial success.`;
      example = `Business Application of ${cap}: Apply this concept using journal entries, ledger accounts, or financial statements. Follow the relevant accounting standard and double-entry bookkeeping principles.`;
      importantKeywords = [`${cap} Principle`, 'Double-Entry System', 'Financial Statements', 'Assets & Liabilities', 'Profit & Loss'];
      memoryTips = `For ${cap}: Remember the golden rules: Real A/c (Debit what comes in), Personal A/c (Debit the receiver), Nominal A/c (Debit all expenses). Practice journal entries!`;
      quickSummary = [`${cap} is essential for business financial management.`, 'Follows accounting principles and standards.', 'Applied through journal entries, ledgers, and financial statements.'];
      keyConcepts = ['Accounting Principle: The rule or standard governing this concept.', 'Recording: How to record transactions related to it.', 'Financial Impact: How it appears in financial statements.'];

    } else if (sub.subjectName === 'Environmental Science') {
      definition = `${cap} is a concept in Environmental Science that addresses the relationship between human activities and the natural environment, including pollution, conservation, biodiversity, and sustainable development.`;
      easyExplanation = `${cap} is about protecting our planet. Environmental Science studies how human actions (industry, farming, transportation) affect nature (air, water, soil, wildlife) and finds ways to live sustainably without destroying the ecosystems we depend on.`;
      example = `Environmental Significance of ${cap}: This concept affects ecosystems, biodiversity, and human health. Solutions involve policy changes, technological innovation, and individual behavior modifications.`;
      importantKeywords = [`${cap} Issue`, 'Ecosystem Impact', 'Pollution & Conservation', 'Sustainable Development', 'Government Policies'];
      memoryTips = `For ${cap}: Remember the 3 R's: Reduce, Reuse, Recycle. Environmental problems have three dimensions: CAUSE (human activity), EFFECT (on nature), SOLUTION (policy + technology + behavior).`;
      quickSummary = [`${cap} addresses human impact on the natural environment.`, 'Connected to pollution, conservation, and sustainability.', 'Solutions require combined effort: policy, technology, and individual action.'];
      keyConcepts = ['Cause: Human activities contributing to this environmental issue.', 'Impact: Effects on ecosystems, biodiversity, and human health.', 'Solutions: Policy, technology, and behavioral changes to mitigate the problem.'];

    } else if (sub.subjectName === 'English & Literature') {
      definition = `${cap} is a concept in English Language & Literature that relates to literary analysis, language structure, or the study of written and spoken expression. It helps understand how language conveys meaning, emotion, and artistic beauty.`;
      easyExplanation = `${cap} is about understanding and appreciating language — how words create stories, evoke emotions, and persuade readers. Literature is the art of writing; grammar is its toolkit. Understanding ${cap} makes you a better reader, writer, and communicator.`;
      example = `Literary/Linguistic Application of ${cap}: This concept can be identified in poems, novels, speeches, and everyday language. Analyze examples by identifying the device/rule, its effect, and the author's purpose.`;
      importantKeywords = [`${cap} in Literature`, 'Literary Devices', 'Grammar & Syntax', 'Author\'s Purpose', 'Critical Analysis'];
      memoryTips = `For ${cap}: Read examples aloud — literature is meant to be heard! Identify the DEVICE → EFFECT → PURPOSE chain. Keep a vocabulary journal.`;
      quickSummary = [`${cap} relates to language, literature, or communication.`, 'Involves understanding literary devices, grammar, or textual analysis.', 'Strengthens reading comprehension and writing skills.'];
      keyConcepts = ['Concept: The literary device, grammatical rule, or language feature.', 'Examples: Famous works or sentences illustrating this concept.', 'Effect: How it enhances meaning, emotion, or persuasion.'];

    } else if (sub.subjectName === 'Hindi Language & Literature') {
      definition = `${cap} is a concept in Hindi Language & Literature related to Hindi grammar (Vyakaran), literary traditions (Sahitya), or the study of Hindi as a rich national language with deep cultural roots.`;
      easyExplanation = `${cap} is part of Hindi\'s rich language tradition. Hindi grammar (Vyakaran) helps you speak and write correctly, while Hindi literature (Sahitya) — from Kabir and Tulsidas to modern writers — expresses India\'s culture, philosophy, and emotions through beautiful words.`;
      example = `Hindi Application of ${cap}: This concept is used in Hindi grammar exercises, literature analysis, or creative writing. Practice with examples from textbooks and famous Hindi literary works.`;
      importantKeywords = [`${cap} in Hindi`, 'Vyakaran (Grammar)', 'Sahitya (Literature)', 'Bhasha (Language)', 'Hindi Poets & Writers'];
      memoryTips = `For ${cap}: Practice daily — write 5 sentences using this concept. Hindi grammar follows rules like any language. Connect literary concepts to the poet\'s life and era for deeper understanding.`;
      quickSummary = [`${cap} is part of Hindi grammar or literary tradition.`, 'Connected to Hindi Vyakaran rules or Sahitya analysis.', 'Practice with examples from NCERT textbooks and classical Hindi literature.'];
      keyConcepts = ['Grammar Rule: The Vyakaran principle or pattern.', 'Literary Context: How Hindi writers have used this concept.', 'Practice: Examples and exercises for mastery.'];

    } else if (sub.subjectName === 'General Knowledge') {
      definition = `${cap} is a General Knowledge topic covering facts, events, or information of broad educational significance. It spans geography, history, science, current affairs, and cultural awareness.`;
      easyExplanation = `${cap} is something every well-informed person should know. General Knowledge covers a wide range — from world capitals and famous inventions to historical events and scientific discoveries. It\'s the kind of knowledge that helps in exams, quizzes, and everyday conversations.`;
      example = `Key Facts about ${cap}: This topic appears frequently in competitive exams, quizzes, and academic assessments. Memorize key facts, dates, and associated names.`;
      importantKeywords = [`${cap} Facts`, 'Key Dates & Events', 'Famous Personalities', 'World Records & Firsts', 'Current Affairs'];
      memoryTips = `For ${cap}: Create flashcards with key facts. Use mnemonics and association techniques. Read newspapers daily for current affairs. Quiz yourself regularly.`;
      quickSummary = [`${cap} covers important facts and general awareness.`, 'Frequently asked in competitive exams and quizzes.', 'Stay updated through newspapers, magazines, and educational apps.'];
      keyConcepts = ['Facts: Core data points — names, dates, places.', 'Significance: Why this topic matters in the broader context.', 'Exam Relevance: Commonly tested aspects and question patterns.'];

    } else {
      // Ultimate fallback for any undetected subject
      definition = `${cap} is an academic concept that encompasses key principles, theories, and practical applications within its field of study.`;
      easyExplanation = `In simple terms, ${cap} is a foundational idea that helps us understand a specific aspect of the world. Learning it builds a strong base for more advanced topics.`;
      example = `Practical Application of ${cap}: This concept is applied in academic study, professional practice, and real-world problem solving. Understanding the core definition and examples is essential.`;
      importantKeywords = [`${cap} Definition`, 'Core Principles', 'Key Theories', 'Practical Applications', 'Exam-Relevant Facts'];
      memoryTips = `For ${cap}: Start with the DEFINITION, then understand the MECHANISM, and finally memorize EXAMPLES. Teach it to someone else — that\'s the best way to remember!`;
      quickSummary = [`${cap} is a key concept with broad academic significance.`, 'Understanding its definition and applications is essential.', 'Focus on core principles, examples, and exam-relevant details.'];
      keyConcepts = ['Definition: The precise academic meaning and scope.', 'Principles: Core rules or theories that govern this concept.', 'Applications: Where and how this concept is used in practice.'];
    }

    return {
      subjectName: sub.subjectName,
      isProgramming: sub.isProgramming,
      definition,
      easyExplanation,
      example,
      importantKeywords,
      memoryTips,
      quickSummary,
      keyConcepts
    };
  },



      /* ---- 2b. Notes Summarizer Engine ---- */
  summarizeNotes(text) {
    const cleanedText = text.replace(/\r\n/g, '\n').trim();

    // 1. Distinguish genuine code lines vs prose lines
    const rawLines = cleanedText.split('\n').map(l => l.trim()).filter(Boolean);
    const codeLines = [];
    const proseLines = [];

    const isCodeLine = line => /^>>>|^\s*(#include|import\s|from\s|def\s|public\s+class|class\s+\w+\s*\{|var\s+|const\s+|let\s+|function\s+|public\s+static|system\.out\.println|printf\(|console\.log\(|<\?php|SELECT\s+.*FROM|CREATE\s+TABLE)\b/i.test(line);

    rawLines.forEach(line => {
      if (isCodeLine(line)) {
        codeLines.push(line);
      } else {
        proseLines.push(line);
      }
    });

    // 2. Read complete document from beginning to end in sequential section order
    const sections = cleanedText
      .split(/\n\s*\n/)
      .map(sec => sec.trim())
      .filter(sec => sec.length > 10);

    const keyPoints = [];
    const quickRevisionPoints = [];
    const allSentences = [];

    sections.forEach((sec, idx) => {
      const sLines = sec.split(/(?<=[.!?])\s+|\n+/).map(s => s.trim()).filter(s => s.length > 15 && !isCodeLine(s));
      allSentences.push(...sLines);

      if (sLines.length > 0) {
        const headingOrFirst = sLines[0];
        const detailPoint = sLines.length > 1 ? sLines[1] : sLines[0];

        keyPoints.push(`Part ${idx + 1}: ${headingOrFirst}`);

        let cleanQRP = detailPoint.replace(/^[\d-•\s]+/, '');
        if (cleanQRP.length > 120) cleanQRP = cleanQRP.substring(0, 117) + '...';
        quickRevisionPoints.push(cleanQRP);
      }
    });

    // Fallback if no distinct sections exist
    if (keyPoints.length === 0) {
      const fallbackSentences = Array.from(new Set(allSentences.length > 0 ? allSentences : rawLines));
      fallbackSentences.slice(0, 6).forEach((s, i) => {
        keyPoints.push(`Part ${i + 1}: ${s}`);
        quickRevisionPoints.push(s.length > 110 ? s.substring(0, 107) + '...' : s);
      });
    }

    const shortSummary = keyPoints.slice(0, 2).join(' ') || (cleanedText.slice(0, 180) + '...');

    // Extract Keywords across whole text
    const words = cleanedText.match(/\b[A-Z][a-z]{2,}\b|\b[a-z]{4,}\b/g) || [];
    const stopWords = /which|where|there|their|these|those|should|always|before|after|between|through|during|about|would|could|being|other|every|under|above|below|along|since|while|still|using|used|also|from|with|into|that|this|have|been|were|will|they|them|each|some|than|then|when|what|more|most|only|very|such|just|like|make|made|does|done|much|many|well|back|even|give|over|both|come|take|good|long|know|help|tell|call|find|here|look|want|first|last|next|came|seem/;
    const freq = {};
    words.forEach(w => {
      const lower = w.toLowerCase();
      if (!stopWords.test(lower)) {
        freq[lower] = (freq[lower] || 0) + 1;
      }
    });
    const keywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

    // Memory Tip
    let memoryTip = 'Read key points aloud in order and test yourself using active recall.';
    if (keywords.length >= 3) {
      const mWords = keywords.slice(0, 5);
      const acronym = mWords.map(k => k.charAt(0).toUpperCase()).join('');
      memoryTip = `Mnemonic Hook: "${acronym}" → ${mWords.join(' • ')}. Associate each letter with its sequential section concept for rapid exam recall.`;
    }

    // Remember This Callout
    const rememberThis = keyPoints[0] ? keyPoints[0].replace(/^Part \d+:\s*/, '') : 'Focus on foundational section definitions and primary concepts during revision.';

    // Exam Point
    const examPoint = keyPoints[0] ? keyPoints[0].replace(/^Part \d+:\s*/, '') : 'Focus on core definitions and standard principles.';

    // Formatted Code Block ONLY if genuine code syntax is detected
    let formattedCodeBlock = null;
    if (codeLines.length > 0) {
      formattedCodeBlock = codeLines.map(l => l.replace(/^>>>\s*/, '')).join('\n');
    }

    // Revision Tips in logical sequence
    const revisionTips = [
      'Memorize key section definitions in logical order — examiners award direct marks for precise terminology.',
      'Draw clean flowcharts or sequence diagrams following the document flow.',
      'Practice explaining each section summary from memory from Part 1 to the end.',
      'Include at least one concrete example for every main section concept.',
      'Revise these notes 24 hours before your exam for maximum retention.'
    ];

    return {
      shortSummary,
      quickRevisionPoints,
      rememberThis,
      keyPoints,
      keywords: keywords.length > 0 ? keywords : ['Concept', 'Definition', 'Section Point', 'Example'],
      memoryTip,
      examPoint,
      formattedCodeBlock,
      revisionTips
    };
  },



  /* ---- 2c. Quiz Generator Engine ---- */
  generateQuiz(topic) {
    const t = topic.trim().toLowerCase();

    // Support text/notes input directly in quiz generator
    if (topic.length > 50 || topic.includes('\n') || (topic.match(/\./g) || []).length >= 2) {
      const sentences = topic.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 20);
      if (sentences.length >= 3) {
        return this.generateNotesBasedQuiz(sentences);
      }
    }

    const quizBank = {
      c: [
        {
          q: 'What is the output of `printf("%d", 5 / 2);` in standard C?',
          options: ['2.5', '2', '2.0', 'Compilation Error'],
          answer: 1,
          explanation: 'In C, dividing two integers performs integer division, truncating any fractional remainder to return integer 2.',
        },
        {
          q: 'Which operator is used to retrieve the memory address of a variable in C?',
          options: ['*', '&', '->', '%'],
          answer: 1,
          explanation: 'The `&` (address-of) operator returns the memory address location of a variable.',
        },
        {
          q: 'What is a Pointer variable in C?',
          options: [
            'A variable that stores floating-point numbers',
            'A variable that stores the memory address of another variable',
            'A constant defined with #define',
            'A data type for handling text strings'
          ],
          answer: 1,
          explanation: 'A pointer holds the memory address of another variable or function in memory.',
        },
        {
          q: 'Which standard library function dynamically allocates memory on the heap in C?',
          options: ['alloc()', 'malloc()', 'new()', 'create()'],
          answer: 1,
          explanation: '`malloc()` (memory allocation) allocates specified bytes in heap memory and returns a void pointer to the memory block.',
        },
        {
          q: 'What is the default return type of the `main()` function in standard C?',
          options: ['void', 'int', 'float', 'char'],
          answer: 1,
          explanation: 'Standard C (C99/C11/C17) specifies `int` as the return type of `main()`, where returning 0 indicates successful execution.',
        },
      ],

      java: [
        {
          q: 'What is the primary role of the Java Virtual Machine (JVM)?',
          options: [
            'To compile Java source code into bytecode',
            'To execute compiled Java bytecode on any platform',
            'To write and format Java source files',
            'To manage local database tables'
          ],
          answer: 1,
          explanation: 'The JVM parses and executes Java bytecode, enabling Java\'s cross-platform "Write Once, Run Anywhere" capability.',
        },
        {
          q: 'Which keyword is used in Java for class inheritance?',
          options: ['implements', 'extends', 'inherits', 'super'],
          answer: 1,
          explanation: 'The `extends` keyword is used for class inheritance in Java, whereas `implements` is used for interfaces.',
        },
        {
          q: 'Which of the following is NOT a primitive data type in Java?',
          options: ['int', 'boolean', 'double', 'String'],
          answer: 3,
          explanation: '`String` in Java is a reference class object (an immutable sequence of characters), not a primitive data type like int or double.',
        },
        {
          q: 'What happens when an exception is NOT caught in Java?',
          options: [
            'The program ignores it and continues',
            'The thread executing the code terminates abruptly with a stack trace',
            'The JVM restarts automatically',
            'The operating system reboots'
          ],
          answer: 1,
          explanation: 'Uncaught exceptions cause the thread to terminate execution and print an unhandled exception stack trace.',
        },
        {
          q: 'How does Garbage Collection function in Java?',
          options: [
            'Developers must manually call free() for every object',
            'The JVM automatically reclaims heap memory occupied by unreachable objects',
            'It deletes temporary Java source files',
            'It clears CPU registers'
          ],
          answer: 1,
          explanation: 'Java includes an automatic Garbage Collector that frees heap memory allocated to unreferenced objects in the background.',
        },
      ],

      python: [
        {
          q: 'Which of the following data structures is IMMUTABLE in Python?',
          options: ['List', 'Dictionary', 'Tuple', 'Set'],
          answer: 2,
          explanation: 'Tuples are immutable sequence types in Python; their elements cannot be altered, added, or removed after creation.',
        },
        {
          q: 'Which keyword is used to define a function in Python?',
          options: ['function', 'define', 'def', 'fun'],
          answer: 2,
          explanation: 'In Python, the `def` keyword defines a function followed by the function name and parameter list.',
        },
        {
          q: 'What is the output of `len([10, [20, 30], 40])` in Python?',
          options: ['4', '3', '2', 'Error'],
          answer: 1,
          explanation: 'The list contains 3 top-level elements: integer `10`, nested list `[20, 30]`, and integer `40`.',
        },
        {
          q: 'How are code blocks demarcated in Python syntax?',
          options: [
            'Curly braces `{}`',
            'Parentheses `()`',
            'Consistent whitespace indentation',
            'Semicolons `;`'
          ],
          answer: 2,
          explanation: 'Python relies on whitespace indentation instead of curly braces to specify block scope for loops, functions, and classes.',
        },
        {
          q: 'What is a List Comprehension in Python?',
          options: [
            'A documentation string inside a class',
            'A concise syntax to create new lists: `[expr for item in iterable if condition]`',
            'A debugger command to inspect variables',
            'A built-in method for sorting lists'
          ],
          answer: 1,
          explanation: 'List comprehension provides a succinct, readable way to construct lists from existing iterables in one line.',
        },
      ],

      cpp: [
        {
          q: 'Which C++ feature allows multiple functions to share the same name with different parameters?',
          options: ['Function Overriding', 'Function Overloading', 'Virtual Inheritance', 'Encapsulation'],
          answer: 1,
          explanation: 'Function Overloading allows multiple functions in the same scope to share an identifier if their signatures differ.',
        },
        {
          q: 'Which header file is required for input/output stream operations in C++?',
          options: ['<stdio.h>', '<iostream>', '<conio.h>', '<stdlib.h>'],
          answer: 1,
          explanation: '`<iostream>` defines standard console input/output stream objects like `std::cin` and `std::cout`.',
        },
        {
          q: 'What is a Destructor in C++?',
          options: [
            'A function that deletes source files',
            'A special member function `~ClassName()` executed when an object is destroyed',
            'A compiler error flag',
            'A keyword to erase global variables'
          ],
          answer: 1,
          explanation: 'Destructors clean up object resources and free dynamic heap memory automatically when an object goes out of scope.',
        },
        {
          q: 'Which operator dynamically allocates memory on the heap in C++?',
          options: ['malloc', 'alloc', 'new', 'create'],
          answer: 2,
          explanation: 'The `new` operator allocates dynamic memory on the heap and invokes the constructor of the class.',
        },
        {
          q: 'What does declaring a base class method `virtual` achieve in C++?',
          options: [
            'Prevents any derived class from modifying it',
            'Enables runtime dynamic polymorphism so the derived class override is invoked through base pointers',
            'Makes function execution faster',
            'Restricts function access to private members'
          ],
          answer: 1,
          explanation: 'Virtual functions ensure method calls are resolved at runtime based on the actual target object type.',
        },
      ],

      javascript: [
        {
          q: 'What is the difference between `==` and `===` operators in JavaScript?',
          options: [
            '== performs type coercion before comparison; === compares both value and type strictly',
            '== is for strings; === is for numbers',
            '== is deprecated; === is used only for arrays',
            'There is no difference between them'
          ],
          answer: 0,
          explanation: '`==` converts operands to a common type before comparing, whereas `===` (strict equality) requires type and value match.',
        },
        {
          q: 'Which keyword declares a block-scoped variable that CANNOT be reassigned in JavaScript?',
          options: ['var', 'let', 'const', 'static'],
          answer: 2,
          explanation: '`const` creates a block-scoped read-only reference that cannot be reassigned after declaration.',
        },
        {
          q: 'What is a Closure in JavaScript?',
          options: [
            'A function that closes browser tabs',
            'A function bundled together with references to its surrounding lexical environment',
            'A syntax error handler',
            'A method to stop infinite loops'
          ],
          answer: 1,
          explanation: 'A closure gives an inner function access to variables in its outer enclosing scope even after the outer function has returned.',
        },
        {
          q: 'What is the role of the Event Loop in JavaScript?',
          options: [
            'Renders HTML and CSS styles to DOM',
            'Monitors the Call Stack and Callback Queue to handle non-blocking asynchronous tasks',
            'Compiles JS into C++ machine code',
            'Manages GPU hardware rendering'
          ],
          answer: 1,
          explanation: 'The Event Loop checks if the Call Stack is empty and pushes pending callbacks from the micro/macro task queues.',
        },
        {
          q: 'Which method converts a JavaScript object into a JSON string?',
          options: ['JSON.parse()', 'JSON.stringify()', 'Object.toString()', 'JSON.encode()'],
          answer: 1,
          explanation: '`JSON.stringify()` converts JavaScript objects or values into a standard JSON string format.',
        },
      ],

      sql: [
        {
          q: 'Which SQL keyword retrieves only unique non-duplicate column values?',
          options: ['UNIQUE', 'DISTINCT', 'DIFFERENT', 'SINGLE'],
          answer: 1,
          explanation: '`SELECT DISTINCT` filters out duplicate rows from query results.',
        },
        {
          q: 'Which clause filters aggregated records AFTER a `GROUP BY` clause in SQL?',
          options: ['WHERE', 'HAVING', 'ORDER BY', 'FILTER'],
          answer: 1,
          explanation: '`WHERE` filters individual rows before grouping; `HAVING` filters aggregate groups formed by `GROUP BY`.',
        },
        {
          q: 'What does ACID stand for in relational database systems?',
          options: [
            'Atomicity, Consistency, Isolation, Durability',
            'Accuracy, Control, Integrity, Data',
            'Access, Connection, Index, Directory',
            'Automatic, Concurrent, Internal, Distributed'
          ],
          answer: 0,
          explanation: 'ACID properties guarantee reliable transaction processing in database management systems.',
        },
        {
          q: 'What is a Foreign Key in a relational database?',
          options: [
            'An encryption key for passwords',
            'A column in a table that references the Primary Key of another table',
            'A temporary query index',
            'A key stored on an external cloud'
          ],
          answer: 1,
          explanation: 'Foreign Keys enforce referential integrity between related database tables.',
        },
        {
          q: 'Which command permanently deletes a table structure AND all its data in SQL?',
          options: ['DELETE TABLE', 'DROP TABLE', 'TRUNCATE TABLE', 'REMOVE TABLE'],
          answer: 1,
          explanation: '`DROP TABLE` deletes both the table schema definition and all row data permanently.',
        },
      ],

      dsa: [
        {
          q: 'Which data structure operates on a FIFO (First In, First Out) basis?',
          options: ['Stack', 'Queue', 'Binary Search Tree', 'Max Heap'],
          answer: 1,
          explanation: 'A Queue operates on FIFO — the first element enqueued is the first one dequeued.',
        },
        {
          q: 'What is the worst-case time complexity of QuickSort?',
          options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(1)'],
          answer: 2,
          explanation: 'QuickSort degrades to O(n²) worst-case when bad pivot choices occur (e.g. sorted array with first element as pivot).',
        },
        {
          q: 'Which data structure provides O(1) average time complexity for lookup, insertion, and deletion?',
          options: ['Hash Table / Dictionary', 'Sorted Array', 'Singly Linked List', 'Binary Tree'],
          answer: 0,
          explanation: 'Hash Tables compute direct array indices using hash functions to achieve O(1) average operations.',
        },
        {
          q: 'What is the height of a balanced Binary Search Tree containing N nodes?',
          options: ['O(N)', 'O(log N)', 'O(N²)', 'O(1)'],
          answer: 1,
          explanation: 'A balanced BST maintains logarithmic height O(log N), keeping search and insertion operations bounded by O(log N).',
        },
        {
          q: 'Which algorithm design paradigm does Merge Sort use?',
          options: ['Greedy Method', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking'],
          answer: 2,
          explanation: 'Merge Sort recursively divides the array into halves, sorts them, and conquers by merging the sorted subarrays.',
        },
      ],

      os: [
        {
          q: 'What is a Deadlock in Operating Systems?',
          options: [
            'A crash due to disk space overload',
            'A condition where two or more processes are blocked forever waiting for each other\'s resources',
            'A hardware fan failure',
            'An unhandled memory reference'
          ],
          answer: 1,
          explanation: 'Deadlock happens when processes hold resources while waiting for resources held by others in a circular dependency.',
        },
        {
          q: 'Which scheduling algorithm assigns fixed time slices (quanta) to processes in cyclic order?',
          options: ['First-Come First-Served', 'Shortest Job First', 'Round Robin', 'Priority Scheduling'],
          answer: 2,
          explanation: 'Round Robin allocates CPU execution time in fixed quanta, cycling through ready queue processes.',
        },
        {
          q: 'What is Virtual Memory?',
          options: [
            'RAM chips on GPU cards',
            'A memory management technique extending RAM capacity using secondary disk space',
            'Cloud backup storage',
            'Cache memory in CPU cores'
          ],
          answer: 1,
          explanation: 'Virtual memory pages inactive memory chunks between RAM and secondary disk storage to run large applications.',
        },
        {
          q: 'What is a Semaphore in process synchronization?',
          options: [
            'A physical bus wire',
            'An integer variable accessed through atomic wait() and signal() operations to manage critical sections',
            'A file system permission flag',
            'A compiler optimization flag'
          ],
          answer: 1,
          explanation: 'Semaphores synchronize concurrent process access to shared critical section resources.',
        },
        {
          q: 'What is the key difference between a Process and a Thread?',
          options: [
            'Processes share memory; Threads have isolated memory',
            'Processes have isolated virtual address spaces; Threads share process memory and resources',
            'Threads execute slower than processes',
            'Processes run only inside web browsers'
          ],
          answer: 1,
          explanation: 'Processes have independent virtual address spaces; threads within the same process share code, data, and OS resources.',
        },
      ],

      networks: [
        {
          q: 'How many layers are in the OSI (Open Systems Interconnection) reference model?',
          options: ['4', '5', '7', '9'],
          answer: 2,
          explanation: 'The OSI model defines 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.',
        },
        {
          q: 'Which Transport layer protocol provides reliable, connection-oriented data transfer?',
          options: ['UDP', 'IP', 'TCP', 'HTTP'],
          answer: 2,
          explanation: 'TCP (Transmission Control Protocol) provides reliable, ordered, error-checked data delivery using 3-way handshakes.',
        },
        {
          q: 'What is the primary role of DNS (Domain Name System) on the Internet?',
          options: [
            'Encrypting web page traffic',
            'Translating human-friendly domain names (e.g. example.com) into numerical IP addresses',
            'Boosting WiFi signal strength',
            'Storing user account passwords'
          ],
          answer: 1,
          explanation: 'DNS maps human-readable domain names to numerical IP addresses required for network packet routing.',
        },
        {
          q: 'Which IP address version uses 128-bit addresses written in hexadecimal format?',
          options: ['IPv4', 'IPv6', 'MAC Address', 'Subnet Mask'],
          answer: 1,
          explanation: 'IPv6 uses 128-bit hexadecimal addressing to provide a massive address space compared to IPv4\'s 32-bit format.',
        },
        {
          q: 'What is the standard port number for HTTPS secure web traffic?',
          options: ['80', '21', '443', '8080'],
          answer: 2,
          explanation: 'Port 443 is the standard port for encrypted HTTPS traffic (Port 80 is unencrypted HTTP).',
        },
      ],

      html_css: [
        {
          q: 'What is the main purpose of semantic HTML5 tags like `<header>`, `<nav>`, `<article>`, and `<footer>`?',
          options: [
            'To automatically add CSS animations',
            'To provide structural meaning for browsers, search engines (SEO), and screen readers',
            'To speed up JavaScript execution',
            'To connect to SQL databases'
          ],
          answer: 1,
          explanation: 'Semantic HTML tags describe the role of content elements, enhancing accessibility, SEO, and document clarity.',
        },
        {
          q: 'In the CSS Box Model, what is the space located between the element border and inner content?',
          options: ['Margin', 'Padding', 'Outline', 'Gap'],
          answer: 1,
          explanation: 'Padding is the interior space within an element\'s border; Margin is exterior spacing outside the border.',
        },
        {
          q: 'Which CSS Flexbox property aligns flex items along the main axis?',
          options: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
          answer: 1,
          explanation: '`justify-content` manages alignment along the main flex axis, whereas `align-items` operates on the cross axis.',
        },
        {
          q: 'What does the CSS `z-index` property control?',
          options: [
            'Font size scale factor',
            'The vertical stacking order of positioned overlapping elements',
            'Horizontal alignment spacing',
            'Element opacity'
          ],
          answer: 1,
          explanation: '`z-index` specifies the z-axis stacking order of elements positioned with relative, absolute, fixed, or sticky positioning.',
        },
        {
          q: 'Which HTML attribute provides alternate text for screen readers if an image fails to load?',
          options: ['title', 'alt', 'src', 'caption'],
          answer: 1,
          explanation: 'The `alt` attribute provides accessible textual descriptions for images.',
        },
      ],

      oop: [
        {
          q: 'What are the four fundamental pillars of Object-Oriented Programming (OOP)?',
          options: [
            'Input, Output, Processing, Storage',
            'Encapsulation, Abstraction, Inheritance, Polymorphism',
            'Classes, Methods, Variables, Loops',
            'Compiling, Linking, Executing, Debugging'
          ],
          answer: 1,
          explanation: 'The core OOP principles are Encapsulation, Abstraction, Inheritance, and Polymorphism.',
        },
        {
          q: 'What does Encapsulation achieve in OOP design?',
          options: [
            'Allows any function to modify object properties directly',
            'Bundles internal state data and methods together while restricting direct access from outside',
            'Deletes unused objects from heap memory',
            'Converts object code into SQL database queries'
          ],
          answer: 1,
          explanation: 'Encapsulation protects object state integrity by exposing controlled public methods while hiding internal private variables.',
        },
        {
          q: 'What is Polymorphism in OOP?',
          options: [
            'Creating multiple copies of a class file',
            'The ability of different classes to respond to the same method call in unique ways',
            'Storing objects in binary files',
            'Preventing classes from inheriting properties'
          ],
          answer: 1,
          explanation: 'Polymorphism allows objects of different types to be treated through a shared interface, executing specialized behaviors.',
        },
        {
          q: 'How does an Abstract Class differ from a standard Class?',
          options: [
            'Abstract classes cannot be instantiated directly and often contain unimplemented abstract methods',
            'Abstract classes cannot contain any variables',
            'Abstract classes execute faster than normal classes',
            'Abstract classes are used only for database connections'
          ],
          answer: 0,
          explanation: 'Abstract classes serve as blueprints for derived subclasses and cannot be instantiated directly with `new`.',
        },
        {
          q: 'What is Inheritance in OOP?',
          options: [
            'A mechanism where a child class acquires properties and behaviors of a parent class',
            'Copying source code files into another directory',
            'Sharing variables across multiple threads',
            'Importing third-party libraries'
          ],
          answer: 0,
          explanation: 'Inheritance allows new subclasses to reuse code and extend capabilities from existing superclasses.',
        },
      ],

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
          explanation: 'Oxygen (O₂) is released as a byproduct when water molecules are split during light reactions.',
        },
        {
          q: 'What is the main energy source for photosynthesis?',
          options: ['Heat', 'Sunlight', 'Wind', 'Water'],
          answer: 1,
          explanation: 'Sunlight provides the radiant energy that drives the light-dependent reactions of photosynthesis.',
        },
        {
          q: 'Which compound is the primary carbohydrate product of photosynthesis?',
          options: ['Starch', 'Protein', 'Glucose (C₆H₁₂O₆)', 'Lipids'],
          answer: 2,
          explanation: 'Glucose is the primary carbohydrate product, used as cellular energy or stored as starch.',
        },
        {
          q: 'What does the Calvin Cycle produce?',
          options: ['ATP only', 'Oxygen', 'Glucose precursors (G3P)', 'Water'],
          answer: 2,
          explanation: 'The Calvin Cycle (light-independent reactions) uses CO₂ and ATP to produce G3P, which is synthesized into glucose.',
        },
      ],

      'machine learning': [
        {
          q: 'Which type of machine learning uses labeled training data?',
          options: ['Unsupervised Learning', 'Reinforcement Learning', 'Supervised Learning', 'Deep Learning'],
          answer: 2,
          explanation: 'Supervised Learning trains models on labeled datasets where ground-truth outputs are provided.',
        },
        {
          q: 'What is Overfitting in machine learning?',
          options: [
            'Model performs well on both training and test data',
            'Model memorizes training data noise and performs poorly on unseen test data',
            'Model is too simple to capture patterns',
            'Model trains too slowly'
          ],
          answer: 1,
          explanation: 'Overfitting happens when a model fits training noise too closely, failing to generalize to new test data.',
        },
        {
          q: 'Which algorithm is commonly used for classification tasks?',
          options: ['K-Means Clustering', 'Principal Component Analysis', 'Decision Tree', 'Linear Regression'],
          answer: 2,
          explanation: 'Decision Trees classify data by splitting feature space at node branches based on feature values.',
        },
        {
          q: 'What does the term "epoch" mean in machine learning?',
          options: [
            'A single training sample',
            'One complete pass through the entire training dataset',
            'A type of neural network layer',
            'The learning rate multiplier'
          ],
          answer: 1,
          explanation: 'An epoch represents one full forward and backward pass over the entire training dataset.',
        },
        {
          q: 'What is the purpose of a train-test split?',
          options: [
            'To make the model train faster',
            'To reduce dataset file size',
            'To evaluate model performance on unseen data',
            'To increase feature dimension'
          ],
          answer: 2,
          explanation: 'Evaluating models on an unseen test set provides an unbiased estimate of real-world performance.',
        },
      ],

      'periodic table': [
        {
          q: 'Who created the modern Periodic Table framework in 1869?',
          options: ['Albert Einstein', 'Marie Curie', 'Dmitri Mendeleev', 'John Dalton'],
          answer: 2,
          explanation: 'Dmitri Mendeleev arranged elements by atomic mass and predicted properties of undiscovered elements.',
        },
        {
          q: 'How many groups (vertical columns) are in the modern Periodic Table?',
          options: ['7', '14', '18', '10'],
          answer: 2,
          explanation: 'The modern IUPAC Periodic Table has 18 vertical groups of elements with similar valence electron configurations.',
        },
        {
          q: 'What fundamental atomic property determines an element\'s position in the modern Periodic Table?',
          options: ['Atomic mass', 'Atomic number (protons)', 'Neutron count', 'Melting point'],
          answer: 1,
          explanation: 'Elements are ordered by increasing atomic number (number of protons in the nucleus).',
        },
        {
          q: 'Elements in the same group of the Periodic Table share:',
          options: ['Same atomic mass', 'Same number of neutrons', 'Same number of valence electrons', 'Same melting point'],
          answer: 2,
          explanation: 'Elements in the same vertical group share the same number of outer-shell valence electrons.',
        },
        {
          q: 'Which block of the Periodic Table contains the transition metals?',
          options: ['s-block', 'p-block', 'd-block', 'f-block'],
          answer: 2,
          explanation: 'Transition metals occupy the d-block (Groups 3-12), characterized by partially filled d-orbitals.',
        },
      ],

      calculus: [
        {
          q: 'What does the derivative of a function represent geometrically?',
          options: ['Area under the curve', 'Instantaneous rate of change / tangent slope', 'Average function value', 'The y-intercept'],
          answer: 1,
          explanation: 'The first derivative f\'(x) measures the instantaneous rate of change or tangent slope at any point x.',
        },
        {
          q: 'What is the derivative of f(x) = x³ with respect to x?',
          options: ['x²', '3x²', '3x', 'x⁴/4'],
          answer: 1,
          explanation: 'Applying the Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹. Thus d/dx(x³) = 3x².',
        },
        {
          q: 'What does a definite integral represent geometrically?',
          options: ['The slope of the tangent line', 'The maximum value', 'The exact net area under a curve', 'The average rate of change'],
          answer: 2,
          explanation: 'A definite integral evaluates the net area bounded between a function curve f(x) and the x-axis.',
        },
        {
          q: 'The Fundamental Theorem of Calculus connects which two operations?',
          options: ['Addition and Subtraction', 'Differentiation and Integration', 'Multiplication and Division', 'Limits and Sequences'],
          answer: 1,
          explanation: 'The FTC proves that differentiation and integration are inverse operations.',
        },
        {
          q: 'Which rule is used to differentiate a product of two functions u(x)·v(x)?',
          options: ['Chain Rule', 'Power Rule', 'Product Rule', 'Quotient Rule'],
          answer: 2,
          explanation: 'The Product Rule state: d/dx[u·v] = u·v\' + v·u\'.',
        },
      ],

      economics: [
        {
          q: 'What does GDP stand for in economics?',
          options: ['General Domestic Price', 'Gross Domestic Product', 'Government Data Plan', 'Global Distribution Pattern'],
          answer: 1,
          explanation: 'GDP measures the total monetary value of all final goods and services produced within a country in a given period.',
        },
        {
          q: 'According to the Law of Demand, what happens to quantity demanded when price increases?',
          options: ['Increases', 'Stays the same', 'Decreases', 'Doubles'],
          answer: 2,
          explanation: 'The Law of Demand states that price and quantity demanded have an inverse relationship.',
        },
        {
          q: 'What is Opportunity Cost?',
          options: [
            'The monetary cost of goods',
            'The value of the next best alternative forgone when making a choice',
            'Government taxes on sales',
            'Market price index'
          ],
          answer: 1,
          explanation: 'Opportunity cost represents the lost benefits of the next best option given up when making a decision.',
        },
        {
          q: 'Inflation is best described as:',
          options: [
            'A decrease in central bank spending',
            'A fall in interest rates',
            'A sustained rise in the general price level of goods and services',
            'An increase in real GDP'
          ],
          answer: 2,
          explanation: 'Inflation is a persistent increase in average price levels, reducing purchasing power over time.',
        },
        {
          q: 'Fiscal Policy involves:',
          options: [
            'Setting interest rates by the central bank',
            'Government decisions regarding taxation and public spending',
            'International trade tariffs',
            'Corporate profit strategies'
          ],
          answer: 1,
          explanation: 'Fiscal policy refers to government tax and spending decisions used to guide economic activity.',
        },
      ],

      physics: [
        {
          q: 'What is Newton\'s Second Law of Motion equation?',
          options: ['E = m·c²', 'F = m·a', 'V = I·R', 'P = W / t'],
          answer: 1,
          explanation: 'Newton\'s 2nd Law states Force equals mass times acceleration (F = m·a).',
        },
        {
          q: 'What is the standard acceleration due to gravity on Earth\'s surface?',
          options: ['5.8 m/s²', '9.81 m/s²', '12.4 m/s²', '3.0 × 10⁸ m/s²'],
          answer: 1,
          explanation: 'Standard gravitational acceleration near Earth\'s surface is approximately 9.81 m/s².',
        },
        {
          q: 'What is the SI unit of electrical resistance?',
          options: ['Volt', 'Ampere', 'Ohm (Ω)', 'Watt'],
          answer: 2,
          explanation: 'Electrical resistance is measured in Ohms (Ω), defined by Ohm\'s Law: R = V / I.',
        },
        {
          q: 'According to the Law of Conservation of Energy:',
          options: [
            'Total energy decreases as work is performed',
            'Energy cannot be created or destroyed, only transformed from one form to another',
            'Kinetic energy is always greater than potential energy',
            'Energy disappears due to friction'
          ],
          answer: 1,
          explanation: 'Energy is conserved in isolated systems; it converts between forms (e.g. potential to kinetic).',
        },
        {
          q: 'What is the speed of light in a vacuum (c)?',
          options: ['300,000 m/s', '3.0 × 10⁸ m/s', '1,500 m/s', '9.8 m/s'],
          answer: 1,
          explanation: 'The speed of light in vacuum is approximately 3.0 × 10⁸ meters per second.',
        },
      ],

      chemistry: [
        {
          q: 'What is the pH value of pure neutral water at 25°C?',
          options: ['0', '7', '14', '1'],
          answer: 1,
          explanation: 'Pure water has a neutral pH of 7 ([H⁺] = 10⁻⁷ M). pH < 7 is acidic; pH > 7 is basic.',
        },
        {
          q: 'Which type of chemical bond involves the SHARING of electron pairs between non-metal atoms?',
          options: ['Ionic Bond', 'Covalent Bond', 'Metallic Bond', 'Hydrogen Bond'],
          answer: 1,
          explanation: 'Covalent bonds form when non-metal atoms share electron pairs to attain stable octets.',
        },
        {
          q: 'What is Avogadro\'s Number (particles per mole of substance)?',
          options: ['3.14 × 10²³', '6.022 × 10²³', '9.81 × 10¹⁰', '1.602 × 10⁻¹⁹'],
          answer: 1,
          explanation: 'One mole of any chemical substance contains 6.022 × 10²³ elementary entities.',
        },
        {
          q: 'Which element has the atomic number 1 on the Periodic Table?',
          options: ['Helium', 'Carbon', 'Hydrogen', 'Oxygen'],
          answer: 2,
          explanation: 'Hydrogen (H) has atomic number 1, containing 1 proton in its nucleus.',
        },
        {
          q: 'What occurs during an Oxidation reaction?',
          options: ['Loss of electrons', 'Gain of electrons', 'Gain of protons', 'Loss of neutrons'],
          answer: 0,
          explanation: 'Oxidation involves the loss of electrons (OIL: Oxidation Is Loss).',
        },
      ],

      biology: [
        {
          q: 'Which organelle is known as the "Powerhouse of the Cell"?',
          options: ['Ribosome', 'Mitochondria', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
          answer: 1,
          explanation: 'Mitochondria generate cellular ATP energy through aerobic respiration.',
        },
        {
          q: 'What molecule carries hereditary genetic instructions in living organisms?',
          options: ['RNA', 'DNA', 'ATP', 'Glucose'],
          answer: 1,
          explanation: 'DNA (Deoxyribonucleic Acid) stores genetic instructions for cellular growth, development, and reproduction.',
        },
        {
          q: 'What cellular process produces two identical diploid daughter cells for body growth?',
          options: ['Meiosis', 'Mitosis', 'Binary Fission', 'Budding'],
          answer: 1,
          explanation: 'Mitosis is somatic cell division producing two genetically identical diploid daughter cells.',
        },
        {
          q: 'What is the role of Enzymes in biological systems?',
          options: ['Store genetic code', 'Act as biological catalysts to speed up chemical reactions', 'Transport oxygen in blood', 'Form structural cell walls'],
          answer: 1,
          explanation: 'Enzymes lower activation energy to accelerate biochemical metabolic reactions.',
        },
        {
          q: 'Which blood cells defend the human body against foreign pathogens and infections?',
          options: ['Red Blood Cells (Erythrocytes)', 'White Blood Cells (Leukocytes)', 'Platelets (Thrombocytes)', 'Plasma'],
          answer: 1,
          explanation: 'Leukocytes (White Blood Cells) are primary immune cells fighting infections.',
        },
      ],

      history: [
        {
          q: 'Which major world conflict began in 1914 following the assassination of Archduke Franz Ferdinand?',
          options: ['World War II', 'World War I', 'The French Revolution', 'The Cold War'],
          answer: 1,
          explanation: 'World War I was ignited in July 1914 after Archduke Franz Ferdinand was assassinated in Sarajevo.',
        },
        {
          q: 'What is a Primary Source in historical research?',
          options: ['Secondary textbook analysis', 'Original first-hand contemporary evidence (e.g. diaries, letters, original treaties)', 'Modern encyclopedia entry', 'Historical movie'],
          answer: 1,
          explanation: 'Primary sources are original first-hand records created during the historical period under study.',
        },
        {
          q: 'Which ancient civilization constructed the Pyramids of Giza along the Nile River?',
          options: ['Ancient Rome', 'Mesopotamia', 'Ancient Egypt', 'Indus Valley Civilization'],
          answer: 2,
          explanation: 'Ancient Egyptians built the Giza pyramid complex along the fertile Nile River.',
        },
        {
          q: 'What was the primary transformation during the Industrial Revolution?',
          options: [
            'Shift from agrarian manual craft to mechanized factory manufacturing and steam power',
            'Invention of microprocessors',
            'Expansion of feudalism',
            'Decline of maritime trade'
          ],
          answer: 0,
          explanation: 'The Industrial Revolution transformed economies from handcrafting to machine manufacturing.',
        },
        {
          q: 'What was the central cultural movement of the European Renaissance?',
          options: [
            'Revival of classical art, literature, scientific inquiry, and humanism',
            'Fall of the Roman Empire',
            'Rise of feudal monarchies',
            'Collapse of international trade'
          ],
          answer: 0,
          explanation: 'The Renaissance was a cultural rebirth in Europe that revitalized classical learning and arts.',
        },
      ],

      geography: [
        {
          q: 'Which layer of Earth\'s atmosphere contains the ozone layer that shields against UV radiation?',
          options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
          answer: 1,
          explanation: 'The Stratosphere houses the ozone layer (O₃), filtering harmful solar ultraviolet radiation.',
        },
        {
          q: 'What geological process causes continental drift and earthquake activity?',
          options: ['Atmospheric pressure', 'Plate Tectonics', 'Oceanic tides', 'Solar radiation'],
          answer: 1,
          explanation: 'Plate tectonics describes motion of lithospheric plates driven by mantle convection.',
        },
        {
          q: 'What is the longest river in the world by length?',
          options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
          answer: 1,
          explanation: 'The Nile River in Africa is historically recognized as the longest river (~6,650 km).',
        },
        {
          q: 'What does map scale express in geography?',
          options: ['Elevation height', 'Ratio between distance on a map and actual ground distance', 'City population density', 'Longitude degrees'],
          answer: 1,
          explanation: 'Map scale defines the quantitative ratio between map distance and real-world ground distance.',
        },
        {
          q: 'What is the Pacific "Ring of Fire"?',
          options: [
            'A desert in Africa',
            'A major Pacific basin area prone to frequent earthquakes and volcanic eruptions',
            'A solar eclipse phenomenon',
            'An ocean current'
          ],
          answer: 1,
          explanation: 'The Ring of Fire is a Pacific basin perimeter marked by intense seismic activity and volcanoes.',
        },
      ]
    };

    // Determine base question pool
    let pool;

    // 1. Topic Regex Resolver for exact language/subject matching
    if (/\b(c|c programming|c language|c coding|c basics)\b/i.test(t) && !/c\+\+|cpp|c\#|css/i.test(t)) {
      pool = quizBank.c;
    } else if (/\b(java|java programming|java language|oops in java|jdk|jvm)\b/i.test(t) && !/javascript|js/i.test(t)) {
      pool = quizBank.java;
    } else if (/\b(python|python programming|py|python3)\b/i.test(t)) {
      pool = quizBank.python;
    } else if (/\b(c\+\+|cpp|c plus plus)\b/i.test(t)) {
      pool = quizBank.cpp;
    } else if (/\b(javascript|js|es6|ecmascript|front end|frontend)\b/i.test(t)) {
      pool = quizBank.javascript;
    } else if (/\b(sql|dbms|database|mysql|postgresql|sqlite|rdbms)\b/i.test(t)) {
      pool = quizBank.sql;
    } else if (/\b(dsa|data structures|algorithms|data structure|sorting|searching|binary search|stack|queue|linked list|trees|graphs)\b/i.test(t)) {
      pool = quizBank.dsa;
    } else if (/\b(operating system|operating systems|os|linux|process scheduling|deadlock)\b/i.test(t)) {
      pool = quizBank.os;
    } else if (/\b(computer networks|networking|tcp\/ip|osi model|ip address|http|https)\b/i.test(t)) {
      pool = quizBank.networks;
    } else if (/\b(html|css|web design|flexbox|grid)\b/i.test(t)) {
      pool = quizBank.html_css;
    } else if (/\b(oop|oops|object oriented programming|object oriented)\b/i.test(t)) {
      pool = quizBank.oop;
    } else if (/\b(photosynthesis|light reaction|calvin cycle)\b/i.test(t)) {
      pool = quizBank.photosynthesis;
    } else if (/\b(machine learning|deep learning|ai|artificial intelligence|supervised learning)\b/i.test(t)) {
      pool = quizBank['machine learning'];
    } else if (/\b(periodic table|mendeleev|atomic number|elements)\b/i.test(t)) {
      pool = quizBank['periodic table'];
    } else if (/\b(calculus|derivative|integration|integrals|derivatives|differentiation)\b/i.test(t)) {
      pool = quizBank.calculus;
    } else if (/\b(economics|microeconomics|macroeconomics|gdp|inflation|demand supply)\b/i.test(t)) {
      pool = quizBank.economics;
    } else if (/\b(physics|newton|kinematics|thermodynamics|optics|gravity)\b/i.test(t)) {
      pool = quizBank.physics;
    } else if (/\b(chemistry|organic chemistry|acids bases|chemical bonding|stoichiometry)\b/i.test(t)) {
      pool = quizBank.chemistry;
    } else if (/\b(biology|cell biology|genetics|dna|genomics|anatomy|physiology)\b/i.test(t)) {
      pool = quizBank.biology;
    } else if (/\b(history|world war|revolutions|ancient history|medieval history)\b/i.test(t)) {
      pool = quizBank.history;
    } else if (/\b(geography|physical geography|plate tectonics|climatology|topography)\b/i.test(t)) {
      pool = quizBank.geography;
    } else {
      // 2. Check substring keys in bank
      for (const [key, questions] of Object.entries(quizBank)) {
        if (t.includes(key)) { pool = questions; break; }
      }
      // 3. Dynamic fallback
      if (!pool) pool = this.generateGenericQuiz(topic.trim());
    }

    return pool;
  },

  /**
   * Apply difficulty filter and count limit to a question pool.
   * opts: { difficulty: 'easy'|'medium'|'hard', numQuestions: number }
   */
    /**
   * Helper to generate dynamic single question based on subject, difficulty, and index
   */
  generateSingleQuestion(topic, difficulty, idx) {
    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);
    const sub = this.detectSubject(topic);

    if (difficulty === 'easy') {
      return {
        q: `[Easy] What is the basic definition or primary role of ${cap} in ${sub.subjectName}?`,
        options: [
          `The foundational principle/mechanism that defines ${cap}`,
          `An unrelated secondary concept with no direct role`,
          `A temporary fallback used only in deprecated legacy systems`,
          `An arbitrary naming convention with no functional effect`
        ],
        answer: 0,
        explanation: `Easy Level Question: Focuses on basic definition and direct fundamental understanding of ${cap}.`,
        difficulty: 'easy'
      };
    } else if (difficulty === 'hard') {
      return {
        q: `[Hard] Analytical Case Study #${idx}: In a complex ${sub.subjectName} scenario involving ${cap} under strict constraints, which evaluation is correct?`,
        options: [
          `${cap} optimizes system performance by dynamically balancing boundary conditions and eliminating single points of failure.`,
          `${cap} causes structural degradation under all conditions regardless of constraints.`,
          `${cap} operates independently without responding to parameter changes.`,
          `${cap} produces unpredictable outcomes that violate foundational domain rules.`
        ],
        answer: 0,
        explanation: `Hard Level Question: Requires analytical evaluation, multi-concept synthesis, and constraint analysis for ${cap}.`,
        difficulty: 'hard'
      };
    } else {
      return {
        q: `[Medium] Application Scenario #${idx}: How is ${cap} applied in practical ${sub.subjectName} problem solving?`,
        options: [
          `By implementing standard procedures to transform inputs into predictable outputs`,
          `By bypassing core rules to achieve temporary execution`,
          `By replacing all structural components with unverified assumptions`,
          `By restricting operational access to a single static condition`
        ],
        answer: 0,
        explanation: `Medium Level Question: Evaluates conceptual understanding and practical application of ${cap}.`,
        difficulty: 'medium'
      };
    }
  },

  /**
   * Apply difficulty filter and count limit to a question pool.
   * opts: { difficulty: 'easy'|'medium'|'hard', numQuestions: number }
   */
  applyQuizOpts(pool, opts = {}) {
    const { difficulty = 'medium', numQuestions = 5 } = opts;
    const n = parseInt(numQuestions, 10) || 5;

    const diffTagMap = { easy: '[Easy]', medium: '[Medium]', hard: '[Hard]' };
    const targetTag = diffTagMap[difficulty] || '[Medium]';

    let filtered = pool.filter(q => q.q.includes(targetTag) || q.difficulty === difficulty);
    if (filtered.length === 0) {
      filtered = [...pool];
    }

    const shuffled = filtered.slice().sort(() => 0.5 - Math.random());
    const result = [...shuffled];

    const topicName = (pool[0] && pool[0].q) ? pool[0].q.replace(/\[.*?\]/g, '').slice(0, 30).trim() : 'Subject Topic';

    while (result.length < n) {
      const qObj = this.generateSingleQuestion(topicName, difficulty, result.length + 1);
      result.push(qObj);
    }

    return result.slice(0, n);
  },


  /* ---- 2d. Study Planner Engine ---- */
  generateStudyPlan(subjects, prepLevel = 'intermediate') {
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

            // Prep-level adjusts how early intensive revision kicks in
            const revisionThreshold = prepLevel === 'beginner' ? 5 : prepLevel === 'advanced' ? 2 : 3;
            const mockInterval = prepLevel === 'beginner' ? 7 : prepLevel === 'advanced' ? 3 : 5;

            if (item.daysLeft === 1) {
              sessionType = 'final-revision';
              sessionLabel = '⭐ Final Exam Revision';
            } else if (item.daysLeft <= revisionThreshold) {
              sessionType = 'revision';
              sessionLabel = prepLevel === 'advanced' ? '🔄 Speed Revision' : '🔄 Intensive Revision';
            } else if (item.daysLeft % mockInterval === 0) {
              sessionType = 'practice';
              sessionLabel = prepLevel === 'beginner' ? '✍️ Guided Practice' : '🎯 Mock Test / Self-Test';
            } else if (item.daysLeft % 4 === 0) {
              sessionType = 'revision';
              sessionLabel = prepLevel === 'beginner' ? '📖 Foundation Review' : '🔄 Topic Review';
            } else if (prepLevel === 'advanced' && item.daysLeft % 2 === 0) {
              sessionType = 'practice';
              sessionLabel = '⚡ Advanced Problem Solving';
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
    const sub = this.detectSubject(topic);

    if (this.flashcardBank && this.flashcardBank[t]) {
      return this.flashcardBank[t];
    }

    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);

    if (sub.isProgramming) {
      return [
        {
          tag: 'CONCEPT & OVERVIEW',
          q: `What is the core programming concept behind ${cap}?`,
          a: `${cap} is a fundamental computing mechanism in ${sub.subjectName} designed to structure control flow, process data structures, or execute algorithmic tasks.`
        },
        {
          tag: 'SYNTAX & SIGNATURE',
          q: `What is the standard syntax pattern and declaration for ${cap}?`,
          a: `Standard Syntax:\n// Declaration & syntax for ${cap}\nType ${cap.replace(/[^a-zA-Z0-9]/g, '')}(parameters) {\n    // Implementation statement\n}`
        },
        {
          tag: 'CODE IMPLEMENTATION',
          q: `Write a clean code snippet demonstrating ${cap}.`,
          a: `Executable Example:\nfunction demo${cap.replace(/[^a-zA-Z0-9]/g, '')}() {\n    let data = [1, 2, 3];\n    console.log("Executing ${cap}:", data);\n}`
        },
        {
          tag: 'OPERATIONAL RULES',
          q: `What are the key execution rules, scope, and memory considerations for ${cap}?`,
          a: `1. Validate boundary conditions and non-null states.\n2. Manage scope lifecycle and allocation.\n3. Optimize space and time complexity.`
        },
        {
          tag: 'EXAM QA & PITFALL',
          q: `Exam QA: What common mistake should be avoided when programming with ${cap}?`,
          a: `Common Pitfall: Off-by-one errors or unhandled edge cases.\nFix: Use strict condition checks and trace variables.`
        }
      ];
    } else {
      return [
        {
          tag: 'ACADEMIC DEFINITION',
          q: `What is the precise academic definition of ${cap}?`,
          a: `${cap} is defined as the foundational principle or system governing relationships and processes within ${sub.subjectName}.`
        },
        {
          tag: 'FORMULA & CORE LAWS',
          q: `What fundamental formula, equation, or governing law applies to ${cap}?`,
          a: `Core Rule/Formula:\nAlways state initial parameters, apply the standard quantitative or conceptual equation for ${cap}, and verify units/conditions.`
        },
        {
          tag: 'IMPORTANT FACTS & DATES',
          q: `What key facts, historical context, or essential points define ${cap}?`,
          a: `Key Facts & Context:\n• Established as a core milestone in ${sub.subjectName}.\n• Operates according to verified empirical laws and structural rules.\n• Serves as a prerequisite for advanced study.`
        },
        {
          tag: 'PRACTICAL APPLICATION',
          q: `How is ${cap} applied in real-world scenarios or modern study?`,
          a: `In practice, ${cap} is used to model real-world phenomena, make predictions, analyze case studies, and optimize practical solutions.`
        },
        {
          tag: 'EXAM REVISION POINT',
          q: `Exam QA: State the key examination takeaway for ${cap}.`,
          a: `Model Answer Point:\nGive the exact definition (1 mark), 2 key characteristics (2 marks), governing formula/context (1 mark), and a real-world example (1 mark).`
        }
      ];
    }
  },

};

if (typeof global !== "undefined") global.AI = AI;
if (typeof window !== "undefined") window.AI = AI;

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

  // Scroll-based header background styling
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });
  }

  // Smooth scroll handler for all internal anchor links (nav links, hero buttons, footer links)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        // Close mobile menu if open
        if (hamburger && mobileMenu && mobileMenu.classList.contains('open')) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        }

        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Active nav highlighting on scroll (Desktop + Mobile)
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        desktopLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
        mobileLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

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
      const subInfo = data.subjectName ? ` — ${data.subjectName}` : '';

      let html = `<div class="output-topic-title"><i data-lucide="book-open" class="inline-icon"></i> ${capTopic} ${subInfo}</div>`;

      // 1. Definition
      if (data.definition) {
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="book" class="inline-icon"></i> 1. Definition
            </div>
            <p class="output-intro" style="margin-bottom:0;line-height:1.6;">${escapeHtml(data.definition)}</p>
          </div>`;
      }

      // 2. Easy Explanation
      if (data.easyExplanation) {
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="smile" class="inline-icon"></i> 2. Easy Explanation
            </div>
            <div style="background:rgba(37,99,235,0.05);padding:0.75rem 1rem;border-left:3px solid var(--clr-primary);border-radius:4px;font-size:0.92rem;line-height:1.6;color:var(--clr-text-primary);">${escapeHtml(data.easyExplanation)}</div>
          </div>`;
      }

      // 3. Practical Example (Code example for programming topics; clear non-code example for theory topics)
      if (data.example) {
        if (data.isProgramming) {
          html += `
            <div style="margin-bottom:1.2rem;">
              <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
                <i data-lucide="code" class="inline-icon"></i> 3. Code Example & Syntax
              </div>
              <div style="background:var(--clr-surface-2);border:1px solid var(--clr-border);padding:0.75rem 1rem;border-radius:var(--radius-md);font-family:monospace;font-size:0.88rem;white-space:pre-wrap;color:var(--clr-text-primary);overflow-x:auto;">${escapeHtml(data.example)}</div>
            </div>`;
        } else {
          html += `
            <div style="margin-bottom:1.2rem;">
              <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
                <i data-lucide="zap" class="inline-icon"></i> 3. Practical Example
              </div>
              <div style="background:var(--clr-surface-2);border:1px solid var(--clr-border);padding:0.75rem 1rem;border-radius:var(--radius-md);font-size:0.9rem;line-height:1.6;color:var(--clr-text-primary);">${escapeHtml(data.example)}</div>
            </div>`;
        }
      }

      // 4. Important Keywords
      if (data.importantKeywords && data.importantKeywords.length > 0) {
        const kwList = data.importantKeywords.map((k, i) => `<li style="animation-delay:${i * 0.05}s">${escapeHtml(k)}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="key" class="inline-icon"></i> 4. Important Keywords
            </div>
            <ul class="output-key-points">${kwList}</ul>
          </div>`;
      }

      // 5. Memory Tips
      if (data.memoryTips) {
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-warning);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="lightbulb" class="inline-icon"></i> 5. Memory Tip / Mnemonic
            </div>
            <div style="background:rgba(245,158,11,0.08);border-left:3px solid var(--clr-warning);padding:0.75rem 1rem;border-radius:4px;font-size:0.9rem;line-height:1.5;color:var(--clr-text-primary);">${escapeHtml(data.memoryTips)}</div>
          </div>`;
      }

      // 6. Quick Summary
      if (data.quickSummary && data.quickSummary.length > 0) {
        const sumList = data.quickSummary.map((s, i) => `<li style="animation-delay:${i * 0.05}s">${escapeHtml(s)}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-success);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="check-circle" class="inline-icon"></i> 6. Quick Summary
            </div>
            <ul class="output-key-points">${sumList}</ul>
          </div>`;
      }

      // Auxiliary Revision Fields (if available)
      if (data.keyConcepts && data.keyConcepts.length > 0) {
        const items = data.keyConcepts.map((item, i) => `<li style="animation-delay:${i * 0.05}s">${escapeHtml(item)}</li>`).join('');
        html += `
          <div style="margin-bottom:1.2rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="layers" class="inline-icon"></i> Key Concepts & Principles
            </div>
            <ul class="output-key-points">${items}</ul>
          </div>`;
      }

      if (data.examQuestions && data.examQuestions.length > 0) {
        const qaHtml = data.examQuestions.map((qa, i) => `
          <div style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.18);padding:0.75rem 1rem;border-radius:var(--radius-md);margin-bottom:0.6rem;">
            <div style="font-weight:700;font-size:0.9rem;color:var(--clr-primary);margin-bottom:0.25rem;">Q${i + 1}: ${escapeHtml(qa.q)}</div>
            <div style="font-size:0.88rem;color:var(--clr-text-primary);line-height:1.5;"><strong>Answer:</strong> ${escapeHtml(qa.a)}</div>
          </div>
        `).join('');
        html += `
          <div style="margin-bottom:0.5rem;">
            <div style="font-weight:700;font-size:0.8rem;color:var(--clr-primary);margin-bottom:0.4rem;text-transform:uppercase;letter-spacing:0.06em;display:flex;align-items:center;gap:0.4rem;">
              <i data-lucide="help-circle" class="inline-icon"></i> Frequently Asked Exam Questions
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
      console.error(e);
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

  // Ensure default state: show prompt options, hide file preview
  resetFilePreview();

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

let quizState = { questions: [], selected: [], submitted: false, timerInterval: null, topic: '' };

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

    // Read user-selected options
    const difficulty = ($('quiz-difficulty') ? $('quiz-difficulty').value : 'medium') || 'medium';
    const numQuestions = parseInt($('quiz-num-questions') ? $('quiz-num-questions').value : '5', 10) || 5;
    const timerMins = parseInt($('quiz-timer-select') ? $('quiz-timer-select').value : '0', 10) || 0;

    showLoading(btn);
    await simulateDelay(900, 1800);

    try {
      clearQuizTimer();
      const rawPool = AI.generateQuiz(topic);
      const questions = AI.applyQuizOpts(rawPool, { difficulty, numQuestions });
      quizState = { questions, selected: new Array(questions.length).fill(null), submitted: false, timerInterval: null, topic };
      renderQuiz(content, scoreArea, placeholder);

      // Start timer if selected
      if (timerMins > 0) {
        startQuizTimer(timerMins, content, scoreArea);
      } else {
        const td = $('quiz-timer-display');
        if (td) td.hidden = true;
      }

      showToast(`Quiz generated! ${numQuestions} ${difficulty} questions.`, 'success');
    } catch (e) {
      showToast('Something went wrong. Please try again.', 'error');
      console.error(e);
    } finally {
      hideLoading(btn);
    }
  }

  btn.addEventListener('click', generateQuiz);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') generateQuiz(); });

  clearBtn.addEventListener('click', () => {
    clearQuizTimer();
    input.value = '';
    quizState = { questions: [], selected: [], submitted: false, timerInterval: null, topic: '' };
    placeholder.hidden = false;
    content.hidden = true;
    content.innerHTML = '';
    scoreArea.hidden = true;
    const td = $('quiz-timer-display');
    if (td) td.hidden = true;
    showToast('Quiz cleared.', 'info', 1800);
  });

  retryBtn.addEventListener('click', () => {
    if (quizState.questions.length > 0) {
      clearQuizTimer();
      quizState.selected = new Array(quizState.questions.length).fill(null);
      quizState.submitted = false;
      renderQuiz(content, scoreArea, placeholder);
      const timerMins = parseInt($('quiz-timer-select') ? $('quiz-timer-select').value : '0', 10) || 0;
      if (timerMins > 0) startQuizTimer(timerMins, content, scoreArea);
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

  // Stop timer
  clearQuizTimer();
  const td = $('quiz-timer-display');
  if (td) td.hidden = true;

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
  const wrong = total - score;
  const msg = pct === 100 ? 'Perfect Score! 🎉' : pct >= 80 ? 'Excellent! 🏆' : pct >= 60 ? 'Good Job! 👍' : pct >= 40 ? 'Keep Studying! 📚' : 'Need More Practice! 💪';
  const strokeColor = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';

  // Animated SVG progress circle
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);

  scoreArea.hidden = false;
  $('quiz-score-display').innerHTML = `
    <div class="quiz-score-circle-wrap">
      <svg class="quiz-progress-svg" viewBox="0 0 120 120" width="140" height="140">
        <circle cx="60" cy="60" r="${radius}" fill="none" stroke="var(--clr-border)" stroke-width="10"/>
        <circle cx="60" cy="60" r="${radius}" fill="none"
          stroke="${strokeColor}" stroke-width="10"
          stroke-linecap="round"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${circumference}"
          class="quiz-progress-arc"
          style="transition: stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1); transform: rotate(-90deg); transform-origin: center;"
          data-target-offset="${offset}"/>
        <text x="60" y="56" text-anchor="middle" fill="${strokeColor}" font-size="22" font-weight="900" font-family="Outfit,sans-serif">${pct}%</text>
        <text x="60" y="74" text-anchor="middle" fill="var(--clr-text-secondary)" font-size="11" font-family="Outfit,sans-serif">${score}/${total}</text>
      </svg>
    </div>
    <div class="quiz-score-msg" style="color:${strokeColor}">${msg}</div>
    <div class="quiz-score-breakdown">
      <span class="quiz-stat correct-stat"><i data-lucide="check-circle" class="inline-icon"></i> Correct: ${score}</span>
      <span class="quiz-stat wrong-stat"><i data-lucide="x-circle" class="inline-icon"></i> Wrong: ${wrong}</span>
      <span class="quiz-stat pct-stat"><i data-lucide="percent" class="inline-icon"></i> Score: ${pct}%</span>
    </div>
    <div id="quiz-history-panel" class="quiz-history-panel"></div>
  `;

  // Animate arc after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const arc = scoreArea.querySelector('.quiz-progress-arc');
      if (arc) arc.style.strokeDashoffset = offset;
    });
  });

  if (window.lucide) window.lucide.createIcons();

  // Save to LocalStorage and render history
  saveQuizResult({ topic: quizState.topic, score, total, pct });
  renderQuizHistory($('quiz-history-panel'));

  showToast(`You scored ${score}/${total} (${pct}%)!`, pct >= 60 ? 'success' : 'info');
}

/* ----------------------------------------------------------------
   Quiz Timer
---------------------------------------------------------------- */
function startQuizTimer(minutes, content, scoreArea) {
  const td = $('quiz-timer-display');
  if (!td) return;

  let secsLeft = minutes * 60;
  td.hidden = false;

  function tick() {
    const m = Math.floor(secsLeft / 60);
    const s = secsLeft % 60;
    const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    const barEl = td.querySelector('.quiz-timer-bar-fill');
    const textEl = td.querySelector('.quiz-timer-text');
    const pct = (secsLeft / (minutes * 60)) * 100;

    if (textEl) textEl.textContent = `⏱ ${timeStr} remaining`;
    if (barEl) barEl.style.width = `${pct}%`;

    // Colour shift as time runs out
    if (barEl) {
      barEl.style.background = pct > 50 ? 'var(--clr-primary)' : pct > 25 ? '#f59e0b' : '#ef4444';
    }

    if (secsLeft <= 0) {
      clearQuizTimer();
      showToast('Time is up! Auto-submitting quiz.', 'warning', 3000);
      submitQuiz(content, scoreArea);
      return;
    }
    secsLeft--;
  }

  tick();
  quizState.timerInterval = setInterval(tick, 1000);
}

function clearQuizTimer() {
  if (quizState && quizState.timerInterval) {
    clearInterval(quizState.timerInterval);
    quizState.timerInterval = null;
  }
}

/* ----------------------------------------------------------------
   Quiz History (LocalStorage)
---------------------------------------------------------------- */
function saveQuizResult(result) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    const history = raw ? JSON.parse(raw) : [];
    history.unshift({ ...result, date: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(history.slice(0, 10)));
  } catch (e) { /* silent */ }
}

function renderQuizHistory(container) {
  if (!container) return;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    const history = raw ? JSON.parse(raw) : [];
    if (history.length <= 1) { container.hidden = true; return; }
    container.hidden = false;

    const items = history.slice(1, 6).map(r => {
      const c = r.pct >= 80 ? '#22c55e' : r.pct >= 60 ? '#f59e0b' : '#ef4444';
      const d = new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `<span class="quiz-history-badge" style="border-color:${c};color:${c}" title="${r.topic || 'Quiz'}">${r.score}/${r.total} (${r.pct}%) — ${d}</span>`;
    }).join('');

    container.innerHTML = `<div class="quiz-history-label">Recent Results</div>${items}`;
  } catch (e) { /* silent */ }
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

  // Read preparation level
  const prepLevelEl = $('planner-prep-level');
  const prepLevel = prepLevelEl ? prepLevelEl.value : 'intermediate';

  const btn = $('planner-generate-btn');
  showLoading(btn);
  await simulateDelay(700, 1200);

  try {
    const schedule = AI.generateStudyPlan(studySubjects, prepLevel);
    renderTimetable(schedule, prepLevel);
    showToast('Study plan generated and saved!', 'success');

    // Save plan to localStorage
    localStorage.setItem(STORAGE_KEYS.LAST_PLAN, JSON.stringify({
      subjects: studySubjects,
      prepLevel,
      generated: new Date().toISOString(),
    }));

    // Show download button
    const dlBtn = $('planner-download-btn');
    if (dlBtn) dlBtn.hidden = false;

    // Scroll to output
    $('planner-content').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (e) {
    showToast('Could not generate plan. Please check your inputs.', 'error');
    console.error(e);
  } finally {
    hideLoading(btn);
  }
}

function downloadPlanPDF() {
  showToast('Opening print dialog for PDF export...', 'info', 2000);
  setTimeout(() => window.print(), 300);
}

function renderTimetable(schedule, prepLevel = 'intermediate') {
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

  const prepLabel = prepLevel === 'beginner' ? '🌱 Beginner' : prepLevel === 'advanced' ? '🚀 Advanced' : '⚡ Intermediate';

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
      <div class="plan-stat">
        <span class="plan-stat-label">Prep Level</span>
        <span class="plan-stat-value" style="font-size:0.75rem">${prepLabel}</span>
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

  // Hide download button
  const dlBtn = $('planner-download-btn');
  if (dlBtn) dlBtn.hidden = true;

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
