export default function TestMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="antialiased">{children}</div>;
}

