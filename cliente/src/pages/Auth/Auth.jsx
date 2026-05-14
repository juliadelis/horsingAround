import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, updateUser, resetPasswordForEmail, user } = useAuth();

  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);

  const isRegister = authMode === "register";
  const isForgotPassword = authMode === "forgot";
  const isResetPassword = authMode === "reset";

  useEffect(() => {
    const email = searchParams.get("email");
    const mode = searchParams.get("mode");

    if (mode === "register") {
      setAuthMode("register");
    }

    if (mode === "login") {
      setAuthMode("login");
    }

    if (mode === "reset") {
      setAuthMode("reset");
    }

    if (email) {
      setForm((prev) => ({ ...prev, email }));
    }
  }, [searchParams]);

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

  const handleForgotPassword = async () => {
    const response = await resetPasswordForEmail(form.email);

    if (response.error) {
      toast.error(translateAuthError(response.error.message));
      return;
    }

    toast.success("Enviamos um link de recuperação para o seu e-mail.");
    setAuthMode("login");
  };

  const handleResetPassword = async () => {
    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não conferem.");
      return;
    }

    const response = await updateUser({
      password: form.password,
    });

    if (response.error) {
      toast.error(translateAuthError(response.error.message));
      return;
    }

    toast.success("Senha atualizada com sucesso.");
    navigate("/organizacoes");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgotPassword) {
        await handleForgotPassword();
        return;
      }

      if (isResetPassword) {
        await handleResetPassword();
        return;
      }

      const metadata = {
        name: form.name,
        phone: normalizePhoneForAuth(form.phone),
      };

      const response =
        isRegister && user
          ? await updateUser({
              email: form.email,
              password: form.password,
              data: metadata,
            })
          : isRegister
          ? await signUp(form.email, form.password, metadata)
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
    setAuthMode((prev) => (prev === "register" ? "login" : "register"));
    setForm(initialForm);
    setShowPassword(false);
  };

  const openForgotPassword = () => {
    setAuthMode("forgot");
    setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    setShowPassword(false);
  };

  const backToLogin = () => {
    setAuthMode("login");
    setForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    setShowPassword(false);
  };

  const getTitle = () => {
    if (isForgotPassword) return "Recuperar senha";
    if (isResetPassword) return "Redefinir senha";
    return isRegister ? "Criar conta" : "Entrar";
  };

  const getSubmitLabel = () => {
    if (loading) {
      if (isForgotPassword) return "Enviando...";
      if (isResetPassword) return "Salvando...";
      return isRegister ? "Cadastrando..." : "Entrando...";
    }

    if (isForgotPassword) return "Enviar link de recuperação";
    if (isResetPassword) return "Salvar nova senha";
    return isRegister ? "Cadastrar" : "Entrar";
  };

  return (
    <PageContainer>
      <ImageSection image={loginImage} />
      <FormSection>
        <Card>
          <Logo src={logoIcon} alt="Horsing Around" />
          <Brand>Horsing Around</Brand>

          <FormTitle>{getTitle()}</FormTitle>

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

            {!isResetPassword && (
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            )}

            {!isForgotPassword && (
              <PasswordWrapper>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isResetPassword ? "Nova senha" : "Senha"}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <TogglePassword
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <FaRegEyeSlash size={18} />
                  ) : (
                    <FaRegEye size={18} />
                  )}
                </TogglePassword>
              </PasswordWrapper>
            )}

            {isResetPassword && (
              <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar nova senha"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

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
              {getSubmitLabel()}
            </SubmitButton>
          </form>

          {!isRegister && !isForgotPassword && !isResetPassword && (
            <FooterText>
              <SwitchLink onClick={openForgotPassword}>
                Esqueci minha senha
              </SwitchLink>
            </FooterText>
          )}

          {!isResetPassword && (
            <FooterText>
              {isForgotPassword
                ? "Lembrou sua senha?"
                : isRegister
                ? "Já tem uma conta?"
                : "Não tem uma conta?"}
              <SwitchLink onClick={isForgotPassword ? backToLogin : toggleMode}>
                {isForgotPassword || isRegister ? "Fazer login" : "Cadastrar-se"}
              </SwitchLink>
            </FooterText>
          )}
        </Card>
      </FormSection>
    </PageContainer>
  );
};

export default Auth;
