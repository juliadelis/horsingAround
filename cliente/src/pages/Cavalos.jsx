import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Cavalos = () => {

   
    const [cavalos,setCavalos] = useState([]);

    useEffect(()=>{
        const fetchAllCavalos = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/cavalos");
                console.log(res.data);
                setCavalos(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllCavalos();
    },[]);

  return (
    <div>
        <h1>Cavalos</h1>
        <div className='cavalos'>
            {cavalos.map((cavalos) =>(
                <div className="cavalo" key={cavalos.id}>
                    {cavalos.foto && <img src={cavalos.foto} alt="" />}
                    <h2>{cavalos.nome}</h2>
        
                    <p>{cavalos.idade}</p>
                    <p>{cavalos.racao}</p>
                    <p>{cavalos.sexo}</p>
                    <p>{cavalos.raca}</p>
                    <p>{cavalos.feno}</p>
                    <p>{cavalos.medicacao}</p>
                    <p>{cavalos.aulas}</p>
                    <p>{cavalos.nome_pai}</p>
                    <p>{cavalos.nome_mae}</p>
                    <p>{cavalos.peso}</p>
                </div>
            ))}
        </div>
        <button>
            <Link to="/add">Adicione um novo Cavalo</Link>
            </button>
    </div>
  )
}

export default Cavalos