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
export const verLogs = async (req,res) => {
    res.json({ message: "mostrandoLogs" });

}

// Función de crearLog
export const crearLog = async (req,res) => {

}


