import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="container-narrow py-24">
        <div className="text-center">
          <div className="text-xs uppercase tracking-wider text-[var(--text-dim)] mb-3">
            404
          </div>
          <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link href="/" className="btn-primary">
              Go home
            </Link>
            <Link href="/explore" className="btn-secondary">
              Browse wagers
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
