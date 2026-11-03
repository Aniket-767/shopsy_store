import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="bg-gray-50 px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
            Contact Us
          </p>

          <h2 className="mt-3 text-3xl font-black text-gray-900 sm:text-4xl">
            We'd Love to Hear From You
          </h2>

          <p className="mt-4 max-w-lg leading-7 text-gray-600">
            Have a question or suggestion about Shopsy? Send us a message using
            the form.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Email Support</h3>
              <p className="text-sm text-gray-500">
                Send us your questions through the form.
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <div className="rounded-xl bg-amber-100 p-3 text-amber-700">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Feedback</h3>
              <p className="text-sm text-gray-500">
                Your suggestions can help improve our project.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          {submitted && (
            <div
              role="status"
              className="mb-5 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700"
            >
              Thank you! Your message was submitted in this frontend demo. No
              message has been sent to a support team.
            </div>
          )}

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Your Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => {
              setSubmitted(false);
              setForm({ ...form, name: e.target.value });
            }}
            placeholder="Enter your name"
            className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => {
              setSubmitted(false);
              setForm({ ...form, email: e.target.value });
            }}
            placeholder="you@example.com"
            className="mb-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
          />

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Your Message
          </label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => {
              setSubmitted(false);
              setForm({ ...form, message: e.target.value });
            }}
            placeholder="How can we help?"
            className="mb-5 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-400"
          />

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-bold text-gray-900 transition hover:bg-amber-500"
          >
            Send Message
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
