// src/pages/HomePage.jsx  (ultima finitura)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import api from '../api/api';
import ProductCard from '../components/products/ProductCard';
import Spinner from '../components/ui/Spinner';

/* ──────────────  HERO  ────────────── */
const Container = styled.div`
  padding: 0;
`;

const Hero = styled.div`
  position: relative;
  height: 600px;            /* ⬆️ più alto → immagine quasi intera */
  overflow: hidden;
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;   /* mostra bene la parte alta */
`;

const glow = keyframes`
  0%,100% { text-shadow: 0 0 6px rgba(255, 128, 0, .85),
                         0 0 12px rgba(255, 128, 0, .65); }
  50%     { text-shadow: 0 0 9px rgba(255, 150, 0, .95),
                         0 0 18px rgba(255, 150, 0, .75); }
`;

const Caption = styled.div`
  position: absolute;
  bottom: 3.5rem;
  left: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: clamp(1.4rem, 3vw, 2.4rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  animation: ${glow} 2.8s ease-in-out infinite;
`;

const ShopNowBtn = styled(Link)`
  align-self: flex-start;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.6rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: transform .2s, box-shadow .2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 12px rgba(0,0,0,.25);
  }
`;

/* ──────────────  LISTE  ────────────── */
const Content = styled.div`
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;
const Title = styled.h2`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
  gap: 1.5rem;
`;
/* ───────────────────────────────────── */

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/products?_limit=4&featured=true')
      .then(res => setFeatured(res.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <Container>
      <Hero>
        <HeroImg
          src="/images/hero-scooter.jpg"
          alt="Scooter in front of Ridfix store"
        />

        <Caption>
          <HeroTitle>WELCOME&nbsp;TO&nbsp;RIDFIX&nbsp;SHOP</HeroTitle>
          <ShopNowBtn to="/catalog">SHOP&nbsp;NOW</ShopNowBtn>
        </Caption>
      </Hero>

      <Content>
        <Section>
          <Title>Featured Products</Title>
          <Grid>
            {featured.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </Grid>
        </Section>

        <Section>
          <Title>Shop by Category</Title>
          <p>Coming soon…</p>
        </Section>
      </Content>
    </Container>
  );
}
