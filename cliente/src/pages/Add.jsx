import Form from '../components/Form';
import { useOrganizationRole } from "../hooks/useOrganizationRole.jsx";

const Add = () => {
  const { canAddHorse, roleLoading } = useOrganizationRole();

  if (roleLoading) {
    return <h2>Carregando...</h2>;
  }

  if (!canAddHorse) {
    return <h2>Você não tem permissão para adicionar cavalos.</h2>;
  }

  return <Form/>
}

export default Add
