import Footer from './footer';
import Header from './header';

export default function FrontPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
}
