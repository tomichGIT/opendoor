import { pool } from "../db.js";
import { PUBLIC_PATH } from "../config.js";
import path from "path";
import fs from 'fs';

// Función de apiBase
export const apiBase = async (req,res) => {
    res.json({ message: "welcome to the OpenDoor API v1.0" });
}

export const linkCliente = async (req, res) => {
    
    //const guestId = parseInt(req.params.id_cliente);
    const guestId = req.params.id_cliente; // con uuid ahora no es mas parseint

    const filePath = path.resolve(PUBLIC_PATH, 'index.html');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
  

    try {
        // 1. traigo la URL solo si NO esta expirada.
        const [row] = await pool.query("SELECT c.`name`, c.`expiration_date` FROM `clients` c WHERE c.`uuid` = ? AND c.`deleted_at` IS NULL LIMIT 1",[guestId]);
        
        if(!row[0]){ res.status(400).json({message:"link inválido"}); return;};

        const nombre=row[0].name;//"Tomi Sanchez";
        const expiration_date=row[0].expiration_date;//"2023-06-25 23:49:47";
    
        // Manipulate the fileContent to include extra data
        const modifiedContent = fileContent.replace(
          '{{myScript}}',
          `<script>
            var userData = {
                nombre: "${nombre}",
                uuid: "${guestId}",
                expiration: "${expiration_date}",
                tf_expired: false
            };
          </script>`
        );
        res.send(modifiedContent);

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }

    // res.sendFile(path.resolve(PUBLIC_PATH + "/index.html"))

}

// // Función de backend (también podría haber entrado con la url static localhost/backend.html)
export const backend = async (req,res) => {
    res.sendFile(path.resolve(PUBLIC_PATH+"/backend.html"))
    //res.sendFile(path.join(PUBLIC_PATH, '/backend.html'));
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
        const [rows] = await pool.query("SELECT log.*, c.name AS client FROM log INNER JOIN clients c ON (c.uuid = log.id_client) ORDER BY id DESC LIMIT 100");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }

}

// Función de openDoor (cada vez que un Guest abre una puerta [llamar a la función interna crear Log!!! ])

export const openDoor = async (req,res) => {
    
    //const guestId = parseInt(req.params.id_cliente);
    const guestId = req.params.id_cliente; // con uuid ahora no es mas parseint
    
    console.log("GuestID esssssssssssssssss", guestId);
    try {
        // 1. traigo la URL solo si NO esta expirada.
        const [row] = await pool.query("SELECT s.`link_url`, c.`expiration_date`, c.id AS id_cliente FROM `sensors` s INNER JOIN `clients` c ON (c.`id_sensor` = s.id) WHERE c.`uuid` = ? AND c.`deleted_at` IS NULL AND c.`expiration_date` >= NOW() LIMIT 1",[guestId]);
        //console.log("url es:",row[0].link_url);

        // si no devuelve row
        if(!row[0]){

            createLog("error", guestId, req);
            res.status(500).json({message:"sesión expirada o inválida"}); return;
        };


        // 2. ejecutar mediante FETCH la apertura de puerta!
        fetch(row[0].link_url)
        .then(response => response.json())
        .then(data => {


            let resultado ={
                message: "error al abrir la puerta, verifica la llave", 
                expiration: row[0].expiration_date,
                error: 1
            };

            //data.error=0 es lo que devuelve eweLink cuando esta todo ok.
            if(data.error==0){
                resultado.message = "puerta abierta";
                resultado.error = 0;
                createLog("success", guestId, req);
            }else {
                createLog("error", guestId, req);
            }
            res.status(200).json(resultado);

        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            createLog("error", guestId, req);
            res.status(500).json({error:1});
            console.error('Errorrr:', error);
        });

      

        //res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong: "+error });
    }
    // crear el LOG de apertura

    //res.json({message: "ABRISTE LA PUERTA! CON ID "+guestId});
}


const createLog = async (status, uuid, req) => {
         
        // Get the user's IP address
        const ip = req.ip;
  
        // Get the user agent
        const userAgent = req.get('User-Agent');
  
        // Create the log entry in the database
        const logEntry = {
          ip,
          msg: status === 'success' ? 'Success' : 'Error',
          userAgent
        };
        console.log("trying to do log of ",uuid);

        await pool.query("INSERT INTO `log` (`msg`, `id_client`, `ip`, `device`) VALUES (?,?,?,?)",[logEntry.msg, uuid, logEntry.ip, logEntry.userAgent]);
        return;
  };