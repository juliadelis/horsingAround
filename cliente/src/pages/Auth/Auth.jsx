import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
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
  const [loading, setLoading] = useState(false);
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

  const normalizePhoneForAuth = (phone) => {
    const digits = phone.replace(/\D/g, "");
    if (!digits) return undefined;

    if (digits.startsWith("55") && digits.length >= 11) {
      return `+${digits}`;
    }

    if (digits.length === 10 || digits.length === 11) {
      return `+55${digits}`;
    }

    return `+${digits}`;
  };

  const translateAuthError = (message) => {
    if (!message) return "Erro ao realizar login.";

    if (message === "missing email or phone") {
      return "Falta email ou telefone";
    }

    if (message === "Invalid login credentials") {
      return "Credenciais erradas";
    }

    return message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = isRegister
        ? await signUp(form.email, form.password, {
            name: form.name,
            phone: normalizePhoneForAuth(form.phone),
          })
        : await signIn(form.email, form.password);

      if (response.error) {
        toast.error(translateAuthError(response.error.message));
        return;
      }

      navigate("/organizacoes");
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      toast.error(translateAuthError(error?.message));
    } finally {
      setLoading(false);
    }
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

            <SubmitButton type="submit" disabled={loading}>
              {loading
                ? isRegister
                  ? "Cadastrando..."
                  : "Entrando..."
                : isRegister
                ? "Cadastrar"
                : "Entrar"}
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
