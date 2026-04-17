import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "드시네몰 리뉴얼 2차 디자인 시스템",
  description: "드시네몰 리뉴얼 2차 컴포넌트 가이드",
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
