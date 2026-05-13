import { useEffect, useState } from "react";
import { horseService } from "../services/horseService";

export const useHorseData = () => {
  const [cavalos, setCavalos] = useState([]);
  const [cavalosM, setCavalosM] = useState(0);
  const [cavalosF, setCavalosF] = useState(0);
  const [cavalosMedicados, setCavalosMedicados] = useState([]);
  const [cavaloMaisUsado, setCavaloMaisUsado] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllCavalos = async () => {
    try {
      setLoading(true);

      const data = await horseService.getAll();

      setCavalos(data);

      let numeroF = 0;
      let numeroM = 0;
      let cavalosMedicadosTemp = [];
      let maiorNumero = 0;
      let cavaloMaisUsadoTemp = null;

      data.forEach((cavalo) => {
        const isMedicated =
          cavalo.medication === true || cavalo.medication === "true";

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
      console.log("Erro ao buscar dados dos cavalos:", err);
    } finally {
      setLoading(false);
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
    loading,
    refetch: fetchAllCavalos,
  };
};
