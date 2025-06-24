// src/pages/checkout/SuccessPage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button'; // Import the reusable Button component

// Styles using Styled Components for the page container
const Wrap = styled.div`
  padding: ${({ theme }) => theme.spacing(4)}; /* Adds padding based on theme */
  text-align: center; /* Centers the content */
  max-width: 600px; /* Limits width for better readability */
  margin: auto; /* Centers the page horizontally */
  background-color: ${({ theme }) => theme.colors.lightBg}; /* Light background from theme */
  border-radius: ${({ theme }) => theme.borderRadius}; /* Rounded borders */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Shadow for depth */
  color: ${({ theme }) => theme.colors.text}; /* Text color */
`;

// Styles for the page title
const Title = styled.h1`
  font-size: 2.5rem; /* Font size for the title */
  color: ${({ theme }) => theme.colors.primary}; /* Primary theme color (orange) */
  margin-bottom: ${({ theme }) => theme.spacing(2)}; /* Space below the title */
`;

// Styles for the confirmation message
const Message = styled.p`
  font-size: 1.1rem; /* Font size for the message */
  margin-bottom: ${({ theme }) => theme.spacing(4)}; /* Space below the message */
  line-height: 1.6; /* Line height for readability */
`;

/**
 * SuccessPage Component
 * Displays an order confirmation message after a successful checkout.
 * Redirects the user to the homepage via a button.
 */
export default function SuccessPage() {
  return (
    <Wrap>
      <Title>Order Confirmed 🎉</Title> {/* Confirmation title with emoji */}
      <Message>
        Thank you for your purchase! You will receive a confirmation email shortly with all the details of your order.
      </Message>
      {/* Link for "Back to Home" button */}
      <Link to="/">
        <Button>Back to Home</Button> {/* Uses the reusable Button component for redirection */}
      </Link>
    </Wrap>
  );
}