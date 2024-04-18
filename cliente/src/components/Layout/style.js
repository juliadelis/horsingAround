import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";

export const Menu = styled.nav`
  padding-left: 5%;

  align-content: center;

  display: flex;
  flex-direction: column;
  justify-content: left;
  float: left;
  position: fixed;

  top: 27%;
  left: 0;
  width: 20%;

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    top: 0;
    padding: 3%;
    width: 100vw;
    z-index: 20;
    background-color: #22211c;
    align-items: center;
    justify-content: center;
    gap: 3%;
    padding-bottom: 0;
  }
`;

export const Container = styled.div`
  padding-right: 5%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 72%;
  float: right;
  position: relative;
  top: 0;
  overflow-x: hidden !important;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
    padding-right: 0;
    top: 50px;
  }
`;
export const Svg = styled(Icon)`
  width: 37px;
  height: 37px;
  margin-right: 31px;
  //padding: 5px;
  fill: #afafa7;
  stroke: #afafa7;
  border-radius: 7px;
  stroke-width: 0.5;
  transition: 0.5s;
  &:hover {
    stroke-width: 0.5;
    background-color: #ffd08a;
    padding: 5px;
    fill: #22211c;
    stroke: #22211c;
    transition: 0.5s;
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

export const SvgTrash = styled(Icon)`
  width: 37px;
  height: 37px;
  margin-right: 31px;
  padding: 5px;
  fill: #afafa7;
  stroke: #afafa7;
  border-radius: 7px;
  stroke-width: 0.5;
  transition: 0.5s;
  &:hover {
    stroke-width: 0.5;
    background-color: #ffd08a;
    padding: 5px;
    fill: #22211c;
    stroke: #22211c;
    transition: 0.5s;
    width: 46px;
    height: 46px;
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
  &:hover ${Svg} {
    background-color: #ffd08a;
    padding: 5px;
    fill: #22211c;
    stroke: #22211c;
    width: 46px;
    height: 46px;
    transition: 0.3s;
  }
  &:focus ${Svg} {
    background-color: #ffd08a;
    padding: 5px;
    fill: #22211c;
    stroke: #22211c;
    width: 46px;
    height: 46px;
    transition: 0.3s;
  }
  &.active ${Svg} {
    background-color: #ffd08a;
    width: 46px;
    height: 46px;
    padding: 5px;
    fill: #22211c;
    stroke: #22211c;
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
      font-size: 20px;
      line-height: 36px;
      letter-spacing: 0.04em;
      font-style: normal;
      transition: 0.3s;
      cursor: pointer;

      border-bottom: 4px solid #ffd08a;
    }
    &:hover ${Svg} {
      background-color: transparent;
      padding: 5px;
      fill: white;
      stroke: white;
      width: 25px;
      height: 25px;
      transition: 0.3s;
    }
    &:focus ${Svg} {
      background-color: transparent;
      padding: 5px;
      fill: white;
      stroke: white;
      width: 25px;
      height: 25px;
      transition: 0.3s;
    }
    &.active ${Svg} {
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
  width: 85%;
  margin-bottom: 40px;
  margin-top: 10px;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
