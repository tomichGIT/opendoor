import { pool } from "../db.js";
import { PUBLIC_PATH } from "../config.js";
import path from "path";

// Función de apiBase
export const apiBase = async (req,res) => {
    res.json({ message: "welcome to the OpenDoor API v1.0" });
}


// // Función de backend (también podría haber entrado con la url static localhost/backend.html)
export const backend = async (req,res) => {
    res.sendFile(path.resolve(PUBLIC_PATH+"/backend.html"))
}

// Son contenido STATIC!
// // Función de home
// export const home = async (req,res) => {
//     res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
//     //res.json({ message: "estoy en home" });
// }

// Función de verLogs
export const getLogs = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT log.*, c.name AS client FROM log INNER JOIN clients c ON (c.id = log.id_client) ORDER BY id DESC LIMIT 100");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }

}

// Función de crearLog
export const crearLog = async (req,res) => {

}


