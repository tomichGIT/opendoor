import { pool } from "../db.js";

// Función de getSensores
export const getSensores = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM sensors WHERE `deleted_at` IS NULL");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
}

// Función de crearSensor
export const crearSensor = async (req,res) => {

}

// Función de editarSensor
export const editarSensor = async (req,res) => {

}

// Función de eliminarSensor
export const eliminarSensor = async (req,res) => {

}