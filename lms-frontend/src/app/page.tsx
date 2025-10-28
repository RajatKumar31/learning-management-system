import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NonDashboardNavbar />
      <main className="flex h-full w-full flex-grow items-center justify-center">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
