# AI Development Rules - PWA Factory

This document outlines the technical standards and library usage rules for the PWA Factory project.

## Tech Stack
*   **Framework:** React 19 with Vite for high-performance builds.
*   **Language:** TypeScript for type safety and better developer experience.
*   **Styling:** Tailwind CSS (v4) using the modern PostCSS configuration.
*   **Backend & Auth:** Supabase for authentication, database, and storage.
*   **State Management:** Zustand for lightweight, hook-based global state.
*   **Routing:** React Router v7 for client-side navigation.
*   **Animations:** Framer Motion for smooth, high-quality UI transitions.
*   **Icons:** Lucide React for a consistent and scalable icon set.
*   **PWA:** `vite-plugin-pwa` for offline capabilities and mobile installation.
*   **Notifications:** `react-hot-toast` for user feedback and alerts.

## Library Usage Rules

### 1. Styling & UI
*   **Tailwind First:** Always use Tailwind CSS classes for styling. Avoid writing custom CSS in `.css` files unless absolutely necessary for complex animations or third-party overrides.
*   **Design System:** Follow the "Dark Mode" aesthetic (Zinc/Black/White) as established in the current dashboard.
*   **Icons:** Exclusively use `lucide-react`. Do not install other icon libraries.

### 2. State & Data
*   **Global State:** Use Zustand (`src/store/useStore.ts`) for app-wide state like sidebar toggles or user preferences.
*   **Server State:** Use the `supabase` client directly for data fetching.
*   **Auth:** Always use the `useAuth` hook to access the current user session.

### 3. Components & Structure
*   **Atomic Design:** Keep components small and focused. Create new files in `src/components/ui/` for reusable elements.
*   **Pages:** All main route components must reside in `src/pages/`.
*   **Animations:** Use `framer-motion` for any entry/exit animations or layout transitions to maintain the "premium" feel.

### 4. PWA & Mobile
*   **Responsiveness:** Every UI element must be mobile-first and fully responsive.
*   **Offline Ready:** Ensure critical assets are handled by the PWA manifest in `vite.config.ts`.

### 5. Best Practices
*   **No Try/Catch Overuse:** Let errors bubble up unless you are providing a specific UI fallback, to allow for easier debugging.
*   **Toasts:** Use `toast.success()` or `toast.error()` for all asynchronous actions (login, upload, etc.).