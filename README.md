# Dopamine Menu

RU/EN guide for local development and deployment.

## Что это / What It Is

**Dopamine Menu** is a calm self-help web app that helps a user pause before quick dopamine habits like endless scrolling, impulsive buying, sweets, or procrastination.

- Stack: Next.js, TypeScript, Tailwind CSS
- Storage: `localStorage` only
- Backend: none
- Auth: none

## Требования / Requirements

- Node.js 20+ recommended
- npm 10+ recommended

## Установка / Install

```bash
npm install
```

## Локальный запуск / Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run build
npm run start
```

`npm run build` creates an optimized production build, checks TypeScript, and validates the app for deployment.

## Тесты / Tests

```bash
npm test -- --run
```

## localStorage и SSR / localStorage and SSR

The app does not use a backend. User data is stored in browser `localStorage`.

- `localStorage` access is isolated to client-side code
- the main app shell is a client component
- service worker registration runs inside `useEffect`

This keeps the Next.js production build SSR-safe.

## Яндекс Метрика / Yandex Metrica

Create a Yandex Metrica tag and add its numeric ID locally:

```bash
copy .env.example .env.local
```

Then set:

```env
NEXT_PUBLIC_YANDEX_METRICA_ID=12345678
```

On Vercel, add the same variable under **Project Settings → Environment Variables** for the Production environment. The integration sends SPA page views with `hit` and the allowlisted product events from `lib/analytics.ts` with `reachGoal`. Session Replay is disabled and journal text is never included.

## Структура проекта / Project Structure

- `app/` - Next.js App Router entry files and manifest
- `components/` - UI screens and shared interface pieces
- `lib/` - data models, storage helpers, stats logic, content, suggestions
- `public/` - icons and PWA assets
- `tests/` - Vitest coverage for core logic and smoke tests

## Загрузка на GitHub / Upload to GitHub

1. Create a new empty repository on GitHub.
2. Initialize git locally if needed:

```bash
git init
git add .
git commit -m "Initial commit"
```

3. Connect the repository:

```bash
git remote add origin https://github.com/YOUR-USERNAME/dopamine-menu.git
git branch -M main
git push -u origin main
```

## Деплой на Vercel / Deploy to Vercel

1. Go to [Vercel](https://vercel.com/).
2. Sign in with GitHub.
3. Click **Add New Project**.
4. Import your GitHub repository.
5. Leave the default framework as **Next.js**.
6. Leave build settings on default values.
7. Click **Deploy**.

Vercel will automatically run the production build and publish the site.

## Полезные команды / Useful Commands

```bash
npm install
npm run dev
npm run build
npm run start
npm test -- --run
```

## Notes

- This project is ready for static hosting on Vercel as a client-heavy Next.js app.
- Because data lives in `localStorage`, each device keeps its own separate progress.
- If you later connect a custom domain, it can be added from the Vercel project settings.
