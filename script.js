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

  /* ---- 2a. Topic Explainer Engine ---- */
  explainTopic(topic) {
    const t = topic.trim().toLowerCase();

    // Comprehensive exam-oriented revision knowledge map
    const knowledgeBase = {
      c: {
        definition: 'C is a foundational, general-purpose, compiled procedural programming language developed by Dennis Ritchie at Bell Labs (1972). It provides structured control flow, low-level memory access via pointers, and minimal runtime overhead.',
        keyConcepts: [
          'Pointers & Memory Addresses: Directly access and manipulate memory locations using `*` (dereference) and `&` (address-of) operators.',
          'Manual Memory Management: Allocate dynamic heap memory using `malloc()`, `calloc()`, `realloc()` and free it using `free()`.',
          'Structures & Unions: `struct` groups heterogeneous variables into a custom record; `union` shares a single memory location among members.'
        ],
        features: [
          'Fast execution speed due to direct compilation to machine architecture binary.',
          'High portability across hardware platforms using standard compilers (GCC, Clang).'
        ],
        functions: [
          'Used for building operating system kernels (Linux, Windows kernel), embedded systems, device drivers, compilers, and database engines.'
        ],
        types: [
          'Primitive Types: `int`, `char`, `float`, `double`, `void`.',
          'Derived Types: Arrays, Pointers, Structures (`struct`), Unions (`union`), Enums (`enum`).'
        ],
        advantages: [
          'Unmatched execution efficiency and fine-grained hardware memory control.',
          'Forms the syntactic foundation for C++, Java, C#, and JavaScript.'
        ],
        disadvantages: [
          'No automatic garbage collection — highly susceptible to memory leaks, dangling pointers, and buffer overflows.',
          'Lacks modern object-oriented features (classes, inheritance, polymorphism).'
        ],
        syntax: '#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int num = 42;\n    int *ptr = &num;\n    printf("Value: %d, Address: %p\\n", *ptr, (void*)ptr);\n    return 0;\n}',
        example: 'Allocating dynamic memory with `int *arr = (int*) malloc(10 * sizeof(int));` and freeing it with `free(arr);`.',
        examQuestions: [
          { q: 'What is a Dangling Pointer in C and how do you prevent it?', a: 'A dangling pointer points to a memory location that has been deallocated with `free()`. Prevent it by setting the pointer to `NULL` immediately after freeing memory.' },
          { q: 'Differentiate between `malloc()` and `calloc()` in C.', a: '`malloc(size)` allocates uninitialized memory containing garbage values. `calloc(n, size)` allocates memory for `n` elements and initializes all bytes to zero.' }
        ]
      },

      java: {
        definition: 'Java is a high-level, class-based, object-oriented, strongly-typed programming language designed to have minimal implementation dependencies ("Write Once, Run Anywhere").',
        keyConcepts: [
          'Bytecode & JVM: Source code compiles into `.class` bytecode which executes on the Java Virtual Machine across operating systems.',
          'OOP Pillars: Encapsulation, Abstraction, Inheritance (`extends`), and Polymorphism (`@Override`).',
          'Garbage Collection: Automatic background heap memory management reclaiming unreferenced objects.'
        ],
        features: [
          'Platform independence through JVM execution environment.',
          'Built-in multi-threading support and comprehensive Collections Framework (`List`, `Set`, `Map`).'
        ],
        functions: [
          'Powers enterprise web backends (Spring Boot), Android application development, financial systems, and big data tools (Hadoop).'
        ],
        types: [
          'JDK (Java Development Kit): Compiler (`javac`) + JRE + tools.',
          'JRE (Java Runtime Environment): JVM + core Java class libraries.'
        ],
        advantages: [
          'Strict type checking and automatic garbage collection prevent memory corruption.',
          'Vast enterprise ecosystem, open-source frameworks, and active developer community.'
        ],
        disadvantages: [
          'Higher RAM memory footprint and slower startup time compared to compiled C/C++.',
          'Verbose syntax requiring boilerplate class declarations.'
        ],
        syntax: 'public class Main {\n    public static void main(String[] args) {\n        java.util.List<String> items = new java.util.ArrayList<>();\n        items.add("SmartPrep AI");\n        System.out.println(items.get(0));\n    }\n}',
        example: 'Creating an `ArrayList<String>` to dynamically add records and sorting with `Collections.sort()`.',
        examQuestions: [
          { q: 'How does Method Overloading differ from Method Overriding in Java?', a: 'Method Overloading occurs in the same class (same name, different parameters, compile-time). Method Overriding occurs in subclasses (same signature, `@Override`, runtime polymorphism).' },
          { q: 'Why is `String` immutable in Java?', a: 'Immutability guarantees security (network/database connections), thread safety without synchronization locks, and enables String Pool memory caching.' }
        ]
      },

      python: {
        definition: 'Python is an interpreted, high-level, dynamically-typed, multi-paradigm programming language known for clear readable syntax, automatic memory management, and extensive scientific packages.',
        keyConcepts: [
          'Dynamic Typing: Variables adopt types automatically at runtime without explicit declaration.',
          'Indentation Syntax: Code blocks are demarcated by white space indentation instead of curly braces.',
          'Garbage Collection: Automatic reference counting and generational memory reclamation.'
        ],
        features: [
          'Rich ecosystem of third-party packages (PyPI, NumPy, Pandas, PyTorch, Scikit-learn).',
          'Cross-platform compatibility running seamlessly on Windows, macOS, and Linux.'
        ],
        functions: [
          'Dominates Data Science, Artificial Intelligence / Machine Learning engineering, Web Backends (Django, Flask), and Scripting Automation.'
        ],
        types: [
          'Mutable Types: Lists `[]`, Dictionaries `{k:v}`, Sets `{}`.',
          'Immutable Types: Tuples `()`, Strings `""`, Integers, Floats.'
        ],
        advantages: [
          'Rapid prototyping with concise, pseudocode-like syntax.',
          'Massive community support and comprehensive standard library.'
        ],
        disadvantages: [
          'Slower execution speed compared to C/C++ due to GIL (Global Interpreter Lock) and dynamic typing.',
          'Risk of runtime type errors if input data types are unverified.'
        ],
        syntax: '# List comprehension & dictionary usage\neven_squares = {x: x**2 for x in range(10) if x % 2 == 0}\nprint(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}',
        example: 'Importing pandas to load a CSV dataset with `df = pd.read_csv("data.csv")` and analyzing statistics.',
        examQuestions: [
          { q: 'What is the Global Interpreter Lock (GIL) in Python?', a: 'A mutex mechanism in CPython preventing multiple native threads from executing Python bytecodes simultaneously, limiting multi-threaded CPU parallel execution.' },
          { q: 'How does a Python List differ from a Tuple?', a: 'Lists are mutable (modifiable) defined with `[]`; Tuples are immutable (read-only) defined with `()`, rendering tuples faster and hashable.' }
        ]
      },

      cpp: {
        definition: 'C++ is a compiled, middle-level, general-purpose programming language created by Bjarne Stroustrup as an extension of C, adding Object-Oriented Programming (OOP), templates, and generic programming.',
        keyConcepts: [
          'OOP Integration: Classes, inheritance, virtual functions, destructors.',
          'Standard Template Library (STL): Pre-built containers (`std::vector`, `std::map`) and algorithms.',
          'Pointers & References: Direct memory manipulation combined with safe reference passing.'
        ],
        features: [
          'Zero-cost abstractions: high-level OOP constructs compile to machine code without runtime performance penalty.',
          'Direct hardware control and fine-grained CPU memory management.'
        ],
        functions: [
          'Used for Game Engines (Unreal Engine), High-Frequency Trading systems, Web Browsers (V8/Chromium), Graphics Rendering, and Operating Systems.'
        ],
        types: [
          'C++ Standards: C++98, C++11 (smart pointers, auto, lambdas), C++17, C++20 (concepts, coroutines).'
        ],
        advantages: [
          'Blazing fast execution speed and low-level system memory control.',
          'Comprehensive template metaprogramming and powerful STL library.'
        ],
        disadvantages: [
          'Complex syntax with steep learning curve (undefined behavior, manual pointers).',
          'Manual memory allocation (`new`/`delete`) requires strict RAII practices to avoid memory leaks.'
        ],
        syntax: '#include <iostream>\n#include <vector>\n\nint main() {\n    std::vector<int> nums = {10, 20, 30};\n    for (int n : nums) std::cout << n << " ";\n    return 0;\n}',
        example: 'Using `std::unique_ptr<Widget>` to automatically manage dynamic object lifetime without manual `delete`.',
        examQuestions: [
          { q: 'What is RAII (Resource Acquisition Is Initialization) in C++?', a: 'A programming idiom where resource ownership (memory, file handles, locks) is tied to object lifetime, freeing resources automatically in the destructor when scope ends.' },
          { q: 'What is a Virtual Function in C++?', a: 'A member function declared `virtual` in a base class that enables runtime dynamic polymorphism, ensuring the derived class override is invoked through base class pointers.' }
        ]
      },

      javascript: {
        definition: 'JavaScript is a high-level, interpreted/JIT-compiled, multi-paradigm, event-driven programming language that powers interactive web interfaces, single-page apps, and server backends (Node.js).',
        keyConcepts: [
          'Event Loop & Asynchrony: Non-blocking single-threaded I/O model using call stack, task queues, Promises, and `async/await`.',
          'First-Class Functions & Closures: Functions can be assigned to variables, passed as arguments, and capture surrounding lexical scope.',
          'Prototypes: Object inheritance based on prototype chain linking.'
        ],
        features: [
          'Runs natively inside 100% of modern web browsers.',
          'Full-stack application development using Node.js, Express, React, and Vue.'
        ],
        functions: [
          'Building interactive frontend UIs, single-page web applications (SPAs), web APIs, mobile apps (React Native), and real-time backend servers.'
        ],
        types: [
          'Primitive Types: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.',
          'Reference Types: `Object`, `Array`, `Function`, `Date`, `Map`, `Set`.'
        ],
        advantages: [
          'Universal web browser compatibility.',
          'Huge package ecosystem via npm and rapid event-driven asynchronous execution.'
        ],
        disadvantages: [
          'Dynamic weak typing can lead to unexpected type coercion behavior.',
          'Single-threaded event loop can freeze if CPU-bound heavy calculations block the call stack.'
        ],
        syntax: 'const fetchData = async () => {\n  try {\n    const res = await fetch("https://api.example.com/data");\n    const data = await res.json();\n    console.log(data);\n  } catch (err) { console.error(err); }\n};',
        example: 'Attaching an event listener `button.addEventListener("click", handler)` to dynamically update DOM nodes.',
        examQuestions: [
          { q: 'Explain `==` vs `===` in JavaScript.', a: '`==` compares values with implicit type coercion. `===` (strict equality) compares both value and data type without type conversion.' },
          { q: 'What is a Closure in JavaScript?', a: 'A function that retains access to variables from its parent lexical scope even after the parent function has finished executing.' }
        ]
      },

      sql: {
        definition: 'SQL (Structured Query Language) is the domain-specific standard language used for defining, querying, manipulating, and managing data stored in relational database management systems (RDBMS).',
        keyConcepts: [
          'ACID Transactions: Atomicity, Consistency, Isolation, and Durability.',
          'Relational Keys: Primary Key (unique row identifier) and Foreign Key (referential integrity link).',
          'Relational Joins: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN` combining records across tables.'
        ],
        features: [
          'Declarative syntax — specifies WHAT data to retrieve rather than HOW to navigate storage.',
          'High query execution efficiency using database indexes and query planners.'
        ],
        functions: [
          'Querying, updating, inserting, and deleting relational data across enterprise databases (PostgreSQL, MySQL, Oracle, SQL Server, SQLite).'
        ],
        types: [
          'DDL (Data Definition Language): `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.',
          'DML (Data Manipulation Language): `SELECT`, `INSERT`, `UPDATE`, `DELETE`.',
          'DCL (Data Control Language): `GRANT`, `REVOKE`.'
        ],
        advantages: [
          'Standardized, reliable data persistence with strong transactional integrity.',
          'Powerful aggregation (`GROUP BY`, `SUM`, `AVG`) and multi-table join capabilities.'
        ],
        disadvantages: [
          'Strict relational schema structure can be rigid for unstructured, fast-changing data.',
          'Scaling across distributed server nodes requires complex sharding or database replication.'
        ],
        syntax: 'SELECT u.name, COUNT(o.id) AS total_orders\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE u.status = "active"\nGROUP BY u.id\nHAVING total_orders > 5\nORDER BY total_orders DESC;',
        example: 'Creating a user table with `PRIMARY KEY (id)` and querying top customers using aggregated `GROUP BY`.',
        examQuestions: [
          { q: 'What is the difference between `WHERE` and `HAVING` clauses in SQL?', a: '`WHERE` filters individual rows before grouping takes place. `HAVING` filters aggregate groups produced by `GROUP BY`.' },
          { q: 'Explain Database Normalization (1NF, 2NF, 3NF).', a: 'Normalization reorganizes database tables to eliminate duplicate data redundancies and prevent insertion, update, and deletion anomalies.' }
        ]
      },

      dsa: {
        definition: 'Data Structures and Algorithms (DSA) is the foundational computer science study of organizing data efficiently in memory (structures) and designing step-by-step procedures to solve computational problems (algorithms).',
        keyConcepts: [
          'Asymptotic Complexity: Measuring runtime (Time Complexity) and memory growth (Space Complexity) using Big-O notation.',
          'Linear vs Non-Linear Structures: Arrays, Linked Lists, Stacks, Queues vs Trees, Graphs, Hash Tables.',
          'Algorithmic Paradigms: Divide & Conquer, Greedy Algorithms, Dynamic Programming, Backtracking.'
        ],
        features: [
          'Provides mathematical proofs for software runtime efficiency and memory bounds.',
          'Forms the fundamental technical foundation for software engineering system design.'
        ],
        functions: [
          'Optimizes database indexes, search engines, network routing (Dijkstra), graphics rendering, and OS memory allocation.'
        ],
        types: [
          'Data Structures: Array, Linked List, Stack (LIFO), Queue (FIFO), Hash Table, Binary Search Tree, Heap, Graph.',
          'Algorithms: Sorting (QuickSort, MergeSort), Searching (Binary Search), Graph Traversal (DFS, BFS).'
        ],
        advantages: [
          'Drastically accelerates software execution speed (e.g. O(log N) binary search vs O(N) linear search).',
          'Minimizes system memory overhead and compute operational costs.'
        ],
        disadvantages: [
          'Complex algorithms demand rigorous edge-case handling and memory safety.',
          'Over-engineering complex structures for simple small datasets adds unnecessary code overhead.'
        ],
        syntax: '// Binary Search O(log N)\nfunction binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}',
        example: 'Using a Hash Map to reduce a 2-Sum lookup from O(N²) quadratic time to O(N) linear time.',
        examQuestions: [
          { q: 'Why is QuickSort preferred over MergeSort for arrays, and vice versa for linked lists?', a: 'QuickSort operates in-place (O(1) space) with high cache locality for contiguous arrays. MergeSort does not require random indexing, making it optimal for Linked Lists.' },
          { q: 'Compare Stack (LIFO) vs Queue (FIFO) data structures.', a: 'Stack uses Last-In First-Out (push/pop) e.g., call stack, undo buffer. Queue uses First-In First-Out (enqueue/dequeue) e.g., print queue, web server requests.' }
        ]
      },

      os: {
        definition: 'An Operating System (OS) is essential system software that acts as an intermediary between physical hardware and user applications, managing process scheduling, RAM memory allocation, file systems, and hardware I/O.',
        keyConcepts: [
          'Process & Thread Management: Process isolation (PCB), context switching, CPU scheduling algorithms (Round Robin, SJF).',
          'Memory Management: Virtual memory, paging, segmentation, page fault handling, and TLB cache.',
          'Concurrency & Deadlocks: Semaphores, mutex locks, critical sections, and deadlock prevention.'
        ],
        features: [
          'Provides hardware abstraction layer, file system security access control, and process isolation.',
          'Enables multi-tasking and multi-user resource sharing.'
        ],
        functions: [
          'Powers all computers, smartphones, enterprise servers, and embedded hardware (Linux, Windows, macOS, Android, iOS).'
        ],
        types: [
          'Batch OS, Time-Sharing OS, Distributed OS, Real-Time OS (RTOS).'
        ],
        advantages: [
          'Protects memory address spaces from unauthorized process corruption.',
          'Optimizes hardware resource utilization across concurrent software programs.'
        ],
        disadvantages: [
          'OS kernel overhead consumes system CPU cycles and RAM memory.',
          'Kernel bugs or bad drivers can cause total system crashes (Kernel Panic / BSOD).'
        ],
        syntax: '// POSIX Fork Process Creation\n#include <unistd.h>\n#include <stdio.h>\n\nint main() {\n    pid_t pid = fork();\n    if (pid == 0) printf("Child Process\\n");\n    else printf("Parent Process\\n");\n    return 0;\n}',
        example: 'OS managing Virtual Memory paging to swap inactive RAM pages to disk swap space when physical RAM is full.',
        examQuestions: [
          { q: 'What are the 4 necessary conditions for a Deadlock to occur?', a: '1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.' },
          { q: 'Explain the difference between a Process and a Thread.', a: 'A Process is an independent program with its own address space. A Thread is a lightweight execution unit within a process that shares process memory.' }
        ]
      },

      networks: {
        definition: 'Computer Networking is the study of interconnecting autonomous computing devices to exchange data, resources, and communication using standardized network protocols and physical media.',
        keyConcepts: [
          'Layered Models: OSI 7-Layer Model (Physical to Application) and TCP/IP 4-Layer Model.',
          'Protocols: IP (routing), TCP (reliable connection), UDP (unreliable fast datagram), HTTP/HTTPS, DNS, DHCP.',
          'Addressing & Routing: MAC address (Data Link), IP address (Network), Port numbers (Transport).'
        ],
        features: [
          'Enables global web browsing, email transmission, video streaming, and cloud services.',
          'Secured using SSL/TLS encryption, firewalls, and VPN tunnels.'
        ],
        functions: [
          'Facilitates client-server communication, packet switching, data routing across routers/switches, and domain name resolution.'
        ],
        types: [
          'LAN (Local Area Network), WAN (Wide Area Network), MAN, WLAN (Wi-Fi), PAN (Bluetooth).'
        ],
        advantages: [
          'Enables instant global communication and resource sharing.',
          'Scales seamlessly using standardized Internet protocols.'
        ],
        disadvantages: [
          'Vulnerable to cyber attacks (DDoS, MITM, packet sniffing).',
          'Network congestion can introduce latency and packet loss.'
        ],
        syntax: 'HTTP/1.1 200 OK\nContent-Type: application/json\nContent-Length: 45\n\n{"status":"success","message":"Data received"}',
        example: 'Typing `https://google.com` triggers DNS IP lookup, TCP 3-way handshake, TLS encryption, and HTTP GET request.',
        examQuestions: [
          { q: 'Explain TCP 3-Way Handshake.', a: '1. Client sends SYN packet to Server. 2. Server responds with SYN-ACK packet. 3. Client sends ACK packet back to establish reliable connection.' },
          { q: 'Compare TCP vs UDP.', a: 'TCP is connection-oriented, reliable, ordered, error-checked, but slower (e.g. Web, Email). UDP is connectionless, fast, unreliable, unordered (e.g. Gaming, Video Streaming).' }
        ]
      },

      html_css: {
        definition: 'HTML (HyperText Markup Language) provides the structural skeleton of web pages, while CSS (Cascading Style Sheets) controls visual layout, presentation, typography, and responsive design.',
        keyConcepts: [
          'Semantic HTML5: `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` for accessibility and SEO.',
          'CSS Box Model: Content, Padding, Border, and Margin dimensions.',
          'Modern Layout Systems: CSS Flexbox (1D alignment) and CSS Grid (2D layout grid).'
        ],
        features: [
          'Underpins all visual user interfaces across the World Wide Web.',
          'Supports responsive media queries for desktop, tablet, and mobile displays.'
        ],
        functions: [
          'Renders web application user interfaces, typography, color palettes, and interactive component layouts.'
        ],
        types: [
          'HTML Elements: Block-level vs Inline elements.',
          'CSS Selectors: Class (`.`), ID (`#`), Attribute, Pseudo-classes (`:hover`).'
        ],
        advantages: [
          'Universal standard supported by 100% of web browsers.',
          'Easy to learn, inspect via Browser DevTools, and customize.'
        ],
        disadvantages: [
          'Cross-browser rendering inconsistencies across legacy browsers.',
          'CSS specificity issues can make styling maintenance complex in large codebases.'
        ],
        syntax: '/* CSS Flexbox Layout */\n.card-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 8px;\n}',
        example: 'Building a responsive 3-column feature grid using `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`.',
        examQuestions: [
          { q: 'Explain the CSS Box Model.', a: 'Every HTML element is a box containing: Content (text/images) → Padding (internal space) → Border (outline) → Margin (external spacing).' },
          { q: 'Why are Semantic HTML5 tags important?', a: 'Semantic tags provide clear structural meaning to browsers, search engines (improving SEO), and screen readers (improving accessibility).' }
        ]
      },

      oop: {
        definition: 'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which combine data attributes (fields/properties) and code behaviors (methods/functions).',
        keyConcepts: [
          'Encapsulation: Restricting direct access to object state by exposing public methods while keeping fields private.',
          'Abstraction: Hiding complex implementation details, showing only essential functionality.',
          'Inheritance: Allowing a child subclass to derive properties and methods from a parent superclass.',
          'Polymorphism: Allowing different objects to respond to the same method interface in specialized ways.'
        ],
        features: [
          'Promotes high code reusability, modular design, and maintainability.',
          'Directly models real-world entities into software domain classes.'
        ],
        functions: [
          'Used as the core architecture in Java, C++, Python, C#, Swift, and corporate enterprise software.'
        ],
        types: [
          'Class-based OOP (Java, C++) vs Prototype-based OOP (JavaScript).'
        ],
        advantages: [
          'Protects data integrity through encapsulated access control.',
          'Simplifies code maintenance and large team collaboration.'
        ],
        disadvantages: [
          'Can create larger code footprint and unnecessary object creation overhead.',
          'Deep inheritance hierarchies can introduce class coupling complexity.'
        ],
        syntax: 'class Animal {\n  private String name;\n  public Animal(String name) { this.name = name; }\n  public void speak() { System.out.println(name + " makes a sound"); }\n}',
        example: 'Creating a `Shape` base class with a virtual `calculateArea()` method overridden by `Circle` and `Rectangle` subclasses.',
        examQuestions: [
          { q: 'What is the difference between an Abstract Class and an Interface?', a: 'Abstract Classes can contain state (instance variables) and implemented methods. Interfaces contain only method contracts (until Java 8 default methods) and cannot hold state.' },
          { q: 'Explain Encapsulation with an example.', a: 'Encapsulation hides internal fields (e.g. `private double balance`) and forces modifications through public methods (e.g. `deposit(amount)`), validating input before mutating state.' }
        ]
      },

      photosynthesis: {
        definition: 'Photosynthesis is the endothermic biochemical process by which autotrophic organisms (plants, algae, cyanobacteria) synthesize glucose (C₆H₁₂O₆) and oxygen (O₂) from carbon dioxide (CO₂), water (H₂O), and solar energy.',
        keyConcepts: [
          'Photolysis: Water molecules split using light energy, releasing O₂ as a byproduct.',
          'Energy Carriers: Light energy is trapped as chemical energy in ATP and NADPH.',
          'Carbon Fixation: CO₂ is incorporated into 3-carbon sugars during the Calvin Cycle.'
        ],
        features: [
          'Occurs inside chloroplast organelles containing thylakoid membranes and stroma.',
          'Driven by photosynthetic pigments (Chlorophyll a, Chlorophyll b, and Carotenoids).'
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
      },

      physics: {
        definition: 'Physics is the natural science studying matter, motion, energy, and fundamental forces in the universe.',
        keyConcepts: [
          'Newton\'s Laws of Motion: Inertia, F = m·a, and Action-Reaction.',
          'Conservation Laws: Conservation of Energy, Momentum, and Electric Charge.',
          'Electromagnetism & Waves: Ohm\'s Law (V = I·R), wave optics, and electromagnetic radiation.'
        ],
        features: [
          'Uses mathematical equations to formulate universal physical laws.',
          'Validates theoretical models through quantitative empirical experiment.'
        ],
        functions: [
          'Forms the core physical foundation of all technological engineering disciplines.'
        ],
        types: [
          'Classical Mechanics, Electromagnetism, Thermodynamics, Quantum Mechanics, Relativity.'
        ],
        advantages: [
          'Explains physical phenomena from subatomic particles to cosmic galaxies.',
          'Drives technological innovations like semiconductors, lasers, and spaceflight.'
        ],
        disadvantages: [
          'Requires high-level vector calculus and differential equations.',
          'Idealized theoretical models simplify real-world friction and atmospheric drag.'
        ],
        syntax: 'F = m · a\nE = m · c²\nV = I · R',
        example: 'Calculating projectile trajectory distance given initial velocity and launch angle using kinematic equations.',
        examQuestions: [
          { q: 'State Newton\'s Second Law of Motion.', a: 'Force equals mass times acceleration (F = m·a).' },
          { q: 'What is the Law of Conservation of Energy?', a: 'Energy can neither be created nor destroyed; it only transforms from one form to another.' }
        ]
      },

      chemistry: {
        definition: 'Chemistry is the scientific study of the properties, composition, structure, and reactivity of matter, elements, and compounds.',
        keyConcepts: [
          'Atomic Structure: Protons, neutrons, electrons, and periodic trends.',
          'Chemical Bonding: Covalent (electron sharing), Ionic (electron transfer), and Metallic.',
          'Stoichiometry & Equilibrium: Molar calculations, Le Chatelier\'s Principle, and pH scale.'
        ],
        features: [
          'Explains physical matter transformations and energetic reaction changes.',
          'Serves as the central science connecting physics and biology.'
        ],
        functions: [
          'Used in pharmaceutical drug discovery, materials synthesis, battery technology, and chemical manufacturing.'
        ],
        types: [
          'Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Biochemistry.'
        ],
        advantages: [
          'Enables creation of life-saving medicines and modern synthetic materials.',
          'Provides quantitative methods to measure chemical concentrations and reaction yields.'
        ],
        disadvantages: [
          'Hazardous chemical reactions require strict laboratory safety controls.',
          'Complex reaction mechanisms require multi-step stoichiometric calculations.'
        ],
        syntax: '2H₂ + O₂ → 2H₂O\npH = -log10[H⁺]\nMoles = Mass / Molar Mass',
        example: 'Titrating an acid against a standard base using phenolphthalein indicator to determine unknown concentration.',
        examQuestions: [
          { q: 'What is Le Chatelier\'s Principle?', a: 'If a chemical system at equilibrium is disturbed, the system shifts reaction direction to counteract the disturbance.' },
          { q: 'Differentiate between Ionic and Covalent bonds.', a: 'Ionic bonds form via complete electron transfer between metals and non-metals. Covalent bonds form via electron pair sharing between non-metal atoms.' }
        ]
      },

      biology: {
        definition: 'Biology is the natural science studying life and living organisms, including structural cell biology, genetics, physiology, and ecosystems.',
        keyConcepts: [
          'Cell Theory: All living organisms are composed of cells; cells are the fundamental unit of life.',
          'Genetics & DNA: Transmission of hereditary genetic information via DNA and RNA.',
          'Homeostasis & Metabolism: Maintaining internal biological equilibrium through enzymatic regulation.'
        ],
        features: [
          'Operates across biological levels: molecules → cells → tissues → organs → organisms → ecosystems.',
          'Explains evolutionary adaptations and biological diversity.'
        ],
        functions: [
          'Powers medical diagnostics, biotechnology, agriculture, disease treatment, and environmental conservation.'
        ],
        types: [
          'Cellular Biology, Genetics, Human Physiology, Botany, Zoology, Ecology.'
        ],
        advantages: [
          'Essential for health sciences, medical therapies, and biological conservation.',
          'Helps understand human body mechanisms and disease prevention.'
        ],
        disadvantages: [
          'Biological systems involve thousands of complex, interconnected metabolic pathways.',
          'Requires memorizing extensive anatomical terminology and biochemical cycles.'
        ],
        syntax: 'Central Dogma: DNA → mRNA → Protein\nCellular Respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36-38 ATP',
        example: 'Tracing cellular respiration inside mitochondria to generate ATP energy for metabolic work.',
        examQuestions: [
          { q: 'What is the difference between Mitosis and Meiosis?', a: 'Mitosis produces 2 identical diploid daughter cells for body growth. Meiosis produces 4 non-identical haploid gametes (sperm/egg) for sexual reproduction.' },
          { q: 'What is Homeostasis and why is it vital?', a: 'Homeostasis is the biological process of maintaining stable internal physiological conditions despite external changes.' }
        ]
      },

      history: {
        definition: 'History is the systematic study and critical interpretation of past human events, civilizations, political movements, economic transformations, and cultural developments recorded through historical evidence.',
        keyConcepts: [
          'Historiography & Evidence: Primary sources (eyewitness artifacts/diaries) vs Secondary sources (textbooks/essays).',
          'Causation & Consequence: Analyzing immediate triggers vs long-term socio-political causes.',
          'Institutional Transformation: Evolutions in governance, treaties, revolutions, and trade routes.'
        ],
        features: [
          'Evaluates human experiences across chronological eras.',
          'Analyzes historical bias, propaganda, and source reliability.'
        ],
        functions: [
          'Explains modern geopolitical borders, constitutional democracy, and international relations.'
        ],
        types: [
          'Political History, Socio-Cultural History, Economic History, Military & Diplomatic History.'
        ],
        advantages: [
          'Prevents past policy mistakes by analyzing historical precedent.',
          'Fosters critical thinking, source evaluation, and global cultural perspective.'
        ],
        disadvantages: [
          'Archival records can contain ideological bias or missing documentation.',
          'Requires memorizing chronologies, historical actors, and complex socio-political contexts.'
        ],
        syntax: 'Historical Framework:\nPre-existing Conditions → Trigger Event → Crisis / Conflict → Treaty / Resolution → Long-term Impact',
        example: 'Analyzing how the Industrial Revolution led to rapid urban migration, trade union movements, and labor laws.',
        examQuestions: [
          { q: 'Why are Primary Sources crucial in historical analysis?', a: 'Primary sources provide unmediated first-hand evidence from contemporary participants, reflecting original attitudes without modern retrospective bias.' },
          { q: 'What were the main causes of World War I?', a: 'Militarism, Alliances, Imperialism, Nationalism (MAIN), triggered by the assassination of Archduke Franz Ferdinand in 1914.' }
        ]
      },

      geography: {
        definition: 'Geography is the spatial science studying Earth\'s physical landforms, climate systems, environmental processes, population distributions, and human-environmental interactions.',
        keyConcepts: [
          'Physical Earth Systems: Plate tectonics, atmospheric circulation, hydrological cycle, biomes.',
          'Spatial Analysis & Scale: Map projections, GIS (Geographic Information Systems), ground distance scales.',
          'Human Geography: Urbanization, demographic transition, economic trade spatial patterns.'
        ],
        features: [
          'Bridges physical sciences (geology, meteorology) with social sciences (demography, urban planning).',
          'Analyzes spatial variation across Earth\'s surface.'
        ],
        functions: [
          'Guides urban planning, natural disaster mitigation, climate change policy, and natural resource management.'
        ],
        types: [
          'Physical Geography (Geomorphology, Climatology, Hydrology) and Human Geography (Population, Economic, Urban).'
        ],
        advantages: [
          'Essential for spatial planning, environmental sustainability, and disaster response.',
          'Combines digital satellite technology (GIS) with field environmental studies.'
        ],
        disadvantages: [
          'Complex multi-variable interaction makes exact long-term climate prediction challenging.',
          'Requires understanding both global macro-scale systems and local micro-level geography.'
        ],
        syntax: 'Map Scale Formula:\nReal World Distance = Map Distance × Scale Denominator',
        example: 'Analyzing how ocean currents (Gulf Stream) modulate coastal European temperatures creating temperate climates.',
        examQuestions: [
          { q: 'What is Plate Tectonics and what geological features does it create?', a: 'Plate Tectonics is the movement of lithospheric plates over mantle convection currents, creating earthquakes, volcanoes, ocean trenches, and mountain ranges.' },
          { q: 'Explain the Demographic Transition Model.', a: 'A model describing population shifts from high birth/death rates in pre-industrial societies to low birth/death rates in industrialized societies.' }
        ]
      },

      economics: {
        definition: 'Economics is the social science studying how individuals, businesses, governments, and societies allocate scarce resources to satisfy unlimited human needs and market demands.',
        keyConcepts: [
          'Scarcity & Opportunity Cost: Evaluating trade-offs when allocating limited resources.',
          'Supply & Demand Equilibrium: Price discovery where quantity supplied equals quantity demanded.',
          'Macroeconomic Indicators: GDP, inflation rates, unemployment, fiscal and monetary policies.'
        ],
        features: [
          'Uses mathematical models, supply-demand curves, and empirical statistical indicators.',
          'Predicts human producer and consumer choices under incentive structures.'
        ],
        functions: [
          'Guides central bank monetary policy, corporate pricing strategies, taxation, and international trade policies.'
        ],
        types: [
          'Microeconomics (individual markets/firms) and Macroeconomics (aggregate national economy).'
        ],
        advantages: [
          'Provides quantitative framework for maximizing market efficiency and social welfare.',
          'Enables policymakers to control hyperinflation and mitigate economic recessions.'
        ],
        disadvantages: [
          'Economic models often rely on simplifying assumptions (e.g. rational choice, ceteris paribus).',
          'Unforeseen global supply shocks can disrupt economic forecasts.'
        ],
        syntax: 'Market Equilibrium: Qd = Qs\nGDP = C + I + G + (X - M)\nElasticity = (% Δ Quantity) / (% Δ Price)',
        example: 'Analyzing how central banks raise interest rates to reduce consumer borrowing and cool inflationary pressure.',
        examQuestions: [
          { q: 'What is the difference between Fiscal Policy and Monetary Policy?', a: 'Fiscal policy is set by government taxation and public spending budgets. Monetary policy is managed by central banks via interest rates and money supply.' },
          { q: 'Explain the Law of Supply and Demand.', a: 'Law of Demand: as price rises, quantity demanded falls (inverse). Law of Supply: as price rises, quantity supplied rises (direct).' }
        ]
      }
    };

    // Regex resolver for exact language/topic matching
    if (/\b(c|c programming|c language|c coding|c basics)\b/i.test(t) && !/c\+\+|cpp|c\#|css/i.test(t)) {
      return knowledgeBase.c;
    }
    if (/\b(java|java programming|java language|oops in java|jdk|jvm)\b/i.test(t) && !/javascript|js/i.test(t)) {
      return knowledgeBase.java;
    }
    if (/\b(python|python programming|py|python3)\b/i.test(t)) {
      return knowledgeBase.python;
    }
    if (/\b(c\+\+|cpp|c plus plus)\b/i.test(t)) {
      return knowledgeBase.cpp;
    }
    if (/\b(javascript|js|es6|ecmascript|front end|frontend)\b/i.test(t)) {
      return knowledgeBase.javascript;
    }
    if (/\b(sql|dbms|database|mysql|postgresql|sqlite|rdbms)\b/i.test(t)) {
      return knowledgeBase.sql;
    }
    if (/\b(dsa|data structures|algorithms|data structure|sorting|searching|binary search|stack|queue|linked list|trees|graphs)\b/i.test(t)) {
      return knowledgeBase.dsa;
    }
    if (/\b(operating system|operating systems|os|linux|process scheduling|deadlock)\b/i.test(t)) {
      return knowledgeBase.os;
    }
    if (/\b(computer networks|networking|tcp\/ip|osi model|ip address|http|https)\b/i.test(t)) {
      return knowledgeBase.networks;
    }
    if (/\b(html|css|web design|flexbox|grid)\b/i.test(t)) {
      return knowledgeBase.html_css;
    }
    if (/\b(oop|oops|object oriented programming|object oriented)\b/i.test(t)) {
      return knowledgeBase.oop;
    }
    if (/\b(photosynthesis|light reaction|calvin cycle)\b/i.test(t)) {
      return knowledgeBase.photosynthesis;
    }
    if (/\b(periodic table|mendeleev|atomic number|elements)\b/i.test(t)) {
      return knowledgeBase.periodicTable || knowledgeBase.chemistry;
    }
    if (/\b(calculus|derivative|integration|integrals|derivatives|differentiation)\b/i.test(t)) {
      return knowledgeBase.calculus;
    }
    if (/\b(economics|microeconomics|macroeconomics|gdp|inflation|demand supply)\b/i.test(t)) {
      return knowledgeBase.economics;
    }
    if (/\b(physics|newton|kinematics|thermodynamics|optics|gravity)\b/i.test(t)) {
      return knowledgeBase.physics;
    }
    if (/\b(chemistry|organic chemistry|acids bases|chemical bonding|stoichiometry)\b/i.test(t)) {
      return knowledgeBase.chemistry;
    }
    if (/\b(biology|cell biology|genetics|dna|genomics|anatomy|physiology)\b/i.test(t)) {
      return knowledgeBase.biology;
    }
    if (/\b(history|world war|revolutions|ancient history|medieval history)\b/i.test(t)) {
      return knowledgeBase.history;
    }
    if (/\b(geography|physical geography|plate tectonics|climatology|topography)\b/i.test(t)) {
      return knowledgeBase.geography;
    }

    // Substring fallback
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
  applyQuizOpts(pool, opts = {}) {
    const { difficulty = 'medium', numQuestions = 5 } = opts;
    const n = parseInt(numQuestions, 10) || 5;

    // Difficulty tags embedded in q text
    const diffMap = { easy: ['Easy', 'easy'], medium: ['Medium', 'medium'], hard: ['Hard', 'hard'] };
    const tags = diffMap[difficulty] || diffMap.medium;

    let filtered = pool.filter(q =>
      tags.some(tag => q.q.includes(`[${tag}]`))
    );

    // If no tagged questions exist in pool, serve all (curated banks have no tags)
    if (filtered.length === 0) filtered = [...pool];

    // Shuffle deterministically to vary output
    const shuffled = filtered.slice().sort(() => 0.5 - Math.random());

    // If we need more questions than available, pad from full pool
    if (shuffled.length < n) {
      const extra = pool.filter(q => !shuffled.includes(q)).sort(() => 0.5 - Math.random());
      shuffled.push(...extra);
    }

    return shuffled.slice(0, n);
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

    // Domain classification
    const isCS = /code|program|python|java|c\+\+|c#|js|javascript|sql|api|web|script|html|css|php|ruby|swift|kotlin|rust|go|typescript|database|algorithm|network|cyber|software|ai|machine learning|data structure|os|operating system|dev/.test(lower);
    const isSci = /biology|cell|genetics|dna|rna|organism|botany|zoology|anatomy|physiology|ecosystem|evolution|enzyme|protein|photosynthesis|mitosis|chemistry|acid|base|reaction|element|compound|molecule|periodic table|stoichiometry|bond|atom|physics|force|motion|energy|velocity|gravity|mass|momentum|wave|optics|electric|magnetic|thermodynamics|quantum/.test(lower);
    const isMath = /math|calculus|algebra|geometry|trigonometry|matrix|vector|derivative|integral|probability|statistics|equation|theorem|function|arithmetic|number/.test(lower);
    const isHumanities = /literature|poem|poetry|novel|drama|play|shakespear|metaphor|character|prose|fiction|theme|history|historical|war|revolution|empire|century|king|battle|treaty|geography|climate|map|river|mountain|tectonic|earth|ocean|politic|constitution|democracy|government|rights|law|judiciary|state/.test(lower);
    const isComm = /economic|microeconomic|macroeconomic|market|gdp|inflation|elasticity|demand|supply|fiscal|monetary|commerce|account|finance|business|audit|ledger|balance sheet|taxation|debit|credit|marketing|management|asset|liability|stock/.test(lower);

    if (isCS) {
      return [
        {
          q: `[Easy] What is the primary focus when studying ${cap} in Computer Science?`,
          options: [
            `Understanding core algorithm logic, language syntax, and software execution rules`,
            `Managing physical CPU power voltage levels`,
            `Designing analog telephone switching circuits`,
            `Optimizing printing paper feed mechanisms`
          ],
          answer: 0,
          explanation: `In computer science, studying ${cap} focuses on mastering underlying computational logic, structural syntax, and execution models.`
        },
        {
          q: `[Easy] Which fundamental computing principle is essential in ${cap}?`,
          options: [
            `Modular code organization and systematic data abstraction`,
            `Bypassing CPU instruction execution entirely`,
            `Eliminating runtime memory allocation`,
            `Executing code without binary translation`
          ],
          answer: 0,
          explanation: `${cap} relies on modular code architecture, structured data types, and clear procedural/object abstraction.`
        },
        {
          q: `[Medium] What is a major engineering trade-off associated with ${cap}?`,
          options: [
            `Balancing time complexity (speed) against space complexity (memory utilization)`,
            `Choosing between display pixel resolution and keyboard font size`,
            `Sacrificing source code readability to remove comments`,
            `Replacing database queries with CSS keyframes`
          ],
          answer: 0,
          explanation: `A key software trade-off involves optimizing CPU execution time versus memory footprint efficiency.`
        },
        {
          q: `[Medium] Which runtime issue or exception can occur when developing applications with ${cap}?`,
          options: [
            `Logic flaws, null reference exceptions, or memory leak overhead`,
            `Physical monitor screen flicker`,
            `Hard drive magnetic motor speed loss`,
            `Keyboard USB cable disconnection`
          ],
          answer: 0,
          explanation: `Software execution can encounter runtime errors such as unhandled null references, bounds exceptions, or memory leaks.`
        },
        {
          q: `[Hard] What represents industry best practice when engineering solutions in ${cap}?`,
          options: [
            `Writing clean, documented code with thorough unit testing and error handling`,
            `Using uninitialized global variables across all functions`,
            `Placing all application logic into a single monolithic loop`,
            `Suppressing all compiler warnings and runtime logs`
          ],
          answer: 0,
          explanation: `Exam-ready software engineering emphasizes clean code principles, structured exception handling, and automated unit testing.`
        }
      ];
    }

    if (isSci) {
      return [
        {
          q: `[Easy] What is the primary objective of studying ${cap} in natural sciences?`,
          options: [
            `Analyzing physical laws, biochemical pathways, or experimental phenomena`,
            `Writing commercial advertising slogans`,
            `Formatting corporate financial income statements`,
            `Studying poetic rhythm and stanza structures`
          ],
          answer: 0,
          explanation: `Scientific investigation of ${cap} involves empirical observation, hypothesis testing, and quantitative analysis of natural laws.`
        },
        {
          q: `[Easy] Which fundamental scientific principle governs processes in ${cap}?`,
          options: [
            `Conservation laws (energy, mass, or charge equilibrium)`,
            `Random guessing without control variables`,
            `Ignoring physical measurement units`,
            `Relying solely on unverified folklore`
          ],
          answer: 0,
          explanation: `Scientific mechanisms in ${cap} strictly adhere to fundamental physical conservation laws and chemical/biological equilibrium.`
        },
        {
          q: `[Medium] How do researchers experimentally measure or verify factors in ${cap}?`,
          options: [
            `By conducting controlled experiments with isolated dependent and independent variables`,
            `By changing all experimental variables simultaneously`,
            `By skipping experimental calibration steps`,
            `By relying exclusively on personal opinion`
          ],
          answer: 0,
          explanation: `Scientific method requires controlled testing, isolating independent variables to measure precise empirical effects.`
        },
        {
          q: `[Medium] What quantitative property is critical when analyzing ${cap}?`,
          options: [
            `Standardized SI units of measurement (e.g. Joules, Moles, Meters, Volts)`,
            `Arbitrary uncalibrated counts`,
            `Word counts in textbook chapters`,
            `Pixel dimensions on a screen`
          ],
          answer: 0,
          explanation: `Quantitative scientific analysis requires standard SI units to ensure reproducible empirical calculations.`
        },
        {
          q: `[Hard] When evaluating real-world applications of ${cap}, what factor is essential?`,
          options: [
            `System efficiency, reaction energy thresholds, and thermodynamic equilibrium`,
            `Ignoring conservation of energy`,
            `Assuming 100% theoretical energy conversion with zero loss`,
            `Disregarding laboratory safety protocols`
          ],
          answer: 0,
          explanation: `Practical scientific application evaluates thermodynamics, reaction rates, and environmental system equilibrium.`
        }
      ];
    }

    if (isMath) {
      return [
        {
          q: `[Easy] What is the primary objective when studying ${cap} in mathematics?`,
          options: [
            `Formulating exact mathematical equations, proofs, and quantitative relationships`,
            `Analyzing literary metaphor and poetic imagery`,
            `Writing corporate marketing copy`,
            `Studying ancient geopolitical treaties`
          ],
          answer: 0,
          explanation: `Mathematics uses rigorous logical axioms, symbolic equations, and quantitative proofs to model functional relationships.`
        },
        {
          q: `[Easy] Which mathematical property is fundamental when solving problems in ${cap}?`,
          options: [
            `Logical consistency, algebraic rules, and step-by-step symbolic manipulation`,
            `Guessing numerical values randomly`,
            `Ignoring negative signs in equations`,
            `Skipping intermediate calculation steps`
          ],
          answer: 0,
          explanation: `Mathematical problem solving demands rigorous adherence to algebraic axioms and operational rules.`
        },
        {
          q: `[Medium] In mathematical analysis of ${cap}, what does a functional derivative or rate of change evaluate?`,
          options: [
            `The instantaneous rate of change or tangent slope of a curve f(x)`,
            `The perimeter of a geometric polygon`,
            `The maximum storage size of a hard drive`,
            `The historical age of a textbook`
          ],
          answer: 0,
          explanation: `Derivatives measure instantaneous rate of change dy/dx or slope of the tangent line at a point.`
        },
        {
          q: `[Medium] What is the role of proof and verification in ${cap}?`,
          options: [
            `Ensuring every logical step follows deductively from established mathematical axioms`,
            `Asking a classmate for their opinion`,
            `Rounding all intermediate numbers to zero`,
            `Assuming true statements without proof`
          ],
          answer: 0,
          explanation: `Deductive proofs guarantee mathematical truth by verifying every step against accepted mathematical axioms.`
        },
        {
          q: `[Hard] When applying ${cap} to real-world optimization problems, what step is required?`,
          options: [
            `Setting first derivatives to zero f'(x) = 0 and testing boundary constraint conditions`,
            `Multiplying all variables together at random`,
            `Ignoring boundary constraints entirely`,
            `Assuming all functions are linear`
          ],
          answer: 0,
          explanation: `Optimization identifies critical points where rate of change is zero (f'=0) and evaluates system boundary conditions.`
        }
      ];
    }

    if (isHumanities || isComm) {
      return [
        {
          q: `[Easy] What is the central focus when studying ${cap} for academic exams?`,
          options: [
            `Understanding core definitions, structural frameworks, and contextual principles`,
            `Calculating atomic electron orbital radii`,
            `Writing binary machine language compilers`,
            `Measuring atmospheric pressure changes`
          ],
          answer: 0,
          explanation: `Studying ${cap} centers on mastering foundational concepts, structural models, and domain methodologies.`
        },
        {
          q: `[Easy] Which element is key to delivering a top-scoring exam answer on ${cap}?`,
          options: [
            `Stating a clear definition, key bullet points, and a relevant structured example`,
            `Writing a single unpunctuated block of text`,
            `Leaving answer spaces blank`,
            `Memorizing random dates without context`
          ],
          answer: 0,
          explanation: `High-scoring academic answers require structured definitions, organized key points, and illustrative examples.`
        },
        {
          q: `[Medium] How is knowledge in ${cap} typically organized for analysis?`,
          options: [
            `Divided into Theoretical (conceptual fundamentals) and Applied (practical scenario analysis)`,
            `Divided into fast and slow subjects`,
            `Divided into heavy and light topics`,
            `Organized alphabetically without category`
          ],
          answer: 0,
          explanation: `Academic topics split into core theoretical principles and practical application scenarios.`
        },
        {
          q: `[Medium] What critical skill is developed through studying ${cap}?`,
          options: [
            `Analytical reasoning, critical evidence evaluation, and structured problem-solving`,
            `Instant photographic memory without study`,
            `Bypassing logical analysis`,
            `Ignoring source evidence`
          ],
          answer: 0,
          explanation: `Mastery of ${cap} enhances logical synthesis, critical thinking, and structured evidence evaluation.`
        },
        {
          q: `[Hard] When evaluating complex scenario-based questions in ${cap}, what approach yields optimal marks?`,
          options: [
            `Identifying core principles, analyzing underlying cause-effect dynamics, and supporting conclusions with evidence`,
            `Focusing only on superficial details`,
            `Giving emotional opinions without factual basis`,
            `Restating the question without providing analysis`
          ],
          answer: 0,
          explanation: `Advanced examination questions reward identifying core principles, analyzing systemic cause-and-effect, and citing evidence.`
        }
      ];
    }

    // Default universal fallback
    return [
      {
        q: `[Easy] What is the core definition and primary scope of ${cap}?`,
        options: [
          `The systematic study and practical application of foundational principles in ${cap}`,
          `A physical laboratory apparatus for chemical distillation`,
          `A musical score notation for orchestral brass instruments`,
          `A mechanical gear assembly for automotive engines`
        ],
        answer: 0,
        explanation: `${cap} encompasses foundational definitions, core principles, and domain methodologies.`
      },
      {
        q: `[Easy] Which approach is essential when revising ${cap} for examinations?`,
        options: [
          `Following a structured revision strategy based on key definitions and principles`,
          `Memorizing random numbers without understanding context`,
          `Ignoring textbook definitions entirely`,
          `Studying for only 2 minutes before the exam`
        ],
        answer: 0,
        explanation: `Effective exam preparation requires understanding core definitions and structured revision of key principles.`
      },
      {
        q: `[Medium] How are core concepts in ${cap} categorized for systematic evaluation?`,
        options: [
          `Into Theoretical (concept-based) and Applied (practical problem-solving) domains`,
          `Into fast and slow topics`,
          `Into heavy and light subjects`,
          `Into arbitrary unsorted lists`
        ],
        answer: 0,
        explanation: `Most subjects are categorized into theoretical principles and practical applied problem-solving.`
      },
      {
        q: `[Medium] What is a primary benefit of mastering ${cap}?`,
        options: [
          `Enhancing analytical reasoning and domain problem-solving capabilities`,
          `Guaranteeing instant perfection without practice`,
          `Eliminating the need for future study`,
          `Disconnecting knowledge from real-world utility`
        ],
        answer: 0,
        explanation: `Mastering ${cap} builds strong analytical reasoning skills applicable to academic and professional challenges.`
      },
      {
        q: `[Hard] What strategy secures maximum marks when answering long-form exam questions on ${cap}?`,
        options: [
          `Providing a crisp definition, listing key structured points, and including a concrete example`,
          `Writing one unpunctuated sentence`,
          `Leaving the answer sheet blank`,
          `Copying the question prompt repeatedly`
        ],
        answer: 0,
        explanation: `Examiners award full marks for structured responses containing clear definitions, organized points, and concrete examples.`
      }
    ];
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

    const flashcardBank = {
      c: [
        { tag: 'DEFINITION', q: 'What is a Pointer in C and how is its memory address accessed?', a: 'A pointer is a variable storing the memory address of another variable. `&var` retrieves the address; `*ptr` dereferences the pointer to access the stored value.' },
        { tag: 'KEY DIFFERENCE', q: 'How does `malloc()` differ from `calloc()` in C memory management?', a: '`malloc(size)` allocates uninitialized heap memory (contains garbage values). `calloc(n, size)` allocates contiguous memory and initializes all bytes to zero.' },
        { tag: 'OPERATOR RULE', q: 'What happens during integer division in C (e.g. `5 / 2`)?', a: 'Standard C truncates any fractional decimal remainder during integer division, returning integer `2` instead of `2.5`.' },
        { tag: 'DATA STRUCTURE', q: 'How does a `struct` differ from a `union` in C?', a: 'In a `struct`, every member has its own separate memory allocation. In a `union`, all members share the same starting memory location (size equals largest member).' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: Explain Pass by Value vs Pass by Reference in C functions.', a: 'Pass by Value passes a copy of the argument (modifications do not affect original). Pass by Reference passes the memory address using pointers (modifications alter original).' }
      ],
      java: [
        { tag: 'DEFINITION', q: 'What is the JVM and what is its role in Java execution?', a: 'The Java Virtual Machine (JVM) executes compiled Java bytecode (.class files), making Java platform-independent ("Write Once, Run Anywhere").' },
        { tag: 'KEY DIFFERENCE', q: 'How does `extends` differ from `implements` in Java?', a: '`extends` is used for single-class inheritance (`class B extends A`). `implements` is used to implement one or multiple interfaces (`class B implements I1, I2`).' },
        { tag: 'MEMORY MANAGEMENT', q: 'How does Garbage Collection operate in Java?', a: 'The JVM automatically identifies unreachable objects on the heap (objects with zero active references) and reclaims their memory space in background.' },
        { tag: 'EXCEPTION HANDLING', q: 'What is the difference between Checked and Unchecked Exceptions in Java?', a: 'Checked Exceptions (e.g. IOException) must be caught or declared at compile time. Unchecked Exceptions (e.g. NullPointerException) extend RuntimeException and occur at runtime.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: Why are Java Strings immutable and what class should be used for modifications?', a: 'Strings are immutable for security, thread-safety, and String Pool caching. Use `StringBuilder` or `StringBuffer` for efficient string mutations.' }
      ],
      python: [
        { tag: 'DEFINITION', q: 'What are Mutable vs Immutable data types in Python?', a: 'Mutable types (Lists, Dicts, Sets) can be altered in-place after creation. Immutable types (Tuples, Strings, Ints, Floats) cannot be modified after instantiation.' },
        { tag: 'SYNTAX', q: 'What is List Comprehension in Python and what is its syntax?', a: 'A concise syntax to create lists: `[expr for item in iterable if condition]`. Example: `[x**2 for x in range(5) if x % 2 == 0]` returns `[0, 4, 16]`.' },
        { tag: 'PARAMETERS', q: 'How do `*args` and `**kwargs` function in Python parameters?', a: '`*args` collects arbitrary positional arguments into a tuple. `**kwargs` collects arbitrary keyword arguments into a dictionary.' },
        { tag: 'KEY DIFFERENCE', q: 'How do `==` and `is` operators differ in Python?', a: '`==` checks equality of values (do they hold the same data). `is` checks identity of objects (do they occupy the exact same memory address).' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is a Python Generator and why is `yield` used instead of `return`?', a: 'A generator produces values lazily one at a time using `yield`, saving memory compared to generating entire lists in memory.' }
      ],
      cpp: [
        { tag: 'DEFINITION', q: 'What is Function Overloading vs Function Overriding in C++?', a: 'Overloading: functions in same scope share same name with different parameter signatures (compile-time). Overriding: derived class redefines base class virtual function (runtime).' },
        { tag: 'POLYMORPHISM', q: 'What is a Virtual Function and why is it used in C++?', a: 'A function declared `virtual` in a base class enables runtime dynamic polymorphism, ensuring derived class overrides are called when accessed via base pointers.' },
        { tag: 'RESOURCE MANAGEMENT', q: 'What is RAII (Resource Acquisition Is Initialization) in C++?', a: 'RAII binds resource allocation to object lifetime: resources are acquired in constructor and released automatically in destructor when going out of scope.' },
        { tag: 'KEY DIFFERENCE', q: 'How does `new`/`delete` differ from `malloc()`/`free()` in C++?', a: '`new` allocates memory AND invokes object constructors; `delete` invokes destructors AND frees memory. `malloc()`/`free()` only allocate/free raw bytes without constructors.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is a Copy Constructor and when is it invoked in C++?', a: 'A constructor `ClassName(const ClassName &obj)` invoked when initializing an object from another existing object of the same class.' }
      ],
      javascript: [
        { tag: 'DEFINITION', q: 'What is a Closure in JavaScript?', a: 'A closure is an inner function that retains access to variables in its outer enclosing lexical scope even after the outer function has returned.' },
        { tag: 'KEY DIFFERENCE', q: 'How does `==` differ from `===` in JavaScript?', a: '`==` performs type coercion before comparison. `===` (strict equality) requires both value and type match without coercion.' },
        { tag: 'ASYNCHRONOUS ENGINE', q: 'How does the JavaScript Event Loop handle asynchronous operations?', a: 'JS is single-threaded. The Event Loop monitors the Call Stack and moves callbacks from Microtask Queue (Promises) and Macrotask Queue (setTimeout) when the stack is empty.' },
        { tag: 'SCOPING', q: 'How do `var`, `let`, and `const` differ in JavaScript?', a: '`var` is function-scoped and hoisted. `let` and `const` are block-scoped; `const` prevents re-assignment after declaration.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Prototypal Inheritance in JavaScript?', a: 'Objects inherit properties and methods directly from other prototype objects via a prototype chain ending at `Object.prototype`.' }
      ],
      sql: [
        { tag: 'DEFINITION', q: 'What are Primary Keys and Foreign Keys in relational databases?', a: 'Primary Key uniquely identifies each row in a table. Foreign Key is a column referencing the Primary Key of another table to maintain referential integrity.' },
        { tag: 'KEY DIFFERENCE', q: 'How does `WHERE` differ from `HAVING` in SQL?', a: '`WHERE` filters individual rows BEFORE grouping. `HAVING` filters aggregated groups AFTER a `GROUP BY` clause.' },
        { tag: 'TRANSACTIONS', q: 'What do ACID properties stand for in DBMS?', a: 'Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safety), Durability (persisted changes).' },
        { tag: 'COMMAND DIFFERENCE', q: 'How do `DELETE`, `TRUNCATE`, and `DROP` commands differ in SQL?', a: '`DELETE` removes specific rows (DML, logged, rollbackable). `TRUNCATE` removes all rows quickly (DDL). `DROP` removes both table structure and data permanently.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Database Normalization (1NF, 2NF, 3NF)?', a: 'The process of organizing data to eliminate redundancy and improve integrity: 1NF removes repeating groups; 2NF removes partial dependencies; 3NF removes transitive dependencies.' }
      ],
      dsa: [
        { tag: 'DATA STRUCTURES', q: 'How does a Stack differ from a Queue?', a: 'Stack operates on LIFO (Last-In, First-Out) via push/pop. Queue operates on FIFO (First-In, First-Out) via enqueue/dequeue.' },
        { tag: 'COMPLEXITY', q: 'What are the best, average, and worst-case time complexities of QuickSort?', a: 'Best/Average: O(N log N). Worst-case: O(N²) occurring when poor pivot selections divide subarrays unequally (e.g. already sorted array).' },
        { tag: 'HASHING', q: 'How does a Hash Table achieve O(1) average lookup time?', a: 'A hash function computes array indices from keys, allowing direct index lookups. Collisions are handled via Chaining or Open Addressing.' },
        { tag: 'TREES', q: 'What is a Binary Search Tree (BST) property?', a: 'For every node: all keys in left subtree are strictly smaller, and all keys in right subtree are strictly larger. Search/Insert takes O(log N) in balanced BST.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: How do BFS and DFS graph traversals differ in implementation and order?', a: 'BFS uses a Queue and visits level-by-level (finds shortest path). DFS uses a Stack (or recursion) and explores down each branch as deep as possible before backtracking.' }
      ],
      os: [
        { tag: 'PROCESSES', q: 'What is the key difference between a Process and a Thread?', a: 'A Process has an independent isolated virtual address space. Threads within the same process share memory, heap, and OS resources, resulting in faster context switching.' },
        { tag: 'SYNCHRONIZATION', q: 'What are the 4 necessary conditions for Deadlock to occur?', a: '1. Mutual Exclusion. 2. Hold and Wait. 3. No Preemption. 4. Circular Wait.' },
        { tag: 'SCHEDULING', q: 'How does Round Robin CPU scheduling operate?', a: 'Preemptive algorithm assigning fixed time quanta (slices) to ready queue processes in cyclic order.' },
        { tag: 'MEMORY', q: 'What is Virtual Memory and Paging in OS?', a: 'Virtual Memory maps virtual memory addresses to physical RAM/disk pages, enabling execution of programs larger than physical memory.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is a Semaphore and how do Wait/Signal operations work?', a: 'An integer variable used for synchronization: `wait()` decrements counter (blocks if ≤ 0); `signal()` increments counter (wakes waiting process).' }
      ],
      networks: [
        { tag: 'OSI MODEL', q: 'List the 7 layers of the OSI reference model from bottom to top.', a: '1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application.' },
        { tag: 'PROTOCOLS', q: 'How do TCP and UDP transport protocols differ?', a: 'TCP is connection-oriented, reliable, ordered with 3-way handshake. UDP is connectionless, fast, unreliable with no ordering (ideal for streaming).' },
        { tag: 'ADDRESSING', q: 'How does IPv4 differ from IPv6 addressing?', a: 'IPv4 uses 32-bit numerical dotted-decimal addresses (4.3B limit). IPv6 uses 128-bit hexadecimal colon-separated addresses.' },
        { tag: 'DNS', q: 'What is the exact role of DNS in web networking?', a: 'DNS (Domain Name System) translates human-readable domain names (e.g. google.com) into numerical IP addresses needed for routing.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: Explain the TCP 3-Way Handshake connection process.', a: 'Client sends SYN → Server responds with SYN-ACK → Client sends ACK. Connection is established.' }
      ],
      html_css: [
        { tag: 'HTML5', q: 'Why are semantic HTML tags (`<nav>`, `<article>`, `<footer>`) important?', a: 'They describe content meaning to browsers, screen readers, and search engine crawlers, improving SEO and web accessibility.' },
        { tag: 'CSS BOX MODEL', q: 'Explain the 4 layers of the CSS Box Model.', a: '1. Content (inner text/elements), 2. Padding (inner space), 3. Border (frame edge), 4. Margin (outer space between elements).' },
        { tag: 'FLEXBOX', q: 'How do `justify-content` and `align-items` differ in Flexbox?', a: '`justify-content` aligns items along the Main Axis. `align-items` aligns items along the Cross Axis.' },
        { tag: 'CSS POSITIONING', q: 'What does `z-index` control in CSS styling?', a: 'Controls the vertical stacking order of positioned elements (relative, absolute, fixed, sticky) along the z-axis.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: How do `display: none` and `visibility: hidden` differ?', a: '`display: none` removes element from layout flow (occupies 0 space). `visibility: hidden` hides element visually while keeping its layout space.' }
      ],
      oop: [
        { tag: 'PILLARS', q: 'List and define the 4 fundamental pillars of OOP.', a: '1. Encapsulation (data hiding), 2. Abstraction (simplifying interface), 3. Inheritance (code reuse), 4. Polymorphism (many forms).' },
        { tag: 'ENCAPSULATION', q: 'How is Encapsulation enforced in object-oriented code?', a: 'By declaring instance variables `private` and exposing public getter/setter methods to control access.' },
        { tag: 'POLYMORPHISM', q: 'What is the difference between Compile-time and Runtime Polymorphism?', a: 'Compile-time: Function/Operator Overloading. Runtime: Method Overriding achieved via Virtual Functions and Interface implementation.' },
        { tag: 'ABSTRACT CLASSES', q: 'How does an Abstract Class differ from an Interface in OOP?', a: 'Abstract classes can hold state (fields) and concrete methods. Interfaces contain contract method declarations (all abstract by default).' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: Why is "Composition over Inheritance" recommended in OOP design?', a: 'Composition combines simple objects (has-a) for greater flexibility and dynamic behavior without rigid tight coupling of inheritance (is-a).' }
      ],
      physics: [
        { tag: 'LAWS OF MOTION', q: 'State Newton’s 3 Laws of Motion.', a: '1st: Inertia (body remains at rest/constant velocity unless acted on by force).\n2nd: F = m·a.\n3rd: Action & Reaction are equal and opposite.' },
        { tag: 'CONSERVATION', q: 'State the Law of Conservation of Energy.', a: 'Energy cannot be created or destroyed; it can only be transformed from one form to another (e.g. Potential to Kinetic).' },
        { tag: 'ELECTRICITY', q: 'What is Ohm’s Law and its mathematical formula?', a: 'Voltage (V) is directly proportional to Current (I) through a conductor: V = I · R.' },
        { tag: 'THERMODYNAMICS', q: 'What is the 1st Law of Thermodynamics?', a: 'The change in internal energy ΔU equals heat added to system Q minus work done by system W: ΔU = Q - W.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is the speed of light in vacuum and standard gravitational acceleration on Earth?', a: 'Speed of light c ≈ 3.0 × 10⁸ m/s. Acceleration due to gravity g ≈ 9.81 m/s².' }
      ],
      chemistry: [
        { tag: 'ACIDS & BASES', q: 'Define Acid and Base according to Brønsted-Lowry theory.', a: 'Acid is a proton (H⁺) donor. Base is a proton (H⁺) acceptor. Neutral pH = 7 ([H⁺] = 10⁻⁷ M).' },
        { tag: 'BONDING', q: 'How do Ionic Bonds differ from Covalent Bonds?', a: 'Ionic: transfer of electrons between metal & non-metal. Covalent: sharing of electron pairs between non-metal atoms.' },
        { tag: 'EQUILIBRIUM', q: 'State Le Chatelier’s Principle.', a: 'If a system at equilibrium is disturbed by change in concentration, temperature, or pressure, it shifts to counteract the change.' },
        { tag: 'THERMOCHEMISTRY', q: 'How do Exothermic and Endothermic reactions differ in Enthalpy ΔH?', a: 'Exothermic releases heat (ΔH < 0, products lower energy). Endothermic absorbs heat (ΔH > 0, products higher energy).' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Avogadro’s Number and the Moles formula?', a: '1 Mole = 6.022 × 10²³ particles. Moles (n) = Mass (g) / Molar Mass (g/mol).' }
      ],
      biology: [
        { tag: 'CELL BIOLOGY', q: 'What is the function of Mitochondria vs Ribosomes in a cell?', a: 'Mitochondria: site of cellular respiration producing ATP energy. Ribosomes: site of protein synthesis.' },
        { tag: 'GENETICS', q: 'How do DNA and RNA differ in structure and sugar component?', a: 'DNA: double-stranded helix containing Deoxyribose sugar and Thymine (T). RNA: single-stranded containing Ribose sugar and Uracil (U).' },
        { tag: 'CELL DIVISION', q: 'How does Mitosis differ from Meiosis in cell count and chromosome number?', a: 'Mitosis: 1 division → 2 identical diploid (2n) somatic cells. Meiosis: 2 divisions → 4 genetically unique haploid (n) gametes.' },
        { tag: 'ENZYMES', q: 'How do Enzymes accelerate biological biochemical reactions?', a: 'Enzymes are biological catalysts that speed up reactions by lowering the activation energy barrier.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Photosynthesis equation and where do light/dark reactions occur?', a: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂. Light reactions in Thylakoids; Calvin Cycle in Stroma.' }
      ],
      history: [
        { tag: 'WORLD WAR I', q: 'What was the immediate spark that triggered World War I in July 1914?', a: 'The assassination of Archduke Franz Ferdinand of Austria in Sarajevo by Gavrilo Princip.' },
        { tag: 'HISTORIOGRAPHY', q: 'What is a Primary Source vs Secondary Source in historical evidence?', a: 'Primary: original first-hand artifact/document created during event (e.g. letter, treaty). Secondary: later analysis by historians (e.g. textbook).' },
        { tag: 'INDUSTRIAL REVOLUTION', q: 'What was the main economic transformation during the Industrial Revolution?', a: 'Transition from agrarian manual handcraft economy to mechanized factory manufacturing powered by steam engines.' },
        { tag: 'RENAISSANCE', q: 'What was the central cultural philosophy of the European Renaissance?', a: 'Humanism — revival of classical Greek & Roman art, science, literature, and individual critical inquiry.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What was the Cold War and what key events defined it?', a: 'Geopolitical tension between US and USSR (1947-1991) characterized by proxy wars, nuclear arms race, Cuban Missile Crisis, and Space Race.' }
      ],
      geography: [
        { tag: 'ATMOSPHERE', q: 'Which layer of Earth’s atmosphere contains the Ozone Layer and what is its role?', a: 'Stratosphere. The Ozone layer (O₃) absorbs and shields Earth from harmful solar Ultraviolet (UV) radiation.' },
        { tag: 'TECTONICS', q: 'What drives Plate Tectonics and causes earthquakes?', a: 'Convection currents in Earth’s asthenosphere (mantle) move lithospheric plates. Friction along plate boundaries causes seismic shocks.' },
        { tag: 'MAP SKILLS', q: 'What is Map Scale and how is it expressed?', a: 'Ratio between distance on map and actual ground distance (e.g. Representative Fraction 1:50,000 means 1 cm = 500 m).' },
        { tag: 'PACIFIC BASIN', q: 'What is the Pacific "Ring of Fire"?', a: 'A major Pacific ocean perimeter basin subject to frequent seismic earthquakes and 75% of world’s active volcanoes.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: How does Weathering differ from Erosion?', a: 'Weathering breaks down rocks in-place (chemically/mechanically). Erosion transports weathered rock particles away by water, wind, or ice.' }
      ],
      economics: [
        { tag: 'SUPPLY & DEMAND', q: 'State the Law of Demand and Law of Supply.', a: 'Law of Demand: Price ↑ → Quantity Demanded ↓ (inverse). Law of Supply: Price ↑ → Quantity Supplied ↑ (direct).' },
        { tag: 'OPPORTUNITY COST', q: 'What is Opportunity Cost with a practical exam example?', a: 'The value of the next best alternative forgone when making a decision (e.g. choosing to study yields higher grades but foregoes income from a job).' },
        { tag: 'MACROECONOMICS', q: 'What is GDP (Gross Domestic Product) and how is it calculated?', a: 'Total monetary value of final goods/services produced in a country annually. Expenditure approach: GDP = C + I + G + (X - M).' },
        { tag: 'POLICY DIFFERENCE', q: 'How does Fiscal Policy differ from Monetary Policy?', a: 'Fiscal: Government tax rates & public spending. Monetary: Central Bank interest rates & money supply control.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: What is Inflation and how is it measured?', a: 'Persistent rise in general price level reducing purchasing power over time, measured using Consumer Price Index (CPI).' }
      ],
      calculus: [
        { tag: 'DERIVATIVES', q: 'What is the geometric meaning of the first derivative f’(x)?', a: 'The slope of the tangent line to the curve f(x) at point x, measuring instantaneous rate of change dy/dx.' },
        { tag: 'INTEGRATION', q: 'What does a Definite Integral ∫ₐᵇ f(x)dx represent geometrically?', a: 'The exact net area bounded between the function curve f(x) and x-axis from x=a to x=b.' },
        { tag: 'POWER RULE', q: 'State the Power Rule for differentiation and integration.', a: 'Derivative: d/dx(xⁿ) = n·xⁿ⁻¹. Integral: ∫xⁿ dx = (xⁿ⁺¹)/(n+1) + C (n ≠ -1).' },
        { tag: 'THEOREMS', q: 'State the Fundamental Theorem of Calculus (FTC).', a: 'If F’(x) = f(x) on [a,b], then ∫ₐᵇ f(x)dx = F(b) - F(a), proving integration is the inverse of differentiation.' },
        { tag: 'EXAM QUESTION', q: 'Exam QA: How do you optimize a function f(x) to find local extrema?', a: 'Step 1: Find f’(x). Step 2: Set f’(x) = 0 to find critical points. Step 3: Use second derivative test f’’(x) (<0 max, >0 min).' }
      ]
    };

    // Topic Regex Resolver for exact topic matching
    if (/\b(c|c programming|c language|c coding|c basics)\b/i.test(t) && !/c\+\+|cpp|c\#|css/i.test(t)) return flashcardBank.c;
    if (/\b(java|java programming|java language|oops in java|jdk|jvm)\b/i.test(t) && !/javascript|js/i.test(t)) return flashcardBank.java;
    if (/\b(python|python programming|py|python3)\b/i.test(t)) return flashcardBank.python;
    if (/\b(c\+\+|cpp|c plus plus)\b/i.test(t)) return flashcardBank.cpp;
    if (/\b(javascript|js|es6|ecmascript|front end|frontend)\b/i.test(t)) return flashcardBank.javascript;
    if (/\b(sql|dbms|database|mysql|postgresql|sqlite|rdbms)\b/i.test(t)) return flashcardBank.sql;
    if (/\b(dsa|data structures|algorithms|data structure|sorting|searching|stack|queue|linked list|tree)\b/i.test(t)) return flashcardBank.dsa;
    if (/\b(operating system|operating systems|os|linux|process scheduling|deadlock)\b/i.test(t)) return flashcardBank.os;
    if (/\b(computer networks|networking|tcp\/ip|osi model|ip address|http|https)\b/i.test(t)) return flashcardBank.networks;
    if (/\b(html|css|web design|flexbox|grid)\b/i.test(t)) return flashcardBank.html_css;
    if (/\b(oop|oops|object oriented programming|object oriented)\b/i.test(t)) return flashcardBank.oop;
    if (/\b(physics|newton|kinematics|thermodynamics|optics|gravity)\b/i.test(t)) return flashcardBank.physics;
    if (/\b(chemistry|acids bases|chemical bonding|stoichiometry|moles)\b/i.test(t)) return flashcardBank.chemistry;
    if (/\b(biology|cell biology|genetics|dna|mitosis|meiosis)\b/i.test(t)) return flashcardBank.biology;
    if (/\b(history|world war|revolutions|industrial revolution|renaissance)\b/i.test(t)) return flashcardBank.history;
    if (/\b(geography|atmosphere|plate tectonics|ring of fire|weathering)\b/i.test(t)) return flashcardBank.geography;
    if (/\b(economics|microeconomics|macroeconomics|gdp|inflation|demand supply)\b/i.test(t)) return flashcardBank.economics;
    if (/\b(calculus|derivative|integration|integrals|derivatives|differentiation)\b/i.test(t)) return flashcardBank.calculus;

    // Substring fallback check
    for (const [key, cards] of Object.entries(flashcardBank)) {
      if (t.includes(key)) return cards;
    }

    // Dynamic high-yield topic-aware generator for custom user queries
    return this.generateSmartFlashcards(topic.trim());
  },

  generateSmartFlashcards(topic) {
    const cap = topic.charAt(0).toUpperCase() + topic.slice(1);

    return [
      {
        tag: 'EXAM DEFINITION',
        q: `What is the precise academic definition of ${cap}?`,
        a: `${cap} is defined as the systematic principle, system, or framework that governs core operations and functional relationships within this domain.`
      },
      {
        tag: 'CORE MECHANISM',
        q: `What is the fundamental working mechanism of ${cap}?`,
        a: `The core mechanism operates in 3 steps:\n1. Input/Initial State: initial parameters or environmental conditions are established.\n2. Processing/Action: core rules or reactions transform inputs.\n3. Output/Final State: target state or calculated result is derived.`
      },
      {
        tag: 'KEY RULE & FORMULA',
        q: `What is the most critical rule, law, or equation governing ${cap}?`,
        a: `In examinations, ${cap} relies on strict operational rules: always verify boundary conditions, maintain structural consistency, and apply standard formulas or syntax conventions.`
      },
      {
        tag: 'COMMON EXAM PITFALL',
        q: `What common mistake do students make in ${cap} exam questions?`,
        a: `1. Confusing core definitions with secondary features.\n2. Omitting units, conditions, or required steps in calculations.\n3. Giving vague general answers instead of citing key technical terms.`
      },
      {
        tag: 'MODEL EXAM QUESTION',
        q: `Exam QA: Explain the importance and practical application of ${cap}.`,
        a: `Model Answer structure:\n• Definition (1 mark)\n• 2-3 Core Features (2 marks)\n• Real-world application example (1 mark)\n• Key conclusion/summary statement (1 mark)`
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
