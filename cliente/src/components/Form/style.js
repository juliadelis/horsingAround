import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 50px;
  flex-wrap: wrap;
  background-color: #333129;
  padding: 55px;
  border-radius: 25px;
  width: 100%;
  margin: 30px;
  justify-content: space-around;
  &:after {
    content: "";
    flex: auto;
  }
`;

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 170px;
  padding: 0 10px;
  border-bottom: 3px solid #ffd08a;
  border-radius: 4px;
  border-right: none;
  border-top: none;
  border-left: none;
  background: transparent;
  height: 40px;
  @media only screen and (max-width: 500px) {
    width: 250px;
  }
`;

export const Label = styled.label``;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #ffd08a;
  color: #22211c;
  height: 42px;
  width: 180px;
  font-weight: 600;
  letter-spacing: 0.12em;
  margin-left: 1vw;
  @media only screen and (max-width: 800px) {
    margin-left: 17vw;
  }
  @media only screen and (max-width: 500px) {
    width: 250px;
    margin-left: 17vw;
  }
`;

export const InputFoto = styled.input`
  height: 40px;
  width: 170px;
  @media only screen and (max-width: 500px) {
    width: 270px;
  }
`;

export const Option = styled.select`
  width: 190px;
  padding: 0 10px;
  border-bottom: 3px solid #ffd08a;
  border-radius: 4px;
  border-right: none;
  border-top: none;
  border-left: none;
  background: transparent;
  height: 40px;

  option {
    color: white;
    background: #333129;
    font-weight: small;
    display: flex;
    white-space: pre;
  }

  @media only screen and (max-width: 500px) {
    width: 270px;
  }
`;
