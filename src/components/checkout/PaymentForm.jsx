
src/components/checkout/PaymentForm.jsx
Form per i dati di pagamento.47...
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { toast } from 'react-toastify';
import formatPrice from '../../utils/formatPrice';

/**
 * Schema di validazione per il form di pagamento con Yup. [58, 81]
 */
const paymentSchema = yup.object().shape({
  cardName: yup.string().required('Name on card is required'),
  cardNumber: yup.string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiry: yup.string()
    .matches(/^(0[82-90]|1[82, 83])\/\d{2}$/, 'Expiry date must be MM/YY')
    .required('Expiry date is required'),
  cvv: yup.string()
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required'),
});

/**
 * Componente PaymentForm.
 * Gestisce l'inserimento dei dati di pagamento (mock UI per Stripe/PayPal). [83]
 */
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-width: 600px;
  margin: auto;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const PaymentForm = ({ onNext, onBack, total }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(paymentSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Simulazione di un pagamento. In un'app reale, si integrerebbe con un gateway di pagamento. [58]
      console.log('Payment Data:', data);
      toast.success(`Payment of ${formatPrice(total)} processed successfully!`);
      onNext(); // Passa al prossimo step [76]
    } catch (error) {
      toast.error('Error processing payment.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="Name on Card"
        name="cardName"
        {...register('cardName')}
        error={errors.cardName?.message}
      />
      <Input
        label="Card Number"
        name="cardNumber"
        {...register('cardNumber')}
        error={errors.cardNumber?.message}
      />
      <Input
        label="Expiry Date (MM/YY)"
        name="expiry"
        placeholder="MM/YY"
        {...register('expiry')}
        error={errors.expiry?.message}
      />
      <Input
        label="CVV"
        name="cvv"
        type="password"
        {...register('cvv')}
        error={errors.cvv?.message}
      />
      <ButtonGroup>
        <Button type="button" onClick={onBack}>Back</Button>
        <Button type="submit">Pay {formatPrice(total)}</Button>
      </ButtonGroup>
    </FormContainer>
  );
};

export default PaymentForm;