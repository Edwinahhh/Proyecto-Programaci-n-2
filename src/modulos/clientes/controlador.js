const db = require ('../../DB/mysql');

const TABLA = 'clientes'; 

function traerTodos (){
    return db.traerTodos(TABLA);
}

function traerUno (id){
    return db.traerUno(TABLA, id);
}

function eliminarReg (body){
    return db.eliminarReg(TABLA, body);
}

function agregarReg (body){
    return db.agregarReg(TABLA, body);
}


module.exports = {
    traerTodos,
    traerUno,
    agregarReg,
    eliminarReg

}