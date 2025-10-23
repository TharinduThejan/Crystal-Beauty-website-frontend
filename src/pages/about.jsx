export default function About() {
  return (
    <div className="mx-auto max-w-4xl w-full py-8">
      <h1 className="text-3xl font-bold mb-3">About Crystal Beauty</h1>
      <p className="text-gray-600 mb-6">
        We believe beauty should feel effortless. From skin-loving bases to
        vibrant colors, our collections are crafted to help you look and feel
        your best—every single day.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold mb-1">Quality-first</h3>
          <p className="text-sm text-gray-600">
            Dermatologist-tested formulas and responsibly sourced ingredients.
          </p>
        </div>
        <div className="rounded-2xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold mb-1">Cruelty-free</h3>
          <p className="text-sm text-gray-600">
            We never test on animals. Ever.
          </p>
        </div>
        <div className="rounded-2xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold mb-1">Designed to delight</h3>
          <p className="text-sm text-gray-600">
            Packaging that’s as pretty and practical as what’s inside.
          </p>
        </div>
      </div>

      <div className="rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border">
        <h2 className="text-xl font-semibold mb-2">Our promise</h2>
        <p className="text-gray-700 text-sm">
          We’re committed to transparency, fair pricing, and formulations that
          put skin health first. If something isn’t right, our support team is
          here to make it better.
        </p>
      </div>
    </div>
  );
}
