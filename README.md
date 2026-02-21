This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment Troubleshooting (Vercel)

### 1) Missing `SUPABASE_SERVICE_ROLE_KEY`

If Vercel build fails with:

`Missing SUPABASE_SERVICE_ROLE_KEY`

set these environment variables in **Vercel Project Settings → Environment Variables**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, no `NEXT_PUBLIC_` prefix)

Add them for **Production**, **Preview**, and **Development** environments, then redeploy.

Notes:

- `.env.local` is used only on your local machine, not by Vercel.
- `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to browser/client code.

### 2) `useSearchParams()` must be inside `Suspense`

If build fails with:

`useSearchParams() should be wrapped in a suspense boundary at page "/404"`

ensure any client component using `useSearchParams` is rendered under a `Suspense` boundary.

In this project, root-level `Providers` uses analytics hooks that call `useSearchParams`, so `Providers` is wrapped in `Suspense` in `src/app/layout.tsx`.
