"use client";

import React, { useState } from "react";
import { Mail, Check, Send, Loader2, AlertCircle } from "lucide-react";
import type { Language, UiDictionary } from "@/i18n/dictionaries";

interface ContactFormProps {
  email: string;
  lang: Language;
  ui: Pick<UiDictionary, "contact">;
}

export const ContactForm: React.FC<ContactFormProps> = ({ email, lang, ui }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const subjectLabel =
    ui.contact.subjectOptions.find((o) => o.value === formData.subject)?.label ?? "";

  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [botField, setBotField] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Portfolio: ${subjectLabel || ui.contact.subjectLabel} – ${formData.name}`
    );
    const body = encodeURIComponent(
      `Hallo Thomas,\n\n${formData.message}\n\nViele Grüße,\n${formData.name} (${formData.email})`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) newErrors.name = ui.contact.errors.name;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim()))
      newErrors.email = ui.contact.errors.email;
    if (!subjectLabel) newErrors.subject = ui.contact.errors.subject;
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = ui.contact.errors.message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Silent handling for spam bots triggering honeypot
    if (botField.trim()) {
      setSubmissionStatus("success");
      return;
    }

    setErrors({});
    setSubmissionStatus("submitting");
    setErrorMessage("");

    const endpoint =
      process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ||
      `https://formsubmit.co/ajax/${email}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: `Portfolio: ${subjectLabel} – ${formData.name.trim()}`,
          topic: subjectLabel,
          message: formData.message.trim(),
          _captcha: "false",
          _honey: botField,
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        throw new Error(`HTTP status ${response.status}`);
      }
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setErrorMessage(ui.contact.errorGeneric);
      setSubmissionStatus("error");
    }
  };

  return (
    <>
              {submissionStatus === "success" ? (
                <div role="status" className="py-12 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-fraunces text-white">
                    {ui.contact.successTitle}
                  </h3>
                  <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                    {lang === "de" ? "Vielen Dank, " : "Thank you, "}
                    <span className="text-white font-medium">
                      {formData.name}
                    </span>
                    . {ui.contact.successText}
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs font-mono text-stone-300 max-w-lg mx-auto overflow-x-auto space-y-1">
                    <div className="text-emerald-400 mb-1.5 font-semibold">
                      {lang === "de"
                        ? "Übermittelte Details:"
                        : "Submitted details:"}
                    </div>
                    <div>
                      <span className="text-stone-400">
                        {lang === "de" ? "Absender:" : "Sender:"}
                      </span>{" "}
                      {formData.name} ({formData.email})
                    </div>
                    <div>
                      <span className="text-stone-400">
                        {lang === "de" ? "Betreff:" : "Subject:"}
                      </span>{" "}
                      {subjectLabel}
                    </div>
                    <div className="truncate">
                      <span className="text-stone-400">
                        {lang === "de" ? "Nachricht:" : "Message:"}
                      </span>{" "}
                      {formData.message}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFormData({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                      setSubmissionStatus("idle");
                    }}
                    className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all active:scale-95 cursor-pointer"
                  >
                    {ui.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-fraunces text-white mb-1">
                      {ui.contact.formTitle}
                    </h3>
                    <p className="text-xs text-stone-400">
                      {ui.contact.formSubtitle}
                    </p>
                  </div>

                  {/* Honeypot field (hidden for users, traps spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="_honey">Please leave this field empty</label>
                    <input
                      type="text"
                      id="_honey"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-stone-300 uppercase tracking-wider mb-2">
                        {ui.contact.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        placeholder={ui.contact.namePlaceholder}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-500 text-sm focus:outline-none transition-all"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-xs text-rose-300 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-stone-300 uppercase tracking-wider mb-2">
                        {ui.contact.emailFormLabel}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        placeholder={ui.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-500 text-sm focus:outline-none transition-all"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-xs text-rose-300 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-stone-300 uppercase tracking-wider mb-2">
                      {ui.contact.subjectLabel}
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#191512] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white text-sm focus:outline-none transition-all"
                    >
                      <option value="" disabled>
                        {ui.contact.subjectPlaceholder}
                      </option>
                      {ui.contact.subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p id="contact-subject-error" className="text-xs text-rose-300 mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="contact-message" className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                        {ui.contact.messageLabel}
                      </label>
                      <span className="text-xs font-mono text-stone-400">
                        {formData.message.length} {ui.contact.charsLabel}
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={10}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                      rows={4}
                      placeholder={ui.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-500 text-sm focus:outline-none transition-all resize-none"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-xs text-rose-300 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Notification Banner */}
                  {submissionStatus === "error" && (
                    <div role="alert" className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs space-y-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <p className="font-semibold text-rose-300 mb-1">
                            {errorMessage || ui.contact.errorGeneric}
                          </p>
                          <p className="text-stone-300">
                            {lang === "de"
                              ? "Sie können Ihre Nachricht auch direkt mit Ihrem E-Mail-Programm öffnen:"
                              : "You can also open this message directly in your email client:"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={getMailtoUrl()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-white font-mono text-xs transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-300" />
                          <span>{ui.contact.openInEmailClient}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmissionStatus("idle")}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 font-mono text-xs transition-colors cursor-pointer"
                        >
                          {ui.contact.retryButton}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submit Action (Button-in-Button) */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-mono text-stone-400">
                      {ui.contact.directNotice}
                    </div>

                    <button
                      type="submit"
                      disabled={submissionStatus === "submitting"}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-sm tracking-wide transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_4px_20px_rgba(229,152,58,0.25)] hover:shadow-[0_6px_28px_rgba(229,152,58,0.35)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>
                        {submissionStatus === "submitting"
                          ? ui.contact.submitting
                          : ui.contact.submitButton}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#14110F]/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-200">
                        {submissionStatus === "submitting" ? (
                          <Loader2 className="w-3.5 h-3.5 text-[#14110F] animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5 text-[#14110F]" />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              )}
    </>
  );
};
