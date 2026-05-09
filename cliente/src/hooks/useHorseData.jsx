import React, { useEffect, useState } from "react";
import api from "../services/api";

export const useHorseData = () => {
  const [cavalos, setCavalos] = useState([]);
  const [cavalosM, setCavalosM] = useState(0);
  const [cavalosF, setCavalosF] = useState(0);
  const [cavalosMedicados, setCavalosMedicados] = useState([]);
  const [cavaloMaisUsado, setCavaloMaisUsado] = useState(null);

  const fetchAllCavalos = async () => {
    try {
      const res = await api.get("/cavalos");
      setCavalos(res.data);
      let numeroF = 0;
      let numeroM = 0;
      let cavalosMedicadosTemp = [];
      let maiorNumero = 0;
      let cavaloMaisUsadoTemp;
      res.data.forEach((cavalo) => {
        const medRaw = cavalo.medication;

        const isMedicated = medRaw === true;
        if (isMedicated) {
          cavalosMedicadosTemp.push(cavalo);
        }

        if (cavalo.gender === "Femea") {
          numeroF += 1;
        }
        if (cavalo.gender === "Macho") {
          numeroM += 1;
        }
        const aulasNum = Number(cavalo.lessons) || 0;
        if (aulasNum > maiorNumero) {
          maiorNumero = aulasNum;
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
