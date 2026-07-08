'use client';
import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { FaChevronDown } from 'react-icons/fa6';
import Container from './Container';
import Button from './Button';

const FORMCARRY_URL = 'https://formcarry.com/s/AdPUAxQ_1cB';
const className =
  'h-12.5 text-sm rounded-4xl w-full border border-white/0 duration-500 bg-white-blue/50 px-6 text-white-blue outline-none placeholder:text-white-blue/70 focus:border-white';
const appointmentData = {
  backgroundImage: '/images/request-an-assessment.jpg',
  tag: '{ APPOINTMENT REQUEST }',
  title: 'Request an assessment',
  description: 'Send us a quick message and we’ll contact you about appointment availability, denture services, or CDCP coverage.',
  fields: {
    fullName: {
      placeholder: 'Full name'
    },
    phoneNumber: {
      placeholder: 'Phone number'
    },
    email: {
      placeholder: 'you@gmail.com'
    },
    service: {
      placeholder: 'Select service',
      options: ['Complete Dentures', 'Partial Dentures', 'Repairs & Relines', 'Rebases', 'CDCP Consultation']
    },
    message: {
      placeholder: 'Enter your message'
    }
  },
  submitButton: {
    text: 'Submit'
  }
};
export default function Appointment() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const response = await fetch(FORMCARRY_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, phone, email, service, message })
      });
      const result = await response.json();
      if (result.code === 200) {
        setStatus('success');
        setFullName('');
        setPhone('');
        setEmail('');
        setService('');
        setMessage('');
      } else {
        setStatus('error');
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }
  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 lg:py-32">
      <motion.div style={{ y }} className="absolute inset-0 scale-115">
        <Image src={appointmentData.backgroundImage} alt={appointmentData.title} fill priority className="object-cover" />
      </motion.div>
      <Container className="z-10 relative">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white/20 p-5 sm:p-8 lg:p-12">
          <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white-blue text-center lg:text-left">{appointmentData.tag}</p>
          <h2 className="mb-2 lg:mb-8 text-4xl font-bold uppercase leading-none text-white-blue lg:text-[40px] lg:max-w-md text-center lg:text-left">
            {appointmentData.title}
          </h2>
          <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
            <div>
              <p className="text-white-blue text-sm text-center lg:text-left">{appointmentData.description}</p>
            </div>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={appointmentData.fields.fullName.placeholder}
                  className={`${className} `}
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={appointmentData.fields.phoneNumber.placeholder}
                  className={`${className} `}
                />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={appointmentData.fields.email.placeholder}
                className={`${className} `}
              />
              <div className="relative">
                <select value={service} onChange={(e) => setService(e.target.value)} className={`appearance-none ${className} `}>
                  <option value="">{appointmentData.fields.service.placeholder}</option>
                  {appointmentData.fields.service.options.map((option) => (
                    <option key={option} value={option} className="text-secondary">
                      {option}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-white" />
              </div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={appointmentData.fields.message.placeholder}
                className={`${className}`}
              />
              {status === 'success' && (
                <p className="text-sm text-white-blue" role="status">
                  Thank you! We received your request and will contact you shortly.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-200" role="alert">
                  {error}
                </p>
              )}
              <div className="flex justify-end xl:pt-10">
                <Button
                  type="submit"
                  color="white"
                  variant="solid"
                  rounded="full"
                  arrow
                  arrowStyle="circle"
                  className="pr-1"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : appointmentData.submitButton.text}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
