export const metadata = {
  title: "HZ Music Studio",
  description: "线下招生 · 专业钢琴教学",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {children}
      </body>
    </html>
  );
}
