"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";

import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import { submitContactForm } from "@/lib/contactForm";

const options = [
  "Complete Dentures",
  "Partial Dentures",
  "Repairs & Relines",
  "Rebases",
  "CDCP Consultation",
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
  const router = useRouter();

  const className =
    "h-12.5 text-sm w-full rounded-full border border-white/10 bg-white-blue/50 px-6 text-white placeholder:text-white-blue/70 outline-none backdrop-blur-sm focus:border-white";

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
    } else if (!/^[0-9()+\-\s]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
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

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await submitContactForm(formId, form);

      console.log("Contact form response:", result);

      // Successfully sent
      if (result.status === "mail_sent") {
        router.push("/thank-you");
        return;
      }

      // Validation / API error
      setStatus(result.message || "Unable to send message.");
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="rounded-2xl bg-white/20 p-5">
        <span className="text-[10px] uppercase text-white-blue">
          {data.tagline}
        </span>

        <Heading className="font-bold! uppercase leading-none! text-white-blue">
          {data.title}
        </Heading>

        <p className="mt-2 text-sm text-white-blue">
          {data.description}
        </p>

        <div className="grid grid-cols-1 gap-x-10">
          <div>
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-4"
            >
              {/* Full Name + Phone */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={className}
                  />

                  {errors.fullName && (
                    <p className="ml-4 mt-2 text-sm text-red-300">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className={className}
                  />

                  {errors.phone && (
                    <p className="ml-4 mt-2 text-sm text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@gmail.com"
                    className={className}
                  />

                  {errors.email && (
                    <p className="ml-4 mt-2 text-sm text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Service */}
              <div className="relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={`appearance-none ${className}`}
                >
                  <option value="">
                    Select service
                  </option>

                  {options.map((service) => (
                    <option
                      key={service}
                      value={service}
                      className="text-secondary"
                    >
                      {service}
                    </option>
                  ))}
                </select>

                <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-white" />

                {errors.service && (
                  <p className="ml-4 mt-2 text-sm text-red-300">
                    {errors.service}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="h-44 w-full resize-none rounded-3xl border border-white/10 bg-white-blue/50 p-6 text-white outline-none placeholder:text-white-blue/70"
                />

                {errors.message && (
                  <p className="ml-4 mt-2 text-sm text-red-300">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  color="white"
                  variant="solid"
                  rounded="full"
                  arrow
                  arrowStyle="circle"
                  className="pr-1"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </Button>
              </div>

              {/* Status */}
              {status && (
                <p
                  className={`text-center text-sm ${
                    status
                      .toLowerCase()
                      .includes("success")
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

      {/* Privacy text */}
      <p className="mt-4 text-sm text-white-blue/50 lg:pr-25">
        {data.privacyText}
      </p>
    </div>
  );
}
