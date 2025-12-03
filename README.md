# Agency - Premium Consulting Website

A modern, minimalistic, and animated consulting firm website built with React, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## 🚀 Features

- **Premium Design**: Minimalistic aesthetic with strong visual hierarchy.
- **Advanced Animations**: Smooth page transitions (Framer Motion) and complex sequences (GSAP).
- **Interactive Slider**: Custom-built slider with swipe, keyboard nav, and text reveals.
- **Responsive**: Fully mobile-first design.
- **Accessible**: Semantic HTML, ARIA labels, and `prefers-reduced-motion` support.

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **GSAP**
- **Vite**
- **Lucide React** (Icons)

## 📦 Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## 🎨 Customization

### Images
All images are currently sourced from Unsplash. To replace them, update the URLs in the respective component files or data arrays (e.g., `sliderItems` in `Home.tsx`).

### Icons
We use `lucide-react` for icons. You can easily swap them out by importing different icons from the library.

### Animations
Animations can be toggled globally via the `AnimationProvider`. The site also respects the user's system `prefers-reduced-motion` setting.

## 📁 Project Structure

```
src/
├── components/
│   ├── features/    # Complex features (Slider)
│   ├── layout/      # Header, Footer, Layout
│   └── ui/          # Reusable UI components (Button, Card, Modal)
├── context/         # Global state (AnimationContext)
├── pages/           # Route components
├── utils/           # Helpers (cn)
├── App.tsx          # Routing
└── main.tsx         # Entry point
```
