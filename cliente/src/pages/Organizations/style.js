import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 55px;
  height: 100%;
  background-color: var(--color-bg-submenu);
  border-radius: 25px;
  width: 100%;

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
  color: var(--color-accent);
`;

export const Card = styled.div`
  border: 1px solid var(--color-accent);
  display: flex;
  padding: 15px;
  border-radius: 20px;
  width: fit-content;
  align-items: center;
  gap: 15px;
  cursor: pointer;
   &:hover  {
      box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
    }
`;

export const IconOrg = styled.div`
  background-color: var(--color-bg-dark);
  border-radius: 1000px;
  padding: 10px;
  display: flex;
`;

export const Botao = styled.button`
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
   &:hover  {
     box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
      box-shadow: none;
    }

`;

export const Form = styled.form`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: flex-end;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--color-text-dark-bg);
  padding: 14px 16px;
  font-size: 0.95rem;

  &::placeholder {
    color: rgba(247, 241, 220, 0.55);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(209, 159, 79, 0.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const FormActions = styled.div`
  display: flex;
  align-items: start;
  justify-content: flex-start;
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

export const LoadingState = styled.div`
  width: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: rgba(255, 208, 138, 0.9);
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

export const dialogStyles = `
  .p-dialog {
    background: var(--color-bg-submenu) !important;
    border-radius: 28px !important;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25) !important;
  }

  .p-dialog .p-dialog-header {
    background: var(--color-bg-submenu) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    color: var(--color-accent) !important;
    padding: 24px !important;
  }

  .p-dialog .p-dialog-title {
    color: var(--color-accent) !important;
    font-size: 1.25rem !important;
    font-weight: 600 !important;
  }

  .p-dialog .p-dialog-content {
    background: var(--color-bg-submenu) !important;
    color: var(--color-text-dark-bg) !important;
    padding: 24px !important;
  }

  .p-dialog .p-dialog-footer {
    background: var(--color-bg-submenu) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
    padding: 16px 24px !important;
  }

  .p-dialog .p-dialog-header-close {
    color: var(--color-text-dark-bg) !important;
  }

  .p-dialog .p-dialog-header-close:hover {
    background: rgba(255, 255, 255, 0.12) !important;
  }

  @media (max-width: 768px) {
    .p-dialog {
      width: 90vw !important;
      max-width: 90vw !important;
    }

    .p-dialog .p-dialog-header {
      padding: 16px !important;
    }

    .p-dialog .p-dialog-title {
      font-size: 1.1rem !important;
    }

    .p-dialog .p-dialog-content {
      padding: 16px !important;
    }

    .p-dialog .p-dialog-footer {
      padding: 12px 16px !important;
    }
  }
`;
