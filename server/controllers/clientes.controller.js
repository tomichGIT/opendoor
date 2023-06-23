import { pool } from "../db.js";
import {v4 as uuidv4} from 'uuid';



// Función de crearCliente
export const getClientes = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT c.*, s.door FROM clients c INNER JOIN sensors s ON (s.id = c.id_sensor) WHERE c.deleted_at IS NULL");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de crearCliente
export const crearCliente = async (req,res) => {
    try {
        const {select_sensores, select_timeout, txt_apartment, txt_dates, txt_fullname}= req.body; // los otros datos se obtienen del body

        // sumarle a arriving_date esa cantidad de horas
        const originalDate = txt_dates?new Date(txt_dates):new Date();
        // // Check if the date is invalid or NaN
        // if (isNaN(originalDate)) {
        //     originalDate = new Date(); // Set the date to today's date
        // }
        let expirationDate;
        switch(select_timeout){
            case "12": expirationDate=new Date(originalDate.getTime() + 12 * 60 * 60 * 1000); break; // Adding 12 hours in milliseconds
            case "24": expirationDate=new Date(originalDate.getTime() + 24 * 60 * 60 * 1000); break; // Adding 24 hours in milliseconds
            case "48": expirationDate=new Date(originalDate.getTime() + 48 * 60 * 60 * 1000); break; // Adding 48 hours in milliseconds
        }

        console.log("original Date:", originalDate);
        console.log("output Date:", expirationDate);
        
        // id único para cada cliente (debo conservarlo on UPDATE! no hacer nuevos) [x si ya le paso el link al cliente]
        const UID=uuidv4();
        //console.log("UID ES ",UID);

        const [resultado] = await pool.query("INSERT INTO `clients` (`uuid`,`id_sensor`, `name`, `apartment`, `arriving_date`, `expiration_date`)  VALUES (?,?,?,?,?,?)", [UID,select_sensores, txt_fullname, txt_apartment, originalDate, expirationDate ]);
       
        res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de editarCliente
export const editarCliente = async (req,res) => {
    try {
        const itemId = parseInt(req.params.id); //el id se obtiene por param
        const {select_sensores, select_timeout, txt_apartment, txt_dates, txt_fullname}= req.body; // los otros datos se obtienen del body

        // sumarle a arriving_date esa cantidad de horas
        //const originalDate = new Date(txt_dates);
        const originalDate = txt_dates?new Date(txt_dates):new Date();
        let expirationDate;
        switch(select_timeout){
            case "12": expirationDate=new Date(originalDate.getTime() + 12 * 60 * 60 * 1000); break; // Adding 12 hours in milliseconds
            case "24": expirationDate=new Date(originalDate.getTime() + 24 * 60 * 60 * 1000); break; // Adding 24 hours in milliseconds
            case "48": expirationDate=new Date(originalDate.getTime() + 48 * 60 * 60 * 1000); break; // Adding 48 hours in milliseconds
        }

        
        const [resultado] = await pool.query("UPDATE `clients` SET `id_sensor`=?, `name`=?, `apartment`=? , `arriving_date`=? , `expiration_date`=?  WHERE `id`=?", [select_sensores, txt_fullname, txt_apartment, originalDate, expirationDate, itemId]);

        res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de eliminarCliente
export const eliminarCliente = async (req,res) => {
    try {
        const itemId = parseInt(req.params.id); //en este caso params por que estas accediendo al parametro y no al body
        // aunque sea delete, realmente lo edito
        const [resultado] = await pool.query("UPDATE `clients` SET `deleted_at` = NOW() WHERE `id` = ?", [itemId]);
        console.log("borrando cliente", itemId);
        res.status(201).json(resultado);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}