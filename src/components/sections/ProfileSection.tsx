"use client";

import { PILOT_PROFILE } from "@/lib/constants";

// Custom SVG definitions for logos not available in Devicon or Simple Icons standard list
const SQL_SVG = (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0 fill-none stroke-cyan-500 stroke-2">
    <path d="M4 6c0 1.66 3.58 3 8 3s8-1.34 8-3-3.58-3-8-3-8 1.34-8 3zm0 6c0 1.66 3.58 3 8 3s8-1.34 8-3M4 18c0 1.66 3.58 3 8 3s8-1.34 8-3M4 6v12m16-12v12" />
  </svg>
);

interface TechItem {
  name: string;
  icon?: string;
  customSvg?: React.ReactNode;
}

const LANGUAGES: TechItem[] = [
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "SQL", customSvg: SQL_SVG },
  { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
];

const FRAMEWORKS: TechItem[] = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express.js", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/express.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
  { name: "shadcn/ui", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/shadcnui.svg" },
  { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/framer.svg" },
  { name: "Zustand", icon: "https://raw.githubusercontent.com/pmndrs/zustand/main/docs/bear.jpg" },
  { name: "React Query", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/reactquery.svg" },
  { name: "Drizzle", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/drizzle.svg" },
  { name: "Zod", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/zod.svg" },
];

const AI_ML: TechItem[] = [
  { name: "Google Gemini", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/googlegemini.svg" },
  { name: "OpenAI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg" },
  { name: "Vercel AI SDK", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/vercel.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Matplotlib", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "Power BI", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/powerbi.svg" },
  { name: "Hugging Face", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/huggingface.svg" },
];

const DATABASES: TechItem[] = [
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/redis.svg" },
  { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
];

const CLOUD_DEVOPS: TechItem[] = [
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
  { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg" },
];

const TOOLS: TechItem[] = [
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Convex", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/convex.svg" },
  { name: "Clerk", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/clerk.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Stripe", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/stripe.svg" },
];

function MarqueeRow({
  title,
  items,
  direction = "left",
}: {
  title: string;
  items: TechItem[];
  direction?: "left" | "right";
}) {
  return (
    <div className="space-y-1">
      <span className="font-mono text-[10px] tracking-wider text-warm-text-muted uppercase block">
        {title}
      </span>
      <div
        className="relative w-full overflow-hidden py-1"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div
          className={`flex w-max gap-3.5 ${
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          }`}
        >
          {items.concat(items).map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-warm-surface text-warm-text-secondary rounded border border-warm-border/30 hover:border-warm-border hover:text-warm-text-primary transition-all duration-200 shrink-0 select-none group"
            >
              {item.icon ? (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-3.5 h-3.5 object-contain opacity-75 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 dark:invert-0"
                />
              ) : (
                <div className="opacity-75 filter grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center w-3.5 h-3.5">
                  {item.customSvg}
                </div>
              )}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfileSection() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
      {/* CSS Keyframes injected directly */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 35s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Eyebrow */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm-text-muted mb-6">
        About
      </p>

      <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 max-w-6xl w-full">
        {/* Column 1: Who I am & Bio */}
        <div className="flex-[1.3] min-w-0 space-y-4">
          <h2 className="font-sans text-3xl md:text-4xl font-semibold text-warm-text-primary leading-snug">
            Who I am
          </h2>
          <p className="font-sans text-base text-warm-text-secondary leading-relaxed text-justify">
Recent Informatics Engineering graduate with a growing portfolio of independent projects, from fullstack web apps to Data Analyst. Most of them start as something I'm personally curious about, then get built out properly enough to actually rely on.
I'm currently exploring roles across software development and data/analytics, drawn to problems where I can work end-to-end, from architecture decisions to what actually happens once it's running.


          </p>

        </div>

        {/* Column 2: Vertical Facts (Specialty, Focus, Location) */}
        <div className="flex-1 border-y lg:border-y-0 lg:border-x border-warm-border py-6 lg:py-0 px-0 lg:px-8 space-y-6 flex flex-col justify-center">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase">
              STATUS
            </span>
            <p className="font-sans text-sm md:text-base text-warm-text-primary font-medium">
              Fresh Graduate, Informatics Engineering
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase">
              EDUCATION
            </span>
            <p className="font-sans text-sm md:text-base text-warm-text-primary font-medium">
              Dian Nuswantoro University
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase">
              Focus
            </span>
            <p className="font-sans text-sm md:text-base text-warm-text-primary font-medium">
              Fullstack development & data/automation
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase">
              Location
            </span>
            <p className="font-sans text-sm md:text-base text-warm-text-primary font-medium">
              {PILOT_PROFILE.location}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-wider text-warm-text-muted uppercase">
              AVAILABILITY 
            </span>
            <p className="font-sans text-sm md:text-base text-warm-text-primary font-medium">
              Open to opportunities
            </p>
          </div>
        </div>

        {/* Column 3: Tech Stack Grouped Marquees */}
        <div className="flex-1 min-w-0 space-y-3.5 flex flex-col justify-center">
          <MarqueeRow title="Languages" items={LANGUAGES} direction="left" />
          <MarqueeRow title="Frameworks & Libraries" items={FRAMEWORKS} direction="right" />
          <MarqueeRow title="AI / ML / Data" items={AI_ML} direction="left" />
          <MarqueeRow title="Databases" items={DATABASES} direction="right" />
          <MarqueeRow title="Cloud & DevOps" items={CLOUD_DEVOPS} direction="left" />
          <MarqueeRow title="Tools & Productivity" items={TOOLS} direction="right" />
        </div>
      </div>
    </div>
  );
}


