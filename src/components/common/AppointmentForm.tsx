
'use client';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import Button from './Button';
import { submitAppointmentForm } from '@/lib/appointmentForm';
const className =
  'h-12.5 text-sm rounded-4xl w-full border border-white/0 duration-500 bg-white-blue/50 px-6 text-white-blue outline-none placeholder:text-white-blue/70 focus:border-white';

const appointmentData = {
 
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

interface Props { formId:number; }

export default function AppointmentForm({formId}:Props){
 const [form,setForm]=useState({fullName:'',phone:'',email:'',service:'',message:''});
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [loading,setLoading]=useState(false);
 const [status,setStatus]=useState('');

 const validate=()=>{
   const e:Record<string,string>={};
   if(!form.fullName.trim()) e.fullName='Full name is required.';
   if(!form.phone.trim()) e.phone='Phone number is required.';
   else if(!/^[0-9()+\-\s]{7,20}$/.test(form.phone)) e.phone='Invalid phone number.';
   if(!form.email.trim()) e.email='Email is required.';
   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) e.email='Invalid email.';
   if(!form.service) e.service='Please select a service.';
   if(!form.message.trim()) e.message='Message is required.';
   setErrors(e);
   return Object.keys(e).length===0;
 };

 const handleChange=(e:any)=>{
   const {name,value}=e.target;
   setForm(p=>({...p,[name]:value}));
   setErrors(p=>({...p,[name]:''}));
 };

 const handleSubmit=async(e:any)=>{
   e.preventDefault();
   setStatus('');
   if(!validate()) return;
   setLoading(true)
   try{
     const res=await submitAppointmentForm(formId,form);
     if(res.status==='mail_sent'){
       setStatus('Message sent successfully.');
       setForm({fullName:'',phone:'',email:'',service:'',message:''});
     }else setStatus(res.message||'Unable to send message.');
   }catch{
     setStatus('Something went wrong.');
   }finally{
     setLoading(false);
   }
 };

 return (
<form onSubmit={handleSubmit} className="space-y-4">
  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <input
        type="text"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder={appointmentData.fields.fullName.placeholder}
        className={className}
      />
      {errors.fullName && (
        <p className="mt-1 text-sm text-red-300">
          {errors.fullName}
        </p>
      )}
    </div>

    <div>
      <input
        type="tel"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder={appointmentData.fields.phoneNumber.placeholder}
        className={className}
      />
      {errors.phone && (
        <p className="mt-1 text-sm text-red-300">
          {errors.phone}
        </p>
      )}
    </div>
  </div>

  <div>
    <input
      type="email"
      name="email"
      value={form.email}
      onChange={handleChange}
      placeholder={appointmentData.fields.email.placeholder}
      className={className}
    />

    {errors.email && (
      <p className="mt-1 text-sm text-red-300">
        {errors.email}
      </p>
    )}
  </div>

  <div>
    <div className="relative">
      <select
        name="service"
        value={form.service}
        onChange={handleChange}
        className={`appearance-none ${className}`}
      >
        <option value="">
          {appointmentData.fields.service.placeholder}
        </option>

        {appointmentData.fields.service.options.map((option) => (
          <option
            key={option}
            value={option}
            className="text-secondary"
          >
            {option}
          </option>
        ))}
      </select>

      <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-white" />
    </div>

    {errors.service && (
      <p className="mt-1 text-sm text-red-300">
        {errors.service}
      </p>
    )}
  </div>

 <div>
  <input
    type="text"
    name="message"
    value={form.message}
    onChange={handleChange}
    placeholder={appointmentData.fields.message.placeholder}
    className={className}
  />

  {errors.message && (
    <p className="mt-1 text-sm text-red-300">
      {errors.message}
    </p>
  )}
</div>

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
      {loading
        ? "Submitting..."
        : appointmentData.submitButton.text}
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
 );
}
