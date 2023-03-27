const { json } = require('express');
const express = require('express');

const server = express();

// Query params = ?nome=NodeJs
// Route Params = /curso/2
// Request Body = {nome: 'NodeJs,  tipo:'backend'}
// CRUD > Create, Read, Update e Delete

server.use(express.json())


const cursos = ['java']
//Middleware Global
server.use((req, res, next) => {
    console.log(`Requisição Chamada ${req.url}`);

    return next();
});

function checkCruso(req, res, next){
    if(!req.body.name){
        return res.status(400).json({
            error: 'Nome do curso é obrigatório'
        })
    }

    return next();

}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({
            error: "O curso não existe"
        })
    }
    return next();
}

// vendo todos os cursos
server.get('/cursos',(req, res) => {
    return res.json(cursos)
});

// vendo curso por vez
server.get('/cursos/:index',checkIndexCurso,(req, res)=>{
    const {index} = req.params;
    return res.json(cursos[index])
});


// publicando um curso
server.post('/cursos',checkCruso, (req,res) => {
    const { name } = req.body;
    cursos.push(name)

    return res.json(cursos);
});


//atualizando um curso
server.put('/cursos/:index',checkCruso, checkIndexCurso,(req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

server.delete('/cursos/:index',checkIndexCurso, (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json({Messagem: 'Cursos Deleteado com sucesso'})
})
server.listen(3000)