export const PROFILE = {
  name: "Jeevan Katta",
  role: "DevOps & Cloud Engineer",
  location: "Hyderabad, India",
  years: "2.6 years",
  email: "jeevankatta17@gmail.com",
  github: "https://github.com/Jeevankatta",
  linkedin: "https://www.linkedin.com/in/jeevan-katta-7212b0220",
  site: "https://jeevankatta.com",
  resume: "/resume.pdf",
  blurb:
    "Two and a half years keeping banking workloads running on AWS — pipelines, containers, infrastructure as code, and the incident response around all of it. Now building Kubernetes platforms from scratch and looking for the next team to break things with.",
  tags: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Python"],
};

export const HERO_DETAIL = {
  title: "Jeevan Katta",
  glyph: "\u2699",
  palette: "red",
  badge: "Available now",
  year: "2023–2026",
  role: "DevOps & Cloud Engineer, Hyderabad",
  stack: "AWS, Kubernetes, Terraform, Docker, Jenkins, GitHub Actions, Python, Java",
  link: "https://github.com/Jeevankatta",
  desc: "Two and a half years of DevOps and cloud engineering for a US banking client — pipelines, containers, infrastructure as code, monitoring and incident response. Currently building Kubernetes platforms from scratch and preparing for the CKA.",
  points: [
    "2.6 years at Cognizant supporting a US banking client",
    "AWS Certified Cloud Practitioner",
    "B.Tech in Electronics and Communication Engineering, 2023",
    "Open to DevOps and Cloud roles — India and remote",
  ],
};

export const ROWS = [
  {
    id: "row-projects",
    title: "Projects you can actually open",
    audience: ["recruiter", "engineer", "all"],
    items: [
      {
        title: "Kubernetes GitOps Platform",
        sub: "Terraform · ArgoCD · Helm",
        glyph: "\u2638",
        palette: "blue",
        badge: "Live repo",
        year: "2026",
        progress: 60,
        role: "Solo build — in progress",
        stack: "Terraform, Helm, ArgoCD, Argo Rollouts, Kyverno, Prometheus, Grafana, Alertmanager",
        link: "https://github.com/Jeevankatta/k8s-gitops-platform",
        desc: "A three-node Kubernetes cluster and its platform add-ons, provisioned entirely through modular Terraform and delivered with pull-based GitOps. Built from scratch to understand every layer rather than inherit one.",
        points: [
          "Modular Terraform with for_each and remote state locking in S3",
          "Helm chart with probes, HPA, PodDisruptionBudget and least-privilege RBAC",
          "ArgoCD for pull-based delivery, Argo Rollouts for canary releases",
          "Prometheus, Grafana and Alertmanager with four PromQL alert rules",
          "Three Kyverno admission policies enforcing cluster guardrails",
        ],
      },
      {
        title: "DevSecOps Pipeline",
        sub: "Security gates in CI",
        glyph: "\u26E8",
        palette: "red",
        badge: "Live repo",
        year: "2026",
        role: "Solo build",
        stack: "GitHub Actions, SonarCloud, OWASP Dependency-Check, Trivy, gitleaks",
        link: "https://github.com/Jeevankatta/devsecops-pipeline",
        desc: "A CI/CD pipeline where security is a gate, not an afterthought. Every push runs static analysis, dependency scanning, container image scanning and secret detection before anything ships.",
        points: [
          "SonarCloud for static analysis and quality gates",
          "OWASP Dependency-Check for vulnerable libraries",
          "Trivy scanning container images before push",
          "gitleaks blocking commits that carry secrets",
        ],
      },
      {
        title: "This Portfolio",
        sub: "React · Three.js · Vite",
        glyph: "\u25B6",
        palette: "violet",
        badge: "Live repo",
        year: "2026",
        role: "Solo build",
        stack: "React 19, Three.js, Vite, GitHub Actions, GitHub Pages",
        link: "https://github.com/Jeevankatta",
        desc: "The site you are reading — a WebGL control plane rather than a page, with each section living on a worker node you open. Three.js is code-split so the HUD paints before the scene downloads, every node is a real focusable button rather than a raycast hit test, and there is a full no-WebGL fallback. Deployed by a GitHub Actions workflow on every push to main, because a DevOps portfolio that gets deployed by hand would be a bad look.",
        points: [
          "Automated build and deploy on push to main",
          "No client-side data collection, no tracking scripts",
          "Three.js code-split — 69kB gzipped shell, scene loads after",
          "Keyboard navigable end to end; falls back to a plain document without WebGL",
        ],
      },
    ],
  },
  {
    id: "row-work",
    title: "Work at Cognizant",
    audience: ["recruiter", "all"],
    items: [
      {
        title: "AI Incident Playbook",
        sub: "Faster triage, less guesswork",
        glyph: "\u26A0",
        palette: "violet",
        badge: "Production",
        year: "2025",
        role: "DevOps Engineer · US banking client",
        stack: "Python, AWS, GenAI tooling, alerting integrations",
        desc: "An incident response system that turns raw alerts into an SOP and routes them to the right owner automatically — cutting the time between an alert firing and someone who can fix it actually reading it.",
        points: [
          "Generates a structured SOP for the incident at hand",
          "Auto-routes to the responsible team instead of a shared queue",
          "Reduced manual triage overhead during on-call",
        ],
      },
      {
        title: "Copilot & Amazon Q Pilot",
        sub: "GenAI adoption inside a bank",
        glyph: "\u2726",
        palette: "green",
        badge: "Production",
        year: "2025",
        role: "Pilot lead · US banking client",
        stack: "GitHub Copilot, Amazon Q, Java, Spring Boot",
        desc: "Ran the internal pilot that got GenAI coding tools approved for use at a bank — a place where nothing gets approved quickly. Built a Spring Boot bank management system as the live demo that made the case.",
        points: [
          "Built a working demo instead of pitching slides",
          "Measured and presented developer time saved",
          "Pilot cleared client review and reached adoption approval",
        ],
      },
      {
        title: "ETL Failure Guardrails",
        sub: "Catching it at the source",
        glyph: "\u26D3",
        palette: "slate",
        badge: "Production",
        year: "2024",
        role: "DevOps Engineer · US banking client",
        stack: "Shell, Oracle PL/SQL, AWS, Splunk, Dynatrace",
        desc: "Data pipelines were failing silently and being discovered downstream. Added shell-based guardrails that validate at each stage and fail loudly, so problems surfaced at the source instead of in a report someone opened the next morning.",
        points: [
          "Stage-level validation with explicit failure signals",
          "Alerting wired into existing monitoring",
          "Cut down repeat failures caused by bad upstream data",
        ],
      },
      {
        title: "Oracle to AWS Migration",
        sub: "Moving the table estate",
        glyph: "\u2637",
        palette: "amber",
        badge: "Production",
        year: "2024",
        role: "DevOps Engineer · US banking client",
        stack: "Oracle SQL, AWS, Python, Terraform",
        desc: "Migrated an Oracle SQL table estate onto AWS — the unglamorous, high-consequence kind of work where the measure of success is that nobody noticed anything happened.",
        points: [
          "Mapped and validated schemas before cutover",
          "Scripted repeatable migration steps rather than manual runs",
          "Verified parity post-migration",
        ],
      },
      {
        title: "Java 8 → 17 Migration",
        sub: "AI-assisted upgrade",
        glyph: "\u2615",
        palette: "rose",
        badge: "Production",
        year: "2025",
        role: "DevOps Engineer · US banking client",
        stack: "Java, Spring Boot, GitHub Copilot, Amazon Q, Maven",
        desc: "Upgraded legacy services from Java 8 to 17, using Copilot and Amazon Q to accelerate the mechanical parts of the refactor while keeping human review on anything behavioural.",
        points: [
          "Dependency and API compatibility sweep",
          "AI-assisted refactors with review gates",
          "Regression-tested before release",
        ],
      },
    ],
  },
  {
    id: "row-stack",
    title: "The toolchain",
    audience: ["engineer", "all"],
    items: [
      {
        title: "AWS",
        sub: "EC2 · VPC · SQS · SNS · EventBridge",
        glyph: "\u2601",
        palette: "amber",
        badge: "Daily driver",
        year: "Hands-on",
        stack: "EC2, VPC, S3, IAM, SQS, SNS, EventBridge, CloudWatch",
        desc: "Primary cloud. Networking, compute, event-driven messaging and observability in a production banking context — plus remote Terraform state and the security posture that comes with a regulated environment.",
      },
      {
        title: "Kubernetes",
        sub: "Workloads & platform add-ons",
        glyph: "\u2638",
        palette: "blue",
        badge: "Daily driver",
        year: "Hands-on",
        stack: "Deployments, Helm, RBAC, HPA, PDB, ArgoCD, Kyverno, kind",
        desc: "Running containerised workloads and, more recently, building the platform layer underneath them — Helm packaging, admission policy, progressive delivery and cluster observability.",
      },
      {
        title: "Terraform",
        sub: "Infrastructure as code",
        glyph: "\u25A6",
        palette: "violet",
        badge: "Daily driver",
        year: "Hands-on",
        stack: "Modules, for_each, remote state, S3 backend with locking",
        desc: "Maintained existing modules at work and wrote a modular setup from scratch for the GitOps platform — including versioned, encrypted remote state with native locking.",
      },
      {
        title: "CI/CD",
        sub: "Jenkins · GitHub Actions",
        glyph: "\u27F3",
        palette: "green",
        badge: "Daily driver",
        year: "Hands-on",
        stack: "Jenkins, GitHub Actions, Docker, Maven, SonarCloud, Trivy",
        desc: "Pipelines from commit to deploy, with quality and security gates in between. Comfortable both maintaining crufty inherited pipelines and designing clean ones.",
      },
      {
        title: "Observability",
        sub: "Dynatrace · Splunk · Prometheus",
        glyph: "\u2197",
        palette: "teal",
        badge: "Daily driver",
        year: "Hands-on",
        stack: "Dynatrace, Splunk, CloudWatch, Prometheus, Grafana, Alertmanager",
        desc: "Dashboards, log analysis and alert rules — and the on-call experience of finding out which alerts actually matter at 3am and which ones just wake people up.",
      },
      {
        title: "Python & Java",
        sub: "Scripting and services",
        glyph: "\u2328",
        palette: "red",
        badge: "Working level",
        year: "Hands-on",
        stack: "Python (automation, data processing), Java, Spring Boot, PL/SQL, Shell",
        desc: "Python for automation and data processing, Java and Spring Boot for services, shell for the glue, PL/SQL from the Oracle side of the banking estate.",
      },
    ],
  },
  {
    id: "row-background",
    title: "Background",
    audience: ["recruiter", "all"],
    items: [
      {
        title: "Cognizant",
        sub: "Dec 2023 – Jun 2026",
        glyph: "\u25A3",
        palette: "blue",
        badge: "2.6 years",
        year: "2023–2026",
        role: "Software Engineer / Application Analyst — DevOps & Cloud",
        stack: "AWS, Kubernetes, Docker, Terraform, Jenkins, GitHub Actions, Dynatrace, Splunk, Java, PL/SQL, Python",
        desc: "Two and a half years supporting a US banking client's platform — CI/CD pipelines, containerised services, infrastructure as code, monitoring, and the production incidents that come with all of it.",
        points: [
          "Maintained and extended Terraform modules for existing infrastructure",
          "Built and maintained Jenkins and GitHub Actions pipelines",
          "Monitoring and alerting across Dynatrace, Splunk and CloudWatch",
          "On-call incident response for production banking workloads",
          "Drove GenAI tooling adoption within a tightly regulated environment",
        ],
      },
      {
        title: "AWS Cloud Practitioner",
        sub: "Certified",
        glyph: "\u2691",
        palette: "amber",
        badge: "Certified",
        year: "2024",
        role: "Amazon Web Services",
        stack: "AWS core services, billing, security, architecture fundamentals",
        desc: "AWS Certified Cloud Practitioner. Groundwork for the associate-level and Kubernetes certifications currently in progress.",
      },
      {
        title: "CKA — in progress",
        sub: "Certified Kubernetes Administrator",
        glyph: "\u2637",
        palette: "teal",
        badge: "Studying",
        year: "2026",
        progress: 35,
        role: "Study track",
        stack: "kubeadm, etcd, kubectl, RBAC, networking, troubleshooting",
        desc: "Working through the CKA curriculum hands-on in a kind cluster on WSL2 — cluster bootstrap, upgrades, etcd backup and restore, network policies, and the timed troubleshooting drills the exam is really about.",
      },
      {
        title: "B.Tech, ECE",
        sub: "Sreenidhi Institute · 2023",
        glyph: "\u2606",
        palette: "slate",
        badge: "2019–2023",
        year: "2023",
        role: "Electronics & Communication Engineering",
        stack: "Sreenidhi Institute of Science and Technology, Hyderabad",
        desc: "Graduated in Electronics and Communication Engineering, then moved straight into cloud and DevOps work — the hardware background still helps when reasoning about what is actually happening under an abstraction.",
      },
    ],
  },
];


/* ---------------------------------------------------------------
   HIGHLIGHTS — the strip under the hero.
   Every number here is countable from the content below it. Swap in
   harder scale numbers when you have them (cluster count, deploy
   frequency, ticket volume, environment size) — hiring managers in
   infra filter on scale before anything else.
----------------------------------------------------------------*/
export const HIGHLIGHTS = [
  { n: "2.6 yrs", l: "Production DevOps for a US banking client" },
  { n: "5",       l: "Systems shipped and run in production" },
  { n: "3",       l: "Public repos you can open and read" },
  { n: "24×7",    l: "On-call rotation for banking workloads" },
];

/* ---------------------------------------------------------------
   PIPELINE — the delivery path drawn at the top of the page.
   These are the tools actually used in the GitOps and DevSecOps
   repos, not a generic stack diagram.
----------------------------------------------------------------*/
export const PIPELINE = [
  { step: "01", name: "Commit",  tools: ["git", "gitleaks"] },
  { step: "02", name: "Build",   tools: ["Maven", "Docker"] },
  { step: "03", name: "Scan",    tools: ["SonarCloud", "OWASP DC", "Trivy"] },
  { step: "04", name: "Deliver", tools: ["Helm", "ArgoCD", "Argo Rollouts"] },
  { step: "05", name: "Observe", tools: ["Prometheus", "Grafana", "Alertmanager"] },
];

/* ---------------------------------------------------------------
   DOING — the "What I'm Doing" cards on the About screen.
   Four areas of practice, not a job list.
----------------------------------------------------------------*/
export const DOING = [
  {
    tag: "security",
    title: "DevSecOps",
    desc: "Pipelines where security is a gate, not a review step — secret detection, dependency and image scanning, and quality bars that stop a bad commit before it reaches a registry.",
  },
  {
    tag: "cloud",
    title: "Cloud Engineering",
    desc: "AWS in a regulated banking context: networking, compute, event-driven messaging, IAM, and the remote Terraform state and security posture that come with it.",
  },
  {
    tag: "reliability",
    title: "Reliability & On-call",
    desc: "Monitoring and alerting across Dynatrace, Splunk and CloudWatch, plus the on-call experience of learning which alerts matter at 3am and which ones just wake people up.",
  },
  {
    tag: "automation",
    title: "Platform Automation",
    desc: "Modular Terraform, Helm packaging, admission policy and pull-based GitOps delivery — building the platform layer rather than inheriting one.",
  },
];
