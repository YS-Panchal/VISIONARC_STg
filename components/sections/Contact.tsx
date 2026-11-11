'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const SERVICES = [
  { value: 'architecture', label: 'Architecture' },
  { value: 'hospitality', label: 'Hospitality Architecture' },
  { value: 'interior', label: 'Interior Design' },
  { value: 'renovation', label: 'Renovation & Planning' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    service: 'architecture',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const messageMaxLen = 500;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validation logic
  const validateField = (name: keyof FormState, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Please enter your name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Please enter your email.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address.';
        }
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Please enter your phone number.';
        if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,16}$/.test(value.trim())) {
          return 'Please enter a valid phone number.';
        }
        return undefined;
      case 'service':
        if (!value) return 'Please select a service.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Please tell us about your project.';
        if (value.trim().length < 5) return 'Message must be at least 5 characters.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    };
    setTouched(allTouched);

    const newErrors: FormErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      service: validateField('service', formData.service),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => !!err);
    if (hasError) {
      const firstErrorKey = Object.keys(newErrors).find((k) => !!newErrors[k as keyof FormErrors]);
      if (firstErrorKey) {
        const idMap: Record<string, string> = {
          fullName: 'Full-Name',
          email: 'Customer-Email',
          phone: 'Phone-Number',
          service: 'Service-Button',
          message: 'Customer-Message',
        };
        const el = document.getElementById(idMap[firstErrorKey]);
        if (el) el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ffffe7b6-8161-4c0a-bee0-0982d80668c6',
          subject: `New Project Enquiry from ${formData.fullName} - Vision Architecture`,
          from_name: 'Vision Architecture Website',
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: SERVICES.find((s) => s.value === formData.service)?.label || formData.service,
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        message: 'Something went wrong. Please try again or reach out directly.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: 'architecture',
      message: '',
    });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  };

  const currentServiceLabel =
    SERVICES.find((s) => s.value === formData.service)?.label || 'Select a service';

  return (
    <>
      <section id="contact" className="section contact_section">
        <div className="contact_container">
          <div className="contact_space_top"></div>

          {/* Section Header */}
          <div className="contact_header_block">
            <h2 className="contact_main_title">Let&apos;s Talk</h2>
            <p className="contact_subtitle">
              Share your ideas with us. We&apos;d love to hear about your project and explore how we
              can create meaningful spaces together.
            </p>
          </div>

          {/* Form Card (Full screen width fit as before) */}
          <div className="contact-us-form">
            {isSuccess ? (
              <div className="contact_success_wrapper" role="alert">
                <div className="contact_success_box">
                  <div className="contact_success_icon_wrap">
                    <CheckCircle2 size={36} className="contact_success_icon" />
                  </div>
                  <div className="contact_success_text_wrap">
                    <h3 className="contact_success_title">Request Sent Successfully!</h3>
                    <p className="contact_success_desc">
                      Thank you for reaching out. We&apos;ve received your message and will get back
                      to you soon.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="contact_reset_button"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                id="wf-form-Contact-Us-Email-Form"
                name="wf-form-Contact-Us-Email-Form"
                onSubmit={handleSubmit}
                noValidate
                className="contact-us-block-wrapper"
              >
                {/* Row 1: Name and Email */}
                <div className="contact-us-flex-container">
                  {/* Name Field */}
                  <div className="contact-us-wrapper-half">
                    <div className="contact_field_group">
                      <label htmlFor="Full-Name" className="field_label">
                        Name <span className="contact_required_star">*</span>
                      </label>
                      <input
                        id="Full-Name"
                        name="Full-Name"
                        type="text"
                        maxLength={256}
                        placeholder="Your Name and Surname"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        aria-invalid={!!(errors.fullName && touched.fullName)}
                        aria-describedby={
                          errors.fullName && touched.fullName ? 'name-error' : undefined
                        }
                        className={`booking-text-field ${
                          errors.fullName && touched.fullName ? 'has_error' : ''
                        }`}
                        required
                      />
                      {errors.fullName && touched.fullName && (
                        <div id="name-error" className="contact_error_message" role="alert">
                          <AlertCircle size={13} className="contact_error_icon" />
                          <span>{errors.fullName}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="contact-us-wrapper-half">
                    <div className="contact_field_group">
                      <label htmlFor="Customer-Email" className="field_label">
                        Email <span className="contact_required_star">*</span>
                      </label>
                      <input
                        id="Customer-Email"
                        name="Customer-Email"
                        type="email"
                        maxLength={256}
                        placeholder="yourname@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        aria-invalid={!!(errors.email && touched.email)}
                        aria-describedby={
                          errors.email && touched.email ? 'email-error' : undefined
                        }
                        className={`booking-text-field ${
                          errors.email && touched.email ? 'has_error' : ''
                        }`}
                        required
                      />
                      {errors.email && touched.email && (
                        <div id="email-error" className="contact_error_message" role="alert">
                          <AlertCircle size={13} className="contact_error_icon" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone Number and Service */}
                <div className="contact-us-flex-container">
                  {/* Phone Field */}
                  <div className="contact-us-wrapper-half">
                    <div className="contact_field_group">
                      <label htmlFor="Phone-Number" className="field_label">
                        Phone Number <span className="contact_required_star">*</span>
                      </label>
                      <input
                        id="Phone-Number"
                        name="Phone-Number"
                        type="tel"
                        maxLength={256}
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        onBlur={() => handleBlur('phone')}
                        aria-invalid={!!(errors.phone && touched.phone)}
                        aria-describedby={
                          errors.phone && touched.phone ? 'phone-error' : undefined
                        }
                        className={`booking-text-field ${
                          errors.phone && touched.phone ? 'has_error' : ''
                        }`}
                        required
                      />
                      {errors.phone && touched.phone && (
                        <div id="phone-error" className="contact_error_message" role="alert">
                          <AlertCircle size={13} className="contact_error_icon" />
                          <span>{errors.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Service Dropdown Field */}
                  <div className="contact-us-wrapper-half" ref={dropdownRef}>
                    <div className="contact_field_group">
                      <label htmlFor="Service-Button" className="field_label">
                        Service <span className="contact_required_star">*</span>
                      </label>
                      <div
                        className={`contact_dropdown_container ${
                          isDropdownOpen ? 'is_open' : ''
                        }`}
                      >
                        <button
                          type="button"
                          id="Service-Button"
                          aria-haspopup="listbox"
                          aria-expanded={isDropdownOpen}
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          onBlur={() => handleBlur('service')}
                          className={`select booking_select_trigger ${
                            errors.service && touched.service ? 'has_error' : ''
                          }`}
                        >
                          <span className="contact_dropdown_selected">{currentServiceLabel}</span>
                          <ChevronDown
                            size={16}
                            className={`select-chevron ${isDropdownOpen ? 'chevron_open' : ''}`}
                            aria-hidden="true"
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <ul className="contact_dropdown_menu" role="listbox">
                            {SERVICES.map((s) => (
                              <li
                                key={s.value}
                                role="option"
                                aria-selected={formData.service === s.value}
                                onClick={() => {
                                  handleChange('service', s.value);
                                  setIsDropdownOpen(false);
                                }}
                                className={`contact_dropdown_item ${
                                  formData.service === s.value ? 'is_selected' : ''
                                }`}
                              >
                                <span>{s.label}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Hidden native select for standard form serialization */}
                        <select
                          id="Service"
                          name="Service"
                          value={formData.service}
                          onChange={(e) => handleChange('service', e.target.value)}
                          tabIndex={-1}
                          className="sr-only"
                          aria-hidden="true"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.service && touched.service && (
                        <div className="contact_error_message" role="alert">
                          <AlertCircle size={13} className="contact_error_icon" />
                          <span>{errors.service}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 3: Message Textarea */}
                <div className="message-title-field-wrapper">
                  <div className="contact_field_group" style={{ width: '100%', position: 'relative' }}>
                    <label htmlFor="Customer-Message" className="field_label">
                      Message Us <span className="contact_required_star">*</span>
                    </label>
                    <div className="contact_textarea_container">
                      <textarea
                        id="Customer-Message"
                        name="Customer-Message"
                        maxLength={messageMaxLen}
                        placeholder="Tell us a little about your project, your ideas or any specific requirements..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={!!(errors.message && touched.message)}
                        aria-describedby={
                          errors.message && touched.message ? 'message-error' : undefined
                        }
                        className={`text-area ${
                          errors.message && touched.message ? 'has_error' : ''
                        }`}
                        required
                      ></textarea>
                      <div
                        className={`contact_char_counter ${
                          formData.message.length >= messageMaxLen ? 'is_max' : ''
                        }`}
                      >
                        {formData.message.length}/{messageMaxLen}
                      </div>
                    </div>
                    {errors.message && touched.message && (
                      <div id="message-error" className="contact_error_message" role="alert">
                        <AlertCircle size={13} className="contact_error_icon" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div style={{ width: '100%', marginTop: '1.25rem' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button submit-button"
                    >
                      {isSubmitting ? (
                        <span className="contact_submit_loading">
                          <Loader2 size={18} className="contact_spinner" />
                          <span>SENDING...</span>
                        </span>
                      ) : (
                        <span className="contact_submit_content">
                          <span>Send Request</span>
                          <ArrowRight size={18} className="contact_submit_arrow" />
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Reassurance text */}
                  <div className="contact_reassurance">
                    <span>Your project details are treated with care. We&apos;ll be in touch soon.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="contact_space_bottom"></div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: contactCSS }} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const contactCSS = `
  .contact_section {
    width: 100%;
    position: relative;
    background-color: transparent;
  }

  .contact_container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
  }

  .contact_space_top {
    min-height: 4.44vw;
  }

  .contact_space_bottom {
    min-height: 4.44vw;
  }

  /* Header Block */
  .contact_header_block {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .contact_main_title {
    font-size: clamp(2.5rem, 5.55vw, 5rem);
    line-height: 1.05;
    font-weight: 400;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    color: #1d2025;
  }

  .contact_subtitle {
    font-family: 'Satoshi', sans-serif;
    font-size: clamp(0.9rem, 1.05vw, 1.12rem);
    line-height: 1.6;
    color: rgba(47, 52, 64, 0.75);
    font-weight: 400;
    max-width: 620px;
    margin: 0.5rem auto 0 auto;
    text-align: center;
  }

  /* Form Card: fits screen width with 5% margins as originally */
  .contact-us-form {
    background: #ffffff;
    border-radius: 1.25rem;
    padding: clamp(1.5rem, 3vw, 2.5rem);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(47, 52, 64, 0.08);
    width: 100%;
    box-sizing: border-box;
  }

  .contact-us-block-wrapper {
    width: 100%;
  }

  .contact-us-flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 0.625rem;
    gap: 1.5rem;
    margin-bottom: 1rem;
    width: 100%;
  }

  .contact-us-wrapper-half {
    flex: 1;
    min-width: calc(50% - 1rem);
    display: flex;
    flex-direction: column;
  }

  .contact_field_group {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }

  /* Labels */
  .field_label {
    color: #6b7280;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.625rem;
    font-family: sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
  }

  .contact_required_star {
    color: #8B2635;
    margin-left: 0.25rem;
    font-size: 0.85rem;
    line-height: 1;
  }

  /* Text inputs: min-height 7svh as original, no icons */
  .booking-text-field {
    border: 1px solid rgba(47, 52, 64, 0.12);
    background-color: #f7f6f3;
    color: #2f3440;
    border-radius: 0.75rem;
    width: 100%;
    min-height: 7svh;
    padding: 0.875rem 1.25rem;
    font-size: 1rem;
    font-weight: 400;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  }

  .booking-text-field::placeholder {
    color: rgba(47, 52, 64, 0.38);
  }

  .booking-text-field:focus {
    border-color: #8B2635;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(139, 38, 53, 0.1);
  }

  .booking-text-field.has_error {
    border-color: #e53e3e;
    background-color: #fffafb;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }

  /* Dropdown container */
  .contact_dropdown_container {
    position: relative;
    width: 100%;
  }

  /* Dropdown Trigger button matching the select styling */
  .select.booking_select_trigger {
    background-color: #f7f6f3;
    color: #2f3440;
    padding: 0.875rem 2.75rem 0.875rem 1.25rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(47, 52, 64, 0.12);
    width: 100%;
    min-height: 7svh;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  }

  .select.booking_select_trigger:focus-visible,
  .contact_dropdown_container.is_open .select.booking_select_trigger {
    border-color: #8B2635;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(139, 38, 53, 0.1);
  }

  .select.booking_select_trigger.has_error {
    border-color: #e53e3e;
    background-color: #fffafb;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }

  .contact_dropdown_selected {
    font-family: 'Satoshi', sans-serif;
    font-size: 1rem;
    color: #2f3440;
    font-weight: 400;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .select-chevron {
    color: #2f3440;
    opacity: 0.5;
    transition: transform 0.25s ease, opacity 0.25s ease, color 0.25s ease;
    flex-shrink: 0;
    margin-left: 0.5rem;
  }

  .select-chevron.chevron_open {
    transform: rotate(180deg);
    opacity: 0.9;
    color: #8B2635;
  }

  /* Floating Dropdown Menu */
  .contact_dropdown_menu {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid rgba(47, 52, 64, 0.1);
    border-radius: 0.75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.4rem;
    margin: 0;
    z-index: 50;
    max-height: 260px;
    overflow-y: auto;
    animation: dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes dropdownFadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .contact_dropdown_item {
    padding: 0.75rem 1rem;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.95rem;
    color: #2f3440;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .contact_dropdown_item:hover {
    background-color: #fdf2f3;
    color: #8B2635;
  }

  .contact_dropdown_item.is_selected {
    background-color: #fbebed;
    color: #8B2635;
    font-weight: 500;
  }

  /* Textarea wrapper & field: min-height 15svh as original, no icons */
  .message-title-field-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 0.625rem;
    width: 100%;
  }

  .contact_textarea_container {
    position: relative;
    width: 100%;
  }

  .text-area {
    border: 1px solid rgba(47, 52, 64, 0.12);
    background-color: #f7f6f3;
    color: #2f3440;
    border-radius: 0.75rem;
    min-height: 15svh;
    width: 100%;
    padding: 0.875rem 1.25rem 2rem 1.25rem;
    font-size: 1rem;
    font-weight: 400;
    box-sizing: border-box;
    outline: none;
    resize: vertical;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  }

  .text-area::placeholder {
    color: rgba(47, 52, 64, 0.38);
  }

  .text-area:focus {
    border-color: #8B2635;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(139, 38, 53, 0.1);
  }

  .text-area.has_error {
    border-color: #e53e3e;
    background-color: #fffafb;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }

  .contact_char_counter {
    position: absolute;
    right: 1rem;
    bottom: 0.65rem;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.72rem;
    color: rgba(47, 52, 64, 0.45);
    font-weight: 500;
    pointer-events: none;
  }

  .contact_char_counter.is_max {
    color: #8B2635;
    font-weight: 600;
  }

  /* Error messages */
  .contact_error_message {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: #e53e3e;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 0.35rem;
    animation: errorSlideDown 0.2s ease-out;
  }

  @keyframes errorSlideDown {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .contact_error_icon {
    flex-shrink: 0;
  }

  /* Submit Button: full width as original */
  .button.submit-button {
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    background-color: var(--charcoal-blue, #2f3440);
    color: #fff;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    border-radius: 0.75rem;
    padding: 1rem 2.5rem;
    font-weight: 500;
    font-size: 1rem;
    width: 100%;
    margin-top: 0.5rem;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    min-height: 3.5rem;
  }

  .button.submit-button:hover:not(:disabled) {
    background-color: #1d2025;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(47, 52, 64, 0.2);
  }

  .button.submit-button:active:not(:disabled) {
    transform: scale(0.99);
  }

  .button.submit-button:disabled {
    background-color: #4b5262;
    cursor: not-allowed;
    opacity: 0.85;
  }

  .contact_submit_content {
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    letter-spacing: 0.12em;
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
  }

  .contact_submit_arrow {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .button.submit-button:hover:not(:disabled) .contact_submit_arrow {
    transform: translateX(4px);
  }

  .contact_submit_loading {
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    letter-spacing: 0.12em;
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
  }

  .contact_spinner {
    animation: contactSpin 1s linear infinite;
  }

  @keyframes contactSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Reassurance Text */
  .contact_reassurance {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Satoshi', sans-serif;
    font-size: clamp(0.75rem, 0.82vw, 0.88rem);
    color: rgba(47, 52, 64, 0.65);
    font-weight: 400;
    text-align: center;
    margin-top: 0.85rem;
    width: 100%;
  }

  /* Success Confirmation Card */
  .contact_success_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: clamp(1.5rem, 2.5vw, 2.5rem) 0.5rem;
    animation: successFadeIn 0.35s ease-out;
  }

  @keyframes successFadeIn {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .contact_success_box {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    background-color: #f0fdf4;
    border: 1px solid rgba(22, 163, 74, 0.22);
    border-radius: 1rem;
    padding: clamp(1.25rem, 2vw, 1.75rem);
    width: 100%;
    box-sizing: border-box;
  }

  .contact_success_icon_wrap {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    background-color: #dcfce7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact_success_icon {
    color: #16a34a;
  }

  .contact_success_text_wrap {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .contact_success_title {
    font-family: var(--font-telegrafico), 'Telegrafico', sans-serif;
    font-size: clamp(1.1rem, 1.35vw, 1.45rem);
    color: #15803d;
    margin: 0;
    letter-spacing: 0.04em;
    font-weight: 500;
  }

  .contact_success_desc {
    font-family: 'Satoshi', sans-serif;
    font-size: clamp(0.85rem, 0.95vw, 1rem);
    color: #166534;
    margin: 0;
    line-height: 1.5;
  }

  .contact_reset_button {
    background: transparent;
    border: 1px solid rgba(47, 52, 64, 0.2);
    color: #2f3440;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    padding: 0.65rem 1.5rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .contact_reset_button:hover {
    border-color: #8B2635;
    color: #8B2635;
    background-color: rgba(139, 38, 53, 0.04);
  }

  /* Responsive styling */
  @media (max-width: 768px) {
    .contact-us-wrapper-half {
      min-width: 100%;
    }

    .contact_subtitle {
      font-size: 0.92rem;
      padding: 0 0.5rem;
    }

    .contact_success_box {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem 1rem;
    }

    .contact_success_text_wrap {
      align-items: center;
    }

    .contact_reassurance {
      font-size: 0.78rem;
    }
  }

  /* Screen-reader utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    .booking-text-field,
    .select.booking_select_trigger,
    .text-area,
    .button.submit-button,
    .contact_submit_arrow,
    .contact_spinner {
      transition: none !important;
      animation: none !important;
    }
  }
`;
