import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #18150f;
  color: #fff;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled.div`
  flex: 1;
  min-height: 100vh;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 900px) {
    min-height: 320px;
    width: 100%;
    display: none;
  }
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
 
  background-color: #22211c;

  @media only screen and (max-width: 900px) {
    padding: 32px 20px;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 480px;
 
  border-radius: 30px;
  padding: 48px 44px;
 

  @media only screen and (max-width: 500px) {
    padding: 32px 24px;
    border-radius: 24px;
  }
`;

export const Logo = styled.img`
  width: 90px;
  display: block;
  margin-bottom: 24px;
  justify-self: center;
`;

export const Brand = styled.h1`
  font-size: 40px;
  line-height: 1.1;
  margin: 0 0 40px;
  color: #ffd08a;
  letter-spacing: -0.03em;
  justify-self: center;

  @media only screen and (max-width: 500px) {
    font-size: 32px;
    margin-bottom: 28px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 30px;
  color: #fff;
  font-weight: 500;
  
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: #f4f0e9;
  font-size: 16px;
  margin-bottom: 18px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 208, 138, 0.8);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;

`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 16px;
  top: calc(50% - 9px);
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 6px;

  &:hover {
    color: #ffd08a;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  background-color: #ffd08a;
  color: #22211c;
  border: none;
  border-radius: 14px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s ease, opacity 0.2s ease;

  &:hover {
    background-color: #f1bf6c;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 15px;
  text-align: center;
`;

export const SwitchLink = styled.span`
  color: #ffd08a;
  font-weight: 700;
  cursor: pointer;
  margin-left: 6px;
`;
