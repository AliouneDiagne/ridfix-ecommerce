import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Calendar from 'react-calendar';

export default function ContactForm() {
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const contactData = { ...data, appointmentDate: date.toISOString() };
    toast.success('Richiesta inviata con successo!');
    console.log('Contatto:', contactData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Nome</label>
      <input {...register('name')} />

      <label>Email*</label>
      <input type="email" {...register('email', { required: true })} />

      <label>Telefono*</label>
      <input type="tel" {...register('phone', { required: true })} />

      <label>Messaggio</label>
      <textarea {...register('message')} />

      <label>Data appuntamento</label>
      <Calendar value={date} onChange={setDate} />

      <button type="submit">Invia</button>
    </form>
  );
}
