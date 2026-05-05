export const NAV_LINKS = [
  { id: "base-station", label: "Base Station", sectionId: "base-station" },
  { id: "pilot-profile", label: "Pilot Profile", sectionId: "pilot-profile" },
  { id: "flight-history", label: "Flight History", sectionId: "flight-history" },
  { id: "mission-logs", label: "Mission Logs", sectionId: "mission-logs" },
  { id: "signal-transmission", label: "Signal", sectionId: "signal-transmission" },
] as const;

// ============================================
// Pilot Profile
// ============================================

export const PILOT_PROFILE = {
  name: "Muhammad Khanif Naufal",
  photo: "/profile.jpg",
  education: "Universitas Dian Nuswantoro — S1 Teknik Informatika, 2026",
  email: "mkhanif86@gmail.com",
  location: "Semarang, Indonesia",
  status: "Open to Work" as const,
  motto: "You may break all my bones but my soul will be more than enough to get me on my feet.",
  bio: "Building the future through code and intelligence. Specializing in full-stack web development and machine learning engineering.",
};

// ============================================
// Tech Specs / Skills
// ============================================

export type SkillCategory = "Frontend" | "Backend" | "Tools & Database";

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
}

export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
  { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg", category: "Frontend" },

  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", category: "Backend" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", category: "Backend" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "Backend" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", category: "Backend" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", category: "Backend" },

  // Tools & Database
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "Tools & Database" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", category: "Tools & Database" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "Tools & Database" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: "Tools & Database" },
];

// ============================================
// Flight History
// ============================================

export type HistoryCategory = "work" | "academic" | "certification" | "research";

export interface TimelineItem {
  id: string;
  category: HistoryCategory;
  title: string;
  organization: string;
  period: string;
  description: string;
  tags?: string[];
}

export const HISTORY_CATEGORIES: { key: HistoryCategory; label: string; icon: string }[] = [
  { key: "work", label: "Work Experience", icon: "💼" },
  { key: "academic", label: "Academic", icon: "🎓" },
  { key: "certification", label: "Certifications", icon: "📜" },
  { key: "research", label: "Research", icon: "🔬" },
];

export const FLIGHT_HISTORY: TimelineItem[] = [
  // Work Experience
  {
    id: "WE_001",
    category: "work",
    title: "Full-Stack Developer Intern",
    organization: "PT Technology Solutions",
    period: "Jun 2025 — Present",
    description: "Developing and maintaining web applications using React, Next.js, and Laravel. Collaborated with cross-functional teams to deliver scalable solutions.",
    tags: ["React", "Next.js", "Laravel", "PostgreSQL"],
  },
  {
    id: "WE_002",
    category: "work",
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    period: "Jan 2024 — May 2025",
    description: "Built custom web applications for clients including e-commerce platforms, landing pages, and dashboard systems with modern tech stacks.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
  },

  // Academic Background
  {
    id: "AC_001",
    category: "academic",
    title: "S1 Teknik Informatika",
    organization: "Universitas Dian Nuswantoro",
    period: "Sep 2022 — Feb 2026",
    description: "Bachelor of Computer Science with focus on software engineering and machine learning. GPA: 3.90/4.00.",
    tags: ["Computer Science", "GPA 3.90"],
  },

  // Certifications
  {
    id: "CE_001",
    category: "certification",
    title: "TensorFlow Developer Certificate",
    organization: "Google",
    period: "2025",
    description: "Professional certification demonstrating proficiency in building and training neural networks using TensorFlow for real-world ML applications.",
    tags: ["Machine Learning", "TensorFlow", "Deep Learning"],
  },
  {
    id: "CE_002",
    category: "certification",
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    period: "2024",
    description: "Foundational understanding of AWS Cloud services, architecture, pricing, and support models.",
    tags: ["Cloud Computing", "AWS", "Infrastructure"],
  },

  // Academic Research
  {
    id: "RE_001",
    category: "research",
    title: "Deep Learning Approach for Sentiment Analysis on Indonesian Text",
    organization: "Universitas Dian Nuswantoro",
    period: "2025",
    description: "Research on applying LSTM and Transformer-based models for sentiment classification in Bahasa Indonesia social media data.",
    tags: ["NLP", "Deep Learning", "LSTM", "Transformers"],
  },
];

// ============================================
// Projects
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "LOG_001",
    title: "Project Alpha",
    description: "A cutting-edge web application showcasing modern full-stack development with real-time features and responsive design.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "LOG_002",
    title: "Project Beta",
    description: "Machine learning powered platform with deep learning models for intelligent data analysis and prediction systems.",
    techStack: ["Python", "TensorFlow", "React", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "LOG_003",
    title: "Project Gamma",
    description: "Full-stack enterprise solution with robust backend architecture, comprehensive API design, and scalable infrastructure.",
    techStack: ["Laravel", "PHP", "MySQL", "React"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const PERSONAL_INFO = {
  name: "Muhammad Khanif Naufal",
  tagline: "Full-Stack Developer & ML/DL Engineer",
  bio: "Building the future through code and intelligence. Specializing in full-stack web development and machine learning engineering.",
  email: "mkhanif86@gmail.com",
} as const;
