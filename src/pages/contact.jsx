import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to backend/email service. For now, simulate success.
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl w-full py-8">
      <h1 className="text-3xl font-bold mb-3">Contact us</h1>
      <p className="text-gray-600 mb-6">
        Questions, feedback, or just saying hi? We’d love to hear from you.
      </p>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        {sent ? (
          <div className="text-green-700 bg-green-50 border border-green-200 rounded-xl p-4">
            Thanks for reaching out! We’ll get back to you shortly.
          </div>
        ) : (
          <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="jane@example.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="How can we help?"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-indigo-700 transition"
              >
                Send message
              </button>
              <div className="text-sm text-gray-500">
                support@crystalbeauty.example
              </div>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold mb-1">Email</h3>
          <p className="text-sm text-gray-600">support@crystalbeauty.example</p>
        </div>
        <div className="rounded-2xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold mb-1">Hours</h3>
          <p className="text-sm text-gray-600">Mon–Fri, 9:00–17:00</p>
        </div>
        <div className="rounded-2xl border p-5 bg-white shadow-sm">
          <h3 className="font-semibold mb-1">Location</h3>
          <p className="text-sm text-gray-600">Colombo, Sri Lanka</p>
        </div>
      </div>
    </div>
  );
}
