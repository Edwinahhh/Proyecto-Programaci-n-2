const mysql = require ('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conexionMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(conexionMysql, 200);
        }else{
            console.log('DB Conectada')
        }
    });

    conexion.on('erro',err =>{
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conexionMysql();
        }else{
            throw err;
        }
    });
}

conexionMysql();


function traerTodos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function traerUno(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });   
}

function insertar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET  ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function actualizar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregarReg(tabla, data){
    if(data && data.id == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }
}

function eliminarReg(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}



module.exports = {
    traerTodos,
    traerUno,
    agregarReg,
    eliminarReg
    
}