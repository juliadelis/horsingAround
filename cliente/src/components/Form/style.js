import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const FormContainer = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 50px;
  flex-wrap: wrap;
  background-color: #333129;
  padding: 55px;
  border-radius: 25px;
  width: 100%;
  height: 100%;

  &:after {
    content: "";
    flex: auto;
  }
  @media only screen and (max-width: 500px) {
    justify-content: center;
    margin: 0;
    padding: 30px 0px 20px 0px;
    border-radius: 0px;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

  @media only screen and (max-width: 500px) {
    width: 270px;
  }
`;

export const InputWithSuffix = styled.div`
  position: relative;
  width: 170px;

  ${Input} {
    width: 100%;
    padding-right: 38px;
  }

  @media only screen and (max-width: 500px) {
    width: 270px;
  }
`;

export const InputSuffix = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  pointer-events: none;
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
  transition: all 0.3s;
  border: 1px solid #ffd08a;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media only screen and (max-width: 800px) {
    margin-left: 17vw;
  }
  @media only screen and (max-width: 500px) {
    width: 250px;
    margin-left: 17vw;
  }

  &:hover {
    background-color: #22211c;
    border: 1px solid #ffd08a;
    color: #ffd08a;
  }

  &:disabled:hover {
    background-color: #ffd08a;
    color: #22211c;
  }
`;

export const InputFoto = styled.input`
  height: 40px;
  width: 170px;
  display: none;
  @media only screen and (max-width: 500px) {
    width: 270px;
  }
`;

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export const FileInputLabel = styled.label`
  padding: 5px 10px;
  background-color: #ffd08a;
  margin-top: 5px;
  color: #22211c;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
  border: 1px solid #ffd08a;

  &:hover {
    background-color: #22211c;
    border: 1px solid #ffd08a;
    color: #ffd08a;
  }
`;

export const FileName = styled.p`
  color: #ffd08a;
  font-size: 14px;
  margin: 0;
  max-width: 240px;
  word-break: break-all;
`;

export const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  border: 2px solid #ffd08a;
`;

export const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
`;

export const ButtonContainer = styled.div`
  width: 100%;
`;

export const LoadingState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.18);
  border-top-color: #ffd08a;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Option = styled.select`
  width: 170px;
  padding: 0 10px;
  border-bottom: 3px solid #ffd08a;
  border-radius: 4px;
  border-right: none;
  border-top: none;
  border-left: none;
  background: transparent;
  height: 40px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }

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
