// src/pages/AboutPage.jsx
import React from 'react';
import styled from 'styled-components';

// --- Styled Components ---
const AboutContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  max-width: 900px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing(3)};
  justify-items: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const BrandLogo = styled.img`
  max-width: 100px;
  height: auto;
  filter: grayscale(100%);
  transition: filter 0.3s ease-in-out;

  &:hover {
    filter: grayscale(0%);
  }
`;

// --- Lista mock dei brand partner (immagini in public/images/brands) ---
const brands = [
  { id: 1, name: 'Polini', logo: '/images/brands/polini.png' },
  { id: 2, name: 'Malossi', logo: '/images/brands/malossi.png' },
  { id: 3, name: 'Piaggio', logo: '/images/brands/piaggio.png' },
  { id: 4, name: 'Yamaha', logo: '/images/brands/yamaha.png' },
  { id: 5, name: 'Aprilia', logo: '/images/brands/aprilia.png' },
  { id: 6, name: 'Bosch', logo: '/images/brands/bosch.png' },
  { id: 7, name: 'Akrapovic', logo: '/images/brands/akrapovic.png' },
  { id: 8, name: 'Michelin', logo: '/images/brands/michelin.png' },
  { id: 9, name: 'Brembo', logo: '/images/brands/brembo.png' },
  { id: 10, name: 'Dellorto', logo: '/images/brands/dellorto.png' },
  { id: 11, name: 'Arrow', logo: '/images/brands/arrow.png' },
  { id: 12, name: 'NGK', logo: '/images/brands/ngk.png' },
];

// --- Component ---
export default function AboutPage() {
  return (
    <AboutContainer>
      <SectionTitle>About Us</SectionTitle>
      <IntroText>
        Ridfix is your trusted online store for scooter and moped spare parts and accessories.
      </IntroText>

      <Paragraph>
        With years of experience in the two-wheel industry, we carefully select high-quality components
        from leading brands to ensure the safety, performance, and style of your vehicle.
      </Paragraph>
      <Paragraph>
        Our mission is to make the purchase of spare parts simple, fast and affordable.
        Every product is chosen with care, and our customer service is ready to support you before and after every order.
      </Paragraph>
      <Paragraph>
        For any questions, feel free to <a href="/contact" style={{ color: 'inherit', textDecoration: 'underline' }}>contact us</a> or write to <a href="mailto:assistance@ridfix.it" style={{ color: 'inherit', textDecoration: 'underline' }}>assistance@ridfix.it</a>.
        Our team is available 7 days a week.
      </Paragraph>

      <SectionTitle>Our Trusted Brands</SectionTitle>
      <IntroText>
        We proudly collaborate with the most respected names in the industry, mainly from Italy and Europe.
      </IntroText>
      <BrandGrid>
        {brands.map((brand) => (
          <div key={brand.id} title={brand.name}>
            <BrandLogo src={brand.logo} alt={`${brand.name} Logo`} />
          </div>
        ))}
      </BrandGrid>
    </AboutContainer>
  );
}
