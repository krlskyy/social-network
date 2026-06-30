import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Это гарантирует, что стили подтянутся */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#050505] text-zinc-200">
        {children}
      </body>
    </html>
  );
}