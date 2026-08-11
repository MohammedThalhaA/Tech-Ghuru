import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Styles specific to main site pages (no style1.css or style12.css to prevent global style breakages) */}
      <link href="/css/style.css" rel="stylesheet" />

      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
