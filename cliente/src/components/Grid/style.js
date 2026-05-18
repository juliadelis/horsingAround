import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
`;

const skeletonBackground = css`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.08) 25%,
    rgba(255, 255, 255, 0.16) 37%,
    rgba(255, 255, 255, 0.08) 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export const Container = styled.div`
  display: flex;
  gap: 5vh;
  flex-wrap: wrap;
  background-color: var(--color-bg-submenu);
  padding: 55px;
  border-radius: 25px;
  width: 100%;
  height: 100%;

  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    padding: 20px;
    width: 100%;
    border-radius: 0;
    min-height: calc(100vh - 60px);
  }

  @media only screen and (max-width: 500px) {
    margin: 0;
    padding: 20px;
  }
`;

export const Card = styled.div`
  background-color: var(--color-card);
  width: 45%;
  border-radius: 25px;
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;

  align-items: flex-start;
  @media only screen and (max-width: 768px) {
    width: auto;
    margin: 0px 20px;
  }
`;

export const CardText = styled.div`
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ItemNome = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: var(--color-bg-dark);
  text-transform: capitalize;
  width: 100%;
  padding-bottom: 10px;
`;

export const Item = styled.div`
  font-weight: 600;
  letter-spacing: 0.04em;
  font-size: 18px;
  line-height: 36px;
  color: var(--color-bg-dark);
  text-transform: capitalize;
`;

export const ItemCorrespondente = styled.div`
  display: flex;
  flex-direction: row;
  width: 45%;
  gap: 10px;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const ItemMedicacao = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export const ItemBanco = styled.div`
  font-weight: 400;
  letter-spacing: 0.04em;
  font-size: 18px;
  line-height: 36px;
  color: var(--color-bg-dark);
`;

export const ItemId = styled.div``;

export const Img = styled.img`
  width: 100%;
  border-radius: 25px 25px 0px 0px;

  height: 260px;
  object-position: top;
  object-fit: cover;
`;

export const Botao = styled(Link)`
  min-height: 44px;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: var(--color-accent);
  color: var(--color-bg-dark);
  font-size: 16px;
  font-weight: 700;
  gap: 8px;
  transition: 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
margin-left: 20px;
  &:hover {
    box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
  }
`;

export const EmptyState = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
  border-radius: 25px;
  h2 {
    font-size: 24px;
    color: var(--color-text-dark-bg);
    margin: 0;
  }
`;

export const SkeletonCard = styled(Card)`
  min-height: 510px;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 25px 25px 0px 0px;
  ${skeletonBackground}
`;

export const SkeletonLine = styled.div`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "20px"};
  border-radius: 999px;
  margin-bottom: 16px;
  ${skeletonBackground}
`;

export const SkeletonButton = styled.div`
  width: 140px;
  height: 42px;
  border-radius: 8px;
  margin-left: 20px;
  ${skeletonBackground}
`;

export const LoadingState = styled.div`
  width: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--color-text-dark-bg);
  font-size: 1rem;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.18);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
