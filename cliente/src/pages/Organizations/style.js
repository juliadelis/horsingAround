import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 55px;
  height: 100%;
  background-color: #333129;
  border-radius: 25px;
  width: 100%;
  margin: 30px;

  gap: 30px;
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

export const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #ffd08a;
`;

export const Card = styled.div`
  border: 1px solid #ffd08a;
  display: flex;
  padding: 15px;
  border-radius: 20px;
  width: fit-content;
  align-items: center;
  gap: 15px;
  cursor: pointer;
   &:hover  {
      box-shadow: 8px 13px 42.8px #ffd08a40;
    }
`;

export const IconOrg = styled.div`
  background-color: #22211c;
  border-radius: 1000px;
  padding: 10px;
  display: flex;
`;

export const Botao = styled.button`
  color: #22211c;
  display: flex;
  background-color: #FFD08A;
  gap: 5px;
  padding: 14px 20px;
  font-size: 18px;
  font-weight: bold;
   &:hover  {
     box-shadow: 8px 13px 42.8px #ffd08a40;
    }

    

`;

export const Form = styled.form`
  
  display: flex;
  flex-direction: column;
  gap: 10px;

  font-size: 18px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    background-color: #ffffff;
    color: #333;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      border-color: #ffd08a;
      box-shadow: 0 0 5px rgba(255, 208, 138, 0.3);
    }
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    background-color: #ffd08a;
    color: #22211c;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffb84d;
    }

    &:active {
      background-color: #ff9f00;
    }
  }
`;


export const Header = styled.div`
font-size: 20px;
margin-bottom: 20px;
`;

export const Organizacao = styled.div`
display: flex; 
gap: 20px;
flex-wrap: wrap;

`;
