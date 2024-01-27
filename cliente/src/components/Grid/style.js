import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap:5%;
    flex-wrap: wrap;
    background-color: #333129; 
    padding: 55px;
    border-radius: 25px;
    width: 100%;
    margin:30px;
    justify-content: space-between;
`;

export const Card = styled.div`
    background-color:#AFAFA7;
    width: 45%;
    border-radius: 25px;   
    padding-bottom:30px;
    margin-bottom:5%;
    display: flex;
    flex-wrap: wrap;
    
    align-items: flex-start;

`;

export const CardText = styled.div`
    padding-left:40px;
    padding-right:40px;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    margin-bottom:20px;
    
    `
    ;

export const ItemNome = styled.div`
    font-weight: 700;
    font-size: 24px;
    line-height: 36px;
    color: #22211C;
    text-transform: capitalize;
    width:100%;
    padding-bottom:10px;
`;

export const Item = styled.div`
    font-weight: 600;
    letter-spacing: 0.04em;
    font-size: 18px;
    line-height: 36px;
    color: #22211C;
    text-transform: capitalize;
    
`;

export const ItemCorrespondente = styled.div`
display: flex;
flex-direction: row;
width:45%;
gap:10px;
    
`;

export const ItemBanco = styled.div`
    font-weight: 400;
    letter-spacing: 0.04em;
    font-size: 18px;
    line-height: 36px;
    color: #22211C;
    text-transform: capitalize;   
`;

export const ItemId = styled.div`
`;

export const Img = styled.img`
    width: 100%;
    border-radius: 25px 25px 0px 0px;
    margin-bottom:20px;
    height:220px;     
    
    object-fit: cover;
`;

export const Botao = styled(Link)`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #FFD08A;
    color: #22211C;
    font-weight: 600;
    letter-spacing: 0.12em;
    margin-left:40px;
    transition: 0.5s;
    &:hover{
        border-radius: 55px;
        color: #22211C;
        transition: 0.5s;
    }
`;
