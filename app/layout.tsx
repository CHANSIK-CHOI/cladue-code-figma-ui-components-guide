import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Code를 활용한 UI 컴포넌트 스토리북",
  description: "Claude Code와 Figma MCP를 활용한 UI 컴포넌트를 기획 디자인 개발하여 스토리북에 배포합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
