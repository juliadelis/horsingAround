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
  background-color: var(--color-bg-submenu);
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
  border-bottom: 3px solid var(--color-accent);
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
  color: var(--color-bg-dark);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-accent);
  gap: 8px;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  transition: all 0.3s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }

  &:hover {
    box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
  }

  &:disabled:hover {
    box-shadow: none;
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
  min-height: 44px;
  padding: 12px 18px;
  background-color: var(--color-accent);
  margin-top: 5px;
  color: var(--color-bg-dark);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
  border: none;

  &:hover {
    box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
  }
`;

export const FileName = styled.p`
  color: var(--color-accent);
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
  border: 2px solid var(--color-accent);
`;

export const DeleteButton = styled.button`
  min-height: 44px;
  padding: 12px 18px;
  background-color: transparent;
  color: var(--color-text-dark-bg);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LoadingState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--color-text-dark-bg);
  font-size: 1rem;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(255, 255, 255, 0.18);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const Option = styled.select`
  width: 170px;
  padding: 0 10px;
  border-bottom: 3px solid var(--color-accent);
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
    color: var(--color-text-dark-bg);
    background: var(--color-bg-submenu);
    font-weight: small;
    display: flex;
    white-space: pre;
  }

  @media only screen and (max-width: 500px) {
    width: 270px;
  }
`;
