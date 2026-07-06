# Portfolio Redesign Audit: Sci-Fi to Minimalist-Monochrome

This document contains a comprehensive audit of the current portfolio project before starting the redesign to a minimalist-monochrome fullpage-scroll-snap theme.

---

## 📂 Project Structure Overview

The project is structured as a standard Next.js 15 app using the App Router:
- [`src/app/`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/app) - Pages, Server Actions, API routes, and styles.
- [`src/components/`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components) - Reusable components (UI, 3D Canvas, sections, and Spotify integrations).
- [`src/lib/`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/lib) - Configurations, schemas, dynamic fetch APIs, and hooks.

---

## 🛠️ Data Sources & Logic to Preserve

These files contain core business logic, schema validations, and data constants. They **must be preserved** during the UI rewrite, though their visual presentation will change.

### 1. Personal & Experience Data
- **File**: [`constants.ts`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/lib/constants.ts)
- **Data Content**:
  - `NAV_LINKS`: Current site navigation tags.
  - `PILOT_PROFILE`: Personal metadata (Name, education, location, avatar image, status, motto, and social channels).
  - `SKILLS`: Detailed developer skills (divided into Frontend, Backend, Tools & Database) mapped to Devicon CDN links.
  - `FLIGHT_HISTORY` (Experience & Education): Timeline arrays containing the user's Academic Background, Work Experience, Certifications, and Academic Research.
  - `PROJECTS`: Static fallback portfolio projects (currently contains 3 mockup projects).
  - `PERSONAL_INFO`: Global metadata values.

### 2. Dynamic Projects Source (GitHub API integration)
- **File**: [`github.ts`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/lib/github.ts)
- **Logic**:
  - `getGithubProjects`: Asynchronously fetches the user's GitHub repositories dynamically, filters those containing the topic `"portfolio"` (currently filtering for 23 repositories), resolves top-3 programming languages, parses screenshots, and formats details matching the `Project` interface.
  - Used directly on the Server Component [`page.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/app/page.tsx) and passed down.

### 3. Contact Form & Email Action (Zod + Resend)
- **Action File**: [`contact.ts`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/app/actions/contact.ts)
- **Validation Schema**: [`schemas.ts`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/lib/schemas.ts)
- **Logic**:
  - `submitContact`: Server action utilizing the `Resend` API to transmit emails.
  - `contactSchema`: Zod validation constraints (verifying name, email, subject, and message fields).
  - *Audit Note*: The logic is fully defined and active in the backend, but there is currently **no contact form UI** rendered on the frontend. The current contact section ([`SignalTransmission.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/sections/SignalTransmission.tsx)) only lists direct links to social channels.

### 4. Spotify API Integrations
- **API Files**: [`route.ts` (now-playing)](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/app/api/spotify/now-playing/route.ts), [`spotify.ts`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/lib/spotify.ts)
- **Logic**:
  - Integrates authentication flow to request access tokens via `getAccessToken` using `refresh_token` stored in environment variables.
  - Provides dynamic API endpoints under `src/app/api/spotify` (`now-playing`, `playlist`, `top-artists`, `top-tracks`) to serve real-time auditory data.

---

## 📺 Component Audit

Below is a complete index of all UI and 3D components, mapped by category.

### 1. Section Components (`src/components/sections/`)

| File Name | Functional Description | Logic / State | Presentational Status (Redesign Plan) |
| :--- | :--- | :--- | :--- |
| [`BaseStation.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/sections/BaseStation.tsx) | Hero section with developer introduction. | Typewriter hook cycle (`useTypewriter`). Smooth navigation scroll handler. | **Murni Tema (Sci-Fi)**. High-contrast text gradients, glow styles, static scanline textures, and "System Online" status badge. **Redesign to minimal monochrome Hero layout.** |
| [`PilotProfile.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/sections/PilotProfile.tsx) | "About Me" segment showing avatar, social links, education detail grid, and skill categorization. | Hover glitch effects on profile image. Integrates `SpotifySection`. | **Murni Tema (Sci-Fi)**. Styled like a glowing spacecraft console dashboard. **Redesign to a clean minimalist profile sheet.** |
| [`FlightHistory.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/sections/FlightHistory.tsx) | Chronological experience timeline (Academic, Work, Certifications, Research). | Filter tab state triggers timeline filtering with custom `AnimatePresence` animations. | **Murni Tema (Sci-Fi)**. Displays timeline dots and connecting wires with space-glow aesthetics. **Redesign to simple vertical layout or list style.** |
| [`MissionLogs.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/sections/MissionLogs.tsx) | Grid display of dynamic GitHub projects. | Mouse position tracking for 3D card tilt & shiny glare effects using Framer Motion. Tech-stack filtering logic. | **Murni Tema (Sci-Fi)**. Glassmorphism cards with cyber outlines and cyan-dim colors. **Redesign to a clean minimalist project list or card grid.** |
| [`SignalTransmission.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/sections/SignalTransmission.tsx) | Contact section containing linked social channel grid cards. | Simple card animation entrance. | **Murni Tema (Sci-Fi)**. Colored borders, grid cells reflecting different sci-fi signal frequencies, and "ALL TRANSMISSIONS ENCRYPTED" footer texts. **Redesign to a clean monochrome contact form/info list.** |

---

### 2. Core UI Layout Components (`src/components/ui/`)

| File Name | Functional Description | Logic / State | Presentational Status (Redesign Plan) |
| :--- | :--- | :--- | :--- |
| [`HomeClient.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/ui/HomeClient.tsx) | Orchestrates initial loading screen state and page sections mount coordinates. | SessionStorage visit check (`visited_portfolio`), mount check (avoiding SSR flashes), render wrappers. | **Struktur Grid / Halaman**. Controls layout sequence. **Redesign to incorporate the new fullpage-scroll-snap wrapper structure.** |
| [`HudNavigation.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/ui/HudNavigation.tsx) | Floating header navigation bar. | IntersectionObserver tracking to highlight current section. Mobile navigation toggle state. | **Murni Tema (Sci-Fi)**. HUD layout borders, cyber status badges, line gradients. **Replace with minimalist monochrome top navigation or sidebar.** |
| [`InitialLoader.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/ui/InitialLoader.tsx) | Splash pre-loading overlay counting from 0% to 100%. | Custom performance timer loop (`requestAnimationFrame`) mapping status messages. | **Murni Tema (Sci-Fi)**. Heavy cyber styling, rotating neon rings, and retro system logs. **Replace with a simple minimal monochrome fade loader or remove entirely.** |
| [`LoadingScreen.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/LoadingScreen.tsx) | Fallback loader for dynamic components import. | Pure CSS animations. | **Murni Tema (Sci-Fi)**. Neon blue-purple gradients and cyberpunk loading tags. **Convert to a basic monochrome spinner.** |
| [`SectionDivider.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/ui/SectionDivider.tsx) | Separators dividing page sections. | Render variants. | **Murni Tema (Sci-Fi)**. Futuristic border designs, glow lines, grid markings. **Remove/replace with whitespace or clean border lines.** |
| [`SectionWrapper.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/ui/SectionWrapper.tsx) | Animation wrapper for screen sections. | Framer motion scroll-in-view triggers. | **Struktur**. Reusable wrapper. **Keep animation logic but adjust layout/spacing properties.** |
| [`GlowIcon.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/ui/GlowIcon.tsx) | High-contrast neon icon background grid. | Custom props styling. | **Murni Tema (Sci-Fi)**. Glowing backdrop filters. **Remove or simplify to raw icons.** |

---

### 3. Spotify Components (`src/components/spotify/`)

| File Name | Functional Description | Logic / State | Presentational Status (Redesign Plan) |
| :--- | :--- | :--- | :--- |
| [`SpotifySection.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/spotify/SpotifySection.tsx) | Container layout for Spotify stats/widgets. | Responsiveness context hooks. | **Murni Tema (Sci-Fi)**. Retro Auditory Terminal mock window styling. **Redesign to flat minimal box layout.** |
| [`SpotifyNowPlaying.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/spotify/SpotifyNowPlaying.tsx) | Displays real-time now playing track info. | Dynamic client-side SWR fetching from `/api/spotify/now-playing`. | **Logic + UI**. Keep fetching logic. **Redesign UI layout to monochrome visualizers.** |
| [`TopTracksArtists.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/spotify/TopTracksArtists.tsx) | Lists top tracks and artists. | SWR fetch from dynamic API routes. | **Logic + UI**. Keep fetching logic. **Redesign UI lists to clean typography list.** |
| [`PlaylistCarousel.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/spotify/PlaylistCarousel.tsx) | Carousel/sliders for selected playlists. | SWR fetch from dynamic API route. Carousel slide indexes state. | **Logic + UI**. Keep fetching logic. **Redesign carousel layout using minimalist layout.** |

---

### 4. 3D Elements (`src/components/three/`)

All components in this category are part of the original WebGL space scene. Since the new design calls for **minimalist-monochrome** aesthetics, these are primary candidates for total elimination or transition to monochromatic visualizers.

| File Name | Functional Description | Shaders / Assets | Presentational Status (Redesign Plan) |
| :--- | :--- | :--- | :--- |
| [`SceneLoader.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/three/SceneLoader.tsx) | Dynamic wrapper importing the Three.js Canvas. | `dynamic()` dynamic import with dynamic SSR options. | Dynamic wrapper code is standard. The component itself should be **removed or replaced** depending on whether we keep WebGL assets in the new design. |
| [`Scene.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/three/Scene.tsx) | Hosts the core Canvas element, scene lighting setup, and child mesh assemblies. | Light parameters, background color controls (`#030014`). | **Murni Tema (Sci-Fi)**. High-contrast ambient colors. **Remove or change background to clean monochrome.** |
| [`HolographicCore.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/three/HolographicCore.tsx) | Renders a glowing, rotating 3D Earth core model. | Custom GLSL Shaders (`holoVertexShader`, `holoFragmentShader`, `ringFragmentShader`) rendering atmosphere waves and data glitches on scroll. | **Murni Tema (Sci-Fi)**. Blue/cyan holographic shader grids. **Remove or replace with a flat vector wireframe sphere.** |
| [`Nebula.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/three/Nebula.tsx) | Renders colorful space fog/dust particle buffers. | Custom fragment shaders rendering purple/magenta particle dust. | **Murni Tema (Sci-Fi)**. **Remove entirely.** |
| [`Starfield.tsx`](file:///d:/kuliah/Project-After-Lulus/PersonalPorto/src/components/three/Starfield.tsx) | Renders a system of floating star vectors. | Particle systems orbiting dynamically. | **Murni Tema (Sci-Fi)**. Space star simulation. **Remove or simplify to basic subtle dark particles.** |
