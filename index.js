const express = require('express');

const server = express();

server.use(express.json());

const cursos = ['Node JS', 'Java Script', 'React'];

//Middleware(Rota) Global 
server.use((req, res, next) => {
    console.log('Requisição');

    return next();
});

function checkCurso(req, res, next){
    if (!req.body.name){
        return res.status(400).json({ error: "O nome é obrigatorio"});
    }

    return next();
}

server.get('/cursos', (req, res) => {
    return res.json(cursos);    
});

server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;

    return res.json(cursos[index]);
});

server.post('/cursos', checkCurso, (req, res) => {
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos);
})

server.put('/cursos/:index', checkCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);

});

server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);

    return res.json(cursos);

});

server.listen(3000);