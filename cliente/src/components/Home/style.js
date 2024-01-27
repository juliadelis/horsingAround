import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap:5%;
   
    background-color: #333129; 
    border-radius: 25px;
    width: 100%;
    margin:30px;
    justify-content: space-between;
`;

export const Card = styled.div`
    background-color:#AFAFA7;
    width: 100%;
    border-radius: 25px;
    margin: 40px 0px;
    padding:30px;
    
    display: flex;
    flex-wrap: wrap;
    
    align-items: flex-start;

`;

export const CardImg = styled.div`
    background-color:#AFAFA7;
    width: 100%;
    border-radius: 25px;
    margin: 40px 0px;
    
    display: flex;
    flex-wrap: wrap;
    
    align-items: flex-start;

`;

export const CardText = styled.div`
    padding:30px;
    display: flex;
    flex-wrap: wrap;
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
width:auto;


    
`;

export const ItemBanco = styled.div`
    font-weight: 400;
    letter-spacing: 0.04em;
    font-size: 18px;
    line-height: 36px;
    color: #22211C;
    text-transform: capitalize;  
    margin-left:10px;
    margin-right:30px 
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

export const Container_E = styled.div`
 width:42%;
 padding: 55px;
`;

export const DivImg = styled.div`
 width:42%;
 background-color: black;
 border-radius: 25px;
 align-items:center;
 display:flex;
`;

export const Container_D = styled.img`
width:100%;
height:auto;
float:right;
transform: scaleX(-1);
border-radius: 25px 0px 0px 25px;
`;

export const Hipica = styled.h2`
font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 30px;
line-height: 36px;
color: #FFD08A;
`
;
