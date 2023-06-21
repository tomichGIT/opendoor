import { pool } from "../db.js";


// Función de crearCliente
export const getClientes = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clients WHERE deleted_at IS NULL");
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