import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  PageContainer,
  ImageSection,
  FormSection,
  Card,
  Logo,
  Brand,
  FormTitle,
  Input,
  PasswordWrapper,
  TogglePassword,
  SubmitButton,
  FooterText,
  SwitchLink,
} from "./style";
import loginImage from "../../assets/login-img.png";
import logoIcon from "../../assets/icon.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";


const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const formatPhoneBR = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) {
      return digits;
    }

    if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? formatPhoneBR(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = isRegister
      ? await signUp(form.email, form.password)
      : await signIn(form.email, form.password);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    navigate("/organizacoes");
  };

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setForm({ name: "", email: "", password: "", phone: "" });
  };

  return (
    <PageContainer>
      <ImageSection image={loginImage} />
      <FormSection>
        <Card>
          <Logo src={logoIcon} alt="Horsing Around" />
          <Brand>Horsing Around</Brand>

          <FormTitle>{isRegister ? "Criar conta" : "Entrar"}</FormTitle>

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <Input
                name="name"
                type="text"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
              />
            )}

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <PasswordWrapper>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={form.password}
                onChange={handleChange}
              />
              <TogglePassword
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18}/>}
              </TogglePassword>
            </PasswordWrapper>

            {isRegister && (
              <Input
                name="phone"
                type="tel"
                placeholder="Telefone"
                value={form.phone}
                onChange={handleChange}
                maxLength={15}
              />
            )}

            <SubmitButton type="submit">
              {isRegister ? "Cadastrar" : "Entrar"}
            </SubmitButton>
          </form>

          <FooterText>
            {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}
            <SwitchLink onClick={toggleMode}>
              {isRegister ? "Fazer login" : "Cadastrar-se"}
            </SwitchLink>
          </FooterText>
        </Card>
      </FormSection>
    </PageContainer>
  );
};

export default Auth;
