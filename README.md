# Waverix - Social Media Marketing Agency Website

A modern, professional website for a Social Media Marketing Agency (SMMA) built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with deep purple & electric blue color scheme
- **Multi-page Structure**: Home, Services, About, and Contact pages
- **Advanced Modal System**: Multi-step form with validation for lead generation
- **Responsive Design**: Mobile-first approach with smooth animations
- **SEO Optimized**: Proper meta tags, structured data, and performance optimization
- **Type Safety**: Full TypeScript implementation throughout
- **Form Handling**: React Hook Form with Zod validation
- **Smooth Animations**: Framer Motion for interactive elements

## 🛠 Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## 📁 Project Structure

```
waverix/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx (Home)
│   ├── services/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       ├── contact/
│       │   └── route.ts
│       └── subscribe/
│           └── route.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── Input.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ServicesGrid.tsx
│   ├── WhyChooseUs.tsx
│   ├── ContactForm.tsx
│   ├── GetStartedModal.tsx
│   └── ModalProvider.tsx
├── lib/
│   ├── utils.ts
│   └── validations.ts
└── public/
    └── images/
```

## 🎨 Design System

### Color Scheme
- **Primary**: Deep purple backgrounds (`bg-slate-900`, `bg-purple-900`)
- **Accent**: Electric blue for CTAs (`bg-blue-500`, `bg-cyan-400`)
- **Text**: White and light purple (`text-white`, `text-purple-100`)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Semibold with tracking-tight
- **Body**: Leading-7 with purple-100 color
- **Gradients**: Blue to cyan for highlights

## 🔧 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 📝 Form Handling

### Get Started Modal
Multi-step form with the following fields:
- **Step 1**: Personal Info (First Name, Last Name)
- **Step 2**: Business Info (Email, Website)
- **Step 3**: Project Details (Primary Interest)
- **Step 4**: Budget & Goals (Budget Range, Project Description)

### API Routes
- `POST /api/contact` - Handle contact form submissions
- `POST /api/subscribe` - Handle newsletter subscriptions

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📞 Support

For questions or support:
- Email: hello@waverix.com
- Documentation: Check component comments

Built with ❤️ for modern social media marketing agencies.
