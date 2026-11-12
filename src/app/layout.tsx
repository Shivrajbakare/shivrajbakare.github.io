import type { Metadata, Viewport } from "next";
import { Instrument_Serif, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { MotionProvider } from "@/components/MotionProvider";
import { profile } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const description =
  "Shivraj Bakare is a final-year Materials Science & Engineering student at IIT Kanpur building machine-learning systems, from graph neural networks for crystals to deepfake forensics and production LLM platforms.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}: ML engineer & materials scientist`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Shivraj Bakare",
    "IIT Kanpur",
    "Materials Science and Engineering",
    "Machine Learning",
    "AI/ML Engineer",
    "Software Engineer",
    "Data Science",
    "Graph Neural Networks",
    "Deepfake Detection",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name}: ML engineer & materials scientist`,
    description,
    siteName: profile.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f2eee5",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint: skip the loader on repeat visits within a session or with reduced motion.
const introScript = `try{var s=sessionStorage.getItem('sb-intro');var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(s||r){document.documentElement.classList.add('intro-seen')}else{sessionStorage.setItem('sb-intro','1')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: `mailto:${profile.email}`,
    url: siteUrl,
    sameAs: [profile.linkedin, profile.github],
    alumniOf: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Kanpur" },
    knowsAbout: ["Machine Learning", "Deep Learning", "Graph Neural Networks", "Computer Vision", "Software Engineering", "Materials Science"],
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="label sr-only z-[110] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <div className="loader" aria-hidden="true">
          <div className="flex flex-col items-center gap-5">
            <span className="display text-5xl italic">Shivraj Bakare</span>
            <div className="loader__bar">
              <span />
            </div>
            <span className="label text-paper/60">Materials · Machines · Movement</span>
          </div>
        </div>
        <MotionProvider>
          <Nav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
