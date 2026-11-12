/**
 * Single source of truth for all portfolio copy.
 * Every fact below comes from Shivraj’s resume (shivraj-bakare-resume.pdf)
 * or his public GitHub profile. Do not add claims that cannot be verified there.
 */

export const profile = {
  name: "Shivraj Bakare",
  firstName: "Shivraj",
  lastName: "Bakare",
  role: "Final-year undergraduate, IIT Kanpur",
  major: "B.Tech, Materials Science & Engineering",
  email: "shivrajb23@iitk.ac.in",
  linkedin: "https://linkedin.com/in/Shivraj-Bakare",
  github: "https://github.com/Shivrajbakare",
  resume: "/shivraj-bakare-resume.pdf",
  current: { role: "AI/ML Engineering Intern", org: "MyConsciOS" },
  interests: ["Software Engineering", "Artificial Intelligence", "Machine Learning", "Data Science"],
};

export type Metric = { value: string; label: string };
export type Step = { title: string; body: string };
export type PlateKind = "catgnn" | "forensics" | "istvt" | "asr";

export type Project = {
  slug: string;
  index: string;
  title: string;
  /** Short title used in large display type */
  display: string;
  codename?: string;
  kicker: string;
  period: string;
  context: string;
  repo: string;
  summary: string;
  problem: string;
  contribution: string;
  approach: Step[];
  stack: string[];
  results: Metric[];
  headline: Metric;
  plate: PlateKind;
  caption: string;
};

export const projects: Project[] = [
  {
    slug: "catgnn",
    index: "01",
    title: "CATGNN for Heat and Crystal Vibrations",
    display: "CATGNN",
    kicker: "Graph neural networks · Materials informatics",
    period: "May 2025 – Jul 2025",
    context: "Summer project under Prof. Somnath Bhowmick, Dept. of MSE, IIT Kanpur",
    repo: "https://github.com/Shivrajbakare/CATGNN_phonon_DOS",
    summary:
      "A graph neural network that reads a crystal’s structure and predicts its chemical-bonding descriptors, used to estimate lattice thermal conductivity for more than 200,000 materials.",
    problem:
      "Lattice thermal conductivity (LTC) is what decides whether a material can be a useful thermoelectric. The bonding descriptors that help explain it, ICOHP and ICOBI, come from DFT and LOBSTER calculations run one crystal at a time. That works for thousands of crystals but not for the hundreds of thousands worth screening.",
    contribution:
      "I generated the descriptor dataset, built the CATGNN model in PyTorch and PyTorch Geometric, trained it, and used it to predict LTC across 200k+ materials.",
    approach: [
      {
        title: "Ground truth",
        body: "Took 4,500+ crystal structures from OQMD and computed their ICOHP/ICOBI bonding descriptors with DFT (VASP) and LOBSTER.",
      },
      {
        title: "Crystal graphs",
        body: "Turned each crystal into a graph and encoded its geometry with spherical harmonics, so the network sees bond directions as well as distances.",
      },
      {
        title: "Training",
        body: "Trained CATGNN to predict ICOHP and ICOBI from the crystal graph on a 75/15/10 train/validation/test split, using AdamW at a learning rate of 0.001.",
      },
      {
        title: "Screening",
        body: "Ran the trained model over 200k+ materials to predict LTC, speeding up the search for thermoelectric candidates.",
      },
    ],
    stack: ["Python", "PyTorch", "PyTorch Geometric", "VASP (DFT)", "LOBSTER", "OQMD"],
    results: [
      { value: "97.4%", label: "R² on ICOHP" },
      { value: "97.8%", label: "R² on ICOBI" },
      { value: "4,500+", label: "crystals with DFT descriptors" },
      { value: "200k+", label: "materials screened for LTC" },
    ],
    headline: { value: "97.8%", label: "R² · ICOBI" },
    plate: "catgnn",
    caption: "A crystal as a graph: atoms are nodes, bonds are edges, and each edge carries a predicted bonding strength.",
  },
  {
    slug: "explainable-ai-image-detection",
    index: "02",
    title: "Explainable AI-Generated Image Detection",
    display: "Explainable Image Forensics",
    kicker: "Computer vision · Vision-language models",
    period: "Jan 2026 – Apr 2026",
    context: "Undergraduate project under Prof. A. Behera",
    repo: "https://github.com/Shivrajbakare/Artifact-Prediction-and-Explanation",
    summary:
      "A forensics pipeline that decides whether an image is real or AI-generated, finds the synthetic artifacts that give it away, and explains them in plain language.",
    problem:
      "Images from modern generators such as Stable Diffusion 3.5, PixArt-α and Adobe Firefly are hard to tell apart from photographs. A real/fake score alone isn’t much use in forensics: you also need to know where the image is wrong and why.",
    contribution:
      "I built the whole pipeline: real/fake classification, multi-artifact localisation, the fusion algorithm that merges every model’s output, and the language-model explanation stage.",
    approach: [
      {
        title: "Real or fake",
        body: "DINOv2 features feed an RBF-SVM classifier that separates photographs from synthetic images.",
      },
      {
        title: "Artifact detection",
        body: "A 16-CNN ensemble (ResNet50 / DenseNet121) and a JINA-CLIP-V2 base model detect more than 70 types of synthetic artifact.",
      },
      {
        title: "Priority fusion",
        body: "A 5-tier Priority Fusion Algorithm and a weighted scoring engine combine all the model predictions into one ranked list of artifacts, while keeping inference within VRAM limits.",
      },
      {
        title: "Explanation",
        body: "A 4-bit quantised VLM (Ovis1.6-Gemma2-9B) writes a zero-shot, plain-language explanation of what was found.",
      },
    ],
    stack: ["Python", "DINOv2", "RBF-SVM", "ResNet50", "DenseNet121", "JINA-CLIP-V2", "Ovis1.6-Gemma2-9B"],
    results: [
      { value: "70+", label: "synthetic artifact types detected" },
      { value: "16", label: "CNNs in the detection ensemble" },
      { value: "2,750", label: "manually annotated test images" },
      { value: "0.182", label: "IoU test score for localisation" },
    ],
    headline: { value: "70+", label: "artifact types" },
    plate: "forensics",
    caption: "An image divided into patches. The pipeline flags suspicious regions, ranks them, and explains each one.",
  },
  {
    slug: "istvt-deepfake-detection",
    index: "03",
    title: "ISTVT DeepFake Detection",
    display: "ISTVT DeepFake Detection",
    kicker: "Video forensics · Spatio-temporal attention",
    period: "May 2025 – Jul 2025",
    context: "EE656 course project under Prof. N. K. Verma, Dept. of EE, IIT Kanpur",
    repo: "https://github.com/Shivrajbakare/ISTVT-DeepFake-Detection",
    summary:
      "An interpretable deepfake detector that looks for flaws inside each frame and for inconsistencies between frames.",
    problem:
      "Deepfakes leave fine-grained spatial artifacts and small temporal inconsistencies, and video compression makes both harder to see. The detector had to stay reliable across compression levels and be able to show what it was looking at.",
    contribution:
      "I built the preprocessing pipeline, the ISTVT-based model, and the training and evaluation setup, including the attention-map visualisations.",
    approach: [
      {
        title: "Face sequences",
        body: "A PyTorch pipeline uses MTCNN to crop aligned faces, then turns each video into a normalised, fixed-length sequence of six frames so the order of events is kept.",
      },
      {
        title: "Spatial embeddings",
        body: "A pretrained Xception backbone extracts spatial embeddings from each frame.",
      },
      {
        title: "Spatio-temporal attention",
        body: "A tokenizer feeds the embeddings into spatial and temporal self-attention blocks, and feature subtraction highlights manipulation artifacts.",
      },
      {
        title: "Training & interpretation",
        body: "The model is trained with BCE loss. At evaluation, its attention maps concentrate on altered facial regions: the eyes, mouth and jawline.",
      },
    ],
    stack: ["Python", "PyTorch", "MTCNN", "Xception", "ISTVT", "FaceForensics++"],
    results: [
      { value: "95.32%", label: "accuracy on FaceForensics++" },
      { value: "97.24%", label: "AUC on FaceForensics++" },
      { value: "6", label: "frames per input sequence" },
      { value: "3", label: "regions where attention concentrated: eyes, mouth, jawline" },
    ],
    headline: { value: "97.24%", label: "AUC · FF++" },
    plate: "istvt",
    caption: "Six aligned face crops pass through Xception and then attention. The highlighted regions are where the model looks.",
  },
  {
    slug: "sanskrit-asr",
    index: "04",
    title: "Sanskrit Real-Time ASR Engine",
    display: "Sanskrit ASR Engine",
    codename: "VaaniVicharika",
    kicker: "Speech recognition · Full-stack",
    period: "May 2025 – Jul 2025",
    context: "Summer project under Prof. Rajesh M. Hegde, Dept. of EE, IIT Kanpur",
    repo: "https://github.com/Shivrajbakare/ASR_App",
    summary:
      "A real-time speech-recognition engine for Sanskrit, covering everything from a fine-tuned acoustic model to web and desktop apps where users can correct its output.",
    problem:
      "Sanskrit has very little speech-technology support compared with widely spoken languages. The aim was a transcription engine that runs in real time and gets better as people correct it.",
    contribution:
      "I fine-tuned the acoustic model, built the FastAPI backend with its transcription and feedback endpoints, and built both the Next.js web app and the Tkinter desktop app.",
    approach: [
      {
        title: "Acoustic model",
        body: "Fine-tuned Wav2Vec2 for CTC in PyTorch on Sanskrit speech, using soundfile and librosa to process 16 kHz audio.",
      },
      {
        title: "Language layer",
        body: "Added Flan-T5-base alongside the transcription pipeline.",
      },
      {
        title: "Backend",
        body: "Built a high-throughput FastAPI service with CORS and two endpoints: one to transcribe, one to collect feedback. The feedback endpoint lets people correct transcripts in real time.",
      },
      {
        title: "Interfaces",
        body: "Built a Next.js + Tailwind CSS web app for streaming audio, and a multithreaded Tkinter desktop app that takes microphone input or audio files.",
      },
    ],
    stack: ["Python", "PyTorch", "Wav2Vec2", "Flan-T5", "librosa", "FastAPI", "Next.js", "Tailwind CSS", "Tkinter"],
    results: [
      { value: "90%+", label: "transcription accuracy benchmarks" },
      { value: "16 kHz", label: "audio input pipeline" },
      { value: "2", label: "clients: web and desktop" },
      { value: "Live", label: "human-in-the-loop correction" },
    ],
    headline: { value: "90%+", label: "transcription acc." },
    plate: "asr",
    caption: "Speech arrives as a waveform. CTC aligns it to characters, and the user’s corrections flow back to the model.",
  },
];

export type Experience = {
  id: string;
  org: string;
  role: string;
  kind: "Industry" | "Research" | "Leadership";
  period: string;
  where?: string;
  lede: string;
  points: string[];
  tags: string[];
  figures?: Metric[];
  link?: string;
  publication?: string;
};

export const experience: Experience[] = [
  {
    id: "myconscios",
    org: "MyConsciOS",
    role: "AI/ML Engineering Intern",
    kind: "Industry",
    period: "Jul 2026 – Present",
    lede: "Building the intelligence layer of a decision platform, where deterministic logic and AI work side by side.",
    points: [
      "Engineered LamarX, a hybrid deterministic-and-AI decision-intelligence engine (a 16-state symbolic mapper, 12-house geomantic alignment, Witness/Judge synthesis and 6-factor confidence scoring) on FastAPI and PostgreSQL, across 87 Alembic migrations.",
      "Built a two-tier NLP humanizer: OpenAI first, with a rule-based fallback. Fixed bugs where it silently switched itself off or gave responses that ignored context, by refactoring its config and rewriting the system prompt.",
      "Built a semantic answer-lock against abuse, using OpenAI text-embedding-3-small (1536-dim) and cosine similarity (≥ 0.84) with category-specific time windows, so users can’t re-ask on impulse to get a different answer.",
      "Integrated a Beta-Binomial Bayesian calibration model, validated with the Brier score and 10-bin calibration curves, so decision confidence keeps recalibrating against user feedback.",
      "Shipped the full-stack platform and architected ConsciOS, a microservices Decision-OS SaaS with an API gateway, Docker, Redis rate limiting and structured JSON output from the OpenAI Responses API.",
    ],
    tags: ["FastAPI", "PostgreSQL", "Alembic", "OpenAI", "Embeddings", "Bayesian calibration", "Docker", "Redis"],
    figures: [
      { value: "87", label: "Alembic migrations" },
      { value: "1536", label: "embedding dimensions" },
      { value: "≥0.84", label: "cosine lock threshold" },
    ],
  },
  {
    id: "ucl",
    org: "University College London",
    role: "Research Intern: Declarative Sovereign LLM Fine-Tuning",
    kind: "Research",
    period: "Mar 2026 – Aug 2026",
    where: "Under Prof. Philip Treleaven",
    lede: "Researched how banks and trading firms can fine-tune LLMs while keeping their data private, local, auditable and compliant.",
    points: [
      "Researched a privacy-preserving, sovereignty-aware architecture for fine-tuning LLMs in regulated financial systems, covering data localisation, security, auditability and full compliance.",
      "Brought together DP-SGD, Federated Learning, Federated Computing as Code, a Value-Identity Model and LoRA/QLoRA in one declarative architecture that keeps the governance plane separate from the privacy plane.",
      "Engineered a pipeline that connects cryptographic primitives to the fine-tuning workflow while keeping the latency added by differential privacy low enough for real-time applications.",
      "Compared privacy frameworks across high-frequency-trading and retail-banking scenarios, and built a Governance-as-Code layer that automates compliance auditing, tested against poisoning attacks.",
    ],
    tags: ["LLMs", "DP-SGD", "Federated Learning", "LoRA / QLoRA", "Governance-as-Code"],
    publication:
      "Co-author, “A Declarative Architecture for Sovereignty-Aware LLM Fine-Tuning in Regulated Financial Systems” (SSRN). The architecture is projected to avoid ₹50–200 Cr in total custom AI training costs.",
  },
  {
    id: "kos",
    org: "KOS Dance Club",
    role: "Secretary & Team Member",
    kind: "Leadership",
    period: "Apr 2024 – Apr 2025",
    where: "Media & Cultural Council, IIT Kanpur",
    lede: "Led the club as a core choreographer and organiser.",
    points: [
      "Directed a 40-member contingent and trained more than 50 freshers.",
      "Served as core choreographer, securing top inter-college podium finishes.",
      "Led public performance campaigns, including shows at Z Square Mall.",
    ],
    tags: ["Leadership", "Choreography", "Mentoring"],
    figures: [
      { value: "40", label: "member contingent" },
      { value: "50+", label: "freshers trained" },
    ],
  },
];

export const education = [
  {
    years: "2023 – Present",
    start: "2023",
    qualification: "B.Tech in Materials Science and Engineering",
    school: "Indian Institute of Technology Kanpur",
    score: "7.9",
    scale: "/10 CPI",
  },
  {
    years: "2022",
    start: "2022",
    qualification: "Class XII · MSBSHSE",
    school: "Lalasheth Bihani Vidyamandir Prashala, Rahuri",
    score: "84.17",
    scale: "%",
  },
  {
    years: "2020",
    start: "2020",
    qualification: "Class X · MSBSHSE",
    school: "Savitribai Phule Madhyamik Vidyalaya, Rahuri",
    score: "97.0",
    scale: "%",
  },
];

export const courses = [
  "Fundamentals of Computing",
  "AI, ML, DL & Applications",
  "Computational Methods in MSE",
  "Materials Informatics",
  "Application of Calculus",
  "Linear Algebra",
  "Quantum Physics",
  "Classical Electrodynamics",
];

export type Achievement = {
  figure: string;
  unit?: string;
  title: string;
  detail: string;
  year?: string;
  field: "Scholastic" | "Cultural" | "Technical" | "Research" | "Service";
};

export const achievements: Achievement[] = [
  {
    figure: "1441",
    title: "Specialist on Codeforces",
    detail: "Peak competitive-programming rating.",
    year: "2026",
    field: "Scholastic",
  },
  {
    figure: "99.72",
    unit: "%ile",
    title: "MHT-CET",
    detail: "Among 250,000+ candidates; conducted by the Maharashtra State CET Cell.",
    year: "2023",
    field: "Scholastic",
  },
  {
    figure: "41",
    unit: "state rank",
    title: "Manthan Talent Search Examination",
    detail: "Conducted by the Maharashtra State Council.",
    year: "2017",
    field: "Scholastic",
  },
];

export const honours: { label: string; title: string; detail: string; field: Achievement["field"] }[] = [
  {
    label: "Gold",
    title: "Inter IIT Cultural Meet 7.0",
    detail: "Group Dance, as part of the IIT Kanpur team that won the overall dance trophy.",
    field: "Cultural",
  },
  { label: "Gold", title: "Antaragni ’24", detail: "Jitterbug.", field: "Cultural" },
  { label: "Gold", title: "Galaxy ’25", detail: "Dance.", field: "Cultural" },
  {
    label: "2nd",
    title: "AIRIDDLE",
    detail: "Design and flight challenge run by the Aeromodelling Club, IIT Kanpur.",
    field: "Technical",
  },
  {
    label: "Co-author",
    title: "SSRN working paper",
    detail: "A Declarative Architecture for Sovereignty-Aware LLM Fine-Tuning in Regulated Financial Systems.",
    field: "Research",
  },
  {
    label: "Secretary",
    title: "KOS Dance Club",
    detail: "Media & Cultural Council, IIT Kanpur, 2024–25.",
    field: "Cultural",
  },
  {
    label: "Grade A",
    title: "NCC Certificate",
    detail: "Ministry of Defence. Also completed a 10-day Combined Training Camp.",
    field: "Service",
  },
];

export type SkillGroup = "lang" | "ml" | "data" | "eng" | "sci";

export const skillGroups: Record<SkillGroup, { name: string; note: string }> = {
  lang: { name: "Languages", note: "What I write in" },
  ml: { name: "AI / ML", note: "Models, methods, frameworks" },
  data: { name: "Data Science", note: "Analysis & visualisation" },
  eng: { name: "Engineering", note: "Backends, frontends, infra" },
  sci: { name: "Science & Design", note: "From the materials side" },
};

export type Skill = { sym: string; name: string; group: SkillGroup; usedIn: string[] };

export const skills: Skill[] = [
  { sym: "Py", name: "Python", group: "lang", usedIn: ["CATGNN", "ISTVT", "Sanskrit ASR", "Image Forensics"] },
  { sym: "C", name: "C", group: "lang", usedIn: ["Toolkit"] },
  { sym: "Cp", name: "C++", group: "lang", usedIn: ["Algorithms & competitive programming"] },
  { sym: "Sq", name: "SQL", group: "lang", usedIn: ["MyConsciOS (PostgreSQL)"] },
  { sym: "Js", name: "JavaScript", group: "lang", usedIn: ["Sanskrit ASR web app"] },
  { sym: "Ht", name: "HTML & CSS", group: "lang", usedIn: ["Sanskrit ASR web app"] },

  { sym: "Pt", name: "PyTorch", group: "ml", usedIn: ["CATGNN", "ISTVT", "Sanskrit ASR"] },
  { sym: "Pg", name: "PyTorch Geometric", group: "ml", usedIn: ["CATGNN"] },
  { sym: "Gn", name: "Graph Neural Networks", group: "ml", usedIn: ["CATGNN"] },
  { sym: "Cv", name: "Computer Vision", group: "ml", usedIn: ["ISTVT", "Image Forensics"] },
  { sym: "Tf", name: "Transformers & Attention", group: "ml", usedIn: ["ISTVT", "Sanskrit ASR (Wav2Vec2, Flan-T5)"] },
  { sym: "Nl", name: "NLP & Speech", group: "ml", usedIn: ["Sanskrit ASR", "MyConsciOS humanizer"] },
  { sym: "Lm", name: "LLMs & VLMs", group: "ml", usedIn: ["UCL research", "MyConsciOS", "Image Forensics (Ovis VLM)"] },
  { sym: "Lr", name: "LoRA / QLoRA", group: "ml", usedIn: ["UCL research"] },
  { sym: "Dp", name: "DP-SGD & Federated Learning", group: "ml", usedIn: ["UCL research"] },
  { sym: "Sk", name: "Scikit-learn", group: "ml", usedIn: ["Toolkit"] },

  { sym: "Np", name: "NumPy", group: "data", usedIn: ["Toolkit"] },
  { sym: "Pd", name: "Pandas", group: "data", usedIn: ["Toolkit"] },
  { sym: "Mp", name: "Matplotlib", group: "data", usedIn: ["Toolkit"] },
  { sym: "Sb", name: "Seaborn", group: "data", usedIn: ["Toolkit"] },
  { sym: "Bc", name: "Bayesian Calibration", group: "data", usedIn: ["MyConsciOS (Beta-Binomial, Brier score)"] },
  { sym: "Xl", name: "Excel", group: "data", usedIn: ["Toolkit"] },

  { sym: "Fa", name: "FastAPI", group: "eng", usedIn: ["Sanskrit ASR", "MyConsciOS"] },
  { sym: "Ra", name: "REST APIs", group: "eng", usedIn: ["Sanskrit ASR", "MyConsciOS"] },
  { sym: "Ps", name: "PostgreSQL", group: "eng", usedIn: ["MyConsciOS"] },
  { sym: "Re", name: "React", group: "eng", usedIn: ["Sanskrit ASR web app (Next.js)"] },
  { sym: "Nx", name: "Next.js", group: "eng", usedIn: ["Sanskrit ASR web app"] },
  { sym: "Tw", name: "Tailwind CSS", group: "eng", usedIn: ["Sanskrit ASR web app"] },
  { sym: "Dk", name: "Docker", group: "eng", usedIn: ["MyConsciOS"] },
  { sym: "Rd", name: "Redis", group: "eng", usedIn: ["MyConsciOS (rate limiting)"] },
  { sym: "Gt", name: "Git & GitHub", group: "eng", usedIn: ["Everything"] },

  { sym: "Va", name: "VASP (DFT)", group: "sci", usedIn: ["CATGNN"] },
  { sym: "Lb", name: "LOBSTER", group: "sci", usedIn: ["CATGNN"] },
  { sym: "Ac", name: "AutoCAD", group: "sci", usedIn: ["Toolkit"] },
];

export const beyond = [
  {
    key: "dance",
    title: "Dance",
    line: "The other half of my time at IIT Kanpur.",
    body: "I was Secretary of the KOS Dance Club, choreographed for a 40-member contingent, and won gold at Inter IIT Cultural Meet 7.0, Antaragni ’24 (Jitterbug) and Galaxy ’25. Choreography turned out to be a lot like systems design: timing, structure, and a lot of rehearsal.",
  },
  {
    key: "paint",
    title: "Acrylic painting",
    line: "Slow work, by hand.",
    body: "Painting is my break from screens. Acrylics dry fast, so you commit to a stroke and adjust on the next layer. I’d say the same about shipping software.",
  },
  {
    key: "games",
    title: "Game development & shaders",
    line: "Where maths becomes something you can see.",
    body: "I like building things that render. One example is a 3D renderer written in GLSL, from Computer Graphics & Shaders work with IIT Kanpur’s Game Development Club.",
    link: { href: "https://github.com/Shivrajbakare/Graphics-and-Shaders-3D-Renderer", label: "Graphics-and-Shaders-3D-Renderer" },
  },
  {
    key: "space",
    title: "Flight & space",
    line: "Looking up, still.",
    body: "I placed 2nd in AIRIDDLE, the Aeromodelling Club’s design-and-flight challenge, and I follow space exploration closely. Flight brings together everything I like: materials, control and computation.",
  },
] as const;

export const nav = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
