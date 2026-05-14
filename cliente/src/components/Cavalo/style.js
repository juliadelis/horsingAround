import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Icon from "../Icon";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #333129;
  border-radius: 28px;
  width: 100%;
  height: 80vh;
  margin: 30px;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    height: calc(100vh - 60px);
    padding: 0px;
    margin: 0;
  }
`;

export const Card = styled.div`
  background-color: #afafa7;
  width: 80vw;

  border-radius: 25px;
  padding-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  @media only screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const CardText = styled.div`
  margin-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  &:after {
    content: "";
    flex: auto;
  }

  @media only screen and (max-width: 500px) {
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
export const Botoes = styled.div`
  width: 100%;
  position: relative;
  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

export const ItemCorrespondente = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-bottom: 15px;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    gap: 10px;
    width: 100%;
  }
`;

export const ItemBanco = styled.div`
  font-weight: 400;
  letter-spacing: 0.04em;
  font-size: 18px;
  line-height: 36px;
  color: #22211c;
  text-transform: capitalize;
`;

export const ItemId = styled.div``;

export const Img = styled.img`
  width: 100%;
  border-radius: 25px 25px 0px 0px;

  height: 449.54px;
object-position: top;
  object-fit: cover;
  @media only screen and (max-width: 768px) {
    border-radius: 0;
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

export const Botao = styled(Link)`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  border-radius: 155px;
  border: none;
  background-color: #ffd08a;
  color: #22211c;
  font-weight: 600;
  letter-spacing: 0.12em;
  transition: 0.5s;
  position: absolute;
  right: 20%;
  top: 7%;
  &:hover {
    background-color: #f1b356;
    transition: 0.5s;
  }

  @media only screen and (max-width: 768px) {
    right: 20%;
  }
  @media only screen and (max-width: 500px) {
    right: 25%;
  }
`;

export const Svg = styled(Icon)`
   {
    stroke: #22211c;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 36px;
    height: 36px;
    fill: none;
  }
`;

export const SvgTrash = styled(Icon)`
   {
    stroke: #22211c;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 28px;
    height: 28px;
    fill: none;
  }
`;

export const Deletar = styled.button`
  height: 50px;
  width: 50px;
  cursor: pointer;
  border-radius: 155px;
  border: none;
  background-color: #ffd08a;
  color: #22211c;
  transition: 0.5s;
  position: absolute;
  right: 8%;
  top: 7%;
  &:hover {
    background-color: #f1b356;
    transition: 0.5s;
  }

  @media only screen and (max-width: 768px) {
    right: 7%;
  }
`;

export const Voltar = styled(Link)`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  border-radius: 155px;
  border: none;
  background-color: #ffd08a;
  color: #22211c;
  font-weight: 600;
  letter-spacing: 0.12em;
  transition: 0.5s;
  position: absolute;
  right: 88%;
  top: 7%;
  &:hover {
    background-color: #f1b356;
    transition: 0.5s;
  }

   @media only screen and (max-width: 768px) {
    left: 5%;
  }
`;
