/**
 * rules.js - Rule Engine for AI Knowledge Assistant
 * Maps normalized query keywords to topic IDs in the Knowledge Base.
 */

/**
 * Array of rule definitions mapping keyword patterns to JSON topic IDs.
 * Order matters: specific multi-word rules are checked before generic ones.
 */
const rules = [
  // --- UNIT 1: Introduction & Problem Solving ---
  {
    topicId: "definitions_of_ai",
    keywords: [
      "definition of ai", "definitions of ai", "what is ai", "define ai",
      "artificial intelligence", "turing test", "thinking humanly",
      "thinking rationally", "acting humanly", "acting rationally", "cognitive modeling"
    ]
  },
  {
    topicId: "foundation_and_history_of_ai",
    keywords: [
      "history of ai", "foundations of ai", "dartmouth", "dartmouth conference",
      "ai winter", "symbolic ai", "john mccarthy", "perceptron history"
    ]
  },
  {
    topicId: "peas_framework",
    keywords: [
      "peas", "peas framework", "performance environment actuators sensors",
      "performance measure environment actuators sensors"
    ]
  },
  {
    topicId: "concept_of_rationality",
    keywords: [
      "rationality", "rational agent", "concept of rationality",
      "omniscience", "bounded rationality", "performance measure"
    ]
  },
  {
    topicId: "intelligent_agents",
    keywords: [
      "intelligent agent", "intelligent agents", "agent definition",
      "sensors and actuators", "percept sequence", "agent function", "autonomy"
    ]
  },
  {
    topicId: "nature_of_environment",
    keywords: [
      "nature of environment", "task environment", "fully observable",
      "partially observable", "deterministic", "stochastic", "episodic",
      "sequential", "static", "dynamic", "discrete", "continuous",
      "single agent", "multi agent", "single-agent", "multi-agent"
    ]
  },
  {
    topicId: "structure_of_agents",
    keywords: [
      "structure of agents", "agent program", "agent architecture",
      "simple reflex", "model-based reflex", "goal-based agent",
      "utility-based agent", "learning agent"
    ]
  },
  {
    topicId: "problem_formulation",
    keywords: [
      "problem formulation", "initial state", "transition model",
      "goal test", "path cost", "state space", "actions(s)"
    ]
  },
  {
    topicId: "example_problems",
    keywords: [
      "example problems", "toy problems", "real world problems", "8 puzzle",
      "8-puzzle", "8 queens", "8-queens", "vacuum world",
      "missionaries and cannibals", "route finding"
    ]
  },
  {
    topicId: "problem_solving_agent",
    keywords: [
      "problem solving agent", "problem-solving agent", "problem solving agents",
      "atomic state", "open-loop execution", "state space search"
    ]
  },

  // --- UNIT 2: Search Strategies & CSP ---
  {
    topicId: "uninformed_search_overview",
    keywords: [
      "uninformed search", "blind search", "uninformed search strategies",
      "completeness", "optimality", "time complexity", "space complexity"
    ]
  },
  {
    topicId: "bfs",
    keywords: [
      "bfs", "breadth first", "breadth-first", "breadth first search",
      "fifo frontier", "fifo queue"
    ]
  },
  {
    topicId: "dfs",
    keywords: [
      "dfs", "depth first", "depth-first", "depth first search",
      "lifo frontier", "lifo stack"
    ]
  },
  {
    topicId: "uniform_cost_search",
    keywords: [
      "uniform cost", "uniform-cost", "uniform cost search", "ucs",
      "dijkstra search", "cheapest path search"
    ]
  },
  {
    topicId: "depth_limited_search",
    keywords: [
      "depth limited", "depth-limited", "depth limited search",
      "dls", "cutoff limit"
    ]
  },
  {
    topicId: "iterative_deepening",
    keywords: [
      "iterative deepening", "iterative-deepening", "iterative deepening search",
      "ids", "progressive depth"
    ]
  },
  {
    topicId: "informed_search_overview",
    keywords: [
      "informed search", "heuristic search", "informed search strategies",
      "evaluation function f(n)", "pruning search space"
    ]
  },
  {
    topicId: "greedy_best_first",
    keywords: [
      "greedy best first", "greedy best-first", "greedy search",
      "f(n) = h(n)", "greedy local choice"
    ]
  },
  {
    topicId: "a_star_search",
    keywords: [
      "a star", "a-star", "a*", "a star search", "a-star search",
      "f(n) = g(n) + h(n)", "g(n) + h(n)", "a star algorithm"
    ]
  },
  {
    topicId: "heuristic_function",
    keywords: [
      "heuristic function", "heuristics", "h(n)", "manhattan distance",
      "euclidean distance", "relaxed problem method", "dominance"
    ]
  },
  {
    topicId: "admissibility",
    keywords: [
      "admissibility", "admissible heuristic", "consistency",
      "consistent heuristic", "monotonicity", "triangle inequality"
    ]
  },
  {
    topicId: "hill_climbing",
    keywords: [
      "hill climbing", "hill-climbing", "hill climbing search",
      "local maxima", "plateau", "ridge", "stochastic hill climbing"
    ]
  },
  {
    topicId: "simulated_annealing",
    keywords: [
      "simulated annealing", "temperature t", "cooling schedule",
      "acceptance probability", "boltzmann"
    ]
  },
  {
    topicId: "local_beam_search",
    keywords: [
      "local beam search", "beam search", "k states", "state pool k"
    ]
  },
  {
    topicId: "gradient_descent",
    keywords: [
      "gradient descent", "steepest descent", "learning rate",
      "learning rate alpha", "continuous state space", "gradient vector"
    ]
  },
  {
    topicId: "minimax",
    keywords: [
      "minimax", "mini-max", "minimax algorithm", "game tree",
      "zero sum game", "zero-sum", "max player", "min player"
    ]
  },
  {
    topicId: "alpha_beta_pruning",
    keywords: [
      "alpha beta", "alpha-beta", "alpha beta pruning", "alpha-beta pruning",
      "alpha cutoff", "beta cutoff", "alpha value", "beta value"
    ]
  },
  {
    topicId: "csp_definition",
    keywords: [
      "csp", "constraint satisfaction", "constraint satisfaction problem",
      "factored state", "variables domains constraints", "map coloring problem"
    ]
  },
  {
    topicId: "backtracking",
    keywords: [
      "backtracking", "backtracking search", "backtracking csp",
      "minimum remaining values", "mrv", "degree heuristic",
      "least constraining value", "forward checking"
    ]
  },
  {
    topicId: "min_conflicts",
    keywords: [
      "min conflicts", "min-conflicts", "iterative repair",
      "million queens", "conflicted variable"
    ]
  },

  // --- UNIT 3: Knowledge, Logic & Inference ---
  {
    topicId: "logical_agents",
    keywords: [
      "logical agent", "logical agents", "declarative knowledge",
      "logic-based reasoning"
    ]
  },
  {
    topicId: "knowledge_based_agents",
    keywords: [
      "knowledge based agents", "knowledge-based agents", "kba",
      "tell and ask", "tell operation", "ask operation", "inference engine"
    ]
  },
  {
    topicId: "logic_definition_and_types",
    keywords: [
      "types of logic", "logic definition", "syntax and semantics",
      "entailment", "soundness", "completeness"
    ]
  },
  {
    topicId: "propositional_logic_syntax",
    keywords: [
      "propositional logic syntax", "proposition symbols", "atomic sentences",
      "complex sentences", "logical connectives", "operator precedence"
    ]
  },
  {
    topicId: "propositional_logic_semantics",
    keywords: [
      "propositional logic semantics", "truth tables", "tautology",
      "contradiction", "satisfiability", "model evaluation"
    ]
  },
  {
    topicId: "simple_inference_procedure",
    keywords: [
      "simple inference procedure", "truth table enumeration",
      "model checking", "inference procedure"
    ]
  },
  {
    topicId: "reasoning_patterns_propositional_logic",
    keywords: [
      "reasoning patterns", "modus ponens", "modus tollens",
      "and-elimination", "and-introduction", "disjunctive syllogism"
    ]
  },
  {
    topicId: "first_order_logic_intro",
    keywords: [
      "first order logic", "first-order logic", "fol", "predicate logic",
      "ontological commitment"
    ]
  },
  {
    topicId: "fol_syntax",
    keywords: [
      "fol syntax", "first order logic syntax", "quantifiers",
      "universal quantifier", "existential quantifier", "predicates", "constant symbols"
    ]
  },
  {
    topicId: "fol_semantics",
    keywords: [
      "fol semantics", "first order logic semantics", "domain of discourse",
      "interpretation function"
    ]
  },
  {
    topicId: "fol_inference",
    keywords: [
      "fol inference", "inference in first order logic", "skolemization",
      "universal instantiation", "existential instantiation", "propositionalization"
    ]
  },
  {
    topicId: "unification",
    keywords: [
      "unification", "most general unifier", "mgu", "occur check",
      "unify algorithm", "substitution set"
    ]
  },
  {
    topicId: "lifting",
    keywords: [
      "lifting", "lifted rules", "generalized modus ponens",
      "implicit instantiation"
    ]
  },
  {
    topicId: "forward_chaining",
    keywords: [
      "forward chaining", "forward-chaining", "data driven",
      "data-driven reasoning", "definite clauses", "rule firing"
    ]
  },
  {
    topicId: "backward_chaining",
    keywords: [
      "backward chaining", "backward-chaining", "goal driven",
      "goal-driven reasoning", "prolog", "subgoal generation"
    ]
  },
  {
    topicId: "resolution",
    keywords: [
      "resolution", "proof by refutation", "conjunctive normal form",
      "cnf", "empty clause", "resolvent", "resolution rule"
    ]
  },

  // --- UNIT 4: Ontologies, Vision & Recognition ---
  {
    topicId: "ontological_engineering",
    keywords: [
      "ontological engineering", "ontology", "upper ontologies",
      "domain ontologies", "taxonomies", "interoperability"
    ]
  },
  {
    topicId: "categories_objects",
    keywords: [
      "categories and objects", "category membership", "subclasses",
      "disjoint categories", "exhaustive decomposition", "partitions"
    ]
  },
  {
    topicId: "events",
    keywords: [
      "events and situation calculus", "situation calculus", "event calculus",
      "fluents", "frame problem", "effect axioms"
    ]
  },
  {
    topicId: "mental_events_objects",
    keywords: [
      "mental events", "mental objects", "propositional attitudes",
      "bdi model", "epistemic logic", "referential opacity"
    ]
  },
  {
    topicId: "reasoning_categories",
    keywords: [
      "reasoning systems for categories", "semantic networks",
      "description logics", "inheritance hierarchies", "subsumption"
    ]
  },
  {
    topicId: "default_reasoning",
    keywords: [
      "default reasoning", "non-monotonic logic", "non monotonic logic",
      "default rules", "circumscription", "closed world assumption"
    ]
  },
  {
    topicId: "voice_recognition",
    keywords: [
      "voice recognition", "speech recognition", "mfcc",
      "mel-frequency cepstral coefficients", "acoustic modeling", "viterbi decoding speech"
    ]
  },
  {
    topicId: "face_recognition",
    keywords: [
      "face recognition", "facial recognition", "eigenfaces",
      "facial embeddings", "face detection", "facial landmarks"
    ]
  },
  {
    topicId: "handwriting_recognition",
    keywords: [
      "handwriting recognition", "offline recognition", "online recognition",
      "binarization", "stroke thinning", "character segmentation"
    ]
  },
  {
    topicId: "pattern_recognition",
    keywords: [
      "pattern recognition", "feature vectors", "decision boundaries",
      "supervised learning", "unsupervised clustering", "overfitting"
    ]
  },
  {
    topicId: "sequential_pattern_recognition",
    keywords: [
      "sequential pattern recognition", "hidden markov models", "hmm",
      "dynamic time warping", "dtw", "time series sequences"
    ]
  },
  {
    topicId: "object_recognition_appearance",
    keywords: [
      "object recognition by appearance", "appearance-based recognition",
      "sift", "hog", "histogram of oriented gradients", "scale-invariant feature transform"
    ]
  },
  {
    topicId: "image_recognition",
    keywords: [
      "image recognition", "computer vision pipeline", "pixel array inputs",
      "convolutional neural networks", "image classification"
    ]
  },
  {
    topicId: "image_segmentation",
    keywords: [
      "image segmentation", "intensity thresholding", "edge detection",
      "region growing", "semantic segmentation"
    ]
  },
  {
    topicId: "morphological_processing",
    keywords: [
      "morphological processing", "morphological image processing",
      "erosion", "dilation", "opening and closing", "structuring element"
    ]
  },

  // --- UNIT 5: AI Applications & NLP ---
  {
    topicId: "ai_applications_overview",
    keywords: [
      "ai applications", "applications of ai", "healthcare ai",
      "financial ai", "robotics ai", "consumer personalization"
    ]
  },
  {
    topicId: "expert_systems",
    keywords: [
      "expert system", "expert systems", "mycin", "dendral",
      "rule-based expert system", "explanation facility"
    ]
  },
  {
    topicId: "domain_knowledge_representation",
    keywords: [
      "domain knowledge representation", "representing domain knowledge",
      "production rules", "frames", "semantic networks domain"
    ]
  },
  {
    topicId: "expert_system_shells",
    keywords: [
      "expert system shells", "expert system shell", "clips", "jess",
      "drools", "shell framework"
    ]
  },
  {
    topicId: "knowledge_acquisition",
    keywords: [
      "knowledge acquisition", "feigenbaum bottleneck", "manual elicitation",
      "knowledge validation", "elicitation"
    ]
  },
  {
    topicId: "language_models",
    keywords: [
      "language models", "language model", "n-gram", "n-gram models",
      "markov assumption", "smoothing techniques", "laplace smoothing"
    ]
  },
  {
    topicId: "information_retrieval",
    keywords: [
      "information retrieval", "inverted index", "tfidf", "tf-idf",
      "vector space model", "precision and recall"
    ]
  },
  {
    topicId: "information_extraction",
    keywords: [
      "information extraction", "named entity recognition", "ner",
      "relation extraction", "template filling", "coreference resolution"
    ]
  },
  {
    topicId: "nlp_introduction",
    keywords: [
      "nlp introduction", "natural language processing", "nlp",
      "morphological level", "syntactic level", "semantic level nlp", "pragmatic level"
    ]
  },
  {
    topicId: "syntactic_processing",
    keywords: [
      "syntactic processing", "parsing", "context-free grammar", "cfg",
      "parse tree", "top-down parsing", "bottom-up parsing"
    ]
  },
  {
    topicId: "semantic_analysis",
    keywords: [
      "semantic analysis", "word sense disambiguation", "semantic role labeling",
      "compositional semantics", "meaning representation"
    ]
  },
  {
    topicId: "discourse_pragmatic_processing",
    keywords: [
      "discourse processing", "pragmatic processing", "anaphora resolution",
      "speech acts", "conversational implicature"
    ]
  },
  {
    topicId: "statistical_nlp",
    keywords: [
      "statistical nlp", "corpus-based learning", "probabilistic parsing",
      "maximum likelihood estimation"
    ]
  },
  {
    topicId: "spell_checking",
    keywords: [
      "spell checking", "spell checker", "edit distance",
      "levenshtein distance", "non-word error", "real-word error", "candidate generation"
    ]
  }
];

/**
 * Finds matching topicId for a query string by testing rules.
 * @param {string} normalizedQuery - Lowercased, stripped query string.
 * @returns {string|null} - Matching topic ID or null.
 */
function matchRule(normalizedQuery) {
  if (!normalizedQuery) return null;

  // 1. Direct keyword phrase check
  for (const rule of rules) {
    for (const keyword of rule.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        return rule.topicId;
      }
    }
  }

  // 2. Token / word intersection fallback
  const queryTokens = normalizedQuery.split(/\s+/).filter(t => t.length > 2);
  if (queryTokens.length > 0) {
    let bestTopic = null;
    let maxScore = 0;

    for (const rule of rules) {
      let score = 0;
      for (const keyword of rule.keywords) {
        const kwTokens = keyword.toLowerCase().split(/\s+/);
        for (const qToken of queryTokens) {
          if (kwTokens.includes(qToken)) {
            score++;
          }
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestTopic = rule.topicId;
      }
    }

    if (maxScore >= 1) {
      return bestTopic;
    }
  }

  return null;
}
