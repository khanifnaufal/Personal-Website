# 🚀 Interstellar Command Center Portfolio

Welcome to the **Interstellar Command Center**, a futuristic, high-tech personal portfolio built with cutting-edge web technologies. This project is designed to showcase professional journey and technical skills through a highly interactive, space-themed HUD (Heads-Up Display) interface.


## 🌠 Key Features

- **🛸 Immersive 3D Environment**: Powered by React Three Fiber and Three.js for a seamless starfield and orbital experience.
- **📊 Interactive HUD Sections**:
  - **Pilot Profile**: Personal details and mission objectives.
  - **Flight History**: A vertical timeline of professional and academic milestones.
  - **Mission Logs**: Projects showcased as tactical mission data.
  - **Base Station**: Technical skills visualized through a command terminal.
- **⚡ Advanced Animations**: Smooth transitions and micro-interactions using Framer Motion.
- **📨 Tactical Communications**: Fully functional contact form integrated with Resend.
- **📱 Responsive Command Deck**: Optimized for all screen sizes, from mobile tablets to desktop monitors.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Three.js](https://threejs.org/)
- **Email Service**: [Resend](https://resend.com/)
- **Validation**: [Zod](https://zod.dev/)

## 🛠 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/PersonalPorto.git
cd PersonalPorto
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
# Resend API Key — Get from https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# Email to receive contact form submissions
CONTACT_EMAIL=your-email@example.com

# From email (use Resend's default or your verified domain)
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 4. Launch the Command Center
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 🚀 Deployment

### Deploy to Vercel
The project is pre-configured for deployment on Vercel.

1. Push your code to GitHub.
2. Connect your repository to [Vercel](https://vercel.com/).
3. Add the Environment Variables from your `.env.local` to the Vercel project settings.
4. Deploy!

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with ❤️ by [Your Name]*
