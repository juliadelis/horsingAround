import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";

const Update = () => {
  const [cavalo, setcavalo] = useState(null);
  const params = useParams();
  useEffect(() => {
    const getCavalo = async () => {
      try {
        const { data } = await axios.get(
          `https://horsing-jt2o20xg0-julia-delis-projects.vercel.app/cavalos/${params.id}`
        );
        const cavalo = data[0];
        setcavalo(cavalo);
      } catch (error) {
        console.log(error);
      }
    };
    getCavalo();
  }, []);

  if (cavalo) {
    return (
      <>
        <Form initialData={cavalo} />
      </>
    );
  }

  return <h2>Carregando</h2>;
};

export default Update;
