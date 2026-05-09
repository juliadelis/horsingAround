import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";

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
    top: 0;
    left: 0;
    flex-direction: row;
    height: 60px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-top: 12px;
    padding-left: 0;
    padding-bottom: 0;
    padding-right: 0;
    align-items: center;
    justify-content: center;
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
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

export const Title = styled(NavLink)`
  letter-spacing: 0.04em;
  font-style: normal;
  font-weight: 200;
  font-size: 30px;
  line-height: 36px;
  color: #afafa7;
  align-items: center;
  display: flex;
  padding-bottom: 30px;
  text-decoration: none;
  transition: 0.3s;
  display: flex;
  gap: 20px;
  &:hover,
  &:active,
  &:visited,
  &:focus,
  &.active {
    font-weight: 400;
    color: #afafa7;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.04em;
    font-style: normal;
    transition: 0.3s;
    cursor: pointer;
  }
  &:hover ${Iconsvg} {
    background-color: #ffd08a;
    padding: 5px;
    color: #22211c;
    transition: 0.3s;
  }
  &:focus ${Iconsvg} {
    background-color: #ffd08a;
    padding: 5px;
    color: #22211c;
    transition: 0.3s;
  }
  &.active ${Iconsvg} {
    background-color: #ffd08a;
    padding: 5px;
    color: #22211c;
    transition: 0.3s;
  }

  @media only screen and (max-width: 768px) {
    padding-bottom: 0px;
    padding: 0 15px;
    font-size: 20px;
    color: #afafa7 !important;
    padding-bottom: 10px;
    &:active,
    &:focus,
    &.active {
      font-weight: 400;
      color: white !important;
      font-size: 20px !important;
      line-height: 36px;
      letter-spacing: 0.04em;
      font-style: normal;
      transition: 0.3s;
      cursor: pointer;

      border-bottom: 4px solid #ffd08a;
    }
    &:hover ${Iconsvg} {
      background-color: transparent;
      padding: 5px;
      fill: white;
      stroke: white;
      width: 25px;
      height: 25px;
      transition: 0.3s;
    }
    &:focus ${Iconsvg} {
      background-color: transparent;
      padding: 5px;
      fill: white;
      stroke: white;
      width: 25px;
      height: 25px;
      transition: 0.3s;
    }
    &.active ${Iconsvg} {
      background-color: transparent;
      padding: 5px;
      fill: white;
      stroke: white;
      width: 25px;
      height: 25px;
      transition: 0.3s;
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
