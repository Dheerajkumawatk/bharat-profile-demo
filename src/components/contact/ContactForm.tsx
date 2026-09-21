"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-cream p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-saffron" />
        <h3 className="mt-4 text-lg font-bold text-navy">धन्यवाद!</h3>
        <p className="mt-2 max-w-sm text-sm text-ink/65">
          आपका संदेश सफलतापूर्वक प्राप्त हो गया है। हम शीघ्र ही आपसे संपर्क करेंगे।
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white"
        >
          नया संदेश भेजें
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">पूरा नाम</label>
          <input
            required
            type="text"
            placeholder="अपना नाम लिखें"
            className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-saffron"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">मोबाइल नंबर</label>
          <input
            required
            type="tel"
            pattern="[0-9]{10}"
            placeholder="10 अंकों का मोबाइल नंबर"
            className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-saffron"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">ईमेल (वैकल्पिक)</label>
        <input
          type="email"
          placeholder="आपका ईमेल पता"
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-saffron"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">विषय</label>
        <select
          required
          defaultValue=""
          className="w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-saffron"
        >
          <option value="" disabled>
            विषय चुनें
          </option>
          <option>सुझाव</option>
          <option>शिकायत</option>
          <option>योजना संबंधी जानकारी</option>
          <option>अन्य</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy">संदेश</label>
        <textarea
          required
          rows={4}
          placeholder="अपना संदेश यहां लिखें..."
          className="w-full resize-none rounded-xl border border-navy/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-saffron"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-saffron/20 transition-colors hover:bg-saffron-dark disabled:opacity-60 sm:w-auto"
      >
        {loading ? "भेजा जा रहा है..." : "संदेश भेजें"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
