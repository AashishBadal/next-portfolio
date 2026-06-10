"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE, SOCIALS } from "@/lib/site";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

/**
 * Closing call to action. An oversized invitation, a contact form, a
 * magnetic email CTA, and the social rail — the landing-page ending the
 * rest of the site builds toward.
 */
type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full border-b border-bone/20 bg-transparent py-3 text-bone placeholder:text-smoke/70 transition-colors duration-300 focus:border-bone focus:outline-none";

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-28"
      aria-label="Contact"
    >
      {/* Ambient glow behind the type */}
      <div className="glow-radial pointer-events-none absolute inset-0" aria-hidden />

      <div className="shell relative z-10">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-smoke"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/80" />
          {SITE.availability}
        </motion.span>

        <h2 className="mt-6 text-display-md font-semibold text-bone text-balance">
          <RevealText text="Let's build" stagger={0.05} />
          <br />
          <span className="text-bone/45">
            <RevealText text="something lasting." stagger={0.05} delay={0.1} />
          </span>
        </h2>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-20">
          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={fieldClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                className={fieldClass}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                className={`${fieldClass} resize-none`}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <button
                type="submit"
                data-cursor
                disabled={status === "sending"}
                className="border border-bone/20 px-8 py-4 text-base text-bone transition-colors duration-500 ease-expo hover:border-bone hover:bg-bone hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-bone"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "sent" && (
                <p className="mt-4 text-sm text-emerald-400/90">
                  Thanks — your message has been sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-4 text-sm text-red-400/90">
                  Something went wrong. Please email me directly at {SITE.email}.
                </p>
              )}
            </motion.div>
          </motion.form>

          {/* Direct email + social rail */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="flex flex-col items-start gap-12 md:items-end"
          >
            <motion.div variants={fadeUp}>
              <p className="mb-6 text-sm text-smoke md:text-right">
                Prefer email? Reach me directly.
              </p>
              <MagneticButton
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`}
                strength={0.5}
                className="border border-bone/20 px-8 py-5 text-lg text-bone transition-colors duration-500 ease-expo hover:border-bone hover:bg-bone hover:text-ink"
              >
                {SITE.email}
                <span aria-hidden className="text-xl">↗</span>
              </MagneticButton>
              <p className="mt-6 text-sm text-smoke md:text-right">
                Or call me.
              </p>
              <a
                href={`tel:${SITE.phone}`}
                data-cursor
                className="mt-2 inline-block text-lg text-bone/80 transition-colors duration-300 hover:text-bone md:text-right"
              >
                {SITE.phone}
              </a>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end"
            >
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor
                    className="group relative text-sm text-bone/70 transition-colors duration-300 hover:text-bone"
                  >
                    {social.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone/60 transition-transform duration-500 ease-expo group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
