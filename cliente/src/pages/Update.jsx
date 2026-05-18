import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { LoadingState, Spinner } from "../components/Form/style";
import { horseService } from "../services/horseService";

const Update = () => {
  const [cavalo, setCavalo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getCavalo = async () => {
      try {
        const data = await horseService.getById(id);

        // se o backend retornar array
        const cavaloData = Array.isArray(data) ? data[0] : data;

        setCavalo(cavaloData);
      } catch (error) {
        console.log("Erro ao buscar cavalo:", error);
      }
    };

    getCavalo();
  }, [id]);

  if (!cavalo) {
    return (
      <LoadingState>
        <Spinner />
        Carregando...
      </LoadingState>
    );
  }

  return <Form initialData={cavalo} />;
};

export default Update;
