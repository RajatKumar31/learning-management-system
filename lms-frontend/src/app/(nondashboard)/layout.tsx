import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NonDashboardNavbar />
      <main className="flex h-full w-full flex-grow items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
