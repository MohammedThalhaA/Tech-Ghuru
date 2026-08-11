export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Load main style first, then portfolio specific overrides */}
      <link href="/css/style.css" rel="stylesheet" />
      <link href="/css/portfolio.css" rel="stylesheet" />
      {children}
    </>
  );
}
