import React, { useEffect, useState } from "react";
import axios from "axios";

export const useHorseData = () => {
  const [cavalos, setCavalos] = useState([]);
  const [cavalosM, setCavalosM] = useState(0);
  const [cavalosF, setCavalosF] = useState(0);
  const [cavalosMedicados, setCavalosMedicados] = useState([]);
  const [cavaloMaisUsado, setCavaloMaisUsado] = useState(null);

  const fetchAllCavalos = async () => {
    try {
      const res = await axios.get("https://horsing-api.vercel.app/cavalos");
      setCavalos(res.data);
      let numeroF = 0;
      let numeroM = 0;
      let cavalosMedicadosTemp = [];
      let maiorNumero = 0;
      let cavaloMaisUsadoTemp;
      res.data.map((cavalo) => {
        console.log(cavalo.medicacao);
        if (cavalo.medicacao.trim() !== "Não") {
          cavalosMedicadosTemp.push(cavalo);
        }
        if (cavalo.sexo === "Fêmea") {
          numeroF += 1;
        }
        if (cavalo.sexo === "Macho") {
          numeroM += 1;
        }
        if (cavalo.aulas > maiorNumero) {
          maiorNumero = cavalo.aulas;
          cavaloMaisUsadoTemp = cavalo;
        }
      });
      setCavalosMedicados(cavalosMedicadosTemp);
      setCavalosM(numeroM);
      setCavalosF(numeroF);
      setCavaloMaisUsado(cavaloMaisUsadoTemp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCavalos();
  }, []);

  return {
    cavalos,
    cavalosMedicados,
    cavalosM,
    cavalosF,
    cavaloMaisUsado,
  };
};
