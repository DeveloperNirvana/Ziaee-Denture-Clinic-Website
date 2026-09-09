'use client';

import { useState } from 'react';
import Button from './Button';
import { submitPatientForm } from '@/lib/PatientForm';

export interface NewPatientData {
  fields: {
    name: string;
    placeholder: string;
    type: string;
    fullWidth?: boolean;
  }[];
  button: {
    label: string;
  };
}

interface Props {
  formId: number;
  data: NewPatientData;
}

export default function PatientForm({ formId, data }: Props) {
const [form, setForm] = useState({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  message: '',
});

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const textareaField = data.fields.find(
    (field) => field.type === 'textarea'
  );

  const inputFields = data.fields.filter(
    (field) => field.type !== 'textarea'
  );

  const className =
    'h-12.5 rounded-full border border-white-blue bg-white-blue px-5 text-sm text-secondary outline-none w-full';

const validate = () => {
  const e: Record<string, string> = {};

  if (!form.fullName.trim())
    e.fullName = 'Full name is required.';

  if (!form.phone.trim())
    e.phone = 'Phone number is required.';
  else if (!/^[0-9()+\-\s]{7,20}$/.test(form.phone))
    e.phone = 'Invalid phone number.';

  if (!form.email.trim())
    e.email = 'Email is required.';
  else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
  )
    e.email = 'Invalid email address.';

  if (!form.address.trim())
    e.address = 'Address is required.';

  if (!form.city.trim())
    e.city = 'City is required.';

  if (!form.postalCode.trim())
    e.postalCode = 'Postal Code is required.';

  if (!form.message.trim())
    e.message = 'Message is required.';

  setErrors(e);

  return Object.keys(e).length === 0;
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setStatus('');

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await submitPatientForm(formId, form);

      if (res.status === 'mail_sent') {
        setStatus('Message sent successfully.');

       setForm({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  message: '',
});
      } else {
        setStatus(res.message || 'Unable to send message.');
      }
    } catch {
      setStatus('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10">
      <div className="grid gap-3 md:grid-cols-2">
        {inputFields.map((field) => (
          <div
            key={field.name}
            className={field.fullWidth ? 'md:col-span-2' : ''}
          >
           <input
  type={field.type}
  name={field.name}
  placeholder={field.placeholder}
  value={form[field.name as keyof typeof form] ?? ''}
  onChange={handleChange}
  className={className}
/>

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {textareaField && (
        <div className="mt-3">
          <textarea
            name={textareaField.name}
            placeholder={textareaField.placeholder}
            rows={7}
            value={form[textareaField.name as keyof typeof form] ?? ''}
            onChange={handleChange}
            className={`h-40 lg:h-75 w-full resize-none rounded-2xl border border-white-blue bg-white-blue px-5 pt-5 text-sm text-secondary outline-none`}
          />

          {errors.message && (
            <p className="mt-1 text-sm text-red-500">
              {errors.message}
            </p>
          )}
        </div>
      )}

      {status && (
        <p
          className={`mt-4 text-sm ${
            status.includes('success')
              ? 'text-green-600'
              : 'text-red-500'
          }`}
        >
          {status}
        </p>
      )}

      <div className="mt-4 flex justify-end">
  <Button
    type="submit"
    disabled={loading}
    arrow
    arrowStyle="circle"
    rounded="full"
    className="pr-1"
    color="white"
  >
    {loading ? "Sending..." : data.button.label}
  </Button>
</div>
    </form>
  );
}