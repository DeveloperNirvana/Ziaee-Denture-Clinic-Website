'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import Container from './Container';
import AppointmentForm from './AppointmentForm';
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
  return (
    <section ref={sectionRef} className="relative overflow-hidden space-py">
      <motion.div style={{ y }} className="absolute inset-0 scale-115">
        <Image src={appointmentData.backgroundImage} alt={appointmentData.title} fill priority className="object-cover" />
      </motion.div>
      <Container className="z-10 relative">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white/20 p-5 sm:p-8 lg:p-12">
          <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-white-blue text-center lg:text-left">{appointmentData.tag}</p>
          <h2 className="mb-2 text-4xl font-bold uppercase leading-[1.1] text-white-blue lg:text-[40px]  text-center lg:text-left">
            {appointmentData.title}
          </h2>
          <p className="text-white-blue text-sm text-center lg:text-left">{appointmentData.description}</p>
          <div className="grid gap-10 grid-cols-1 mt-10">
            <AppointmentForm formId={339} />
          </div>
        </div>
      </Container>
    </section>
  );
}
