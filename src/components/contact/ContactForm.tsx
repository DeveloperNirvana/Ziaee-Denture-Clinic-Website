'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import Button from '@/components/common/Button';
import Heading from '@/components/common/Heading';
import { submitContactForm } from '@/lib/contactForm';

const options = [
  'Complete Dentures',
  'Partial Dentures',
  'Repairs & Relines',
  'Rebases',
  'CDCP Consultation',
];

interface ContactFormProps {
  data: {
    tagline: string;
    title: string;
    description: string;
    privacyText: string;
  };

  formId: number;
}

export default function ContactForm({
  data,
  formId,
}: ContactFormProps) {
  const className =
    'h-12.5 text-sm w-full rounded-full border border-white/10 bg-white-blue/50 px-6 text-white placeholder:text-white-blue/70 outline-none backdrop-blur-sm focus:border-white';

const [form, setForm] = useState({
  fullName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
});

const [errors, setErrors] = useState({
  fullName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [status, setStatus] = useState("");

const validateForm = () => {
  const newErrors = {
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  };

  let isValid = true;

  // Full Name
  if (!form.fullName.trim()) {
    newErrors.fullName = "Full name is required.";
    isValid = false;
  }

  // Phone
  if (!form.phone.trim()) {
    newErrors.phone = "Phone number is required.";
    isValid = false;
  } else if (!/^[0-9()+\-\s]{10,12}$/.test(form.phone)) {
    newErrors.phone = "Please enter a valid phone number.";
    isValid = false;
  }

  // Email
  if (!form.email.trim()) {
    newErrors.email = "Email is required.";
    isValid = false;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
  ) {
    newErrors.email = "Please enter a valid email address.";
    isValid = false;
  }

  // Service
  if (!form.service) {
    newErrors.service = "Please select a service.";
    isValid = false;
  }

  // Message
  if (!form.message.trim()) {
    newErrors.message = "Message is required.";
    isValid = false;
  }

  setErrors(newErrors);

  return isValid;
};


const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  setStatus("");

  if (!validateForm()) return;

  setLoading(true);

  try {
    const result = await submitContactForm(formId, form);

    if (result.status === "mail_sent") {
      setStatus("Message sent successfully.");

      setForm({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      setErrors({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } else {
      setStatus(result.message || "Unable to send message.");
    }
  } catch {
    setStatus("Something went wrong. Please try again.");
  }

  setLoading(false);
}

  return (
    <div>
      <div className="rounded-2xl bg-white/20 p-5">
        <span className="text-[10px] uppercase text-white-blue">
          {data.tagline}
        </span>

        <Heading className="text-white-blue font-bold! uppercase leading-none!">
          {data.title}
        </Heading>
         <p className="mt-2 text-white-blue text-sm">
              {data.description}
            </p>

        <div className="grid gap-x-10 grid-cols-1">
         

          <div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
               <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className={className}
            />

        {errors.fullName && (
          <p className="mt-2 ml-4 text-sm text-red-300">
            {errors.fullName}
          </p>
        )}
</div>
<div>
            <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className={className}
                />
                {errors.phone && (
                  <p className="mt-2 ml-4 text-sm text-red-300">
                    {errors.phone}
                  </p>
                )}
                </div>
              </div>
          <div className="grid gap-4 md:grid-cols-1">
              <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@gmail.com"
              className={className}
            />

        {errors.email && (
          <p className="mt-2 ml-4 text-sm text-red-300">
            {errors.email}
          </p>
        )}
      </div>
  <div className="relative">
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={`appearance-none ${className}`}
        >
          <option value="">Select service</option>

          {options.map((service) => (
            <option key={service} value={service} className="text-secondary">
              {service}
            </option>
          ))}
        </select>

  <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-white" />

  {errors.service && (
    <p className="mt-2 ml-4 text-sm text-red-300">
      {errors.service}
    </p>
  )}
</div>

            <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full rounded-3xl border border-white/10 bg-white-blue/50 p-6 text-white outline-none h-44 resize-none"
              />

              {errors.message && (
                <p className="mt-2 ml-4 text-sm text-red-300">
                  {errors.message}
                </p>
                )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="white"
                  variant="solid"
                  rounded="full"
                  arrow
                  arrowStyle="circle"
                  className="pr-1"
                >
                  {loading ? 'Sending...' : 'Submit'}
                </Button>
              </div>

              {status && (
                 <p
      className={`text-center text-sm ${
        status.toLowerCase().includes("success")
          ? "text-green-300"
          : "text-red-300"
      }`}
    >
      {status}
    </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-white-blue/50 lg:pr-25">
        {data.privacyText}
      </p>
    </div>
  );
}