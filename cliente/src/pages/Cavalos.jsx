import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Cavalos = () => {
  const [cavalos, setCavalos] = useState([]);

  useEffect(() => {
    const fetchAllCavalos = async () => {
      try {
        const res = await api.get("/cavalos");

        setCavalos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCavalos();
  }, []);

  return (
    <div>
      <h1>Cavalos</h1>
      <div className="cavalos">
        {cavalos.map((cavalos) => (
          <div className="cavalo" key={cavalos.id}>
            {cavalos.pictureURL && <img src={cavalos.pictureURL} alt="" />}
            <h2>{cavalos.name}</h2>

            <p>{cavalos.age}</p>
            <p>{cavalos.foodAmount}</p>
            <p>{cavalos.gender}</p>
            <p>{cavalos.breed}</p>
            <p>{cavalos.hay}</p>
            <p>{cavalos.medication}</p>
            <p>{cavalos.lessons}</p>
            <p>{cavalos.fathersName}</p>
            <p>{cavalos.mothersName}</p>
            <p>{cavalos.weight}</p>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Adicione um novo Cavalo</Link>
      </button>
    </div>
  );
};

export default Cavalos;
