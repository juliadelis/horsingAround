import styled from "styled-components";

export const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap:50px;
    flex-wrap: wrap;
    background-color: #333129; 
    padding: 55px;
    border-radius: 25px;
    width: 100%;
    margin:30px;
    justify-content: space-around;
    &:after{
        content: "";
        flex: auto;

    }
   
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    width:170px;
    padding: 0 10px;
    border-bottom: 3px solid #FFD08A;
    border-radius: 4px;
    border-right:none;
    border-top:none;
    border-left:none;
    background:transparent;
    height: 40px;
`;

export const Label = styled.label``;

export const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #FFD08A;
    color: #22211C;
    height: 42px;
    width:180px;
    font-weight: 600;
    letter-spacing: 0.12em;
    margin-left:30px;
`;

export const InputFoto = styled.input`


height: 40px;
width:170px;`;

export const Option = styled.select`
    width:190px;
    padding: 0 10px; 
    border-bottom: 3px solid #FFD08A;
    border-radius: 4px;
    border-right:none;
    border-top:none;
    border-left:none;
    background:transparent;
    height: 40px;
`;

