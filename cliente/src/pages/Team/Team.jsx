import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Dialog } from "primereact/dialog";
import { useAuth } from "../../contexts/AuthContext";
import { memberService } from "../../services/memberService";
import {
  dialogStyles,
  CancelButton,
  DeleteButton,
  PageContainer,
  Header,
  Title,
  Subtitle,
  AddButton,
  LogoutButton,
  Card,
  Table,
  Th,
  Td,
  ActionButton,
  MemberForm,
  Input,
  Select,
  FormActions,
  CredentialsBox,
  EmptyState,
  LoadingState,
  Spinner,
  PasswordWrapper,
  TogglePassword,
  Footer,
} from "./style";
import { FiLogOut } from "react-icons/fi";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "veterinarian", label: "Veterinário" },
  { value: "trainer", label: "Adestrador" },
  { value: "caretaker", label: "Cuidador" },
];

const Team = () => {
  const [members, setMembers] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [newCredentials, setNewCredentials] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const organizationName =
    localStorage.getItem("organizationName") || "Organização";

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await memberService.getAll();
      setMembers(data);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
      toast.error("Não foi possível carregar os membros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    // Injetar estilos CSS para o Dialog
    const styleElement = document.createElement('style');
    styleElement.textContent = dialogStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("organizationName");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
      toast.error("Não foi possível sair. Tente novamente.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 11);

      let formatted = digits;
      if (digits.length <= 2) {
        formatted = digits;
      } else if (digits.length <= 6) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length <= 10) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }

      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openCreateDialog = () => {
    setEditingMember(null);
    setShowPassword(false);
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "admin",
    });
    setDialogVisible(true);
  };

  const formatPhone = (phone) => {
    if (!phone) return "";
    
    const digits = phone.replace(/\D/g, "").slice(0, 11);

    if (digits.length === 0) return "";
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const openEditDialog = (member) => {
    setEditingMember(member);
    setShowPassword(false);
    setForm({
      name: member.name || "",
      email: member.email || "",
      password: "", // Não preencher senha na edição
      phone: formatPhone(member.phone),
      role: member.role || "admin",
    });
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setEditingMember(null);
    setNewCredentials(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Preencha nome e e-mail do membro.");
      return;
    }

    if (!editingMember && !form.password) {
      toast.error("Preencha a senha do membro.");
      return;
    }

    try {
      let result;
      if (editingMember) {
        result = await memberService.update(editingMember.id, form);
        setMembers((prev) =>
          prev.map((member) =>
            member.id === editingMember.id
              ? { ...result, phone: form.phone }
              : member
          )
        );
        toast.success("Membro atualizado com sucesso.");
      } else {
        result = await memberService.create(form);
        const createdMember = { ...(result.member ?? result), phone: form.phone };
        setMembers((prev) => [createdMember, ...prev]);
        setNewCredentials(result.credentials ?? null);
        toast.success("Membro adicionado com sucesso.");
      }

      closeDialog();
    } catch (error) {
      console.error("Erro ao salvar membro:", error);
      toast.error(
        error?.response?.data?.error || error?.message || "Erro ao salvar membro.",
      );
    }
  };

  const handleDelete = (member) => {
    setMemberToDelete(member);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;

    try {
      await memberService.delete(memberToDelete.id);
      setMembers((prev) => prev.filter((member) => member.id !== memberToDelete.id));
      toast.success("Membro removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover membro:", error);
      toast.error("Não foi possível remover o membro.");
    } finally {
      setDeleteDialogVisible(false);
      setMemberToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogVisible(false);
    setMemberToDelete(null);
  };

  return (
    <PageContainer>
      <div>
      <Header>
        <div>
          <Title>Equipe</Title>
          <Subtitle>{organizationName}</Subtitle>
        </div>

        <AddButton type="button" onClick={openCreateDialog}>
          <FiPlus size={18} /> Adicionar membro
        </AddButton>
      </Header>

      <Card>
        {newCredentials && (
          <CredentialsBox>
            <strong>Credenciais criadas:</strong>
            <span>
              Login: {newCredentials.email} | Senha: {newCredentials.password}
            </span>
          </CredentialsBox>
        )}

        {loading ? (
          <LoadingState>
            <Spinner />
            Carregando membros...
          </LoadingState>
        ) : members.length === 0 ? (
          <EmptyState>Nenhum membro cadastrado ainda.</EmptyState>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Nome</Th>
                <Th>Função</Th>
                <Th>Email</Th>
                <Th>Telefone</Th>
                <Th style={{ textAlign: "right" }}>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <Td>{member.name}</Td>
                  <Td>{roleOptions.find((role) => role.value === member.role)?.label ?? member.role}</Td>
                  <Td>{member.email}</Td>
                  <Td>{formatPhone(member.phone) || "-"}</Td>
                  <Td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <ActionButton
                      title="Editar"
                      type="button"
                      onClick={() => openEditDialog(member)}
                      style={{ marginRight: "8px" }}
                    >
                      <FiEdit size={16} />
                    </ActionButton>
                    <ActionButton
                      title="Remover"
                      type="button"
                      onClick={() => handleDelete(member)}>
                      <FiTrash2 size={16} />
                    </ActionButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
</div>
    

      <Dialog
        header="Confirmar exclusão"
        visible={deleteDialogVisible}
        onHide={cancelDelete}
        style={{ width: "420px" }}
        modal
        className="p-fluid"
        footer={
          <FormActions>
            <CancelButton type="button" onClick={cancelDelete} style={{ marginRight: "12px" }}>
              Cancelar
            </CancelButton>
            <DeleteButton type="button" onClick={confirmDelete}>
              Excluir
            </DeleteButton>
          </FormActions>
        }
      >
        <p>
          Tem certeza que deseja remover o membro{' '}
          <strong>{memberToDelete?.name || ""}</strong>?
        </p>
      </Dialog>

      <Dialog
        header={editingMember ? "Editar membro" : "Adicionar membro"}
        visible={dialogVisible}
        onHide={closeDialog}
        style={{ width: "520px" }}
        modal
        className="p-fluid"
      >
        <MemberForm onSubmit={handleSubmit}>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefone"
          />
          {!editingMember && (
            <PasswordWrapper>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Senha de acesso"
                required
              />
              <TogglePassword
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
              </TogglePassword>
            </PasswordWrapper>
          )}
          <Select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormActions>
            <AddButton type="submit">
              {editingMember ? "Atualizar" : "Salvar"} membro
            </AddButton>
          </FormActions>
        </MemberForm>
      </Dialog>
    </PageContainer>
  );
};

export default Team;
