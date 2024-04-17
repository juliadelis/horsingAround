import React from "react";
import axios from "axios";
import {
  Card,
  Container,
  Item,
  ItemNome,
  ItemBanco,
  Img,
  CardText,
  ItemCorrespondente,
  Botao,
} from "./style.js";
import { useState } from "react";
import { useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Grid = () => {
  const [cavalos, setCavalos] = useState([]);
  const fetchAllCavalos = async () => {
    try {
      const res = await axios.get(
        "https://horsing-jt2o20xg0-julia-delis-projects.vercel.app/cavalos/cavalos"
      );
      console.log(res.data);
      setCavalos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCavalos();
  }, []);

  return (
    <Container>
      {cavalos.map((cavalos) => (
        <Card className="cavalo" key={cavalos.id}>
          {cavalos.foto && (
            <Img
              src={`https://res.cloudinary.com/dgjpw8ei8/image/upload/v1682287004/${cavalos.foto}`}
              alt="imagem"
            />
          )}
          <CardText>
            <ItemNome>{cavalos.nome}</ItemNome>
            <ItemCorrespondente>
              <Item>Idade:</Item>
              <ItemBanco>{cavalos.idade}</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Ração:</Item>
              <ItemBanco>{cavalos.racao}</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Aulas:</Item>
              <ItemBanco>{cavalos.aulas}</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Feno:</Item>
              <ItemBanco>{cavalos.feno}</ItemBanco>
            </ItemCorrespondente>
            <ItemCorrespondente>
              <Item>Medicação:</Item>
              <ItemBanco>{cavalos.medicacao}</ItemBanco>
            </ItemCorrespondente>
          </CardText>
          <Botao to={`/cavalos/${cavalos.id}`}>Ver detalhes</Botao>
        </Card>
      ))}
    </Container>
  );
};

export default Grid;
