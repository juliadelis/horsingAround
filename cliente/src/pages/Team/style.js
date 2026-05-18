import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const PageContainer = styled.div`
  padding: 32px;
   display: flex;
  flex-direction: column;
  padding: 55px;
  height: 100%;
  background-color: var(--color-bg-submenu);
  border-radius: 25px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 0;
    border-radius: 0;
    min-height: calc(100vh - 60px);
  }

  @media (max-width: 500px) {
    padding: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 16px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const LogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--color-bg-submenu);
  color: var(--color-text-dark-bg);
  min-height: 44px;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  gap: 8px;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: var(--color-card);
  }

  @media (max-width: 768px) {
    align-self: flex-start;
    padding: 12px 18px;
    font-size: 16px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: var(--color-accent);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled.p`
  margin: 8px 0 0;
  color: var(--color-text-dark-bg);
  font-size: 0.95rem;
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  background: var(--color-accent);
  color: var(--color-bg-dark);
  min-height: 44px;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    align-self: flex-start;
    padding: 12px 18px;
    font-size: 16px;
  }
`;

export const Card = styled.div`
  border-radius: 28px;
  background: var(--color-bg-dark);
  padding: 24px;
  
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 20px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: var(--color-text-dark-bg);
  min-width: 700px;

  @media (max-width: 768px) {
    overflow-x: auto;
    display: block;
    min-width: 100%;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 18px 14px;
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(205, 204, 200, 0.12);

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 0.85rem;
  }
`;

export const Td = styled.td`
  padding: 18px 14px;
  border-bottom: 1px solid rgba(205, 204, 200, 0.12);
  font-size: 0.95rem;
  vertical-align: middle;

  @media (max-width: 768px) {
    padding: 12px 8px;
    font-size: 0.85rem;
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--color-text-dark-bg);
  background: transparent;
  color: var(--color-text-dark-bg);
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(205, 204, 200, 0.12);
  }
`;

export const DeleteButton = styled.button`
  
   background: var(--color-accent);
  color: var(--color-bg-dark);
  min-height: 44px;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.2s ease;

  &:hover {
   box-shadow: 8px 13px 42.8px rgba(255, 208, 138, 0.25);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }
`;

export const CancelButton = styled.button`
  border: 1px solid var(--color-text-dark-bg);
  background: transparent;
  color: var(--color-text-dark-bg);
  min-height: 44px;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
    background: transparent;
  }
`;

export const MemberForm = styled.form`
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

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Select = styled.select`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(34, 30, 24, 0.95);
  color: var(--color-text-dark-bg);
  padding: 14px 16px;
  font-size: 0.95rem;

  option {
    background: rgba(34, 30, 24, 0.98);
    color: var(--color-text-dark-bg);
  }

  &:focus {
     background: rgba(34, 30, 24, 0.95);
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

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 18px;
  }
`;

export const TogglePassword = styled.button`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.76);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: var(--color-accent);
  }
`;

export const CredentialsBox = styled.div`
  margin-bottom: 24px;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-text-dark-bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const EmptyState = styled.div`
  padding: 46px;
  text-align: center;
  color: var(--color-text-dark-bg);
  border-radius: 20px;
  background: rgba(205, 204, 200, 0.04);
  border: 1px dashed rgba(205, 204, 200, 0.12);
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 24px;
    font-size: 0.9rem;
  }
`;

export const LoadingState = styled.div`
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--color-text-dark-bg);
  font-size: 1rem;

  @media (max-width: 768px) {
    min-height: 180px;
    font-size: 0.9rem;
  }
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(205, 204, 200, 0.18);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

// Estilos para o Dialog do PrimeReact
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
