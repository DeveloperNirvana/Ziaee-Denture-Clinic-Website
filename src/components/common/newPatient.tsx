'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../common/Container';
import Heading from '../common/Heading';
import PatientForm from './PatientForm';
export interface NewPatientData {
  backgroundImage: string;
  title: {
    highlight: string;
    text: string;
  };
  description: string;
  button: {
    label: string;
  };
  fields: {
    name: string;
    placeholder: string;
    type: string;
    fullWidth?: boolean;
  }[];
}
interface NewPatientProps {
  data: NewPatientData;
}
export default function NewPatient({ data }: NewPatientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);
 
  return (
    <section ref={sectionRef} className="relative space-py overflow-hidden">
      <motion.div
        style={{
          y: imageY
        }}
        className="absolute inset-0">
        <Image src={data.backgroundImage} alt={data.title.text} fill className="object-cover scale-120" />
      </motion.div>
      <div className="absolute inset-0 bg-secondary/65" />
      <div className="relative">
        <Container>
          <div className="grid gap-y-6 gap-10 grid-cols-1 text-center max-w-200 mx-auto">
            <div className="max-w-190 text-white mx-auto">
              <Heading as="h2" variant="xxl" className="uppercase text-white">
                <span className="font-bold">{data.title.highlight}</span> {data.title.text}
              </Heading>
              <p className="mt-2 text-white/90">{data.description}</p>
            </div>
            <PatientForm formId={340} data={data} />
          </div>
        </Container>
      </div>
    </section>
  );
}
