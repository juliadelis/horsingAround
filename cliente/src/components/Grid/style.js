import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  gap: 5vh;
  flex-wrap: wrap;
  background-color: #333129;
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
  background-color: #afafa7;
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
  color: #22211c;
  text-transform: capitalize;
  width: 100%;
  padding-bottom: 10px;
`;

export const Item = styled.div`
  font-weight: 600;
  letter-spacing: 0.04em;
  font-size: 18px;
  line-height: 36px;
  color: #22211c;
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
  color: #22211c;
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
  padding: 10px 18px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #ffd08a;
  color: #22211c;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-left: 20px;
  transition: 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 8px 13px 42.8px #ffd08a40;
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
    color: white;
    margin: 0;
  }
`;

export const LoadingState = styled.div`
  width: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.18);
  border-top-color: #ffd08a;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
