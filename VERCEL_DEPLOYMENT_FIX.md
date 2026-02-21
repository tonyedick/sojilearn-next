# Vercel Deployment Fix Documentation

## Problem Summary

Your Vercel deployment was failing with two critical build errors:

1. **Supabase Environment Variable Error**

   ```
   Error: Missing SUPABASE_SERVICE_ROLE_KEY. Add it to .env.local (DO NOT use NEXT_PUBLIC_ prefix)
   ```

2. **useSearchParams Suspense Boundary Error**
   ```
   useSearchParams() should be wrapped in a suspense boundary at page "/404"
   ```

## Root Cause Analysis

### Issue 1: Build-Time Environment Variable Crash

**What happened:**

- `src/lib/supabase/server.ts` threw an error at **module initialization** (top-level code)
- When Next.js imported this file during build to collect route metadata for `/api/blog/[country]`, the error crashed the build
- Vercel doesn't read your local `.env.local`—it only uses environment variables configured in the Vercel project settings

**Why this is problematic:**

- Server environment variables should fail gracefully at **request time**, not at **import time**
- Build-time crashes prevent deployment even when the missing env var is only needed at runtime

### Issue 2: Missing Suspense Boundary for useSearchParams

**What happened:**

- `src/components/Providers.tsx` uses `useAnalytics()` hook
- `useAnalytics()` internally calls `useSearchParams()` from Next.js navigation
- Next.js requires `useSearchParams()` to be wrapped in a `<Suspense>` boundary for proper static generation
- Since `Providers` is rendered globally in `layout.tsx`, it affects all routes including `/_not-found`

**Why this is required:**

- `useSearchParams()` accesses URL query parameters which are not available during static pre-rendering
- `Suspense` tells Next.js to defer rendering that component until client-side hydration
- Without it, Next.js cannot pre-render the page correctly

---

## Solution Implemented

### Fix 1: Lazy Environment Variable Validation

**File:** `src/lib/supabase/server.ts`

**Before:**

```typescript
// ❌ Throws at module load time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseServiceKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY...');
}

export const supabaseServer = createClient(supabaseUrl!, supabaseServiceKey!, {...});
```

**After:**

```typescript
// ✅ Validates lazily when getSupabaseServer() is called
function getSupabaseServerEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseServiceKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Set it in your deployment environment (without NEXT_PUBLIC_ prefix).",
    );
  }

  return { supabaseUrl, supabaseServiceKey };
}

export const getSupabaseServer = cache(() => {
  const { supabaseUrl, supabaseServiceKey } = getSupabaseServerEnv();

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
});
```

**Impact:**

- Build no longer crashes when importing API routes
- Environment validation happens at **request time** (when `getSupabaseServer()` is called)
- Missing env vars return proper 500 errors instead of breaking deployment

---

### Fix 2: Suspense Boundary in Root Layout

**File:** `src/app/layout.tsx`

**Before:**

```tsx
// ❌ No Suspense boundary
<body className={mulish.className}>
  <ScrollToTop />
  <Providers>{children}</Providers>
</body>
```

**After:**

```tsx
// ✅ Providers wrapped in Suspense
import { Suspense } from "react";

<body className={mulish.className}>
  <ScrollToTop />
  <Suspense fallback={null}>
    <Providers>{children}</Providers>
  </Suspense>
</body>;
```

**Why `fallback={null}`:**

- The Providers component contains global utilities (QueryClient, Toast, WhatsApp FloatingButton, Analytics)
- These don't need a visible loading state
- `null` provides instant rendering without flickering UI

**Impact:**

- Next.js can now properly pre-render all pages including `/_not-found`
- `useSearchParams()` inside analytics hooks works correctly
- Static site generation (SSG) succeeds for all routes

---

## Deployment Checklist for Vercel

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   | Variable Name               | Value                          | Environment                      |
   | --------------------------- | ------------------------------ | -------------------------------- |
   | `NEXT_PUBLIC_SUPABASE_URL`  | Your Supabase project URL      | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Production, Preview, Development |

4. **Important:** Do NOT prefix `SUPABASE_SERVICE_ROLE_KEY` with `NEXT_PUBLIC_`
   - Server-only keys must remain private
   - `NEXT_PUBLIC_` prefix exposes variables to client-side JavaScript

### Step 2: Redeploy

1. Trigger a new deployment from Vercel dashboard or push a commit
2. Monitor build logs for successful completion
3. Verify these success indicators:
   ```
   ✓ Compiled successfully
   ✓ Collecting page data
   ✓ Generating static pages
   ```

### Step 3: Verify in Production

Test these endpoints:

- `https://your-domain.vercel.app` → Homepage loads
- `https://your-domain.vercel.app/api/blog/Canada` → Returns blog JSON
- `https://your-domain.vercel.app/404-test` → Shows not-found page without errors

---

## Key Takeaways

### Environment Variables

- ✅ **Do:** Set server secrets in Vercel project settings
- ✅ **Do:** Use lazy validation for server env vars (validate when called, not when imported)
- ❌ **Don't:** Expect Vercel to read `.env.local` (it's local-only)
- ❌ **Don't:** Expose service role keys to client code

### Next.js Hooks

- ✅ **Do:** Wrap `useSearchParams()` in `<Suspense>` boundaries
- ✅ **Do:** Use `fallback={null}` for invisible loading states
- ❌ **Don't:** Use dynamic hooks in components that need static pre-rendering without Suspense

### Build Process

- ✅ **Do:** Test builds locally with `npm run build` before deploying
- ✅ **Do:** Read full error messages—they indicate exact module and line causing failure
- ❌ **Don't:** Ignore build warnings about CSR bailouts or missing Suspense

---

## Further Reading

- [Next.js useSearchParams Documentation](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/api/api-keys)
- [React Suspense for Data Fetching](https://react.dev/reference/react/Suspense)

---

## Testing the Fixes Locally

Run these commands to verify everything works:

```bash
# Clean previous builds
rm -rf .next

# Run production build
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Generating static pages (24/24)

# Start production server
npm run start

# Test API endpoint
curl http://localhost:3000/api/blog/Canada
```

If build succeeds locally and environment variables are configured in Vercel, your deployment will succeed.
