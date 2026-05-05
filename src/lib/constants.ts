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
  photo: "/profile.jpeg",
  education: "Universitas Dian Nuswantoro — S1 Teknik Informatika, 2026",
  email: "mkhanif86@gmail.com",
  location: "Semarang, Indonesia",
  status: "Open to Work" as const,
  motto: "You may break all my bones but my soul will be more than enough to get me on my feet.",
  bio: "Building the future through code and intelligence. Specializing in full-stack web development and machine learning engineering.",
  links: {
    github: "https://github.com/khanifnaufal",
    linkedin: "https://www.linkedin.com/in/khanif-naufal/",
    instagram: "https://instagram.com/khanifnaufal",
    whatsapp: "https://wa.me/6285293522186",
  },
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
  description: string | string[];
  tags?: string[];
  link?: string;
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
    title: "Web Developer Intern",
    organization: "Dinas Komunikasi dan Informatika Kota Semarang",
    period: "May 2025 — Jun 2025",
    description: [
      "Developed a web-based daily task reporting system using PHP and Laravel.",
      "Improved daily performance monitoring efficiency by implementing an automated photo-based reporting system, reducing the risk of attendance data manipulation.",
      "Optimized database structure to accelerate monthly performance report retrieval."
    ],
    tags: ["PHP", "Laravel", "MySQL"],
  },
  {
    id: "WE_002",
    category: "work",
    title: "Ketua KPPS",
    organization: "Komisi Pemilihan Umum (KPU)",
    period: "Dec 2023 — Feb 2024",
    description: [
      "Led and supervised the voting and vote-counting process for 222 voters, ensuring a smooth and orderly election process.",
      "Managed and secured 1,110 ballots in full compliance with official election procedures and regulations.",
      "Prepared and submitted administrative reports accurately and on time, ensuring data integrity and accountability."
    ],
    tags: ["Leadership", "Management", "Reporting"],
  },
  // Academic Background
  {
    id: "AC_001",
    category: "academic",
    title: "S1 Teknik Informatika",
    organization: "Universitas Dian Nuswantoro",
    period: "Sep 2022 — Feb 2026",
    description: "Bachelor of Computer Science with focus on Fullstack Developer and machine learning. GPA: 3.90/4.00.",
    tags: ["Computer Science", "GPA 3.90"],
  },

  // Certifications
  {
    id: "CE_001",
    category: "certification",
    title: "Getting Started with Deep Learning",
    organization: "NVIDIA",
    period: "2025",
    description: "Professional certification covering the fundamentals of deep learning, including training and deploying neural networks.",
    tags: ["Deep Learning", "NVIDIA", "AI"],
    link: "https://drive.google.com/file/d/1iMfMUMIkDcoFy9_QDnabI5ZSJzl3ffCU/view?usp=sharing",
  },
  {
    id: "CE_002",
    category: "certification",
    title: "Associate Data Scientist",
    organization: "BNSP (Badan Nasional Sertifikasi Profesi)",
    period: "2026",
    description: "National competency certification in the field of data science, validating skills in data analysis, modeling, and visualization.",
    tags: ["Data Science", "BNSP", "Analytics"],
    link: "https://drive.google.com/file/d/1B8UEYXPp9RLJttzgHQWBxs1BgfOjFKfO/view?usp=drive_link",
  },
  {
    id: "CE_003",
    category: "certification",
    title: "TOEFL Certification",
    organization: "ETS / Verified Institution",
    period: "2026",
    description: "Standardized test to measure the English language ability of non-native speakers wishing to enroll in English-speaking universities.",
    tags: ["English", "Language Proficiency", "TOEFL"],
    link: "https://drive.google.com/file/d/1EeydCLCY3twvnjBeZFh78_uXcpfCaK5a/view?usp=drive_link",
  },

  // Academic Research
  {
    id: "RE_001",
    category: "research",
    title: "A Convolutional Network-Based Comparative Analysis of DenseNet201, VGG16, and MobileNetV2 for Mushroom Classification",
    organization: "Scopus Q4 Indexed Journal",
    period: "2025",
    description: "A comprehensive comparative study on various CNN architectures for accurate mushroom species classification, published in an IEEE-indexed journal.",
    tags: ["Scopus Q4", "Deep Learning", "CNN", "Image Classification"],
    link: "https://ieeexplore.ieee.org/document/11291885",
  },
  {
    id: "RE_002",
    category: "research",
    title: "Performance Enhancement of Mushroom Species Classification via Modified InceptionV3",
    organization: "SINTA 3 Accredited Journal",
    period: "2025",
    description: "Research focusing on optimizing the InceptionV3 architecture to improve accuracy in classifying mushroom species, published in Jurnal Masyarakat Informatika (JMASIF).",
    tags: ["SINTA 3", "InceptionV3", "Deep Learning", "Agriculture AI"],
    link: "https://ejournal.undip.ac.id/index.php/jmasif/article/view/73005/29984",
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
  languages?: string[];
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
