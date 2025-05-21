import Footer from "./footer";
import Header from "./header";

export default function FrontPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
