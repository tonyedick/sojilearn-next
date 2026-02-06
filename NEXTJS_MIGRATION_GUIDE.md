# Complete Step-by-Step Guide: Migrating React App to Next.js

This guide provides a comprehensive migration path from the current React application to Next.js, maintaining all functionality, styling, and features.

---

## Phase 1: Next.js Project Setup

### Step 1.1: Initialize Next.js Project
```bash
npx create-next-app@latest sojilearn-nextjs --typescript --tailwind --app --src-dir --import-alias "@/*"
cd sojilearn-nextjs
```

**What this does:**
- Creates a new Next.js 14+ project with TypeScript
- Includes Tailwind CSS pre-configured
- Uses the App Router (modern Next.js routing)
- Creates a `src/` directory structure
- Sets up `@/*` import aliases

### Step 1.2: Install Required Dependencies
```bash
npm install @supabase/supabase-js @tanstack/react-query framer-motion react-hook-form react-hot-toast moment lucide-react react-floating-whatsapp web-vitals
```

**Additional dependencies if needed:**
```bash
npm install swiper aos react-icons
```

### Step 1.3: Copy Environment Variables
Create `.env.local` in the Next.js project root:
```bash
touch .env.local
```

Copy from your React app's `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_BASEURL=your_base_url
```

---

## Phase 2: Project Structure Setup

### Step 2.1: Create Folder Structure
```bash
# Navigate to your Next.js project root
cd sojilearn-nextjs

# Create page directories
mkdir -p src/app/blog/[slug]
mkdir -p src/app/study-in-uk
mkdir -p src/app/study-in-canada
mkdir -p src/app/study-in-usa
mkdir -p src/app/study-in-germany
mkdir -p src/app/study-in-malta
mkdir -p src/app/about
mkdir -p src/app/contact
mkdir -p src/app/apply
mkdir -p src/app/privacy-policy
mkdir -p src/app/terms-of-use
mkdir -p src/app/disclaimer

# Create component directories
mkdir -p src/components/Layouts
mkdir -p src/components/ExternalCSS
mkdir -p src/components/UK
mkdir -p src/components/CA
mkdir -p src/components/USA
mkdir -p src/components/GY
mkdir -p src/components/Malta
mkdir -p src/components/BlogContent
mkdir -p src/components/Comments

# Create utility directories
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p src/integrations/supabase
mkdir -p src/types
mkdir -p src/assets/img
mkdir -p src/assets/css
```

### Step 2.2: Copy Static Assets
```bash
# Copy assets folder (run from your React project directory)
cp -r src/assets/* ../sojilearn-nextjs/src/assets/

# Copy public folder contents
cp -r public/* ../sojilearn-nextjs/public/
```

---

## Phase 3: Core Configuration Files

### Step 3.1: Update `tailwind.config.ts`
Create or update `tailwind.config.ts` in Next.js project root:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "tw-", // Important to prevent Bootstrap clashes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        poppins: ['poppins', 'var(--font-poppins)', 'system-ui'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)']
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      }
    }
  },
  plugins: [],
};

export default config;
```

### Step 3.2: Update `src/app/globals.css`
Copy all CSS from your React app:

```bash
# From React project
cat src/index.css >> ../sojilearn-nextjs/src/app/globals.css
cat src/assets/css/template.css >> ../sojilearn-nextjs/src/app/globals.css
```

Or manually merge the CSS files into `globals.css`.

### Step 3.3: Configure `next.config.js`
Create `next.config.js` in Next.js project root:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: false,
  },
  // Enable if you need to allow external scripts
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
```

---

## Phase 4: Supabase Integration

### Step 4.1: Create Supabase Client
File: `src/integrations/supabase/client.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Step 4.2: Copy Type Definitions
```bash
# Copy Supabase types
cp src/integrations/supabase/types.ts ../sojilearn-nextjs/src/integrations/supabase/types.ts
```

### Step 4.3: Copy Database Types
Copy `src/types/*.ts` files:

```bash
cp src/types/blog.ts ../sojilearn-nextjs/src/types/blog.ts
cp src/types/comment.ts ../sojilearn-nextjs/src/types/comment.ts
cp src/types/form.ts ../sojilearn-nextjs/src/types/form.ts
cp src/types/profile.ts ../sojilearn-nextjs/src/types/profile.ts
```

---

## Phase 5: Utility Functions and Hooks

### Step 5.1: Create Web Analytics Utility
File: `src/utils/websiteAnalytics.ts`

```typescript
'use client';

import { useEffect, useRef } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Copy the rest of the code from your React app's src/utils/websiteAnalytics.ts
// Make sure to add 'use client' at the top
```

Copy the full file:
```bash
cp src/utils/websiteAnalytics.ts ../sojilearn-nextjs/src/utils/websiteAnalytics.ts
```

Then add `'use client';` at the very top of the file.

### Step 5.2: Copy Auth Hook
```bash
cp src/hooks/useAuth.tsx ../sojilearn-nextjs/src/hooks/useAuth.tsx
cp src/hooks/use-mobile.tsx ../sojilearn-nextjs/src/hooks/use-mobile.tsx
```

Add `'use client';` at the top of both files.

### Step 5.3: Create Axios Helper (if needed)
```bash
cp src/Helpers/axios.ts ../sojilearn-nextjs/src/helpers/axios.ts
cp src/Helpers/types.tsx ../sojilearn-nextjs/src/helpers/types.tsx
```

---

## Phase 6: Shared Components

### Step 6.1: Copy All Components
```bash
# Copy all components from React to Next.js
cp -r src/Components/* ../sojilearn-nextjs/src/components/
```

### Step 6.2: Add 'use client' Directive
For each component file that uses:
- React hooks (useState, useEffect, useRef, etc.)
- Browser APIs (window, document, localStorage, etc.)
- Event handlers (onClick, onChange, etc.)

Add `'use client';` at the very top of the file.

**Files that definitely need 'use client':**
- All form components
- Header.tsx
- Footer.tsx
- BlogHeader.tsx
- Contact components
- Application form components
- Blog comment components
- Any component with state or effects

### Step 6.3: Update Import Paths
Search and replace in all component files:

```bash
# In Next.js project, run:
find src/components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from '\''../../|from '\''@/|g'
find src/components -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's|from '\''../|from '\''@/|g'
```

Or manually update imports from relative paths to use `@/` alias:
- `import Header from '../../Components/Header'` → `import Header from '@/components/Header'`
- `import { supabase } from '../integrations/supabase/client'` → `import { supabase } from '@/integrations/supabase/client'`

### Step 6.4: Update React Router to Next.js Navigation

**Find and replace in all files:**

```typescript
// OLD (React Router):
import { Link } from 'react-router-dom';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

// NEW (Next.js):
import Link from 'next/link';
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation';
```

**Update Link components:**
```typescript
// OLD:
<Link to="/about">About</Link>

// NEW:
<Link href="/about">About</Link>
```

**Update navigation:**
```typescript
// OLD:
const navigate = useNavigate();
navigate('/blog');

// NEW:
const router = useRouter();
router.push('/blog');
```

---

## Phase 7: Root Layout and Providers

### Step 7.1: Create Providers Component
File: `src/components/Providers.tsx`

```typescript
'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FloatingWhatsApp } from 'react-floating-whatsapp';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const phoneNumber = '+2348137806643'; 
  const accountName = 'Sojilearn - Study in Malta | UK | USA | Canada | Germany | Ireland';
  const avatar = '/assets/img/favicon.png';
  const statusMessage = "We're online";

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <FloatingWhatsApp
        phoneNumber={phoneNumber}
        accountName={accountName}
        avatar={avatar}
        statusMessage={statusMessage}
      />
      {children}
    </QueryClientProvider>
  );
}
```

### Step 7.2: Update Root Layout
File: `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sojilearn - Study Abroad Agency",
  description: "Sojilearn helps students navigate their educational journey abroad",
  keywords: "study abroad, international education, UK universities, Canada universities, USA universities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add any external scripts here */}
        <link rel="icon" href="/assets/img/favicon.png" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

### Step 7.3: Create ScrollToTop Component for Next.js
File: `src/components/ScrollToTop.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

Update `layout.tsx` to include it:
```typescript
import ScrollToTop from "@/components/ScrollToTop";

// Inside the body tag:
<Providers>
  <ScrollToTop />
  {children}
</Providers>
```

---

## Phase 8: Home Page

### Step 8.1: Create Home Page
File: `src/app/page.tsx`

```typescript
import { Metadata } from "next";
import Hero from "@/components/Banner";
import Explore from "@/components/Explore";
import StudyInUKCom from "@/components/UK/StudyInUkCom";
import StudyInCanada from "@/components/CA/StudyInCanada";
import Steps from "@/components/Steps";
import WhySoji from "@/components/WhySoji";
import News from "@/components/News";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import SimplifyAdmit from "@/components/SimplifyAdmit";
import AppLayout from "@/components/Layouts/AppLayout";
import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Sojilearn - Study Abroad Agency | UK, USA, Canada, Germany, Malta",
  description: "Sojilearn helps students navigate their educational journey with expert guidance for studying in UK, USA, Canada, Germany, and Malta",
  openGraph: {
    title: "Sojilearn - Study Abroad Agency",
    description: "Expert guidance for studying abroad",
    url: "https://www.sojilearn.com",
    images: [{ url: "https://www.sojilearn.com/logo.png" }],
  },
};

export default function Home() {
  return (
    <AppLayout>
      <>
        <Hero />
        <Explore />
        <Steps />
        <StudyInUKCom />
        <SimplifyAdmit />
        <StudyInCanada />
        <WhySoji />
        <Reviews />
        <News />
        <FAQ />
        <CTA />
      </>
    </AppLayout>
  );
}
```

---

## Phase 9: Static Pages

### Step 9.1: About Page
File: `src/app/about/page.tsx`

```typescript
import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
// Import other components as needed

export const metadata: Metadata = {
  title: "About Us - Sojilearn",
  description: "Learn about Sojilearn's mission to help students study abroad",
};

export default function About() {
  return (
    <AppLayout>
      <>
        {/* Copy JSX content from src/Pages/About.tsx */}
      </>
    </AppLayout>
  );
}
```

**Copy the About page:**
```bash
# Copy the page file
cp src/Pages/About.tsx ../sojilearn-nextjs/src/app/about/page.tsx
```

Then manually:
1. Remove React Router imports
2. Add metadata export
3. Change default export to function matching filename
4. Update imports to use `@/` alias

### Step 9.2: Contact Page
File: `src/app/contact/page.tsx`

```typescript
'use client'; // Required for form handling

import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
// ... other imports

export default function Contact() {
  // Copy logic from src/Pages/Contact.tsx
  
  return (
    <AppLayout>
      <>
        {/* Copy JSX from src/Pages/Contact.tsx */}
      </>
    </AppLayout>
  );
}
```

### Step 9.3: Create Other Static Pages

**Privacy Policy:** `src/app/privacy-policy/page.tsx`
**Terms of Use:** `src/app/terms-of-use/page.tsx`
**Disclaimer:** `src/app/disclaimer/page.tsx`

For each, follow the same pattern:
1. Copy from corresponding Pages file
2. Add metadata
3. Update imports
4. Wrap in AppLayout

```bash
# Copy pages
cp src/Pages/PrivacyPolicy.tsx ../sojilearn-nextjs/src/app/privacy-policy/page.tsx
cp src/Pages/TermsOfUse.tsx ../sojilearn-nextjs/src/app/terms-of-use/page.tsx
cp src/Pages/Disclaimer.tsx ../sojilearn-nextjs/src/app/disclaimer/page.tsx
```

---

## Phase 10: Study Destination Pages

### Step 10.1: Study in UK Page
File: `src/app/study-in-uk/page.tsx`

```typescript
import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
import BannerStudyInUk from "@/components/UK/BannerStudyInUk";
import ExploreUK from "@/components/UK/ExploreUK";
import StudyInUKFull from "@/components/UK/StudyInUkFull";
import CTAUK from "@/components/UK/CTAUK";
import FAQUK from "@/components/UK/FAQUK";
import RequirementsUK from "@/components/UK/RequirementsUK";
import PostUniUK from "@/components/UK/PostUniUK";
import PartTimeCareersUK from "@/components/UK/PartTimeCareersUK";
import UKNews from "@/components/UK/UKNews";

export const metadata: Metadata = {
  title: "Study in UK - Sojilearn | University Application & Visa Support",
  description: "Expert guidance for studying in the United Kingdom. Get help with university applications, visa support, and more.",
  keywords: "study in UK, UK universities, student visa UK, British education",
};

export default function StudyInUK() {
  return (
    <AppLayout>
      <>
        <BannerStudyInUk />
        <ExploreUK />
        <StudyInUKFull />
        <RequirementsUK />
        <PostUniUK />
        <PartTimeCareersUK />
        <UKNews />
        <FAQUK />
        <CTAUK />
      </>
    </AppLayout>
  );
}
```

### Step 10.2: Study in Canada Page
File: `src/app/study-in-canada/page.tsx`

```typescript
import { Metadata } from "next";
import AppLayout from "@/components/Layouts/AppLayout";
// Import Canada-specific components

export const metadata: Metadata = {
  title: "Study in Canada - Sojilearn | Canadian Universities",
  description: "Expert guidance for studying in Canada",
};

export default function StudyInCanada() {
  return (
    <AppLayout>
      <>
        {/* Copy components from src/Pages/StudyInCanada.tsx */}
      </>
    </AppLayout>
  );
}
```

### Step 10.3: Create Other Study Destination Pages

Copy and convert:
```bash
cp src/Pages/StudyInUK.tsx ../sojilearn-nextjs/src/app/study-in-uk/page.tsx
cp src/Pages/StudyInCanada.tsx ../sojilearn-nextjs/src/app/study-in-canada/page.tsx
cp src/Pages/StudyInUSA.tsx ../sojilearn-nextjs/src/app/study-in-usa/page.tsx
cp src/Pages/StudyInGermany.tsx ../sojilearn-nextjs/src/app/study-in-germany/page.tsx
cp src/Pages/StudyInMalta.tsx ../sojilearn-nextjs/src/app/study-in-malta/page.tsx
```

For each file:
1. Add metadata export
2. Update imports to use `@/`
3. Remove React Router dependencies
4. Change function name to match file convention

---

## Phase 11: Blog Section

### Step 11.1: Blog List Page
File: `src/app/blog/page.tsx`

```typescript
'use client'; // Required for data fetching and state

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'next/navigation';
import BlogLayout from '@/components/Layouts/BlogLayout';
import { BlogPost } from '@/types/blog';
import Link from 'next/link';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [category]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('published', true);

      if (error) throw error;
      
      const uniqueCategories = [...new Set(data?.map(post => post.category))];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  if (loading) {
    return (
      <BlogLayout>
        <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen">
          <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-gray-900"></div>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <>
        <section className="blog-section">
          <div className="container">
            {/* Copy rest of JSX from src/Pages/Blog.tsx */}
            {/* Update all Link components to use Next.js Link */}
          </div>
        </section>
      </>
    </BlogLayout>
  );
}
```

### Step 11.2: Blog Detail Page (Dynamic Route)
File: `src/app/blog/[slug]/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'next/navigation';
import BlogLayout from '@/components/Layouts/BlogLayout';
import { BlogPost } from '@/types/blog';
import { BlogContentRenderer } from '@/components/BlogContent/BlogContentRenderer';
import TableOfContents from '@/components/BlogContent/TableOfContents';
import RelatedPosts from '@/components/RelatedPosts';
import CommentSection from '@/components/Comments/CommentSection';
import Link from 'next/link';

export default function BlogDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchPost();
      incrementViews();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      if (!data) {
        setError('Post not found');
        return;
      }

      setPost(data);
    } catch (error: any) {
      console.error('Error fetching post:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementViews = async () => {
    try {
      const { data: currentPost } = await supabase
        .from('blog_posts')
        .select('views')
        .eq('slug', slug)
        .single();

      if (currentPost) {
        await supabase
          .from('blog_posts')
          .update({ views: (currentPost.views || 0) + 1 })
          .eq('slug', slug);
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  };

  if (loading) {
    return (
      <BlogLayout>
        <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen">
          <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-gray-900"></div>
        </div>
      </BlogLayout>
    );
  }

  if (error || !post) {
    return (
      <BlogLayout>
        <div className="container tw-py-20">
          <h1>Post not found</h1>
          <Link href="/blog">Back to blog</Link>
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <>
        {/* Copy rest of JSX from src/Pages/BlogDetail.tsx */}
        {/* Make sure to update all Link components */}
        <BlogContentRenderer content={post.content} />
        <TableOfContents content={post.content} />
        <RelatedPosts currentPostId={post.id} category={post.category} />
        <CommentSection postId={post.id} />
      </>
    </BlogLayout>
  );
}
```

### Step 11.3: Copy Blog Components
```bash
# Copy all blog-related components
cp -r src/Components/BlogContent/* ../sojilearn-nextjs/src/components/BlogContent/
cp -r src/Components/Comments/* ../sojilearn-nextjs/src/components/Comments/
cp src/Components/RelatedPosts.tsx ../sojilearn-nextjs/src/components/RelatedPosts.tsx
```

Add `'use client'` to interactive blog components.

---

## Phase 12: Application Page

### Step 12.1: Create Application Page
File: `src/app/apply/page.tsx`

```typescript
'use client';

import AppLayout from "@/components/Layouts/AppLayout";
import Hero from "@/components/ExternalCSS/Hero";
import MultiStepForm from "@/components/ExternalCSS/MultiStepForm";
import Testimonials from "@/components/ExternalCSS/Testimonials";

export default function Application() {
  const handleGetStarted = () => {
    // Scroll to form or perform action
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppLayout>
      <div>
        <Hero onGetStarted={handleGetStarted} />
        <div id="application-form">
          <MultiStepForm />
        </div>
        <Testimonials />
      </div>
    </AppLayout>
  );
}
```

Copy application components:
```bash
cp -r src/Components/ExternalCSS/* ../sojilearn-nextjs/src/components/ExternalCSS/
```

---

## Phase 13: 404 Page

### Step 13.1: Create Not Found Page
File: `src/app/not-found.tsx`

```typescript
import AppLayout from "@/components/Layouts/AppLayout";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <AppLayout>
      <>
        <section className="error-wrap">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-10">
                <div className="text-center">
                  <img 
                    src="/assets/img/404.png" 
                    className="img-fluid" 
                    alt="404 - Page Not Found" 
                  />
                  <h2 className="tw-mt-6 tw-text-2xl tw-font-bold">Page Not Found</h2>
                  <p className="tw-mt-4 tw-text-gray-600">
                    Sorry! The page you requested could not be found.
                  </p>
                  <Link 
                    className="btn theme-bg text-white btn-md tw-mt-6 tw-inline-block" 
                    href="/"
                  >
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </AppLayout>
  );
}
```

---

## Phase 14: Loading States

### Step 14.1: Create Loading Component
File: `src/app/loading.tsx`

```typescript
export default function Loading() {
  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-min-h-screen">
      <div className="tw-animate-spin tw-rounded-full tw-h-16 tw-w-16 tw-border-b-2 tw-border-blue-600"></div>
    </div>
  );
}
```

### Step 14.2: Create Blog Loading
File: `src/app/blog/loading.tsx`

```typescript
export default function BlogLoading() {
  return (
    <div className="container tw-py-20">
      <div className="tw-animate-pulse">
        <div className="tw-h-8 tw-bg-gray-200 tw-rounded tw-w-1/4 tw-mb-6"></div>
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="tw-bg-gray-100 tw-h-64 tw-rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## Phase 15: Image Optimization

### Step 15.1: Update Image Components
Replace `<img>` tags with Next.js `Image` component where appropriate:

```typescript
import Image from 'next/image';

// OLD:
<img src="/assets/img/logo.png" alt="Logo" />

// NEW - For local images:
<Image 
  src="/assets/img/logo.png" 
  alt="Logo" 
  width={200} 
  height={50}
  priority // For above-the-fold images
/>

// For images with unknown dimensions:
<div className="tw-relative tw-w-full tw-h-64">
  <Image 
    src="/assets/img/banner.jpg" 
    alt="Banner" 
    fill
    className="tw-object-cover"
  />
</div>
```

**Note:** Not all images need to be converted immediately. Start with critical images (logos, hero images).

---

## Phase 16: Navigation and Routing Updates

### Step 16.1: Find and Replace All Navigation

Run these commands in your Next.js project:

```bash
# Find all files with React Router imports
grep -r "from 'react-router-dom'" src/

# Replace Link imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' "s/import { Link } from 'react-router-dom'/import Link from 'next\/link'/g" {} +

# Replace useNavigate
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' "s/import { useNavigate } from 'react-router-dom'/import { useRouter } from 'next\/navigation'/g" {} +
```

### Step 16.2: Manual Updates Required

For files using navigation hooks, manually update:

```typescript
// OLD:
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const navigate = useNavigate();
const location = useLocation();
const params = useParams();

navigate('/blog');
const pathname = location.pathname;

// NEW:
import { useRouter, usePathname, useParams } from 'next/navigation';

const router = useRouter();
const pathname = usePathname();
const params = useParams();

router.push('/blog');
// pathname is already available
```

---

## Phase 17: Testing and Verification

### Step 17.1: Start Development Server
```bash
cd sojilearn-nextjs
npm run dev
```

Visit: `http://localhost:3000`

### Step 17.2: Test All Routes Checklist

Create a testing checklist file:

```bash
# Test each route manually
echo "Testing checklist:" > testing-checklist.md
```

**Routes to test:**
- [ ] Home page: `/`
- [ ] About: `/about`
- [ ] Contact: `/contact`
- [ ] Study in UK: `/study-in-uk`
- [ ] Study in Canada: `/study-in-canada`
- [ ] Study in USA: `/study-in-usa`
- [ ] Study in Germany: `/study-in-germany`
- [ ] Study in Malta: `/study-in-malta`
- [ ] Blog list: `/blog`
- [ ] Blog detail: `/blog/[any-slug]`
- [ ] Application: `/apply`
- [ ] Privacy Policy: `/privacy-policy`
- [ ] Terms of Use: `/terms-of-use`
- [ ] Disclaimer: `/disclaimer`
- [ ] 404 page: `/non-existent-page`

### Step 17.3: Verify Functionality

**Features to test:**
- [ ] Navigation works (all links)
- [ ] Blog posts load correctly
- [ ] Blog comments system works
- [ ] Newsletter subscription
- [ ] Contact form submission
- [ ] Application form (all steps)
- [ ] WhatsApp widget appears
- [ ] Analytics tracking (check console)
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] All images load correctly
- [ ] CSS/styling matches React app

### Step 17.4: Check Console for Errors
```bash
# Look for common issues:
# - Missing 'use client' directives
# - Incorrect import paths
# - Missing environment variables
# - Supabase connection issues
```

### Step 17.5: Build Test
```bash
npm run build
```

Fix any build errors that appear.

### Step 17.6: Production Test
```bash
npm run start
```

Test the production build locally.

---

## Phase 18: Performance Optimization

### Step 18.1: Add Metadata to All Pages

Ensure every page has proper metadata:

```typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title - Sojilearn',
  description: 'Page description',
  keywords: 'relevant, keywords, here',
  openGraph: {
    title: 'Page Title',
    description: 'Page description',
    url: 'https://www.sojilearn.com/page-url',
    images: [{ url: 'https://www.sojilearn.com/og-image.jpg' }],
  },
};
```

### Step 18.2: Optimize Bundle Size

Check bundle size:
```bash
npm run build
```

Review the output and identify large bundles.

### Step 18.3: Add Dynamic Imports (Optional)

For heavy components, use dynamic imports:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false, // Disable SSR if component uses window/document
});
```

---

## Phase 19: Environment Variables

### Step 19.1: Verify All Environment Variables
Check `.env.local`:

```bash
# Required variables:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_BASEURL=

# Add any other variables from your React .env
```

### Step 19.2: Create Example File
```bash
cp .env.local .env.example
```

Edit `.env.example` and remove actual values:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_BASEURL=your_base_url_here
```

---

## Phase 20: Git Setup and Deployment

### Step 20.1: Initialize Git (if not done)
```bash
cd sojilearn-nextjs
git init
git add .
git commit -m "Initial Next.js migration from React"
```

### Step 20.2: Connect to GitHub
```bash
git remote add origin https://github.com/yourusername/sojilearn-nextjs.git
git branch -M main
git push -u origin main
```

### Step 20.3: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or deploy via Vercel dashboard:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Add environment variables
4. Deploy

### Step 20.4: Configure Domain
After deployment:
1. Add your custom domain in Vercel dashboard
2. Update DNS records
3. Enable HTTPS

---

## Common Issues and Solutions

### Issue 1: "use client" Missing
**Error:** `You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client"`

**Solution:** Add `'use client';` at the top of the component file.

### Issue 2: Module Not Found
**Error:** `Module not found: Can't resolve '../components/Header'`

**Solution:** Update import path to use alias: `import Header from '@/components/Header'`

### Issue 3: Window is Not Defined
**Error:** `ReferenceError: window is not defined`

**Solution:** 
```typescript
'use client';

useEffect(() => {
  if (typeof window !== 'undefined') {
    // Code using window
  }
}, []);
```

### Issue 4: Image Optimization Errors
**Error:** `Invalid src prop`

**Solution:** Update `next.config.js`:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**',
    },
  ],
},
```

### Issue 5: CSS Not Loading
**Solution:** 
- Ensure CSS is imported in `app/layout.tsx` or `app/globals.css`
- Check that Tailwind prefix (`tw-`) is used consistently
- Verify `tailwind.config.ts` content paths include all file locations

### Issue 6: Supabase Connection Failed
**Solution:**
- Verify environment variables in `.env.local`
- Restart dev server after adding/changing env variables
- Check Supabase project URL and anon key are correct

---

## Final Checklist

### Pre-Launch
- [ ] All pages load without errors
- [ ] All links work correctly
- [ ] Forms submit successfully
- [ ] Blog posts display correctly
- [ ] Comments system works
- [ ] Analytics tracking verified
- [ ] WhatsApp widget functions
- [ ] Mobile responsive
- [ ] SEO metadata on all pages
- [ ] Images optimized
- [ ] Build completes without errors
- [ ] Production build tested locally

### Post-Launch
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Monitor for errors (Vercel dashboard)
- [ ] Test all forms in production
- [ ] Verify Supabase connection in production
- [ ] Check Google Analytics/tracking
- [ ] Test email notifications (if any)
- [ ] Performance testing (Lighthouse)

---

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Debugging
npm run build -- --debug    # Build with debug info

# Package management
npm install <package>       # Install package
npm uninstall <package>     # Remove package
npm update                  # Update dependencies

# Vercel deployment
vercel                  # Deploy to preview
vercel --prod          # Deploy to production
vercel env ls          # List environment variables
vercel logs            # View deployment logs
```

---

## Additional Resources

### Next.js Documentation
- Official Docs: https://nextjs.org/docs
- App Router: https://nextjs.org/docs/app
- Routing: https://nextjs.org/docs/app/building-your-application/routing
- Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching

### Migration Guides
- React to Next.js: https://nextjs.org/docs/migrating/from-create-react-app
- Supabase with Next.js: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

### Deployment
- Vercel: https://vercel.com/docs
- Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables

---

## Support and Maintenance

### Regular Updates
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

### Monitoring
- Use Vercel Analytics
- Set up error tracking (Sentry recommended)
- Monitor Supabase usage

---

## Notes

- **Client Components:** Any component using hooks, browser APIs, or event handlers needs `'use client'`
- **Server Components:** Default in Next.js App Router, better for SEO and performance
- **Import Aliases:** Use `@/` prefix for cleaner imports
- **Metadata:** Each page should export metadata for SEO
- **Images:** Use Next.js Image component for optimization
- **Environment Variables:** Must start with `NEXT_PUBLIC_` to be available in browser

---

## Migration Timeline Estimate

- **Phase 1-3:** 1-2 hours (Setup and configuration)
- **Phase 4-6:** 2-3 hours (Core files and components)
- **Phase 7-9:** 2-3 hours (Layouts and static pages)
- **Phase 10-12:** 3-4 hours (Dynamic pages and blog)
- **Phase 13-17:** 2-3 hours (Testing and fixes)
- **Phase 18-20:** 1-2 hours (Optimization and deployment)

**Total Estimated Time:** 11-17 hours

---

## Contact

For issues or questions during migration:
- Create issues in your GitHub repository
- Consult Next.js documentation
- Check Supabase documentation
- Review Vercel deployment docs

---

**Last Updated:** February 6, 2026

**Version:** 1.0

**Status:** Ready for Migration
