export const dynamic = 'force-dynamic';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-[#050505] text-zinc-200">{children}</body>
    </html>
  );
}
