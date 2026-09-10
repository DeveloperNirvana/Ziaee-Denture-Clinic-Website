
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white-blue px-6">
      <div className="w-full max-w-2xl rounded-2xl bg-white px-8 py-16 text-center shadow-lg md:px-12">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10">
          <span className="text-4xl text-secondary">✓</span>
        </div>

        <h1 className="mb-5 text-4xl font-bold uppercase tracking-tight text-secondary md:text-6xl">
          Thank You!
        </h1>

        <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-secondary/80 md:text-lg">
          Thank you for contacting us. We have received your submission
          successfully. Our team will review your message and get back to you
          shortly.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

