import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Product Studio",
  description: "AI 활용 과정을 보여주는 조정민의 포트폴리오 웹사이트",
};

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/logs", label: "Build Log" },
  { href: "/wiki", label: "Wiki" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <nav className="site-nav">
              <Link className="brand" href="/">
                <strong>AI Product Studio</strong>
                <span>Vibe Coding Lab</span>
              </Link>
              <div className="nav-links">
                {navItems.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

