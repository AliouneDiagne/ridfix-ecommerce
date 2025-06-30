// src/pages/Policy.jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

export default function PolicyPage() {
  return (
    <Container>
      <Title>Policies & Legal Information</Title>

      <Section>
        <SectionTitle>1. Privacy Policy</SectionTitle>
        <Paragraph>
          At Ridfix we respect your privacy. We collect only the data strictly necessary to process orders
          and improve our services. This includes your name, shipping address, email, phone number, and payment details.
          Your data is used solely for order fulfillment, customer support, communication, and,
          if opted-in, for marketing updates. We guarantee your data is stored securely and
          is never sold to third parties, in compliance with GDPR and local regulations.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Terms & Conditions</SectionTitle>
        <Paragraph>
          By using the Ridfix website, you agree to these terms. All orders are subject to stock availability.
          Ridfix reserves the right to refuse or cancel any order for any reason, with a full refund provided
          if payment has already been made. It is the customer's responsibility to verify the compatibility
          of spare parts with their vehicle before installation. Ridfix is not liable for any damages arising
          from incorrect installation or incompatibility.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>3. Warranty & Returns</SectionTitle>
        <Paragraph>
          All parts sold by Ridfix come with a 12-month warranty against manufacturing defects from the date of purchase.
          If a part is defective, please contact our support team with proof of purchase and images of the defect.
          Returns and exchanges are accepted within 14 days of delivery, provided the item is in its original condition
          and packaging. A pre-paid shipping label will be provided for approved returns.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Shipping Policy</SectionTitle>
        <Paragraph>
          Ridfix offers worldwide shipping. Estimated delivery times are 2-5 business days for domestic orders
          and 7-20 business days for international orders. Shipping is free for orders over €100 within the EU.
          Tracking details will be sent to your email once the order has shipped. Please note that customs duties
          and taxes for international shipments are the responsibility of the customer.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. Cookie Policy</SectionTitle>
        <Paragraph>
          We use cookies and similar technologies to enhance your browsing experience, remember your preferences,
          and analyze site usage. By continuing to use our website, you consent to our use of cookies.
          You can manage your cookie preferences through your browser settings. Disabling non-essential cookies
          may affect certain functionalities, such as remembering items in your cart.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. Contact Us</SectionTitle>
        <Paragraph>
          Questions or concerns about these policies? Reach out to our support team:
        </Paragraph>
        <Paragraph>
          <strong>Email:</strong> support@ridfix.com<br />
          <strong>Phone:</strong> +39 0123 456789
        </Paragraph>
      </Section>
    </Container>
  );
}