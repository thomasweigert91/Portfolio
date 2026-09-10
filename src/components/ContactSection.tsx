import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { lang, data, ui } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: ui.contact.defaultSubject,
    message: "",
  });

  // Sync default subject when language changes if subject was default
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subject:
        prev.subject === "" ||
        prev.subject === "Frontend Engineer Position / Projektanfrage" ||
        prev.subject === "Frontend Engineer Role / Project Inquiry"
          ? ui.contact.defaultSubject
          : prev.subject,
    }));
  }, [ui.contact.defaultSubject]);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [botField, setBotField] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(data.profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(
      formData.subject || ui.contact.defaultSubject
    );
    const body = encodeURIComponent(
      `Hallo Thomas,\n\n${formData.message}\n\nViele Grüße,\n${formData.name} (${formData.email})`
    );
    return `mailto:${data.profile.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim()) newErrors.name = ui.contact.errors.name;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim()))
      newErrors.email = ui.contact.errors.email;
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
      import.meta.env.VITE_CONTACT_ENDPOINT ||
      `https://formsubmit.co/ajax/${data.profile.email}`;

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
          _subject:
            formData.subject.trim() || `Portfolio-Anfrage von ${formData.name}`,
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
    <section
      id="contact"
      className="py-24 sm:py-32 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400/90 uppercase mb-3 font-medium">
              {ui.contact.badge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-[#FDFBF7] tracking-tight leading-[1.25] sm:leading-[1.18] mb-4">
              {ui.contact.titlePart1}
              <span className="italic text-amber-300 inline-block pb-0.5">
                {ui.contact.titleHighlight}
              </span>
              .
            </h2>
            <p className="text-stone-300 text-base leading-relaxed sm:leading-7 font-light">
              {ui.contact.description}
            </p>
          </div>

          {/* Contact Details Card (Double-Bezel) */}
          <div className="p-1.5 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 shadow-lg">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#191512] p-6 space-y-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  {data.profile.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-stone-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{data.profile.location}</span>
              </div>

              {/* Email Box */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-xs text-stone-400 font-mono mb-1.5">
                  {ui.contact.emailLabel}
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <a
                    href={`mailto:${data.profile.email}`}
                    className="font-mono text-sm text-amber-300 hover:underline select-all"
                  >
                    {data.profile.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 transition-colors cursor-pointer"
                    title={ui.contact.emailLabel}
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone Box */}
              <div>
                <div className="text-xs text-stone-400 font-mono mb-1.5">
                  {ui.contact.phoneLabel}
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <a
                    href={`tel:${data.profile.phone.replace(/\s+/g, "")}`}
                    className="font-mono text-sm text-stone-200 hover:underline select-all"
                  >
                    {data.profile.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 transition-colors cursor-pointer"
                    title={ui.contact.phoneLabel}
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div>
            <div className="text-xs font-mono text-stone-500 uppercase tracking-wider mb-3">
              {ui.contact.profilesLabel}
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={data.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-xs font-mono transition-all active:scale-[0.98]"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>

              <a
                href={data.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-xs font-mono transition-all active:scale-[0.98]"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column (7 cols, Double-Bezel) */}
        <div className="lg:col-span-7">
          <div className="p-1.5 sm:p-2 rounded-[2.25rem] bg-white/[0.03] ring-1 ring-white/10 shadow-2xl">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-[#191512] p-7 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              {submissionStatus === "success" ? (
                <div className="py-12 text-center space-y-5">
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
                      {formData.subject}
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
                        subject: ui.contact.defaultSubject,
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
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      <label className="block text-xs font-mono text-stone-300 uppercase tracking-wider mb-2">
                        {ui.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        placeholder={ui.contact.namePlaceholder}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-600 text-sm focus:outline-none transition-all"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-400 mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-stone-300 uppercase tracking-wider mb-2">
                        {ui.contact.emailFormLabel}
                      </label>
                      <input
                        type="email"
                        placeholder={ui.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-600 text-sm focus:outline-none transition-all"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-stone-300 uppercase tracking-wider mb-2">
                      {ui.contact.subjectLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-600 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                        {ui.contact.messageLabel}
                      </label>
                      <span className="text-xs font-mono text-stone-400">
                        {formData.message.length} {ui.contact.charsLabel}
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      placeholder={ui.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-stone-600 text-sm focus:outline-none transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error Notification Banner */}
                  {submissionStatus === "error" && (
                    <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs space-y-3">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
