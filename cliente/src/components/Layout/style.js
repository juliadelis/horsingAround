import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const ContainerMaior = styled.div`
  position: relative;
  display: flex;
  min-height: 100vh;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Menu = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 18vw;
  min-width: 220px;
  max-width: 280px;
  padding-left: 2%;
  background-color: #22211c;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: 0;
    align-items: stretch;
    justify-content: flex-start;
    max-height: ${({ open }) => (open ? "100vh" : "60px")};
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
`;

export const Container = styled.div`
  margin-left: clamp(220px, 18vw, 280px);
  min-height: 100vh;
  width: calc(100% - clamp(220px, 18vw, 280px));
  padding: 2rem 5% 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow-x: hidden !important;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
    margin-top: 60px;
    width: 100%;
    min-height: calc(100vh - 60px);
    padding: 0;
    justify-content: flex-start;
  }
`;

export const Iconsvg = styled.div`
  border-radius: 7px;
  stroke-width: 0.5;
  transition: 0.5s;
  display: flex;
  &:hover {
    background-color: #ffd08a;
    padding: 5px;
    color: #22211c;
    transition: 0.3s;
  }

  @media only screen and (max-width: 768px) {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
`;

export const Title = styled(NavLink)`
  letter-spacing: 0.04em;
  font-style: normal;
  font-weight: ${({ $active }) => ($active ? "400" : "200")};
  font-size: ${({ $active }) => ($active ? "28px" : "24px")};
  line-height: 36px;
  color: #afafa7;
  align-items: center;
  display: flex;
  padding-bottom: 30px;
  text-decoration: none;
  transition: 0.3s;
  gap: 15px;

  &:hover {
    font-weight: 400;
    color: #afafa7;
    font-size: 28px;
    cursor: pointer;
  }

  &:hover ${Iconsvg},
  ${({ $active }) =>
    $active &&
    `
      ${Iconsvg} {
        background-color: #ffd08a;
        padding: 5px;
        color: #22211c;
      }
    `}

  @media only screen and (max-width: 768px) {
    padding: 0 15px 10px;
    font-size: 20px !important;
    color: ${({ $active }) => ($active ? "white" : "#afafa7")} !important;
    border-bottom: ${({ $active }) =>
      $active ? "4px solid #ffd08a" : "none"};

    &:hover {
      font-size: 20px !important;
    }

    ${({ $active }) =>
      $active &&
      `
        ${Iconsvg} {
          background-color: transparent;
          padding: 5px;
          fill: white;
          stroke: white;
          width: 25px;
          height: 25px;
        }
      `}
  }
`;

export const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    padding: 70px 20px 20px;
    display: ${({ open }) => (open ? "flex" : "none")};
    gap: 15px;
  }
`;

export const MobileToggle = styled.button`
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    right: 20px;
    top: 8px;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(255, 208, 138, 0.15);
    border: 1px solid rgba(255, 208, 138, 0.35);
    color: #ffd08a;
    cursor: pointer;
    z-index: 30;
    align-items: center;
    justify-content: center;

  

    &:hover {
      background: rgba(255, 208, 138, 0.25);
    }
  }
`;

export const Linha = styled.div`
  background-color: #afafa7;
  height: 1px;
  width: 100%;
  margin-bottom: 40px;
  margin-top: 10px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 30px 0 40px 0;

  @media only screen and (max-width: 768px) {
    justify-content: start;
    position: absolute;
    left: 20px;
    top: 10px;
    padding: 0;
    z-index: 31;
    pointer-events: none;
  }
`;

export const Logo = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  
  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;
