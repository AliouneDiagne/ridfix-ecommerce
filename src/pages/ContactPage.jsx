import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// --- Styled Components ---
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

const CalendarWrapper = styled(FullWidth)`
  .react-calendar {
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-family: inherit;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
  .react-calendar__navigation button {
    color: ${({ theme }) => theme.colors.primary};
  }
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.colors.primary} !important;
    color: ${({ theme }) => theme.colors.onPrimary} !important;
  }
`;

// --- Validazione con Yup ---
const schema = yup.object({
  name: yup.string().max(100, 'Name cannot exceed 100 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9\s-()+.ext]+$/, 'Invalid phone number format'),
  message: yup.string().max(500, 'Message cannot exceed 500 characters'),
});

/**
 * ContactPage Component
 * Form per contatto o prenotazione, con calendario integrato.
 */
export default function ContactPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted:', { ...data, appointmentDate: selectedDate.toISOString().split('T')[0] });
        toast.success('Thank you! We will contact you shortly.');
        reset();
        setSelectedDate(new Date());
        resolve();
      }, 1500);
    });
  };

  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <Subtitle>
        Need help choosing a part or booking an appointment? Fill out the form and we’ll assist you shortly.
      </Subtitle>
      <FormGrid onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Your Name (Optional)"
          type="text"
          name="name"
          {...register('name')}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          {...register('email')}
          error={errors.email?.message}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          {...register('phone')}
          error={errors.phone?.message}
          required
        />
        <FullWidth>
          <label>Message / Appointment Details (Optional)</label>
          <Input
            as="textarea"
            name="message"
            rows="4"
            {...register('message')}
            error={errors.message?.message}
          />
        </FullWidth>
        <CalendarWrapper>
          <label>Preferred Appointment Date</label>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </CalendarWrapper>
        <FullWidth>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Request'}
          </Button>
        </FullWidth>
      </FormGrid>
    </ContactContainer>
  );
}
