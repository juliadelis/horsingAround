import React from "react";
import axios from "axios";
import { Card, Container, Item, ItemNome, ItemBanco, Img, CardText, ItemCorrespondente, Botao, Svg, Deletar, SvgTrash,Voltar } from "./style.js";
import { useState } from 'react'
import { useEffect } from 'react'
import{ FaTrash, FaEdit } from "react-icons/fa";
import {toast} from "react-toastify";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";




const VerCavalo = () => {
    const [cavalo, setcavalo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
useEffect(() => {
    const getCavalo = async ()=> {
      try {
      const {data} = await axios.get(`http://localhost:8800/cavalos/${params.id}`)
      const cavalo = data[0]
      setcavalo(cavalo)
  
      } catch (error) {
        console.log(error)
      }
   
    } 
    getCavalo()
  
  }, [])
  const destroyHorse = async (id)=>{
    try {
        await axios.delete(`http://localhost:8800/cavalos/${id}`);
        console.log("deletou");
        navigate("/cavalos");
    } catch (error) {
        console.log(error)
    }
}
    if(cavalo){
    return(
        <Container>          
                <Card className="cavalo" key={cavalo.id}>
                <Botao to={`/editar_cavalo/${cavalo.id}`}><Svg viewBox="0 0 30 40">
                    <g clip-path="url(#clip0_11_556)">
                        <path d="M22.5 7.24264C22.894 6.84867 23.3617 6.53616 23.8764 6.32295C24.3912 6.10974 24.9428 6 25.5 6C26.0572 6 26.6088 6.10974 27.1236 6.32295C27.6383 6.53616 28.106 6.84867 28.5 7.24264C28.894 7.63661 29.2065 8.10431 29.4197 8.61905C29.6329 9.13379 29.7426 9.68549 29.7426 10.2426C29.7426 10.7998 29.6329 11.3515 29.4197 11.8662C29.2065 12.381 28.894 12.8487 28.5 13.2426L8.25 33.4926L0 35.7426L2.25 27.4926L22.5 7.24264Z" />
                    </g>
                    <defs>
                        <clipPath id="clip0_11_556">
                            <rect width="36" height="36"/>
                        </clipPath>
                    </defs>
                </Svg></Botao>
                <Deletar onClick={()=>destroyHorse(cavalo.id)}><SvgTrash viewBox="0 0 32 32">
                    <path d="M4 8H6.66667H28"/>
                    <path d="M25.3334 7.99996V26.6666C25.3334 27.3739 25.0524 28.0521 24.5523 28.5522C24.0522 29.0523 23.3739 29.3333 22.6667 29.3333H9.33335C8.62611 29.3333 7.94783 29.0523 7.44774 28.5522C6.94764 28.0521 6.66669 27.3739 6.66669 26.6666V7.99996M10.6667 7.99996V5.33329C10.6667 4.62605 10.9476 3.94777 11.4477 3.44767C11.9478 2.94758 12.6261 2.66663 13.3334 2.66663H18.6667C19.3739 2.66663 20.0522 2.94758 20.5523 3.44767C21.0524 3.94777 21.3334 4.62605 21.3334 5.33329V7.99996" />
                </SvgTrash></Deletar>
                <Voltar to={`/cavalos`}><Svg viewBox="0 0 44 44">
                    <path d="M34.8333 22H9.16666" />
                    <path d="M22 34.8333L9.16666 22L22 9.16663"/>
                </Svg></Voltar>
                    {
                        cavalo.foto && <Img src={`https://res.cloudinary.com/dgjpw8ei8/image/upload/v1682287004/${cavalo.foto}`} alt="imagem" />      
                    }
                     <CardText> 
                     <ItemNome>{cavalo.nome}</ItemNome> 
                    <ItemCorrespondente>      
                        <Item>Idade:</Item>
                        <ItemBanco>{cavalo.idade}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente> 
                        <Item>Ração:</Item>
                        <ItemBanco>{cavalo.racao}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Sexo:</Item>
                    <ItemBanco>{cavalo.sexo}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Raça:</Item>
                    <ItemBanco>{cavalo.raca}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Feno:</Item>
                    <ItemBanco>{cavalo.feno}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Medicação:</Item>
                    <ItemBanco>{cavalo.medicacao}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Aulas:</Item>
                    <ItemBanco>{cavalo.aulas}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Nome do pai:</Item>
                    <ItemBanco>{cavalo.nome_pai}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Nome da Mãe:</Item>
                    <ItemBanco>{cavalo.nome_mae}</ItemBanco>
                    </ItemCorrespondente> 
                    <ItemCorrespondente>
                    <Item>Peso:</Item>
                    <ItemBanco>{cavalo.peso}</ItemBanco>
                    </ItemCorrespondente> 
                    
                    </CardText>                     
                </Card>   
        </Container>
    );
    }return <h2>Carregando</h2>
};

export default VerCavalo;