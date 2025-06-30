// src/pages/AboutPage.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

/* ------------------------------------------------------------------ */
/*  Animation                                                         */
/* ------------------------------------------------------------------ */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ------------------------------------------------------------------ */
/*  Containers & typography                                           */
/* ------------------------------------------------------------------ */
const AboutContainer = styled.article`
  max-width: 960px;
  margin: 4rem auto;
  padding: ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.lightBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out both;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.25rem;
  margin: ${({ theme }) => theme.spacing(5)} 0 ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.primary};
`;

const IntroText = styled.p`
  font-size: 1.15rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

/* ------------------------------------------------------------------ */
/*  Emphasised words & highlighted paragraphs                         */
/* ------------------------------------------------------------------ */
const Emphasis = styled.span`
  color: ${({ theme }) => theme.colors.primaryDark || theme.colors.primary};
  font-weight: 700;
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.paper};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
`;

/* ------------------------------------------------------------------ */
/*  Brand grid                                                        */
/* ------------------------------------------------------------------ */
const BrandGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  justify-items: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const BrandLogoWrapper = styled.div`
  width: 100px;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.paper};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }
`;

const BrandLogo = styled.img`
  max-width: 80%;
  height: auto;
  filter: grayscale(100%);
  transition: filter 0.3s ease-in-out;
  ${BrandLogoWrapper}:hover & {
    filter: grayscale(0%);
  }
`;

/* ------------------------------------------------------------------ */
/*  Closing stats                                                     */
/* ------------------------------------------------------------------ */
const StatsTable = styled.div`
  margin-top: ${({ theme }) => theme.spacing(6)};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StatBox = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  margin-top: 0.25rem;
  font-size: 0.9rem;
`;

/* ------------------------------------------------------------------ */
/*  Mock brand list                                                   */
/* ------------------------------------------------------------------ */
const brands = [
  { id: 1,  name: 'Polini',    logo: '/images/brands/polini.png'    },
  { id: 2,  name: 'Malossi',   logo: '/images/brands/malossi.png'   },
  { id: 3,  name: 'Piaggio',   logo: '/images/brands/piaggio.png'   },
  { id: 4,  name: 'Yamaha',    logo: '/images/brands/yamaha.png'    },
  { id: 5,  name: 'Aprilia',   logo: '/images/brands/aprilia.png'   },
  { id: 6,  name: 'Bosch',     logo: '/images/brands/bosch.png'     },
  { id: 7,  name: 'Akrapovic', logo: '/images/brands/akrapovic.png' },
  { id: 8,  name: 'Michelin',  logo: '/images/brands/michelin.png'  },
  { id: 9,  name: 'Brembo',    logo: '/images/brands/brembo.png'    },
  { id: 10, name: 'Dellorto',  logo: '/images/brands/dellorto.png'  },
  { id: 11, name: 'Arrow',     logo: '/images/brands/arrow.png'     },
  { id: 12, name: 'NGK',       logo: '/images/brands/ngk.png'       },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <AboutContainer>
      {/* ---------- Intro ---------- */}
      <SectionTitle>About&nbsp;Us</SectionTitle>
      <IntroText>
        <strong>Ridfix</strong> is the premier online destination for
        high-performance spare parts and accessories dedicated to scooters
        and mopeds.
      </IntroText>

      {/* ---------- Story ---------- */}
      <Paragraph>
        Founded in <Emphasis>2017</Emphasis> by a small team of passionate
        riders and engineers, Ridfix has grown from a local workshop in
        Emilia-Romagna into an <Emphasis>international e-commerce leader</Emphasis>.
        Our vision remains unchanged: making premium components accessible to
        every two-wheel enthusiast, wherever the road—or off-road—may lead.
      </Paragraph>

      {/* ---------- Mission ---------- */}
      <SectionTitle>Our&nbsp;Mission</SectionTitle>
      <Paragraph>
        We meticulously curate our catalogue, partnering only with
        manufacturers that share our obsession for
        <Emphasis> reliability</Emphasis>,
        <Emphasis> safety</Emphasis> and
        <Emphasis> innovation</Emphasis>. Each product undergoes
        rigorous <Emphasis>quality assurance</Emphasis> so you can ride with
        total confidence.
      </Paragraph>
      <Paragraph>
        Beyond parts, we deliver a <Emphasis>seamless customer experience</Emphasis>:
        lightning-fast dispatch, transparent pricing and expert guidance from
        real humans—seven days a week.
      </Paragraph>

      {/* ---------- Values ---------- */}
      <SectionTitle>What&nbsp;Drives&nbsp;Us</SectionTitle>
      <Paragraph>
        <Emphasis>Integrity.</Emphasis> Honest advice and authentic products—no
        compromises.
      </Paragraph>
      <Paragraph>
        <Emphasis>Performance.</Emphasis> Excellence on the street and the track.
      </Paragraph>
      <Paragraph>
        <Emphasis>Community.</Emphasis> We ride together. Your feedback shapes
        our future.
      </Paragraph>

      {/* ---------- Contact ---------- */}
      <Paragraph>
        Questions or custom requests?&nbsp;
        <a href="/contact">Reach out here</a> or write to&nbsp;
        <a href="mailto:assistance@ridfix.it">assistance@ridfix.it</a>. 
        Our specialists respond within <Emphasis>24&nbsp;hours</Emphasis>—every day.
      </Paragraph>

      {/* ---------- Brands ---------- */}
      <SectionTitle>Our&nbsp;Trusted&nbsp;Brands</SectionTitle>
      <IntroText>
        We proudly collaborate with Europe’s most respected names
        in engineering, racing and design.
      </IntroText>
      <BrandGrid>
        {brands.map(({ id, name, logo }) => (
          <BrandLogoWrapper key={id} title={name}>
            <BrandLogo src={logo} alt={`${name} logo`} loading="lazy" />
          </BrandLogoWrapper>
        ))}
      </BrandGrid>

      {/* ---------- Stats ---------- */}
      <StatsTable>
        <StatBox>
          <StatNumber>15 000+</StatNumber>
          <StatLabel>Products in stock</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>12</StatNumber>
          <StatLabel>Premium brands</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>24/7</StatNumber>
          <StatLabel>Real-time support</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>99%</StatNumber>
          <StatLabel>Customer satisfaction</StatLabel>
        </StatBox>
      </StatsTable>
    </AboutContainer>
  );
}
