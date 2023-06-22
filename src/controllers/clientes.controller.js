import { pool } from "../db.js";


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

}

// Función de editarCliente
export const editarCliente = async (req,res) => {

}

// Función de eliminarCliente
export const eliminarCliente = async (req,res) => {

}