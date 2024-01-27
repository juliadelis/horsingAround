import { NavLink} from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon";


export const Menu = styled.nav`
  padding-left:5%;
  

  align-content:center;

  display: flex;
  flex-direction: column;
  justify-content: left;
  float: left;
  position: fixed;

  top:27%;
  left:0;
  width: 20%;
  
`;

 export const Container = styled.div`
  
  padding-right:5%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 72%;
  float: right;
  position: relative;
  top: 0;
  
`;
export const Svg = styled(Icon)`
   width:37px;
   height:37px;
   margin-right:31px;
   //padding: 5px;
   fill: #AFAFA7; 
   stroke: #AFAFA7;
   border-radius:7px;
   stroke-width:0.5;
   transition: 0.5s;
   &:hover {
    stroke-width:0.5;
    background-color: #FFD08A;
    padding: 5px;
    fill: #22211C; 
    stroke: #22211C;
    transition: 0.5s;
  }
  
  
`;

export const SvgTrash = styled(Icon)`
   width:37px;
   height:37px;
   margin-right:31px;
   padding: 5px;
   fill: #AFAFA7; 
   stroke: #AFAFA7;
   border-radius:7px;
   stroke-width:0.5;
   transition: 0.5s;
   &:hover {
    stroke-width:0.5;
    background-color: #FFD08A;
    padding: 5px;
    fill: #22211C; 
    stroke: #22211C;
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
    color: #AFAFA7;
    align-items:center;
    display:flex;
    padding-bottom:30px;
    text-decoration:none;
    transition: 0.3s;
    &:hover, 
    &:active,
    &:visited,
    &:focus,
    &.active {
        font-weight: 400;
        color: #AFAFA7;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: 0.04em;
        font-style: normal;
        transition: 0.3s;
        cursor:pointer;
      }
      &:hover ${Svg} {
        background-color: #FFD08A;
        padding: 5px;
        fill: #22211C; 
        stroke: #22211C;
        width: 46px;
        height: 46px;
        transition: 0.3s;
      }
      &:focus ${Svg}{
        background-color: #FFD08A;
        padding: 5px;
        fill: #22211C; 
        stroke: #22211C;
        width: 46px;
        height: 46px;
        transition: 0.3s;
      }
      &.active ${Svg}{
        background-color: #FFD08A;
        width: 46px;
        height: 46px;
        padding: 5px;
        fill: #22211C; 
        stroke: #22211C;
        transition: 0.3s;
      }
      
      
`;

export const Linha = styled.div`
    
    background-color: #AFAFA7;
    height:1px;
    width: 85%;
    margin-bottom: 40px;
    margin-top: 10px;

`;

