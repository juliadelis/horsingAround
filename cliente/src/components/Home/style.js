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
  gap: 5%;

  background-color: #333129;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    margin-bottom: 0;
    border-radius: 0;
    margin-top: 0;
    height: 100%;
    margin: 0;
    min-height: calc(100vh - 60px);
  }

  @media only screen and (max-width: 500px) {
    margin-bottom: 0;
    border-radius: 0;
    margin-top: 0;
    height: 100%;
  }
`;

export const Card = styled.div`
  background-color: #afafa7;

  border-radius: 25px;
  margin: 40px 0px;
  padding: 30px;

  display: flex;
  flex-wrap: wrap;

  align-items: flex-start;
`;

export const CardImg = styled.div`
  background-color: #afafa7;
  width: 100%;
  border-radius: 25px;
  margin: 40px 0px;

  display: flex;
  flex-wrap: wrap;

  align-items: flex-start;
`;

export const CardText = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
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
  margin-right: 5px;
`;

export const ItemCorrespondente = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
`;

export const ItemBanco = styled.div`
  font-weight: 400;
  letter-spacing: 0.04em;
  font-size: 18px;
  line-height: 36px;
  color: #22211c;
  text-transform: capitalize;
  margin-right: 30px;
`;

export const ItemId = styled.div``;

export const Img = styled.img`
  width: 100%;
  border-radius: 25px 25px 0px 0px;
  height: 220px;

  object-fit: cover;
`;

export const Container_E = styled.div`
  width: 55%;
  padding: 55px;
  @media only screen and (max-width: 500px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    padding: 20px;
  }
`;

export const DivImg = styled.div`
  width: 45%;
  background-color: black;
  border-radius: 25px;
  align-items: center;
  display: flex;
  @media only screen and (max-width: 500px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Container_D = styled.img`
  width: 100%;
  height: auto;
  float: right;
  transform: scaleX(-1);
  border-radius: 25px 0px 0px 25px;
  @media only screen and (max-width: 768px) {
    height: 300px;
    object-fit: cover;
    object-position: 60% 60%;
    border-radius: 25px 25px 0px 0px;
  }
`;

export const Hipica = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #ffd08a;
  margin-top: 20px;
`;

export const SkeletonTitle = styled.div`
  width: min(360px, 80%);
  height: 36px;
  border-radius: 8px;
  margin-top: 20px;
  ${skeletonBackground}
`;

export const SkeletonCard = styled(Card)`
  min-height: 132px;
  flex-direction: column;
  gap: 18px;
`;

export const SkeletonImageCard = styled(CardImg)`
  min-height: 380px;
  flex-direction: column;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 25px 25px 0px 0px;
  ${skeletonBackground}
`;

export const SkeletonLine = styled.div`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "20px"};
  border-radius: 999px;
  ${skeletonBackground}
`;

export const SkeletonSideImage = styled.div`
  width: 100%;
  min-height: 100%;
  height: 100%;
  border-radius: 25px 0px 0px 25px;
  ${skeletonBackground}

  @media only screen and (max-width: 768px) {
    height: 300px;
    border-radius: 25px 25px 0px 0px;
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
