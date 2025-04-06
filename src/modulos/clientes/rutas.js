const express = require('express');

const respuesta = require('../../red/respuestas')
const controlador = require('./controlador');

const router = express.Router();


router.get('/',traerTodos);
router.get('/:id',traerUno);
router.post('/',agregarReg);
router.put('/',eliminarReg);

async  function traerTodos(req, res, next){
    try{
        const items = await controlador.traerTodos();
        respuesta.succes(req, res, items, 200);  
    }catch(err){
        next(err);
    }
};


async  function traerUno(req, res, next){
    try{
        const items = await controlador.traerUno(req.params.id);
        respuesta.succes(req, res, items, 200);  
    }catch(err){
        next(err);
    }

};


async  function agregarReg(req, res, next){
    try{
        const items = await controlador.agregarReg(req.body);
        if(req.body.id == 0){
            mensaje = 'Registro guardado exitosaamente';
        }else{
            mensaje = 'Registro actualizado';
        }
        respuesta.succes(req, res, mensaje, 201);  
    }catch(err){
        next(err);
    }
};


async  function eliminarReg(req, res, next){
    try{
        const items = await controlador.eliminarReg(req.body);
        respuesta.succes(req, res, 'Registro eliminado exitosamente', 200);  
    }catch(err){
        next(err);
    }
};




module.exports = router;