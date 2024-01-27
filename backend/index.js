import express from "express";
import cors from "cors";
import { db } from "./db.js";
import multer from "multer";
import { storage } from "./cloudinaryConfig.js";

const app = express();

const upload = multer({ storage: storage });

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    app.use(cors());
    next();
});
app.use(express.json())


app.post("/cavalos", upload.single("foto"), (req,res)=>{
   console.log(req.file)
    const q = "INSERT INTO cavalos (`nome`,`idade`,`racao`,`sexo`,`raca`,`feno`,`medicacao`,`aulas`,`nome_pai`,`nome_mae`,`peso`,`foto`) VALUES (?)"
    const values = [
        req.body.nome,
        req.body.idade,
        req.body.racao,
        req.body.sexo,
        req.body.raca,
        req.body.feno,
        req.body.medicacao,
        req.body.aulas,
        req.body.nome_pai,
        req.body.nome_mae,
        req.body.peso,
        req.file.filename,
    ]
    
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created.")
    });
});

app.put("/cavalos/:id", upload.single("foto"), (req,res)=>{
    const id = req.params.id 
    if (req.file){
        const q = "UPDATE cavalos SET nome=?, idade=?, racao=?, sexo=?, raca=?, feno=?, medicacao=?, aulas=?, nome_pai=?, nome_mae=?, peso=?, foto=? WHERE id = ?"
    
    
        const values = [
            req.body.nome,
            req.body.idade,
            req.body.racao,
            req.body.sexo,
            req.body.raca,
            req.body.feno,
            req.body.medicacao,
            req.body.aulas,
            req.body.nome_pai,
            req.body.nome_mae,
            req.body.peso,
            req.file.filename,
            id
        ]
        
        db.query(q,values, (err,data)=>{
            if(err) return res.json(err)
            return res.json("Cavalos has been edit.")
        });
    } else{
        const q = "UPDATE cavalos SET nome=?, idade=?, racao=?, sexo=?, raca=?, feno=?, medicacao=?, aulas=?, nome_pai=?, nome_mae=?, peso=? WHERE id = ?"
    
    
    const values = [
        req.body.nome,
        req.body.idade,
        req.body.racao,
        req.body.sexo,
        req.body.raca,
        req.body.feno,
        req.body.medicacao,
        req.body.aulas,
        req.body.nome_pai,
        req.body.nome_mae,
        req.body.peso,
        id
    ]
    
    db.query(q,values, (err,data)=>{
        if(err) return res.json(err)
        return res.json("Cavalos has been edit.")
    });
    }
    
});

app.get("/cavalos", (req, res) =>{
    const q = "SELECT * FROM cavalos";

    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
})

app.get("/cavalos/:id", (req, res) =>{
    const id = req.params.id
    const q = `SELECT * FROM cavalos WHERE id = ${id}`;

    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json(data);
    });
})



app.delete("/cavalos/:id", (req, res) =>{
    const id = req.params.id

    const q = `DELETE FROM cavalos WHERE id = ${id}`;

    db.query(q, (err, data)=>{
        if(err) return res.json(err);
        return res.status(200).json({
            message: "Cavalo excluido com sucesso"
        });
    });
})

app.listen(8800, ()=>{
    console.log("connected to backend!!")
});