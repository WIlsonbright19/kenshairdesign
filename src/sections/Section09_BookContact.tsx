import React, { useState, useRef } from 'react';
import { SALON_DATA } from '../content';
import { Button } from '../components/Button';
import { SplitText } from '../components/SplitText';
import { Reveal } from '../components/Reveal';
import { copyToClipboard } from '../utils/clipboard';
import { useToast } from '../components/Toast';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDay: string;
  preferredTime: 'Morning' | 'Afternoon' | 'Evening' | '';
  notes: string;
  honeyPot: string; // Anti-spam trap
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferredDay?: string;
  preferredTime?: string;
  notes?: string;
}

export function Section09_BookContact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    service: SALON_DATA.services[0].name,
    preferredDay: 'Monday',
    preferredTime: 'Morning',
    notes: '',
    honeyPot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Field refs for error focus
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const serviceSelectRef = useRef<HTMLSelectElement | null>(null);
  const daySelectRef = useRef<HTMLSelectElement | null>(null);
  const timeGroupRef = useRef<HTMLDivElement | null>(null);
  const summaryAlertRef = useRef<HTMLDivElement | null>(null);

  // Auto-format US phone as (415) 555-0123 while typing
  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    const trimmed = digits.startsWith('1') ? digits.slice(1, 11) : digits.slice(0, 10);

    if (trimmed.length === 0) return '';
    if (trimmed.length <= 3) return `(${trimmed}`;
    if (trimmed.length <= 6) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
    return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6, 10)}`;
  };

  // Validate individual field
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    if (name === 'fullName') {
      const trimmed = value.trim();
      if (!trimmed) return 'Full name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 60) return 'Name must be under 60 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return 'Please enter letters, hyphens, and apostrophes only';
      }
    }

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      const validDigits = digits.startsWith('1') ? digits.slice(1) : digits;
      if (!validDigits) return 'Phone number is required';
      if (validDigits.length !== 10) return 'Please enter a valid 10-digit US phone number';
    }

    if (name === 'email') {
      const trimmed = value.trim();
      if (trimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return 'Please enter a valid email address';
      }
    }

    if (name === 'service') {
      if (!value) return 'Please select a service';
    }

    if (name === 'preferredDay') {
      if (!value) return 'Please select a preferred day';
    }

    if (name === 'preferredTime') {
      if (!value) return 'Please select a preferred time';
    }

    if (name === 'notes') {
      if (value.length > 300) return 'Notes cannot exceed 300 characters';
    }

    return undefined;
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: keyof FormData, val: string) => {
    let finalVal = val;
    if (field === 'phone') {
      finalVal = formatPhoneNumber(val);
    }

    setFormData((prev) => ({ ...prev, [field]: finalVal }));

    if (touched[field]) {
      const err = validateField(field, finalVal);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam honeypot trap
    if (formData.honeyPot) {
      setIsSubmitted(true);
      return;
    }

    // Validate all fields
    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormErrors)[] = [
      'fullName',
      'phone',
      'email',
      'service',
      'preferredDay',
      'preferredTime',
      'notes',
    ];

    fieldsToValidate.forEach((f) => {
      const err = validateField(f as keyof FormData, formData[f as keyof FormData]);
      if (err) newErrors[f] = err;
    });

    setErrors(newErrors);
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      service: true,
      preferredDay: true,
      preferredTime: true,
      notes: true,
    });

    if (Object.keys(newErrors).length > 0) {
      // Focus first invalid field
      if (newErrors.fullName) nameInputRef.current?.focus();
      else if (newErrors.phone) phoneInputRef.current?.focus();
      else if (newErrors.email) emailInputRef.current?.focus();
      else if (newErrors.service) serviceSelectRef.current?.focus();
      else if (newErrors.preferredDay) daySelectRef.current?.focus();
      else if (newErrors.preferredTime) timeGroupRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      if (SALON_DATA.formEndpoint) {
        // Send real API request if endpoint configured
        const res = await fetch(SALON_DATA.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Network response was not ok');
        setIsSubmitted(true);
      } else {
        // DEMO MODE: simulate quick network latency and show verified demo state
        await new Promise((r) => setTimeout(r, 600));
        setIsSubmitted(true);
      }
    } catch {
      setSubmitError('Unable to send request right now. Please call (415) 928-1312 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyNumber = () => {
    copyToClipboard(
      SALON_DATA.phone.display,
      () => showToast('Phone number copied to clipboard'),
      () => showToast('Could not copy number')
    );
  };

  return (
    <section
      id="book"
      aria-labelledby="book-headline"
      className="relative bg-[#131313] text-white py-20 md:py-32 border-b border-[#262626]"
    >
      <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">
          {/* LEFT COLUMN: Headings, Call actions, Hours summary */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ebf213] mb-3 block">
                Appointments & Walk-ins
              </span>
              <SplitText
                text="Book your next cut."
                tag="h2"
                className="text-display text-white mb-4"
              />
              <p className="text-xl sm:text-2xl font-light text-white/80 mb-8">
                Call us or walk right in.
              </p>

              {/* Contact Button Stack per Part E & F - Expanded width container */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full max-w-2xl">
                <Button
                  href={SALON_DATA.phone.telLink}
                  variant="primary"
                  showArrow
                  className="w-full sm:w-auto sm:min-w-[180px]"
                >
                  Call Now
                </Button>

                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="min-h-[48px] px-8 w-full sm:w-auto sm:min-w-[200px] rounded-[4px] border border-white/30 text-white font-semibold text-base hover:border-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 select-none focus-visible:outline-2 focus-visible:outline-white"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
                  <span>Copy number</span>
                </button>

                <Button
                  href={SALON_DATA.links.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="dark-secondary"
                  className="w-full sm:w-auto sm:min-w-[140px]"
                >
                  Directions
                </Button>
              </div>
            </div>

            {/* Quick Hours Summary */}
            <div className="border-t border-white/20 pt-8 mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-3">
                Studio Hours (758 Stockton Street)
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                <div>
                  <span className="block font-medium text-white">Wed – Mon</span>
                  <span>10:30 AM – 7:00 PM</span>
                </div>
                <div>
                  <span className="block font-medium text-white">Tuesday</span>
                  <span className="text-[#ebf213]">Closed (Rest Day)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Validated Form in White Panel */}
          <div className="lg:col-span-6">
            <div className="bg-white text-[#131313] rounded-[8px] border border-[#e5e7eb] p-6 sm:p-8 lg:p-10">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-normal tracking-[-0.04em] text-[#131313] mb-1">
                      Request an appointment
                    </h3>
                    <p className="text-sm text-[#666666]">
                      We confirm by phone. Walk-ins welcome.
                    </p>
                  </div>

                  {/* Accessible Live Error Summary on failed submit */}
                  {Object.keys(errors).length > 0 && Object.values(errors).some(Boolean) && (
                    <div
                      ref={summaryAlertRef}
                      role="alert"
                      aria-live="polite"
                      className="p-3 mb-6 bg-red-50 border border-[#d92d20] rounded-[4px] text-xs text-[#d92d20] flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>Please check the highlighted fields below.</span>
                    </div>
                  )}

                  {submitError && (
                    <div
                      role="alert"
                      className="p-3 mb-6 bg-red-50 border border-[#d92d20] rounded-[4px] text-xs text-[#d92d20]"
                    >
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Hidden Honeypot Anti-Spam Field */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website_pot"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeyPot}
                        onChange={(e) => setFormData({ ...formData, honeyPot: e.target.value })}
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#131313] mb-1.5"
                      >
                        Full Name <span className="text-[#d92d20]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        className={`w-full min-h-[48px] px-3.5 text-base border rounded-[4px] bg-white text-[#131313] transition-colors focus:outline-none focus:border-[#131313] focus:ring-1 focus:ring-[#131313] ${
                          errors.fullName ? 'border-[#d92d20]' : 'border-[#e5e7eb]'
                        }`}
                        placeholder="e.g. Sarah Jenkins"
                      />
                      {errors.fullName && (
                        <p id="fullName-error" role="alert" className="text-xs text-[#d92d20] mt-1.5 flex items-center gap-1">
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number (Auto-format) */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#131313] mb-1.5"
                      >
                        Phone Number <span className="text-[#d92d20]">*</span>
                      </label>
                      <input
                        ref={phoneInputRef}
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={`w-full min-h-[48px] px-3.5 text-base border rounded-[4px] bg-white text-[#131313] transition-colors focus:outline-none focus:border-[#131313] focus:ring-1 focus:ring-[#131313] ${
                          errors.phone ? 'border-[#d92d20]' : 'border-[#e5e7eb]'
                        }`}
                        placeholder="(415) 555-0123"
                      />
                      {errors.phone && (
                        <p id="phone-error" role="alert" className="text-xs text-[#d92d20] mt-1.5 flex items-center gap-1">
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#131313] mb-1.5"
                      >
                        Email <span className="text-[#666666] font-normal lowercase">(optional)</span>
                      </label>
                      <input
                        ref={emailInputRef}
                        id="email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full min-h-[48px] px-3.5 text-base border rounded-[4px] bg-white text-[#131313] transition-colors focus:outline-none focus:border-[#131313] focus:ring-1 focus:ring-[#131313] ${
                          errors.email ? 'border-[#d92d20]' : 'border-[#e5e7eb]'
                        }`}
                        placeholder="sarah@example.com"
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-xs text-[#d92d20] mt-1.5 flex items-center gap-1">
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Service & Preferred Day (2-col grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Service */}
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#131313] mb-1.5"
                        >
                          Service <span className="text-[#d92d20]">*</span>
                        </label>
                        <select
                          ref={serviceSelectRef}
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={(e) => handleChange('service', e.target.value)}
                          onBlur={() => handleBlur('service')}
                          aria-invalid={!!errors.service}
                          className="w-full min-h-[48px] px-3.5 text-base border border-[#e5e7eb] rounded-[4px] bg-white text-[#131313] focus:outline-none focus:border-[#131313] focus:ring-1 focus:ring-[#131313]"
                        >
                          {SALON_DATA.services.map((s) => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred Day */}
                      <div>
                        <label
                          htmlFor="preferredDay"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#131313] mb-1.5"
                        >
                          Preferred Day <span className="text-[#d92d20]">*</span>
                        </label>
                        <select
                          ref={daySelectRef}
                          id="preferredDay"
                          name="preferredDay"
                          value={formData.preferredDay}
                          onChange={(e) => handleChange('preferredDay', e.target.value)}
                          onBlur={() => handleBlur('preferredDay')}
                          aria-invalid={!!errors.preferredDay}
                          className="w-full min-h-[48px] px-3.5 text-base border border-[#e5e7eb] rounded-[4px] bg-white text-[#131313] focus:outline-none focus:border-[#131313] focus:ring-1 focus:ring-[#131313]"
                        >
                          {SALON_DATA.schedule.map((day) => (
                            <option
                              key={day.dayName}
                              value={day.dayName}
                              disabled={day.isClosed}
                            >
                              {day.dayName} {day.isClosed ? '(Closed)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Preferred Time (Radio Group: Morning, Afternoon, Evening) */}
                    <div ref={timeGroupRef} tabIndex={-1}>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[#131313] mb-2">
                        Preferred Time of Day <span className="text-[#d92d20]">*</span>
                      </span>
                      <div className="grid grid-cols-3 gap-3">
                        {(['Morning', 'Afternoon', 'Evening'] as const).map((time) => {
                          const isChecked = formData.preferredTime === time;
                          return (
                            <label
                              key={time}
                              className={`flex items-center justify-center min-h-[44px] px-3 border rounded-[4px] text-sm font-medium cursor-pointer transition-colors select-none ${
                                isChecked
                                  ? 'border-[#131313] bg-[#131313] text-white'
                                  : 'border-[#e5e7eb] bg-white text-[#131313] hover:border-[#131313]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="preferredTime"
                                value={time}
                                checked={isChecked}
                                onChange={() => handleChange('preferredTime', time)}
                                className="sr-only"
                              />
                              <span>{time}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes (Max 300 chars, Live Counter) */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="notes"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#131313]"
                        >
                          Notes <span className="text-[#666666] font-normal lowercase">(optional)</span>
                        </label>
                        <span className="text-[11px] font-mono text-[#666666]">
                          {formData.notes.length}/300
                        </span>
                      </div>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        maxLength={300}
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        onBlur={() => handleBlur('notes')}
                        aria-invalid={!!errors.notes}
                        aria-describedby={errors.notes ? 'notes-error' : undefined}
                        className="w-full p-3.5 text-base border border-[#e5e7eb] rounded-[4px] bg-white text-[#131313] focus:outline-none focus:border-[#131313] focus:ring-1 focus:ring-[#131313]"
                        placeholder="Mention any specific haircut, color requests, or preferences..."
                      />
                      {errors.notes && (
                        <p id="notes-error" role="alert" className="text-xs text-[#d92d20] mt-1">
                          {errors.notes}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={isSubmitting}
                        showArrow
                      >
                        {isSubmitting ? 'Submitting...' : 'Request appointment'}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                /* SUCCESS CONFIRMATION PANEL (DEMO MODE TRANSPARENCY) */
                <div className="py-6 text-center animate-in fade-in duration-300">
                  {/* Drawing animated checkmark */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#131313] mx-auto flex items-center justify-center mb-6">
                    <svg
                      className="w-8 h-8 text-[#131313] animate-stroke-draw"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-normal text-[#131313] tracking-[-0.04em] mb-2">
                    Request Received
                  </h3>

                  {/* Clear Demo Mode Disclaimer per Part E */}
                  <div className="p-4 bg-[#f8f8f8] border border-[#e5e7eb] rounded-[4px] text-sm text-[#131313] mb-6 text-left">
                    <p className="font-semibold text-xs uppercase tracking-wider text-[#666666] mb-1">
                      Demo Mode Notice
                    </p>
                    <p className="mb-2">
                      <strong>Demo only – no message was sent.</strong>
                    </p>
                    <p className="text-[#666666]">
                      To schedule with Ken or Debra, please call the studio directly at {SALON_DATA.phone.display}.
                    </p>
                  </div>

                  {/* Summary of entered details */}
                  <div className="border border-[#e5e7eb] rounded-[4px] p-4 text-left text-xs space-y-1.5 mb-6 text-[#666666]">
                    <div>
                      <strong className="text-[#131313]">Name:</strong> {formData.fullName}
                    </div>
                    <div>
                      <strong className="text-[#131313]">Phone:</strong> {formData.phone}
                    </div>
                    <div>
                      <strong className="text-[#131313]">Service:</strong> {formData.service}
                    </div>
                    <div>
                      <strong className="text-[#131313]">Timing:</strong> {formData.preferredDay} ({formData.preferredTime})
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button
                      href={SALON_DATA.phone.telLink}
                      variant="primary"
                      fullWidth
                      showArrow
                    >
                      Call Now to Book
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          service: SALON_DATA.services[0].name,
                          preferredDay: 'Monday',
                          preferredTime: 'Morning',
                          notes: '',
                          honeyPot: '',
                        });
                      }}
                      className="text-xs font-semibold text-[#666666] hover:text-[#131313] underline py-2"
                    >
                      Send another request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
