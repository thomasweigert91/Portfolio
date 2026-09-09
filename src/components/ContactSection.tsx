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
    "idle" | "submitting" | "submitted"
  >("idle");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = ui.contact.errors.name;
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = ui.contact.errors.email;
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = ui.contact.errors.message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmissionStatus("submitting");

    setTimeout(() => {
      setSubmissionStatus("submitted");
    }, 700);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{ui.contact.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-fraunces text-[#FDFBF7] tracking-tight mb-4">
              {ui.contact.titlePart1}
              <span className="italic text-amber-300">
                {ui.contact.titleHighlight}
              </span>
              .
            </h2>
            <p className="text-stone-300 text-base leading-relaxed font-light">
              {ui.contact.description}
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 rounded-3xl bg-timber-850 border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
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
              <div className="text-[11px] text-stone-400 font-mono mb-1.5">
                {ui.contact.emailLabel}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/10">
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
              <div className="text-[11px] text-stone-400 font-mono mb-1.5">
                {ui.contact.phoneLabel}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-xs font-mono transition-all"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>

              <a
                href={data.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white border border-white/10 text-xs font-mono transition-all"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#1A1613] border border-white/10 shadow-2xl">
            {submissionStatus === "submitted" ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(229,152,58,0.3)]">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold font-fraunces text-white">
                  {ui.contact.submittedTitle}
                </h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                  {lang === "de" ? "Vielen Dank, " : "Thank you, "}
                  <span className="text-white font-medium">
                    {formData.name}
                  </span>
                  . {ui.contact.submittedText}
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs font-mono text-stone-300 max-w-lg mx-auto overflow-x-auto">
                  <div className="text-amber-400 mb-1">
                    {ui.contact.draftPreview}
                  </div>
                  <div>
                    {lang === "de" ? "Absender:" : "Sender:"} {formData.name} (
                    {formData.email})
                  </div>
                  <div>
                    {lang === "de" ? "Betreff:" : "Subject:"} {formData.subject}
                  </div>
                  <div>
                    {lang === "de" ? "Nachricht:" : "Message:"}{" "}
                    {formData.message}
                  </div>
                </div>
                <button
                  onClick={() => setSubmissionStatus("idle")}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all cursor-pointer"
                >
                  {ui.contact.resetButton}
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400 text-white placeholder-stone-600 text-sm focus:outline-none transition-colors"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400 text-white placeholder-stone-600 text-sm focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400 text-white placeholder-stone-600 text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                      {ui.contact.messageLabel}
                    </label>
                    <span className="text-[10px] font-mono text-stone-500">
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
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-amber-400 text-white placeholder-stone-600 text-sm focus:outline-none transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] font-mono text-stone-500">
                    {ui.contact.directNotice}
                  </div>

                  <button
                    type="submit"
                    disabled={submissionStatus === "submitting"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#14110F] font-semibold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(229,152,58,0.3)] active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submissionStatus === "submitting"
                        ? ui.contact.submitting
                        : ui.contact.submitButton}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
