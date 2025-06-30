// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

/* ------------------------------------------------------------------ */
/*  Styled                                                            */
/* ------------------------------------------------------------------ */
const ContactContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 800px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing(3)};
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font: inherit;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
`;

const SelectLabel = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const DateTimeWrapper = styled(FullWidth)`
  .react-datetime-picker {
    width: 100%;
  }
  .react-calendar {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
  .react-datetime-picker__wrapper {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 0.5rem;
  }
`;

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */
const SUBJECTS = [
  'Product Inquiry',
  'Order Status',
  'Technical Support',
  'Return / Exchange',
  'Other',
];

const SERVICES = [
  'Maintenance',
  'Performance Tuning',
  'Custom Build',
  'Diagnostics',
  'Consultation',
];

/* ------------------------------------------------------------------ */
/*  Validation schema                                                 */
/* ------------------------------------------------------------------ */
const schema = yup.object({
  name: yup.string().max(100, 'Name cannot exceed 100 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9\s\-()+.ext]+$/, 'Invalid phone number format'),
  subject: yup.string().required('Please choose a subject'),
  service: yup.string().required('Please choose a service'),
  message: yup.string().max(500, 'Message cannot exceed 500 characters'),
});

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  const [appointmentDate, setAppointmentDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: SUBJECTS[0],
      service: SERVICES[0],
    },
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted:', {
          ...data,
          appointmentDate: appointmentDate.toISOString(),
        });
        toast.success('Thank you! We will contact you shortly.');
        reset();
        setAppointmentDate(new Date());
        resolve();
      }, 1500);
    });
  };

  return (
    <ContactContainer>
      <Title>Contact&nbsp;Us</Title>
      <Subtitle>
        Need help choosing a part or booking an appointment? Fill out the form
        and we’ll assist you shortly.
      </Subtitle>

      <FormGrid onSubmit={handleSubmit(onSubmit)}>
        {/* ------------ Name ------------- */}
        <Input
          label="Your Name (Optional)"
          type="text"
          icon={<FaUser />}
          {...register('name')}
          error={errors.name?.message}
        />

        {/* ------------ Email ------------- */}
        <Input
          label="Email"
          type="email"
          icon={<FaEnvelope />}
          {...register('email')}
          error={errors.email?.message}
          required
        />

        {/* ------------ Phone ------------- */}
        <Input
          label="Phone Number"
          type="tel"
          icon={<FaPhone />}
          {...register('phone')}
          error={errors.phone?.message}
          required
        />

        {/* ------------ Subject ------------- */}
        <div>
          <SelectLabel htmlFor="subject">Subject</SelectLabel>
          <Select id="subject" {...register('subject')}>
            {SUBJECTS.map((opt) => (
              <option value={opt} key={opt}>
                {opt}
              </option>
            ))}
          </Select>
          {errors.subject && (
            <small style={{ color: 'red' }}>{errors.subject.message}</small>
          )}
        </div>

        {/* ------------ Service ------------- */}
        <div>
          <SelectLabel htmlFor="service">Service Required</SelectLabel>
          <Select id="service" {...register('service')}>
            {SERVICES.map((opt) => (
              <option value={opt} key={opt}>
                {opt}
              </option>
            ))}
          </Select>
          {errors.service && (
            <small style={{ color: 'red' }}>{errors.service.message}</small>
          )}
        </div>

        {/* ------------ Message ------------- */}
        <FullWidth>
          <SelectLabel htmlFor="message">
            Message / Appointment Details (Optional)
          </SelectLabel>
          <Input
            as="textarea"
            id="message"
            rows="4"
            {...register('message')}
            error={errors.message?.message}
          />
        </FullWidth>

        {/* ------------ Date-Time Picker ------------- */}
        <DateTimeWrapper>
          <SelectLabel>Preferred Appointment Date &amp; Time</SelectLabel>
          <DateTimePicker
            onChange={setAppointmentDate}
            value={appointmentDate}
            format="dd/MM/yyyy HH:mm"
            locale="en-GB"
            disableClock={false}
          />
        </DateTimeWrapper>

        {/* ------------ Submit ------------- */}
        <FullWidth>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Submit Request'}
          </Button>
        </FullWidth>
      </FormGrid>
    </ContactContainer>
  );
}
