import Form from '../components/Form';
import { LoadingState, Spinner } from "../components/Form/style";
import { useOrganizationRole } from "../hooks/useOrganizationRole.jsx";

const Add = () => {
  const { canAddHorse, roleLoading } = useOrganizationRole();

  if (roleLoading) {
    return (
      <LoadingState>
        <Spinner />
        Carregando...
      </LoadingState>
    );
  }

  if (!canAddHorse) {
    return <h2>Você não tem permissão para adicionar cavalos.</h2>;
  }

  return <Form/>
}

export default Add
